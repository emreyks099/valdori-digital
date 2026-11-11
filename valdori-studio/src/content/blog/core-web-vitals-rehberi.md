---
title: "Core Web Vitals Rehberi: LCP, INP ve CLS Nasıl İyileştirilir?"
description: "Core Web Vitals nedir, LCP, INP ve CLS için iyi eşikler hangileridir? Ölçüm araçları, saha ve laboratuvar verisi farkı ve en etkili iyileştirmeler tek rehberde."
category: "seo"
date: "2026-10-15"
readingMinutes: 8
excerpt: "Core Web Vitals, sitenizin gerçek kullanıcılar için ne kadar hızlı, duyarlı ve kararlı olduğunu ölçen üç metriktir. Ne anlama geldiklerini, nasıl ölçüldüklerini ve nasıl iyileştirildiklerini sade bir dille anlatıyoruz."
---

Bir sayfanın “hızlı” olup olmadığı uzun süre tek bir sayıyla, yüklenme süresiyle anlatıldı. Ama kullanıcı açısından hız tek bir an değildir: İçerik ne zaman göründü? Dokunduğumda sayfa cevap verdi mi? Tam tıklayacakken düğme yerinden oynadı mı? Core Web Vitals, bu üç deneyimi ayrı ayrı ölçmek için Google'ın tanımladığı metrik setidir.

Bu metrikler Google'ın sayfa deneyimi değerlendirmesinin bir parçasıdır. Tek başlarına sıralamayı belirlemezler; alakalı ve nitelikli içeriğin yerini tutmazlar. Yine de birbirine yakın kalitedeki sayfalar arasında fark yaratabilirler ve daha önemlisi, ziyaretçinin sitede kalıp kalmayacağını doğrudan etkilerler.

## Üç metrik, üç soru

| Metrik | Ne ölçer | “İyi” eşiği |
| --- | --- | --- |
| LCP (Largest Contentful Paint) | Ana içeriğin ne kadar çabuk göründüğünü | 2,5 saniye veya altı |
| INP (Interaction to Next Paint) | Sayfanın etkileşimlere ne kadar çabuk karşılık verdiğini | 200 milisaniye veya altı |
| CLS (Cumulative Layout Shift) | Sayfa düzeninin ne kadar kararlı olduğunu | 0,1 veya altı |

Bu eşikler Google'ın yayımladığı değerlerdir. Bir sayfanın bir metrikte “iyi” sayılması için, o sayfaya yapılan ziyaretlerin en az yüzde 75'inde eşiğin tutturulması beklenir. Yani hızlı bir bilgisayarda bir kez iyi sonuç almak yeterli değildir; yavaş telefon ve zayıf bağlantı kullanan ziyaretçiler de hesaba girer.

### LCP: Ana içerik ne zaman göründü?

LCP, ekranın görünen kısmındaki en büyük öğenin — çoğu zaman bir kapak görseli ya da büyük bir başlık — ekrana çizilme süresidir. Kullanıcının “sayfa açıldı” hissine en yakın ölçüdür.

### INP: Sayfa bana cevap veriyor mu?

INP, kullanıcının tıklama, dokunma ve klavye etkileşimlerinden sonra ekranın güncellenmesine kadar geçen süreyi izler ve ziyaret boyunca yaşanan en yavaş etkileşimlere yakın bir değeri raporlar. Mart 2024'te FID (First Input Delay) metriğinin yerini almıştır. FID yalnızca ilk etkileşimin gecikmesine bakıyordu; INP ziyaretin tamamını kapsadığı için daha zorlayıcı ve daha gerçekçidir.

### CLS: İçerik yerinde duruyor mu?

CLS, sayfa öğelerinin beklenmedik biçimde yer değiştirmesini puanlar. Bir haber yazısını okurken araya giren reklam yüzünden satırı kaybetmek ya da “satın al” yerine yanlış düğmeye basmak, yüksek CLS'in günlük hayattaki karşılığıdır. Değer bir süre değil, birimsiz bir puandır.

## Saha verisi ve laboratuvar verisi aynı şey değildir

Core Web Vitals ile ilgili en yaygın karışıklık, iki farklı veri türünün birbirine karıştırılmasıdır.

**Saha verisi**, sitenizi gerçekten ziyaret eden Chrome kullanıcılarından toplanan anonim ölçümlerdir. Chrome Kullanıcı Deneyimi Raporu (CrUX) üzerinden yayımlanır ve son 28 günü kapsar. Google'ın değerlendirmede esas aldığı veri budur. Sitenizin trafiği düşükse yeterli saha verisi oluşmayabilir.

**Laboratuvar verisi**, bir aracın sayfanızı belirli bir cihaz ve bağlantı benzetimiyle tek seferde yükleyerek ürettiği ölçümdür. Tekrarlanabilir olduğu için hata ayıklamada çok işe yarar, ancak gerçek kullanıcıların çeşitliliğini yansıtmaz. Ayrıca laboratuvar testinde gerçek bir kullanıcı etkileşimi olmadığından INP ölçülemez; bunun yerine Toplam Engelleme Süresi (TBT) yol gösterici olarak kullanılır.

Bu yüzden laboratuvar puanı yüksek olup saha verisi kötü çıkan, ya da tam tersi durumda olan siteler görmek olağandır. Karar verirken saha verisine, sorunun nedenini ararken laboratuvar verisine bakın.

## Nasıl ölçülür

- **PageSpeed Insights:** Bir adres girdiğinizde üstte saha verisini (varsa), altta Lighthouse ile üretilen laboratuvar sonuçlarını ve iyileştirme önerilerini gösterir. Tek bir sayfayı hızlıca incelemek için en pratik araçtır.
- **Search Console:** Önemli Web Verileri raporu, sitenizdeki adresleri mobil ve masaüstü için “iyi”, “iyileştirme gerekiyor” ve “zayıf” olarak gruplar. Benzer sayfaları birlikte gösterdiği için sorunun tek bir sayfada mı yoksa bir şablonun tamamında mı olduğunu anlamanızı sağlar.
- **Tarayıcı geliştirici araçları:** Chrome'un Performans paneli, hangi öğenin LCP sayıldığını, hangi betiğin etkileşimi geciktirdiğini ve hangi öğenin kaydığını adım adım gösterir.
- **Kendi ölçümünüz:** Trafiği yüksek sitelerde, gerçek kullanıcı ölçümlerini kendi analiz sisteminize kaydetmek en ayrıntılı görüntüyü verir.

Ölçerken iki şeye dikkat edin. Birincisi, yalnızca ana sayfayı test etmeyin; ürün, kategori ve blog sayfaları çoğu zaman farklı davranır ve trafiğin büyük kısmı oraya gelir. İkincisi, mobil sonuçları öncelikli sayın; sorunların çoğu orada ortaya çıkar.

## Tipik iyileştirmeler

### LCP için

- LCP öğesi bir görselse, onu doğru boyutta ve WebP ya da AVIF gibi modern bir biçimde sunun.
- Kapak görseline tembel yükleme (lazy loading) uygulamayın; tarayıcıya bu görselin öncelikli olduğunu bildirin.
- Sunucu yanıt süresini kısaltın: önbellekleme, içerik dağıtım ağı ve gereksiz yönlendirmelerin kaldırılması burada etkilidir.
- Sayfanın çizilmesini engelleyen stil ve betik dosyalarını azaltın; ilk ekran için gerekmeyenleri erteleyin.
- Kapak alanını istemci tarafında sonradan oluşturan yapılardan kaçının; ana içerik HTML ile birlikte gelsin.

### INP için

- Sayfaya yüklenen JavaScript miktarını azaltın. Kullanılmayan kütüphaneler ve eklentiler en sık rastlanan nedendir.
- Uzun süren işleri küçük parçalara bölün ki tarayıcı arada kullanıcıya cevap verebilsin.
- Üçüncü taraf betiklerini gözden geçirin: sohbet pencereleri, izleme kodları, reklam etiketleri. Her biri gerçekten gerekli mi?
- Sayfadaki öğe sayısını makul tutun; aşırı büyük bir sayfa yapısı her güncellemeyi yavaşlatır.
- Etkileşimden hemen sonra görsel bir geri bildirim verin; ağır işi arkasından yapın.

### CLS için

- Görsel ve videolara genişlik ile yükseklik değerlerini verin ki tarayıcı yer ayırabilsin.
- Reklam, gömülü içerik ve sonradan yüklenen bileşenler için önceden alan bırakın.
- Çerez bildirimi ya da kampanya şeridi gibi öğeleri mevcut içeriği aşağı itecek biçimde eklemeyin.
- Web yazı tiplerinin yüklenmesi sırasında metnin sıçramasını önlemek için yedek yazı tipini boyut olarak asıl yazı tipine yaklaştırın.
- Hareket efektlerinde düzeni etkilemeyen özellikleri (transform gibi) tercih edin.

## Nereden başlamalı

Her uyarıyı tek tek kapatmaya çalışmak yorucu ve çoğu zaman verimsizdir. Daha iyi bir sıra şöyle:

1. Search Console'da hangi sayfa gruplarının hangi metrikte sorunlu olduğuna bakın.
2. En çok trafik alan ya da en çok gelir getiren şablonu seçin.
3. O şablondan bir sayfayı PageSpeed Insights ve geliştirici araçlarıyla inceleyip asıl nedeni bulun.
4. Düzeltmeyi yapın, laboratuvar testinde doğrulayın.
5. Saha verisinin güncellenmesini bekleyin; 28 günlük pencere nedeniyle iyileşme rapora hemen yansımaz.

Sorunların önemli bir kısmı tek tek sayfalardan değil, sitenin kurulma biçiminden kaynaklanır: ağır bir tema, üst üste eklenmiş eklentiler, denetimsiz çoğalan izleme kodları. Böyle durumlarda yama yapmak yerine altyapıyı ele almak gerekir ve bu, [web tasarım](/hizmetler/web-tasarim) kararlarıyla doğrudan ilgilidir.

Core Web Vitals bir kez geçilip unutulacak bir sınav değildir; siteye eklenen her yeni görsel, betik ve bileşenle yeniden şekillenir. Ölçümleri düzenli izlemek ve performansı tasarım kararlarının parçası hâline getirmek, sonradan düzeltmekten çok daha kolaydır. Teknik tarafı kapsamlı bir çalışmanın parçası olarak ele almak isterseniz [SEO hizmetimizi](/hizmetler/seo) inceleyebilirsiniz.
