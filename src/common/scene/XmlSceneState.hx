package common.scene;

import common.interactive.InteractiveSystem;

// Базовое состояние XML сцены
@:keepSub
abstract class XmlSceneState {
    // Интерактивная система
    @:allow(common.scene.XmlScene)
    private var scene:XmlScene;

    // Интерактивная система
    public var interactive(get, never):InteractiveSystem;    
    function get_interactive():InteractiveSystem {
        return scene.getInteractive();
    }

    // Возвращает данные персонажа по имени
    private function getPersonById(id:String):Person {
        return scene.getPersonById(id);
    }

    // Проверяет был ли выбран вариант ответа с идентификатором id
    private function checkChoose(id:String):Bool {
        return scene.choosed.exists(id);
    }
}