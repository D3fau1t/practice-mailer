import React, { useEffect, Fragment, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import InputBase from '@material-ui/core/InputBase'
import Button from '@material-ui/core/Button'
import Email from './Email'
import { connect } from 'react-redux'
import ComponentLoader from '../../../../components/Loaders/ComponentLoader'
import { getAllEmailsAction, filterEmailsAction, setSelectedEmailsAction, setSendEmailsAction, deleteSendEmailsAction } from '../../../../redux/actions/dataActions'

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
        height: "auto",
        paddingBottom: "60px"
    },
    searchContainer: {
        position: "relative",
        borderRadius: theme.shape.borderRadius,
        backgroundColor: "rgba(0,0,0,0.02)",
        "&:hover": {
          backgroundColor: "rgba(0,0,0,0.05)"
        },
        margin: 10,
        width: "95%"
    },
    inputRoot: {
        color: "inherit",
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        width: "100%"
    },
    selectAllBtn: {
        textTransform: "Capitalize"
    }
}))

const EmailsList = (props) => {

    const classes = useStyles()

    const [searchState, setSearch] = useState("")
    const [emailsState, setEmails] = useState([])
    const [filteredState, setFiltered] = useState([])
    const [allSelectedState, setAllSelected] = useState(false)

    const { getEmailsList, filteredEmailsList, getAllEmailsAction,
            filterEmailsAction, setSelectedEmailsAction, setSendEmailsAction, 
            deleteSendEmailsAction } = props

    // useEffect(() => {
    //     console.log(sendEmails)
    // }, [sendEmails])
    
    useEffect(() => {
        getAllEmailsAction()
        return () => {
            filterEmailsAction("", [])
        }
    }, [])

    useEffect(() => {
        const newList = getEmailsList.map((res, i) => ({
            email: res.email,
            emails: res.emails,
            id: i + 1,
            selected: false
        }))
        setEmails(newList)
    }, [getEmailsList])

    useEffect(() => {
        setFiltered(filteredEmailsList)
    }, [filteredEmailsList])

    useEffect(() => {
        setSelectedEmailsAction(emailsState)
    }, [emailsState])

    const searchHandler = (event) => {
        setSearch(event.target.value)
        filterEmailsAction(event.target.value, emailsState)
    }

    const selectAllHandler = () => {
        setAllSelected(allSelectedState ? false : true)
        if (filteredState.length === 0) {
            const updatedEmailsState = emailsState.map(res => {
                allSelectedState ? deleteSendEmailsAction(res.email) : setSendEmailsAction(res.email)
                return Object.assign({}, res, {selected: allSelectedState ? false : true})
            })
            setEmails(updatedEmailsState)
        } else {
            const updatedFilteredState = filteredState.map(filteredEmail => {
                allSelectedState ? deleteSendEmailsAction(filteredEmail.email) : setSendEmailsAction(filteredEmail.email)
                const updatedEmailsState = emailsState.map(email => (
                    email.id === filteredEmail.id ? Object.assign({}, email, {selected: allSelectedState ? false : true}) : email    
                ))
                setEmails(updatedEmailsState)
                return Object.assign({}, filteredEmail, {selected: allSelectedState ? false : true})
            })
            setFiltered(updatedFilteredState)
        }  
    }

    const selectEmailHandler = (selectedState, arrayKey) => {
        const updatedEmailsState = emailsState.map(res => {
            if (res.id === arrayKey) {
                selectedState ? deleteSendEmailsAction(res.email) : setSendEmailsAction(res.email)
                return Object.assign({}, res, {selected: selectedState ? false : true})
            } else {
                return res
            }
        })
        setEmails(updatedEmailsState)
        if (filteredState.length !== 0) {
            const updatedFilteredState = filteredState.map(res => {
                if (res.id === arrayKey) {
                    return Object.assign({}, res, {selected: selectedState ? false : true})
                } else {
                    return res
                }
            })
            setFiltered(updatedFilteredState)   
        }
    }

    return (
        <Fragment>
            {emailsState.length === 0 ? <ComponentLoader /> : (
                <List className={classes.root} >
                    <div className={classes.searchContainer} >
                        <InputBase
                            onChange={searchHandler}
                            value={searchState}
                            placeholder="Search..."
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput
                            }}
                        />
                    <Button className={classes.selectAllBtn} onClick={selectAllHandler} >Select All</Button>
                    </div>
                    {filteredState.length !== 0 ? filteredState.map((res, i) => (
                            <Email
                                key={i}
                                arrayKey={res.id}
                                email={res.email}
                                selected={res.selected}
                                selectEmailHandler={selectEmailHandler}
                            /> )) : 
                            emailsState.map((res, i) => (
                                <Email
                                    key={i}
                                    arrayKey={res.id}
                                    email={res.email}
                                    selected={res.selected}
                                    selectEmailHandler={selectEmailHandler}
                                /> ))
                    }
                </List>
            )}
        </Fragment>
    )
}

const mapStateToProps = (state) => ({
    getEmailsList: state.data.getEmailsList,
    filteredEmailsList: state.data.filteredEmails,
    sendEmails: state.data.sendEmails
})

const mapActionsToProps = {
    getAllEmailsAction,
    filterEmailsAction,
    setSelectedEmailsAction,
    setSendEmailsAction,
    deleteSendEmailsAction
}

export default connect(mapStateToProps, mapActionsToProps)(EmailsList)
