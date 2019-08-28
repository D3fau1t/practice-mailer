import React, { lazy, Suspense, Fragment } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ComponentLoader from '../../components/Loaders/ComponentLoader'

const EmailsList = lazy(() => import('./components/EmailsList'))
const MessageBox = lazy(() => import('./components/MessageBox'))

const useStyles = makeStyles(() => ({
    usersListContainer: {
        width: "100%",
        maxWidth: 360,
        height: "100%",
        overflowY: "scroll",
        position: "fixed",
        top: "64px",
        left: "0",
        bottom: "0",
        borderRight: "2px solid #cccccc"
    },
    messageBoxContainer: {
        position: "fixed",
        top: "64px",
        right: "0px",
        bottom: "0px",
        width: "calc(100% - 360px)",
        height: "100%"
    }
}))

const HomaPage = () => {

    const classes = useStyles()

    return (
        <Fragment>
            <div className={classes.usersListContainer} >
                <Suspense fallback={<ComponentLoader />}>
                    <EmailsList />
                </Suspense>
            </div>
            <div className={classes.messageBoxContainer}>
                <Suspense fallback={<ComponentLoader />}>
                    <MessageBox />
                </Suspense>
            </div>
        </Fragment>
    )
}

export default HomaPage
