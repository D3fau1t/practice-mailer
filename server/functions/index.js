const functions = require('firebase-functions')
const app = require('express')()
const bodyParser = require('body-parser')
const multer = require('multer')

const upload = multer({
    limits: {
        fileSize: 1024 * 10 * 10
    }
}).any()

app.use(bodyParser.json({limit: '150mb'}))
app.use(bodyParser.urlencoded({
    limit: '150mb',
    extended: true
}))

const FBAuth = require('./middleware/FBAuth')

const { signUp, login, getInfo } = require('./handlers/user')
const { addNewEmails, deleteSecondaryEmail, getAllEmails, 
        addNewMainEmail, getEmail, deleteMainEmail, 
        sendEmails } = require('./handlers/data')

//Welcome route
app.get("/", (request, response) => {
    response.status(200).json({message: "Welcome to mailer api."})
})

//User auth related routes
app.post("/signup", signUp)
app.post("/login", login)
//Authorized admin related routes
app.get("/user/getInfo", FBAuth, getInfo)
// Email data related routes
app.post("/addNewMainEmail", FBAuth, addNewMainEmail)
app.post("/addNewEmails", FBAuth, addNewEmails)
app.post("/deleteSecondaryEmail", FBAuth, deleteSecondaryEmail)
app.get("/getAllEmails", FBAuth, getAllEmails)
app.post("/getEmail", FBAuth, getEmail)
app.post("/deleteMainEmail", FBAuth, deleteMainEmail)
app.post("/sendEmails", FBAuth, upload, sendEmails)

exports.api = functions.https.onRequest(app)
