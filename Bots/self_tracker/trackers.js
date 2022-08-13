let { Trackers } = require('../../Clients/Global.Trackers.Client')
let options = require('../../Settings/_system')

let tracker = global.tracker = new Trackers(options.trackers)

tracker.Trackers.map(c => {
  c.on('ready', (cl) => {
    cl.guilds.cache.map(async (x) => {
      await x.members.fetch().then(guild => { })
    })
  })
})

tracker.startTrackerConnection()
