import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class Esqueci extends Component {
	constructor(props)
	{
		super(props);
		this.state =
		{
			email : '',
			buttonElm: '',
			buttonLabel: ''
		};

		this.changeHandler = e => {
			this.setState({ [e.target.name]: e.target.value});
		}

		this.submitHandler = e =>{
			e.preventDefault();
			
			/** Comportamento do botão submit */
			this.buttonElm = $(e.target).find('button[type="submit"]');
			this.buttonLabel = this.buttonElm.text();
			this.buttonElm.addClass('disabled').text('Aguarde...');

			axios
			.post('/enviasenha', this.state)
			.then(response =>
			{
				this.buttonElm.removeClass('disabled').text(this.buttonLabel);

				switch(response.data.code)
				{
					case 200:
						document.getElementById("formularioEsqueci").reset();
						return toast.success(response.data.response[0]);
					case 400:
						return toast.success(response.data.response[0]);
					case 500:
						return toast.error(response.data.response[0]);
				}
				
				/*
				console.log(response.data.response[0]);
				if(response.data.code == 400)
				{
					return toast.success(response.data.response[0]);
				}
				if(response.data.code == 200)
				{
					document.getElementById("formularioEsqueci").reset()
					return toast.success(response.data.response[0]);
				}
				*/
			})
			.catch(error =>
			{
				return toast.error(error);
			})
		}
	}

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-4">
                        <form id="formularioEsqueci" onSubmit={this.submitHandler}>
                        <ToastContainer />
                            <div className="form-group row">
                                <p className=" col-12 customvoltarlogin"><a href="/login"> <img src="/img/ico-seta-esq-azul.svg" /> Voltar</a></p>
                                <p className="fontesqueci col-12">Redefina sua senha através do seu<br /> e-mail cadastrado:</p>
                                <label className="col-12 col-md-8 col-form-label labelfontesqueci">Seu e-mail</label>

                                <div className="col-12">
                                    <input id="email" type="email" className="form-control" name="email" required onChange={this.changeHandler}/>
                                </div>
                            </div>

                            <div className="form-group row mb-0">
                                <div className="col-md-6 offset-md-6">
                                    <button type="submit" className="btn btn-primary btn-block">
                                        Recuperar senha
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
