![banner](https://i.postimg.cc/zfkFXrK2/Azizdev-1-2.png "banner")

<div align="center">
<h1>Node js-da Eskiz tizimi SMS-xabarlarini integratsiya qilish</h1>
</div>

Ushbu repozitoriyda mobil aloqa operatorlariga SMS-xabarlarini yuborishning qanday amallar ko'dini o'rgatuvchi tayyor kodlar mavjud.

Bu kodlar quyidagi xizmat integratsiyalarini o'z ichiga oladi:

- Eskiz - Internetdagi o'zingiz uchun joy bron qiling. [Rasmiy sayti](https://eskiz.uz/)

## O'rnatish
Github'dan loyihani klonlashtiring:
```console
git clone https://github.com/azizdevfull/eskiz-uz-nodejs.git
```

SMS-xizmatlarining ishlashi uchun kerakli barcha paketlarni o'rnatib olasiz:
```bash
npm install
```

## [Eskiz.uz](https://eskiz.uz/) integratsiyasi

Eskiz xizmati orqali integratsiyani boshlash uchun sizga `ESKIZ_EMAIL` va `ESKIZ_PASSWORD` kerak bo'ladi. Bu ma'lumotni [ kompaniya bilan shartnoma yopishdan keyin](https://eskiz.uz/reseller) olishingiz mumkin.

Kerakli kalitlarni olishdan keyin, ularni yozib olish uchun `.env` faylini yaratishingiz kerak yoki tayyor shablonni `env.example` nusxalab olasiz:
```console
cp env.example .env
```

`ESKIZ_EMAIL` va `ESKIZ_PASSWORD` maydonlarini to'ldiring

`index.js` fayliga o'ting va `phone_number` o'zgaruvchisida telefon raqamingizni kiritng


### Birinchi SMS-xabarni yuborishga tayyormisiz?
```console
node index.js
```

Qo'shimcha ma'lumot uchun [bu havolaga](https://documenter.getpostman.com/view/663428/RzfmES4z?version=latest) o'ting

### Foydali havolalar

- Rasmiy sayt - https://eskiz.uz
- Shaxsiy kabinet - https://my.eskiz.uz/dashboard
- Balansni tekshirish - https://my.eskiz.uz/sms
- Dasturchi qo'llanmasy - https://documenter.getpostman.com/view/663428/RzfmES4z?version=latest


## Muallif
[Isroilov Azizbek](https://t.me/isroilov_azizbek)


