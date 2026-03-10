const bedrock = require("bedrock-protocol")

function startBot() {

  const client = bedrock.createClient({
    host: "modernnet.falix.gg",
    port: 20299,
    username: "AFK_Bot",
    offline: true
  })

  client.on("join", () => {
    console.log("Bot joined the server")

    // random movement
    setInterval(() => {
      const yaw = Math.random() * 360

      client.queue("player_auth_input", {
        pitch: 0,
        yaw: yaw,
        headYaw: yaw,
        position: { x: 0, y: 0, z: 0 },
        moveVectorX: Math.random() - 0.5,
        moveVectorZ: Math.random() - 0.5,
        inputFlags: 0
      })

      console.log("Bot moved")
    }, 20000)

    // jump periodically
    setInterval(() => {
      client.queue("player_action", {
        action: "jump"
      })

      console.log("Bot jumped")
    }, 30000)

  })

  client.on("disconnect", () => {
    console.log("Disconnected. Reconnecting in 10s...")
    setTimeout(startBot, 10000)
  })

  client.on("error", err => {
    console.log("Error:", err)
  })
}

startBot()
