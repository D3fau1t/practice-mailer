import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import clsx from 'clsx'
import { connect } from 'react-redux'
import { makeStyles, emphasize, useTheme } from '@material-ui/core/styles'
import NoSsr from '@material-ui/core/NoSsr'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Chip from '@material-ui/core/Chip'
import MenuItem from '@material-ui/core/MenuItem'
import CancelIcon from '@material-ui/icons/Cancel'
import { setSendEmailsAction, deleteSendEmailsAction } from '../../../../../redux/actions/dataActions'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        height: "auto",
        margin: 20
    },
    input: {
        display: "flex",
        padding: 0,
        height: "auto"
    },
    valueContainer: {
        display: "flex",
        flexWrap: "wrap",
        flex: 1,
        alignItems: "center",
        overflow: "hidden"
    },
    chip: {
        margin: theme.spacing(0.5, 0.25)
    },
    chipFocused: {
        backgroundColor: emphasize(
            theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
            0.08,
        )
    },
    noOptionsMessage: {
        padding: theme.spacing(1, 2),
    },
    singleValue: {
        fontSize: 16,
    },
    placeholder: {
        position: "absolute",
        left: 2,
        bottom: 6,
        fontSize: 16
    },
    paper: {
        position: "absolute",
        zIndex: 1,
        marginTop: theme.spacing(1),
        left: 0,
        right: 0,
    },
      divider: {
        height: theme.spacing(2),
    }
}))

const NoOptionsMessage = (props) => {
    return (
        <Typography color="textSecondary" className={props.selectProps.classes.noOptionsMessage} {...props.innerProps} >
            No emails found...
        </Typography>
    )
}

const inputComponent = ({ inputRef, ...props }) => {
    return <div ref={inputRef} {...props} />
}

const Control = (props) => {
    const {
        children,
        innerProps,
        innerRef,
        selectProps: { classes, TextFieldProps },
    } = props

    return (
        <TextField
          fullWidth
          InputProps={{
            inputComponent,
            inputProps: {
              className: classes.input,
              ref: innerRef,
              children,
              ...innerProps,
            },
          }}
          {...TextFieldProps}
        />
    )
}

const Option = (props) => {
    return (
        <MenuItem
          ref={props.innerRef}
          selected={props.isFocused}
          component="div"
          style={{
            fontWeight: props.isSelected ? 500 : 400,
          }}
          {...props.innerProps}
        >
          {props.children}
        </MenuItem>
    )
}

const Placeholder = (props) => {
    return (
        <Typography
          color="textSecondary"
          className={props.selectProps.classes.placeholder}
          {...props.innerProps}
        >
          {props.children}
        </Typography>
    )
}

const ValueContainer = (props) => {
    return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>
}

const MultiValue = (props) => {
    return (
        <Chip
          tabIndex={-1}
          label={props.children}
          className={clsx(props.selectProps.classes.chip, {
            [props.selectProps.classes.chipFocused]: props.isFocused,
          })}
          onDelete={() => {
                // console.log(props.children)
                props.data.deleteSendEmailsAction(props.children)
                props.removeProps.onClick()
            }}
          deleteIcon={<CancelIcon {...props.removeProps} />}
        />
    )
}

const Menu = (props) => {
    return (
        <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
          {props.children}
        </Paper>
    )
}

const components = {
    Control, Menu, MultiValue,
    NoOptionsMessage, Option, Placeholder,
    ValueContainer
}

const EmailSelector = (props) => {

    const theme = useTheme()
    const classes = useStyles()

    const { selectedEmails, setSendEmailsAction, sendEmails, deleteSendEmailsAction } = props

    const [emailsState, setEmails] = useState([])
    const [selectedEmailsState, setSelectedEmails] = useState(null)

    // useEffect(() => {
    //     console.log(emailsState)
    // }, [emailsState])

    useEffect(() => {
        const secondaryEmails = selectedEmails.map(res => {
            return res.emails.map(res => ({
                label: res.email,
                value: res.email,
                deleteSendEmailsAction: deleteSendEmailsAction
            }))
        })
        setEmails(secondaryEmails.flat())
    }, [selectedEmails])

    const selectEmailChangeHandler = (emails) => {
        // console.log(emails)
        setSelectedEmails(emails)
        if (emails !== null) {
            emails.map(res => {
                if (!sendEmails.includes(res.value)) {
                    setSendEmailsAction(res.value)
                }
            })
        }
    }

    const selectStyles = {
        input: base => ({
          ...base,
          color: theme.palette.text.primary,
          '& input': {
            font: 'inherit'
          }
        })
    }

    return (
        <div className={classes.root}>
            <NoSsr>
                <Select 
                    classes={classes} 
                    styles={selectStyles}
                    inputId="email-multi-select"
                    TextFieldProps={{
                        label: "Secondary Emails",
                        InputLabelProps: {
                            htmlFor: "email-multi-select",
                            shrink: true
                        },
                        placeholder: "Select one or multiple emails..."
                    }}
                    options={emailsState}
                    components={components}
                    value={selectedEmailsState}
                    onChange={selectEmailChangeHandler}
                    isMulti
                />
            </NoSsr>
        </div>
    )
}

const mapStateToProps = (state) => ({
    selectedEmails: state.data.selectedEmails,
    sendEmails: state.data.sendEmails
})

const mapActionsToProps = {
    setSendEmailsAction,
    deleteSendEmailsAction
}

export default connect(mapStateToProps, mapActionsToProps)(EmailSelector)