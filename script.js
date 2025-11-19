/**
 * TOOL: ฟังก์ชันช่วยปั๊มลิงก์รูปอัตโนมัติ
 * แค่บอกว่า folder ไหน มีกี่รูป มันจะเจน path เป็น 1.jpg, 2.jpg ... ให้เอง
 */
function generateImages(folderPath, count, extension = 'jpg') {
    let images = [];
    for (let i = 1; i <= count; i++) {
        images.push(`${folderPath}/${i}.${extension}`);
    }
    return images;
}

/**
 * CONFIG: ตั้งค่าจำนวนรูปตรงนี้! (แก้ไขแค่ตรงตัวเลข)
 */
const portfolioConfig = {
    // --- หมวด Branding ---
    'branding': {
        title: 'Logo & Branding Design',
        desc: 'รวมผลงานออกแบบโลโก้และอัตลักษณ์แบรนด์',
        // แก้เลข 20 เป็นจำนวนรูปที่มีจริงในโฟลเดอร์ images/branding
        images: generateImages('images/branding', 20, 'jpg') 
    },

    // --- หมวด Ads & Social ---
    'ads': {
        title: 'Advertising & Social Media',
        desc: 'สื่อโฆษณาและการตลาดออนไลน์',
        // แก้เลข 15 เป็นจำนวนรูปที่มี
        images: generateImages('images/ads', 15, 'jpg')
    },

    // --- หมวด Esport ---
    'esport': {
        title: 'Esport Design',
        desc: 'เสื้อทีมและ Overlay สตรีมเมอร์',
        images: generateImages('images/esport', 10, 'jpg')
    },

    // --- หมวด FiveM UI ---
    'fivem': {
        title: 'FiveM UI & Server',
        desc: 'Interface เกม FiveM, Inventory, HUD',
        images: generateImages('images/ui', 12, 'jpg') // สมมติเก็บไว้ใน images/ui
    },

    // --- หมวด TikTok ---
    'tiktok': {
        title: 'TikTok Contents',
        desc: 'คลิปไวรัลและไลฟ์สไตล์',
        // ถ้าเซฟปกคลิปเป็น .png ให้แก้ตรงท้ายเป็น 'png'
        images: generateImages('images/tiktok', 5, 'jpg')
    },

    // --- หมวด Video Editing ---
    'video': {
        title: 'Video Editing Portfolio',
        desc: 'ผลงานตัดต่อ MV และ Vlog',
        images: generateImages('images/video', 8, 'jpg')
    },

    // --- ส่วน Experience (ไม่ต้องแก้ ใส่ HTML ได้เลย) ---
    'exp': {
        title: 'Full Work Experience',
        desc: 'เส้นทางการทำงานและประสบการณ์',
        customHtml: `
            <div class="timeline-full">
                <div class="timeline-item">
                    <span class="date" style="color: #4ade80;">Current (5 Months)</span>
                    <h3>Graphic Designer @ Plastic Surgery Hospital</h3>
                    <p><strong>Key Responsibilities:</strong></p>
                    <ul style="margin-left: 20px; opacity: 0.8; line-height: 1.6;">
                        <li>ออกแบบสื่อโฆษณาโปรโมชั่นรายเดือน (Online & Offline)</li>
                        <li>ดูแลภาพลักษณ์ CI ของโรงพยาบาลในทุก Platform</li>
                        <li>Retouch ภาพรีวิวศัลยกรรมให้ดูสวยงามและสมจริง</li>
                        <li>ประสานงานกับทีม Marketing เพื่อวาง Strategy</li>
                    </ul>
                </div>
                <hr style="border: 0; border-top: 1px solid rgba(255,255,255,0.1); margin: 20px 0;">
                <div class="timeline-item">
                    <span class="date">2023 - 2024 (10 Months)</span>
                    <h3>Graphic Designer @ Skincare Brand</h3>
                    <p>รับผิดชอบการออกแบบ Packaging, Ads Banner และดูแล Art Direction ของแบรนด์...</p>
                </div>
                <div class="timeline-item">
                    <span class="date">Freelance Era</span>
                    <h3>Graphic & UI Designer</h3>
                    <p>รับงานออกแบบอิสระ Branding, FiveM UI, และงานตัดต่อวิดีโอ...</p>
                </div>
            </div>
        `
    }
};


/**
 * SYSTEM CORE: ระบบทำงาน (ไม่ต้องแก้ไขส่วนนี้)
 */
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Filter System (ตัวกรองหมวดหมู่)
    const buttons = document.querySelectorAll('.nav-btn');
    const items = document.querySelectorAll('.grid-item');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            buttons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const filter = button.getAttribute('data-filter');

            items.forEach(item => {
                if (filter === 'all') {
                    // ซ่อน Experience ไว้ก่อนในหน้า All (เพื่อให้คนกดดูแยก) หรือถ้าอยากโชว์ก็ลบเงื่อนไขนี้
                    if (item.classList.contains('experience')) {
                        item.classList.add('hidden');
                    } else {
                        item.classList.remove('hidden');
                    }
                } else {
                    if (item.classList.contains(filter)) {
                        item.classList.remove('hidden');
                    } else {
                        item.classList.add('hidden');
                    }
                }
            });
        });
    });

    // 2. Modal System (ระบบ Popup)
    const modal = document.getElementById('portfolioModal');
    const modalBody = document.getElementById('modalBody');
    const closeBtn = document.querySelector('.close-btn');

    // ฟังก์ชันเปิด Popup
    window.openModal = (key) => {
        const data = portfolioConfig[key];
        
        // ถ้าไม่มีข้อมูล (เช่นกด Music ที่เป็นลิงก์ตรง) ให้ข้ามไป
        if (!data) return;

        let contentHtml = `<h2>${data.title}</h2><p style="color:#aaa; margin-bottom:20px;">${data.desc}</p>`;

        // กรณีเป็น Experience (HTML)
        if (data.customHtml) {
            contentHtml += data.customHtml;
        } 
        // กรณีเป็น Gallery รูปภาพ (Auto Generated)
        else if (data.images) {
            contentHtml += `<div class="modal-gallery">`;
            data.images.forEach(imgSrc => {
                // ใส่ onerror เพื่อป้องกัน: ถ้ารูปไหนไม่มีจริง มันจะซ่อนตัวเอง ไม่โชว์ไอคอนรูปแตก
                contentHtml += `<img src="${imgSrc}" class="modal-img" alt="Work" onerror="this.style.display='none'">`; 
            });
            contentHtml += `</div>`;
        }

        modalBody.innerHTML = contentHtml;
        modal.style.display = "block";
        document.body.style.overflow = "hidden"; // ล็อกไม่ให้หน้าหลังเลื่อน
    };

    // ฟังก์ชันปิด Popup
    closeBtn.onclick = () => {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    };

    // กดพื้นหลังเพื่อปิด
    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        }
    };
});
