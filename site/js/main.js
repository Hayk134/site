// Form validation and submission only
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const inputs = contactForm.querySelectorAll('.form-input, .form-textarea');
            let isValid = true;

            inputs.forEach(input => {
                input.classList.remove('error');
                if (!input.value.trim()) {
                    input.classList.add('error');
                    isValid = false;
                }
            });

            if (isValid) {
                // Show success message
                let successMsg = contactForm.querySelector('.form-success-message');
                if (!successMsg) {
                    successMsg = document.createElement('div');
                    successMsg.className = 'form-success-message';
                    successMsg.textContent = 'Спасибо! Ваше сообщение отправлено. Мы свяжемся с вами в ближайшее время.';
                    contactForm.appendChild(successMsg);
                }
                successMsg.classList.add('show');
                
                // Reset form
                contactForm.reset();
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    successMsg.classList.remove('show');
                }, 5000);
            }
        });
    }
});
