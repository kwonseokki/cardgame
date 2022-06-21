const userName = document.querySelector('.user-name') as HTMLInputElement;
const dispName = document.querySelector('.display-name') as Element;
const startPage = document.querySelector('.start-page') as Element;
const gamePage = document.querySelector('.game-page') as Element;
const profileName = document.querySelector('.profile-name') as Element;
const cardZone = document.querySelector('.card-zone') as Element;

function setName() {
    if (userName instanceof HTMLInputElement && userName.value.length >= 3) {
        dispName.innerHTML = userName.value;
        profileName.innerHTML = userName.value;
        localStorage.setItem('name', userName.value);
    }
    else {
        alert("닉네임은 3글자 이상으로 설정해주세요.");
    }
}
interface depth {
    depth: number
}
function gameDepth(obj: depth) {
    // 1:초기화면
    // 2:게임화면
    switch (obj.depth) {
        case 1:
            startPage.classList.remove("hidden");
            gamePage.classList.add("hidden");
            break;
        case 2:
            startPage.classList.add("hidden");
            gamePage.classList.remove("hidden");
            break;
    }
}

const cards: string[] = [
    'https://images.velog.io/images/mokyoungg/post/6659a8e8-5234-49e5-b3da-a3816c08bfdc/%ED%83%80%EC%9E%85%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%20%EB%A1%9C%EA%B3%A0.svg',
    'https://images.velog.io/images/mokyoungg/post/6659a8e8-5234-49e5-b3da-a3816c08bfdc/%ED%83%80%EC%9E%85%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%20%EB%A1%9C%EA%B3%A0.svg',
    'https://images.velog.io/images/cyheum/post/a21ac839-e534-4eb3-8fa5-342a45818a53/react-logo.png',
    'https://images.velog.io/images/cyheum/post/a21ac839-e534-4eb3-8fa5-342a45818a53/react-logo.png',
    'https://images.velog.io/images/spielraum/post/167dacb2-a04a-4f00-b817-22ed7c048638/Coralogix-Nodejs-integration.jpg',
    'https://images.velog.io/images/spielraum/post/167dacb2-a04a-4f00-b817-22ed7c048638/Coralogix-Nodejs-integration.jpg',
    'https://images.velog.io/images/hongduhyeon/post/ebc33b2c-f8c5-4792-9a2f-b1dbc5529372/sass.png',
    'https://images.velog.io/images/hongduhyeon/post/ebc33b2c-f8c5-4792-9a2f-b1dbc5529372/sass.png',
]

function shuffle(cards: string[]) {
    return cards.sort(() => Math.random() - 0.5);
}

const shuffled = shuffle(cards);



function cardSet(shuffled: string[]) {

    shuffled.forEach((element, index) => {
        /* 태그생성 */
        const card = document.createElement('li');    // 카드 컨테이너 생성
        const cardFront = document.createElement('div'); // 카드전면
        const cardBack = document.createElement('div'); // 카드후면
        const indexStr = index.toString();
        card.appendChild(cardFront); // 카드에 카드전면 생성
        card.appendChild(cardBack); // 카드에 카드후면 생성
        card.classList.add('card'); // 카드컨테이너에 card클래스 부여
        card.setAttribute('value', indexStr);
        cardFront.classList.add('front');
        cardBack.classList.add('back');
        cardFront.innerHTML = "?";
        cardBack.style.backgroundImage=`url('${element}')`
        cardFront.setAttribute('value', element); // 각 카드마다 value속성으로 카드값 부여
        cardZone.appendChild(card); // 카드존 영역에 자식으로 카드 생성
    });
    // 카드가 셋팅되고 함수실행
    selecteCard();
};

interface cardStorage {
    first: string;
    second: string;
    seletedNumber: string | null;
}

function selecteCard() {
    const cardList = document.querySelectorAll(".card");
    const cardStorage: cardStorage = {
        first: "",
        second: "",
        seletedNumber: "999",
    };


    cardList.forEach((e) => {
        e.addEventListener("click", (e) => {
            let selected = e.target as HTMLInputElement;
            let selectedCard = selected.getAttribute('value') as string;
            let currentTarget = e.currentTarget as Element;
            let TargetFront = e.target as Element;
            let currentIndex = currentTarget.getAttribute('value');
            let TargetBack = currentTarget.children[1];

            if (cardStorage.first == "") { // 첫번째 선택한 카드의값 
                TargetFront.classList.add("on");
                TargetBack.classList.add("on");
                cardStorage.first = selectedCard;
                cardStorage.seletedNumber = currentIndex;

            } else if (cardStorage.seletedNumber !== currentIndex) {
                cardStorage.second = selectedCard; // 두번째 선택한 카드의값 
                TargetFront.classList.add("on");
                TargetBack.classList.add("on");

                matchCard(cardStorage.first, cardStorage.second); // 매치하는 함수로인자 넘김
                cardStorage.first = "";
                cardStorage.second = "";
            }
            return;

        })
    })
}

let sucuessdVal: any = [];
let completedCnt: number = 0;
function matchCard(first: string, second: string) {
    const firstVal = first;
    const secondVal = second;
    const num: number = 50;

    // 카드짝 맞을떄
    if (firstVal == secondVal) {
        sucuessdVal.push(first);
        completedCnt++;
        cardAnimation(sucuessdVal);
        calcScore(0,  completedCnt);
    }
    // 짝 안맞을떄
    else {
        calcScore(num,  completedCnt);
        cardAnimation(sucuessdVal);
    }

}

function cardAnimation(sucuessdVal: any) {
    const cards = document.querySelectorAll('.card'); // 모든카드요소 선택

    cards.forEach((e, idx, arr) => {
        // 카드 전부뒤집기 
        let front = e.children[0]; // li > div class='front'
        let back = e.children[1];  // li > div class='back'

        if (!(sucuessdVal.includes(front.getAttribute('value')))) {
            // 현재뒤집은 카드에 성공value가 담긴 배열이 포함안되야 카드뒤집기 
            setTimeout(() => {
                front.classList.remove('on');
                back.classList.remove('on');
            }, 1000);
        }
        return;

    })

}

let currentScore: number = 500;

function calcScore(num: number, completedCnt: number) {
    currentScore -= num;
    const dispScore: any = document.getElementById('display-score');
    dispScore.innerHTML = currentScore.toString();
    if (currentScore == 0) {
        alert("실패");
        location.reload();
    }
    if(completedCnt == 4) {
        alert(`게임종료 니점수${currentScore}`);
    }
}


cardSet(shuffled);


