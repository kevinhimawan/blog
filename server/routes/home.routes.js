const express = require('express')
const router = express.Router()

const { getBlog, getblogid, insertLike, insertView, getSpecfic, deleteBlog } = require('../controllers/home.controller')

router.get('/getblog', getBlog)
router.get('/getblog/:blogid', getblogid)
router.put('/insertlike', insertLike)
router.put('/insertview', insertView)
router.get('/getspecific/:blogid', getSpecfic)
router.post('/deleteblog', deleteBlog)


module.exports = router