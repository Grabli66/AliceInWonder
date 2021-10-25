package common.scene;

import common.interactive.InteractiveSystem;

// Базовое состояние XML сцены
abstract class XmlSceneState {
    // Интерактивная система
    @:allow(common.scene.BaseScene)
    private var interactive:InteractiveSystem;

    // Возвращает данные персонажа по имени
    private function getPersonById(name:String):Person {
        return null;
    }
}