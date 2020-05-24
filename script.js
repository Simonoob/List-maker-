//selectors
const itemInput=document.querySelector(".item-input");
const itemButton=document.querySelector(".item-button");
const list=document.querySelector(".list");
const filterOption=document.querySelector("#filter-items");

//events
itemButton.addEventListener("click",addItem);
list.addEventListener("click", deletecheck);
filterOption.addEventListener("click",filterItems);
document.addEventListener("DOMContentLoaded",getItems);

//functions
function addItem(event){
    //prevent from refreshing the page
    event.preventDefault();

    if (itemInput.value!== ""){

    console.log(`${itemInput.value} added to the list`);
    
    //creating list and appending the input to it
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("item");
    const newItem = document.createElement("li");
    newItem.innerText=itemInput.value;
    newItem.classList.add("item-value");
    itemDiv.appendChild(newItem);
    
    //crating and appending the buttons
    const checkedButton = document.createElement("button");
    checkedButton.classList.add("checked-btn");
    checkedButton.innerHTML=`<i class="fas fa-check"></i>`;
    itemDiv.appendChild(checkedButton);

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-btn");
    deleteButton.innerHTML=`<i class="far fa-trash-alt"></i>`;
    itemDiv.appendChild(deleteButton);

    //appending item to the list
    list.appendChild(itemDiv);
    //add the item to localStorage
    saveLocalList(itemInput.value);
    }

    itemInput.value="";
}

function deletecheck(event){
    const item = event.target;
    if (item.classList[0]==="delete-btn"){
        const target = item.parentElement;
        target.classList.add("fall");
        target.addEventListener("transitionend", function(){
            target.remove();
        });
        removeFromLocalStorage(target);
    }

    else if (item.classList[0]==="checked-btn"){
        const target = item.parentElement;
        target.classList.toggle("checked");
        console.log(target);
    }
}

function filterItems(event){
    const items = list.childNodes;
    items.forEach(function(item) {
        switch(event.target.value){
            case "All":
                item.style.display = "flex";
                break;

            case "Bought":
                if(item.classList.contains("checked")){
                    item.style.display = "flex";
                }
                else{
                    item.style.display = "none";
                }
                break;
            
                case "To buy":
                    if(!item.classList.contains("checked")){
                        item.style.display = "flex";
                    }
                    else{
                        item.style.display = "none";
                    }
                    break;
        }
    });
}

function saveLocalList(item){
    //checking for local data
    let items;
    if(localStorage.getItem("items") === null){
        items = [];
    }
    else{
        items = JSON.parse(localStorage.getItem("items"));
    }
    items.push(item);
    localStorage.setItem("items",JSON.stringify(items));
}

function getItems(){
    let items;
    if(localStorage.getItem("items") === null){
        items = [];
        const welcome = document.querySelector("h1");
        welcome.innerText="Welcome\nCreate a new list";
        welcome.style.fontSize="1.7rem";
        welcome.style.padding=" 1rem 0";
        welcome.style.lineHeight="1.5";
    }
    else{
        items = JSON.parse(localStorage.getItem("items"));
        const welcome = document.querySelector("h1");
        welcome.innerText="Welcome back\nHere's what you had last time";
        welcome.style.fontSize="1.5rem";
        welcome.style.padding=" 1rem 0";
        welcome.style.lineHeight="1.5";
    }
    items.forEach(function(item){
       //creating list and appending the input to it
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("item");
    const newItem = document.createElement("li");
    newItem.innerText=item;
    newItem.classList.add("item-value");
    itemDiv.appendChild(newItem);
    
    //crating and appending the buttons
    const checkedButton = document.createElement("button");
    checkedButton.classList.add("checked-btn");
    checkedButton.innerHTML=`<i class="fas fa-check"></i>`;
    itemDiv.appendChild(checkedButton);

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-btn");
    deleteButton.innerHTML=`<i class="far fa-trash-alt"></i>`;
    itemDiv.appendChild(deleteButton);

    //appending item to the list
    list.appendChild(itemDiv); 
    });
}

function removeFromLocalStorage(item){
     //checking for local data
     let items;
     if(localStorage.getItem("items") === null){
         items = [];
     }
     else{
         items = JSON.parse(localStorage.getItem("items"));
     }
    
     const itemText = item.children[0].innerText;
     items.splice(items.indexOf(itemText),1);
     localStorage.setItem("items",JSON.stringify(items));

}