let message = "Default message";

document.addEventListener('DOMContentLoaded', function() {
    let navigates = document.querySelectorAll('.navigate');
    navigates.forEach(navigate => {
        navigate.addEventListener('click', () => {
            const info = document.querySelector(".hidden-info")
            message = navigate.getAttribute("data-filter")
            console.log(message)
            info.style.display = "block"
        })
    })
    // Tab Filter Functionality
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.addEventListener('click', function() {
            sections.forEach(s => s.classList.remove('active'));
            this.classList.add('active');
            const filter = this.getAttribute('data-filter');
            filterVideos(filter);
        });
    });

    // Load YouTube Feed (Example with mock data)
    loadYouTubeFeed();

    // Mock function - replace with actual YouTube API integration
    function loadYouTubeFeed() {
        const feedContainer = document.getElementById('youtube-feed');

        // Show loading state
        feedContainer.innerHTML = `
            <div class="video-placeholder">
                <div class="loading"></div>
                <p>Memuat video dari YouTube...</p>
            </div>
        `;

        // Simulate API delay
        setTimeout(() => {
            // Mock data - replace with actual API response
            const mockVideos = [
                {
                    id: 'QiV3UpJb3sk',
                    title: 'Thank for UI dandadan',
                    thumbnail: 'https://i.ytimg.com/vi/QiV3UpJb3sk/maxresdefault.jpg',
                    duration: '00.09',
                    views: '505',
                    date: '16 Mar 2025',
                    type: 'script'
                },
                {
                    id: 'scmAKJSLf2o',
                    title: 'Kobo kanaeru - Minecraft moment',
                    thumbnail: 'https://i.ytimg.com/vi/scmAKJSLf2o/maxresdefault.jpg',
                    duration: '00.09',
                    views: '0',
                    date: '16 Mar 2025',
                    type: 'gaming'
                },
                {
                    id: 'q_OuImZgKTQ',
                    title: 'Kaela Kovalskia',
                    thumbnail: 'https://i.ytimg.com/vi/q_OuImZgKTQ/maxresdefault.jpg',
                    duration: '00.09',
                    views: '14',
                    date: '9 Apr 2025',
                    type: 'gaming'
                },
                {
                    id: 'BE7j4uN8FnM',
                    title: 'egg - linga guli guli (Slowed)',
                    thumbnail: 'https://i.ytimg.com/vi/BE7j4uN8FnM/maxresdefault.jpg',
                    duration: '00.09',
                    views: '2k',
                    date: '4 Apr 2025',
                    type: 'other'
                },
                // Add more mock videos as needed
            ];

            renderPost(mockVideos);
        }, 1500);
    }

    function renderPost(videos) {
        const feedContainer = document.getElementById('youtube-feed');
        
        if (videos.length === 0) {
            feedContainer.innerHTML = `
                <div class="video-placeholder">
                    <i class="fas fa-video-slash"></i>
                    <p>Tidak ada video yang ditemukan</p>
                </div>
            `;
            return;
        }

        feedContainer.innerHTML = videos.map(video => `
            <div class="video-card" data-type="${video.type}">
                <div class="video-thumbnail" data-video-id="${video.id}">
                    <img src="https://img.youtube.com/vi/${video.id}/maxresdefault.jpg" alt="${video.title}">
                    <div class="play-button">
                        <i class="fas fa-play"></i>
                    </div>
                    <div class="video-duration">${video.duration}</div>
                </div>
                <div class="video-info">
                    <div class="video-title">${video.title}</div>
                    <div class="video-meta">
                        <span>${video.views} views</span>
                        <span>${video.date}</span>
                    </div>
                </div>
            </div>
        `).join('');

        setupThumbnailClickHandlers();
    }

    function setupThumbnailClickHandlers() {
        const thumbnails = document.querySelectorAll('.video-thumbnail');
        
        thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', function() {
                const videoId = this.getAttribute('data-video-id');
                this.innerHTML = `
                    <iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1&enablejsapi=1" 
                            frameborder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowfullscreen></iframe>
                `;
                // Optional: Add to history or track plays
                trackVideoPlay(videoId);
            });
        });
    }

    function trackVideoPlay(videoId) {
        console.log(`Video ${videoId} played`);
        // Add analytics tracking here if needed
    }

    function filterVideos(filter) {
        const allVideos = document.querySelectorAll('.video-card');
        
        allVideos.forEach(video => {
            if (filter === 'all' || video.getAttribute('data-type') === filter) {
                video.style.display = 'block';
            } else {
                video.style.display = 'none';
            }
        });
    }

    
});

let players = [];

function onYouTubeIframeAPIReady() {
    const iframes = document.querySelectorAll('.video-player iframe');
    iframes.forEach((iframe, index) => {
        players[index] = new YT.Player(iframe, {
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
    });
}

function onPlayerReady(event) {
    // Player siap digunakan
}

function onPlayerStateChange(event) {
    // Bisa ditambahkan logika ketika state player berubah
}

const whatsappBtn = document.getElementById('whatsapp-order');

function handleWhatsappOrder() {
    const phoneNumber = "081937194823"; // Your number

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

whatsappBtn.addEventListener('click', handleWhatsappOrder);
