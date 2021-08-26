import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Form from "./Form";
import Tasks from "./Tasks";
import Actions from "./Actions";
import Usuarios from ".././usuarios/Usuarios";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            title: '',
            estimated_at: Actions.formattedDate(new Date()),
            tasks: [],
            editing: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleCreateSubmit = this.handleCreateSubmit.bind(this);
    }

    handleChange(e) {
        const {name, value} = e.target;
        this.setState({[name]: value});
    }
    
    // Tasks
    handleCreateSubmit(e) {
        e.preventDefault();
        console.log(this.state);
        axios.post('/tasks', {
                title: this.state.title,
                estimated_at: this.state.estimated_at
            }).then(response => {
                this.setState({
                    title: '',
                    estimated_at: Actions.formattedDate(new Date()),
                    tasks: Actions.sortByEstimated([response.data, ...this.state.tasks]),
                    counter: this.state.counter + 1,
                });
                console.log("The task was created.");
            })
            .catch(error => console.log(error));
    }

    getTasks() {
        axios.get('/tasks')
            .then((response) => {
                let tasks = [];
                let tasksCompleted = [];
                response.data.tasks.map((task) =>
                    (task.completed == 1) ? tasksCompleted.push(task) : tasks.push(task));

                this.setState({
                    tasks: [...tasks]
                })
            })
            .catch(error => console.log("It was not possible to bring the data from the database."));
    }

    componentDidMount() {
        this.getTasks();
    }

    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Tasks</div>
                            <div className="card-body">
                                <Form handleSubmit={this.handleCreateSubmit}
                                       handleChange={this.handleChange}
                                       title={this.state.title}
                                       estimated_at={this.state.estimated_at}
                                       button='Create Task'
                                />
                                <br />
                                <Tasks tasks={this.state.tasks}
                                       handleEdit={this.handleEdit}
                                       handleDelete={this.handleDelete}
                                       handleComplete={this.handleComplete}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    // End Tasks
}
