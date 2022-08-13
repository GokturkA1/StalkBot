# Çok Tokenli Stalk Botu

Altyapı tamamen bana ait değildir. Ben yalnızca bazı eklemeler yaptım. Orijinal altyapı [acarfx](https://github.com/acarfx)'e aittir. [Asıl altyapı](https://github.com/acarfx/sorgucu-orhan) tek tokenli ve selfbot olarak kullanılıyor ancak bu altyapıda minimum 2 token gerekiyor ve tokenlerden biri bot olmak zorunda. 

## Dikkat!

Selfbot olarak kullandığınız hesaplar devre dışı bırakılabilir. Lütfen kullanırken dikkat edin. Ve hesaplarınızın devre dışı bırakılmasından ben sorumlu değilim.

## Kurulum
Modülleri kurmak için:
```cmd
npm install
```
Ayarlar için Settings/_system.js dosyasının içerisinde bulunan alanları doldurun
```js
const mainOptions = {
    status: "invisible", //Botların Durumu
    MongoURI: "mongodb://127.0.0.1/StalkBot", //Atlas veya local fark etmez
    owners: [], //Komutların Kullanılmasına İzin Verilen Kişiler
    prefix: [".","!"]
}
const options = {
    main: {
        token: "", //Bot tokeni. Yalnızca bot tokeni girin aksi takdirde hata verecektir
        MongoURI: mainOptions.MongoURI,
        prefix: mainOptions.prefix,
        owners: mainOptions.owners,
        status: mainOptions.status
    },
    trackers: {
        tokens: [""], //Selfbot tokenleri. Yalnızca hesap tokenlerini girin aksi takdirde hata verecektir.
        MongoURI: mainOptions.MongoURI,
        status: mainOptions.status,
        prefix: mainOptions.prefix,
        active: true
    },
}
module.exports = options
```
Botu başlatmak için:
```cmd
npm run start
```
Yalnızca gözlemci botları başlatmak için:
```cmd
npm run start:trackers
```
Yalnızca sorgulama botunu başlatmak için:
```cmd
npm run start:main
```
Botu pm2 ile başlatmak için:
```cmd
pm2 start ecosystem.config.js
```
Komutlarını kullanabilirsiniz
## Örnekler
![image](https://user-images.githubusercontent.com/64871040/184498002-4f190859-21e6-411e-b107-9ef413bc2232.png)
## Lisans
[MIT](https://choosealicense.com/licenses/mit/)
