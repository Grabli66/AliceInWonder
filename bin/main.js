(function ($global) { "use strict";
var $estr = function() { return js_Boot.__string_rec(this,''); },$hxEnums = $hxEnums || {},$_;
function $extend(from, fields) {
	var proto = Object.create(from);
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var common_Game = function() {
	this.interactive = new common_interactive_InteractiveSystem();
};
common_Game.__name__ = true;
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
AliceGame.__name__ = true;
AliceGame.__super__ = common_Game;
AliceGame.prototype = $extend(common_Game.prototype,{
	start: function() {
		var scene1 = new scenes_Scene1_$Awake();
		this.setScene(scene1);
	}
	,__class__: AliceGame
});
var HxOverrides = function() { };
HxOverrides.__name__ = true;
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
var Main = function() { };
Main.__name__ = true;
Main.main = function() {
	var game = new AliceGame();
	game.start();
};
Math.__name__ = true;
var Reflect = function() { };
Reflect.__name__ = true;
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
var Std = function() { };
Std.__name__ = true;
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
var Type = function() { };
Type.__name__ = true;
Type.createInstance = function(cl,args) {
	var ctor = Function.prototype.bind.apply(cl,[null].concat(args));
	return new (ctor);
};
var common_Person = function(name,portraitImage) {
	this.name = name;
	this.portraitImage = portraitImage;
};
common_Person.__name__ = true;
common_Person.prototype = {
	__class__: common_Person
};
var common_Scene = function() {
};
common_Scene.__name__ = true;
common_Scene.prototype = {
	__class__: common_Scene
};
var common_interactive_InteractiveElement = function() {
	this._opacity = 1.0;
};
common_interactive_InteractiveElement.__name__ = true;
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
common_interactive_ChooseElement.__name__ = true;
common_interactive_ChooseElement.__super__ = common_interactive_InteractiveElement;
common_interactive_ChooseElement.prototype = $extend(common_interactive_InteractiveElement.prototype,{
	render: function() {
		var _gthis = this;
		var chooseNode = window.document.createElement("div");
		chooseNode.className = "choose-root";
		var i = 1;
		var _g = 0;
		var _g1 = this.select;
		while(_g < _g1.length) {
			var variant = [_g1[_g]];
			++_g;
			var node = window.document.createElement("div");
			node.innerText = "" + i + ". " + variant[0];
			node.className = "choose-item";
			node.onclick = (function(variant) {
				return function() {
					chooseNode.remove();
					_gthis.onSelect(_gthis.select.indexOf(variant[0]));
				};
			})(variant);
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
common_interactive_ColorHelper.__name__ = true;
common_interactive_ColorHelper.getColorCss = function(color) {
	return $hxEnums[color.__enum__].__constructs__[color._hx_index]._hx_name.toLowerCase() + "-color";
};
var common_interactive_InteractiveSystem = function() {
	this.newElements = [];
	this.sceneTitle = window.document.querySelector("#scene-title");
	this.sceneContentNode = window.document.querySelector("#scene-content");
	this.leftPageNode = window.document.querySelector("#left-page-panel");
};
common_interactive_InteractiveSystem.__name__ = true;
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
	}
	,setSceneTitle: function(title) {
		this.sceneTitle.innerText = title;
	}
	,addText: function(text) {
		var element = new common_interactive_TextElement(text);
		this.addElement(element);
		element.set_opacity(0);
		motion_Actuate.tween(element,0.5,{ opacity : 1.0}).ease(motion_easing_Linear.get_easeNone());
		return element;
	}
	,addPlayerText: function(text) {
		var element = new common_interactive_PersonTextElement({ nameColor : common_interactive_Color.Orange, name : "ВЫ", text : text});
		this.addElement(element);
		element.set_opacity(0);
		motion_Actuate.tween(element,0.5,{ opacity : 1.0}).ease(motion_easing_Linear.get_easeNone());
		this.updateScroll();
	}
	,addPersonText: function(parameters) {
		var _gthis = this;
		var add = function() {
			var element = new common_interactive_PersonTextElement({ nameColor : common_interactive_Color.Blue, name : parameters.person.name, text : parameters.text});
			_gthis.addElement(element);
			element.set_opacity(0);
			motion_Actuate.tween(element,0.5,{ opacity : 1.0}).ease(motion_easing_Linear.get_easeNone());
			_gthis.updateScroll();
		};
		if(parameters.waitTime != null) {
			this.addWaitPerson(parameters.waitTime,function() {
				add();
				if(parameters.onWaitComplete != null) {
					parameters.onWaitComplete();
				}
			});
		} else {
			add();
		}
	}
	,addChoose: function(parameters) {
		var _gthis = this;
		var choose = new common_interactive_ChooseElement({ select : parameters.select, onSelect : function(index) {
			_gthis.makeElementsOld();
			if(parameters.onBeforeSelect != null) {
				parameters.onBeforeSelect(index);
			}
			_gthis.addPlayerText(parameters.select[index]);
			parameters.onSelect(index);
		}});
		this.addElement(choose);
		return choose;
	}
	,addPersonPortrait: function(person) {
		var element = new common_interactive_PersonPortraitElement(person);
		var node = element.render();
		this.leftPageNode.appendChild(node);
		return element;
	}
	,addWaitPerson: function(waitTime,onComplete) {
		var _gthis = this;
		var node = new common_interactive_WaitPersonElement(waitTime,function() {
			onComplete();
			_gthis.updateScroll();
		});
		this.addElement(node);
		node.start();
		return node;
	}
	,addContinue: function(onClick) {
		var continueNode = window.document.createElement("div");
		continueNode.innerText = "<< ПРОДОЛЖИТЬ >>";
		continueNode.className = "continue-click";
		continueNode.onclick = function() {
			onClick();
		};
		this.sceneContentNode.appendChild(continueNode);
		this.updateScroll();
	}
	,__class__: common_interactive_InteractiveSystem
};
var common_interactive_PersonPortraitElement = function(person) {
	common_interactive_InteractiveElement.call(this);
	this.person = person;
};
common_interactive_PersonPortraitElement.__name__ = true;
common_interactive_PersonPortraitElement.__super__ = common_interactive_InteractiveElement;
common_interactive_PersonPortraitElement.prototype = $extend(common_interactive_InteractiveElement.prototype,{
	render: function() {
		var mainNode = window.document.createElement("div");
		mainNode.className = "person-portrait-conatiner";
		var portraitNode = window.document.createElement("div");
		portraitNode.className = "portrait";
		portraitNode.style.backgroundImage = "url(images/" + this.person.portraitImage + ")";
		var nameNode = window.document.createElement("div");
		nameNode.className = "name grey-color";
		nameNode.innerText = this.person.name.toUpperCase();
		mainNode.appendChild(portraitNode);
		mainNode.appendChild(nameNode);
		return mainNode;
	}
	,__class__: common_interactive_PersonPortraitElement
});
var common_interactive_PersonTextElement = function(parameters) {
	common_interactive_InteractiveElement.call(this);
	this.parameters = parameters;
};
common_interactive_PersonTextElement.__name__ = true;
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
common_interactive_TextElement.__name__ = true;
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
common_interactive_WaitPersonElement.__name__ = true;
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
var haxe_IMap = function() { };
haxe_IMap.__name__ = true;
haxe_IMap.__isInterface__ = true;
var haxe_Exception = function(message,previous,native) {
	Error.call(this,message);
	this.message = message;
	this.__previousException = previous;
	this.__nativeException = native != null ? native : this;
};
haxe_Exception.__name__ = true;
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
	get_native: function() {
		return this.__nativeException;
	}
	,__class__: haxe_Exception
	,__properties__: {get_native:"get_native"}
});
var haxe_iterators_ArrayIterator = function(array) {
	this.current = 0;
	this.array = array;
};
haxe_iterators_ArrayIterator.__name__ = true;
haxe_iterators_ArrayIterator.prototype = {
	hasNext: function() {
		return this.current < this.array.length;
	}
	,next: function() {
		return this.array[this.current++];
	}
	,__class__: haxe_iterators_ArrayIterator
};
var haxe_ValueException = function(value,previous,native) {
	haxe_Exception.call(this,String(value),previous,native);
	this.value = value;
};
haxe_ValueException.__name__ = true;
haxe_ValueException.__super__ = haxe_Exception;
haxe_ValueException.prototype = $extend(haxe_Exception.prototype,{
	__class__: haxe_ValueException
});
var haxe_ds_ObjectMap = function() {
	this.h = { __keys__ : { }};
};
haxe_ds_ObjectMap.__name__ = true;
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
var js_Boot = function() { };
js_Boot.__name__ = true;
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
var motion_actuators_IGenericActuator = function() { };
motion_actuators_IGenericActuator.__name__ = true;
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
motion_actuators_GenericActuator.__name__ = true;
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
motion_actuators_SimpleActuator.__name__ = true;
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
motion_easing_IEasing.__name__ = true;
motion_easing_IEasing.__isInterface__ = true;
motion_easing_IEasing.prototype = {
	__class__: motion_easing_IEasing
};
var motion_easing__$Expo_ExpoEaseIn = function() {
};
motion_easing__$Expo_ExpoEaseIn.__name__ = true;
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
motion_easing__$Expo_ExpoEaseInOut.__name__ = true;
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
motion_easing__$Expo_ExpoEaseOut.__name__ = true;
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
motion_easing_Expo.__name__ = true;
var motion_Actuate = function() { };
motion_Actuate.__name__ = true;
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
motion__$Actuate_TweenTimer.__name__ = true;
motion__$Actuate_TweenTimer.prototype = {
	__class__: motion__$Actuate_TweenTimer
};
var motion_MotionPath = function() {
	this._x = new motion__$MotionPath_ComponentPath();
	this._y = new motion__$MotionPath_ComponentPath();
	this._rotation = null;
};
motion_MotionPath.__name__ = true;
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
motion_IComponentPath.__name__ = true;
motion_IComponentPath.__isInterface__ = true;
motion_IComponentPath.prototype = {
	__class__: motion_IComponentPath
	,__properties__: {get_end:"get_end",set_start:"set_start",get_start:"get_start"}
};
var motion__$MotionPath_ComponentPath = function() {
	this.paths = [];
	this.strength = 0;
};
motion__$MotionPath_ComponentPath.__name__ = true;
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
motion__$MotionPath_BezierPath.__name__ = true;
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
motion__$MotionPath_BezierSplinePath.__name__ = true;
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
motion__$MotionPath_RotationPath.__name__ = true;
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
motion_actuators_MethodActuator.__name__ = true;
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
motion_actuators_MotionPathActuator.__name__ = true;
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
motion_actuators_PropertyDetails.__name__ = true;
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
motion_actuators_PropertyPathDetails.__name__ = true;
motion_actuators_PropertyPathDetails.__super__ = motion_actuators_PropertyDetails;
motion_actuators_PropertyPathDetails.prototype = $extend(motion_actuators_PropertyDetails.prototype,{
	__class__: motion_actuators_PropertyPathDetails
});
var motion_easing_Linear = function() { };
motion_easing_Linear.__name__ = true;
motion_easing_Linear.__properties__ = {get_easeNone:"get_easeNone"};
motion_easing_Linear.get_easeNone = function() {
	return new motion_easing_LinearEaseNone();
};
var motion_easing_LinearEaseNone = function() {
};
motion_easing_LinearEaseNone.__name__ = true;
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
var scenes_Scene1_$Awake = function() {
	this.unknownPerson2 = new common_Person("МЕДСЕСТРА АГАТА СВИФТ","agata-portrait.jpg");
	this.unknownPerson1 = new common_Person("ДОКТОР ЭЛИЗАБЕТ ТОМПСОН","doctor-elizabeth.jpg");
	common_Scene.call(this);
};
scenes_Scene1_$Awake.__name__ = true;
scenes_Scene1_$Awake.__super__ = common_Scene;
scenes_Scene1_$Awake.prototype = $extend(common_Scene.prototype,{
	enter: function() {
		var _gthis = this;
		this.interactive.setSceneTitle("Часть 1. Пробуждение");
		this.interactive.addText("Ваше сознание постепенно возвращается из пустоты. Вы слышите приятный женский голос. Он спокойный и не несёт в себе угрозы.");
		this.interactive.addPersonPortrait(this.unknownPerson1);
		this.interactive.addPersonPortrait(this.unknownPerson2);
		this.interactive.addPersonText({ person : this.unknownPerson1, text : "Пожалуйста, просыпайся."});
		this.interactive.addChoose({ select : ["Кто вы?","Уходите, я хочу спать","Промолчать"], onSelect : $bind(this,this.processAnswer), onBeforeSelect : function(_) {
			_gthis.interactive.addText("Вы с трудом открываете глаза. Сонными глазами пытаетесь разглядеть своего собеседника. Перед Вами стоят две женщины. Их одежда очень похожа на больничные халаты. Возможно это они и есть.");
		}});
	}
	,processAnswer: function(index) {
		var _gthis = this;
		switch(index) {
		case 0:
			break;
		case 1:
			this.interactive.addPersonText({ person : this.unknownPerson1, text : "Извини, но тебе придётся проснутся.", waitTime : 1300, onWaitComplete : function() {
				_gthis.interactive.addChoose({ select : ["Кто Вы?","Не хочу, уходите.","[Зло] Отвалите от меня."], onSelect : function(index) {
				}});
			}});
			break;
		case 2:
			this.interactive.addText("Вы слышите как женщины переговариваются между собой.");
			this.interactive.addPersonText({ person : this.unknownPerson1, text : "Вы уверены, что пациентка в сознании?"});
			this.interactive.addPersonText({ person : this.unknownPerson2, text : "Да. Думаю она притворяется."});
			this.interactive.addText("Вы чуствуете как чья-то рука ложится Вам на плечё и пытается Вас разбудить.");
			this.interactive.addChoose({ select : ["Ну ладно, я не сплю. Кто Вы?","[Раздражённо] Отстаньте, я сплю","Промолчать"], onSelect : function(index) {
			}});
			break;
		}
	}
	,__class__: scenes_Scene1_$Awake
});
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $global.$haxeUID++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = m.bind(o); o.hx__closures__[m.__id__] = f; } return f; }
$global.$haxeUID |= 0;
if(typeof(performance) != "undefined" ? typeof(performance.now) == "function" : false) {
	HxOverrides.now = performance.now.bind(performance);
}
String.prototype.__class__ = String;
String.__name__ = true;
Array.__name__ = true;
var Int = { };
var Dynamic = { };
var Float = Number;
var Bool = Boolean;
var Class = { };
var Enum = { };
haxe_ds_ObjectMap.count = 0;
js_Boot.__toStr = ({ }).toString;
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
