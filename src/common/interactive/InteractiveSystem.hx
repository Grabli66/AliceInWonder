package common.interactive;

import haxe.CallStack;
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
}

// Параметры для метода добавления элемента выбора
typedef ChooseMethodParameters = {
	// Варианты выбора
	select:Map<String, String>,
	// Обработчик выбора
	onSelect:(Map<String, String>, String) -> Void,
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

	// Словарь элементов с портретами
	final portraits = new Map<String, PersonPortraitElement>();

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
		newElements = new Array<InteractiveElement>();
		portraits.clear();
		leftPageNode.innerHTML = "";
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
		updateScroll();
		return element;
	}

	// Добавляет речь игрока
	public function addPlayerText(text:String):PersonTextElement {
		final element = new PersonTextElement({
			nameColor: Color.Orange,
			name: "ВЫ",
			text: text
		});

		addElement(element);
		element.opacity = 0;
		Actuate.tween(element, 0.5, {opacity: 1.0}).ease(Linear.easeNone);
		updateScroll();

		return element;
	}

	// Добавляет прямую речь NPC
	public function addPersonText(person:Person, text:String):PersonTextElement {
		final element = new PersonTextElement({
			nameColor: Color.Blue,
			name: person.fullNameWithPosition,
			text: text
		});

		addElement(element);
		element.opacity = 0;
		Actuate.tween(element, 0.5, {opacity: 1.0}).ease(Linear.easeNone);
		updateScroll();

		return element;
	}

	// Добавляет выбор
	public function addChoose(parameters:ChooseMethodParameters):ChooseElement {
		final element = new ChooseElement({
			select: parameters.select,
			onSelect: (id) -> {
				makeElementsOld();
				#if debug
				trace(parameters);
				#end
				parameters.onSelect(parameters.select, id);
			}
		});

		addElement(element);
		element.opacity = 0;
		Actuate.tween(element, 1.0, {opacity: 1.0}).ease(Linear.easeNone);
		return element;
	}

	// Добавляет портрет NPC с которым ведётся разговор
	public function addPersonPortrait(person:Person, ?showPosition = true):PersonPortraitElement {
		final element = new PersonPortraitElement(person, showPosition);
		final node = element.renderInternal();
		leftPageNode.appendChild(node);
		element.opacity = 0;
		Actuate.tween(element, 1.0, {opacity: 1.0}).ease(Linear.easeNone);
		portraits[person.fullNameWithPosition] = element;
		return element;
	}

	// Устанавливает портрет персонажу
	public function setPersonPortrait(oldPerson:Person, newPerson:Person):PersonPortraitElement {
		final element = portraits[oldPerson.fullNameWithPosition];
		element.person = newPerson;
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
	public function addLink(caption:String, onClick:Void->Void) {
		var linkNode = Browser.document.createDivElement();
		linkNode.innerText = caption;
		linkNode.className = "link-click";
		linkNode.onclick = () -> {
			onClick();
		};

		sceneContentNode.appendChild(linkNode);
		updateScroll();
	}
}
