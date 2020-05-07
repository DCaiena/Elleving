import axios from 'axios'
import {useHistory} from 'react-router-dom'
export const permantenToken = 'EAAl2PcrDT7QBAEkvPW50hXeQAn2pNOvsuOidVOD5sAZBmxedel3X5oYA1mqhTkE5zKT9w4HsVkezsGROdK8LegnZCWvoWuZC9H6ZA3tSc3DayJ9LeWrr2p2TlwIsqw6iqRKS8K9OtVW5L2eFXZAhH5Lnsi12H7BJVFX6xylUwuwZDZD'
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
