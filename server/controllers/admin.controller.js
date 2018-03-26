const Blog = require('../model/blog.model')
const Image = require('../model/image.model')
const jwt = require('jsonwebtoken')
const User = require('../model/user.model')

module.exports = {
  createBlog(req,res){
    const file = req.file
    const newImage = new Image({
      name: file.originalname, path: file.cloudStoragePublicUrl
    })
    newImage.save()
    .then(newImageData=>{
      const decode = jwt.verify(req.body.token,process.env.secret)
      const { title, content } = req.body
      const newBlog = new Blog({
          title, content, author: decode._id, image: newImageData._id
      })
      newBlog.save()
      .then(newBlogData=>{
        User.update({'_id': decode._id},
          {'$push': {blog: newBlogData._id}},
        function(err,result){
          if(!err){
            Blog.findOne({'_id':newBlogData._id})
            .populate('author')
            .populate('image')
            .exec()
            .then(blogData=>{
              return res.status(200).json(blogData)
            })
          }else{
            res.status(500).json(err)
          }
        })
      })
      .catch(err=>{
          res.status(500).json(err)
      })
    })
  },
  updateBlog (req,res) {
    let convert = JSON.parse(req.body.newform)
    if(req.file){
      const file = req.file
      const newImage = new Image ({
        name: file.originalname, path: file.cloudStoragePublicUrl
      })
      newImage.save()
      .then(newImageData => {
        const {title, content, _id} = convert
        const remove = req.body.removeImage        
        Blog.update({'_id': _id},
          {'$set': {title: title, content: content}, 
          '$push': {image: newImageData._id},
          '$pull': {image: remove}},
        function (err,result){
          if(!err){
            res.status(200).json('DONE')
          }else{
            res.status(500).json('EROR')
          }
        })
      })
    }else{
      const {title, content, _id} = convert
      Blog.update({'_id': _id},
        {'$set': {title: title, content: content}},
      function (err,result){
        if(!err){
          console.log(result)
          res.status(200).json('DONE')
        }else{
          res.status(500).json('EROR')
        }
      })
    }
  }
}