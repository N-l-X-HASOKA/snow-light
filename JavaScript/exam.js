// بيانات الاختبارات
const examsData = {
    math: {
        title: "رياضيات",
        exams: {
            "A1": {
                title: "اختبار الأعداد الصحيحة",
                questions: [
                    {
                        question: "ما هو ناتج جمع 5 + 7؟",
                        answers: ["10", "11", "12", "13"],
                        correct: 2
                    },
                    {
                        question: "ما هو ناتج طرح 15 - 8؟",
                        answers: ["6", "7", "8", "9"],
                        correct: 1
                    },
                    {
                        question: "ما هو ناتج ضرب 6 × 9؟",
                        answers: ["45", "54", "56", "63"],
                        correct: 1
                    },
                    {
                        question: "ما هو ناتج قسمة 48 ÷ 6؟",
                        answers: ["6", "7", "8", "9"],
                        correct: 2
                    },
                    {
                        question: "ما هو العدد الأولي من بين الأعداد التالية؟",
                        answers: ["9", "15", "17", "21"],
                        correct: 2
                    }
                ]
            },
            "A2": {
                title: "اختبار الكسور",
                questions: [
                    {
                        question: "ما هو الكسر المكافئ لـ 2/4 في أبسط صورة؟",
                        answers: ["1/2", "1/4", "2/8", "4/16"],
                        correct: 0
                    },
                    {
                        question: "ما هو ناتج جمع 1/2 + 1/4؟",
                        answers: ["1/6", "2/6", "3/4", "1/8"],
                        correct: 2
                    },
                    {
                        question: "ما هو ناتج طرح 3/4 - 1/4؟",
                        answers: ["1/4", "1/2", "2/4", "4/4"],
                        correct: 1
                    },
                    {
                        question: "ما هو الكسر العشري لـ 3/4؟",
                        answers: ["0.25", "0.5", "0.75", "1.25"],
                        correct: 2
                    },
                    {
                        question: "ما هو الكسر العكسي لـ 2/3؟",
                        answers: ["3/2", "2/3", "1/3", "3/1"],
                        correct: 0
                    }
                ]
            },
            "A3": {
                title: "اختبار المعادلات",
                questions: [
                    {
                        question: "ما هو حل المعادلة: س + 5 = 10؟",
                        answers: ["2", "5", "10", "15"],
                        correct: 1
                    },
                    {
                        question: "ما هو حل المعادلة: 2ص = 16؟",
                        answers: ["4", "8", "16", "32"],
                        correct: 1
                    },
                    {
                        question: "ما هو حل المعادلة: 3ع - 5 = 10؟",
                        answers: ["3", "5", "10", "15"],
                        correct: 1
                    },
                    {
                        question: "ما هو حل المعادلة: 4(س + 2) = 20؟",
                        answers: ["2", "3", "4", "5"],
                        correct: 1
                    },
                    {
                        question: "ما هو حل المعادلة: س² = 16؟",
                        answers: ["2", "4", "8", "16"],
                        correct: 1
                    }
                ]
            }
        }
    },
    science: {
        title: "علوم",
        exams: {} // يمكن إضافة اختبارات لاحقاً
    },
    arabic: {
        title: "لغة عربية",
        exams: {} // يمكن إضافة اختبارات لاحقاً
    },
    english: {
        title: "لغة إنجليزية",
        exams: {} // يمكن إضافة اختبارات لاحقاً
    }
};

// عناصر DOM
const subjectsSection = document.querySelector('.subjects-section');
const examsSection = document.querySelector('.exams-section');
const quizSection = document.querySelector('.quiz-section');
const examsContainer = document.querySelector('.exams-container');
const quizContainer = document.querySelector('.quiz-container');
const subjectTitle = document.querySelector('.subject-title');
const examTitle = document.querySelector('.exam-title');
const backToSubjectsBtn = document.querySelector('.back-to-subjects .back-btn');
const backToExamsBtn = document.querySelector('.back-to-exams .back-btn');
const openExamsBtns = document.querySelectorAll('.open-exams');
const correctCount = document.querySelector('.correct-answers .count');
const wrongCount = document.querySelector('.wrong-answers .count');
const quizResult = document.querySelector('.quiz-result');
const finalCorrect = document.querySelector('.final-correct');
const finalWrong = document.querySelector('.final-wrong');
const totalQuestions = document.querySelector('.total-questions');
const percentage = document.querySelector('.percentage');
const restartQuizBtn = document.querySelector('.restart-quiz');

// متغيرات التطبيق
let currentSubject = '';
let currentExam = '';
let currentQuestion = 0;
let correctAnswers = 0;
let wrongAnswers = 0;
let quizQuestions = [];

// فتح صفحة الاختبارات عند الضغط على مادة
openExamsBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.stopPropagation();
        const subjectCard = this.closest('.subject-card');
        currentSubject = subjectCard.dataset.subject;
        showExams(currentSubject);
    });
});

// أو استخدام event delegation للبطاقات
subjectsSection.addEventListener('click', function(e) {
    const subjectCard = e.target.closest('.subject-card');
    if (subjectCard) {
        currentSubject = subjectCard.dataset.subject;
        showExams(currentSubject);
    }
});

// عرض اختبارات المادة
function showExams(subject) {
    subjectsSection.classList.add('hidden');
    examsSection.classList.remove('hidden');
    quizSection.classList.add('hidden');
    
    subjectTitle.textContent = examsData[subject].title;
    examsContainer.innerHTML = '';
    
    // إنشاء أزرار الاختبارات
    for (const examCode in examsData[subject].exams) {
        const examBtn = document.createElement('button');
        examBtn.className = 'exam-btn';
        examBtn.innerHTML = `
            <div class="exam-icon">
                <i class="fas fa-question-circle"></i>
            </div>
            <h3>${examsData[subject].exams[examCode].title}</h3>
            <p>${examsData[subject].exams[examCode].questions.length} أسئلة</p>
        `;
        examBtn.dataset.exam = examCode;
        
        examBtn.addEventListener('click', function() {
            currentExam = this.dataset.exam;
            startQuiz(subject, currentExam);
        });
        
        examsContainer.appendChild(examBtn);
    }
}

// بدء الاختبار
function startQuiz(subject, exam) {
    examsSection.classList.add('hidden');
    quizSection.classList.remove('hidden');
    quizResult.classList.add('hidden');
    
    examTitle.textContent = examsData[subject].exams[exam].title;
    quizQuestions = [...examsData[subject].exams[exam].questions];
    currentQuestion = 0;
    correctAnswers = 0;
    wrongAnswers = 0;
    
    updateScore();
    showQuestion();
}

// عرض السؤال الحالي
function showQuestion() {
    if (currentQuestion >= quizQuestions.length) {
        showResult();
        return;
    }
    
    const question = quizQuestions[currentQuestion];
    quizContainer.innerHTML = `
        <div class="question">
            <h3>السؤال ${currentQuestion + 1}: ${question.question}</h3>
        </div>
        <div class="answers">
            ${question.answers.map((answer, index) => `
                <button class="answer-btn" data-answer="${index}">${answer}</button>
            `).join('')}
        </div>
    `;
    
    // إضافة مستمعين للأزرار
    document.querySelectorAll('.answer-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            checkAnswer(parseInt(this.dataset.answer));
        });
    });
}

// التحقق من الإجابة
function checkAnswer(selectedAnswer) {
    const correctAnswer = quizQuestions[currentQuestion].correct;
    
    if (selectedAnswer === correctAnswer) {
        correctAnswers++;
        document.querySelector(`.answer-btn[data-answer="${selectedAnswer}"]`).classList.add('correct');
    } else {
        wrongAnswers++;
        document.querySelector(`.answer-btn[data-answer="${selectedAnswer}"]`).classList.add('wrong');
        document.querySelector(`.answer-btn[data-answer="${correctAnswer}"]`).classList.add('correct');
    }
    
    updateScore();
    
    // الانتقال إلى السؤال التالي بعد تأخير
    setTimeout(() => {
        currentQuestion++;
        showQuestion();
    }, 1500);
}

// تحديث النتيجة
function updateScore() {
    correctCount.textContent = correctAnswers;
    wrongCount.textContent = wrongAnswers;
}

// عرض النتيجة النهائية
function showResult() {
    quizContainer.classList.add('hidden');
    quizResult.classList.remove('hidden');
    
    finalCorrect.textContent = correctAnswers;
    finalWrong.textContent = wrongAnswers;
    totalQuestions.textContent = quizQuestions.length;
    
    const percent = Math.round((correctAnswers / quizQuestions.length) * 100);
    percentage.textContent = `${percent}%`;
}

// إعادة الاختبار
restartQuizBtn.addEventListener('click', function() {
    quizContainer.classList.remove('hidden');
    quizResult.classList.add('hidden');
    currentQuestion = 0;
    correctAnswers = 0;
    wrongAnswers = 0;
    updateScore();
    showQuestion();
});

// العودة إلى المواد
backToSubjectsBtn.addEventListener('click', function() {
    examsSection.classList.add('hidden');
    quizSection.classList.add('hidden');
    subjectsSection.classList.remove('hidden');
});

// العودة إلى الاختبارات
backToExamsBtn.addEventListener('click', function() {
    quizSection.classList.add('hidden');
    examsSection.classList.remove('hidden');
});

// إضافة بعض التنسيقات الديناميكية
document.addEventListener('DOMContentLoaded', function() {
    // يمكن إضافة أي تهيئة إضافية هنا
});