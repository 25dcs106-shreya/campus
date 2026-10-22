/* =========================================================
   1. STORAGE — every student's details live here
   ========================================================= */

var STUDENT_KEY = "campushub_students";
var SESSION_KEY = "campushub_session";

var SEED_STUDENTS = [
    {
        enroll: "25DCS106",
        password: "shreya",
        name: "Shreya Patel",
        email: "shreya@charusat.edu.in",
        phone: "+91 98250 11111",
        branch: "Computer Engineering, Sem 5",
        attendance: 86,
        credits: 18,
        spiOverride: null,
        registered: [],
        bookmarks: [],
        readNotifs: [],
        marks: [
    { code: "CE501", subject: "Computer Networking",  credits: 4, internal: 38, external: 55, attendance: 91 },
    { code: "CE502", subject: "Operating Systems",    credits: 4, internal: 37, external: 54, attendance: 84 },
    { code: "CE503", subject: "Database Management",  credits: 4, internal: 39, external: 56, attendance: 95 },
    { code: "CE504", subject: "Software Engineering", credits: 3, internal: 36, external: 55, attendance: 78 },
    { code: "CE505", subject: "Web Development Lab",  credits: 2, internal: 39, external: 58, attendance: 88 }
]
    },
    {
        enroll: "23CE002",
        password: "student123",
        name: "Aarav Shah",
        email: "aarav@charusat.edu.in",
        phone: "+91 98250 22222",
        branch: "Information Technology, Sem 5",
        attendance: 74,
        credits: 16,
        spiOverride: null,
        registered: [],
        bookmarks: [],
        readNotifs: [],
        marks: [
            { code: "IT501", subject: "Computer Networking", credits: 4, internal: 27, external: 39, attendance: 70 },
            { code: "IT502", subject: "Operating Systems", credits: 4, internal: 33, external: 47, attendance: 76 },
            { code: "IT503", subject: "Database Management", credits: 4, internal: 25, external: 36, attendance: 65 },
            { code: "IT504", subject: "Software Engineering", credits: 3, internal: 30, external: 50, attendance: 80 },
            { code: "IT505", subject: "Web Development Lab", credits: 2, internal: 35, external: 52, attendance: 79 }
        ]
    }
];

function loadStudents() {
    var raw = localStorage.getItem(STUDENT_KEY);

    if (!raw) {
        localStorage.setItem(STUDENT_KEY, JSON.stringify(SEED_STUDENTS));
        return JSON.parse(JSON.stringify(SEED_STUDENTS));
    }

    try {
        return JSON.parse(raw);
    } catch (e) {
        localStorage.setItem(STUDENT_KEY, JSON.stringify(SEED_STUDENTS));
        return JSON.parse(JSON.stringify(SEED_STUDENTS));
    }
}

function saveStudents(list) {
    localStorage.setItem(STUDENT_KEY, JSON.stringify(list));
}

var students = loadStudents();
var current = null;
var failCount = 0;

function findStudent(id) {
    var key = (id || "").trim().toLowerCase();

    for (var i = 0; i < students.length; i++) {
        if ((students[i].enroll || "").toLowerCase() === key) {
            return students[i];
        }

        if ((students[i].email || "").toLowerCase() === key) {
            return students[i];
        }
    }

    return null;
}

function persist() {
    saveStudents(students);
}


/* =========================================================
   2. STATIC CONTENT
   ========================================================= */

var EVENTS = [
    {
        id: "e1",
        kicker: "24 Sep · Auditorium",
        title: "AI in Healthcare",
        desc: "Guest lecture on machine learning in diagnostics, with a live demo."
    },
    {
        id: "e2",
        kicker: "28 Sep · Lab 4",
        title: "React Bootcamp",
        desc: "Two-day hands-on workshop. Bring a laptop with Node installed."
    },
    {
        id: "e3",
        kicker: "02 Oct · Ground",
        title: "Inter-college Sports Meet",
        desc: "Cricket, volleyball and athletics. Register as a team."
    },
    {
        id: "e4",
        kicker: "09 Oct · Seminar Hall",
        title: "Hackathon Prep Session",
        desc: "Problem-statement walkthrough and team-building for SIH."
    },
    {
        id: "e5",
        kicker: "15 Oct · Block C",
        title: "Placement Talk",
        desc: "Alumni panel on interviews, resumes and the first year at work."
    },
    {
        id: "e6",
        kicker: "22 Oct · Open Air",
        title: "Cultural Night",
        desc: "Music, dance and the annual department showcase."
    },

    {
        id: "e7",
        kicker: "25 Oct · Seminar Hall",
        title: "Cybersecurity Awareness Workshop",
        desc: "Learn about phishing, password security, social engineering and protecting your digital identity."
    },
    {
        id: "e8",
        kicker: "30 Oct · Innovation Lab",
        title: "AI & Generative AI Workshop",
        desc: "Explore prompt engineering, generative AI tools and practical AI applications through hands-on activities."
    },
    {
        id: "e9",
        kicker: "04 Nov · Auditorium",
        title: "Tech Career Connect",
        desc: "Industry professionals discuss software development, AI careers, internships and the skills recruiters look for."
    },
    {
        id: "e10",
        kicker: "08 Nov · Lab 2",
        title: "Git & GitHub Masterclass",
        desc: "Learn repositories, branches, commits, pull requests and collaborative development using GitHub."
    },
    {
        id: "e11",
        kicker: "12 Nov · Ground",
        title: "Campus Innovation Expo",
        desc: "Students showcase innovative projects, prototypes and technology solutions developed throughout the semester."
    },
    {
        id: "e12",
        kicker: "18 Nov · Seminar Hall",
        title: "Resume & LinkedIn Workshop",
        desc: "Build a professional student profile, improve your resume and learn how to present your projects effectively."
    },
    {
        id: "e13",
        kicker: "23 Nov · Auditorium",
        title: "Coding Challenge Day",
        desc: "Test your programming and problem-solving skills through individual and team coding challenges."
    },
    {
        id: "e14",
        kicker: "28 Nov · Lab 5",
        title: "UI/UX Design Sprint",
        desc: "Create user flows, wireframes and interface prototypes while learning user-centered design."
    },
    {
        id: "e15",
        kicker: "03 Dec · Sports Complex",
        title: "Annual Sports Day",
        desc: "A full day of athletics, cricket, volleyball and indoor sporting competitions."
    },
    {
        id: "e16",
        kicker: "10 Dec · Auditorium",
        title: "Entrepreneurship & Startup Talk",
        desc: "Founders and young entrepreneurs share their experiences building products, teams and technology startups."
    }
];


var FAQS = [
    {
        id: "f1",
        q: "Why can't I open Marks or Courses?",
        a: "Those pages are locked until you log in. Use your enrolment number and password on the login card above."
    },
    {
        id: "f2",
        q: "I forgot my password.",
        a: "Contact the academic office with your enrolment number and they will reset it for you."
    },
    {
        id: "f3",
        q: "My marks look wrong.",
        a: "Raise a re-verification request within seven days of the result being declared."
    }
];


var COURSES = [
    {
        id: "c1",
        cat: "Core",
        name: "Computer Networking",
        instr: "Prof. R. Mehta",
        progress: 72,
        weeks: "Week 9 of 14",
        slot: "Mon & Wed · 10:00–11:00 AM · Room 204"
    },
    {
        id: "c2",
        cat: "Core",
        name: "Operating Systems",
        instr: "Dr. S. Nair",
        progress: 64,
        weeks: "Week 8 of 14",
        slot: "Tue & Thu · 9:00–10:00 AM · Room 108"
    },
    {
        id: "c3",
        cat: "Core",
        name: "Database Management",
        instr: "Prof. K. Desai",
        progress: 81,
        weeks: "Week 11 of 14",
        slot: "Mon, Wed & Fri · 11:15 AM–12:15 PM · Room 210"
    },
    {
        id: "c4",
        cat: "Elective",
        name: "Software Engineering",
        instr: "Dr. A. Joshi",
        progress: 55,
        weeks: "Week 7 of 14",
        slot: "Tue & Fri · 1:00–2:00 PM · Room 306"
    },
    {
        id: "c5",
        cat: "Lab",
        name: "Web Development Lab",
        instr: "Prof. M. Trivedi",
        progress: 90,
        weeks: "Week 12 of 14",
        slot: "Thu · 2:00–4:00 PM · Lab 4"
    },
    {
        id: "c6",
        cat: "Elective",
        name: "Cloud Computing",
        instr: "Dr. P. Kulkarni",
        progress: 40,
        weeks: "Week 5 of 14",
        slot: "Wed · 3:00–4:00 PM · Room 301"
    },

    {
        id: "c7",
        cat: "Core",
        name: "Data Structures & Algorithms",
        instr: "Prof. A. Patel",
        progress: 68,
        weeks: "Week 8 of 14",
        slot: "Mon & Thu · 10:00–11:00 AM · Room 205"
    },
    {
        id: "c8",
        cat: "Core",
        name: "Computer Architecture",
        instr: "Dr. N. Shah",
        progress: 58,
        weeks: "Week 7 of 14",
        slot: "Tue & Fri · 11:15 AM–12:15 PM · Room 202"
    },
    {
        id: "c9",
        cat: "Elective",
        name: "Artificial Intelligence",
        instr: "Prof. P. Mehta",
        progress: 46,
        weeks: "Week 6 of 14",
        slot: "Mon & Wed · 2:00–3:00 PM · Room 304"
    },
    {
        id: "c10",
        cat: "Elective",
        name: "Machine Learning",
        instr: "Dr. R. Desai",
        progress: 52,
        weeks: "Week 7 of 14",
        slot: "Tue & Thu · 3:00–4:00 PM · AI Lab"
    },
    {
        id: "c11",
        cat: "Elective",
        name: "Cybersecurity Fundamentals",
        instr: "Prof. V. Joshi",
        progress: 35,
        weeks: "Week 5 of 14",
        slot: "Wed & Fri · 10:00–11:00 AM · Room 307"
    },
    {
        id: "c12",
        cat: "Lab",
        name: "Python Programming Lab",
        instr: "Prof. K. Trivedi",
        progress: 76,
        weeks: "Week 10 of 14",
        slot: "Mon · 2:00–4:00 PM · Lab 2"
    },
    {
        id: "c13",
        cat: "Lab",
        name: "Database Management Lab",
        instr: "Dr. S. Desai",
        progress: 63,
        weeks: "Week 8 of 14",
        slot: "Tue · 2:00–4:00 PM · Lab 3"
    },
    {
        id: "c14",
        cat: "Elective",
        name: "Mobile Application Development",
        instr: "Prof. M. Shah",
        progress: 29,
        weeks: "Week 4 of 14",
        slot: "Thu · 11:15 AM–12:15 PM · Room 309"
    },
    {
        id: "c15",
        cat: "Elective",
        name: "Internet of Things",
        instr: "Dr. H. Patel",
        progress: 42,
        weeks: "Week 6 of 14",
        slot: "Fri · 2:00–3:00 PM · IoT Lab"
    },
    {
        id: "c16",
        cat: "Core",
        name: "Web Technologies",
        instr: "Prof. S. Mehta",
        progress: 70,
        weeks: "Week 9 of 14",
        slot: "Mon & Wed · 9:00–10:00 AM · Room 201"
    }
];


var SERVICES = [
    {
        icon: "📚",
        name: "Central Library",
        loc: "Block A, Ground floor",
        desc: "Reference books, past papers and quiet study rooms. ID card required to issue books.",
        hours: [
            { day: "Mon – Fri", time: "8:00 AM – 8:00 PM" },
            { day: "Saturday", time: "9:00 AM – 5:00 PM" },
            { day: "Sunday", time: "Closed", closed: true },
            { day: "During exams", time: "Open 24 hours" }
        ]
    },
    {
        icon: "🖨️",
        name: "Printing & Xerox",
        loc: "Block B, Near canteen",
        desc: "Printouts, photocopies, spiral binding and scanning for assignments and reports.",
        hours: [
            { day: "Mon – Sat", time: "8:30 AM – 6:30 PM" },
            { day: "Sunday", time: "Closed", closed: true }
        ]
    },
    {
        icon: "🍽️",
        name: "Cafeteria",
        loc: "Central courtyard",
        desc: "Breakfast, lunch and snacks. Accepts cash and campus card.",
        hours: [
            { day: "Mon – Sat", time: "7:30 AM – 9:00 PM" },
            { day: "Sunday", time: "9:00 AM – 3:00 PM" }
        ]
    },
    {
        icon: "🏟️",
        name: "Sports Complex",
        loc: "East campus",
        desc: "Cricket ground, indoor courts and a gym. Booking needed for the courts.",
        hours: [
            { day: "Mon – Sat", time: "6:00 AM – 9:00 PM" },
            { day: "Sunday", time: "6:00 AM – 12:00 PM" }
        ]
    },
    {
        icon: "🏥",
        name: "Health Centre",
        loc: "Block A, Ground floor",
        desc: "Resident doctor for first aid and general check-ups. Emergencies attended any time.",
        hours: [
            { day: "Mon – Sat", time: "9:00 AM – 6:00 PM" },
            { day: "Emergencies", time: "Available 24 hours" }
        ]
    },
    {
        icon: "💻",
        name: "IT Helpdesk",
        loc: "Block C, First floor",
        desc: "Wi-Fi access, portal login issues and lab computer support.",
        hours: [
            { day: "Mon – Fri", time: "9:00 AM – 6:00 PM" },
            { day: "Sat & Sun", time: "Closed", closed: true }
        ]
    },
    {
        icon: "🚌",
        name: "Transport Desk",
        loc: "Main gate",
        desc: "Bus pass renewals and route information for all city routes.",
        hours: [
            { day: "Mon – Fri", time: "8:00 AM – 4:00 PM" },
            { day: "Sat & Sun", time: "Closed", closed: true }
        ]
    },
    {
        icon: "🏠",
        name: "Hostel Office",
        loc: "Hostel Block D",
        desc: "Room allotment, maintenance requests and leave applications.",
        hours: [
            { day: "Mon – Sat", time: "9:00 AM – 7:00 PM" },
            { day: "Sunday", time: "10:00 AM – 1:00 PM" }
        ]
    }
];


var NOTIFS = [
    {
        id: "n1",
        day: "Today",
        icon: "📢",
        title: "Networking result declared",
        body: "Unit test 2 marks are now on your Marks page.",
        time: "2h ago"
    },
    {
        id: "n2",
        day: "Today",
        icon: "🎪",
        title: "React Bootcamp seats open",
        body: "40 seats, first come first served.",
        time: "5h ago"
    },
    {
        id: "n3",
        day: "Yesterday",
        icon: "📅",
        title: "Lab session moved",
        body: "Friday's DBMS lab shifts to Lab 6.",
        time: "1d ago"
    },
    {
        id: "n4",
        day: "Yesterday",
        icon: "⚠️",
        title: "Attendance below 75%",
        body: "Two subjects need attention before the exam.",
        time: "1d ago"
    }
];


/* =========================================================
   3. PAGE ROUTING WITH LOGIN GATE
   ========================================================= */

var PROTECTED = [
    "dashboard",
    "academics",
    "services",
    "events",
    "courses",
    "marks",
    "profile",
    "notifications"
];

function isProtected(page) {
    return PROTECTED.indexOf(page) !== -1;
}

function showPage(page) {

    if (page === "home" && current) {
        page = "dashboard";
    }

    if (isProtected(page) && !current) {
        showPage("home");
        showLoginForm();
        setLoginError("Log in first to open that page.");

        var loginField = document.getElementById("loginId");
        if (loginField) loginField.focus();

        return;
    }

    var pages = document.querySelectorAll(".page");

    for (var i = 0; i < pages.length; i++) {
        pages[i].classList.remove("active");
    }

    var el = document.getElementById("page-" + page);

    if (el) {
        el.classList.add("active");
    }

    window.scrollTo(0, 0);
}


function refreshNav() {

    var links = document.querySelectorAll("[data-protected]");

    for (var i = 0; i < links.length; i++) {

        if (current) {
            links[i].classList.remove("locked");
        } else {
            links[i].classList.add("locked");
        }
    }

    var profileBtn = document.getElementById("profileBtn");
    var authBtn = document.getElementById("authBtn");

    if (profileBtn) {
        profileBtn.style.display = current ? "inline-block" : "none";
    }

    if (authBtn) {
        authBtn.textContent = current ? "Log out" : "Login";
    }
}


document.addEventListener("click", function (e) {

    var target = e.target.closest("[data-page]");

    if (target) {
        showPage(target.getAttribute("data-page"));
    }
});


/* =========================================================
   4. LOGIN / SIGNUP
   ========================================================= */

var loginId = document.getElementById("loginId");
var loginPass = document.getElementById("loginPass");
var loginError = document.getElementById("loginError");
var idHint = document.getElementById("loginIdHint");
var passHint = document.getElementById("loginPassHint");


function clearLoginErrors() {

    loginError.classList.remove("show");

    loginId.classList.remove("input-error");
    loginPass.classList.remove("input-error");

    idHint.classList.remove("show");
    passHint.classList.remove("show");
}


function setLoginError(msg) {

    loginError.textContent = msg;
    loginError.classList.add("show");
}


function flagId(msg) {

    loginId.classList.add("input-error");

    idHint.textContent = msg;
    idHint.classList.add("show");
}


function flagPass(msg) {

    loginPass.classList.add("input-error");

    passHint.textContent = msg;
    passHint.classList.add("show");
}


loginId.addEventListener("input", clearLoginErrors);
loginPass.addEventListener("input", clearLoginErrors);


function attemptLogin() {

    clearLoginErrors();

    var id = loginId.value.trim();
    var pw = loginPass.value;

    if (!id) {

        setLoginError("Enter your enrolment number to continue.");
        flagId("This field is required.");

        return;
    }

    if (!pw) {

        setLoginError("Enter your password to continue.");
        flagPass("This field is required.");

        return;
    }

    var student = findStudent(id);

    if (!student) {

        setLoginError("No student found with that enrolment number.");
        flagId("Check the enrolment number and try again.");

        return;
    }

    if (student.password !== pw) {

        failCount++;

        if (failCount >= 3) {

            setLoginError(
                "Wrong password — " +
                failCount +
                " failed attempts. Contact the academic office to reset it."
            );

        } else {

            setLoginError(
                "Wrong password for " +
                student.enroll +
                "."
            );
        }

        flagPass("The password doesn't match this account.");

        loginPass.value = "";
        loginPass.focus();

        return;
    }

    failCount = 0;

    current = student;

    var rememberMe = document.getElementById("rememberMe");

    if (rememberMe && rememberMe.checked) {

        localStorage.setItem(
            SESSION_KEY,
            student.enroll
        );

        sessionStorage.removeItem(SESSION_KEY);

    } else {

        sessionStorage.setItem(
            SESSION_KEY,
            student.enroll
        );

        localStorage.removeItem(SESSION_KEY);
    }

    loginPass.value = "";

    afterLogin();
}


function afterLogin() {

    refreshNav();
    renderEverything();

    showPage("dashboard");

    toast("Logged in as " + current.name);
}


function logout() {

    current = null;

    localStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem(SESSION_KEY);

    clearProtectedContent();

    refreshNav();

    showPage("home");
    showLoginForm();

    toast("Logged out");
}


function clearProtectedContent() {

    [
        "dashGrid",
        "subjectSnapshot",
        "upcomingEvents",
        "eventsGrid",
        "regList",
        "courseGrid",
        "marksSummary",
        "marksBody",
        "pfTags",
        "pfStats",
        "pfCourses",
        "pfEvents",
        "notifList",
        "academicList",
        "servicesGrid"
    ].forEach(function (id) {

        var el = document.getElementById(id);

        if (el) {
            el.innerHTML = "";
        }
    });
}


/* =========================================================
   SIGNUP
   ========================================================= */

var signupError = document.getElementById("signupError");
var signupOk = document.getElementById("signupOk");

function showSignupForm() {

    document.getElementById("loginCard").style.display = "none";
    document.getElementById("signupCard").style.display = "block";
}


function showLoginForm() {

    document.getElementById("signupCard").style.display = "none";
    document.getElementById("loginCard").style.display = "block";
}


function suField(id) {
    return document.getElementById(id);
}


/* ---------- Regular expressions used by the registration form ---------- */

var RX = {
    name:    /^[A-Za-z][A-Za-z .'-]{1,49}$/,
    enroll:  /^\d{2}[A-Za-z]{2,4}\d{3}$/,
    email:   /^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/,
    mobile:  /^(?:\+91|91|0)?[6-9]\d{9}$/,
    // 8+ chars, at least one lower, upper, digit and symbol, and no spaces
    pass:    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s])\S{8,}$/,
    course:  /^(?:CE|IT|CSE|AIML|EC|ME)$/,
    year:    /^[1-4]$/,
    gender:  /^(?:male|female|other)$/
};

var COURSE_NAMES = {
    CE: "Computer Engineering",
    IT: "Information Technology",
    CSE: "Computer Science & Engineering",
    AIML: "AI & Machine Learning",
    EC: "Electronics & Communication",
    ME: "Mechanical Engineering"
};

// every text-like signup field: its id, its regex test and its hint id
var SIGNUP_FIELDS = [
    { id: "suName",   hint: "suNameHint",   test: function (v) { return RX.name.test(v); } },
    { id: "suEnroll", hint: "suEnrollHint", test: function (v) { return RX.enroll.test(v); } },
    { id: "suEmail",  hint: "suEmailHint",  test: function (v) { return RX.email.test(v); } },
    { id: "suMobile", hint: "suMobileHint", test: function (v) { return RX.mobile.test(v.replace(/[\s-]/g, "")); } },
    { id: "suPass",   hint: "suPassHint",   test: function (v) { return RX.pass.test(v); } },
    { id: "suPass2",  hint: "suPass2Hint",  test: function (v) { return v !== "" && v === suField("suPass").value; } },
    { id: "suCourse", hint: "suCourseHint", test: function (v) { return RX.course.test(v); } },
    { id: "suYear",   hint: "suYearHint",   test: function (v) { return RX.year.test(v); } }
];

function getGender() {

    var picked = document.querySelector('input[name="suGender"]:checked');

    return picked ? picked.value : "";
}

function setFieldState(f, ok) {

    var el = suField(f.id);
    var hint = document.getElementById(f.hint);

    el.classList.toggle("input-error", !ok);
    hint.classList.toggle("show", !ok);
}

function checkField(f) {

    var el = suField(f.id);
    var value = (f.id === "suPass" || f.id === "suPass2") ? el.value : el.value.trim();
    var ok = f.test(value);

    setFieldState(f, ok);

    return ok;
}

function checkGender() {

    var ok = RX.gender.test(getGender());

    document.getElementById("suGenderGroup").classList.toggle("group-error", !ok);
    document.getElementById("suGenderHint").classList.toggle("show", !ok);

    return ok;
}

function checkTerms() {

    var ok = suField("suTerms").checked;

    document.getElementById("suTermsGroup").classList.toggle("group-error", !ok);
    document.getElementById("suTermsHint").classList.toggle("show", !ok);

    return ok;
}

function clearSignupErrors() {

    signupError.classList.remove("show");
    signupOk.classList.remove("show");

    SIGNUP_FIELDS.forEach(function (f) {

        suField(f.id).classList.remove("input-error");
        document.getElementById(f.hint).classList.remove("show");
    });

    ["suGenderGroup", "suTermsGroup"].forEach(function (id) {
        document.getElementById(id).classList.remove("group-error");
    });

    ["suGenderHint", "suTermsHint"].forEach(function (id) {
        document.getElementById(id).classList.remove("show");
    });
}


function signupFail(msg, ids) {

    signupError.textContent = msg;
    signupError.classList.add("show");

    ids.forEach(function (id) {

        if (id) {
            suField(id).classList.add("input-error");
        }
    });
}


function isValidEmail(v) {

    return RX.email.test((v || "").trim());
}


/* live validation: check a field once the user has typed something */

SIGNUP_FIELDS.forEach(function (f) {

    var el = suField(f.id);
    var evt = el.tagName === "SELECT" ? "change" : "input";

    el.addEventListener(evt, function () {

        if (el.value !== "" || evt === "change") {
            checkField(f);
        } else {
            setFieldState(f, true);
        }

        // keep "confirm password" in step while the password changes
        if (f.id === "suPass" && suField("suPass2").value !== "") {
            checkField(SIGNUP_FIELDS[5]);
        }
    });

    el.addEventListener("blur", function () {

        if (el.value !== "") {
            checkField(f);
        }
    });
});

// the mobile field only accepts digits, spaces, dashes and a leading +
suField("suMobile").addEventListener("input", function () {
    this.value = this.value.replace(/[^\d+\s-]/g, "");
});

// enrolment numbers are stored in capitals
suField("suEnroll").addEventListener("input", function () {
    this.value = this.value.toUpperCase();
});

Array.prototype.forEach.call(
    document.querySelectorAll('input[name="suGender"]'),
    function (r) { r.addEventListener("change", checkGender); }
);

suField("suTerms").addEventListener("change", checkTerms);


function formatMobile(v) {

    var digits = v.replace(/\D/g, "").slice(-10);

    return "+91 " + digits.slice(0, 5) + " " + digits.slice(5);
}


function attemptSignup() {

    clearSignupErrors();

    // run every check (no early exit) so all problems are highlighted together
    var allOk = true;

    SIGNUP_FIELDS.forEach(function (f) {
        if (!checkField(f)) { allOk = false; }
    });

    if (!checkGender()) { allOk = false; }
    if (!checkTerms()) { allOk = false; }

    if (!allOk) {

        signupError.textContent = "Please fix the highlighted fields and try again.";
        signupError.classList.add("show");

        return;
    }

    var name = suField("suName").value.trim();
    var enroll = suField("suEnroll").value.trim().toUpperCase();
    var email = suField("suEmail").value.trim();
    var mobile = suField("suMobile").value.trim();
    var pw = suField("suPass").value;
    var course = suField("suCourse").value;
    var year = suField("suYear").value;
    var gender = getGender();

    if (findStudent(enroll)) {

        signupFail(
            "That enrolment number is already registered.",
            ["suEnroll"]
        );

        return;
    }

    var emailExists = students.some(function (student) {

        return (
            (student.email || "").toLowerCase() ===
            email.toLowerCase()
        );
    });

    if (emailExists) {

        signupFail(
            "That email is already registered.",
            ["suEmail"]
        );

        return;
    }

    var student = {

        enroll: enroll,
        password: pw,
        name: name,
        email: email,
        phone: formatMobile(mobile),
        branch: COURSE_NAMES[course] + ", Year " + year,
        course: course,
        year: year,
        gender: gender,

        attendance: 100,
        credits: 0,
        spiOverride: null,

        registered: [],
        bookmarks: [],
        readNotifs: [],

        marks: [
            {
                code: "GEN501",
                subject: "Computer Networking",
                credits: 4,
                internal: 0,
                external: 0,
                attendance: 100
            },
            {
                code: "GEN502",
                subject: "Operating Systems",
                credits: 4,
                internal: 0,
                external: 0,
                attendance: 100
            },
            {
                code: "GEN503",
                subject: "Database Management",
                credits: 4,
                internal: 0,
                external: 0,
                attendance: 100
            }
        ]
    };

    students.push(student);

    persist();

    signupOk.classList.add("show");

    SIGNUP_FIELDS.forEach(function (f) {
        suField(f.id).value = "";
    });

    Array.prototype.forEach.call(
        document.querySelectorAll('input[name="suGender"]'),
        function (r) { r.checked = false; }
    );

    suField("suTerms").checked = false;

    setTimeout(function () {

        showLoginForm();

        clearLoginErrors();

        loginId.value = enroll;

        loginPass.focus();

    }, 900);
}


/* =========================================================
   5. RENDER EVERYTHING
   ========================================================= */

function renderEverything() {

    if (!current) return;

    renderDashboard();
    renderEvents();
    renderCourses();
    renderMarks();
    renderAcademics();
    renderServices();
    renderProfile();
    renderNotifs();
}


/* =========================================================
   DASHBOARD
   ========================================================= */

function renderDashboard() {

    if (!current) return;

    document.getElementById("dashAvatar").textContent =
        current.name.charAt(0).toUpperCase();

    document.getElementById("welcomeName").textContent =
        greeting() +
        ", " +
        current.name.split(" ")[0];

    document.getElementById("welcomeSub").textContent =
        current.branch +
        " · " +
        current.enroll +
        " · " +
        today();

    var totals = markTotals();

    document.getElementById("dashGrid").innerHTML =

        card(
            current.attendance + "%",
            "Attendance"
        ) +

        card(
            totals.earnedCredits,
            "Credits earned"
        ) +

        card(
            getSPI(),
            "Current SPI"
        ) +

        card(
            current.registered.length,
            "Events registered"
        );


    function card(big, label) {

        return (
            '<div class="dash-card">' +
            '<b>' + big + '</b>' +
            '<span>' + label + '</span>' +
            '</div>'
        );
    }


    var ranked = current.marks
        .slice()
        .sort(function (a, b) {

            return (
                (b.internal + b.external) -
                (a.internal + a.external)
            );

        })
        .slice(0, 3);


    document.getElementById("subjectSnapshot").innerHTML =

        ranked.map(function (m) {

            var total =
                m.internal +
                m.external;

            return (

                '<div class="snapshot-row">' +

                    '<div>' +

                        '<p class="snapshot-name">' +
                            m.subject +
                        '</p>' +

                        '<p class="snapshot-sub">' +
                            total +
                            ' / 100 · ' +
                            (m.credits || 1) +
                            ' credits' +
                        '</p>' +

                    '</div>' +

                    '<span class="snapshot-grade">' +
                        gradeFor(total) +
                    '</span>' +

                '</div>'
            );

        }).join("") ||

        '<p class="empty-state">No marks yet.</p>';


    var upcoming = EVENTS.slice(0, 2);

    document.getElementById("upcomingEvents").innerHTML =

        upcoming.map(function (ev) {

            var joined =
                current.registered.indexOf(ev.id) !== -1;

            return (

                '<div class="upcoming-row">' +

                    '<h4>' +
                        ev.title +
                    '</h4>' +

                    '<span>' +
                        ev.kicker +
                        (joined ? " · Registered" : "") +
                    '</span>' +

                '</div>'
            );

        }).join("");
}


/* =========================================================
   EVENTS
   ========================================================= */

function renderEvents() {

    if (!current) return;

    var grid =
        document.getElementById("eventsGrid");

    var query =
        (document.getElementById("eventSearch").value || "")
            .trim()
            .toLowerCase();

    var list =
        !query
        ? EVENTS
        : EVENTS.filter(function (ev) {

            return (
                ev.title.toLowerCase().indexOf(query) !== -1 ||
                ev.desc.toLowerCase().indexOf(query) !== -1 ||
                ev.kicker.toLowerCase().indexOf(query) !== -1
            );
        });

    document.getElementById("eventsEmpty").style.display =
        list.length ? "none" : "block";

    grid.innerHTML =

        list.map(function (ev) {

            var joined =
                current.registered.indexOf(ev.id) !== -1;

            return (

                '<div class="event-card ' +
                    (joined ? "registered" : "") +
                '">' +

                    '<p class="kicker">' +
                        ev.kicker +
                    '</p>' +

                    '<h4>' +
                        ev.title +
                    '</h4>' +

                    '<p>' +
                        ev.desc +
                    '</p>' +

                    '<a class="btn ' +
                        (joined ? "btn-ghost" : "btn-gold") +
                        ' register-event-btn" ' +
                        'data-event="' +
                        ev.id +
                        '" ' +
                        'style="text-align:center">' +

                        (
                            joined
                            ? "Cancel registration"
                            : "Register"
                        ) +

                    '</a>' +

                '</div>'
            );

        }).join("");


    var btns =
        grid.querySelectorAll(
            ".register-event-btn"
        );


    for (var i = 0; i < btns.length; i++) {

        btns[i].addEventListener(
            "click",
            function () {

                toggleEvent(
                    this.getAttribute("data-event")
                );
            }
        );
    }

    renderRegList();
}


function toggleEvent(id) {

    if (!current) return;

    var pos =
        current.registered.indexOf(id);

    var ev =
        EVENTS.filter(function (e) {
            return e.id === id;
        })[0];


    if (!ev) return;


    if (pos === -1) {

        current.registered.push(id);

        toast(
            "Registered for " +
            ev.title
        );

    } else {

        current.registered.splice(
            pos,
            1
        );

        toast("Registration cancelled");
    }


    persist();

    renderEvents();
    renderDashboard();
    renderProfile();
}


function renderRegList() {

    var list =
        document.getElementById("regList");

    if (!current.registered.length) {

        list.innerHTML =
            '<p class="empty-state">' +
            'No registrations yet. Pick an event above.' +
            '</p>';

        return;
    }


    list.innerHTML =

        current.registered.map(function (id) {

            var ev =
                EVENTS.filter(function (e) {
                    return e.id === id;
                })[0];

            if (!ev) return "";

            return (

                '<div class="registration-item">' +

                    '<div>' +

                        '<h4>' +
                            ev.title +
                        '</h4>' +

                        '<p>' +
                            ev.kicker +
                        '</p>' +

                    '</div>' +

                    '<span class="status">' +
                        'Confirmed' +
                    '</span>' +

                '</div>'
            );

        }).join("");
}


/* =========================================================
   FAQ
   ========================================================= */

function renderFAQ() {

    var container =
        document.getElementById("faqList");

    if (!container) return;

    var query =
        (document.getElementById("faqSearch").value || "")
            .trim()
            .toLowerCase();

    var list =
        !query
        ? FAQS
        : FAQS.filter(function (item) {

            return (
                item.q.toLowerCase().indexOf(query) !== -1 ||
                item.a.toLowerCase().indexOf(query) !== -1
            );
        });

    document.getElementById("faqEmpty").style.display =
        list.length ? "none" : "block";

    container.innerHTML =

        list.map(function (item) {

            return (

                '<details class="faq-item">' +

                    '<summary>' +
                        item.q +
                    '</summary>' +

                    '<p>' +
                        item.a +
                    '</p>' +

                '</details>'
            );

        }).join("");
}


/* =========================================================
   COURSES
   ========================================================= */

var activeFilter = "all";


function renderCourses() {

    if (!current) return;

    var grid =
        document.getElementById("courseGrid");


    grid.innerHTML =

        COURSES.map(function (c) {

            var marked =
                current.bookmarks.indexOf(c.id) !== -1;

            var hidden =
                (
                    activeFilter !== "all" &&
                    c.cat !== activeFilter
                )
                ? " hidden"
                : "";


            return (

                '<div class="course-card' +
                    hidden +
                '">' +

                    '<button class="bookmark-btn ' +
                        (marked ? "active" : "") +
                        '" ' +
                        'data-course="' +
                        c.id +
                        '">' +

                        (
                            marked
                            ? "★"
                            : "☆"
                        ) +

                    '</button>' +

                    '<p class="course-badge">' +
                        c.cat +
                    '</p>' +

                    '<h4>' +
                        c.name +
                    '</h4>' +

                    '<p class="instr">' +
                        c.instr +
                    '</p>' +

                    '<div class="progress-track">' +

                        '<div class="progress-fill" ' +
                            'style="width:' +
                            c.progress +
                            '%">' +
                        '</div>' +

                    '</div>' +

                    '<div class="course-meta">' +

                        '<span>' +
                            c.weeks +
                        '</span>' +

                        '<span>' +
                            c.progress +
                            '%' +
                        '</span>' +

                    '</div>' +

                    '<div class="course-slot">' +
                        c.slot +
                    '</div>' +

                '</div>'
            );

        }).join("");


    var stars =
        grid.querySelectorAll(
            ".bookmark-btn"
        );


    for (var i = 0; i < stars.length; i++) {

        stars[i].addEventListener(
            "click",
            function () {

                var id =
                    this.getAttribute(
                        "data-course"
                    );

                var pos =
                    current.bookmarks.indexOf(id);


                if (pos === -1) {

                    current.bookmarks.push(id);

                    toast("Course bookmarked");

                } else {

                    current.bookmarks.splice(
                        pos,
                        1
                    );

                    toast("Bookmark removed");
                }


                persist();

                renderCourses();
                renderProfile();
            }
        );
    }
}


var chips =
    document.querySelectorAll(
        "#filterRow .chip"
    );


for (
    var ci = 0;
    ci < chips.length;
    ci++
) {

    chips[ci].addEventListener(
        "click",
        function () {

            for (
                var j = 0;
                j < chips.length;
                j++
            ) {
                chips[j].classList.remove(
                    "active"
                );
            }

            this.classList.add("active");

            activeFilter =
                this.getAttribute(
                    "data-filter"
                );

            renderCourses();
        }
    );
}


/* =========================================================
   MARKS
   ========================================================= */

function gradeFor(total) {

    if (total >= 90) return "AA";
    if (total >= 80) return "AB";
    if (total >= 70) return "BB";
    if (total >= 60) return "BC";
    if (total >= 50) return "CC";
    if (total >= 40) return "CD";

    return "FF";
}


function pointFor(total) {

    if (total >= 90) return 8;
    if (total >= 80) return 7;
    if (total >= 70) return 6;
    if (total >= 60) return 5;
    if (total >= 50) return 4;
    if (total >= 40) return 3;

    return 0;
}


function markTotals() {

    var sum = 0;
    var weightedPts = 0;
    var totalCredits = 0;
    var earnedCredits = 0;
    var best = 0;
    var passed = 0;


    current.marks.forEach(function (m) {

        var t =
            m.internal +
            m.external;

        var cr =
            m.credits || 1;


        sum += t;

        weightedPts +=
            pointFor(t) * cr;

        totalCredits += cr;


        if (t > best) {
            best = t;
        }


        if (t >= 40) {

            passed++;
            earnedCredits += cr;
        }
    });


    var n =
        current.marks.length || 1;


    return {

        avg:
            Math.round(
                sum / n
            ),

        spi:
            totalCredits
            ? (
                weightedPts /
                totalCredits
            ).toFixed(2)
            : "0.00",

        best:
            best,

        earnedCredits:
            earnedCredits,

        passed:
            passed +
            "/" +
            current.marks.length
    };
}


function getSPI() {

    if (
        current.spiOverride !== null &&
        current.spiOverride !== undefined
    ) {

        return Number(
            current.spiOverride
        ).toFixed(2);
    }

    return markTotals().spi;
}


function renderMarks() {

    if (!current) return;

    document.getElementById("marksSub").textContent =
        current.branch +
        " · " +
        current.enroll;


    var t = markTotals();


    document.getElementById("marksSummary").innerHTML =

        box("Average", t.avg) +
        box("SPI", getSPI()) +
        box("Highest", t.best) +
        box("Cleared", t.passed);


    document.getElementById("marksBody").innerHTML =

        current.marks.map(function (m) {

            var total =
                m.internal +
                m.external;


            return (

                '<tr>' +

                    '<td>' +
                        m.code +
                    '</td>' +

                    '<td>' +
                        m.subject +
                    '</td>' +

                    '<td>' +
                        (m.credits || 1) +
                    '</td>' +

                    '<td>' +
                        m.internal +
                    '</td>' +

                    '<td>' +
                        m.external +
                    '</td>' +

                    '<td>' +
                        total +
                    '</td>' +

                    '<td>' +
                        gradeFor(total) +
                    '</td>' +

                '</tr>'
            );

        }).join("");


    function box(label, value) {

        return (

            '<div>' +

                '<span>' +
                    label +
                '</span>' +

                '<strong>' +
                    value +
                '</strong>' +

            '</div>'
        );
    }
}


/* =========================================================
   ACADEMICS
   ========================================================= */

function renderAcademics() {

    if (!current) return;

    var list =
        document.getElementById(
            "academicList"
        );


    list.innerHTML =

        current.marks.map(function (m) {

            var total =
                m.internal +
                m.external;


            var course =
                COURSES.filter(function (c) {

                    return c.name === m.subject;

                })[0];


            var att =
                (
                    m.attendance === undefined ||
                    m.attendance === null
                )
                ? current.attendance
                : m.attendance;


            var barColor =
                att >= 75
                ? "#8ec07c"
                : (
                    att >= 60
                    ? "#e3ab52"
                    : "#e5484d"
                );


            return (

                '<div class="academic-card">' +

                    '<div class="academic-card-head">' +

                        '<div>' +

                            '<h3>' +
                                m.subject +
                            '</h3>' +

                            '<p>' +
                                m.code +
                                (
                                    course
                                    ? " · " + course.instr
                                    : ""
                                ) +
                            '</p>' +

                        '</div>' +

                        '<span class="academic-grade">' +
                            'Grade ' +
                            gradeFor(total) +
                        '</span>' +

                    '</div>' +


                    '<div class="academic-stats">' +

                        '<div>' +
                            '<b>' +
                                (m.credits || 1) +
                            '</b>' +
                            '<span>Credits</span>' +
                        '</div>' +

                        '<div>' +
                            '<b>' +
                                m.internal +
                                '/40' +
                            '</b>' +
                            '<span>Internal</span>' +
                        '</div>' +

                        '<div>' +
                            '<b>' +
                                m.external +
                                '/60' +
                            '</b>' +
                            '<span>External</span>' +
                        '</div>' +

                        '<div>' +
                            '<b>' +
                                total +
                                '/100' +
                            '</b>' +
                            '<span>Total</span>' +
                        '</div>' +

                    '</div>' +


                    '<div class="attendance-bar-track">' +

                        '<div class="attendance-bar-fill" ' +
                            'style="width:' +
                            att +
                            '%;background-color:' +
                            barColor +
                            '">' +
                        '</div>' +

                    '</div>' +

                    '<p style="font-size:11px;color:#b5c5c2;margin-bottom:14px">' +
                        att +
                        '% attendance in this subject' +
                    '</p>' +


                    '<div class="academic-slot">' +

                        '🕒 ' +

                        '<span>' +

                            (
                                course
                                ? course.slot
                                : "Timetable not published yet"
                            ) +

                        '</span>' +

                    '</div>' +

                '</div>'
            );

        }).join("") ||

        '<p class="empty-state">' +
            'No subjects on record yet.' +
        '</p>';
}


/* =========================================================
   SERVICES
   ========================================================= */

function renderServices() {

    if (!current) return;

    var grid =
        document.getElementById(
            "servicesGrid"
        );


    grid.innerHTML =

        SERVICES.map(function (s) {

            var hoursHtml =
                s.hours.map(function (h) {

                    return (

                        '<tr>' +

                            '<td>' +
                                h.day +
                            '</td>' +

                            '<td class="' +
                                (
                                    h.closed
                                    ? "timing-closed"
                                    : ""
                                ) +
                            '">' +

                                h.time +

                            '</td>' +

                        '</tr>'
                    );

                }).join("");


            return (

                '<div class="service-card">' +

                    '<div class="service-card-head">' +

                        '<div class="service-icon">' +
                            s.icon +
                        '</div>' +

                        '<div>' +

                            '<h3>' +
                                s.name +
                            '</h3>' +

                            '<span class="loc">' +
                                s.loc +
                            '</span>' +

                        '</div>' +

                    '</div>' +

                    '<p class="desc">' +
                        s.desc +
                    '</p>' +

                    '<table class="timing-table">' +
                        hoursHtml +
                    '</table>' +

                '</div>'
            );

        }).join("");
}


/* =========================================================
   PROFILE
   ========================================================= */

function renderProfile() {

    if (!current) return;


    document.getElementById("pfAvatar").textContent =
        current.name.charAt(0).toUpperCase();


    document.getElementById("pfName").textContent =
        current.name;


    document.getElementById("pfRole").textContent =
        current.branch;


    document.getElementById("pfEnroll").textContent =
        current.enroll;


    document.getElementById("pfTags").innerHTML =

        '<span>' +
            current.enroll +
        '</span>' +

        '<span>' +
            current.attendance +
            '% attendance' +
        '</span>' +

        '<span>' +
            current.credits +
            ' credits' +
        '</span>';


    document.getElementById("edName").value =
        current.name;


    document.getElementById("edEmail").value =
        current.email;


    document.getElementById("edPhone").value =
        current.phone || "";


    document.getElementById("edBranch").value =
        current.branch;


    document.getElementById("edAttendance").value =
        current.attendance;


    document.getElementById("edSpi").value =
        getSPI();


    document.getElementById("pfStats").innerHTML =

        '<div class="dash-card">' +
            '<b>' +
                getSPI() +
            '</b>' +
            '<span>SPI</span>' +
        '</div>' +

        '<div class="dash-card">' +
            '<b>' +
                current.attendance +
                '%' +
            '</b>' +
            '<span>Attendance</span>' +
        '</div>' +

        '<div class="dash-card">' +
            '<b>' +
                current.registered.length +
            '</b>' +
            '<span>Events</span>' +
        '</div>';


    document.getElementById("pfCourses").innerHTML =

        COURSES.map(function (c) {

            return (

                '<div class="enroll-item">' +

                    '<span>' +
                        c.name +
                    '</span>' +

                    '<span class="pct">' +
                        c.progress +
                        '%' +
                    '</span>' +

                '</div>'
            );

        }).join("");


    var evHtml =

        current.registered.map(function (id) {

            var ev =
                EVENTS.filter(function (e) {
                    return e.id === id;
                })[0];


            return ev

                ? (

                    '<div class="enroll-item">' +

                        '<span>' +
                            ev.title +
                        '</span>' +

                        '<span class="pct">' +
                            'Confirmed' +
                        '</span>' +

                    '</div>'
                )

                : "";

        }).join("");


    document.getElementById("pfEvents").innerHTML =

        evHtml ||

        '<p class="empty-state">' +
            'Nothing yet.' +
        '</p>';
}


/* =========================================================
   SAVE PROFILE
   ========================================================= */

document.getElementById("saveProfile")
.addEventListener("click", function () {

    var edEmail =
        document.getElementById("edEmail");

    var edAttendance =
        document.getElementById("edAttendance");

    var edSpi =
        document.getElementById("edSpi");

    var attendanceHint =
        document.getElementById("edAttendanceHint");

    var spiHint =
        document.getElementById("edSpiHint");

    var msg =
        document.getElementById("saveMsg");


    var emailVal =
        edEmail.value.trim();

    var attendanceVal =
        edAttendance.value.trim();

    var spiVal =
        edSpi.value.trim();


    edEmail.classList.remove(
        "input-error"
    );

    edAttendance.classList.remove(
        "input-error"
    );

    edSpi.classList.remove(
        "input-error"
    );

    attendanceHint.classList.remove(
        "show"
    );

    spiHint.classList.remove(
        "show"
    );


    function fail(field, hint, text) {

        field.classList.add(
            "input-error"
        );

        if (hint) {
            hint.classList.add("show");
        }

        msg.textContent = text;
        msg.style.color = "#ff8a8e";
        msg.classList.add("show");
    }


    if (
        emailVal &&
        !isValidEmail(emailVal)
    ) {

        fail(
            edEmail,
            null,
            "That email looks wrong — check for the @ symbol."
        );

        return;
    }


    var attendanceNum =
        attendanceVal === ""
        ? current.attendance
        : Number(attendanceVal);


    if (
        isNaN(attendanceNum) ||
        attendanceNum < 0 ||
        attendanceNum > 100
    ) {

        fail(
            edAttendance,
            attendanceHint,
            "Attendance must be a number between 0 and 100."
        );

        return;
    }


    var spiNum = null;


    if (spiVal !== "") {

        spiNum = Number(spiVal);


        if (
            isNaN(spiNum) ||
            spiNum < 0 ||
            spiNum > 8
        ) {

            fail(
                edSpi,
                spiHint,
                "SPI must be a number between 0 and 8."
            );

            return;
        }
    }


    current.name =
        document.getElementById(
            "edName"
        ).value.trim() ||
        current.name;


    current.email =
        emailVal ||
        current.email;


    current.phone =
        document.getElementById(
            "edPhone"
        ).value.trim();


    current.branch =
        document.getElementById(
            "edBranch"
        ).value.trim() ||
        current.branch;


    current.attendance =
        attendanceNum;


    current.spiOverride =
        spiVal === ""
        ? null
        : spiNum;


    persist();

    renderProfile();
    renderDashboard();


    msg.textContent =
        "Changes saved.";

    msg.style.color = "";

    msg.classList.add(
        "show"
    );


    setTimeout(function () {

        msg.classList.remove(
            "show"
        );

    }, 2000);
});


/* =========================================================
   RESET SPI
   ========================================================= */

document.getElementById("resetSpi")
.addEventListener("click", function () {

    current.spiOverride = null;

    persist();

    renderProfile();
    renderDashboard();

    toast(
        "SPI reset to the calculated value"
    );
});


document.getElementById("edEmail")
.addEventListener("input", function () {

    this.classList.remove(
        "input-error"
    );
});


document.getElementById("edAttendance")
.addEventListener("input", function () {

    this.classList.remove(
        "input-error"
    );

    document.getElementById(
        "edAttendanceHint"
    ).classList.remove("show");
});


document.getElementById("edSpi")
.addEventListener("input", function () {

    this.classList.remove(
        "input-error"
    );

    document.getElementById(
        "edSpiHint"
    ).classList.remove("show");
});


/* =========================================================
   NOTIFICATIONS
   ========================================================= */

function renderNotifs() {

    if (!current) return;

    var list =
        document.getElementById(
            "notifList"
        );

    var html = "";
    var lastDay = "";
    var unread = 0;


    NOTIFS.forEach(function (n) {

        var read =
            current.readNotifs.indexOf(
                n.id
            ) !== -1;


        if (!read) {
            unread++;
        }


        if (n.day !== lastDay) {

            html +=
                '<p class="notif-day">' +
                    n.day +
                '</p>';

            lastDay = n.day;
        }


        html +=

            '<div class="notif-item ' +
                (read ? "read" : "") +
                '" data-notif="' +
                n.id +
            '">' +

                '<div class="notif-icon">' +
                    n.icon +
                '</div>' +

                '<div class="notif-body">' +

                    '<h4>' +
                        n.title +
                    '</h4>' +

                    '<p>' +
                        n.body +
                    '</p>' +

                '</div>' +

                '<span class="notif-time">' +
                    n.time +
                '</span>' +

            '</div>';
    });


    list.innerHTML = html;


    document.getElementById(
        "unreadBadge"
    ).textContent =
        unread +
        " new";


    var items =
        list.querySelectorAll(
            ".notif-item"
        );


    for (var i = 0; i < items.length; i++) {

        items[i].addEventListener(
            "click",
            function () {

                var id =
                    this.getAttribute(
                        "data-notif"
                    );


                if (
                    current.readNotifs.indexOf(id) === -1
                ) {

                    current.readNotifs.push(id);
                }


                persist();

                renderNotifs();
            }
        );
    }
}


document.getElementById("markAllRead")
.addEventListener("click", function () {

    if (!current) return;

    current.readNotifs =
        NOTIFS.map(function (n) {
            return n.id;
        });

    persist();

    renderNotifs();
});


/* =========================================================
   SMALL HELPERS
   ========================================================= */

var toastEl =
    document.getElementById("toast");

var toastTimer;


function toast(msg) {

    toastEl.textContent = msg;

    toastEl.classList.add(
        "show"
    );

    clearTimeout(
        toastTimer
    );

    toastTimer =
        setTimeout(function () {

            toastEl.classList.remove(
                "show"
            );

        }, 2200);
}


/* =========================================================
   BUTTON WIRING
   ========================================================= */

document.getElementById("doLogin")
.addEventListener(
    "click",
    attemptLogin
);


document.getElementById("doSignup")
.addEventListener(
    "click",
    attemptSignup
);


document.getElementById("toSignup")
.addEventListener(
    "click",
    function () {

        clearSignupErrors();

        showSignupForm();
    }
);


document.getElementById("toLogin")
.addEventListener(
    "click",
    function () {

        clearLoginErrors();

        showLoginForm();
    }
);


document.getElementById("logoutBtn")
.addEventListener(
    "click",
    logout
);


document.getElementById("dashLogoutBtn")
.addEventListener(
    "click",
    logout
);


document.getElementById("heroLoginBtn")
.addEventListener(
    "click",
    function () {

        showLoginForm();

        loginId.focus();
    }
);


document.getElementById("heroSignupBtn")
.addEventListener(
    "click",
    function () {

        clearSignupErrors();

        showSignupForm();
    }
);


document.getElementById("authBtn")
.addEventListener(
    "click",
    function () {

        if (current) {

            logout();

        } else {

            showPage("home");

            showLoginForm();

            loginId.focus();
        }
    }
);


loginPass.addEventListener(
    "keydown",
    function (e) {

        if (e.key === "Enter") {
            attemptLogin();
        }
    }
);


loginId.addEventListener(
    "keydown",
    function (e) {

        if (e.key === "Enter") {
            loginPass.focus();
        }
    }
);


/* =========================================================
   CONTACT FORM
   ========================================================= */

document.getElementById("sendMsg")
.addEventListener(
    "click",
    function () {

        document.getElementById(
            "cName"
        ).value = "";

        document.getElementById(
            "cMsg"
        ).value = "";

        toast(
            "Message sent to the academic office"
        );
    }
);


/* =========================================================
   RESTORE SAVED SESSION
   ========================================================= */

document.getElementById("faqSearch")
    .addEventListener("input", renderFAQ);

document.getElementById("eventSearch")
    .addEventListener("input", renderEvents);


(function init() {

    renderFAQ();

    var saved =
        localStorage.getItem(
            SESSION_KEY
        ) ||
        sessionStorage.getItem(
            SESSION_KEY
        );


    if (saved) {

        var s =
            findStudent(saved);


        if (s) {

            current = s;

            refreshNav();

            renderEverything();

            showPage("dashboard");

            return;
        }
    }


    refreshNav();

    showPage("home");

})();


/* =========================================================
   GREETING
   ========================================================= */

function greeting() {

    var h =
        new Date().getHours();


    if (h < 12) {
        return "Good morning";
    }

    if (h < 17) {
        return "Good afternoon";
    }

    return "Good evening";
}


/* =========================================================
   TODAY
   ========================================================= */

function today() {

    var days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];


    var months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];


    var d =
        new Date();


    return (
        days[d.getDay()] +
        ", " +
        d.getDate() +
        " " +
        months[d.getMonth()]
    );
}


/* =========================================================
   SHOW / HIDE LOGIN PASSWORD
   ========================================================= */

var toggleBtn =
    document.createElement(
        "span"
    );


toggleBtn.textContent =
    "Show";


toggleBtn.className =
    "pass-toggle";


loginPass.parentNode.style.position =
    "relative";


loginPass.parentNode.appendChild(
    toggleBtn
);


toggleBtn.addEventListener(
    "click",
    function () {

        var hidden =
            loginPass.type === "password";


        loginPass.type =
            hidden
            ? "text"
            : "password";


        toggleBtn.textContent =
            hidden
            ? "Hide"
            : "Show";
    }
);