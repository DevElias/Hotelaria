import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import MenuCategorias from "./MenuCategorias";
import MenuCategoriasMobile from "./MenuCategoriasMobile";
import ItensProcedimentos from "./ItensProcedimentos";

export default class Index extends Component {
	constructor(props)
	{
		super(props);
		this.state =
		{
			categorias: [],
			procedimentos: [],
			filtro: '',
			ProcedimentosCompleted: [],
			filtrarProcedimento: [],
			currentPage: 1,
	        todosPerPage: 10
		};

		this.changeHandler = e => {
			this.setState({ [e.target.name]: e.target.value});
		}

		this.submitHandler = e =>{
			e.preventDefault();
			console.log(this.state);
		}

		this.filtro = this.filtro.bind(this);
		this.filtrarProcedimento  = this.filtrarProcedimento.bind(this);
		this.ordernarItens = this.ordernarItens.bind(this);
		this.handleClick = this.handleClick.bind(this);

	}

	handleClick(event) {
		console.log(event.target.id);
        this.setState({
          currentPage: Number(event.target.id)
        });
      }


	// Efetua o Filtro de acordo com o que foi digitado
	filtro() {
		let filtro = document.getElementById("filtro").value.toLowerCase();
		let results = this.state.ProcedimentosCompleted.filter(procedimento => 	 procedimento.titulo.toLowerCase().includes(filtro));

		// Muda o State dos ItensProcedimentos
		let procs = [];
		if(filtro != '')
    	{
			results.map((result) =>procs.push(result));
    	}
		else
		{
			this.state.ProcedimentosCompleted.map((result) =>procs.push(result));
		}

        this.setState({
			procedimentos: [...procs],
			currentPage:1
		});
	}

	filtrarProcedimento(idSubCat){
    	let id = idSubCat;
        let results = this.state.ProcedimentosCompleted.filter(procedimento => procedimento.subcategoria_id == id);

		// Muda o State dos ItensProcedimentos
		let subs = [];
		if(id != 'todos')
    	{
			results.map((result) =>subs.push(result));
			console.log('passei');
    	}
		else
		{
			this.state.ProcedimentosCompleted.map((result) =>subs.push(result));
			console.log('nao');
		}

        this.setState({
			procedimentos: [...subs],
			currentPage:1
		});
    }

	// Get de Categorias
	getCategorias() {
        axios.get('/categorias/lista')
            .then((response) =>
            {

				let categorias = [];
                response.data.categorias.map((categoria) =>
				categorias.push(categoria));

                this.setState({
                    categorias: [...categorias]
				})

            })
            .catch(error => console.log("It was not possible to bring the data from the database."));
    }

	// Get de Procedimentos
	getProcedimentos() {
        axios.get('/procedimentos/listagem')
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

	ordernarItens(ordem){
		if(ordem == 'asc'){
			const myData = [].concat(this.state.procedimentos)
			.sort((a, b) => a.titulo > b.titulo ? 1 : -1);
			this.setState({
				procedimentos         : [...myData],
			})
		}else {
			const myData = [].concat(this.state.procedimentos)
			.sort((a, b) => a.titulo < b.titulo ? 1 : -1);
			this.setState({
				procedimentos         : [...myData],
			})
		}

	}

	componentDidMount()
	{
        this.getCategorias();
        this.getProcedimentos();
    }
		render() {

			 	const { procedimentos, currentPage, todosPerPage } = this.state;

		        // Logic for displaying current todos
		        const indexOfLastTodo = currentPage * todosPerPage;
		        const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
		        const currentTodos = procedimentos.slice(indexOfFirstTodo, indexOfLastTodo);
		        const renderTodos = currentTodos.map((todo, index) => {
		            return <div key={todo.id} id={todo.id} className="col-12">
                    <div className="card">
                    <div className="card-content">
                        <p className="titulo-procedimento">{todo.titulo}</p>
                        <p className="cat">Categoria: <span>{todo.categoria} / {todo.subcategoria}</span></p>
                    </div>
                    <div className="card-viz card-home">
                        <a target="_blank" href={todo.url}>
                           <p className="text-center"> <img src="/img/ico-visualizar.svg" alt="Visualizar" />
						   </p>
						   Visualizar </a>
                    </div>
                    <div className="card-baixa card-home">
						<a href={todo.url} download>
						<p className="text-center"><img src="/img/ico-baixar.svg" alt="Visualizar" /></p>
						Baixar </a>
                    </div>
                </div>
            </div>
		          });

		     // Logic for displaying page numbers
		        const pageNumbers = [];
		        for (let i = 1; i <= Math.ceil(procedimentos.length / todosPerPage); i++) {
		          pageNumbers.push(i);
		        }

		        const renderPageNumbers = pageNumbers.map(number => {
		          return (
		            <li key={number} id={number} onClick={this.handleClick} className="page-item page-link">{number}</li>
		          );
		        });

			if(window.innerWidth <= 728){
				return(
					<Fragment>
					<div className="section-mobilehead">
						<div className="container">
							<div className="row buscar">
								<div className="col-12">
									<div className="form-group has-search">
										<button onClick={this.filtro} type="submit" className="btn-buscar"><img src="/img/ico-pesquisa.svg" className="btn-search" /></button>
										<input type="text" className="form-control" name="filtro" id="filtro" placeholder="Digite aqui o que você procura" onChange={this.changeHandler} />
									</div>
								</div>

								<div className="col-12">
									<div className="categorias-procedimentos">
										<div className="title">
										<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#accordion" aria-controls="accordion" aria-expanded="false" aria-label="Toggle navigation">
											<h3>
												<img src="/img/ico-categorias.svg" alt="" /> Categoria </h3>
										</button>

										</div>
										<div className="navbar-collapse collapse" id="accordion">
										<li data-toggle="collapse" data-target="#accordion"><a type="button" className="btn btn-default" aria-haspopup="true" aria-expanded="false" onClick={() => this.filtrarProcedimento('todos')}>
										Todos</a></li>
											<MenuCategoriasMobile categorias={this.state.categorias} handler={this.filtrarProcedimento}/>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="container">
						<div className="section-dashclient">
						<div className="container">
							<div className="row procedimentos">
								<div className="col-12">
									<a href="/dashboard-cliente" className="link-back"><img src="/img/ico-seta-esq-preta.svg" alt="" /> Voltar para Home </a>
								</div>
								<div className="col-12">
									<h2>Procedimentos</h2>
								</div>
							</div>
							<div className="row">
								<div className="col-12 col-md-9">
									<div className="row buscar">
										<div className="col-12 col-md-4 text-right">
											<div className="btn-group botaoordernarpor">
												<button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
													Ordenar por
												</button>
												<div className="dropdown-menu">
													<div className="dropdown-item" onClick={() => this.ordernarItens('asc')}>Alfabética [a-z]</div>
													<div className="dropdown-item" onClick={() => this.ordernarItens('desc')}>Alfabética [z-a]</div>
												</div>
											</div>
										</div>
										<div className="col-12">
											<hr />
										</div>
										<div className="col-12">
											<h3 className="titulo-categoria" id="titulo_categoria"><strong>Todos</strong></h3>
										</div>
										{renderTodos}
										<div className="col-12">
											<nav aria-label="Page navigation">
												<ul className="pagination justify-content-end">
													<li className="page-item">
													<a className="page-link" href="#" aria-label="Previous">
														<span aria-hidden="true">&laquo;</span>
														<span className="sr-only">Previous</span>
													</a>
													</li>
													{renderPageNumbers}
													<li className="page-item">
													<a className="page-link" href="#" aria-label="Next">
														<span aria-hidden="true">&raquo;</span>
														<span className="sr-only">Next</span>
													</a>
													</li>
												</ul>
											</nav>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				</Fragment>
				)
				} else {
					return (

						<div className="container">
							<div className="section-dashclient">
							<div className="container">
								<div className="row procedimentos">
									<div className="col-12">
										<a href="/dashboard-cliente" className="link-back"><img src="/img/ico-seta-esq-preta.svg" alt="" /> Voltar para Home</a>
									</div>
									<div className="col-12">
										<h2>Procedimentos</h2>
									</div>
								</div>
								<div className="row">
									<div className="col-12 col-md-3">
										<div className="categorias-procedimentos">
											<div className="title">
												<h3> <img src="/img/ico-categorias.svg" alt="" /> Categorias </h3>
											</div>
											<div className="content-btns dropright" id="listacategorias">
											<button type="button" className="btn btn-default" aria-haspopup="true" aria-expanded="false" onClick={() => this.filtrarProcedimento('todos')}>
											Todos</button>
												<MenuCategorias categorias={this.state.categorias} handler={this.filtrarProcedimento}/>
											</div>
										</div>
									</div>
									<div className="col-12 col-md-9">
										<div className="row buscar">
											<div className="col-12 col-md-8">
												<div className="form-group has-search">
												<button onClick={this.filtro} type="submit" className="btn-buscar"><img src="/img/ico-pesquisa.svg" className="btn-search" /></button>
													<input type="text" className="form-control" name="filtro" id="filtro" placeholder="Digite aqui o que você procura" onChange={this.changeHandler} />
												</div>
											</div>
											<div className="col-12 col-md-4 text-right">
												<div className="btn-group">
													<button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
														Ordenar por
													</button>
													<div className="dropdown-menu">
														<div className="dropdown-item" onClick={() => this.ordernarItens('asc')}>Alfabética [a-z]</div>
														<div className="dropdown-item" onClick={() => this.ordernarItens('desc')}>Alfabética [z-a]</div>
													</div>
												</div>
											</div>
											<div className="col-12">
												<hr />
											</div>
											<div className="col-12">
												<h3 className="titulo-categoria" id="titulo_categoria"><strong>Todos</strong></h3>
											</div>
											{renderTodos}
											<div className="col-12">
												<nav aria-label="Page navigation">
													<ul className="pagination justify-content-end">
														<li className="page-item">
														<a className="page-link" href="#" aria-label="Previous">
															<span aria-hidden="true">&laquo;</span>
															<span className="sr-only">Previous</span>
														</a>
														</li>
														{renderPageNumbers}
														<li className="page-item">
														<a className="page-link" href="#" aria-label="Next">
															<span aria-hidden="true">&raquo;</span>
															<span className="sr-only">Next</span>
														</a>
														</li>
													</ul>
												</nav>
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
}
