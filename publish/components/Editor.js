'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _draft = require('../components/draft');

var _draft2 = _interopRequireDefault(_draft);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _reactBootstrap = require('react-bootstrap');

var _reactRouter = require('react-router');

var _editor = require('../actions/editor');

var _editor2 = _interopRequireDefault(_editor);

var _fetch = require('../common/fetch');

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _draftJsExportHtml = require('../components/draft-js-export-html');

var _Alert = require('../components/Alert');

var _Alert2 = _interopRequireDefault(_Alert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by qwr on 2016/8/5.
 */
var AtomicBlockUtils = _draft2.default.AtomicBlockUtils,
    Editor = _draft2.default.Editor,
    EditorState = _draft2.default.EditorState,
    Entity = _draft2.default.Entity,
    RichUtils = _draft2.default.RichUtils,
    CompositeDecorator = _draft2.default.CompositeDecorator,
    Modifier = _draft2.default.Modifier;
var Map = _immutable2.default.Map;

var MediaEditorExample = function (_Component) {
    (0, _inherits3.default)(MediaEditorExample, _Component);

    function MediaEditorExample(props) {
        (0, _classCallCheck3.default)(this, MediaEditorExample);

        var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props));

        var decorator = new CompositeDecorator([{
            strategy: findLinkEntities,
            component: Link
        }]);
        _this.state = {
            editorState: EditorState.createEmpty(decorator),
            showURLInput: false,
            urlValue: '',
            imgAlt: '',
            set: false
        };

        _this.focus = function () {
            return _this.refs.editor.focus();
        };
        _this.onChange = function (editorState) {
            return _this.setState({ editorState: editorState });
        };
        _this.handleKeyCommand = function (command) {
            return _this._handleKeyCommand(command);
        };
        _this.toggleBlockType = function (type) {
            return _this._toggleBlockType(type);
        };
        _this.toggleInlineStyle = function (style) {
            return _this._toggleInlineStyle(style);
        };
        var options = {
            inlineStyles: {
                // Override default element (`strong`).
                BOLD: { element: 'b' },
                ITALIC: {
                    // Add custom attributes. You can also use React-style `className`.
                    attributes: { class: 'foo' },
                    // Use camel-case. Units (`px`) will be added where necessary.
                    style: { fontSize: 12 }
                },
                CODE: {
                    element: 'div',
                    attributes: { class: 'auto' }
                },
                STRIKETHROUGH: {
                    attributes: { class: 'mht' }
                },
                // Use a custom inline style. Default element is `span`.
                red: { style: { color: 'rgba(255, 0, 0, 1.0)' } },
                orange: { style: { color: 'rgba(255, 127, 0, 1.0)' } },
                yellow: { style: { color: 'rgba(180, 180, 0, 1.0)' } },
                green: { style: { color: 'rgba(0, 180, 0, 1.0)' } },
                blue: { style: { color: 'rgba(0, 0, 255, 1.0)' } },
                indigo: { style: { color: 'rgba(75, 0, 130, 1.0)' } },
                violet: { style: { color: 'rgba(127, 0, 255, 1.0)' } },

                yahei: {
                    style: { fontFamily: 'Microsoft YaHei' }
                },
                SimSun: {
                    style: { fontFamily: 'SimSun' }
                },
                SimHei: {
                    style: { fontFamily: 'SimHei' }
                },
                arial: {
                    style: { fontFamily: 'arial' }
                },
                line1: {
                    style: { lineHeight: '1.5' }
                },
                line2: {
                    style: { lineHeight: '2' }
                },
                line3: {
                    style: { lineHeight: '3' }
                },
                CENTER: {
                    style: {
                        textAlign: 'center',
                        display: 'block'
                    }
                }
            }
        };
        //提交
        _this.logState = function () {
            var _this$props = _this.props,
                postEditor = _this$props.postEditor,
                consultantId = _this$props.consultantId,
                selectNoTag = _this$props.selectNoTag,
                selectTag = _this$props.selectTag,
                contentType = _this$props.contentType,
                title = _this$props.title,
                img = _this$props.img,
                remark = _this$props.remark,
                userId = _this$props.userId;

            var content = _this.state.editorState.getCurrentContent();

            var stateStr = (0, _stringify2.default)(_this.state.editorState);
            //console.log(stateStr);
            var allTag = selectNoTag.concat(selectTag);
            var html = (0, _draftJsExportHtml.stateToHTML)(content, options);
            var id, role;
            if (consultantId == 0 && userId == 0) {
                _Alert2.default.info({ info: '请选择搭配师或用户' });
                return;
            } else if (contentType == 0) {
                _Alert2.default.info({ info: '请选择内容分类' });
                return;
            }
            if (consultantId == 0 && userId != 0) {
                id = userId;
                role = 1;
            }
            if (consultantId != 0 && userId == 0) {
                id = consultantId;
                role = 4;
            }
            if (consultantId != 0 && userId != 0) {
                id = consultantId;
                role = 4;
            }
            var params = {
                content: html,
                title: title,
                consultantId: id,
                coverImage: img,
                categoryId: contentType,
                tags: allTag,
                role: role,
                /*editorState:stateStr,*/
                remark: remark
            };
            if (selectNoTag.length != 0) {
                _Alert2.default.confirm({ title: '红色标签为未存在的标签', body: "确定添加？", surecb: function surecb() {

                        var that = this;
                        postEditor({}, params).then(function (obj) {
                            if (obj.data.code == 1) {
                                _Alert2.default.info({ info: '添加成功' });
                                var _decorator = new CompositeDecorator([{
                                    strategy: findLinkEntities,
                                    component: Link
                                }]);

                                that.setState({
                                    editorState: EditorState.createEmpty(_decorator)
                                });
                            } else {
                                _Alert2.default.info({ info: obj.data.msg });
                            }
                        }.bind(this));
                    }
                });
            } else {
                postEditor({}, params).then(function (obj) {
                    if (obj.data.code == 1) {
                        _Alert2.default.info({ info: '添加成功,可到内容列表发布' });
                        var _decorator2 = new CompositeDecorator([{
                            strategy: findLinkEntities,
                            component: Link
                        }]);

                        this.setState({
                            editorState: EditorState.createEmpty(_decorator2)
                        });
                    } else {
                        _Alert2.default.info({ info: obj.data.msg });
                    }
                }.bind(_this));
            }
        };
        //images
        _this.confirmMedia = _this._confirmMedia.bind(_this);
        //link
        _this.promptForLink = _this._promptForLink.bind(_this);
        _this.onURLChange = function (e) {
            return _this.setState({ urlValue: e.target.value });
        };
        _this.confirmLink = _this._confirmLink.bind(_this);
        _this.onLinkInputKeyDown = _this._onLinkInputKeyDown.bind(_this);
        _this.removeLink = _this._removeLink.bind(_this);
        //color
        _this.toggleColor = function (toggledColor) {
            return _this._toggleColor(toggledColor);
        };
        //font
        _this.toggleFont = function (toggledfont) {
            return _this._toggleFont(toggledfont);
        };
        //line
        _this.toggleLine = function (toggledline) {
            return _this._toggleLine(toggledline);
        };
        return _this;
    }
    //客户端初次加载初始化


    MediaEditorExample.prototype.componentDidMount = function componentDidMount() {}
    //const {id,queryEditor} = this.props;
    // queryEditor({id:id},{})

    /*    componentWillReceiveProps(nextProps){
            const list=nextProps.editor.list;
            //editorState
          console.log(list);
          console.log(JSON.parse(list.editorState));
          this.setState({
                editorState: JSON.parse(list.editorState)
            });
        }*/
    ;

    MediaEditorExample.prototype._handleKeyCommand = function _handleKeyCommand(command) {
        var editorState = this.state.editorState;

        var newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            this.onChange(newState);
            return true;
        }
        return false;
    };

    MediaEditorExample.prototype._toggleBlockType = function _toggleBlockType(blockType) {
        this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
    };

    MediaEditorExample.prototype._toggleInlineStyle = function _toggleInlineStyle(inlineStyle) {
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle));
    };
    //media images


    MediaEditorExample.prototype._confirmMedia = function _confirmMedia(e) {
        e.preventDefault();
        var imgAlt = this.state.imgAlt;
        var data = new FormData();
        var file = document.getElementById('file');
        if (!imgAlt) {
            _Alert2.default.info({ info: '请输入图片描述' });
            file.value = '';
            return;
        }
        for (var i = 0; i < file.files.length; i++) {
            data.append('file', file.files[i]);
        }
        var config = {
            progress: function progress(progressEvent) {
                var percentCompleted = progressEvent.loaded / progressEvent.total;
            }
        };
        var that = this;
        (0, _fetch.fetch)().post('/api/upload', data, config).then(function (res) {
            var editorState = that.state.editorState;

            function addimg(oldstate, url) {
                var entityKey = Entity.create('image', 'IMMUTABLE', { src: url, alt: imgAlt });
                return AtomicBlockUtils.insertAtomicBlock(oldstate, entityKey, ' ');
            }
            var newstate = editorState;
            for (var i = 0; i < res.data.length; i++) {
                newstate = addimg(newstate, res.data[i].contentUri);
            }
            that.setState({
                editorState: newstate,
                imgAlt: ''
            });
            file.value = '';
        }).catch(function (err) {
            console.log('error');
        });
    };

    //color


    MediaEditorExample.prototype._toggleColor = function _toggleColor(toggledColor) {
        var editorState = this.state.editorState;

        var selection = editorState.getSelection();
        // Let's just allow one color at a time. Turn off all active colors.
        var nextContentState = (0, _keys2.default)(colorStyleMap).reduce(function (contentState, color) {
            return Modifier.removeInlineStyle(contentState, selection, color);
        }, editorState.getCurrentContent());

        var nextEditorState = EditorState.push(editorState, nextContentState, 'change-inline-style');

        var currentStyle = editorState.getCurrentInlineStyle();

        // Unset style override for current color.
        if (selection.isCollapsed()) {
            nextEditorState = currentStyle.reduce(function (state, color) {
                return RichUtils.toggleInlineStyle(state, color);
            }, nextEditorState);
        }

        // If the color is being toggled on, apply it.
        if (!currentStyle.has(toggledColor)) {
            nextEditorState = RichUtils.toggleInlineStyle(nextEditorState, toggledColor);
        }

        this.onChange(nextEditorState);
    };

    //font


    MediaEditorExample.prototype._toggleFont = function _toggleFont(toggledFont) {
        var editorState = this.state.editorState;

        var selection = editorState.getSelection();

        // Let's just allow one color at a time. Turn off all active colors.
        var nextContentState = (0, _keys2.default)(fontStyleMap).reduce(function (contentState, font) {
            return Modifier.removeInlineStyle(contentState, selection, font);
        }, editorState.getCurrentContent());

        var nextEditorState = EditorState.push(editorState, nextContentState, 'change-inline-style');

        var currentStyle = editorState.getCurrentInlineStyle();
        // Unset style override for current color.
        if (selection.isCollapsed()) {
            nextEditorState = currentStyle.reduce(function (state, font) {
                return RichUtils.toggleInlineStyle(state, font);
            }, nextEditorState);
        }

        // If the color is being toggled on, apply it.
        if (!currentStyle.has(toggledFont)) {
            nextEditorState = RichUtils.toggleInlineStyle(nextEditorState, toggledFont);
        }

        this.onChange(nextEditorState);
    };
    //line


    MediaEditorExample.prototype._toggleLine = function _toggleLine(toggledLine) {
        var editorState = this.state.editorState;

        var selection = editorState.getSelection();

        // Let's just allow one color at a time. Turn off all active colors.
        var nextContentState = (0, _keys2.default)(lineStyleMap).reduce(function (contentState, line) {
            return Modifier.removeInlineStyle(contentState, selection, line);
        }, editorState.getCurrentContent());

        var nextEditorState = EditorState.push(editorState, nextContentState, 'change-inline-style');

        var currentStyle = editorState.getCurrentInlineStyle();
        // Unset style override for current color.
        if (selection.isCollapsed()) {
            nextEditorState = currentStyle.reduce(function (state, line) {
                return RichUtils.toggleInlineStyle(state, line);
            }, nextEditorState);
        }

        // If the color is being toggled on, apply it.
        if (!currentStyle.has(toggledLine)) {
            nextEditorState = RichUtils.toggleInlineStyle(nextEditorState, toggledLine);
        }

        this.onChange(nextEditorState);
    };
    //link


    MediaEditorExample.prototype._promptForLink = function _promptForLink(e) {
        var _this2 = this;

        e.preventDefault();
        var editorState = this.state.editorState;

        var selection = editorState.getSelection();
        if (!selection.isCollapsed()) {
            this.setState({
                showURLInput: true,
                urlValue: ''
            }, function () {
                setTimeout(function () {
                    return _this2.refs.url.focus();
                }, 0);
            });
        }
    };

    MediaEditorExample.prototype._confirmLink = function _confirmLink(e) {
        var _this3 = this;

        e.preventDefault();
        var _state = this.state,
            editorState = _state.editorState,
            urlValue = _state.urlValue;

        var entityKey = Entity.create('LINK', 'MUTABLE', { url: urlValue });
        this.setState({
            editorState: RichUtils.toggleLink(editorState, editorState.getSelection(), entityKey),
            showURLInput: false,
            urlValue: ''
        }, function () {
            setTimeout(function () {
                return _this3.refs.editor.focus();
            }, 0);
        });
    };

    MediaEditorExample.prototype._onLinkInputKeyDown = function _onLinkInputKeyDown(e) {
        if (e.which === 13) {
            this._confirmLink(e);
        }
    };

    MediaEditorExample.prototype._removeLink = function _removeLink(e) {
        e.preventDefault();
        var editorState = this.state.editorState;

        var selection = editorState.getSelection();
        if (!selection.isCollapsed()) {
            this.setState({
                editorState: RichUtils.toggleLink(editorState, selection, null)
            });
        }
    };

    MediaEditorExample.prototype.set = function set(name, e) {
        this.state[name] = e.target.value;
        this.setState({
            set: !this.state.set
        });
    };

    MediaEditorExample.prototype.render = function render() {
        var editorState = this.state.editorState;
        // If the user changes block type before entering any text, we can
        // either style the placeholder or hide it. Let's just hide it now.

        var className = 'RichEditor-editor';
        var contentState = editorState.getCurrentContent();
        if (!contentState.hasText()) {
            if (contentState.getBlockMap().first().getType() !== 'unstyled') {
                className += ' RichEditor-hidePlaceholder';
            }
        }
        //link
        var urlInput = void 0;
        var fileoptions = {};
        if (this.state.showURLInput) {
            urlInput = _react2.default.createElement(
                'div',
                { style: styles.urlInputContainer },
                _react2.default.createElement('input', {
                    onChange: this.onURLChange,
                    ref: 'url',
                    style: styles.urlInput,
                    type: 'text',
                    value: this.state.urlValue,
                    onKeyDown: this.onLinkInputKeyDown
                }),
                _react2.default.createElement(
                    'button',
                    { onMouseDown: this.confirmLink },
                    'Confirm'
                )
            );
        }
        return _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
                'div',
                { className: 'RichEditor-root' },
                _react2.default.createElement(BlockStyleControls, {
                    editorState: editorState,
                    onToggle: this.toggleBlockType
                }),
                _react2.default.createElement(InlineStyleControls, {
                    editorState: editorState,
                    onToggle: this.toggleInlineStyle
                }),
                _react2.default.createElement(ColorControls, {
                    editorState: editorState,
                    onToggle: this.toggleColor
                }),
                _react2.default.createElement(FontControls, {
                    editorState: editorState,
                    onToggle: this.toggleFont
                }),
                _react2.default.createElement(LineControls, {
                    editorState: editorState,
                    onToggle: this.toggleLine
                }),
                _react2.default.createElement(
                    'div',
                    { style: { marginBottom: 10 } },
                    _react2.default.createElement(
                        _reactBootstrap.Form,
                        { inline: true, style: { marginBottom: 10 } },
                        _react2.default.createElement(
                            _reactBootstrap.FormGroup,
                            { controlId: 'formInlineName', className: 'm-r10' },
                            _react2.default.createElement(_reactBootstrap.FormControl, { type: 'text', placeholder: '\u56FE\u7247alt', value: this.state.imgAlt, onChange: this.set.bind(this, 'imgAlt') })
                        ),
                        _react2.default.createElement(
                            _reactBootstrap.FormGroup,
                            { controlId: 'formInlineName', className: 'm-r10' },
                            _react2.default.createElement(_reactBootstrap.FormControl, { type: 'file', name: 'file', id: 'file', multiple: 'true', onChange: this._confirmMedia.bind(this) })
                        )
                    ),
                    _react2.default.createElement(
                        'button',
                        { onMouseDown: this.promptForLink,
                            style: { marginRight: 10 } },
                        '\u6DFB\u52A0\u94FE\u63A5'
                    ),
                    _react2.default.createElement(
                        'button',
                        { onMouseDown: this.removeLink },
                        '\u79FB\u9664\u94FE\u63A5'
                    )
                ),
                urlInput,
                _react2.default.createElement(
                    'div',
                    { className: className, onClick: this.focus },
                    _react2.default.createElement(Editor, {
                        customStyleMap: styleMap,
                        blockStyleFn: getBlockStyle,
                        blockRendererFn: mediaBlockRenderer,
                        editorState: editorState,
                        handleKeyCommand: this.handleKeyCommand,
                        onChange: this.onChange,
                        placeholder: '\u8BF7\u7F16\u8F91...',
                        ref: 'editor',
                        spellCheck: true
                    })
                )
            ),
            _react2.default.createElement(
                _reactBootstrap.Button,
                { bsStyle: 'default', className: 'm-t10 m-b40', type: 'button', onClick: this.logState },
                '\u786E\u5B9A'
            )
        );
    };

    return MediaEditorExample;
}(_react.Component);

function getBlockStyle(block) {
    switch (block.getType()) {
        case 'blockquote':
            return 'RichEditor-blockquote';
        default:
            return null;
    }
}
var BLOCK_TYPES = [{ label: 'H4', style: 'header-four' }, { label: 'H5', style: 'header-five' }, { label: 'UL', style: 'unordered-list-item' }, { label: 'OL', style: 'ordered-list-item'
    // {label: 'Blockquote', style: 'blockquote'},
    // {label: 'Code Block', style: 'code-block'},
}];
var BlockStyleControls = function BlockStyleControls(props) {
    var editorState = props.editorState;

    var selection = editorState.getSelection();
    var blockType = editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();

    return _react2.default.createElement(
        'div',
        { className: 'RichEditor-controls' },
        _react2.default.createElement(
            'b',
            null,
            '\u6807\u7B7E\uFF1A'
        ),
        BLOCK_TYPES.map(function (type) {
            return _react2.default.createElement(StyleButton, {
                key: type.label,
                active: type.style === blockType,
                label: type.label,
                onToggle: props.onToggle,
                style: type.style
            });
        })
    );
};
var INLINE_STYLES = [{ label: '粗体', style: 'BOLD' }, { label: '斜体', style: 'ITALIC' },
/*{label:'漫画体',style:'STRIKETHROUGH'},*/
{ label: '下划线', style: 'UNDERLINE' }, { label: '居中', style: 'CENTER' }];
var InlineStyleControls = function InlineStyleControls(props) {
    var currentStyle = props.editorState.getCurrentInlineStyle();
    return _react2.default.createElement(
        'div',
        { className: 'RichEditor-controls' },
        _react2.default.createElement(
            'b',
            null,
            '\u6837\u5F0F\uFF1A'
        ),
        INLINE_STYLES.map(function (type) {
            return _react2.default.createElement(StyleButton, {
                key: type.label,
                active: currentStyle.has(type.style),
                label: type.label,
                onToggle: props.onToggle,
                style: type.style
            });
        })
    );
};
//media images
function mediaBlockRenderer(block) {
    if (block.getType() === 'atomic') {
        return {
            component: Media,
            editable: false
        };
    }
    return null;
}
var Image = function Image(props) {
    return _react2.default.createElement('img', { src: props.src });
};
var Media = function Media(props) {
    var entity = Entity.get(props.block.getEntityAt(0));

    var _entity$getData = entity.getData(),
        src = _entity$getData.src;

    var type = entity.getType();

    var media = void 0;
    if (type === 'audio') {
        media = _react2.default.createElement(Audio, { src: src });
    } else if (type === 'image') {
        media = _react2.default.createElement(Image, { src: src });
    } else if (type === 'video') {
        media = _react2.default.createElement(Video, { src: src });
    }

    return media;
};
//link
function findLinkEntities(contentBlock, callback) {
    contentBlock.findEntityRanges(function (character) {
        var entityKey = character.getEntity();
        return entityKey !== null && Entity.get(entityKey).getType() === 'LINK';
    }, callback);
}
var Link = function Link(props) {
    var _Entity$get$getData = Entity.get(props.entityKey).getData(),
        url = _Entity$get$getData.url;

    return _react2.default.createElement(
        'a',
        { href: url, style: styles.link },
        props.children
    );
};

var StyleButton = function (_React$Component) {
    (0, _inherits3.default)(StyleButton, _React$Component);

    function StyleButton() {
        (0, _classCallCheck3.default)(this, StyleButton);

        var _this4 = (0, _possibleConstructorReturn3.default)(this, _React$Component.call(this));

        _this4.onToggle = function (e) {
            e.preventDefault();
            _this4.props.onToggle(_this4.props.style);
        };
        return _this4;
    }

    StyleButton.prototype.render = function render() {
        var className = 'RichEditor-styleButton';
        if (this.props.active) {
            className += ' RichEditor-activeButton';
        }
        return _react2.default.createElement(
            'span',
            { className: className, onMouseDown: this.onToggle },
            this.props.label
        );
    };

    return StyleButton;
}(_react2.default.Component);
//color


var StyleButton_color = function (_Component2) {
    (0, _inherits3.default)(StyleButton_color, _Component2);

    function StyleButton_color(props) {
        (0, _classCallCheck3.default)(this, StyleButton_color);

        var _this5 = (0, _possibleConstructorReturn3.default)(this, _Component2.call(this, props));

        _this5.onToggle = function (e) {
            e.preventDefault();
            _this5.props.onToggle(_this5.props.style);
        };
        return _this5;
    }

    StyleButton_color.prototype.render = function render() {
        var style = void 0;
        if (this.props.active) {
            style = (0, _extends3.default)({}, styles.styleButton, colorStyleMap[this.props.style]);
        } else {
            style = styles.styleButton;
        }

        return _react2.default.createElement(
            'span',
            { style: style, onMouseDown: this.onToggle },
            this.props.label
        );
    };

    return StyleButton_color;
}(_react.Component);

var COLORS = [{ label: '红色', style: 'red' }, { label: '黄色', style: 'yellow' }, { label: '蓝色', style: 'blue' }];
var ColorControls = function ColorControls(props) {
    var currentStyle = props.editorState.getCurrentInlineStyle();
    return _react2.default.createElement(
        'div',
        { style: styles.controls },
        _react2.default.createElement(
            'b',
            null,
            '\u989C\u8272\uFF1A'
        ),
        COLORS.map(function (type) {
            return _react2.default.createElement(StyleButton_color, {
                key: type.label,
                active: currentStyle.has(type.style),
                label: type.label,
                onToggle: props.onToggle,
                style: type.style
            });
        })
    );
};
var colorStyleMap = {
    red: {
        color: 'rgba(255, 0, 0, 1.0)'
    },
    orange: {
        color: 'rgba(255, 127, 0, 1.0)'
    },
    yellow: {
        color: 'rgba(180, 180, 0, 1.0)'
    },
    green: {
        color: 'rgba(0, 180, 0, 1.0)'
    },
    blue: {
        color: 'rgba(0, 0, 255, 1.0)'
    },
    indigo: {
        color: 'rgba(75, 0, 130, 1.0)'
    },
    violet: {
        color: 'rgba(127, 0, 255, 1.0)'
    }
};

//font-family

var StyleButton_font = function (_Component3) {
    (0, _inherits3.default)(StyleButton_font, _Component3);

    function StyleButton_font(props) {
        (0, _classCallCheck3.default)(this, StyleButton_font);

        var _this6 = (0, _possibleConstructorReturn3.default)(this, _Component3.call(this, props));

        _this6.onToggle = function (e) {
            e.preventDefault();
            _this6.props.onToggle(_this6.props.style);
        };
        return _this6;
    }

    StyleButton_font.prototype.render = function render() {
        var style = void 0;
        if (this.props.active) {
            style = (0, _extends3.default)({}, styles.styleButton, { color: '#3b5998' });
        } else {
            style = styles.styleButton;
        }

        return _react2.default.createElement(
            'span',
            { style: style, onMouseDown: this.onToggle },
            this.props.label
        );
    };

    return StyleButton_font;
}(_react.Component);

var FONTS = [{ label: '雅黑', style: 'yahei' }];

var fontStyleMap = {
    yahei: {
        fontFamily: 'Microsoft YaHei'
    },
    SimSun: {
        fontFamily: 'SimSun'
    },
    SimHei: {
        fontFamily: 'SimHei'
    },
    arial: {
        fontFamily: 'arial'
    }
};

var FontControls = function FontControls(props) {
    var currentStyle = props.editorState.getCurrentInlineStyle();
    return _react2.default.createElement(
        'div',
        { style: styles.controls },
        _react2.default.createElement(
            'b',
            null,
            '\u5B57\u4F53\uFF1A'
        ),
        FONTS.map(function (type) {
            return _react2.default.createElement(StyleButton_font, {
                key: type.label,
                active: currentStyle.has(type.style),
                label: type.label,
                onToggle: props.onToggle,
                style: type.style
            });
        })
    );
};
//line-height

var StyleButton_line = function (_Component4) {
    (0, _inherits3.default)(StyleButton_line, _Component4);

    function StyleButton_line(props) {
        (0, _classCallCheck3.default)(this, StyleButton_line);

        var _this7 = (0, _possibleConstructorReturn3.default)(this, _Component4.call(this, props));

        _this7.onToggle = function (e) {
            e.preventDefault();
            _this7.props.onToggle(_this7.props.style);
        };
        return _this7;
    }

    StyleButton_line.prototype.render = function render() {
        var style = void 0;
        if (this.props.active) {
            style = (0, _extends3.default)({}, styles.styleButton, { color: '#3b5998' });
        } else {
            style = styles.styleButton;
        }

        return _react2.default.createElement(
            'span',
            { style: style, onMouseDown: this.onToggle },
            this.props.label
        );
    };

    return StyleButton_line;
}(_react.Component);

var LINE = [{ label: '1.5倍', style: 'line1' }, { label: '2倍', style: 'line2' }, { label: '3倍', style: 'line3' }];

var lineStyleMap = {
    line1: {
        lineHeight: '1.5'
    },
    line2: {
        lineHeight: '2'
    },
    line3: {
        lineHeight: '3'
    }
};

var LineControls = function LineControls(props) {
    var currentStyle = props.editorState.getCurrentInlineStyle();
    return _react2.default.createElement(
        'div',
        { style: styles.controls },
        _react2.default.createElement(
            'b',
            null,
            '\u884C\u8DDD\uFF1A'
        ),
        LINE.map(function (type) {
            return _react2.default.createElement(StyleButton_line, {
                key: type.label,
                active: currentStyle.has(type.style),
                label: type.label,
                onToggle: props.onToggle,
                style: type.style
            });
        })
    );
};

var styleMap = (0, _extends3.default)({}, colorStyleMap, fontStyleMap, lineStyleMap);

var styles = {
    root: {
        fontFamily: '\'Georgia\', serif',
        padding: 20,
        width: 600
    },
    buttons: {
        marginBottom: 10
    },
    urlInputContainer: {
        marginBottom: 10
    },
    urlInput: {
        fontFamily: '\'Georgia\', serif',
        marginRight: 10,
        padding: 3
    },
    editor: {
        border: '1px solid #ccc',
        cursor: 'text',
        minHeight: 80,
        padding: 10
    },
    button: {
        marginTop: 10,
        textAlign: 'center'
    },
    link: {
        color: '#3b5998',
        textDecoration: 'underline'
    },
    controls: {
        fontFamily: '\'Helvetica\', sans-serif',
        fontSize: 14,
        marginBottom: 10,
        userSelect: 'none'
    },
    styleButton: {
        color: '#999',
        cursor: 'pointer',
        marginRight: 16,
        padding: '2px 0'
    }
};

function mapStateToProps(state) {
    return {
        editor: state.editor
    };
}
//将action的所有方法绑定到props上
function mapDispatchToProps(dispatch) {
    return (0, _redux.bindActionCreators)(_editor2.default, dispatch);
}

//通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)((0, _reactRouter.withRouter)(MediaEditorExample));
//# sourceMappingURL=Editor.js.map
