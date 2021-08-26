import React, {Component, Fragment} from 'react';

class ItensPerguntas extends Component {
    constructor(props) {
        super();
    }

    render(){
    	const { perguntas } = this.props;
    	return (
    		<Fragment>
        		{
        			perguntas.map(pergunta => (
						<div className="col-12" key={pergunta.id} id={pergunta.id}>
								<div className="card">
									<div className="card-content">
										<p className="titulo-procedimento">{pergunta.pergunta}</p>
										<p className="cat">Categoria: <span>{pergunta.Categoria}</span>
										</p>
									</div>
									<div className="card-pergundas-visualizar">
										<a  className="text-center" target="_blank" href={"collapse"+pergunta.id}  data-toggle="modal" data-target={"#exampleModal"+pergunta.id}>
										<p  className="text-center"><img src="/img/ico-visualizar.svg" alt="Visualizar" /></p>
										Visualizar </a>
									</div>
							</div>
							<div className="modal fade" id={"exampleModal"+pergunta.id}  aria-labelledby={"exampleModalLabel"+pergunta.id} aria-hidden="true">
								<div className="modal-dialog">
									<div className="modal-content">
									<div className="modal-header">
										<h5 className="modal-title" id="exampleModalLabel">{pergunta.pergunta}</h5>
										<button type="button" className="close" data-dismiss="modal" aria-label="Close">
										<span aria-hidden="true">&times;</span>
										</button>
									</div>
									<div className="modal-body">
									<div dangerouslySetInnerHTML={{__html: pergunta.resposta}} />
									<p><a href={pergunta.documento} target="_blank"><img src="/img/ico-documentos.svg" alt="Documentos"/> Documento relacionado</a></p>
									</div>
									</div>
								</div>
							</div>
						</div>
        			))
        		}
           </Fragment>
        )
    }
}

export default ItensPerguntas;
