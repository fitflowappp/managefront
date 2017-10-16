/**
 * Created by qwr on 2017/9/15.
 */
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {routinesActions} from '../../actions'
import {Button, Modal, Form, FormControl, FormGroup, ControlLabel, Col} from "react-bootstrap"
import Alert from '../Alert'
class RoutinesListModal extends Component {
    constructor(props) {
        super(props);
        this.state =
            {
                routines:[],
                show: false,
            }
    }
    componentDidMount() {
        const {queryRoutines} = this.props;
        const that=this;
        queryRoutines({},function (res) {
            that.setState({
                routines:res,
            })
        });
    }
    componentWillReceiveProps(nextProps) {

    }
    _handleValidSubmit(event){
        event.preventDefault();
        const {pushRoutines} = this.props;
        var index=$("input[name='routines']:checked").val();
        var routines=this.state.routines;
        pushRoutines(routines[index]);
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
        const routines=this.state.routines;
        return (
            <div className="static-modal">
                <Modal show={this.state.show} backdrop={false}>
                    <Form horizontal onSubmit={this._handleValidSubmit.bind(this)}>
                        <Modal.Header>
                            <Modal.Title>Pick a Routine</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {routines.map((routine, index) =>
                                <div className="m-t5" key={index}>
                                    <input type="radio" value={index} name="routines" />
                                    {routine.code}:{routine.title}
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
    return bindActionCreators(routinesActions, dispatch)
}
export default connect(null, mapDispatchToProps, null, {withRef: true})(RoutinesListModal)