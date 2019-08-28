import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import LinearProgress from '@material-ui/core/LinearProgress'

const useStyles = makeStyles(theme => ({
    container: {
        width: "100%",
        height: "100%",
        position: "fixed",
        top: "0",
        left: "0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    progressIndicator: {
        width: "60%",
        margin: "50px auto"
    }
}))

const PageLoader = () => {

    const classes = useStyles()

    return (
        <div className={classes.container}>
            <LinearProgress className={classes.progressIndicator} />
        </div>
    )
}

export default PageLoader
