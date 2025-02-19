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

    //Nếu có bài hát khác đang phát, dừng bài hát đó
    if(currentTrackIndex !== -1 && currentTrackIndex !== index){
        pauseTrack(currentTrackIndex);
    }

    audio.play();
    updateTitle(index);
    updatePlayButton(index, true);
    currentTrackIndex = index;
}

// Hàm dừng bài hát
function pauseTrack(index) {
    const audio = musicContainers[index].querySelector('audio');
    audio.pause();
    updatePlayButton(index, false);
}

// Cập nhật tiêu đề bài hát
function updateTitle(index) {
    const title = musicContainers[index].querySelector('#title').innerText;
    document.title = title; // Cập nhật tiêu đề trang
}

// Cập nhật icon play/pause
function updatePlayButton(index, isPlaying) {
    const icon = playButtons[index].querySelector('i');
    if (isPlaying) {
        icon.classList.remove('fa-play');
        icon.classList.add('fa-pause');
    } else {
        icon.classList.remove('fa-pause');
        icon.classList.add('fa-play');
    }
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

// Xử lý sự kiện cho thanh tiến trình: cho phép người dùng tua bài hát
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

// Tự động chuyển bài khi bài hát kết thúc
musicContainers.forEach((container, index) => {
    const audio = container.querySelector('audio');
    audio.addEventListener('ended', () => {
        if (index < musicContainers.length - 1) {
            playTrack(index + 1);
        } else {
            // Nếu là bài cuối cùng, phát lại từ đầu (tùy chọn)
            playTrack(0);
        }
    });
});


//slideshow
document.addEventListener("DOMContentLoaded", function () {
    const listImage = document.querySelector(".list-images");
    const imgs = document.querySelectorAll(".list-images img");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    if (!listImage || imgs.length === 0) {
        console.error("Không tìm thấy phần tử .list-images hoặc không có ảnh nào.");
        return;
    }

    let index = 0; // Vị trí ảnh hiện tại
    const totalImages = imgs.length;
    const imageWidth = imgs[0].offsetWidth;

    function updateSlide() {
        listImage.style.transform = `translateX(-${index * imageWidth}px)`;
    }

    function nextImage() {
        index = (index + 1) % totalImages; // Chuyển ảnh kế tiếp
        updateSlide();
    }

    function prevImage() {
        index = (index - 1 + totalImages) % totalImages; // Chuyển ảnh trước
        updateSlide();
    }

    // Tự động chuyển slide
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


