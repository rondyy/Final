
var express = require("express");
var fs = require("fs");
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(express.static("../client"));
app.get("/", function (req, res) {
    res.redirect("index.html");
});
server.listen(5000, function () {
    console.log("App is running on port 5000");
});
grassArr = [];
grassEaterArr = [];
predatorArr = [];
virusArr = [];
getArr = [];
humanArr = [];
treeArr = [];

Grass = require("./modules/grass.class")
GrassEater = require("./modules/grasseater.class")
Predator = require("./modules/predator.class")
Get = require("./modules/get.class")
Virus = require("./modules/virus.class")
Main = require("./modules/main.class")
random = require("./modules/random");
Human = require("./modules/human.class")

multForGrass = 8
multForGrassEater = 13
multForGet = 10
multForHuman = 15
multForPredator = 12
multForVirus = 16
multForTree = 20
io.on("connection", function (socket) {
    socket.on("afterClick", function (data) {
        multForGrass = data.multForGrass
        multForGrassEater = data.multForGrassEater
        multForGet = data.multForGet
        multForHuman = data.multForHuman
        multForPredator = data.multForPredator
        multForVirus = data.multForVirus
    });

    setInterval(drawForBackend, 5000);
});

matrix = [
    [0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1,],
    [0, 0, 1, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 2, 0,],
    [0, 2, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 2, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0,],
    [0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 2, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 2, 0, 1, 0, 0,],
    [0, 0, 1, 0, 0, 1, 0, 2, 0, 0, 3, 4, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 2, 0, 0, 0, 0, 1, 0, 0,],
    [0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1,],
    [0, 0, 1, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 2, 0, 0, 1, 2, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 2, 0,],
    [0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 7, 7, 0, 0, 0, 1, 1, 0, 2, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0,],
    [0, 0, 1, 0, 0, 0, 0, 3, 1, 4, 2, 0, 1, 0, 7, 7, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 2, 0, 1, 0, 0,],
    [1, 1, 0, 0, 0, 1, 1, 2, 0, 5, 0, 5, 1, 0, 7, 0, 0, 1, 0, 3, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 2, 0, 3, 3, 3, 1, 1, 0,],
    [0, 0, 0, 0, 1, 0, 0, 1, 1, 5, 5, 0, 1, 7, 1, 0, 0, 1, 0, 0, 0, 1, 2, 0, 0, 0, 0, 3, 1, 0, 1, 1, 0, 1, 0, 3, 1, 0, 1,],
    [0, 0, 1, 0, 0, 3, 1, 1, 0, 1, 0, 0, 0, 2, 0, 3, 0, 2, 0, 0, 0, 0, 1, 0, 0, 4, 1, 2, 0, 1, 1, 1, 0, 1, 0, 0, 0, 2, 0,],
    [1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 5, 4, 1, 0, 4, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 2, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0,],
    [0, 0, 1, 0, 0, 0, 0, 3, 1, 0, 2, 4, 1, 4, 0, 2, 2, 4, 1, 1, 7, 6, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 2, 0, 1, 0, 0,],
    [2, 1, 0, 0, 0, 1, 0, 2, 6, 6, 0, 6, 1, 0, 4, 2, 2, 4, 2, 0, 7, 0, 0, 0, 0, 0, 0, 0, 1, 0, 2, 0, 0, 0, 0, 1, 0, 0, 0,],
    [0, 0, 0, 0, 1, 0, 0, 1, 6, 6, 0, 0, 1, 4, 1, 2, 2, 3, 0, 0, 7, 7, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1,],
    [0, 0, 1, 0, 0, 0, 1, 1, 6, 1, 0, 0, 0, 2, 0, 4, 0, 2, 0, 1, 7, 7, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 2, 0,],
    [0, 0, 2, 0, 1, 0, 0, 1, 0, 0, , 0, 0, 1, 5, 5, 4, 5, 0, 0, 1, 7, 1, 0, 0, 0, 1, 2, 2, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0,],
    [1, 0, 1, 2, 2, 0, 0, 0, 1, 0, 2, 0, 1, 0, 0, 5, 5, 1, 1, 1, 0, 0, 2, 0, 0, 0, 1, 0, 1, 0, 0, 1, 1, 0, 2, 0, 1, 0, 0,],
    [0, 0, 3, 0, 3, 1, 0, 2, 0, 3, 0, 0, 1, 0, 0, 6, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 2, 3, 2, 1, 0, 2, 0, 0, 0, 0, 1, 0, 0,],
    [0, 1, 3, 5, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1,],
    [0, 0, 1, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 2, 0, 0, 0, 2, 0, 6, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 2, 0,],
    [0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0,],
    [2, 0, 1, 0, 0, 0, 0, 0, 1, 0, 2, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 2, 0, 1, 0, 0,],
    [1, 0, 0, 0, 0, 1, 0, 2, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 2, 0, 0, 0, 0, 1, 0, 0,],
    
];
var isFemale = true
function createObjects() {
    for (var y = 0; y < matrix.length; ++y) {
        for (var x = 0; x < matrix[y].length; ++x) {
            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y, 1);
                grassArr.push(gr);
            }
            else if (matrix[y][x] == 2) {
                isFemale = !isFemale
                var grEater = new GrassEater(x, y, 2)
                grassEaterArr.push(grEater)
            }
            else if (matrix[y][x] == 3) {
                isFemale = !isFemale
                var grPredator = new Predator(x, y, 3)
                predatorArr.push(grPredator)
            }

            else if (matrix[y][x] == 4) {
                var grVirus = new Virus(x, y, 4)
                virusArr.push(grVirus)
            }

            else if (matrix[y][x] == 5) {
                var grGet = new Get(x, y, 5)
                getArr.push(grGet)
            }
            else if (matrix[y][x] == 6) {
                var grHuman = new Human(x, y, 6)
                humanArr.push(grHuman)
            }

            else if (matrix[y][x] == 7) {
                var grTree = new Tree(x, y, 6)
                treeArr.push(grTree)
            }

        }
    }
}

createObjects()

function drawForBackend() {
    for (var i in grassArr) {
        grassArr[i].mul(multForGrass)
    }

    for (var i in grassEaterArr) {
        grassEaterArr[i].mul(multForGrassEater)
        grassEaterArr[i].move()
        grassEaterArr[i].eat()
        grassEaterArr[i].die()
    }

    for (var i in predatorArr) {
        predatorArr[i].mul(multForPredator)
        predatorArr[i].move()
        predatorArr[i].eat()
        predatorArr[i].die()
    }

    for (var i in virusArr) {
        virusArr[i].mul(multForVirus)
        virusArr[i].move()
        virusArr[i].eat()
        virusArr[i].die()
    }

    for (var i in getArr) {
        getArr[i].mul(multForGet)

    }

    for (var i in humanArr) {
        humanArr[i].mul(multForHuman)
        humanArr[i].move()
        humanArr[i].eat()
        humanArr[i].die()
    }
    for (var i in treeArr) {
        treeArr[i].mul(multForTree)
        treeArr[i].move()
        treeArr[i].eat()
        treeArr[i].die()
    }
    if (grassArr.length == 0) {
        for (var i = 0; i < 40; i++) {
            var x = Math.floor(random(matrix[0].length - 1))
            var y = Math.floor(random(matrix.length - 1))
            matrix[y][x] = 1;
            var gr = new Grass(x, y, 1)
            grassArr.push(gr)
        }
    }
    if (grassEaterArr.length == 0) {
        for (var i = 0; i < 40; i++) {
            var x = Math.floor(random(matrix[0].length - 1))
            var y = Math.floor(random(matrix.length - 1))
            matrix[y][x] = 2;
            var gr = new GrassEater(x, y, 2)
            grassEaterArr.push(gr)
        }
    }


    if (predatorArr.length == 0) {
        for (var i = 0; i < 10; i++) {
            var x = Math.floor(random(matrix[0].length - 1))
            var y = Math.floor(random(matrix.length - 1))
            matrix[y][x] = 3;
            var gr = new Predator(x, y, 3)
            predatorArr.push(gr)
        }
    }

    if (virusArr.length == 0) {
        for (var i = 0; i < 1; i++) {
            var x = Math.floor(random(matrix[0].length - 1))
            var y = Math.floor(random(matrix.length - 1))
            matrix[y][x] = 4;
            var gr = new Virus(x, y, 4)
            virusArr.push(gr)
        }
    }


    if (getArr.length == 0) {
        for (var i = 0; i < 2; i++) {
            var x = Math.floor(random(matrix[0].length - 1))
            var y = Math.floor(random(matrix.length - 1))
            matrix[y][x] = 4;
            var gr = new Get(x, y, 5)
            getArr.push(gr)
        }
    }

    if (humanArr.length == 0) {
        for (var i = 0; i < 2; i++) {
            var x = Math.floor(random(matrix[0].length - 1))
            var y = Math.floor(random(matrix.length - 1))
            matrix[y][x] = 4;
            var hum = new Human(x, y, 6)
            humanArr.push(hum)
        }
    }

    if (treeArr.length == 0) {
        for (var i = 0; i < 2; i++) {
            var x = Math.floor(random(matrix[0].length - 1))
            var y = Math.floor(random(matrix.length - 1))
            matrix[y][x] = 4;
            var tre = new Tree(x, y, 7)
            treeArr.push(tre)
        }
    }

    let sendData = {
        matrix: matrix
    }

    statistics = {
        grasses: grassArr.length,
        grassEaters: grassEaterArr.length,
        predators: predatorArr.length,
        viruses: virusArr.length,
        gets: getArr.length,
        humans: humanArr.length,
        trees: treeArr.length
    }

    fs.writeFileSync('statistics.json', JSON.stringify(statistics, undefined, 2))
    mystatistics = fs.readFileSync('statistics.json').toString()
    io.sockets.emit("sendStatistics", JSON.parse(mystatistics))
    io.sockets.emit("matrix", sendData)
}
setInterval(drawForBackend, 500)