import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'

export default class PerguntasLogin extends Component {
	constructor(props)
	{
		super(props);
		this.state =
		{
			perguntas : '',
		};

		this.changeHandler = e => {
			this.setState({ [e.target.name]: e.target.value});
		}

		this.submitHandler = e =>{
			e.preventDefault();
			console.log(this.state);
		}
	}
	
	componentDidMount() {
		axios
		.post('/perguntas/login')
		.then(response =>
		{
			 this.setState({
                 perguntas: [response.data.perguntas]
				})
				
				console.log(response.data.perguntas);
		})
		.catch(error =>
		{
			console.log(error);
		})
    }
	
    render() {
        return (
        		 <div className="container">
                 <div className="perguntas">
                     <div className="row">
                             <div className="col-12 text-center">
                                 <h2>Perguntas?</h2>
                                 <p>Veja as dÃºvidas mais frequentes aqui:</p>
                             </div>
                             <div className="col-12 col-md-6">
                                     <div id="accordion">
                                         <div className="card-question">
                                             <div className="card-header-question" id="perguntaUm">
                                                 <h5 className="mb-0">
                                                     <button className="btn btn-pergunta" data-toggle="collapse" data-target="#collapseUm" aria-expanded="true" aria-controls="collapse">
                                                     Para que serve esse Portal do RH?
                                                     </button>
                                                 </h5>
                                             </div>
                                             <div id="collapseUm" className="collapse show" aria-labelledby="perguntaUm">
                                                 <div className="card-body-question">
                                                 Esse Ã© a Ã¡rea em os colaboradores poderÃ£o acessar para consultar todos os processos, vagas e informaÃ§Ãµes da empresa.
                                                 </div>
                                             </div>
                                         </div>
                                         <div className="card-question">
                                             <div className="card-header-question" id="perguntaDois">
                                                 <h5 className="mb-0">
                                                     <button className="btn btn-pergunta collapsed" data-toggle="collapse" data-target="#collapseDois" aria-expanded="false" aria-controls="collapse">
                                                     Como faÃ§o para obter ou alterar a minha senha?
                                                     </button>
                                                 </h5>
                                             </div>
                                             <div id="collapseDois" className="collapse" aria-labelledby="perguntaDois">
                                                 <div className="card-body-question">
                                                     Esse Ã© a Ã¡rea em os colaboradores poderÃ£o acessar para consultar todos os processos, vagas e informaÃ§Ãµes da empresa.
                                                 </div>
                                             </div>
                                         </div>
                                     </div>
                                 </div>
                                 <div className="col-12 col-md-6">
                                     <div id="accordion2">
                                         <div className="card-question">
                                             <div className="card-header-question" id="perguntaTres">
                                                 <h5 className="mb-0">
                                                     <button className="btn btn-pergunta collapsed" data-toggle="collapse" data-target="#collapseTres" aria-expanded="false" aria-controls="collapse">
                                                     Para que serve esse Portal do RH?
                                                     </button>
                                                 </h5>
                                             </div>
                                             <div id="collapseTres" className="collapse" aria-labelledby="perguntaTres" data-parent="#accordion">
                                                 <div className="card-body-question">
                                                 Esse Ã© a Ã¡rea em os colaboradores poderÃ£o acessar para consultar todos os processos, vagas e informaÃ§Ãµes da empresa.
                                                 </div>
                                             </div>
                                         </div>
                                         <div className="card-question">
                                             <div className="card-header-question" id="perguntaQuatro">
                                                 <h5 className="mb-0">
                                                     <button className="btn btn-pergunta collapsed" data-toggle="collapse" data-target="#collapseQuatro" aria-expanded="false" aria-controls="collapse">
                                                     Como faÃ§o para obter ou alterar a minha senha?
                                                     </button>
                                                 </h5>
                                             </div>
                                             <div id="collapseQuatro" className="collapse" aria-labelledby="perguntaQuatro" data-parent="#accordion">
                                                 <div className="card-body-question">
                                                     Esse Ã© a Ã¡rea em os colaboradores poderÃ£o acessar para consultar todos os processos, vagas e informaÃ§Ãµes da empresa.
                                                 </div>
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
