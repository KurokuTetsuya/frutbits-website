if (process.argv[2] === "dev") process.env.NODE_ENV = "development";
const express = require("express");
const app = express();
const PORT  = process.env.PORT || 8081;
const { clientID, clientSecret } = require("./config.json");
const { resolve } = require("path");
const { Strategy } = require("passport-discord");
const passport = require("passport")
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const serverConfig = require("../src/config.json");

passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((obj, done) => {
    done(null, obj);
});
passport.use(new Strategy({
    clientID,
    clientSecret,
    callbackURL: process.env.NODE_ENV === "development" ? `http://localhost:${PORT}/auth/callback` : `${serverConfig.baseUrl}/auth/callback`,
    scope: ["identify"]
}, (accessToken, refreshToken, profile, done) => {
    process.nextTick(() => {
        return done(null, profile);
    });
}));

app.use(session({
    store: new FileStore(),
    secret:"[==thisisasessionsecretstfu==]",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 86400000
    }
}));

app.use(express.static(resolve(__dirname, "..", "build")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type");
    res.setHeader("Access-Control-Allow-Origin", process.env.NODE_ENV ? `http://localhost:${PORT}` : serverConfig.baseUrl);
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});

app.get("/", performReactPage);
app.get("/staff", performReactPage);
app.get("/invites", performReactPage);
app.get("/404", performReactPage);

// Redirect Routes
app.get("/discord", (request, response) => response.status(200).redirect("https://discord.gg/fD5MHy9"));
app.get("/leaderboard", (request, response) => response.status(200).redirect("https://arcanebot.xyz/leaderboard/frutbits"));

// OAuth Routes
app.get("/auth/login", passport.authenticate("discord", { scope: ["identify"] }));
app.get("/auth/callback", passport.authenticate("discord", { failureRedirect: "/" }), (req, res) => res.redirect("/"));
app.get("/auth/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
        } else {
            req.logout();
            res.clearCookie("connect.sid");
            res.redirect("/");
        }
    })
});
app.get("/auth/info", (req, res) => {
    if (req.isAuthenticated()) res.status(200).send(req.user);
    else res.send("Not logged in.");
});

// 404 Routing. Keep this as the last route.
app.get("*", (request, response) => {
    return response.status(404).redirect("/404");
});

app.listen(PORT, () => {
    console.log(`[${new Date().toString().split(" ", 5).join(" ")}] Listening to http://localhost:${PORT}/`);
});

function performReactPage(request, response, next) {
    return response.status(/404/g.exec(request.route) ? 404 : 200).sendFile(resolve(__dirname, "..", "build", "index.html"));
}