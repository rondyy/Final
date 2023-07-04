let random = require("./random");
const LivingCreature = require("./main.class");
module.exports = class GrassEater extends LivingCreature {
    constructor(x, y, index, isFemale) {
        super(x, y, index);
        this.energy = 8;
        this.isFemale = isFemale
    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character);
    }



    mul() {
        var empty = random(this.chooseCell(0))
        if (empty && this.energy > 13) {
            var newX = empty[0]
            var newY = empty[1]
            matrix[newY][newX] = 2
            var xt = new GrassEater(newX, newY, 2, !this.isFemale)
            grassEaterArr.push(xt)
            
            if(this.isFemale){
                this.energy = 8
            }

            else {
                this.energy = 12
            }
        }
    }

    move() {
        var emp = random(this.chooseCell(0))
        if (emp) {
            matrix[this.y][this.x] = 0
            var newX = emp[0]
            var newY = emp[1]
            matrix[newY][newX] = 2
            this.x = newX
            this.y = newY
        }
        this.energy -= 2
    }

    eat() {
        var food = random(this.chooseCell(1))
        if (food) {
            matrix[this.y][this.x] = 0
            var newX = food[0]
            var newY = food[1]
            matrix[newY][newX] = 2
            this.x = newX
            this.y = newY
            for (var i in grassArr) {
                if (grassArr[i].x == newX && grassArr[i].y == newY) {
                    grassArr.splice(i, 1)
                }
            }
            this.energy += 4
        }
    }
    die() {
        if (this.energy == 0 && this.isFemale)  {
            for (var i in grassEaterArr) {
                if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    matrix[this.y][this.x] = 0
                    break;
                }
            }

        }
    }
}
