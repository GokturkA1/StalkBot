
module.exports = {

    name: "ready",

    /**
     * @param {Message} message
     * @returns {Promise<void>}
     */
    onLoad: async function (message) {
	client.user.setStatus("invisible", [0]) 
        client.guilds.cache.map(x => {
		x.members.fetch()
	})     
    
    }
}
