import axios from 'axios'
export const permantenToken = 'EAAHjCffE3yEBAOHHiWa0TCjcVK1SbRYKVsOwtF8wo0V6ygC9fAt0ER9iPbJcG8YaR16MRMZB1tZCTR2QY1DzNmSo0Kzs3rKRNUo7MuxvyYEW7ooaT4DBDHw5phx0X6D0ocTbKqCLqDR48MGTXtINihXLhxuiTibIKrWtcgBQZDZD'
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
