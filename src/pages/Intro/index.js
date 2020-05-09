import React from 'react';
import template from '../../assets/images/template.png'
import './styles.css';
import { logout } from '../../services/auth'
import logo from '../../assets/images/logo.png'



function Intro({history}) {
        return (
            <>
                <header className="header">
                    <img src={logo} alt="" />
                </header>
                <div className="main-intro-content" >
                    <div className="main-intro-content-txt">
                    <h1>Economize até 70% em Faceads</h1>
                    <h2>Crie campanhas mais assertivas e lucrativas.</h2>
                    <h3>Tenha MUITO mais vantagens em relação aos concorrentes utilizando esta ferramenta de <br/>
                    segmentação para públicos secretos no Facebook e Instagram</h3>
                    <button onClick={() => history.push('./search')}  >
                        Teste grátis!!!
                    </button>
                    </div>
                    <img src={template} alt="" />
                </div>
            </>
        )
}

export default Intro;