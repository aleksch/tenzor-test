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
