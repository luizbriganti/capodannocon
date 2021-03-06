const bcrypt = require('bcryptjs')

const baseURL = "/api/" //"http://localhost:3001/";

export const makeReq = async (url, errorMessage = '', options = {}) => {
  return fetch(url, options)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(errorMessage);
      }
  });
}

export const getAll = () => {
  const errorMessage = 'Errore durante il download dei dati';
  return makeReq(`${baseURL}events`, errorMessage);
};

export const filterEvent = (date) => {
  const errorMessage = 'Errore durante il download dei dati'
  
  return makeReq(`${baseURL}events?${date != 'null' ? `date=${date}` : ''}`, errorMessage)
}

export const getUsers = () => {
  const errorMessage = 'Errore durante il download dei dati';
  const url = `${baseURL}users`

  return makeReq(url, errorMessage)
}

export const hashIt = async password => {
  const salt = await bcrypt.genSalt(6)
  const hashed = bcrypt.hashSync(password, salt)

  return hashed
}

export const compareIt = async (password, hashedPassword) => {
  const validPassword = bcrypt.compareSync(password, hashedPassword)

  return validPassword
}

export const sendEventToTheServer = (event) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(event)
  };
    
  const errorMessage = 'Errore nel collegamento col server';

  return makeReq(`${baseURL}events`, errorMessage, options);
};

export const setUser = (user) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(user)
  }

  const errorMessage = "errore nel collegamento al server"

  return makeReq(`${baseURL}users`, errorMessage, options)
}

export const getUser = userid => {
  const options = {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    }
  }

  const errorMessage = "Errore nel collegamento al server"

  return makeReq(`${baseURL}users/${userid}`, errorMessage, options)
}

export const verifyUser = user => {
  const options = {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(user)
  }

  const errorMessage = "errore nel collegamento al server"

  return makeReq(`${baseURL}users/${user.id}`, errorMessage, options)
}

export const logInOutUser = user => {
  const options = {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(user)
  }

  const errorMessage = "Errore nel collegamento al server"

  return makeReq(`${baseURL}users/${user.id}`, errorMessage, options)
}

export const editEvent = event => {
  const options = {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(event)
  }

  const errorMessage = "Errore nel collegamento al server"

  return makeReq(`${baseURL}events/${event.id}`, errorMessage, options)
}

export const deleteEventFromTheServer = (eventId) => {
  const options = {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    }
  };

  const errorMessage = "Impossibile cancellare l'elemento dal server";

  const url = `${baseURL}events/${eventId}`;
    
  return makeReq(url, errorMessage, options);
}

export const deleteUser = (userId) => {
  const options = {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    }
  }

  const errorMessage = "Impossibile cancellare l'elemento dal server"

  const url = `${baseURL}users/${userId}`

  return makeReq(url, errorMessage, options)
}