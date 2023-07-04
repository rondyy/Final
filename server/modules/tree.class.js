let random = require("./random");
const LivingCreature = require("./main.class");
module.exports = class Virus extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index)
        this.energy = 18;
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
            matrix[newY][newX] = 7;

            var vir = new Virus(newX, newY, 7);
            virusArr.push(vir);
            this.energy = 18;
        }
    }


    move() {

        var empty = random(this.chooseCell(0))
        this.energy--;
        if (empty) {
            var newX = empty[0]
            var newY = empty[1]
            matrix[newY][newX] = 7
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
        }
    }
    eat() {
        var food = random(this.chooseCell(2, 3, 4));
        if (food) {
            matrix[this.y][this.x] = 0;
            var newX = food[0];
            var newY = food[1];
            if (matrix[newY][newX] == 2) {
                for (var i in grassArr) {
                    if (newX == grassArr[i].x && newY == grassArr[i].y) {
                        grassArr.splice(i, 1);
                        break
                    }
                }
            } else if (matrix[newY][newX] == 3) {
                for (var i in grassEaterArr) {
                    if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                        grassEaterArr.splice(i, 1);
                        break
                    }

                }
            }

            else if (matrix[newY][newX] == 4) {
                for (var i in getArr) {
                    if (newX == getArr[i].x && newY == getArr[i].y) {
                        getArr.splice(i, 1);
                        break
                    }

                }
            }

            matrix[newY][newX] = 7;
            this.x = newX;
            this.y = newY;
            this.energy += 2
        }

    }

    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0
            for (var i in treeArr) {
                if (treeArr[i].x == this.x && treeArr[i].y == this.y) {
                    treeArr.splice(i, 1)
                    break;
                }
            }
        }
    }
}