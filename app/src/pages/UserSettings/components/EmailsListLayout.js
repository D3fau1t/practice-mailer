import React from 'react'
import Chip from '@material-ui/core/Chip'
import CancelIcon from '@material-ui/icons/Cancel'
import { makeStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { deleteSecondaryEmailAction } from '../../../redux/actions/dataActions'

const useStyles = makeStyles(() => ({
    emailsContainer: {
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap"
    },
    email: {
        margin: "10px"
    }
}))

const EmailsListLayout = (props) => {

    const classes = useStyles()

    const { emails, deleteSecondaryEmailAction } = props

    const deleteEmailHandler = (id, mainEmail) => {
        deleteSecondaryEmailAction(id, mainEmail)
    }
    return (
        <div className={classes.emailsContainer} >
            {emails.length === 0 ? "No Results" : emails[0].emails.length === 0 ? "No Emails Found" : 
                emails[0].emails.map((res, i) => {
                    return <Chip 
                                className={classes.email} 
                                key={i} 
                                label={res.email}
                                onDelete={deleteEmailHandler.bind(this, res.id, emails[0].email)}
                                deleteIcon={<CancelIcon />}
                            />
                })
            }
        </div>
    )
}

const mapStateToProps = (state) => ({
    emails: state.data.selectedEmails
})

const mapActionsToProps = {
    deleteSecondaryEmailAction
}

export default connect(mapStateToProps, mapActionsToProps)(EmailsListLayout)