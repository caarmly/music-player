class MusicPlayer {
    constructor(songs) {
        this.songs = songs;
        this.originalSongs = [...songs]; // Lưu bản sao của danh sách nhạc gốc để tìm kiếm k làm mất dữ liệu
        this.currentTrackIndex = 0;
        this.init();
    }

    //khởi tạo player khi trang tải xong
    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.renderSongs(); // hiển thị danh sách bài hát
            this.initializeControls();

             // Xóa class 'playing' khỏi tất cả bài hát
            document.querySelectorAll('.music-container').forEach(el => el.classList.remove('playing'));
        });
    }

    renderSongs() {
        const wrapper = document.getElementById('musicWrapper');
        wrapper.innerHTML = this.songs.map((song, index) => `
            <div class="music-container" data-index="${index}">
                <div class="song-info">
                    <img src="${song.cover}" alt="${song.title}">
                    <div class="text-info">
                        <h5 class="title">${song.title}</h5>
                        <p class="artist">${song.artist}</p>
                    </div>
                </div>
                <audio src="${song.audio}"></audio>
                <div class="player-controls">
                    <input type="range" class="progress" value="0">
                    <div class="controls">
                        <button class="prev"><i class="fas fa-backward"></i></button>
                        <button class="play"><i class="fas fa-play"></i></button>
                        <button class="next"><i class="fas fa-forward"></i></button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // xử lý các nút
    initializeControls() {
        document.querySelectorAll('.music-container').forEach(container => {
            const index = parseInt(container.dataset.index);
            const audio = container.querySelector('audio');
            const progress = container.querySelector('.progress');
            const playBtn = container.querySelector('.play');
            const prevBtn = container.querySelector('.prev');
            const nextBtn = container.querySelector('.next');

            container.classList.add('playing');
            // Xử lý play/pause
            playBtn.addEventListener('click', () => {
                if (audio.paused) {
                    this.playTrack(index);
                } else {
                    this.pauseTrack(index);
                }
            });

            // Xử lý progress bar
            progress.addEventListener('input', () => {
                audio.currentTime = (progress.value / 100) * audio.duration;
            });

            audio.addEventListener('timeupdate', () => {
                const progressPercent = (audio.currentTime / audio.duration) * 100;
                progress.value = progressPercent || 0;
            });

            // Xử lý kết thúc bài hát
            audio.addEventListener('ended', () => {
                this.playNext(index);
            });

            // Xử lý prev/next
            prevBtn.addEventListener('click', () => this.playPrev(index));
            nextBtn.addEventListener('click', () => this.playNext(index));
        });
    }

    playTrack(index) {
        if (this.currentTrackIndex !== index) {
            this.pauseTrack(this.currentTrackIndex);
        }
    
        const container = document.querySelectorAll('.music-container')[index];
        const audio = container.querySelector('audio');
        const playBtn = container.querySelector('.play i');
    
        audio.play();
        playBtn.classList.replace('fa-play', 'fa-pause');
        document.title = container.querySelector('.title').textContent;
        this.currentTrackIndex = index;
    
      
        // Thêm class 'playing' vào bài hát đang phát
        container.classList.add('playing');
    }
    

    pauseTrack(index) {
        const container = document.querySelectorAll('.music-container')[index];
        const audio = container.querySelector('audio');
        const playBtn = container.querySelector('.play i');
    
        audio.pause();
        playBtn.classList.replace('fa-pause', 'fa-play');
    
        // Xóa class 'playing' để bài hát trở về màu ban đầu
        container.classList.remove('playing');
    }
    
    playPrev(index) {
        const prevIndex = (index - 1 + this.songs.length) % this.songs.length;
        this.playTrack(prevIndex);
    }

    playNext(index) {
        const nextIndex = (index + 1) % this.songs.length;
        this.playTrack(nextIndex);
    }

    searchSongs(keyword = '') {
        if (!keyword.trim()) {
            this.songs = [...this.originalSongs];
        } else {
            keyword = keyword.toLowerCase();
            this.songs = this.originalSongs.filter(song => 
                song.title.toLowerCase().includes(keyword) || 
                song.artist.toLowerCase().includes(keyword)
            );
        }
        this.renderSongs();
        this.initializeControls();
    }

    searchSongs(keyword = '') {
        if (!keyword.trim()) {
            // Nếu không có từ khóa, hiển thị lại toàn bộ danh sách
            this.songs = [...this.originalSongs];
        } else {
            // Tìm kiếm theo tên bài hát hoặc tên nghệ sĩ
            keyword = keyword.toLowerCase();
            this.songs = this.originalSongs.filter(song => 
                song.title.toLowerCase().includes(keyword) || 
                song.artist.toLowerCase().includes(keyword)
            );
        }
        
        // Cập nhật giao diện
        this.renderSongs();
        this.initializeControls();

        // Hiển thị thông báo kết quả tìm kiếm
        const resultCount = this.songs.length;
        const searchResult = document.createElement('div');
        searchResult.textContent = `Tìm thấy ${resultCount} bài hát`;
        
        const wrapper = document.getElementById('musicWrapper');
        wrapper.insertBefore(searchResult, wrapper.firstChild);
    }
}


