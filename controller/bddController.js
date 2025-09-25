import { google } from "googleapis";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
dotenv.config();

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"];

// Service Account setup
let auth;
try {
  let credentials;

  // Try environment variable first
  if (process.env.GOOGLE_SERVICE_ACCOUNT_KEY) {
    console.log("Using service account from environment variable");
    credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY);
  } else {
    // Fallback to key file
    console.log("Using service account from key.json file");
    const keyPath = path.join(process.cwd(), "key.json");
    credentials = JSON.parse(fs.readFileSync(keyPath, "utf8"));
  }

  auth = new google.auth.GoogleAuth({
    credentials: credentials,
    scopes: SCOPES,
  });

  console.log("Google Auth initialized successfully");
  console.log("Service account email:", credentials.client_email);
} catch (error) {
  console.error("Error loading service account key:", error.message);
  process.exit(1);
}

const sheets = google.sheets({ version: "v4", auth });

// Spreadsheet details
const SPREADSHEET_ID = process.env.SPREADSHEET_ID;
const RANGE = "Records!I:I";

console.log("Spreadsheet ID:", SPREADSHEET_ID);
console.log("Range:", RANGE);

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
    console.log("Attempting to fetch data from Google Sheets...");

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: RANGE,
    });

    console.log("Successfully fetched data from Google Sheets");
    const rows = response.data.values || [];
    console.log(`Found ${rows.length} rows`);

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

    console.log("Category counts:", categoryCounts);
    return categoryCounts;
  } catch (err) {
    console.error("Error fetching data:", err.message);
    console.error("Full error:", err);
    throw err;
  }
}
