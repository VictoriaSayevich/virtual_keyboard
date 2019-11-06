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
            ['CapsLk', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '"', '?', 'Enter'],
            ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '▲', 'Shift'],
            ['Ctrl', 'Win', 'Alt', '\u00A0', 'Alt', '◄', '▼', '►']
        ]
    },

    properties: {
        capsLook: false,
        shift: false,
        ctrl: false,
        alt: false,
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
                        key.classList.add('special--Tab');
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
                        key.classList.add("special--Space");
                        break;
                    case "Enter":
                        key.classList.add("special--Enter");
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
        document.querySelector('.container').addEventListener('mousedown', this._keysTransformDown);
        document.querySelector('.container').addEventListener('mouseup', this._keysTransformUp);
        document.querySelector('.container').addEventListener('click', this._click);
    },

    _toCapsLook() {
        const spanKeys = document.querySelectorAll('.letter');
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

    _changeLanguage() {
        if (!this.properties.shift || !this.properties.ctrl) return;
        const ru_keys = document.querySelectorAll('span.ru');
        const en_keys = document.querySelectorAll('span.en');
        this.properties.shift = false;
        this.properties.ctrl = false;
        const ctrl = document.querySelector('.special--Ctrl');
        const shift = document.querySelector('.special--Shift');
        shift.style.background = ctrl.style.background = 'rgb(255, 147, 147)';
        if (this.properties.language.ru == true) {
            [].forEach.call(ru_keys, function(elem) {
                elem.style.display = 'none';
            });
            [].forEach.call(en_keys, function(elem) {
                elem.style.display = 'inline';
            });
            this.properties.language.ru = false;
            this.properties.language.en = true;
        } else {
            [].forEach.call(en_keys, function(elem) {
                elem.style.display = 'none';
            });
            [].forEach.call(ru_keys, function(elem) {
                elem.style.display = 'inline';
            });
            this.properties.language.ru = true;
            this.properties.language.en = false;
        }
    },

    _toBackspace() {
        this.elements.textarea.value = this.elements.textarea.value.substring(0, this.elements.textarea.value.length - 1);
    },

    _toCtrl() {
        const ctrl = document.querySelector('.special--Ctrl');
        if (this.properties.ctrl) {
            this._changeLanguage();
            this.properties.ctrl = false;
            ctrl.style.background = 'rgb(255, 147, 147)';
        } else {
            this.properties.ctrl = true;
            ctrl.style.background = "rgb(168, 76, 76)";
            this._changeLanguage();
        }

    },

    _toShift() {
        const ctrl = document.querySelector('.special--Shift');
        if (this.properties.shift) {
            this._changeLanguage();
            this.properties.shift = false;
            ctrl.style.background = 'rgb(255, 147, 147)';
        } else {
            this.properties.shift = true;
            ctrl.style.background = "rgb(168, 76, 76)";
            this._changeLanguage();

        }
        this._changeLanguage();
    },

    _keysTransformDown() {
        const target = event.target;
        if (target.tagName === 'SPAN') {
            target.closest(".key").style.marginTop = "7px";
            target.closest(".key").style.boxShadow = "none";
        }
        if (target.classList.value.indexOf('key') >= 0) {
            target.style.marginTop = "7px";
            target.style.boxShadow = "none";
        }
    },

    _keysTransformUp() {
        const target = event.target;
        if (target.tagName === 'SPAN') {
            target.closest(".key").style.marginTop = "5px";
            target.closest(".key").style.boxShadow = "0px 2px 0px rgb(168, 76, 76)";
        }
        if (target.classList.value.indexOf('key') >= 0) {
            target.style.marginTop = "5px";
            target.style.boxShadow = "0px 2px 0px rgb(168, 76, 76)";
        }
    },

    _click() {
        // console.log(event.composedPath());
        const target = event.target;
        if (target.classList.value.indexOf('key') >= 0 || target.tagName === 'SPAN') {

            if (target.classList.value.indexOf('special') >= 0 || target.parentNode.classList.value.indexOf('special') >= 0) {
                const spanKeys = document.querySelectorAll('span');
                if (target.classList.value.indexOf('capsLook') >= 0 || target.parentNode.classList.value.indexOf('capsLook') >= 0) {
                    //not a function!!!???? typeError
                    Keyboard._toCapsLook();
                }
                if (target.classList.value.indexOf('Backspace') >= 0 || target.parentNode.classList.value.indexOf('Backspace') >= 0) {
                    Keyboard._toBackspace();
                }
                if (target.classList.value.indexOf('Ctrl') >= 0 || target.parentNode.classList.value.indexOf('Ctrl') >= 0) {
                    Keyboard._toCtrl();
                }
                if (target.classList.value.indexOf('Shift') >= 0 || target.parentNode.classList.value.indexOf('Shift') >= 0) {
                    Keyboard._toShift();
                }
                if (target.classList.value.indexOf('Enter') >= 0 || target.parentNode.classList.value.indexOf('Enter') >= 0) {
                    Keyboard.elements.textarea.value += '\n';
                }
                if (target.classList.value.indexOf('Space') >= 0 || target.parentNode.classList.value.indexOf('Space') >= 0) {
                    Keyboard.elements.textarea.value += '\u00A0';
                }
                if (target.classList.value.indexOf('Tab') >= 0 || target.parentNode.classList.value.indexOf('Tab') >= 0) {
                    Keyboard.elements.textarea.value += '\t\t';
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