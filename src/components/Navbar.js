import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Navbar extends Component {

    logout(){
        this.props.log({logStatus: false})
    }

    render() {
        return (
            <header id="mast-head" className="navbar navbar-nav">
                <div className="container">
                    <div className="app-logo">
                        <img src="logo.png" alt="capodannocon" />
                    </div>  
                    <nav className="main-navigation" role="navigation">
                        <ul>
                            {this.props.user.role === 0 ? <Link to="/users">Utenti</Link> : ''}                            
                            <li onClick={() => this.logout() }>Ciao <strong>{this.props.user.username}</strong>! <span>Logout</span></li>
                        </ul>
                    </nav>
                </div>                
            </header>
        )
    }
}
