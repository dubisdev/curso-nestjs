import { Manager, Socket } from "socket.io-client"

export const connectToServer = () => {
    const manager = new Manager("http://localhost:3000/socket.io/socket.io")

    const socket = manager.socket("/")

    addListeners(socket)
}


const addListeners = (socket: Socket) => {
    const $serverStatusLablel = document.querySelector<HTMLSpanElement>("#server-status")!
    const $messageForm = document.querySelector<HTMLFormElement>("#message-form")!
    const $messageInput = document.querySelector<HTMLInputElement>("#message-input")!

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

    $messageForm.addEventListener("submit", (event) => {
        event.preventDefault()

        const message = $messageInput.value
        if (message.trim().length === 0) return

        socket.emit("message-from-client", { message })

        $messageInput.value = ""
    })
}
