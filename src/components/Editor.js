/**
 * Created by qwr on 2016/8/5.
 */
import React, {Component, PropTypes} from 'react'
import Draft from '../components/draft'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Button} from "react-bootstrap"
import {withRouter} from "react-router";
import editorActions from '../actions/editor'
import {fetch} from '../common/fetch'
import {
    Form,
    FormGroup,
    ControlLabel,
    FormControl
} from 'react-bootstrap'
import Immutable from 'immutable'
import {stateToHTML} from '../components/draft-js-export-html'
import Alert from '../components/Alert';
const {
    AtomicBlockUtils,
    Editor,
    EditorState,
    Entity,
    RichUtils,
    CompositeDecorator,
    Modifier,
} = Draft;
const {Map} = Immutable;
class MediaEditorExample extends Component {
    constructor(props) {
        super(props);
        const decorator = new CompositeDecorator([
            {
                strategy: findLinkEntities,
                component: Link,
            },
        ]);
        this.state = {
            editorState: EditorState.createEmpty(decorator),
            showURLInput: false,
            urlValue: '',
            imgAlt:'',
            set:false,
        };

        this.focus = () => this.refs.editor.focus();
        this.onChange = (editorState) => this.setState({editorState});
        this.handleKeyCommand = (command) => this._handleKeyCommand(command);
        this.toggleBlockType = (type) => this._toggleBlockType(type);
        this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);
        let options = {
            inlineStyles: {
                // Override default element (`strong`).
                BOLD: {element: 'b'},
                ITALIC: {
                    // Add custom attributes. You can also use React-style `className`.
                    attributes: {class: 'foo'},
                    // Use camel-case. Units (`px`) will be added where necessary.
                    style: {fontSize: 12}
                },
                CODE: {
                    element: 'div',
                    attributes: {class: 'auto'},
                },
                STRIKETHROUGH: {
                    attributes: {class: 'mht'},
                },
                // Use a custom inline style. Default element is `span`.
                red: {style: {color: 'rgba(255, 0, 0, 1.0)'}},
                orange: {style: {color: 'rgba(255, 127, 0, 1.0)'}},
                yellow: {style: {color: 'rgba(180, 180, 0, 1.0)'}},
                green: {style: {color: 'rgba(0, 180, 0, 1.0)'}},
                blue: {style: {color: 'rgba(0, 0, 255, 1.0)'}},
                indigo: {style: {color: 'rgba(75, 0, 130, 1.0)'}},
                violet: {style: {color: 'rgba(127, 0, 255, 1.0)'}},

                yahei: {
                    style:{ fontFamily:'Microsoft YaHei' }
                },
                SimSun: {
                    style:{ fontFamily:'SimSun' }
                },
                SimHei: {
                    style:{ fontFamily:'SimHei' }
                },
                arial:{
                    style:{ fontFamily:'arial' }
                },
                line1: {
                    style:{ lineHeight:'1.5' }
                },
                line2: {
                    style:{ lineHeight:'2' }
                },
                line3:{
                    style:{ lineHeight:'3' }
                },
                CENTER:{
                    style:{
                        textAlign: 'center',
                        display: 'block'
                    }
                }
            }
        };
        //提交
        this.logState = () => {
           const {postEditor,consultantId,selectNoTag,selectTag,contentType,title,img,remark,userId} = this.props;
            const content = this.state.editorState.getCurrentContent();

            var stateStr = JSON.stringify(this.state.editorState);
            //console.log(stateStr);
            var allTag=selectNoTag.concat(selectTag);
            let html = stateToHTML(content, options);
            var id,role;
            if(consultantId==0&&userId==0){
                Alert.info({info:'请选择搭配师或用户'});
                return;
            }
            else if(contentType==0){
                Alert.info({info:'请选择内容分类'});
                return;
            }
            if(consultantId==0&&userId!=0){
                id=userId;
                role=1;
            }
            if(consultantId!=0&&userId==0){
                id=consultantId;
                role=4;
            }
            if(consultantId!=0&&userId!=0){
                id=consultantId;
                role=4;
            }
            const params={
                content:html,
                title:title,
                consultantId:id,
                coverImage:img,
                categoryId:contentType,
                tags:allTag,
                role:role,
                /*editorState:stateStr,*/
                remark:remark,
            }
            if(selectNoTag.length!=0){
                Alert.confirm({title:'红色标签为未存在的标签',body:"确定添加？",surecb:function() {

                    var that=this;
                    postEditor({},params).then(function (obj) {
                        if (obj.data.code == 1){
                            Alert.info({info:'添加成功'});
                            const decorator = new CompositeDecorator([
                                {
                                    strategy: findLinkEntities,
                                    component: Link,
                                },
                            ]);

                            that.setState({
                                editorState: EditorState.createEmpty(decorator),
                            })
                        }
                        else{
                            Alert.info({info:obj.data.msg});
                        }
                    }.bind(this))


                }
                })
            }
            else{
                postEditor({},params).then(function (obj) {
                    if (obj.data.code == 1){
                        Alert.info({info:'添加成功,可到内容列表发布'});
                        const decorator = new CompositeDecorator([
                            {
                                strategy: findLinkEntities,
                                component: Link,
                            },
                        ]);

                        this.setState({
                            editorState: EditorState.createEmpty(decorator),
                        })
                    }
                    else{
                        Alert.info({info:obj.data.msg});
                    }
                }.bind(this))
            }

        };
        //images
        this.confirmMedia = this._confirmMedia.bind(this);
        //link
        this.promptForLink = this._promptForLink.bind(this);
        this.onURLChange = (e) => this.setState({urlValue: e.target.value});
        this.confirmLink = this._confirmLink.bind(this);
        this.onLinkInputKeyDown = this._onLinkInputKeyDown.bind(this);
        this.removeLink = this._removeLink.bind(this);
        //color
        this.toggleColor = (toggledColor) => this._toggleColor(toggledColor);
        //font
        this.toggleFont = (toggledfont) => this._toggleFont(toggledfont);
        //line
        this.toggleLine = (toggledline) => this._toggleLine(toggledline);
    }
    //客户端初次加载初始化
    componentDidMount() {
        //const {id,queryEditor} = this.props;
       // queryEditor({id:id},{})
    }
/*    componentWillReceiveProps(nextProps){
        const list=nextProps.editor.list;
        //editorState
      console.log(list);
      console.log(JSON.parse(list.editorState));
      this.setState({
            editorState: JSON.parse(list.editorState)
        });
    }*/
    _handleKeyCommand(command) {
        const {editorState} = this.state;
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            this.onChange(newState);
            return true;
        }
        return false;
    }

    _toggleBlockType(blockType) {
        this.onChange(
            RichUtils.toggleBlockType(
                this.state.editorState,
                blockType
            )
        );
    }

    _toggleInlineStyle(inlineStyle) {
        this.onChange(
            RichUtils.toggleInlineStyle(
                this.state.editorState,
                inlineStyle
            )
        );
    }
    //media images
    _confirmMedia(e) {
        e.preventDefault();
        var imgAlt=this.state.imgAlt;
         var data = new FormData();
         var file=document.getElementById('file');
        if(!imgAlt){
            Alert.info({info:'请输入图片描述'});
            file.value='';
            return;
        }
        for(var i=0;i<file.files.length;i++){
            data.append('file', file.files[i]);
        }
         var config = {
             progress: function(progressEvent) {
                 var percentCompleted = progressEvent.loaded / progressEvent.total;
             },
         };
        var that=this;
        fetch().post('/api/upload', data, config)
             .then(function (res) {
                 const {editorState} = that.state;
                  function addimg(oldstate,url)
                  {
                      var entityKey = Entity.create('image', 'IMMUTABLE', {src: url,alt:imgAlt});
                      return AtomicBlockUtils.insertAtomicBlock(
                  oldstate,
                  entityKey,
                  ' ')
                  }
                  var newstate = editorState;
                  for(var i =0; i<res.data.length;i++){
                  newstate = addimg(newstate,res.data[i].contentUri)
                  }
                 that.setState({
                     editorState: newstate,
                     imgAlt:'',
                  });
                 file.value='';
             })
             .catch(function (err) {
               console.log('error');
             });
    }

    //color
    _toggleColor(toggledColor) {
        const {editorState} = this.state;
        const selection = editorState.getSelection();
        // Let's just allow one color at a time. Turn off all active colors.
        const nextContentState = Object.keys(colorStyleMap)
            .reduce((contentState, color) => {
                return Modifier.removeInlineStyle(contentState, selection, color)
            }, editorState.getCurrentContent());

        let nextEditorState = EditorState.push(
            editorState,
            nextContentState,
            'change-inline-style'
        );

        const currentStyle = editorState.getCurrentInlineStyle();

        // Unset style override for current color.
        if (selection.isCollapsed()) {
            nextEditorState = currentStyle.reduce((state, color) => {
                return RichUtils.toggleInlineStyle(state, color);
            }, nextEditorState);
        }

        // If the color is being toggled on, apply it.
        if (!currentStyle.has(toggledColor)) {
            nextEditorState = RichUtils.toggleInlineStyle(
                nextEditorState,
                toggledColor
            );
        }

        this.onChange(nextEditorState);
    }

    //font
    _toggleFont(toggledFont) {
        const {editorState} = this.state;
        const selection = editorState.getSelection();

        // Let's just allow one color at a time. Turn off all active colors.
        const nextContentState = Object.keys(fontStyleMap)
            .reduce((contentState, font) => {
                return Modifier.removeInlineStyle(contentState, selection, font)
            }, editorState.getCurrentContent());

        let nextEditorState = EditorState.push(
            editorState,
            nextContentState,
            'change-inline-style'
        );

        const currentStyle = editorState.getCurrentInlineStyle();
        // Unset style override for current color.
        if (selection.isCollapsed()) {
            nextEditorState = currentStyle.reduce((state, font) => {
                return RichUtils.toggleInlineStyle(state, font);
            }, nextEditorState);
        }

        // If the color is being toggled on, apply it.
        if (!currentStyle.has(toggledFont)) {
            nextEditorState = RichUtils.toggleInlineStyle(
                nextEditorState,
                toggledFont
            );
        }

        this.onChange(nextEditorState);
    }
    //line
    _toggleLine(toggledLine) {
        const {editorState} = this.state;
        const selection = editorState.getSelection();

        // Let's just allow one color at a time. Turn off all active colors.
        const nextContentState = Object.keys(lineStyleMap)
            .reduce((contentState, line) => {
                return Modifier.removeInlineStyle(contentState, selection, line)
            }, editorState.getCurrentContent());

        let nextEditorState = EditorState.push(
            editorState,
            nextContentState,
            'change-inline-style'
        );

        const currentStyle = editorState.getCurrentInlineStyle();
        // Unset style override for current color.
        if (selection.isCollapsed()) {
            nextEditorState = currentStyle.reduce((state, line) => {
                return RichUtils.toggleInlineStyle(state, line);
            }, nextEditorState);
        }

        // If the color is being toggled on, apply it.
        if (!currentStyle.has(toggledLine)) {
            nextEditorState = RichUtils.toggleInlineStyle(
                nextEditorState,
                toggledLine
            );
        }

        this.onChange(nextEditorState);
    }
    //link
    _promptForLink(e) {
        e.preventDefault();
        const {editorState} = this.state;
        const selection = editorState.getSelection();
        if (!selection.isCollapsed()) {
            this.setState({
                showURLInput: true,
                urlValue: '',
            }, () => {
                setTimeout(() => this.refs.url.focus(), 0);
            });
        }
    }

    _confirmLink(e) {
        e.preventDefault();
        const {editorState, urlValue} = this.state;
        const entityKey = Entity.create('LINK', 'MUTABLE', {url: urlValue});
        this.setState({
            editorState: RichUtils.toggleLink(
                editorState,
                editorState.getSelection(),
                entityKey
            ),
            showURLInput: false,
            urlValue: '',
        }, () => {
            setTimeout(() => this.refs.editor.focus(), 0);
        });

    }

    _onLinkInputKeyDown(e) {
        if (e.which === 13) {
            this._confirmLink(e);
        }
    }

    _removeLink(e) {
        e.preventDefault();
        const {editorState} = this.state;
        const selection = editorState.getSelection();
        if (!selection.isCollapsed()) {
            this.setState({
                editorState: RichUtils.toggleLink(editorState, selection, null),
            });
        }
    }
set(name,e){
    this.state[name]=e.target.value;
    this.setState({
        set:!this.state.set,
    })
}

    render() {
        const {editorState} = this.state;
        // If the user changes block type before entering any text, we can
        // either style the placeholder or hide it. Let's just hide it now.
        let className = 'RichEditor-editor';
        var contentState = editorState.getCurrentContent();
        if (!contentState.hasText()) {
            if (contentState.getBlockMap().first().getType() !== 'unstyled') {
                className += ' RichEditor-hidePlaceholder';
            }
        }
        //link
        let urlInput;
        var fileoptions={

        };
        if (this.state.showURLInput) {
            urlInput =
                <div style={styles.urlInputContainer}>
                    <input
                        onChange={this.onURLChange}
                        ref="url"
                        style={styles.urlInput}
                        type="text"
                        value={this.state.urlValue}
                        onKeyDown={this.onLinkInputKeyDown}
                    />
                    <button onMouseDown={this.confirmLink}>
                        Confirm
                    </button>
                </div>;
        }
        return (
            <div>
                <div className="RichEditor-root">
                    <BlockStyleControls
                        editorState={editorState}
                        onToggle={this.toggleBlockType}
                    />
                    <InlineStyleControls
                        editorState={editorState}
                        onToggle={this.toggleInlineStyle}
                    />
                    <ColorControls
                        editorState={editorState}
                        onToggle={this.toggleColor}
                    />
                    <FontControls
                        editorState={editorState}
                        onToggle={this.toggleFont}
                    />
                    <LineControls
                        editorState={editorState}
                        onToggle={this.toggleLine}
                    />
                    <div style={{marginBottom: 10}}>
                        <Form inline style={{marginBottom: 10}}>
                            <FormGroup controlId="formInlineName" className="m-r10">
                                <FormControl  type="text" placeholder="图片alt" value={this.state.imgAlt} onChange={this.set.bind(this,'imgAlt')}/>
                            </FormGroup>
                            <FormGroup controlId="formInlineName" className="m-r10">
                                <FormControl  type="file" name="file" id="file" multiple="true" onChange={this._confirmMedia.bind(this)}/>
                            </FormGroup>
                        </Form>
                        <button onMouseDown={this.promptForLink}
                                style={{marginRight: 10}}>
                            添加链接
                        </button>
                        <button onMouseDown={this.removeLink}>
                            移除链接
                        </button>
                    </div>
                    {urlInput}
                    <div className={className} onClick={this.focus}>
                        <Editor
                            customStyleMap={styleMap}
                            blockStyleFn={getBlockStyle}
                            blockRendererFn={mediaBlockRenderer}
                            editorState={editorState}
                            handleKeyCommand={this.handleKeyCommand}
                            onChange={this.onChange}
                            placeholder="请编辑..."
                            ref="editor"
                            spellCheck={true}
                        />
                    </div>
                </div>
                <Button bsStyle="default" className="m-t10 m-b40" type="button" onClick={this.logState}>确定</Button>
            </div>
        );
    }
}
function getBlockStyle(block) {
    switch (block.getType()) {
        case 'blockquote':
            return 'RichEditor-blockquote';
        default:
            return null;
    }
}
const BLOCK_TYPES = [
    {label: 'H4', style: 'header-four'},
    {label: 'H5', style: 'header-five'},
    {label: 'UL', style: 'unordered-list-item'},
    {label: 'OL', style: 'ordered-list-item'}
    // {label: 'Blockquote', style: 'blockquote'},
    // {label: 'Code Block', style: 'code-block'},
];
const BlockStyleControls = (props) => {
    const {editorState} = props;
    const selection = editorState.getSelection();
    const blockType = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType();

    return (
        <div className="RichEditor-controls">
            <b>标签：</b>
            {BLOCK_TYPES.map((type) =>
                <StyleButton
                    key={type.label}
                    active={type.style === blockType}
                    label={type.label}
                    onToggle={props.onToggle}
                    style={type.style}
                />
            )}
        </div>
    );
};
var INLINE_STYLES = [
    {label: '粗体', style: 'BOLD'},
    {label: '斜体', style: 'ITALIC'},
    /*{label:'漫画体',style:'STRIKETHROUGH'},*/
    {label: '下划线', style: 'UNDERLINE'},
    {label: '居中', style: 'CENTER'}
];
const InlineStyleControls = (props) => {
    var currentStyle = props.editorState.getCurrentInlineStyle();
    return (
        <div className="RichEditor-controls">
            <b>样式：</b>
            {INLINE_STYLES.map(type =>
                <StyleButton
                    key={type.label}
                    active={currentStyle.has(type.style)}
                    label={type.label}
                    onToggle={props.onToggle}
                    style={type.style}
                />
            )}
        </div>
    );
};
//media images
function mediaBlockRenderer(block) {
    if (block.getType() === 'atomic') {
        return {
            component: Media,
            editable: false,
        };
    }
    return null;
}
const Image = (props) => {
    return <img src={props.src}/>;
};
const Media = (props) => {
    const entity = Entity.get(props.block.getEntityAt(0));
    const {src} = entity.getData();
    const type = entity.getType();

    let media;
    if (type === 'audio') {
        media = <Audio src={src}/>;
    } else if (type === 'image') {
        media = <Image src={src}/>;
    } else if (type === 'video') {
        media = <Video src={src}/>;
    }

    return media;
};
//link
function findLinkEntities(contentBlock, callback) {
    contentBlock.findEntityRanges(
        (character) => {
            const entityKey = character.getEntity();
            return (
                entityKey !== null &&
                Entity.get(entityKey).getType() === 'LINK'
            );
        },
        callback
    );
}
const Link = (props) => {
    const {url} = Entity.get(props.entityKey).getData();
    return (
        <a href={url} style={styles.link}>
            {props.children}
        </a>
    );
};
class StyleButton extends React.Component {
    constructor() {
        super();
        this.onToggle = (e) => {
            e.preventDefault();
            this.props.onToggle(this.props.style);
        };
    }
    render() {
        let className = 'RichEditor-styleButton';
        if (this.props.active) {
            className += ' RichEditor-activeButton';
        }
        return (
            <span className={className} onMouseDown={this.onToggle}>
              {this.props.label}
            </span>
        );
    }
}
//color
class StyleButton_color extends Component {
    constructor(props) {
        super(props);
        this.onToggle = (e) => {
            e.preventDefault();
            this.props.onToggle(this.props.style);
        };
    }
    render() {
        let style;
        if (this.props.active) {
            style = {...styles.styleButton, ...colorStyleMap[this.props.style]};
        } else {
            style = styles.styleButton;
        }

        return (
            <span style={style} onMouseDown={this.onToggle}>
              {this.props.label}
            </span>
        );
    }
}
var COLORS = [
    {label: '红色', style: 'red'},
    {label: '黄色', style: 'yellow'},
    {label: '蓝色', style: 'blue'},
];
const ColorControls = (props) => {
    var currentStyle = props.editorState.getCurrentInlineStyle();
    return (
        <div style={styles.controls}>
            <b>颜色：</b>
            {COLORS.map(type =>
                <StyleButton_color
                    key={type.label}
                    active={currentStyle.has(type.style)}
                    label={type.label}
                    onToggle={props.onToggle}
                    style={type.style}
                />
            )}
        </div>
    );
};
const colorStyleMap = {
    red: {
        color: 'rgba(255, 0, 0, 1.0)',
    },
    orange: {
        color: 'rgba(255, 127, 0, 1.0)',
    },
    yellow: {
        color: 'rgba(180, 180, 0, 1.0)',
    },
    green: {
        color: 'rgba(0, 180, 0, 1.0)',
    },
    blue: {
        color: 'rgba(0, 0, 255, 1.0)',
    },
    indigo: {
        color: 'rgba(75, 0, 130, 1.0)',
    },
    violet: {
        color: 'rgba(127, 0, 255, 1.0)',
    },
};

//font-family

class StyleButton_font extends Component {
    constructor(props) {
        super(props);
        this.onToggle = (e) => {
            e.preventDefault();
            this.props.onToggle(this.props.style);
        };
    }

    render() {
        let style;
        if (this.props.active) {
            style = {...styles.styleButton, color:'#3b5998'};
        } else {
            style = styles.styleButton;
        }

        return (
            <span style={style} onMouseDown={this.onToggle}>
              {this.props.label}
            </span>
        );
    }
}
var FONTS = [
    {label: '雅黑', style: 'yahei'},
];

const fontStyleMap = {
    yahei: {
        fontFamily:'Microsoft YaHei'
    },
    SimSun: {
        fontFamily:'SimSun'
    },
    SimHei: {
        fontFamily:'SimHei'
    },
    arial:{
        fontFamily:'arial'
    }
};

const FontControls = (props) => {
    var currentStyle = props.editorState.getCurrentInlineStyle();
    return (
        <div style={styles.controls}>
            <b>字体：</b>
            {FONTS.map(type =>
                <StyleButton_font
                    key={type.label}
                    active={currentStyle.has(type.style)}
                    label={type.label}
                    onToggle={props.onToggle}
                    style={type.style}
                />
            )}
        </div>
    );
};
//line-height
class StyleButton_line extends Component {
    constructor(props) {
        super(props);
        this.onToggle = (e) => {
            e.preventDefault();
            this.props.onToggle(this.props.style);
        };
    }

    render() {
        let style;
        if (this.props.active) {
            style = {...styles.styleButton, color:'#3b5998'};
        } else {
            style = styles.styleButton;
        }

        return (
            <span style={style} onMouseDown={this.onToggle}>
              {this.props.label}
            </span>
        );
    }
}
var LINE = [
    {label: '1.5倍', style: 'line1'},
    {label: '2倍', style: 'line2'},
    {label: '3倍', style: 'line3'},
];

const lineStyleMap = {
    line1: {
        lineHeight:'1.5'
    },
    line2: {
        lineHeight:'2'
    },
    line3: {
        lineHeight:'3'
    }
};

const LineControls = (props) => {
    var currentStyle = props.editorState.getCurrentInlineStyle();
    return (
        <div style={styles.controls}>
            <b>行距：</b>
            {LINE.map(type =>
                <StyleButton_line
                    key={type.label}
                    active={currentStyle.has(type.style)}
                    label={type.label}
                    onToggle={props.onToggle}
                    style={type.style}
                />
            )}
        </div>
    );
};

const styleMap = {
    ...colorStyleMap,
    ...fontStyleMap,
   ...lineStyleMap,
};

const styles = {
    root: {
        fontFamily: '\'Georgia\', serif',
        padding: 20,
        width: 600,
    },
    buttons: {
        marginBottom: 10,
    },
    urlInputContainer: {
        marginBottom: 10,
    },
    urlInput: {
        fontFamily: '\'Georgia\', serif',
        marginRight: 10,
        padding: 3,
    },
    editor: {
        border: '1px solid #ccc',
        cursor: 'text',
        minHeight: 80,
        padding: 10,
    },
    button: {
        marginTop: 10,
        textAlign: 'center',
    },
    link: {
        color: '#3b5998',
        textDecoration: 'underline',
    },
    controls: {
        fontFamily: '\'Helvetica\', sans-serif',
        fontSize: 14,
        marginBottom: 10,
        userSelect: 'none',
    },
    styleButton: {
        color: '#999',
        cursor: 'pointer',
        marginRight: 16,
        padding: '2px 0',
    },
};

function mapStateToProps(state) {
    return {
        editor: state.editor
    }
}
//将action的所有方法绑定到props上
function mapDispatchToProps(dispatch) {
    return bindActionCreators(editorActions, dispatch)
}

//通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MediaEditorExample))




