let Discord = require('discord.js-selfbot-v13');
let { Stats, Seens } = require('../../../../Databases/Tracking');
let { MessageEmbed, Util } = require('discord.js');
const util = require('util');
module.exports = {
    name: "sunucusırala",
    aliases: ["sunuculistele", "sunuculiste", "sunucular"],
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

        let guilds = allGuilds.map((x , index)=> ` ${x.id} | ${x.name}`).join("\n")
        message.channel.send({content: `\`\`\`${guilds}\`\`\``}).catch(err => {
            const arr = Util.splitMessage(`${guilds}`, { maxLength: 1950, char: "\n" });
            arr.forEach(element => {
                message.channel.send({content: `\`\`\`${element}\`\`\``});
            });
        })
    }
}