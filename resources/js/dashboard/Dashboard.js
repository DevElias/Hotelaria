import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import ItensProcedimentos from "./ItensProcedimentos";
import ItensPerguntas from "./ItensPerguntas";
import ItensVagas from "./ItensVagas";

export default class Dashboard extends Component {
	constructor(props)
	{
		super(props);
		this.state =
		{
			procedimentos : [],
			ProcedimentosCompleted: [],
			vagas: [],
			VagasCompleted: [],
			perguntas: [],
			PerguntasCompleted: [],
		};

		this.changeHandler = e => {
			this.setState({ [e.target.name]: e.target.value});
		}

		this.submitHandler = e =>{
			e.preventDefault();
			console.log(this.state);
		}
	}

	// Get de Procedimentos
	getProcedimentos() {
        axios.get('/procedimentos/destaques')
            .then((response) =>
            {
				let procedimentos = [];
                response.data.procedimentos.map((procedimento) =>
				procedimentos.push(procedimento));

                this.setState({
                	procedimentos         : [...procedimentos],
                	ProcedimentosCompleted: [...procedimentos],
				})
            })
            .catch(error => console.log("It was not possible to bring the data from the database."));
	}

	// Get de Perguntas
	getPerguntas() {
        axios.get('/perguntas/destaques')
            .then((response) =>
            {
				let perguntas = [];
                response.data.perguntas.map((pergunta) =>
				perguntas.push(pergunta));

                this.setState({
                	perguntas         : [...perguntas],
                	PerguntasCompleted: [...perguntas],
				})
            })
            .catch(error => console.log("It was not possible to bring the data from the database."));
	}

	getVagas() {
        axios.get(`/vagas/destaques/`)
            .then((response) =>
            {
            	let vagas = [];
                response.data.vagas.map((vaga) =>
				vagas.push(vaga));

                this.setState({
                    vagas: [...vagas],
                    VagasCompleted: [...vagas]
				})
            })
            .catch(error => console.log("It was not possible to bring the data from the database."));
    }

	componentDidMount()
	{
        this.getProcedimentos();
        this.getPerguntas();
        this.getVagas();
    }

    render() {
        return (
            <div className="container">
            <div className="section-dashclient">
            <div className="container">
                <div className="row">
                <div className="col-12 col-md-6">
                        <div className="row procedimentos">
                            <div className="col-12">
                                <h2>Procedimentos</h2>
                            </div>
                            <ItensProcedimentos procedimentos={this.state.procedimentos}/>
                            <div className="col-12 text-right">
                                <a href="/procedimentos/lista" className="vertodas">Ver todas <img src="/img/ico-seta-dir-preta.svg" alt=""/> </a>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="row perguntas-dash">
                            <div className="col-12">
                                <h2>Perguntas frequentes</h2>
                            </div>
                            <div className="customperguntas">
                            	<ItensPerguntas perguntas={this.state.perguntas}/>
                            </div>
                            	<div className="col-12 text-right">
                                	<a href="/perguntas/lista"  className="vertodas">Ver todas <img src="/img/ico-seta-dir-preta.svg" alt=""/> </a>
                                </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                        <div className="col-12 col-lg-6">
                            <div className="row vagas">
                                <div className="col-12">
                                    <h2>Vagas</h2>
                                </div>
                                <ItensVagas vagas={this.state.vagas}/>
                                <div className="col-12 text-right">
                                    <a href="/vagas"  className="vertodas">Ver todas <img src="/img/ico-seta-dir-preta.svg" alt=""/> </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-lg-6">
                            <div className="row outros">
                                <div className="col-12">
                                    <h2>Outros</h2>
                                </div>
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-content">
                                            <p className="titleoutros">Lorem ipsum dolor sit amet, consectetur </p>
                                            <p className="cat"><span>Desbravador /Administrativo Financeiro</span></p>
                                        </div>
                                        <div className="card-saiba">
                                            <a href="#">
                                                Saiba mais <img src="/img/ico-seta-dir-marrom.png" alt=""/>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-content">
                                            <p className="titleoutros">Lorem ipsum dolor sit amet, consectetur </p>
                                            <p className="cat"><span>Desbravador /Administrativo Financeiro</span></p>
                                        </div>
                                        <div className="card-saiba">
                                            <a href="#">
                                                Saiba mais <img src="/img/ico-seta-dir-marrom.png" alt=""/>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-content">
                                            <p className="titleoutros">Lorem ipsum dolor sit amet, consectetur </p>
                                            <p className="cat"><span>Desbravador /Administrativo Financeiro</span></p>
                                        </div>
                                        <div className="card-saiba">
                                            <a href="#">
                                                Saiba mais <img src="/img/ico-seta-dir-marrom.png" alt=""/>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>

        </div>
            </div>
        );
    }
}
