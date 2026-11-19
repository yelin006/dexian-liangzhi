/**
 * 得闲良制 - 六页滚动产品展示
 */

// ==================== 产品数据 ====================
const products = [
    {
        id: 1, name: '清·云屏', series: '清系列', seriesKey: '清',
        subtitle: '乌梅桑椹三焦茶',
        desc: '像是被晨风从头到脚穿透过一次，无一处滞碍',
        extra: '清系列 · 疏达三焦 · 轻盈自在',
        image: 'images/qing-yunping.png',
        color: '#4a7c59', bgColor: 'rgba(74,124,89,0.08)'
    },
    {
        id: 2, name: '润·螺盏', series: '润系列', seriesKey: '润',
        subtitle: '玉竹麦冬生津水',
        desc: '不急，一切都在慢慢润泽',
        extra: '润系列 · 生津润燥 · 温润如玉',
        image: 'images/run-luozhan.png',
        color: '#b8973d', bgColor: 'rgba(184,151,61,0.08)'
    },
    {
        id: 3, name: '安·沉烟', series: '安系列', seriesKey: '安',
        subtitle: '酸枣仁百合代用茶',
        desc: '取一抹在唇上试色，红得恰好，不艳不淡',
        extra: '安系列 · 宁心安神 · 夜阑人静，烛火将尽未尽',
        image: 'images/an-chenyan.png',
        color: '#7a5c8a', bgColor: 'rgba(122,92,138,0.08)'
    },
    {
        id: 4, name: '清·卸钗', series: '清系列', seriesKey: '清',
        subtitle: '苹果山楂代用茶',
        desc: '宴席散场，车马声渐远',
        extra: '清系列 · 疏达三焦 · 繁华落尽见真淳',
        image: 'images/qing-xiechai.png',
        color: '#4a7c59', bgColor: 'rgba(74,124,89,0.08)'
    },
    {
        id: 5, name: '养·花钿', series: '养系列', seriesKey: '养',
        subtitle: '苹果玫瑰黄芪代用茶',
        desc: '颈间一点花钿，是出门前的最后一笔',
        extra: '养系列 · 补气养血 · 容光焕发',
        image: 'images/yang-huadian.png',
        color: '#b54a5a', bgColor: 'rgba(181,74,90,0.08)'
    },
    {
        id: 6, name: '养·手炉', series: '养系列', seriesKey: '养',
        subtitle: '双参元气代用茶',
        desc: '走在外面，风再大，袖底始终有一团温热的底气',
        extra: '养系列 · 元气满满 · 寒冬亦暖',
        image: 'images/yang-shoulu.jpg',
        color: '#a04040', bgColor: 'rgba(160,64,64,0.08)'
    },
    {
        id: 7, name: '养·素纨', series: '养系列', seriesKey: '养',
        subtitle: '满满维C代用茶',
        desc: '素纨上的花影还未干，盏中的刺梨已浮起一山秋',
        extra: '养系列 · 维C满满 · 秋意浓',
        image: 'images/yang-suwan.png',
        color: '#c47a3a', bgColor: 'rgba(196,122,58,0.08)'
    },
    {
        id: 8, name: '养·胭脂', series: '养系列', seriesKey: '养',
        subtitle: '红参亚麻籽无花果代用茶',
        desc: '取一点在腕上试色，红得恰好，不艳不淡',
        extra: '养系列 · 补气养血 · 红颜不老',
        image: 'images/yang-yanzhi.png',
        color: '#b54a5a', bgColor: 'rgba(181,74,90,0.08)'
    }
];

// ==================== 渲染产品 ====================
const grid = document.getElementById('productGrid');

function renderProducts(filter = 'all') {
    const filtered = filter === 'all'
        ? products
        : products.filter(p => p.seriesKey === filter);

    grid.innerHTML = '';

    filtered.forEach((p, i) => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.style.transitionDelay = `${i * 0.08}s`;
        card.innerHTML = `
            <div class="product-image">
                <img src="${p.image}" alt="${p.name}" loading="lazy">
            </div>
            <div class="product-info">
                <span class="product-series" style="color:${p.color};background:${p.bgColor};border:1px solid ${p.color}22">${p.series}</span>
                <h3 class="product-name">${p.name}</h3>
                <p class="product-subtitle">${p.subtitle}</p>
                <p class="product-desc">${p.desc}</p>
            </div>
        `;
        card.addEventListener('click', () => openModal(p));
        grid.appendChild(card);
    });
}

renderProducts();

// ==================== 筛选 ====================
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderProducts(btn.dataset.filter);
    });
});

// ==================== 弹窗 ====================
const modal = document.getElementById('productModal');
const modalImg = document.getElementById('modalImg');
const modalSeries = document.getElementById('modalSeries');
const modalName = document.getElementById('modalName');
const modalSubtitle = document.getElementById('modalSubtitle');
const modalDesc = document.getElementById('modalDesc');
const modalExtra = document.getElementById('modalExtra');

function openModal(p) {
    modalImg.src = p.image;
    modalImg.alt = p.name;
    modalSeries.textContent = p.series;
    modalSeries.style.color = p.color;
    modalSeries.style.background = p.bgColor;
    modalSeries.style.border = `1px solid ${p.color}22`;
    modalName.textContent = p.name;
    modalSubtitle.textContent = p.subtitle;
    modalDesc.textContent = p.desc;
    modalExtra.textContent = p.extra;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    setTimeout(initMagnifier, 300);
}

function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
}

document.querySelector('.modal-close').addEventListener('click', closeModal);
document.querySelector('.modal-backdrop').addEventListener('click', closeModal);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// ==================== 导航栏 ====================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 80);
});

// ==================== 分页指示器 & 导航高亮 ====================
const pages = document.querySelectorAll('.page');
const dots = document.querySelectorAll('.dot');
const navLinks = document.querySelectorAll('.nav-links a');

function updateActivePage(index) {
    dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
    navLinks.forEach((link, i) => link.classList.toggle('active', i === index));
}

// 使用 scroll 事件监听当前可见页面，控制淡入淡出
function checkVisiblePages() {
    const windowHeight = window.innerHeight;
    let currentIndex = 0;
    let maxVisible = 0;

    pages.forEach((page, index) => {
        const rect = page.getBoundingClientRect();
        const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
        const visibleRatio = visibleHeight / windowHeight;

        if (visibleRatio > 0.1) {
            page.classList.add('is-visible');
            if (visibleRatio > maxVisible) {
                maxVisible = visibleRatio;
                currentIndex = index;
            }
        } else {
            page.classList.remove('is-visible');
        }
    });

    updateActivePage(currentIndex);
}

window.addEventListener('scroll', checkVisiblePages, { passive: true });

checkVisiblePages();

// 分页指示器点击
dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
        pages[i].scrollIntoView({ behavior: 'smooth' });
    });
});

// 导航链接点击
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});

// ==================== 系列图标点击筛选 ====================
document.querySelectorAll('.series-icon').forEach(icon => {
    icon.addEventListener('click', () => {
        const series = icon.dataset.series;
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === series);
        });
        renderProducts(series);
        document.getElementById('page-3').scrollIntoView({ behavior: 'smooth' });
    });
});

// ==================== 水墨 Canvas ====================
const canvas = document.getElementById('inkCanvas');
const ctx = canvas.getContext('2d');
let W, H;

function resizeCanvas() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// 水墨粒子
const inkParticles = [];
const maxInks = 30;

class InkParticle {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * W;
        this.y = Math.random() * H;
        this.r = Math.random() * 100 + 50;
        this.vx = (Math.random() - 0.5) * 0.12;
        this.vy = (Math.random() - 0.5) * 0.08;
        this.alpha = Math.random() * 0.025 + 0.006;
        this.life = Math.random() * 300 + 150;
        this.maxLife = this.life;
        const palettes = [
            [110, 90, 70],
            [90, 100, 85],
            [100, 85, 75],
            [80, 75, 65],
            [120, 100, 80],
        ];
        this.color = palettes[Math.floor(Math.random() * palettes.length)];
        this.shapeOffset = Math.random() * Math.PI * 2;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life--;
        this.r += 0.05;

        if (this.life <= 0 || this.x < -150 || this.x > W + 150 || this.y < -150 || this.y > H + 150) {
            this.reset();
        }
    }

    draw() {
        const lifeRatio = this.life / this.maxLife;
        const a = this.alpha * lifeRatio * lifeRatio;

        for (let layer = 0; layer < 3; layer++) {
            const lr = this.r * (1 - layer * 0.25);
            const la = a * (1 - layer * 0.3);
            const offsetX = Math.sin(this.shapeOffset + layer) * lr * 0.15;
            const offsetY = Math.cos(this.shapeOffset + layer * 1.3) * lr * 0.15;

            const g = ctx.createRadialGradient(
                this.x + offsetX, this.y + offsetY, 0,
                this.x + offsetX, this.y + offsetY, lr
            );
            g.addColorStop(0, `rgba(${this.color[0]},${this.color[1]},${this.color[2]},${la})`);
            g.addColorStop(0.5, `rgba(${this.color[0]},${this.color[1]},${this.color[2]},${la * 0.5})`);
            g.addColorStop(1, `rgba(${this.color[0]},${this.color[1]},${this.color[2]},0)`);
            ctx.fillStyle = g;
            ctx.beginPath();
            ctx.arc(this.x + offsetX, this.y + offsetY, lr, 0, Math.PI * 2);
            ctx.fill();
        }
    }
}

for (let i = 0; i < maxInks; i++) {
    inkParticles.push(new InkParticle());
}

// 花瓣粒子
const petals = [];
const maxPetals = 12;

class Petal {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * W;
        this.y = -20;
        this.size = Math.random() * 4 + 2;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = Math.random() * 0.3 + 0.2;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotSpeed = (Math.random() - 0.5) * 0.01;
        this.alpha = Math.random() * 0.12 + 0.04;
        const colors = [
            [200, 160, 170],
            [180, 140, 150],
            [200, 180, 160],
            [160, 180, 160]
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
        this.x += this.vx + Math.sin(this.y * 0.005) * 0.2;
        this.y += this.vy;
        this.rotation += this.rotSpeed;

        if (this.y > H + 20) {
            this.reset();
        }
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = `rgb(${this.color[0]},${this.color[1]},${this.color[2]})`;
        ctx.beginPath();
        ctx.ellipse(0, 0, this.size, this.size * 0.6, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

for (let i = 0; i < maxPetals; i++) {
    const p = new Petal();
    p.y = Math.random() * H;
    petals.push(p);
}

function animateInk() {
    ctx.clearRect(0, 0, W, H);

    inkParticles.forEach(p => {
        p.update();
        p.draw();
    });

    petals.forEach(p => {
        p.update();
        p.draw();
    });

    requestAnimationFrame(animateInk);
}

animateInk();

// ==================== 放大镜功能 ====================
const modalImageWrap = document.getElementById('modalImageWrap');
const magnifierLens = document.getElementById('magnifierLens');
let magnifierZoom = 2.5;

function initMagnifier() {
    const img = modalImg;
    if (!img.complete || img.naturalWidth === 0) {
        img.onload = initMagnifier;
        return;
    }

    const lens = magnifierLens;
    const wrap = modalImageWrap;

    lens.style.backgroundImage = `url('${img.src}')`;

    function moveLens(e) {
        const rect = wrap.getBoundingClientRect();
        const imgRect = img.getBoundingClientRect();

        const x = e.clientX - imgRect.left;
        const y = e.clientY - imgRect.top;

        if (x < 0 || x > imgRect.width || y < 0 || y > imgRect.height) {
            lens.style.opacity = '0';
            return;
        }
        lens.style.opacity = '1';

        const lensX = e.clientX - rect.left;
        const lensY = e.clientY - rect.top;

        lens.style.left = (lensX - 60) + 'px';
        lens.style.top = (lensY - 60) + 'px';

        const bgX = (x / imgRect.width) * 100;
        const bgY = (y / imgRect.height) * 100;

        lens.style.backgroundSize = `${imgRect.width * magnifierZoom}px ${imgRect.height * magnifierZoom}px`;
        lens.style.backgroundPosition = `${bgX}% ${bgY}%`;
    }

    wrap.addEventListener('mousemove', moveLens);
    wrap.addEventListener('mouseenter', () => { lens.style.opacity = '1'; });
    wrap.addEventListener('mouseleave', () => { lens.style.opacity = '0'; });
}

// ==================== 品类故事滑动组件 ====================
const storySlider = document.getElementById('storySlider');
const storySliderTrack = document.getElementById('storySliderTrack');
const sliderPrev = document.getElementById('sliderPrev');
const sliderNext = document.getElementById('sliderNext');
const sliderDots = document.querySelectorAll('.slider-dot');
const storySlides = document.querySelectorAll('.story-slide');

if (storySlider && storySliderTrack && storySlides.length > 0) {
    let currentSlide = 0;
    const totalSlides = storySlides.length;
    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let animationID = 0;

    function getSlideWidth() {
        return storySlider.offsetWidth;
    }

    function setSlideWidths() {
        const slideWidth = getSlideWidth();
        storySlides.forEach(slide => {
            slide.style.width = slideWidth + 'px';
        });
        storySliderTrack.style.width = (slideWidth * totalSlides) + 'px';
    }

    function goToSlide(index) {
        if (index < 0) index = 0;
        if (index >= totalSlides) index = totalSlides - 1;
        currentSlide = index;
        const slideWidth = getSlideWidth();
        currentTranslate = -currentSlide * slideWidth;
        prevTranslate = currentTranslate;
        storySliderTrack.style.transform = `translateX(${currentTranslate}px)`;

        // 更新圆点
        sliderDots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSlide);
        });

        // 更新箭头可见性
        if (sliderPrev) sliderPrev.style.opacity = currentSlide === 0 ? '0.3' : '1';
        if (sliderNext) sliderNext.style.opacity = currentSlide === totalSlides - 1 ? '0.3' : '1';
    }

    // 窗口大小变化时重新计算
    window.addEventListener('resize', () => {
        setSlideWidths();
        goToSlide(currentSlide);
    });

    // 箭头按钮
    if (sliderPrev) {
        sliderPrev.addEventListener('click', () => goToSlide(currentSlide - 1));
    }
    if (sliderNext) {
        sliderNext.addEventListener('click', () => goToSlide(currentSlide + 1));
    }

    // 圆点点击
    sliderDots.forEach((dot, i) => {
        dot.addEventListener('click', () => goToSlide(i));
    });

    // 键盘左右箭头
    document.addEventListener('keydown', (e) => {
        if (!document.getElementById('page-4').classList.contains('is-visible')) return;
        if (e.key === 'ArrowLeft') goToSlide(currentSlide - 1);
        if (e.key === 'ArrowRight') goToSlide(currentSlide + 1);
    });

    // 鼠标拖拽
    storySliderTrack.addEventListener('mousedown', dragStart);
    storySliderTrack.addEventListener('touchstart', dragStart, { passive: true });

    storySliderTrack.addEventListener('mouseup', dragEnd);
    storySliderTrack.addEventListener('mouseleave', dragEnd);
    storySliderTrack.addEventListener('touchend', dragEnd);

    storySliderTrack.addEventListener('mousemove', dragMove);
    storySliderTrack.addEventListener('touchmove', dragMove, { passive: true });

    // 阻止拖拽时选中文本
    storySliderTrack.addEventListener('selectstart', (e) => e.preventDefault());

    function dragStart(e) {
        isDragging = true;
        startPos = getPositionX(e);
        storySliderTrack.classList.add('is-dragging');
        animationID = requestAnimationFrame(animation);
    }

    function dragMove(e) {
        if (!isDragging) return;
        const currentPosition = getPositionX(e);
        const diff = currentPosition - startPos;
        currentTranslate = prevTranslate + diff;
        storySliderTrack.style.transform = `translateX(${currentTranslate}px)`;
    }

    function dragEnd(e) {
        if (!isDragging) return;
        isDragging = false;
        cancelAnimationFrame(animationID);
        storySliderTrack.classList.remove('is-dragging');

        const movedBy = currentTranslate - prevTranslate;
        const slideWidth = getSlideWidth();
        const threshold = slideWidth * 0.15; // 滑动超过15%切换

        if (movedBy < -threshold) {
            goToSlide(currentSlide + 1);
        } else if (movedBy > threshold) {
            goToSlide(currentSlide - 1);
        } else {
            goToSlide(currentSlide);
        }
    }

    function getPositionX(e) {
        return e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
    }

    function animation() {
        if (isDragging) requestAnimationFrame(animation);
    }

    // 初始化
    setSlideWidths();
    goToSlide(0);
}
