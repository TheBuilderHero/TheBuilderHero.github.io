
//define global variables:
window.defaultWidthOfCanvas = 400;
window.defaultHeightOfCanvas = 400;
window.addEventListener("load", (event) => {

    // initialize canvas size:
    setCanvasSize(defaultWidthOfCanvas, defaultHeightOfCanvas);

});
function setCanvasSize(width, height) {
    let canvas = document.getElementById("canvas");
    canvas.width = width;
    canvas.height = height;

}

function draw() {
    const canvas = document.getElementById("canvas")
    const ctx = document.getElementById("canvas").getContext("2d");
    var x = document.getElementById("l_x").value;
    var y = document.getElementById("l_y").value;
    ctx.clearRect(0, 0, canvas.width, canvas.height); //clear canvas
    console.log(x);
    console.log(y);
    //Make block size based on largest length choice:
    window.canvasBlockSize = Math.floor((defaultWidthOfCanvas/x <= defaultWidthOfCanvas/y) ? defaultWidthOfCanvas/x : defaultWidthOfCanvas/y);
    console.log(canvasBlockSize);
    if(x>=1 && x<= 40 && y>=1 && y <= 40){
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
    if(x>=1 && x<= 40 && y>=1 && y <= 40) {
        console.log(x);
        console.log(y);
        ctx.fillStyle = 'rgb(255,0,0)';
        ctx.strokeStyle = `rgb(0, 0, 0)`;
        ctx.fillRect((2+canvasBlockSize * x)-canvasBlockSize, (2+canvasBlockSize * y)-canvasBlockSize, canvasBlockSize-4, canvasBlockSize-4);
    }
}
function fillXY(x,y,colorChoice){
    const ctx = document.getElementById("canvas").getContext("2d");
    if(x>=1 && x<= 40 && y>=1 && y <= 40) {
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
    var randNum1 = Math.floor(Math.random()*x);
    var randNum2 = Math.floor(Math.random()*y);
    var colorChoice = Math.floor(Math.random()*3+1);
    //1 blue
    //2 red
    //3 green
    fillXY(randNum1, randNum2, colorChoice);
}