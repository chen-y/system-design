class WebSocketClient {
  socket: WebSocket
  url = 'ws://localhost:8080/message'

  constructor() {}

  onConnect(params: Record<string, string>) {
    const queryString = new URLSearchParams(params).toString()
    this.socket = new WebSocket(`${this.url}?${queryString}`)
    this.socket.onmessage = this.onMessage.bind(this)
    this.socket.onopen = this.onOpen.bind(this)
    this.socket.onclose = this.onClose.bind(this)
  }

  onOpen() {
    if (this.socket) {
      throw new Error('WebSocket is connected')
    }
    console.log('Connected to WebSocket server')
  }

  onMessage(event: MessageEvent) {
    console.log(event.data)
  }

  sendMessage(message: string) {
    this.socket.send(message)
  }

  onClose() {
    console.log('Disconnected from WebSocket server')

    this.socket.close()
  }
}

export default new WebSocketClient()
