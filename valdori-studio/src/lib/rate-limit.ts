/**
 * Bellek içi kayan pencere hız sınırlayıcı.
 * Not: Sunucusuz ortamda her işlev örneği kendi belleğini tutar; bu yüzden koruma
 * "en iyi çaba" düzeyindedir. Yoğun kötüye kullanım için paylaşımlı bir depo
 * (ör. Redis) ya da platformun kendi hız sınırlaması önerilir. Bkz. README.
 */
const hits = new Map<string, number[]>();

export function rateLimit(key: string, limit: number, windowMs: number, now = Date.now()): boolean {
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  if (recent.length >= limit) {
    hits.set(key, recent);
    return false;
  }
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) {
    for (const [k, v] of hits) {
      if (v.every((t) => now - t >= windowMs)) hits.delete(k);
    }
  }
  return true;
}
