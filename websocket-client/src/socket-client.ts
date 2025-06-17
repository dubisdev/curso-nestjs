import { Manager, Socket } from "socket.io-client"

export const connectToServer = () => {
    const manager = new Manager("http://localhost:3000/socket.io/socket.io")

    const socket = manager.socket("/")

    addListeners(socket)
}


const addListeners = (socket: Socket) => {
    const $serverStatusLablel = document.querySelector<HTMLSpanElement>("#server-status")!

    socket.on("connect", () => {
        $serverStatusLablel.innerHTML = "Connected"
    })

    socket.on("disconnect", () => {
        console.log("Disconnected from server")
         $serverStatusLablel.innerHTML = "Disconnected"
    })
}
