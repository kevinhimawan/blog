<template>
  <div class="row">
    <div class="col-lg-5 blog-content-left">
      <h4 class="title-blog-left">Collection</h4>
      <div class="content">
        <div v-for="(blog,i) in allblog" :key=i class="card content-left">
          <div class="card-body">
            <h5 class="card-title">
              <router-link class="router-link-font" :to="{ name: 'DetailArticle', params: { blogid: blog._id}}">{{blog.title}}</router-link>
            </h5>
            <div class="card-author">
              <span>author: </span><span>{{blog.author.username}}</span>
            </div>
            <div class="card-action">
              <div class="like">
                <span v-on:click="likeblog(blog._id, i)" class="like-button">like: </span><span>{{blog.like.length}}</span>
              </div>
              <div class="view">
                <span class="view-button">view: </span><span>{{blog.view.length}}</span>
              </div>
              <div v-if="username === blog.author.username" class="update">
                <span class="view-button">
                  <router-link class="update-font" :to="{ name: 'UpdateBlog', params: { blogid: blog._id }}">Update</router-link>
                </span>
              </div>
              <div v-if="username === blog.author.username" class="update">
                <a v-on:click="remove(blog._id,blog.image._id)" class="update-font">Delete</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-lg-7 blog-content-right">
      <h4 style="text-align: left;">Content</h4>
      <router-view
        v-on:allblogwithview="newallblog">
      </router-view>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data: function () {
    return {
      allblog: [],
      username: '',
      id: ''
    }
  },
  props: ['getnewblog'],
  created: function () {
    axios.get('http://localhost:3000/home/getblog').then(response => {
      this.allblog = response.data
      const username = localStorage.getItem('username')
      this.username = username
    }).catch(err => {
      console.log(err)
    })
  },
  methods: {
    getid: function (id) {
      this.id = id
    },
    newallblog: function (value) {
      console.log(value)
      this.allblog = value
    },
    likeblog: function (id, index) {
      const update = new Promise((resolve, reject) => {
        $.getJSON('//freegeoip.net/json/?callback=?', function (data) {
          const ip = JSON.stringify(data.ip, null, 2)
          let blogid = {
            id, ip
          }
          axios.put('http://localhost:3000/home/insertlike', blogid).then(response => {
            resolve(response.data)
          }).catch(err => {
            reject(err)
          })
        })
      })
      update.then(result => {
        this.allblog = result
      })
    },
    remove (blogid,imageid) {
      const vm = this
      const token = localStorage.getItem('token')
      axios.post('http://localhost:3000/home/deleteblog',{
        blogid, imageid, token
      }).then(response => {
        vm.allblog = response.data
      })
    }
  },
  watch: {
    getnewblog: function (value) {
      this.allblog.push(value)
    }

  }
}
</script>
<style scoped>
.row{
  max-width: 1280px;
  padding: 50px 0;
  margin: 0;
  overflow: scroll;
}
.blog-content-left{
  padding: 0px 100px 0 80px;
}
.content{
  display: flex;
  flex-direction: column-reverse;
}
.card{
  padding: 8px 10px !important;
  margin-bottom: 10px;
}
.card-title{
  text-align: left;
  margin-bottom: 0;
  font-size: 1em;
  max-height: 38px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.card-body{
  text-align: left;
  padding: 0 !important;
}
.card-author{
  font-size: .9em;
}
.title-blog-left{
  text-align: left;
  margin-bottom: 10px;
}
.content-moto{
  position: absolute;
  left: 25%;
  top: 40%;
  right: 25%;
  display: block;
  color: #7fa5c3;
  font-size: 2em;
  font-weight: 300;
}
.router-link-font{
  color: #2c3e50
}
.router-link-font:hover{
  color: #486888;
  text-decoration: none;
}
.blog-content-right{
  padding-right: 100px;
}
.content-left{
  max-width: 720px;
  overflow: scroll;
}
.card-action{
  font-size: .9em;
  color: #6060a5;
}
.like-button:hover{
  cursor: pointer;
}
.like,.view,.update{
  display: inline-block;
  margin-right: 15px;
}
.update-font{
  color: #057cff !important;
}
.update-font:hover{
  cursor: pointer;
  font-weight: 500;
  text-decoration: none;
}
</style>
