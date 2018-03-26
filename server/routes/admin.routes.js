const express = require('express')
const router = express.Router()
const multer  = require('multer')
const ImgUpload = require('../middleware/gcs')

const uploadDisk = multer({
  storage: multer.MemoryStorage,
  fileSize: 5 * 1024 * 1024
})

const { createBlog, updateBlog } = require('../controllers/admin.controller')

router.post('/createblog', uploadDisk.single('image'), ImgUpload.sendUploadToGCS, createBlog)
router.put('/update/:id', uploadDisk.single('image'), ImgUpload.sendUploadToGCS, updateBlog)

module.exports = router