import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import SuccessIcon from '@material-ui/icons/Check'
import { addNewSecondaryEmailAction } from '../../../redux/actions/dataActions'

const useStyles = makeStyles(() => ({
    container: {
        display: "flex",
        justifyContent: "flex-end",
        flexWrap: 'wrap'
    },
    email: {
        margin: "10px"
    },
    addNewEmailBtn: {
        textTransform: "Capitalize",
        margin: 10,
        padding: 7
    }
}))

const AddNewEmail = (props) => {

    const classes = useStyles()

    const { UI: { loading, errors }, data, addNewSecondaryEmailAction } = props

    const [emailState, setEmail] = useState("")

    const inputHandler = (event) => {
        setEmail(event.target.value)
    }

    const addNewEmailHandler = (event) => {
        event.preventDefault()
        addNewSecondaryEmailAction(emailState, data[0].email)
    }

    return (
        <form className={classes.container} noValidate autoComplete="off" onSubmit={addNewEmailHandler}>
            <TextField
                fullWidth
                label="New Email"
                value={emailState}
                error={errors.secondaryEmail ? true : false}
                helperText={errors.secondaryEmail}
                onChange={inputHandler}
            />
            <Button 
                type="submit"
                variant="contained" 
                color="primary"
                disabled={data.length === 0 ? true : false}
                className={classes.addNewEmailBtn}
                aria-label="add-new-email">
                    {loading === "add-secondary-email" ? 
                        <CircularProgress color="inherit" size={30} /> :
                    loading === "add-secondary-email-success" ? 
                    <SuccessIcon />
                    : "Add"}
            </Button>
        </form>
    )
}

const mapStateToProps = (state) => ({
    UI: state.UI,
    data: state.data.selectedEmails
})

const mapActionsToProps = {
    addNewSecondaryEmailAction
}

export default connect(mapStateToProps, mapActionsToProps)(AddNewEmail)
