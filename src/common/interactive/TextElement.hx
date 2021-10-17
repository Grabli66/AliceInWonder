package common.interactive;

import js.Browser;
import js.html.Element;

// Текстовый элемент
class TextElement extends InteractiveElement {
	// Текст
	public final text:String;

	// Конструктор
	public function new(text:String) {
		super();
		this.text = text;
	}

	// Создаёт элемент и возвращает корневой элемент
	public function render():Element {
		var node = Browser.document.createDivElement();
		node.innerText = text;
		node.className = "single-text";
		return node;
	}
}
