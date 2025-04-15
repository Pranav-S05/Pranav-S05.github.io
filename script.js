document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel');
    const items = document.querySelectorAll('.carousel-item');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentIndex = 0;
    function updateCarousel() {
        items.forEach((item, index) => {
            item.className = 'carousel-item';
            if (index === currentIndex) {
                item.classList.add('active');
            } else if (index === (currentIndex - 1 + items.length) % items.length) {
                item.classList.add('prev');
            } else if (index === (currentIndex + 1) % items.length) {
                item.classList.add('next');
            }
        });
    }
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        updateCarousel();
    });
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % items.length;
        updateCarousel();
    });
    updateCarousel();
});

document.addEventListener('DOMContentLoaded', function() {
    logEvent('view', 'website loaded');
    document.addEventListener('visibilitychange', function() {
        if (document.visibilityState === 'visible') {
            logEvent('view', 'website is visible');
        }
    });
    document.addEventListener('click', function(event) {
        const target = event.target;
        let elementInfo = getElementInfo(target);
        logEvent('click', elementInfo);
    });
});

function getElementInfo(element) {
    if (element.tagName === 'A') return `link: ${element.textContent}`;
    if (element.tagName === 'BUTTON') return `button: ${element.textContent}`;
    if (element.tagName === 'IMG') return `image: ${element.alt || 'image'}`;
    if (element.tagName === 'INPUT') return `input: ${element.type}`;
    return `${element.tagName.toLowerCase()}: ${element.className || 'no-class'}`;
}

function logEvent(eventType, objectInfo) {
    const timestamp = new Date().toISOString();
    console.log(`${timestamp} , ${eventType} , ${objectInfo}`);
}

function analyzeText() {
    // Get text and validate
    const text = document.querySelector('#text-input').value;
    

    // Basic counts with improved accuracy
    const letters = (text.match(/[a-zA-Z]/g) || []).length;
    const words = text ? text.trim().split(/\s+/).length:0;
    const spaces = (text.match(/\s/g) || []).length;
    const newlines = (text.match(/\n/g) || []).length;
    const specialChars = (text.match(/[^a-zA-Z0-9\s]/g) || []).length;

    // Word-based analysis
    const wordList = text.toLowerCase().match(/\b\w+\b/g) || [];

    // Pronouns analysis with categorization
    const pronounGroups = {
        'Personal': ['i', 'me', 'my', 'mine', 'myself', 'you', 'your', 'yours', 'yourself',
                    'he', 'him', 'his', 'himself', 'she', 'her', 'hers', 'herself',
                    'it', 'its', 'itself', 'we', 'us', 'our', 'ours', 'ourselves',
                    'they', 'them', 'their', 'theirs', 'themselves'],
        'Demonstrative': ['this', 'that', 'these', 'those'],
        'Relative': ['who', 'whom', 'whose', 'which', 'that']
    };

    // Prepositions list
    const prepositions = ['about', 'above', 'across', 'after', 'against', 'along', 
                         'among', 'around', 'at', 'before', 'behind', 'below', 
                         'beneath', 'beside', 'between', 'beyond', 'by', 'down',
                         'during', 'for', 'from', 'in', 'inside', 'into', 'near',
                         'of', 'off', 'on', 'out', 'outside', 'over', 'through',
                         'to', 'toward', 'under', 'up', 'upon', 'with', 'within'];

    // Articles
    const articles = ['a', 'an', 'the'];

    // Count occurrences
    const pronounCounts = {};
    const prepositionCounts = {};
    const articleCounts = {};

    wordList.forEach(word => {
        // Count pronouns by category
        Object.entries(pronounGroups).forEach(([category, pronouns]) => {
            if (pronouns.includes(word)) {
                pronounCounts[word] = (pronounCounts[word] || 0) + 1;
            }
        });

        // Count prepositions
        if (prepositions.includes(word)) {
            prepositionCounts[word] = (prepositionCounts[word] || 0) + 1;
        }

        // Count articles
        if (articles.includes(word)) {
            articleCounts[word] = (articleCounts[word] || 0) + 1;
        }
    });

    // Create results HTML
    const results = `
        <div class="result-section">
            <h3>Basic Text Analysis</h3>
            <div class="stat-grid">
                <div class="stat-item">
                    <span class="stat-label">Letters:</span>
                    <span class="stat-value">${letters.toLocaleString()}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Words:</span>
                    <span class="stat-value">${words.toLocaleString()}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Spaces:</span>
                    <span class="stat-value">${spaces.toLocaleString()}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Newlines:</span>
                    <span class="stat-value">${newlines.toLocaleString()}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Special Characters:</span>
                    <span class="stat-value">${specialChars.toLocaleString()}</span>
                </div>
            </div>
        </div>

        <div class="result-section">
            <h3>Pronouns -></h3>
            <div class="word-counts">
                ${formatWordCounts(pronounCounts)}
            </div>
        </div>

        <div class="result-section">
            <h3>Prepositions -></h3>
            <div class="word-counts">
                ${formatWordCounts(prepositionCounts)}
            </div>
        </div>

        <div class="result-section">
            <h3>Articles -></h3>
            <div class="word-counts">
                ${formatWordCounts(articleCounts)}
            </div>
        </div>
    `;

    // Display results
    document.getElementById('results').innerHTML = results;
    document.getElementById('results').classList.add('show');
}

function formatWordCounts(countObj) {
    return Object.entries(countObj)
        .sort(([,a], [,b]) => b - a)
        .map(([word, count]) => `
            <div class="word-count-item">
                <span class="word">${word}</span>
                <span class="count">${count}</span>
            </div>
        `).join('');
}