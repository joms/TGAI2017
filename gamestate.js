var parser = require('./parser.js');
require('./astar.js');
var Navigator = require('./navigation.js');

function gameState(socket)
{
    // Initial variables
    this.socket = socket;
    this.state = {};
    this.map = [];
    this.me = {
        id: 0,
        x: 0,
        y: 0,
        score: 0,
        isDangerous: true
    };
    this.pellets = 0;
}

/**
 * Receive data from server, and start doing stuff
 */
gameState.prototype.update = function(data)
{
    switch (data.messagetype) {
        case 'welcome':
            this.state = data;
            this.map = parser.ParseMap(this.state.map.content);
            this.me.id = this.state.you.id;
            this.me.x = this.state.you.x;
            this.me.y = this.state.you.y;
            this.pellets = this.state.map.pelletsleft;
            break;

        case 'dead':
            console.log("I ded...");
            break;

        case 'startofround':
            console.log("LET'S DO THIS!!!!");
            break;

        case 'endofround':
            console.log("Round is over - nothing more to do");
            break;

        case 'stateupdate':
            this.state = data.gamestate;
            this.me.x = this.state.you.x;
            this.me.y = this.state.you.y;
            this.me.score = this.state.you.score;
            this.me.isDangerous = this.state.you.isdangerous;
            this.pellets = this.state.map.pelletsleft;

            this.map = parser.ParseMap(this.state.map.content);
            this.findMove();
            break;
    }
}

/**
 * Find a move and execute it
 */
gameState.prototype.findMove = function() {
    // Basic A* functionality
    var graph = new Graph(this.map);
    var start = graph.nodes[this.me.y][this.me.x];
    var end = graph.nodes[4][1];
    var result = astar.search(graph.nodes, start, end);

    var navigator = new Navigator(result, this.map);
    // var move = navigator.randomMove(); // This is where you would use A* (astar.js)
    this.sendToServer(navigator.move(0));
}

/**
 * Send input to server
 */
gameState.prototype.sendToServer = function(input)
{
    if (typeof input === "string") {
        this.socket.write(input);
        console.log("Sent command to server: "+ input);
    } else {
        console.log("Not sending command to server: Not a string");
    }
}

module.exports = gameState;