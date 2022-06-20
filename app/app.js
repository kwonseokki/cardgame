var userName = document.querySelector('.user-name');
var dispName = document.querySelector('.display-name');
var startPage = document.querySelector('.start-page');
var gamePage = document.querySelector('.game-page');
var profileName = document.querySelector('.profile-name');
var cardZone = document.querySelector('.card-zone');
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
function gameDepth(obj) {
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
var cards = [
    '카드1',
    '카드1',
    '카드2',
    '카드2',
    '카드3',
    '카드3',
    '카드4',
    '카드4',
];
function shuffle(cards) {
    return cards.sort(function () { return Math.random() - 0.5; });
}
var shuffled = shuffle(cards);
function cardSet(shuffled) {
    shuffled.forEach(function (element, index) {
        var card = document.createElement('li');
        card.classList.add('bg-gray-50');
        card.classList.add('card');
        card.innerText = element;
        cardZone.appendChild(card);
    });
}
cardSet(shuffled);
