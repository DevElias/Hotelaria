import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import InputMask from 'react-input-mask';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class Usuarios extends Component {
    constructor(props)
	{
		super(props);
		this.state =
		{
				id :		 '',
	            nome :		 '',
				email:		 '',
				cpf: 		 '',
				nascimento:  '',
				telefone:    '',
				cep:		 '',
				endereco:    '',
				numero:      '',
				complemento: '',
				bairro: 	 '',
				cidades:     [],
				id_cidade: 	 '',
				estados:     [],
				id_estado: 	 '',
				senha: 		 '',
				tipo_usuario:'',
				tipo_admin:  '',
				status: 	 '',
				areas: 		 [],
				id_area:     '',
				cargos:		 [],
				id_cargo:    '',
				id_hotel:    '',
				hoteis:      [],
				url:         '',
				hidden: true,
				errors: {
					email: '',
				  }
		};

		const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

		this.changeHandler = e => {
			this.setState({ [e.target.name]: e.target.value});

			// Carrega Cidades de Acordo com Estado
			if(e.target.name == 'id_estado')
			{
				$("#id_cidade").empty();
				let idEstado = e.target.value;
				this.getCidades(idEstado);
			}

			// Carrega Cargos de Acordo com Area
			if(e.target.name == 'id_area')
			{
				$("#id_cargo").empty();
				let idArea = e.target.value;
				this.getCargos(idArea);
			}
			if(e.target.name == 'id_cidade')
			{
				$("#id_hotel").empty();
				let idCidade = e.target.value;
				this.getHoteis(idCidade);
			}

			const { name, value } = e.target;
			let errors = this.state.errors;

			switch (name) {
				case 'email':
					errors.email =
				  validEmailRegex.test(value)
					? ''
					: 'Email inválido!';
				break;
			}

			this.setState({errors, [name]: value});

			// Upload Procedimento
			if(e.target.name == 'file')
			{
				 let files = e.target.files || e.dataTransfer.files;
			     if (!files.length)
			     {
			    	 return;
			     }
			     else
		    	 {
			    	  this.createImage(files[0]);
		    	 }
			}
		}

		const validateForm = (errors) => {
			let valid = true;
			Object.values(errors).forEach(
			  // if we have an error string set valid to false
			  (val) => val.length > 0 && (valid = false)
			);
			return valid;
		  }

		this.submitHandler = e =>{
			e.preventDefault();
			console.log(this.state);
			if(validateForm(this.state.errors) && (this.state.email !== null))
			{
				if(this.state.id == '')
				{
					axios
					.post('/usuarios/gravar', this.state)
					.then(response =>
					{
						window.location.replace('/usuarios/admin');
					})
					.catch(error =>
					{
						return toast.error(error);
					})
				}
				else
				{
					axios
					.post('/usuarios/atualiza/'+this.state.id, this.state)
					.then(response =>
					{
						window.location.replace('/usuarios/admin');
					})
					.catch(error =>
					{
						return toast.error(error);
					})
				}
			}
		}

		this.toggleShow = this.toggleShow.bind(this);
	}

    toggleShow() {
        this.setState({ hidden: !this.state.hidden });
    }

    createImage(file) {
	      let reader = new FileReader();
	      reader.onload=(e)=>{

	    	  this.setState({
		          image: e.target.result
		        })

				const formData = {file: this.state.image}

				axios
				.post('/usuarios/foto/upload', formData)
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
	    reader.readAsDataURL(file);
	}

 // Get das Areas
	getAreas() {
        axios.get('/areas/lista')
            .then((response) =>
            {
            	const comboAreas = document.getElementById("id_area");
            	let option = '';
            	let areas = [];
                let areasCompleted = [];
                response.data.areas.map((area) =>
                    (area.completed == 1) ? areasCompleted.push(categoria) : areas.push(areas));

             // Precisa adicionar o COmboBox ao State para manipular na edicao
                this.setState({
                	areas: [...response.data.areas]
				})

                response.data.areas.forEach((options_areas) => {
                	  option = new Option(options_areas.area, options_areas.id);
                	  comboAreas.options[comboAreas.options.length] = option;
                	});

                const selectareas = this.state.id_area;
				this.state.areas.forEach(function(item, index){
					if(item.id == selectareas)
					{
						comboAreas.value = selectareas;
					}
				});

				this.getCargos(selectareas);
            })
            .catch(error => console.log("It was not possible to bring the data from the database."));
    }

	// Get dos Cargos
	getCargos(selectareas) {
		let id = selectareas;
		axios.get('/cargos/lista/'+id)
            .then((response) =>
            {
            	const comboCargos = document.getElementById("id_cargo");
            	let option = '';
            	let cargos = [];
                let cargosCompleted = [];
                response.data.cargos.map((cargo) =>
                    (cargo.completed == 1) ? cargosCompleted.push(cargo) : cargos.push(cargos));

             // Precisa adicionar o COmboBox ao State para manipular na edicao
                this.setState({
					cargos: [...response.data.cargos],
					id_cargo: response.data.cargos[0]['id']
				})

                response.data.cargos.forEach((options_cargos) => {
                	  option = new Option(options_cargos.cargo, options_cargos.id);
                	  comboCargos.options[comboCargos.options.length] = option;
                	});

                const selectcargos = this.state.id_cargo;
				this.state.cargos.forEach(function(item, index){
					if(item.id == selectcargos)
					{
						comboCargos.value = selectcargos;
					}
				});
            })
            .catch(error => console.log("It was not possible to bring the data from the database."));
    }

    // Get Dados do Usuario em Edicao
	getDados(idUser) {
        let id = idUser;
		axios.get('/usuarios/buscar/'+id)
            .then((response) =>
            {
                this.setState({
                    id: response.data.usuario[0].id,
                    nome: response.data.usuario[0].nome,
                    email: response.data.usuario[0].email,
                    cpf: response.data.usuario[0].cpf,
                    nascimento: response.data.usuario[0].data_nascimento,
                    telefone: response.data.usuario[0].telefone,
                    cep: response.data.usuario[0].cep,
                    endereco: response.data.usuario[0].endereco,
                    numero: response.data.usuario[0].numero,
                    complemento: response.data.usuario[0].complemento,
                    bairro: response.data.usuario[0].bairro,
                    id_cidade: response.data.usuario[0].id_cidade,
                    id_estado: response.data.usuario[0].id_estado,
                    id_area: response.data.usuario[0].id_area,
                    id_cargo: response.data.usuario[0].id_cargo,
                    id_hotel: response.data.usuario[0].id_hotel,
                    senha: response.data.usuario[0].senha,
                    tipo_usuario: response.data.usuario[0].tipo_usuario,
                    tipo_admin: response.data.usuario[0].tipo_admin,
                    url: response.data.usuario[0].img,

				})

				this.getAdmin(response.data.usuario[0].tipo_admin);
                this.getUsuario(response.data.usuario[0].tipo_usuario);
            })
            .catch(error => console.log("It was not possible to bring the data from the database."));
    }

	// Get dos Estados
	getEstados() {
		document.getElementById("id_cidade").disabled = true;
        axios.get('/estados/lista')
            .then((response) =>
            {
            	const comboEstados = document.getElementById("id_estado");
            	let option = '';
            	let estados = [];
                let estadosCompleted = [];
                response.data.estados.map((estado) =>
                    (estado.completed == 1) ? estadosCompleted.push(estado) : estados.push(estados));

                // Precisa adicionar o COmboBox ao State para manipular na edicao
                this.setState({
                	estados: [...response.data.estados]
				})

                response.data.estados.forEach((options_estados) => {
                	  option = new Option(options_estados.sigla, options_estados.id);
                	  comboEstados.options[comboEstados.options.length] = option;
                	});

                const selectestados = this.state.id_estado;
				this.state.estados.forEach(function(item, index){
					if(item.id == selectestados)
					{
						comboEstados.value = selectestados;
					}
				});

				this.getCidades(selectestados);
            })
            .catch(error => console.log("It was not possible to bring the data from the database."));
    }

	// Get das Cidades
	getCidades(idEstado) {
		let id = idEstado;
		if(id && !isNaN(id))
		{
			axios.get('/cidades/lista/'+id)
				.then((response) =>
				{
					document.getElementById("id_cidade").disabled = false;
					const comboCidades = document.getElementById("id_cidade");
					let option = '';
					let cidades = [];
					let cidadesCompleted = [];
					response.data.cidades.map((cidade) =>
						(cidade.completed == 1) ? cidadesCompleted.push(cidade) : cidades.push(cidades));

				// Precisa adicionar o COmboBox ao State para manipular na edicao
					this.setState({
						cidades: [...response.data.cidades]
					})

					// Adiciona o Elemento 0 no ComboBox
					$("#id_cidade").empty();
					$("#id_hotel").empty();
					var newoption = new Option('-- SELECIONAR --', 'DEFAULT');
					comboCidades.add(newoption);

					response.data.cidades.forEach((options_cidades) => {
						option = new Option(options_cidades.nome, options_cidades.id);
						comboCidades.options[comboCidades.options.length] = option;
						});

					const selectcidades = this.state.id_cidade;
					this.state.cidades.forEach(function(item, index){
						if(item.id == selectcidades)
						{
							comboCidades.value = selectcidades;
						}
					});

					this.getHoteis(selectcidades);
				})
				.catch(error => console.log("It was not possible to bring the data from the database."));
		}
    }

	// Get dos Hoteis
	getHoteis(idCidade) {
		let id = idCidade;
		if(id && !isNaN(id))
		{
			axios.get('/hoteis/listagem/'+id)
				.then((response) =>
				{
					const comboHoteis = document.getElementById("id_hotel");
					let option = '';
					let hoteis = [];
					let hoteisCompleted = [];

					// Adiciona o Elemento 0 no ComboBox
					$("#id_hotel").empty();
					var newoption = new Option('-- SELECIONAR --', 'DEFAULT');
					comboHoteis.add(newoption);

					response.data.hoteis.map((hotel) =>
						(hotel.completed == 1) ? hoteisCompleted.push(hotel) : hoteis.push(hoteis));

				// Precisa adicionar o COmboBox ao State para manipular na edicao
					this.setState({
						hoteis: [...response.data.hoteis]
					})

					response.data.hoteis.forEach((options_hoteis) => {
						option = new Option(options_hoteis.hotel, options_hoteis.id);
						comboHoteis.options[comboHoteis.options.length] = option;
						});

					const selecthoteis = this.state.id_hotel;
					this.state.hoteis.forEach(function(item, index){
						if(item.id == selecthoteis)
						{
							comboHoteis.value = selecthoteis;
						}
					});
				})
				.catch(error => console.log("It was not possible to bring the data from the database."));
		}
    }

	// ComboBox de Tipo Admin na Edicao
	getAdmin(idAdmin) {
		const selectadmin = idAdmin;
		let aAdmin = [];
		aAdmin = ["0", "1"];
		const comboAdmin = document.getElementById("tipo_admin");

		aAdmin.forEach(function(item, index){
			if(item == selectadmin)
			{
				comboAdmin.value = selectadmin;
			}
		});
	}

	// ComboBox de Tipo Usuario na Edicao
	getUsuario(idTipo) {
		const selectusuario = idTipo;
		let aUsuario = [];
		aUsuario = ["0", "1"];
		const comboUsuario = document.getElementById("tipo_usuario");

		aUsuario.forEach(function(item, index){
			if(item == selectusuario)
			{
				comboUsuario.value = selectusuario;
			}
		});
	}

	componentDidMount() {
		let url_atual   = window.location.href;
		let myarr       = url_atual.split("/");
		let idUsuario   = myarr[5];
		if(idUsuario)
		{
			this.getDados(idUsuario);
		}
        this.getAreas();
        this.getEstados();
    }

    render() {
        const{nome, email, cpf, nascimento, telefone, cep, endereco, numero, complemento, bairro, cidade, estado, senha, tipo_usuario, tipo_admin, status, area, cargo, errors} = this.state;

    	return (
            <div className="container">
				<div className="row">
					<div className="col-12 col-md-3 text-center">
					<img src={this.state.url} className="img-circle"/>
						<div className="upload-btn-wrapper text-center">
							<button className="btn btn-upload">Alterar imagem</button>
							<input type="file" name="file" accept="image/*" onChange={this.changeHandler}/>
						</div>
					</div>
					<div className="col-12 col-md-9">

					<form onSubmit={this.submitHandler} noValidate>
					<ToastContainer />
						<div className="form-group row">
							<div className="col-12">
								<label>Nome Completo *</label>
								<input id="nome" type="text"
									className="form-control-rounded form-control"
									name="nome" value={this.state.nome} onChange={this.changeHandler} />
								</div>
							</div>
							<div className="form-group row">
								<div className="col-12 col-md-6">
									<label>CPF *</label>
									<InputMask mask="999.999.999-99" maskChar=" " id="cpf" type="text"
										className="form-control-rounded form-control"
										name="cpf" value={this.state.cpf} onChange={this.changeHandler} />
								</div>
								<div className="col-12 col-md-6">
									<label>Email *</label>
									<input id="email" type="email"
										className={this.state.errors.email.length === 0 ? 'form-control-rounded form-control' : 'form-control-rounded form-control has-error'}
										name="email" value={this.state.email} onChange={this.changeHandler} noValidate/>
									{errors.email.length > 0 &&
						                <span className='error'><img src="/img/ico-input-erro.svg" alt="erro"/> {errors.email}</span>}
								</div>
							</div>
							<div className="form-group row">
								<div className="col-12 col-md-6">
									<label>Estado</label>
									<select id="id_estado" name="id_estado"  className="form-control-rounded form-control" onChange={this.changeHandler} defaultValue={'DEFAULT'}>
										<option value="DEFAULT" disabled >-- SELECIONAR --</option>
									</select>
								</div>
								<div className="col-12 col-md-6">
									<label>Cidade</label>
									<select id="id_cidade" name="id_cidade"  className="form-control-rounded form-control" onChange={this.changeHandler} defaultValue={'DEFAULT'}>
										<option value="DEFAULT" disabled >-- SELECIONAR --</option>
									</select>
								</div>
							</div>
							<div className="form-group row">
								<div className="col-12 col-md-6">
									<label>Data de Nascimento *</label>
									<InputMask mask="99/99/9999" maskChar=" " id="nascimento" type="text"
										className="form-control-rounded form-control"
										name="nascimento" value={this.state.nascimento} onChange={this.changeHandler} />
								</div>
								<div className="col-12 col-md-6">
									<label>Hotel:</label>
									<select id="id_hotel" className="form-control-rounded form-control" name="id_hotel" onChange={this.changeHandler} defaultValue={'DEFAULT'}>
										<option value="DEFAULT" disabled >-- SELECIONAR --</option>
									</select>
								</div>
							</div>
							<div className="form-group row">
								<div className="col-12 col-md-6">
									<label>Área</label>
									<select id="id_area" name="id_area"  className="form-control-rounded form-control" onChange={this.changeHandler} defaultValue={'DEFAULT'}>
										<option value="DEFAULT" disabled >-- SELECIONAR --</option>
									</select>
								</div>
								<div className="col-12 col-md-6">
									<label>Cargo</label>
									<select id="id_cargo" name="id_cargo"  className="form-control-rounded form-control" onChange={this.changeHandler} defaultValue={'DEFAULT'}>
										<option value="DEFAULT" disabled >-- SELECIONAR --</option>
									</select>
								</div>
							</div>
							<div className="row form-group">
								<div className="col-12 col-md-6">
										<label>Celular *</label>
										<InputMask mask="(99) 99999-9999" maskChar=" " id="telefone" type="text"
											className="form-control-rounded form-control"
											name="telefone" value={this.state.telefone} onChange={this.changeHandler} />
								</div>
								<div className="col-12 col-md-6">
									<label>CEP *</label>
									<InputMask mask="99999-999" maskChar=" " id="cep" type="text"
										className="form-control-rounded form-control"
										name="cep" value={this.state.cep} onChange={this.changeHandler} />
								</div>
							</div>
							<div className="row form-group">
								<div className="col-12 col-md-6">
									<label>Endereço *</label>
									<input id="endereco" type="text"
										className="form-control-rounded form-control"
										name="endereco" value={this.state.endereco} onChange={this.changeHandler} />
								</div>
								<div className="col-12 col-md-6">
									<label>Numero *</label>
									<input id="numero" type="text"
										className="form-control-rounded form-control"
										name="numero" value={this.state.numero} onChange={this.changeHandler} />
								</div>
							</div>
							<div className="form-group row">
								<div className="col-12 col-md-6">
									<label>Complemento</label>
									<input id="complemento" type="text"
										className="form-control-rounded form-control"
										name="complemento" value={this.state.complemento} onChange={this.changeHandler} />
								</div>
								<div className="col-12 col-md-6">
									<label>Bairro *</label>
									<input id="bairro" type="text"
										className="form-control-rounded form-control"
									name="bairro" value={this.state.bairro} onChange={this.changeHandler} />
								</div>
							</div>
							<div className="form-group row">
								<div className="col-12">
									<h3>Alterar senha</h3>
								</div>
							</div>
							<div className="form-group row">
								<div className="col-12 col-md-6">
									<label>Senha *</label>
									<div className="positionrelative">
				                    <span className="olhosenha" onClick={this.toggleShow}></span>
				                    <input id="senha" type={this.state.hidden ? "password" : "text"} className="form-control" name="senha" required onChange={this.changeHandler} value={this.state.senha} onChange={this.changeHandler}/>
				                    </div>
								</div>
							</div>
							<div className="form-group row">
								<div className="col-12 col-md-6">
									<label>Tipo de Usuário</label>
									<select id="tipo_usuario" className="form-control-rounded form-control" name="tipo_usuario" onChange={this.changeHandler} defaultValue={'DEFAULT'}>
										<option value="DEFAULT" disabled >-- SELECIONAR --</option>
										<option value="0">Administrador</option>
										<option value="1">Normal</option>
									</select>
								</div>
								<div className="col-12 col-md-6">
									<label>Tipo de Admin</label>
									<select id="tipo_admin" name="tipo_admin"  className="form-control-rounded form-control" onChange={this.changeHandler} defaultValue={'DEFAULT'}>
										<option value="DEFAULT" disabled >-- SELECIONAR --</option>
										<option value="0">Master</option>
										<option value="1">Editor</option>
									</select>
								</div>
							</div>
							 <div className="form-group row">
					            <div className="col-12 col-md-6">
					            <input id="url" type="hidden" className="form-control-rounded form-control" name="url" onChange={this.changeHandler} />
					            </div>
					         </div>
							<div className="form-group row">
								<div className="col-12 text-right">
									<button type="submit" id="gravar" className="btn btn-primary btn-rounded btn-lg mt-3">Salvar</button>
								</div>
							</div>
						</form>
					</div>
				</div>
            </div>
        );
    }
}
