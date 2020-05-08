import axios from 'axios'
export const permantenToken = 'AADYxO8jSuQBAB5bPHM5T2BGA6uLncvoNyogPWXkhR8dn0ZBnZCS5PBvPboZBvVgG2pgsbZCDkfUl4VVoRyWZBgWI6V1nylVr9gIztseFHSPtRJNjsZBW6Q9AH8J4gOPscuCXZCP7Jr7hfavOniT8Ikqm3saZAgevESHAw3c0vScXwZDZD'
export const isAuthenticated = async () => {
    let accessToken = localStorage.getItem('acessToken')
    try {
        if(!accessToken) throw new Error('Faça o login novamente.')
        let res = await axios.get(`https://graph.facebook.com/debug_token?input_token=${accessToken}&access_token=${permantenToken}`)
        let { is_valid} = res.data.data
        return is_valid
    } catch (error) {
        console.log(error)   
    }
    
}
export const getToken = () =>  localStorage.getItem('acessToken')
export const login = acessToken => localStorage.setItem('acessToken',acessToken)
export const logout = () => localStorage.removeItem('acessToken')
