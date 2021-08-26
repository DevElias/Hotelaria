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
                                    <p className="titulo-procedimento">{procedimento.titulo}</p>
                                    <p className="cat">Categoria: <span>{procedimento.categoria} / {procedimento.subcategoria}</span></p>
                                </div>
                                <div className="card-viz card-home">
                                    <a target="_blank" href={procedimento.url}>
                                       <p className="text-center"><img src="/img/ico-visualizar.svg" alt="Visualizar" /></p>
                                       Visualizar </a>
                                </div>
                                <div className="card-baixa card-home"><a href={procedimento.url} download>
                                    <p className="text-center"><img src="/img/ico-baixar.svg" alt="Visualizar" /></p>
                                    Baixar </a>
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
