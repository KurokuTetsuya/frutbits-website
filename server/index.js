if (process.argv[2] === "dev") process.env.DEV = true;
const express = require("express");
const app = express();
const PORT  = process.env.PORT || 8081;
const { clientID, clientSecret } = require("./config.json");
const { resolve } = require("path");
const { Strategy } = require("passport-discord");
const FileStore = require("session-file-store");
const session = require("express-session");
const passport = (require("passport")).use(
    new Strategy({
        clientID, clientSecret,
        callbackURL: process.env.DEV ? `http://localhost:${PORT}/auth/callback` : "https://frutbits.xyz/auth/callback",
        scope: "identify"
    }, (accessToken, refreshToken, profile, done) => {
        process.nextTick(() => {
            return done(null, profile);
        });
    })
);

app.use(
    (require("cors"))({
        origin: process.env.DEV ? `http://localhost:${PORT}` : "https://frutbits.xyz/",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true 
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(session({
    store: new (FileStore(session))(),
    secret: "[==thisisasessionsecretstfu==]",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 86400000
    }
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(resolve(__dirname, "..", "build")));

// Serialize & Desereliaze Passport
passport.serializeUser((user, done) => {
    return done(null, user);
});
passport.deserializeUser((user, done) => {
    return done(null, user);
});

app.use((req, res, next) => {
    console.log(`[${new Date().toString().split(" ", 5).join(" ")}] ${req.headers["x-real-ip"] || req.ip} (${res.header["user-agent"] || "No User-Agent"}) ${req.method} to ${req.path}`);
    return next();
});
app.listen(PORT, () => {
    console.log(`[${new Date().toString().split(" ", 5).join(" ")}] Listening to http://localhost:${PORT}/`);
});

app.get("/", (request, response) => {
    response.status(200).sendFile(resolve(__dirname, "..", "build", "index.html"));
});

app.get("/staff", (request, response) => {
    response.status(200).sendFile(resolve(__dirname, "..", "build", "index.html"));
});

// Redirect Routes
app.get("/discord", (request, response) => response.status(200).redirect("https://discord.gg/fD5MHy9"));
app.get("/leaderboard", (request, response) => response.status(200).redirect("https://arcanebot.xyz/leaderboard/frutbits"));

// OAuth Routes
app.get("/auth/fail", (request, response) => {
    return response.status(401).send({ status: 401, message: "Failed when login." });
});
app.get("/auth/login", passport.authenticate("discord", { scope: "identify", prompt: "consent" }));
app.get("/auth/callback", passport.authenticate("discord", { failureRedirect: "/auth/fail", successRedirect: "/" }));
app.get("/auth/logout", (request, response) => {
    request.logout();
    response.redirect("/");
});
app.get("/auth/info", checkAuth, (req, res) => {
    res.status(200).send(req.user);
});


function checkAuth(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.send("not logged in :(");
}