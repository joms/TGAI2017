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
 * Calculates the direction of a given move using A*
 */
navigator.prototype.move = function(num)
{
    if (this.path.length == 0)
    {
        return false;
    }

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
navigator.prototype.randomMove = function()
{
    return this.moves[Math.floor(Math.random()* 4)];
}

/**
 * Gives you the opposite direction of a move. Useful if you have to turn
 * around to where you came from
 */
navigator.prototype.Opposite = function(move)
{
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