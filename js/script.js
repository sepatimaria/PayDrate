document.addEventListener('DOMContentLoaded', () => {
    // 1. STATE MANAGEMENT
    let currentTemp = 'Cold'; 
    let currentVolume = '600ml'; 
    let currentPrice = 4000;
    let cartCount = 0;

    // ELEMEN DIBAWAH INI DISESUAIKAN DENGAN HTML ASLI ANDA
    const profileBtn = document.querySelector('.flex.items-center.gap-2.p-1.5.pr-3'); // Mencari tombol profil Amanda
    const profileDropdown = document.getElementById('profileDropdown'); // Dropdown profil
    
    // Menyesuaikan dengan ID asli di HTML Anda (btnTempCold & btnTempHot)
    const tempColdBtn = document.getElementById('btnTempCold'); 
    const tempHotBtn = document.getElementById('btnTempHot'); 
    
    const volSelectButtons = document.querySelectorAll('.vol-select-btn');
    const priceDisplay = document.getElementById('card-price-display');
    
    // Menyesuaikan dengan ID tombol tambah di HTML Anda
    const btnAddToBag = document.getElementById('btnAddToBag') || document.querySelector('button.w-full.py-4.rounded-xl.bg-cyan-500'); 
    
    // Menyesuaikan dengan ID badge keranjang di HTML Anda (cartBadgeCount)
    const cartBadge = document.getElementById('cartBadgeCount'); 
    const toastContainer = document.getElementById('toast-container');
    
    // Elemen visual botol SVG asli Anda
    const bottleBgContainer = document.getElementById('bottle-bg-container');
    const bottleGlow = document.getElementById('bottle-glow');
    const bottleGraphic = document.getElementById('bottle-graphic') || document.querySelector('.bottle-svg');
    const bottleWater = document.getElementById('bottle-water') || document.querySelector('.bottle-liquid');
    const capacityLabel = document.getElementById('bottle-capacity-label') || document.querySelector('span.mt-6');

    // 2. DROPDOWN USER PROFILE LOGIC
    if (profileBtn && profileDropdown) {
        profileBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            profileDropdown.classList.toggle('hidden');
            profileDropdown.classList.toggle('opacity-0');
            profileDropdown.classList.toggle('invisible');
        });
        document.addEventListener('click', () => {
            if (profileDropdown) {
                profileDropdown.classList.add('hidden', 'opacity-0', 'invisible');
            }
        });
    }

    // 3. SELEKSI SUHU (COLD / HOT)
    if (tempColdBtn && tempHotBtn) {
        tempColdBtn.addEventListener('click', () => {
            currentTemp = 'Cold';
            // Kembalikan ke warna cyan khas desain Anda
            tempColdBtn.className = "flex flex-col items-center justify-center p-4 rounded-xl border border-cyan-500/30 bg-cyan-950/20 text-cyan-400 font-medium transition-all cursor-pointer";
            tempHotBtn.className = "flex flex-col items-center justify-center p-4 rounded-xl border border-slate-800 bg-slate-900/50 text-slate-400 font-medium hover:border-slate-700 transition-all cursor-pointer";
            
            if (bottleGraphic) bottleGraphic.style.filter = "drop-shadow(0 0 15px rgba(6, 182, 212, 0.3))";
        });

        tempHotBtn.addEventListener('click', () => {
            currentTemp = 'Hot';
            // Ubah tombol hot menjadi oranye/merah hangat saat aktif
            tempHotBtn.className = "flex flex-col items-center justify-center p-4 rounded-xl border border-orange-500/30 bg-orange-950/20 text-orange-400 font-medium transition-all cursor-pointer";
            tempColdBtn.className = "flex flex-col items-center justify-center p-4 rounded-xl border border-slate-800 bg-slate-900/50 text-slate-400 font-medium hover:border-slate-700 transition-all cursor-pointer";
            
            if (bottleGraphic) bottleGraphic.style.filter = "drop-shadow(0 0 15px rgba(249, 115, 22, 0.3))";
        });
    }

    // 4. SELEKSI UKURAN VOLUME
    volSelectButtons.forEach(button => {
        button.addEventListener('click', () => {
            volSelectButtons.forEach(btn => {
                btn.className = "vol-select-btn w-full p-4 rounded-xl border text-left flex justify-between items-center border-slate-800 bg-slate-900/50 transition-all cursor-pointer";
            });
            
            // Berikan tanda aktif pada tombol yang diklik
            button.className = "vol-select-btn w-full p-4 rounded-xl border text-left flex justify-between items-center border-cyan-500/30 bg-cyan-950/20 transition-all cursor-pointer";
            
            // Ambil text langsung dari elemen HTML asli Anda
            const titleEl = button.querySelector('p.font-bold');
            if (titleEl) {
                currentVolume = titleEl.textContent.trim();
                if (capacityLabel) capacityLabel.textContent = `${currentVolume} Capacity`;
                
                // Animasi air sederhana berdasarkan pilihan volume
                if (bottleWater) {
                    if (currentVolume.includes('300')) {
                        bottleWater.style.transform = "scaleY(0.6)";
                    } else {
                        bottleWater.style.transform = "scaleY(1)";
                    }
                }
            }
        });
    });

    // 5. TOMBOL SIMPAN / ADD TO BAG
    if (btnAddToBag) {
        btnAddToBag.addEventListener('click', () => {
            cartCount++;
            if (cartBadge) {
                cartBadge.textContent = cartCount;
                cartBadge.classList.remove('hidden');
            }
            alert(`Tumbler ${currentVolume} (${currentTemp}) berhasil ditambahkan!`);
        });
    }
});