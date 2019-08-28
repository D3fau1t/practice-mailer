import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
//Redux stuff
import { connect } from 'react-redux'
import { loginAction } from '../../../redux/actions/userActions'

const useStyles = makeStyles(() => ({
    formContainer: {
        margin: "20px 50px 50px 50px"
    },
    formInput: {
        margin: "10px"
    },
    submitBtn: {
        margin: "15px 5px 15px 10px"
    }
}))

const LoginForm = (props) => {

    const classes = useStyles()

    const { UI: { loading, errors }} = props
    
    const [userState, setUser] = useState({
        email: "",
        password: ""
    })

    const inputValueChangeHandler = (event) => {
        setUser({...userState, [event.target.id]: event.target.value})
    }

    const loginHandler = (event) => {
        event.preventDefault()
        props.loginAction(userState)
    }

    return (
        <form className={classes.formContainer} noValidate autoComplete="off" onSubmit={loginHandler}>
            <TextField 
                id="email"
                label="Email"
                type="email"
                error={errors.loginEmail ? true : false}
                helperText={errors.loginEmail}
                value={userState.email}
                className={classes.formInput}
                onChange={inputValueChangeHandler}
                fullWidth
            />
            <TextField 
                id="password"
                label="Password"
                type="password"
                error={errors.loginPassword ? true : false}
                helperText={errors.loginPassword}
                value={userState.password}
                className={classes.formInput}
                onChange={inputValueChangeHandler}
                fullWidth
            />
            <Button 
                type="submit" 
                className={classes.submitBtn} 
                variant="contained" 
                color="primary"
                fullWidth
                aria-label="sing-up">
                    {loading ? <CircularProgress color="inherit" size={30} /> : "Login"}
            </Button>
        </form>
    )
}

const mapStateToProps = (state) => ({
    UI: state.UI
})

const mapActionsToProps = {
    loginAction
}

export default connect(mapStateToProps, mapActionsToProps)(LoginForm)
