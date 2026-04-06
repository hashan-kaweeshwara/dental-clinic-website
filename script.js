document.addEventListener('DOMContentLoaded', () => {
    
    // --- Sticky Header & Active Links ---
    const header = document.getElementById('header');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        // Add shadow to header on scroll
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Highlight active nav link perfectly
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // --- Mobile Menu Toggle ---
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');

    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });


    // --- Hero Carousel ---
    const slides = document.querySelectorAll('.carousel-slide');
    if (slides.length > 0) {
        let currentSlide = 0;
        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 5000);
    }

    // --- Form Validation ---
    const form = document.getElementById('appointment-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Fields
            const nameEl = document.getElementById('name');
            const emailEl = document.getElementById('email');
            const phoneEl = document.getElementById('phone');
            const serviceEl = document.getElementById('service');
            const dateEl = document.getElementById('date');
            const timeEl = document.getElementById('time');
            const doctorEl = document.getElementById('doctor');

            let isValid = true;

            // Reset previous errors
            document.querySelectorAll('.form-control-wrapper').forEach(el => el.classList.remove('error'));
            document.querySelectorAll('.error-msg').forEach(el => el.innerText = '');

            // Validation Helper
            const showError = (input, message) => {
                const wrapper = input.parentElement;
                wrapper.classList.add('error');
                const errorDisplay = wrapper.querySelector('.error-msg');
                errorDisplay.innerText = message;
                isValid = false;
            };

            // Name
            if (nameEl.value.trim() === '') {
                showError(nameEl, 'Full Name is required');
            }

            // Email
            const emailValue = emailEl.value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailValue === '') {
                showError(emailEl, 'Email is required');
            } else if (!emailRegex.test(emailValue)) {
                showError(emailEl, 'Please enter a valid email address');
            }

            // Phone
            const phoneValue = phoneEl.value.trim();
            const phoneRegex = /^[\d\s\-\+\(\)]+$/; // basic regex for phone with spaces/dashes
            if (phoneValue === '') {
                showError(phoneEl, 'Phone Number is required');
            } else if (!phoneRegex.test(phoneValue)) {
                showError(phoneEl, 'Please enter a valid phone number');
            }

            // Service
            if (serviceEl.value === '') {
                showError(serviceEl, 'Please select a service');
            }

            // Doctor
            if (doctorEl && doctorEl.value === '') {
                showError(doctorEl, 'Please select a preferred doctor');
            }

            // Date
            if (dateEl.value === '') {
                showError(dateEl, 'Please pick a date');
            } else {
                // Check if date is in the past
                const selectedDate = new Date(dateEl.value);
                const today = new Date();
                today.setHours(0,0,0,0);
                if (selectedDate < today) {
                    showError(dateEl, 'Date cannot be in the past');
                }
            }

            // Time
            if (timeEl.value === '') {
                showError(timeEl, 'Please pick a time slot');
            }


            // Submit if Valid
            if (isValid) {
                const btn = document.getElementById('submit-btn');
                btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
                btn.disabled = true;

                // Simulate API call
                setTimeout(() => {
                    const successMsg = document.getElementById('form-success');
                    successMsg.classList.remove('hidden');
                    
                    form.reset();
                    
                    btn.innerHTML = 'Confirm Appointment';
                    btn.disabled = false;

                    // hide success msg after 5 seconds
                    setTimeout(() => {
                        successMsg.classList.add('hidden');
                    }, 5000);

                }, 1500);
            }
        });
    }

    // --- Doctor Modal Logic ---
    const doctorModal = document.getElementById('doctor-modal');
    const doctorCards = document.querySelectorAll('.js-open-modal');
    const closeBtns = document.querySelectorAll('.close-modal, .close-modal-btn');
    
    if(doctorModal) {
        doctorCards.forEach(card => {
            card.addEventListener('click', () => {
                const name = card.getAttribute('data-name');
                const role = card.getAttribute('data-role');
                const desc = card.getAttribute('data-desc');
                const imageSrc = card.getAttribute('data-image');
                
                document.getElementById('modal-img').src = imageSrc;
                document.getElementById('modal-name').textContent = name;
                document.getElementById('modal-role').textContent = role;
                document.getElementById('modal-desc').textContent = desc;
                
                // Auto-select doctor in form when clicking 'Book with this Doctor'
                const bookBtn = document.getElementById('modal-book-btn');
                if(bookBtn) {
                    bookBtn.onclick = () => {
                        const select = document.getElementById('doctor');
                        if(select) {
                            Array.from(select.options).forEach(opt => {
                                if(opt.text.includes(name)) {
                                    select.value = opt.value;
                                }
                            });
                        }
                        doctorModal.classList.remove('show');
                    };
                }

                doctorModal.classList.add('show');
            });
        });

        // Close on X or button click
        closeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                doctorModal.classList.remove('show');
            });
        });

        // Close on clicking outside the content area
        window.addEventListener('click', (e) => {
            if (e.target === doctorModal) {
                doctorModal.classList.remove('show');
            }
        });
    }

});
