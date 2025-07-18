let message = "Default message";

document.addEventListener('DOMContentLoaded', function() {
    let navigates = document.querySelectorAll('.navigate');
    navigates.forEach(navigate => {
        navigate.addEventListener('click', () => {
            const info = document.querySelector(".hidden-info")
            message = navigate.getAttribute("data-filter")
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
                    id: 'N-oRwwjOtvQ',
                    title: 'mLOOP OF DOOM - Juno Ujuki',
                    thumbnail: 'https://i.ytimg.com/vi/N-oRwwjOtvQ/maxresdefault.jpg',
                    duration: '00.29',
                    views: '1,2k',
                    date: '9 Juli 2025',
                    type: 'gaming'
                },
                {
                    id: '-RjLl0ECcAI',
                    title: 'making me SWEAT over here - Juno Ujuki',
                    thumbnail: 'https://i.ytimg.com/vi/-RjLl0ECcAI/maxresdefault.jpg',
                    duration: '00.29',
                    views: '1,4k',
                    date: '9 Juni 2025',
                    type: 'gaming'
                },
                {
                    id: 'thArqvAkNxQ',
                    title: 'No balls - Juno Ujuki',
                    thumbnail: 'https://i.ytimg.com/vi/thArqvAkNxQ/maxresdefault.jpg',
                    duration: '00.27',
                    views: '154',
                    date: '6 Jun 2025',
                    type: 'gaming'
                },
                {
                    id: 'CuIdqQbD-74',
                    title: '5 dollars is 5 dollars - Juno Ujuki',
                    thumbnail: 'https://i.ytimg.com/vi/CuIdqQbD-74/maxresdefault.jpg',
                    duration: '00.30',
                    views: '2,9k',
                    date: '14 Mei 2025',
                    type: 'gaming'
                },
                {
                    id: '8cY2IErCRYE',
                    title: 'Anya explaind Bijou how "Foot Fetish" works! - vtuber Koseki Bijou and Anya Melfisa',
                    thumbnail: 'https://i.ytimg.com/vi/8cY2IErCRYE/maxresdefault.jpg',
                    duration: '00.34',
                    views: '903',
                    date: '22 Apr 2025',
                    type: 'gaming'
                },
                {
                    id: 'q_OuImZgKTQ',
                    title: 'Game Horor? tapi gak bisa pake mouse harus typing - vtuber Kaela Kovalskia',
                    thumbnail: 'https://i.ytimg.com/vi/q_OuImZgKTQ/maxresdefault.jpg',
                    duration: '00.09',
                    views: '1,7k',
                    date: '9 Apr 2025',
                    type: 'gaming'
                },
                {
                    id: 'BE7j4uN8FnM',
                    title: 'Telur Joget - 2d Riging Animation on Davinci Resolve',
                    thumbnail: 'https://i.ytimg.com/vi/BE7j4uN8FnM/maxresdefault.jpg',
                    duration: '00.09',
                    views: '2,1k',
                    date: '4 Apr 2025',
                    type: 'other'
                },
                {
                    id: 'scmAKJSLf2o',
                    title: 'Khodam Kalian Apa Ges? kalo aku TOREN AIR - Vtuber Kobo kanaeru',
                    thumbnail: 'https://i.ytimg.com/vi/scmAKJSLf2o/maxresdefault.jpg',
                    duration: '00.09',
                    views: '26',
                    date: '16 Mar 2025',
                    type: 'gaming'
                },
                {
                    id: 'Aawfz6sOHBQ',
                    title: 'Giliran pacaran malah gak takut dosa - Vtuber Uidandadan',
                    thumbnail: 'https://i.ytimg.com/vi/Aawfz6sOHBQ/maxresdefault.jpg',
                    duration: '00.46',
                    views: '1,8k',
                    date: '16 Mar 2025',
                    type: 'script'
                },
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

function onPlayerReady(event) {}

function onPlayerStateChange(event) {
}

const whatsappBtn = document.getElementById('whatsapp-order');
const kofBtn = document.getElementById('kof-order');
const xBtn = document.getElementById('x-order');

function handleWhatsappOrder() {
    const phoneNumber = "081937194823";
    // const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    // window.open(url, '_blank');

    window.open("http://discordapp.com/users/1338623044926832722")
}

xBtn.addEventListener('click', () => {
    window.open('https://x.com/its_zenkai')
})

kofBtn.addEventListener('click', () => {
    window.open(message, '_blank')
})

whatsappBtn.addEventListener('click', handleWhatsappOrder);

// kofBtn.addEventListener('click', () =>  {
//     window.open(`mailto:jasangeditsampit@anda.com?subject=Hello Zenkai👋&body=${encodeURIComponent(message)} \n // type what you need`)
// })
