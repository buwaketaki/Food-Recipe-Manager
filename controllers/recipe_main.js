const Recipe = require('../models/recipe');
const dum =[]
exports.postAddRecipe=(req, res, next) => {
    dum.push(req.body.first_name)
    dum.push(req.body.last_name)
    dum.push(req.body.rec_nm)
    dum.push(req.body.calories)
    dum.push(req.body.discp)
   for (i of dum){
    
    console.log(i)
   }
   author ={
   id: req.user._id,
   username: req.user.username
   }
   const first_name = req.body.first_name;
   const last_name = req.body.last_name;
   const rec_nm = req.body.rec_nm;
   const calories = req.body.calories;
   const discp =req.body.discp;
   const recipe = new Recipe({
       first_name : first_name,
       last_name : last_name,
       rec_nm : rec_nm,
       calories : calories,
       discp : discp,
       author : author
   })
  

  
recipe.save().then(result=> {
    console.log('done'),
    
    res.redirect('/index')
})

.catch(err=>{
    console.log(err)
})}
exports.getRecipes = (req, res, next) => {
    console.log(req.user);
    Recipe.find()
      //  Recipe.populate()
     .then(recs => {
        console.log('ketaki'); 
        console.log(recs) 
       res.render('main', {
          recs
        });
    })
      .catch(err => console.log(err));
};
exports.showDes=(req,res,next)=>{
  const rsid = req.params.rsid;
  const user= req.user;
  console.log(req.user._id)
  
console.log("abc")
  Recipe.findById(rsid).populate("comments").exec((err,rec)=>{

    if(err){
      res.render("error");
    }
    console.log(rec.comments[2].user.id)
    res.render("show_discription",{rec,user});
  })
}



  
exports.getEditRecipe = (req, res, next) =>
{Recipe.findById(req.params.recipeid,(err,rec)=>{
  if(err){
   console.log(err)
  }
  res.render("edit_recipe",{rec});
})
}

exports.postEditRecipe = (req, res, next) => {
  const recipeid = req.params.recipeid;
  console.log(req.params.recipeid)
console.log(req.body.calories)
console.log(req.body.first_name)

 
 const updatedname = req.body.first_name;
const updateddiscp = req.body.discp;
const updatedcal = req.body.calories;
  

Recipe.findById(recipeid)
.then(rec => {
 
      
 rec.first_name = updatedname;

     
rec.discp= updateddiscp;
    
rec.cal = updatedcal;
      
return rec.save();
  })
.then(result => {
 console.log('update');
 res.render("index")})
.catch(err => console.log(err));
 };
 
exports.postDeleteRecipe = (req, res, next) => {
  const recipeid = req.params.recipeid;
  Recipe.findByIdAndRemove(recipeid)
    .then(() => {
      console.log('Deleted');
      res.redirect('/index');
    })
    .catch(err => console.log(err));}
