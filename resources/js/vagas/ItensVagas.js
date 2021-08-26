import React, {Component, Fragment} from 'react';

class ItensVagas extends Component {
    constructor(props) {
        super();
    }

    render(){
    	const { vagas } = this.props;

    	return (
    			<Fragment>
	        		{
	        			vagas.map(vaga => (
	        	            <div key={vaga.id} id={vaga.id} className="col-12 col-md-4">
		        	            <div className="card">
									<div className="card-contentvagas">
										<h3>{vaga.Cargo}</h3>
										<p className="legenda">{vaga.Area} </p>
										<p> <a href={'/vagas/detalhes/'+vaga.id} className="f-medium"> Mais informações <img src="/img/ico-seta-dir-preta.svg" alt="info" /></a></p>
										<hr />
										<p><img src="/img/ico-localizacao.svg" alt="Local" /> {vaga.Cidade}, {vaga.Sigla}</p>
										<p><img src="/img/ico-data.svg" className="imgdatapq" alt="Expira" /> Expira em: {vaga.DtExpira}</p>
									</div>
									<div className="card-visualizar">
										<a href={'/vagas/detalhes/'+vaga.id} className="btncard-visualizar">
											Candidatar-se
										</a>
									</div>
								</div>
	                        </div>
	        			))
	        		}
	        	</Fragment>
        )
    }
}

export default ItensVagas;



