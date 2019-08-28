import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import SuccessIcon from '@material-ui/icons/Check'
import { connect } from 'react-redux'
import { signUpAction } from '../../../redux/actions/userActions'

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

const SignUpForm = (props) => {

    const classes = useStyles()

    const { UI: { loading, errors }} = props

    const [userState, setUser] = useState({
        email: "",
        password: "",
        repeatPassword: ""
    })

    useEffect(() => {
        console.log(userState)
    }, [userState])

    const inputValueChangeHandler = (event) => {
        setUser({...userState, [event.target.id]: event.target.value})
    }

    const signUpHandler = (event) => {
        event.preventDefault()
        props.signUpAction(userState)
    }

    return (
        <form className={classes.formContainer} noValidate autoComplete="off" onSubmit={signUpHandler}>
            <TextField 
                id="email"
                label="Email"
                type="email"
                error={errors.signUpEmail ? true : false}
                helperText={errors.signUpEmail}
                value={userState.email}
                className={classes.formInput}
                onChange={inputValueChangeHandler}
                fullWidth
            />
            <TextField 
                id="password"
                label="Password"
                type="password"
                error={errors.signUpPassword ? true : false}
                helperText={errors.signUpPassword}
                value={userState.password}
                className={classes.formInput}
                onChange={inputValueChangeHandler}
                fullWidth
            />
            <TextField 
                id="repeatPassword"
                label="Repeat Password"
                type="password"
                error={errors.signUpRepeatPassword ? true : false}
                helperText={errors.signUpRepeatPassword}
                value={userState.repeatPassword}
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
                    {loading === true ? 
                        <CircularProgress color="inherit" size={30} /> :
                    loading === "success" ? 
                    <SuccessIcon />
                    : "Sign up"}
            </Button>
        </form>
    )
}

const mapStateToProps = (state) => ({
    UI: state.UI,
})

const mapActionsToProps = {
    signUpAction
}

export default connect(mapStateToProps, mapActionsToProps)(SignUpForm)
