package common.scene;

import haxe.xml.Access;
import haxe.Http;

// Сцена на основе XML описания
class XmlScene extends BaseScene {
	// Части сцен
	private final parts = new Map<String, Access>();

	// Персонажи
	private final persons = new Map<String, Person>();

	// Состояние сцены
	private var state:XmlSceneState;

	// Название начальной части сцены
	private var enterPartName:String;

	// Возвращает NPC по ID
	private function getPersonById(id:String):Person {
		return persons[id];
	}

	// Возвращает часть сцены по id
	private function getPartById(id:String):Access {
		return parts[id];
	}

	// Считает задержку для текста
	private function getTextWait(text:String) {
		#if debug
		return 0;
		#else
		var wait = text.length * 15; // 15 мс на каждое слово
		if (wait < 1300)
			wait = 1300;
		trace(wait);
		return wait;
		#end
	}

	private function addPartItem(items:Iterator<Access>, prevWait:Int) {
		if (!items.hasNext())
			return;

		final item = items.next();

		switch item.name {
			case "text":
				interactive.addWait(prevWait, () -> {
					final text = item.innerData;
					interactive.addText(text);
					final wait = getTextWait(text);
					addPartItem(items, wait);
				});
			case "personText":
				final text = item.node.text.innerData;
				final wait = getTextWait(text);

				interactive.addWait(wait, () -> {
					final text = item.node.text.innerData;
					interactive.addPersonText(getPersonById(item.node.person.innerData), text);
					addPartItem(items, wait);
				});
			case "action":
				final name = item.innerData;
				final field = Reflect.field(state, name);
				Reflect.callMethod(state, field, []);
			case "choose":
				final items = new Array<String>();
				final ids = new Array<String>();
				for (item in item.nodes.item) {
					items.push(item.innerData);
					ids.push(item.att.link);
				}

				interactive.addChoose({
					select: items,
					onSelect: (select, index) -> {
						interactive.addPlayerText(select[index]);

						final partId = ids[index];
						final part = getPartById(partId);
						addScenePart(part);
					}
				});
		}
	}

	// Добавляет часть сцены
	private function addScenePart(part:Access) {
		addPartItem(part.elements, 0);
	}

	public static function load(path:String, onComplete:XmlScene->Void) {
		var req = new Http(path);
		req.onData = function(data) {
			final xml = Xml.parse(data);
			var access = new haxe.xml.Access(xml.firstElement());
			final scene = new XmlScene(access);
			onComplete(scene);
		}
		req.request();
	}

	// Загружает сцену из XML файла
	public function new(access:Access) {
		super();

		enterPartName = access.node.enter.innerData;

		for (person in access.node.persons.nodes.person) {
			var surname:String = null;
			var position:String = null;

			if (person.hasNode.surname)
				surname = person.node.surname.innerData;
			if (person.hasNode.surname)
				position = person.node.position.innerData;

			persons[person.att.id] = new Person(person.node.name.innerData, person.node.portrait.innerData, {
				surname: surname,
				position: position
			});
		}

		for (part in access.node.parts.nodes.part) {
			final partId = part.att.id;
			parts[partId] = part;
		}
	}

	// Устанавливает обработчик состояния
	public function setState(state:XmlSceneState) {
		this.state = state;
	}

	// Обрабатывает вход в сцену
	public function enter() {
		final part = getPartById(enterPartName);
		addScenePart(part);
	}
}
