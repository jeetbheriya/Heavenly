const express = require("express");
const app = express();
const users = require("./routes/user.js");
const posts = require("./routes/post.js");
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const sessionOptions = ({ 
    secret: "gcRhcBKJBgcvjhsba",
    resave: false, 
    saveUninitialized: true
});

app.use(session(sessionOptions));
app.use(flash());

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
})

// const cookieParser = require("cookie-parser");

// app.use(cookieParser("mySecretCode"));

// app.get("/getsignedcookie", (req, res) => {
//     res.cookie("color", "Black", { signed : true });
//     res.send("Sigbed cookie sent!");
// });

// app.get("/verify", (req, res) => {
//     console.log(req.signedCookies);
//     res.send("verified");
// });

// app.get("/getcookies", (req, res) => {
//     res.cookie("greet", "Namaste");
//     res.cookie("name", "Developer-Jeet");
//     res.send("Cookie send to you succesfuly!");
// });

// app.get("/greet", (req, res) => {
//     let { name =  "Coder-Yash" } = req.cookies;
//     res.send(`I'm ${ name }`);
// });

// app.get("/", (req, res) => {
//     console.dir(req.cookies);
//     res.send("This is root page.");
// });

// app.use("/users", users);
// app.use("/posts", posts);


// app.get("/test", (req, res) => {
//     res.send("test succesfull !!!");
// });

app.get("/getcount", (req, res) => {
    if(req.session.count){
        req.session.count++;    
    }else{
        req.session.count = 1;
    }
    res.send(`You sent a cookie ${ req.session.count } times.`);
});

app.get("/register", (req, res) => {
    let { name = "Unknown" } = req.query;
    req.session.name = name;
    if(name == "Unknown"){
        req.flash("error", "User not registered.");    
    }else{
        req.flash("success", "User registered succesfully.");
    }
    res.redirect("/greet");
});

app.get("/greet", (req, res) => {
    res.render("page.ejs", { name: req.session.name });
});

app.listen(3000, () => {
    console.log("Server is listening to port: 3000");
});

