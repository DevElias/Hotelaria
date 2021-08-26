import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'


export default class DetalheCandidatos extends Component {
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
    }

    // Get Candidatos
	getCandidatos(idVaga) {
		let id = idVaga;
        axios.post('/candidatos/getcandidatodetalhe/'+id)
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
    componentDidMount() {
        // Pega Id da Vaga de acordo com URL
        let url   = window.location.href;
        let myarr = url.split("/");
        let id = myarr[5];
        this.getCandidatos(id);
    }
    render() {
        const { candidatos } = this.state;
        return (

                <div className="row">

                    {
                        candidatos.map(candidato => (

                    <Fragment key={candidato.id}>
                        <div className="col-12">
                        <h1>{candidato.nome}</h1>
                        <p>Data/hora de Inclusão {candidato.data_inclusao}</p>
                        <hr />
                        </div>
                        <div className="col-12 col-md-6">
                           <h4> Dados para Contato:</h4>
                            <ul>
                                <li>Telefone: {candidato.telefone}</li>
                                <li>Celular: {candidato.celular}</li>
                                <li>Email: <a href={'mailto:'+candidato.email}>{candidato.email}</a></li>
                                <li>CPF: {candidato.cpf}</li>
                            </ul>
                        </div>
                        <div className="col-12 col-md-6">
                           <h4> Endereço:</h4>
                            <ul>
                                <li>Endereço: {candidato.endereco}</li>
                                <li>Numero: {candidato.numero}</li>
                                <li>CEP: {candidato.cep}</li>
                                <li>Bairro: {candidato.bairro}</li>
                            </ul>
                        </div>
                        <div className="col-12"><hr /></div>
                        <div className="col-12 col-md-6">
                           <a href={candidato.url_linkedin} target="_blank" className="btn btn-primary">  URL Linkedin</a>
                        </div>
                        <div className="col-12 col-md-6">
                           <a href={candidato.url_curriculo} target="_blank" className="btn btn-primary">  URL Currículo</a>
                        </div>
                        <div className="col-12"><hr /></div>
                        <div className="col-12">
                           <h4>Vaga Cadastrada: {candidato.Vaga}</h4>
                        </div>
                        <div className="col-12"><hr /></div>
                    </Fragment>
                        ))
                    }
                </div>
        );
    }
}
