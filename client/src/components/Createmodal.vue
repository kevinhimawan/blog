<template>
    <div id="createmodal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
          <div class="modal-content">
          <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Create Blog</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
              </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-left col-lg-6">
                <div class="form-group">
                  <label for="blogtitle">Blog Title</label>
                  <input v-model="form.title" autocomplete="off" type="text" class="form-control" id="blogtitle">
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
                <div v-if="imagesshow" style="position:relative;">
                  <img class="card-img-top" :src="imagesshow" alt="Card image cap">
                  <button v-on:click="removeImage" type="button" class="btn btn-default removebutton">
                      <i class="fas fa-minus-circle" style="color:red"></i>
                  </button>
                </div>
              </div>
              <div class="form-right col-lg-6">
                <div class="form-group">
                  <label for="">Blog Content</label>
                  <textarea v-model="form.content" class="form-control" rows="7" placeholder="Input your content here.."></textarea>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
              <button type="button" v-on:click="submitblog" data-dismiss="modal" class="btn btn-primary">Save</button>
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
          </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data: function () {
    return {
      imagesshow: '',
      form: {
        title: '',
        content: '',
        images: ''
      },
      isActive: false,
      formData: new FormData()
    }
  },
  methods: {
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
        vm.imagesshow = e.target.result
        vm.form.images = file
      }
      reader.readAsDataURL(file)
    },
    removeImage: function (index) {
      this.imagesshow = ''
      this.form.images = ''
      this.isActive = false
    },
    submitblog: function () {
      let error = 0
      Object.keys(this.form).forEach((key, index) => {
        if (this.form[key] === '') {
          error++
        }
      })
      if (error > 0) {
        alert('Blank data has found')
      } else {
        let formData = this.formData
        const token = localStorage.getItem('token')
        formData.append('image', this.form.images)
        formData.append('title', this.form.title)
        formData.append('content', this.form.content)
        formData.append('token', token)
        axios.post('http://localhost:3000/admin/createblog', formData).then((response) => {
          this.formData = new FormData()
          this.$emit('sendnewblog', response.data)
        }).catch(err => {
          console.log(err)
          this.formData = new FormData()
        })
      }
    }
  }
}
</script>

<style scopped>
    .modal-header{
      padding: 1rem 2rem !important;
    }
    .modal-dialog{
        max-width: 780px
    }
    .form-group{
        text-align: left
    }
    form{
      display: flex;
      justify-content: flex-start;
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
    .drag-file-label{
      display: block;
      width: 100% !important;
    }
    .will-upload-images{
      border: 2px dotted #bdc3c7;
      width: 100%;
      min-height: 50px;
      color: black;
      font-size: 100%;
      padding: 5px 10px;
      display: flex;
      justify-content: flex-start;
      flex-direction: column
    }
    .will-upload-image{
      display: flex;
      justify-content: flex-start;
      flex-direction: row;
    }
    .will-upload-image-name{
      display: block;
      width: 91%;
      font-size: .8em;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: 36px;
    }
    .will-upload-image-button{
      width: 9%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .drop{
      border: 2px dotted #16a085
    }
    .removebutton{
      position: absolute;
      background-color: transparent;
      top: 0;
      left: 0;
    }
</style>
