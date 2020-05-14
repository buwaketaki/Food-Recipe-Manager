const express = require('express');
      router = express.Router({mergeParams: true});
      mongoose = require("mongoose");
      Recipe = require("../models/recipe");
      Comment = require("../models/Comment");
      middleware = require("../middleware");

router.get("/new",middleware.authCheck,(req,res)=>{
  Recipe.findById(req.params.id,(err,rec)=>{
    if(err){
      res.render("error");
    }
    console.log(req.user)
    res.render("comment/add_comment",{rec, currentUser:req.user, });
  });
});

router.post("/", middleware.authCheck,(req,res)=>{
  console.log(req.body);
  console.log(req.params.id)
  let comment = {
    description : req.body.description
  }
  Recipe.findById(req.params.id,(err,rec)=>{
    if(err){
      res.render("error");
    }
    Comment.create(comment,(err,comment)=>{
      if(err){
        console.log(err);
        res.redirect("/showDescription/"+req.prams.id+"/comments/new");
      }
      comment.user.id = req.user._id;
      comment.user.username = req.user.username;
      comment.save();
      console.log(comment);
      rec.comments.push(comment);
      rec.save();
      res.redirect("/showDescription/"+req.params.id);
    });
  });
});
`+`
router.get("/:commentId/edit", middleware.checkCommentOwnership, (req,res)=>{
  Recipe.findById(req.params.id,(err,rec)=>{
    if(err){
      console.log(err);
      res.render("error");
    }
    Comment.findById(req.params.commentId,(err,foundComment)=>{
      if(err){
        console.log('failed')
        res.redirect("/showDescription/"+req.params.id);
      }
      res.render("comment/edit_comment",{comment:foundComment,rec});
    });
  });
});

router.post("/:commentId",(req,res)=>{
  Comment.findByIdAndUpdate(req.params.commentId,{$set: { description : req.body.description }},(err)=>{
    if(err){
      res.render("error");
    }
    res.redirect("/showDescription/"+req.params.id);
  })
})

router.get("/:commentId",middleware.checkCommentOwnership, (req, res)=>{
    Comment.findByIdAndRemove(req.params.commentId, (err)=>{
       if(err){
           res.redirect("back");
       } else {
        res.redirect("/showDescription/"+req.params.id);
       }
    });
});
module.exports = router;