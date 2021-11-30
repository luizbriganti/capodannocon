import React, { Component } from 'react';
//import getId from './utils/generateId';
import './sass/App.scss'
import Login from './components/Login';
import { logout, login, getCurrentUser } from './utils/extras'
import Application from './components/Application';
import {
    BrowserRouter as Router, 
    Routes as Switch,
    Route,
} from 'react-router-dom'
import VerifyEmail from './components/VerifyEmail';
import SweetAlert from 'react-bootstrap-sweetalert'

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      error: '', 
      nextIndex: false,
      logStatus: false,
      currentUser: {},
      emailVerified: false,
    };
  }

  componentDidMount(){
    const user = localStorage.getItem('currentUser')
    if(user){
      getCurrentUser(user)
      .then(data => this.setState({currentUser: data, logStatus: data.logStatus}))
    }
  }

  log(obj){
    const {logStatus, user} = obj

    switch(logStatus){
      case false:
        const {currentUser} = this.state
        currentUser.logStatus = false
        logout(currentUser)
        this.setState({logStatus: false, currentUser: {}})
        localStorage.removeItem('currentUser')
        break;
      case true:
        user.logStatus = true
        login(user)
          .then(() => {
            this.setState({logStatus: true, currentUser: user})
          })

          localStorage.setItem('currentUser', user.id)
        break;
      case 'verified':
        user.logStatus = true
        login(user)
          .then(() => {
            this.setState({logStatus: true, currentUser: user, emailVerified: true})
          })
          localStorage.setItem('currentUser', user.id)
        break;
    }
  }
  
  render() {

    const {logStatus} = this.state 

    return ( 
      <>
        <Router>
          <Switch>
            <Route exact path="/login" element={<Login title="You are not logged in :(" log={this.log.bind(this)} logStatus={logStatus} /> } />
            <Route exact path="/" element={<div><Application log={this.log.bind(this)} logStatus={logStatus} user={this.state.currentUser}/></div>} />
            <Route path="/verify/*" element={<VerifyEmail log={this.log.bind(this)} />} />
          </Switch>
        </Router>
        <SweetAlert
            show={this.state.emailVerified}
            showConfirm
            confirmBtnText="Ok"
            title="Successo!"
            onConfirm={() => this.setState({emailVerified: !this.state.emailVerified})}         
        >
            <p>La tua email è stata verificata con successo</p>
        </SweetAlert>
      </>
    );
  }
}

export default App;