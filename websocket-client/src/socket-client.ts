import { Manager, Socket } from "socket.io-client"

let socket: Socket
export const connectToServer = (jwt: string) => {
    const manager = new Manager("http://localhost:3000/socket.io/socket.io", {
        extraHeaders: {
            authentication: jwt
        }
    })

    socket?.removeAllListeners()

    socket = manager.socket("/")
    
    addListeners()
}


const addListeners = () => {
    const $serverStatusLablel = document.querySelector<HTMLSpanElement>("#server-status")!
    const $messageForm = document.querySelector<HTMLFormElement>("#message-form")!
    const $messageInput = document.querySelector<HTMLInputElement>("#message-input")!
    const $messagesUl = document.querySelector<HTMLUListElement>("#messages-ul")!

    socket.on("connect", () => {
        $serverStatusLablel.innerHTML = "Connected"
    })

    socket.on("disconnect", () => {
        $serverStatusLablel.innerHTML = "Disconnected"
    })

    socket.on("clients-updated", (payload: { connectedClients: string[] }) => {
        const $clientsUl = document.querySelector<HTMLUListElement>("#clients-ul")!
        $clientsUl.innerHTML = ""

        payload.connectedClients.forEach(clientId => {
            const li = document.createElement("li")
            li.innerText = clientId
            $clientsUl.append(li)
        })
    })

    socket.on("message-from-server", (payload: { fullName: string, message: string }) => {
        console.log("Message from server:", payload)
        const li = document.createElement("li")

        li.innerHTML = `<strong>${payload.fullName}:</strong> ${payload.message}`

        $messagesUl.append(li)
    })

    $messageForm.addEventListener("submit", (event) => {
        event.preventDefault()

        const message = $messageInput.value
        if (message.trim().length === 0) return

        socket.emit("message-from-client", { message })

        $messageInput.value = ""
    })
}
