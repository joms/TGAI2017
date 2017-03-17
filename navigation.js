module.exports = navigator;

function navigator(path, map)
{
    this.path = path;
    this.map = map;
    this.moves = [
        "RIGHT\n",
        "LEFT\n",
        "DOWN\n",
        "UP\n"
    ];
}

/**
 * Calculates the direction of a given move
 */
navigator.prototype.move = function(num)
{
    var p = this.path[num];

    var move;

    if (p.y == p.parent.y) // Vertical move
    {
        if (p.x - 1 == p.parent.x)
        {
            move = 2; // Down
        } else {
            move = 3; // Up
        }
    } else { // Horizontal move
        if (p.y - 1 == p.parent.y)
        {
            move = 0; // right
        } else {
            move = 1; // left
        }
    }

    return this.moves[move];
}

/**
 * Gives you a random direction to move in
 */
navigator.prototype.RandomMove = function()
{
    return this.moves[Math.floor(Math.random()* 4)];
}

/**
 * Returns what the next tile is
 */
navigator.prototype.NextTile = function(num)
{
    var p = this.path[num];
    var m = this.map[p.x][p.y];
    if (m==999){
        return "GRASS"
    }

    if (m>0 && m<100){
        return "GRASS"
    }
    if (m == 100) {
        return "ROCK"
    };
    if (m == 0) {
        return "WALL"
    }
}

/**
 * Gives you the opposite direction of a move. Useful if you have to turn
 * around to where you came from
 */
navigator.prototype.Opposite = function(move)
{
    var moves = [
        "RIGHT\n",
        "LEFT\n",
        "DOWN\n",
        "UP\n"
    ];

    switch(move)
    {
        case "RIGHT\n":
            return this.moves[1];
        case "LEFT\n":
            return this.moves[0];
        case "DOWN\n":
            return this.moves[3];
        case "UP\n":
            return this.moves[2];
    }
}

/**
 * Sets a coordinate in the map to whatever you feel like
 */
navigator.prototype.update = function(x, y, i)
{
    this.map[x][y] = i;
}
