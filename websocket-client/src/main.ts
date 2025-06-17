import './style.css'
import { connectToServer } from './socket-client.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Websocket client</h1>
    <span id="server-status">Offline</span>


    <ul id="clients-ul">
      <li>Client 1</li>
      <li>Client 2</li>
    </ul>
  </div>
`

connectToServer()
