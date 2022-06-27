
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
const db = firebase.firestore();

  function printRank() {
    let rankingList = new Array();
    db.collection("ranking")
        .get()
        .then((res) => {
            res.forEach((doc) => {
     
                rankingList.push(doc.data());
            
            })
        });

}
printRank();


function addRank(userName, userScore) {
    db.collection('ranking').add({ user: userName, score: userScore });
    //   {user: 유저이름, score: 유저점수} 데이터베이스 입력

    printList(printRank());
}

function printList(lists) {
    console.log(lists);
}






    // db.collection('ranking').add({user : user ,score:currentScore});

//     db.collection('ranking').add({score:300, user : "user2"});

