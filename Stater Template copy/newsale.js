// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
    getFirestore, collection, onSnapshot, addDoc,
     deleteDoc, doc, query, where, orderBy, serverTimestamp,
     getDoc, updateDoc
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBYGfKPwPZ4QbPZT2U6h0OXsIyCd9K-GQM",
  authDomain: "freshslapzapp.firebaseapp.com",
  projectId: "freshslapzapp",
  storageBucket: "freshslapzapp.appspot.com",
  messagingSenderId: "352022399395",
  appId: "1:352022399395:web:794438cde350700f983216"
};

// Initialize Firebase
initializeApp(firebaseConfig);

//init services
const db = getFirestore()

//collection reference
const colOrders = collection(db, 'Orders')

//queries
const q = query(colOrders, orderBy('createdAt'))

// real time collection data

    onSnapshot(q, (snapshot) => {
        let Orders = []
        snapshot.docs.forEach((doc) => {
            Orders.push({ ...doc.data(), id: doc.id })
        })
        console.log(Orders)
    })


//adding documents
const addOrderForm = document.querySelector('.add')
addOrderForm.addEventListener('submit', (e) => {
    e.preventDefault()

    addDoc(colOrders, {
        customer: addOrderForm.customer.value,
        IG: addOrderForm.ig.value,
        price: addOrderForm.price.value,
        createdAt: serverTimestamp()
    })
    .then(() =>{
        addOrderForm.reset()
    })

})


//deleting documents
const deleteOrderForm = document.querySelector('.delete')
deleteOrderForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const docRef = doc(db, 'Orders', deleteOrderForm.id.value)

    deleteDoc(docRef)
        .then(() => {
            deleteOrderForm.reset()
        })

})

// get a single document
const docRef = doc(db, 'Orders', 'cx4sHHYC4fiSj04cBOxE')

onSnapshot(docRef, (doc) => {
    console.log(doc.data(), doc.id)
})

//update a document
const updateOrderForm = document.querySelector('.update')
updateOrderForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const docRef = doc(db, 'Orders', updateOrderForm.id.value)

    updateDoc(docRef, {
        price: 'updated price'
    })
    .then(() =>{
        updateOrderForm.reset()
    })
})