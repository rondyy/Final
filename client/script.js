
socket = io()
var side = 30, m = 40, n = 40;
var multForGrass = 5
var multForGrassEater = 13
var multForVirus = 15
var multForGet= 8
var multForHuman = 10
var multForPredator = 7
var grassColor = "#09SDE17"
var grassEaterColor = "yellow"
var predatorColor = "black"
var virusColor = "purple"
var getColor = "blue"
var humanColor = "red"

function setup() {
    frameRate(5);
    createCanvas(m * side, n * side);
    background('#acacac');
    button1 = document.getElementById("summer");
    button2 = document.getElementById("winter");
    button3 = document.getElementById("themeButton")
    button4 = document.getElementById("themeButton1")
    button1.addEventListener("click", onColorChange);
    button2.addEventListener("click", onColorChange);
    button3.addEventListener("click", darkmode)
    button4.addEventListener("click", lightmode)
}

function lightmode() {
    if(event.target.id == "themeButton1"){
        var body = document.body
        body.style.backgroundColor = "#ffffff"
        mult = 8
    }
}
function darkmode() {
   if(event.target.id == "themeButton") {
    var body = document.body
    body.style.backgroundColor = "#373737"
    mult = 4
   }
}

function onColorChange() {
    if(event.target.id == "summer"){
        grassColor = "#12D804"
        grassEaterColor = "#A4A104"
        predatorColor = "#682050"
        virusColor = "#A49AF6"
        getColor = "#10009A"
        humanColor = "#42EF64"
        multForPredator = 10;
        multForVirus = 14;
        multForGet = 8;
        multForHuman = 13;
        multForGrass = 5;
        multForGrassEater = 8;
        
    }
    else if (event.target.id == "winter"){ 
        grassColor = "#D6D6CD"
        grassEaterColor = "#9B9326"
        predatorColor = "#444443"
        virusColor = "#731D1D"
        getColor = "#0A27B4"
        humanColor = "#660C57"
        multForGrass = 13;
        multForPredator = 18;
        multForVirus = 9;
        multForGet = 20;
        multForHuman = 12;
        multForGrassEater = 16;
    }
    let data = {
        
        mult: mult,
        fr: fr,
        multForGet: multForGet,
        multForHuman: multForHuman,
        multForVirus: multForVirus,
        multForPredator : multForPredator,
        multForGrassEater : multForGrassEater,
        multForGrass: multForGrass
    }
    socket.on("matrix", drawMatrix);
    socket.emit("afterClick", data);
}



function drawMatrix(data) {
    matrix = data.matrix;
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill(grassColor);
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
                rect(x * side, y * side, side, side);
            }

            else if (matrix[y][x] == 2) {

                fill(grassEaterColor);
                rect(x * side, y * side, side, side);
            }

            else if (matrix[y][x] == 3) {
                fill(predatorColor);
                rect(x * side, y * side, side, side);
            }

            else if (matrix[y][x] == 4) {

                fill(virusColor);
                rect(x * side, y * side, side, side);
            }

            else if (matrix[y][x] == 5) {

                fill(getColor);
                rect(x * side, y * side, side, side);
            }

            else if (matrix[y][x] == 6) {

                fill(humanColor);
                rect(x * side, y * side, side, side);
            }

        }
    }
}
socket.on("matrix", drawMatrix)

   