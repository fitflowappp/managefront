/**
 * Created by bruce on 16-6-14.
 */
import React, {Component, PropTypes} from 'react';
import ReactDOM, {render, findDOMNode} from 'react-dom'
import {Modal, Button} from "react-bootstrap"
export default class Alert extends Component {

    static createRootEle() {
        var root = document.getElementById("reactAlert");
        if (!root) {
            root = document.createElement('div');
            root.id = "reactAlert";
            document.body.appendChild(root);
        }
    }

    /**
     *
     * 消息
     * Alert.info({info:123});
     * Alert.info({info:123,closeTime:3000});
     * @param props
     */
    static info(props) {
        Alert.createRootEle();
        var p = document.createElement('div');
        document.getElementById("reactAlert").appendChild(p);
        var rele = render(React.createElement(Alert, {type: "info", ...props}), p);
        if (props.closeTime) {
            rele.open(props.closeTime)
        } else {
            rele.open(1000)
        }
        return rele;
    }

    /**
     * alert
     *
     * Alert.alert({title:300,body:"hahah" ,cb:function(){
     *  do something
     * }})
     * @param props
     */
    static alert(props) {
        Alert.createRootEle();
        var p = document.createElement('div');
        document.getElementById("reactAlert").appendChild(p);
        var rele = render(React.createElement(Alert, {type: "alert", ...props}), p);
        rele.open();
        return rele;
    }

    /**
     * confirm
     *
     * Alert.confirm({title:300,body:"hahah" ,surecb:function(){
     *  do something
     * },cancelcb:function(){
     *  do something
     * }})
     * @param props
     */
    static confirm(props) {
        Alert.createRootEle();
        var p = document.createElement('div');
        document.getElementById("reactAlert").appendChild(p);
        var rele = render(React.createElement(Alert, {type: "confirm", ...props}), p);
        rele.open();
        return rele;
    }

    close() {
        this.content.close();
    }

    sure() {
        this.content.sure();
        var parent = ReactDOM.findDOMNode(this).parentNode;
        ReactDOM.unmountComponentAtNode(parent);
        document.getElementById("reactAlert").removeChild(parent);
    }

    open(closeTime) {
        this.content.open();
        if (closeTime) {
            setTimeout(function () {
                this.destroy();
            }.bind(this), closeTime)
        }
    }

    destroy() {
        this.close();
        var parent = ReactDOM.findDOMNode(this).parentNode;
        ReactDOM.unmountComponentAtNode(parent);
        document.getElementById("reactAlert").removeChild(parent);
    }

    constructor(props) {
        super(props);
        this.element = null;
    }

    render() {
        return <div></div>;
    }

    componentDidMount() {
        this.element = ReactDOM.findDOMNode(this);
        this.componentDidUpdate();
    }

    componentWillUnmount() {
        var parent = ReactDOM.findDOMNode(this.content).parentNode;
        ReactDOM.unmountComponentAtNode(parent);
    }

    componentDidUpdate() {
        const {type} = this.props;
        var content;
        switch (type) {
            case "info":
                content = <InfoModal {...this.props}/>
                break;
            case "alert":
                content = <AlertModal close={this.destroy.bind(this)} {...this.props}/>
                break;
            case "confirm":
                content = <ConfirmModal close={this.destroy.bind(this)} sure={this.sure.bind(this)} {...this.props}/>
                break;
            case "prompt":
                content = <PromptModal close={this.destroy.bind(this)} sure={this.sure.bind(this)} {...this.props}/>
                break;

        }
        this.content = render(content, this.element)
    }
}


class InfoModal extends Component {

    constructor(props) {
        super(props);
        this.state =
        {
            show: false
        }
    }

    open() { //打开模态框
        this.setState({
            show: true
        })
    }

    close() { //关闭模态框
        this.setState({
            show: false
        })
    }

    render() {
        return (
            <div className="static-modal">
                <Modal show={this.state.show} onHide={this.close.bind(this)} bsSize="small">
                    <Modal.Body className="text-center">
                        {this.props.info}
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}

InfoModal.propTypes = {
    info: React.PropTypes.oneOfType([        // any
        React.PropTypes.string,
        React.PropTypes.number]).isRequired
};

class AlertModal extends Component {

    constructor(props) {
        super(props);
        this.state =
        {
            show: false
        }
    }

    open() { //打开模态框
        this.setState({
            show: true
        })
    }

    close() { //关闭模态框
        this.props.cb && this.props.cb();
        this.setState({
            show: false
        })
    }

    render() {
        return (
            <div className="static-modal">
                <Modal show={this.state.show} backdrop={false}>
                    <Modal.Header>
                        <Modal.Title>
                            {this.props.title}
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        {this.props.body}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button autoFocus bsStyle="primary" onClick={this.props.close}>确定</Button>
                    </Modal.Footer>

                </Modal>
            </div>

        )
    }
}

AlertModal.propTypes = {
    body: React.PropTypes.oneOfType([        // any
        React.PropTypes.string,
        React.PropTypes.number]).isRequired,
    title: React.PropTypes.oneOfType([        // any
        React.PropTypes.string,
        React.PropTypes.number]),
    cb: React.PropTypes.func
};

class ConfirmModal extends Component {

    constructor(props) {
        super(props);
        this.state =
        {
            show: false
        }
    }

    open() { //打开模态框
        this.setState({
            show: true
        })
    }

    close() { //关闭模态框
        this.props.cancelcb && this.props.cancelcb();
        this.setState({
            show: false
        })
    }

    sure() { //关闭模态框
        this.props.surecb && this.props.surecb();
        this.setState({
            show: false
        })
    }

    render() {
        return (
            <div className="static-modal">
                <Modal show={this.state.show} backdrop={false} >
                    <Modal.Header>
                        <Modal.Title>
                            {this.props.title}
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        {this.props.body}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button autoFocus bsStyle="primary" onClick={this.props.sure}>确定</Button>
                        <Button onClick={this.props.close}>取消</Button>
                    </Modal.Footer>

                </Modal>
            </div>

        )
    }
}

ConfirmModal.propTypes = {
    body: React.PropTypes.oneOfType([        // any
        React.PropTypes.string,
        React.PropTypes.number]).isRequired,
    title: React.PropTypes.oneOfType([        // any
        React.PropTypes.string,
        React.PropTypes.number]),
    surecb: React.PropTypes.func,
    cancelcb: React.PropTypes.func
};
