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

        var enterID = document.querySelector("#enterID");
        var enterName = document.querySelector("#enterName");
        var enterAge = document.querySelector("#enterAge");
        var findID = document.querySelector("#findID");
        var findName = document.querySelector("#findName");
        var findAge = document.querySelector("#findAge");
      

        var insertBtn = document.querySelector("#insert");
        var updateBtn = document.querySelector("#update");
        var removeBtn = document.querySelector("#remove");
        var findBtn = document.querySelector("#find");

        function InsertData() {
            set(ref(db, "People/"+ enterID.value),{
                Name: enterName.value,
                ID: enterID.value,
                Age: enterAge.value
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

            get(child(dbref, "People/" + findID.value))
            .then((snapshot)=>{
                if(snapshot.exists()){
                    findName.innerHTML = "Name: " + snapshot.val().Name;
                    findAge.innerHTML = "Age: " + snapshot.val().Age;
                } else {
                    alert("No data found");
                }
            })
            .catch((error)=>{
                alert(error)
            })
            
        }

        function UpdateData(){
            update(ref(db, "People/"+ enterID.value),{
                Name: enterName.value,
                Age: enterAge.value
            })
            .then(()=>{
                alert("Data updated successfully");
            })
            .catch((error)=>{
                alert(error);
            });
        }

        function RemoveData(){
            remove(ref(db, "People/"+ enterID.value))
            .then(()=>{
                alert("Data deleted successfully");
            })
            .catch((error)=>{
                alert(error);
            });
        }

        insertBtn.addEventListener('click', InsertData);
        updateBtn.addEventListener('click', UpdateData);
        removeBtn.addEventListener('click', RemoveData);
        findBtn.addEventListener('click', FindData);