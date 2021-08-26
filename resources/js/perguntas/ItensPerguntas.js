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
						<div  key={pergunta.id} id={pergunta.id}  className="card-question colapse-perguntas">
							<div className="col-12">
							<div className="card-header-question" id={'pergunta'+pergunta.id}>
								<div className="mb-0">
									<button className="btn btn-pergunta" data-toggle="collapse" data-target={"#collapse"+pergunta.id} aria-expanded="false" aria-controls="collapse">
										<h5>{pergunta.pergunta}</h5>
										<p>Categoria: <span>{pergunta.Categoria}</span> <a href={pergunta.documento} target="_blank"><img src="/img/ico-documentos.svg" alt="Documentos"/> Documento relacionado</a> </p>
									</button>
								</div>
							</div>
							<div id={"collapse"+pergunta.id} className="collapse" aria-labelledby={'pergunta'+pergunta.id} data-parent="#accordion">
								<div className="card-body-question">
									{pergunta.resposta}
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
