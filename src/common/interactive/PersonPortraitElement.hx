package common.interactive;

import js.Browser;
import js.html.Element;

// Портрет NPC
class PersonPortraitElement extends InteractiveElement {
	// Показывать ли должность
	private var showPosition:Bool;

	// Данные персонажа
	private var _person:Person;

	public var person(get, set):Person;

	function get_person():Person {
		return _person;
	}

	function set_person(value:Person):Person {
		_person = value;
		if (rootNode != null) {
			portraitNode.style.backgroundImage = 'url(images/${person.portraitImage})';
			nameNode.innerText = person.fullNameWithPosition.toUpperCase();
		}

		return _person;
	}

	// Нода для портрета
	private var portraitNode:js.html.Element;

	// Нода для имени
	private var nameNode:js.html.Element;

	// Конструктор
	public function new(person:Person, ?showPosition = true) {
		super();

		this.showPosition = showPosition;
		_person = person;
	}

	// Создаёт элемент
	public function render():Element {
		var mainNode = Browser.document.createDivElement();
		mainNode.className = "person-portrait-conatiner";

		portraitNode = Browser.document.createDivElement();
		portraitNode.className = "portrait";
		portraitNode.style.backgroundImage = 'url(images/${person.portraitImage})';

		nameNode = Browser.document.createDivElement();
		nameNode.className = "name grey-color";
		if (showPosition) {
			nameNode.innerText = person.fullNameWithPosition.toUpperCase();
		} else {
			nameNode.innerText = person.fullName.toUpperCase();
		}

		mainNode.appendChild(portraitNode);
		mainNode.appendChild(nameNode);

		return mainNode;
	}
}
