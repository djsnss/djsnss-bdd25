import express from "express";
import { fetchCategoryCounts } from "../controller/bddController.js";

const router = express.Router();

// Endpoint to get category counts (fetches live each time)
router.get("/counts", async (req, res) => {
    const counts = await fetchCategoryCounts();
    res.json(counts);
});

export default router;
