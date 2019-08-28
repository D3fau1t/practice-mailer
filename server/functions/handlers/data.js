// const BusBoy = require('busboy')
const { db } = require('../utils/admin')
const transporter = require('../utils/nodemailer')

exports.addNewMainEmail = (request, response) => {
    const data = {
        email: request.body.email,
        emails: []
    }
    return db.doc(`/emails/${data.email}`).set(data)
        .then(() => {
            return response.status(200).json({successMessage: "Email added successfully"})
        })
        .catch(err => {
            console.error(err)
            return response.status(500).json({serverError: "Something went wrong, please try again"})
        })
}

exports.addNewEmails = (request, response) => {
    const mainEmail = request.body.mainEmail
    const newEmails = request.body.emails
    const newEmailsCount = newEmails.length
    db.doc(`/emails/${mainEmail}`).get()
        .then(doc => {
            const secondaryEmails = doc.data().emails
            const secondaryEmailsCount = doc.data().emails.length
            if (newEmailsCount + secondaryEmailsCount > 10) {
                return response.status(403).json({limitError: "To many emails. Max limit is 10."})
            } else {
                const secondaryEmailsData = secondaryEmails.map(data => data.email)
                const updatedEmails = secondaryEmailsData.concat(newEmails).map((res, i) => ({
                    email: res,
                    id: i + 1
                }))
                return db.doc(`/emails/${mainEmail}`).update({emails: updatedEmails})
            }   
        })
        .then(() => {
            return response.status(200).json({successMessage: "Emails updated successfully"})
        })
        .catch(err => {
            console.error(err)
            return response.status(500).json({serverError: "Something went wrong, please try again"})
        })
}

exports.deleteSecondaryEmail = (request, response) => {
    const mainEmail = request.body.mainEmail
    const emailId = request.body.emailId
    db.doc(`/emails/${mainEmail}`).get()
        .then(doc => {
            const secondaryEmails = doc.data().emails
            const updatedEmails = secondaryEmails.filter(email => email.id !== emailId)
            return db.doc(`/emails/${mainEmail}`).update({emails: updatedEmails})
        })
        .then(() => {
            return response.status(200).json({successMessage: "Email removed successfully"})
        })
        .catch(err => {
            console.error(err)
            return response.status(500).json({serverError: "Something went wrong, please try again"})
        })
}

exports.getAllEmails = (request, response) => {
    const data = []
    db.collection("emails").get()
        .then(res => {
            res.docs.forEach(doc => data.push(doc.data()))
            return response.status(200).json({emailsList: data})
        })
        .catch(err => {
            console.error(err)
            return response.json({error: err})
        })
}

exports.getEmail = (request, response) => {
    const mainEmail = request.body.email
    db.doc(`/emails/${mainEmail}`).get()
        .then(doc => {
            return response.status(200).json({doc: doc.data()})
        })
        .catch(err => {
            console.error(err)
            return response.status(500).json({serverError: "Something went wrong, please try again"})
        })
}

exports.deleteMainEmail = (request, response) => {
    const mainEMail = request.body.email
    db.doc(`/emails/${mainEMail}`).delete()
        .then(() => {
            return response.status(200).json({successMessage: "Email deleted successfulyy"})
        })
        .catch(err => {
            console.error(err)
            return response.status(500).json({serverError: "Something went wrong, please try again"})
        })
}

exports.sendEmails = (request, response) => {
    const emails = request.body.emails
    const text = request.body.text
    const subject = request.body.subject
    const attachments = request.body.attachments

    const mail = {
        from: "Mailer <mailernoreply@gmail.com>",
        to: emails.toString(),
        subject,
        text,
        attachments
    }

    transporter.sendMail(mail, (err, info) => {
        if (err) {
            console.error(err)
            return response.status(500).json({serverError: "Something went wrong, please try again"})
        } else {
            return response.status(200).json({successMessage: "Message sent successfully"})
        }
    })
}