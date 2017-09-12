/**
 * Created by john on 2017/7/4.
 */
import React, {Component, PropTypes} from 'react'
import { linkState ,serializeForm} from '../common/index'
import Immutable from "immutable";
export default class TwoWayBindTest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //使用Immutable操作数据
            // 基本操作 set,get,setIn,getIn,fromJS,toJS,Map,List,Set
            //https://github.com/facebook/immutable-js
            person: Immutable.fromJS({
                name: "Bruce Sun",
                age: 10
            }),
            // test:Immutable.Map()
            test:Immutable.fromJS({a:{b:1}})
        }
    }

    submit() {
        console.log(this.state)
    }
    submit2(){
        console.log(this.state.person.toJS())
    }
    submit3(){
        console.log(this.state.test.toJS())
    }

    render() {
        const{set,get}= linkState(this);
        const person = linkState(this,"person");
        const test = linkState(this,"test");

        return (
            <div>
                example1
                <input
                    type="text"
                    value={get('name')}
                    onChange={set("name")}
                />
                <input
                    type="text"
                    value={get('age')}
                    onChange={set('age')}
                />
                <input type="radio" checked={get("sex") == 1}  onChange={set("sex")} name="sex" value="1"/>男
                <input type="radio"  checked={get("sex") == 2}   onChange={set("sex")}  name="sex" value="2"/>女
                <input type="checkbox" checked={get("other") == 1}  onChange={set("other")}/>other
                <input type="checkbox" checked={get("it") == 1}  onChange={set("it")} />IT
                <input type="button" onClick={this.submit.bind(this)} value="submit"/>
                <br/>
                example2
                <input
                    type="text"
                    value={person.get('name')}
                    onChange={person.set("name")}
                />
                <input
                    type="text"
                    value={person.get('age')}
                    onChange={person.set('age')}
                />
                <br/>
                example3
                <input
                    type="text"
                    value={test.get(['a','b'])}
                    onChange={test.set(['a','b'])}
                />

                <input type="button" onClick={this.submit3.bind(this)} value="submit"/>
            </div>
        )
    }
}
