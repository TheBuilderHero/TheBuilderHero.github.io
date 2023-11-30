
//define global variables:
window.defaultWidthOfCanvas = 400;
window.defaultHeightOfCanvas = 400;
window.maxXSquares = defaultWidthOfCanvas/10;
window.maxYSquares = defaultHeightOfCanvas/10;
window.arrOfColors = new Array(maxXSquares); //max array size. //Note first number means has color, other three are RGB.
window.colorRGBMap = {
	red: 'rgb(255,0,0)',
	blue: 'rgb(0,0,255)',
	green: 'rgb(0,255,0)',
	yellow: 'rgb(255,255,0)',
	purple: 'rgb(128,0,128)',
	orange: 'rgb(255,165,0)',
	pink: 'rgb(255,192,203)',
	brown: 'rgb(165,42,42)',
	black: 'rgb(0,0,0)',
};

let data = window.performance.getEntriesByType("navigation")[0].type;
console.log(data);

//force back to screen to fill in info if they try to reload or anything:
if ("navigate" != data){
    window.location.href = './index.html';
}
window.addEventListener("load", (event) => {
    // initialize canvas size:
    setCanvasSize(defaultWidthOfCanvas, defaultHeightOfCanvas);
    drawInitialShape();

    //setup the array:
    for (let i = 0; arrOfColors.length > i; i++) { //ignoring 0 index
        let arrayOfY = new Array(maxYSquares);
        for (let i2 = 0; arrOfColors.length > i2; i2++) {
            arrayOfY[i2] = [0,0,0,0];
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
	
	window.colorOptions = [searchParams.get('color1'), searchParams.get('color2'), searchParams.get('color3')];

    //<div data-video="" data-autoplay="1" data-loop="1" id="backGroundAudio" hidden="hidden"></div>
    const audioItem = document.getElementById("youtube-audio");
    //audioItem.setAttribute("data-autoplay","1");
    //audioItem.setAttribute("data-loop","1");
    //audioItem.setAttribute("hidden","hidden");

    audioItem.setAttribute('data-video', searchParams.get('song'));

    console.log(searchParams.get('song'));

    //Play SONG:
    var e = document.getElementById("youtube-audio")
        , t = document.createElement("img");
    t.setAttribute("id", "youtube-icon"),
        t.style.cssText = "cursor:pointer;cursor:hand",
        e.appendChild(t);
    var a = document.createElement("div");
    a.setAttribute("id", "youtube-player"),
        e.appendChild(a);
    var o = function(e) {
        var a = e ? "IDzX9gL.png" : "quyUPXN.png";
        t.setAttribute("src", "https://i.imgur.com/" + a)
    };
    e.onclick = function() {
        r.getPlayerState() === YT.PlayerState.PLAYING || r.getPlayerState() === YT.PlayerState.BUFFERING ? (r.pauseVideo(),
            o(!1)) : (r.playVideo(),
            o(!0))
    };
    var r = new YT.Player("youtube-player",{
        height: "0",
        width: "0",
        videoId: e.dataset.video,
        playerVars: {
            autoplay: "1", //e.dataset.autoplay
            loop: "1"//e.dataset.loop
        },
        events: {
            onReady: function(e) {
                r.setPlaybackQuality("small"),
                    o(r.getPlayerState() !== YT.PlayerState.CUED)
            },
            onStateChange: function(e) {
                e.data === YT.PlayerState.ENDED && o(!1)
            }
        }
    })
    audioItem.volume = .10;
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
                ctx.strokeStyle = 'rgb(0,0,0)';
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
                ctx.strokeStyle = 'rgb(0,0,0)';
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
        ctx.strokeStyle = 'rgb(0,0,0)';
        ctx.fillRect((2+canvasBlockSize * x)-canvasBlockSize, (2+canvasBlockSize * y)-canvasBlockSize, canvasBlockSize-4, canvasBlockSize-4);
    }
}
function fillXY(x,y,colorChoice){
    const ctx = document.getElementById("canvas").getContext("2d");
    if(x>=1 && x<= maxXSquares && y>=1 && y <= maxYSquares) {
        console.log(x);
        console.log(y);
		var colorRGB = colorRGBMap[colorChoice];
		console.log("Color choice is: " + colorChoice);
		if (arrOfColors.at(x).at(y).at(0) == 1) {
			console.log("This cell has a color");
			colorRGB = mixColors(colorRGB, arrOfColors[x][y][1], arrOfColors[x][y][2], arrOfColors[x][y][3]);
		} else {
			console.log("This cell does not have a color");
		}
		var colorObj = $.Color(colorRGB);
		arrOfColors[x][y][0] = 1;
		arrOfColors[x][y][1] = colorObj.red();
		arrOfColors[x][y][2] = colorObj.green();
		arrOfColors[x][y][3] = colorObj.blue();
		ctx.fillStyle = colorRGB;
		console.log("End result color: " + ctx.fillStyle);
		hexValue = ctx.fillStyle;
        ctx.strokeStyle = 'rgb(0,0,0)';
        ctx.fillRect((2+canvasBlockSize * x)-canvasBlockSize, (2+canvasBlockSize * y)-canvasBlockSize, canvasBlockSize-4, canvasBlockSize-4);
    }
}

function fillRandomCellWithRandomColor(){
    var x = document.getElementById("l_x").value;
    var y = document.getElementById("l_y").value;
    var randNum1 = Math.floor(Math.random()*x+1); //from 1 to x
    var randNum2 = Math.floor(Math.random()*y+1);  //from 1 to y
    var randomColor = Math.floor(Math.random()*3); //from 0 to 2
	var colorChoice = colorOptions[randomColor];
    fillXY(randNum1, randNum2, colorChoice);
}

function mixColors(color1, color2R, color2G, color2B) {
	color2 = 'rgb(' + color2R + ',' + color2G + ',' + color2B + ')';
	var mixingRatio = 0.5;
	var resultColor = mixbox.lerp(color1, color2, mixingRatio);
	return resultColor;
}

function changeSizeStuff() {
    const can = document.getElementById('canvas');
    const update_div = document.getElementById('update_canvas');
    const controls = document.getElementById('controls');
    const radio_choice = document.getElementById('after_run_div');
    can.style.width = '200px';
    can.style.height = '200px';
    update_div.style.textAlign = 'center';
    update_div.classList.remove('col-sm-5');
    update_div.classList.add('col-sm-8');

    controls.style.display = 'none';

    radio_choice.style.display = 'block';

}