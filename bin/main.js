(function ($global) { "use strict";
var $hxClasses = {},$estr = function() { return js_Boot.__string_rec(this,''); },$hxEnums = $hxEnums || {},$_;
function $extend(from, fields) {
	var proto = Object.create(from);
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var common_Game = function() {
	this.interactive = new common_interactive_InteractiveSystem();
};
$hxClasses["common.Game"] = common_Game;
common_Game.__name__ = "common.Game";
common_Game.prototype = {
	setScene: function(scene) {
		scene.interactive = this.interactive;
		scene.game = this;
		scene.interactive.clear();
		this.currentScene = scene;
		this.currentScene.enter();
	}
	,__class__: common_Game
};
var AliceGame = function() {
	common_Game.call(this);
};
$hxClasses["AliceGame"] = AliceGame;
AliceGame.__name__ = "AliceGame";
AliceGame.__super__ = common_Game;
AliceGame.prototype = $extend(common_Game.prototype,{
	start: function() {
		var _gthis = this;
		var resolvedClass = $hxClasses["scenestates.Scene_1_Awake_State"];
		console.log("src/AliceGame.hx:14:",resolvedClass);
		common_scene_XmlScene.load("scenes/scene_0_choose_person.xml",function(scene) {
			_gthis.setScene(scene);
		});
	}
	,__class__: AliceGame
});
var EReg = function(r,opt) {
	this.r = new RegExp(r,opt.split("u").join(""));
};
$hxClasses["EReg"] = EReg;
EReg.__name__ = "EReg";
EReg.prototype = {
	match: function(s) {
		if(this.r.global) {
			this.r.lastIndex = 0;
		}
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
	,__class__: EReg
};
var HxOverrides = function() { };
$hxClasses["HxOverrides"] = HxOverrides;
HxOverrides.__name__ = "HxOverrides";
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) {
		return undefined;
	}
	return x;
};
HxOverrides.substr = function(s,pos,len) {
	if(len == null) {
		len = s.length;
	} else if(len < 0) {
		if(pos == 0) {
			len = s.length + len;
		} else {
			return "";
		}
	}
	return s.substr(pos,len);
};
HxOverrides.remove = function(a,obj) {
	var i = a.indexOf(obj);
	if(i == -1) {
		return false;
	}
	a.splice(i,1);
	return true;
};
HxOverrides.now = function() {
	return Date.now();
};
var Lambda = function() { };
$hxClasses["Lambda"] = Lambda;
Lambda.__name__ = "Lambda";
Lambda.exists = function(it,f) {
	var x = $getIterator(it);
	while(x.hasNext()) {
		var x1 = x.next();
		if(f(x1)) {
			return true;
		}
	}
	return false;
};
var Main = function() { };
$hxClasses["Main"] = Main;
Main.__name__ = "Main";
Main.main = function() {
	var game = new AliceGame();
	game.start();
};
Math.__name__ = "Math";
var Reflect = function() { };
$hxClasses["Reflect"] = Reflect;
Reflect.__name__ = "Reflect";
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( _g ) {
		return null;
	}
};
Reflect.getProperty = function(o,field) {
	var tmp;
	if(o == null) {
		return null;
	} else {
		var tmp1;
		if(o.__properties__) {
			tmp = o.__properties__["get_" + field];
			tmp1 = tmp;
		} else {
			tmp1 = false;
		}
		if(tmp1) {
			return o[tmp]();
		} else {
			return o[field];
		}
	}
};
Reflect.setProperty = function(o,field,value) {
	var tmp;
	var tmp1;
	if(o.__properties__) {
		tmp = o.__properties__["set_" + field];
		tmp1 = tmp;
	} else {
		tmp1 = false;
	}
	if(tmp1) {
		o[tmp](value);
	} else {
		o[field] = value;
	}
};
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(f != "__id__" && f != "hx__closures__" && hasOwnProperty.call(o,f)) {
			a.push(f);
		}
		}
	}
	return a;
};
Reflect.isFunction = function(f) {
	if(typeof(f) == "function") {
		return !(f.__name__ || f.__ename__);
	} else {
		return false;
	}
};
Reflect.compareMethods = function(f1,f2) {
	if(f1 == f2) {
		return true;
	}
	if(!Reflect.isFunction(f1) || !Reflect.isFunction(f2)) {
		return false;
	}
	if(f1.scope == f2.scope && f1.method == f2.method) {
		return f1.method != null;
	} else {
		return false;
	}
};
var Std = function() { };
$hxClasses["Std"] = Std;
Std.__name__ = "Std";
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
Std.parseInt = function(x) {
	if(x != null) {
		var _g = 0;
		var _g1 = x.length;
		while(_g < _g1) {
			var i = _g++;
			var c = x.charCodeAt(i);
			if(c <= 8 || c >= 14 && c != 32 && c != 45) {
				var nc = x.charCodeAt(i + 1);
				var v = parseInt(x,nc == 120 || nc == 88 ? 16 : 10);
				if(isNaN(v)) {
					return null;
				} else {
					return v;
				}
			}
		}
	}
	return null;
};
var StringBuf = function() {
	this.b = "";
};
$hxClasses["StringBuf"] = StringBuf;
StringBuf.__name__ = "StringBuf";
StringBuf.prototype = {
	__class__: StringBuf
};
var StringTools = function() { };
$hxClasses["StringTools"] = StringTools;
StringTools.__name__ = "StringTools";
StringTools.htmlEscape = function(s,quotes) {
	var buf_b = "";
	var _g_offset = 0;
	var _g_s = s;
	while(_g_offset < _g_s.length) {
		var s = _g_s;
		var index = _g_offset++;
		var c = s.charCodeAt(index);
		if(c >= 55296 && c <= 56319) {
			c = c - 55232 << 10 | s.charCodeAt(index + 1) & 1023;
		}
		var c1 = c;
		if(c1 >= 65536) {
			++_g_offset;
		}
		var code = c1;
		switch(code) {
		case 34:
			if(quotes) {
				buf_b += "&quot;";
			} else {
				buf_b += String.fromCodePoint(code);
			}
			break;
		case 38:
			buf_b += "&amp;";
			break;
		case 39:
			if(quotes) {
				buf_b += "&#039;";
			} else {
				buf_b += String.fromCodePoint(code);
			}
			break;
		case 60:
			buf_b += "&lt;";
			break;
		case 62:
			buf_b += "&gt;";
			break;
		default:
			buf_b += String.fromCodePoint(code);
		}
	}
	return buf_b;
};
StringTools.isSpace = function(s,pos) {
	var c = HxOverrides.cca(s,pos);
	if(!(c > 8 && c < 14)) {
		return c == 32;
	} else {
		return true;
	}
};
StringTools.ltrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,r)) ++r;
	if(r > 0) {
		return HxOverrides.substr(s,r,l - r);
	} else {
		return s;
	}
};
StringTools.rtrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,l - r - 1)) ++r;
	if(r > 0) {
		return HxOverrides.substr(s,0,l - r);
	} else {
		return s;
	}
};
StringTools.trim = function(s) {
	return StringTools.ltrim(StringTools.rtrim(s));
};
var Type = function() { };
$hxClasses["Type"] = Type;
Type.__name__ = "Type";
Type.createInstance = function(cl,args) {
	var ctor = Function.prototype.bind.apply(cl,[null].concat(args));
	return new (ctor);
};
var XmlType = {};
XmlType.toString = function(this1) {
	switch(this1) {
	case 0:
		return "Element";
	case 1:
		return "PCData";
	case 2:
		return "CData";
	case 3:
		return "Comment";
	case 4:
		return "DocType";
	case 5:
		return "ProcessingInstruction";
	case 6:
		return "Document";
	}
};
var Xml = function(nodeType) {
	this.nodeType = nodeType;
	this.children = [];
	this.attributeMap = new haxe_ds_StringMap();
};
$hxClasses["Xml"] = Xml;
Xml.__name__ = "Xml";
Xml.parse = function(str) {
	return haxe_xml_Parser.parse(str);
};
Xml.createElement = function(name) {
	var xml = new Xml(Xml.Element);
	if(xml.nodeType != Xml.Element) {
		throw haxe_Exception.thrown("Bad node type, expected Element but found " + (xml.nodeType == null ? "null" : XmlType.toString(xml.nodeType)));
	}
	xml.nodeName = name;
	return xml;
};
Xml.createPCData = function(data) {
	var xml = new Xml(Xml.PCData);
	if(xml.nodeType == Xml.Document || xml.nodeType == Xml.Element) {
		throw haxe_Exception.thrown("Bad node type, unexpected " + (xml.nodeType == null ? "null" : XmlType.toString(xml.nodeType)));
	}
	xml.nodeValue = data;
	return xml;
};
Xml.createCData = function(data) {
	var xml = new Xml(Xml.CData);
	if(xml.nodeType == Xml.Document || xml.nodeType == Xml.Element) {
		throw haxe_Exception.thrown("Bad node type, unexpected " + (xml.nodeType == null ? "null" : XmlType.toString(xml.nodeType)));
	}
	xml.nodeValue = data;
	return xml;
};
Xml.createComment = function(data) {
	var xml = new Xml(Xml.Comment);
	if(xml.nodeType == Xml.Document || xml.nodeType == Xml.Element) {
		throw haxe_Exception.thrown("Bad node type, unexpected " + (xml.nodeType == null ? "null" : XmlType.toString(xml.nodeType)));
	}
	xml.nodeValue = data;
	return xml;
};
Xml.createDocType = function(data) {
	var xml = new Xml(Xml.DocType);
	if(xml.nodeType == Xml.Document || xml.nodeType == Xml.Element) {
		throw haxe_Exception.thrown("Bad node type, unexpected " + (xml.nodeType == null ? "null" : XmlType.toString(xml.nodeType)));
	}
	xml.nodeValue = data;
	return xml;
};
Xml.createProcessingInstruction = function(data) {
	var xml = new Xml(Xml.ProcessingInstruction);
	if(xml.nodeType == Xml.Document || xml.nodeType == Xml.Element) {
		throw haxe_Exception.thrown("Bad node type, unexpected " + (xml.nodeType == null ? "null" : XmlType.toString(xml.nodeType)));
	}
	xml.nodeValue = data;
	return xml;
};
Xml.createDocument = function() {
	return new Xml(Xml.Document);
};
Xml.prototype = {
	get: function(att) {
		if(this.nodeType != Xml.Element) {
			throw haxe_Exception.thrown("Bad node type, expected Element but found " + (this.nodeType == null ? "null" : XmlType.toString(this.nodeType)));
		}
		return this.attributeMap.h[att];
	}
	,set: function(att,value) {
		if(this.nodeType != Xml.Element) {
			throw haxe_Exception.thrown("Bad node type, expected Element but found " + (this.nodeType == null ? "null" : XmlType.toString(this.nodeType)));
		}
		this.attributeMap.h[att] = value;
	}
	,exists: function(att) {
		if(this.nodeType != Xml.Element) {
			throw haxe_Exception.thrown("Bad node type, expected Element but found " + (this.nodeType == null ? "null" : XmlType.toString(this.nodeType)));
		}
		return Object.prototype.hasOwnProperty.call(this.attributeMap.h,att);
	}
	,attributes: function() {
		if(this.nodeType != Xml.Element) {
			throw haxe_Exception.thrown("Bad node type, expected Element but found " + (this.nodeType == null ? "null" : XmlType.toString(this.nodeType)));
		}
		return new haxe_ds__$StringMap_StringMapKeyIterator(this.attributeMap.h);
	}
	,elements: function() {
		if(this.nodeType != Xml.Document && this.nodeType != Xml.Element) {
			throw haxe_Exception.thrown("Bad node type, expected Element or Document but found " + (this.nodeType == null ? "null" : XmlType.toString(this.nodeType)));
		}
		var _g = [];
		var _g1 = 0;
		var _g2 = this.children;
		while(_g1 < _g2.length) {
			var child = _g2[_g1];
			++_g1;
			if(child.nodeType == Xml.Element) {
				_g.push(child);
			}
		}
		var ret = _g;
		return new haxe_iterators_ArrayIterator(ret);
	}
	,elementsNamed: function(name) {
		if(this.nodeType != Xml.Document && this.nodeType != Xml.Element) {
			throw haxe_Exception.thrown("Bad node type, expected Element or Document but found " + (this.nodeType == null ? "null" : XmlType.toString(this.nodeType)));
		}
		var _g = [];
		var _g1 = 0;
		var _g2 = this.children;
		while(_g1 < _g2.length) {
			var child = _g2[_g1];
			++_g1;
			var tmp;
			if(child.nodeType == Xml.Element) {
				if(child.nodeType != Xml.Element) {
					throw haxe_Exception.thrown("Bad node type, expected Element but found " + (child.nodeType == null ? "null" : XmlType.toString(child.nodeType)));
				}
				tmp = child.nodeName == name;
			} else {
				tmp = false;
			}
			if(tmp) {
				_g.push(child);
			}
		}
		var ret = _g;
		return new haxe_iterators_ArrayIterator(ret);
	}
	,firstElement: function() {
		if(this.nodeType != Xml.Document && this.nodeType != Xml.Element) {
			throw haxe_Exception.thrown("Bad node type, expected Element or Document but found " + (this.nodeType == null ? "null" : XmlType.toString(this.nodeType)));
		}
		var _g = 0;
		var _g1 = this.children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(child.nodeType == Xml.Element) {
				return child;
			}
		}
		return null;
	}
	,addChild: function(x) {
		if(this.nodeType != Xml.Document && this.nodeType != Xml.Element) {
			throw haxe_Exception.thrown("Bad node type, expected Element or Document but found " + (this.nodeType == null ? "null" : XmlType.toString(this.nodeType)));
		}
		if(x.parent != null) {
			x.parent.removeChild(x);
		}
		this.children.push(x);
		x.parent = this;
	}
	,removeChild: function(x) {
		if(this.nodeType != Xml.Document && this.nodeType != Xml.Element) {
			throw haxe_Exception.thrown("Bad node type, expected Element or Document but found " + (this.nodeType == null ? "null" : XmlType.toString(this.nodeType)));
		}
		if(HxOverrides.remove(this.children,x)) {
			x.parent = null;
			return true;
		}
		return false;
	}
	,toString: function() {
		return haxe_xml_Printer.print(this);
	}
	,__class__: Xml
};
var common_Person = function(name,portraitImage,optional) {
	this.name = name;
	this.portraitImage = portraitImage;
	if(optional != null) {
		this.surname = optional.surname;
		this.position = optional.position;
	}
};
$hxClasses["common.Person"] = common_Person;
common_Person.__name__ = "common.Person";
common_Person.prototype = {
	get_fullName: function() {
		if(this.surname != null) {
			return "" + this.name + " " + this.surname;
		}
		return this.name;
	}
	,get_fullNameWithPosition: function() {
		if(this.position != null) {
			return "" + this.position + " " + this.get_fullName();
		}
		return this.get_fullName();
	}
	,__class__: common_Person
	,__properties__: {get_fullNameWithPosition:"get_fullNameWithPosition",get_fullName:"get_fullName"}
};
var common_interactive_InteractiveElement = function() {
	this._opacity = 1.0;
};
$hxClasses["common.interactive.InteractiveElement"] = common_interactive_InteractiveElement;
common_interactive_InteractiveElement.__name__ = "common.interactive.InteractiveElement";
common_interactive_InteractiveElement.prototype = {
	set_opacity: function(value) {
		this._opacity = value;
		this.rootNode.style.opacity = Std.string(this._opacity);
		return this._opacity;
	}
	,get_opacity: function() {
		return this._opacity;
	}
	,renderInternal: function() {
		this.rootNode = this.render();
		return this.rootNode;
	}
	,remove: function() {
		this.rootNode.remove();
	}
	,appendChild: function(child) {
		child.render();
		this.rootNode.appendChild(child.rootNode);
	}
	,__class__: common_interactive_InteractiveElement
	,__properties__: {set_opacity:"set_opacity",get_opacity:"get_opacity"}
};
var common_interactive_ChooseElement = function(parameters) {
	common_interactive_InteractiveElement.call(this);
	this.onSelect = parameters.onSelect;
	this.select = parameters.select;
};
$hxClasses["common.interactive.ChooseElement"] = common_interactive_ChooseElement;
common_interactive_ChooseElement.__name__ = "common.interactive.ChooseElement";
common_interactive_ChooseElement.__super__ = common_interactive_InteractiveElement;
common_interactive_ChooseElement.prototype = $extend(common_interactive_InteractiveElement.prototype,{
	render: function() {
		var _gthis = this;
		var chooseNode = window.document.createElement("div");
		chooseNode.className = "choose-root";
		var i = 1;
		var h = this.select.h;
		var item_h = h;
		var item_keys = Object.keys(h);
		var item_length = item_keys.length;
		var item_current = 0;
		while(item_current < item_length) {
			var item_key = [];
			var key = item_keys[item_current++];
			item_key[0] = key;
			var item_value = item_h[key];
			var node = window.document.createElement("div");
			node.innerText = "" + i + ". " + item_value;
			node.className = "choose-item";
			node.onclick = (function(item_key) {
				return function() {
					chooseNode.remove();
					_gthis.onSelect(item_key[0]);
				};
			})(item_key);
			chooseNode.appendChild(node);
			++i;
		}
		return chooseNode;
	}
	,__class__: common_interactive_ChooseElement
});
var common_interactive_Color = $hxEnums["common.interactive.Color"] = { __ename__:true,__constructs__:null
	,Red: {_hx_name:"Red",_hx_index:0,__enum__:"common.interactive.Color",toString:$estr}
	,Orange: {_hx_name:"Orange",_hx_index:1,__enum__:"common.interactive.Color",toString:$estr}
	,Blue: {_hx_name:"Blue",_hx_index:2,__enum__:"common.interactive.Color",toString:$estr}
	,Grey: {_hx_name:"Grey",_hx_index:3,__enum__:"common.interactive.Color",toString:$estr}
};
common_interactive_Color.__constructs__ = [common_interactive_Color.Red,common_interactive_Color.Orange,common_interactive_Color.Blue,common_interactive_Color.Grey];
var common_interactive_ColorHelper = function() { };
$hxClasses["common.interactive.ColorHelper"] = common_interactive_ColorHelper;
common_interactive_ColorHelper.__name__ = "common.interactive.ColorHelper";
common_interactive_ColorHelper.getColorCss = function(color) {
	return $hxEnums[color.__enum__].__constructs__[color._hx_index]._hx_name.toLowerCase() + "-color";
};
var common_interactive_InteractiveSystem = function() {
	this.portraits = new haxe_ds_StringMap();
	this.newElements = [];
	this.sceneTitle = window.document.querySelector("#scene-title");
	this.sceneContentNode = window.document.querySelector("#scene-content");
	this.leftPageNode = window.document.querySelector("#left-page-panel");
};
$hxClasses["common.interactive.InteractiveSystem"] = common_interactive_InteractiveSystem;
common_interactive_InteractiveSystem.__name__ = "common.interactive.InteractiveSystem";
common_interactive_InteractiveSystem.prototype = {
	updateScroll: function() {
		this.sceneContentNode.scrollTop = this.sceneContentNode.scrollHeight;
	}
	,addElement: function(element) {
		var node = element.renderInternal();
		this.sceneContentNode.appendChild(node);
		this.newElements.push(element);
		this.updateScroll();
	}
	,makeElementsOld: function() {
		var _g = 0;
		var _g1 = this.newElements;
		while(_g < _g1.length) {
			var element = _g1[_g];
			++_g;
			motion_Actuate.tween(element,0.3,{ opacity : 0.6}).ease(motion_easing_Linear.get_easeNone());
		}
		this.newElements = [];
	}
	,clear: function() {
		this.sceneContentNode.innerHTML = "";
		this.setSceneTitle("");
		this.newElements = [];
		this.portraits.h = Object.create(null);
		this.leftPageNode.innerHTML = "";
	}
	,setSceneTitle: function(title) {
		this.sceneTitle.innerText = title;
	}
	,addText: function(text) {
		var element = new common_interactive_TextElement(text);
		this.addElement(element);
		element.set_opacity(0);
		motion_Actuate.tween(element,0.5,{ opacity : 1.0}).ease(motion_easing_Linear.get_easeNone());
		this.updateScroll();
		return element;
	}
	,addPlayerText: function(text) {
		var element = new common_interactive_PersonTextElement({ nameColor : common_interactive_Color.Orange, name : "ВЫ", text : text});
		this.addElement(element);
		element.set_opacity(0);
		motion_Actuate.tween(element,0.5,{ opacity : 1.0}).ease(motion_easing_Linear.get_easeNone());
		this.updateScroll();
		return element;
	}
	,addPersonText: function(person,text) {
		var element = new common_interactive_PersonTextElement({ nameColor : common_interactive_Color.Blue, name : person.get_fullNameWithPosition(), text : text});
		this.addElement(element);
		element.set_opacity(0);
		motion_Actuate.tween(element,0.5,{ opacity : 1.0}).ease(motion_easing_Linear.get_easeNone());
		this.updateScroll();
		return element;
	}
	,addChoose: function(parameters) {
		var _gthis = this;
		var element = new common_interactive_ChooseElement({ select : parameters.select, onSelect : function(id) {
			_gthis.makeElementsOld();
			parameters.onSelect(parameters.select,id);
		}});
		this.addElement(element);
		element.set_opacity(0);
		motion_Actuate.tween(element,1.0,{ opacity : 1.0}).ease(motion_easing_Linear.get_easeNone());
		return element;
	}
	,addPersonPortrait: function(person,showPosition) {
		if(showPosition == null) {
			showPosition = true;
		}
		var element = new common_interactive_PersonPortraitElement(person,showPosition);
		var node = element.renderInternal();
		this.leftPageNode.appendChild(node);
		element.set_opacity(0);
		motion_Actuate.tween(element,1.0,{ opacity : 1.0}).ease(motion_easing_Linear.get_easeNone());
		var this1 = this.portraits;
		var k = person.get_fullNameWithPosition();
		this1.h[k] = element;
		return element;
	}
	,setPersonPortrait: function(oldPerson,newPerson) {
		var this1 = this.portraits;
		var key = oldPerson.get_fullNameWithPosition();
		var element = this1.h[key];
		element.set_person(newPerson);
		return element;
	}
	,addWait: function(waitTime,onComplete) {
		var _gthis = this;
		var node = new common_interactive_WaitPersonElement(waitTime,function() {
			onComplete();
			_gthis.updateScroll();
		});
		this.addElement(node);
		node.start();
		return node;
	}
	,addLink: function(caption,onClick) {
		var linkNode = window.document.createElement("div");
		linkNode.innerText = caption;
		linkNode.className = "link-click";
		linkNode.onclick = function() {
			onClick();
		};
		this.sceneContentNode.appendChild(linkNode);
		this.updateScroll();
	}
	,__class__: common_interactive_InteractiveSystem
};
var common_interactive_PersonPortraitElement = function(person,showPosition) {
	if(showPosition == null) {
		showPosition = true;
	}
	common_interactive_InteractiveElement.call(this);
	this.showPosition = showPosition;
	this._person = person;
};
$hxClasses["common.interactive.PersonPortraitElement"] = common_interactive_PersonPortraitElement;
common_interactive_PersonPortraitElement.__name__ = "common.interactive.PersonPortraitElement";
common_interactive_PersonPortraitElement.__super__ = common_interactive_InteractiveElement;
common_interactive_PersonPortraitElement.prototype = $extend(common_interactive_InteractiveElement.prototype,{
	get_person: function() {
		return this._person;
	}
	,set_person: function(value) {
		this._person = value;
		if(this.rootNode != null) {
			var tmp = "url(images/" + this.get_person().portraitImage;
			this.portraitNode.style.backgroundImage = tmp + ")";
			this.nameNode.innerText = this.get_person().get_fullNameWithPosition().toUpperCase();
		}
		return this._person;
	}
	,render: function() {
		var mainNode = window.document.createElement("div");
		mainNode.className = "person-portrait-conatiner";
		this.portraitNode = window.document.createElement("div");
		this.portraitNode.className = "portrait";
		var tmp = "url(images/" + this.get_person().portraitImage;
		this.portraitNode.style.backgroundImage = tmp + ")";
		this.nameNode = window.document.createElement("div");
		this.nameNode.className = "name grey-color";
		if(this.showPosition) {
			this.nameNode.innerText = this.get_person().get_fullNameWithPosition().toUpperCase();
		} else {
			this.nameNode.innerText = this.get_person().get_fullName().toUpperCase();
		}
		mainNode.appendChild(this.portraitNode);
		mainNode.appendChild(this.nameNode);
		return mainNode;
	}
	,__class__: common_interactive_PersonPortraitElement
	,__properties__: $extend(common_interactive_InteractiveElement.prototype.__properties__,{set_person:"set_person",get_person:"get_person"})
});
var common_interactive_PersonTextElement = function(parameters) {
	common_interactive_InteractiveElement.call(this);
	this.parameters = parameters;
};
$hxClasses["common.interactive.PersonTextElement"] = common_interactive_PersonTextElement;
common_interactive_PersonTextElement.__name__ = "common.interactive.PersonTextElement";
common_interactive_PersonTextElement.__super__ = common_interactive_InteractiveElement;
common_interactive_PersonTextElement.prototype = $extend(common_interactive_InteractiveElement.prototype,{
	render: function() {
		var mainNode = window.document.createElement("div");
		var nameNode = window.document.createElement("span");
		var textNode = window.document.createElement("span");
		var sepNode = window.document.createElement("span");
		mainNode.className = "person-text";
		var color = common_interactive_ColorHelper.getColorCss(this.parameters.nameColor);
		nameNode.innerText = this.parameters.name.toUpperCase();
		nameNode.className = "name " + color;
		sepNode.className = "separator";
		sepNode.innerText = "-";
		textNode.innerText = "\"" + this.parameters.text + "\"";
		textNode.className = "text";
		mainNode.appendChild(nameNode);
		mainNode.appendChild(sepNode);
		mainNode.appendChild(textNode);
		return mainNode;
	}
	,__class__: common_interactive_PersonTextElement
});
var common_interactive_TextElement = function(text) {
	common_interactive_InteractiveElement.call(this);
	this.text = text;
};
$hxClasses["common.interactive.TextElement"] = common_interactive_TextElement;
common_interactive_TextElement.__name__ = "common.interactive.TextElement";
common_interactive_TextElement.__super__ = common_interactive_InteractiveElement;
common_interactive_TextElement.prototype = $extend(common_interactive_InteractiveElement.prototype,{
	render: function() {
		var node = window.document.createElement("div");
		node.innerText = this.text;
		node.className = "single-text";
		return node;
	}
	,__class__: common_interactive_TextElement
});
var common_interactive_WaitPersonElement = function(waitTime,onComplete) {
	this.tickId = 0;
	common_interactive_InteractiveElement.call(this);
	this.waitTime = waitTime;
	this.onComplete = onComplete;
};
$hxClasses["common.interactive.WaitPersonElement"] = common_interactive_WaitPersonElement;
common_interactive_WaitPersonElement.__name__ = "common.interactive.WaitPersonElement";
common_interactive_WaitPersonElement.__super__ = common_interactive_InteractiveElement;
common_interactive_WaitPersonElement.prototype = $extend(common_interactive_InteractiveElement.prototype,{
	update: function() {
		switch(this.tickId) {
		case 0:
			this.rootNode.innerText = ":--";
			break;
		case 1:
			this.rootNode.innerText = "-:-";
			break;
		case 2:
			this.rootNode.innerText = "--:";
			break;
		}
		this.tickId += 1;
		if(this.tickId > 2) {
			this.tickId = 0;
		}
	}
	,render: function() {
		var mainNode = window.document.createElement("div");
		mainNode.innerText = "---";
		return mainNode;
	}
	,start: function() {
		var _gthis = this;
		var totalTime = 0.0;
		var intervalId = 0;
		var time = 0.0;
		var tickValue = 100;
		intervalId = window.setInterval(function() {
			totalTime += tickValue;
			time += tickValue;
			if(totalTime >= _gthis.waitTime) {
				window.clearInterval(intervalId);
				_gthis.onComplete();
				_gthis.remove();
			} else if(time >= 300) {
				time = 0;
				_gthis.update();
			}
		},tickValue);
	}
	,__class__: common_interactive_WaitPersonElement
});
var common_scene_BaseScene = function() {
};
$hxClasses["common.scene.BaseScene"] = common_scene_BaseScene;
common_scene_BaseScene.__name__ = "common.scene.BaseScene";
common_scene_BaseScene.prototype = {
	__class__: common_scene_BaseScene
};
var common_scene_ChooseStateBlock = function(actions) {
	this.actions = actions;
};
$hxClasses["common.scene.ChooseStateBlock"] = common_scene_ChooseStateBlock;
common_scene_ChooseStateBlock.__name__ = "common.scene.ChooseStateBlock";
common_scene_ChooseStateBlock.prototype = {
	removeAction: function(id) {
		var _this = this.actions;
		if(Object.prototype.hasOwnProperty.call(_this.h,id)) {
			delete(_this.h[id]);
		}
	}
	,getActions: function() {
		return this.actions;
	}
	,__class__: common_scene_ChooseStateBlock
};
var common_scene_XmlScene = function(access) {
	this.choosed = new haxe_ds_StringMap();
	this.persons = new haxe_ds_StringMap();
	this.chooseblocks = new haxe_ds_StringMap();
	this.parts = new haxe_ds_StringMap();
	common_scene_BaseScene.call(this);
	this.sceneNode = access;
	var _g = 0;
	var _g1 = haxe_xml__$Access_NodeListAccess.resolve(haxe_xml__$Access_NodeAccess.resolve(access,"persons"),"person");
	while(_g < _g1.length) {
		var person = _g1[_g];
		++_g;
		var surname = null;
		var position = null;
		if(haxe_xml__$Access_HasNodeAccess.resolve(person,"surname")) {
			surname = haxe_xml_Access.get_innerData(haxe_xml__$Access_NodeAccess.resolve(person,"surname"));
		}
		if(haxe_xml__$Access_HasNodeAccess.resolve(person,"surname")) {
			position = haxe_xml_Access.get_innerData(haxe_xml__$Access_NodeAccess.resolve(person,"position"));
		}
		var this1 = this.persons;
		var k = haxe_xml__$Access_AttribAccess.resolve(person,"id");
		var v = new common_Person(haxe_xml_Access.get_innerData(haxe_xml__$Access_NodeAccess.resolve(person,"name")),haxe_xml_Access.get_innerData(haxe_xml__$Access_NodeAccess.resolve(person,"portrait")),{ surname : surname, position : position});
		this1.h[k] = v;
	}
	var _g = 0;
	var _g1 = haxe_xml__$Access_NodeListAccess.resolve(haxe_xml__$Access_NodeAccess.resolve(access,"parts"),"part");
	while(_g < _g1.length) {
		var part = _g1[_g];
		++_g;
		var partId = haxe_xml__$Access_AttribAccess.resolve(part,"id");
		this.parts.h[partId] = part;
	}
	if(haxe_xml__$Access_HasNodeAccess.resolve(access,"chooseblocks")) {
		var _g = 0;
		var _g1 = haxe_xml__$Access_NodeListAccess.resolve(haxe_xml__$Access_NodeAccess.resolve(access,"chooseblocks"),"chooseblock");
		while(_g < _g1.length) {
			var chooseblock = _g1[_g];
			++_g;
			var blockId = haxe_xml__$Access_AttribAccess.resolve(chooseblock,"id");
			var actions = new haxe_ds_StringMap();
			var _g2 = 0;
			var _g3 = haxe_xml__$Access_NodeListAccess.resolve(chooseblock,"item");
			while(_g2 < _g3.length) {
				var action = _g3[_g2];
				++_g2;
				var actionId = haxe_xml__$Access_AttribAccess.resolve(action,"link");
				var text = haxe_xml_Access.get_innerData(action);
				actions.h[actionId] = text;
			}
			var this1 = this.chooseblocks;
			var v = new common_scene_ChooseStateBlock(actions);
			this1.h[blockId] = v;
		}
	}
};
$hxClasses["common.scene.XmlScene"] = common_scene_XmlScene;
common_scene_XmlScene.__name__ = "common.scene.XmlScene";
common_scene_XmlScene.load = function(path,onComplete) {
	var req = new haxe_http_HttpJs(path);
	req.onData = function(data) {
		var xml = Xml.parse(data);
		var x = xml.firstElement();
		if(x.nodeType != Xml.Document && x.nodeType != Xml.Element) {
			throw haxe_Exception.thrown("Invalid nodeType " + (x.nodeType == null ? "null" : XmlType.toString(x.nodeType)));
		}
		var this1 = x;
		var access = this1;
		var scene = new common_scene_XmlScene(access);
		onComplete(scene);
	};
	req.request();
};
common_scene_XmlScene.__super__ = common_scene_BaseScene;
common_scene_XmlScene.prototype = $extend(common_scene_BaseScene.prototype,{
	getInteractive: function() {
		return this.interactive;
	}
	,getPartById: function(id) {
		return this.parts.h[id];
	}
	,getPersonById: function(id) {
		return this.persons.h[id];
	}
	,getTextWaitForNode: function(text) {
		if(text == null) {
			return null;
		}
		console.log("src/common/scene/XmlScene.hx:52:",text);
		var wait = text.length * 40;
		if(wait < 1500) {
			wait = 1500;
		}
		console.log("src/common/scene/XmlScene.hx:60:",wait);
		return wait;
	}
	,processAction: function(items,node,prevText) {
		var actionNode = node.elements().next();
		var _g;
		if(actionNode.nodeType == Xml.Document) {
			_g = "Document";
		} else {
			if(actionNode.nodeType != Xml.Element) {
				throw haxe_Exception.thrown("Bad node type, expected Element but found " + (actionNode.nodeType == null ? "null" : XmlType.toString(actionNode.nodeType)));
			}
			_g = actionNode.nodeName;
		}
		switch(_g) {
		case "addPortrait":
			var personId = haxe_xml_Access.get_innerData(haxe_xml__$Access_NodeAccess.resolve(actionNode,"person"));
			var person = this.getPersonById(personId);
			var showPosition = true;
			if(haxe_xml__$Access_HasNodeAccess.resolve(actionNode,"showOption")) {
				var showOption = haxe_xml_Access.get_innerData(haxe_xml__$Access_NodeAccess.resolve(actionNode,"showOption"));
				console.log("src/common/scene/XmlScene.hx:75:",showOption);
				if(showOption != "fullnameWithPosition") {
					showPosition = false;
				}
			}
			this.interactive.addPersonPortrait(person,showPosition);
			break;
		case "execute":
			var name = haxe_xml_Access.get_innerData(actionNode);
			var field = Reflect.field(this.state,name);
			field.apply(this.state,[]);
			break;
		case "setPortrait":
			var fromPersonName = haxe_xml_Access.get_innerData(haxe_xml__$Access_NodeAccess.resolve(actionNode,"from"));
			var toPersonName = haxe_xml_Access.get_innerData(haxe_xml__$Access_NodeAccess.resolve(actionNode,"to"));
			var fromPerson = this.getPersonById(fromPersonName);
			var toPerson = this.getPersonById(toPersonName);
			this.interactive.setPersonPortrait(fromPerson,toPerson);
			break;
		}
		this.addPartItem(items,prevText);
	}
	,addPartItem: function(items,prevText) {
		var _gthis = this;
		if(!items.hasNext()) {
			return;
		}
		var item = items.next();
		var _g;
		if(item.nodeType == Xml.Document) {
			_g = "Document";
		} else {
			if(item.nodeType != Xml.Element) {
				throw haxe_Exception.thrown("Bad node type, expected Element but found " + (item.nodeType == null ? "null" : XmlType.toString(item.nodeType)));
			}
			_g = item.nodeName;
		}
		switch(_g) {
		case "action":
			this.processAction(items,item,prevText);
			break;
		case "choose":
			var items1 = new haxe_ds_StringMap();
			var _g = 0;
			var _g1 = haxe_xml__$Access_NodeListAccess.resolve(item,"item");
			while(_g < _g1.length) {
				var item1 = _g1[_g];
				++_g;
				var link = haxe_xml__$Access_AttribAccess.resolve(item1,"link");
				var text = haxe_xml_Access.get_innerData(item1);
				items1.h[link] = text;
			}
			var chooseBlock = null;
			if(haxe_xml__$Access_HasNodeAccess.resolve(item,"include")) {
				var link = haxe_xml__$Access_AttribAccess.resolve(haxe_xml__$Access_NodeAccess.resolve(item,"include"),"link");
				chooseBlock = this.chooseblocks.h[link];
				var h = chooseBlock.getActions().h;
				var item_h = h;
				var item_keys = Object.keys(h);
				var item_length = item_keys.length;
				var item_current = 0;
				while(item_current < item_length) {
					var key = item_keys[item_current++];
					var item_key = key;
					var item_value = item_h[key];
					var v = item_value;
					items1.h[item_key] = v;
				}
			}
			this.interactive.addChoose({ select : items1, onSelect : function(select,id) {
				_gthis.interactive.addPlayerText(select.h[id]);
				if(chooseBlock != null) {
					chooseBlock.removeAction(id);
				}
				var partId = id;
				_gthis.choosed.h[partId] = true;
				var part = _gthis.getPartById(partId);
				_gthis.addScenePart(part,select.h[id]);
			}});
			break;
		case "condition":
			var checkChoose = haxe_xml__$Access_AttribAccess.resolve(item,"checkChoose");
			var partId;
			if(checkChoose != null) {
				partId = Object.prototype.hasOwnProperty.call(this.choosed.h,checkChoose) ? haxe_xml_Access.get_innerData(haxe_xml__$Access_NodeAccess.resolve(item,"iftrue")) : haxe_xml_Access.get_innerData(haxe_xml__$Access_NodeAccess.resolve(item,"iffalse"));
			} else {
				var checkFunc = haxe_xml__$Access_AttribAccess.resolve(item,"checkFunc");
				var field = Reflect.field(this.state,checkFunc);
				var result = js_Boot.__cast(field.apply(this.state,[]) , Bool);
				partId = result ? haxe_xml_Access.get_innerData(haxe_xml__$Access_NodeAccess.resolve(item,"iftrue")) : haxe_xml_Access.get_innerData(haxe_xml__$Access_NodeAccess.resolve(item,"iffalse"));
			}
			var part = this.getPartById(partId);
			this.addScenePart(part,prevText);
			break;
		case "goto":
			var link = haxe_xml_Access.get_innerData(item);
			var linkPart = this.getPartById(link);
			this.addScenePart(linkPart,prevText);
			break;
		case "link":
			var caption = haxe_xml_Access.get_innerData(haxe_xml__$Access_NodeAccess.resolve(item,"text"));
			this.interactive.addLink(caption,function() {
				var link = haxe_xml_Access.get_innerData(haxe_xml__$Access_NodeAccess.resolve(item,"link"));
				common_scene_XmlScene.load(link,function(scene) {
					_gthis.game.setScene(scene);
				});
			});
			break;
		case "personText":
			var wait = this.getTextWaitForNode(prevText);
			this.interactive.addWait(wait,function() {
				var text = haxe_xml_Access.get_innerData(haxe_xml__$Access_NodeAccess.resolve(item,"text"));
				_gthis.interactive.addPersonText(_gthis.getPersonById(haxe_xml_Access.get_innerData(haxe_xml__$Access_NodeAccess.resolve(item,"person"))),text);
				_gthis.addPartItem(items,text);
			});
			break;
		case "text":
			var wait = this.getTextWaitForNode(prevText);
			this.interactive.addWait(wait,function() {
				var text = haxe_xml_Access.get_innerData(item);
				_gthis.interactive.addText(text);
				_gthis.addPartItem(items,text);
			});
			break;
		}
	}
	,addScenePart: function(part,prevText) {
		this.addPartItem(part.elements(),prevText);
	}
	,setState: function(state) {
		this.state = state;
		state.scene = this;
	}
	,enter: function() {
		var sceneCaption = haxe_xml_Access.get_innerData(haxe_xml__$Access_NodeAccess.resolve(this.sceneNode,"caption"));
		var enterPartName = haxe_xml_Access.get_innerData(haxe_xml__$Access_NodeAccess.resolve(this.sceneNode,"enter"));
		if(haxe_xml__$Access_HasNodeAccess.resolve(this.sceneNode,"state")) {
			var stateName = haxe_xml_Access.get_innerData(haxe_xml__$Access_NodeAccess.resolve(this.sceneNode,"state"));
			var resolvedClass = $hxClasses[stateName];
			var state = Type.createInstance(resolvedClass,[]);
			this.setState(state);
		}
		this.interactive.setSceneTitle(sceneCaption);
		var part = this.getPartById(enterPartName);
		this.addScenePart(part);
	}
	,__class__: common_scene_XmlScene
});
var common_scene_XmlSceneState = function() { };
$hxClasses["common.scene.XmlSceneState"] = common_scene_XmlSceneState;
common_scene_XmlSceneState.__name__ = "common.scene.XmlSceneState";
common_scene_XmlSceneState.prototype = {
	get_interactive: function() {
		return this.scene.getInteractive();
	}
	,getPersonById: function(id) {
		return this.scene.getPersonById(id);
	}
	,checkChoose: function(id) {
		return Object.prototype.hasOwnProperty.call(this.scene.choosed.h,id);
	}
	,__class__: common_scene_XmlSceneState
	,__properties__: {get_interactive:"get_interactive"}
};
var haxe_IMap = function() { };
$hxClasses["haxe.IMap"] = haxe_IMap;
haxe_IMap.__name__ = "haxe.IMap";
haxe_IMap.__isInterface__ = true;
var haxe_Exception = function(message,previous,native) {
	Error.call(this,message);
	this.message = message;
	this.__previousException = previous;
	this.__nativeException = native != null ? native : this;
};
$hxClasses["haxe.Exception"] = haxe_Exception;
haxe_Exception.__name__ = "haxe.Exception";
haxe_Exception.caught = function(value) {
	if(((value) instanceof haxe_Exception)) {
		return value;
	} else if(((value) instanceof Error)) {
		return new haxe_Exception(value.message,null,value);
	} else {
		return new haxe_ValueException(value,null,value);
	}
};
haxe_Exception.thrown = function(value) {
	if(((value) instanceof haxe_Exception)) {
		return value.get_native();
	} else if(((value) instanceof Error)) {
		return value;
	} else {
		var e = new haxe_ValueException(value);
		return e;
	}
};
haxe_Exception.__super__ = Error;
haxe_Exception.prototype = $extend(Error.prototype,{
	unwrap: function() {
		return this.__nativeException;
	}
	,get_native: function() {
		return this.__nativeException;
	}
	,__class__: haxe_Exception
	,__properties__: {get_native:"get_native"}
});
var haxe_ValueException = function(value,previous,native) {
	haxe_Exception.call(this,String(value),previous,native);
	this.value = value;
};
$hxClasses["haxe.ValueException"] = haxe_ValueException;
haxe_ValueException.__name__ = "haxe.ValueException";
haxe_ValueException.__super__ = haxe_Exception;
haxe_ValueException.prototype = $extend(haxe_Exception.prototype,{
	unwrap: function() {
		return this.value;
	}
	,__class__: haxe_ValueException
});
var haxe_ds_ObjectMap = function() {
	this.h = { __keys__ : { }};
};
$hxClasses["haxe.ds.ObjectMap"] = haxe_ds_ObjectMap;
haxe_ds_ObjectMap.__name__ = "haxe.ds.ObjectMap";
haxe_ds_ObjectMap.__interfaces__ = [haxe_IMap];
haxe_ds_ObjectMap.prototype = {
	set: function(key,value) {
		var id = key.__id__;
		if(id == null) {
			id = (key.__id__ = $global.$haxeUID++);
		}
		this.h[id] = value;
		this.h.__keys__[id] = key;
	}
	,remove: function(key) {
		var id = key.__id__;
		if(this.h.__keys__[id] == null) {
			return false;
		}
		delete(this.h[id]);
		delete(this.h.__keys__[id]);
		return true;
	}
	,keys: function() {
		var a = [];
		for( var key in this.h.__keys__ ) {
		if(this.h.hasOwnProperty(key)) {
			a.push(this.h.__keys__[key]);
		}
		}
		return new haxe_iterators_ArrayIterator(a);
	}
	,iterator: function() {
		return { ref : this.h, it : this.keys(), hasNext : function() {
			return this.it.hasNext();
		}, next : function() {
			var i = this.it.next();
			return this.ref[i.__id__];
		}};
	}
	,__class__: haxe_ds_ObjectMap
};
var haxe_ds_StringMap = function() {
	this.h = Object.create(null);
};
$hxClasses["haxe.ds.StringMap"] = haxe_ds_StringMap;
haxe_ds_StringMap.__name__ = "haxe.ds.StringMap";
haxe_ds_StringMap.__interfaces__ = [haxe_IMap];
haxe_ds_StringMap.prototype = {
	__class__: haxe_ds_StringMap
};
var haxe_ds__$StringMap_StringMapKeyIterator = function(h) {
	this.h = h;
	this.keys = Object.keys(h);
	this.length = this.keys.length;
	this.current = 0;
};
$hxClasses["haxe.ds._StringMap.StringMapKeyIterator"] = haxe_ds__$StringMap_StringMapKeyIterator;
haxe_ds__$StringMap_StringMapKeyIterator.__name__ = "haxe.ds._StringMap.StringMapKeyIterator";
haxe_ds__$StringMap_StringMapKeyIterator.prototype = {
	hasNext: function() {
		return this.current < this.length;
	}
	,next: function() {
		return this.keys[this.current++];
	}
	,__class__: haxe_ds__$StringMap_StringMapKeyIterator
};
var haxe_http_HttpBase = function(url) {
	this.url = url;
	this.headers = [];
	this.params = [];
	this.emptyOnData = $bind(this,this.onData);
};
$hxClasses["haxe.http.HttpBase"] = haxe_http_HttpBase;
haxe_http_HttpBase.__name__ = "haxe.http.HttpBase";
haxe_http_HttpBase.prototype = {
	onData: function(data) {
	}
	,onBytes: function(data) {
	}
	,onError: function(msg) {
	}
	,onStatus: function(status) {
	}
	,hasOnData: function() {
		return !Reflect.compareMethods($bind(this,this.onData),this.emptyOnData);
	}
	,success: function(data) {
		this.responseBytes = data;
		this.responseAsString = null;
		if(this.hasOnData()) {
			this.onData(this.get_responseData());
		}
		this.onBytes(this.responseBytes);
	}
	,get_responseData: function() {
		if(this.responseAsString == null && this.responseBytes != null) {
			this.responseAsString = this.responseBytes.getString(0,this.responseBytes.length,haxe_io_Encoding.UTF8);
		}
		return this.responseAsString;
	}
	,__class__: haxe_http_HttpBase
	,__properties__: {get_responseData:"get_responseData"}
};
var haxe_http_HttpJs = function(url) {
	this.async = true;
	this.withCredentials = false;
	haxe_http_HttpBase.call(this,url);
};
$hxClasses["haxe.http.HttpJs"] = haxe_http_HttpJs;
haxe_http_HttpJs.__name__ = "haxe.http.HttpJs";
haxe_http_HttpJs.__super__ = haxe_http_HttpBase;
haxe_http_HttpJs.prototype = $extend(haxe_http_HttpBase.prototype,{
	request: function(post) {
		var _gthis = this;
		this.responseAsString = null;
		this.responseBytes = null;
		var r = this.req = js_Browser.createXMLHttpRequest();
		var onreadystatechange = function(_) {
			if(r.readyState != 4) {
				return;
			}
			var s;
			try {
				s = r.status;
			} catch( _g ) {
				s = null;
			}
			if(s == 0 && js_Browser.get_supported() && $global.location != null) {
				var protocol = $global.location.protocol.toLowerCase();
				var rlocalProtocol = new EReg("^(?:about|app|app-storage|.+-extension|file|res|widget):$","");
				var isLocal = rlocalProtocol.match(protocol);
				if(isLocal) {
					s = r.response != null ? 200 : 404;
				}
			}
			if(s == undefined) {
				s = null;
			}
			if(s != null) {
				_gthis.onStatus(s);
			}
			if(s != null && s >= 200 && s < 400) {
				_gthis.req = null;
				_gthis.success(haxe_io_Bytes.ofData(r.response));
			} else if(s == null || s == 0 && r.response == null) {
				_gthis.req = null;
				_gthis.onError("Failed to connect or resolve host");
			} else if(s == null) {
				_gthis.req = null;
				var onreadystatechange = r.response != null ? haxe_io_Bytes.ofData(r.response) : null;
				_gthis.responseBytes = onreadystatechange;
				_gthis.onError("Http Error #" + r.status);
			} else {
				switch(s) {
				case 12007:
					_gthis.req = null;
					_gthis.onError("Unknown host");
					break;
				case 12029:
					_gthis.req = null;
					_gthis.onError("Failed to connect to host");
					break;
				default:
					_gthis.req = null;
					var onreadystatechange = r.response != null ? haxe_io_Bytes.ofData(r.response) : null;
					_gthis.responseBytes = onreadystatechange;
					_gthis.onError("Http Error #" + r.status);
				}
			}
		};
		if(this.async) {
			r.onreadystatechange = onreadystatechange;
		}
		var uri;
		var _g = this.postData;
		var _g1 = this.postBytes;
		if(_g == null) {
			if(_g1 == null) {
				uri = null;
			} else {
				var bytes = _g1;
				uri = new Blob([bytes.b.bufferValue]);
			}
		} else if(_g1 == null) {
			var str = _g;
			uri = str;
		} else {
			uri = null;
		}
		if(uri != null) {
			post = true;
		} else {
			var _g = 0;
			var _g1 = this.params;
			while(_g < _g1.length) {
				var p = _g1[_g];
				++_g;
				if(uri == null) {
					uri = "";
				} else {
					uri = (uri == null ? "null" : Std.string(uri)) + "&";
				}
				var s = p.name;
				var value = (uri == null ? "null" : Std.string(uri)) + encodeURIComponent(s) + "=";
				var s1 = p.value;
				uri = value + encodeURIComponent(s1);
			}
		}
		try {
			if(post) {
				r.open("POST",this.url,this.async);
			} else if(uri != null) {
				var question = this.url.split("?").length <= 1;
				r.open("GET",this.url + (question ? "?" : "&") + (uri == null ? "null" : Std.string(uri)),this.async);
				uri = null;
			} else {
				r.open("GET",this.url,this.async);
			}
			r.responseType = "arraybuffer";
		} catch( _g ) {
			var e = haxe_Exception.caught(_g).unwrap();
			this.req = null;
			this.onError(e.toString());
			return;
		}
		r.withCredentials = this.withCredentials;
		if(!Lambda.exists(this.headers,function(h) {
			return h.name == "Content-Type";
		}) && post && this.postData == null) {
			r.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		}
		var _g = 0;
		var _g1 = this.headers;
		while(_g < _g1.length) {
			var h = _g1[_g];
			++_g;
			r.setRequestHeader(h.name,h.value);
		}
		r.send(uri);
		if(!this.async) {
			onreadystatechange(null);
		}
	}
	,__class__: haxe_http_HttpJs
});
var haxe_io_Bytes = function(data) {
	this.length = data.byteLength;
	this.b = new Uint8Array(data);
	this.b.bufferValue = data;
	data.hxBytes = this;
	data.bytes = this.b;
};
$hxClasses["haxe.io.Bytes"] = haxe_io_Bytes;
haxe_io_Bytes.__name__ = "haxe.io.Bytes";
haxe_io_Bytes.ofData = function(b) {
	var hb = b.hxBytes;
	if(hb != null) {
		return hb;
	}
	return new haxe_io_Bytes(b);
};
haxe_io_Bytes.prototype = {
	getString: function(pos,len,encoding) {
		if(pos < 0 || len < 0 || pos + len > this.length) {
			throw haxe_Exception.thrown(haxe_io_Error.OutsideBounds);
		}
		if(encoding == null) {
			encoding = haxe_io_Encoding.UTF8;
		}
		var s = "";
		var b = this.b;
		var i = pos;
		var max = pos + len;
		switch(encoding._hx_index) {
		case 0:
			var debug = pos > 0;
			while(i < max) {
				var c = b[i++];
				if(c < 128) {
					if(c == 0) {
						break;
					}
					s += String.fromCodePoint(c);
				} else if(c < 224) {
					var code = (c & 63) << 6 | b[i++] & 127;
					s += String.fromCodePoint(code);
				} else if(c < 240) {
					var c2 = b[i++];
					var code1 = (c & 31) << 12 | (c2 & 127) << 6 | b[i++] & 127;
					s += String.fromCodePoint(code1);
				} else {
					var c21 = b[i++];
					var c3 = b[i++];
					var u = (c & 15) << 18 | (c21 & 127) << 12 | (c3 & 127) << 6 | b[i++] & 127;
					s += String.fromCodePoint(u);
				}
			}
			break;
		case 1:
			while(i < max) {
				var c = b[i++] | b[i++] << 8;
				s += String.fromCodePoint(c);
			}
			break;
		}
		return s;
	}
	,__class__: haxe_io_Bytes
};
var haxe_io_Encoding = $hxEnums["haxe.io.Encoding"] = { __ename__:true,__constructs__:null
	,UTF8: {_hx_name:"UTF8",_hx_index:0,__enum__:"haxe.io.Encoding",toString:$estr}
	,RawNative: {_hx_name:"RawNative",_hx_index:1,__enum__:"haxe.io.Encoding",toString:$estr}
};
haxe_io_Encoding.__constructs__ = [haxe_io_Encoding.UTF8,haxe_io_Encoding.RawNative];
var haxe_io_Error = $hxEnums["haxe.io.Error"] = { __ename__:true,__constructs__:null
	,Blocked: {_hx_name:"Blocked",_hx_index:0,__enum__:"haxe.io.Error",toString:$estr}
	,Overflow: {_hx_name:"Overflow",_hx_index:1,__enum__:"haxe.io.Error",toString:$estr}
	,OutsideBounds: {_hx_name:"OutsideBounds",_hx_index:2,__enum__:"haxe.io.Error",toString:$estr}
	,Custom: ($_=function(e) { return {_hx_index:3,e:e,__enum__:"haxe.io.Error",toString:$estr}; },$_._hx_name="Custom",$_.__params__ = ["e"],$_)
};
haxe_io_Error.__constructs__ = [haxe_io_Error.Blocked,haxe_io_Error.Overflow,haxe_io_Error.OutsideBounds,haxe_io_Error.Custom];
var haxe_iterators_ArrayIterator = function(array) {
	this.current = 0;
	this.array = array;
};
$hxClasses["haxe.iterators.ArrayIterator"] = haxe_iterators_ArrayIterator;
haxe_iterators_ArrayIterator.__name__ = "haxe.iterators.ArrayIterator";
haxe_iterators_ArrayIterator.prototype = {
	hasNext: function() {
		return this.current < this.array.length;
	}
	,next: function() {
		return this.array[this.current++];
	}
	,__class__: haxe_iterators_ArrayIterator
};
var haxe_xml__$Access_NodeAccess = {};
haxe_xml__$Access_NodeAccess.resolve = function(this1,name) {
	var x = this1.elementsNamed(name).next();
	if(x == null) {
		var xname;
		if(this1.nodeType == Xml.Document) {
			xname = "Document";
		} else {
			if(this1.nodeType != Xml.Element) {
				throw haxe_Exception.thrown("Bad node type, expected Element but found " + (this1.nodeType == null ? "null" : XmlType.toString(this1.nodeType)));
			}
			xname = this1.nodeName;
		}
		throw haxe_Exception.thrown(xname + " is missing element " + name);
	}
	if(x.nodeType != Xml.Document && x.nodeType != Xml.Element) {
		throw haxe_Exception.thrown("Invalid nodeType " + (x.nodeType == null ? "null" : XmlType.toString(x.nodeType)));
	}
	var this1 = x;
	return this1;
};
var haxe_xml__$Access_AttribAccess = {};
haxe_xml__$Access_AttribAccess.resolve = function(this1,name) {
	if(this1.nodeType == Xml.Document) {
		throw haxe_Exception.thrown("Cannot access document attribute " + name);
	}
	var v = this1.get(name);
	if(v == null) {
		if(this1.nodeType != Xml.Element) {
			throw haxe_Exception.thrown("Bad node type, expected Element but found " + (this1.nodeType == null ? "null" : XmlType.toString(this1.nodeType)));
		}
		throw haxe_Exception.thrown(this1.nodeName + " is missing attribute " + name);
	}
	return v;
};
var haxe_xml__$Access_HasNodeAccess = {};
haxe_xml__$Access_HasNodeAccess.resolve = function(this1,name) {
	return this1.elementsNamed(name).hasNext();
};
var haxe_xml__$Access_NodeListAccess = {};
haxe_xml__$Access_NodeListAccess.resolve = function(this1,name) {
	var l = [];
	var x = this1.elementsNamed(name);
	while(x.hasNext()) {
		var x1 = x.next();
		if(x1.nodeType != Xml.Document && x1.nodeType != Xml.Element) {
			throw haxe_Exception.thrown("Invalid nodeType " + (x1.nodeType == null ? "null" : XmlType.toString(x1.nodeType)));
		}
		var this1 = x1;
		l.push(this1);
	}
	return l;
};
var haxe_xml_Access = {};
haxe_xml_Access.__properties__ = {get_innerData:"get_innerData"};
haxe_xml_Access.get_innerData = function(this1) {
	if(this1.nodeType != Xml.Document && this1.nodeType != Xml.Element) {
		throw haxe_Exception.thrown("Bad node type, expected Element or Document but found " + (this1.nodeType == null ? "null" : XmlType.toString(this1.nodeType)));
	}
	var it_current = 0;
	var it_array = this1.children;
	if(it_current >= it_array.length) {
		var tmp;
		if(this1.nodeType == Xml.Document) {
			tmp = "Document";
		} else {
			if(this1.nodeType != Xml.Element) {
				throw haxe_Exception.thrown("Bad node type, expected Element but found " + (this1.nodeType == null ? "null" : XmlType.toString(this1.nodeType)));
			}
			tmp = this1.nodeName;
		}
		throw haxe_Exception.thrown(tmp + " does not have data");
	}
	var v = it_array[it_current++];
	if(it_current < it_array.length) {
		var n = it_array[it_current++];
		var tmp;
		if(v.nodeType == Xml.PCData && n.nodeType == Xml.CData) {
			if(v.nodeType == Xml.Document || v.nodeType == Xml.Element) {
				throw haxe_Exception.thrown("Bad node type, unexpected " + (v.nodeType == null ? "null" : XmlType.toString(v.nodeType)));
			}
			tmp = StringTools.trim(v.nodeValue) == "";
		} else {
			tmp = false;
		}
		if(tmp) {
			if(it_current >= it_array.length) {
				if(n.nodeType == Xml.Document || n.nodeType == Xml.Element) {
					throw haxe_Exception.thrown("Bad node type, unexpected " + (n.nodeType == null ? "null" : XmlType.toString(n.nodeType)));
				}
				return n.nodeValue;
			}
			var n2 = it_array[it_current++];
			var tmp;
			if(n2.nodeType == Xml.PCData) {
				if(n2.nodeType == Xml.Document || n2.nodeType == Xml.Element) {
					throw haxe_Exception.thrown("Bad node type, unexpected " + (n2.nodeType == null ? "null" : XmlType.toString(n2.nodeType)));
				}
				tmp = StringTools.trim(n2.nodeValue) == "";
			} else {
				tmp = false;
			}
			if(tmp && it_current >= it_array.length) {
				if(n.nodeType == Xml.Document || n.nodeType == Xml.Element) {
					throw haxe_Exception.thrown("Bad node type, unexpected " + (n.nodeType == null ? "null" : XmlType.toString(n.nodeType)));
				}
				return n.nodeValue;
			}
		}
		var tmp;
		if(this1.nodeType == Xml.Document) {
			tmp = "Document";
		} else {
			if(this1.nodeType != Xml.Element) {
				throw haxe_Exception.thrown("Bad node type, expected Element but found " + (this1.nodeType == null ? "null" : XmlType.toString(this1.nodeType)));
			}
			tmp = this1.nodeName;
		}
		throw haxe_Exception.thrown(tmp + " does not only have data");
	}
	if(v.nodeType != Xml.PCData && v.nodeType != Xml.CData) {
		var tmp;
		if(this1.nodeType == Xml.Document) {
			tmp = "Document";
		} else {
			if(this1.nodeType != Xml.Element) {
				throw haxe_Exception.thrown("Bad node type, expected Element but found " + (this1.nodeType == null ? "null" : XmlType.toString(this1.nodeType)));
			}
			tmp = this1.nodeName;
		}
		throw haxe_Exception.thrown(tmp + " does not have data");
	}
	if(v.nodeType == Xml.Document || v.nodeType == Xml.Element) {
		throw haxe_Exception.thrown("Bad node type, unexpected " + (v.nodeType == null ? "null" : XmlType.toString(v.nodeType)));
	}
	return v.nodeValue;
};
var haxe_xml_XmlParserException = function(message,xml,position) {
	this.xml = xml;
	this.message = message;
	this.position = position;
	this.lineNumber = 1;
	this.positionAtLine = 0;
	var _g = 0;
	var _g1 = position;
	while(_g < _g1) {
		var i = _g++;
		var c = xml.charCodeAt(i);
		if(c == 10) {
			this.lineNumber++;
			this.positionAtLine = 0;
		} else if(c != 13) {
			this.positionAtLine++;
		}
	}
};
$hxClasses["haxe.xml.XmlParserException"] = haxe_xml_XmlParserException;
haxe_xml_XmlParserException.__name__ = "haxe.xml.XmlParserException";
haxe_xml_XmlParserException.prototype = {
	toString: function() {
		var c = js_Boot.getClass(this);
		return c.__name__ + ": " + this.message + " at line " + this.lineNumber + " char " + this.positionAtLine;
	}
	,__class__: haxe_xml_XmlParserException
};
var haxe_xml_Parser = function() { };
$hxClasses["haxe.xml.Parser"] = haxe_xml_Parser;
haxe_xml_Parser.__name__ = "haxe.xml.Parser";
haxe_xml_Parser.parse = function(str,strict) {
	if(strict == null) {
		strict = false;
	}
	var doc = Xml.createDocument();
	haxe_xml_Parser.doParse(str,strict,0,doc);
	return doc;
};
haxe_xml_Parser.doParse = function(str,strict,p,parent) {
	if(p == null) {
		p = 0;
	}
	var xml = null;
	var state = 1;
	var next = 1;
	var aname = null;
	var start = 0;
	var nsubs = 0;
	var nbrackets = 0;
	var buf = new StringBuf();
	var escapeNext = 1;
	var attrValQuote = -1;
	while(p < str.length) {
		var c = str.charCodeAt(p);
		switch(state) {
		case 0:
			switch(c) {
			case 9:case 10:case 13:case 32:
				break;
			default:
				state = next;
				continue;
			}
			break;
		case 1:
			if(c == 60) {
				state = 0;
				next = 2;
			} else {
				start = p;
				state = 13;
				continue;
			}
			break;
		case 2:
			switch(c) {
			case 33:
				if(str.charCodeAt(p + 1) == 91) {
					p += 2;
					if(HxOverrides.substr(str,p,6).toUpperCase() != "CDATA[") {
						throw haxe_Exception.thrown(new haxe_xml_XmlParserException("Expected <![CDATA[",str,p));
					}
					p += 5;
					state = 17;
					start = p + 1;
				} else if(str.charCodeAt(p + 1) == 68 || str.charCodeAt(p + 1) == 100) {
					if(HxOverrides.substr(str,p + 2,6).toUpperCase() != "OCTYPE") {
						throw haxe_Exception.thrown(new haxe_xml_XmlParserException("Expected <!DOCTYPE",str,p));
					}
					p += 8;
					state = 16;
					start = p + 1;
				} else if(str.charCodeAt(p + 1) != 45 || str.charCodeAt(p + 2) != 45) {
					throw haxe_Exception.thrown(new haxe_xml_XmlParserException("Expected <!--",str,p));
				} else {
					p += 2;
					state = 15;
					start = p + 1;
				}
				break;
			case 47:
				if(parent == null) {
					throw haxe_Exception.thrown(new haxe_xml_XmlParserException("Expected node name",str,p));
				}
				start = p + 1;
				state = 0;
				next = 10;
				break;
			case 63:
				state = 14;
				start = p;
				break;
			default:
				state = 3;
				start = p;
				continue;
			}
			break;
		case 3:
			if(!(c >= 97 && c <= 122 || c >= 65 && c <= 90 || c >= 48 && c <= 57 || c == 58 || c == 46 || c == 95 || c == 45)) {
				if(p == start) {
					throw haxe_Exception.thrown(new haxe_xml_XmlParserException("Expected node name",str,p));
				}
				xml = Xml.createElement(HxOverrides.substr(str,start,p - start));
				parent.addChild(xml);
				++nsubs;
				state = 0;
				next = 4;
				continue;
			}
			break;
		case 4:
			switch(c) {
			case 47:
				state = 11;
				break;
			case 62:
				state = 9;
				break;
			default:
				state = 5;
				start = p;
				continue;
			}
			break;
		case 5:
			if(!(c >= 97 && c <= 122 || c >= 65 && c <= 90 || c >= 48 && c <= 57 || c == 58 || c == 46 || c == 95 || c == 45)) {
				if(start == p) {
					throw haxe_Exception.thrown(new haxe_xml_XmlParserException("Expected attribute name",str,p));
				}
				var tmp = HxOverrides.substr(str,start,p - start);
				aname = tmp;
				if(xml.exists(aname)) {
					throw haxe_Exception.thrown(new haxe_xml_XmlParserException("Duplicate attribute [" + aname + "]",str,p));
				}
				state = 0;
				next = 6;
				continue;
			}
			break;
		case 6:
			if(c == 61) {
				state = 0;
				next = 7;
			} else {
				throw haxe_Exception.thrown(new haxe_xml_XmlParserException("Expected =",str,p));
			}
			break;
		case 7:
			switch(c) {
			case 34:case 39:
				buf = new StringBuf();
				state = 8;
				start = p + 1;
				attrValQuote = c;
				break;
			default:
				throw haxe_Exception.thrown(new haxe_xml_XmlParserException("Expected \"",str,p));
			}
			break;
		case 8:
			switch(c) {
			case 38:
				var len = p - start;
				buf.b += len == null ? HxOverrides.substr(str,start,null) : HxOverrides.substr(str,start,len);
				state = 18;
				escapeNext = 8;
				start = p + 1;
				break;
			case 60:case 62:
				if(strict) {
					throw haxe_Exception.thrown(new haxe_xml_XmlParserException("Invalid unescaped " + String.fromCodePoint(c) + " in attribute value",str,p));
				} else if(c == attrValQuote) {
					var len1 = p - start;
					buf.b += len1 == null ? HxOverrides.substr(str,start,null) : HxOverrides.substr(str,start,len1);
					var val = buf.b;
					buf = new StringBuf();
					xml.set(aname,val);
					state = 0;
					next = 4;
				}
				break;
			default:
				if(c == attrValQuote) {
					var len2 = p - start;
					buf.b += len2 == null ? HxOverrides.substr(str,start,null) : HxOverrides.substr(str,start,len2);
					var val1 = buf.b;
					buf = new StringBuf();
					xml.set(aname,val1);
					state = 0;
					next = 4;
				}
			}
			break;
		case 9:
			p = haxe_xml_Parser.doParse(str,strict,p,xml);
			start = p;
			state = 1;
			break;
		case 10:
			if(!(c >= 97 && c <= 122 || c >= 65 && c <= 90 || c >= 48 && c <= 57 || c == 58 || c == 46 || c == 95 || c == 45)) {
				if(start == p) {
					throw haxe_Exception.thrown(new haxe_xml_XmlParserException("Expected node name",str,p));
				}
				var v = HxOverrides.substr(str,start,p - start);
				if(parent == null || parent.nodeType != 0) {
					throw haxe_Exception.thrown(new haxe_xml_XmlParserException("Unexpected </" + v + ">, tag is not open",str,p));
				}
				if(parent.nodeType != Xml.Element) {
					throw haxe_Exception.thrown("Bad node type, expected Element but found " + (parent.nodeType == null ? "null" : XmlType.toString(parent.nodeType)));
				}
				if(v != parent.nodeName) {
					if(parent.nodeType != Xml.Element) {
						throw haxe_Exception.thrown("Bad node type, expected Element but found " + (parent.nodeType == null ? "null" : XmlType.toString(parent.nodeType)));
					}
					throw haxe_Exception.thrown(new haxe_xml_XmlParserException("Expected </" + parent.nodeName + ">",str,p));
				}
				state = 0;
				next = 12;
				continue;
			}
			break;
		case 11:
			if(c == 62) {
				state = 1;
			} else {
				throw haxe_Exception.thrown(new haxe_xml_XmlParserException("Expected >",str,p));
			}
			break;
		case 12:
			if(c == 62) {
				if(nsubs == 0) {
					parent.addChild(Xml.createPCData(""));
				}
				return p;
			} else {
				throw haxe_Exception.thrown(new haxe_xml_XmlParserException("Expected >",str,p));
			}
			break;
		case 13:
			if(c == 60) {
				var len3 = p - start;
				buf.b += len3 == null ? HxOverrides.substr(str,start,null) : HxOverrides.substr(str,start,len3);
				var child = Xml.createPCData(buf.b);
				buf = new StringBuf();
				parent.addChild(child);
				++nsubs;
				state = 0;
				next = 2;
			} else if(c == 38) {
				var len4 = p - start;
				buf.b += len4 == null ? HxOverrides.substr(str,start,null) : HxOverrides.substr(str,start,len4);
				state = 18;
				escapeNext = 13;
				start = p + 1;
			}
			break;
		case 14:
			if(c == 63 && str.charCodeAt(p + 1) == 62) {
				++p;
				var str1 = HxOverrides.substr(str,start + 1,p - start - 2);
				parent.addChild(Xml.createProcessingInstruction(str1));
				++nsubs;
				state = 1;
			}
			break;
		case 15:
			if(c == 45 && str.charCodeAt(p + 1) == 45 && str.charCodeAt(p + 2) == 62) {
				parent.addChild(Xml.createComment(HxOverrides.substr(str,start,p - start)));
				++nsubs;
				p += 2;
				state = 1;
			}
			break;
		case 16:
			if(c == 91) {
				++nbrackets;
			} else if(c == 93) {
				--nbrackets;
			} else if(c == 62 && nbrackets == 0) {
				parent.addChild(Xml.createDocType(HxOverrides.substr(str,start,p - start)));
				++nsubs;
				state = 1;
			}
			break;
		case 17:
			if(c == 93 && str.charCodeAt(p + 1) == 93 && str.charCodeAt(p + 2) == 62) {
				var child1 = Xml.createCData(HxOverrides.substr(str,start,p - start));
				parent.addChild(child1);
				++nsubs;
				p += 2;
				state = 1;
			}
			break;
		case 18:
			if(c == 59) {
				var s = HxOverrides.substr(str,start,p - start);
				if(s.charCodeAt(0) == 35) {
					var c1 = s.charCodeAt(1) == 120 ? Std.parseInt("0" + HxOverrides.substr(s,1,s.length - 1)) : Std.parseInt(HxOverrides.substr(s,1,s.length - 1));
					buf.b += String.fromCodePoint(c1);
				} else if(!Object.prototype.hasOwnProperty.call(haxe_xml_Parser.escapes.h,s)) {
					if(strict) {
						throw haxe_Exception.thrown(new haxe_xml_XmlParserException("Undefined entity: " + s,str,p));
					}
					buf.b += Std.string("&" + s + ";");
				} else {
					buf.b += Std.string(haxe_xml_Parser.escapes.h[s]);
				}
				start = p + 1;
				state = escapeNext;
			} else if(!(c >= 97 && c <= 122 || c >= 65 && c <= 90 || c >= 48 && c <= 57 || c == 58 || c == 46 || c == 95 || c == 45) && c != 35) {
				if(strict) {
					throw haxe_Exception.thrown(new haxe_xml_XmlParserException("Invalid character in entity: " + String.fromCodePoint(c),str,p));
				}
				buf.b += String.fromCodePoint(38);
				var len5 = p - start;
				buf.b += len5 == null ? HxOverrides.substr(str,start,null) : HxOverrides.substr(str,start,len5);
				--p;
				start = p + 1;
				state = escapeNext;
			}
			break;
		}
		++p;
	}
	if(state == 1) {
		start = p;
		state = 13;
	}
	if(state == 13) {
		if(parent.nodeType == 0) {
			if(parent.nodeType != Xml.Element) {
				throw haxe_Exception.thrown("Bad node type, expected Element but found " + (parent.nodeType == null ? "null" : XmlType.toString(parent.nodeType)));
			}
			throw haxe_Exception.thrown(new haxe_xml_XmlParserException("Unclosed node <" + parent.nodeName + ">",str,p));
		}
		if(p != start || nsubs == 0) {
			var len = p - start;
			buf.b += len == null ? HxOverrides.substr(str,start,null) : HxOverrides.substr(str,start,len);
			parent.addChild(Xml.createPCData(buf.b));
			++nsubs;
		}
		return p;
	}
	if(!strict && state == 18 && escapeNext == 13) {
		buf.b += String.fromCodePoint(38);
		var len = p - start;
		buf.b += len == null ? HxOverrides.substr(str,start,null) : HxOverrides.substr(str,start,len);
		parent.addChild(Xml.createPCData(buf.b));
		++nsubs;
		return p;
	}
	throw haxe_Exception.thrown(new haxe_xml_XmlParserException("Unexpected end",str,p));
};
var haxe_xml_Printer = function(pretty) {
	this.output = new StringBuf();
	this.pretty = pretty;
};
$hxClasses["haxe.xml.Printer"] = haxe_xml_Printer;
haxe_xml_Printer.__name__ = "haxe.xml.Printer";
haxe_xml_Printer.print = function(xml,pretty) {
	if(pretty == null) {
		pretty = false;
	}
	var printer = new haxe_xml_Printer(pretty);
	printer.writeNode(xml,"");
	return printer.output.b;
};
haxe_xml_Printer.prototype = {
	writeNode: function(value,tabs) {
		switch(value.nodeType) {
		case 0:
			this.output.b += Std.string(tabs + "<");
			if(value.nodeType != Xml.Element) {
				throw haxe_Exception.thrown("Bad node type, expected Element but found " + (value.nodeType == null ? "null" : XmlType.toString(value.nodeType)));
			}
			this.output.b += Std.string(value.nodeName);
			var attribute = value.attributes();
			while(attribute.hasNext()) {
				var attribute1 = attribute.next();
				this.output.b += Std.string(" " + attribute1 + "=\"");
				var input = StringTools.htmlEscape(value.get(attribute1),true);
				this.output.b += Std.string(input);
				this.output.b += "\"";
			}
			if(this.hasChildren(value)) {
				this.output.b += ">";
				if(this.pretty) {
					this.output.b += "\n";
				}
				if(value.nodeType != Xml.Document && value.nodeType != Xml.Element) {
					throw haxe_Exception.thrown("Bad node type, expected Element or Document but found " + (value.nodeType == null ? "null" : XmlType.toString(value.nodeType)));
				}
				var _g_current = 0;
				var _g_array = value.children;
				while(_g_current < _g_array.length) {
					var child = _g_array[_g_current++];
					this.writeNode(child,this.pretty ? tabs + "\t" : tabs);
				}
				this.output.b += Std.string(tabs + "</");
				if(value.nodeType != Xml.Element) {
					throw haxe_Exception.thrown("Bad node type, expected Element but found " + (value.nodeType == null ? "null" : XmlType.toString(value.nodeType)));
				}
				this.output.b += Std.string(value.nodeName);
				this.output.b += ">";
				if(this.pretty) {
					this.output.b += "\n";
				}
			} else {
				this.output.b += "/>";
				if(this.pretty) {
					this.output.b += "\n";
				}
			}
			break;
		case 1:
			if(value.nodeType == Xml.Document || value.nodeType == Xml.Element) {
				throw haxe_Exception.thrown("Bad node type, unexpected " + (value.nodeType == null ? "null" : XmlType.toString(value.nodeType)));
			}
			var nodeValue = value.nodeValue;
			if(nodeValue.length != 0) {
				var input = tabs + StringTools.htmlEscape(nodeValue);
				this.output.b += Std.string(input);
				if(this.pretty) {
					this.output.b += "\n";
				}
			}
			break;
		case 2:
			this.output.b += Std.string(tabs + "<![CDATA[");
			if(value.nodeType == Xml.Document || value.nodeType == Xml.Element) {
				throw haxe_Exception.thrown("Bad node type, unexpected " + (value.nodeType == null ? "null" : XmlType.toString(value.nodeType)));
			}
			this.output.b += Std.string(value.nodeValue);
			this.output.b += "]]>";
			if(this.pretty) {
				this.output.b += "\n";
			}
			break;
		case 3:
			if(value.nodeType == Xml.Document || value.nodeType == Xml.Element) {
				throw haxe_Exception.thrown("Bad node type, unexpected " + (value.nodeType == null ? "null" : XmlType.toString(value.nodeType)));
			}
			var commentContent = value.nodeValue;
			var _this_r = new RegExp("[\n\r\t]+","g".split("u").join(""));
			commentContent = commentContent.replace(_this_r,"");
			commentContent = "<!--" + commentContent + "-->";
			this.output.b += tabs == null ? "null" : "" + tabs;
			var input = StringTools.trim(commentContent);
			this.output.b += Std.string(input);
			if(this.pretty) {
				this.output.b += "\n";
			}
			break;
		case 4:
			if(value.nodeType == Xml.Document || value.nodeType == Xml.Element) {
				throw haxe_Exception.thrown("Bad node type, unexpected " + (value.nodeType == null ? "null" : XmlType.toString(value.nodeType)));
			}
			this.output.b += Std.string("<!DOCTYPE " + value.nodeValue + ">");
			if(this.pretty) {
				this.output.b += "\n";
			}
			break;
		case 5:
			if(value.nodeType == Xml.Document || value.nodeType == Xml.Element) {
				throw haxe_Exception.thrown("Bad node type, unexpected " + (value.nodeType == null ? "null" : XmlType.toString(value.nodeType)));
			}
			this.output.b += Std.string("<?" + value.nodeValue + "?>");
			if(this.pretty) {
				this.output.b += "\n";
			}
			break;
		case 6:
			if(value.nodeType != Xml.Document && value.nodeType != Xml.Element) {
				throw haxe_Exception.thrown("Bad node type, expected Element or Document but found " + (value.nodeType == null ? "null" : XmlType.toString(value.nodeType)));
			}
			var _g_current = 0;
			var _g_array = value.children;
			while(_g_current < _g_array.length) {
				var child = _g_array[_g_current++];
				this.writeNode(child,tabs);
			}
			break;
		}
	}
	,hasChildren: function(value) {
		if(value.nodeType != Xml.Document && value.nodeType != Xml.Element) {
			throw haxe_Exception.thrown("Bad node type, expected Element or Document but found " + (value.nodeType == null ? "null" : XmlType.toString(value.nodeType)));
		}
		var _g_current = 0;
		var _g_array = value.children;
		while(_g_current < _g_array.length) {
			var child = _g_array[_g_current++];
			switch(child.nodeType) {
			case 0:case 1:
				return true;
			case 2:case 3:
				if(child.nodeType == Xml.Document || child.nodeType == Xml.Element) {
					throw haxe_Exception.thrown("Bad node type, unexpected " + (child.nodeType == null ? "null" : XmlType.toString(child.nodeType)));
				}
				if(StringTools.ltrim(child.nodeValue).length != 0) {
					return true;
				}
				break;
			default:
			}
		}
		return false;
	}
	,__class__: haxe_xml_Printer
};
var js_Boot = function() { };
$hxClasses["js.Boot"] = js_Boot;
js_Boot.__name__ = "js.Boot";
js_Boot.getClass = function(o) {
	if(o == null) {
		return null;
	} else if(((o) instanceof Array)) {
		return Array;
	} else {
		var cl = o.__class__;
		if(cl != null) {
			return cl;
		}
		var name = js_Boot.__nativeClassName(o);
		if(name != null) {
			return js_Boot.__resolveNativeClass(name);
		}
		return null;
	}
};
js_Boot.__string_rec = function(o,s) {
	if(o == null) {
		return "null";
	}
	if(s.length >= 5) {
		return "<...>";
	}
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) {
		t = "object";
	}
	switch(t) {
	case "function":
		return "<function>";
	case "object":
		if(o.__enum__) {
			var e = $hxEnums[o.__enum__];
			var con = e.__constructs__[o._hx_index];
			var n = con._hx_name;
			if(con.__params__) {
				s = s + "\t";
				return n + "(" + ((function($this) {
					var $r;
					var _g = [];
					{
						var _g1 = 0;
						var _g2 = con.__params__;
						while(true) {
							if(!(_g1 < _g2.length)) {
								break;
							}
							var p = _g2[_g1];
							_g1 = _g1 + 1;
							_g.push(js_Boot.__string_rec(o[p],s));
						}
					}
					$r = _g;
					return $r;
				}(this))).join(",") + ")";
			} else {
				return n;
			}
		}
		if(((o) instanceof Array)) {
			var str = "[";
			s += "\t";
			var _g = 0;
			var _g1 = o.length;
			while(_g < _g1) {
				var i = _g++;
				str += (i > 0 ? "," : "") + js_Boot.__string_rec(o[i],s);
			}
			str += "]";
			return str;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( _g ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") {
				return s2;
			}
		}
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		var k = null;
		for( k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) {
			str += ", \n";
		}
		str += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "string":
		return o;
	default:
		return String(o);
	}
};
js_Boot.__interfLoop = function(cc,cl) {
	if(cc == null) {
		return false;
	}
	if(cc == cl) {
		return true;
	}
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g = 0;
		var _g1 = intf.length;
		while(_g < _g1) {
			var i = _g++;
			var i1 = intf[i];
			if(i1 == cl || js_Boot.__interfLoop(i1,cl)) {
				return true;
			}
		}
	}
	return js_Boot.__interfLoop(cc.__super__,cl);
};
js_Boot.__instanceof = function(o,cl) {
	if(cl == null) {
		return false;
	}
	switch(cl) {
	case Array:
		return ((o) instanceof Array);
	case Bool:
		return typeof(o) == "boolean";
	case Dynamic:
		return o != null;
	case Float:
		return typeof(o) == "number";
	case Int:
		if(typeof(o) == "number") {
			return ((o | 0) === o);
		} else {
			return false;
		}
		break;
	case String:
		return typeof(o) == "string";
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(js_Boot.__downcastCheck(o,cl)) {
					return true;
				}
			} else if(typeof(cl) == "object" && js_Boot.__isNativeObj(cl)) {
				if(((o) instanceof cl)) {
					return true;
				}
			}
		} else {
			return false;
		}
		if(cl == Class ? o.__name__ != null : false) {
			return true;
		}
		if(cl == Enum ? o.__ename__ != null : false) {
			return true;
		}
		return o.__enum__ != null ? $hxEnums[o.__enum__] == cl : false;
	}
};
js_Boot.__downcastCheck = function(o,cl) {
	if(!((o) instanceof cl)) {
		if(cl.__isInterface__) {
			return js_Boot.__interfLoop(js_Boot.getClass(o),cl);
		} else {
			return false;
		}
	} else {
		return true;
	}
};
js_Boot.__implements = function(o,iface) {
	return js_Boot.__interfLoop(js_Boot.getClass(o),iface);
};
js_Boot.__cast = function(o,t) {
	if(o == null || js_Boot.__instanceof(o,t)) {
		return o;
	} else {
		throw haxe_Exception.thrown("Cannot cast " + Std.string(o) + " to " + Std.string(t));
	}
};
js_Boot.__nativeClassName = function(o) {
	var name = js_Boot.__toStr.call(o).slice(8,-1);
	if(name == "Object" || name == "Function" || name == "Math" || name == "JSON") {
		return null;
	}
	return name;
};
js_Boot.__isNativeObj = function(o) {
	return js_Boot.__nativeClassName(o) != null;
};
js_Boot.__resolveNativeClass = function(name) {
	return $global[name];
};
var js_Browser = function() { };
$hxClasses["js.Browser"] = js_Browser;
js_Browser.__name__ = "js.Browser";
js_Browser.__properties__ = {get_supported:"get_supported"};
js_Browser.get_supported = function() {
	if(typeof(window) != "undefined" && typeof(window.location) != "undefined") {
		return typeof(window.location.protocol) == "string";
	} else {
		return false;
	}
};
js_Browser.createXMLHttpRequest = function() {
	if(typeof XMLHttpRequest != "undefined") {
		return new XMLHttpRequest();
	}
	if(typeof ActiveXObject != "undefined") {
		return new ActiveXObject("Microsoft.XMLHTTP");
	}
	throw haxe_Exception.thrown("Unable to create XMLHttpRequest object.");
};
var motion_actuators_IGenericActuator = function() { };
$hxClasses["motion.actuators.IGenericActuator"] = motion_actuators_IGenericActuator;
motion_actuators_IGenericActuator.__name__ = "motion.actuators.IGenericActuator";
motion_actuators_IGenericActuator.__isInterface__ = true;
motion_actuators_IGenericActuator.prototype = {
	__class__: motion_actuators_IGenericActuator
};
var motion_actuators_GenericActuator = function(target,duration,properties) {
	this._autoVisible = true;
	this._delay = 0;
	this._reflect = false;
	this._repeat = 0;
	this._reverse = false;
	this._smartRotation = false;
	this._snapping = false;
	this.special = false;
	this.target = target;
	this.properties = properties;
	this.duration = duration;
	this._ease = motion_Actuate.defaultEase;
};
$hxClasses["motion.actuators.GenericActuator"] = motion_actuators_GenericActuator;
motion_actuators_GenericActuator.__name__ = "motion.actuators.GenericActuator";
motion_actuators_GenericActuator.__interfaces__ = [motion_actuators_IGenericActuator];
motion_actuators_GenericActuator.prototype = {
	apply: function() {
		var _g = 0;
		var _g1 = Reflect.fields(this.properties);
		while(_g < _g1.length) {
			var i = _g1[_g];
			++_g;
			if(Object.prototype.hasOwnProperty.call(this.target,i)) {
				this.target[i] = Reflect.field(this.properties,i);
			} else {
				Reflect.setProperty(this.target,i,Reflect.field(this.properties,i));
			}
		}
	}
	,autoVisible: function(value) {
		if(value == null) {
			value = true;
		}
		this._autoVisible = value;
		return this;
	}
	,callMethod: function(method,params) {
		if(params == null) {
			params = [];
		}
		return method.apply(method,params);
	}
	,change: function() {
		if(this._onUpdate != null) {
			var method = this._onUpdate;
			var params = this._onUpdateParams;
			if(params == null) {
				params = [];
			}
			method.apply(method,params);
		}
	}
	,complete: function(sendEvent) {
		if(sendEvent == null) {
			sendEvent = true;
		}
		if(sendEvent) {
			this.change();
			if(this._onComplete != null) {
				var method = this._onComplete;
				var params = this._onCompleteParams;
				if(params == null) {
					params = [];
				}
				method.apply(method,params);
			}
		}
		motion_Actuate.unload(this);
	}
	,delay: function(duration) {
		this._delay = duration;
		return this;
	}
	,ease: function(easing) {
		this._ease = easing;
		return this;
	}
	,move: function() {
	}
	,onComplete: function(handler,parameters) {
		this._onComplete = handler;
		if(parameters == null) {
			this._onCompleteParams = [];
		} else {
			this._onCompleteParams = parameters;
		}
		if(this.duration == 0) {
			this.complete();
		}
		return this;
	}
	,onRepeat: function(handler,parameters) {
		this._onRepeat = handler;
		if(parameters == null) {
			this._onRepeatParams = [];
		} else {
			this._onRepeatParams = parameters;
		}
		return this;
	}
	,onUpdate: function(handler,parameters) {
		this._onUpdate = handler;
		if(parameters == null) {
			this._onUpdateParams = [];
		} else {
			this._onUpdateParams = parameters;
		}
		return this;
	}
	,onPause: function(handler,parameters) {
		this._onPause = handler;
		if(parameters == null) {
			this._onPauseParams = [];
		} else {
			this._onPauseParams = parameters;
		}
		return this;
	}
	,onResume: function(handler,parameters) {
		this._onResume = handler;
		if(parameters == null) {
			this._onResumeParams = [];
		} else {
			this._onResumeParams = parameters;
		}
		return this;
	}
	,pause: function() {
		if(this._onPause != null) {
			var method = this._onPause;
			var params = this._onPauseParams;
			if(params == null) {
				params = [];
			}
			method.apply(method,params);
		}
	}
	,reflect: function(value) {
		if(value == null) {
			value = true;
		}
		this._reflect = value;
		this.special = true;
		return this;
	}
	,repeat: function(times) {
		if(times == null) {
			times = -1;
		}
		this._repeat = times;
		return this;
	}
	,resume: function() {
		if(this._onResume != null) {
			var method = this._onResume;
			var params = this._onResumeParams;
			if(params == null) {
				params = [];
			}
			method.apply(method,params);
		}
	}
	,reverse: function(value) {
		if(value == null) {
			value = true;
		}
		this._reverse = value;
		this.special = true;
		return this;
	}
	,smartRotation: function(value) {
		if(value == null) {
			value = true;
		}
		this._smartRotation = value;
		this.special = true;
		return this;
	}
	,snapping: function(value) {
		if(value == null) {
			value = true;
		}
		this._snapping = value;
		this.special = true;
		return this;
	}
	,stop: function(properties,complete,sendEvent) {
	}
	,__class__: motion_actuators_GenericActuator
};
var motion_actuators_SimpleActuator = function(target,duration,properties) {
	this.active = true;
	this.propertyDetails = [];
	this.sendChange = false;
	this.paused = false;
	this.cacheVisible = false;
	this.initialized = false;
	this.setVisible = false;
	this.toggleVisible = false;
	this.startTime = window.performance.now() / 1000;
	motion_actuators_GenericActuator.call(this,target,duration,properties);
	if(!motion_actuators_SimpleActuator.addedEvent) {
		motion_actuators_SimpleActuator.addedEvent = true;
		window.requestAnimationFrame(motion_actuators_SimpleActuator.stage_onEnterFrame);
	}
};
$hxClasses["motion.actuators.SimpleActuator"] = motion_actuators_SimpleActuator;
motion_actuators_SimpleActuator.__name__ = "motion.actuators.SimpleActuator";
motion_actuators_SimpleActuator.stage_onEnterFrame = function(deltaTime) {
	var currentTime = deltaTime / 1000;
	var actuator;
	var j = 0;
	var cleanup = false;
	var _g = 0;
	var _g1 = motion_actuators_SimpleActuator.actuatorsLength;
	while(_g < _g1) {
		var i = _g++;
		actuator = motion_actuators_SimpleActuator.actuators[j];
		if(actuator != null && actuator.active) {
			if(currentTime >= actuator.timeOffset) {
				actuator.update(currentTime);
			}
			++j;
		} else {
			motion_actuators_SimpleActuator.actuators.splice(j,1);
			--motion_actuators_SimpleActuator.actuatorsLength;
		}
	}
	window.requestAnimationFrame(motion_actuators_SimpleActuator.stage_onEnterFrame);
};
motion_actuators_SimpleActuator.__super__ = motion_actuators_GenericActuator;
motion_actuators_SimpleActuator.prototype = $extend(motion_actuators_GenericActuator.prototype,{
	apply: function() {
		motion_actuators_GenericActuator.prototype.apply.call(this);
		if(this.toggleVisible && Object.prototype.hasOwnProperty.call(this.properties,"alpha")) {
			var target = this.target;
			var value = null;
			if(Object.prototype.hasOwnProperty.call(target,"visible")) {
				value = Reflect.field(target,"visible");
			} else {
				value = Reflect.getProperty(target,"visible");
			}
			if(value != null) {
				var target = this.target;
				var value = Reflect.field(this.properties,"alpha") > 0;
				if(Object.prototype.hasOwnProperty.call(target,"visible")) {
					target["visible"] = value;
				} else {
					Reflect.setProperty(target,"visible",value);
				}
			}
		}
	}
	,autoVisible: function(value) {
		if(value == null) {
			value = true;
		}
		this._autoVisible = value;
		if(!value) {
			this.toggleVisible = false;
			if(this.setVisible) {
				var target = this.target;
				var value = this.cacheVisible;
				if(Object.prototype.hasOwnProperty.call(target,"visible")) {
					target["visible"] = value;
				} else {
					Reflect.setProperty(target,"visible",value);
				}
			}
		}
		return this;
	}
	,delay: function(duration) {
		this._delay = duration;
		this.timeOffset = this.startTime + duration;
		return this;
	}
	,getField: function(target,propertyName) {
		var value = null;
		if(Object.prototype.hasOwnProperty.call(target,propertyName)) {
			value = Reflect.field(target,propertyName);
		} else {
			value = Reflect.getProperty(target,propertyName);
		}
		return value;
	}
	,initialize: function() {
		var details;
		var start;
		var _g = 0;
		var _g1 = Reflect.fields(this.properties);
		while(_g < _g1.length) {
			var i = _g1[_g];
			++_g;
			var isField = true;
			if(Object.prototype.hasOwnProperty.call(this.target,i)) {
				start = Reflect.field(this.target,i);
			} else {
				isField = false;
				start = Reflect.getProperty(this.target,i);
			}
			if(typeof(start) == "number") {
				var target = this.properties;
				var value = null;
				if(Object.prototype.hasOwnProperty.call(target,i)) {
					value = Reflect.field(target,i);
				} else {
					value = Reflect.getProperty(target,i);
				}
				var value1 = value;
				if(start == null) {
					start = 0;
				}
				if(value1 == null) {
					value1 = 0;
				}
				details = new motion_actuators_PropertyDetails(this.target,i,start,value1 - start,isField);
				this.propertyDetails.push(details);
			}
		}
		this.detailsLength = this.propertyDetails.length;
		this.initialized = true;
	}
	,move: function() {
		this.toggleVisible = Object.prototype.hasOwnProperty.call(this.properties,"alpha") && Object.prototype.hasOwnProperty.call(this.properties,"visible");
		var tmp;
		if(this.toggleVisible && this.properties.alpha != 0) {
			var target = this.target;
			var value = null;
			if(Object.prototype.hasOwnProperty.call(target,"visible")) {
				value = Reflect.field(target,"visible");
			} else {
				value = Reflect.getProperty(target,"visible");
			}
			tmp = !value;
		} else {
			tmp = false;
		}
		if(tmp) {
			this.setVisible = true;
			var target = this.target;
			var value = null;
			if(Object.prototype.hasOwnProperty.call(target,"visible")) {
				value = Reflect.field(target,"visible");
			} else {
				value = Reflect.getProperty(target,"visible");
			}
			this.cacheVisible = value;
			var target = this.target;
			var value = true;
			if(Object.prototype.hasOwnProperty.call(target,"visible")) {
				target["visible"] = value;
			} else {
				Reflect.setProperty(target,"visible",value);
			}
		}
		this.timeOffset = this.startTime;
		motion_actuators_SimpleActuator.actuators.push(this);
		++motion_actuators_SimpleActuator.actuatorsLength;
	}
	,onUpdate: function(handler,parameters) {
		this._onUpdate = handler;
		if(parameters == null) {
			this._onUpdateParams = [];
		} else {
			this._onUpdateParams = parameters;
		}
		this.sendChange = true;
		return this;
	}
	,pause: function() {
		if(!this.paused) {
			this.paused = true;
			motion_actuators_GenericActuator.prototype.pause.call(this);
			this.pauseTime = window.performance.now() / 1000;
		}
	}
	,resume: function() {
		if(this.paused) {
			this.paused = false;
			this.timeOffset += (window.performance.now() - this.pauseTime) / 1000;
			motion_actuators_GenericActuator.prototype.resume.call(this);
		}
	}
	,setField: function(target,propertyName,value) {
		if(Object.prototype.hasOwnProperty.call(target,propertyName)) {
			target[propertyName] = value;
		} else {
			Reflect.setProperty(target,propertyName,value);
		}
	}
	,setProperty: function(details,value) {
		if(details.isField) {
			details.target[details.propertyName] = value;
		} else {
			Reflect.setProperty(details.target,details.propertyName,value);
		}
	}
	,stop: function(properties,complete,sendEvent) {
		if(this.active) {
			if(properties == null) {
				this.active = false;
				if(complete) {
					this.apply();
				}
				this.complete(sendEvent);
				return;
			}
			var _g = 0;
			var _g1 = Reflect.fields(properties);
			while(_g < _g1.length) {
				var i = _g1[_g];
				++_g;
				if(Object.prototype.hasOwnProperty.call(this.properties,i)) {
					this.active = false;
					if(complete) {
						this.apply();
					}
					this.complete(sendEvent);
					return;
				}
			}
		}
	}
	,update: function(currentTime) {
		if(!this.paused) {
			var details;
			var easing;
			var i;
			var tweenPosition = (currentTime - this.timeOffset) / this.duration;
			if(tweenPosition > 1) {
				tweenPosition = 1;
			}
			if(!this.initialized) {
				this.initialize();
			}
			if(!this.special) {
				easing = this._ease.calculate(tweenPosition);
				var _g = 0;
				var _g1 = this.detailsLength;
				while(_g < _g1) {
					var i = _g++;
					details = this.propertyDetails[i];
					var value = details.start + details.change * easing;
					if(details.isField) {
						details.target[details.propertyName] = value;
					} else {
						Reflect.setProperty(details.target,details.propertyName,value);
					}
				}
			} else {
				if(!this._reverse) {
					easing = this._ease.calculate(tweenPosition);
				} else {
					easing = this._ease.calculate(1 - tweenPosition);
				}
				var endValue;
				var _g = 0;
				var _g1 = this.detailsLength;
				while(_g < _g1) {
					var i = _g++;
					details = this.propertyDetails[i];
					if(this._smartRotation && (details.propertyName == "rotation" || details.propertyName == "rotationX" || details.propertyName == "rotationY" || details.propertyName == "rotationZ")) {
						var rotation = details.change % 360;
						if(rotation > 180) {
							rotation -= 360;
						} else if(rotation < -180) {
							rotation += 360;
						}
						endValue = details.start + rotation * easing;
					} else {
						endValue = details.start + details.change * easing;
					}
					if(!this._snapping) {
						var value = endValue;
						if(details.isField) {
							details.target[details.propertyName] = value;
						} else {
							Reflect.setProperty(details.target,details.propertyName,value);
						}
					} else {
						var value1 = Math.round(endValue);
						if(details.isField) {
							details.target[details.propertyName] = value1;
						} else {
							Reflect.setProperty(details.target,details.propertyName,value1);
						}
					}
				}
			}
			if(tweenPosition == 1) {
				if(this._repeat == 0) {
					this.active = false;
					var tmp;
					if(this.toggleVisible) {
						var target = this.target;
						var value = null;
						if(Object.prototype.hasOwnProperty.call(target,"alpha")) {
							value = Reflect.field(target,"alpha");
						} else {
							value = Reflect.getProperty(target,"alpha");
						}
						tmp = value == 0;
					} else {
						tmp = false;
					}
					if(tmp) {
						var target = this.target;
						var value = false;
						if(Object.prototype.hasOwnProperty.call(target,"visible")) {
							target["visible"] = value;
						} else {
							Reflect.setProperty(target,"visible",value);
						}
					}
					this.complete(true);
					return;
				} else {
					if(this._onRepeat != null) {
						var method = this._onRepeat;
						var params = this._onRepeatParams;
						if(params == null) {
							params = [];
						}
						method.apply(method,params);
					}
					if(this._reflect) {
						this._reverse = !this._reverse;
					}
					this.startTime = currentTime;
					this.timeOffset = this.startTime + this._delay;
					if(this._repeat > 0) {
						this._repeat--;
					}
				}
			}
			if(this.sendChange) {
				this.change();
			}
		}
	}
	,__class__: motion_actuators_SimpleActuator
});
var motion_easing_IEasing = function() { };
$hxClasses["motion.easing.IEasing"] = motion_easing_IEasing;
motion_easing_IEasing.__name__ = "motion.easing.IEasing";
motion_easing_IEasing.__isInterface__ = true;
motion_easing_IEasing.prototype = {
	__class__: motion_easing_IEasing
};
var motion_easing__$Expo_ExpoEaseIn = function() {
};
$hxClasses["motion.easing._Expo.ExpoEaseIn"] = motion_easing__$Expo_ExpoEaseIn;
motion_easing__$Expo_ExpoEaseIn.__name__ = "motion.easing._Expo.ExpoEaseIn";
motion_easing__$Expo_ExpoEaseIn.__interfaces__ = [motion_easing_IEasing];
motion_easing__$Expo_ExpoEaseIn.prototype = {
	calculate: function(k) {
		if(k == 0) {
			return 0;
		} else {
			return Math.exp(6.931471805599453 * (k - 1));
		}
	}
	,ease: function(t,b,c,d) {
		if(t == 0) {
			return b;
		} else {
			return c * Math.exp(6.931471805599453 * (t / d - 1)) + b;
		}
	}
	,__class__: motion_easing__$Expo_ExpoEaseIn
};
var motion_easing__$Expo_ExpoEaseInOut = function() {
};
$hxClasses["motion.easing._Expo.ExpoEaseInOut"] = motion_easing__$Expo_ExpoEaseInOut;
motion_easing__$Expo_ExpoEaseInOut.__name__ = "motion.easing._Expo.ExpoEaseInOut";
motion_easing__$Expo_ExpoEaseInOut.__interfaces__ = [motion_easing_IEasing];
motion_easing__$Expo_ExpoEaseInOut.prototype = {
	calculate: function(k) {
		if(k == 0) {
			return 0;
		}
		if(k == 1) {
			return 1;
		}
		if((k /= 0.5) < 1.0) {
			return 0.5 * Math.exp(6.931471805599453 * (k - 1));
		}
		return 0.5 * (2 - Math.exp(-6.931471805599453 * --k));
	}
	,ease: function(t,b,c,d) {
		if(t == 0) {
			return b;
		}
		if(t == d) {
			return b + c;
		}
		if((t /= d / 2.0) < 1.0) {
			return c / 2 * Math.exp(6.931471805599453 * (t - 1)) + b;
		}
		return c / 2 * (2 - Math.exp(-6.931471805599453 * --t)) + b;
	}
	,__class__: motion_easing__$Expo_ExpoEaseInOut
};
var motion_easing__$Expo_ExpoEaseOut = function() {
};
$hxClasses["motion.easing._Expo.ExpoEaseOut"] = motion_easing__$Expo_ExpoEaseOut;
motion_easing__$Expo_ExpoEaseOut.__name__ = "motion.easing._Expo.ExpoEaseOut";
motion_easing__$Expo_ExpoEaseOut.__interfaces__ = [motion_easing_IEasing];
motion_easing__$Expo_ExpoEaseOut.prototype = {
	calculate: function(k) {
		if(k == 1) {
			return 1;
		} else {
			return 1 - Math.exp(-6.931471805599453 * k);
		}
	}
	,ease: function(t,b,c,d) {
		if(t == d) {
			return b + c;
		} else {
			return c * (1 - Math.exp(-6.931471805599453 * t / d)) + b;
		}
	}
	,__class__: motion_easing__$Expo_ExpoEaseOut
};
var motion_easing_Expo = function() { };
$hxClasses["motion.easing.Expo"] = motion_easing_Expo;
motion_easing_Expo.__name__ = "motion.easing.Expo";
var motion_Actuate = function() { };
$hxClasses["motion.Actuate"] = motion_Actuate;
motion_Actuate.__name__ = "motion.Actuate";
motion_Actuate.apply = function(target,properties,customActuator) {
	motion_Actuate.stop(target,properties);
	if(customActuator == null) {
		customActuator = motion_Actuate.defaultActuator;
	}
	var actuator = Type.createInstance(customActuator,[target,0,properties]);
	actuator.apply();
	return actuator;
};
motion_Actuate.getLibrary = function(target,allowCreation) {
	if(allowCreation == null) {
		allowCreation = true;
	}
	if(motion_Actuate.targetLibraries.h.__keys__[target.__id__] == null && allowCreation) {
		motion_Actuate.targetLibraries.set(target,[]);
	}
	return motion_Actuate.targetLibraries.h[target.__id__];
};
motion_Actuate.isActive = function() {
	var result = false;
	var library = motion_Actuate.targetLibraries.iterator();
	while(library.hasNext()) {
		var library1 = library.next();
		result = true;
		break;
	}
	return result;
};
motion_Actuate.motionPath = function(target,duration,properties,overwrite) {
	if(overwrite == null) {
		overwrite = true;
	}
	return motion_Actuate.tween(target,duration,properties,overwrite,motion_actuators_MotionPathActuator);
};
motion_Actuate.pause = function(target) {
	if(js_Boot.__implements(target,motion_actuators_IGenericActuator)) {
		var actuator = target;
		actuator.pause();
	} else {
		var library = motion_Actuate.getLibrary(target,false);
		if(library != null) {
			var _g = 0;
			while(_g < library.length) {
				var actuator = library[_g];
				++_g;
				actuator.pause();
			}
		}
	}
};
motion_Actuate.pauseAll = function() {
	var library = motion_Actuate.targetLibraries.iterator();
	while(library.hasNext()) {
		var library1 = library.next();
		var _g = 0;
		while(_g < library1.length) {
			var actuator = library1[_g];
			++_g;
			actuator.pause();
		}
	}
};
motion_Actuate.reset = function() {
	var library = motion_Actuate.targetLibraries.iterator();
	while(library.hasNext()) {
		var library1 = library.next();
		var i = library1.length - 1;
		while(i >= 0) {
			library1[i].stop(null,false,false);
			--i;
		}
	}
	motion_Actuate.targetLibraries = new haxe_ds_ObjectMap();
};
motion_Actuate.resume = function(target) {
	if(js_Boot.__implements(target,motion_actuators_IGenericActuator)) {
		var actuator = target;
		actuator.resume();
	} else {
		var library = motion_Actuate.getLibrary(target,false);
		if(library != null) {
			var _g = 0;
			while(_g < library.length) {
				var actuator = library[_g];
				++_g;
				actuator.resume();
			}
		}
	}
};
motion_Actuate.resumeAll = function() {
	var library = motion_Actuate.targetLibraries.iterator();
	while(library.hasNext()) {
		var library1 = library.next();
		var _g = 0;
		while(_g < library1.length) {
			var actuator = library1[_g];
			++_g;
			actuator.resume();
		}
	}
};
motion_Actuate.stop = function(target,properties,complete,sendEvent) {
	if(sendEvent == null) {
		sendEvent = true;
	}
	if(complete == null) {
		complete = false;
	}
	if(target != null) {
		if(js_Boot.__implements(target,motion_actuators_IGenericActuator)) {
			var actuator = target;
			actuator.stop(null,complete,sendEvent);
		} else {
			var library = motion_Actuate.getLibrary(target,false);
			if(library != null) {
				if(typeof(properties) == "string") {
					var temp = { };
					temp[properties] = null;
					properties = temp;
				} else if(((properties) instanceof Array)) {
					var temp = { };
					var _g = 0;
					var _g1 = js_Boot.__cast(properties , Array);
					while(_g < _g1.length) {
						var property = _g1[_g];
						++_g;
						temp[property] = null;
					}
					properties = temp;
				}
				var i = library.length - 1;
				while(i >= 0) {
					library[i].stop(properties,complete,sendEvent);
					--i;
				}
			}
		}
	}
};
motion_Actuate.timer = function(duration,customActuator) {
	return motion_Actuate.tween(new motion__$Actuate_TweenTimer(0),duration,new motion__$Actuate_TweenTimer(1),false,customActuator);
};
motion_Actuate.tween = function(target,duration,properties,overwrite,customActuator) {
	if(overwrite == null) {
		overwrite = true;
	}
	if(target != null) {
		if(duration > 0) {
			if(customActuator == null) {
				customActuator = motion_Actuate.defaultActuator;
			}
			var actuator = Type.createInstance(customActuator,[target,duration,properties]);
			var library = motion_Actuate.getLibrary(actuator.target);
			if(overwrite) {
				var i = library.length - 1;
				while(i >= 0) {
					library[i].stop(actuator.properties,false,false);
					--i;
				}
				library = motion_Actuate.getLibrary(actuator.target);
			}
			library.push(actuator);
			actuator.move();
			return actuator;
		} else {
			return motion_Actuate.apply(target,properties,customActuator);
		}
	}
	return null;
};
motion_Actuate.unload = function(actuator) {
	var target = actuator.target;
	if(motion_Actuate.targetLibraries.h.__keys__[target.__id__] != null) {
		HxOverrides.remove(motion_Actuate.targetLibraries.h[target.__id__],actuator);
		if(motion_Actuate.targetLibraries.h[target.__id__].length == 0) {
			motion_Actuate.targetLibraries.remove(target);
		}
	}
};
motion_Actuate.update = function(target,duration,start,end,overwrite) {
	if(overwrite == null) {
		overwrite = true;
	}
	var properties = { start : start, end : end};
	return motion_Actuate.tween(target,duration,properties,overwrite,motion_actuators_MethodActuator);
};
var motion__$Actuate_TweenTimer = function(progress) {
	this.progress = progress;
};
$hxClasses["motion._Actuate.TweenTimer"] = motion__$Actuate_TweenTimer;
motion__$Actuate_TweenTimer.__name__ = "motion._Actuate.TweenTimer";
motion__$Actuate_TweenTimer.prototype = {
	__class__: motion__$Actuate_TweenTimer
};
var motion_MotionPath = function() {
	this._x = new motion__$MotionPath_ComponentPath();
	this._y = new motion__$MotionPath_ComponentPath();
	this._rotation = null;
};
$hxClasses["motion.MotionPath"] = motion_MotionPath;
motion_MotionPath.__name__ = "motion.MotionPath";
motion_MotionPath.prototype = {
	bezier: function(x,y,controlX,controlY,strength) {
		if(strength == null) {
			strength = 1;
		}
		return this.bezierN(x,y,[controlX],[controlY],strength);
	}
	,bezierN: function(x,y,controlX,controlY,strength) {
		if(strength == null) {
			strength = 1;
		}
		this._x.addPath(new motion__$MotionPath_BezierPath(x,controlX,strength));
		this._y.addPath(new motion__$MotionPath_BezierPath(y,controlY,strength));
		return this;
	}
	,bezierSpline: function(x,y,strength) {
		if(strength == null) {
			strength = 1;
		}
		this._x.addPath(new motion__$MotionPath_BezierSplinePath(x,strength));
		this._y.addPath(new motion__$MotionPath_BezierSplinePath(y,strength));
		return this;
	}
	,line: function(x,y,strength) {
		if(strength == null) {
			strength = 1;
		}
		return this.bezierN(x,y,[],[],strength);
	}
	,get_rotation: function() {
		if(this._rotation == null) {
			this._rotation = new motion__$MotionPath_RotationPath(this._x,this._y);
		}
		return this._rotation;
	}
	,get_x: function() {
		return this._x;
	}
	,get_y: function() {
		return this._y;
	}
	,__class__: motion_MotionPath
	,__properties__: {get_y:"get_y",get_x:"get_x",get_rotation:"get_rotation"}
};
var motion_IComponentPath = function() { };
$hxClasses["motion.IComponentPath"] = motion_IComponentPath;
motion_IComponentPath.__name__ = "motion.IComponentPath";
motion_IComponentPath.__isInterface__ = true;
motion_IComponentPath.prototype = {
	__class__: motion_IComponentPath
	,__properties__: {get_end:"get_end",set_start:"set_start",get_start:"get_start"}
};
var motion__$MotionPath_ComponentPath = function() {
	this.paths = [];
	this.strength = 0;
};
$hxClasses["motion._MotionPath.ComponentPath"] = motion__$MotionPath_ComponentPath;
motion__$MotionPath_ComponentPath.__name__ = "motion._MotionPath.ComponentPath";
motion__$MotionPath_ComponentPath.__interfaces__ = [motion_IComponentPath];
motion__$MotionPath_ComponentPath.prototype = {
	addPath: function(path) {
		if(this.paths.length > 0) {
			path.set_start(this.paths[this.paths.length - 1].get_end());
		}
		this.paths.push(path);
		this.strength += path.strength;
	}
	,calculate: function(k) {
		if(this.paths.length == 1) {
			return this.paths[0].calculate(k);
		} else {
			var ratio = k * this.strength;
			var _g = 0;
			var _g1 = this.paths;
			while(_g < _g1.length) {
				var path = _g1[_g];
				++_g;
				if(ratio > path.strength) {
					ratio -= path.strength;
				} else {
					return path.calculate(ratio / path.strength);
				}
			}
		}
		return 0;
	}
	,get_start: function() {
		if(this.paths.length > 0) {
			return this.paths[0].get_start();
		} else {
			return 0;
		}
	}
	,set_start: function(value) {
		if(this.paths.length > 0) {
			return this.paths[0].set_start(value);
		} else {
			return 0;
		}
	}
	,get_end: function() {
		if(this.paths.length > 0) {
			var path = this.paths[this.paths.length - 1];
			return path.get_end();
		} else {
			return this.get_start();
		}
	}
	,__class__: motion__$MotionPath_ComponentPath
	,__properties__: {get_end:"get_end",set_start:"set_start",get_start:"get_start"}
};
var motion__$MotionPath_BezierPath = function(end,control,strength) {
	this._end = end;
	this.control = control;
	this.strength = strength;
};
$hxClasses["motion._MotionPath.BezierPath"] = motion__$MotionPath_BezierPath;
motion__$MotionPath_BezierPath.__name__ = "motion._MotionPath.BezierPath";
motion__$MotionPath_BezierPath.__interfaces__ = [motion_IComponentPath];
motion__$MotionPath_BezierPath.prototype = {
	calculate: function(k) {
		var l = 1 - k;
		switch(this.control.length) {
		case 0:
			return l * this._start + k * this._end;
		case 1:
			return l * l * this._start + 2 * l * k * this.control[0] + k * k * this._end;
		case 2:
			return l * l * l * this._start + 3 * l * l * k * this.control[0] + 3 * l * k * k * this.control[1] + k * k * k * this._end;
		default:
			if(l < 1e-7) {
				return this._end;
			}
			var r = k / l;
			var n = this.control.length + 1;
			var coeff = Math.pow(l,n);
			var res = coeff * this._start;
			var _g = 1;
			var _g1 = n;
			while(_g < _g1) {
				var i = _g++;
				coeff *= r * (n + 1 - i) / i;
				res += coeff * this.control[i - 1];
			}
			coeff *= r / n;
			return res + coeff * this._end;
		}
	}
	,get_start: function() {
		return this._start;
	}
	,set_start: function(value) {
		return this._start = value;
	}
	,get_end: function() {
		return this._end;
	}
	,__class__: motion__$MotionPath_BezierPath
	,__properties__: {get_end:"get_end",set_start:"set_start",get_start:"get_start"}
};
var motion__$MotionPath_BezierSplinePath = function(through,strength) {
	motion__$MotionPath_ComponentPath.call(this);
	this.through = through;
	this.strength = strength;
};
$hxClasses["motion._MotionPath.BezierSplinePath"] = motion__$MotionPath_BezierSplinePath;
motion__$MotionPath_BezierSplinePath.__name__ = "motion._MotionPath.BezierSplinePath";
motion__$MotionPath_BezierSplinePath.__super__ = motion__$MotionPath_ComponentPath;
motion__$MotionPath_BezierSplinePath.prototype = $extend(motion__$MotionPath_ComponentPath.prototype,{
	computeControlPoints: function(start) {
		var K = [start].concat(this.through);
		var n = K.length;
		var _g = [];
		var _g1 = 0;
		var _g2 = n;
		while(_g1 < _g2) {
			var _ = _g1++;
			_g.push([0.0,0.0]);
		}
		var control = _g;
		var a = [];
		var b = [];
		var c = [];
		var r = [];
		a[0] = 0;
		b[0] = 2;
		c[0] = 1;
		r[0] = K[0] + 2 * K[1];
		var _g = 1;
		var _g1 = n - 1;
		while(_g < _g1) {
			var i = _g++;
			a[i] = 1;
			b[i] = 4;
			c[i] = 1;
			r[i] = 4 * K[i] + 2 * K[i + 1];
		}
		a[n - 1] = 1;
		b[n - 1] = 2;
		c[n - 1] = 0;
		r[n - 1] = 3 * K[n - 1];
		var _g = 1;
		var _g1 = n;
		while(_g < _g1) {
			var i = _g++;
			var m = a[i] / b[i - 1];
			b[i] -= m * c[i - 1];
			r[i] -= m * r[i - 1];
		}
		control[n - 1][0] = r[n - 1] / b[n - 1];
		var i = n - 2;
		while(i >= 0) {
			control[i][0] = (r[i] - c[i] * control[i + 1][0]) / b[i];
			--i;
		}
		var _g = 0;
		var _g1 = n - 1;
		while(_g < _g1) {
			var i = _g++;
			control[i][1] = 2 * K[i + 1] - control[i + 1][0];
		}
		control[n - 1][1] = 0.5 * (K[n] + control[n - 1][0]);
		control.pop();
		return control;
	}
	,set_start: function(value) {
		if(this.paths.length == 0 || Math.abs(value - this.get_start()) > 1e-7) {
			var control = this.computeControlPoints(value);
			var pathStrength = this.strength / control.length;
			this.strength = 0;
			this.paths.splice(0,this.paths.length);
			var _g = 0;
			var _g1 = control.length;
			while(_g < _g1) {
				var i = _g++;
				this.addPath(new motion__$MotionPath_BezierPath(this.through[i],control[i],pathStrength));
			}
		}
		return motion__$MotionPath_ComponentPath.prototype.set_start.call(this,value);
	}
	,get_end: function() {
		return this.through[this.through.length - 1];
	}
	,__class__: motion__$MotionPath_BezierSplinePath
});
var motion__$MotionPath_RotationPath = function(x,y) {
	this.step = 0.01;
	this._x = x;
	this._y = y;
	this.offset = 0;
	this.set_start(this.calculate(0.0));
};
$hxClasses["motion._MotionPath.RotationPath"] = motion__$MotionPath_RotationPath;
motion__$MotionPath_RotationPath.__name__ = "motion._MotionPath.RotationPath";
motion__$MotionPath_RotationPath.__interfaces__ = [motion_IComponentPath];
motion__$MotionPath_RotationPath.prototype = {
	calculate: function(k) {
		var dX = this._x.calculate(k) - this._x.calculate(k + this.step);
		var dY = this._y.calculate(k) - this._y.calculate(k + this.step);
		var angle = Math.atan2(dY,dX) * (180 / Math.PI);
		angle = (angle + this.offset) % 360;
		return angle;
	}
	,get_start: function() {
		return this._start;
	}
	,set_start: function(value) {
		return this._start;
	}
	,get_end: function() {
		return this.calculate(1.0);
	}
	,__class__: motion__$MotionPath_RotationPath
	,__properties__: {set_start:"set_start",get_start:"get_start",get_end:"get_end"}
};
var motion_actuators_MethodActuator = function(target,duration,properties) {
	this.currentParameters = [];
	this.tweenProperties = { };
	motion_actuators_SimpleActuator.call(this,target,duration,properties);
	if(!Object.prototype.hasOwnProperty.call(properties,"start")) {
		this.properties.start = [];
	}
	if(!Object.prototype.hasOwnProperty.call(properties,"end")) {
		this.properties.end = this.properties.start;
	}
	var _g = 0;
	var _g1 = this.properties.start.length;
	while(_g < _g1) {
		var i = _g++;
		this.currentParameters.push(this.properties.start[i]);
	}
};
$hxClasses["motion.actuators.MethodActuator"] = motion_actuators_MethodActuator;
motion_actuators_MethodActuator.__name__ = "motion.actuators.MethodActuator";
motion_actuators_MethodActuator.__super__ = motion_actuators_SimpleActuator;
motion_actuators_MethodActuator.prototype = $extend(motion_actuators_SimpleActuator.prototype,{
	apply: function() {
		var method = this.target;
		var params = this.properties.end;
		if(params == null) {
			params = [];
		}
		method.apply(method,params);
	}
	,complete: function(sendEvent) {
		if(sendEvent == null) {
			sendEvent = true;
		}
		var _g = 0;
		var _g1 = this.properties.start.length;
		while(_g < _g1) {
			var i = _g++;
			this.currentParameters[i] = Reflect.field(this.tweenProperties,"param" + i);
		}
		var method = this.target;
		var params = this.currentParameters;
		if(params == null) {
			params = [];
		}
		method.apply(method,params);
		motion_actuators_SimpleActuator.prototype.complete.call(this,sendEvent);
	}
	,initialize: function() {
		var details;
		var propertyName;
		var start;
		var _g = 0;
		var _g1 = this.properties.start.length;
		while(_g < _g1) {
			var i = _g++;
			propertyName = "param" + i;
			start = this.properties.start[i];
			this.tweenProperties[propertyName] = start;
			if(typeof(start) == "number" || typeof(start) == "number" && ((start | 0) === start)) {
				details = new motion_actuators_PropertyDetails(this.tweenProperties,propertyName,start,this.properties.end[i] - start);
				this.propertyDetails.push(details);
			}
		}
		this.detailsLength = this.propertyDetails.length;
		this.initialized = true;
	}
	,update: function(currentTime) {
		motion_actuators_SimpleActuator.prototype.update.call(this,currentTime);
		if(this.active && !this.paused) {
			var _g = 0;
			var _g1 = this.properties.start.length;
			while(_g < _g1) {
				var i = _g++;
				this.currentParameters[i] = Reflect.field(this.tweenProperties,"param" + i);
			}
			var method = this.target;
			var params = this.currentParameters;
			if(params == null) {
				params = [];
			}
			method.apply(method,params);
		}
	}
	,__class__: motion_actuators_MethodActuator
});
var motion_actuators_MotionPathActuator = function(target,duration,properties) {
	motion_actuators_SimpleActuator.call(this,target,duration,properties);
};
$hxClasses["motion.actuators.MotionPathActuator"] = motion_actuators_MotionPathActuator;
motion_actuators_MotionPathActuator.__name__ = "motion.actuators.MotionPathActuator";
motion_actuators_MotionPathActuator.__super__ = motion_actuators_SimpleActuator;
motion_actuators_MotionPathActuator.prototype = $extend(motion_actuators_SimpleActuator.prototype,{
	apply: function() {
		var _g = 0;
		var _g1 = Reflect.fields(this.properties);
		while(_g < _g1.length) {
			var propertyName = _g1[_g];
			++_g;
			if(Object.prototype.hasOwnProperty.call(this.target,propertyName)) {
				this.target[propertyName] = (js_Boot.__cast(Reflect.field(this.properties,propertyName) , motion_IComponentPath)).get_end();
			} else {
				Reflect.setProperty(this.target,propertyName,(js_Boot.__cast(Reflect.field(this.properties,propertyName) , motion_IComponentPath)).get_end());
			}
		}
	}
	,initialize: function() {
		var details;
		var path;
		var _g = 0;
		var _g1 = Reflect.fields(this.properties);
		while(_g < _g1.length) {
			var propertyName = _g1[_g];
			++_g;
			path = js_Boot.__cast(Reflect.field(this.properties,propertyName) , motion_IComponentPath);
			if(path != null) {
				var isField = true;
				if(Object.prototype.hasOwnProperty.call(this.target,propertyName)) {
					path.set_start(Reflect.field(this.target,propertyName));
				} else {
					isField = false;
					path.set_start(Reflect.getProperty(this.target,propertyName));
				}
				details = new motion_actuators_PropertyPathDetails(this.target,propertyName,path,isField);
				this.propertyDetails.push(details);
			}
		}
		this.detailsLength = this.propertyDetails.length;
		this.initialized = true;
	}
	,update: function(currentTime) {
		if(!this.paused) {
			var details;
			var easing;
			var tweenPosition = (currentTime - this.timeOffset) / this.duration;
			if(tweenPosition > 1) {
				tweenPosition = 1;
			}
			if(!this.initialized) {
				this.initialize();
			}
			if(!this.special) {
				easing = this._ease.calculate(tweenPosition);
				var _g = 0;
				var _g1 = this.propertyDetails;
				while(_g < _g1.length) {
					var details = _g1[_g];
					++_g;
					if(details.isField) {
						details.target[details.propertyName] = (js_Boot.__cast(details , motion_actuators_PropertyPathDetails)).path.calculate(easing);
					} else {
						Reflect.setProperty(details.target,details.propertyName,(js_Boot.__cast(details , motion_actuators_PropertyPathDetails)).path.calculate(easing));
					}
				}
			} else {
				if(!this._reverse) {
					easing = this._ease.calculate(tweenPosition);
				} else {
					easing = this._ease.calculate(1 - tweenPosition);
				}
				var endValue;
				var _g = 0;
				var _g1 = this.propertyDetails;
				while(_g < _g1.length) {
					var details = _g1[_g];
					++_g;
					if(!this._snapping) {
						if(details.isField) {
							details.target[details.propertyName] = (js_Boot.__cast(details , motion_actuators_PropertyPathDetails)).path.calculate(easing);
						} else {
							Reflect.setProperty(details.target,details.propertyName,(js_Boot.__cast(details , motion_actuators_PropertyPathDetails)).path.calculate(easing));
						}
					} else if(details.isField) {
						details.target[details.propertyName] = Math.round((js_Boot.__cast(details , motion_actuators_PropertyPathDetails)).path.calculate(easing));
					} else {
						Reflect.setProperty(details.target,details.propertyName,Math.round((js_Boot.__cast(details , motion_actuators_PropertyPathDetails)).path.calculate(easing)));
					}
				}
			}
			if(tweenPosition == 1) {
				if(this._repeat == 0) {
					this.active = false;
					var tmp;
					if(this.toggleVisible) {
						var target = this.target;
						var value = null;
						if(Object.prototype.hasOwnProperty.call(target,"alpha")) {
							value = Reflect.field(target,"alpha");
						} else {
							value = Reflect.getProperty(target,"alpha");
						}
						tmp = value == 0;
					} else {
						tmp = false;
					}
					if(tmp) {
						var target = this.target;
						var value = false;
						if(Object.prototype.hasOwnProperty.call(target,"visible")) {
							target["visible"] = value;
						} else {
							Reflect.setProperty(target,"visible",value);
						}
					}
					this.complete(true);
					return;
				} else {
					if(this._onRepeat != null) {
						var method = this._onRepeat;
						var params = this._onRepeatParams;
						if(params == null) {
							params = [];
						}
						method.apply(method,params);
					}
					if(this._reflect) {
						this._reverse = !this._reverse;
					}
					this.startTime = currentTime;
					this.timeOffset = this.startTime + this._delay;
					if(this._repeat > 0) {
						this._repeat--;
					}
				}
			}
			if(this.sendChange) {
				this.change();
			}
		}
	}
	,__class__: motion_actuators_MotionPathActuator
});
var motion_actuators_PropertyDetails = function(target,propertyName,start,change,isField) {
	if(isField == null) {
		isField = true;
	}
	this.target = target;
	this.propertyName = propertyName;
	this.start = start;
	this.change = change;
	this.isField = isField;
};
$hxClasses["motion.actuators.PropertyDetails"] = motion_actuators_PropertyDetails;
motion_actuators_PropertyDetails.__name__ = "motion.actuators.PropertyDetails";
motion_actuators_PropertyDetails.prototype = {
	__class__: motion_actuators_PropertyDetails
};
var motion_actuators_PropertyPathDetails = function(target,propertyName,path,isField) {
	if(isField == null) {
		isField = true;
	}
	motion_actuators_PropertyDetails.call(this,target,propertyName,0,0,isField);
	this.path = path;
};
$hxClasses["motion.actuators.PropertyPathDetails"] = motion_actuators_PropertyPathDetails;
motion_actuators_PropertyPathDetails.__name__ = "motion.actuators.PropertyPathDetails";
motion_actuators_PropertyPathDetails.__super__ = motion_actuators_PropertyDetails;
motion_actuators_PropertyPathDetails.prototype = $extend(motion_actuators_PropertyDetails.prototype,{
	__class__: motion_actuators_PropertyPathDetails
});
var motion_easing_Linear = function() { };
$hxClasses["motion.easing.Linear"] = motion_easing_Linear;
motion_easing_Linear.__name__ = "motion.easing.Linear";
motion_easing_Linear.__properties__ = {get_easeNone:"get_easeNone"};
motion_easing_Linear.get_easeNone = function() {
	return new motion_easing_LinearEaseNone();
};
var motion_easing_LinearEaseNone = function() {
};
$hxClasses["motion.easing.LinearEaseNone"] = motion_easing_LinearEaseNone;
motion_easing_LinearEaseNone.__name__ = "motion.easing.LinearEaseNone";
motion_easing_LinearEaseNone.__interfaces__ = [motion_easing_IEasing];
motion_easing_LinearEaseNone.prototype = {
	calculate: function(k) {
		return k;
	}
	,ease: function(t,b,c,d) {
		return c * t / d + b;
	}
	,__class__: motion_easing_LinearEaseNone
};
var scenestates_Scene_$0_$Choose_$Person_$State = function() {
};
$hxClasses["scenestates.Scene_0_Choose_Person_State"] = scenestates_Scene_$0_$Choose_$Person_$State;
scenestates_Scene_$0_$Choose_$Person_$State.__name__ = "scenestates.Scene_0_Choose_Person_State";
scenestates_Scene_$0_$Choose_$Person_$State.__super__ = common_scene_XmlSceneState;
scenestates_Scene_$0_$Choose_$Person_$State.prototype = $extend(common_scene_XmlSceneState.prototype,{
	__class__: scenestates_Scene_$0_$Choose_$Person_$State
});
var scenestates_Scene_$0_$Sofia_$Prologue_$State = function() {
};
$hxClasses["scenestates.Scene_0_Sofia_Prologue_State"] = scenestates_Scene_$0_$Sofia_$Prologue_$State;
scenestates_Scene_$0_$Sofia_$Prologue_$State.__name__ = "scenestates.Scene_0_Sofia_Prologue_State";
scenestates_Scene_$0_$Sofia_$Prologue_$State.__super__ = common_scene_XmlSceneState;
scenestates_Scene_$0_$Sofia_$Prologue_$State.prototype = $extend(common_scene_XmlSceneState.prototype,{
	__class__: scenestates_Scene_$0_$Sofia_$Prologue_$State
});
var scenestates_Scene_$1_$Awake_$State = function() {
};
$hxClasses["scenestates.Scene_1_Awake_State"] = scenestates_Scene_$1_$Awake_$State;
scenestates_Scene_$1_$Awake_$State.__name__ = "scenestates.Scene_1_Awake_State";
scenestates_Scene_$1_$Awake_$State.__super__ = common_scene_XmlSceneState;
scenestates_Scene_$1_$Awake_$State.prototype = $extend(common_scene_XmlSceneState.prototype,{
	__class__: scenestates_Scene_$1_$Awake_$State
});
var scenestates_Scene_$1_$Thoughts_$State = function() {
};
$hxClasses["scenestates.Scene_1_Thoughts_State"] = scenestates_Scene_$1_$Thoughts_$State;
scenestates_Scene_$1_$Thoughts_$State.__name__ = "scenestates.Scene_1_Thoughts_State";
scenestates_Scene_$1_$Thoughts_$State.__super__ = common_scene_XmlSceneState;
scenestates_Scene_$1_$Thoughts_$State.prototype = $extend(common_scene_XmlSceneState.prototype,{
	__class__: scenestates_Scene_$1_$Thoughts_$State
});
function $getIterator(o) { if( o instanceof Array ) return new haxe_iterators_ArrayIterator(o); else return o.iterator(); }
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $global.$haxeUID++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = m.bind(o); o.hx__closures__[m.__id__] = f; } return f; }
$global.$haxeUID |= 0;
if(typeof(performance) != "undefined" ? typeof(performance.now) == "function" : false) {
	HxOverrides.now = performance.now.bind(performance);
}
$hxClasses["Math"] = Math;
if( String.fromCodePoint == null ) String.fromCodePoint = function(c) { return c < 0x10000 ? String.fromCharCode(c) : String.fromCharCode((c>>10)+0xD7C0)+String.fromCharCode((c&0x3FF)+0xDC00); }
String.prototype.__class__ = $hxClasses["String"] = String;
String.__name__ = "String";
$hxClasses["Array"] = Array;
Array.__name__ = "Array";
var Int = { };
var Dynamic = { };
var Float = Number;
var Bool = Boolean;
var Class = { };
var Enum = { };
haxe_ds_ObjectMap.count = 0;
js_Boot.__toStr = ({ }).toString;
Xml.Element = 0;
Xml.PCData = 1;
Xml.CData = 2;
Xml.Comment = 3;
Xml.DocType = 4;
Xml.ProcessingInstruction = 5;
Xml.Document = 6;
haxe_xml_Parser.escapes = (function($this) {
	var $r;
	var h = new haxe_ds_StringMap();
	h.h["lt"] = "<";
	h.h["gt"] = ">";
	h.h["amp"] = "&";
	h.h["quot"] = "\"";
	h.h["apos"] = "'";
	$r = h;
	return $r;
}(this));
motion_actuators_SimpleActuator.actuators = [];
motion_actuators_SimpleActuator.actuatorsLength = 0;
motion_actuators_SimpleActuator.addedEvent = false;
motion_easing_Expo.easeIn = new motion_easing__$Expo_ExpoEaseIn();
motion_easing_Expo.easeInOut = new motion_easing__$Expo_ExpoEaseInOut();
motion_easing_Expo.easeOut = new motion_easing__$Expo_ExpoEaseOut();
motion_Actuate.defaultActuator = motion_actuators_SimpleActuator;
motion_Actuate.defaultEase = motion_easing_Expo.easeOut;
motion_Actuate.targetLibraries = new haxe_ds_ObjectMap();
Main.main();
})(typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);
