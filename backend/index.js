// Module importieren
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const { readJsonFile, writeJsonFile } = require("./fsUtils");

// ------ Server erstellen:
const app = express();

// ------ Middlewares schreiben
// 1) Cors:
app.use(cors());
// 2) Logs:
app.use((req, res, next) => {
    console.log("new request: ", req.method, req.url);
    next();
})
// 3) Body parser (wandelt einkpmmende req's mit jsonObj im body in normales JavaScriptObj um):
app.use(express.json());

// 4) download (res.sendFile()) ermöglichen --> schaut ob's die Datei vom req im uploads folder gibt und returnt sie
app.use(express.static("uploads"));


// ------ CRUD- Endpoints schreiben (Create, Read (All, One), Update, Delete)

// 1) GET-Endpoint 

app.get("/api/blogs", (req, res) => {
    // Client will Daten "get" aus der blog-data.json, deshalb muss datei gelesen, und inhalt als Response an Client "geschickt" werden
    readJsonFile("./blog-data.json")
        .then((existingBlogs) => 
            res
                .status(200)
                .json({ success: true, result: existingBlogs }))
        .catch((err) => {
            console.log(err);
            res
                .status(500)
                .json({ success: false, error: "failed to load blogs" })
        })
})


// 2) POST-Endpoint

// --> für uploaded Files direkt mit richtigem Namen gespeichert werden, muss diskstorage bearbeitet werden:
const attachmentStorage = multer.diskStorage({
    destination: "./uploads/",
    filename: function (_, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

// --> MULTER-MIDDLEWARE erstellen mit angaben für storage:
const uploadMiddleware = multer({ storage: attachmentStorage });

// --> multer-middleware in POST-Endpoint integrieren
app.post("/api/blogs", uploadMiddleware.single("imgUrl") ,(req, res) => {
    const newBlogTitle = req.body.title;
    const newBlogContent = req.body.content

    const newBlog= {
        id: Date.now(),
        title: newBlogTitle,
        content: newBlogContent
    }

    // --> conditional, wenn Bild hinzugefügt, dann hänge es dem newBlog Object an:
    if(req.file){
        newBlog.imgUrl = req.file.filename;
    }

    readJsonFile("./blog-data.json")
        .then((existingBlogs) => [...existingBlogs, newBlog])
        .then((newBlogsArr) => writeJsonFile("./blog-data.json", newBlogsArr))
        .then((newBlogsJson) => 
            res
                .status(201)
                .json({ success: true, result: newBlogsJson })
        )
        .catch((err) => {
            console.log(err);
            res
                .status(500)
                .json({ success: false, error: "failed to add new Blog" })
        })
})


// ------ Endpoint NOT FOUND Handler (FALLBACK middleware):
app.use((_, res) => {
    res
        .status(404)
        .json({ success: false, error: "Route not found" });
});

// ------ LISTENER aktivieren, damit Server überhaupt zuhört
const PORT = 3008;
app.listen(PORT, () => {
    console.log("Server listening on port", PORT);
});
