# API testing quick guide

Use Postman or another HTTP client with cookies enabled. Start by requesting `GET http://localhost/CampusHub-Student-Portal/api/session.php` and copy `csrfToken`.

For each POST/PUT/DELETE JSON request, set `Content-Type: application/json` and `X-CSRF-Token: <token>`. Example: `POST /api/register.php` with the JSON body shown in README. Then `POST /api/login.php` with `identifier` and `password`. For event creation, use `multipart/form-data` and send the CSRF token as a form field named `_csrf` (or configure the client to send the header).

Admin endpoints return HTTP 401 if you are not logged in and 403 if your account is not an admin. Promote a development account through phpMyAdmin using the SQL example in `database/schema.sql`.
