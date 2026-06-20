/**
 * What Should I Drink - Quiz JavaScript
 * Coffee Route
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeQuiz();
});

/**
 * Initialize quiz functionality
 */
function initializeQuiz() {
    const form = document.getElementById('quizForm');
    const submitBtn = document.getElementById('submitBtn');
    const resetBtn = document.getElementById('resetBtn');
    const errorMessage = document.getElementById('errorMessage');
    
    // Track answered questions
    updateProgress();
    
    // Listen for radio button changes
    form.addEventListener('change', function() {
        updateProgress();
        errorMessage.style.display = 'none';
    });
    
    // Handle form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const answers = gatherAnswers();
        
        if (answers) {
            saveAnswersToSession(answers);
            window.location.href = 'drink-result.html';
        } else {
            errorMessage.style.display = 'block';
            errorMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    });
    
    // Handle reset button
    resetBtn.addEventListener('click', function() {
        if (confirm('ต้องการล้างคำตอบทั้งหมดใช่หรือไม่?')) {
            form.reset();
            sessionStorage.removeItem('drinkQuizAnswers');
            updateProgress();
            errorMessage.style.display = 'none';
        }
    });
    
    // Initialize mobile menu
    initializeMobileMenu();
}

/**
 * Gather answers from form
 * @returns {Object|null} answers object or null if incomplete
 */
function gatherAnswers() {
    const form = document.getElementById('quizForm');
    
    // Get all radio groups
    const time = form.querySelector('input[name="time"]:checked');
    const busyness = form.querySelector('input[name="busyness"]:checked');
    const taste = form.querySelector('input[name="taste"]:checked');
    const sweetness = form.querySelector('input[name="sweetness"]:checked');
    const caffeine = form.querySelector('input[name="caffeine"]:checked');
    
    // Check if all questions are answered
    if (!time || !busyness || !taste || !sweetness || !caffeine) {
        return null;
    }
    
    // Return answers object
    return {
        time: time.value,
        busyness: busyness.value,
        taste: taste.value,
        sweetness: sweetness.value,
        caffeine: caffeine.value,
        timestamp: new Date().toISOString()
    };
}

/**
 * Save answers to sessionStorage
 * @param {Object} answers - The quiz answers
 */
function saveAnswersToSession(answers) {
    try {
        sessionStorage.setItem('drinkQuizAnswers', JSON.stringify(answers));
        console.log('Answers saved to session:', answers);
    } catch (error) {
        console.error('Error saving to sessionStorage:', error);
        alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล กรุณาลองใหม่อีกครั้ง');
    }
}

/**
 * Update progress bar and submit button state
 */
function updateProgress() {
    const form = document.getElementById('quizForm');
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    const submitBtn = document.getElementById('submitBtn');
    
    // Count answered questions
    const questionNames = ['time', 'busyness', 'taste', 'sweetness', 'caffeine'];
    let answeredCount = 0;
    
    questionNames.forEach(name => {
        const selected = form.querySelector(`input[name="${name}"]:checked`);
        if (selected) {
            answeredCount++;
        }
    });
    
    // Update progress bar
    const progressPercent = (answeredCount / 5) * 100;
    progressFill.style.width = progressPercent + '%';
    
    // Update progress text
    progressText.textContent = `Question ${answeredCount} of 5`;
    
    // Enable/disable submit button
    if (answeredCount === 5) {
        submitBtn.disabled = false;
        submitBtn.style.cursor = 'pointer';
    } else {
        submitBtn.disabled = true;
        submitBtn.style.cursor = 'not-allowed';
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

/**
 * Add visual feedback when selecting options
 */
document.addEventListener('DOMContentLoaded', function() {
    const optionLabels = document.querySelectorAll('.option-label');
    
    optionLabels.forEach(label => {
        label.addEventListener('click', function() {
            // Add ripple effect or other visual feedback here if desired
            const optionContent = this.querySelector('.option-content');
            optionContent.style.transform = 'scale(0.95)';
            
            setTimeout(() => {
                optionContent.style.transform = '';
            }, 150);
        });
    });
});