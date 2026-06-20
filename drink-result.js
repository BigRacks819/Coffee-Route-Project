/**
 * Drink Result - JavaScript
 * Coffee Route
 */

// TODO: แก้ไขข้อมูลกาแฟตามต้องการ - เพิ่ม/ลด/แก้ไขได้
const coffeeDatabase = [
    {
        id: 'espresso',
        name: 'Espresso',
        image: 'assets/images/espresso.jpg',
        description: 'กาแฟเข้มข้นสไตล์อิตาเลียน สกัดด้วยแรงดันสูง ให้รสชาติเข้มข้นและหอมกรุ่น เหมาะสำหรับผู้ที่ชื่นชอบรสชาติกาแฟแท้ๆ',
        times: ['เช้า', 'สาย'],
        busyness: ['งานรัดตัว', 'นิดหน่อย'],
        taste: ['เข้มๆ'],
        sweetness: 'ไม่หวาน',
        caffeine: 'สูง',
        menuLink: 'coffee-story1.html'
    },
    {
        id: 'cappuccino',
        name: 'Cappuccino',
        image: 'assets/images/cappuccino.jpg',
        description: 'การผสมผสานที่ลงตัวระหว่าง Espresso นมสด และฟองนมนุ่ม ตกแต่งด้วยลาเต้อาร์ตสวยงาม รสชาติกลมกล่อมและหอมหวานจากนม',
        times: ['เช้า', 'สาย', 'บ่าย'],
        busyness: ['วันแห่งการพักผ่อน', 'นิดหน่อย'],
        taste: ['นุ่มนวล', 'ได้หมด'],
        sweetness: 'ปานกลาง',
        caffeine: 'ปานกลาง',
        menuLink: 'coffee-story1.html'
    },
    {
        id: 'latte',
        name: 'Caffè Latte',
        image: 'assets/images/latte.jpg',
        description: 'เอสเพรสโซผสมกับนมสดอุ่นๆ ในสัดส่วนที่ลงตัว รสชาตินุ่มนวลและหวานมัน เหมาะสำหรับผู้ที่ชอบกาแฟรสไม่แรงเกินไป',
        times: ['สาย', 'บ่าย', 'เย็น'],
        busyness: ['วันแห่งการพักผ่อน', 'นิดหน่อย'],
        taste: ['นุ่มนวล'],
        sweetness: 'ปานกลาง',
        caffeine: 'ปานกลาง',
        menuLink: 'coffee-story1.html'
    },
    {
        id: 'americano',
        name: 'Americano',
        image: 'assets/images/americano.jpg',
        description: 'เอสเพรสโซเจือจางด้วยน้ำร้อน ให้รสชาติกาแฟที่เข้มข้นแต่ไม่หนักเกินไป สามารถดื่มได้ทั้งร้อนและเย็น เหมาะสำหรับทุกโอกาส',
        times: ['เช้า', 'สาย', 'บ่าย'],
        busyness: ['งานรัดตัว', 'นิดหน่อย'],
        taste: ['เข้มๆ', 'ได้หมด'],
        sweetness: 'ไม่หวาน',
        caffeine: 'สูง',
        menuLink: 'coffee-story1.html'
    },
    {
        id: 'mocha',
        name: 'Caffè Mocha',
        image: 'assets/images/mocha.jpg',
        description: 'การผสมผสานระหว่างเอสเพรสโซ ช็อกโกแลต และนมสด ท็อปปิ้งด้วยวิปครีม รสชาติหวานมันและเข้มข้น เหมาะสำหรับผู้รักช็อกโกแลต',
        times: ['บ่าย', 'เย็น'],
        busyness: ['วันแห่งการพักผ่อน'],
        taste: ['นุ่มนวล', 'ได้หมด'],
        sweetness: 'ชอบหวาน',
        caffeine: 'ปานกลาง',
        menuLink: 'coffee-story1.html'
    },
    {
        id: 'macchiato',
        name: 'Macchiato',
        image: 'assets/images/macchiato.jpg',
        description: 'เอสเพรสโซที่จุดด้วยฟองนมเล็กน้อย รสชาติเข้มข้นของกาแฟผสมผสานกับความนุ่มนวลของนม เหมาะสำหรับผู้ที่ต้องการความเข้มข้นแต่นุ่มนวล',
        times: ['เช้า', 'สาย'],
        busyness: ['งานรัดตัว', 'นิดหน่อย'],
        taste: ['เข้มๆ'],
        sweetness: 'ปานกลาง',
        caffeine: 'สูง',
        menuLink: 'coffee-story2.html'
    },
    {
        id: 'flatwhite',
        name: 'Flat White',
        image: 'assets/images/flatwhite.jpg',
        description: 'กาแฟสไตล์ออสเตรเลียที่ใช้เอสเพรสโซคู่ผสมกับนมไมโครโฟมที่มีความละเอียด รสชาติเข้มข้นและครีมมี่ เหมือนลาเต้แต่นุ่มนวลกว่า',
        times: ['เช้า', 'สาย', 'บ่าย'],
        busyness: ['นิดหน่อย', 'งานรัดตัว'],
        taste: ['นุ่มนวล', 'ได้หมด'],
        sweetness: 'ปานกลาง',
        caffeine: 'สูง',
        menuLink: 'coffee-story2.html'
    },
    {
        id: 'coldbrew',
        name: 'Cold Brew',
        image: 'assets/images/coldbrew.jpg',
        description: 'กาแฟสกัดเย็นที่ใช้เวลาชงนาน 12-24 ชั่วโมง ให้รสชาติกาแฟที่นุ่มนวลและหวานธรรมชาติ ความเข้มข้นสูงแต่ไม่ขม เหมาะสำหรับฤดูร้อน',
        times: ['บ่าย', 'เย็น'],
        busyness: ['วันแห่งการพักผ่อน', 'นิดหน่อย'],
        taste: ['เข้มๆ', 'ได้หมด'],
        sweetness: 'ไม่หวาน',
        caffeine: 'สูง',
        menuLink: 'coffee-story2.html'
    },
    {
        id: 'affogato',
        name: 'Affogato',
        image: 'assets/images/affogato.jpg',
        description: 'ไอศกรีมวานิลลาราดด้วยเอสเพรสโซร้อน ๆ การผสมผสานที่ลงตัวระหว่างความเย็นและร้อน หวานและขม เหมาะเป็นของหวานหลังอาหาร',
        times: ['บ่าย', 'เย็น', 'ค่ำ'],
        busyness: ['วันแห่งการพักผ่อน'],
        taste: ['นุ่มนวล', 'ได้หมด'],
        sweetness: 'ชอบหวาน',
        caffeine: 'ปานกลาง',
        menuLink: 'coffee-story2.html'
    },
    {
        id: 'irishcoffee',
        name: 'Irish Coffee',
        image: 'assets/images/irishcoffee.jpg',
        description: 'กาแฟร้อนผสมกับวิสกี้ไอริช น้ำตาลและวิปครีม เครื่องดื่มคลาสสิคที่อบอุ่นและมีรสชาติเฉพาะตัว เหมาะสำหรับบรรยากาศพิเศษ',
        times: ['เย็น', 'ค่ำ'],
        busyness: ['วันแห่งการพักผ่อน'],
        taste: ['ได้หมด'],
        sweetness: 'ปานกลาง',
        caffeine: 'ปานกลาง',
        menuLink: 'coffee-story2.html'
    }
];

// TODO: ปรับค่าน้ำหนักคะแนนตามต้องการ
const scoreWeights = {
    time: 3,        // ช่วงเวลา
    busyness: 2,    // ความยุ่ง
    taste: 3,       // รสชาติ
    sweetness: 1,   // ความหวาน
    caffeine: 2     // คาเฟอีน
};

/**
 * Initialize result page
 */
document.addEventListener('DOMContentLoaded', function() {
    // Load answers from session
    const answers = loadAnswersFromSession();
    
    if (!answers) {
        // No answers found, redirect back to quiz
        alert('ไม่พบข้อมูลคำตอบ กรุณาทำแบบทดสอบก่อน');
        window.location.href = 'what-should-i-drink.html';
        return;
    }
    
    // Calculate scores
    const results = calculateScores(answers, coffeeDatabase);
    
    // Render results
    renderTopResult(results[0]);
    renderAlternatives(results.slice(1, 4)); // Show top 2-4
    
    // Setup retry button
    setupRetryButton();
    
    // Initialize mobile menu
    initializeMobileMenu();
});

/**
 * Load answers from sessionStorage
 * @returns {Object|null} Quiz answers or null
 */
function loadAnswersFromSession() {
    try {
        const answersJson = sessionStorage.getItem('drinkQuizAnswers');
        if (!answersJson) {
            return null;
        }
        return JSON.parse(answersJson);
    } catch (error) {
        console.error('Error loading answers from session:', error);
        return null;
    }
}

/**
 * Calculate scores for each coffee based on quiz answers
 * @param {Object} answers - Quiz answers
 * @param {Array} coffees - Coffee database
 * @returns {Array} Sorted array of coffee with scores
 */
function calculateScores(answers, coffees) {
    const results = coffees.map(coffee => {
        let score = 0;
        let reasons = [];
        
        // Check time match
        if (coffee.times.includes(answers.time)) {
            score += scoreWeights.time;
            reasons.push(`เหมาะกับช่วง${answers.time}`);
        }
        
        // Check busyness match
        if (coffee.busyness.includes(answers.busyness)) {
            score += scoreWeights.busyness;
            reasons.push(`เหมาะกับวันที่${answers.busyness}`);
        }
        
        // Check taste match
        if (coffee.taste.includes(answers.taste) || coffee.taste.includes('ได้หมด')) {
            score += scoreWeights.taste;
            if (answers.taste !== 'ได้หมด') {
                reasons.push(`รสชาติ${answers.taste}`);
            }
        }
        
        // Check sweetness match
        if (coffee.sweetness === answers.sweetness) {
            score += scoreWeights.sweetness;
            reasons.push(`ความหวาน${answers.sweetness}`);
        }
        
        // Check caffeine match
        if (coffee.caffeine === answers.caffeine) {
            score += scoreWeights.caffeine;
            reasons.push(`คาเฟอีน${answers.caffeine}`);
        }
        
        return {
            ...coffee,
            score: score,
            reasons: reasons,
            maxScore: Object.values(scoreWeights).reduce((a, b) => a + b, 0)
        };
    });
    
    // Sort by score (highest first)
    results.sort((a, b) => b.score - a.score);
    
    return results;
}

/**
 * Render top recommendation
 * @param {Object} result - Top coffee result
 */
function renderTopResult(result) {
    const topResultDiv = document.getElementById('topResult');
    
    const scorePercent = Math.round((result.score / result.maxScore) * 100);
    const reasonText = result.reasons.length > 0 
        ? result.reasons.join(' • ') 
        : 'เหมาะกับคุณ';
    
    topResultDiv.innerHTML = `
        <div class="result-badge">🏆 แนะนำที่สุดสำหรับคุณ</div>
        <div class="result-content">
            <div class="result-image">
                <!-- TODO: Replace with real image -->
                <!-- <img src="${result.image}" alt="${result.name}"> -->
                <div class="img-placeholder">☕</div>
            </div>
            <div class="result-info">
                <h2>${result.name}</h2>
                <p class="result-score">คะแนนความเหมาะสม: ${result.score}/${result.maxScore} (${scorePercent}%)</p>
                <p class="result-description">${result.description}</p>
                <div class="result-reason">
                    <strong>ทำไมถึงแนะนำ:</strong>
                    <p>${reasonText}</p>
                </div>
                <a href="${result.menuLink}" class="view-menu-btn">
                    📖 ดูรายละเอียดเมนู
                </a>
            </div>
        </div>
    `;
}

/**
 * Render alternative recommendations
 * @param {Array} results - Array of alternative results
 */
function renderAlternatives(results) {
    if (results.length === 0) return;
    
    const alternativesSection = document.getElementById('alternativesSection');
    const alternativesGrid = document.getElementById('alternativesGrid');
    
    alternativesSection.style.display = 'block';
    
    alternativesGrid.innerHTML = results.map(result => {
        const scorePercent = Math.round((result.score / result.maxScore) * 100);
        const reasonText = result.reasons.length > 0 
            ? result.reasons.join(' • ') 
            : 'ตัวเลือกที่ดี';
        
        return `
            <div class="alternative-card">
                <div class="alternative-image">
                    <!-- TODO: Replace with real image -->
                    <!-- <img src="${result.image}" alt="${result.name}"> -->
                    <div class="img-placeholder">☕</div>
                </div>
                <h3>${result.name}</h3>
                <p class="alternative-score">คะแนน: ${result.score}/${result.maxScore} (${scorePercent}%)</p>
                <p class="alternative-description">${result.description.substring(0, 100)}...</p>
                <div class="alternative-reason">${reasonText}</div>
            </div>
        `;
    }).join('');
}

/**
 * Setup retry button to clear session and redirect
 */
function setupRetryButton() {
    const retryBtn = document.getElementById('retryBtn');
    if (retryBtn) {
        retryBtn.addEventListener('click', function(e) {
            // Clear session storage
            sessionStorage.removeItem('drinkQuizAnswers');
        });
    }
}

/**
 * Toggle mobile menu
 */
function toggleMenu() {
    const nav = document.getElementById('nav');
    if (nav) {
        nav.classList.toggle('active');
    }
}

/**
 * Initialize mobile menu functionality
 */
function initializeMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.getElementById('nav');
    
    if (mobileMenuBtn && nav) {
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenuBtn.contains(e.target) && !nav.contains(e.target)) {
                nav.classList.remove('active');
            }
        });
        
        // Close mobile menu when clicking on nav links
        nav.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                nav.classList.remove('active');
            }
        });
    }
}

/*
 * DEVELOPER NOTES:
 * 
 * TO CUSTOMIZE COFFEE DATA:
 * 1. Edit the coffeeDatabase array above
 * 2. Add/remove/modify coffee objects
 * 3. Ensure all required fields are present:
 *    - id, name, image, description
 *    - times (array), busyness (array), taste (array)
 *    - sweetness (string), caffeine (string)
 *    - menuLink (string)
 * 
 * TO ADJUST SCORING WEIGHTS:
 * 1. Modify the scoreWeights object
 * 2. Higher numbers = more important criteria
 * 3. Current weights:
 *    - time: 3 (ช่วงเวลา)
 *    - busyness: 2 (ความยุ่ง)
 *    - taste: 3 (รสชาติ)
 *    - sweetness: 1 (ความหวาน)
 *    - caffeine: 2 (คาเฟอีน)
 * 
 * TO ADD REAL IMAGES:
 * 1. Place images in assets/images/ folder
 * 2. Name them according to coffee.image field
 * 3. Uncomment <img> tags in HTML
 * 4. Remove or comment out <div class="img-placeholder">
 * 
 * TO CUSTOMIZE MATCHING LOGIC:
 * 1. Edit calculateScores() function
 * 2. Add new criteria or modify existing ones
 * 3. Update reasons array for user feedback
 */