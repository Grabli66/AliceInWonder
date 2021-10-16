(function ($global) { "use strict";
function $extend(from, fields) {
	var proto = Object.create(from);
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var common_Game = function() {
	this.interactive = new common_InteractiveSystem();
};
common_Game.prototype = {
	setScene: function(scene) {
		scene.interactive = this.interactive;
		scene.game = this;
		if(this.currentScene != null) {
			this.currentScene.leave();
		}
		scene.interactive.clear();
		this.currentScene = scene;
		this.currentScene.enter();
	}
};
var AliceGame = function() {
	common_Game.call(this);
};
AliceGame.__super__ = common_Game;
AliceGame.prototype = $extend(common_Game.prototype,{
	start: function() {
		var scene1 = new scenes_Scene1_$Awake();
		this.setScene(scene1);
	}
});
var Main = function() { };
Main.main = function() {
	var game = new AliceGame();
	game.start();
};
var common_InteractiveSystem = function() {
	this.sceneTitle = window.document.querySelector("#scene-title");
	this.sceneContent = window.document.querySelector("#scene-content");
};
common_InteractiveSystem.prototype = {
	updateScroll: function() {
		this.sceneContent.scrollTop = this.sceneContent.scrollHeight;
	}
	,clear: function() {
		this.sceneContent.innerHTML = "";
		this.setSceneTitle("");
	}
	,setSceneTitle: function(title) {
		this.sceneTitle.innerText = title;
	}
	,addText: function(text) {
		var node = window.document.createElement("div");
		node.innerText = text;
		node.className = "single-text";
		this.sceneContent.appendChild(node);
		this.updateScroll();
	}
	,addPersonText: function(parameters) {
		var rootNode = window.document.createElement("div");
		var nameNode = window.document.createElement("span");
		var textNode = window.document.createElement("span");
		var sepNode = window.document.createElement("span");
		rootNode.className = "person-text";
		if(parameters.isYou) {
			nameNode.className = "name you";
			nameNode.innerText = "ВЫ";
		} else {
			nameNode.innerText = parameters.personName.toUpperCase();
			nameNode.className = "name";
		}
		sepNode.className = "separator";
		sepNode.innerText = "-";
		textNode.innerText = "\"" + parameters.text + "\"";
		textNode.className = "text";
		rootNode.appendChild(nameNode);
		rootNode.appendChild(sepNode);
		rootNode.appendChild(textNode);
		this.sceneContent.appendChild(rootNode);
		this.updateScroll();
	}
	,addChoose: function(variants,onClick) {
		var _gthis = this;
		var chooseNode = window.document.createElement("div");
		chooseNode.className = "choose-root";
		this.sceneContent.appendChild(chooseNode);
		var i = 1;
		var _g = 0;
		while(_g < variants.length) {
			var variant = [variants[_g]];
			++_g;
			var node = window.document.createElement("div");
			node.innerText = "" + i + ". " + variant[0];
			node.className = "choose-item";
			node.onclick = (function(variant) {
				return function() {
					chooseNode.remove();
					_gthis.addPersonText({ isYou : true, text : variant[0]});
					onClick(variants.indexOf(variant[0]));
				};
			})(variant);
			chooseNode.appendChild(node);
			++i;
		}
		this.updateScroll();
	}
	,addContinue: function(onClick) {
		var continueNode = window.document.createElement("div");
		continueNode.innerText = "<< ПРОДОЛЖИТЬ >>";
		continueNode.className = "continue-click";
		continueNode.onclick = function() {
			onClick();
		};
		this.sceneContent.appendChild(continueNode);
		this.updateScroll();
	}
};
var common_Scene = function() {
};
var haxe_iterators_ArrayIterator = function(array) {
	this.current = 0;
	this.array = array;
};
haxe_iterators_ArrayIterator.prototype = {
	hasNext: function() {
		return this.current < this.array.length;
	}
	,next: function() {
		return this.array[this.current++];
	}
};
var scenes_Scene1_$Awake = function() {
	common_Scene.call(this);
};
scenes_Scene1_$Awake.__super__ = common_Scene;
scenes_Scene1_$Awake.prototype = $extend(common_Scene.prototype,{
	enter: function() {
		this.interactive.setSceneTitle("Часть 1. Пробуждение");
		this.interactive.addText("Ваше сознание постепенно возвращается из пустоты. Вы слышите приятный женский голос. Он спокойный и не несёт в себе угрозы.");
		this.interactive.addPersonText({ personName : "Неизвестный женский голос", text : "Пожалуйста, просыпайся."});
		this.interactive.addChoose(["Кто вы?","Уходите, я хочу спать","Промолчать"],$bind(this,this.processAnswer));
	}
	,actionDoctorHello: function() {
		this.interactive.addPersonText({ personName : "Неизвестный женский голос", text : "Я доктор Элизабет Стоун. Это медсестра Агата Вайт (показывает на женщину, стоящую рядом). Ты знаешь, где находишься?"});
		this.interactive.addChoose(["[Удивлённо] Доктор? Я что, в больнице?","[Интеллект] Элизабет и Агата? Мы что в Англии? (Усмехнутся)","Дома, дайте отдохнуть","На работе. Я всегда сплю на работе","На луне. А Вы как меня нашли?","Если Вы доктор, то я Папа Римский","[Засмеятся] В дурдоме"],$bind(this,this.processAnswer_0));
	}
	,actionReportFile: function() {
		this.interactive.addText("Доктор некоторое время в замешательстве смотрит на медсестру, потом её взгляд возвращается к Вам. В руках доктора планшет, видимо в нём информация с Вашей медицинской картой.");
		this.interactive.addPersonText({ personName : "Доктор Элизабет Стоун", text : "Элис Томсон. 23 года. Родилась в Саттон-Колфилд в 1998 году. Родители..."});
		this.interactive.addText("Вы прерываете её уверенную речь.");
		this.interactive.addChoose(["Стойте стойте. Это не я. Вы ошиблись","[Улыбаясь] Вы наверное шутите. Нас снимают? Где камера?","[Зло] Хватит. Заткнитесь. Что за бред Вы несёте?"],$bind(this,this.processAnswer_0_Any_Any_Any));
	}
	,processAnswer: function(index) {
		var _gthis = this;
		var wakeUp = function() {
			_gthis.interactive.addText("Вы с трудом открываете глаза. Сонными глазами пытаетесь разглядеть своего собеседника. Перед Вами стоят две женщины. Их одежда очень похожа на больничные халаты. Возможно это они и есть.");
		};
		switch(index) {
		case 0:
			wakeUp();
			this.actionDoctorHello();
			break;
		case 1:
			wakeUp();
			this.interactive.addPersonText({ personName : "Неизвестный женский голос", text : "Извини, но тебе придётся проснутся."});
			this.interactive.addChoose(["Кто Вы?","Не хочу, уходите.","[Зло] Отвалите от меня."],$bind(this,this.processAnswer_1));
			break;
		case 2:
			this.interactive.addText("Вы слышите как женщины переговариваются между собой.");
			this.interactive.addPersonText({ personName : "Неизвестный женский голос", text : "Вы уверены, что пациентка в сознании?"});
			this.interactive.addPersonText({ personName : "Другой женский голос", text : "Да. Думаю она притворяется."});
			this.interactive.addText("Вы чуствуете как чья-то рука ложится Вам на плечё и пытается Вас разбудить.");
			this.interactive.addChoose(["Ну ладно, я не сплю. Кто Вы?","[Раздражённо] Отстаньте, я сплю","Промолчать"],$bind(this,this.processAnswer_2));
			break;
		}
	}
	,processAnswer_1: function(index) {
		switch(index) {
		case 0:
			this.actionDoctorHello();
			break;
		case 1:
			this.interactive.addPersonText({ personName : "Неизвестный женский голос", text : "Элис, если мы сейчас уйдём, то придём только завтра. Но когда ты скоро придёшь в себя и поймёшь, в каком положении, нас уже здесь не будет."});
			this.interactive.addChoose(["Кто такая Элис?","[Раздражённо] Проваливайте"],$bind(this,this.processAnswer_1_1));
			break;
		case 2:
			this.interactive.addPersonText({ personName : "Неизвестный женский голос", text : "Как скажешь. (Обращается ко второй женщине) Пойдёмте."});
			this.interactive.addText("Женщины уходят. Вы слышите как закрывается дверь и выключается свет.");
			this.interactive.addContinue($bind(this,this.toThoughts));
			break;
		}
	}
	,processAnswer_1_1: function(index) {
		switch(index) {
		case 0:
			this.interactive.addPersonText({ personName : "Неизвестный женский голос", text : "Это ты. Ты знаешь где ты находишься?"});
			this.interactive.addChoose(["Нет, а где?","[Раздраженно] Я не Элис. Меня зовут София.","[Зло] Да мне всё равно, отстаньте от меня."],$bind(this,this.processAnswer_1_1_0));
			break;
		case 1:
			this.interactive.addPersonText({ personName : "Неизвестный женский голос", text : "Как скажешь. (Обращается ко второй женщине) Пойдёмте."});
			this.interactive.addText("Женщины уходят. Вы слышите как закрывается дверь и выключается свет.");
			this.interactive.addContinue($bind(this,this.toThoughts));
			break;
		}
	}
	,processAnswer_1_1_0: function(index) {
		switch(index) {
		case 0:
			this.interactive.addPersonText({ personName : "Неизвестный женский голос", text : "Элис, ты в психиатрической больнице, в отделении интенсивной терапии. Я твой лечащий врач, Элизабет Стоун. Это медсестра Агата Вайт (показывает на женщину, стоящую рядом)"});
			this.interactive.addChoose(["А кто такая Элис?"],$bind(this,this.processAnswer_0_6));
			break;
		case 1:
			this.actionReportFile();
			break;
		case 2:
			this.interactive.addPersonText({ personName : "Неизвестный женский голос", text : ""});
			break;
		}
	}
	,processAnswer_2: function(index) {
		switch(index) {
		case 0:
			this.actionDoctorHello();
			break;
		case 1:
			break;
		case 2:
			this.interactive.addPersonText({ personName : "Неизвестный женский голос", text : "Похоже пациентка не хочет с нами разговаривать. Мы придём завтра. Пойдёмте."});
			this.interactive.addContinue($bind(this,this.toThoughts));
			break;
		}
	}
	,processAnswer_0: function(index) {
		switch(index) {
		case 0:
			this.interactive.addPersonText({ personName : "Доктор Элизабет Стоун", text : "Элис, ты в психиатрической больнице, в отделении интенсивной терапии. Я твой лечащий врач."});
			break;
		case 1:
			this.interactive.addPersonText({ personName : "Доктор Элизабет Стоун", text : "Всё верно, Элис. Мы в Соединённом Королевстве. Ты в психиатрической больнице, в отделении интенсивной терапии. Я твой лечащий врач."});
			break;
		case 2:
			this.interactive.addPersonText({ personName : "Доктор Элизабет Стоун", text : "Извини, но нет, ты не дома. Элис, ты в психиатрической больнице, в отделении интенсивной терапии. Я твой лечащий врач."});
			break;
		case 3:case 4:case 5:
			this.interactive.addPersonText({ personName : "Доктор Элизабет Стоун", text : "Очень смешно. Элис, ты в психиатрической больнице, в отделении интенсивной терапии. Я твой лечащий врач."});
			break;
		case 6:
			this.interactive.addPersonText({ personName : "Доктор Элизабет Стоун", text : "Да. Но мы так не называем наше учреждение. Элис, ты в психиатрической больнице, в отделении интенсивной терапии. Я твой лечащий врач."});
			this.interactive.addChoose(["Кто такая Элис?"],$bind(this,this.processAnswer_0_6));
			break;
		}
		switch(index) {
		case 1:case 2:case 3:case 4:case 5:
			this.interactive.addChoose(["Кто такая Элис?","А что я делаю в психиатрической больнице?","[Зло] Какого чёрта я в психушке?"],$bind(this,this.processAnswer_0_v1_2_3_4_5v));
			break;
		}
	}
	,processAnswer_0_v1_2_3_4_5v: function(index) {
		switch(index) {
		case 0:
			this.processAnswer_0_6(0);
			break;
		case 1:
			this.interactive.addPersonText({ personName : "Доктор Элизабет Стоун", text : "Элис, ты пыталась покончить с собой. Скорая привезла тебя в невменяемом состоянии."});
			break;
		case 2:
			this.interactive.addPersonText({ personName : "Доктор Элизабет Стоун", text : "Успокойся, пожалуйста. Ты пыталась покончить с собой. Скорая привезла тебя в невменяемом состоянии."});
			break;
		}
		switch(index) {
		case 1:case 2:
			this.interactive.addChoose(["Кто такая Элис?","Эта какой то бред. Покончить с собой? Этого не может быть. И почему Вы называете меня Элис?"],$bind(this,this.processAnswer_0_6));
			break;
		}
	}
	,processAnswer_0_6: function(index) {
		this.interactive.addPersonText({ personName : "Доктор Элизабет Стоун", text : "Элис - это ты. Не помнишь как тебя зовут?"});
		this.interactive.addChoose(["Мне кажется, тут какая то ошибка. Я не Элис. Меня зовут София.","[Засмеятся] Вы наверное спятили или под кайфом. Меня зовут София.","[Зло] Чёкнутая, меня зовут София."],$bind(this,this.processAnswer_0_Any_Any));
	}
	,processAnswer_0_Any_Any: function(index) {
		this.interactive.addText("Доктор некоторое время в замешательстве смотрит на медсестру, потом её взгляд возвращается к Вам. В руках доктора планшет, видимо в нём информация с Вашей медицинской картой.");
		this.interactive.addPersonText({ personName : "Доктор Элизабет Стоун", text : "Элис Томсон. 23 года. Родилась в Саттон-Колфилд в 1998 году. Родители..."});
		this.interactive.addText("Вы прерываете её уверенную речь.");
		this.interactive.addChoose(["Стойте стойте. Это не я. Вы ошиблись","[Улыбаясь] Вы наверное шутите. Нас снимают? Где камера?","[Зло] Хватит. Заткнитесь. Что за бред Вы несёте?"],$bind(this,this.processAnswer_0_Any_Any_Any));
	}
	,processAnswer_0_Any_Any_Any: function(index) {
		this.interactive.addText("Вы пытаетесь встать, что бы подойти ближе и разговаривать лицом к лицу. Пробуете поднять руки и ноги, но с ужасом осознаёте, что они привязаны к кровати.");
		this.interactive.addChoose(["Что Вы сделали со мной?","[Засмеятся] Это сон. Я просто сплю","[Зло] Какого чёрта меня привязали?"],$bind(this,this.processAnswer_0_Any_Any_Any_Any));
	}
	,processAnswer_0_Any_Any_Any_Any: function(index) {
		this.interactive.addPersonText({ personName : "Доктор Элизабет Стоун", text : "Пожалуйста, успокойся. Это ради твоего же блага. Прохожие нашли тебя стоящую на краю моста. Ты кричала, что \"дьявол хочет забрать твою душу\". Бригада скорой помощи сняла тебя с моста и привезла к нам в отделение."});
		this.interactive.addChoose(["Но этого не может быть. Вы спутали меня с кем то другим. Меня зовут Новикова София. Мне 27 лет. Родилась в России, в 1994 году.","[Интеллект] Если меня привезли сюда вчера, то как Вы узнали, что меня зовут Элис? Я что пошла топится с паспортом, что бы потом было проще опознать?","[Ухмылятся] Ну и шуточки у Вас. Посмеялись и хватит. Отвяжите меня.","[Зло] Отпустите, мать вашу. Я подам на Вас в суд.","[Бится в истерике]"],$bind(this,this.processAnswer_0_Any_Any_Any_Any_Any));
	}
	,processAnswer_0_Any_Any_Any_Any_Any: function(index) {
		switch(index) {
		case 0:
			this.interactive.addPersonText({ personName : "Доктор Элизабет Стоун", text : "Хорошо, Элис. Мы обсудим это на сеансах терапии. А сейчас отдыхай."});
			this.interactive.addText("Две женщины развернулись и уже собирались выйти из палаты.");
			this.interactive.addText("Как назло Вы почуствовали, что хотите в туалет.");
			this.interactive.addChoose(["Пожалуйста, подождите.","[Кричите] Стойте, дуры! Я хочу в туалет!","Промолчать."],$bind(this,this.processAnswer_0_Any_Any_Any_Any_Any_0));
			break;
		case 1:
			this.interactive.addPersonText({ personName : "Доктор Элизабет Стоун", text : "У больниц есть доступ к национальной системе отпечатков пальцев."});
			break;
		case 2:
			this.interactive.addPersonText({ personName : "Доктор Элизабет Стоун", text : "Элис, это не шутки. Ты могла навредить себе, или персоналу. (Вздыхает) На сегодня хватит. Мы оставим тебя. Отдыхай."});
			break;
		case 3:
			this.interactive.addPersonText({ personName : "Доктор Элизабет Стоун", text : "Элис, успокойся, пожалуйста. Угрозы тебе не помогут. Сейчас главное сосредоточится на лечении."});
			break;
		case 4:
			this.interactive.addPersonText({ personName : "Доктор Элизабет Стоун", text : "Прекрати, пожалуйста. Иначе нам придётся тебя успокоить."});
			this.interactive.addChoose(["[Успокоится] Хорошо. Всему должно быть объяснение. Но я не Элис, я София.","[Кричать] Я не Элис. Я София. Я София, мать вашу.","[Бится в истерике]"],$bind(this,this.processAnswer_0_Any_Any_Any_Any_Any_4));
			break;
		}
	}
	,processAnswer_0_Any_Any_Any_Any_Any_0: function(index) {
		switch(index) {
		case 0:
			this.interactive.addText("Доктор и за ней медсестра остановились у выхода. Они развернулись к Вам, с намерянием выслушать, что Вы хотите им сказать.");
			this.interactive.addPersonText({ personName : "Доктор Элизабет Стоун", text : "Хорошо, Элис. Мы обсудим это на сеансах терапии. А сейчас отдыхай."});
			break;
		case 1:
			this.interactive.addText("Вы кричали даже когда выключился свет и закрылась дверь, но затем поняли, что это бесполезно и успокоились.");
			this.interactive.addContinue($bind(this,this.toThoughts));
			break;
		case 2:
			this.interactive.addText("Дверь закрылась и в палате погас свет.");
			this.interactive.addContinue($bind(this,this.toThoughts));
			break;
		}
	}
	,processAnswer_0_Any_Any_Any_Any_Any_4: function(index) {
		switch(index) {
		case 0:
			break;
		case 1:
			break;
		case 2:
			this.interactive.addPersonText({ personName : "Доктор Элизабет Стоун", text : "Сестра. Пожалуйста позовите санитаров."});
			this.interactive.addText("Пока Вы бъётесь в истерике, медсестра уходит и приходит с двумя крепкими санитарами. Один сильно прижимает Вас руками к больничной койке за плечи, другой держит ноги. Всё это время медсестра наполняла шприц с седативным. Она подошла к Вам и вколола медикаменты в плечё. Спустя пять минут Вы уже не бились в истерике.");
			this.interactive.addPersonText({ personName : "Доктор Элизабет Стоун", text : "Мне очень жаль, что так получилось, но ты не оставила мне выбора. Отдыхай."});
			this.interactive.addText("Элис осталась лежать на больничной кровати медленно погружаясь в \"пустоту\".");
			this.interactive.addContinue(function() {
			});
			break;
		}
	}
	,toThoughts: function() {
		var sceneThought = new scenes_Scene1_$Thoughts();
		this.game.setScene(sceneThought);
	}
	,leave: function() {
	}
});
var scenes_Scene1_$Thoughts = function() {
	common_Scene.call(this);
};
scenes_Scene1_$Thoughts.__super__ = common_Scene;
scenes_Scene1_$Thoughts.prototype = $extend(common_Scene.prototype,{
	enter: function() {
		this.interactive.addText("Доктор и медсестра выходят из палаты. Выключают свет и слишите как они закрывают дверь в палату, как будто Вы можете самостоятельно отвязатся от кровати и убежать. Вы остаётесь лежать на кровати наедине со своими мыслями");
		this.interactive.setSceneTitle("Часть 1. Мысли");
		this.interactive.addPersonText({ personName : "ВАШЕ СОБСТВЕННОЕ Я", text : "Что за чертовщина тут творится?"});
		this.interactive.addChoose(["Не знаю","Похищение? Хотят выкуп?","Переселение душ?","Научный эксперемент?","Я сошла с ума?"],$bind(this,this.processAnswer));
	}
	,processAnswer: function(index) {
		switch(index) {
		case 0:
			this.interactive.addPersonText({ personName : "ВАШЕ СОБСТВЕННОЕ Я", text : "Попробуй вспомнить что было вчера."});
			this.interactive.addChoose(["Я не помню","Я была дома, так ведь?"],$bind(this,this.processAnswer_0));
			break;
		case 1:
			this.interactive.addPersonText({ personName : "ВАШЕ СОБСТВЕННОЕ Я", text : "Возможно. Но зачем весь этот цирк с больницей, врачами, санитарами?"});
			break;
		case 2:
			this.interactive.addPersonText({ personName : "ВАШЕ СОБСТВЕННОЕ Я", text : "Слишком фантастично."});
			break;
		case 3:
			this.interactive.addPersonText({ personName : "ВАШЕ СОБСТВЕННОЕ Я", text : "Похоже на правду. Думаешь они хотят убедить тебя, что ты другой человек?"});
			break;
		case 4:
			this.interactive.addPersonText({ personName : "ВАШЕ СОБСТВЕННОЕ Я", text : "Это всё бы объяснило. Самое простое объяснение может быть самым верным."});
			this.interactive.addChoose(["А если это правда, что мне тогда делать?","Но я не чувствую себя сумасшедшей","Ни за что! Они не заставят меня признать, что я другой человек. Я знаю кто я и буду бится до конца"],$bind(this,this.processAnswer_4));
			break;
		}
	}
	,processAnswer_0: function(index) {
		switch(index) {
		case 0:
			this.interactive.addPersonText({ personName : "ВАШЕ СОБСТВЕННОЕ Я", text : "Тогда мы обречены."});
			this.processToEnd();
			break;
		case 1:
			this.interactive.addPersonText({ personName : "ВАШЕ СОБСТВЕННОЕ Я", text : "Меня не спрашивай, я это ты."});
			break;
		}
	}
	,processAnswer_4: function(index) {
		switch(index) {
		case 0:
			this.interactive.addPersonText({ personName : "ВАШЕ СОБСТВЕННОЕ Я", text : "Может лечится? Выйдешь из больницы, выяснишь что произошло. Чем не план?"});
			break;
		case 1:
			this.interactive.addPersonText({ personName : "ВАШЕ СОБСТВЕННОЕ Я", text : "Я тоже не чувствую себя сумасшедшим. Но это не значит, что это не возможно"});
			break;
		case 2:
			this.interactive.addPersonText({ personName : "ВАШЕ СОБСТВЕННОЕ Я", text : "В борьбе можно потерять всё что есть."});
			this.interactive.addChoose(["Ты вообще за кого?","Не потеряю","[Зло] Заткнись"],$bind(this,this.processAnswer_4_2));
			break;
		}
	}
	,processAnswer_4_2: function(index) {
		switch(index) {
		case 0:
			this.interactive.addPersonText({ personName : "ВАШЕ СОБСТВЕННОЕ Я", text : "Конечно за тебя, но ты это я, а я не хочу потерять себя в войне за твою \"правду\"."});
			break;
		case 1:
			this.interactive.addPersonText({ personName : "ВАШЕ СОБСТВЕННОЕ Я", text : "Хорошо. Может попробуешь вспомнить, что было вчера?"});
			break;
		case 2:
			this.interactive.addPersonText({ personName : "ВАШЕ СОБСТВЕННОЕ Я", text : "..."});
			break;
		}
	}
	,processToEnd: function() {
		var _gthis = this;
		this.interactive.addText("Вы чувствуете, что хотите в туалет.");
		this.interactive.addPersonText({ personName : "ВАШЕ СОБСТВЕННОЕ Я", text : "Этого ещё не хватало!"});
		var piss = function() {
			_gthis.interactive.addText("Чувствуете тепло, стекающее по ногам. Это так унизительно.");
			_gthis.interactive.addPersonText({ personName : "ВАШЕ СОБСТВЕННОЕ Я", text : "Как низко ты пала!"});
			_gthis.interactive.addText("В таком состоянии Вы пытаетесь заснуть, что бы этот кошмар закончился.");
			_gthis.interactive.addContinue($bind(_gthis,_gthis.processEnd));
		};
		var endure = function() {
			_gthis.interactive.addText("Чувствуете, что не вытерпите всю ночь");
			_gthis.interactive.addPersonText({ personName : "ВАШЕ СОБСТВЕННОЕ Я", text : "(Смеётся) Похоже выбора у тебя нет"});
			_gthis.interactive.addChoose(["Помочится под себя"],function(_) {
				piss();
			});
		};
		this.interactive.addChoose(["Закричать","Терпеть","Помочится под себя"],function(index) {
			switch(index) {
			case 0:
				_gthis.interactive.addText("Вы кричите, но Вас никто не слышит, или не хотят слышать");
				_gthis.interactive.addChoose(["Терпеть","Помочится под себя"],function(index2) {
					switch(index2) {
					case 0:
						endure();
						break;
					case 1:
						piss();
						break;
					}
				});
				break;
			case 1:
				endure();
				break;
			case 2:
				piss();
				break;
			}
		});
	}
	,processEnd: function() {
		var scene2 = new scenes_Scene2_$DayTwo();
		this.game.setScene(scene2);
	}
	,leave: function() {
	}
});
var scenes_Scene2_$DayTwo = function() {
	common_Scene.call(this);
};
scenes_Scene2_$DayTwo.__super__ = common_Scene;
scenes_Scene2_$DayTwo.prototype = $extend(common_Scene.prototype,{
	enter: function() {
		this.interactive.setSceneTitle("Часть 2. День второй");
		this.interactive.addText("В разработке.");
	}
	,leave: function() {
	}
});
var $_;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $global.$haxeUID++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = m.bind(o); o.hx__closures__[m.__id__] = f; } return f; }
$global.$haxeUID |= 0;
Main.main();
})(typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);
