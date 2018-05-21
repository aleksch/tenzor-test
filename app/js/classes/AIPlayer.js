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