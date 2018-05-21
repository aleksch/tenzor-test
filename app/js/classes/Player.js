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

class AIPlayer extends Player {
    constructor(name, container) {
        super(name, container, false);
        this.battleground.render(false);
        this.idName = 'ai';
        // будем запоминать куда среляли
        this.enemyBattleground = new Array(10).fill(0).map(e => e = new Array(10).fill(0));
        console.log(this.enemyBattleground);
    }

    makeHit(enemy) {
        let cords = this.generateShootCords();
        enemy.checkHit(...cords);
    }
    // неуспеваю написать норм ии(( сейчас стреляет рандомно и генерирует новые координаты если уже стрелял по старым
    // todo 
    // если делать нормалный ии, то можно сохранять не только куда стерлял но информацию о убитых/неубитых короблях
    // обстреливать недобитые, запрвещать обстреливать убитые
    generateShootCords() {
        let randomInteger = (min, max) => {
            let rand = min - 0.5 + Math.random() * (max - min + 1);
            return Math.round(rand);
        }
        let x = Number(randomInteger(0, 9));
        let y = Number(randomInteger(0, 9));
        let arr = [x, y];
        if (this.enemyBattleground[y][x] === 1) {
            arr = this.generateShootCords();
        } else {
            this.enemyBattleground[y][x] = 1;
        }

        return arr;
    }
}

class HumanPlayer extends Player {
    constructor(name, container) {
        super(name, container, false);
        this.battleground.render(true);
        this.idName = 'human';
    }
}