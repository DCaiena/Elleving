import React from 'react';
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useTheme } from '@material-ui/core/styles';
import {
  Table,
  CircularProgress,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableFooter,
  TablePagination,
  TableContainer,
  Paper,
  IconButton,
} from '@material-ui/core'
import { FirstPage, LastPage, KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';
import { isAuthenticated } from '../../services/auth'
import axios from 'axios'
import './styles.css'

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      rows: [],
      pesquisa: '',
      found: '0',
      loading: false,
      page: 0,
      rowsPerPage: 5,
    }
  }

    async componentDidMount(){
      await this.expires.bind(this)
    }

    async expires(){
      let valid = await isAuthenticated()
      if(valid) return true
      else this.props.history.push('/')
    }

  changePage(e, page) {
    this.setState({ page })
  }
  changeRowsPerPage(event) {
    this.setState({ rowsPerPage: parseInt(event.target.value, 10), page: 0 })
  }
  search(e) {
    e.preventDefault()
    this.setState({ loading: true })
    let accessToken = localStorage.getItem('acessToken')
    const url = `https://graph.facebook.com/search?type=adinterest&q=[${this.state.pesquisa}]&limit=10000&locale=en_US&access_token=${accessToken}`
    axios.get(url).then(resp => {
      let { data: rows } = resp.data
      this.setState({ rows, found: rows.length })
    }).catch(error => {
      console.log(error)
    }).finally(() => this.setState({ loading: false }))
  }
  render() {
    let { rows, found, pesquisa, loading, page, rowsPerPage } = this.state
    return (
      <>
        <Header />
        <div className="main-search-content">
          <div className="search-content">
            <div className="txt" >
              <span >Buscador de Interesses Secretos</span>
            </div>
            <form onSubmit={this.search.bind(this)}>
              <div className="form">
                <div className="form-spaces">
                  <div className="squad">
                    <input
                      placeholder="Palavra-chave"
                      type="text"
                      onChange={e => this.setState({ pesquisa: e.target.value })}
                      value={pesquisa} />
                  </div>
                </div>
                <div className="form-spaces">
                  <button disabled={loading} type="submit" >
                    {
                      loading ?
                        <CircularProgress style={{ color: '#fff' }} size={30} />
                        :
                        'Buscar Interesses'
                    }
                  </button>
                  <div className="results">
                    <p><b>{`${found}`}</b>  Interesses encontrados</p>
                  </div>

                </div>
              </div>
            </form>
            {
              <TableContainer style={{ marginTop: 30 }} component={Paper}>
                <Table >
                  <TableHead >
                    <TableRow style={{ width: '100%', display: 'flex' }}>
                      <TableCell className="cell" align="left" style={estilo.headtxt}  >
                        Interesses
                      </TableCell>
                      <TableCell className="cell" align="left" style={estilo.headtxt}>
                        Tamanho da audiência
                    </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(rowsPerPage > 0 ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : rows
                    ).map(row => <Rows audience={numberDotFormat(row.audience_size)} key={row.id} {...row} />)}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TablePagination
                        rowsPerPageOptions={[5, 10, 20, { label: 'Todos', value: -1 }]}
                        colSpan={rows.length}
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={this.changePage.bind(this)}
                        onChangeRowsPerPage={this.changeRowsPerPage.bind(this)}
                        ActionsComponent={TablePaginationAction.bind(this)}
                      />
                    </TableRow>
                  </TableFooter>
                </Table>
              </TableContainer>

            }
          </div>
          <Footer />
        </div>
      </>
    )
  }
}

function TablePaginationAction(props) {
  let { count, page, rowsPerPage, onChangePage } = props
  const theme = useTheme();

  const firstPageButtonClick = event => {
    onChangePage(event, 0);
  }

  const backButtonClick = event => {
    onChangePage(event, page - 1);
  }

  const nextButtonClick = event => {
    onChangePage(event, page + 1)
  }

  const lastPageButtonClick = event => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1))
  }

  return (
    <div style={{ flexShrink: 0, marginLeft: theme.spacing(2.5) }}>
      <IconButton
        onClick={firstPageButtonClick}
        disabled={page === 0}
        aria-label="Primeira página"
      >
        {theme.direction === 'rt1' ? <LastPage /> : <FirstPage />}
      </IconButton>
      <IconButton
        onClick={backButtonClick}
        disabled={page === 0}
        arial-label="Página anterior"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={nextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        arial-label="Próxima página"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={lastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="Última página"
      >
        {theme.direction === 'rtl' ? <FirstPage /> : <LastPage />}
      </IconButton>
    </div>
  )

}


function numberDotFormat(str) {
  return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

class Rows extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      copiado:false
    }
  }

  copyValue(){
    this.setState({copiado:true})
    navigator.clipboard.writeText(this.props.name)
    setTimeout(() => {
      this.setState({copiado:false})
    }, 3000);
  }

  render(){
    let { name, audience  } = this.props
    return (
      <TableRow style={{ width: '100%', display: 'flex', borderWidth: 2, borderStyle: 'solid', borderColor: '#0094cc' }}>
        <TableCell align="left" className="cell" style={estilo.fonts}  >
          {name}
        </TableCell>
        <TableCell className="cell"  >
          <div className="cell" style={{ justifyContent: 'space-between', ...estilo.fonts }}>
            {audience}
            <button className="copy-button"
            onClick={this.copyValue.bind(this)}
            >
              {
                this.state.copiado ?
                "Copiado"
                :
                "Copiar"
              }
            </button>
          </div>
        </TableCell>
      </TableRow>
    )

  }
}

const estilo = {
  fonts: {
    fontSize: 18,
    fontWeight: '400'
  },
  headtxt: {
    color: '#41414d',
    fontSize: 30
  }
}

export default Search;