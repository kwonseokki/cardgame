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
    '카드1',
    '카드1',
    '카드2',
    '카드2',
    '카드3',
    '카드3',
    '카드4',
    '카드4',
]

function shuffle(cards: string[]) {
    return  cards.sort(() => Math.random()-0.5);
}

const shuffled = shuffle(cards);

function cardSet(shuffled: string[]) {
    shuffled.forEach((element, index)=>{
        const card = document.createElement('li');
        card.classList.add('card');
        card.innerText=element;
        cardZone.appendChild(card);
    })
}

cardSet(shuffled);


