document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll('.gallery-section');

    sections.forEach(section => {
        const images = Array.from(section.querySelectorAll('.gallery-container img'));
        const prevBtn = section.querySelector('.nav-control-btn.prev');
        const nextBtn = section.querySelector('.nav-control-btn.next');
        
        // Track state locally inside each independent container instance
        let activeIdx = -1;

        const clearClasses = () => {
            images.forEach(img => img.classList.remove('pseudo-hover'));
        };

        const shiftFocus = (direction) => {
            if (images.length === 0) return;

            // Initial click initialization configuration fallback
            if (activeIdx === -1) {
                activeIdx = direction === 'next' ? 0 : images.length - 1;
            } else {
                // Update index calculation sequence modulo wrapper
                if (direction === 'next') {
                    activeIdx = (activeIdx + 1) % images.length;
                } else {
                    activeIdx = (activeIdx - 1 + images.length) % images.length;
                }
            }

            clearClasses();
            images[activeIdx].classList.add('pseudo-hover');
        };

        // Event Listeners
        nextBtn.addEventListener('click', () => shiftFocus('next'));
        prevBtn.addEventListener('click', () => shiftFocus('prev'));

        // Sync visual pointers if explicit hover states occur hardware-side
        images.forEach((img, index) => {
            img.addEventListener('mouseenter', () => {
                clearClasses();
                activeIdx = index;
                img.classList.add('pseudo-hover');
            });
        });
    });
});