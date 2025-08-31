import express from "express";
import { fetchApod } from "../services/nasaApi.js";

const router = express.Router();

/**
 * GET /api/apod?count=5
 * Fetch the latest N APOD photos (images only)
 */
router.get("/", async (req, res) => {
  const { date, count } = req.query;
  try {
    const data = await fetchApod({ date, count });
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch APOD" });
  }
});

export default router;
