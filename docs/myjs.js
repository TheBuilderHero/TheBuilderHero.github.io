
//define global variables:
window.defaultWidthOfCanvas = 400;
window.defaultHeightOfCanvas = 400;
window.maxXSquares = defaultWidthOfCanvas/10;
window.maxYSquares = defaultHeightOfCanvas/10;
window.arrOfColors = new Array(maxXSquares); //max array size. //Note first number means has color, other three are RGB.

let data = window.performance.getEntriesByType("navigation")[0].type;
console.log(data);

//force back to screen to fill in info if they try to reload or anything:
if ("navigate" != data){
    window.location.href = './index.html';
}
window.addEventListener("load", (event) => {
    let audioItem = document.getElementById("backGroundAudio");
    audioItem.volume = .10;
    // initialize canvas size:
    setCanvasSize(defaultWidthOfCanvas, defaultHeightOfCanvas);
    drawInitialShape();

    let initialCellValues = [0,0,0,0];

    //setup the array:
    for (let i = 0; arrOfColors.length > i; i++) { //ignoring 0 index
        let arrayOfY = new Array(maxYSquares);
        for (let i2 = 0; arrOfColors.length > i2; i2++) {
            arrayOfY[i2] = initialCellValues; //initialCellValues;
        }
        arrOfColors[i] = arrayOfY;
    }
    //At this point array of colors should have all the values initialized to 0.
    console.log(arrOfColors);
    console.log(arrOfColors.at(0).at(0).at(0)); //we will use this to check if it is filled.


    //Load all values:
    //https://sentry.io/answers/how-to-get-values-from-urls-in-javascript/
    const searchParams = new URLSearchParams(window.location.search);
    //console.log(searchParams.has('sort')); // true
    //console.log(searchParams.get('sort')); // price_descending
    for (const param of searchParams) {
        console.log("Data:",param);
    }
    var dim_x = searchParams.get('dim_x');
    document.getElementById("l_x").value = dim_x;
    var dim_y = searchParams.get('dim_y');
    document.getElementById("l_y").value = dim_y;
});

function setCanvasSize(width, height) {
    let canvas = document.getElementById("canvas");
    console.log(width);
    console.log(height);
    canvas.width = width;
    canvas.height = height;
}

function drawInitialShape() {
    const canvas = document.getElementById("canvas")
    const ctx = document.getElementById("canvas").getContext("2d");
    var x = 1;
    var y = 1;
    ctx.clearRect(0, 0, canvas.width, canvas.height); //clear canvas
    console.log(x);
    console.log(y);
    //Make block size based on largest length choice:
    window.canvasBlockSize = Math.floor((defaultWidthOfCanvas/x <= defaultWidthOfCanvas/y) ? defaultWidthOfCanvas/x : defaultWidthOfCanvas/y);
    console.log(canvasBlockSize);
    if(x>=1 && x<= maxXSquares && y>=1 && y <= maxYSquares){
        for (let i = 0; i < y; i++) {
            for (let j = 0; j < x; j++) {
                ctx.strokeStyle = `rgb(0, 0, 0)`;
                ctx.beginPath();
                ctx.rect(1+canvasBlockSize*j,1+canvasBlockSize*i,canvasBlockSize-2,canvasBlockSize-2);
                ctx.stroke();
            }
        }
    } else {
        //output error message
    }
}

function draw() {
    const canvas = document.getElementById("canvas")
    const ctx = document.getElementById("canvas").getContext("2d");
    var x = document.getElementById("l_x").value;
    var y = document.getElementById("l_y").value;
    console.log(x);
    console.log(y);
    //Make block size based on largest length choice:
    window.canvasBlockSize = Math.floor((defaultWidthOfCanvas/x <= defaultWidthOfCanvas/y) ? defaultWidthOfCanvas/x : defaultWidthOfCanvas/y);
    console.log(canvasBlockSize);
    if(x>=1 && x<= maxXSquares && y>=1 && y <= maxYSquares){
        ctx.clearRect(0, 0, canvas.width, canvas.height); //clear canvas
        for (let i = 0; i < y; i++) {
            for (let j = 0; j < x; j++) {
                ctx.strokeStyle = `rgb(0, 0, 0)`;
                ctx.beginPath();
                ctx.rect(1+canvasBlockSize*j,1+canvasBlockSize*i,canvasBlockSize-2,canvasBlockSize-2);
                ctx.stroke();
            }
        }
    } else {
        //output error message
    }
}

function fill(){
    const ctx = document.getElementById("canvas").getContext("2d");
    var x = document.getElementById("l_x_i").value;
    var y = document.getElementById("l_y_i").value;
    if(x>=1 && x<= maxXSquares && y>=1 && y <= maxYSquares) {
        console.log(x);
        console.log(y);
        ctx.fillStyle = 'rgb(255,0,0)';
        ctx.strokeStyle = `rgb(0, 0, 0)`;
        ctx.fillRect((2+canvasBlockSize * x)-canvasBlockSize, (2+canvasBlockSize * y)-canvasBlockSize, canvasBlockSize-4, canvasBlockSize-4);
    }
}
function fillXY(x,y,colorChoice){
    const ctx = document.getElementById("canvas").getContext("2d");
    if(x>=1 && x<= maxXSquares && y>=1 && y <= maxYSquares) {
        console.log(x);
        console.log(y);
        if(colorChoice == 1) ctx.fillStyle = 'rgb(0,0,255)';
        if(colorChoice == 2) ctx.fillStyle = 'rgb(255,0,0)';
        if(colorChoice == 3) ctx.fillStyle = 'rgb(0,255,0)';
        ctx.strokeStyle = `rgb(0, 0, 0)`;
        ctx.fillRect((2+canvasBlockSize * x)-canvasBlockSize, (2+canvasBlockSize * y)-canvasBlockSize, canvasBlockSize-4, canvasBlockSize-4);
    }
}

function fillRandomCellWithRandomColor(){
    var x = document.getElementById("l_x").value;
    var y = document.getElementById("l_y").value;
    var randNum1 = Math.floor(Math.random()*x+1); //from 1 to x
    var randNum2 = Math.floor(Math.random()*y+1);  //from 1 to y
    var colorChoice = Math.floor(Math.random()*3+1); //from 1 to 3
    //1 blue
    //2 red
    //3 green
    fillXY(randNum1, randNum2, colorChoice);
}

