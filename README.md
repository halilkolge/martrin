# martrin: Marketing Vitrine

## gRPC-Flix Project Reference
```mermaid
graph TD;
    Z[End-User];
    0[Aggregator];
    1[UserService];
    2[MovieService];
    3[H2-UserService];
    4[H2-MovieService];

    Z-->|ReST|0;
    0-->|gRPC|1;
    0-->|gRPC|2;
    1-->|embedded|3;
    2-->|embedded|4;
```

## Phase-1: Monolith Starter
 - Persistence: PostgreSQL
 - Backend: .Net Core
 - WebUI: JQuery Ajax
 

```mermaid
graph TD;
    Z[End-User];
    A[WebUI:Jquery];
    B[Backend:.Net Core#Microservice];
    C[PostgreSQL];

    1[AuthenticationService];
    2[UserService];
    3[RoleService];
    4[PermissionService];
    5[ProductService];
    6[OrderService];
    7[OrderItemService];

    12[Table:User];
    13[Table:Role];
    14[Table:Permission];
    15[Table:Product];
    16[Table:Order];
    17[Table:OrderItem];

    Z-->|Web|A;
    A-->|ReST|B;

    B-->|runtime|1;
    B-->|runtime|2;
    B-->|runtime|3;
    B-->|runtime|4;
    B-->|runtime|5;
    B-->|runtime|6;
    B-->|runtime|7;

    1-->|jdbc|C;
    2-->|jdbc|C;
    3-->|jdbc|C;
    4-->|jdbc|C;
    5-->|jdbc|C;
    6-->|jdbc|C;
    7-->|jdbc|C;

    C-->|db|12;
    C-->|db|13;
    C-->|db|14;
    C-->|db|15;
    C-->|db|16;
    C-->|db|17;
```

# Pages
## Home Page
    - Bar --> 
    Anasayfa  
    Kategori  --> Infulencer (Gıda, Giyim, ) Bilbord Avm Sinema Araç giydirma Televizyon
    Hakkımızda
    İletişim
    Giriş Yap
    Kayıt ol

    slider olacak (her sayfada bilbord avm infulencer gibi seçenekler gösterilecek)
    Video -- Şirketin tanıtımı  -- Müşteri ağzından tanıtım
    Reklam vermenin avantajları ile ilgili metin bilgileri
    Turbo reklam ile 6 card ile reklam altında tümünü gör 

    Müşteri yorumları 

    Referasnlarımız
    
## Infulencer Page
    
