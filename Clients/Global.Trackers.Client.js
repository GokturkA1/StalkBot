const { Client, Collection, Intents, Options } = require('discord.js-selfbot-v13');
const mongoose = require('mongoose');
const { bgBlue, black, green } = require("chalk");
const fs = require('fs');
const logs = require('discord-logs');

class Trackers extends Client {

    constructor(options) {
        super({
            options,
            intents: [32767, "GUILD_MEMBERS", new Intents(32767), Intents.FLAGS.GUILD_MEMBERS],
            fetchAllMembers: true,
            shard: "auto",
            checkUpdate: false
        }) 
        this.tokens = options.tokens
        this.MongoURI = options.MongoURI
        this.status = options.status || "invisible"
        this.prefix = options.prefix || ["."]
        this.active = options.active || true
        logs(this) // Basitleştirilmiş logları ekler.
        this.on("guildUnavailable", async (guild) => { console.log(`[UNAVAIBLE]: ${guild.name}`) })
        .on("disconnect", () => console.log("Bot is disconnecting...", "disconnecting"))
        .on("reconnecting", () => console.log("Bot reconnecting...", "reconnecting"))
        .on("error", (e) => console.log(e, "error"))
        .on("warn", (info) => console.log(info, "warn"));
        this.Trackers = []
        this.timing = (duration) => {  
            let arr = []
            if (duration / 3600000 > 1) {
              let val = parseInt(duration / 3600000)
              let durationn = parseInt((duration - (val * 3600000)) / 60000)
              arr.push(`${val} Saat`)
              arr.push(`${durationn} Dk.`)
            } else {
              let durationn = parseInt(duration / 60000)
              arr.push(`${durationn} Dk.`)
            }
            return arr.join(", ") 
        };
        
    }

   
    /*
    async fetchEvents(active = true) {
        if(!active) return;
        let dirs = fs.readdirSync('./Bots/self_tracker/_events', { encoding: "utf8" });
        dirs.forEach(dir => {
            let files = fs.readdirSync(`./Bots/self_tracker/_events/${dir}`, { encoding: "utf8" }).filter(file => file.endsWith(".js"));
            files.forEach(file => {
                let referans = require(`../Bots/self_tracker/_events/${dir}/${file}`);
                this.Trackers.map(c => {
                c.on(referans.name, referans.onLoad);
                })
            });
        });
     }
    */


    async startTrackerConnection(tokens = this.tokens, status = this.status, active = this.active) {
        if(!active) return console.log(`Gözlemciler Aktif Değil. Yalnızca Kayıtlı Verilere Ulaşabilirsiniz. (Sunucu ve kanal isimleri gözükmeyebilir.)`);
        let dirs = fs.readdirSync('./Bots/self_tracker/_events', { encoding: "utf8" });
        if(this.MongoURI) {
            await mongoose.connect(this.MongoURI, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }).then(async (a) => {
                console.log(`[MONGODB-TRACKERS] Bağlantı Sağlandı: ${this.MongoURI}`);
                tokens.map(async (t) => {
                const botClient = new Client({
                    intents: [32767, "GUILD_MEMBERS", new Intents(32767), Intents.FLAGS.GUILD_MEMBERS],
                    fetchAllMembers: true,
                    shard: "auto",
                })
                await botClient.login(t)
                .then(a => {
                    console.log(`[MONGODB-TRACKERS] Bağlantı Sağlandı: ${botClient.user.tag}`);
                }).catch(err => {
                    console.log(`[TRACKERS] ${tokens.indexOf(t)}. Sırasındaki Jeton İçin Bağlantı Hatası: ${err}`)
                })
                dirs.forEach(dir => {
                    let files = fs.readdirSync(`./Bots/self_tracker/_events/${dir}`, { encoding: "utf8" }).filter(file => file.endsWith(".js"));
                    files.forEach(file => {
                        let referans = require(`../Bots/self_tracker/_events/${dir}/${file}`);
                        botClient.on(referans.name, referans.onLoad);
                    });
                });
                botClient.user.setStatus(status)
                logs(botClient)
                this.Trackers.push(botClient)
                })
            }).catch(err => {
                console.log("[MONGODB-TRACKERS] Bağlantı Hatası: " + err);
                process.exit();
            })
        }
    }
}

module.exports = { Trackers }