package common;

// Данные NPC
typedef OptionalPersonParameters = {
	// Фамилия
	?surname:String,

	// Должность
	?position:String,
}

// Данные NPC
class Person {
	// Имя
	public final name:String;

	// Фамилия
	public final surname:String;

	// Должность
	public final position:String;

	// Картинка портрета
	public final portraitImage:String;

	// Имя+Фамилия
	public var fullName(get, never):String;

	function get_fullName():String {
		if (surname != null) {
			return '${name} ${surname}';
		}
		return name;
	}

    public var fullNameWithPosition(get, never):String;
    function get_fullNameWithPosition():String {
		if (position != null) {
            return '${position} ${fullName}';
        }

        return fullName;
	}

	// Конструктор
	public function new(name:String, portraitImage:String, ?optional:OptionalPersonParameters) {
		this.name = name;
		this.portraitImage = portraitImage;
		if (optional != null) {
			this.surname = optional.surname;
			this.position = optional.position;
		}        
	}	
}
