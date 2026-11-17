# Ajan PR incelemeleri

Ajanların açtığı her PR'ın inceleme sonucu buraya yazılır. Kurallar: AGENTS.md bölüm 11.

| Tarih | PR | Issue | Risk | Ajan / model | Karar | Neden |
|---|---|---|---|---|---|---|
| 2026-11-16 | [#76](https://github.com/halilkolge/martrin/pull/76) | #4 | yeşil | opencode / deepseek-v4.1-flash-free | Kabul, 1 düzeltmeyle | 10/10 EVAL yeniden çalıştırıldı ve geçti, iddialarda uydurma yok. P2: exFAT önbellek ayarı herkese uygulanmış, ortam değişkenine bağlanacak. [İnceleme](https://github.com/halilkolge/martrin/pull/76#issuecomment-6931040224) |
| 2026-11-17 | [#76](https://github.com/halilkolge/martrin/pull/76) | #4 | yeşil | opencode / deepseek-v4.1-flash-free | Kabul, birleştirmeye hazır | Düzeltme 2fc017f doğrulandı: önbellek ayarı `MARTRIN_DISABLE_TURBO_CACHE=1` ile açılıyor; lint, typecheck, test, format:check ve build yeniden çalıştırıldı, hepsi geçti. |
| 2026-11-17 | [#77](https://github.com/halilkolge/martrin/pull/77) | #5 | yeşil | opencode / deepseek-v4.1-flash-free | Kabul | 7/7 EVAL yeniden kontrol edildi; CI'da checks ve e2e yeşil, e2e işinde pnpm önbellek isabeti var. Kapsam dışı değişiklik ve uydurma yok. [İnceleme](https://github.com/halilkolge/martrin/pull/77#issuecomment-6933308024) |
| 2026-11-17 | [#78](https://github.com/halilkolge/martrin/pull/78) | #8 | sarı | opencode / deepseek-v4.1-flash-free | Kabul, 2 düzeltmeyle | 7/7 EVAL yeniden çalıştırıldı ve geçti, sayılar doğru, uydurma yok. P2: beforeSend istek adresi, breadcrumb verisi, extra ve contexts alanlarını maskelemiyor (görev tanımındaki eksik). P3: Sentry derleme telemetrisi kapatılacak. [İnceleme](https://github.com/halilkolge/martrin/pull/78#issuecomment-6934076530) |
