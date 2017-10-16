/**
 * Created by qwr on 2017/9/18.
 */
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {challengesActions} from '../../actions'
import {Button, Modal, Form, FormControl, FormGroup, ControlLabel, Col} from "react-bootstrap"
import Alert from '../Alert'
class ChallengesListModal extends Component {
    constructor(props) {
        super(props);
        this.state =
            {
                challenges:[],
                show: false,
            }
    }
    componentDidMount() {
        const {queryChallenges} = this.props;
        const that=this;
        queryChallenges({},function (res) {
            that.setState({
                challenges:res,
            })
        });
    }
    componentWillReceiveProps(nextProps) {

    }
    _handleValidSubmit(event){
        event.preventDefault();
        const {pushChallenges} = this.props;
        var index=$("input[name='challenge']:checked").val();
        var challenges=this.state.challenges;
        pushChallenges(challenges[index]);
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
        const challenges=this.state.challenges;
        return (
            <div className="static-modal">
                <Modal show={this.state.show} backdrop={false}>
                    <Form horizontal onSubmit={this._handleValidSubmit.bind(this)}>
                        <Modal.Header>
                            <Modal.Title>Pick a Challenge</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {challenges.map((challenge, index) =>
                                <div className="m-t5" key={index}>
                                    <input type="radio" value={index} name="challenge" />
                                    {challenge.code}:{challenge.title}
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
    return bindActionCreators(challengesActions, dispatch)
}
export default connect(null, mapDispatchToProps, null, {withRef: true})(ChallengesListModal)