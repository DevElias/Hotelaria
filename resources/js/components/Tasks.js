import React, {Component} from 'react';

class Tasks extends Component {
    constructor(props) {
        super();
    }

    render(){
        return (
            this.props.tasks.map((task) => {
                return (
                    <div key={task.id} id={task.id} className="media">
                        <div className="media-body">
                            <div>
                                {task.title}{' '}
                                <span className="text-muted">
                                    <br />Estimated date: {task.estimated_at}
                                    {' '}
                                    <br />by {task.user.name}
                                </span>
                            </div>
                            <hr />
                        </div>
                    </div>
                )
            })
        )
    }
}

export default Tasks
