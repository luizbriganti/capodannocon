import { getUser, logInOutUser } from "./network"

export const appURL = 'https://capodannocon.herokuapp.com/' 

export const isLoggedIn = user => {
    /*const loggedIn = localStorage.getItem('isLoggedIn')

    return loggedIn === 'undefined' || !loggedIn ? false : true*/

    return user.logStatus
}

export const login = user => {
    return logInOutUser(user)   
}

export const logout = user => {
    return logInOutUser(user)
}

export const getCurrentUser = userid => {
    return getUser(userid)
}