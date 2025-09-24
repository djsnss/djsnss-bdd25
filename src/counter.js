import { google } from "googleapis";
import dotenv from "dotenv";
dotenv.config();

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"];
const KEYFILE = "key.json";   // Keep in .gitignore

// Load service account key
const auth = new google.auth.GoogleAuth({
  keyFile: KEYFILE,
  scopes: SCOPES,
});

// Google Sheets instance
const sheets = google.sheets({ version: "v4", auth });

// Spreadsheet details
const SPREADSHEET_ID = process.env.SPREADSHEET_ID;
const RANGE = "Sheet1!H:H";

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
    rows.slice(1).flat().forEach((value) => {
      const cleanValue = value.trim(); // normalise
      //const cleanValue = value.trim().toUpperCase(); 
      if (!cleanValue) return; // skip empty cells


      if (cleanValue in categoryCounts) {
        categoryCounts[cleanValue]++;
      }
    });

    return categoryCounts;
  } catch (err) {
    console.error("Error fetching data:", err.message);
    return categoryCounts;
  }
}

