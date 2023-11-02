function confirmInput(){
    let dimX = document.getElementById("dim_x");
    let dimY = document.getElementById("dim_y");
    //dimX.value = document.getElementById("dim_x").value;

}

function storeOldValue(ele) {
        // Store the current value on focus and on change
        document.previousColorSelected = ele.value;
        console.log("Value stored = ", ele.value);
}

function addItemToList(){
    let listOfItems = document.getElementById("dependentList");
    let input = document.getElementById("numberInput");
    listOfItems.append(new Option(input.value, input.value), undefined);
}

function removeItemFromList(){
    let listOfItems = document.getElementById("dependentList");
    $('option:selected', listOfItems).remove();
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