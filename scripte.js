//the inputs's project
let title = document.getElementById("title");
let price = document.getElementById("price");
let tax = document.getElementById("tax");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let count = document.getElementById("count");
let totale = document.getElementById("totale");
let category = document.getElementById("categpory");
let submit = document.getElementById("submit");
let mood='create'
let temp;
//get totale
function getTotale() {
if (price.value != '') {
    let totall = (+price.value + +tax.value + +ads.value) - +discount.value;
    totale.innerHTML = totall;
    totale.style.backgroundColor = "#040";

} else {
    totale.innerHTML = '';
    totale.style.backgroundColor = '#81100F';

}

}
//create product
let dataPro;
dataPro = [];
if (localStorage.NewProducts != null) {
    dataPro = JSON.parse(localStorage.getItem('NewProducts'));
    // dataPro = JSON.parse(localStorage.NewProducts);
} else {
    dataPro = [];
}
//create new product
submit.onclick = function() {
    let newProd = {
            title: title.value.toLowerCase(),
            price: price.value,
            tax: tax.value,
            ads: ads.value,
            discount: discount.value,
            totale: totale.innerHTML,
            count: count.value,
            category: category.value.toLowerCase(),
        }
        //count to create n products at the same time
if(title.value !=''&& price.value!=''){
    if(count.value<=300){
        if(mood=== 'create'){
            if(count.value>1){
                for(let i=0 ;i<count.value;i++){
                    //save data in localStorage
                    dataPro.push(newProd); 
                }
            }else{  
                //save data in localStorage
                dataPro.push(newProd);
            }
        }else {
            dataPro.splice(temp,1,newProd); // or  dataPro[temp]=newProd;
            submit.innerHTML='Create'
            count.style.display='flex'
            mood='create';
        }
        clearData();
    }else{
        alert('You can\'t create more than 300Products')
    }
}else{
    alert("Product Title (or Price) can not be Empty!!!")
}
        localStorage.setItem("NewProducts", JSON.stringify(dataPro));
        //display data in the table
        ShowDataInTable();
        //clear data 

}

// clear inputs after create button clicking 
function clearData() {
title.value = '';
price.value = '';
tax.value = '';
ads.value = '';
discount.value = '';
totale.innerHTML = '';
count.value = '';
category.value = '';
totale.style.backgroundColor = '#81100F';
}

// red from the table
function ShowDataInTable() {
    let table = '';
    for (let i = 0; i < dataPro.length; i++) {
        table += `
        <tr>
        <td>${i+1}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].tax}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].totale}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick=updateData(${i}) id="update">Update</button></td>
        <td><button onclick=deleteData(${i}) id="delete">Delete</button></td>
        </tr>`
    }
    document.getElementById("tbody").innerHTML = table;
    let deleteAll = document.getElementById("deletAll");
    let butt = document.createElement('button');
    let text = document.createTextNode("Delete All");
    if (dataPro.length > 0) {
        deleteAll.innerHTML = ` <button onclick="delete_All()" id="delete">Delete All (${dataPro.length})</button>`
    } else {
        deleteAll.innerHTML = '';
    } 
}

ShowDataInTable();
// deleting products
function deleteData(i) {
    dataPro.splice(i, 1);
    localStorage.NewProducts = JSON.stringify(dataPro);
    ShowDataInTable();
}
//deleting all  prod
function delete_All() {
    localStorage.clear();
    dataPro.splice(0)
    ShowDataInTable();
} 
//update products infos
function updateData (i){
    mood='update'
    temp=i;
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    tax.value = dataPro[i].tax;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    totale.innerHTML = dataPro[i].totale;
    count.style.display='none'
    category.value = dataPro[i].category;
    totale.style.backgroundColor = '#040';
    console.log(dataPro[i].category);
    submit.innerHTML='Update'
    scroll({
        top:0,
        behavior:'smooth'
    })

}
//search By what (title,category)
let searching =document.getElementById('searching');
let searchMode='title';

function getSearchMode(id){
    if ( id == 'byTitle'){
        searchMode='title';
    }else{
        searchMode='category';
    }
    searching.placeholder='Search By '+searchMode;
    searching.focus();
    searching.value='';
    ShowDataInTable();
}
//search data
function searchData(value){
let  table='';
for(let i =0;i<dataPro.length;i++){
    if(searchMode=='title'){
        if(dataPro[i].title.includes(value.toLowerCase())){
            table += `
            <tr>
            <td>${i+1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].tax}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].totale}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick=updateData(${i}) id="update">Update</button></td>
            <td><button onclick=deleteData(${i}) id="delete">Delete</button></td>
            </tr>`
        }
    }else{
        if(dataPro[i].category.includes(value.toLowerCase())){
            table += `
            <tr>
            <td>${i+1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].tax}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].totale}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick=updateData(${i}) id="update">Update</button></td>
            <td><button onclick=deleteData(${i}) id="delete">Delete</button></td>
            </tr>`
        }
    }
}
document.getElementById("tbody").innerHTML = table;

}


//clean data