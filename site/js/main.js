// Обработка формы обратной связи
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formFields = contactForm.querySelectorAll('.form-input, .form-textarea');
        let isValid = true;
        
        // Проверяем каждое поле на заполненность
        formFields.forEach(field => {
            field.classList.remove('error');
            if (!field.value.trim()) {
                field.classList.add('error');
                isValid = false;
            }
        });
        
        // Если все поля заполнены, показываем сообщение об успехе
        if (isValid) {
            let successMessage = contactForm.querySelector('.form-success-message');
            
            if (!successMessage) {
                successMessage = document.createElement('div');
                successMessage.className = 'form-success-message';
                successMessage.textContent = 'Спасибо! Ваше сообщение отправлено. Мы свяжемся с вами в ближайшее время.';
                contactForm.appendChild(successMessage);
            }
            
            successMessage.classList.add('show');
            contactForm.reset();
            
            // Скрываем сообщение через 5 секунд
            setTimeout(() => {
                successMessage.classList.remove('show');
            }, 5000);
        }
    });
});
