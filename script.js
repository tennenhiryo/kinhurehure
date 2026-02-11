// data.js の読み込みチェック
const sentenceList = {};
if (typeof window.rawData !== 'undefined') {
    window.rawData.trim().split('\n').forEach(line => {
        if (!line.trim()) return;
        const match = line.match(/^(\d+)[.\s\t　]+(.+)$/);
        if (match) sentenceList[parseInt(match[1], 10)] = match[2].trim();
    });
} else {
    alert("Error: data.js missing");
}

let numbers = [], leftSwiped = [], currentIndex = 0;
let startX = 0, currentX = 0, isDragging = false;

// 要素取得
const cardWrapper = document.getElementById('card'); 
const cardInner = document.getElementById('card-inner'); 
const nextCard = document.getElementById('next-card');

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function startGame() {
    const min = parseInt(document.getElementById('min-val').value);
    const max = parseInt(document.getElementById('max-val').value);
    if (isNaN(min) || isNaN(max)) return alert("Enter numbers");

    numbers = [];
    for (let i = min; i <= max; i++) numbers.push(i);
    if (numbers.length === 0) return alert("No data in range");

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

    document.getElementById('card-front').innerText = currentNum;
    document.getElementById('card-back').innerText = sentenceList[currentNum] || "No Data";
    document.getElementById('card-back').style.color = sentenceList[currentNum] ? "var(--text-main)" : "var(--text-sub)";

    const nextNum = numbers[currentIndex + 1];
    if (nextNum !== undefined) {
        nextCard.style.display = 'flex';
        document.getElementById('next-card-front').innerText = nextNum;
        nextCard.classList.remove('coming-up');
        nextCard.style.transform = ''; 
        nextCard.style.opacity = '';
    } else {
        nextCard.style.display = 'none';
    }

    void cardInner.offsetWidth; 
    // ★シンプルなアニメーション指定
    cardInner.style.transition = 'transform 0.6s ease-in-out';

    document.getElementById('progress').innerText = `Rest: ${numbers.length - currentIndex}`;
}

// --- タッチ操作 ---
cardWrapper.addEventListener('touchstart', (e) => {
    if(document.getElementById('pause-modal').classList.contains('active')) return;
    startX = e.touches[0].clientX;
    isDragging = true;
    cardWrapper.style.transition = 'none';
});

cardWrapper.addEventListener('touchmove', (e) => {
    if(!isDragging) return;
    const diffX = e.touches[0].clientX - startX;
    const deg = diffX / 15;
    cardWrapper.style.transform = `translate(${diffX}px, 0px) rotate(${deg}deg)`;
});

cardWrapper.addEventListener('touchend', (e) => {
    if(!isDragging) return;
    isDragging = false;
    const diffX = e.changedTouches[0].clientX - startX;
    
    if (Math.abs(diffX) < 10) {
        cardWrapper.style.transform = `translate(0px, 0px) rotate(0deg)`;
        cardInner.classList.toggle('is-flipped');
    } else {
        cardWrapper.style.transition = 'transform 0.4s ease-out';
        
        if (diffX > 80) { // Right
            cardWrapper.style.transform = `translate(120vw, 0px) rotate(30deg)`;
            if (numbers[currentIndex + 1] !== undefined) nextCard.classList.add('coming-up');
            setTimeout(() => { 
                currentIndex++; 
                updateCard(); 
            }, 300);
        } else if (diffX < -80) { // Left
            cardWrapper.style.transform = `translate(-120vw, 0px) rotate(-30deg)`;
            if (numbers[currentIndex + 1] !== undefined) nextCard.classList.add('coming-up');
            setTimeout(() => { 
                leftSwiped.push(numbers[currentIndex]);
                currentIndex++;
                updateCard();
            }, 300);
        } else { 
            cardWrapper.style.transform = `translate(0px, 0px) rotate(0deg)`;
        }
    }
});

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
        listContainer.innerText = "Perfect!";
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
