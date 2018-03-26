<template>
<div id="home">
  <Createmodal
  v-on:sendnewblog="getnewblog"></Createmodal>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="index.html">Chef Blog Ala Ala</a>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav">
        <li v-if="createblog" class="nav-item">
          <a class="nav-link" href="#" data-toggle="modal" data-target="#createmodal">Create Blog</a>
        </li>
        <li v-if="loginblog" class="nav-item">
          <a v-on:click="login" href="" class="nav-link">
            <router-link :to="{name: 'Login'}" class-active="active">Login</router-link>
          </a>
        </li>
        <li v-if="signoutblog" class="nav-item">
          <a v-on:click="signout" href="" class="nav-link">
            <router-link :to="{name: 'Login'}" class-active="active">Signout</router-link>
          </a>
        </li>
        <li style="display:none" class="nav-item">
          <router-link :to="{name: 'Testing'}">Testing</router-link>
        </li>
      </ul>
    </div>
  </nav>
  <Container
    v-bind:getnewblog="newblog"></Container>
</div>
</template>
<script>
import routes from '@/router'
import Createmodal from '@/components/Createmodal'
import Container from '@/components/HomeContainer'
export default {
  name: 'home',
  components: {
    Createmodal,
    Container
  },
  data: function () {
    return {
      createblog: false,
      loginblog: true,
      signoutblog: false,
      newblog: {}
    }
  },
  created: function () {
    const token = localStorage.getItem('token')
    if (token) {
      this.createblog = true
      this.loginblog = false
      this.signoutblog = true
    } else {
      this.loginblog = true
    }
  },
  methods: {
    login: function () {
      localStorage.clear()
    },
    signout: function () {
      localStorage.clear()
      this.createblog = false
      this.loginblog = true
      this.signoutblog = false
      routes.push({
        path:'/'  
      })
    },
    getnewblog: function (value) {
      this.newblog = value
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  a{
    color: rgba(0,0,0,.5);
  }
  a:hover{
    color: rgba(0,0,0,.7);
    text-decoration: none;
  }
  .navbar{
    padding: .5rem 1.5rem;
    height: 75px;
  }
  .navbar-brand{
    font-family: "futura-pt";
    font-size: 22px;
    text-transform: uppercase;
    letter-spacing: 9px;
    font-weight: 700;
    font-style: normal;
    margin: 0;
    padding-top: 0;
    padding-bottom: 0;
    line-height: 1em;
  }

  .navbar-brand:hover{
    color: rgba(0,0,0,.7) !important;
  }

  .navbar-collapse{
    justify-content: flex-end
  }

  .navbar-nav{
    float: right;
  }

  .nav-item{
    margin: 0 10px;
  }

  .nav-link{
    color: white;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 400;
    font-size: 16px;
  }
  .nav-link:hover{
    color: #90908b
  }
</style>
