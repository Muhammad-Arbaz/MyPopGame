// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAv-1A9sxmPe89eWHHhlrMAWPY7yas7g-M",
    authDomain: "game-pop-up.firebaseapp.com",
    projectId: "game-pop-up",
    storageBucket: "game-pop-up.appspot.com",
    messagingSenderId: "415009269775",
    appId: "1:415009269775:web:72ec5dfea5b27f7b5f9b7a",
    measurementId: "G-B1MEXZ54TL"
  };

  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const firestore = firebase.firestore();

function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    auth.signInWithEmailAndPassword(email, password)
        .catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage);
        });
}

function logout() {
    auth.signOut();
}

function signup() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    console.log(email, password);
    auth.createUserWithEmailAndPassword(email, password)
        .catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage);
        });
}


auth.onAuthStateChanged((user) => {
    if (user) {
        firestore.collection('users').doc(user.uid).set({
            email: user.email,
            lastLoggedInAt: new Date
        })
            .then(() => {
                console.log("Document written");
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
        setData(user);
        document.getElementById("user").innerHTML = user.email;
        document.getElementById("login_box").style.display = "none";
        document.getElementById("welcome_box").style.display = "block";
    } else {
        document.getElementById("login_box").style.display = "block";
        document.getElementById("welcome_box").style.display = "none";
    }
});
const setData = (user) => {
  firestore.collection('users').doc(user.uid).get()
  .then((querySnapshot) => {
      const data = querySnapshot.data();
      const lastLoggedInAt = data.lastLoggedInAt.toDate() ;
      const lastLoggedInSpan = document.getElementById("lastLoggedIn");
      lastLoggedInSpan.innerHTML = lastLoggedInAt;
  });
}

// Level 1

let popped = 0;
let score = 0;

document.getElementById('pop').innerHTML += "Red Ball";

document.addEventListener('mouseover', function(e){
    
    if (e.target.className === "red"){
        
                score += 10
                e.target.style.backgroundColor = "#ffffff2";
                e.target.textContent = "POP!";
                popped++;

                removeEvent(e);
                document.getElementById('score').innerHTML = +score;
                console.log(score);
    }   
});

function removeEvent(e){
    e.target.removeEventListener('mouseover', function(){
        
    })
};

document.addEventListener('mouseover', function(checkAllPopped){

    if (popped === 24){
        console.log('all popped!');
        let gallery = document.querySelector('#balloon-gallery');
        let message = document.querySelector('#yay-no-balloons');
        gallery.innerHTML = '';
        message.style.display = 'block';
    }
});

