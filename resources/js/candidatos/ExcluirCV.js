import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import IncludeVagas from "../vagas/IncludeVagas";
import InputMask from 'react-input-mask';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class AdminVagas extends Component {
	constructor(props)
	{
		super(props);
		this.state =
		{
			cpf  : '',
			email: '',
		};

		this.changeHandler = e => {
			this.setState({ [e.target.name]: e.target.value});
		}

		this.submitHandler = e =>{
			e.preventDefault();
			axios
			.post('/candidatos/apagarcv', this.state)
			.then(response =>
			{
				document.getElementById("formularioCV").reset()
				return toast.success(response.data.message[0]);
			})
			.catch(error =>
			{
				return toast.error(error);
			})
        }
    }

    render() {
    	return (
	    	<div className="section-dashclient custom-headervagas">
                <IncludeVagas menuexcluir="active" menuvagas="" menuincluir="" />
	        <div className="container">
	            <div className="row vagas">
	                <div className="col-12">
	                    <h2>Excluir Currículo</h2>
	                </div>
	            </div>
	            <div className="row">
	                <div className="col-12 col-md-6">
	                    <h4 className="customtitleh4">Para excluir o seu cadastro é necessário confirmar algumas informações:</h4>

	                    <form id="formularioCV" className="form-cadastrarcv" onSubmit={this.submitHandler} >
	                    <ToastContainer />
	                        <div className="form-group row">
	                            <div className="col-12 col-md-6">
	                                <label>CPF*:</label>
	                                <InputMask mask="999.999.999-99" maskChar=" " id="cpf" type="text"
										className="form-control-rounded form-control"
										name="cpf" onChange={this.changeHandler} />
	                            </div>
	                            <div className="col-12 col-md-6">
	                                <label>E-mail*:</label>
	                                <input id="email" type="e-mail" className="form-control-rounded form-control" name="email" onChange={this.changeHandler} />
	                            </div>
	                            <div className="col-12 text-right">
	                                <button type="submit" className="btn btn-salvar">
	                                Excluir Currículo
	                                </button>
	                            </div>
	                        </div>
	                    </form>
	                </div>
	                <div className="col-12 offset-md-2 col-md-4">
	                    <div className="card card-default">
	                        <div className="card-content card-msg">
	                            <p>Para excluir seu currículo do nosso banco de talentos, basta preencher os dados ao lado ou enviar um e-mail para rh@hotelariabrasil.com.br com o assunto "Excluir cadastro".</p>
	                        </div>
	                    </div>
	                </div>
	            </div>
	        </div>
	    </div>
	    )
    }
}
