import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'

export default class Login extends Component {
	constructor(props)
	{
		super(props);
		this.state =
		{
			email : '',
            password : '',
            hidden: true
		};

		this.changeHandler = e => {
			this.setState({ [e.target.name]: e.target.value});
		}

		this.submitHandler = e =>{
			e.preventDefault();
			console.log(this.state);
			axios
			.post('/acesso', this.state)
			.then(response =>
			{
				if(response.data.code == '200')
				{
					window.location.replace(response.data.redirect);
				}
				else
				{
					alert(response.data.message)
				}
			})
			.catch(error =>
			{
				console.log(error);
			})
        }
        this.toggleShow = this.toggleShow.bind(this);
    }
    toggleShow() {
        this.setState({ hidden: !this.state.hidden });
    }

    render() {
        return (
        		<form onSubmit={this.submitHandler}>
                <div className="form-group row">
                    <label className="col-md-12 col-form-label">Usuário (CPF/E-mail)</label>

                    <div className="col-12">
                        <input id="email" type="text" className="form-control" name="email" required onChange={this.changeHandler} />
                    </div>
                </div>

                <div className="form-group row">
                    <label className="col-12 col-form-label">Senha</label>
                    <div className="col-12">
                    <span className="olhosenha" onClick={this.toggleShow}></span>
                        <input id="password" type={this.state.hidden ? "password" : "text"} className="form-control" name="password" required onChange={this.changeHandler} />
                    </div>
                </div>

                <div className="form-group row">
                    <div className="col-6">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" name="remember" id="remember" />

                            <label className="form-check-label">
                                Manter conectado
                            </label>
                        </div>
                    </div>
                        <div className="col-6 text-right">
                            <a className="link-esqueci" href="/esqueci">
                               Esqueci minha senha
                            </a>
                        </div>
                </div>

                <div className="form-group row mb-0">
                    <div className="col-md-6 offset-md-6">
                        <button type="submit" className="btn btn-block btn-primary">
                            Entrar
                        </button>
                    </div>
                </div>
            </form>
        );
    }
}
