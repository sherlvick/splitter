MYSQL setup: https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-ubuntu-20-04
Google authentication and passport setup: https://www.passportjs.org/tutorials/google/state/

# Google OAuth client creation

- Create a client ID and client secret using https://console.cloud.google.com/apis/dashboard
- From the project drop-down, select an existing project, or create a new one by selecting Create a new project
- In the sidebar under "APIs & Services", select Credentials
- In the Credentials tab, select the Create credentials drop-down list, and choose OAuth client ID.
- Under Application type, select Web application.
- In Authorized redirect URI use http://localhost:3000/auth/google/callback
- Press the Create button and copy the generated client ID and client secret
  Note: If Google doesn't support http://localhost:3000, then use http://127.0.0.1:3000

# Setup secrets config file

- Create file with filename .env
- Add these vaiables
  1. MYSQL_HOST = "localhost"
  2. MYSQL_USER = "username"
  3. MYSQL_PASSWORD = "password"
  4. MYSQL_DATABASE = "splitter"
  5. GOOGLE_CLIENT_ID = XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  6. GOOGLE_CLIENT_SECRET = XXXXXXXXXXXXXXXXXXXXXXXXXX
  7. GOOGLE_AUTHORISED_REDIRECT_URL = "/auth/google/callback"

# Development

- `npm i`
- `npm run dev`
