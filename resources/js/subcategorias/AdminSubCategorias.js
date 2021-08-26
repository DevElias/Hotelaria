import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'


export default class AdminubCategorias extends Component {
	constructor(props)
	{
		super(props);
		this.state =
		{
			subcategorias : [],
		};

		this.changeHandler = e => {
			this.setState({ [e.target.name]: e.target.value});
		}

		this.submitHandler = e =>{
			e.preventDefault();
        }
        this.excluirSubCategoria = this.excluirSubCategoria.bind(this);
    }
	// Exclusão da SubCategoria
	excluirSubCategoria(e){
        let id = e;
        axios
		.post('/subcategorias/destroy/'+id, this.state)
		.then(response =>
		{
			 if(response.data.code = '200')
			 {
				window.location.replace('/subcategorias/admin');
			 }
		})
		.catch(error =>
		{
			console.log(error);
		})
    }

    // Get SubCategorias
	getSubCategorias() {
        axios.get('/subcategorias/listagem')
            .then((response) =>
            {
                let subcategorias = [];
                response.data.subcategorias.map((subcategoria) =>
                subcategorias.push(subcategoria));

                this.setState({
                	subcategorias: [...subcategorias]
				})
            })
            .catch(error => console.log("It was not possible to bring the data from the database."));
    }
    componentDidMount() {
        this.getSubCategorias();
    }
    render() {
        const { subcategorias } = this.state;
        return (

            <div className="table-responsive-md">
                <div className="row">
                    <div className="col-12 text-right marginbtm-50">
                    <a href="/subcategorias/cadastro" className="btn btn-primary">Nova SubCategoria</a>
                    </div>
                </div>
                <table className="table">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">SubCategoria</th>
                    <th scope="col">Categoria</th>
                    <th scope="col">Opções</th>
                </tr>
                </thead>
                <tbody>
                {
        			subcategorias.map(subcategoria => (

                <tr key={subcategoria.id} id={subcategoria.id}>
                    <th scope="row">{subcategoria.id}</th>
                    <td>{subcategoria.subcategoria}</td>
                    <td>{subcategoria.Categoria}</td>
                    <td><a href={'editar/'+subcategoria.id} className="btn btn-secondary btn-sm"><i className="far fa-edit"></i></a> <button onClick={() => this.excluirSubCategoria(subcategoria.id)} className="btn btn-danger btn-sm"><i className="far fa-trash-alt"></i></button></td>
                </tr>
                    ))
                }
                </tbody>
            </table>
          </div>
        );
    }
}
