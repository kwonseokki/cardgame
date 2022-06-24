
const firebaseConfig = {
    apiKey: "AIzaSyCNjK6pkk3BrfU316Q7Lxy7yTQ70DsmylM",
    authDomain: "cardgame-a2f7f.firebaseapp.com",
    projectId: "cardgame-a2f7f",
    storageBucket: "cardgame-a2f7f.appspot.com",
    messagingSenderId: "407233928982",
    appId: "1:407233928982:web:69da0efdefed16bb3b7a37",
    measurementId: "G-8VS8RS5H95"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig);

    console.log(currentScore);
    console.log(completedCnt);
    const user = localStorage.getItem('name');
    console.log(user);

    const db = firebase.firestore();
    db.collection("ranking")
        .get()
        .then((res) => {
            res.forEach((doc) => {
                console.log(doc.data());
            })
        });

     

    function addRank() {
      console.log("랭킹추가");
    }



   
     

     
    // db.collection('ranking').add({user : user ,score:currentScore});

//     db.collection('ranking').add({score:300, user : "user2"});

