import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Autosuggest from 'react-autosuggest'
import Button from '@material-ui/core/Button'
import InputComponent from './input'
import ItemComponent from './item'
import Paper from '@material-ui/core/Paper'
import CircularProgress from '@material-ui/core/CircularProgress'
import SuccessIcon from '@material-ui/icons/Check'
import { filterEmailsAction, getEmailAction, addNewMainEmailAction } from '../../../../redux/actions/dataActions'

const useStyles = makeStyles(theme => ({
    formContainer: {
        display: "flex",
        justifyContent: "flex-end",
        flexWrap: 'wrap'
    },
    emailInput: {
        margin: "10px"
    },
    addNewEmailBtn: {
        textTransform: "Capitalize",
        margin: 10,
        padding: 7
    },
    autosuggestContainer: {
        position: "relative",
        width: "100%"
    },
    suggestionsContainerOpen: {
        position: "absolute",
        zIndex: 1,
        marginTop: theme.spacing(1),
        left: 0,
        right: 0
    },
    suggestion: {
        display: "block"
    },
    suggestionsList: {
        margin: 0,
        padding: 0,
        listStyleType: "none"
    }
}))

const MainEmailForm = (props) => {

    const { UI: { loading }, emails: { getEmailsList, filteredEmails }, filterEmailsAction, getEmailAction, addNewMainEmailAction } = props

    const classes = useStyles()

    const [searchState, setSearch] = useState("")

    useEffect(() => {
        return () => {
            filterEmailsAction("", [])
        }
    }, [])

    const addNewMainEmailHandler = (event) => {
        event.preventDefault()
        addNewMainEmailAction(searchState)
        setSearch("")
    }

    const handleSuggestionsFetchRequested = ({value}) => {
        setSearch(value)
        filterEmailsAction(value, getEmailsList)
    }

    const handleSuggestionsClearRequested = () => {
        // filterEmailsAction("", getEmailsList)
        // console.log(searchState.length)
        if (searchState.length === 1) {
            setSearch("")
        }
    }

    const getSuggestionValue = (suggestion) => {
        setSearch(suggestion.email)
        getEmailAction(suggestion.email)
        return suggestion.email
    }

    const handleChange = name => (event, { newValue }) => {
        setSearch(newValue)
    }

    const autoSuggestProps = {
        renderInputComponent: InputComponent,
        suggestions: filteredEmails,
        onSuggestionsFetchRequested: handleSuggestionsFetchRequested,
        onSuggestionsClearRequested: handleSuggestionsClearRequested,
        getSuggestionValue,
        renderSuggestion: ItemComponent
    }

    return (
        <form className={classes.formContainer} noValidate autoComplete="off" onSubmit={addNewMainEmailHandler} >
            <Autosuggest 
                {...autoSuggestProps}
                inputProps={{
                    classes,
                    label: "Search Email",
                    placeholder: "search...",
                    value: searchState,
                    onChange: handleChange
                }}
                theme={{
                    container: classes.autosuggestContainer,
                    suggestionsContainerOpen: classes.suggestionsContainerOpen,
                    suggestionsList: classes.suggestionsList,
                    suggestion: classes.suggestion,
                }}
                renderSuggestionsContainer={options => (
                    <Paper {...options.containerProps} square>
                      {options.children}
                    </Paper>
                )}
            />
            <Button
                type="submit"
                variant="contained" 
                color="primary"
                disabled={filteredEmails.length === 0 ? false : true}
                className={classes.addNewEmailBtn}
                aria-label="add-new-email">
                    {loading === "add-main-email" ? 
                        <CircularProgress color="inherit" size={30} /> :
                    loading === "add-main-email-success" ? 
                    <SuccessIcon />
                    : "Add"}
            </Button>
        </form>
    )
}

const mapStateToProps = (state) => ({
    emails: state.data,
    UI: state.UI
})

const mapActionsToProps = {
    filterEmailsAction,
    getEmailAction,
    addNewMainEmailAction
}

export default connect(mapStateToProps, mapActionsToProps)(MainEmailForm)
