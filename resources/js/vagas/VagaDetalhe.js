import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import IncludeVagas from "./IncludeVagas";

export default class VagaDetalhe extends Component {
	constructor(props)
	{
		super(props);
		this.state =
		{
			vaga: [],
			cargo: '',
			area:  '',
			local: '',
			sigla: '',
			tipo:  '',
			cargahorariade:  '',
		    cargahorariaate: '',
		    faixasalarial:   '',
		    expira: 		 '',
		    descricao:       '',
		    requisitos:      '',
		    responsavel:     '',
		    hotel: 		     '',
		    id: 			 '',
		};

		this.changeHandler = e => {
			this.setState({ [e.target.name]: e.target.value});
		}

		this.submitHandler = e =>{
			e.preventDefault();
			console.log(this.state);
		}

		this.getVagaDetalhe = this.getVagaDetalhe.bind(this);
	}

	// Get do Detalhe das Vagas
	getVagaDetalhe(idVaga) {
		let id = idVaga;
        axios.post('/vagas/getdetalhe/'+id)
        .then((response) =>
        {
        	let vaga = [];
            response.data.vaga.map((detalhe) =>
			vaga.push(detalhe));

            this.setState({
				id			    : vaga[0].id,
				cargo			: vaga[0].Cargo,
            	area   			: vaga[0].Area,
            	local			: vaga[0].Cidade,
            	sigla			: vaga[0].Sigla,
    			tipo			: vaga[0].tipo_contratacao,
    			cargahorariade  : vaga[0].carga_horaria_de,
    		    cargahorariaate : vaga[0].carga_horaria_ate,
    		    faixasalarial	: vaga[0].faixa_salarial,
    		    expira			: vaga[0].DtExpira,
    		    descricao		: vaga[0].descricao,
    		    requisitos		: vaga[0].requisitos,
    		    responsavel		: vaga[0].Responsavel,
    		    hotel			: vaga[0].Hotel,
			})
        })
        .catch(error => console.log("It was not possible to bring the data from the database."));
    }

	componentDidMount() {
		// Pega Id da Vaga de acordo com URL
        let url   = window.location.href;
        let myarr = url.split("/");
        let id = myarr[5];
        this.getVagaDetalhe(id);
    }

    render() {
    	const { vaga } = this.state;
    	return (
        		<div className="section-datalhes custom-headervagas">
        		<IncludeVagas />
        	    <div className="container">
        	        <div className="row">
        	            <div className="col-12 col-md-10">
        	                <a href="/vagas" className="link-back"><img src="/img/ico-seta-esq-preta.svg" alt="" /> Voltar / Vagas em aberto</a>
        	                <h2 className="titulo-vagas">{this.state.cargo}</h2>
        	                <h3 className="legenda-areainteresse">{this.state.area} | {this.state.hotel}</h3>
        	            </div>
        	            <div className="col-12 col-md-2">
        	                <a href={"/candidatos/cadidatar/"+this.state.id} className="btn btn-lg btn-primary botaocandidar hide-mobile">Candidatar-se</a>
        	            </div>
        	            <div className="col-12">
        	                <hr />
        	            </div>
        	        </div>
        	        <div className="row text-center conteudo-vaga content-vaga-mobile">
        	            <div className="col-6 col-md-3 bordar-direita borda-baixomobile destaquesvaga">
        	                <img src="/img/ico-local-vaga.svg" alt="Local" />
        	                <p className="detaque">Local</p>
        	                <p className="legenda">{this.state.local}, {this.state.sigla}</p>
        	            </div>
        	            <div className="col-6 col-md-3 bordar-direita borda-baixomobile removebddireita destaquesvaga">
        	                <img src="/img/ico-contrato.svg" alt="" />
        	                <p className="detaque">Tipo de Contratação</p>
        	                <p className="legenda">{this.state.tipo} </p>
        	            </div>
        	            <div className="col-6 col-md-3 bordar-direita destaquesvaga">
        	                <img src="/img/ico-carga-horaria.svg" alt="Carga Horária" />
        	                <p className="detaque">Carga Horária</p>
        	                <p className="legenda">{this.state.cargahorariade}  às  {this.state.cargahorariaate}</p>
        	            </div>
        	            <div className="col-6 col-md-3 destaquesvaga">
							<img src="/img/ico-data.svg" alt="Expiração de Vaga" />
							<p className="detaque">Expiração de Vaga</p>
							<p className="legenda">{this.state.expira}</p>
    	            	</div>
        	        </div>
					<div className="row hide-mobile">
					<div className="col-12">
        	                <hr />
        	            </div>
					</div>
        	        <div className="row conteudo-vaga conteudofinal-vaga ">
        	            <div className="col-12 descricao">
        	                <h2>Descrição da Vaga</h2>
							<div className="customdesc" dangerouslySetInnerHTML={{__html: this.state.descricao}} />
        	            </div>
        	            <div className="col-12">
        	                <hr />
        	            </div>
        	            <div className="col-12 col-md-8 descricao">
        	                <h2>Requisitos</h2>
							<div  className="customdesc" dangerouslySetInnerHTML={{__html: this.state.requisitos}} />
        	            </div>
        	            <div className="col-12 col-md-4 descricao">
        	            	<h2>Responsável pela vaga</h2>
							<p className="customdesc">{this.state.responsavel}</p>
    	                </div>
						<div className="col-12 text-center hide-desktop">
        	                <a href={"/candidatos/cadidatar/"+this.state.id} className="btn btn-lg btn-primary botaocandidar">Candidatar-se</a>
        	            </div>
        	        </div>
        	    </div>
        	</div>
        );
    }
}
