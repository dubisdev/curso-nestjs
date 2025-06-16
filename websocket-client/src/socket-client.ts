import { Manager } from "socket.io-client"

export const connectToServer = () => {
    const manager = new Manager("http://localhost:3000/socket.io/socket.io")

    const socket = manager.socket("/")
}
