/**
 * Coffee Diary - JavaScript
 * Coffee Route
 */

const STORAGE_KEY = 'coffeeDiary';

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeDiary();
});

/**
 * Initialize diary functionality
 */
function initializeDiary() {
    // Set today's date as default
    setTodayDate();
    
    // Load and display entries
    loadEntries();
    
    // Setup form submission
    setupFormSubmission();
    
    // Setup character counter
    setupCharCounter();
    
    // Setup edit form character counter
    setupEditCharCounter();
    
    // Setup mobile menu
    initializeMobileMenu();
}

/**
 * Set today's date in date input
 */
function setTodayDate() {
    const dateInput = document.getElementById('diaryDate');
    const today = new Date().toISOString().split('T')[0];
    dateInput.value = today;
    dateInput.max = today; // ไม่ให้เลือกวันในอนาคต
}

/**
 * Setup form submission
 */
function setupFormSubmission() {
    const form = document.getElementById('diaryForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const date = document.getElementById('diaryDate').value;
        const note = document.getElementById('diaryNote').value.trim();
        
        if (!date || !note) {
            showMessage('error', 'กรุณากรอกข้อมูลให้ครบถ้วน');
            return;
        }
        
        // Save to localStorage
        saveEntry(date, note);
        
        // Show success message
        showMessage('success', 'บันทึกสำเร็จแล้ว!');
        
        // Clear form
        clearForm();
        
        // Reload entries
        loadEntries();
    });
}

/**
 * Setup character counter
 */
function setupCharCounter() {
    const textarea = document.getElementById('diaryNote');
    const charCount = document.getElementById('charCount');
    
    textarea.addEventListener('input', function() {
        const count = this.value.length;
        charCount.textContent = `${count}/300`;
        
        if (count >= 290) {
            charCount.style.color = '#d32f2f';
        } else if (count >= 250) {
            charCount.style.color = '#f57c00';
        } else {
            charCount.style.color = '#8B4513';
        }
    });
}

/**
 * Setup edit form character counter
 */
function setupEditCharCounter() {
    const editTextarea = document.getElementById('editNote');
    const editCharCount = document.getElementById('editCharCount');
    
    if (editTextarea && editCharCount) {
        editTextarea.addEventListener('input', function() {
            const count = this.value.length;
            editCharCount.textContent = `${count}/300`;
            
            if (count >= 290) {
                editCharCount.style.color = '#d32f2f';
            } else if (count >= 250) {
                editCharCount.style.color = '#f57c00';
            } else {
                editCharCount.style.color = '#8B4513';
            }
        });
    }
}

/**
 * Save entry to localStorage
 */
function saveEntry(date, note) {
    const diary = getDiary();
    diary[date] = note;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(diary));
}

/**
 * Get all entries from localStorage
 */
function getDiary() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {};
}

/**
 * Load and display entries
 */
function loadEntries() {
    const diary = getDiary();
    const entriesList = document.getElementById('entriesList');
    
    // Get dates and sort (newest first)
    const dates = Object.keys(diary).sort((a, b) => new Date(b) - new Date(a));
    
    if (dates.length === 0) {
        entriesList.innerHTML = `
            <div class="no-entries">
                <p>📭 ยังไม่มีบันทึก</p>
                <p class="sub-text">เริ่มเขียนบันทึกวันแรกของคุณกันเลย!</p>
            </div>
        `;
        return;
    }
    
    // Build entries HTML
    let html = '';
    dates.forEach(date => {
        const note = diary[date];
        const formattedDate = formatDate(date);
        
        html += `
            <div class="entry-card">
                <div class="entry-header">
                    <span class="entry-date">📅 ${formattedDate}</span>
                    <div class="entry-actions">
                        <button class="btn-edit" onclick="editEntry('${date}')" title="แก้ไข">
                            ✏️
                        </button>
                        <button class="btn-delete" onclick="deleteEntry('${date}')" title="ลบ">
                            🗑️
                        </button>
                    </div>
                </div>
                <div class="entry-note">${escapeHtml(note)}</div>
            </div>
        `;
    });
    
    entriesList.innerHTML = html;
}

/**
 * Format date to Thai format
 */
function formatDate(dateString) {
    const date = new Date(dateString + 'T00:00:00');
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        weekday: 'long'
    };
    
    return date.toLocaleDateString('th-TH', options);
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Clear form
 */
function clearForm() {
    document.getElementById('diaryNote').value = '';
    document.getElementById('charCount').textContent = '0/300';
    setTodayDate();
}

/**
 * Show message
 */
function showMessage(type, message) {
    const successMsg = document.getElementById('successMessage');
    const errorMsg = document.getElementById('errorMessage');
    
    // Hide both first
    successMsg.style.display = 'none';
    errorMsg.style.display = 'none';
    
    // Show appropriate message
    if (type === 'success') {
        successMsg.textContent = '✅ ' + message;
        successMsg.style.display = 'block';
        
        // Auto hide after 3 seconds
        setTimeout(() => {
            successMsg.style.display = 'none';
        }, 3000);
    } else {
        errorMsg.textContent = '❌ ' + message;
        errorMsg.style.display = 'block';
        
        // Auto hide after 3 seconds
        setTimeout(() => {
            errorMsg.style.display = 'none';
        }, 3000);
    }
}

/**
 * Delete entry
 */
function deleteEntry(date) {
    const formattedDate = formatDate(date);
    
    if (!confirm(`ต้องการลบบันทึกวันที่ ${formattedDate} ใช่หรือไม่?`)) {
        return;
    }
    
    const diary = getDiary();
    delete diary[date];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(diary));
    
    showMessage('success', 'ลบบันทึกสำเร็จแล้ว');
    loadEntries();
}

/**
 * Clear all entries
 */
function clearAllEntries() {
    const diary = getDiary();
    const count = Object.keys(diary).length;
    
    if (count === 0) {
        alert('ไม่มีบันทึกให้ลบ');
        return;
    }
    
    if (!confirm(`ต้องการลบบันทึกทั้งหมด ${count} รายการใช่หรือไม่?\n\n⚠️ การกระทำนี้ไม่สามารถย้อนกลับได้!`)) {
        return;
    }
    
    localStorage.removeItem(STORAGE_KEY);
    showMessage('success', 'ลบบันทึกทั้งหมดสำเร็จแล้ว');
    loadEntries();
}

/**
 * Edit entry
 */
function editEntry(date) {
    const diary = getDiary();
    const note = diary[date];
    
    if (!note) {
        alert('ไม่พบบันทึกนี้');
        return;
    }
    
    // Set values in edit modal
    document.getElementById('editDate').value = date;
    document.getElementById('editNote').value = note;
    document.getElementById('editCharCount').textContent = `${note.length}/300`;
    
    // Show modal
    document.getElementById('editModal').style.display = 'flex';
    
    // Setup edit form submission
    const editForm = document.getElementById('editForm');
    editForm.onsubmit = function(e) {
        e.preventDefault();
        
        const editedNote = document.getElementById('editNote').value.trim();
        
        if (!editedNote) {
            alert('กรุณากรอกบันทึก');
            return;
        }
        
        // Save edited entry
        saveEntry(date, editedNote);
        
        // Close modal
        closeEditModal();
        
        // Show success message
        showMessage('success', 'แก้ไขบันทึกสำเร็จแล้ว');
        
        // Reload entries
        loadEntries();
    };
}

/**
 * Close edit modal
 */
function closeEditModal() {
    document.getElementById('editModal').style.display = 'none';
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
 * Close modal when clicking outside
 */
document.addEventListener('click', function(e) {
    const modal = document.getElementById('editModal');
    if (e.target === modal) {
        closeEditModal();
    }
});

/**
 * Export diary as JSON (Optional feature)
 */
function exportDiary() {
    const diary = getDiary();
    const dataStr = JSON.stringify(diary, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `coffee-diary-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
}

/**
 * Import diary from JSON (Optional feature)
 */
function importDiary(file) {
    const reader = new FileReader();
    
    reader.onload = function(e) {
        try {
            const imported = JSON.parse(e.target.result);
            
            if (confirm('ต้องการนำเข้าข้อมูล? ข้อมูลเดิมจะถูกแทนที่')) {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(imported));
                showMessage('success', 'นำเข้าข้อมูลสำเร็จแล้ว');
                loadEntries();
            }
        } catch (error) {
            alert('ไฟล์ไม่ถูกต้อง');
        }
    };
    
    reader.readAsText(file);
}

/*
 * DEVELOPER NOTES:
 * 
 * STORAGE STRUCTURE:
 * localStorage key: "coffeeDiary"
 * Value: JSON object with date as key and note as value
 * Example:
 * {
 *   "2025-10-08": "วันนี้ลอง Cold Brew เป็นครั้งแรก สดชื่นดี ☕",
 *   "2025-10-07": "อากาศดี ดื่มลาเต้ตอนบ่าย"
 * }
 * 
 * TO CUSTOMIZE:
 * - Change STORAGE_KEY to use different localStorage key
 * - Modify maxlength in textarea (currently 300)
 * - Adjust date format in formatDate() function
 * - Add export/import features using exportDiary() and importDiary()
 * 
 * TO ADD CATEGORIES/TAGS:
 * - Extend storage structure to include tags
 * - Add dropdown/checkbox for categories
 * - Filter entries by category
 * 
 * TO ADD SEARCH:
 * - Add search input in entries section
 * - Filter entries by keyword in loadEntries()
 * 
 * TO CONNECT TO DATABASE:
 * - Replace localStorage with fetch API calls
 * - Create PHP backend (save-diary.php, get-diary.php, etc.)
 * - Add user authentication
 */