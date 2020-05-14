const Recipe = require("./models/recipe");
const  Comment = require("./models/Comment");

// all the middleare goes here
let middlewareObj = {};

middlewareObj.checkOwnership = (req,res,next)=>{
  if(req.user){
      console.log(req.body)
    Recipe.findById(req.params.recipeid,(err,rec)=>{
        if(err){
                req.flash("error", "Recipe not found");
               res.redirect("back");
               console.log("error1")
           }  else {
               
            if(rec.author.id.equals(req.user.id))
             {
                
                 if(err){ console.log("error1")
                 req.flash("error", "Permission denied");
                 res.redirect("back");}
                 else{
                next();}
            } else {
                req.flash("error", "You don't have permission to do that");
                console.log("error2")
                res.redirect("back");
            }

      }
    });
  }else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
        console.log("error3")
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next) {
 if(req.user){
  Comment.findById(req.params.commentId, function(err, foundComment){
     if(err){
      req.flash("error", "Permission denied");
         res.redirect("back");
     }  else {
         // does user own the comment?
      if(foundComment.user.id.equals(req.user._id)) {
          next();
      } else {
        req.flash("error","You don't have permission to do that")
          console.log("You don't have permission to do that");
          res.redirect("back");
      }
     }
  });
} else {
  req.flash("error","You need to be logged in to do that")
  console.log( "You need to be logged in to do that");
  res.redirect("back");
}
}

middlewareObj.authCheck = (req,res,next)=>{
  if(!req.user){
    req.flash("error", "You need to be logged in to do that");
    console.log("Not Signed In");
    res.redirect("/auth");
  }else{
    next();
  }
}

module.exports = middlewareObj;