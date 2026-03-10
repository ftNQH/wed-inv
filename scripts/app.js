document.addEventListener('DOMContentLoaded', () => {
    // --- Scroll Animation ---
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in-on-scroll');
    animatedElements.forEach(el => observer.observe(el));


    // --- Countdown Timer ---
    const weddingDate = new Date('March 29, 2026 10:00:00').getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        if (distance < 0) {
            document.getElementById('countdown').innerHTML = "We are Married!";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').innerText = days < 10 ? '0' + days : days;
        document.getElementById('hours').innerText = hours < 10 ? '0' + hours : hours;
        document.getElementById('minutes').innerText = minutes < 10 ? '0' + minutes : minutes;
        document.getElementById('seconds').innerText = seconds < 10 ? '0' + seconds : seconds;
    }

    setInterval(updateCountdown, 1000);
    updateCountdown(); // Initial call


    // --- RSVP Form Handling ---
    const form = document.getElementById('rsvp-form');
    const formMessage = document.getElementById('form-message');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = form.querySelector('button');
            const originalText = submitBtn.innerText;

            submitBtn.innerText = 'Sending...';
            submitBtn.disabled = true;

            setTimeout(() => {
                submitBtn.innerText = 'Sent!';
                formMessage.classList.remove('hidden');
                form.reset();

                setTimeout(() => {
                    submitBtn.innerText = originalText;
                    submitBtn.disabled = false;
                    formMessage.classList.add('hidden');
                }, 3000);
            }, 1000);
        });
    }

    // --- Copy to Clipboard (Gift Section) ---
    const copyBtns = document.querySelectorAll('.btn-small');
    copyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // In a real app, this would copy actual text
            const originalText = btn.innerText;
            btn.innerText = 'Copied!';
            setTimeout(() => {
                btn.innerText = originalText;
            }, 2000);
        });
    });


    // --- Gallery Slider ---
    const slidesContainer = document.querySelector('.slides');
    const slides = document.querySelectorAll('.slides img');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');

    if (slidesContainer && slides.length > 0) {
        let currentSlide = 0;
        const totalSlides = slides.length;

        function showSlide(index) {
            if (index >= totalSlides) {
                currentSlide = 0;
            } else if (index < 0) {
                currentSlide = totalSlides - 1;
            } else {
                currentSlide = index;
            }
            slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
        }

        nextBtn.addEventListener('click', () => {
            showSlide(currentSlide + 1);
            resetAutoPlay();
        });

        prevBtn.addEventListener('click', () => {
            showSlide(currentSlide - 1);
            resetAutoPlay();
        });

        // Auto Play
        let slideInterval = setInterval(() => {
            showSlide(currentSlide + 1);
        }, 5000); // Change slide every 5 seconds

        function resetAutoPlay() {
            clearInterval(slideInterval);
            slideInterval = setInterval(() => {
                showSlide(currentSlide + 1);
            }, 5000);
        }

        // --- Lightbox: click ảnh slide → mở to ---
        const lightbox = document.getElementById('gallery-lightbox');
        const lightboxImg = lightbox && lightbox.querySelector('.lightbox-img');
        const lightboxClose = lightbox && lightbox.querySelector('.lightbox-close');

        slides.forEach((img) => {
            img.addEventListener('click', () => {
                if (!lightbox || !lightboxImg) return;
                lightboxImg.src = img.src;
                lightbox.classList.add('is-open');
                lightbox.setAttribute('aria-hidden', 'false');
                document.body.style.overflow = 'hidden';
            });
        });

        function closeLightbox() {
            if (!lightbox) return;
            lightbox.classList.remove('is-open');
            lightbox.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }

        if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
        if (lightbox) {
            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox) closeLightbox();
            });
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && lightbox.classList.contains('is-open')) closeLightbox();
            });
        }
    }

    // --- Adjust RSVP Image Margin for Crop ---
    const rsvpImg = document.querySelector('.rsvp-bg');
    function adjustRsvpMargin() {
        if (rsvpImg) {
            const height = rsvpImg.offsetHeight;
            const margin = height * 0.1; // 5% of height
            rsvpImg.style.marginBottom = `-${margin}px`;
        }
    }

    if (rsvpImg) {
        // Adjust on load
        if (rsvpImg.complete) {
            adjustRsvpMargin();
        } else {
            rsvpImg.onload = adjustRsvpMargin;
        }
        // Adjust on resize
        window.addEventListener('resize', adjustRsvpMargin);
    }
});
