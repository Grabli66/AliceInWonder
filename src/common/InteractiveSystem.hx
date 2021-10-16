package common;

import js.Browser;

typedef AddPersonTextParameters = {
	?isYou:Bool,
	?personName:String,
	text:String
}

// Взаимодействия с игроком
class InteractiveSystem {
	// Заголовок сцены
	final sceneTitle:js.html.Element;

	// Главный контент
	final sceneContent:js.html.Element;

	// Обнавляет скроллинг что бы читалось
	private function updateScroll() {
		sceneContent.scrollTop = sceneContent.scrollHeight;
	}

	// Конструктор
	public function new() {
		sceneTitle = Browser.document.querySelector("#scene-title");
		sceneContent = Browser.document.querySelector("#scene-content");
	}

	// Очищает
	public function clear() {
		sceneContent.innerHTML = "";
		setSceneTitle("");
	}

	// Устанавливает заголовок сцены
	public function setSceneTitle(title:String) {
		sceneTitle.innerText = title;
	}

	// Добавляет текст
	public function addText(text:String) {
		var node = Browser.document.createDivElement();
		node.innerText = text;
		node.className = "single-text";
		sceneContent.appendChild(node);
		updateScroll();
	}

	// Добавляет прямую речь персонажа
	public function addPersonText(parameters:AddPersonTextParameters) {
		var rootNode = Browser.document.createDivElement();
		var nameNode = Browser.document.createSpanElement();
		var textNode = Browser.document.createSpanElement();
		var sepNode = Browser.document.createSpanElement();

		rootNode.className = "person-text";

		if (parameters.isYou) {
			nameNode.className = "name you";
			nameNode.innerText = "ВЫ";
		} else {
			nameNode.innerText = parameters.personName.toUpperCase();
			nameNode.className = "name";
		}

		sepNode.className = "separator";
		sepNode.innerText = "-";

		textNode.innerText = '"' + parameters.text + '"';
		textNode.className = "text";

		rootNode.appendChild(nameNode);
		rootNode.appendChild(sepNode);
		rootNode.appendChild(textNode);
		sceneContent.appendChild(rootNode);

		updateScroll();
	}

	// Добавляет выбор
	public function addChoose(variants:Array<String>, onClick:Int->Void) {
		var chooseNode = Browser.document.createDivElement();
		chooseNode.className = "choose-root";
		sceneContent.appendChild(chooseNode);

		var i = 1;
		for (variant in variants) {
			var node = Browser.document.createDivElement();
			node.innerText = '${i}. ${variant}';
			node.className = "choose-item";
			node.onclick = () -> {
				chooseNode.remove();
				addPersonText({
					isYou: true,
					text: variant
				});
				onClick(variants.indexOf(variant));
			};
			chooseNode.appendChild(node);
			i += 1;
		}

		updateScroll();
	}

	// Добавляет кнопку "Продолжить"
	public function addContinue(onClick:Void->Void) {
		var continueNode = Browser.document.createDivElement();
		continueNode.innerText = "<< ПРОДОЛЖИТЬ >>";
		continueNode.className = "continue-click";
		continueNode.onclick = () -> {
			onClick();
		};

		sceneContent.appendChild(continueNode);
		updateScroll();
	}
}
