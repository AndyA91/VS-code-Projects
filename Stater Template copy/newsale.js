  // Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCcb2rE1qrR8t-glNVWqoiTEHLfi4loO-o",
    authDomain: "fresh-slapz.firebaseapp.com",
    databaseURL: "https://fresh-slapz-default-rtdb.firebaseio.com",
    projectId: "fresh-slapz",
    storageBucket: "fresh-slapz.appspot.com",
    messagingSenderId: "328737773558",
    appId: "1:328737773558:web:5687f91fbc24f22e7a19d7"
};

  // Initialize Firebase
const app = initializeApp(firebaseConfig);

import {getDatabase, set, get, update, remove, ref, child}
from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"



const db = getDatabase();

        var enterIG = document.querySelector("#enterIG");
        var enterName = document.querySelector("#enterName");
        var enterMaterial = document.querySelector("#enterMaterial");
        var enterQuantity = document.querySelector("#enterQuantity");
        var enterPriceCharged = document.querySelector("#enterPriceCharged");
        var enterDateCreated = document.querySelector("#enterDateCreated");
        var enterReferredBy = document.querySelector("#enterReferredBy");

        var findIG = document.querySelector("#findIG");
        var findName = document.querySelector("#findName");
        var findDateCreated = document.querySelector("#findDateCreated");
      

        var insertBtn = document.querySelector("#insert");
        var updateBtn = document.querySelector("#update");
        var removeBtn = document.querySelector("#remove");
        var findBtn = document.querySelector("#find");

        var table = document.getElementById("dataTable");

        function InsertData() {
            set(ref(db, "Orders/"+ enterName.value),{
                Name: enterName.value,
                IG: enterIG.value,
                Material: enterMaterial.value,
                Quantity: enterQuantity.value,
                TotalPriceCharged: enterPriceCharged.value,
                DateCreated: enterDateCreated.value,
                ReferredBy: enterReferredBy.value
            })
            .then(()=>{
                alert("Data added successfully");
            })
            .catch((error)=>{
                alert(error);
            });
        }

        function FindData() {
            const dbref = ref(db);

            get(child(dbref, "Orders/" + findName.value))
            .then((snapshot)=>{
                if(snapshot.exists()){
                    findName.innerHTML = "Name: " + snapshot.val().Name;
                    findDateCreated.innerHTML = "DateCreated: " + snapshot.val().DateCreated;
                } else {
                    alert("No data found");
                }
            })
            .catch((error)=>{
                alert(error)
            })
            
        }

        function UpdateData(){
            update(ref(db, "Orders/"+ enterName.value),{
                Name: enterName.value,
                IG: enterIG.value,
                Material: enterMaterial.value,
                Quantity: enterQuantity.value,
                TotalPriceCharged: enterPriceCharged.value,
                DateCreated: enterDateCreated.value,
                ReferredBy: enterReferredBy.value
            })
            .then(()=>{
                alert("Data updated successfully");
            })
            .catch((error)=>{
                alert(error);
            });
        }

        function RemoveData(){
            remove(ref(db, "Orders/"+ enterName.value))
            .then(()=>{
                alert("Data deleted successfully");
            })
            .catch((error)=>{
                alert(error);
            });
        }

        function SelectAllData(){
            get().ref(db, "Orders/").once('value'),
            function(AllRecords){
                AllRecords.forEach(
                    function(CurrentRecord){
                        var Name = CurrentRecord.val().Name;
                        var DateCreated = CurrentRecord.val().DateCreated;
                        AddItemsToTable(Name,DateCreated)
                    }
                )
            }
        }
        
        window.onload = SelectAllData;

        function AddItemsToTable(){
            var tbody = document.getElementById('tbody1')
            var trow = document.createElement('textarea')
            var td1 = document.createElement('td')
            var td2 = document.createElement('td')
            td1.innerHTML = Name;
            td2.innerHTML = DateCreated;
            trow.appendChild(td1);
            trow.appendChild(td2);
            tbody.appendChild(trow);
        }

        insertBtn.addEventListener('click', InsertData);
        updateBtn.addEventListener('click', UpdateData);
        removeBtn.addEventListener('click', RemoveData);
