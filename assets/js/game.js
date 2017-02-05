var snake, apple, squareSize, score1, score2,
    updateDelay, direction,direction2, new_direction,
    addNew, cursors, scoreTextValue, speedTextValue, textStyle_Key, textStyle_Value, i,xprev,yprev,xprev2,yprev2,bluewins,pinkwins;

var Game = {

    preload : function() {
        // Here we load all the needed resources for the level.
        // In our case, that's just two squares - one for the snake body and one for the apple.
        game.load.image('snake', './assets/images/snake.png');
        game.load.image('snake2', './assets/images/apple.png');
    },

    create : function() {

        // By setting up global variables in the create function, we initialise them on game start.
        // We need them to be globally available so that the update function can alter them.
        bluewins = 0;
        pinkwins = 0;
        i = 1;
        k = 1;
        snake = []; 
        snake2 = [];                    // This will work as a stack, containing the parts of our snake                     
        squareSize = 15;                // The length of a side of the squares. Our image is 15x15 pixels.
        score = 0;                      // Game score.
        speed = 0;                      // Game speed.
        updateDelay = 0;                // A variable for control over update rates.
        direction = 'right';            // The direction of our snake.
        direction2 = 'left';
        new_direction = null;           // A buffer to store the new direction into.              
        new_direction2 = null;

        // Set up a Phaser controller for keyboard input.
        cursors = game.input.keyboard.createCursorKeys();

        //cursors2 = game.input.keyboard.createCursorKeys();

        game.stage.backgroundColor = '#061f27';

        // Generate the initial snake stack. Our snake will be 10 elements long.
        
        snake[0] = game.add.sprite(-15+squareSize, 435, 'snake');  // Parameters are (X coordinate, Y coordinate, image)
        snake2[0] = game.add.sprite(585+squareSize, 0, 'snake2');


        

        // Add Text to top of game.
        textStyle_Key = { font: "bold 14px sans-serif", fill: "#46c0f9", align: "center" };
        textStyle_Value = { font: "bold 18px sans-serif", fill: "#fff", align: "center" };

        // // Score.
        // game.add.text(30, 20, "BLUE SCORE", textStyle_Key);
        // scoreTextValue = game.add.text(90, 18, score.toString(), textStyle_Value);
        // // Speed.
        // game.add.text(500, 20, "PINK SCORE", textStyle_Key);
        // speedTextValue = game.add.text(558, 18, speed.toString(), textStyle_Value);


        //this.cursors = XV.game.input.keyboard.createCursorKeys();

        
          game.input.keyboard.addKey(Phaser.Keyboard.W)
          game.input.keyboard.addKey(Phaser.Keyboard.S)
          game.input.keyboard.addKey(Phaser.Keyboard.A)
          game.input.keyboard.addKey(Phaser.Keyboard.D)
        
    },

    //COLLISION TESTING
    selfCollision: function() {
        if(snake[0] != null && snake[1]!= null){
        // Check if the head of the snake overlaps with any part of the snake.
        for(var j = 1; j < snake.length - 1; j++){
            if(snake[0].x == snake[j].x && snake[0].y == snake[j].y){
                console.log("Self collision detected!");
                // If so, go to game over screen.
                game.state.start('Game_Over');
            }
        }
        }

    },

    selfCollision2: function(){
        if(snake2[0] != null && snake2[1]!= null){
        // Check if the head of the snake overlaps with any part of the snake.
        for(var z = 1; z < snake2.length - 1; z++){
            if(snake2[0].x == snake2[z].x && snake2[0].y == snake2[z].y){
                console.log("Self collision detected - snake 2!");
                // If so, go to game over screen.
                bluewins = 1;
                game.state.start('Game_Over');
            }
        }
        }
    },

    wallCollision: function() {

        // Check if the head of the snake is in the boundaries of the game field.

        if(snake[0].x >= 600 || snake[0].x < 0 || snake[0].y >= 450 || snake[0].y < 0){

            // If it's not in, we've hit a wall. Go to game over screen.
            game.state.start('Game_Over');
        }

        if(snake2[0].x >= 600 || snake2[0].x < 0 || snake2[0].y >= 450 || snake2[0].y < 0){
            bluewins = 1;
            // If it's not in, we've hit a wall. Go to game over screen.
            game.state.start('Game_Over');
        }


    },

    enemyCollision: function() {
        for(var w = 1; w < snake2.length; w++){
            if(snake[0].x == snake2[w].x && snake[0].y == snake2[w].y){
                pinkwins = 1;
                game.state.start('Game_Over');
            }
        }
        for(var v = 1; v < snake.length; v++){
            if(snake2[0].x == snake[v].x && snake2[0].y == snake[v].y){
                bluewins = 1;
                game.state.start('Game_Over');
            }
        }

    },


    //COLLISION END
    update: function() {

    // Handle arrow key presses, while not allowing illegal direction changes that will kill the player.
    if (cursors.right.isDown && direction!='left')
    {
        new_direction = 'right';
    }
    else if (cursors.left.isDown && direction!='right')
    {
        new_direction = 'left';
    }
    else if (cursors.up.isDown && direction!='down')
    {
        new_direction = 'up';
    }
    else if (cursors.down.isDown && direction!='up')
    {
        new_direction = 'down';
    }

    if (game.input.keyboard.isDown(Phaser.Keyboard.D) && direction2!='left')
    {
        new_direction2 = 'right';
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.A) && direction2!='right')
    {
        new_direction2 = 'left';
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.W) && direction2!='down')
    {
        new_direction2 = 'up';
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.S) && direction2!='up')
    {
        new_direction2 = 'down';
    }

    //Update counter to count up every frame
    updateDelay++;



    //if update delay counts 10, enter if
    if(updateDelay % 5 == 0){

        
        score++;
        xprev = snake[0].x;
        yprev = snake[0].y;

        xprev2 = snake2[0].x;
        yprev2 = snake2[0].y;


        if(new_direction){
            direction = new_direction;
            new_direction = null;
        }
        if(new_direction2){
            direction2 = new_direction2;
            new_direction2 = null;
        }

        snake[i] = game.add.sprite(xprev,yprev, 'snake');  // Parameters are (X coordinate, Y coordinate, image)
        snake2[k] = game.add.sprite(xprev2,yprev2, 'snake2');
        
        if(direction == 'right'){
            snake[0].x = snake[0].x + 15;
        }
        else if(direction == 'left'){
            snake[0].x = snake[0].x - 15;
        }
        else if(direction == 'up'){
            snake[0].y = snake[0].y - 15;
        }
        else if(direction == 'down'){
            snake[0].y = snake[0].y + 15;
        }

        if(direction2 == 'right'){
            snake2[0].x = snake2[0].x + 15;
        }
        else if(direction2 == 'left'){
            snake2[0].x = snake2[0].x - 15;
        }
        else if(direction2 == 'up'){
            snake2[0].y = snake2[0].y - 15;
        }
        else if(direction2 == 'down'){
            snake2[0].y = snake2[0].y + 15;
        }

        //check for self collision
        this.selfCollision();
        this.selfCollision2();
        //check for wall collision
        this.wallCollision();
      
        //enemy collision
        this.enemyCollision();
        
        i++;
        k++;

        
    }
    
              

    
}
};