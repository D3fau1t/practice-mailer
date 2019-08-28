import React, { Fragment, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { connect } from 'react-redux'
import ComponentLoader from '../../components/Loaders/ComponentLoader'
import { getAllEmailsAction, deleteMainEmailAction } from '../../redux/actions/dataActions'
import EmailsListLayout from './components/EmailsListLayout'
import MainEmailForm from './components/MainEmail'
import AddNewEmail from './components/AddNewEmail'
import Button from '@material-ui/core/Button'
import SuccessIcon from '@material-ui/icons/Check'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles(theme => ({
    container: {
        width: "50%",
        height: "550px",
        margin: "150px auto",
        padding: 30
    },
    deleteBtn: {
        textTransform: "Capitalize",
        position: "absolute",
        left: "50%",
        marginTop: "30px",
        transform: "translateX(-50%)"
    }
}))

const UserSettings = (props) => {

    const classes = useStyles()

    const { getAllEmailsAction, selectedEmails, deleteMainEmailAction, loading, getEmailsList } = props

    useEffect(() => {
        getAllEmailsAction()
    }, [])

    const deleteMainEmailHandler = (email) => {
        deleteMainEmailAction(email)
    }

    return (
        <Paper className={classes.container}>
            {getEmailsList.length === 0 ? <ComponentLoader /> : (
                <Fragment>
                    <Typography variant="h5" style={{textAlign: "center", marginBottom: 25}}>User Settings</Typography>
                    <MainEmailForm />
                    <Typography variant="h6" style={{textAlign: "left", margin: "25px 0 15px 0"}}>Secondary Emails:</Typography> 
                    <EmailsListLayout />
                    <Typography variant="h6" style={{textAlign: "left", margin: "25px 0 10px 0"}}>Add New Email:</Typography>
                    <AddNewEmail />
                    <Button
                        className={classes.deleteBtn}
                        variant="contained"
                        color="secondary"
                        disabled={selectedEmails.length === 0 ? true : false}
                        onClick={deleteMainEmailHandler.bind(this, selectedEmails.length !== 0 ? selectedEmails[0].email : "")}
                        aria-label="delete-main-email"
                    > {loading === "delete-main-email" ? 
                        <CircularProgress color="inherit" size={30} /> :
                        loading === "delete-main-email-success" ? 
                        <SuccessIcon />
                        : "Delete Email"}
                    </Button>
                 </Fragment>
            )}
        </Paper>
    )
}

const mapStateToProps = (state) => ({
    loading: state.UI.loading,
    selectedEmails: state.data.selectedEmails,
    getEmailsList: state.data.getEmailsList
})

const mapActionsToProps = {
    getAllEmailsAction,
    deleteMainEmailAction
}

export default connect(mapStateToProps, mapActionsToProps)(UserSettings)