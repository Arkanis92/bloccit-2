const postQueries = require("../db/queries.posts.js");
const Authorizer = require("../policies/post");

module.exports = {
  new(req, res, next){
    const authorized = new Authorizer(req.user).new();

    if(authorized) {
      res.render("posts/new", {topicId: req.params.topicId});
    } else {
      req.flash("notice", "You are not authorized to do that.");
      res.redirect("/posts");
    }
  }
}
