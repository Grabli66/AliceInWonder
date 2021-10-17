package common.interactive;

import motion.Actuate;
import motion.easing.Linear;
import common.interactive.InteractiveElement;
import js.Browser;

typedef AddPersonTextParameters = {
	?isYou:Bool,
	?personName:String,
	text:String
}

// Параметры для метода добавления элемента выбора
typedef ChooseMethodParameters = {
	// Варианты выбора
	select:Array<String>,
	// Обработчик выбора
	onSelect:Int->Void,
	// Обработчик перед добавлением выбора
	?onBeforeSelect:Int->Void
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

	// Добавляет элемент
	private function addElement(element:InteractiveElement) {
		final node = element.renderInternal();
		sceneContent.appendChild(node);
		updateScroll();
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
	public function addText(text:String):TextElement {
		var element = new TextElement(text);
		addElement(element);
		element.opacity = 0;
        Actuate.tween(element, 0.7, {opacity: 1.0}).ease(Linear.easeNone);
		return element;
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
	public function addChoose(parameters:ChooseMethodParameters):ChooseElement {
		final choose = new ChooseElement({
			select: parameters.select,
			onSelect: (index) -> {
				if (parameters.onBeforeSelect != null)
					parameters.onBeforeSelect(index);

				addPersonText({
					isYou: true,
					text: parameters.select[index]
				});
				parameters.onSelect(index);
			}
		});

		addElement(choose);
		return choose;
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
