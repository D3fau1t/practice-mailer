import React, { Suspense, lazy } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import ComponentLoader from '../../components/Loaders/ComponentLoader'

const SignUpForm = lazy(() => import('./components/SignUpForm'))

const useStyles = makeStyles(() => ({
    formContainer: {
        textAlign: "center",
        width: "45%",
        height: "445px",
        margin: "130px auto",
        border: "2px solid #cccccc",
        borderRadius: "10px"
    },
    pageTitle: {
        marginTop: "35px"
    }
}))

const SignUpPage = () => {

    const classes = useStyles()

    return (
        <Grid container className={classes.formContainer} >
            <Grid item xs>
                <Suspense fallback={<ComponentLoader height={440} />}>
                    <Typography variant="h4" className={classes.pageTitle}>Sign Up</Typography>
                    <SignUpForm />
                </Suspense>
            </Grid>
        </Grid>
    )
}

export default SignUpPage
