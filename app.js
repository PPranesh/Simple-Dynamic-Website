const express = require("express");
const bodyParser = require("body-parser");
// const _ = require("lodash");

const app = express();

const homeContent = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
const aboutContent = "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance.";
const contactContent = "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).";
const additionalContent = "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.";

const homeArray = [{ title: "Home", content: homeContent}, { title: "About", content: aboutContent},{ title: "Contact", content: contactContent}, { title: "Additional Content", content: additionalContent}];
const aboutArray = [{ title: "About", content: aboutContent},{ title: "Contact", content: contactContent}, { title: "Additional Content", content: additionalContent}];
const contactArray = [{ title: "Contact", content: contactContent}, { title: "About", content: aboutContent}, { title: "Additional Content", content: additionalContent}];

app.set("view engine", "ejs");

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
    res.render("home",{homeArray});
});

app.get("/about", function(req, res){
    res.render("about",{aboutArray});
});

app.get("/contact", function(req, res){
    res.render("contact",{contactArray});
});

app.get("/post", function(req, res){
    res.render("post");
});

app.get("/compose", function(req, res){
    res.render("compose");
});

app.post("/compose", function(req, res){

    const newContent = {
//         title: _.upperFirst(req.body.inputTitle),
        title: req.body.inputTitle,
        content: req.body.inputContent
    };
    
    homeArray.push(newContent);

    res.redirect("/");
});

app.get("/posts/:postHeading", function(req, res){

//     const fromURL = _.lowerCase(req.params.postHeading);
    const fromURL = req.params.postHeading;

    homeArray.forEach(function(element) {

//         const toURL = _.lowerCase(element.title);
        const toURL = element.title;

        if ( fromURL === toURL ) {
            res.render("post", {title: element.title, content: element.content });
        } 

    });
});

app.listen(3000, function(){
    console.log("server started! on port 3000");
});
