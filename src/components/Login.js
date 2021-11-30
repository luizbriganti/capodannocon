import React, { Component } from 'react'
import { getUsers, hashIt, compareIt, setUser } from '../utils/network'
import { appURL } from '../utils/extras'
import {v4 as uuid} from 'uuid'
import emailjs, { init } from 'emailjs-com'
import { Navigate } from 'react-router'
import SweetAlert from 'react-bootstrap-sweetalert'

init('user_lLGwhhli0BQUl5nTAduzL')

export default class Login extends Component {
    constructor(props){
        super(props)

        this.state = { 
            hashedPass: false,
            users: [],
            error: '',
            emailSent: false,
            userAlert: false
        }

        this._isMounted = false
    }

    componentDidMount(){
        this._isMounted = true
    }

    componentWillUnmount(){
        this._isMounted = false
    }

    async handleSubmit(e){
        e.preventDefault()
        
        const username = e.target.login_username.value
        const password = e.target.login_password.value

        getUsers()
        .then(data => this.setState({users: data}))
        .then(() => {
            const user = this.state.users.filter(user => user.username === username)

            if(user.length === 0){
                this._isMounted && this.setState({error: "Username non valido"})
            } else {
                compareIt(password, user[0].password)
                .then(res => {
                    if(res){
                        this.props.log({logStatus: true, user: user[0]})
                    } else {
                        this._isMounted && this.setState({error: "Password errata"})
                    }
                })
                .then(_ => this._isMounted && this.setState({users: []}))
                //.catch(error => console.log(error))
            }
        })
    }

    async sendEmail(user){
        const params = {
            username: user.username,
            email: user.email,
            sitename: 'CapodannoCON',
            verify_url: `${appURL}verify/${user.email_verified}`
        }

        emailjs.send('service_6om229g', 'template_dy4gloo', params)
    }

    async register(e){
        e.preventDefault() 

        const {register_username, register_password, register_email} = e.target

        //const formData = new FormData() 

        const user = {
            id: uuid(), 
            username: register_username.value, 
            password: register_password.value,
            email: register_email.value,
            role: 1, 
            email_verified: uuid(),
            created_at: new Date(), 
            updated_at: new Date()
        }

        getUsers()
        .then(data =>  {

            const userOrEmail = data.filter(u => u.username === user.username || u.email === user.email)

            if(userOrEmail.length === 0){
                hashIt(register_password.value)
                .then(data => this.setState({hashedPass: data}))
                .then(() => {
                    /*const user = {
                        id: uuid(), 
                        username: register_username.value, 
                        password: this.state.hashedPass, 
                        email: register_email.value,
                        role: 1, 
                        email_verified: uuid(),
                        created_at: new Date(), 
                        updated_at: new Date()
                    }*/

                    const regUser = {...user, password: this.state.hashedPass}
        
                    setUser(regUser)
                    .then(() => this.sendEmail(regUser))
                    .then(() => this.setState({emailSent: true}))
                })
            } else {
                this.setState({userAlert: true})
            }
        })
    }

    render() {
        const {error} = this.state
        const {title, logStatus} = this.props

        return (        
            logStatus ?
            <Navigate to={appURL} /> :
            <div className="login-register">
                <div className="container form-wrapper">
                    <img src="logo.png" alt="capodannocon" />
                    <h3>{title}</h3>

                    <form id="login" className="login" onSubmit={event => this.handleSubmit(event)}>
                        <h4>Effettua l'accesso...</h4>
                        <div className="form-row">
                            <label htmlFor="login_username"><strong>Username</strong></label>
                            <input type="text" id="login_username" required />
                        </div>
                        <div className="form-row">
                            <label htmlFor="login-password"><strong>Password</strong></label>
                            <input type="password" id="login_password" required />
                        </div>

                        {error}

                        <button className="btn btn-primary" type="submit">Login</button>
                    </form> 

                    <form id="register" className="register" onSubmit={event => this.register(event)}>
                        <h4>...oppure registrati</h4>
                        <div className="form-row">
                            <label htmlFor="register_username"><strong>Username</strong></label>
                            <input type="text" id="register_username" required />
                        </div>
                        <div className="form-row">
                            <label htmlFor="register_email"><strong>Email</strong></label>
                            <input type="email" id="register_email" required />
                        </div>
                        <div className="form-row">
                            <label htmlFor="register_password"><strong>Password</strong></label>
                            <input type="password" id="register_password" required />
                        </div>

                        <button className="btn btn-primary" type="submit">Register</button>
                    </form>
                </div>

                <SweetAlert
                    show={this.state.emailSent}
                    showConfirm
                    confirmBtnText="Ok"
                    title="Successo!"
                    onConfirm={() => this.setState({emailSent: !this.state.emailSent})}         
                >
                    <p>La tua registrazione è avvenuta con successo. Controlla la tua email e segui le istruzioni per verificare il tuo account.</p>
                </SweetAlert>
                <SweetAlert
                    show={this.state.userAlert}
                    showConfirm
                    confirmBtnText="Ok"
                    title="Attenzione!"
                    onConfirm={() => this.setState({userAlert: false})}         
                >
                    <p>Questo utente risulta già registrato.</p>
                </SweetAlert>
                
            </div>
        )
    }
}
