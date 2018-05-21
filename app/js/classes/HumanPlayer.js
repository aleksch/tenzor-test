class HumanPlayer extends Player {
    constructor(name, container) {
        super(name, container, false);
        this.battleground.render(true);
        this.idName = 'human';
    }
}