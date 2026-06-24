window.addEventListener('load', () => {
    const loader = document.querySelector('.loader-wrapper');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
});
const openMenu = document.getElementById('openMenu');
const closeMenu = document.getElementById('closeMenu');
const sidePanel = document.getElementById('sidePanel');
const panelOverlay = document.getElementById('panelOverlay');
if (openMenu && sidePanel) {
    openMenu.addEventListener('click', () => {
        sidePanel.classList.add('active');
        panelOverlay.style.display = 'block';
        setTimeout(() => {
            panelOverlay.style.opacity = '1';
            document.body.style.overflow = 'hidden'; 
        }, 10);
    });
}
const closeEverything = () => {
    if (sidePanel) {
        sidePanel.classList.remove('active');
        panelOverlay.style.opacity = '0';
        document.body.style.overflow = 'auto';
        setTimeout(() => {
            panelOverlay.style.display = 'none';
        }, 500);
    }
};
if (closeMenu) closeMenu.addEventListener('click', closeEverything);
if (panelOverlay) panelOverlay.addEventListener('click', closeEverything);
document.querySelectorAll('.side-nav a').forEach(link => {
    link.addEventListener('click', closeEverything);
});

const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');
const headerWrap = document.querySelector('.header-wrap');
window.addEventListener('scroll', () => {
    let current = "";
    const scrollPos = window.pageYOffset;
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollPos >= sectionTop - 250) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
    if (headerWrap) {
        if (scrollPos > 80) {
            headerWrap.style.padding = window.innerWidth > 768 ? "5px 25px" : "5px 15px";
            headerWrap.style.background = "rgba(8, 28, 21, 0.98)";
            headerWrap.style.boxShadow = "0 10px 30px rgba(0,0,0,0.3)";
        } else {
            headerWrap.style.padding = window.innerWidth > 768 ? "10px 30px" : "8px 15px";
            headerWrap.style.background = "rgba(255, 255, 255, 0.05)";
            headerWrap.style.boxShadow = "none";
        }
    }
});
const startCounters = () => {
    const stats = document.querySelectorAll('.stat-num, .years-num');
    stats.forEach(counter => {
        counter.innerText = '0'; 
        const target = +counter.getAttribute('data-target');
        const speed = 100; 
        const increment = target / speed;
        const updateCount = () => {
            const count = +counter.innerText.replace('+', '');
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 20);
            } else {
                counter.innerText = target + (counter.classList.contains('stat-num') ? '+' : '');
            }
        };
        updateCount();
    });
};
const aboutSection = document.querySelector('.about-section');
if (aboutSection) {
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            startCounters();
            observer.unobserve(aboutSection); 
        }
    }, { threshold: 0.2 }); 
    observer.observe(aboutSection);
}
document.querySelectorAll('.ultra-card').forEach(uCard => {
    uCard.addEventListener('mousemove', e => {
        const rect = uCard.getBoundingClientRect(),
              x = e.clientX - rect.left,
              y = e.clientY - rect.top;

        uCard.style.setProperty("--mouse-x", `${x}px`);
        uCard.style.setProperty("--mouse-y", `${y}px`);
    });
});
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});
const crystalCards = document.querySelectorAll('.crystal-card');
const revealOnScroll = () => {
    crystalCards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0) rotateX(0)';
            }, index * 200);
        }
    });
};
crystalCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(40px) rotateX(-10deg)';
    card.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
});
window.addEventListener('scroll', revealOnScroll);