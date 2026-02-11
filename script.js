// data.js 読み込み確認
const sentenceList = {};
if (typeof window.rawData !== 'undefined') {
    window.rawData.trim().split('\n').forEach(line => {
        if(!line.trim()) return;
        const match = line.match(/^(\d+)[.\s\t　]+(.+)$/);
        if(match) sentenceList[parseInt(match[1])] = match[2].trim();
    });
}

let numbers = [], leftSwiped = [], currentIndex = 0;
const card = document.getElementById('card');
const nextCard = document.getElementById('next-card');
let startX = 0;

function startGame() {
    const min = parseInt(document.getElementById('min-val').value);
    const max = parseInt(document.getElementById('max-val').value);
    
    if(isNaN(min) || isNaN(max)) { alert("数値を入力してください"); return; }
    numbers = [];
    for(let i=min; i<=max; i++) numbers.push(i);
    if(numbers.length === 0) { alert("データがありません"); return; }

    numbers.sort(() => Math.random() - 0.5);
    currentIndex = 0;
    leftSwiped = [];

    document.getElementById('setup-screen').classList.remove('active');
    document.getElementById('game-screen').classList.add('active');
    updateView();
}

function updateView() {
    if(currentIndex >= numbers.length) {
        showResults();
        return;
    }

    const num = numbers[currentIndex];
    
    // メインカード
    document.getElementById('card-front').innerText = num;
    document.getElementById('card-back').innerText = sentenceList[num] || "No Data";
    
    // リセット
    card.style.transition = 'none';
    card.style.transform = ''; // ★重要：ここを空文字にしてCSSに任せる
    card.classList.remove('is-flipped');

    // 次のカード
    const nextNum = numbers[currentIndex + 1];
    if(nextNum !== undefined) {
        nextCard.style.display = 'flex';
        document.getElementById('next-text').innerText = nextNum;
        nextCard.classList.remove('coming-up');
        nextCard.style.transition = 'none';
        nextCard.style.transform = 'scale(0.9) translateY(20px)';
        
        requestAnimationFrame(() => {
            nextCard.style.transition = 'transform 0.4s ease';
        });
    } else {
        nextCard.style.display = 'none';
    }

    // アニメーション復帰
    requestAnimationFrame(() => {
        card.style.transition = 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
    });
    
    document.getElementById('progress').innerText = `残り: ${numbers.length - currentIndex}`;
}

// タッチイベント
card.addEventListener('touchstart', e => { 
    if(document.getElementById('pause-modal').classList.contains('active')) return;
    startX = e.touches[0].clientX; 
});

card.addEventListener('touchmove', e => {
    if(document.getElementById('pause-modal').classList.contains('active')) return;
    const diff = e.touches[0].clientX - startX;
    card.style.transform = `translate(${diff}px, 0) rotate(${diff/20}deg)`;
});

card.addEventListener('touchend', e => {
    if(document.getElementById('pause-modal').classList.contains('active')) return;
    const diff = e.changedTouches[0].clientX - startX;
    
    // タップ（回転）
    if(Math.abs(diff) < 10) {
        // ★修正ポイント：インラインスタイルを消してCSSクラスを有効にする
        card.style.transform = ''; 
        card.classList.toggle('is-flipped');
    } 
    // スワイプ
    else if(Math.abs(diff) > 80) {
        const isLeft = diff < 0;
        card.style.transition = 'transform 0.4s ease-out';
        card.style.transform = `translate(${isLeft ? -150 : 150}vw, 0) rotate(${isLeft ? -30 : 30}deg)`;
        
        if(numbers[currentIndex+1] !== undefined) {
            nextCard.classList.add('coming-up');
        }

        setTimeout(() => {
            if(isLeft) leftSwiped.push(numbers[currentIndex]);
            currentIndex++;
            updateView();
        }, 300);
    } else {
        // 元に戻る
        card.style.transform = '';
    }
});

function togglePause() {
    document.getElementById('pause-modal').classList.toggle('active');
}

function finishGame() {
    document.getElementById('pause-modal').classList.remove('active');
    showResults();
}

function showResults() {
    document.getElementById('game-screen').classList.remove('active');
    document.getElementById('result-screen').classList.add('active');

    const total = numbers.length; // 全問題数（または現在の出題数）
    const played = currentIndex;  // ここまで解いた数
    const unknownCount = leftSwiped.length;
    const knownCount = played - unknownCount;
    
    const percent = played === 0 ? 0 : Math.round((knownCount / played) * 100);

    document.getElementById('result-score').innerText = 
        `正解率: ${percent}% (${knownCount} / ${played})`;

    const listContainer = document.getElementById('result-list');
    listContainer.innerHTML = "";

    // ここまで解いた分だけ表示（途中終了対応）
    const playedNumbers = numbers.slice(0, played);
    
    playedNumbers.forEach(num => {
        const isUnknown = leftSwiped.includes(num);
        const div = document.createElement('div');
        div.className = isUnknown ? "list-item item-unknown" : "list-item item-known";
        const text = sentenceList[num] || "";
        div.innerHTML = `
            <span class="icon"></span>
            <span style="font-weight:bold; width:35px;">${num}</span>
            <span class="item-text">${text}</span>
        `;
        listContainer.appendChild(div);
    });
}
