<template>
  <div id="login row">
    <div class="login-nest">
      <form>
        <h4 v-on:click="gethome" class="login-title">Welcome to login</h4>
        <div class="form-group">
          <label for="inputemail">Email address</label>
          <input v-model="username" type="text" class="form-control" id="inputemail" autocomplete="off">
          <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div class="form-group">
          <label for="inputpassword">Password</label>
          <input v-model="password" type="password" class="form-control" id="inputpassword">
        </div>
        <button v-on:click="submitform" type="button" class="btn btn-primary">Submit</button>
      </form>
    </div>
    <div class="signup-nest">
      <form>
        <h4 class="login-title">Welcome to Signup</h4>
        <div class="form-group">
          <label for="inputemail">Username</label>
          <input v-model="username_signup" type="text" class="form-control" id="inputemail" autocomplete="off">
        </div>
        <div class="form-group">
          <label for="inputemail">Email address</label>
          <input v-model="email_signup" type="text" class="form-control" id="inputemail" autocomplete="off">
          <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div class="form-group">
          <label for="inputpassword">Password</label>
          <input v-model="password_signup" type="password" class="form-control" id="inputpassword">
        </div>
        <button v-on:click="submitformsignup" type="button" class="btn btn-primary">Sign up</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import routes from '@/router'
export default {
  name: 'login',
  data: function () {
    return {
      username: '',
      password: '',
      email_signup: '',
      username_signup: '',
      password_signup: ''
    }
  },
  methods: {
    gethome: function () {
      routes.push({
        path: '/'
      })
    },
    submitform: function () {
      let userpost = {
        username: this.username,
        password: this.password
      }
      axios.post('http://localhost:3000/registration/login', userpost).then(response => {
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('username', response.data.username)
        routes.push({
          path: '/'
        })
      }).catch((err) => {
        console.log(err)
      })
    },
    submitformsignup: function () {
      let usersignup = {
        username: this.username_signup,
        email: this.email_signup,
        password: this.password_signup
      }
      axios.post('http://localhost:3000/registration/signup', usersignup).then(response => {
        console.log(response)
        localStorage.setItem('token', response.data.token)
        routes.push({
          path: '/'
        })
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>
  #login{
    height: 100%;
    margin: 100px auto;
    text-align: left;
  }

  .login-nest{
    margin: 120px auto;
    text-align: left;
    width: 520px;
    padding: 30px;
    border: 1px solid;
  }

  .login-title{
    font-size: 2em;
    text-align: center;
    margin-bottom: 40px;
  }

  form{
    display: block;
  }

  .signup-nest{
        margin: 120px auto;
    text-align: left;
    width: 520px;
    padding: 30px;
    border: 1px solid;
  }
</style>
