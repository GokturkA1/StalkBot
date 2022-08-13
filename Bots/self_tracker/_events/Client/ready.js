
module.exports = {

    name: "ready",

    /**
     * @param {Message} message
     * @returns {Promise<void>}
     */
    onLoad: async function (client) {
	client.user.setStatus("invisible", [0]) 
        client.guilds.cache.map(x => {
		x.members.fetch()
	})     
    
    }
}
