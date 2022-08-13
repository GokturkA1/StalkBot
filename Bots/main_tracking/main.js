let { Main } = require('../../Clients/Global.Main.Client')
let options = require('../../Settings/_system')
const settings = require("../../Settings/_system")

let client = global.client = new Main(options.main)

client.on('ready', async () => {
  client.guilds.cache.map(async (x) => {
    await x.members.fetch().then(guild => { })
  })
})

client.fetchCommands()
client.fetchEvents()
client.connect()
