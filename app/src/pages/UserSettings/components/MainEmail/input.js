import React from 'react'
import TextField from '@material-ui/core/TextField'
// import { connect } from 'react-redux'

const Input = (props) => {

    const { classes, inputRef = () => {}, ref, ...other } = props

    return (
        <TextField
            fullWidth
            InputProps={{
                inputRef: node => {
                ref(node);
                inputRef(node);
                },
                classes: {
                input: classes.input,
                },
            }}
            {...other}
        />
    )
}

// const mapStateToProps

export default Input
