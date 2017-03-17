module.exports = navigator;

function navigator(map)
{
    this.map = map;
    this.moves = [
        "RIGHT\n",
        "LEFT\n",
        "DOWN\n",
        "UP\n"
    ];
}

/**
 * Find the closest pellet
 * @param position
 * @returns {{x: number, y: number, distance: number}}
 */
navigator.prototype.findClosestPellet = function(position)
{
    var closest = {
        x: 0,
        y: 0,
        distance: 1000
    };

    for (var y = 0; y < this.map.length; y++) {
        for (var x = 0; x < this.map[y].length; x++) {
            if (this.map[y][x] == 50 || this.map[y][x] == 100) {
                var dist = this.lineDistance(position, {x:x, y:y});
                if (dist < closest.distance) {
                    closest.x = x;
                    closest.y = y;
                    closest.distance = dist;
                }
            }
        }
    }

    return closest;
}

navigator.prototype.findClosestPlayer = function(position, players)
{
    var closest = {
        x: 0,
        y: 0,
        isDangerous: false,
        distance: 1000
    };

    for (var i = 0; i < players.length; i++) {
        var p = players[i];
        var dist = this.lineDistance(position, p);
        if (dist < closest.distance) {
            closest.x = p.x;
            closest.y = p.y;
            closest.isDangerous = p.isdangerous;
            closest.distance = dist;
        }
    }

    return closest;
}

/**
 * Calculates the direction of a given move using A*
 */
navigator.prototype.move = function(path, num)
{
    if (path.length == 0)
    {
        return false;
    }

    var p = path[num];

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
 * Returns the distance from one {x: x, y: y} to another.
 */
navigator.prototype.lineDistance = function(point1, point2)
{
    var xs = 0;
    var ys = 0;

    xs = point2.x - point1.x;
    xs = xs * xs;

    ys = point2.y - point1.y;
    ys = ys * ys;

    return Math.sqrt(xs + ys);
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