
///define global variables:
window.defaultWidthOfCanvas = 400;
window.defaultHeightOfCanvas = 400;
window.maxXSquares = defaultWidthOfCanvas/10;
window.maxYSquares = defaultHeightOfCanvas/10;
window.arrOfColors = new Array(maxXSquares); //max array size. //Note: first number is the amount of times it's been painted, other three number are RGB.
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

var a = 0; // the total number of paint drops put on the canvas before the stopping criterion stops the painting.
var a1 = 0; // The number of paint drops on the canvas of Color 1.
var a2 = 0; // The number of paint drops on the canvas of Color 2.
var a3 = 0; // The number of paint drops on the canvas of Color 3.
var b = 0; // the maximum number of paint drops on any given square when the painting halts (that is, looking at all the squares,
            //what is the largest number of paint drops that fell on one square?)
var c = 0; // the average number of paint drops over all the squares when the painting halts
var rands = {randNum1: 0, randNum2: 0};
var stopId; // id for setinterval
var computations = {
    a: 0,
    a1: 0,
    a2: 0,
    a3: 0,
    b: 0,
    c: 0
}
var s;
var termItem;
let data = window.performance.getEntriesByType("navigation")[0].type;

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

    //Load all values:
    //https://sentry.io/answers/how-to-get-values-from-urls-in-javascript/
    const searchParams = new URLSearchParams(window.location.search);
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
    termItem = searchParams.get('termItem');
    //console.log(searchParams.get('song'));

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
    canvas.width = width;
    canvas.height = height;
}

function drawInitialShape() {
    const canvas = document.getElementById("canvas")
    const ctx = document.getElementById("canvas").getContext("2d");
    var x = 1;
    var y = 1;
    ctx.clearRect(0, 0, canvas.width, canvas.height); //clear canvas
    //Make block size based on largest length choice:
    window.canvasBlockSize = Math.floor((defaultWidthOfCanvas/x <= defaultWidthOfCanvas/y) ? defaultWidthOfCanvas/x : defaultWidthOfCanvas/y);
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
    //Make block size based on largest length choice:
    window.canvasBlockSize = Math.floor((defaultWidthOfCanvas/x <= defaultWidthOfCanvas/y) ? defaultWidthOfCanvas/x : defaultWidthOfCanvas/y);
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
        ctx.fillStyle = 'rgb(255,0,0)';
        ctx.strokeStyle = 'rgb(0,0,0)';
        ctx.fillRect((2+canvasBlockSize * x)-canvasBlockSize, (2+canvasBlockSize * y)-canvasBlockSize, canvasBlockSize-4, canvasBlockSize-4);
    }
}
function fillXY(x,y,colorChoice){
    const ctx = document.getElementById("canvas").getContext("2d");
    if (x >= 1 && x <= maxXSquares && y >= 1 && y <= maxYSquares) {
		var colorRGB = colorRGBMap[colorChoice];
		//console.log("Painting an element");
		//console.log("Color choice is: " + colorChoice);
		if (arrOfColors[x-1][y-1][0] > 0) {
			colorRGB = mixColors(colorRGB, arrOfColors[x-1][y-1][1], arrOfColors[x-1][y-1][2], arrOfColors[x-1][y-1][3]);
			console.log("Painted an element for the", arrOfColors[x-1][y-1][0] + 1, "time");
		}
		var colorObj = $.Color(colorRGB);
		arrOfColors[x-1][y-1][0] += 1;
		arrOfColors[x-1][y-1][1] = colorObj.red();
		arrOfColors[x-1][y-1][2] = colorObj.green();
		arrOfColors[x-1][y-1][3] = colorObj.blue();
		ctx.fillStyle = colorRGB;
        ctx.strokeStyle = 'rgb(0,0,0)';
        ctx.fillRect((2+canvasBlockSize * x)-canvasBlockSize, (2+canvasBlockSize * y)-canvasBlockSize, canvasBlockSize-4, canvasBlockSize-4);
		
		switch (parseInt(termItem)) {
			case 1: // Terminate when last unpainted square is painted for the first time
				if (checkAllElementsPainted()) {
					clearInterval(stopId);
					console.log("Stopped1");
				}
				break;
			case 2: // Terminate when a square is painted for the second time
				if (arrOfColors[x-1][y-1][0] > 1) {
					console.log("Stopped2");
					clearInterval(stopId);
				}
				break;
			case 3: // Terminate when a square is painted for the third time
				if (arrOfColors[x-1][y-1][0] > 2) {
					console.log("Stopped3");
					clearInterval(stopId);
				}
				break;
			default:
				console.log("Invalid termItem:", termItem);
		}
		
    }
}

function fillRandomCellWithRandomColor(s){
    var x = document.getElementById("l_x").value;
    var y = document.getElementById("l_y").value;
    rands.randNum1 = Math.floor(Math.random()*x+1); // from 1 to x
    rands.randNum2 = Math.floor(Math.random()*y+1);  // from 1 to y
    var randomColor = Math.floor(Math.random()*3); // from 0 to 2
	var colorChoice = colorOptions[randomColor];
    fillXY(rands.randNum1, rands.randNum2, colorChoice);
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

function paintOne() {
    stopId = setInterval(fillRandomCellWithRandomColor, 1000);
	console.log("Interval started");
}

function paintMany() {
    for (var i = 0; i < repititions; i++) {
        paintOne();
    }
}

function startPainting() {
    paintOne();
}

function checkAllElementsPainted() {
	var xMax = document.getElementById("l_x").value;
    var yMax = document.getElementById("l_y").value;
	for (let iterX = 0; iterX < xMax; iterX++) {
		for (let iterY = 0; iterY < yMax; iterY++) {
			if (arrOfColors[iterX][iterY][0] == 0) {
				//console.log("arrOfColors[x=" + iterX + "][y=" + iterY + "][0] == 0, is not painted");
				return false;
			}
		}
	}
	return true;
}