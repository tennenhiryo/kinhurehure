// data.js の読み込みチェック & 解析
const sentenceList = {};

if (typeof window.rawData !== 'undefined') {
    window.rawData.trim().split('\n').forEach(line => {
        if (!line.trim()) return;
        const match = line.match(/^(\d+)[.\s\t　]+(.+)$/);
        if (match) {
            const num = parseInt(match[1], 10);
            const text = match[2].trim();
            sentenceList[num] = text;
        } else {
            const parts = line.trim().split(/\s+/);
            const num = parseInt(parts[0], 10);
            const text = parts.slice(1).join(' ');
            if (!isNaN(num) && text) sentenceList[num] = text;
        }
    });
} else {
    alert("エラー: データを読み込めませんでした。");
}

let numbers = [];
let leftSwiped = [];
let currentIndex = 0;
let startX = 0;
let currentX = 0;
let isDragging = false;
let isFlipped = false;

const cardWrapper = document.getElementById('card'); 
const cardInner = document.getElementById('card-inner'); 
const frontFace = document.getElementById('card-front');
const backFace = document.getElementById('card-back');
const nextCard = document.getElementById('next-card');
const nextCardFront = document.getElementById('next-card-front');

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function startGame() {
    const minInput = document.getElementById('min-val').value;
    const maxInput = document.getElementById('max-val').value;
    const min = parseInt(minInput);
    const max = parseInt(maxInput);

    if (minInput === "" || maxInput === "" || isNaN(min) || isNaN(max)) { 
        alert("数値を入力してください"); return; 
    }
    if (min > max) { alert("範囲の設定が正しくありません"); return; }

    numbers = [];
    for (let i = min; i <= max; i++) numbers.push(i);
    if (numbers.length === 0) { alert("指定された範囲のデータがありません"); return; }

    numbers = shuffle(numbers);
    currentIndex = 0;
    leftSwiped = [];

    document.getElementById('setup-screen').classList.remove('active');
    document.getElementById('result-screen').classList.remove('active');
    document.getElementById('game-screen').classList.add('active');
    
    updateCard();
}

function togglePause() {
    document.getElementById('pause-modal').classList.toggle('active');
}

function finishGame() {
    document.getElementById('pause-modal').classList.remove('active');
    showResults();
}

function updateCard() {
    if (currentIndex >= numbers.length) {
        showResults();
        return;
    }
    
    const currentNum = numbers[currentIndex];
    
    cardInner.style.transition = 'none';
    cardWrapper.style.transition = 'none';
    cardInner.classList.remove('is-flipped');
    cardWrapper.style.transform = `translate(0px, 0px) rotate(0deg)`;
    isFlipped = false;

    frontFace.innerText = currentNum;
    
    if (sentenceList[currentNum]) {
        backFace.innerText = sentenceList[currentNum];
        backFace.style.color = "var(--text-main)"; 
    } else {
        backFace.innerText = "データなし";
        backFace.style.color = "var(--text-sub)";
    }

    const nextNum = numbers[currentIndex + 1];
    if (nextNum !== undefined) {
        nextCard.style.display = 'flex';
        nextCardFront.innerText = nextNum;
        
        nextCard.classList.remove('coming-up');
        nextCard.style.transform = ''; 
        nextCard.style.opacity = '';
        
    } else {
        nextCard.style.display = 'none';
    }

    void cardInner.offsetWidth; 
    // ▼ シンプルな回転指定
    cardInner.style.transition = 'transform 0.6s ease-in-out';

    document.getElementById('progress').innerText = `残り: ${numbers.length - currentIndex}`;
}

cardWrapper.addEventListener('touchstart', (e) => {
    if(document.getElementById('pause-modal').classList.contains('active')) return;
    startX = e.touches[0].clientX;
    currentX = startX;
    isDragging = true;
    cardWrapper.style.transition = 'none';
});

cardWrapper.addEventListener('touchmove', (e) => {
    if(!isDragging || document.getElementById('pause-modal').classList.contains('active')) return;
    currentX = e.touches[0].clientX;
    const diffX = currentX - startX;
    const deg = diffX / 15;
    cardWrapper.style.transform = `translate(${diffX}px, 0px) rotate(${deg}deg)`;
});

cardWrapper.addEventListener('touchend', () => {
    if(!isDragging) return;
    isDragging = false;
    
    if(document.getElementById('pause-modal').classList.contains('active')) return;

    const diffX = currentX - startX;
    
    if (Math.abs(diffX) < 10) {
        cardWrapper.style.transform = `translate(0px, 0px) rotate(0deg)`;
        cardInner.classList.toggle('is-flipped');
        isFlipped = !isFlipped;
        return;
    }

    cardWrapper.style.transition = 'transform 0.4s ease-out';
    
    if (diffX > 80) { 
        cardWrapper.style.transform = `translate(120vw, 0px) rotate(30deg)`;
        if (numbers[currentIndex + 1] !== undefined) nextCard.classList.add('coming-up');
        setTimeout(() => { nextNum(false); }, 300);

    } else if (diffX < -80) { 
        cardWrapper.style.transform = `translate(-120vw, 0px) rotate(-30deg)`;
        if (numbers[currentIndex + 1] !== undefined) nextCard.classList.add('coming-up');
        setTimeout(() => { nextNum(true); }, 300);
        
    } else { 
        cardWrapper.style.transform = `translate(0px, 0px) rotate(0deg)`;
    }
    startX = 0;
    currentX = 0;
});

function nextNum(isLeft) {
    if (isLeft) leftSwiped.push(numbers[currentIndex]);
    currentIndex++;
    updateCard();
}

function showResults() {
    document.getElementById('game-screen').classList.remove('active');
    document.getElementById('result-screen').classList.add('active');

    const totalDone = currentIndex; 
    const unknownCount = leftSwiped.length;
    const knownCount = totalDone - unknownCount;
    const percent = totalDone === 0 ? 0 : Math.round((knownCount / totalDone) * 100);

    document.getElementById('result-fraction').innerText = `${knownCount} / ${totalDone}`;
    document.getElementById('result-percent').innerText = `${percent}%`;
    
    const listContainer = document.getElementById('left-list');
    listContainer.innerHTML = "";

    if (leftSwiped.length === 0) {
        listContainer.innerText = "全問正解です！";
        listContainer.style.textAlign = "center";
        listContainer.style.padding = "20px";
    } else {
        listContainer.style.textAlign = "left";
        leftSwiped.forEach(num => {
            const div = document.createElement('div');
            div.className = "list-item";
            const text = sentenceList[num] ? ` : ${sentenceList[num]}` : "";
            div.innerText = `${num}${text}`;
            listContainer.appendChild(div);
        });
    }
}
