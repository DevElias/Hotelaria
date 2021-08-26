import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'


export default class AdminCategorias extends Component {
	constructor(props)
	{
		super(props);
		this.state =
		{
			categorias : [],
		};

		this.changeHandler = e => {
			this.setState({ [e.target.name]: e.target.value});
		}

		this.submitHandler = e =>{
			e.preventDefault();
        }
        this.excluirCategoria = this.excluirCategoria.bind(this);
    }
	// Exclusão da Categoria
	excluirCategoria(e){
        let id = e;
        axios
		.post('/categorias/destroy/'+id, this.state)
		.then(response =>
		{
			 if(response.data.code = '200')
			 {
				window.location.replace('/categorias/admin');
			 }
		})
		.catch(error =>
		{
			console.log(error);
		})
    }

    // Get Categorias
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
    componentDidMount() {
        this.getCategorias();
    }
    render() {
        const { categorias } = this.state;
        return (

            <div className="table-responsive-md">
                <div className="row">
                    <div className="col-12 text-right marginbtm-50">
                    <a href="/categorias/cadastro" className="btn btn-primary">Nova Categoria</a>
                    </div>
                </div>
                <table className="table">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Categoria</th>
                    <th scope="col">Opções</th>
                </tr>
                </thead>
                <tbody>
                {
        			categorias.map(categoria => (

                <tr key={categoria.id} id={categoria.id}>
                    <th scope="row">{categoria.id}</th>
                    <td>{categoria.categoria}</td>
                    <td><a href={'editar/'+categoria.id} className="btn btn-secondary btn-sm"><i className="far fa-edit"></i></a> <button onClick={() => this.excluirCategoria(categoria.id)} className="btn btn-danger btn-sm"><i className="far fa-trash-alt"></i></button></td>
                </tr>
                    ))
                }
                </tbody>
            </table>
          </div>
        );
    }
}
