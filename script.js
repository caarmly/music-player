// Lấy tất cả các phần tử âm thanh và nút điều khiển
const musicContainers = document.querySelectorAll('.music-container');
let currentTrackIndex = 0; // Chỉ số bài hát hiện tại

// Lấy các nút điều khiển
const prevButtons = document.querySelectorAll('#prev');
const playButtons = document.querySelectorAll('#play');
const nextButtons = document.querySelectorAll('#next');
const progressBars = document.querySelectorAll('#progress');

// Hàm phát bài hát
function playTrack(index) {
    const audio = musicContainers[index].querySelector('audio');
    audio.play();
    updateTitle(index);
}

// Hàm dừng bài hát
function pauseTrack(index) {
    const audio = musicContainers[index].querySelector('audio');
    audio.pause();
}

// Cập nhật tiêu đề bài hát
function updateTitle(index) {
    const title = musicContainers[index].querySelector('#title').innerText;
    document.title = title; // Cập nhật tiêu đề trang
}

// Xử lý sự kiện cho nút Play
playButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        const audio = musicContainers[index].querySelector('audio');
        
        // Kiểm tra xem bài hát có đang phát không
        if (audio.paused) {
            playTrack(index);
        } else {
            pauseTrack(index);
        }
    });
});

// Xử lý sự kiện cho nút Previous
prevButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        if (index > 0) {
            pauseTrack(index);
            playTrack(index - 1);
        }
    });
});

// Xử lý sự kiện cho nút Next
nextButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        if (index < musicContainers.length - 1) {
            pauseTrack(index);
            playTrack(index + 1);
        }
    });
});

// Xử lý sự kiện cho thanh tiến trình
progressBars.forEach((progressBar, index) => {
    progressBar.addEventListener('input', () => {
        const audio = musicContainers[index].querySelector('audio');
        audio.currentTime = (progressBar.value / 100) * audio.duration;
    });
});

// Cập nhật thanh tiến trình khi âm thanh đang phát
musicContainers.forEach((container, index) => {
    const audio = container.querySelector('audio');
    audio.addEventListener('timeupdate', () => {
        const progress = Math.floor((audio.currentTime / audio.duration) * 100);
        progressBars[index].value = progress;
    });
});