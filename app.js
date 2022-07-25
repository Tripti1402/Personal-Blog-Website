//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "A place to reflect on your behaviour, observations and experiences, and consider how you will behave differently in future. A record of your thoughts, and therefore a way to track progress. Keeping a journal helps you create order when your world feels like it's in chaos. Know yourself by revealing your most private fears, thoughts, and feelings. Look at your writing time as personal relaxation time. It's a time when you can de-stress and wind down. It is a good idea to try to write something in your journal each day.";
const aboutContent = "You need an open journaling mind, an open heart and a willingness to be honest with yourself. Sometimes that is not as easy as it sounds. There are a number of books and websites that can help you do this or you can take a class in journaling at your local community college or from a person who freelances teaching journaling classes. You don’t have to get fancy here. You don’t need to worry about spelling, grammar or punctuation–you just need to write about what you think, feel, want, etc. Journal your way to self awareness, clarity, and self discovery and keep a record of your progress.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts = [];

app.get("/", function(req, res){
  res.render("home", {
    startingContent: homeStartingContent,
    posts: posts
});
  
});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  //console.log(req.body.postTitle);
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };

  posts.push(post);

  res.redirect("/");

});

app.get("/posts/:postName", function(req, res){
  const requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach(function(post){
    const storedTitle = _.lowerCase(post.title);

    if(storedTitle === requestedTitle) {
      res.render("post", {
        title: post.title,
        content: post.content
      })
    } 
  });

});







app.listen(3000, function() {
  console.log("Server started on port 3000");
});
