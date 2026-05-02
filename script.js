/* =========================================
   BTEC Jordan Guide - Main JavaScript
   Interactive Quiz & Animations
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Mobile Menu Toggle ---
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
            // Simple toggle for mobile view
            if (navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '80px';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = 'rgba(2, 6, 23, 0.95)';
                navLinks.style.padding = '2rem';
                navLinks.style.backdropFilter = 'blur(10px)';
            }
        });
    }

    // --- 2. Interactive Quiz "Choose Your Future" ---
    const questions = [
        {
            text: "كيف تفضل أن تتعلم؟",
            options: [
                { text: "عن طريق التطبيق العملي والمشاريع 🛠️", value: "btec" },
                { text: "عن طريق قراءة الكتب والحفظ 📚", value: "traditional" }
            ]
        },
        {
            text: "ما هو أسلوب التقييم المفضل لديك؟",
            options: [
                { text: "التقييم المستمر (واجبات ومشاريع طوال العام) 📈", value: "btec" },
                { text: "امتحان نهائي واحد يحدد مستواي 📝", value: "traditional" }
            ]
        },
        {
            text: "ما هو هدفك بعد المدرسة؟",
            options: [
                { text: "اكتساب مهارات والعمل أو دراسة تخصص تقني 💼", value: "btec" },
                { text: "دراسة تخصص أكاديمي بحت في الجامعة 🎓", value: "traditional" }
            ]
        }
    ];

    let currentQuestion = 0;
    let btecScore = 0;
    let traditionalScore = 0;

    const questionText = document.getElementById('question-text');
    const optionsGrid = document.querySelector('.options-grid');
    const progressBar = document.querySelector('.progress-bar');
    const quizQuestionContainer = document.getElementById('quiz-question-container');
    const quizResult = document.getElementById('quiz-result');
    const resultIcon = document.querySelector('.result-icon');
    const resultTitle = document.getElementById('result-title');
    const resultDesc = document.getElementById('result-desc');

    function renderQuestion() {
        if (currentQuestion >= questions.length) {
            showResult();
            return;
        }

        const q = questions[currentQuestion];
        questionText.textContent = q.text;
        optionsGrid.innerHTML = '';

        q.options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'quiz-option';
            btn.textContent = opt.text;
            btn.onclick = () => handleAnswer(opt.value);
            optionsGrid.appendChild(btn);
        });

        // Update progress bar
        const progress = (currentQuestion / questions.length) * 100;
        progressBar.style.width = `${progress}%`;
    }

    function handleAnswer(value) {
        if (value === 'btec') btecScore++;
        else traditionalScore++;

        currentQuestion++;
        renderQuestion();
    }

    function showResult() {
        progressBar.style.width = '100%';
        quizQuestionContainer.classList.add('hidden');
        quizResult.classList.remove('hidden');

        if (btecScore > traditionalScore) {
            resultIcon.innerHTML = '🌟';
            resultTitle.innerHTML = 'أنت طالب <span class="highlight">BTEC</span> بامتياز!';
            resultDesc.textContent = 'شخصيتك تميل للعمل التطبيقي واكتساب المهارات. نظام BTEC سيمنحك البيئة المثالية للإبداع وتطوير مشاريع حقيقية تضمن لك مستقبلاً مشرقاً في سوق العمل.';
        } else {
            resultIcon.innerHTML = '📚';
            resultTitle.textContent = 'التعليم التقليدي يناسبك أكثر';
            resultDesc.textContent = 'يبدو أنك ترتاح للأسلوب الأكاديمي، الحفظ، والدراسة النظرية. نظام التوجيهي التقليدي قد يكون الخيار الأفضل لك للوصول إلى تخصصاتك المفضلة.';
        }
    }

    // Expose reset globally
    window.resetQuiz = function() {
        currentQuestion = 0;
        btecScore = 0;
        traditionalScore = 0;
        quizResult.classList.add('hidden');
        quizQuestionContainer.classList.remove('hidden');
        renderQuestion();
    };

    // Initialize Quiz
    if (questionText && optionsGrid) {
        renderQuestion();
    }

    // --- 3. Scroll Animations (Intersection Observer) ---
    const animatedElements = document.querySelectorAll('.glass-card, .timeline-item, .ps-item');
    
    // Set initial state
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach(el => observer.observe(el));
});
