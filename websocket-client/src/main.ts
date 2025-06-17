import './style.css'
import { connectToServer } from './socket-client.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Websocket client</h1>
    <span id="server-status">Offline</span>


    <ul id="clients-ul">
    </ul>

    <form id="message-form">
      <input placeholder="Type your message here" id="message-input" />
    </form>
  </div>
`

connectToServer()
