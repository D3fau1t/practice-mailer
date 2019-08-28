import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import EmailSelector from './components/EmailSelector'
import TextFieldComponent from './components/TextField'
import Actions from './components/Actions'
import { connect } from 'react-redux'
import { sendEmailMessageAction } from '../../../../redux/actions/dataActions'

const useStyles = makeStyles(() => ({
    root: {
        width: "100%",
        height: "100%"
    }
}))

const MessageBox = (props) => {

    const { sendEmailMessageAction, sendEmails, UI: { loading, errors } } = props

    const classes = useStyles()

    const [filesState, setFiles] = useState({
        data: [],
        error: false
    })
    const [textState, setText] = useState({
        messageSubject: "",
        messageBody: "",
        textFileError: false
    })

    // useEffect(() => {
    //     console.log(filesState)
    // }, [filesState])

    const inputValueChangeHandler = (event) => {
        setText({...textState, [event.target.id]: event.target.value})
    }

    const sendEmailMessageHandler = (event) => {
        event.preventDefault()
        const data = {
            sendEmails,
            messageSubject: textState.messageSubject,
            messageBody: textState.messageBody,
            files: filesState.data
        }
        sendEmailMessageAction(data)
    }

    const formatFile = async (file) => {
        return new Promise(resolve => {
            const fr = new FileReader()
            let newFile
            fr.readAsDataURL(file)
            fr.onloadend = (event) => {
                resolve({filename: file.name, path: event.target.result})
            }
        })
    }

    const sortFiles = async (files) => {
        return await Promise.all(Object.values(files).map(file => formatFile(file)))
    }

    const addFileHandler = (event) => {
        const files = event.target.files
        if (files.length === 0) {
            setFiles({data: [], error: "Please choose a file"})
        } else {
            sortFiles(files)
                .then(files => {
                    setFiles({data: files, error: false})
                })
        }
    }

    const deleteFileHandler = (fileId) => {

    }

    const addTextFromFileHandler = (event) => {
        const files = event.target.files
        if (files.length === 0) {
            setText({...textState, textFileError: "Please choose a file"})
        } else if (files.length > 1) {
            setText({...textState, textFileError: "Only one file can be uploaded"})
        } else {
            const reader = new FileReader()
            reader.onload = textLoadHandler
            reader.readAsText(files[0])
        }
    }

    const textLoadHandler = (event) => {
        setText({...textState, messageBody: `${textState.messageBody} ${event.target.result}`, textFileError: false})
    }

    return (
        <form className={classes.root} noValidate autoComplete="off" >
            <EmailSelector errors={errors} />
            <TextFieldComponent 
                inputValueChangeHandler={inputValueChangeHandler} 
                textState={textState} 
                errors={errors}
                deleteFileHandler={deleteFileHandler}
                filesState={filesState}
            />
            <Actions 
                addTextFromFileHandler={addTextFromFileHandler} 
                addFileHandler={addFileHandler} 
                sendEmailMessageHandler={sendEmailMessageHandler}
                loading={loading}
                data={filesState.data}
            />
        </form>
    )
}

const mapStateToProps = (state) => ({
    sendEmails: state.data.sendEmails,
    UI: state.UI
})

const mapActionsToProps = {
    sendEmailMessageAction
}

export default connect(mapStateToProps, mapActionsToProps)(MessageBox)
