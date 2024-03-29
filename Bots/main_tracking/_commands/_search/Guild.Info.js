let Discord = require('discord.js-selfbot-v13');
let { Stats, Seens } = require('../../../../Databases/Tracking');
let { MessageEmbed } = require('discord.js');
const util = require('util');
module.exports = {
    name: "sunucubilgi",
    aliases: ["sunucu"],
    permissions: ["OWNER"],
    category: "",
    description: "",
    usage: "",

    onload: async function (client) {
        
    },

     /**
    * @param {Client} client 
    * @param {Message} message 
    * @param {Array<String>} args 
    */
    
    onRequest: async function (client, message, args) {
        //let guild = client.guilds.cache.find(x => x.name.includes(args[0]) || x.id == args[0])
        const Trackers = global.tracker.Trackers;

        const mainGuilds = client.guilds.cache;
        const mainGuildsArray = Array.from(mainGuilds.values())
        const clientGuilds = Trackers.map(c => c.guilds.cache);
        const clientGuildsArray = clientGuilds.map(a => {return clientGuilds.concat.apply([], Array.from(a.values()))});
        const trackerGuilds = clientGuildsArray.concat.apply([], clientGuildsArray.map(a => a));
        const allGuilds = trackerGuilds.concat.apply(trackerGuilds, mainGuildsArray)

        let guild = allGuilds.find(x => x.name.includes(args[0]) || x.id == args[0]) || client.guilds.cache.get(args[0]);
        if(!guild) return message.reply("Sunucu bulunamadı.").then((msg) => {
            setTimeout(() => {
                msg.delete().catch(err => {})
            }, 7500);
        })
        //guild info
        message.channel.send(`Aşağıda **${guild.name}** sunucusunun bilgileri bulunmaktadır:
\` ❯ \` **Sunucu Adı**: **\` ${guild.name} \`**
\` ❯ \` **Sunucu ID**: **\` ${guild.id} \`**
\` ❯ \` **Sunucu Sahibi**: <@!${guild.ownerId}>
\` ❯ \` **Sunucu Sahibi ID**: **\` ${guild.ownerId} \`**
\` ❯ \` **Sunucu Rol Sayısı**: **\` ${guild.roles.cache.size} \`**
\` ❯ \` **Sunucu Kanal Sayısı**: **\` ${guild.channels.cache.size} \`**
\` ❯ \` **Sunucu Üye Sayısı**: **\` ${guild.members.cache.size} \`**
\` ❯ \` **Sunucu Boost Sayısı**: **\` ${guild.premiumSubscriptionCount} \`** 
\` ❯ \` **Sunucu Aktif Booster Üye Sayısı**: **\` ${guild.members.cache.filter(x => x.premiumSince).size} \`**
`)
    }
}