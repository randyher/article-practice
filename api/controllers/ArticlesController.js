/**
 * ArticlesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  list: (req, res) => {
    Articles.find({}).exec((err, articles) => {
      console.log("Here:", articles);
      if (err) {
        res.send(500, { error: "Database Error" });
      }
      res.view("list", { articles });
    });
  },

  add: (req, res) => {
    res.view("add");
  },

  create: (req, res) => {
    const newArticle = { title: req.body.title, body: req.body.body };
    Articles.create(newArticle).exec(err => {
      if (err) {
        res.send(500, { error: "Database Error" });
      }
      res.redirect("/articles/list");
    });
  }
};
