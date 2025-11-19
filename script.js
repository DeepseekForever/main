document.addEventListener('DOMContentLoaded', function() {
    console.log('🎵 Deepseek Forever loaded!');
    
    // 1. Глитч-эффекты для заголовков
    const glitchElements = document.querySelectorAll('.glitch');
    
    setInterval(() => {
        glitchElements.forEach(element => {
            element.style.transform = `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)`;
        });
    }, 100);

    // 2. Создание анимированного фона с частицами
    function createParticles() {
        const bgAnimation = document.querySelector('.bg-animation');
        if (!bgAnimation) return;
        
        // Очищаем старые частицы
        bgAnimation.innerHTML = '';
        
        const colors = ['#00ffea', '#ff00ff', '#ffff00', '#9d00ff'];
        
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Случайные свойства
            const size = Math.random() * 3 + 1;
            const color = colors[Math.floor(Math.random() * colors.length)];
            const left = Math.random() * 100;
            const animationDelay = Math.random() * 20;
            const animationDuration = 15 + Math.random() * 20;
            
            particle.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                background: ${color};
                left: ${left}vw;
                top: -20px;
                animation-delay: ${animationDelay}s;
                animation-duration: ${animationDuration}s;
                opacity: ${Math.random() * 0.5 + 0.2};
            `;
            
            bgAnimation.appendChild(particle);
        }
    }

    // 3. Анимация частиц
    function animateParticles() {
        const particles = document.querySelectorAll('.particle');
        particles.forEach(particle => {
            const currentTop = parseFloat(particle.style.top) || -20;
            const speed = 0.5 + Math.random() * 0.5;
            
            particle.style.top = (currentTop + speed) + 'px';
            
            // Если частица ушла за экран, возвращаем её наверх
            if (currentTop > window.innerHeight) {
                particle.style.top = '-20px';
                particle.style.left = Math.random() * 100 + 'vw';
            }
        });
        
        requestAnimationFrame(animateParticles);
    }

    // 4. Интерактивность карточек текста
    function initLyricCards() {
        const lyricCards = document.querySelectorAll('.lyric-card');
        
        lyricCards.forEach(card => {
            // Клик для выделения
            card.addEventListener('click', function() {
                this.classList.toggle('active');
            });
            
            // Эффект при наведении
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px) scale(1.02)';
                this.style.boxShadow = '0 10px 25px rgba(0, 255, 234, 0.3)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = '0 5px 15px rgba(0, 255, 234, 0.2)';
            });
        });
    }

    // 5. Аудиоплеер улучшения
    function enhanceAudioPlayer() {
        const audioPlayer = document.getElementById('audioPlayer');
        if (!audioPlayer) return;
        
        // Добавляем визуализацию
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const analyser = audioContext.createAnalyser();
        const source = audioContext.createMediaElementSource(audioPlayer);
        
        source.connect(analyser);
        analyser.connect(audioContext.destination);
        analyser.fftSize = 256;
        
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        
        // Создаем canvas для визуализации
        const canvas = document.createElement('canvas');
        canvas.width = 300;
        canvas.height = 80;
        canvas.style.cssText = `
            width: 100%;
            height: 80px;
            margin-top: 15px;
            border-radius: 10px;
            background: rgba(0, 0, 0, 0.3);
        `;
        
        const canvasContainer = audioPlayer.parentElement;
        canvasContainer.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        
        function drawVisualizer() {
            requestAnimationFrame(drawVisualizer);
            
            analyser.getByteFrequencyData(dataArray);
            
            ctx.fillStyle = 'rgba(10, 10, 10, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            const barWidth = (canvas.width / bufferLength) * 2.5;
            let barHeight;
            let x = 0;
            
            for(let i = 0; i < bufferLength; i++) {
                barHeight = dataArray[i] / 2;
                
                const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
                gradient.addColorStop(0, '#00ffea');
                gradient.addColorStop(1, '#ff00ff');
                
                ctx.fillStyle = gradient;
                ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
                
                x += barWidth + 1;
            }
        }
        
        // Запускаем визуализацию при воспроизведении
        audioPlayer.addEventListener('play', function() {
            audioContext.resume().then(() => {
                drawVisualizer();
            });
        });
    }

    // 6. Параллакс эффект для мыши
    function initParallax() {
        document.addEventListener('mousemove', function(e) {
            const cards = document.querySelectorAll('.feature-card, .lyric-card');
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            cards.forEach(card => {
                const speed = 10;
                const x = (mouseX - 0.5) * speed;
                const y = (mouseY - 0.5) * speed;
                
                card.style.transform = `translate(${x}px, ${y}px)`;
            });
        });
    }

    // 7. Анимация бегущей строки
    function initMarquee() {
        const marqueeContent = document.querySelector('.marquee-content');
        if (!marqueeContent) return;
        
        // Дублируем контент для бесшовной анимации
        const originalContent = marqueeContent.innerHTML;
        marqueeContent.innerHTML = originalContent + ' • ' + originalContent;
    }

    // 8. Эффект печатающего текста для заголовков
    function initTypewriter() {
        const subtitles = document.querySelectorAll('.subtitle');
        
        subtitles.forEach(subtitle => {
            const originalText = subtitle.textContent;
            subtitle.textContent = '';
            
            let i = 0;
            const typeWriter = () => {
                if (i < originalText.length) {
                    subtitle.textContent += originalText.charAt(i);
                    i++;
                    setTimeout(typeWriter, 50);
                }
            };
            
            // Запускаем с задержкой
            setTimeout(typeWriter, 1000);
        });
    }

    // 9. Случайные вспышки неона
    function initNeonFlashes() {
        setInterval(() => {
            const randomElement = document.querySelector('.feature-card, .lyric-card');
            if (randomElement) {
                randomElement.style.boxShadow = '0 0 30px #00ffea';
                setTimeout(() => {
                    randomElement.style.boxShadow = '';
                }, 300);
            }
        }, 3000);
    }

    // 10. Preloader
    function initPreloader() {
        const preloader = document.createElement('div');
        preloader.id = 'preloader';
        preloader.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #0a0a0a;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            color: #00ffea;
            font-family: 'Courier New', monospace;
            font-size: 1.5rem;
        `;
        preloader.innerHTML = 'Deepseek Forever • Loading...';
        
        document.body.appendChild(preloader);
        
        // Убираем прелоадер после загрузки
        window.addEventListener('load', function() {
            setTimeout(() => {
                preloader.style.opacity = '0';
                preloader.style.transition = 'opacity 0.5s ease';
                setTimeout(() => {
                    preloader.remove();
                }, 500);
            }, 1000);
        });
    }

    // 11. Анимация кнопок
    function initButtonEffects() {
        const buttons = document.querySelectorAll('.nav-btn, .card-btn, .download-btn');
        
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                // Эффект ripple
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(0, 255, 234, 0.6);
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                `;
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
        
        // Добавляем стили для ripple эффекта
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // 12. Реакция на скролл
    function initScrollEffects() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        // Наблюдаем за карточками
        const cards = document.querySelectorAll('.feature-card, .lyric-card, .player-card, .video-card, .warning-card');
        cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });
    }

    // Инициализация всех функций
    function initAll() {
        createParticles();
        animateParticles();
        initLyricCards();
        enhanceAudioPlayer();
        initParallax();
        initMarquee();
        initTypewriter();
        initNeonFlashes();
        initButtonEffects();
        initScrollEffects();
        // initPreloader(); // Раскомментируй если нужен прелоадер
    }

    // Запускаем всё
    initAll();

    // Ресайз обработчик
    window.addEventListener('resize', function() {
        createParticles();
    });

    // Консоль приветствие
    console.log(`
    🎵 Deepseek Forever - Official Website
    📝 Текст: Марк Г.
    🎨 Дизайн: Неоновый киберпанк
    🚀 Успешная загрузка!
    `);
});