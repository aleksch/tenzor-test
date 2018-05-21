class Player {
    constructor(name, container, renderBG) {
        this.name = name;
        this.containerElement = container;
        // двумерный массив чисел
        // возможные значения 
        // 0 - "пусто"
        // 1 - "целый корабль"
        // 2 - "рядом корабль" (используется только при растановке кораблей)
        // 3 - "раненая часть корабля"
        // 4 - "убитая часть корабля"
        // 5 - "мимо"
        this.battleground = new Battleground(container);
        // счётчик попаданий когда будет равен 20 (сумме блоков всех караблей) тогда игра закончится
        this.hitCounter = 0;
        // массив который будет содержать координаты выстрелов (для проверки на повторяемость)
        this.hiteCoords = [];
        // проверияет есть ли в массие таке координаты или нет
        this.checkHitCords = (x, y) => {
            return this.hiteCoords.some(cords => cords[0] === x & cords[1] === y);
        }
    }

    checkHit(x, y) {
        this.hiteCoords.push([x, y])
        let value = this.battleground.battleground[y][x];
        this.renderCell(x, y, value);
        let res = '<span class="sad">промазали</span>';
        if (value === 1) {
            res = '<span class="nice">попали</span>';
            this.hitCounter += 1;
        }
        let sybolArray = ['а', 'б', 'в', 'г', 'д', 'е', 'ж', 'з', 'и', 'к'].map( e => e.toUpperCase())
        this.log(`По игроку ${this.name} стреляли в [${sybolArray[x]}:${y + 1}] и ${res}.`)
    }

    log(message) {
        let log = $('#log');
        log.append(`<p class="message">${message}</p>`);
        log.scrollTop(log[0].scrollHeight);
    }

    renderCell(x, y, value) {
        let cell = $(`#${this.idName + x + y}`);
        let chooseClass = (v) => {
            switch (v) {
                case 0:
                    return 'miss';
                    break;
                case 1:
                    return 'hit';
                    break;
                default:
                    return 'miss';
                    break;
            }
        }
        cell.addClass(chooseClass(value));
    }
}
