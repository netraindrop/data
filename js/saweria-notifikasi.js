const WebSocket = require("ws")
const url = "wss://events.saweria.co/stream"
const apikey = "<your stream key>"
const socket = new WebSocket(`${url}?streamKey=${apikey}`,{
  headers: {
    Origin: "https://saweria.co",
    "User-agent": "Nodejs/16.1.2",
    "Cache-Control": "no-cache"
   }
})

socket.on("message", (msg) => {
  const data = JSON.parse(msg.toString())
  if(data.type != "donation"){
    return ;
  }
  console.log(JSON.stringify(data.data,null,2))
})
