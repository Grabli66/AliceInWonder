package common;

// Данные NPC
class Person {
    // Имя
    public final name:String;

    // Картинка портрета
    public final portraitImage:String;

    // Конструктор
    public function new(name:String, portraitImage:String) {
        this.name = name;
        this.portraitImage = portraitImage;
    }
}