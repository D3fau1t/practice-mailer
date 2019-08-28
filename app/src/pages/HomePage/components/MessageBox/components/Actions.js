import React, { Fragment } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import SendIcon from '@material-ui/icons/Send'
import FileIcon from '@material-ui/icons/AttachFile'
import TextIcon from '@material-ui/icons/TextFormat'
import SuccessIcon from '@material-ui/icons/Check'

const useStyle = makeStyles(() => ({
    container: {
        margin: "0 20px"
    },
    input: {
        display: "none"
    },
    btn: {
        textTransform: "capitalize",
        marginLeft: 10
    },
    btnIcon: {
        marginLeft: 5,
        width: ".8em",
        height: ".8em"
    }
}))

const Actions = (props) => {

    const classes = useStyle()

    const { addTextFromFileHandler, addFileHandler, sendEmailMessageHandler, loading } = props

    return (
        <div className={classes.container}>
            <Button 
                className={classes.btn}
                type="submit"
                variant="contained" 
                color="primary"
                aria-label="send-mail"
                onClick={sendEmailMessageHandler}
            >
                {loading === "send-email-message" ? 
                        <CircularProgress color="inherit" size={30} /> :
                    loading === "send-email-message-success" ? 
                    <SuccessIcon />
                    : (<Fragment>
                        Send <SendIcon className={classes.btnIcon} />
                    </Fragment>)}
            </Button>
            <input 
                className={classes.input}
                type="file"
                id="file-upload-input"
                multiple
                onChange={addFileHandler}
            />
            <label htmlFor="file-upload-input">
                <Button
                    className={classes.btn}
                    variant="contained"
                    color="default"
                    aria-label="attach-file"
                    component="span"
                >
                    File
                    <FileIcon className={classes.btnIcon} />
                </Button>
            </label>
            <input 
                className={classes.input}
                type="file"
                id="text-file-upload-input"
                accept=".txt"
                onChange={addTextFromFileHandler}
            />
            <label htmlFor="text-file-upload-input">
                <Button 
                    className={classes.btn}
                    variant="contained"
                    color="secondary"
                    component="span"
                    aria-label="attach-file"
                >
                    Add Text
                    <TextIcon className={classes.btnIcon} />
                </Button>
            </label>
        </div>
    )
}

export default Actions
