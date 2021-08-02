const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagRouteData = ProductTag.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(tagRouteData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagRouteData = ProductTag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!tagRouteData) {
      res.status(404).json({ message: "Sorry no tag found" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", (req, res) => {
  // create a new tag
  try {
    const TagRouteData = await ProductTag.create(req.body);
    res.status(200).json(TagRouteData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", (req, res) => {
  // update a tag's name by its `id` value
  try {
    const TagRouteData = await ProductTag.update(
      { id: req.body.id },
      { where: req.params.id }
    );
    res.status(200).json(TagRouteData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", (req, res) => {
  // delete on tag by its `id` value
  try {
    const TagRouteData = await ProductTag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!TagRouteData) {
      res.status(404).json({ message: "No Tag Found" });
      return;
    }
  } catch (err) {
    res.status(500).json.apply(err);
  }
});

module.exports = router;
