# Ajan görevi şablonu

Bir issue'yu kodlama ajanına vermeden önce issue gövdesine aşağıdaki bölüm eklenir. Ajan yalnızca bu bölümde yazanı yapar. Muğlak ifade kullanma: her madde tek anlamlı ve doğrulanabilir olmalı.

```markdown
## Ajan görevi

**Önkoşul:** #<önce bitmesi gereken issue'lar> (yoksa "Yok")
**Tahmini boyut:** <en fazla ~400 satır değişiklik; daha büyükse issue'yu böl>

### Bağlam
<2–5 cümle: bu iş neden var, hangi ekran ya da akışın parçası, prototipte nerede görülür>

### Kapsam
Yapılacak:
- <somut çıktı 1>
- <somut çıktı 2>

Yapılmayacak:
- <kapsam dışı olan ve ajanın yapmaya meyilli olabileceği şeyler>

### Dosyalar
- Oluştur: `<yol>`
- Değiştir: `<yol>`
- Dokunma: `<yol>` (gerekirse)

### Adımlar
1. <sırayla, tek eylemli adımlar>
2. ...

### Veri ve arayüz sözleşmesi
<tipler, uç nokta imzası, örnek istek/yanıt, doğrulama kuralları, hata kodları; arayüz işiyse metinler ve durumlar (boş, yükleniyor, hata)>

### EVAL
| # | Kontrol | Nasıl doğrulanır | Beklenen |
|---|---|---|---|
| EVAL-1 | <ne> | `<komut>` ya da `<test dosyası>` | <tam beklenen sonuç> |
| EVAL-2 | ... | ... | ... |

### DoD (bu işe özel)
- [ ] <madde>
- [ ] AGENTS.md'deki genel DoD maddeleri

### Teslim
- Dal: `feat/<no>-<kisa-ad>`
- PR başlığı: `[<kod>] <başlık>`
- PR açıklamasında `Closes #<no>` ve her EVAL'in sonucu
```

## İyi bir EVAL maddesi

- **İyi:** "`pnpm test src/lib/format-try.test.ts` geçer; `formatTRY(149000)` çıktısı `₺1.490` olur."
- **Kötü:** "Fiyat biçimlendirme düzgün çalışır."
- Her kabul kriteri en az bir EVAL'e karşılık gelir.
- Hatalı girdi, boş durum ve yetkisiz erişim için de EVAL yazılır.
