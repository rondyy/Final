let random = require("./random");
const LivingCreature = require("./main.class");
module.exports = class Predator extends LivingCreature {
    constructor(x, y, index,isFemale) {
        super(x, y, index)
        this.energy = 9;
     
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
        this.getNewCoordinates()
        return super.chooseCell(character)
    }
    mul() {
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);
        if (newCell && this.energy >= 15) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 3;

            var newPredator = new Predator(newX, newY, 3, !this.isFemale);
            predatorArr.push(newPredator);
            

            if(this.isFemale){
                this.energy = 12
            }

            else {
                this.energy = 9
            }
        }
    }


    move() {

        var empty = random(this.chooseCell(0))
        this.energy--;
        if (empty) {
            var newX = empty[0]
            var newY = empty[1]
            matrix[newY][newX] = 3
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
        }
    }
    eat() {
        var food = random(this.chooseCell(2));
        if (food) {
            matrix[this.y][this.x] = 0;

            var newX = food[0];
            var newY = food[1];
            matrix[newY][newX] = 3;

            this.x = newX;
            this.y = newY;

            for (var i in grassEaterArr) {
                if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    break
                }

            }
            this.energy += 2;
        }



    }

    die() {
        if (this.energy <= 0 && !this.isFemale) {
            matrix[this.y][this.x] = 0
            for (var i in predatorArr) {
                if (predatorArr[i].x == this.x && predatorArr[i].y == this.y) {
                    predatorArr.splice(i, 1)
                    break;
                }
            }
        }
    }
}
