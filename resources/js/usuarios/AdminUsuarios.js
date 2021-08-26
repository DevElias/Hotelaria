import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import { CSVLink, CSVDownload } from "react-csv";


export default class AdminUsuarios extends Component {
	constructor(props)
	{
		super(props);
		this.state =
		{
			usuarios : [],
		};

		this.changeHandler = e => {
			this.setState({ [e.target.name]: e.target.value});
		}

		this.submitHandler = e =>{
			e.preventDefault();
        }
        this.excluirUsuario = this.excluirUsuario.bind(this);
    }
    excluirUsuario(e){
    	let id = e;
        axios
		.post('/usuarios/destroy/'+id, this.state)
		.then(response =>
		{
			 if(response.data.code = '200')
			 {
				window.location.replace('/usuarios/admin');
			 }
		})
		.catch(error =>
		{
			console.log(error);
		})
    }
    // Get Perfil
	getUsuarios() {
        axios.get('/usuarios/lista')
            .then((response) =>
            {
                let usuarios = [];
                response.data.usuarios.map((usuario) =>
				usuarios.push(usuario));

                this.setState({
                	usuarios: [...usuarios]
				})
            })
            .catch(error => console.log("It was not possible to bring the data from the database."));
    }
    componentDidMount() {
        this.getUsuarios();
    }
    render() {
        const { usuarios } = this.state;
        return (

            <div className="table-responsive-md">
                <div className="row">
                    <div className="col12 col-md-10 marginbtm-50">
	                    	<CSVLink data={this.state.usuarios} separator={";"} className="btn btn-outline-info">Download Excel</CSVLink>
	                    </div>
                    <div className="col-12 col-md-2 text-right marginbtm-50">
                    <a href="/usuarios/cadastro" className="btn btn-primary">Novo Usuário</a>
                    </div>
                </div>
                <table className="table">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nome</th>
                    <th scope="col">Email</th>
                    <th scope="col">CPF</th>
					<th scope="col">Telefone</th>
                    <th scope="col">Tipo de Usuário</th>
                    <th scope="col">Tipo de Administrador</th>
                    <th scope="col">Opções</th>
                </tr>
                </thead>
                <tbody>
                {
        			usuarios.map(usuario => (

                <tr key={usuario.id} id={usuario.id}>
                    <th scope="row">{usuario.id}</th>
                    <td>{usuario.nome}</td>
                    <td>{usuario.email}</td>
                    <td>{usuario.cpf}</td>
                    <td>{usuario.telefone}</td>
                    <td>{usuario.Tipo_Usuario}</td>
                    <td>{usuario.Tipo_Admin}</td>
                    <td><a href={'editar/'+usuario.id} className="btn btn-secondary btn-sm"><i className="far fa-edit"></i></a> <button onClick={() => this.excluirUsuario(usuario.id)} className="btn btn-danger btn-sm"><i className="far fa-trash-alt"></i></button></td>
                </tr>
                    ))
                }
                </tbody>
            </table>
          </div>
        );
    }
}
