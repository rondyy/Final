let random = require("./random");
const LivingCreature = require("./main.class");
module.exports = class Virus extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index)
        this.energy = 15;
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
    chooseCell(char1, char2, char3) {
        this.getNewCoordinates()
        return super.chooseCell(char1, char2, char3)
    }
    mul() {
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);
        if (newCell && this.energy >= 20) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 4;

            var vir = new Virus(newX, newY, 4);
            virusArr.push(vir);
            this.energy = 15;
        }
    }


    move() {

        var empty = random(this.chooseCell(0))
        this.energy--;
        if (empty) {
            var newX = empty[0]
            var newY = empty[1]
            matrix[newY][newX] = 4
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
        }
    }
    eat() {
        var food = random(this.chooseCell(1, 2, 5));
        if (food) {
            matrix[this.y][this.x] = 0;
            var newX = food[0];
            var newY = food[1];
            if (matrix[newY][newX] == 1) {
                for (var i in grassArr) {
                    if (newX == grassArr[i].x && newY == grassArr[i].y) {
                        grassArr.splice(i, 1);
                        break
                    }
                }
            } else if (matrix[newY][newX] == 2) {
                for (var i in grassEaterArr) {
                    if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                        grassEaterArr.splice(i, 1);
                        break
                    }

                }
            }

            else if (matrix[newY][newX] == 5) {
                for (var i in getArr) {
                    if (newX == getArr[i].x && newY == getArr[i].y) {
                        getArr.splice(i, 1);
                        break
                    }

                }
            }

            matrix[newY][newX] = 4;
            this.x = newX;
            this.y = newY;
            this.energy += 2
        }

    }

    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0
            for (var i in virusArr) {
                if (virusArr[i].x == this.x && virusArr[i].y == this.y) {
                    virusArr.splice(i, 1)
                    break;
                }
            }
        }
    }
}