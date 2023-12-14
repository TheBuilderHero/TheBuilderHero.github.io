var checkAll = [0, 0, 0, 0]; //Acts as a "key" for X-dim, Y-dim, repetitions, and x-values
//declare empty array to put the options in
let optionsArray = new Array();
function change_music(e) {
    e.preventDefault();
    let elm = e.target;

    //console.log(elm);

    var audio = document.getElementById('backGroundAudio');

    var source = document.getElementById('audio');
    source.src = elm.getAttribute('data-value');

    audio.load(); //call this to just preload the audio without playing
    audio.play(); //call this to play the song right away
    audio.stop();
};

window.addEventListener("load", (event) => {
    //get options from user input and push to array
    optionsArray.push(document.getElementById("option1").value);
    optionsArray.push(document.getElementById("option2").value);
    optionsArray.push(document.getElementById("option3").value);
    optionsArray.push(document.getElementById("option4").value);
    optionsArray.push(document.getElementById("option5").value);
    optionsArray.push(document.getElementById("option6").value);
    optionsArray.push(document.getElementById("option7").value);
    optionsArray.push(document.getElementById("option8").value);
    optionsArray.push(document.getElementById("option9").value);
    //console.log(optionsArray);
});

function confirmInput(){
    //let dimX = document.getElementById("dim_x");
    //let dimY = document.getElementById("dim_y");
}

function storeOldValue(ele) {
        // Store the current value on focus and on change
        document.previousColorSelected = ele.value;
        //console.log("Value stored = ", ele.value);
}

let globalListOfItems = []; //Ascending list of x-values
let indValue = "";

//Only checks globalListOfItems when button is clicked 
function addItemToList(){
    
    let listOfItems = document.getElementById("dependentList");
    let input = document.getElementById("numberInput");
    globalListOfItems = globalListOfItems.filter(item => item !== undefined && item !== null && item !== ""); //Deletes null inputs in globalListOfItems array

    let depErr1 = document.getElementById("depErr1"); //Nothing entered
    let depErr4 = document.getElementById("depErr4"); //Input is too small
    let depErr5 = document.getElementById("depErr5"); //Input is too big
    let depErr8 = document.getElementById("depErr8"); //Input is too big for dimensions
    let depErr6 = document.getElementById("depErr6"); //Input smaller than previous input
    let tooBigErr;
    
    let inputValueAsNumber = parseInt(input.value);
            
    let maxNum = 40;
    
    if(indValue === "1" || indValue === "2") {
        maxNum = 40;
        tooBigErr  = document.getElementById("depErr8"); //Input is too big 40
    }
    else {
        maxNum = 99;
        tooBigErr  = document.getElementById("depErr5"); //Input is too big 99
    }
    //If input is correct, push to globalListOfItems, else sho an error message
    if (globalListOfItems.length === 0) {
        if(input.value !== "" && inputValueAsNumber >= 0 && inputValueAsNumber <= maxNum) {
            listOfItems.add(new Option(input.value, input.value), undefined);
            globalListOfItems.push(input.value);
        }
        else {
            if(input.value === "") {
                showMessage(depErr1);
            } 
            else {
                hideMessage(depErr1); 
            }
            if(inputValueAsNumber < 1) {
                showMessage(depErr4);
            }
            else {
                hideMessage(depErr4); 
            }
            if(inputValueAsNumber > maxNum) {
                showMessage(tooBigErr);
            }
            else {
                hideMessage(tooBigErr); 
            }
        }
    }
    else if (globalListOfItems.length >= 1) {
        if(input.value !== "" && (inputValueAsNumber >= parseInt(globalListOfItems[globalListOfItems.length - 1])) && inputValueAsNumber >= 0 && inputValueAsNumber <= maxNum) {

            listOfItems.add(new Option(input.value, input.value), undefined);
            globalListOfItems.push(input.value);
            if (globalListOfItems.length > 4 || globalListOfItems.length < 12) {
                //checkAll[0] = 1; 
                change();
            }
        }
        else {
            //checkAll[0] = 0;
            change();
            if(input.value === "") {
                showMessage(depErr1);
            } 
            else {
                hideMessage(depErr1); 
            }
            if (inputValueAsNumber < parseFloat(globalListOfItems[globalListOfItems.length - 1])){
                showMessage(depErr6);
                //document.getElementById("depErr7").textContent = globalListOfItems; //For Testing!
            } 
            else if (inputValueAsNumber >= parseFloat(globalListOfItems[globalListOfItems.length - 1])) {
                hideMessage(depErr6);
            }

            if(inputValueAsNumber < 1) {
                showMessage(depErr4);
            }
            else {
                hideMessage(depErr4); 
            }
            if(inputValueAsNumber > maxNum) {
                showMessage(tooBigErr);
            }
            else {
                hideMessage(tooBigErr); 
            }
        }
    }
    //hideMessage(depErr5);
    //hideMessage(depErr8); 
    document.getElementById("globalListOfItemsInput").value = globalListOfItems.join(",");
    input.value = ""; //finish by resetting value of input feild.
}

function removeItemFromList(){
    let listOfItems = document.getElementById("dependentList");
    
    let selectedOptions = $('option:selected', listOfItems);

    // Remove selected items from globalListofItems
    for (let i = 0; i < selectedOptions.length; i++) {
        let removedValue = selectedOptions[i].value;
        let indexToRemove = globalListOfItems.indexOf(removedValue);
        if (indexToRemove !== -1) {
            globalListOfItems.splice(indexToRemove, 1);
        }
    }

    // Remove selected items from dependentList
    selectedOptions.remove();

    change();
    document.getElementById("globalListOfItemsInput").value = globalListOfItems.join(",");
    
    //Checks the length of globalListOfItems when items are deleted
    if (globalListOfItems.length < 3 || globalListOfItems.length > 12) {
        checkAll[0] = 0;
        input.required = true;
    } else {
        checkAll[0] = 1;
        input.required = false;
    }
}


function updateOtherLists(ele){ //passed in the element that called the function
    let selectBox1 = document.getElementById("color1");
    let selectBox2 = document.getElementById("color2");
    let selectBox3 = document.getElementById("color3");
    if(selectBox1.id === ele.id){
        let lastValue = document.previousColorSelected;
        removeSelected(selectBox2, selectBox1.value);
        removeSelected(selectBox3, selectBox1.value);
        if(document.previousColorSelected != ""){
            selectBox2.append(new Option(document.previousColorSelected, document.previousColorSelected), undefined);
            selectBox3.append(new Option(document.previousColorSelected, document.previousColorSelected), undefined);
        }
    }
    if(selectBox2.id === ele.id){
        removeSelected(selectBox1, selectBox2.value);
        removeSelected(selectBox3, selectBox2.value);
        if(document.previousColorSelected != ""){
            selectBox1.append(new Option(document.previousColorSelected, document.previousColorSelected), undefined);
            selectBox3.append(new Option(document.previousColorSelected, document.previousColorSelected), undefined);
        }
    }
    if(selectBox3.id === ele.id){
        removeSelected(selectBox1, selectBox3.value);
        removeSelected(selectBox2, selectBox3.value);
        if(document.previousColorSelected != ""){
            selectBox1.append(new Option(document.previousColorSelected, document.previousColorSelected), undefined);
            selectBox2.append(new Option(document.previousColorSelected, document.previousColorSelected), undefined);
        }
    }
}

function show_inputs_dependent(ele){
    let independ1 = document.getElementById("independent1");
    let independ2 = document.getElementById("independent2");
    let independ3 = document.getElementById("independent3");
    const r_label = document.getElementById('repetitions_label');
    const r = document.getElementById('repetitions');
    const dim_y = document.getElementById('dim_y');
    const dim_y_label = document.getElementById('dim_y_label');
    const dim_x = document.getElementById('dim_x');
    const dim_x_label = document.getElementById('dim_x_label');
    const dim_xy = document.getElementById('dim_Y_X');
    const dim_xy_label = document.getElementById('dim_Y_X_label');
    
    let depErr1 = document.getElementById("depErr1"); //Nothing entered
    let depErr4 = document.getElementById("depErr4"); //Input is too small
    let depErr5 = document.getElementById("depErr5"); //Input is too big
    let depErr8 = document.getElementById("depErr8"); //Input is too big for dimensions
    let depErr6 = document.getElementById("depErr6"); //Input smaller than previous input

    var ind = document.querySelector('input[name="independent"]:checked').value;
    let listOfItems = document.getElementById("dependentList");
    hideMessage(depErr1);
    hideMessage(depErr4);
    hideMessage(depErr5);
    hideMessage(depErr8);
    hideMessage(depErr6);
    
    indValue = ind;
    
    globalListOfItems = [];
    listOfItems.innerHTML = "";
    
    if (indValue === "1") {
        checkAll[1] = 0;
        checkAll[2] = 1;
        checkAll[3] = 1;
        
        hideMessage(document.getElementById("dimYErr1"));
        hideMessage(document.getElementById("dimYErr2"));
        hideMessage(document.getElementById("dimYErr3"));
        
        hideMessage(document.getElementById("dimY_XErr1"));
        hideMessage(document.getElementById("dimY_XErr1"));
        hideMessage(document.getElementById("dimY_XErr1"));
    }
    if (indValue === "2") {
        checkAll[1] = 0;
        checkAll[2] = 0;
        checkAll[3] = 1;
        
        hideMessage(document.getElementById("dimY_XErr1"));
        hideMessage(document.getElementById("dimY_XErr1"));
        hideMessage(document.getElementById("dimY_XErr1"));
    }
    if (indValue === "3") {
        checkAll[1] = 1;
        checkAll[2] = 1;
        checkAll[3] = 0;
        
        hideMessage(document.getElementById("dimYErr1"));
        hideMessage(document.getElementById("dimYErr2"));
        hideMessage(document.getElementById("dimYErr3"));
        
        hideMessage(document.getElementById("repErr1"));
        hideMessage(document.getElementById("repErr2"));
        hideMessage(document.getElementById("repErr3"));
    }
    
    //let err = document.getElementById("depErr7");
    //err.innerHTML = checkAll;

    if(independ1.id === ele.id){
        r.required = true;
        dim_xy.required = false;
        dim_xy.value = "";
        dim_y.required = false;
        dim_y.value = "";
        r_label.style.display = 'flex';
        r.style.display = 'flex';
        dim_xy.style.display = 'none';
        dim_xy_label.style.display = 'none';
        dim_y.style.display = 'none';
        dim_y_label.style.display = 'none';
    }
    if(independ2.id === ele.id){
        r.required = true;
        dim_y.required = true;
        dim_xy.required = false;
        dim_xy.value = "";
        r_label.style.display = 'flex';
        r.style.display = 'flex';
        dim_y.style.display = 'flex';
        dim_y_label.style.display = 'flex';
        dim_xy.style.display = 'none';
        dim_xy_label.style.display = 'none';
    }
    if(independ3.id === ele.id){
        r.required = false;
        r.value = "";
        dim_y.required = false;
        dim_y.value = "";
        dim_xy.required = true;
        dim_xy.style.display = 'flex';
        dim_xy_label.style.display = 'flex';
        r.style.display = 'none';
        r_label.style.display = 'none';
        dim_y.style.display = 'none';
        dim_y_label.style.display = 'none';
    }

}

function removeSelected(selectBox,item) {
    for (let i = 0; selectBox.options.length > i; i++) {
        if(selectBox.options[i].value === item) selectBox.remove(i);
    }
}
function removeAllExcludingSelected(selectBox) {
    for (let i = 0; selectBox.options.length > i; i++) {
        if(!selectBox.options[i].selected) selectBox.remove(i);
    }
}

function arraysEqual(a, b) {
    if (a === b) return true;
    if (a === null || b === null) return false;
    if (a.length !== b.length) return false;

    for (let i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

function showMessage(id) {
    id.classList.remove("hide");
    id.classList.add("show");
}

function hideMessage(id) {
    id.classList.remove("show");
    id.classList.add("hide");
}

function change() {
    //let err = document.getElementById("depErr7");
    //err.innerHTML = checkAll;
    
    let depErr2 = document.getElementById("depErr2"); //Too few items
    let depErr3 = document.getElementById("depErr3"); //Too many items
    let depErr6 = document.getElementById("depErr6"); //Input smaller than previous input
    let input = document.getElementById("numberInput");
    let inputValueAsNumber = parseInt(input.value);
    if (inputValueAsNumber >= parseInt(globalListOfItems[globalListOfItems.length - 1])){
        hideMessage(depErr6);
        input.required = false;
    }
            
    if(globalListOfItems.length < 4) {
        showMessage(depErr2);
        input.required = true;
    } 
    else {
        hideMessage(depErr2);
        input.required = false;
    }
    if(globalListOfItems.length > 12) {
        showMessage(depErr3);
        input.required = true;
    } 
    else {
        hideMessage(depErr3);
        input.required = false;
    }
    let checkThis = [1, 1, 1, 1];
    
    if (globalListOfItems.length < 3 || globalListOfItems.length > 12) {
        checkAll[0] = 0;
        input.required = true;
    } else {
        checkAll[0] = 1;
        input.required = false;
    }
    
    //document.getElementById("depErr7").textContent = checkAll;
    console.log(checkAll);
    if(arraysEqual(checkAll, checkThis)) {
        document.getElementById("submit").disabled = false;
        return true;
    }
    //else {
        //document.getElementById("submit").disabled = true;
    //    return false;
    //}
    return false;
}

 function register()
 {
     //document.getElementById("submit").disabled = false;
     //document.getElementById("dim_y").oninput = checkDimY;
     //document.getElementById("repetitions").oninput = checkRep;
     //document.getElementById("dim_Y_X").oninput = checkDimXY;
     document.getElementById("repetitions").addEventListener("input", checkRep);
     document.getElementById("dim_y").addEventListener("input", checkDimY);
     document.getElementById("dim_Y_X").addEventListener("input", checkDimXY);
     document.getElementById("myForm").oninput = change;
 }
 
 function checkDimXY() {
    let input = document.getElementById("dim_Y_X");
    let err1 = document.getElementById("dimY_XErr1");
    let err2 = document.getElementById("dimY_XErr2");
    let err3 = document.getElementById("dimY_XErr3");
    if (input) {
        
        if (input.value === "") {
            showMessage(err1);
        } else {
            hideMessage(err1);
        }
        if (input.value < 1) {
            showMessage(err2);
        } else {
            hideMessage(err2);
        }
        if (input.value > 40) {
            showMessage(err3);
        } else {
            hideMessage(err3);
        }
        if (input.value > 0 && input.value < 40) {
            checkAll[3] = 1;
        } else {
            checkAll[3] = 0;
        }
    }
 }

function checkDimY() {
    let input = document.getElementById("dim_y");
    let err1 = document.getElementById("dimYErr1");
    let err2 = document.getElementById("dimYErr2");
    let err3 = document.getElementById("dimYErr3");
    if (input) {
        
        if (input.value === "") {
            showMessage(err1);
        } else {
            hideMessage(err1);
        }
        if (input.value < 1) {
            showMessage(err2);
        } else {
            hideMessage(err2);
        }
        if (input.value > 40) {
            showMessage(err3);
        } else {
            hideMessage(err3);
        }
        if (input.value > 0 && input.value < 40) {
            checkAll[2] = 1;
        } else {
            checkAll[2] = 0;
        }
    }
}

function checkRep() {
    
    let input = document.getElementById("repetitions");
    let err1 = document.getElementById("repErr1");
    let err2 = document.getElementById("repErr2");
    let err3 = document.getElementById("repErr3");
    if (input) {
        
        if (input.value === "") {
            showMessage(err1);
        } else {
            hideMessage(err1);
        }
        if (input.value < 1) {
            showMessage(err2);
        } else {
            hideMessage(err2);
        }
        if (input.value > 99) {
            showMessage(err3);
        } else {
            hideMessage(err3);
        }
        if (input.value > 0 && input.value !== "" && input.value < 99) {
            checkAll[1] = 1;
        } else {
            checkAll[1] = 0;
        }

    }
}

 //button is always active only deactivate when all values are not correct.
function submitCheck() {
    
    if(indValue === "1")
    {
        checkRep();
    }
    if(indValue === "2")
    {
        checkDimY();
        checkRep();
    }
    if(indValue === "3")
    {
        checkDimXY();
    }
    //checkDimX();
    //checkDimY();
    //BYPASSING DIMX AND DIMY:
    //checkAll[0] = 1;
    //checkAll[1] = 1;
    //checkRep();
    let did_enter_numbers_list = change();
    let checkThis = [1, 1, 1, 1];
    console.log(did_enter_numbers_list);
    if(arraysEqual(checkAll, checkThis) && did_enter_numbers_list) {
        console.log(did_enter_numbers_list);
        return true;
    }
    
    // do what you want
    return false;
}

function setDimY_X(){
    let input_y = document.getElementById("dim_y");
    let input_x = document.getElementById("dim_x");
    let input_xy = document.getElementById("dim_Y_X");
    input_y.value = input_xy.value;
    input_x.value = input_xy.value;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max)+1;
}
function three_color_picker(colorItems) {
    //function for checking for empty user input boxes
    function checkBoxLength (stringLength) {
        return stringLength.length != "";
    }

    //function to remove empty user input boxes
    let options = optionsArray;
    let valueChoice = new Array();

    for (let element in colorItems) {

        //randomise number to be used to select array index position
        let optionsRan = 0;
        let i = 0;
        do {
            optionsRan = Math.floor(Math.random() * options.length)+1;
            if(i++ > 1000) return;
        } while (valueChoice.includes(optionsRan));
        valueChoice.push(optionsRan);

        //alert the user to the option that the function has selected
        //console.log("Value selected", optionsRan);
        //console.log("element: ", element);
        if (optionsRan === 0) {
            document.getElementById(element).selectedIndex = 0;
        } else if (optionsRan === 1) {
            document.getElementById(element).selectedIndex = 1;
        } else if (optionsRan === 2) {
            document.getElementById(element).selectedIndex = 2;
        } else if (optionsRan === 3) {
            document.getElementById(element).selectedIndex = 3;
        } else if (optionsRan === 4) {
            document.getElementById(element).selectedIndex = 4;
        } else if (optionsRan === 5) {
            document.getElementById(element).selectedIndex = 5;
        } else if (optionsRan === 6) {
            document.getElementById(element).selectedIndex = 6;
        } else if (optionsRan === 7) {
            document.getElementById(element).selectedIndex = 7;
        } else if (optionsRan === 8) {
            document.getElementById(element).selectedIndex = 8;
        } else if (optionsRan === 9) {
            document.getElementById(element).selectedIndex = 9;
        } else {
            alert("D'oh!");
        }
    }

}


function clearSelectList(){
    let listOfItems = document.getElementById("dependentList");
    //clear select box:
    let i, L = listOfItems.options.length - 1;
    for(i = L; i >= 0; i--) {
        listOfItems.remove(i);
    }
    globalListOfItems = []; //reset to null.
}

function randomize_inputs(){

    //clear all list options
    clearSelectList();

    //set random value for independent:
    let independ1 = document.getElementById("independent1");
    let independ2 = document.getElementById("independent2");
    let independ3 = document.getElementById("independent3");
    switch (getRandomInt(3)){
        case 1:{
            independ1.checked = true;
            show_inputs_dependent(independ1);
            independ2.checked = false;
            independ3.checked = false;
            let reps = document.getElementById("repetitions");
            reps.value = getRandomInt(99);

            //numbers in list:
            let input = document.getElementById("numberInput");
            let dim_value_list = getRandomInt(5);
            input.value = dim_value_list;
            addItemToList();
            input.value = dim_value_list*2;
            addItemToList();
            input.value = dim_value_list*2*2;
            addItemToList();
            input.value = dim_value_list*2*2*2;
            addItemToList();
            input.value = "";

            break;
        }
        case 2:{
            independ2.checked = true;
            show_inputs_dependent(independ2);
            independ1.checked = false;
            independ3.checked = false;

            //set repetitions
            let reps = document.getElementById("repetitions");
            reps.value = getRandomInt(99);

            //numbers in list:
            let input = document.getElementById("numberInput");
            let dim_value_list = getRandomInt(5);
            input.value = dim_value_list;
            addItemToList();
            input.value = dim_value_list*2;
            addItemToList();
            input.value = dim_value_list*2*2;
            addItemToList();
            input.value = dim_value_list*2*2*2;
            addItemToList();
            input.value = "";

            //set random value for dimension:
            let input_y = document.getElementById("dim_y");
            input_y.value = getRandomInt(40);
            break;
        }
        case 3:{
            independ3.checked = true;
            show_inputs_dependent(independ3);
            independ2.checked = false;
            independ1.checked = false;

            //numbers in list (repetitions):
            let input = document.getElementById("numberInput");
            let rep_value_list = getRandomInt(10);
            input.value = rep_value_list;
            addItemToList();
            input.value = rep_value_list*2;
            addItemToList();
            input.value = rep_value_list*2*2;
            addItemToList();
            input.value = rep_value_list*2*2*2;
            addItemToList();
            input.value = "";

            //set random value for dimension:
            let input_xy = document.getElementById("dim_Y_X");
            input_xy.value = getRandomInt(40);
            break;
        }
    }

    //*
    //color choice:
    let color1 = document.getElementById("color1");
    let color2 = document.getElementById("color2");
    let color3 = document.getElementById("color3");
    three_color_picker({color1,color2,color3});
    //*/
    //select termination option:
    let termItem1 = document.getElementById("termItem1");
    let termItem2 = document.getElementById("termItem2");
    let termItem3 = document.getElementById("termItem3");
    let termChoice = getRandomInt(3);
    if(termChoice === 1){
        termItem1.checked = true;
    } else if(termChoice === 2){
        termItem2.checked = true;
    } else {
        termItem3.checked = true;
    }


    //select music option:
    let musicItem1 = document.getElementById("song1");
    let musicItem2 = document.getElementById("song2");
    let musicItem3 = document.getElementById("song3");
    let musicItem4 = document.getElementById("song4");
    let musicItem5 = document.getElementById("song5");
    let musicItem6 = document.getElementById("song6");
    let musicChoice = getRandomInt(6);
    if(musicChoice === 1){
        musicItem1.checked = true;
    } else if(musicChoice === 2){
        musicItem2.checked = true;
    } else if(musicChoice === 3){
        musicItem3.checked = true;
    } else if(musicChoice === 4){
        musicItem4.checked = true;
    } else if(musicChoice === 5){
        musicItem5.checked = true;
    }else {
        musicItem6.checked = true;
    }

}
