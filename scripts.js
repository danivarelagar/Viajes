// scripts.js

// Firebase
    const firebaseConfig = {
        apiKey: "AIzaSyB4SXpaX6EQ3awcB5-zoVl8ZfFKnksFLCc",
        authDomain: "viajes1-169b1.firebaseapp.com",
        projectId: "viajes1-169b1",
        storageBucket: "viajes1-169b1.appspot.com",
        messagingSenderId: "273546634402",
        appId: "1:273546634402:web:a74ebf744ad4f1768da3fb",
        measurementId: "G-5VQJZ0YSJY"
      };
      

// Inicializa Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

document.addEventListener("DOMContentLoaded", function() {
    const cityForm = document.getElementById("cityForm");
    const cityList = document.getElementById("cityList");

    // Lista Eliminar-Visitada
    db.collection("cities").onSnapshot((snapshot) => {
        cityList.innerHTML = "";
        snapshot.forEach((doc) => {
            addCityToList(doc.id, doc.data().cityName, doc.data().countryName, doc.data().bestMonth);
        });
    });

    cityForm.addEventListener("submit", function(event) {
        event.preventDefault();
        addCity();
    });

    function addCity() {
        const cityName = document.getElementById("cityName").value;
        const countryName = document.getElementById("countryName").value;
        const bestMonth = document.getElementById("bestMonth").value;

        db.collection("cities").add({
            cityName: cityName,
            countryName: countryName,
            bestMonth: bestMonth
        }).then(() => {
            cityForm.reset();
        }).catch((error) => {
            console.error("Error adding city: ", error);
        });
    }

    function addCityToList(id, cityName, countryName, bestMonth) {
        const li = document.createElement("li");
        li.innerHTML = `
            <div>
                <strong>${cityName}</strong>, ${countryName} - Mejor mes para visitar: ${bestMonth}
            </div>
            <div>
                <button class="visited">Visitado</button>
                <button class="delete">Eliminar</button>
            </div>
        `;

        li.querySelector(".visited").addEventListener("click", function() {
            li.classList.toggle("visited");
        });

        li.querySelector(".delete").addEventListener("click", function() {
            db.collection("cities").doc(id).delete().then(() => {
                console.log("City successfully deleted!");
            }).catch((error) => {
                console.error("Error removing city: ", error);
            });
        });

        cityList.appendChild(li);
    }
});
