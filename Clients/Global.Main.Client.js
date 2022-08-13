const {/* Client,*/ Collection, Intents, Options } = require('discord.js-selfbot-v13');
const { Client } = require("discord.js");
const mongoose = require('mongoose');
const { bgBlue, black, green } = require("chalk");
const fs = require('fs');
const logs = require('discord-logs');

class Main extends Client {

    constructor(options) {
        super({
            options,
            intents: [32767/*, "GUILD_MEMBERS", new Intents(32767), Intents.FLAGS.GUILD_MEMBERS*/],
            fetchAllMembers: true,
            shard: "auto",
        }) 
        this.token = options.token
        this.MongoURI = options.MongoURI
        this.commands = new Collection()
        this.aliases = new Collection()
        this.status = options.status || "invisible"
        this.prefix = options.prefix || ["."]
        this.owners = options.owners || ["548627876853972997"]
        logs(this) // Basitleştirilmiş logları ekler.
        this
        .on("guildUnavailable", async (guild) => { console.log(`[UNAVAIBLE]: ${guild.name}`) })
        .on("disconnect", () => console.log("Bot is disconnecting...", "disconnecting"))
        .on("reconnecting", () => console.log("Bot reconnecting...", "reconnecting"))
        .on("error", (e) => console.log(`[MAIN-CLIENT ERROR]: :: \n`, e))
        .on("warn", (info) => console.log(`[MAIN-CLIENT WARN]: :: \n`, info));

        process.on("unhandledRejection", (err, promise) => { console.log(`[CAUTION]: :: \n`, err, `\n [PROMISE]: :: \n`, promise) });
        process.on("warning", (warn) => { console.log(`[WARN]: :: \n`, warn) });
        process.on("beforeExit", () => { console.log('Sistem kapatılıyor...'); });
        process.on('uncaughtExceptionMonitor', (err, origin) => { console.log(`[EX-ERR]: :: \n`, err, `\n [ORIGIN]: :: \n`, origin); });
        process.on('multipleResolves', (type, promise, reason) => { console.log(`[CAUTION]: :: \n`, type, `\n [PROMISE]: :: \n`, promise, `\n [REASON]: :: \n`, reason); });
        process.on("uncaughtException", err => {
            const hata = err.stack.replace(new RegExp(`${__dirname}/`, "g"), "./");
                console.error(`[EX-ERR]: :: \n`, hata);
               // process.exit(1);
        });
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

   
    

    async fetchEvents(active = true) {
        if(!active) return;
        let dirs = fs.readdirSync('./Bots/main_tracking/_events/', { encoding: "utf8" });
        dirs.forEach(dir => {
            let files = fs.readdirSync(`./Bots/main_tracking/_events/${dir}/`, { encoding: "utf8" }).filter(file => file.endsWith(".js"));
            files.forEach(file => {
                let referans = require(`../Bots/main_tracking/_events/${dir}/${file}`);
                this.on(referans.name, referans.onLoad);
            });
        });
     }

    async fetchCommands(active = true) {
        if(!active) return;
        let dirs = fs.readdirSync("./Bots/main_tracking/_commands", { encoding: "utf8" });
        console.log(`${black.bgHex('#D9A384')("MAIN-TRACKING")} ${dirs.length} category in client loaded.`);
        dirs.forEach(dir => {
            let files = fs.readdirSync(`./Bots/main_tracking/_commands/${dir}`, { encoding: "utf8" }).filter(file => file.endsWith(".js"));
            console.log(`${black.bgHex('#D9A384')("MAIN-TRACKING")} ${files.length} commands loaded in ${dir} category.`);
            files.forEach(file => {
                let referans = require(`../Bots/main_tracking/_commands/${dir}/${file}`);
                if(referans.onLoad != undefined && typeof referans.onLoad == "function") referans.onLoad(this);
                this.commands.set(referans.name, referans);
                if (referans.aliases) referans.aliases.forEach(alias => this.aliases.set(alias, referans));
            });
        });
    }
    
    async connect(token = this.token, status = "invisible") {
        if(this.MongoURI) {
            await mongoose.connect(this.MongoURI, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }).then(async (a) => {
                console.log(`[MONGODB-MAIN] Bağlantı Sağlandı: ${this.MongoURI}`);
                await this.login(token)
                .then(a => {
                    console.log(`[MAIN] Bağlantı Sağlandı: ${this.user.tag}`);
                }).catch(err => {
                    console.log(`[MAIN] Bağlantı Hatası: ${err}`);
                    process.exit();
                })
                this.user.setStatus(status)
            }).catch(err => {
                console.log("[MONGODB-MAIN] Bağlantı Hatası: " + err);
                process.exit();
            })
        }
    }
}

module.exports = { Main }