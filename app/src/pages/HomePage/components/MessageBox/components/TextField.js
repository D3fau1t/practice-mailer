import React, { Fragment } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Chip from '@material-ui/core/Chip'
import CancelIcon from '@material-ui/icons/Cancel'

const useStyles = makeStyles(() => ({
    container: {
        display: "flex",
        flexWrap: "wrap",
        margin: 20,
        position: "relative"
    },
    selectedFilesContainer: {
        position: "absolute",
        width: "100%",
        height: "75px",
        bottom: "0px",
        left: "10px"
    },
    chip: {
        margin: "0 5px"
    }
}))

const TextFieldComponent = (props) => {

    const classes = useStyles()

    const { inputValueChangeHandler, textState: { messageSubject, messageBody }, errors, filesState, deleteFileHandler } = props

    return (
        <div className={classes.container}>
            <TextField 
                id="messageSubject"
                label="Subject"
                margin="normal"
                fullWidth
                error={errors.messageSubjectError ? true : false}
                helperText={errors.messageSubjectError}
                onChange={inputValueChangeHandler}
                style={{marginTop: 0}}
                value={messageSubject}
            />
            <TextField 
                id="messageBody"
                label="Message"
                multiline
                rows="20"
                error={errors.messageBodyError ? true : false}
                helperText={errors.messageBodyError}
                margin="normal"
                fullWidth
                value={messageBody}
                onChange={inputValueChangeHandler}
            />
            <div className={classes.selectedFilesContainer}>
                {filesState.data.length === 0 ? <Fragment /> : filesState.data.map((res, i) => (
                    <Chip
                        key={i}
                        tabIndex={-1}
                        label={res.filename}
                        className={classes.chip}
                        // onDelete={deleteFileHandler.bind(this, i)}
                        // deleteIcon={<CancelIcon />}
                    />
                ))}
            </div>
        </div>
    )
}

export default TextFieldComponent
