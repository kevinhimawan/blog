const Blog = require('../model/blog.model')
const Image = require('../model/image.model')
const User = require('../model/user.model')
const jwt = require('jsonwebtoken')

module.exports = {
  getBlog(req,res){
    Blog.find()
    .populate('image')
    .populate('author')
    .exec()
    .then(blogData=>{
      res.status(200).json(blogData)
    })
    .catch(err => {
      res.status(500).json(err)
    })
  },
  getblogid(req,res){
    const id = req.params.blogid
    Blog.findOne({'_id': id})
    .populate('image')
    .populate('author')
    .exec()
    .then(blogData=>{
      res.status(200).json(blogData)
    })
  },
  insertLike (req,res) {
    const {id, ip} = req.body
    Blog.findOne({'_id': id})
    .exec()
    .then(blogData=>{
      const indexip = blogData.like.indexOf(ip)
      if(indexip === -1){
        Blog.update({'_id': id},
          {'$push': {like: ip}},
        function(err,result){
          if(!err){
            Blog.find()
            .populate('image')
            .populate('author')
            .exec()
            .then(blogData=>{
              res.status(200).json(blogData)
            })
          }else{
            res.status(500).json('ERROR')
          }
        })
      }else{
        res.status(200).json('Already like before')
      }
    })
  },
  insertView (req,res) {
    const {id, ip} = req.body
    Blog.findOne({'_id': id})
    .exec()
    .then(blogData=>{
      const indexip = blogData.view.indexOf(ip)
      if(indexip === -1){
        Blog.update({'_id': id},
          {'$push': {view: ip}},
        function(err,result){
          if(!err){
            Blog.find()
            .populate('image')
            .populate('author')
            .exec()
            .then(blogData=>{
              res.status(200).json(blogData)
            })
          }else{
            res.status(500).json('ERROR')
          }
        })
      }else{
        res.status(200).json('Already view before')
      }
    })
  },
  getSpecfic (req,res) {
    const id = req.params.blogid
    Blog.findOne({'_id': id})   
    .populate('image')
    .populate('author') 
    .exec()
    .then(blogData => {
      res.status(200).json(blogData)
    })
  },
  deleteBlog (req, res) {
    const { blogid, imageid, token } = req.body
    const userid = jwt.verify(token, process.env.secret)._id
    // Remove Blog
    Blog.deleteOne({'_id': blogid})
    .then(result => {
      // Remove Image
      Image.deleteOne({'_id': imageid})
      .then(result => {
        // User Update Pull
        User.update({'_id': userid},
          {'$pull': {blog: blogid}},
        function (err,result) {
          if(!err){
            Blog.find()
            .populate('image')
            .populate('author') 
            .exec()
            .then(blogData => {
              res.status(200).json(blogData)
            })
          }
        })
      })
    })
  }
}