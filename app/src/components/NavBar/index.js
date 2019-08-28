import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { fade, makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import EmailIcon from '@material-ui/icons/Email'
// import InputBase from '@material-ui/core/InputBase'
// import SearchIcon from '@material-ui/icons/Search'
import ExitIcon from '@material-ui/icons/ExitToApp'
import SettingsIcon from '@material-ui/icons/Settings'
import authHandler from '../../utils/authHandler'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    toolbarBtns: {
        display: "flex",
        flexDirection: "row-reverse",
        float: "right",
        width: "100%"
    },
    iconBtn: {
        position: "absolute",
        left: 15,
    },
    logoIcon: {
        fontSize: 30
    },
    logoTxt: {
        marginLeft: 10,
        fontSize: 15
    },
    searchContainer: {
        display: "flex",
        width: "50%",
        justifyContent: "center",
        position: "absolute",
        left: "50%",
        transform: "translateX(-50%)"
    },
    search: {
        position: "relative",
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        "&:hover": {
          backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: "50%"
    },
    searchIcon: {
        width: theme.spacing(7),
        height: "100%",
        position: "absolute",
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    inputRoot: {
        color: "inherit",
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        width: "100%"
    },
    btn: {
        textTransform: "capitalize"
    },
    navIcon: {
        marginLeft: 10
    }
}))

const NavBar = (props) => {

    const classes = useStyles()

    return (
        <AppBar className={classes.root}>
            <Toolbar>
                <Button className={classes.iconBtn} edge="start" color="inherit" aria-label="Menu" component={Link} to="/" >
                    <EmailIcon className={classes.logoIcon} /> <Typography className={classes.logoTxt} >Mailer</Typography>
                </Button>
                {/* <div className={classes.searchContainer} >
                    {authHandler(localStorage.getItem("user")) ? (
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase 
                                placeholder="Search..."
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput
                                }}
                            />
                        </div>
                    ) : <Fragment />}
                </div> */}
                <div className={classes.toolbarBtns}>
                    {authHandler(localStorage.getItem("user")) ? (
                        <Fragment>
                            <Button className={classes.btn} color="inherit" onClick={() => {
                                localStorage.removeItem("user")
                                window.location.reload()
                            }}>Exit <ExitIcon className={classes.navIcon} /></Button>
                            <Button className={classes.btn} color="inherit" component={Link} to="/user-settings">
                                Settings <SettingsIcon className={classes.navIcon} />
                            </Button>
                        </Fragment>
                    )
                        :
                        (<Fragment>
                            <Button color="inherit" component={Link} to="/signup" >Sing Up</Button>
                            <Button color="inherit" component={Link} to="/login" >Login</Button>
                        </Fragment>)
                    }
                </div>
            </Toolbar>
        </AppBar>
    )
}

export default NavBar
