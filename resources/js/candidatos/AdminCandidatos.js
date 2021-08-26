import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'


export default class AdminCandidatos extends Component {
	constructor(props)
	{
		super(props);
		this.state =
		{
			candidatos : [],
		};

		this.changeHandler = e => {
			this.setState({ [e.target.name]: e.target.value});
		}

		this.submitHandler = e =>{
			e.preventDefault();
        }
        this.excluirCandidatos = this.excluirCandidatos.bind(this);
    }
	// Exclusão de Candidatos
	excluirCandidatos(e){
        let id = e;
        axios
		.post('/candidatos/destroy/'+id, this.state)
		.then(response =>
		{
			 if(response.data.code = '200')
			 {
				window.location.replace('/candidatos/admin');
			 }
		})
		.catch(error =>
		{
			console.log(error);
		})
    }

    // Get Candidatos
	getCandidatos(idVaga) {
		let id = idVaga;
		console.log(id);
		if(!id)
		{
			axios.get('/candidatos/lista')
            .then((response) =>
            {
                let candidatos = [];
                response.data.candidatos.map((candidato) =>
                candidatos.push(candidato));

                this.setState({
                	candidatos: [...candidatos]
				})
            })
            .catch(error => console.log("It was not possible to bring the data from the database."));
		}
		else
		{
			axios.get('/candidatos/listacandidato/'+id)
            .then((response) =>
            {
                let candidatos = [];
                response.data.candidatos.map((candidato) =>
                candidatos.push(candidato));

                this.setState({
                	candidatos: [...candidatos]
				})
            })
            .catch(error => console.log("It was not possible to bring the data from the database."));
		}
    }
    componentDidMount() {
    	let url_atual      = window.location.href;
		let myarr          = url_atual.split("/");
		let idVaga         = myarr[5];
        this.getCandidatos(idVaga);
    }
    render() {
        const { candidatos } = this.state;
        return (

            <div className="table-responsive-md">
                <div className="row">
                    <div className="col-12 text-right marginbtm-50">
                    </div>
                </div>
                <table className="table">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Candidato</th>
                    <th scope="col">Email</th>
                    <th scope="col">CPF</th>
                    <th scope="col">telefone</th>
                    <th scope="col">Vaga</th>
                    <th scope="col" className="opcoes-tabela">Opções</th>
                </tr>
                </thead>
                <tbody>
                {
                	candidatos.map(candidato => (

                <tr key={candidato.id} id={candidato.id}>
                    <th scope="row">{candidato.id}</th>
                    <td>{candidato.nome}</td>
                    <td>{candidato.email}</td>
                    <td>{candidato.cpf}</td>
                    <td>{candidato.telefone}</td>
                    <td>{candidato.Vaga}</td>
                    <td><a href={'/candidatos/detalhe/'+candidato.id} className="btn btn-secondary btn-sm"><i className="far fa-eye"></i></a> <button onClick={() => this.excluirCandidato(candidato.id)} className="btn btn-danger btn-sm"><i className="far fa-trash-alt"></i></button></td>
                </tr>
                    ))
                }
                </tbody>
            </table>
          </div>
        );
    }
}
