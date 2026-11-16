"""Valdori Digital logo paketi — geometri valdoridigital.net'teki header SVG'si ve icon.svg'den birebir alınmıştır.
Sitedeki wordmark stroke (9 birim, miter) ile çizilir; burada shapely ile dolgu path'e çevrilir (Figma/Illustrator/baskı güvenli)."""
import os, json, math
from shapely.geometry import LineString, LinearRing, Polygon
from shapely.ops import unary_union
from shapely import affinity
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SVG = os.path.join(ROOT, "svg"); os.makedirs(SVG, exist_ok=True)

C = dict(night="#05070D", night2="#0A0E17", graphite="#1B1F27", ice="#E8EEF6",
         cyan="#19E3FF", cyan2="#00B8D9", cyanLight="#9DF4FF", white="#FFFFFF")

# ---- Sembol (site koordinatlarından -4,-10 kaydırılmış; 92x80) ----
V_BODY = "M0 0H24L46 52L57 26H80.95L58 80H34Z"
V_CAP = "M68 0H92L83.5 20H59.54Z"
SYM_W, SYM_H = 92, 80

# ---- Wordmark: stroke -> fill ----
HW = 4.5
def arc(cx, cy, rx, ry, a0, a1, n=48):
    return [(cx + rx*math.cos(math.radians(a0 + (a1-a0)*i/n)), cy + ry*math.sin(math.radians(a0 + (a1-a0)*i/n))) for i in range(n+1)]
def stroke_line(pts):
    return LineString(pts).buffer(HW, cap_style="flat", join_style="mitre", mitre_limit=8)
def stroke_ring(pts):
    return LinearRing(pts).buffer(HW, join_style="mitre", mitre_limit=8)
parts = [
    stroke_line([(0,0),(23,60),(46,0)]),                         # V
    stroke_line([(62,60),(85,0),(108,60)]), stroke_line([(72.5,40),(97.5,40)]),  # A
    stroke_line([(124,0),(124,60),(156,60)]),                    # L
    stroke_ring([(172,0),(186,0)] + arc(186,30,28,30,-90,90)[1:] + [(172,60)]),  # D
    stroke_ring(arc(258,30,28,30,0,360,96)[:-1]),                # O
    stroke_line([(302,60),(302,0),(322,0)] + arc(322,17,17,17,-90,90)[1:] + [(302,34)]),  # R kase
    stroke_line([(320,34),(342,60)]),                            # R bacak
    stroke_line([(358,0),(358,60)]),                             # I
]
wm = unary_union(parts)
minx, miny, maxx, maxy = wm.bounds
wm = affinity.translate(wm, -minx, -miny)
WM_W, WM_H = maxx-minx, maxy-miny
WM_DX, WM_DY = 122+minx, 10+miny  # site header'daki konum (sembole göre, dikey ortalı)
CAP_TOP = -4.5 - miny  # normalize path içinde dik çizgilerin üst kenarı

def geom_path(g):
    polys = [g] if isinstance(g, Polygon) else list(g.geoms)
    d = []
    for p in polys:
        for ring in [p.exterior, *p.interiors]:
            xs = list(ring.coords)[:-1]
            d.append("M" + "L".join(f"{x:.2f} {y:.2f}" for x, y in xs) + "Z")
    return "".join(d)
WM_PATH = geom_path(wm)

# ---- "DIGITAL" tanımlayıcı: JetBrains Mono Medium, outline ----
def text_path(text, ttf, cap_px, track_em):
    f = TTFont(ttf); gs = f.getGlyphSet(); cmap = f.getBestCmap()
    upm = f["head"].unitsPerEm; cap = f["OS/2"].sCapHeight
    s = cap_px / cap; x = 0.0; pen = SVGPathPen(gs)
    for ch in text:
        g = gs[cmap[ord(ch)]]
        g.draw(TransformPen(pen, (s, 0, 0, -s, x, cap_px)))
        x += (g.width + track_em*upm) * s
    return pen.getCommands(), x - track_em*upm*s
FONT = "/usr/share/fonts/truetype/jetbrains-mono/JetBrainsMono-Medium.ttf"

def svg(w, h, body, title="Valdori Digital", bg=None, pad=0, scale=4):
    W, H = w+2*pad, h+2*pad
    b = f'<rect x="{-pad:g}" y="{-pad:g}" width="{W:g}" height="{H:g}" fill="{bg}"/>' if bg else ""
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{-pad:g} {-pad:g} {W:.2f} {H:.2f}" width="{W*scale:.0f}" height="{H*scale:.0f}" '
            f'role="img" aria-label="{title}"><title>{title}</title>{b}{body}</svg>\n')
def write(name, s):
    open(os.path.join(SVG, name), "w").write(s)

def sym(body, cap, x=0, y=0, s=1):
    return (f'<g transform="translate({x:g} {y:g}) scale({s:g})"><path fill="{body}" d="{V_BODY}"/>'
            f'<path fill="{cap}" d="{V_CAP}"/></g>')

# Varyantlar: (sembol gövde, sembol kapak, yazı)
VAR = {
    "on-dark":   (C["ice"], C["cyan"], C["ice"]),
    "on-light":  (C["night"], C["cyan2"], C["night"]),
    "mono-dark": (C["night"],)*3,
    "mono-light":(C["white"],)*3,
}

DESC_CAP = 11
desc_d, desc_w = text_path("DIGITAL", FONT, DESC_CAP, 0.42)

for v, (b, cap, t) in VAR.items():
    write(f"valdori-symbol-{v}.svg", svg(SYM_W, SYM_H, sym(b, cap)))
    write(f"valdori-wordmark-{v}.svg", svg(WM_W, WM_H, f'<path fill="{t}" fill-rule="evenodd" d="{WM_PATH}"/>', "Valdori"))
    # 1) Yatay — sitedeki header lockup'ı birebir
    body = sym(b, cap) + f'<path transform="translate({WM_DX:.2f} {WM_DY:.2f})" fill="{t}" fill-rule="evenodd" d="{WM_PATH}"/>'
    top, bot = min(0, WM_DY), max(SYM_H, WM_DY+WM_H)
    write(f"valdori-logo-horizontal-{v}.svg", svg(WM_DX+WM_W, bot-top, f'<g transform="translate(0 {-top:.2f})">{body}</g>'))
    # 2) Yatay + DIGITAL: wordmark %80, dik çizgiler sembol üstüne hizalı, DIGITAL sembol tabanına
    k = 0.8; dy = SYM_H - DESC_CAP
    body = (sym(b, cap) + f'<g transform="translate({WM_DX:.2f} {-CAP_TOP*k:.2f}) scale({k})"><path fill="{t}" fill-rule="evenodd" d="{WM_PATH}"/></g>'
            f'<path transform="translate({WM_DX+3:.2f} {dy})" fill="{t}" d="{desc_d}"/>')
    top = min(0, -CAP_TOP*k)
    write(f"valdori-logo-full-{v}.svg", svg(WM_DX+WM_W*k, SYM_H-top, f'<g transform="translate(0 {-top:.2f})">{body}</g>'))
    # 3) Dikey
    s2 = 1.6; sw = SYM_W*s2; W = WM_W
    wy = SYM_H*s2 + 40
    ds = 1.65
    body = (sym(b, cap, (W-sw)/2, 0, s2) + f'<path transform="translate(0 {wy:.2f})" fill="{t}" fill-rule="evenodd" d="{WM_PATH}"/>'
            f'<g transform="translate({(W-desc_w*ds)/2:.2f} {wy+WM_H+26:.2f}) scale({ds})"><path fill="{t}" d="{desc_d}"/></g>')
    write(f"valdori-logo-stacked-{v}.svg", svg(W, wy+WM_H+26+DESC_CAP*ds, body))

# App/sosyal ikon — sitedeki icon.svg oranları (rx 22/100, sembol %68)
def icon(bg, b, cap, rx=22):
    s = 0.68*100/92*92/100  # site: 92 birim sembol 100 kutuda .68 ölçek
    inner = sym(b, cap, 50-46*0.68, 50-40*0.68, 0.68)
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="512" height="512" role="img" aria-label="Valdori Digital">'
            f'<title>Valdori Digital</title><rect width="100" height="100" rx="{rx}" fill="{bg}"/>{inner}</svg>\n')
write("valdori-appicon-night.svg", icon(C["night"], C["ice"], C["cyan"]))
write("valdori-appicon-cyan.svg", icon(C["cyan"], C["night"], C["night"]))
write("valdori-appicon-ice.svg", icon(C["ice"], C["night"], C["cyan2"]))
write("valdori-avatar-night.svg", icon(C["night"], C["ice"], C["cyan"], rx=0))  # sosyal profil (platform kendisi yuvarlar)

# Sosyal banner'lar — sitedeki OG diliyle: gece zemin, ızgara, cyan glow, outline V
def banner(w, h, name):
    grid = "".join(f'<path d="M{x} 0V{h}" />' for x in range(0, w, 60)) + "".join(f'<path d="M0 {y}H{w}" />' for y in range(0, h, 60))
    S = h*0.62/SYM_H
    ox, oy = w - SYM_W*S - h*0.22, (h - SYM_H*S)/2
    L = h*0.16/SYM_H  # lockup ölçeği
    lock = (sym(C["ice"], C["cyan"]) + f'<path transform="translate({WM_DX:.2f} {WM_DY:.2f})" fill="{C["ice"]}" fill-rule="evenodd" d="{WM_PATH}"/>')
    body = (f'<defs><radialGradient id="g" cx="{(ox+SYM_W*S*.6)/w:.3f}" cy=".35" r=".55"><stop offset="0" stop-color="{C["cyan"]}" stop-opacity=".22"/>'
            f'<stop offset="1" stop-color="{C["cyan"]}" stop-opacity="0"/></radialGradient></defs>'
            f'<rect width="{w}" height="{h}" fill="{C["night"]}"/><rect width="{w}" height="{h}" fill="url(#g)"/>'
            f'<g stroke="{C["ice"]}" stroke-opacity=".04" fill="none">{grid}</g>'
            f'<g transform="translate({ox:.1f} {oy:.1f}) scale({S:.4f})"><path d="{V_BODY}" fill="none" stroke="{C["cyan"]}" stroke-opacity=".55" stroke-width="{1.4/S:.3f}"/>'
            f'<path d="{V_CAP}" fill="{C["cyan"]}"/></g>'
            f'<g transform="translate({h*0.22:.1f} {(h-SYM_H*L)/2:.1f}) scale({L:.4f})">{lock}</g>')
    write(name, f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}" role="img" aria-label="Valdori Digital"><title>Valdori Digital</title>{body}</svg>\n')
banner(1584, 396, "valdori-banner-linkedin.svg")
banner(1500, 500, "valdori-banner-x.svg")

json.dump({"color": C, "font": {"display": "Unbounded", "body": "Manrope", "mono": "JetBrains Mono"}},
          open(os.path.join(ROOT, "tokens.json"), "w"), indent=2)
print("wordmark", round(WM_W,2), round(WM_H,2), "offset", round(WM_DX,2), round(WM_DY,2))
