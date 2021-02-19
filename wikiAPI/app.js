const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const express = require("express");

mongoose.connect("mongodb://localhost:27017/wikiDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const articlesSchema = new mongoose.Schema({
    title: "String",
    content: "String"
});

const Article = mongoose.model("Article", articlesSchema);

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.route("/articles")
    .get(function (req, res) {
        Article.find(function (err, result) {
            if (err) {
                res.send(err);
            } else {
                res.send(result);
            }
        });
    })
    .post(function (req, res) {
        const newArticle = new Article({
            title: req.body.title,
            content: req.body.content
        });
        newArticle.save(function (err) {
            if (err) {
                res.send(err);
            } else {
                res.send("Successfully added the new aritcle.");
            }
        });
    })
    .delete(function (req, res) {
        Article.deleteMany(function (err) {
            if (err) {
                res.send(err);
            } else {
                res.send("Successfully deleted all the articles.");
            }
        });
    });

app.route("/articles/:articleTitle")
    .get(function (req, res) {
        Article.findOne(
            { title: req.params.articleTitle },
            function (err, result) {
                if (!err) {
                    if (result) {
                        res.send(result);
                    } else {
                        res.send("Match not found with the article title.");
                    }
                }
            }
        );
    })
    .put(function (req, res) {
        Article.update(
            { title: req.params.articleTitle },
            { title: req.body.title, content: req.body.content },
            { overwrite: true },
            function (err) {
                if (!err) {
                    res.send("Successfully updated the article.");
                } else {
                    res.send(err);
                }
            }
        );
    })
    .patch(function (req, res) {
        Article.update(
            { title: req.params.articleTitle },
            { $set: req.body },
            function (err) {
                if (err) {
                    res.send(err);
                } else {
                    res.send("Successfully updated the article.");
                }
            }
        );
    })
    .delete(function (req, res) {
        Article.deleteOne({ title: req.params.articleTitle }, function (err) {
            if (err) {
                res.send(err);
            } else {
                res.send("Successfully deleted the article.");
            }
        });
    });

app.listen(3000, function () {
    console.log("Server is running on port 3000");
});
