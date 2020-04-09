const express = require(`express`);
const path = require(`path`);
const fs = require(`fs`);
// const theDamnArray = require(`./db/db.json`)

// const dbJsonArrDir = path.resolve(__dirname, "db")
// const dbJsonArrPath = path.join(dbJsonArrDir, "db.json");

// const dbArray = path.join(".db/db.json")

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

app.use(express.static("public"));
app.use(express.static("db"));

// const notes = []


// HTML routes
app.get("/", function (request, response) {
    response.sendFile(path.join(__dirname + "/public", "index.html"))
})

app.get("/notes", function (request, response) {
    response.sendFile(path.join(__dirname + "/public", "notes.html"))
})

// API routes
app.get("/api/notes", function (request, response) {
    fs.readFile("./db/db.json", "utf8", function (error, data) {
        if (error) {
            return console.log(error)
        }
        return response.json(data)
    })
});

app.post("/api/notes", function (request, response) {
    const newNote = request.body;
    // const existingNotes = fs.readFile("./db/db.json", "utf8", function (error, data) {
    //     if (error) {
    //         return console.log(error)
    //     }
    //     return JSON.parse(data)
    // })
    // console.log(existingNotes)
    // then(function(){
    fs.writeFileSync("./db/db.json", JSON.stringify([
        ...JSON.parse(fs.readFileSync("./db/db.json", "utf8")), newNote
    ]), "utf8");
});

// app.delete("/api/notes/:id", function(request, response) {
//     const noteToDelete = request.body;
//     const idToDelete = noteToDelete.id;
//     notes.forEach(note => {
//         if (this.id == idToDelete){
//             notes.splice(this.id, 1)
//         }
//     });
//     // const noteId = id;
//     // fs.readFile("/db/db.json")
//     response.json(notes)
// });


app.listen(PORT, function () {
    console.log(`Server is live on port ${PORT}`)
})