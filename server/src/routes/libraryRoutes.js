const express = require("express");
const router = express.Router();
const libraryService = require("../services/libraryService");

// GET /api/library/search?query=nebula&page=1
router.get("/search", async (req, res, next) => {
  try {
    const { query, page = 1 } = req.query;
    if (!query) {
      return res.status(400).json({ error: "query parameter is required." });
    }

    const items = await libraryService.searchImages(query, Number(page) || 1);
    res.json(items);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
