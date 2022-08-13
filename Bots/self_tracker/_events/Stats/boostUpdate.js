const { Message } = require('discord.js-selfbot-v13');
let { Stats, Seens } = require('../../../../Databases/Tracking');
const trackers = global.tracker.Trackers;

module.exports = {

    name: "guildMemberBoost",

    /**
     * @param {Message} message 
     * @returns {Promise<void>}
     */
    
    onLoad: async function (member) {
        if(!member) return;
        if(!member.user) return;
        if(member.user.bot) return;
        const user = member.user;

        await Seens.updateOne({userID: user.id}, {
            $set: {
                lastSeen: Date.now(),
                lastType: `BOOST`,
                guildID: member.guild.id,
                lastBoost: Date.now(),
                lastBoostGuild: member.guild.id,
            },
            $push: {
                lastBoosts: {
                    date: Date.now(),
                    guild: member.guild.id,
                }
            }
        }, {upsert: true});
      
    }
}

trackers.map(c => {
    c.on("guildMemberUnboost", async (member) => {
        if(!member) return;
        if(!member.user) return;
        if(member.user.bot) return;
        await Seens.updateOne({userID: user.id}, {
            $set: {
                lastSeen: Date.now(),
                lastType: `UNBOOST`,
                guildID: member.guild.id,
                lastUnboost: Date.now(),
                lastUnboostGuild: member.guild.id,
            },
            $push: {
                lastUnboosts: {
                    date: Date.now(),
                    guild: member.guild.id,
                }
            }
        }, {upsert: true});
    });
})