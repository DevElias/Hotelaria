import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import MenuAreas from "./MenuAreas";
import MenuEstados from "./MenuEstados";
import IncludeVagas from "./IncludeVagas";
import ItensVagas from "./ItensVagas";
import MenuFiltros from "./MenuFiltros";

export default class Index extends Component {
	constructor(props)
	{
		super(props);
		this.state =
		{
			areas: [],
			estados: [],
			vagas: [],
			VagasCompleted: [],
			filtro: '',
			aFiltroArea: [],
			aFiltroEstado: [],
			currentPage: 1,
			MenuFiltro: [],
	        todosPerPage: 9
		};

		this.changeHandler = e => {
			this.setState({ [e.target.name]: e.target.value});
		}

		this.submitHandler = e =>{
			e.preventDefault();
			console.log(this.state);
		}

		this.filtro 		= this.filtro.bind(this);
		this.FiltrarAreas   = this.FiltrarAreas.bind(this);
		this.FiltroVagas    = this.FiltroVagas.bind(this);
		this.FiltrarEstados = this.FiltrarEstados.bind(this);
		this.FiltroEstados  = this.FiltroEstados.bind(this);
		this.ordernarItens  = this.ordernarItens.bind(this);
		this.handleClick    = this.handleClick.bind(this);
		this.ExibeFiltro    = this.ExibeFiltro.bind(this);
		this.RemoveFiltro   = this.RemoveFiltro.bind(this);
	}

	handleClick(event) {
		console.log(event.target.id);
        this.setState({
          currentPage: Number(event.target.id)
        });
      }

	getVagas() {
        axios.get(`/vagas/lista/`)
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

	// Efetua o Filtro de acordo com o que foi digitado
	filtro() {
		let filtro = document.getElementById("filtro").value.toLowerCase();
		let results = this.state.VagasCompleted.filter(vaga => vaga.Cargo.toLowerCase().includes(filtro));

		// Muda o State dos ItensVagas
		let procs = [];
		if(filtro != '')
    	{
			results.map((result) =>procs.push(result));
    	}
		else
		{
			this.state.VagasCompleted.map((result) =>procs.push(result));
		}

        this.setState({
            vagas: [...procs],
            currentPage:1
		});
	}

	// Filtragem por CheckBox de Areas
	FiltrarAreas(idArea)
	{
		let chk = document.getElementById("checkboxArea"+idArea);
		let check = true;

		// Se checked adiciona no State
		if (chk.checked == true)
		{
			this.setState({
	            aFiltroArea: [... this.state.aFiltroArea, idArea]
	        })

	        this.ExibeFiltro(idArea, 'Area', 'S');
		}
		else
		{
			var elem = document.getElementById('Area'+idArea);
		    elem.parentNode.removeChild(elem);

			check = false;
		    this.setState({
				aFiltroArea: this.state.aFiltroArea.filter(
				function(areas){
		        return areas !== idArea
				})
			});
		}
		this.FiltroVagas(check);
	}

	FiltroVagas(check=true)
	{
		setTimeout(() => {

		let TodasVagas = this.state.VagasCompleted;
		let filtros    = this.state.aFiltroArea;
		let estados    = this.state.aFiltroEstado;
		let subs = [];

		if(filtros.length > 0)
		{
			this.state.aFiltroArea.map(function(item, i)
			{

				let results = TodasVagas.filter(vaga => vaga.id_area == item);

				results.map((result) =>subs.push(result));

				//console.log(results);
			 })
		}
		else
		{
			TodasVagas.map((result) =>subs.push(result));
		}

        this.setState({
        	vagas: [...subs],
        	currentPage:1
		});

        if(estados.length > 0)
        {
        	this.FiltroEstados();
        }

		}, 100);
	}

	// Filtragem por CheckBox de Estados
	FiltrarEstados(idEstado)
	{
		let chk = document.getElementById("checkboxEstado"+idEstado);
		let check = true;

		// Se checked adiciona no State
		if (chk.checked == true)
		{
			this.setState({
	            aFiltroEstado: [... this.state.aFiltroEstado, idEstado]
	        })

	        this.ExibeFiltro(idEstado, 'Estado', 'S');
		}
		else
		{
			var elem = document.getElementById('Estado'+idEstado);
		    elem.parentNode.removeChild(elem);

			check = false;
		    this.setState({
		    	aFiltroEstado: this.state.aFiltroEstado.filter(
				function(estados)
				{
					return estados !== idEstado
				})
			});
		}
		this.FiltroEstados(check);
	}

	FiltroEstados(check=true)
	{
		setTimeout(() => {
		let TodosEstados = [];
		let filtros      = this.state.aFiltroEstado;
		let areas        = this.state.aFiltroArea;
		let subs = [];

		// Caso selecione um estado que zere o state do vagas e o usuario marque um estado que tem vagas, nesse caso preencho novamente o states antes de varer os estados
		if(check == true)
		{
			if(areas .length > 0)
			{
				let TodasVagas = this.state.VagasCompleted;
				let filtros    = this.state.aFiltroArea;
				let estados    = this.state.aFiltroEstado;
				let subs = [];

				if(filtros.length > 0)
				{
					this.state.aFiltroArea.map(function(item, i)
					{

						let results = TodasVagas.filter(vaga => vaga.id_area == item);

						results.map((result) =>subs.push(result));

						//console.log(results);
					 })
				}
				else
				{
					TodasVagas.map((result) =>subs.push(result));
				}

		        this.setState({
		        	vagas: [...subs],
		        	currentPage:1
				});
			}
		}

		// Se Existe Areas Selecionadas e foid esmarcado algum estado
		if(this.state.aFiltroArea.length > 0 && check == false && filtros.length == 0)
		{
			this.FiltroVagas();
		}

		// Se Existe algum estado selecionado
		if(filtros.length > 0)
		{
			TodosEstados = this.state.vagas;

			this.state.aFiltroEstado.map(function(item, i)
			{

				let results = TodosEstados.filter(vaga => vaga.id_estado == item);

				results.map((result) =>subs.push(result));
			 })
		}
		else
		{
			TodosEstados = this.state.VagasCompleted;
			TodosEstados.map((result) =>subs.push(result));
		}

        this.setState({
        	vagas: [...subs],
        	currentPage:1
		});



		}, 100);
	}

	ordernarItens(ordem){
		if(ordem == 'asc'){
			const myData = [].concat(this.state.vagas)
			.sort((a, b) => a.Cargo > b.Cargo ? 1 : -1);
			this.setState({
				vagas : [...myData],
			})
		}else {
			const myData = [].concat(this.state.vagas)
			.sort((a, b) => a.Cargo < b.Cargo ? 1 : -1);
			this.setState({
				vagas : [...myData],
			})
		}

	}

	// Mostra Filtro na Tela
	ExibeFiltro(idFiltro, ntipo, nchk)
	{
		let id   = idFiltro;
		let tipo = ntipo;
		let chk  = nchk;

		if(chk == 'S')
		{
			if(tipo == 'Area')
			{
				// Get Nome da Area
				 axios.get('/areas/buscar/'+id)
		            .then((response) =>
		            {
		            	console.log(response.data);
		            	 this.setState({
		                     MenuFiltro: [... this.state.MenuFiltro, response.data.area[0]]
		 				})
		            })
		            .catch(error => console.log("It was not possible to bring the data from the database."));
			}
			else
			{
				// Get Nome do Estado
				axios.get('/estados/buscar/'+id)
	            .then((response) =>
	            {
	            	console.log(response.data);
	            	this.setState({
	                     MenuFiltro: [... this.state.MenuFiltro, response.data.estados[0]]
	 				})
	            })
	            .catch(error => console.log("It was not possible to bring the data from the database."));
			}
		}
		else
		{
			if(tipo == 'Area')
			{
				document.getElementById("checkboxArea"+idFiltro).checked = false;
				this.FiltrarAreas(idFiltro);
			}
			else
			{
				document.getElementById("checkboxEstado"+idFiltro).checked = false;
				this.FiltrarEstados(idFiltro);
			}
		}
	}

	// Mostra Filtro na Tela
	RemoveFiltro(idFiltro, ntipo)
	{
		if(ntipo == 'Area')
		{
			this.ExibeFiltro(idFiltro, 'Area', 'N');
			var elem = document.getElementById(ntipo+idFiltro);
		    elem.parentNode.removeChild(elem);
		}
		else
		{
			this.ExibeFiltro(idFiltro, 'Estado', 'N');
			var elem = document.getElementById(ntipo+idFiltro);
		    elem.parentNode.removeChild(elem);
		}
	}

	componentDidMount()
	{
		this.getVagas();
    }


    render() {
    	const { vagas, currentPage, todosPerPage } = this.state;
    	 // Logic for displaying current todos
        const indexOfLastTodo = currentPage * todosPerPage;
        const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
        const currentTodos = vagas.slice(indexOfFirstTodo, indexOfLastTodo);
        const renderTodos = currentTodos.map((todo, index) => {
            return <div key={todo.id} id={todo.id} className="col-12 col-md-4">
            <div className="card">
			<div className="card-contentvagas">
				<h3>{todo.Cargo}</h3>
				<p className="legenda">{todo.Area} </p>
				<p> <a href={'/vagas/detalhes/'+todo.id} className="f-medium"> Mais informações <img src="/img/ico-seta-dir-preta.svg" alt="info" /></a></p>
				<hr />
				<p  className="estadolist"><img src="/img/ico-localizacao.svg" alt="Local" /> {todo.Cidade}, {todo.Sigla}</p>
				<p  className="expiraem"><img src="/img/ico-data.svg" className="imgdatapq" alt="Expira" /> Expira em: {todo.DtExpira}</p>
			</div>
			<div className="card-visualizar">
				<a href={'/vagas/detalhes/'+todo.id} className="btncard-visualizar">
					Candidatar-se
				</a>
			</div>
		</div>
    </div>
          });

        // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(vagas.length / todosPerPage); i++) {
          pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {
          return (
            <li key={number} id={number} onClick={this.handleClick} className="page-item page-link">{number}</li>
          );
        });

    	return (
		    	<div className="section-dashclient custom-headervagas">
		    		<IncludeVagas  menuexcluir="" menuvagas="active" menuincluir="" />
		            <div className="container">
						<div className="row buscar">
							<div className="col-12 col-md-8 hide-desktop">
								<div className="form-group has-search busca-preto">
									<button onClick={this.filtro} type="submit" className="btn-buscar"><img src="/img/ico-pesquisa.svg" className="btn-search" /></button>
									<input type="text" className="form-control" name="filtro" id="filtro" placeholder="Digite aqui o que você procura" onChange={this.changeHandler} onKeyDown={this.filtro} />
								</div>
							</div>
						</div>
		                <div className="row vagas hide-mobile">
		                    <div className="col-12">
		                        <h2>Vagas em aberto</h2>
		                    </div>
		                </div>
		                <div className="row">
		                    <div className="col-12 col-md-3">
		                        <div className="filtrar-vagas">
		                            <div className="title">
		                                <h3> <img src="/img/ico-categorias.svg" alt="" /> Filtrar </h3>
		                            </div>
		                            <div id="accordion">
			                            <div className="itens-filtro">
				        	                <div className="filtro-titulo" id="headingOne">
				        		                <h5 className="mb-0">
				        		                    <button className="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
				        		                        Área de Interesse
				        		                    </button>
				        		                </h5>
				        	                </div>

				        	                <div id="collapseOne" className="collapse" aria-labelledby="headingOne" data-parent="#accordion">
				        	                    <div className="card-body">
				        	                    	<MenuAreas areas={this.state.areas} handler={this.FiltrarAreas}/>
				        	                    </div>
				        	                </div>
				        	            </div>
		                                <div className="itens-filtro">
		                                    <div className="filtro-titulo" id="headdois">
		                                    <h5 className="mb-0">
		                                        <button className="btn btn-link" data-toggle="collapse" data-target="#collapseDois" aria-expanded="false" aria-controls="collapseDois">
		                                            Estado
		                                        </button>
		                                    </h5>
		                                    </div>

		                                    <div id="collapseDois" className="collapse" aria-labelledby="headdois" data-parent="#accordion">
		                                        <div className="card-body">
		                                        	<MenuEstados areas={this.state.estados} handler={this.FiltrarEstados}/>
		                                        </div>
		                                    </div>
		                                </div>
		                            </div>

		                        </div>
		                    </div>
		                    <div className="col-12 col-md-9">
		                        <div className="row buscar">
		                            <div className="col-12 col-md-8 hide-mobile">
		                                <div className="form-group has-search">
		                                   <button onClick={this.filtro} type="submit" className="btn-buscar"><img src="/img/ico-pesquisa.svg" className="btn-search" /></button>
		                                    <input type="text" className="form-control" name="filtro" id="filtro" placeholder="Digite aqui o que você procura" onChange={this.changeHandler} onKeyDown={this.filtro} />
		                                </div>
		                            </div>

									<div className="vagas hide-desktop titlevagasmobile col-12">
											<h2>Vagas em aberto</h2>
									</div>
		                            <div className="col-12 col-md-4 text-right">
		                                <div className="btn-group botaoordernarpor">
		                                    <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
		                                        Ordernar por
		                                    </button>
		                                    <div className="dropdown-menu">
		                                        <div className="dropdown-item" onClick={() => this.ordernarItens('asc')}>Crescente</div>
		                                        <div className="dropdown-item" onClick={() => this.ordernarItens('desc')}>Decrescente</div>
		                                    </div>
		                                </div>
		                            </div>
		                            <div className="col-12 hide-mobile">
		                                <hr />
		                            </div>
		                            <div className="col-12 palavra-selecionadas">
		                            <MenuFiltros filtros={this.state.MenuFiltro} handler={this.RemoveFiltro}/>
		                            </div>
		                            <div className="vagas customvagas row editarmobile">
		                            {renderTodos}
		                            </div>
		                            <div className="col-12">
		                                <nav aria-label="Page navigation">
		                                    <ul className="pagination justify-content-end">
		                                       {renderPageNumbers}
		                                    </ul>
		                                </nav>
		                            </div>
		                         </div>
		                    </div>
		                </div>
		            </div>
		        </div>
        );
    }
}
