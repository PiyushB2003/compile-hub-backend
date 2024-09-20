import express from "express";
import session from "express-session";
import cors from "cors";
import bodyParser from "body-parser";
import "dotenv/config";
import passport from "passport";
import AuthUserRoute from "./routes/AuthUser.js";
import AuthRoute from "./routes/auth.js";
import "./configs/passport.js";
import MongoConnect from "./db/Db.js";
import WorkRoute from "./routes/WorkRoute.js";

const app = express();
app.use(bodyParser.json());

MongoConnect();

app.use(session({
    secret: process.env.COOKIE_SESSION_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 24 * 60 * 60 * 1000
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: "GET, POST, PUT, DELETE",
    credentials: true,
}))

app.get("/", (req, res) => {
    res.send("Hello there");
})

app.use('/', WorkRoute);
app.use("/api", AuthUserRoute);
app.use("/auth", AuthRoute);

app.listen(process.env.PORT, () => {
    console.log(`Server running on port http://localhost:${process.env.PORT}`);

})