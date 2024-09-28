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
        const message = encodeURIComponent(userMessage);
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