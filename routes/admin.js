const path = require('path');


const express = require('express');
const middleware = require("../middleware");

const router = express.Router();
const passport = require('passport');
const fetch = require("node-fetch");
const axios = require('axios');
const appkey = "8c270b26b309974a2e1ffad14cf20c0b";
const appid = "b2673545"
let recipes = []
let dum =[]
const recipeController = require('../controllers/recipe_main')

router.get('/show_recipe', recipeController.getRecipes);
router.get('/',(req,res,next)=>{res.redirect('/auth');})
 
router.get('/edit_recipe/:recipeid',middleware.checkOwnership, recipeController.getEditRecipe )
router.get('/delete_recipe/:recipeid',middleware.checkOwnership, recipeController.postDeleteRecipe)

router.get('/new_recipe',middleware.authCheck,(req, res, next) => {
  res.render("add_Recipe");
});
//router.post('/register',  res.render("index");)
router.post('/new_recipe', recipeController.postAddRecipe)
router.post('/edit_recipe/:recipeid', recipeController.postEditRecipe)
router.post('/add-recipe', async (req, res, next) => {
  var p = req.body.search
  
  recipes= await makeGetRequest(p);

  for (el in recipes){
    console.log(el);
    
  }
  
  res.redirect("/show");
});

router.get('/auth', (req, res, next) => { 
  res.render('login'
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
router.get("/showDescription/:rsid", recipeController.showDes)
router.get("/show",(req,res)=>{

  res.render("show",{recipes});
})

router.get("/index",(req,res)=>{
  console.log(req.user)
  res.render("index",{user:req.user})
})

module.exports = router;
