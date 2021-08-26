import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Editor } from '@tinymce/tinymce-react';

export default class Perguntas extends Component {
	constructor(props)
	{
		super(props);
		this.state =
		{
			pergunta : '',
			resposta: '',
			file: '',
			url:'',
			palavras: '',
			destacado: '',
			id_categoria: '',
			login: '',
			categorias: [],
			id: '',
		};

		this.changeHandler = e => {
			this.setState({ [e.target.name]: e.target.value});

			// Upload Arquivo
			if(e.target.name == 'file')
			{
				let files = e.target.files;
				let reader= new FileReader();
				reader.readAsDataURL(files[0]);

				reader.onload=(e)=>{
					const formData = {files: e.target.result}
					axios
					.post('/perguntas/upload', formData)
					.then(response =>
					{
						document.getElementById('url').value = response.data.url;
						this.state.url = response.data.url;
						this.forceUpdate()
					})
					.catch(error =>
					{
						console.log(error);
					})
				}
			}

		}

		this.submitHandler = e =>{
			e.preventDefault();
			console.log(this.state);

			if(this.state.id == '')
			{
				axios
				.post('/perguntas/gravar', this.state)
				.then(response =>
				{
					window.location.replace('/perguntas/admin');
				})
				.catch(error =>
				{
					console.log(error);
				})
			}
			else
			{
				axios
				.post('/perguntas/atualiza/'+this.state.id, this.state)
				.then(response =>
				{
					window.location.replace('/perguntas/admin');
				})
				.catch(error =>
				{
					console.log(error);
				})
			}
		}

		this.getDestaque = this.getDestaque.bind(this);
		this.handleEditorChange = this.handleEditorChange.bind(this);
	}

	// Busca Perguntas de acordo com ID para Edicao
	getPergunta(idPergunta)
	{
		let id = idPergunta;

		axios
		.get('/perguntas/buscar/'+id)
		.then(response =>
		{
			console.log(response.data.pergunta[0]);
			 this.setState({
                 pergunta: response.data.pergunta[0].pergunta,
                 id: response.data.pergunta[0].id,
                 resposta: response.data.pergunta[0].resposta,
                 palavras: response.data.pergunta[0].palavras_chave,
                 destacado: response.data.pergunta[0].destacado,
                 login: response.data.pergunta[0].login,
                 id_categoria: response.data.pergunta[0].id_categoriaperguntas,
                 url: response.data.pergunta[0].documento
				})

				 this.getDestaque(response.data.pergunta[0].destacado);
			 	this.getLogin(response.data.pergunta[0].login);
		})
		.catch(error =>
		{
			console.log(error);
		})
	}

	// Get de Categorias para preenchcer o ComboBox
	getCategorias() {
		// Desabilita ComboBox ate que carregue os options
		document.getElementById("id_categoria").disabled = true;
        axios.get('/categoriasperguntas/lista')
            .then((response) =>
            {
            	const comboCategorias = document.getElementById("id_categoria");
            	let option = '';
            	let categorias = [];
                let categoriasCompleted = [];
                response.data.categorias.map((categoria) =>
                    (categoria.completed == 1) ? categoriasCompleted.push(categoria) : categorias.push(categorias));

                // Precisa adicionar o COmboBox ao State para manipular na edicao
                this.setState({
                	categorias: [...response.data.categorias]
				})

                response.data.categorias.forEach((cat) => {
                	  option = new Option(cat.categoria, cat.id);
                	  comboCategorias.options[comboCategorias.options.length] = option;
                	});

                const selectcategoria = this.state.id_categoria;
				this.state.categorias.forEach(function(item, index){
					if(item.id == selectcategoria)
					{
						comboCategorias.value = selectcategoria;
					}
				});
                // Libera o ComboBox
                document.getElementById("id_categoria").disabled = false;
            })
            .catch(error => console.log("It was not possible to bring the data from the database."));
    }

	// ComboBox de Destaque na Edicao
	getDestaque(idDestaque) {
		const selectdestaque = idDestaque;
		let aDestacados = [];
		aDestacados = ["0", "1"];
		const comboDestaques = document.getElementById("destacado");

		aDestacados.forEach(function(item, index){
			if(item == selectdestaque)
			{
				comboDestaques.value = selectdestaque;
			}
		});
	}
	
	// ComboBox de Login na Edicao
	getLogin(idLogin) {
		const selectlogin = idLogin;
		let aLogin = [];
		aLogin = ["0", "1"];
		const comboLogin = document.getElementById("login");

			aLogin.forEach(function(item, index){
			if(item == selectlogin)
			{
				comboLogin.value = selectlogin;
			}
		});
	}

	componentDidMount() {
		let url_atual   = window.location.href;
		let myarr       = url_atual.split("/");
		let idPergunta  = myarr[5];
        this.getPergunta(idPergunta);
        this.getCategorias();
	}


	handleEditorChange(content, editor) {
		this.setState({ resposta: content });
	}

    render() {
        return (
            <div className="container">
                <form onSubmit={this.submitHandler}>
	                <div className="form-group row">
			            <div className="col-12 col-md-12">
			                <label>Pergunta</label>
			                <input id="pergunta" type="text" className="form-control-rounded form-control" name="pergunta" value={this.state.pergunta} onChange={this.changeHandler} />
			            </div>
			        </div>
			        <div className="form-group row">
			            <div className="col-12 col-md-12">
			                <label>Resposta</label>
							<Editor
									value={this.state.resposta}
									apiKey="vyq2m5pzxfbjsabijzmnjbzqu7xs2uew7fghz6m1mtla0rog"
									id="resposta"
                                    init={{
                                        height: 300,
										menubar: false,
                                        plugins: [
                                            'advlist autolink lists link image charmap print preview anchor',
                                            'searchreplace visualblocks code fullscreen',
                                            'insertdatetime media table paste code help wordcount'
                                        ],
                                        toolbar:
                                            'bold italic | bullist numlist | removeformat | code'
                                    }}
                                    onEditorChange={this.handleEditorChange}
                                />
			            </div>
			        </div>
			        <div className="form-group row">
			            <div className="col-12 col-md-6">
			            	<label>Selecionar Arquivo</label>
			            	<input type="file" name="file" className="form-control-rounded form-control" accept="application/pdf,application/" onChange={this.changeHandler} />
			            </div>
		            </div>
			        <div className="form-group row">
			            <div className="col-12 col-md-6">
			                <label>Palavras Chave</label>
			                <input id="palavras" type="text" className="form-control-rounded form-control" name="palavras" value={this.state.palavras} onChange={this.changeHandler} />
			            </div>
		                <div className="col-12 col-md-6">
		                	<label>Destaque?</label>
			                <select id="destacado" name="destacado" className="form-control-rounded form-control" onChange={this.changeHandler} defaultValue={'DEFAULT'}>
				             	<option value="DEFAULT" disabled >-- SELECIONAR --</option>
				             	<option value="0">Não</option>
				             	<option value="1">Sim</option>
				            </select>
				        </div>
			        </div>
			        <div className="form-group row">
		                <div className="col-12 col-md-3">
				             <label>Categoria da Pergunta</label>
				             <select id="id_categoria" name="id_categoria"  className="form-control-rounded form-control" onChange={this.changeHandler} defaultValue={'DEFAULT'}>
				             	<option value="DEFAULT" disabled >-- SELECIONAR --</option>
				             </select>
			             </div>
			             <div className="col-12 col-md-3">
		                	<label>Login?</label>
			                <select id="login" name="login" className="form-control-rounded form-control" onChange={this.changeHandler} defaultValue={'DEFAULT'}>
				             	<option value="DEFAULT" disabled >-- SELECIONAR --</option>
				             	<option value="0">Não</option>
				             	<option value="1">Sim</option>
				            </select>
				        </div>
			        </div>
			        <div className="form-group row">
			            <div className="col-12 col-md-6">
			            <input id="url" type="hidden" className="form-control-rounded form-control" name="url" onChange={this.changeHandler} />
			        </div>
			         </div>
			        <button type="submit" id="gravar" className="btn btn-primary btn-block btn-rounded mt-3">Salvar</button>
                </form>
            </div>
        );
    }
}
