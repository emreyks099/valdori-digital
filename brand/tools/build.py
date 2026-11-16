"""Valdori Digital logo paketi üreticisi. Tüm glifler el ile kurulmuş geometrik path'lerdir (font bağımlılığı yok)."""
import os, json
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SVG = os.path.join(ROOT, "svg")
os.makedirs(SVG, exist_ok=True)

INK, BONE, EMBER = "#0E0E12", "#F2EEE6", "#FF5B1F"
S = 14  # stroke, cap height 100
K = 0.29  # diagonal slope dx/dy

def V():
    return 74, "M0 0H16.5L37 70.7L57.5 0H74L45 100H29Z"
def A():
    return 74, ("M29 0H45L74 100H57.5L37 29.3L16.5 100H0Z"
                "M17.5 64H56.5V76H17.5Z")
def L():
    return 56, "M0 0H14V86H56V100H0Z"
def D():
    return 84, "M0 0H42A42 50 0 0 1 42 100H0ZM14 14V86H42A28 36 0 0 0 42 14Z"
def O():
    return 92, "M46 0A46 50 0 1 1 46 100A46 50 0 1 1 46 0ZM46 14A32 36 0 1 0 46 86A32 36 0 1 0 46 14Z"
def R():
    return 68, ("M0 0H38A27 29 0 0 1 38 58H14V100H0ZM14 14V44H38A13 15 0 0 0 38 14Z"
                "M33 52H49L68 100H52Z")
def I():
    return 14, "M0 0H14V100H0Z"
def G():
    # açık halka + yatay kol
    return 92, ("M85.6 25A46 50 0 1 0 92 50V44H50V56H77.4A32 36 0 1 1 73.2 26.6Z")
def T():
    return 66, "M0 0H66V14H40V100H26V14H0Z"

GLYPH = dict(V=V, A=A, L=L, D=D, O=O, R=R, I=I, G=G, T=T)
KERN = {("V","A"): -10, ("A","L"): 2, ("O","R"): 2, ("R","I"): 4, ("L","D"): 2,
        ("I","T"): 0, ("T","A"): -6, ("D","I"): 2, ("I","G"): 0, ("G","I"): 0}

def word(text, track=16):
    x, parts = 0.0, []
    for i, ch in enumerate(text):
        w, d = GLYPH[ch]()
        if i:
            x += track + KERN.get((text[i-1], ch), 0)
        parts.append(f'<path transform="translate({x:g} 0)" d="{d}"/>')
        x += w
    return x, "".join(parts)

# Monogram: "Step V" — sol kol tam, sağ kol bir adım yukarı kaymış ve ember renkte (büyüme + dijital ivme)
def symbol(c_left, c_right, c_px):
    left = "M0 18H22L48 112H26Z"
    right = "M70 0H92L60 112H38Z"
    return (f'<path fill="{c_left}" d="{left}"/>'
            f'<path fill="{c_right}" d="{right}"/>'
            f'<rect fill="{c_px}" x="98" y="0" width="14" height="14"/>'), 112, 112

def svg(w, h, body, title, pad=0, bg=None):
    vb = f"{-pad:g} {-pad:g} {w+2*pad:g} {h+2*pad:g}"
    bgr = f'<rect x="{-pad:g}" y="{-pad:g}" width="{w+2*pad:g}" height="{h+2*pad:g}" fill="{bg}"/>' if bg else ""
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb}" width="{(w+2*pad)*4:g}" height="{(h+2*pad)*4:g}" '
            f'role="img" aria-label="{title}"><title>{title}</title>{bgr}{body}</svg>\n')

def write(name, content):
    with open(os.path.join(SVG, name), "w") as f:
        f.write(content)

themes = {
    "color": (INK, EMBER, EMBER, INK),          # açık zemin
    "color-reverse": (BONE, EMBER, EMBER, BONE),# koyu zemin
    "ink": (INK, INK, INK, INK),
    "white": ("#FFFFFF",)*4,
}

ww, wpaths = word("VALDORI")
dw, dpaths = word("DIGITAL", track=22)
ds = 0.2  # descriptor ölçeği

for t, (cl, cr, cp, txt) in themes.items():
    sym, sw, sh = symbol(cl, cr, cp)
    write(f"valdori-symbol-{t}.svg", svg(sw, sh, sym, "Valdori Digital"))
    write(f"valdori-wordmark-{t}.svg", svg(ww, 100, f'<g fill="{txt}" fill-rule="nonzero">{wpaths}</g>', "Valdori"))
    # Yatay lockup: sembol + wordmark + DIGITAL
    sc = 100/112
    gap = 44
    wx = sw*sc + gap
    desc_y = 100 + 22
    body = (f'<g transform="scale({sc:.5f})">{sym}</g>'
            f'<g transform="translate({wx:g} 0)" fill="{txt}" fill-rule="nonzero">{wpaths}</g>'
            f'<g transform="translate({wx:g} {desc_y}) scale({ds})" fill="{txt}" fill-rule="nonzero">{dpaths}</g>')
    write(f"valdori-logo-horizontal-{t}.svg", svg(wx+ww, desc_y+100*ds, body, "Valdori Digital"))
    # Dikey lockup
    W = max(ww, dw*ds*1.6)
    ssz = 160
    sx = (W-ssz)/2
    wy = ssz + 56
    dsc = ds*1.6
    body = (f'<g transform="translate({sx:g} 0) scale({ssz/112:.5f})">{sym}</g>'
            f'<g transform="translate({(W-ww)/2:g} {wy})" fill="{txt}" fill-rule="nonzero">{wpaths}</g>'
            f'<g transform="translate({(W-dw*dsc)/2:g} {wy+100+30}) scale({dsc})" fill="{txt}" fill-rule="nonzero">{dpaths}</g>')
    write(f"valdori-logo-stacked-{t}.svg", svg(W, wy+130+100*dsc, body, "Valdori Digital"))

# App ikonu / favicon (zeminli kare)
for name, bg, (cl, cr, cp) in [("valdori-appicon-dark.svg", INK, (BONE, EMBER, EMBER)),
                               ("valdori-appicon-light.svg", BONE, (INK, EMBER, EMBER)),
                               ("valdori-appicon-ember.svg", EMBER, (INK, INK, INK))]:
    sym, sw, sh = symbol(cl, cr, cp)
    body = f'<rect width="512" height="512" rx="112" fill="{bg}"/><g transform="translate(116 116) scale({280/112:.5f})">{sym}</g>'
    write(name, f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512"><title>Valdori Digital</title>{body}</svg>\n')

json.dump({"ink": INK, "bone": BONE, "ember": EMBER}, open(os.path.join(ROOT, "tokens.json"), "w"), indent=2)
print("ok", sorted(os.listdir(SVG)))

# Favicon: küçük boyutlarda okunabilirlik için sıkı kadraj
sym, _, _ = symbol(BONE, EMBER, EMBER)
write("valdori-favicon.svg", f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512"><title>Valdori Digital</title><rect width="512" height="512" rx="96" fill="{INK}"/><g transform="translate(60 60) scale({392/112:.5f})">{sym}</g></svg>\n')

# OG / sosyal paylaşım görseli 1200x630
symc, _, _ = symbol(BONE, EMBER, EMBER)
sc = 1.6
og = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630"><title>Valdori Digital</title>'
      f'<rect width="1200" height="630" fill="{INK}"/>'
      f'<g transform="translate(96 96) scale(0.9)">{symc}</g>'
      f'<g transform="translate(96 {630-96-100*sc-56}) scale({sc})" fill="{BONE}">{wpaths}</g>'
      f'<g transform="translate(98 {630-96-20}) scale(0.2)" fill="{EMBER}">{dpaths}</g>'
      f'<rect x="{1200-96-14}" y="{630-96-14}" width="14" height="14" fill="{EMBER}"/></svg>\n')
write("valdori-og-image.svg", og)
