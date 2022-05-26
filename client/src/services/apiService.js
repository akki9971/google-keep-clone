import axios from "axios"

const DEFAUT_API_STRING = 'http://localhost:4040'

export const checkUserExists = (data) => {
    try{
    console.log(data);
    const { email} = data
    // const headers = {
    //     "content-type": "application/json"
    // };
        return axios.post(`${DEFAUT_API_STRING}/user/checkuser`, { email: email }).catch(err => console.log('there is an error in calling api'))
    // const requestOptions = {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: { email:email }
    // };
    // return fetch('http://localhost:4040/user/checkuser', requestOptions).then(response => response.json()).catch(err =>console.log(err,'there is an error in calling api'))
} catch (err) {
    console.log(err);
}

}

export const login = (data) => {
    try {
        const { email, password } = data
        return axios.post(`${DEFAUT_API_STRING}/user/login`, { email: email, password: password }).catch(err => console.log('there is an error in calling api'))
    } catch (error) {
        console.log(error);
    }
}



export const getUser = (token) => {
    try {
        const header = {
            'auth-token': token.toString(),
            'content-type': 'application/json'
        }
        return axios.post(`${DEFAUT_API_STRING}/user/getuser`, {}, {headers:header}).catch(err => console.log(err,'there is an error in calling api'))
    } catch (error) {
        console.log(error);
    }
}


export const register = (data) => {
    const {name, email, password} = data
    return axios.post(`${DEFAUT_API_STRING}/user/reguser`, { name, email, password })
}


// api service to post / create a note
export const postNote = (content) => {
    console.log(content);
    const { token, title, desc, category } = content
    const header = {
        'auth-token': token.toString(),
        'content-type': 'application/json'
    }
    return axios.post(`${DEFAUT_API_STRING}/notes/create`, {title:title.value,description: desc.value, category:category.value}, { headers: header }).catch(err => console.log(err, 'there is an error in calling api'))
}


// api service to fetch all available notes
export const getNotes = (token) => {
    
        const header = {
            'auth-token': token.toString(),
            'content-type': 'application/json'
        }
        return (axios.get(`${DEFAUT_API_STRING}/notes/getall`, { headers: header })
                .catch(err => console.log(err, 'there is an error in calling api'))
        )
}

export const getOneNote = (id) => {
    const token = localStorage.getItem('auth-token')
    if(token){
        const header = {
            'auth-token': token.toString(),
            'content-type': 'application/json'
        }
        return (axios.get(`${DEFAUT_API_STRING}/notes/getone/${id}`, { headers: header })
            .catch(err => console.log(err, 'there is an error in calling api'))
        )
    }
}

export const editNote = (data)=>{
    const token = localStorage.getItem('auth-token')
    if (token) {
        console.log(data);
        const {_id, title, description, category} = data
        const header = {
            'auth-token': token.toString(),
            'content-type': 'application/json'
        }
        return (axios.put(`${DEFAUT_API_STRING}/notes/edit/${_id}`,{title, description, category} ,{ headers: header })
            .catch(err => console.log(err, 'there is an error in calling api'))
        )
    }
}
export const deleteNote = (id)=>{
    const token = localStorage.getItem('auth-token')
    if (token) {
        const header = {
            'auth-token': token.toString(),
            'content-type': 'application/json'
        }
        return (axios.delete(`${DEFAUT_API_STRING}/notes/delete/${id}`, { headers: header })
            .catch(err => console.log(err, 'there is an error in calling api'))
        )
    }
}