import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
//Redux
import { Provider } from 'react-redux'
import store from './redux/store'

//Importing components that should render immediately on app mount
import NavBar from './components/NavBar/'
import PageLoader from './components/Loaders/PageLoader'
import authHandler from './utils/authHandler'
//Importing pages with lazy loading
const HomePage = lazy(() => import('./pages/HomePage/'))
const LoginPage = lazy(() => import('./pages/LoginPage'))
const SignUpPage = lazy(() => import('./pages/SignUpPage'))
const UserSettingsPage = lazy(() => import('./pages/UserSettings'))

const useStyle = makeStyles(() => ({
  appContainer: {
    maxWidth: "100%",
    margin: "64px 0"
  }
}))

const App = () => {
  const classes = useStyle()

  return (
    <Provider store={store}>
      <Router>
        <NavBar />
        <div className={classes.appContainer} >
          <Suspense fallback={<PageLoader />}>
            <Switch>
              <Route path="/" exact component={props => authHandler(localStorage.getItem("user")) ? <HomePage /> : <Redirect to="/login" />} />
              <Route path="/login" component={props => authHandler(localStorage.getItem("user")) ? <Redirect to="/" /> : <LoginPage />} />
              <Route path="/signup" component={props => authHandler(localStorage.getItem("user")) ? <Redirect to="/" /> : <SignUpPage />} />
              <Route path="/user-settings" component={props => authHandler(localStorage.getItem("user")) ? <UserSettingsPage /> : <Redirect to="/login" />} />
            </Switch>
          </Suspense>
        </div>
      </Router>
    </Provider>
  )
}

export default App