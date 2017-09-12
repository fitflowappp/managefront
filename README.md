#react-redux例子
##环境
* nodejs > 5.0
* npm > 3.3
* ruby > 2.2
* gem > 2.4
* gem install sass
* gem install compass
* npm install -g webpack
* npm install -g babel-cli
* npm install -g grunt-cli
* npm install
* npm start

#部署

npm install -g pm2

export NODE_ENV=production

npm install

cd publish

pm2 start server.js -i max

重新加载
pm2 reload all
##所需技能
* ECMAscript6
http://es6.ruanyifeng.com/
* commonjs
* sass
* compass 需要ruby
http://compass-style.org/
* webpack
http://webpack.github.io/docs/tutorials/getting-started/
* style-loader
https://github.com/webpack/style-loader
* babel
https://github.com/babel/babel
* React
https://hulufei.gitbooks.io/react-tutorial/content/webpack.html
* react-helmet 页面meta库
https://github.com/nfl/react-helmet
* redux
http://redux.js.org/
http://camsong.github.io/redux-in-chinese/docs/introduction/Motivation.html
* react-redux
* redux-actions
https://github.com/acdlite/redux-actions
* react-router
https://github.com/reactjs/react-router
http://react-guide.github.io/react-router-cn/index.html
* axios ajax库
https://github.com/mzabriskie/axios
* isomorphic-style-loader ajax库 有兼容问题，不用
* react-bootstrap 不稳定版本，api未固定，功能一般
* react-bootstrap-validation form验证
* react-router-bootstrap 链接
* belle 兼容ie9 功能一般 https://github.com/nikgraf/belle/
* Material UI 好用，不兼容ie9,10,不考虑
* Draft.js Text Editor库 富文本编辑器
* FixedDataTable 表格组件 https://github.com/facebook/fixed-data-table facebook的表格组件，不是很好用，

