package common.scene;

import common.interactive.InteractiveSystem;
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

	// Основной элемент XML сцены
	private final sceneNode:Access;

	// Возвращает систему вывода

	@:allow(common.scene.XmlSceneState)
	private function getInteractive():InteractiveSystem {
		return interactive;
	}

	// Возвращает часть сцены по id
	private function getPartById(id:String):Access {
		return parts[id];
	}

	// Возвращает NPC по ID

	@:allow(common.scene.XmlSceneState)
	private function getPersonById(id:String):Person {
		return persons[id];
	}

	// Считает задержку для текста
	private function getTextWaitForNode(text:String) {
		if (text == null)
			return null;

		trace(text);

		#if debug
		return 0;
		#else
		var wait = text.length * 40; // 40 мс на каждый символ
		if (wait < 1500)
			wait = 1500;
		trace(wait);
		return wait;
		#end
	}

	private function addPartItem(items:Iterator<Access>, ?prevText:String) {
		if (!items.hasNext())
			return;

		final item = items.next();
		#if debug
		trace(item.name);
		#end

		switch item.name {
			case "text":
				final wait = getTextWaitForNode(prevText);

				interactive.addWait(wait, () -> {
					final text = item.innerData;
					interactive.addText(text);
					addPartItem(items, text);
				});
			case "personText":
				final wait = getTextWaitForNode(prevText);

				interactive.addWait(wait, () -> {
					final text = item.node.text.innerData;
					interactive.addPersonText(getPersonById(item.node.person.innerData), text);
					addPartItem(items, text);
				});
			case "action":
				final name = item.innerData;
				final field = Reflect.field(state, name);
				Reflect.callMethod(state, field, []);
				addPartItem(items, prevText);
			case "goto":
				final link = item.innerData;
				final linkPart = getPartById(link);
				addScenePart(linkPart, prevText);
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
						addScenePart(part, select[index]);
					}
				});
			case "link":
				final caption = item.node.text.innerData;
				interactive.addLink(caption, () -> {
					final link = item.node.link.innerData;
					XmlScene.load(link, (scene) -> {						
						game.setScene(scene);
					});
				});
		}
	}

	// Добавляет часть сцены
	private function addScenePart(part:Access, ?prevText:String) {
		addPartItem(part.elements, prevText);
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

		sceneNode = access;

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
		state.scene = this;
	}

	// Обрабатывает вход в сцену
	public function enter() {
		final sceneCaption = sceneNode.node.caption.innerData;
		final enterPartName = sceneNode.node.enter.innerData;

		final stateName = sceneNode.node.state.innerData;
		trace(stateName);
		final resolvedClass = Type.resolveClass(stateName);
		trace(resolvedClass);
		final state = Type.createInstance(resolvedClass, []);
		trace(state);
		setState(state);

		interactive.setSceneTitle(sceneCaption);
		final part = getPartById(enterPartName);
		addScenePart(part);
	}
}
