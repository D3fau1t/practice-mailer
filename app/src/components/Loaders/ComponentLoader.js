import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles(theme => ({
    container: {
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "transparent"
    },
    progressIndicator: {
        margin: theme.spacing(2),
    }
}))

const ComponentLoader = () => {

    const classes = useStyles()

    return (
        <div className={classes.container}>
            <CircularProgress size={60} className={classes.progressIndicator} />
        </div>
    )
}

export default ComponentLoader