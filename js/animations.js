const revealElements = () => {
    const elements = document.querySelectorAll(".reveal:not(.is-visible)");

    if (!("IntersectionObserver" in window)) {
        elements.forEach((element) => element.classList.add("is-visible"));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.16 });

    elements.forEach((element) => observer.observe(element));
};

const startTestimonials = () => {
    const testimonials = [...document.querySelectorAll(".testimonial")];
    if (testimonials.length < 2) return;

    let active = 0;
    setInterval(() => {
        testimonials[active].classList.remove("active");
        active = (active + 1) % testimonials.length;
        testimonials[active].classList.add("active");
    }, 4200);
};

document.addEventListener("DOMContentLoaded", () => {
    revealElements();
    startTestimonials();

    window.addEventListener("scroll", () => {
        const heroArt = document.querySelector(".hero-art img");
        if (!heroArt) return;
        heroArt.style.transform = `translateY(${Math.min(window.scrollY * 0.025, 18)}px)`;
    }, { passive: true });
});

window.addEventListener("la-chola:content-ready", revealElements);
