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