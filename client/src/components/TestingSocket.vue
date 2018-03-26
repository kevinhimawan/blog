<template>
  <div>
    <span>Total User</span> <span> {{user}}</span>
    <input v-model="message" type="text">
    <button v-on:click="joinuser" type="btn">Join</button>
    <button v-on:click="sendmessage" type="btn">chat</button>
  </div>
</template>

<script>
export default {
  sockets: {
    connect: function () {
      console.log('connected')
    },
    receivemessage: function (message) {
      console.log(message)
    }
  },
  data: function () {
    return {
      user: 0,
      message: ''

    }
  },
  methods: {
    joinuser: function () {
      if (this.user < 4) {
        this.$socket.emit('joinuser', 'dieorleave')
      }
    },
    sendmessage: function () {
      this.$socket.emit('sendmessage', this.message)
    }
  }
}
</script>

<style>

</style>
