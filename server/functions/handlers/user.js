const firebase = require('../utils/firebase')
const { db } = require('../utils/admin')

exports.signUp = (request, response) => {
    //Validated data from sign up form
    const newUser = {
        email: request.body.email,
        password: request.body.password
    }
    let token, userId
    /** 
      Checking if user from request exists in our db
      TRUE: return an error
      FALSE: create new user
    **/
    firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password)
        .then(data => {
            userId = data.user.uid
            return data.user.getIdToken()
        })
        .then(recievedToken => {
            token = recievedToken
            const userCredentials = {
                email: newUser.email,
                createdAt: new Date().toISOString(),
                userId
            }
            return db.doc(`/admins/${newUser.email}`).set(userCredentials)
        })
        .then(() => {
            return response.status(201).json({token})
        })
        .catch(err => {
            console.error(err)
            if (err.code === "auth/email-already-in-use") {
                return response.status(400).json({email: "Email is already in use"})
            } else {
                return response.status(500).json({serverError: "Something went wrong, please try again"})
            }
        })
}

exports.login = (request, response) => {
    const user = {
        email: request.body.email,
        password: request.body.password
    }
    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then(data => {
            return data.user.getIdToken()
        })
        .then(token => {
            return response.status(200).json({token})
        })
        .catch(err => {
            console.error(err)
            if (err.code === "auth/wrong-password" || err.code === "auth/user-not-found") {
                return response.status(403).json({wrongCredentials: "Wrong email or password"})
            } else {
                return response.status(500).json({serverError: "Something went wrong, please try again"})
            }
        })
}

exports.getInfo= (request, response) => {
    db.doc(`/admins/${request.user.email}`).get()
    .then(doc => {
        return response.status(200).json({userData: doc.data()})
    })
    .catch(err => {
        console.error(err)
        return response.status(500).json({serverError: "Something went wrong, please try again"})
    })
}