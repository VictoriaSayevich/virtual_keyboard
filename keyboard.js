const Keyboard = {
    elements: {
        textarea: null,
        container: null,
        rows: [],
        keys: []
    },

    keyboardContent: {
        ru: [
            ['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '+', 'Backspace'],
            ['Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ'],
            ['CapsLk', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', ',', 'Enter'],
            ['Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '/', '▲', 'Shift'],
            ['Ctrl', 'Win', 'Alt', '\u00A0', 'Alt', '◄', '▼', '►']
        ],
        en: [
            ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '+', 'Backspace'],
            ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '{', '}'],
            ['CapsLk', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '"', 'Enter'],
            ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '▲', 'Shift'],
            ['Ctrl', 'Win', 'Alt', '\u00A0', 'Alt', '◄', '▼', '►']
        ]
    },

    properties: {
        value: "",
        capsLook: false,
        shift: false,
        language: {
            ru: true,
            en: false
        }
    },

    _createElement(my_tag, my_class = '') {
        const element = document.createElement(my_tag);
        element.classList.add(my_class);
        return element;
    },

    _main() {
        this._createKeyboard();
        this._events();
    },

    _createKeyboard() {
        this.elements.textarea = this._createElement('textarea', 'result');
        this.elements.textarea.setAttribute('cols', '80');
        this.elements.textarea.setAttribute('rows', '20');
        document.body.appendChild(this.elements.textarea);
        this.elements.container = this._createElement('div', 'container');
        document.body.appendChild(this.elements.container);

        for (let i = 0; i < this.keyboardContent.en.length; i++) {
            const row = this._createElement('div', 'row');
            this.elements.container.appendChild(row);
            for (let j = 0; j < this.keyboardContent.en[i].length; j++) {
                const key = this._createElement('div', 'key');
                let text_ru = this.keyboardContent.ru[i][j];
                let text_en = this.keyboardContent.en[i][j];
                const span_ru = this._createElement('span', 'ru');
                const span_en = this._createElement('span', 'en');
                switch (this.keyboardContent.en[i][j]) {
                    case "Tab":
                        key.classList.add('special--tab');
                        break;
                    case "CapsLk":
                        key.classList.add('special--capsLook');
                        break;
                    case '◄':
                        key.classList.add("special--arrow_left");
                        break;
                    case "▼":
                        key.classList.add("special--arrow_down");
                        break;
                    case "►":
                        key.classList.add("special--arrow_right");
                        break;
                    case "▲":
                        key.classList.add("special--arrow_up");
                        break;
                    case "\u00A0":
                        key.classList.add("special--space");
                        break;
                    case "Enter":
                        key.classList.add("special--enter");
                        break;
                    case "Alt":
                        key.classList.add("special--Alt");
                        break;
                    case "Shift":
                        key.classList.add("special--Shift");
                        break;
                    case "Ctrl":
                        key.classList.add("special--Ctrl");
                        break;
                    case "Backspace":
                        key.classList.add("special--Backspace");
                        break;
                    case "Win":
                        key.classList.add("special--Win");
                        break;
                    case "Shift":
                        key.classList.add("special--Shift");
                        break;
                    default:
                        key.classList.add("letter");
                        break;
                }
                row.appendChild(key);
                (key.appendChild(span_ru)).appendChild(document.createTextNode(text_ru));
                (key.appendChild(span_en)).appendChild(document.createTextNode(text_en));
            }
        }

    },

    _events() {
        document.querySelector('.container').addEventListener('mouseover', this._hover);
        document.querySelector('.container').addEventListener('click', this._click);
    },

    _toCapsLook() {
        const spanKeys = document.querySelectorAll('.letter');
        console.log(spanKeys);
        if (this.properties.capsLook) {
            document.querySelector('.special--capsLook').style.background = 'rgb(255, 147, 147)';
            spanKeys.forEach(key => {
                key.style.textTransform = "lowercase";
            });
            this.properties.capsLook = false;
        } else {
            document.querySelector('.special--capsLook').style.background = "rgb(168, 76, 76)";
            spanKeys.forEach(key => {
                key.style.textTransform = "uppercase";
            });
            this.properties.capsLook = true;
        }
    },

    _toBackspace() {

    },

    _click() {
        console.log(event.composedPath());
        const target = event.target;
        if (target.classList.value.indexOf('key') >= 0 || target.tagName === 'SPAN') {
            if (target.classList.value.indexOf('special') >= 0 || target.parentNode.classList.value.indexOf('special') >= 0) {
                const spanKeys = document.querySelectorAll('span');
                if (target.classList.value.indexOf('capsLook') >= 0 || target.parentNode.classList.value.indexOf('capsLook') >= 0) {
                    //not a function!!!???? typeError
                    Keyboard._toCapsLook();
                }
                if (target.classList.value.indexOf('Backspace') >= 0 || target.parentNode.classList.value.indexOf('Backspace') >= 0) {
                    console.log('backspace');
                    Keyboard.elements.textarea.value = Keyboard.elements.textarea.value.substring(0, Keyboard.elements.textarea.value.length - 1);;
                }
            } else {
                if (event.target.className === 'key') Keyboard.elements.textarea.value += event.target.lastChild.innerText;
                else Keyboard.elements.textarea.value += event.target.innerText;
            }
        }

    },

    _clickMy() {

        // const target = event.target;
        if (event.target.className === 'key') {
            event.stopPropagation();
        }
        const path = event.composedPath();
        // if (path.includes())
        console.log(path);
        console.log(event.target);
    },

    _hover() {
        event.target.style.cursor = "pointer";
    }
}

window.addEventListener("DOMContentLoaded", function() {
    Keyboard._main();
});