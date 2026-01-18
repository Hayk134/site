// Обработка формы обратной связи
document.addEventListener('DOMContentLoaded', () => {
    const EMAIL = 'yapunjyanhayk087@gmail.com';
    
    const openMailClient = (name, phone, message) => {
        const body = [
            `Имя: ${name}`,
            phone && `Телефон: ${phone}`,
            message && `\nСообщение:\n${message}`
        ].filter(Boolean).join('\n');
        
        const mailtoLink = `mailto:${EMAIL}?subject=${encodeURIComponent('Сообщение с сайта GazanCar')}&body=${encodeURIComponent(body)}`;
        window.location.href = mailtoLink;
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const nameInput = document.getElementById('contact-name');
        const phoneInput = document.getElementById('contact-phone');
        const messageInput = document.getElementById('contact-message');
        
        if (!nameInput || !phoneInput || !messageInput) return false;
        
        const name = nameInput.value.trim();
        if (!name) {
            alert('Пожалуйста, введите имя');
            nameInput.focus();
            return false;
        }
        
        openMailClient(name, phoneInput.value.trim(), messageInput.value.trim());
        return false;
    };

    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    
    contactForm?.addEventListener('submit', handleFormSubmit);
    submitBtn?.addEventListener('click', handleFormSubmit);
});

// Обработка модального окна с деталями автомобиля
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('carModal');
    const carsDataElement = document.getElementById('cars-data');
    
    if (!modal || !carsDataElement) return;
    
    const carsData = JSON.parse(carsDataElement.textContent);
    const closeModal = () => {
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    };

    // Заполнение цен в карточках
    document.querySelectorAll('.car-card').forEach(card => {
        const carId = card.getAttribute('data-car');
        const priceElement = card.querySelector('.car-price');
        if (carId && carsData[carId]?.price && priceElement) {
            priceElement.textContent = carsData[carId].price;
        }
    });

    // Открытие модального окна
    document.querySelectorAll('.car-details-btn').forEach(button => {
        if (button.tagName === 'BUTTON' && !button.type) {
            button.type = 'button';
        }
        
        button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const carId = button.getAttribute('data-car');
            const carData = carsData[carId];
            if (!carId || !carData) return;
            
            // Заполнение модального окна
            const elements = {
                image: document.getElementById('modal-car-image'),
                name: document.getElementById('modal-car-name'),
                price: document.getElementById('modal-car-price'),
                region: document.getElementById('modal-car-region'),
                description: document.getElementById('modal-car-description'),
                specs: document.getElementById('modal-car-specs')
            };
            
            if (elements.image) {
                elements.image.src = carData.image;
                elements.image.alt = carData.name;
            }
            if (elements.name) elements.name.textContent = carData.name;
            if (elements.region) elements.region.textContent = `Регион: ${carData.region}`;
            if (elements.description) elements.description.textContent = carData.description;
            
            // цены с доставкой
            if (elements.price) {
                if (carData.priceWithDelivery) {
                    const basePrice = parseInt(carData.price.replace(/\s|₽/g, ''));
                    const totalPrice = parseInt(carData.priceWithDelivery.replace(/\s|₽/g, ''));
                    const deliveryPrice = (totalPrice - basePrice).toLocaleString('ru-RU') + ' ₽';
                    
                    elements.price.innerHTML = `
                        <div style="margin-bottom: 10px;">
                            <div style="font-size: 18px; color: #666; margin-bottom: 5px;">
                                Цена машины: <span style="color: #D4AF37; font-weight: bold;">${carData.price}</span>
                            </div>
                            <div style="font-size: 18px; color: #666; margin-bottom: 5px;">
                                Доставка: <span style="color: #D4AF37; font-weight: bold;">${deliveryPrice}</span>
                            </div>
                            <div style="font-size: 24px; color: #D4AF37; font-weight: bold; margin-top: 10px; padding-top: 10px; border-top: 2px solid #D4AF37;">
                                Итого с доставкой: ${carData.priceWithDelivery}
                            </div>
                        </div>
                    `;
                } else {
                    elements.price.textContent = carData.price;
                }
            }
            
            // Заполнение характеристик
            if (elements.specs && carData.specs) {
                elements.specs.innerHTML = Object.entries(carData.specs)
                    .map(([key, value]) => `<li>${key}: ${value}</li>`)
                    .join('');
            }
            
            // Показываем модальное окно
            modal.style.display = 'flex';
            setTimeout(() => modal.style.opacity = '1', 10);
            document.body.style.overflow = 'hidden';
        });
    });

    // Закрытие модального окна
    modal.querySelector('.modal-close')?.addEventListener('click', closeModal);
    window.addEventListener('click', (e) => e.target === modal && closeModal());

    // Фильтр каталога
    document.querySelectorAll('input[name="filter"]').forEach(input => {
        input.addEventListener('change', () => {
            const selectedRegion = input.value;
            document.querySelectorAll('.car-card').forEach(card => {
                card.style.display = (selectedRegion === 'all' || card.getAttribute('data-region') === selectedRegion) 
                    ? 'block' 
                    : 'none';
            });
        });
    });
});
