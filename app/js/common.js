class GameController {
    constructor(player, AIPlayer) {
        // 0 - "начало игры"
        // 1 - "старт"
        // 2 - "победа первого игрока"
        // 3 - "победа второго игрока"
        this.gameState = 0;
        this.player = player;
        this.AIPlayer = AIPlayer;
    }

    start() {
        this.gameState = 1;
        $('#log').show();
        this.player.log('Вы начинаете, выберите вражескуе клетку');
        let controller = this;
        this.AIPlayer.containerElement.find('td').click(function (e) {
            let x = Number(e.target.dataset.x);
            let y = Number(e.target.dataset.y);
            if (controller.AIPlayer.checkHitCords(x, y)) {
                controller.player.log('Вы уже сюда стреляли!');
            } else {
                controller.AIPlayer.checkHit(x, y);
                controller.AIPlayer.makeHit(controller.player);
            }
            if (controller.player.hitCounter === 20 | controller.AIPlayer.hitCounter === 20) {
                controller.finishGame();
            } else {

            }
        });
    }

    finishGame() {
        let winerName = ''
        if (this.player.hitCounter >= 20) {
            this.gameState = 3;
            winerName = '<p class="sad">Поражение!</p>';
        } else if (this.AIPlayer.hitCounter >= 20) {
            this.gameState = 2;
            winerName = '<p class="nice">Победа!</p>';
        }
        $('.battlerground-wrapper').hide();
        $('#log').css('margin', '0');
        $('.victory').html(winerName);
    }
}

$(document).ready(function () {
    $('#log').hide();
    $('.battlerground-wrapper').hide();
    let containerName = $('.name-input-container');
    let button = $('#name-button');
    let inputName = $('#name-input');
    button.click(function () {
        if (inputName.val().trim() !== '') {
            containerName.hide();
            const player = new HumanPlayer(inputName.val(), $('#battleground1'));
            const aIPlayer = new AIPlayer('Компьютер', $('#battleground2'));
            const gameController = new GameController(player, aIPlayer);
            gameController.start();
            $('.battlerground-wrapper').show();
        }
    })
});
