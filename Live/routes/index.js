const express = require('express')
const router = express.Router()

router.get('/', (req, res)=>{
    res.render('pages/index')
})
router.get("/about", (req, res)=>{
    res.render('pages/about',  { pageTitle: "About Us" })
})
  
router.get("/service", (req, res)=>{
    res.render('pages/service',  { pageTitle: "Our Service" })
})
  
module.exports = router