import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'


export default class AdminProcedimentos extends Component {
	constructor(props)
	{
		super(props);
		this.state =
		{
			procedimentos : [],
		};

		this.changeHandler = e => {
			this.setState({ [e.target.name]: e.target.value});
		}

		this.submitHandler = e =>{
			e.preventDefault();
        }
        this.excluirProcedimento = this.excluirProcedimento.bind(this);
    }
    excluirProcedimento(e){
    	let id = e;
        axios
		.post('/procedimentos/destroy/'+id, this.state)
		.then(response =>
		{
			 if(response.data.code = '200')
			 {
				window.location.replace('/procedimentos/admin');
			 }
		})
		.catch(error =>
		{
			console.log(error);
		})
    }
    // Get Perfil
	getProcedimentos() {
        axios.get('/procedimentos/listagem')
            .then((response) =>
            {
                let procedimentos = [];
                response.data.procedimentos.map((procedimento) =>
				procedimentos.push(procedimento));

                this.setState({
                	procedimentos: [...procedimentos]
				})
            })
            .catch(error => console.log("It was not possible to bring the data from the database."));
    }
    componentDidMount() {
        this.getProcedimentos();
    }
    render() {
        const { procedimentos } = this.state;
        return (

            <div className="table-responsive-md">
                <div className="row">
                    <div className="col-12 text-right marginbtm-50">
                    <a href="/procedimentos/cadastro" className="btn btn-primary">Novo Procedimento</a>
                    </div>
                </div>
                <table className="table">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Procedimento</th>
                    <th scope="col">Destacado</th>
                    <th scope="col">Liberado Download</th>
                    <th scope="col">Categoria / Sub</th>
                    <th scope="col">Arquivo</th>
                    <th scope="col" className="opcoes-tabela">Opções</th>
                </tr>
                </thead>
                <tbody>
                {
        			procedimentos.map(procedimento => (

                <tr key={procedimento.id} id={procedimento.id}>
                    <th scope="row">{procedimento.id}</th>
                    <td>{procedimento.titulo}</td>
                    <td>{procedimento.Destacado}</td>
                    <td>{procedimento.Liberado}</td>
                    <td>{procedimento.categoria} / {procedimento.subcategoria}</td>
                    <td><a href={procedimento.url} target="_blank">Arquivo</a></td>
                    <td><a href={'editar/'+procedimento.id} className="btn btn-secondary btn-sm"><i className="far fa-edit"></i></a> <button onClick={() => this.excluirProcedimento(procedimento.id)} className="btn btn-danger btn-sm"><i className="far fa-trash-alt"></i></button></td>
                </tr>
                    ))
                }
                </tbody>
            </table>
          </div>
        );
    }
}
