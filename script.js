!function e(t,i,a){function n(l,s){if(!i[l]){if(!t[l]){var c="function"==typeof require&&require;if(!s&&c)return c(l,!0);if(r)return r(l,!0);var p=new Error("Cannot find module '"+l+"'");throw p.code="MODULE_NOT_FOUND",p}var o=i[l]={exports:{}};t[l][0].call(o.exports,function(e){var i=t[l][1][e];return n(i?i:e)},o,o.exports,e,t,i,a)}return i[l].exports}for(var r="function"==typeof require&&require,l=0;l<a.length;l++)n(a[l]);return n}({1:[function(e,t,i){function a(e,t,i,a){var h=e?r(e):0;return c(h)||(e=o(e),h=e.length),i="number"!=typeof i||a&&s(t,i,a)?0:0>i?u(h+i,0):i||0,"string"==typeof e||!l(e)&&p(e)?h>=i&&e.indexOf(t,i)>-1:!!h&&n(e,t,i)>-1}var n=e("../internal/baseIndexOf"),r=e("../internal/getLength"),l=e("../lang/isArray"),s=e("../internal/isIterateeCall"),c=e("../internal/isLength"),p=e("../lang/isString"),o=e("../object/values"),u=Math.max;t.exports=a},{"../internal/baseIndexOf":2,"../internal/getLength":5,"../internal/isIterateeCall":10,"../internal/isLength":11,"../lang/isArray":15,"../lang/isString":19,"../object/values":22}],2:[function(e,t,i){function a(e,t,i){if(t!==t)return n(e,i);for(var a=i-1,r=e.length;++a<r;)if(e[a]===t)return a;return-1}var n=e("./indexOfNaN");t.exports=a},{"./indexOfNaN":7}],3:[function(e,t,i){function a(e){return function(t){return null==t?void 0:t[e]}}t.exports=a},{}],4:[function(e,t,i){function a(e,t){for(var i=-1,a=t.length,n=Array(a);++i<a;)n[i]=e[t[i]];return n}t.exports=a},{}],5:[function(e,t,i){var a=e("./baseProperty"),n=a("length");t.exports=n},{"./baseProperty":3}],6:[function(e,t,i){function a(e,t){var i=null==e?void 0:e[t];return n(i)?i:void 0}var n=e("../lang/isNative");t.exports=a},{"../lang/isNative":17}],7:[function(e,t,i){function a(e,t,i){for(var a=e.length,n=t+(i?0:-1);i?n--:++n<a;){var r=e[n];if(r!==r)return n}return-1}t.exports=a},{}],8:[function(e,t,i){function a(e){return null!=e&&r(n(e))}var n=e("./getLength"),r=e("./isLength");t.exports=a},{"./getLength":5,"./isLength":11}],9:[function(e,t,i){function a(e,t){return e="number"==typeof e||n.test(e)?+e:-1,t=null==t?r:t,e>-1&&e%1==0&&t>e}var n=/^\d+$/,r=9007199254740991;t.exports=a},{}],10:[function(e,t,i){function a(e,t,i){if(!l(i))return!1;var a=typeof t;if("number"==a?n(i)&&r(t,i.length):"string"==a&&t in i){var s=i[t];return e===e?e===s:s!==s}return!1}var n=e("./isArrayLike"),r=e("./isIndex"),l=e("../lang/isObject");t.exports=a},{"../lang/isObject":18,"./isArrayLike":8,"./isIndex":9}],11:[function(e,t,i){function a(e){return"number"==typeof e&&e>-1&&e%1==0&&n>=e}var n=9007199254740991;t.exports=a},{}],12:[function(e,t,i){function a(e){return!!e&&"object"==typeof e}t.exports=a},{}],13:[function(e,t,i){function a(e){for(var t=c(e),i=t.length,a=i&&e.length,p=!!a&&s(a)&&(r(e)||n(e)),u=-1,h=[];++u<i;){var d=t[u];(p&&l(d,a)||o.call(e,d))&&h.push(d)}return h}var n=e("../lang/isArguments"),r=e("../lang/isArray"),l=e("./isIndex"),s=e("./isLength"),c=e("../object/keysIn"),p=Object.prototype,o=p.hasOwnProperty;t.exports=a},{"../lang/isArguments":14,"../lang/isArray":15,"../object/keysIn":21,"./isIndex":9,"./isLength":11}],14:[function(e,t,i){function a(e){return r(e)&&n(e)&&s.call(e,"callee")&&!c.call(e,"callee")}var n=e("../internal/isArrayLike"),r=e("../internal/isObjectLike"),l=Object.prototype,s=l.hasOwnProperty,c=l.propertyIsEnumerable;t.exports=a},{"../internal/isArrayLike":8,"../internal/isObjectLike":12}],15:[function(e,t,i){var a=e("../internal/getNative"),n=e("../internal/isLength"),r=e("../internal/isObjectLike"),l="[object Array]",s=Object.prototype,c=s.toString,p=a(Array,"isArray"),o=p||function(e){return r(e)&&n(e.length)&&c.call(e)==l};t.exports=o},{"../internal/getNative":6,"../internal/isLength":11,"../internal/isObjectLike":12}],16:[function(e,t,i){function a(e){return n(e)&&s.call(e)==r}var n=e("./isObject"),r="[object Function]",l=Object.prototype,s=l.toString;t.exports=a},{"./isObject":18}],17:[function(e,t,i){function a(e){return null==e?!1:n(e)?o.test(c.call(e)):r(e)&&l.test(e)}var n=e("./isFunction"),r=e("../internal/isObjectLike"),l=/^\[object .+?Constructor\]$/,s=Object.prototype,c=Function.prototype.toString,p=s.hasOwnProperty,o=RegExp("^"+c.call(p).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");t.exports=a},{"../internal/isObjectLike":12,"./isFunction":16}],18:[function(e,t,i){function a(e){var t=typeof e;return!!e&&("object"==t||"function"==t)}t.exports=a},{}],19:[function(e,t,i){function a(e){return"string"==typeof e||n(e)&&s.call(e)==r}var n=e("../internal/isObjectLike"),r="[object String]",l=Object.prototype,s=l.toString;t.exports=a},{"../internal/isObjectLike":12}],20:[function(e,t,i){var a=e("../internal/getNative"),n=e("../internal/isArrayLike"),r=e("../lang/isObject"),l=e("../internal/shimKeys"),s=a(Object,"keys"),c=s?function(e){var t=null==e?void 0:e.constructor;return"function"==typeof t&&t.prototype===e||"function"!=typeof e&&n(e)?l(e):r(e)?s(e):[]}:l;t.exports=c},{"../internal/getNative":6,"../internal/isArrayLike":8,"../internal/shimKeys":13,"../lang/isObject":18}],21:[function(e,t,i){function a(e){if(null==e)return[];c(e)||(e=Object(e));var t=e.length;t=t&&s(t)&&(r(e)||n(e))&&t||0;for(var i=e.constructor,a=-1,p="function"==typeof i&&i.prototype===e,u=Array(t),h=t>0;++a<t;)u[a]=a+"";for(var d in e)h&&l(d,t)||"constructor"==d&&(p||!o.call(e,d))||u.push(d);return u}var n=e("../lang/isArguments"),r=e("../lang/isArray"),l=e("../internal/isIndex"),s=e("../internal/isLength"),c=e("../lang/isObject"),p=Object.prototype,o=p.hasOwnProperty;t.exports=a},{"../internal/isIndex":9,"../internal/isLength":11,"../lang/isArguments":14,"../lang/isArray":15,"../lang/isObject":18}],22:[function(e,t,i){function a(e){return n(e,r(e))}var n=e("../internal/baseValues"),r=e("./keys");t.exports=a},{"../internal/baseValues":4,"./keys":20}],23:[function(e,t,i){"use strict";function a(e,t){var i={};for(var a in e)t.indexOf(a)>=0||Object.prototype.hasOwnProperty.call(e,a)&&(i[a]=e[a]);return i}var n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var i=arguments[t];for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(e[a]=i[a])}return e};t.exports=React.createClass({displayName:"exports",handleChange:function(e){this.props.change(e)},render:function(){var e=this.props,t=(e.change,e.children,a(e,["change","children"]));return React.createElement("label",null,React.createElement("input",n({},t,{onChange:this.handleChange})),React.createElement("span",null,React.createElement("i",{className:"fa fa-check"}),this.props.children))}})},{}],24:[function(e,t,i){"use strict";var a={includes:e("lodash/collection/includes")},n=e("./FormCheckRadio");t.exports=React.createClass({displayName:"exports",_checkboxFilter:function(e){for(var t=React.findDOMNode(this).querySelectorAll('[name="'+e+'"]'),i=[],a=0;a<t.length;a++)t[a].checked&&i.push(t[a].value);return i},getInitialState:function(){return{activeField:"status"}},setStatusType:function(e){this.props.onStatusTypeChange(e.target.value)},setTypeFilter:function(e){var t=this._checkboxFilter("type");this.props.onConditionChange({type:t})},setFamilyFilter:function(e){var t=this._checkboxFilter("family");this.props.onConditionChange({family:t})},setRareFilter:function(e){var t=this._checkboxFilter("rare");t=t.map(function(e){return parseInt(e)}),this.props.onConditionChange({rare:t})},setNamesFilter:function(e){var t=React.findDOMNode(this.refs.names).value,i=[];i=t.length>0?t.split(","):[],this.props.onConditionChange({names:i})},selectAll:function(e){e.preventDefault();var t={};t[e.target.value]=this.props.config.labels[e.target.value],this.props.onConditionChange(t)},selectNone:function(e){e.preventDefault();var t={};t[e.target.value]=[],this.props.onConditionChange(t)},changeField:function(e){var t=e.currentTarget.getAttribute("data-field");this.setState(t==this.state.activeField?{activeField:null}:{activeField:t})},render:function(){var e=Object.keys(this.props.config.labels.statusType).map(function(e){return React.createElement(n,{key:e,type:"radio",name:"statusType",value:e,checked:this.props.condition.statusType==e,change:this.setStatusType},this.props.config.labels.statusType[e])}.bind(this)),t=this.props.config.labels.type.map(function(e){return React.createElement(n,{key:e,type:"checkbox",name:"type",value:e,checked:a.includes(this.props.condition.type,e),change:this.setTypeFilter},e)}.bind(this)),i=this.props.config.labels.family.map(function(e){return React.createElement(n,{key:e,type:"checkbox",name:"family",value:e,checked:a.includes(this.props.condition.family,e),change:this.setFamilyFilter},e)}.bind(this)),r=this.props.config.labels.rare.map(function(e){return React.createElement(n,{key:e,type:"checkbox",name:"rare",value:e,checked:a.includes(this.props.condition.rare,e),change:this.setRareFilter},"レア",e)}.bind(this));return React.createElement("form",{id:"status-form",className:"active-"+this.state.activeField},React.createElement("h2",null,"表示条件を変更"),React.createElement("fieldset",null,React.createElement("legend",{onClick:this.changeField,"data-field":"status"},"表示ステータス",React.createElement("i",{className:"fa fa-caret-down"})),React.createElement("div",{className:"fieldset-item"},e)),React.createElement("fieldset",null,React.createElement("legend",{onClick:this.changeField,"data-field":"narrowing"},"絞り込み",React.createElement("i",{className:"fa fa-caret-down"})),React.createElement("div",{className:"fieldset-item"},React.createElement("div",{className:"input-group"},React.createElement("h3",null,"刀種"),t,React.createElement("button",{value:"type",className:"btn-all",onClick:this.selectAll},"全選択"),React.createElement("button",{value:"type",className:"btn-none",onClick:this.selectNone},"全解除")),React.createElement("div",{className:"input-group"},React.createElement("h3",null,"刀派"),i,React.createElement("button",{value:"family",className:"btn-all",onClick:this.selectAll},"全選択"),React.createElement("button",{value:"family",className:"btn-none",onClick:this.selectNone},"全解除")),React.createElement("div",{className:"input-group"},React.createElement("h3",null,"レアリティ"),r,React.createElement("button",{value:"rare",className:"btn-all",onClick:this.selectAll},"全選択"),React.createElement("button",{value:"rare",className:"btn-none",onClick:this.selectNone},"全解除")))),React.createElement("fieldset",null,React.createElement("legend",{onClick:this.changeField,"data-field":"names"},"刀剣名指定",React.createElement("i",{className:"fa fa-caret-down"})),React.createElement("div",{className:"fieldset-item"},React.createElement("input",{type:"text",ref:"names",value:this.props.condition.names.join(","),placeholder:"半角カンマ区切り（空白なし）",onChange:this.setNamesFilter}),React.createElement("button",{value:"names",className:"btn-none",onClick:this.selectNone},"解除"))))}})},{"./FormCheckRadio":23,"lodash/collection/includes":1}],25:[function(e,t,i){"use strict";t.exports=React.createClass({displayName:"exports",render:function(){for(var e=[],t=100;t>0;t-=5)e.push(React.createElement("div",{className:"graph-back",key:t,"data-line":t}));return React.createElement("div",{id:"status-graph-back"},e)}})},{}],26:[function(e,t,i){"use strict";var a=(React.addons.CSSTransitionGroup,e("../data/help"));t.exports=React.createClass({displayName:"exports",closeHelp:function(e){e.preventDefault(),this.props.onCloseClick()},render:function(){return React.createElement("div",{id:"status-help",className:this.props.show?"help-show":"help-hide"},React.createElement("div",{className:"help-body",dangerouslySetInnerHTML:{__html:a}}),React.createElement("div",{className:"help-close"},React.createElement("a",{onClick:this.closeHelp},"ヘルプをとじる")))}})},{"../data/help":33}],27:[function(e,t,i){"use strict";var a=e("../data/status"),n=e("../config"),r=e("./tkrbStatus");React.render(React.createElement(r,{data:a,config:n}),document.getElementById("tkrb-status"))},{"../config":32,"../data/status":34,"./tkrbStatus":31}],28:[function(e,t,i){"use strict";var a={includes:e("lodash/collection/includes")};t.exports={FiltersMixin:{_typeFilter:function(e){return a.includes(this.props.condition.type,e.type)?!0:!1},_familyFilter:function(e){return e.family.indexOf("虎徹")>-1&&(e.family="虎徹"),"-"==e.family&&(e.family="その他"),a.includes(this.props.condition.family,e.family)?!0:!1},_rareFilter:function(e){return a.includes(this.props.condition.rare,e.rare)?!0:!1},_namesFilter:function(e){return a.includes(this.props.condition.names,e.name)?!0:!1}}}},{"lodash/collection/includes":1}],29:[function(e,t,i){"use strict";t.exports=React.createClass({displayName:"exports",render:function(){var e=this.props.item[this.props.statusType][this.props.name],t="";return t=e?e/this.props.maxStatus*100+"%":this.props.item.initial[this.props.name]/this.props.maxStatus*100+"%",React.createElement("div",{className:"status-bar "+this.props.name,style:{height:t},"data-status":e})}})},{}],30:[function(e,t,i){"use strict";var a=React.addons.CSSTransitionGroup,n={includes:e("lodash/collection/includes")},r=e("./statusBar"),l=e("./graphBack"),s=e("./mixins").FiltersMixin;t.exports=React.createClass({displayName:"exports",mixins:[s],render:function(){var e=this.props.data.map(function(e){if(this.props.condition.names.length>0){if(!this._namesFilter(e))return!1}else if(!this._typeFilter(e)||!this._familyFilter(e)||!this._rareFilter(e))return!1;var t=0,i=Object.keys(e[this.props.condition.statusType]).map(function(i){return n.includes(this.props.condition.status,i)?(t+=e[this.props.condition.statusType][i],React.createElement(r,{maxStatus:this.props.config.maxStatus,statusType:this.props.condition.statusType,item:e,name:i,key:i})):!1}.bind(this));return React.createElement("div",{className:"status-graph-item bars-"+i.length,key:e.id},React.createElement("div",{className:"status-bar-box"},React.createElement(a,{transitionName:"status-bar",transitionAppear:!0},i)),React.createElement("div",{className:"status-info-box"},React.createElement("p",{className:"info-name"},React.createElement("a",{href:e.url1,target:"_new"},e.name)),React.createElement("p",{className:"info-id"},"No. ",e.id),React.createElement("p",{className:"info-total"},"合計：",t)))}.bind(this));return React.createElement("div",{id:"status-graph"},React.createElement("div",{id:"status-graph-box"},React.createElement(a,{transitionName:"status-graph",transitionAppear:!0},e)),React.createElement(l,null))}})},{"./graphBack":25,"./mixins":28,"./statusBar":29,"lodash/collection/includes":1}],31:[function(e,t,i){"use strict";var a=e("./conditionalForm"),n=e("./statusGraph"),r=e("./helpModal");t.exports=React.createClass({displayName:"exports",getInitialState:function(){return{showHelp:!1,statusType:"initial",type:this.props.config.labels.type,family:this.props.config.labels.family,rare:this.props.config.labels.rare,names:this.props.config.labels.names,status:Object.keys(this.props.config.labels.status)}},handleStatusType:function(e){this.setState({statusType:e})},handleCondition:function(e){this.setState(e)},toggleHelp:function(e){e&&e.preventDefault(),this.setState({showHelp:!this.state.showHelp})},render:function(){return React.createElement("div",null,React.createElement("header",null,React.createElement("h1",null,"刀剣乱舞ぬるぬる動くステータス"),React.createElement("nav",null,React.createElement("ul",null,React.createElement("li",null,React.createElement("a",{onClick:this.toggleHelp},React.createElement("i",{className:"fa fa-question"}),"ヘルプ")),React.createElement("li",null,React.createElement("s",null,React.createElement("i",{className:"fa fa-github"}),"GitHub"))))),React.createElement(a,{onStatusTypeChange:this.handleStatusType,onConditionChange:this.handleCondition,onActiveFieldChange:this.handleActiveField,condition:this.state,data:this.props.data,config:this.props.config}),React.createElement(n,{condition:this.state,data:this.props.data,config:this.props.config}),React.createElement(r,{show:this.state.showHelp,onCloseClick:this.toggleHelp}))}})},{"./conditionalForm":24,"./helpModal":26,"./statusGraph":30}],32:[function(e,t,i){t.exports={maxStatus:100,labels:{statusType:{initial:"初期値",rankupMax:"特MAX"},type:["短刀","脇差","打刀","太刀","大太刀","槍","薙刀"],family:["三条","青江","粟田口","古備前","来","長船","左文字","兼定","堀川","虎徹","村正","その他"],status:{life:"生存",attack:"打撃",defence:"統率",speed:"機動",push:"衝力",critical:"必殺",search:"偵察",hide:"隠蔽"},rare:[1,2,3,4,5],names:[]}}},{}],33:[function(e,t,i){t.exports='<h2>【刀剣乱舞ぬるぬる動くステータス】の使い方</h2>\n<h3>注意！</h3>\n<ul>\n<li>各刀剣のステータス差をグラフにしてにらにら眺めようという邪な動機の元、作成しております。</li>\n<li>したがって攻略用には向きません。</li>\n<li>データは<a href="http://wikiwiki.jp/toulove/">刀剣乱舞攻略Wiki</a>様を参照いたしております。</li>\n<li>言うほどぬるぬるしてませんすみません…</li>\n<li>なにかございましたら、Twitterにて@kotorieclairまでリプお願いします。</li>\n</ul>\n<h3>グラフ</h3>\n<p>それぞれのバーにオンマウスすると、ステータス名と数値が表示されます。<br>\n左から 生存、打撃、統率、機動、衝力、必殺、偵察、隠蔽 です。<br>\n判明していないステータスに関しては、バーが半透明になります（2015年7月現在、博多藤四郎の偵察のみ）<br>\n刀剣名は<a href="http://wikiwiki.jp/toulove/">刀剣乱舞攻略Wiki</a>様の各刀剣個別ページにリンクされております。</p>\n<h3>表示ステータス</h3>\n<p>表示するステータスがどの時点のものかを選択できます。デフォルトでは初期値を表示。</p>\n<ul>\n<li>初期値…ドロップないしは鍛刀したばかりの初々しい頃のステータス</li>\n<li>特MAX…限界までバッキバキに上がった頼もしいステータス</li>\n</ul>\n<h3>絞り込み</h3>\n<p>刀剣男士を各種条件で絞り込み表示します。</p>\n<h4>刀種</h4>\n<p>刀剣男士を刀種で絞り込みます。デフォルトでは全刀種を表示。<br>\n選択可能な刀種…短刀、脇差、打刀、太刀、大太刀、槍、薙刀</p>\n<h4>刀派</h4>\n<p>刀剣男士を刀派で絞り込みます。デフォルトでは全刀派を表示。<br>\n選択可能な刀派…三条、青江、粟田口、古備前、来、長船、左文字、兼定、堀川、虎徹、村正、その他（＝刀派なし）</p>\n<h4>レアリティ</h4>\n<p>刀剣男士をレアリティで絞り込みます。デフォルトでは全レアリティを表示。<br>\n選択可能なレアリティ…レア1、レア2、レア3、レア4、レア5</p>\n<h3>刀剣名</h3>\n<p>刀剣男士を刀剣名で絞り込みます。絞り込みとの併用は不可。刀剣名への入力が優先されます。<br>\n刀剣名はフルネームで入力してください。一部ヒットはいたしません。<br>\n複数の刀剣名を入力する際には、刀剣名を半角カンマ(,)で区切ってください。例）三日月宗近,御手杵,へし切長谷部</p>\n<h3>予定している追加機能</h3>\n<ul>\n<li>刀剣名入力サジェスト</li>\n<li>現在の表示状態を刀剣名欄に反映するボタン</li>\n<li>ステータス値選択</li>\n<li>刀帳No.でソート</li>\n<li>ステータス値でソート</li>\n<li>特初期値モード</li>\n</ul>\n'},{}],34:[function(e,t,i){t.exports=[{id:3,name:"三日月宗近",url1:"http://wikiwiki.jp/toulove/?%BB%B0%C6%FC%B7%EE%BD%A1%B6%E1",url2:"http://wikiwiki.jp/toulove/?%BB%B0%C6%FC%B7%EE%BD%A1%B6%E1%20%C6%C3",rare:5,type:"太刀",family:"三条",slot:3,rankup:25,wideness:"狭",initial:{life:50,attack:50,defence:52,speed:31,push:40,critical:30,search:29,hide:29},rankupMax:{life:63,attack:72,defence:72,speed:37,push:55,critical:30,search:38,hide:35}},{id:5,name:"小狐丸",url1:"http://wikiwiki.jp/toulove/?%BE%AE%B8%D1%B4%DD",url2:"http://wikiwiki.jp/toulove/?%BE%AE%B8%D1%B4%DD%20%C6%C3",rare:3,type:"太刀",family:"三条",slot:2,rankup:25,wideness:"狭",initial:{life:44,attack:47,defence:48,speed:35,push:37,critical:28,search:30,hide:24},rankupMax:{life:58,attack:68,defence:69,speed:41,push:53,critical:28,search:38,hide:30}},{id:7,name:"石切丸",url1:"http://wikiwiki.jp/toulove/?%C0%D0%C0%DA%B4%DD",url2:"http://wikiwiki.jp/toulove/?%C0%D0%C0%DA%B4%DD%20%C6%C3",rare:3,type:"大太刀",family:"三条",slot:2,rankup:25,wideness:"広",initial:{life:60,attack:60,defence:52,speed:10,push:48,critical:32,search:10,hide:20},rankupMax:{life:72,attack:85,defence:68,speed:13,push:61,critical:32,search:15,hide:23}},{id:9,name:"岩融",url1:"http://wikiwiki.jp/toulove/?%B4%E4%CD%BB",url2:"http://wikiwiki.jp/toulove/?%B4%E4%CD%BB%20%C6%C3",rare:3,type:"薙刀",family:"三条",slot:2,rankup:25,wideness:"横",initial:{life:49,attack:48,defence:40,speed:29,push:45,critical:29,search:30,hide:30},rankupMax:{life:60,attack:68,defence:51,speed:42,push:61,critical:29,search:41,hide:35}},{id:11,name:"今剣",url1:"http://wikiwiki.jp/toulove/?%BA%A3%B7%F5",url2:"http://wikiwiki.jp/toulove/?%BA%A3%B7%F5%20%C6%C3",rare:1,type:"短刀",family:"三条",slot:1,rankup:20,wideness:"狭",initial:{life:26,attack:13,defence:26,speed:27,push:17,critical:45,search:35,hide:36},rankupMax:{life:33,attack:26,defence:38,speed:58,push:31,critical:45,search:49,hide:40}},{id:19,name:"にっかり青江",url1:"http://wikiwiki.jp/toulove/?%A4%CB%A4%C3%A4%AB%A4%EA%C0%C4%B9%BE",url2:"http://wikiwiki.jp/toulove/?%A4%CB%A4%C3%A4%AB%A4%EA%C0%C4%B9%BE%20%C6%C3",rare:2,type:"脇差",family:"青江",slot:2,rankup:25,wideness:"狭",initial:{life:30,attack:26,defence:28,speed:37,push:25,critical:40,search:41,hide:39},rankupMax:{life:39,attack:44,defence:46,speed:52,push:41,critical:40,search:55,hide:45}},{id:23,name:"鳴狐",url1:"http://wikiwiki.jp/toulove/?%CC%C4%B8%D1",url2:"http://wikiwiki.jp/toulove/?%CC%C4%B8%D1%20%C6%C3",rare:2,type:"打刀",family:"粟田口",slot:2,rankup:20,wideness:"狭",initial:{life:38,attack:38,defence:37,speed:38,push:29,critical:35,search:36,hide:36},rankupMax:{life:48,attack:58,defence:50,speed:51,push:53,critical:35,search:46,hide:41}},{id:25,name:"一期一振",url1:"http://wikiwiki.jp/toulove/?%B0%EC%B4%FC%B0%EC%BF%B6",url2:"http://wikiwiki.jp/toulove/?%B0%EC%B4%FC%B0%EC%BF%B6%20%C6%C3",rare:4,type:"太刀",family:"粟田口",slot:3,rankup:25,wideness:"狭",initial:{life:48,attack:49,defence:52,speed:30,push:42,critical:30,search:30,hide:25},rankupMax:{life:61,attack:70,defence:72,speed:36,push:57,critical:30,search:39,hide:31}},{id:27,name:"鯰尾藤四郎",url1:"http://wikiwiki.jp/toulove/?%F2%D0%C8%F8%C6%A3%BB%CD%CF%BA",url2:"http://wikiwiki.jp/toulove/?%F2%D0%C8%F8%C6%A3%BB%CD%CF%BA%20%C6%C3",rare:2,type:"脇差",family:"粟田口",slot:2,rankup:20,wideness:"狭",initial:{life:27,attack:27,defence:27,speed:33,push:25,critical:47,search:40,hide:41},rankupMax:{life:35,attack:45,defence:45,speed:48,push:40,critical:47,search:52,hide:46}},{id:29,name:"骨喰藤四郎",url1:"http://wikiwiki.jp/toulove/?%B9%FC%B6%F4%C6%A3%BB%CD%CF%BA",url2:"http://wikiwiki.jp/toulove/?%B9%FC%B6%F4%C6%A3%BB%CD%CF%BA%20%C6%C3",rare:2,type:"脇差",family:"粟田口",slot:2,rankup:20,wideness:"狭",initial:{life:32,attack:28,defence:29,speed:40,push:22,critical:49,search:38,hide:38},rankupMax:{life:41,attack:47,defence:48,speed:54,push:36,critical:49,search:49,hide:43}},{id:31,name:"平野藤四郎",url1:"http://wikiwiki.jp/toulove/?%CA%BF%CC%EE%C6%A3%BB%CD%CF%BA",url2:"http://wikiwiki.jp/toulove/?%CA%BF%CC%EE%C6%A3%BB%CD%CF%BA%20%C6%C3",rare:1,type:"短刀",family:"粟田口",slot:1,rankup:20,wideness:"狭",initial:{life:28,attack:17,defence:29,speed:28,push:18,critical:37,search:34,hide:34},rankupMax:{life:34,attack:32,defence:45,speed:56,push:30,critical:37,search:48,hide:38}},{id:33,name:"厚藤四郎",url1:"http://wikiwiki.jp/toulove/?%B8%FC%C6%A3%BB%CD%CF%BA",url2:"http://wikiwiki.jp/toulove/?%B8%FC%C6%A3%BB%CD%CF%BA%20%C6%C3",rare:1,type:"短刀",family:"粟田口",slot:1,rankup:20,wideness:"狭",initial:{life:29,attack:18,defence:28,speed:29,push:16,critical:35,search:34,hide:34},rankupMax:{life:36,attack:32,defence:42,speed:58,push:30,critical:35,search:47,hide:38}},{id:39,name:"前田藤四郎",url1:"http://wikiwiki.jp/toulove/?%C1%B0%C5%C4%C6%A3%BB%CD%CF%BA",url2:"http://wikiwiki.jp/toulove/?%C1%B0%C5%C4%C6%A3%BB%CD%CF%BA%20%C6%C3",rare:1,type:"短刀",family:"粟田口",slot:1,rankup:20,wideness:"狭",initial:{life:29,attack:18,defence:28,speed:23,push:14,critical:37,search:34,hide:34},rankupMax:{life:36,attack:31,defence:41,speed:52,push:30,critical:37,search:48,hide:38}},{id:41,name:"秋田藤四郎",url1:"http://wikiwiki.jp/toulove/?%BD%A9%C5%C4%C6%A3%BB%CD%CF%BA",url2:"http://wikiwiki.jp/toulove/?%BD%A9%C5%C4%C6%A3%BB%CD%CF%BA%20%C6%C3",rare:1,type:"短刀",family:"粟田口",slot:1,rankup:20,wideness:"狭",initial:{life:27,attack:15,defence:29,speed:24,push:18,critical:38,search:34,hide:34},rankupMax:{life:33,attack:30,defence:42,speed:52,push:33,critical:38,search:46,hide:38}},{id:43,name:"博多藤四郎",url1:"http://wikiwiki.jp/toulove/?%C7%EE%C2%BF%C6%A3%BB%CD%CF%BA",url2:"http://wikiwiki.jp/toulove/?%C7%EE%C2%BF%C6%A3%BB%CD%CF%BA%20%C6%C3",rare:1,type:"短刀",family:"粟田口",slot:1,rankup:20,wideness:"狭",initial:{life:29,attack:15,defence:23,speed:22,push:16,critical:33,search:33,hide:34},rankupMax:{life:35,attack:30,defence:38,speed:64,push:31,critical:33,search:51,hide:38}},{id:45,name:"乱藤四郎",url1:"http://wikiwiki.jp/toulove/?%CD%F0%C6%A3%BB%CD%CF%BA",url2:"http://wikiwiki.jp/toulove/?%CD%F0%C6%A3%BB%CD%CF%BA%20%C6%C3",rare:1,type:"短刀",family:"粟田口",slot:1,rankup:20,wideness:"狭",initial:{life:28,attack:18,defence:25,speed:25,push:17,critical:35,search:35,hide:35},rankupMax:{life:35,attack:31,defence:40,speed:55,push:30,critical:35,search:49,hide:39}},{id:47,name:"五虎退",url1:"http://wikiwiki.jp/toulove/?%B8%DE%B8%D7%C2%E0",url2:"http://wikiwiki.jp/toulove/?%B8%DE%B8%D7%C2%E0%20%C6%C3",rare:1,type:"短刀",family:"粟田口",slot:1,rankup:20,wideness:"狭",initial:{life:27,attack:15,defence:27,speed:25,push:16,critical:40,search:35,hide:35},rankupMax:{life:33,attack:27,defence:39,speed:58,push:29,critical:40,search:48,hide:39}},{id:49,name:"薬研藤四郎",url1:"http://wikiwiki.jp/toulove/?%CC%F4%B8%A6%C6%A3%BB%CD%CF%BA",url2:"http://wikiwiki.jp/toulove/?%CC%F4%B8%A6%C6%A3%BB%CD%CF%BA%20%C6%C3",rare:1,type:"短刀",family:"粟田口",slot:1,rankup:20,wideness:"狭",initial:{life:27,attack:14,defence:29,speed:23,push:17,critical:40,search:35,hide:35},rankupMax:{life:34,attack:28,defence:42,speed:53,push:31,critical:40,search:47,hide:39}},{id:55,name:"鶯丸",url1:"http://wikiwiki.jp/toulove/?%F2%F4%B4%DD",url2:"http://wikiwiki.jp/toulove/?%F2%F4%B4%DD%20%C6%C3",rare:4,type:"太刀",family:"古備前",slot:3,rankup:25,wideness:"狭",initial:{life:50,attack:51,defence:48,speed:31,push:39,critical:28,search:30,hide:27},rankupMax:{life:64,attack:71,defence:69,speed:37,push:55,critical:28,search:38,hide:33}},{id:57,name:"明石国行",url1:"http://wikiwiki.jp/toulove/?%CC%C0%C0%D0%B9%F1%B9%D4",url2:"http://wikiwiki.jp/toulove/?%CC%C0%C0%D0%B9%F1%B9%D4%20%C6%C3",rare:3,type:"太刀",family:"来",slot:2,rankup:25,wideness:"狭",initial:{life:42,attack:43,defence:47,speed:43,push:32,critical:26,search:30,hide:30},rankupMax:{life:56,attack:63,defence:67,speed:49,push:47,critical:26,search:41,hide:36}},{id:59,name:"蛍丸",url1:"http://wikiwiki.jp/toulove/?%B7%D6%B4%DD",url2:"http://wikiwiki.jp/toulove/?%B7%D6%B4%DD%20%C6%C3",rare:4,type:"大太刀",family:"来",slot:3,rankup:25,wideness:"広",initial:{life:60,attack:57,defence:57,speed:15,push:48,critical:29,search:14,hide:25},rankupMax:{life:73,attack:81,defence:74,speed:18,push:60,critical:29,search:18,hide:28}},{id:61,name:"愛染国俊",url1:"http://wikiwiki.jp/toulove/?%B0%A6%C0%F7%B9%F1%BD%D3",url2:"http://wikiwiki.jp/toulove/?%B0%A6%C0%F7%B9%F1%BD%D3%20%C6%C3",rare:1,type:"短刀",family:"来",slot:1,rankup:20,wideness:"狭",initial:{life:29,attack:13,defence:24,speed:32,push:18,critical:39,search:34,hide:35},rankupMax:{life:35,attack:27,defence:38,speed:61,push:32,critical:39,search:47,hide:39}},{id:65,name:"蜻蛉切",url1:"http://wikiwiki.jp/toulove/?%E9%F1%E9%D9%C0%DA",url2:"http://wikiwiki.jp/toulove/?%E9%F1%E9%D9%C0%DA%20%C6%C3",rare:3,type:"槍",family:"村正",slot:2,rankup:25,wideness:"縦",initial:{life:62,attack:56,defence:53,speed:12,push:48,critical:30,search:12,hide:28},rankupMax:{life:73,attack:76,defence:63,speed:27,push:63,critical:30,search:21,hide:33}},{id:73,name:"燭台切光忠",url1:"http://wikiwiki.jp/toulove/?%BF%A4%C2%E6%C0%DA%B8%F7%C3%E9",url2:"http://wikiwiki.jp/toulove/?%BF%A4%C2%E6%C0%DA%B8%F7%C3%E9%20%C6%C3",rare:3,type:"太刀",family:"長船",slot:2,rankup:25,wideness:"狭",initial:{life:52,attack:51,defence:51,speed:28,push:38,critical:30,search:28,hide:24},rankupMax:{life:65,attack:73,defence:72,speed:34,push:53,critical:30,search:37,hide:30}},{id:79,name:"江雪左文字",url1:"http://wikiwiki.jp/toulove/?%B9%BE%C0%E3%BA%B8%CA%B8%BB%FA",url2:"http://wikiwiki.jp/toulove/?%B9%BE%C0%E3%BA%B8%CA%B8%BB%FA%20%C6%C3",rare:4,type:"太刀",family:"左文字",slot:3,rankup:25,wideness:"狭",initial:{life:51,attack:51,defence:49,speed:31,push:41,critical:30,search:27,hide:26},rankupMax:{life:65,attack:72,defence:70,speed:37,push:57,critical:30,search:35,hide:32}},{id:81,name:"宗三左文字",url1:"http://wikiwiki.jp/toulove/?%BD%A1%BB%B0%BA%B8%CA%B8%BB%FA",url2:"http://wikiwiki.jp/toulove/?%BD%A1%BB%B0%BA%B8%CA%B8%BB%FA%20%C6%C3",rare:2,type:"打刀",family:"左文字",slot:2,rankup:20,wideness:"狭",initial:{life:32,attack:34,defence:34,speed:33,push:26,critical:30,search:33,hide:34},rankupMax:{life:42,attack:53,defence:47,speed:46,push:49,critical:30,search:42,hide:39}},{id:83,name:"小夜左文字",url1:"http://wikiwiki.jp/toulove/?%BE%AE%CC%EB%BA%B8%CA%B8%BB%FA",url2:"http://wikiwiki.jp/toulove/?%BE%AE%CC%EB%BA%B8%CA%B8%BB%FA%20%C6%C3",rare:1,type:"短刀",family:"左文字",slot:1,rankup:20,wideness:"狭",initial:{life:32,attack:20,defence:29,speed:20,push:16,critical:42,search:35,hide:35},rankupMax:{life:39,attack:33,defence:44,speed:49,push:30,critical:42,search:47,hide:39}},{id:85,name:"加州清光",url1:"http://wikiwiki.jp/toulove/?%B2%C3%BD%A3%C0%B6%B8%F7",url2:"http://wikiwiki.jp/toulove/?%B2%C3%BD%A3%C0%B6%B8%F7%20%C6%C3",rare:2,type:"打刀",family:"-",slot:2,rankup:20,wideness:"狭",initial:{life:33,attack:34,defence:36,speed:37,push:26,critical:41,search:36,hide:37},rankupMax:{life:43,attack:55,defence:50,speed:51,push:50,critical:41,search:46,hide:42}},{id:87,name:"大和守安定",url1:"http://wikiwiki.jp/toulove/?%C2%E7%CF%C2%BC%E9%B0%C2%C4%EA",url2:"http://wikiwiki.jp/toulove/?%C2%E7%CF%C2%BC%E9%B0%C2%C4%EA%20%C6%C3",rare:2,type:"打刀",family:"-",slot:2,rankup:20,wideness:"狭",initial:{life:37,attack:37,defence:34,speed:33,push:26,critical:38,search:34,hide:34},rankupMax:{life:47,attack:56,defence:50,speed:49,push:49,critical:38,search:43,hide:39}},{id:89,name:"歌仙兼定",url1:"http://wikiwiki.jp/toulove/?%B2%CE%C0%E7%B7%F3%C4%EA",url2:"http://wikiwiki.jp/toulove/?%B2%CE%C0%E7%B7%F3%C4%EA%20%C6%C3",rare:2,type:"打刀",family:"兼定",slot:2,rankup:20,wideness:"狭",initial:{life:35,attack:39,defence:35,speed:36,push:26,critical:30,search:33,hide:34},rankupMax:{life:46,attack:59,defence:50,speed:50,push:51,critical:30,search:42,hide:39}},{id:91,name:"和泉守兼定",url1:"http://wikiwiki.jp/toulove/?%CF%C2%C0%F4%BC%E9%B7%F3%C4%EA",url2:"http://wikiwiki.jp/toulove/?%CF%C2%C0%F4%BC%E9%B7%F3%C4%EA%20%C6%C3",rare:3,type:"打刀",family:"兼定",slot:2,rankup:25,wideness:"狭",initial:{life:50,attack:49,defence:48,speed:30,push:40,critical:35,search:30,hide:25},rankupMax:{life:64,attack:70,defence:69,speed:36,push:56,critical:35,search:38,hide:31}},{id:93,name:"陸奥守吉行",url1:"http://wikiwiki.jp/toulove/?%CE%A6%B1%FC%BC%E9%B5%C8%B9%D4",url2:"http://wikiwiki.jp/toulove/?%CE%A6%B1%FC%BC%E9%B5%C8%B9%D4%20%C6%C3",rare:2,type:"打刀",family:"-",slot:2,rankup:20,wideness:"狭",initial:{life:36,attack:40,defence:34,speed:33,push:28,critical:34,search:35,hide:35},rankupMax:{life:47,attack:61,defence:47,speed:47,push:53,critical:34,search:44,hide:40}},{id:95,name:"山姥切国広",url1:"http://wikiwiki.jp/toulove/?%BB%B3%B1%B8%C0%DA%B9%F1%B9%AD",url2:"http://wikiwiki.jp/toulove/?%BB%B3%B1%B8%C0%DA%B9%F1%B9%AD%20%C6%C3",rare:2,type:"打刀",family:"堀川",slot:2,rankup:20,wideness:"狭",initial:{life:34,attack:36,defence:36,speed:39,push:28,critical:35,search:35,hide:36},rankupMax:{life:44,attack:58,defence:49,speed:52,push:55,critical:35,search:45,hide:41}},{id:97,name:"山伏国広",url1:"http://wikiwiki.jp/toulove/?%BB%B3%C9%FA%B9%F1%B9%AD",url2:"http://wikiwiki.jp/toulove/?%BB%B3%C9%FA%B9%F1%B9%AD%20%C6%C3",rare:3,type:"太刀",family:"堀川",slot:2,rankup:25,wideness:"狭",initial:{life:51,attack:51,defence:45,speed:31,push:36,critical:28,search:25,hide:24},rankupMax:{life:64,attack:72,defence:66,speed:37,push:52,critical:28,search:34,hide:30}},{id:99,name:"堀川国広",url1:"http://wikiwiki.jp/toulove/?%CB%D9%C0%EE%B9%F1%B9%AD",url2:"http://wikiwiki.jp/toulove/?%CB%D9%C0%EE%B9%F1%B9%AD%20%C6%C3",rare:2,type:"脇差",family:"堀川",slot:2,rankup:20,wideness:"狭",initial:{life:29,attack:28,defence:26,speed:36,push:20,critical:45,search:41,hide:41},rankupMax:{life:37,attack:47,defence:43,speed:50,push:36,critical:45,search:53,hide:46}},{id:101,name:"蜂須賀虎徹",url1:"http://wikiwiki.jp/toulove/?%CB%AA%BF%DC%B2%EC%B8%D7%C5%B0",url2:"http://wikiwiki.jp/toulove/?%CB%AA%BF%DC%B2%EC%B8%D7%C5%B0%20%C6%C3",rare:2,type:"打刀",family:"虎徹",slot:2,rankup:25,wideness:"狭",initial:{life:39,attack:38,defence:38,speed:36,push:27,critical:31,search:34,hide:35},rankupMax:{life:51,attack:60,defence:53,speed:52,push:54,critical:31,search:44,hide:41}},{id:103,name:"浦島虎徹",url1:"http://wikiwiki.jp/toulove/?%B1%BA%C5%E7%B8%D7%C5%B0",url2:"http://wikiwiki.jp/toulove/?%B1%BA%C5%E7%B8%D7%C5%B0%20%C6%C3",rare:2,type:"脇差",family:"虎徹",slot:2,rankup:20,wideness:"狭",initial:{life:34,attack:25,defence:30,speed:30,push:30,critical:40,search:45,hide:34},rankupMax:{life:45,attack:44,defence:50,speed:42,push:47,critical:40,search:53,hide:39}},{id:105,name:"長曽祢虎徹",
url1:"http://wikiwiki.jp/toulove/?%C4%B9%C1%BE%C7%AA%B8%D7%C5%B0",url2:"http://wikiwiki.jp/toulove/?%C4%B9%C1%BE%C7%AA%B8%D7%C5%B0%20%C6%C3",rare:2,type:"打刀",family:"虎徹…?",slot:2,rankup:20,wideness:"狭",initial:{life:45,attack:43,defence:38,speed:31,push:30,critical:30,search:35,hide:34},rankupMax:{life:57,attack:68,defence:53,speed:42,push:56,critical:30,search:42,hide:39}},{id:116,name:"大倶利伽羅",url1:"http://wikiwiki.jp/toulove/?%C2%E7%B6%E6%CD%F8%B2%C0%CD%E5",url2:"http://wikiwiki.jp/toulove/?%C2%E7%B6%E6%CD%F8%B2%C0%CD%E5%20%C6%C3",rare:3,type:"打刀",family:"-",slot:2,rankup:20,wideness:"狭",initial:{life:48,attack:48,defence:52,speed:29,push:43,critical:28,search:27,hide:27},rankupMax:{life:59,attack:69,defence:69,speed:33,push:56,critical:28,search:34,hide:31}},{id:118,name:"へし切長谷部",url1:"http://wikiwiki.jp/toulove/?%A4%D8%A4%B7%C0%DA%C4%B9%C3%AB%C9%F4",url2:"http://wikiwiki.jp/toulove/?%A4%D8%A4%B7%C0%DA%C4%B9%C3%AB%C9%F4%20%C6%C3",rare:2,type:"打刀",family:"-",slot:2,rankup:25,wideness:"狭",initial:{life:41,attack:42,defence:35,speed:42,push:30,critical:33,search:34,hide:34},rankupMax:{life:51,attack:61,defence:48,speed:57,push:54,critical:33,search:43,hide:38}},{id:122,name:"獅子王",url1:"http://wikiwiki.jp/toulove/?%BB%E2%BB%D2%B2%A6",url2:"http://wikiwiki.jp/toulove/?%BB%E2%BB%D2%B2%A6%20%C6%C3",rare:3,type:"太刀",family:"-",slot:2,rankup:25,wideness:"狭",initial:{life:45,attack:47,defence:49,speed:31,push:41,critical:28,search:25,hide:25},rankupMax:{life:59,attack:66,defence:72,speed:37,push:56,critical:28,search:33,hide:31}},{id:128,name:"同田貫正国",url1:"http://wikiwiki.jp/toulove/?%C6%B1%C5%C4%B4%D3%C0%B5%B9%F1",url2:"http://wikiwiki.jp/toulove/?%C6%B1%C5%C4%B4%D3%C0%B5%B9%F1%20%C6%C3",rare:3,type:"打刀",family:"-",slot:2,rankup:25,wideness:"狭",initial:{life:46,attack:52,defence:48,speed:30,push:40,critical:30,search:30,hide:25},rankupMax:{life:56,attack:69,defence:65,speed:33,push:55,critical:30,search:36,hide:28}},{id:130,name:"鶴丸国永",url1:"http://wikiwiki.jp/toulove/?%C4%E1%B4%DD%B9%F1%B1%CA",url2:"http://wikiwiki.jp/toulove/?%C4%E1%B4%DD%B9%F1%B1%CA%20%C6%C3",rare:4,type:"太刀",family:"-",slot:3,rankup:25,wideness:"狭",initial:{life:51,attack:51,defence:51,speed:31,push:38,critical:32,search:28,hide:26},rankupMax:{life:62,attack:69,defence:69,speed:34,push:51,critical:32,search:33,hide:29}},{id:132,name:"太郎太刀",url1:"http://wikiwiki.jp/toulove/?%C2%C0%CF%BA%C2%C0%C5%E1",url2:"http://wikiwiki.jp/toulove/?%C2%C0%CF%BA%C2%C0%C5%E1%20%C6%C3",rare:3,type:"大太刀",family:"-",slot:2,rankup:25,wideness:"広",initial:{life:62,attack:57,defence:57,speed:12,push:45,critical:26,search:13,hide:26},rankupMax:{life:76,attack:82,defence:77,speed:17,push:61,critical:26,search:20,hide:31}},{id:134,name:"次郎太刀",url1:"http://wikiwiki.jp/toulove/?%BC%A1%CF%BA%C2%C0%C5%E1",url2:"http://wikiwiki.jp/toulove/?%BC%A1%CF%BA%C2%C0%C5%E1%20%C6%C3",rare:3,type:"大太刀",family:"-",slot:2,rankup:25,wideness:"広",initial:{life:57,attack:60,defence:59,speed:11,push:43,critical:23,search:12,hide:30},rankupMax:{life:72,attack:84,defence:80,speed:16,push:58,critical:23,search:18,hide:35}},{id:138,name:"御手杵",url1:"http://wikiwiki.jp/toulove/?%B8%E6%BC%EA%B5%CF",url2:"http://wikiwiki.jp/toulove/?%B8%E6%BC%EA%B5%CF%20%C6%C3",rare:3,type:"槍",family:"-",slot:2,rankup:25,wideness:"縦",initial:{life:49,attack:50,defence:40,speed:28,push:46,critical:32,search:31,hide:28},rankupMax:{life:60,attack:69,defence:51,speed:42,push:62,critical:32,search:40,hide:33}}]},{}]},{},[27]);