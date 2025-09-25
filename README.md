# BDD25 Backend API

This application reads data from Google Sheets and provides category counts via a REST API.

## Setup Instructions

### 1. Google Cloud Console Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google Sheets API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
5. Configure the OAuth consent screen if prompted
6. For Application type, choose "Web application"
7. Add authorized redirect URIs:
   - `http://localhost:5000/bdd25/auth/callback` (for local development)
   - `https://your-render-domain.com/bdd25/auth/callback` (for production)

### 2. Environment Variables

Set the following environment variables:

```
GOOGLE_CLIENT_ID=your_oauth_client_id
GOOGLE_CLIENT_SECRET=your_oauth_client_secret
GOOGLE_REDIRECT_URI=https://your-domain.com/bdd25/auth/callback
SPREADSHEET_ID=your_google_sheet_id
GOOGLE_REFRESH_TOKEN=your_refresh_token
```

### 3. Getting the Refresh Token

1. Start the application: `npm run dev`
2. Visit `http://localhost:5000/bdd25/auth`
3. Complete the Google OAuth flow
4. The refresh token will be logged to the console
5. Copy the refresh token and add it to your environment variables as `GOOGLE_REFRESH_TOKEN`

### 4. Render Deployment

1. Set all the environment variables in Render
2. Make sure the `GOOGLE_REDIRECT_URI` points to your Render app URL
3. Update the OAuth credentials in Google Cloud Console to include your Render callback URL

## API Endpoints

- `GET /` - API information and instructions
- `GET /bdd25/counts` - Get category counts from Google Sheets
- `GET /bdd25/auth` - Start OAuth authentication
- `GET /bdd25/auth/callback` - OAuth callback (used by Google)

## Usage

After deployment, your app will:

1. Use OAuth2 authentication instead of service account keys
2. Automatically refresh access tokens when needed
3. Return the same JSON format for category counts
4. Handle authentication errors gracefully

The `/bdd25/counts` endpoint returns data in the same format:

```json
{
  "AIDS": 0,
  "AIML": 5,
  "COMPS": 10,
  "CSEDS": 3,
  "EXTC": 7,
  "ICB": 2,
  "IT": 15,
  "MECH": 8,
  "Outsider": 1
}
```
