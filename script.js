// Show message section on card click
document.getElementById('openCard').addEventListener('click', function () {
    const openContainer = document.getElementById('openCardContainer');
    const messages = document.getElementById('messages');

    // Animasi untuk menyembunyikan kartu pembuka dan menampilkan pesan
    openContainer.classList.add('hidden');
    setTimeout(() => {
        openContainer.style.display = 'none'; // Menghapus dari tampilan
        messages.classList.add('visible');
        document.body.style.overflowY = 'auto'; // Izinkan scrolling
        window.dispatchEvent(new Event('scroll')); // Memicu event scroll untuk animasi message-card
    }, 500); // Waktu penundaan yang sinkron dengan CSS
});

// Show modal on heart click
document.getElementById('loveIcon').addEventListener('click', function () {
    document.getElementById('wishModal').style.display = 'flex'; // Tampilkan modal
});

// Send the custom message via WhatsApp
document.getElementById('sendMessage').addEventListener('click', function () {
    const userMessage = document.getElementById('userMessage').value;

    if (userMessage.trim()) { // Mengecek jika input tidak kosong
        const phoneNumber = '628979429912'; // Ganti dengan nomor WhatsApp yang diinginkan
        const message = encodeURIComponent('Makasih ya udah inget ulang tahun aku, di hari spesial ini aku mau' + userMessage);
        const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;
        window.open(whatsappURL, '_blank'); // Buka WhatsApp di tab baru
        document.getElementById('wishModal').style.display = 'none'; // Sembunyikan modal
    } else {
        alert("Tulis pesan dulu ya!"); // Alert jika input kosong
    }
});

// Scroll animations for message-card elements
window.addEventListener('scroll', function () {
    const messageCards = document.querySelectorAll('.message-card');
    const windowHeight = window.innerHeight;

    messageCards.forEach((card) => {
        const cardTop = card.getBoundingClientRect().top;

        // Memastikan elemen sudah dalam viewport
        if (cardTop < windowHeight - 100) {
            card.classList.add('visible');
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    // Function to handle intersection
    const handleIntersection = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing after visible
            }
        });
    };

    // Create an observer
    const options = {
        threshold: 0.1
    };
    const observer = new IntersectionObserver(handleIntersection, options);

    // Observe each message-card
    const messageCards = document.querySelectorAll('.message-card');
    messageCards.forEach(card => {
        observer.observe(card);
    });

    // Play music when messages become visible
    const messages = document.getElementById('messages');
    const backgroundMusic = document.getElementById('backgroundMusic');

    const messagesObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                backgroundMusic.play().catch(function (error) {
                    console.error('Tidak dapat memutar musik:', error);
                });
                messagesObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    messagesObserver.observe(messages);
});
