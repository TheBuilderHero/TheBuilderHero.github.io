
///define global variables:
window.defaultWidthOfCanvas = 400;
window.defaultHeightOfCanvas = 400;
window.maxXSquares = defaultWidthOfCanvas/10;
window.maxYSquares = defaultHeightOfCanvas/10;
window.arrOfColors = new Array(maxXSquares); //max array size. //Note: first number is the amount of times it's been painted, other three number are RGB.
window.tempArrOfColors = new Array(maxXSquares); //same as above just used for each experiment.
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
window.stage_index = 0;
window.totalPaintDrops = [];
window.color1_drops = [];
window.color2_drops = [];
window.color3_drops = [];
window.maxPaintDrops = [];
window.averagePaintDrops = [];
window.stage_index_rep = 0;
window.totalPaintDrops_rep = [0];
window.color1_drops_rep = [0];
window.color2_drops_rep = [0];
window.color3_drops_rep = [0];
window.maxPaintDrops_rep = [0];
window.averagePaintDrops_rep = [0];
window.data_points_max = 60;
document.y_title = ["",""];
document.table_title = ["",""];
//used for size of grid:
window.x_value = 0;
window.y_value = 0;
window.max_val = 0;
window.fixed_val_1_name = "";
window.fixed_val_1 = 0;
window.fixed_val_2_name = "";
window.fixed_val_2 = 0;

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
    window.searchParams = searchParams;

    for (const param of searchParams) {
        console.log("Data:",param);
    }
    //var dim_x = searchParams.get('dim_x');
    //document.getElementById("l_x").value = dim_x;
    //var dim_y = searchParams.get('dim_y');
    //document.getElementById("l_y").value = dim_y;
	
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



    if(window.searchParams.get('termItem') == 1){
        document.getElementById("t1").hidden = false;
    } else if(window.searchParams.get('termItem') == 2){
        document.getElementById("t2").hidden = false;
    } else if(window.searchParams.get('termItem') == 3){
        document.getElementById("t3").hidden = false;
    }

    window.current_repititions = 1;
    window.endExperiment = false;
    window.isPaused = false;


    audioItem.volume = .10;


    //const update_div = document.getElementById('update_canvas');
    //update_div.hidden = false;

    window.current_pos = 0;
    startPainting(searchParams);
});

window.addEventListener("DOMContentLoaded", (event) => {
    const display_value = document.getElementById("showspeed");
    const speed = document.getElementById("speed");
    window.delay = 1000/speed.value;
    display_value.textContent = speed.value;

    speed.addEventListener("input", (event) => {
    });

    speed.addEventListener("change", (event) => {
        display_value.textContent = speed.value;
        display_value.textContent = event.target.value;
        console.log(window.performance.now());
        console.log(1000/speed.value, "ms");
        window.delay = 1000/speed.value;
    });
});

function setCanvasSize(width, height) {
    let canvas = document.getElementById("canvas");
    let canvas_small = document.getElementById("canvas_small");
    canvas_small.width = width;
    canvas.width = width;
    canvas_small.height = height;
    canvas.height = height;
}

function drawInitialShape(x,y) {
    const canvas = document.getElementById("canvas");
    const can_small = document.getElementById('canvas_small');
    const ctx = document.getElementById("canvas").getContext("2d");
    const ctx_small = document.getElementById("canvas_small").getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height); //clear canvas
    ctx_small.clearRect(0, 0, canvas.width, canvas.height); //clear canvas
    //Make block size based on largest length choice:
    window.canvasBlockSize = Math.floor((defaultWidthOfCanvas/x <= defaultWidthOfCanvas/y) ? defaultWidthOfCanvas/x : defaultWidthOfCanvas/y);
    if(x>=1 && x<= maxXSquares && y>=1 && y <= maxYSquares){
        for (let i = 0; i < y; i++) {
            for (let j = 0; j < x; j++) {
                ctx.strokeStyle = 'rgb(0,0,0)';
                ctx.beginPath();
                ctx.rect(1+canvasBlockSize*j,1+canvasBlockSize*i,canvasBlockSize-2,canvasBlockSize-2);
                ctx.stroke();

                ctx_small.strokeStyle = 'rgb(0,0,0)';
                ctx_small.beginPath();
                ctx_small.rect(1+canvasBlockSize*j,1+canvasBlockSize*i,canvasBlockSize-2,canvasBlockSize-2);
                ctx_small.stroke();
            }
        }
    } else {
        //output error message
    }
}

function draw() {
    resetTempArrayOfColors();
    x = window.x_value;
    y = window.y_value;
    const canvas = document.getElementById("canvas");
    const canvas_small = document.getElementById("canvas_small");
    const ctx = document.getElementById("canvas").getContext("2d");
    const ctx_small = document.getElementById("canvas_small").getContext("2d");
    //Make block size based on largest length choice:
    window.canvasBlockSize = Math.floor((defaultWidthOfCanvas/x <= defaultWidthOfCanvas/y) ? defaultWidthOfCanvas/x : defaultWidthOfCanvas/y);
    if(x>=1 && x<= maxXSquares && y>=1 && y <= maxYSquares){
        ctx.clearRect(0, 0, canvas.width, canvas.height); //clear canvas
        ctx_small.clearRect(0, 0, canvas.width, canvas.height); //clear canvas
        for (let i = 0; i < y; i++) {
            for (let j = 0; j < x; j++) {
                ctx.strokeStyle = 'rgb(0,0,0)';
                ctx.beginPath();
                ctx.rect(1+canvasBlockSize*j,1+canvasBlockSize*i,canvasBlockSize-2,canvasBlockSize-2);
                ctx.stroke();

                ctx_small.strokeStyle = 'rgb(0,0,0)';
                ctx_small.beginPath();
                ctx_small.rect(1+canvasBlockSize*j,1+canvasBlockSize*i,canvasBlockSize-2,canvasBlockSize-2);
                ctx_small.stroke();
            }
        }
    } else {
        //output error message
    }
}


function fillXY(x,y,colorChoice){
    const ctx = document.getElementById("canvas").getContext("2d");
    const ctx_small = document.getElementById("canvas_small").getContext("2d");
    if (x >= 1 && x <= maxXSquares && y >= 1 && y <= maxYSquares) {
		var colorRGB = colorRGBMap[colorChoice];
		//console.log("Painting an element");
		//console.log("Color choice is: " + colorChoice);
		if (window.tempArrOfColors[x-1][y-1][0] > 0) {
			colorRGB = mixColors(colorRGB, window.tempArrOfColors[x-1][y-1][1], window.tempArrOfColors[x-1][y-1][2], window.tempArrOfColors[x-1][y-1][3]);
			console.log("Painted an element for the", window.tempArrOfColors[x-1][y-1][0] + 1, "time");
		}
		var colorObj = $.Color(colorRGB);
		arrOfColors[x-1][y-1][0] += 1; //keep track of total paints
        window.tempArrOfColors[x-1][y-1][0] += 1;
        window.tempArrOfColors[x-1][y-1][1] = colorObj.red();
        window.tempArrOfColors[x-1][y-1][2] = colorObj.green();
        window.tempArrOfColors[x-1][y-1][3] = colorObj.blue();
        ctx.fillStyle = colorRGB;
        ctx_small.fillStyle = colorRGB;
        ctx.strokeStyle = 'rgb(0,0,0)';
        ctx_small.strokeStyle = 'rgb(0,0,0)';
        ctx.fillRect((2+canvasBlockSize * x)-canvasBlockSize, (2+canvasBlockSize * y)-canvasBlockSize, canvasBlockSize-4, canvasBlockSize-4);
        ctx_small.fillRect((2+canvasBlockSize * x)-canvasBlockSize, (2+canvasBlockSize * y)-canvasBlockSize, canvasBlockSize-4, canvasBlockSize-4);

		switch (parseInt(termItem)) {
			case 1: // Terminate when last unpainted square is painted for the first time
                console.log("R V: ", window.repititions, "AND", window.current_repititions);
				if (checkAllElementsPainted()) {
					clearInterval(stopId);
                    clearTimeout(stopId);
					console.log("Stopped1");
                    window.fullStop = true;
                    window.current_repititions += 1;
                    saveAllValues_rep();
                    //this if statement prepares for the next wave of values:
                    if(window.repititions >= window.current_repititions){
                        window.color1_drops_rep.push(0);
                        window.color2_drops_rep.push(0);
                        window.color3_drops_rep.push(0);
                        window.totalPaintDrops_rep.push(0);
                        window.maxPaintDrops_rep.push(0);
                        window.averagePaintDrops_rep.push(0);
                        window.stage_index_rep++;
                    }
				}
                if(window.repititions < window.current_repititions){
                    clearInterval(stopId);
                    clearTimeout(stopId);
                    window.current_repititions = 1;
                    console.log("REPETITION STOP");
                    saveAllValues_independent();

                    window.totalPaintDrops_rep = [0];
                    window.color1_drops_rep = [0];
                    window.color2_drops_rep = [0];
                    window.color3_drops_rep = [0];
                    window.maxPaintDrops_rep = [0];
                    window.averagePaintDrops_rep = [0];


                    window.stage_index++;
                    window.stage_index_rep = 0;
                    window.fullStop = true;

                    window.current_pos += 1;
                    console.log("POS:",window.current_pos, " vs ", window.max_pos);
                    if(window.current_pos != window.max_pos){
                        startPainting(window.searchParams);
                    } else {
                        window.endExperiment = true;
                    }
                }
                if(window.current_pos != window.max_pos && checkAllElementsPainted()) startPainting(window.searchParams);
				break;
			case 2: // Terminate when a square is painted for the second time
                console.log("R V: ", window.repititions, "AND", window.current_repititions);
				if (window.tempArrOfColors[x-1][y-1][0] > 1) {
					console.log("Stopped2");
                    window.fullStop = true;
					clearInterval(stopId);
                    clearTimeout(stopId);
                    window.current_repititions += 1;
                    saveAllValues_rep();
                    //this if statement prepares for the next wave of values:
                    if(window.repititions >= window.current_repititions){
                        window.color1_drops_rep.push(0);
                        window.color2_drops_rep.push(0);
                        window.color3_drops_rep.push(0);
                        window.totalPaintDrops_rep.push(0);
                        window.maxPaintDrops_rep.push(0);
                        window.averagePaintDrops_rep.push(0);
                        window.stage_index_rep++;
                    }
				}
                if(window.repititions < window.current_repititions){
                    clearInterval(stopId);
                    clearTimeout(stopId);
                    window.current_repititions = 1;
                    console.log("REPETITION STOP");
                    saveAllValues_independent();

                    window.totalPaintDrops_rep = [0];
                    window.color1_drops_rep = [0];
                    window.color2_drops_rep = [0];
                    window.color3_drops_rep = [0];
                    window.maxPaintDrops_rep = [0];
                    window.averagePaintDrops_rep = [0];

                    window.stage_index++;
                    window.stage_index_rep = 0;
                    window.fullStop = true;

                    window.current_pos += 1;
                    console.log("POS:",window.current_pos, " vs ", window.max_pos);
                    if(window.current_pos != window.max_pos){
                        startPainting(window.searchParams);
                    } else {
                        window.endExperiment = true;
                    }
                }
                if(window.current_pos != window.max_pos && window.tempArrOfColors[x-1][y-1][0] > 1) {
                    startPainting(window.searchParams)
                }
				break;
			case 3: // Terminate when a square is painted for the third time
                console.log("R V: ", window.repititions, "AND", window.current_repititions);
				if (window.tempArrOfColors[x-1][y-1][0] > 2) {
					console.log("Stopped3");
                    window.fullStop = true;
					clearInterval(stopId);
                    clearTimeout(stopId);
                    window.current_repititions += 1;
                    saveAllValues_rep();
                    //this if statement prepares for the next wave of values:
                    if(window.repititions >= window.current_repititions){
                        window.color1_drops_rep.push(0);
                        window.color2_drops_rep.push(0);
                        window.color3_drops_rep.push(0);
                        window.totalPaintDrops_rep.push(0);
                        window.maxPaintDrops_rep.push(0);
                        window.averagePaintDrops_rep.push(0);
                        window.stage_index_rep++;
                    }
				}
                if(window.repititions < window.current_repititions){
                    clearInterval(stopId);
                    clearTimeout(stopId);
                    window.current_repititions = 1;
                    console.log("REPETITION STOP");
                    saveAllValues_independent();

                    window.totalPaintDrops_rep = [0];
                    window.color1_drops_rep = [0];
                    window.color2_drops_rep = [0];
                    window.color3_drops_rep = [0];
                    window.maxPaintDrops_rep = [0];
                    window.averagePaintDrops_rep = [0];

                    window.stage_index++;
                    window.stage_index_rep = 0;
                    window.fullStop = true;

                    window.current_pos += 1;
                    console.log("POS:",window.current_pos, " vs ", window.max_pos);
                    if(window.current_pos != window.max_pos){
                        startPainting(window.searchParams);
                    } else {
                        window.endExperiment = true;
                    }
                }

                if(window.current_pos != window.max_pos && window.tempArrOfColors[x-1][y-1][0] > 2)  {
                    startPainting(window.searchParams);
                }
				break;
			default:
				console.log("Invalid termItem:", termItem);
		}
		
    }
}

function fillRandomCellWithRandomColor(){
    rands.randNum1 = Math.floor(Math.random()*window.x_value+1); // from 1 to x
    rands.randNum2 = Math.floor(Math.random()*window.y_value+1);  // from 1 to y
    var randomColor = Math.floor(Math.random()*3); // from 0 to 2

    if(randomColor == 0) window.color1_drops_rep[window.stage_index_rep]++;
    if(randomColor == 1) window.color2_drops_rep[window.stage_index_rep]++;
    if(randomColor == 2) window.color3_drops_rep[window.stage_index_rep]++;
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
    const can_small = document.getElementById('canvas_small');
    const update_div_small = document.getElementById('update_canvas_small');
    const controls = document.getElementById('controls');
    const radio_choice = document.getElementById('after_run_div');
    const radio_choice_heading = document.getElementById('after_run_div1');
    const table1 = document.getElementById('table1');
    can.style.width = '100px';
    can.style.height = '100px';
    can_small.style.width = '100px';
    can_small.style.height = '100px';
    //update_div.style.textAlign = 'center';
    //update_div.classList.remove('col-sm-4');
    //update_div.classList.add('col-sm-12');
    update_div.hidden = true;
    update_div_small.hidden = false;
    controls.hidden = true;
    radio_choice.hidden = false;
    radio_choice_heading.hidden = false;
    table1.hidden = false;

    set_graph_values();
    saveAllValues_independent();
    showTable();

}

function paintOne() {
    //stopId = setInterval(fillRandomCellWithRandomColor, 1000);
    fillRandomCellWithRandomColor();
	console.log("Interval started");
}

function paintMany(){
    if(window.timeStamp + window.delay <= window.performance.now()) {
        //console.log(window.timeStamp + window.delay, " VS ", window.performance.now());
        //console.log("TIME STAMP HIT!");
        window.timeStamp = window.performance.now();
        paintOne();
    }
    clearInterval(stopId);
    console.log(!window.fullStop);
    if(!window.fullStop && (window.current_pos != window.max_pos)){
        stopId = setInterval(paintMany, 25);
    } else if (window.current_pos == window.max_pos) {
        console.log("COMPLETED EXPERIMENT!");
        changeSizeStuff();
    }
}

function startPainting(searchParams) {
    console.log("CALL TO START PAINT!");
    let independent_value = searchParams.get('independent');
    if(searchParams.get('independent') == 1){
        let DIMS = searchParams.get('globalListOfItems').split(',');
        window.max_pos = DIMS.length;
        const dim_XY = DIMS[window.current_pos];
        console.log("Running", dim_XY);
        window.x_value = dim_XY;
        window.y_value = dim_XY;
        window.fullStop = false;
        window.fixed_val_1_name = "Repetitions: ";
        window.fixed_val_1 = window.repititions;
        if(!window.endExperiment) draw();
        window.repititions = searchParams.get('repetitions');
        window.fixed_val_1_name = "Repetitions: ";
        window.fixed_val_1 = window.repititions;
        window.fixed_val_2_name = "";
        window.fixed_val_2 = "";
        window.timeStamp = window.performance.now();
        paintMany();
        //stopId = setInterval(paintMany, 25);
    } else if(searchParams.get('independent') == 2){
        let DIMXS = searchParams.get('globalListOfItems').split(',');
        window.max_pos = DIMXS.length;
        const dim_X = DIMXS[window.current_pos];
        console.log("Running", dim_X);
        window.fullStop = false;
        let dim_y = searchParams.get('dim_y');
        window.x_value = dim_X;
        window.y_value = dim_y;
        if(!window.endExperiment) draw();
        window.repititions = searchParams.get('repetitions');
        window.fixed_val_1_name = "Repetitions: ";
        window.fixed_val_1 = window.repititions;
        window.fixed_val_2_name = "Dimension Y: ";
        window.fixed_val_2 = dim_y;
        window.timeStamp = window.performance.now();
        paintMany();
        //stopId = setInterval(paintMany, 25);
    } else if(searchParams.get('independent') == 3){
        let REPS = searchParams.get('globalListOfItems').split(',');
        window.max_pos = REPS.length;
        const rep_value = REPS[window.current_pos];
        console.log("Running", rep_value);
        window.repititions = rep_value;
        console.log([searchParams.get('globalListOfItems').split(',')]);
        console.log(Number(rep_value));
        window.fullStop = false;
        let dim_XY = searchParams.get('dim_Y_X');
        //set fixed value global:
        window.fixed_val_1_name = "Square Dimension: ";
        window.fixed_val_1 = dim_XY;
        window.fixed_val_2_name = "";
        window.fixed_val_2 = "";
        window.x_value = dim_XY;
        window.y_value = dim_XY;
        if(!window.endExperiment) draw();
        window.timeStamp = window.performance.now();
        paintMany();
        //stopId = setInterval(paintMany, 25);
    } else {
        console.log("INVALID INDEPENDENT VALUE: ", independent_value);
    }
}

function checkAllElementsPainted() {
	var xMax = window.x_value;
    var yMax = window.y_value;
	for (let iterX = 0; iterX < xMax; iterX++) {
		for (let iterY = 0; iterY < yMax; iterY++) {
			if (window.tempArrOfColors[iterX][iterY][0] == 0) {
				//console.log("window.tempArrOfColors[x=" + iterX + "][y=" + iterY + "][0] == 0, is not painted");
				return false;
			}
		}
	}
	return true;
}


function pause(){
    clearInterval(stopId);
    window.isPaused = true;
}

function unpause(){
    if(window.isPaused){
        window.timeStamp = window.performance.now();
        window.isPaused = false;
        paintMany();
    }
}

function resetTempArrayOfColors(){
    //setup the array:
    for (let i = 0; window.tempArrOfColors.length > i; i++) { //ignoring 0 index
        let arrayOfY = new Array(maxYSquares);
        for (let i2 = 0; window.tempArrOfColors.length > i2; i2++) {
            arrayOfY[i2] = [0,0,0,0];
        }
        window.tempArrOfColors[i] = arrayOfY;
    }
    //At this point array of colors should have all the values initialized to 0.
}

function graph_table_show(){
    if(validate_selection()) {
        //document.getElementById('canvas').hidden = true;
        document.getElementById('canvas_small').hidden = true;
        document.getElementById('update_canvas').hidden = true;
        document.getElementById('after_run_div').hidden = true;
        document.getElementById('after_run_div1').hidden = true;
        console.log("INFO:",document.getElementById('graph_table'));
        document.getElementById('graph_table').hidden = false;
        document.getElementById('graph-container').hidden = false;
        document.getElementById('table1').hidden = true;
        set_graph_values();
        produce_graph();

        saveAllValues_independent();
        //showTable(); //moved to after experiment.
        showReducedTable();
    } else {
        alert("Please only select One or Two and no more than that for results!");
    }
}



let independentVariable;
let dependentVariables;


function startExperiment() {
    // Code for setting up and running the experiment
    // Populate the experiment results in the table
    showTable();
}

const termItemMap = {
    1: "Last unpainted square is painted for the 1st time",
    2: "1st time any square gets its 2nd paint blob",
    3: "1st time any square gets its 3rd paint blob"
  };

function showReducedTable() { 
    let table_container2 = document.getElementById('table2');
    table_container2.innerHTML = '';

    let reduced_table = document.createElement('table');
    reduced_table.className = 'table_num1';
    let headerRow = document.createElement('tr');

    let headers = ['Ind. Variables', 'Dep. Variable #1', 'Dep. Variable #2']
    for (let header of headers) {
        let th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    }
    reduced_table.appendChild(headerRow);

    // Create an array to hold your data
    let data = [];
    let ind_var = searchParams.get('globalListOfItems').split(','); 
    for (let i = 0; i < ind_var.length; i++) {
        data.push({
        independent_variable: ind_var[i],
        dependent_variable: document.table_title[0], // Change this to dynamically allocat num of dep. variables choosen
        dependent_variable2: document.table_title[1] ? document.table_title[1] : "-",
        }); 
    }
    // Populate the table with data
    for (let i = 0; i < data.length; i++) {
        let row = data[i];
        let tr = document.createElement('tr');

        for (let key in row) {
            if ((key === 'dependent_variable' || key === 'dependent_variable2') && i !== 0) {
                continue;
            }

            let td = document.createElement('td');
            td.textContent = row[key];

            if ((key === 'dependent_variable' || key === 'dependent_variable2') && i === 0) {
                td.rowSpan = data.length;
            }

            tr.appendChild(td);
        }

        reduced_table.appendChild(tr);
    }

    // Append the table to the body 
    table_container2.appendChild(reduced_table);
}


function showTable() {
    // Clear the table container
    let table_container1 = document.getElementById('table1');
    table_container1.innerHTML = '';

    // Create the table
    let table = document.createElement('table');
    table.className = 'table_num1';
    let headerRow = document.createElement('tr');
    let subHeaderRow = document.createElement('tr');

    // Create the headers
    let headers = ['Ind. Variables', 'Fixed #1', 'Fixed #2', 'Colors', 'Stopping Criterion', 'A', 'A1', 'A2', 'A3', 'B', 'C'];
    let subHeaders = ['Min', 'Avg', 'Max']; // Add your subheaders here
    for (let header of headers) {
        let th = document.createElement('th');
        th.textContent = header;
        if (['A', 'A1', 'A2', 'A3', 'B', 'C'].includes(header)) {
            th.rowSpan = 1;
            th.colSpan = 3;
        } else {
            th.rowSpan = 2;
        }
        headerRow.appendChild(th);
    }
    for (let i = 0; i < 6; i++) { // For each of the 6 columns that need subcolumns
        for (let subHeader of subHeaders) {
            let th = document.createElement('th');
            th.textContent = subHeader;
            subHeaderRow.appendChild(th);
        }
    }
    table.appendChild(headerRow);
    table.appendChild(subHeaderRow);

    // Create an array to hold your data
    let data = [];
    let ind_var = searchParams.get('globalListOfItems').split(','); 
    for (let i = 0; i < ind_var.length; i++) {
        data.push({
            independent_variable: ind_var[i],
            fixed_val: window.fixed_val_1_name+window.fixed_val_1, // Change this to dynamically allocate num of dep. variables chosen
            fixed_val2: window.fixed_val_2_name ? window.fixed_val_2_name+window.fixed_val_2 : "-",
            colors: searchParams.get('color1') + ', ' + searchParams.get('color2') + ', ' + searchParams.get('color3'),
            stopping_criterion: termItemMap[window.searchParams.get('termItem')],
            total_min: window.totalPaintDrops[i][0],
            total_avg: parseFloat(window.totalPaintDrops[i][1]).toFixed(2),
            total_max: window.totalPaintDrops[i][2],
            A1_min: window.color1_drops[i][0],
            A1_avg: parseFloat(window.color1_drops[i][1]).toFixed(2),
            A1_max: window.color1_drops[i][2],
            A2_min: window.color2_drops[i][0],
            A2_avg: parseFloat(window.color2_drops[i][1]).toFixed(2),
            A2_max: window.color2_drops[i][2],
            A3_min: window.color3_drops[i][0],
            A3_avg: parseFloat(window.color3_drops[i][1]).toFixed(2),
            A3_max: window.color3_drops[i][2],
            max_min: window.maxPaintDrops[i][0],
            max_avg: parseFloat(window.maxPaintDrops[i][1]).toFixed(2),
            max_max: window.maxPaintDrops[i][2],
            avg_min: parseFloat(window.averagePaintDrops[i][0]).toFixed(2),
            avg_avg: parseFloat(window.averagePaintDrops[i][1]).toFixed(2),
            avg_max: parseFloat(window.averagePaintDrops[i][2]).toFixed(2)
        });
    }

    // Populate the table with data
    for (let i = 0; i < data.length; i++) {
        let row = data[i];
        let tr = document.createElement('tr');

        for (let key in row) {
            // Skip creating 'stopping_criterion', 'fixed_val', and 'fixed_val2' cells after the first row
            if ((key === 'stopping_criterion' || key === 'fixed_val' || key === 'fixed_val2' || key == 'colors') && i !== 0) {
                continue;
            }

            let td = document.createElement('td');
            td.textContent = row[key];

            // Apply 'rowspan' to the first 'stopping_criterion', 'fixed_val', and 'fixed_val2' cells
            if ((key === 'stopping_criterion' || key === 'fixed_val' || key === 'fixed_val2' || key == 'colors') && i === 0) {
                td.rowSpan = data.length;
            }

            tr.appendChild(td);
        }

        table.appendChild(tr);
    }

    // Append the table to the body 
    let table_container = document.getElementById('table1')
    table_container.appendChild(table);
}


function showGraph() {
    // Code for generating and displaying the graph
    //document.getElementById("table-container").hidden = true;
    //document.getElementById("graph-container").hidden = false;;
}

function newTable() {
    // Code for creating a new table/graph from the current experimental data
    // This might involve recalculating or updating values
    showTable();
}

function newExperiment() {
    // Code for abandoning the current experiment and starting a new one
    window.location.href = "index.html";
}

function quitProgram() {
    // Code for quitting the program
    alert("Thanks for using the program!");
    // Redirect to the opening page of the website
    window.location.href = "usage.html";
}

function show_option(){
    //document.getElementById("table-container").hidden = false;
    //document.getElementById("graph-container").hidden = false;

    //document.getElementById('canvas').hidden = false;

    document.getElementById('canvas_small').hidden = false;
    //document.getElementById('update_canvas').hidden = false;
    document.getElementById('update_canvas_small').hidden = false;
    document.getElementById('after_run_div').hidden = false;
    document.getElementById('after_run_div1').hidden = false;
    document.getElementById('graph_table').hidden = true;
    document.getElementById('graph-container').hidden = true;

    document.getElementById('table1').hidden = false;

}

function produce_graph() {
    if(document.y_title[0] != "" && document.y_title[1] != ""){
        window.max_val = Number(window.data_points1.at(window.data_points1.length-1).x)>Number(window.data_points2.at(window.data_points2.length-1).x)?Number(window.data_points1.at(window.data_points1.length-1).x)+Math.round((Number(window.data_points1.at(window.data_points1.length-1).x))/10):Number(window.data_points2.at(window.data_points2.length-1).x)+Math.round((Number(window.data_points2.at(window.data_points2.length-1).x))/10);

        let new_string = document.y_title[0] + " and " + document.y_title[1];
        var chart = new CanvasJS.Chart("chartContainer", {
            animationEnabled: true,
            zoomEnabled: true,
            theme: "dark2",
            title: {
                text: document.table_title,
                fontSize: 20
            },
            axisX: {
                title: document.x_title,
                titleFontColor: "#6D78AD",
                lineColor: "#6D78AD",
                minimum: 0,
                maximum: window.max_val,
                //valueFormatString: "##",

                interval: Math.round((window.max_val)/10)
            },
            axisY: {
                //logarithmic: true, //change it to false
                title: new_string,
                titleFontColor: "#6D78AD",
                lineColor: "#6D78AD",
                //gridThickness: 0,
                //lineThickness: 1,
                //labelFormatter: addSymbols
            },
            legend: {
                verticalAlign: "top",
                fontSize: 16,
                dockInsidePlotArea: true
            },
            data: [{
                type: "line",
                //xValueFormatString: "##",
                showInLegend: true,
                name: document.y_title[0],
                dataPoints: window.data_points1
            },
            {
                type: "line",
                //xValueFormatString: "####",
                //axisYType: "secondary",
                showInLegend: true,
                name: document.y_title[1],
                dataPoints: window.data_points2
            }
            ]
        });
        chart.render();
    } else {
        window.max_val = Number(window.data_points1.at(window.data_points1.length-1).x)+Math.round((Number(window.data_points1.at(window.data_points1.length-1).x))/10);
        var chart = new CanvasJS.Chart("chartContainer", {
            animationEnabled: true,
            zoomEnabled: true,
            theme: "dark2",
            title: {
                text: document.table_title,
                fontSize: 20
            },
            axisX: {
                title: document.x_title,
                titleFontColor: "#6D78AD",
                lineColor: "#6D78AD",
                minimum: 0,
                maximum: window.max_val,
                //valueFormatString: "##",

                interval: Math.round((window.max_val)/10)
            },
            axisY: {
                //logarithmic: true, //change it to false
                title: document.y_title[0],
                titleFontColor: "#6D78AD",
                lineColor: "#6D78AD",
                //gridThickness: 0,
                //lineThickness: 1,
                //labelFormatter: addSymbols
            }/*,
            legend: {
                verticalAlign: "top",
                fontSize: 16,
                dockInsidePlotArea: true
            }*/,
            data: [{
                type: "line",
                //xValueFormatString: "##",
                //showInLegend: true,
                //name: "Experiment Change",
                dataPoints: window.data_points1
            },
                {
                    type: "line",
                    //xValueFormatString: "####",
                    //axisYType: "secondary",
                    //showInLegend: true,
                    //name: "Linear Scale",
                    dataPoints: window.data_points2
                }
            ]
        });
        chart.render();

    }

    function addSymbols(e) {
        var suffixes = ["", "K", "M", "B", "T"];

        var order = Math.max(Math.floor(Math.log(Math.abs(e.value)) / Math.log(1000)), 0);
        if(order > suffixes.length - 1)
            order = suffixes.length - 1;

        var suffix = suffixes[order];
        return CanvasJS.formatNumber(e.value / Math.pow(1000, order), "#,##0.##") + suffix;
    }


}


function set_graph_values(){
    let calc_value = [0,0];
    var ele = document.getElementsByName('calc_val');

    let index_temp_checked = 0;
    for (let i = 0; i < ele.length; i++) {
        if (ele[i].checked) {
            calc_value[index_temp_checked++] = ele[i].value;
        }
    }
    console.log("calc_value (dependent)",calc_value);
    //reset values:
    document.y_title = ["",""];
    document.table_title = ["",""];
    if(calc_value[0] == 1){
        document.table_title[0] = "A: The number of paint drops put on the canvas before the painting halted";
        document.y_title[0] = "Total Paint Drops";

    } else if(calc_value[0] == 2){
        document.table_title[0] = "A1. The number of paint drops on the canvas of Color 1";
        document.y_title[0] = "Total Color 1 Paint Drops";

    } else if(calc_value[0] == 3){
        document.table_title[0] = "A2. The number of paint drops on the canvas of Color 2";
        document.y_title[0] = "Total Color 2 Paint Drops";

    } else if(calc_value[0] == 4){
        document.table_title[0] = "A3. The number of paint drops on the canvas of Color 3";
        document.y_title[0] = "Total Color 3 Paint Drops";

    } else if(calc_value[0] == 5){
        document.table_title[0] = "B: the maximum number of paint drops on any given square when the painting halted";
        document.y_title[0] = "Max Paint Drops (single square)";

    } else if(calc_value[0] == 6){
        document.table_title[0] = "C. the average number of paint drops over all the squares when the painting for this canvas halted";
        document.y_title[0] = "Average Paint Drops";

    }


    if(calc_value[1] == 1){
        document.table_title[1] = "A: The number of paint drops put on the canvas before the painting halted";
        document.y_title[1] = "Total Paint Drops";

    } else if(calc_value[1] == 2){
        document.table_title[1] = "A1. The number of paint drops on the canvas of Color 1";
        document.y_title[1] = "Total Color 1 Paint Drops";

    } else if(calc_value[1] == 3){
        document.table_title[1] = "A2. The number of paint drops on the canvas of Color 2";
        document.y_title[1] = "Total Color 2 Paint Drops";

    } else if(calc_value[1] == 4){
        document.table_title[1] = "A3. The number of paint drops on the canvas of Color 3";
        document.y_title[1] = "Total Color 3 Paint Drops";

    } else if(calc_value[1] == 5){
        document.table_title[1] = "B: the maximum number of paint drops on any given square when the painting halted";
        document.y_title[1] = "Max Paint Drops (single square)";

    } else if(calc_value[1] == 6){
        document.table_title[1] = "C. the average number of paint drops over all the squares when the painting for this canvas halted";
        document.y_title[1] = "Average Paint Drops";

    }


    console.log("independent option",searchParams.get('independent'));
    window.graph_array = Array();
    let independent_value = searchParams.get('independent');
    window.data_points1 = Array();
    window.data_points2 = Array();
    if(searchParams.get('independent') == 1){
        let DIMS = searchParams.get('globalListOfItems').split(',');
        window.max_pos = DIMS.length;
        const dim_XY = DIMS[window.current_pos];
        document.x_title = "Square Dimension (x,y)";
        for(let i = 0; i < DIMS.length; i++){
            let max = 0;
            if(DIMS[i] > max) window.data_points_max = DIMS[i];
            let values1 = {
                x: DIMS[i],
                y: getyvalue(calc_value[0],i)
            }
            window.data_points1.push(values1);
            if(calc_value[1] > 0) {
                let values2 = {
                    x: DIMS[i],
                    y: getyvalue(calc_value[1], i)
                }
                window.data_points2.push(values2);
            }
        }
        
    } else if(searchParams.get('independent') == 2){
        let DIMXS = searchParams.get('globalListOfItems').split(',');
        window.max_pos = DIMXS.length;
        const dim_X = DIMXS[window.current_pos];

        document.x_title = "Dimension X";
        for(let i = 0; i < DIMXS.length; i++){
            let max = 0;
            if(DIMXS[i] > max) window.data_points_max = DIMXS[i];
            let values1 = {
                x: DIMXS[i],
                y: getyvalue(calc_value[0],i)
            }
            window.data_points1.push(values1);
            if(calc_value[1] > 0) {
                let values2 = {
                    x: DIMXS[i],
                    y: getyvalue(calc_value[1], i)
                }
                window.data_points2.push(values2);
            }
        }
    } else if(searchParams.get('independent') == 3){
        let REPS = searchParams.get('globalListOfItems').split(',');
        window.max_pos = REPS.length;
        const rep_value = REPS[window.current_pos];

        document.x_title = "Repetitions";
        for(let i = 0; i < REPS.length; i++){
            let max = 0;
            if(REPS[i] > max) window.data_points_max = REPS[i];
            let values1 = {
                x: REPS[i],
                y: getyvalue(calc_value[0],i)
            }
            window.data_points1.push(values1);
            if(calc_value[1] > 0) {
                let values2 = {
                    x: REPS[i],
                    y: getyvalue(calc_value[1], i)
                }
                window.data_points2.push(values2);
            }
        }

    } else {
        console.log("INVALID INDEPENDENT VALUE: ", independent_value);
    }

}

function getyvalue(calc_value,rep){
    console.log("CALC_VALUE: ",calc_value);
    if(calc_value == 1){ //total point drops in a given run.
        return window.totalPaintDrops[rep][1];

    } else if(calc_value == 2){
        return window.color1_drops[rep][1];

    } else if(calc_value == 3){
        return window.color2_drops[rep][1];

    } else if(calc_value == 4){
        return window.color3_drops[rep][1];

    } else if(calc_value == 5){
        return window.maxPaintDrops[rep][2]; //max max

    } else if(calc_value == 6){
        return window.averagePaintDrops[rep][0]; //min average
    }
}


//This needs to be fixed:
function getTotalPaintDrops_rep(){
    let total = 0;
    for (let iterX = 0; iterX < window.x_value; iterX++) {
        for (let iterY = 0; iterY < window.y_value; iterY++) {
            total += tempArrOfColors[iterX][iterY][0];
        }
    }
    console.log("TOTAL function:",total);
    return total;
}

function getMaxPaintDrops_rep(){
    let max = 0;
    for (let iterX = 0; iterX < window.x_value; iterX++) {
        for (let iterY = 0; iterY < window.y_value; iterY++) {
            if(max < tempArrOfColors[iterX][iterY][0]) max = tempArrOfColors[iterX][iterY][0];
        }
    }
    return max;
}
function getAveragePaintDrops_rep(){
    console.log("total paint drops",window.totalPaintDrops_rep[window.stage_index_rep]);
    console.log("grid",(window.x_value * window.y_value));
    return (window.totalPaintDrops_rep[window.stage_index_rep] / (window.y_value * window.x_value));
}

function saveAllValues_rep(){
    console.log("TOTAL:",totalPaintDrops_rep);
    window.totalPaintDrops_rep[window.stage_index_rep] = getTotalPaintDrops_rep();
    console.log("MAX:",maxPaintDrops_rep);
    window.maxPaintDrops_rep[window.stage_index_rep] = getMaxPaintDrops_rep();
    console.log("AVG:",averagePaintDrops_rep);
    window.averagePaintDrops_rep[window.stage_index_rep] = getAveragePaintDrops_rep();
    //note color count is updated as it runs.

}
function getMinAvgMax(itemNum){
    let arrOfData = [];
    switch (itemNum) {
        case 1:{
            arrOfData = window.totalPaintDrops_rep;
            break;
        }
        case 2:{
            arrOfData = window.color1_drops_rep;
            break;
        }
        case 3:{
            arrOfData = window.color2_drops_rep;
            break;
        }
        case 4:{
            arrOfData = window.color3_drops_rep;
            break;
        }
        case 5:{
            arrOfData = window.maxPaintDrops_rep;
            break;
        }
        case 6:{
            arrOfData = window.averagePaintDrops_rep;
            break;
        }

    }

    let total = 0;
    let max = 0;
    let min = Number(arrOfData[0]);
    for (let iter = 0; iter < arrOfData.length; iter++) {
        total += arrOfData[iter];
        if(max < arrOfData[iter]) max = arrOfData[iter];
        if(min > arrOfData[iter]) min = arrOfData[iter];
    }
    console.log("grid",(window.x_value * window.y_value));
    console.log("total",total);
    let avg = total/(arrOfData.length); //length of array indicates number of repetitions. ///(window.x_value * window.y_value)*
    console.log("MIN AVG MAX:",[min,avg,max]);
    return [min,avg,max]; //return array of values

}


function saveAllValues_independent(){
    window.totalPaintDrops.push(getMinAvgMax(1));
    window.color1_drops.push(getMinAvgMax(2));
    window.color2_drops.push(getMinAvgMax(3));
    window.color3_drops.push(getMinAvgMax(4));
    window.maxPaintDrops.push(getMinAvgMax(5));
    window.averagePaintDrops.push(getMinAvgMax(6));
}

function validate_selection(){
    var ele = document.getElementsByName('calc_val');

    let index_temp_checked = 0;
    for (let i = 0; i < ele.length; i++) {
        if (ele[i].checked) {
            if(++index_temp_checked > 2) return false;
        }
    }
    if(index_temp_checked == 0) return false;
    return true;
}

function activate_extreme_speed(){
    const display_value = document.getElementById("showspeed");
    const speed = document.getElementById("speed");

    let extreme = 40;
    speed.value = extreme; //maxes out at 10

    display_value.textContent = String(extreme);
    console.log(window.performance.now());
    console.log(1000/extreme, "ms");
    window.delay = 1000/extreme;
}