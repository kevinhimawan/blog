<template>
<div class="row">
  <form>
    <div class="content">
      <div class="col-lg-6">
        <div class="form-group">
          <label for="title">Title</label>
          <input v-model="blog.title" type="text" class="form-control" id="title">
        </div>
        <div class="form-group">
          <label style="width: 100%; float:left;text-align:left" for="">Image</label>
          <div v-if="blog.image" class="card col-lg-6">
            <img class="card-img-top" :src="blog.image.path" alt="Card image cap">
            <button v-on:click="removeImage(blog.image._id)" type="button" class="btn btn-default removebutton">
              <i class="fas fa-minus-circle" style="color:red"></i>
            </button>
          </div>
        </div>
        <form-group>
          <label style="width: 100%; float:left;text-align:left" for="">New Image</label>
          <div v-if="imageFile" class="card col-lg-6">
            <img class="card-img-top" :src="image" alt="Card image cap">
            <button v-on:click="removeImageNew" type="button" class="btn btn-default removebutton">
              <i class="fas fa-minus-circle" style="color:red"></i>
            </button>
          </div>
        </form-group>
      </div>
      <div class="col-lg-6">
        <div class="form-group">
          <label for="">Blog Content</label>
          <textarea v-model="blog.content" class="form-control" rows="7"></textarea>
        </div>
        <div class="form-group">
          <label for="inputimage">Drag or drop</label>
          <div @dragover="dragover" @drop="ondrop" class="box-input" v-bind:class="{drop: isActive}">
            <label class="drag-file-label">Drag Here</label>
            <label class="fileContainer">
              Click here to upload
              <input @change="getImagefile" type="file">
            </label>
          </div>
        </div>
      </div>
    </div>
    <button type="button" v-on:click="submitform" class="btn btn-primary">Submit</button>
  </form>
</div>
</template>

<script>
import axios from 'axios'
import routes from '@/router'
export default {
  props: ['blogid'],
  data: function () {
    return {
      blog: {},
      imageFile: '',
      image: '',
      removedImage: [],
      formData: new FormData()
    }
  },
  created: function () {
    axios.get(`http://localhost:3000/home/getspecific/${this.blogid}`).then(response => {
      this.blog = response.data
    })
  },
  methods: {
    submitform: function () {
      let form = {
        title: this.blog.title,
        content: this.blog.content,
        oldimage: this.blog.image,
        _id: this.blogid
      }
      let newForm = {}
      Object.keys(form).forEach((key, index) => {
        if (form[key] !== '') {
          newForm[key] = form[key]
        }
      })
      let formData = this.formData
      formData.append('newform', JSON.stringify(newForm))
      if (this.imageFile !== '') {
        formData.append('image', this.imageFile)
      }
      if (this.removedImage !== '') {
        formData.append('removeImage', this.removedImage)
      }
      axios.put(`http://localhost:3000/admin/update/${this.blogid}`, formData).then(response => {
        routes.push({
          path: '/'
        })
      }).catch(err => {
        console.log(err)
      })
    },
    getImagefile: function (e) {
      let image = event.target.files[0]
      this.createFile(image)
    },
    ondrop: function (e) {
      e.stopPropagation()
      e.preventDefault()
      let image = e.dataTransfer.files[0]
      this.createFile(image)
    },
    dragover: function (e) {
      e.stopPropagation()
      e.preventDefault()
      this.isActive = true
    },
    createFile: function (file) {
      if (!file.type.match('image.*')) {
        alert('Select an image')
        return
      }
      let reader = new FileReader()
      let vm = this
      reader.onload = function (e) {
        if (vm.blog.image.path) {
          alert('Only can have one image')
        } else {
          vm.image = e.target.result
          vm.imageFile = file
        }
      }
      reader.readAsDataURL(file)
    },
    removeImage: function (id) {
      this.blog.image = ''
      this.removedImage.push(id)
    },
    removeImageNew: function () {
      this.imageFile = ''
      this.image = ''
    }
  }
}
</script>
<style scopped>
.row{
  width: 50%;
  margin: 50px auto !important;
}
.content{
  width: 100%;
  display: flex;
}
label{
  float: left;
}
.card{
  padding: 0
}
.removebutton{
  position: absolute;
  background-color: transparent !important;
  padding: 5px !important;
  top: 0;
  left: 0;
}
 .box-input{
      border: 2px dotted #bdc3c7;
      width: 100%;
      height: 100px;
      color: #bdc3c7;
      font-size: 100%;
      padding: 0 5px;
      display: flex;
      text-align: center;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      margin-bottom: 20px;
    }
    .fileContainer {
      overflow: hidden;
      position: relative;
    }
    .fileContainer [type=file] {
      cursor: inherit;
      display: block;
      filter: alpha(opacity=0);
      opacity: 0;
      position: absolute;
      right: 0;
      text-align: right;
      top: 0;
      width: 100%;
    }
</style>
