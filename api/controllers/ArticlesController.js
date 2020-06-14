/**
 * ArticlesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  list: (req, res) => {
    Articles.find({}).exec((err, articles) => {
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
  },
  delete: (req, res) => {
    const { id } = req.params;

    Articles.destroy({ id }).exec(err => {
      if (err) {
        res.send(500, { error: "Database Error" });
      }
      res.redirect("/articles/list");
    });
  },
  edit: (req, res) => {
    const { id } = req.params;
    Articles.findOne({ id }).exec((err, article) => {
      if (err) {
        res.send(500, { error: "Database Error" });
      }
      res.view("edit", { article });
    });
  },
  update: (req, res) => {
    console.log("Update", req.query);
    const updatedArticle = { title: req.query.title, body: req.query.body };
    const { id } = req.params;

    Articles.update({ id }, updatedArticle).exec(err => {
      if (err) {
        res.send(500, { error: "Database Error" });
      }
      res.redirect("/articles/list");
    });
  }
};
