import React from 'react';
import logo from '../../assets/images/elleving.png'
import paleta from '../../assets/images/paleta.png'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { FaFacebookF } from 'react-icons/fa'
import { FiPower } from 'react-icons/fi'
import { Link } from 'react-router-dom/'
import { login, isAuthenticated } from '../../services/auth'
import Footer from '../components/Footer'
import LinearProgress from '@material-ui/core/LinearProgress'
import './styles.css'


class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false
    }
  }

  getToken(resp) {
    // this.setState({loading:true})
    // let { accessToken } = resp
    // if(accessToken){
    // login(accessToken)
    this.props.history.push('/search')
    // }else{
    // alert('Não foi possível fazer entrar no sistema')
    // }
    // this.setState({loading:false})
  }

  async componentDidMount() {
    // await this.redirect()
  }
  async redirect() {
    let expire = await isAuthenticated()
    if (expire) {
      this.props.history.push('/search')
    }
  }
  render() {
    return (
      <div className="main-content">
        {this.state.loading &&
          <div style={{ width: '100%' }}>
            <LinearProgress />
          </div>
        }
        <img className="paleta" src={paleta} alt="paleta de cores" />
        <section className="login">
          <img className="img" src={logo} alt="logo elleving" />
          <p className="main-txt" >
            Clique abaixo para acessar <br />
            {/* com a conta do Facebook. */}
          </p>
          <button
            className={"faceButton"}
            onClick={this.getToken.bind(this)}
          >
            <FiPower size={30} />
          </button>
          {/* 
          <FacebookLogin
            appId="238340337257188"
            callback={this.getToken.bind(this)}
            render={renderProps => (
            Entrar com o Facebook

            )}
          /> */}
          <Link to={'/politicas'}>
              Políticas de Privacidade
          </Link>
          <p className={"main-termos"} >
            Ao fazer o login você concorda com<br />
          os <Link to="">
              Termos de Uso
          </Link>  da ferramenta <br />
          e <Link to="">
              Políticas de Privacidade.
          </Link>
          </p>
        </section>
        <Footer />
      </div>
    );
  }
}

export default Login;
