import axios from "axios";

const API_KEY = "AIzaSyDLJ-PrgWrzmu27p4esX_2VAzsLtK-Hz_4";

export const createUserHTTP = async (email, password) =>
{
    const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
    {
        email,
        password,
        returnSecureToken: true, // always should be true due to documentation >>> https://firebase.google.com/docs/reference/rest/auth#section-create-email-password
    })
    return response.data.idToken;
}

export const loginUserHTTP = async (email, password) =>
{
    const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
    {
        email,
        password,
        returnSecureToken: true, // always should be true due to documentation >>> https://firebase.google.com/docs/reference/rest/auth#section-sign-in-email-password
    })
    return response.data.idToken;
}