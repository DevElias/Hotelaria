import React, {Component, Fragment} from 'react';

class MenuAreas extends Component {
    constructor(props) {
        super();

        this.state =
		{
			areas: [],
		};
    }

	getAreas() {
        axios.get(`/areas/lista/`)
            .then((response) =>
            {
            	let areas = [];
                response.data.areas.map((area) =>
				areas.push(area));

                this.setState({
                    areas: [...areas]
				})
            })
            .catch(error => console.log("It was not possible to bring the data from the database."));
    }

	componentDidMount()
	{
		const { id } = this.props;
		this.getAreas();
    }

    render(){
    	const { areas } = this.state;

    	return (
    			<Fragment>
	        		{
	        			areas.map(area => (
	        				<div key={area.id} id={area.id} className="form-check">
	        	                <input className="form-check-input" type="checkbox" id={'checkboxArea'+area.id} onClick={() => this.props.handler(area.id)} />
	        	                <label className="form-check-label">{area.area}</label>
	                        </div>
	        			))
	        		}
	        	</Fragment>
        )
    }
}

export default MenuAreas;



