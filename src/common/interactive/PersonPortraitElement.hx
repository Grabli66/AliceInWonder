package common.interactive;

import js.Browser;
import js.html.Element;

// Портрет NPC
class PersonPortraitElement extends InteractiveElement {
	// Данные персонажа
	public final person:Person;

	// Конструктор
	public function new(person:Person) {
		super();

		this.person = person;
	}

	// Создаёт элемент
	public function render():Element {
		var mainNode = Browser.document.createDivElement();
		mainNode.className = "person-portrait-conatiner";

		var portraitNode = Browser.document.createDivElement();
		portraitNode.className = "portrait";
		portraitNode.style.backgroundImage = 'url(images/${person.portraitImage})';

		var nameNode = Browser.document.createDivElement();
		nameNode.className = "name grey-color";
		nameNode.innerText = person.name.toUpperCase();

		mainNode.appendChild(portraitNode);
		mainNode.appendChild(nameNode);

		return mainNode;
	}
}
