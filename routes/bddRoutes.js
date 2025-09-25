import express from "express";
import { fetchCategoryCounts } from "../controller/bddController.js";

const router = express.Router();

// Simple endpoint to get category counts
router.get("/counts", async (req, res) => {
  try {
    const counts = await fetchCategoryCounts();
    res.json(counts);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch data",
      details: error.message,
    });
  }
});

export default router;
