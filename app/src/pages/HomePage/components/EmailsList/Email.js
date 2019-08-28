import React, { Fragment } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import UserIcon from '@material-ui/icons/AccountBox'
import Divider from '@material-ui/core/Divider'

const useStyles = makeStyles(() => ({
    divider: {
        margin: "5px 15px 10px 15px"
    },
    listItem: {
        cursor: "pointer",
        margin: "0 15px",
        width: "92%"
    },
    listItemAvatar: {
        backgroundColor: "#2196f3"
    }
}))

const User = (props) => {

    const { selected, selectEmailHandler, arrayKey, email } = props

    const classes = useStyles()

    return (
        <Fragment>
            <ListItem selected={selected} className={classes.listItem} onClick={selectEmailHandler.bind(this, selected, arrayKey)} >
                <ListItemAvatar>
                    <Avatar className={classes.listItemAvatar}>
                        <UserIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={email} />
            </ListItem>
            <Divider variant="inset" component="li" className={classes.divider} />
        </Fragment> 
    )
}

export default User