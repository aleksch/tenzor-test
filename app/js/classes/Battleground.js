class Battleground {
    constructor(containerElement) {
        this.containerElement = containerElement;
        this.battleground = new Array(10).fill(0).map(e => e = new Array(10).fill(0));
        this.initBattleships();
    }
    initBattleships() {
        this.arrangeShip(4);
        this.arrangeShip(3);
        this.arrangeShip(3);
        this.arrangeShip(2);
        this.arrangeShip(2);
        this.arrangeShip(2);
        this.arrangeShip(1);
        this.arrangeShip(1);
        this.arrangeShip(1);
        this.arrangeShip(1);
    }

    arrangeShip(shipSize) {
        let randomInteger = (min, max) => {
            let rand = min - 0.5 + Math.random() * (max - min + 1);
            return Math.round(rand);
        }
        let isHorisontal = Boolean(randomInteger(0, 1));

        let xCoord = randomInteger(0, 10 - shipSize);
        let yCoord = randomInteger(0, 10 - shipSize);

        let getArr = (size, val) => new Array(size).fill(val);
        let an = [];
        let isEmpty = (arr) => arr.every(e => e === 0 && e !== 2);

        // много некрасивых проверок на невыход из массиа
        // todo переделать
        if (isHorisontal) {
            an = this.battleground[yCoord].slice(xCoord, xCoord + shipSize);
            if (isEmpty(an)) {
                this.battleground[yCoord].splice(xCoord, shipSize, ...getArr(shipSize, 1));
                (yCoord - 1 >= 0) ? this.battleground[yCoord - 1].splice(xCoord, shipSize, ...getArr(shipSize, 2)) : NaN;
                (yCoord + 1 <= 9) ? this.battleground[yCoord + 1].splice(xCoord, shipSize, ...getArr(shipSize, 2)) : NaN;
                if (xCoord - 1 >= 0 && yCoord - 1 >= 0) {
                    this.battleground[yCoord - 1][xCoord - 1] = 2;
                    this.battleground[yCoord][xCoord - 1] = 2;
                }
                if (xCoord + shipSize <= 9 && yCoord - 1 >= 0) {
                    this.battleground[yCoord - 1][xCoord + shipSize] = 2;
                    this.battleground[yCoord][xCoord + shipSize] = 2;
                }

                if (xCoord - 1 >= 0 && yCoord + 1 <= 9) {
                    this.battleground[yCoord + 1][xCoord - 1] = 2;
                    this.battleground[yCoord][xCoord - 1] = 2;
                }
                if (xCoord + shipSize <= 9 && yCoord + 1 <= 9) {
                    this.battleground[yCoord + 1][xCoord + shipSize] = 2;
                    this.battleground[yCoord][xCoord + shipSize] = 2;
                }

            } else {
                this.arrangeShip(shipSize);
            }
        } else {
            for (let y = yCoord; y < yCoord + shipSize; y++) {
                an.push(this.battleground[y][xCoord]);
            }
            if (isEmpty(an)) {
                for (let y = yCoord; y < yCoord + shipSize; y++) {
                    this.battleground[y][xCoord] = 1;
                    if (xCoord - 1 >= 0) {
                        this.battleground[y][xCoord - 1] = 2;
                    }
                    if (xCoord + 1 <= 9) {
                        this.battleground[y][xCoord + 1] = 2;
                    }
                }
                if (yCoord - 1 >= 0) {
                    this.battleground[yCoord - 1][xCoord] = 2;
                }
                if (yCoord - 1 >= 0 && xCoord - 1 >= 0) {
                    this.battleground[yCoord - 1][xCoord - 1] = 2;
                }
                if (yCoord - 1 >= 0 && xCoord + 1 <= 9) {
                    this.battleground[yCoord - 1][xCoord + 1] = 2;
                }
                if (yCoord + shipSize <= 9 && xCoord - 1 >= 0) {
                    this.battleground[yCoord + shipSize][xCoord - 1] = 2;
                }
                if (yCoord + shipSize <= 9 && xCoord + 1 <= 9) {
                    this.battleground[yCoord + shipSize][xCoord + 1] = 2;
                }
                if (yCoord + shipSize <= 9) {
                    this.battleground[yCoord + shipSize][xCoord] = 2;
                }
            } else {
                this.arrangeShip(shipSize);
            }
        }
    }

    render(isShow) {
        let chooseClass = (value) => {
            if (!isShow) {
                return 'unknow';
            }
            switch (value) {
                case 0:
                    return 'empty';
                    break;
                case 1:
                    return 'ship';
                    break;
                default:
                    return 'empty';
                    break;
            }
        }
        let idName = isShow ? 'human' : 'ai';
        let html = '';
        for (var y = 0; y < 10; y++) {
            html += '<tr>'
            for (var x = 0; x < 10; x++) {
                let className = chooseClass(this.battleground[y][x]);
                html += `<td id="${idName + x + y}" class="${className}" data-x=${x} data-y=${y}></td>`;
            }
            html += '</tr>';
        }
        this.containerElement.html(`<table><tbody>${html}</tbody></table>`)
    }
}