//slideshow
document.addEventListener("DOMContentLoaded", function () {
    const listImage = document.querySelector(".list-images");
    const imgs = document.querySelectorAll(".list-images img");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    let index = 0; // Vị trí ảnh hiện tại
    const totalImages = imgs.length; // tổng số ảnh
    const imageWidth = imgs[0].offsetWidth; // chiều rộng của 1 ảnh

    function updateSlide() {
        listImage.style.transform = `translateX(-${index * imageWidth}px)`;
        // khi index thay đổi -> listImage dịch chuyển theo chiều X ( chiều ngang)
    }

    function nextImage() {
        index = (index + 1) % totalImages; // Chuyển ảnh kế tiếp
        updateSlide();
    }

    function prevImage() {
        index = (index - 1 + totalImages) % totalImages; // Chuyển ảnh trước
        updateSlide();
    }

    // Tự động chuyển slide sau 4s
    let autoSlide = setInterval(nextImage, 4000);


    // Xử lý sự kiện khi người dùng nhấn nút
    nextBtn.addEventListener("click", function () {
        clearInterval(autoSlide); // Dừng tự động khi người dùng thao tác
        nextImage();
        autoSlide = setInterval(nextImage, 4000); // Khởi động lại tự động
    });

    prevBtn.addEventListener("click", function () {
        clearInterval(autoSlide); // Dừng tự động khi người dùng thao tác
        prevImage();
        autoSlide = setInterval(nextImage, 4000); // Khởi động lại tự động
    });
});

//TÌM KIẾM
class GlobalSearch {
    constructor() {
        this.allSongs = [];
        this.init();
    }

    init() {
        // Gộp tất cả bài hát từ các thể loại
        this.allSongs = [
            ...VPOP_SONGS.map(song => ({ ...song, genre: 'vpop' })),
            ...KPOP_SONGS.map(song => ({ ...song, genre: 'kpop' })),
            ...CPOP_SONGS.map(song => ({ ...song, genre: 'cpop' })),
            ...USUK_SONGS.map(song => ({ ...song, genre: 'usuk' })),
            // Thêm các thể loại khác nếu có
        ];

        // Thêm sự kiện tìm kiếm
        const searchInput = document.getElementById('search');
        const searchButton = document.querySelector('.search-container button');

        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.searchSongs(searchInput.value);
            }
        });

        searchButton.addEventListener('click', () => {
            this.searchSongs(searchInput.value);
        });
    }

    searchSongs(keyword = '') {
        if (!keyword.trim()) {
            this.hideSearchResults();
            return;
        }

        keyword = keyword.toLowerCase();
        const results = this.allSongs.filter(song => 
            song.title.toLowerCase().includes(keyword) || 
            song.artist.toLowerCase().includes(keyword)
        );

        this.displaySearchResults(results);
    }

    displaySearchResults(results) {
        // Ẩn album container
        const albumContainer = document.getElementById('album-container');
        albumContainer.style.display = 'none';

        // Tạo và hiển thị kết quả tìm kiếm
        let searchResultsContainer = document.getElementById('search-results');
        if (!searchResultsContainer) {
            searchResultsContainer = document.createElement('div');
            searchResultsContainer.id = 'search-results';
            albumContainer.parentNode.insertBefore(searchResultsContainer, albumContainer);
        }

        if (results.length === 0) {
            searchResultsContainer.innerHTML = `
                <div class="no-results">
                    <h3>Không tìm thấy bài hát nào</h3>
                    <button onclick="globalSearch.hideSearchResults()">Quay lại</button>
                </div>
            `;
            return;
        }

        searchResultsContainer.innerHTML = `
            <div class="search-header">
                <h3>Tìm thấy ${results.length} bài hát</h3>
                <button onclick="globalSearch.hideSearchResults()">Quay lại</button>
            </div>
            <div class="search-results-grid">
                ${results.map(song => `
                    <div class="search-result-item" onclick="window.location.href='${song.genre}.html'">
                        <img src="${song.cover}" alt="${song.title}">
                        <div class="song-info">
                            <h4>${song.title}</h4>
                            <p>${song.artist}</p>
                            <span class="genre-tag">${song.genre.toUpperCase()}</span>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

hideSearchResults() {
    const searchResultsContainer = document.getElementById('search-results');
    const slideShow = document.querySelector('.slide-show');
    const albumContainer = document.getElementById('album-container');

    if (searchResultsContainer) {
        searchResultsContainer.remove();
    }
    if (slideShow) slideShow.style.display = 'block';
    if (albumContainer) {
        albumContainer.style.display = 'flex';  // Thay đổi từ 'grid' sang 'flex'
        albumContainer.style.flexWrap = 'wrap';
        albumContainer.style.justifyContent = 'center';
    }
    
    const searchInput = document.getElementById('search');
    if (searchInput) searchInput.value = '';
}
}

// Khởi tạo khi trang được load
document.addEventListener('DOMContentLoaded', () => {
    window.globalSearch = new GlobalSearch();
});
