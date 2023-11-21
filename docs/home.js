var checkAll = [0, 0, 0, 0]; //Acts as a "key" for X-dim, Y-dim, repetitions, and x-values

function confirmInput(){
    let dimX = document.getElementById("dim_x");
    let dimY = document.getElementById("dim_y");
}

function storeOldValue(ele) {
        // Store the current value on focus and on change
        document.previousColorSelected = ele.value;
        console.log("Value stored = ", ele.value);
}

let globalListOfItems = []; //Ascending list of x-values

//Only checks globalListOfItems when button is clicked 
function addItemToList(){
    let listOfItems = document.getElementById("dependentList");
    let input = document.getElementById("numberInput");
    globalListOfItems = globalListOfItems.filter(item => item !== undefined && item !== null && item !== ""); //Deletes null inputs in globalListOfItems array

    let depErr1 = document.getElementById("depErr1"); //Nothing entered
    let depErr4 = document.getElementById("depErr4"); //Input is too small
    let depErr5 = document.getElementById("depErr5"); //Input is too big
    let depErr6 = document.getElementById("depErr6"); //Input smaller than previous input
    
    let inputValueAsNumber = parseInt(input.value);
            
    //If input is correct, push to globalListOfItems, else sho an error message
    if (globalListOfItems.length === 0) {
        if(input.value !== "" && inputValueAsNumber >= 0 && inputValueAsNumber <= 99) {
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
            if(inputValueAsNumber < 0) {
                showMessage(depErr4);
            }
            else {
                hideMessage(depErr4); 
            }
            if(inputValueAsNumber > 100) {
                showMessage(depErr5);
            }
            else {
                hideMessage(depErr5); 
            }
        }
    }
    else if (globalListOfItems.length >= 1) {
        if(input.value !== "" && (inputValueAsNumber >= parseInt(globalListOfItems[globalListOfItems.length - 1])) && inputValueAsNumber >= 0 && inputValueAsNumber <= 99) {

            listOfItems.add(new Option(input.value, input.value), undefined);
            globalListOfItems.push(input.value);
            if (globalListOfItems.length > 3 || globalListOfItems.length < 12) {
                checkAll[3] = 1; 
                change();}
        }
        else {
            checkAll[3] = 0;
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

            if(inputValueAsNumber < 0) {
                showMessage(depErr4);
            }
            else {
                hideMessage(depErr4); 
            }
            if(inputValueAsNumber > 100) {
                showMessage(depErr5);
            }
            else {
                hideMessage(depErr5); 
            }
        }
    }
    document.getElementById("globalListOfItemsInput").value = globalListOfItems.join(",");
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

function checkDimX() {
    let input = document.getElementById("dim_x");
    let err1 = document.getElementById("dimXErr1");
    let err2 = document.getElementById("dimXErr2");
    let err3 = document.getElementById("dimXErr3");
    if (input) {
        
        if (input.value === "") {
            showMessage(err1);
        } else {
            hideMessage(err1);
        }
        if (input.value < 0) {
            showMessage(err2);
        } else {
            hideMessage(err2);
        }
        if (input.value > 40) {
            showMessage(err3);
        } else {
            hideMessage(err3);
        }
        if (input.value > 0 && input.value !== "" && input.value < 40) {
            checkAll[0] = 1;
        } else {
            checkAll[0] = 0;
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
        if (input.value < 0) {
            showMessage(err2);
        } else {
            hideMessage(err2);
        }
        if (input.value > 40) {
            showMessage(err3);
        } else {
            hideMessage(err3);
        }
        if (input.value > 0 && input.value !== "" && input.value < 40) {
            checkAll[1] = 1;
        } else {
            checkAll[1] = 0;
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
        if (input.value < 0) {
            showMessage(err2);
        } else {
            hideMessage(err2);
        }
        if (input.value > 40) {
            showMessage(err3);
        } else {
            hideMessage(err3);
        }
        if (input.value > 0 && input.value !== "" && input.value < 40) {
            checkAll[2] = 1;
        } else {
            checkAll[2] = 0;
        }
    }
}

function change() {
    let depErr2 = document.getElementById("depErr2"); //Too few items
    let depErr3 = document.getElementById("depErr3"); //Too many items
    let depErr6 = document.getElementById("depErr6"); //Input smaller than previous input
    let input = document.getElementById("numberInput");
    let inputValueAsNumber = parseInt(input.value);
    if (inputValueAsNumber >= parseInt(globalListOfItems[globalListOfItems.length - 1])){
        hideMessage(depErr6);
    }
            
    if(globalListOfItems.length < 4) {
        showMessage(depErr2);
    } 
    else {
        hideMessage(depErr2); 
    }
    if(globalListOfItems.length > 12) {
        showMessage(depErr3);
    } 
    else {
        hideMessage(depErr3); 
    }
    let checkThis = [1, 1, 1, 1];
    if (globalListOfItems.length < 4 || globalListOfItems.length > 12) {
        checkAll[3] = 0;
    } else {
        checkAll[3] = 1;
    }
    //document.getElementById("depErr7").textContent = globalListOfItems.length; 
    if(arraysEqual(checkAll, checkThis)) {
        document.getElementById("submit").disabled = false;
    }
    else {
        document.getElementById("submit").disabled = true;
    }
}

 function register()
 {
     document.getElementById("submit").disabled = true;
     document.getElementById("dim_x").onkeyup = checkDimX;
     document.getElementById("dim_y").onkeyup = checkDimY;
     document.getElementById("repetitions").onkeyup = checkRep;
     document.getElementById("myForm").onkeyup = change;
 }
