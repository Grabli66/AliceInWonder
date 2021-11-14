package common.scene;

import common.interactive.InteractiveSystem;
import haxe.xml.Access;
import haxe.Http;

// Сцена на основе XML описания
class XmlScene extends BaseScene {
	// Части сцен
	private final parts = new Map<String, Access>();

	// Информационные блоки с выбором
	private final chooseblocks = new Map<String, ChooseStateBlock>();

	// Персонажи
	private final persons = new Map<String, Person>();

	// Варианты которые были выбраны
	@:allow(common.scene.XmlSceneState)
	private final choosed = new Map<String, Bool>();

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

	// Обрабатывает дейтсвие
	private function processAction(items:Iterator<Access>, node:Access, ?prevText:String) {
		final actionNode = node.elements.next();
		switch actionNode.name {
			case "addPortrait":
				final personId = actionNode.node.person.innerData;
				final person = getPersonById(personId);
				var showPosition = true;
				if (actionNode.hasNode.showOption) {
					final showOption = actionNode.node.showOption.innerData;
					trace(showOption);
					if (showOption != "fullnameWithPosition") {
						showPosition = false;
					}
				}
				interactive.addPersonPortrait(person, showPosition);
			case "setPortrait":
				final fromPersonName = actionNode.node.from.innerData;
				final toPersonName = actionNode.node.to.innerData;
				final fromPerson = getPersonById(fromPersonName);
				final toPerson = getPersonById(toPersonName);
				interactive.setPersonPortrait(fromPerson, toPerson);
			case "execute":
				final name = actionNode.innerData;
				final field = Reflect.field(state, name);
				Reflect.callMethod(state, field, []);
		}

		addPartItem(items, prevText);
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
				processAction(items, item, prevText);
			case "goto":
				final link = item.innerData;
				final linkPart = getPartById(link);
				addScenePart(linkPart, prevText);
			case "choose":
				final items = new Map<String, String>();
				for (item in item.nodes.item) {
					final link = item.att.link;
					final text = item.innerData;
					items[link] = text;
				}

				var chooseBlock:ChooseStateBlock = null;
				if (item.hasNode.include) {
					final link = item.node.include.att.link;
					chooseBlock = chooseblocks[link];
					for (item in chooseBlock.getActions().keyValueIterator()) {
						items[item.key] = item.value;
					}
				}

				interactive.addChoose({
					select: items,
					onSelect: (select, id) -> {
						interactive.addPlayerText(select[id]);

						if (chooseBlock != null) {
							chooseBlock.removeAction(id);
						}

						final partId = id;
						choosed[partId] = true;
						final part = getPartById(partId);
						addScenePart(part, select[id]);
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
			case "condition":
				final checkChoose = item.att.checkChoose;
				var partId:String;
				if (checkChoose != null) {
					partId = if (choosed.exists(checkChoose)) {
						item.node.iftrue.innerData;
					} else {
						item.node.iffalse.innerData;
					}
				} else {
					final checkFunc = item.att.checkFunc;
					final field = Reflect.field(state, checkFunc);
					final result = cast(Reflect.callMethod(state, field, []), Bool);
					partId = if (result) {
						item.node.iftrue.innerData;
					} else {
						partId = item.node.iffalse.innerData;
					}
				}

				final part = getPartById(partId);
				addScenePart(part, prevText);
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

		if (access.hasNode.chooseblocks) {
			for (chooseblock in access.node.chooseblocks.nodes.chooseblock) {
				final blockId = chooseblock.att.id;
				final actions = new Map<String, String>();
				for (action in chooseblock.nodes.item) {
					final actionId = action.att.link;
					final text = action.innerData;
					actions[actionId] = text;
				}

				chooseblocks[blockId] = new ChooseStateBlock(actions);
			}
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

		if (sceneNode.hasNode.state) {
			final stateName = sceneNode.node.state.innerData;
			final resolvedClass = Type.resolveClass(stateName);
			final state = Type.createInstance(resolvedClass, []);
			setState(state);
		}

		interactive.setSceneTitle(sceneCaption);
		final part = getPartById(enterPartName);
		addScenePart(part);
	}
}
