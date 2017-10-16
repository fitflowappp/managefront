/**
 * Created by qwr on 2017/9/18.
 */
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {workoutsActions} from '../../actions'
import {Button, Modal, Form, FormControl, FormGroup, ControlLabel, Col} from "react-bootstrap"
import Alert from '../Alert'
class WorkoutsListModal extends Component {
    constructor(props) {
        super(props);
        this.state =
            {
                workouts:[],
                show: false,
            }
    }
    componentDidMount() {
        const {queryWorkouts} = this.props;
        const that=this;
        queryWorkouts({},function (res) {
            that.setState({
                workouts:res,
            })
        });
    }
    componentWillReceiveProps(nextProps) {

    }
    _handleValidSubmit(event){
        event.preventDefault();
        const {pushWorkouts} = this.props;
        var index=$("input[name='workouts']:checked").val();
        var workouts=this.state.workouts;
        pushWorkouts(workouts[index]);
        this.closeModal();
    }

    openModal() {
        this.setState({
            show: true
        })
    }

    closeModal() {
        this.setState({
            show: false,
            userNum:'',
        })
    }
    render() {
        const workouts=this.state.workouts;
        return (
            <div className="static-modal">
                <Modal show={this.state.show} backdrop={false}>
                    <Form horizontal onSubmit={this._handleValidSubmit.bind(this)}>
                        <Modal.Header>
                            <Modal.Title>Pick a Workout</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {workouts.map((workout, index) =>
                                <div className="m-t5" key={index}>
                                    <input type="radio" value={index} name="workouts" />
                                    {workout.code}:{workout.title}
                                </div>
                            )}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button bsStyle="primary" type="submit">Save</Button>
                            <Button bsStyle="default" onClick={this.closeModal.bind(this)}>Back</Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
            </div>
        )
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators(workoutsActions, dispatch)
}
export default connect(null, mapDispatchToProps, null, {withRef: true})(WorkoutsListModal)