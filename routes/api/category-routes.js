const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: [{ model: Product }],
  })
    .then((data) => res.status(200).json(data))
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findByPk(
    req.params.id /*, {
    include: [{ model: Product }],
  }*/
  )
    .then((data) => res.status(200).json(data))
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.post("/", async (req, res) => {
  // create a new category

  Category.create(req.body)
    .then(() => res.status(200).json({ message: "Update successful" }))
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  Category.update(
    { category_name: req.body.category_name },
    { where: { id: req.params.id } }
  )
    .then(() => res.status(200).json({ message: "Update successful" }))
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value

  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(() => res.status(200).json({ message: "Object Deleted" }))
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
