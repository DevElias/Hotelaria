import React, {Component, Fragment} from 'react';

class IncludeVagas extends Component {
    constructor(props) {
        super();

        this.state =
		{
			layout: [],
		};
    }

    render(){
    	const { layout } = this.state;

    	return (
    			<Fragment>
	        		{
	        			<div className="header-vagas">
		        		    <div className="container">
		        		        <div className="row">
		        		            <div className="col-12">
		        		                <a href="/vagas" className="link-back"><img src="/img/ico-seta-esq-preta.svg" alt="" /> Voltar para Home</a>
		        		            </div>
		        		            <div className="col-12">
		        		                <hr />
		        		            </div>
		        		        </div>
		        		        <div className="row justify-content-md-center menu-vagas menumobilevagasestilo">
		        		            <div className="col-md-auto">
		        		             <a href="/vagas"  className={this.props.menuvagas}>Vagas em aberto</a>
		        		            </div>
		        		            <div className="col-md-auto border-divisor">
		        		                <a href="/candidatos/cadastro" className={this.props.menuincluir}>Cadastrar/Atualizar Currículo</a>
		        		            </div>
		        		            <div className="col-md-auto">
		        		                <a href="/candidatos/excluir" className={this.props.menuexcluir}>Excluir Currículo</a>
		        		            </div>
		        		        </div>
		        		    </div>
		        		</div>
	        		}
	        	</Fragment>
        )
    }
}

export default IncludeVagas;



