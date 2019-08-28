import React, { Suspense, lazy } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import ComponentLoader from '../../components/Loaders/ComponentLoader'

const LoginForm = lazy(() => import('./components/LoginForm'))

const useStyles = makeStyles(() => ({
    formContainer: {
        textAlign: "center",
        width: "45%",
        height: "345px",
        margin: "130px auto",
        border: "2px solid #cccccc",
        borderRadius: "10px"
    },
    pageTitle: {
        marginTop: "35px"
    }
}))
 
const LoginPage = () => {

    const classes = useStyles()

     return (
        <Grid container className={classes.formContainer}>
            <Grid item xs>
                <Suspense fallback={<ComponentLoader />}>
                    <Typography variant="h4" className={classes.pageTitle}>Login</Typography>
                    <LoginForm />
                </Suspense>
            </Grid>
        </Grid>
    )
}

export default LoginPage