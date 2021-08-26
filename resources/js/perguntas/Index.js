import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import MenuCategorias from "./MenuCategorias";
import MenuCategoriasMobile from "./MenuCategoriasMobile";
import ItensPerguntas from "./ItensPerguntas";
import MenuPalavras from "./MenuPalavras";

export default class Index extends Component {
	constructor(props)
	{
		super(props);
		this.state =
		{
			categorias: [],
			perguntas: [],
			filtro: '',
			PerguntasCompleted: [],
			filtrarPerguntas: [],
			palavras: [],
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
		this.filtrarPergunta  = this.filtrarPergunta.bind(this);
		this.filtrarPalavra   = this.filtrarPalavra.bind(this);
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
		let results = this.state.PerguntasCompleted.filter(pergunta => 	 pergunta.pergunta.toLowerCase().includes(filtro));

		// Muda o State das Perguntas
		let procs = [];
		if(filtro != '')
    	{
			results.map((result) =>procs.push(result));
    	}
		else
		{
			this.state.PerguntasCompleted.map((result) =>procs.push(result));
		}

        this.setState({
            perguntas: [...procs],
            currentPage:1
		});
	}

	filtrarPergunta(idCategoria){
    	let id = idCategoria;
        let results = this.state.PerguntasCompleted.filter(pergunta => pergunta.id_categoriaperguntas == id);

		// Muda o State dos ItensPerguntas
		let subs = [];
		if(id != 'todos')
    	{
			results.map((result) =>subs.push(result));
    	}
		else
		{
			this.state.PerguntasCompleted.map((result) =>subs.push(result));
		}

        this.setState({
            perguntas: [...subs],
            currentPage:1
		});
    }

	filtrarPalavra(palavra){
    	console.log(palavra);
		let id = palavra;
    	let results = this.state.PerguntasCompleted.filter(perguntas => 	 perguntas.palavras_chave.toLowerCase().includes(id));
		// Muda o State das Perguntas
		let procs = [];
		results.map((result) =>procs.push(result));

        this.setState({
            perguntas: [...procs],
            currentPage:1
		});
    }

	// Get de Categorias
	getCategorias() {
        axios.get('/categoriasperguntas/lista')
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

	// Get de Perguntas
	getPerguntas() {
        axios.get('/perguntas/listagem')
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

	// Get de Palavras Chave
	getPalavras() {
        axios.get('/perguntas/palavras')
            .then((response) =>
            {
				let palavras = [];
                response.data.palavras.map((palavra) =>
                palavras.push(palavra));

                this.setState({
                	palavras         : [...palavras],
				})
            })
            .catch(error => console.log("It was not possible to bring the data from the database."));
	}

	componentDidMount()
	{
        this.getCategorias();
        this.getPerguntas();
        this.getPalavras();
    }
    render() {
    	const { perguntas, currentPage, todosPerPage } = this.state;
        const indexOfLastTodo = currentPage * todosPerPage;
        const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
        const currentTodos = perguntas.slice(indexOfFirstTodo, indexOfLastTodo);
        const renderTodos = currentTodos.map((todo, index) => {
			if(window.innerWidth <= 728){
				return(
					<div className="col-12" key={todo.id} id={todo.id}>
						<div className="card">
							<div className="card-content">
								<p className="titulo-procedimento">{todo.pergunta}</p>
								<p className="cat">Categoria: <span>{todo.Categoria}</span></p>
							</div>
							<div className="card-pergundas-visualizar">
								<a  className="text-center" target="_blank" href={"collapse"+todo.id}  data-toggle="modal" data-target={"#exampleModal"+todo.id}>
									<p className="text-center"><img src="/img/ico-visualizar.svg" alt="Visualizar" /></p>Visualizar
								</a>
							</div>
						</div>
						<div className="modal fade" id={"exampleModal"+todo.id}  aria-labelledby={"exampleModalLabel"+todo.id} aria-hidden="true">
							<div className="modal-dialog">
								<div className="modal-content">
								<div className="modal-header">
									<h5 className="modal-title" id="exampleModalLabel">{todo.pergunta}</h5>
									<button type="button" className="close" data-dismiss="modal" aria-label="Close">
										<span aria-hidden="true">&times;</span>
									</button>
								</div>
								<div className="modal-body">
									<div dangerouslySetInnerHTML={{__html: todo.resposta}} />
										<p><a href={todo.documento} target="_blank"><img src="/img/ico-documentos.svg" alt="Documentos"/> Documento relacionado</a></p>
									</div>
								</div>
							</div>
						</div>
					</div>
				)
			} else {
				return(
					<div  key={todo.id} id={todo.id}  className="card-question colapse-perguntas">
						<div className="col-12">
							<div className="card-header-question" id={'pergunta'+todo.id}>
								<div className="mb-0">
									<button className="btn btn-pergunta" data-toggle="collapse" data-target={"#collapse"+todo.id} aria-expanded="false" aria-controls="collapse">
										<h5>{todo.pergunta}</h5>
										<p>Categoria: <span>{todo.Categoria}</span> <a href={todo.documento} target="_blank"><img src="/img/ico-documentos.svg" alt="Documentos"/> Documento relacionado</a> </p>
									</button>
								</div>
							</div>
							<div id={"collapse"+todo.id} className="collapse" aria-labelledby={'pergunta'+todo.id} data-parent="#accordion">
								<div className="card-body-question">
									<div dangerouslySetInnerHTML={{__html: todo.resposta}} />
								</div>
							</div>
						</div>
					</div>
				);
			}
		}
	);

     // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(perguntas.length / todosPerPage); i++) {
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
	        	                            <button type="submit" onClick={this.filtro} className="btn-buscar"><img src="/img/ico-pesquisa.svg" className="btn-search"/></button>
	        	                            <input type="text" id="filtro" name="filtro" className="form-control" placeholder="Digite aqui o que você procura" onChange={this.changeHandler} />
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
												<li>
												<a className="btn btn-default" data-target="#accordion" data-toggle="collapse" href="#"  onClick={() => this.filtrarPergunta('todos')}>
												Todos</a>
												</li>
												<MenuCategoriasMobile categorias={this.state.categorias} handler={this.filtrarPergunta}/>
											</div>
										</div>
									</div>
									<div className="col-12 palavras-chavemobile">
										<div className="categorias-procedimentos ">
											<div className="title">
											<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#palavraschave" aria-controls="palavraschave" aria-expanded="false" aria-label="Toggle navigation">
												<h3>
													<img src="/img/ico-categorias.svg" alt="" /> Palavras-chave </h3>
											</button>

											</div>
											<div className="navbar-collapse collapse" id="palavraschave">
												<MenuPalavras palavras={this.state.palavras} handler={this.filtrarPalavra}/>
											</div>
										</div>
									</div>
	        	                </div>
						</div>
					</div>
        		<div className="container">
	                <div className="section-dashclient">
	        		 <div className="container">
	        	        <div className="row perguntas-dash">
	        	            <div className="col-12 hide-mobile">
	        	                <a href="/dashboard-cliente" className="link-back"><img src="/img/ico-seta-esq-preta.svg"/> Voltar para Home</a>
	        	            </div>
	        	            <div className="col-12">
	        	                <h2>Perguntas frequentes</h2>
	        	            </div>
	        	        </div>
	        	        <div className="row">
	        	            <div className="col-12 col-md-7 offset-md-1">
	        	                <div className="row perguntas-dash">
	        	                    <div className="col-12">
	        	                        <h3 className="titulo-categoria customtitle-regular"><strong>Categoria</strong> / Todos </h3>
	        	                    </div>

	        	                    <div className="col-12">
	        	                        <div className="customperguntas">
	        	                        {renderTodos}
	        	                        </div>
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
	     </div>
		 </Fragment>
				)
				} else {



					return(
						<div className="container">
							<div className="section-dashclient">
							 <div className="container">
								<div className="row perguntas-dash">
									<div className="col-12">
										<a href="/dashboard-cliente" className="link-back"><img src="/img/ico-seta-esq-preta.svg"/> Voltar para Home</a>
									</div>
									<div className="col-12">
										<h2>Perguntas frequentes</h2>
									</div>
								</div>
								<div className="row">
									<div className="col-12 col-md-4">
										<div className="row buscar">
												<div className="col-12">
													<div className="form-group has-search">
													<button type="submit" onClick={this.filtro} className="btn-buscar"><img src="/img/ico-pesquisa.svg" className="btn-search"/></button>
													<input type="text" id="filtro" name="filtro" className="form-control" placeholder="Digite aqui o que você procura" onChange={this.changeHandler} />
												</div>
											</div>
										</div>
										<div className="row cat-perguntas">
											<div className="col-12">
												<h3><img src="/img/ico-categorias.svg"/> Categorias</h3>
											</div>
											<div className="col-12">
												<a href="#" onClick={() => this.filtrarPergunta('todos')}>Todos</a>
												<MenuCategorias categorias={this.state.categorias} handler={this.filtrarPergunta}/>
											</div>
											<div className="col-12">
												<h3><img src="/img/ico-categorias.svg"/> Palavras-chave</h3>
											</div>
											<div className="col-12 link-border">
											<MenuPalavras palavras={this.state.palavras} handler={this.filtrarPalavra}/>
											</div>
										</div>
									</div>
									<div className="col-12 col-md-7 offset-md-1">
										<div className="row">
											<div className="col-12">
												<h3 className="titulo-categoria customtitle-regular"><strong>Categoria</strong> / Todos </h3>
											</div>

											<div className="col-12">
												<div id="accordion">
												{renderTodos}
												</div>
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
				 </div>
						);




				}
    }
}
