/**
 * Created by smk on 2016/9/23.
 */
import React, {Component, PropTypes} from 'react';
import ReactDOM, {render, findDOMNode} from 'react-dom'
/**
 * <ObjSelect options={options} onChange={selectChange.bind(this)} label="size" code="code" value={this.state.v}/>
 */
export default class ObjSelect extends Component {
    constructor(props) {
        super(props);

        const {options,label,code} = props;
        var _options =[];
        var _optionsMap = new Map();

        _options.push({label:"请选择", value:""});
        _optionsMap.set("","");

        for (var prop in options){
            var item = options[prop];
            _options.push({label:item[label], value:item[code]});
            _optionsMap.set(String(item[code]),item);
        }

        this.state =
        {
            optionsMap:_optionsMap,
            options:_options
        }

    }

    selectChange(cb,e){
        if(cb)
        cb(this.state.optionsMap.get(e.target.value))
    }

    render() {
        var value = this.props.value[this.props.code];
        return (
            <select onChange={this.selectChange.bind(this,this.props.onChange)} value={value}>
                {this.state.options && this.state.options.map((item, index) =>
                    <option value={item.value} key={index}>{item.label}</option>
                )}
            </select>
        )
    }
}

ObjSelect.propTypes = {
    label:React.PropTypes.string.isRequired,
    code:React.PropTypes.string.isRequired,
    options:React.PropTypes.array,
    onChange:React.PropTypes.func
};
