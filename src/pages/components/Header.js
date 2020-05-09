import React from 'react';

// import { Container } from './styles';
import logoWhite from '../../assets/images/whitelogo.png'
import './styles.css'
import { Button } from '@material-ui/core';
import { logout} from '../../services/auth'
import { useHistory } from 'react-router-dom'

const Header = (props) => {
  const history =  useHistory()
  function logoutApp(){
       logout()
      history.push('/')
  }

  return (
    <header className="header-search">
      <img src={logoWhite} alt=""/>
      <Button 
      onClick={logoutApp}
      style={{color:'#fff'}}>
        Sair
      </Button>
    </header>
  )
}

export default Header;