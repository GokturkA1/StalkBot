module.exports = {
    apps: [
      {
        name: "StalkBots",
        namespace: "GokturkA",
        script: 'main.js',
        watch: false,
        exec_mode: "cluster",
        max_memory_restart: "2G",
        cwd: "./"
      }
    ]
}