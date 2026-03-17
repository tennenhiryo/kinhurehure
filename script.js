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
let isDragging = false; 
let isAnimating = false; 

function startGame() {
    // ★追加：見えないボタンがEnterキーを横取りするのを防ぐ（フォーカス解除）
    if (document.activeElement) {
        document.activeElement.blur();
    }

    const min = parseInt(document.getElementById('min-val').value);
    const max = parseInt(document.getElementById('max-val').value);
    
    if(isNaN(min) || isNaN(max)) { alert("数値を入力してください"); return; }
    numbers = [];
    for(let i=min; i<=max; i++) numbers.push(i);
    if(numbers.length === 0) { alert("データがありません"); return; }

    numbers.sort(() => Math.random() - 0.5);
    currentIndex = 0;
    leftSwiped = [];
    isAnimating = false;

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
    card.style.transform = ''; 
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

// --- スワイプ処理（マウス・タッチ・キーボード共通） ---
function swipeCard(direction) {
    if (isAnimating) return;
    isAnimating = true; // スワイプ中は操作をロック

    const isLeft = direction === 'left';
    card.style.transition = 'transform 0.4s ease-out';
    card.style.transform = `translate(${isLeft ? -150 : 150}vw, 0) rotate(${isLeft ? -30 : 30}deg)`;
    
    if(numbers[currentIndex+1] !== undefined) {
        nextCard.classList.add('coming-up');
    }

    setTimeout(() => {
        if(isLeft) leftSwiped.push(numbers[currentIndex]);
        currentIndex++;
        updateView();
        isAnimating = false; // アニメーション終了後にロック解除
    }, 300);
}

// --- イベント処理（PC・スマホ共通化） ---
const handleStart = (clientX) => {
    if(document.getElementById('pause-modal').classList.contains('active') || isAnimating) return;
    startX = clientX;
    isDragging = true;
};

const handleMove = (clientX) => {
    if(!isDragging || document.getElementById('pause-modal').classList.contains('active') || isAnimating) return;
    const diff = clientX - startX;
    card.style.transform = `translate(${diff}px, 0) rotate(${diff/20}deg)`;
};

const handleEnd = (clientX) => {
    if(!isDragging || document.getElementById('pause-modal').classList.contains('active') || isAnimating) return;
    isDragging = false;
    const diff = clientX - startX;
    
    // タップ（クリック）での回転
    if(Math.abs(diff) < 10) {
        card.style.transform = ''; 
        card.classList.toggle('is-flipped');
    } 
    // スワイプ（ドラッグ）での移動
    else if(Math.abs(diff) > 80) {
        swipeCard(diff < 0 ? 'left' : 'right');
    } else {
        // スワイプ量が足りない場合は元に戻る
        card.style.transform = '';
    }
};

// --- キーボード操作（PC用） ---
document.addEventListener('keydown', e => {
    // ゲーム画面以外、一時停止中、アニメーション中はキー操作を無視
    if (!document.getElementById('game-screen').classList.contains('active')) return;
    if (document.getElementById('pause-modal').classList.contains('active')) return;
    if (isAnimating) return;

    // ★修正：Enterキーに加え、Spaceキーにも対応
    if (e.key === 'Enter' || e.code === 'Enter' || e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        card.style.transform = ''; 
        card.classList.toggle('is-flipped');
    } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        swipeCard('left');
    } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        swipeCard('right');
    }
});

// 統合された最新のPointer Events（マウス・タッチ両対応）
card.addEventListener('pointerdown', e => {
    e.preventDefault(); 
    card.setPointerCapture(e.pointerId); 
    handleStart(e.clientX);
});
card.addEventListener('pointermove', e => handleMove(e.clientX));
card.addEventListener('pointerup', e => handleEnd(e.clientX));
card.addEventListener('pointercancel', e => {
    if(isDragging) handleEnd(e.clientX);
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

    const total = numbers.length; 
    const played = currentIndex;  
    const unknownCount = leftSwiped.length;
    const knownCount = played - unknownCount;
    
    const percent = played === 0 ? 0 : Math.round((knownCount / played) * 100);

    document.getElementById('result-score').innerText = 
        `正解率: ${percent}% (${knownCount} / ${played})`;

    const listContainer = document.getElementById('result-list');
    listContainer.innerHTML = "";

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
