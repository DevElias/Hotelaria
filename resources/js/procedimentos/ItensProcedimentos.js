import React, {Component, Fragment} from 'react';

class ItensProcedimentos extends Component {
    constructor(props) {
        super();
    }

    render(){
    	const { procedimentos } = this.props; 
    	return (
    		<Fragment>
        		{
        			procedimentos.map(procedimento => (
        					<div key={procedimento.id} id={procedimento.id} className="col-12">
                            <div className="card">
                                <div className="card-content">
                                    <p>{procedimento.titulo}</p>
                                    <p className="cat">Categoria: <span>{procedimento.categoria} / {procedimento.subcategoria}</span></p>
                                </div>
                                <div className="card-viz">
                                    <a target="_blank" href={procedimento.url}>
                                        <img src="/img/ico-visualizar.svg" alt="Visualizar" />Visualizar </a>
                                </div>
                                <div className="card-baixa"><a href={procedimento.url} download><img src="/img/ico-baixar.svg" alt="Visualizar" />Baixar </a>
                                </div>
                            </div>
                        </div>
        			))
        		}
           </Fragment>
        )
    }
}

export default ItensProcedimentos;
