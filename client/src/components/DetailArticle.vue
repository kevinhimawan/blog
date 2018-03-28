<template>
  <div class="content">
    <div class="card" style="">
      <div class="card-body">
        <h5 class="card-title">{{blog.title}}</h5>
        <p class="card-text">{{blog.content}}</p>
      </div>
      <img class="card-img-top" :src="blog.image.path" :alt="blog.image.path">
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  props: ['blogid'],
  data: function () {
    return {
      blog: {},
      allblog: []
    }
  },
  created: function () {
    this.fetchData()
  },
  methods: {
    fetchData: function () {
      axios.get(`http://localhost:3000/home/getblog/${this.blogid}`).then(response => {
        this.blog = response.data
      })
    },
    view: function () {
      const vm = this
      const update = new Promise((resolve, reject) => {
        $.getJSON('//freegeoip.net/json/?callback=?', function (data) {
          const ip = JSON.stringify(data.ip, null, 2)
          let blogid = {
            id: vm.blogid, ip
          }
          axios.put('http://localhost:3000/home/insertview', blogid).then(response => {
            resolve(response.data)
          })
            .catch(err => {
              reject(err)
            })
        })
      })
      update.then(result => {
        if (result !== 'Already view before') {
          this.allblog = result
          this.$emit('allblogwithview', result)
        }
      })
        .catch(err => {
          console.log(err)
        })
    }
  },
  watch: {
    blogid: function () {
      this.fetchData()
      this.view()
    }
  }
}
</script>

<style scoped>
.content{
  max-height: 720px;
}
.card-title{
  font-size: 1.4em;
  margin-bottom: 15px;
}
.card{
  padding: 20px !important;
  max-height: 700px;
  overflow: scroll;
}
.card-body{
  margin-bottom: 20px;
}
</style>
