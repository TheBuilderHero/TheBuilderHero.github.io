function draw() {
    const ctx = document.getElementById("canvas").getContext("2d");
    var x = document.getElementById("l_x").value;
    var y = document.getElementById("l_y").value;
    console.log(x);
    console.log(y);
    if(x>0 && x< 39 && y>0 && y < 39){
        for (let i = 0; i < y; i++) {
            for (let j = 0; j < x; j++) {
                ctx.strokeStyle = `rgb(0, 0, 0)`;
                ctx.beginPath();
                ctx.rect(10+10*j,10+10*i,10,10);
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
    if(x>0 && x< 39 && y>0 && y < 39) {
        console.log(x);
        console.log(y);
        ctx.fillStyle = 'rgb(255,0,0)';
        ctx.strokeStyle = `rgb(0, 0, 0)`;
        ctx.fillRect(1+10 * x, 1+10 * y, 8, 8);
    }
}

//draw();