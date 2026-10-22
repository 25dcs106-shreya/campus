# CampusHub — Student Portal

A responsive student portal practical project built with **HTML5, CSS3, JavaScript, PHP, MySQL and JSON**. The original frontend has been preserved and organized into a repository structure; backend endpoints are included for the server-side practicals.

## Features

- Responsive multi-section portal: Home, Dashboard, Academics, Services, Events, Courses, Marks, Profile and Notifications.
- Existing JavaScript UI interactions, demo login and browser-local demo data.
- JSON starter datasets for events, students and FAQs.
- PHP/PDO database connection with prepared statements.
- API endpoints for registration, login/logout, session status, contact messages, student CRUD and event CRUD.
- Password hashing (`password_hash` / `password_verify`), session ID regeneration, 30-minute idle timeout, role checks and CSRF tokens.
- Admin-only student management and event management endpoints.
- Event poster upload validation (JPG/PNG/WEBP, maximum 2 MB).
- MySQL schema with students, events, contact messages and audit log tables.

> **Important:** the supplied frontend JavaScript still uses `localStorage` for its demo login. It is intentionally kept intact to preserve your existing practical UI. That browser-only login is **not secure authentication**. The PHP endpoints are separate backend implementations and are not automatically wired into every frontend screen. Use the backend API for real server-side authentication and data handling; do not deploy with demo credentials or real student data before integrating and testing it.

## Requirements

- XAMPP with Apache, PHP 8.1+ and MySQL/MariaDB
- A modern browser
- Git (optional, for pushing to GitHub)

## Run the frontend

1. Copy the `CampusHub-Student-Portal` folder to your XAMPP `htdocs` directory.
2. Start **Apache** in XAMPP. MySQL is not required for the static frontend.
3. Open `http://localhost/CampusHub-Student-Portal/`.
4. The existing demo login is stored in `assets/js/script.js`; inspect `SEED_STUDENTS` there. Demo data is stored only in your browser's local storage.

## Set up PHP + MySQL backend

1. Start **Apache** and **MySQL** in XAMPP.
2. Open `http://localhost/phpmyadmin/`.
3. Import `database/schema.sql` (it creates the `campushub` database and tables).
4. Check database credentials in `config/database.php`. XAMPP commonly uses user `root` with an empty password on a local development install.
5. Open `http://localhost/CampusHub-Student-Portal/php/health.php`; it should report that the database is connected.
6. Register a user through `POST /api/register.php` and then promote the account to admin in phpMyAdmin if required (SQL comment at the bottom of `database/schema.sql`).

### API overview

All JSON APIs use JSON request bodies except event creation, which uses `multipart/form-data` for poster uploads. Obtain a CSRF token first from `GET /api/session.php`; send it in the `X-CSRF-Token` header on state-changing requests. Keep the PHP session cookie in the same client.

| Endpoint | Methods | Access | Purpose |
|---|---|---|---|
| `/api/session.php` | GET | Public | Current session + CSRF token |
| `/api/register.php` | POST | Public | Create student account |
| `/api/login.php` | POST | Public | Login with enrollment/email + password |
| `/api/logout.php` | POST | Logged-in session | Logout |
| `/api/students.php` | GET, POST, PUT, DELETE | Admin | Search and manage students |
| `/api/events.php` | GET | Public | Search/list events |
| `/api/events.php` | POST, PUT, DELETE | Admin | Create/update/delete events |
| `/api/contact.php` | POST | Public | Store contact form message |

Example registration body:

```json
{
  "name": "Demo Student",
  "email": "demo.student@example.com",
  "enrollment": "DEMO1001",
  "password": "ChangeThis123!"
}
```

Example login body:

```json
{ "identifier": "DEMO1001", "password": "ChangeThis123!" }
```

For requests requiring CSRF, first call `/api/session.php`, then pass its `csrfToken` value in `X-CSRF-Token`. Keep cookies enabled.

## Suggested practical mapping

1. Project initiation and repository setup — `README.md`, project folders
2. Semantic HTML — `index.html`
3. Responsive layout — `assets/css/style.css`
4. DOM, events and localStorage — `assets/js/script.js`
5. Registration validation — `api/register.php` (server validation) and existing frontend forms
6. JSON, search/filter — `data/*.json`, `api/events.php`, `api/students.php`
7. PHP form processing — `api/contact.php`
8. Schema/database connectivity — `database/schema.sql`, `config/database.php`
9. Secure registration — `api/register.php`
10. Login/logout/session/RBAC — `api/login.php`, `api/logout.php`, `config/bootstrap.php`
11. Student CRUD — `api/students.php`
12. Event CRUD/poster upload — `api/events.php`
13. JSON API — files under `api/`
14. Admin authorization — `require_admin()` in `config/bootstrap.php`

## GitHub setup

From inside this folder:

```bash
git init
git add .
git commit -m "Add CampusHub student portal practical project"
git branch -M main
# Create an empty GitHub repository named CampusHub-Student-Portal, then add its URL:
git remote add origin https://github.com/YOUR-USERNAME/CampusHub-Student-Portal.git
git push -u origin main
```

Replace `YOUR-USERNAME` with your GitHub username. Do not commit passwords, real student data, or uploaded private files.

## Security notes

- Use HTTPS for deployment and configure production secrets outside source control.
- Create a dedicated database user with limited permissions instead of using MySQL root in production.
- Add rate limiting, email verification, password reset, stronger audit logging and automated tests before production use.
- Ensure the web server prevents PHP execution in the upload directory.
- `remember_token_hash` is reserved in the schema; a complete persistent remember-me token workflow has not been implemented yet.
