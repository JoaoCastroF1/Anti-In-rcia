// Espera o DOM carregar completamente
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling para links internos
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Animações on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observa elementos para animação
    const animatedElements = document.querySelectorAll('.beneficio, .depoimento, #detalhes li');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Contador animado para o preço
    function animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            element.textContent = `R$ ${value}`;
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // Anima o preço quando a seção de compra entra em vista
    const priceSection = document.querySelector('#comprar');
    const priceObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const priceElement = entry.target.querySelector('strong');
                if (priceElement && !priceElement.classList.contains('animated')) {
                    priceElement.classList.add('animated');
                    priceElement.textContent = 'R$ 0';
                    animateValue(priceElement, 0, 297, 2000);
                }
            }
        });
    }, { threshold: 0.5 });

    if (priceSection) {
        priceObserver.observe(priceSection);
    }

    // Tracking de cliques nos botões CTA
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Aqui você pode adicionar tracking do Google Analytics, Facebook Pixel, etc.
            console.log('CTA clicked:', this.textContent);
            
            // Efeito visual no clique
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Simula redirecionamento para página de pagamento
            // Em produção, você substituiria isso pelo link real
            setTimeout(() => {
                alert('Redirecionando para a página de pagamento...\n\nEm um site real, isso levaria ao checkout.');
            }, 300);
        });
    });

    // Efeito parallax no header (apenas em desktop)
    if (window.innerWidth > 768) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallax = document.querySelector('header');
            const speed = scrolled * 0.5;
            parallax.style.transform = `translateY(${speed}px)`;
        });
    }

    // Countdown timer (opcional)
    function startCountdown() {
        const countdownElement = document.createElement('div');
        countdownElement.id = 'countdown';
        countdownElement.innerHTML = `
            <div style="background: #ff6b6b; color: white; padding: 15px; text-align: center; position: fixed; top: 0; left: 0; right: 0; z-index: 1000; font-weight: bold;">
                ⏰ Oferta especial termina em: <span id="timer">23:59:59</span>
            </div>
        `;
        
        // Adiciona margem ao body para compensar o countdown fixo
        document.body.style.paddingTop = '60px';
        document.body.insertBefore(countdownElement, document.body.firstChild);

        // Timer de 24 horas
        let timeLeft = 24 * 60 * 60; // 24 horas em segundos
        
        const timerInterval = setInterval(() => {
            const hours = Math.floor(timeLeft / 3600);
            const minutes = Math.floor((timeLeft % 3600) / 60);
            const seconds = timeLeft % 60;
            
            document.getElementById('timer').textContent = 
                `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            
            timeLeft--;
            
            if (timeLeft < 0) {
                clearInterval(timerInterval);
                document.getElementById('timer').textContent = 'EXPIROU!';
            }
        }, 1000);
    }

    // Ativa o countdown (descomente a linha abaixo se quiser usar)
    // startCountdown();

    // Feedback visual ao hover nos benefícios
    const beneficios = document.querySelectorAll('.beneficio');
    beneficios.forEach(beneficio => {
        beneficio.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        beneficio.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Lazy loading de imagens (caso você adicione imagens posteriormente)
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // Console log para debug
    console.log('🚀 Flexmind landing page carregada com sucesso!');
    console.log('✨ Recursos ativados: animações, smooth scroll, tracking de CTA');
});