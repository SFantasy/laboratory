(function() {
    var snake = {
        body: [],
        /*  0 => left,
         *  1 => top,
         *  2 => right,
         *  3 => bottom
         */
        direction: 0,
        
        init: function() {
            // initialize the direction of the snake
            this.direction = Math.floor(Math.random() * 4);
        }
    };

    // catch the event
    window.onkeydown = function(e) {
        switch(e.keyCode) {
            case 37: break;
            case 38: break;
            case 39: break;
            case 40: break;
        }
    };
})();