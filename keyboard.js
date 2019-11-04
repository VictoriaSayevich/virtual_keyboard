const Keyboard = {
    elements: {
        keysContainer: null,
        keysRow: [],
        keys: []
    },

    content: {
        rows: [{
                eng: ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '+', 'Backspace'],
                ru: ['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '+', 'Backspace']
            },
            {
                eng: ['Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'sk', 'sk', 'spec'],
                ru: ['Tab', 'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', 'spec']
            },
            {
                eng: ['CapsLk', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', 'SP,', 'Enter'],
                ru: ['CapsLk', 'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э', 'SP,', 'Enter']
            },
            {
                eng: ['Sift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', 'Shift'],
                ru: ['Sift', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', '/', 'Shift']
            },
            {
                eng: ['Ctrl', 'Win', 'Alt', 'Space', 'Alt', '<', '<', '<'],
                ru: ['Ctrl', 'Win', 'Alt', 'Space', 'Alt', '<', '<', '<']
            }
        ]
    },

    _createElement(my_tag, my_class = '') {
        const element = document.createElement(my_tag);
        element.classList.add(my_class);
        return element;
    },

    _createKeyboard() {
        //Create CONTAINER for keyboard
        this.elements.keysContainer = this._createElement('div', 'keysContainer');

        document.querySelector('body').appendChild(this.elements.keysContainer);

        //Create ROWS
        // for (let i = 0; i < this.content.rows.length; i++) {
        //     const row = this._createElement('div', 'keysRow');
        //     this.elements.keysContainer.appendChild(row);
        // }

        //Create KEYS

        for (let i = 0; i < this.content.rows.length; i++) {
            const row = this._createElement('div', 'keysRow');
            this.elements.keysContainer.appendChild(row);
            for (let j = 0; j < this.content.rows[i].eng.length; j++) {
                const key = this._createElement('div', 'key');
                key.innerHTML = '<span>' + this.content.rows[i].eng[j] + '</span>';
                key.classList.add('eng');
                row.appendChild(key);
            }
        }

        // const rows = document.querySelectorAll('.keysRow');
        // rows.forEach(row => {
        //     for (let i = 0; i < rows.eng.length; i++) {
        //         const key = this._createElement('div', 'key');
        //         row.appendChild(key);
        //     }
        // });
    },


    _createKeys() {

        for (let i = 0; i < keyRowContent.rows.length; i++) {
            const rowContainer = [];
            let row = this._createElement('div', 'keysRow');
            rowContainer.push(row);
            keyRowContent.rows[i].eng.forEach(symbol => {
                const key = this._createElement('div', 'key');
                key.innerHTML = '<span>' + symbol + '</span>';
                key.classList.add('engl');
                rowContainer[i].appendChild(key);
            });
        }
        return rowContainer;
    }
}


window.addEventListener("DOMContentLoaded", function() {
    Keyboard._createKeyboard();
});