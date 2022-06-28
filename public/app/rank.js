
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
    const tbodyTag = document.querySelector(".tbody");
    db.collection("ranking").orderBy("score", "desc")
        .get()
        .then((res) => {
            res.forEach((doc) => {
            const trTag = document.createElement('tr');
            const tdTagUserName = document.createElement('td');
            tdTagUserName.classList.add('text-gray-900', 'font-medium', 'px-2', 'py-2','whitespace-nowrap', 'table-width');
            const tdTagUserScore = tdTagUserName.cloneNode(); 
            trTag.classList.add('border-b');
            tdTagUserName.innerHTML=doc.data().user;
            tdTagUserScore.innerHTML=doc.data().score;
            trTag.appendChild(tdTagUserName);
            trTag.appendChild(tdTagUserScore);
            tbodyTag.appendChild(trTag);   
            })
        });
        
}


// db에 점수데이터 입력
function addRank(userName, userScore) {
    db.collection('ranking').add({ user: userName, score: userScore });
    //   {user: 유저이름, score: 유저점수} 데이터베이스 입력

    printRank();
}








    // db.collection('ranking').add({user : user ,score:currentScore});

//     db.collection('ranking').add({score:300, user : "user2"});

