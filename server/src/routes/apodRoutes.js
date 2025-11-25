const express = require("express");
const router = express.Router();
const apodService = require("../services/apodService");

// GET /api/apod/today
router.get("/today", async (req, res, next) => {
  try {
    const data = await apodService.getToday();
    res.json(data);
  } catch (err) {
    next(err);
  }
});

// GET /api/apod/by-date?date=YYYY-MM-DD
router.get("/by-date", async (req, res, next) => {
  try {
    const { date } = req.query;
    if (!date) return res.status(400).json({ error: "date is required" });

    const data = await apodService.getByDate(date);
    res.json(data);
  } catch (err) {
    next(err);
  }
});

// GET /api/apod/recent?days=8
router.get("/recent", async (req, res, next) => {
  try {
    const days = Number(req.query.days || 8);
    const data = await apodService.getRecent(days);
    res.json(data);
  } catch (err) {
    next(err);
  }
});

// GET /api/apod/range
router.get("/range", async (req, res, next) => {
  try {
    const { start_date, end_date } = req.query;

    if (!start_date || !end_date)
      return res.status(400).json({ error: "start_date & end_date required" });

    const data = await apodService.getRange(start_date, end_date);
    res.json(data);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
