App.room = App.cable.subscriptions.create("RoomChannel", {
  connected: function() {
    console.log('connected')
    // Called when the subscription is ready for use on the server
  },

  disconnected: function() {
    // Called when the subscription has been terminated by the server
  },

  received: function(message) {
    //受け取る側
    const messages = document.getElementById('messages')
    messages.innerHTML += message
    // Called when there's incoming data on the websocket for this channel
  },

  speak: function(content) {
    return this.perform('speak', { message: content});
  }
});

document.addEventListener('DOMContentLoaded', function() {
  // show.html.erbのinput idを持ってくる
  const input = document.getElementById('chat-input')
  // show.html.erbのbuntton idを持ってくる
  const button = document.getElementById('button')
  // クリックされたら値を表示
  button.addEventListener('click', function() {
    const content = input.value
    App.room.speak(content)
    input.value = ''
  })
})
