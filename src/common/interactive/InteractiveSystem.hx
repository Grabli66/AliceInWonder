package common.interactive;

import common.Person;
import motion.Actuate;
import motion.easing.Linear;
import common.interactive.InteractiveElement;
import js.Browser;

// Параметры добавления текста персонажа
typedef AddPersonTextParameters = {
	// Речь персонажа
	text:String,
	// Данные персонажа
	person:Person,
	// Время ожидания перед выводом текста
	?waitTime:Float,
	// Обработчик после завершения ожидания
	?onWaitComplete:Void->Void
}

// Параметры для метода добавления элемента выбора
typedef ChooseMethodParameters = {
	// Варианты выбора
	select:Array<String>,
	// Обработчик выбора
	onSelect:(Array<String>, Int) -> Void,
}

// Взаимодействия с игроком
class InteractiveSystem {
	// Заголовок сцены
	final sceneTitle:js.html.Element;

	// Главный контент
	final sceneContentNode:js.html.Element;

	// Нода где хранятся портреты
	final leftPageNode:js.html.Element;

	// Список новых элементов
	var newElements = new Array<InteractiveElement>();

	// Обнавляет скроллинг что бы читалось
	private function updateScroll() {
		sceneContentNode.scrollTop = sceneContentNode.scrollHeight;
	}

	// Добавляет элемент
	private function addElement(element:InteractiveElement) {
		final node = element.renderInternal();
		sceneContentNode.appendChild(node);
		newElements.push(element);
		updateScroll();
	}

	// Делает элементы старыми, что бы новые
	private function makeElementsOld() {
		for (element in newElements) {
			Actuate.tween(element, 0.3, {opacity: 0.6}).ease(Linear.easeNone);
		}

		newElements = new Array<InteractiveElement>();
	}

	// Конструктор
	public function new() {
		sceneTitle = Browser.document.querySelector("#scene-title");
		sceneContentNode = Browser.document.querySelector("#scene-content");
		leftPageNode = Browser.document.querySelector("#left-page-panel");
	}

	// Очищает
	public function clear() {
		sceneContentNode.innerHTML = "";
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
		Actuate.tween(element, 0.5, {opacity: 1.0}).ease(Linear.easeNone);
		return element;
	}

	// Добавляет речь игрока
	public function addPlayerText(text:String) {
		final element = new PersonTextElement({
			nameColor: Color.Orange,
			name: "ВЫ",
			text: text
		});

		addElement(element);
		element.opacity = 0;
		Actuate.tween(element, 0.5, {opacity: 1.0}).ease(Linear.easeNone);
		updateScroll();
	}

	// Добавляет прямую речь NPC
	public function addPersonText(parameters:AddPersonTextParameters) {
		function add() {
			final element = new PersonTextElement({
				nameColor: Color.Blue,
				name: parameters.person.fullNameWithPosition,
				text: parameters.text
			});

			addElement(element);
			element.opacity = 0;
			Actuate.tween(element, 0.5, {opacity: 1.0}).ease(Linear.easeNone);
			updateScroll();
		}

		if (parameters.waitTime != null) {
			addWait(parameters.waitTime, () -> {
				add();
				if (parameters.onWaitComplete != null)
					parameters.onWaitComplete();
			});
		} else {
			add();
		}
	}

	// Добавляет выбор
	public function addChoose(parameters:ChooseMethodParameters):ChooseElement {
		final element = new ChooseElement({
			select: parameters.select,
			onSelect: (index) -> {
				makeElementsOld();
				parameters.onSelect(parameters.select, index);
			}
		});

		addElement(element);
		element.opacity = 0;
		Actuate.tween(element, 1.0, {opacity: 1.0}).ease(Linear.easeNone);
		return element;
	}

	// Добавляет портрет NPC с которым ведётся разговор
	public function addPersonPortrait(person:Person):PersonPortraitElement {
		final element = new PersonPortraitElement(person);
		final node = element.renderInternal();
		leftPageNode.appendChild(node);
		element.opacity = 0;
		Actuate.tween(element, 1.0, {opacity: 1.0}).ease(Linear.easeNone);
		return element;
	}

	// Добавляет ожидание действия персонажа
	public function addWait(waitTime:Float, onComplete:Void->Void):WaitPersonElement {
		final node = new WaitPersonElement(waitTime, () -> {
			onComplete();
			updateScroll();
		});
		addElement(node);
		node.start();
		return node;
	}

	// Добавляет кнопку "Продолжить"
	public function addContinue(onClick:Void->Void) {
		var continueNode = Browser.document.createDivElement();
		continueNode.innerText = "<< ПРОДОЛЖИТЬ >>";
		continueNode.className = "continue-click";
		continueNode.onclick = () -> {
			onClick();
		};

		sceneContentNode.appendChild(continueNode);
		updateScroll();
	}
}
