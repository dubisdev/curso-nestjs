import './style.css'
import { connectToServer } from './socket-client.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h2>Websocket client</h2>
    <input id="jwt" placeholder="JWT Token" />
    <button>Connect</button>


    <br/>

    <span id="server-status">Offline</span>


    <ul id="clients-ul">
    </ul>

    <form id="message-form">
      <input placeholder="Type your message here" id="message-input" />
    </form>

    <h3>Messages</h3>
    <ul id="messages-ul">
    </ul>
  </div>
`

// connectToServer()

const $connectButton = document.querySelector<HTMLButtonElement>('button')!
const $jwtInput = document.querySelector<HTMLInputElement>('#jwt')!

$connectButton.addEventListener('click', () => {
  const jwt = $jwtInput.value
  if (jwt.trim().length === 0) return

  connectToServer(jwt.trim())
})
