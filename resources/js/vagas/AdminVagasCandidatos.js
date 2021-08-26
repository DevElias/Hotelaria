import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import InputMask from 'react-input-mask';
import { CSVLink, CSVDownload } from "react-csv";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class AdminVagasCandidatos extends Component {
	constructor(props)
	{
		super(props);
		this.state =
		{
			candidatos : [],
			aCandidatos:[],
			data: '',
			hora: '',
			local: '',
			procurar: '',
		};

		this.changeHandler = e => {
			this.setState({ [e.target.name]: e.target.value});
		}

		this.submitHandler = e =>{
			e.preventDefault();
        }
        this.excluirCandidatos  = this.excluirCandidatos.bind(this);
        this.reprovarCandidatos = this.reprovarCandidatos.bind(this);
        this.aprovarCandidatos  = this.aprovarCandidatos.bind(this);
        this.ChkCandidato       = this.ChkCandidato.bind(this);
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

	// heckBox de Candidatos - Invite de Entrevista
	ChkCandidato(idCandidato)
	{
		let chk = document.getElementById('candidato'+idCandidato);

		// Se checked adiciona no State
		if (chk.checked == true)
		{
			this.setState({
	            aCandidatos: [... this.state.aCandidatos, idCandidato]
	        })
		}
		else
		{
		    this.setState({
		    	aCandidatos: this.state.aCandidatos.filter(
				function(candidatos)
				{
					return candidatos !== idCandidato
				})
			});
		}
	}

	entrevista(aDados)
	{
		axios
		.post('/candidatos/entrevista', aDados.state)
		.then(response =>
		{
			document.getElementById("formularioCand").reset()
			return toast.success(response.data.response[0]);
		})
		.catch(error =>
		{
			return toast.error(error);
		})
	}

	// Reprovar de Candidatos
	reprovarCandidatos(e){
        let id = e;
        axios
		.post('/candidatos/reprovar/'+id, this.state)
		.then(response =>
		{
			 if(response.data.code = '200')
			 {
				 location.reload();
			 }
		})
		.catch(error =>
		{
			console.log(error);
		})
    }

	// Aprovar de Candidatos
	aprovarCandidatos(e){
        let id = e;
        axios
		.post('/candidatos/aprovar/'+id, this.state)
		.then(response =>
		{
			 if(response.data.code = '200')
			 {
				 location.reload();
			 }
		})
		.catch(error =>
		{
			console.log(error);
		})
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
	                    <div className="col-12 col-md-2 marginbtm-50">
		                    <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
		                        Enviar Convite
		                    </button>
		                </div>
	                    <div className="col12 col-md-2 marginbtm-50">
	                    	<CSVLink data={this.state.candidatos} separator={";"} className="btn btn-outline-info">Download Excel</CSVLink>
	                    </div>

                    <div className="modal fade" id="exampleModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Corpo da mensagem</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form id="formularioCand" onSubmit={this.submitHandler}>
                            <ToastContainer />
                                <div className="form-group row">
                                    <div className="col-12 col-md-6">
                                        <label>Data*:</label>
                                        <InputMask mask="99/99/9999" maskChar=" " id="data" type="text"
            								className="form-control-rounded form-control"
            									name="data" value={this.state.data} onChange={this.changeHandler} />
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <label>Horário*:</label>
                                        <InputMask mask="99:99" maskChar=" " id="hora" type="text"
            								className="form-control-rounded form-control"
            									name="hora" value={this.state.hora} onChange={this.changeHandler} />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-12">
                                        <label>Local*:</label>
                                        <input id="local" type="text" className="form-control-rounded form-control" name="local" onChange={this.changeHandler} />
                                    </div>
                                </div>
                                <div className="form-group row">
                                <div className="col-12">
                                    <label>Procurar Por*:</label>
                                    <input id="procurar" type="text" className="form-control-rounded form-control" name="procurar" onChange={this.changeHandler}/>
                                </div>
                            </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Fechar</button>
                            <button type="button" onClick={() => this.entrevista(this)} className="btn btn-primary">Enviar</button>
                        </div>
                        </div>
                    </div>
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
                    <th scope="col">Status</th>
                    <th scope="col">Data Entrevista</th>
                    <th scope="col" className="opcoes-tabela">Opções</th>
                </tr>
                </thead>
                <tbody>
                {
                	candidatos.map(candidato => (

                <tr key={candidato.id} id={candidato.id}>
                    <th scope="row"> <input type="checkbox" id={'candidato'+candidato.id} name={'candidato'+candidato.id} onClick={() => this.ChkCandidato(candidato.id)} /></th>
                    <td>{candidato.nome}</td>
                    <td>{candidato.email}</td>
                    <td>{candidato.cpf}</td>
                    <td>{candidato.telefone}</td>
                    <td>{candidato.Vaga}</td>
                    <td>{candidato.StatusCandidato}</td>
                    <td>{candidato.data_entrevista}</td>
                    <td><a href={'/candidatos/detalhe/'+candidato.id} className="btn btn-secondary btn-sm"><i className="far fa-eye"></i></a> <button onClick={() => this.excluirCandidato(candidato.id)} className="btn btn-danger btn-sm"><i className="far fa-trash-alt"></i></button> <button onClick={() => this.reprovarCandidatos(candidato.id)} className="btn btn-warning btn-sm"><i className="far fa-window-close"></i></button> <button onClick={() => this.aprovarCandidatos(candidato.id)} className="btn btn-success btn-sm"><i className="far fa-check-square"></i></button></td>
                </tr>
                    ))
                }
                </tbody>
            </table>
          </div>
        );
    }
}
