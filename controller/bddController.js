import { google } from "googleapis";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
dotenv.config();

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"];

// Service Account setup
let auth;
try {
  const keyPath = path.join(process.cwd(), "key.json");
  const keyFile = JSON.parse(fs.readFileSync(keyPath, "utf8"));

  auth = new google.auth.GoogleAuth({
    credentials: keyFile,
    scopes: SCOPES,
  });
} catch (error) {
  console.error("Error loading service account key:", error.message);
  process.exit(1);
}

const sheets = google.sheets({ version: "v4", auth });

// Spreadsheet details
const SPREADSHEET_ID = process.env.SPREADSHEET_ID;
const RANGE = "Records!I:I";

// Categories
let categoryCounts = {
  AIDS: 0,
  AIML: 0,
  COMPS: 0,
  CSEDS: 0,
  EXTC: 0,
  ICB: 0,
  IT: 0,
  MECH: 0,
  Outsider: 0,
};

// Function to fetch and count (always fresh from sheet)
export async function fetchCategoryCounts() {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: RANGE,
    });

    const rows = response.data.values || [];

    // Reset counts
    for (let key in categoryCounts) {
      categoryCounts[key] = 0;
    }

    // Skip header row, flatten and clean values
    rows
      .slice(1)
      .flat()
      .forEach((value) => {
        const cleanValue = value.trim();
        if (!cleanValue) return;

        if (cleanValue in categoryCounts) {
          categoryCounts[cleanValue]++;
        }
      });

    return categoryCounts;
  } catch (err) {
    console.error("Error fetching data:", err.message);
    throw err;
  }
}
