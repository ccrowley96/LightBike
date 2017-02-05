var Game_Over = {

    preload : function() {
        // Here we load all the needed resources for the level.
        // In our case, that's just two squares - one for the snake body and one for the apple.
        game.load.image('gameover', './assets/images/gameover.png');
    },

    create : function() {

        // Create button to start game similar to the main menu.
        this.add.button(0, 0, 'gameover', this.startGame, this);

        // Last Score Info.
        if(bluewins == 1){
        game.add.text(235, 350, "Blue Wins!!", { font: "bold 30px sans-serif", fill: "#3399ff", align: "center"});
        }
        else{
        game.add.text(235, 350, "Pink Wins!!", { font: "bold 30px sans-serif", fill: "#ff33cc", align: "center"});
        }
    },

    startGame: function () {

        // Change the state to the actual game.
        this.state.start('Game');

    }

 };