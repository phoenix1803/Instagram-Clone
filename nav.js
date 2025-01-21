const searchBtn = document.getElementById('searchBtn');
const searchModal = document.getElementById('searchModal');
const searchOverlay = document.getElementById('searchOverlay');
const searchInput = document.querySelector('.search-input');
const clearAllBtn = document.querySelector('.clear-all');
let recentSearches = JSON.parse(localStorage.getItem('recentSearches') || '[]');

function addRecentSearch(search) {
    if (!search.trim()) return;
    recentSearches = recentSearches.filter(item => item !== search);
    recentSearches.unshift(search);
    recentSearches = recentSearches.slice(0, 8);
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
    displayRecentSearches();
}

function displayRecentSearches() {
    const recentList = document.createElement('div');
    recentSearches.forEach(search => {
        const searchItem = document.createElement('div');
        searchItem.className = 'recent-search-item';
        searchItem.innerHTML = `
            <div style="display: flex; align-items: center; padding: 12px 16px; cursor: pointer;">
                <i class="fas fa-clock" style="color: #8e8e8e; margin-right: 12px; font-size: 14px;"></i>
                <span style="flex-grow: 1; color: #fff;">${search}</span>
                <i class="fas fa-times remove-search" style="color: #8e8e8e; cursor: pointer; font-size: 14px;"></i>
            </div>
        `;
        
        searchItem.querySelector('.remove-search').addEventListener('click', (e) => {
            e.stopPropagation();
            recentSearches = recentSearches.filter(item => item !== search);
            localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
            displayRecentSearches();
        });

        recentList.appendChild(searchItem);
    });

    const recentContent = document.querySelector('.recent-searches');
    const recentHeader = recentContent.querySelector('.recent-header');
    recentContent.innerHTML = '';
    recentContent.appendChild(recentHeader);
    recentContent.appendChild(recentList);
}

searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    searchModal.style.display = 'block';
    searchOverlay.style.display = 'block';
    searchInput.focus();
});

searchOverlay.addEventListener('click', () => {
    searchModal.style.display = 'none';
    searchOverlay.style.display = 'none';
});

clearAllBtn.addEventListener('click', () => {
    recentSearches = [];
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
    displayRecentSearches();
});

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && searchInput.value.trim()) {
        addRecentSearch(searchInput.value.trim());
        searchInput.value = '';
    }
});

document.addEventListener('click', (e) => {
    if (!searchModal.contains(e.target) && 
        !searchBtn.contains(e.target) && 
        searchModal.style.display === 'block') {
        searchModal.style.display = 'none';
        searchOverlay.style.display = 'none';
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        searchModal.style.display = 'none';
        searchOverlay.style.display = 'none';
    }
});

displayRecentSearches();