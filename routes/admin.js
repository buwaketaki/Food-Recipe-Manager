const path = require('path');

const express = require('express');

const router = express.Router();

const fetch = require("node-fetch");
const axios = require('axios');
const appkey = "8c270b26b309974a2e1ffad14cf20c0b";
const appid = "b2673545"
let recipes = []

// /admin/add-product => POST
router.post('/add-recipe', async (req, res, next) => {
  var p = req.body.search
  
  recipes= await makeGetRequest(p);

  for (el in recipes){
    console.log(el);
    
  }
  
  res.redirect("/show");
});

router.get('/', (req, res, next) => { 
  res.render('index'
    );
});

const makeGetRequest = async (p)=>{
  try {
    let res = await axios.get(`https://api.edamam.com/search?q=${p}&app_id=${appid}&app_key=${appkey}`);
    const data = res.data.hits;
    // console.log(data);
    
    
    return data;
  }catch(error){
    console.log(error);
    return null;
  }  
}

router.get("/show",(req,res)=>{

  res.render("show",{recipes});
})

module.exports = router;
