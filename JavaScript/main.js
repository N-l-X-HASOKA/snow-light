// بيانات المواد والدروس
const subjectsData = {
    math: {
        title: "الرياضيات",
        lessons: 10,
        videos: {
            "A1": { title: "الدرس الأول: الأعداد الصحيحة", durations: { "240": "videos/math/A1_240.mp4", "360": "videos/math/A1_360.mp4", "480": "videos/math/A1_480.mp4", "720": "videos/math/A1_720.mp4" } },
            "A2": { title: "الدرس الثاني: الكسور", durations: { "240": "videos/math/A2_240.mp4", "360": "videos/math/A2_360.mp4", "480": "videos/math/A2_480.mp4", "720": "videos/math/A2_720.mp4" } },
            "A3": { title: "الدرس الثالث: المعادلات", durations: { "240": "videos/math/A3_240.mp4", "360": "videos/math/A3_360.mp4", "480": "videos/math/A3_480.mp4", "720": "videos/math/A3_720.mp4" } },
            "A4": { title: "الدرس الرابع: الهندسة", durations: { "240": "videos/math/A4_240.mp4", "360": "videos/math/A4_360.mp4", "480": "videos/math/A4_480.mp4", "720": "videos/math/A4_720.mp4" } },
            "A5": { title: "الدرس الخامس: الجبر", durations: { "240": "videos/math/A5_240.mp4", "360": "videos/math/A5_360.mp4", "480": "videos/math/A5_480.mp4", "720": "videos/math/A5_720.mp4" } },
            "A6": { title: "الدرس السادس: الإحصاء", durations: { "240": "videos/math/A6_240.mp4", "360": "videos/math/A6_360.mp4", "480": "videos/math/A6_480.mp4", "720": "videos/math/A6_720.mp4" } },
            "A7": { title: "الدرس السابع: النسب المئوية", durations: { "240": "videos/math/A7_240.mp4", "360": "videos/math/A7_360.mp4", "480": "videos/math/A7_480.mp4", "720": "videos/math/A7_720.mp4" } },
            "A8": { title: "الدرس الثامن: الزوايا", durations: { "240": "videos/math/A8_240.mp4", "360": "videos/math/A8_360.mp4", "480": "videos/math/A8_480.mp4", "720": "videos/math/A8_720.mp4" } },
            "A9": { title: "الدرس التاسع: الأشكال الهندسية", durations: { "240": "videos/math/A9_240.mp4", "360": "videos/math/A9_360.mp4", "480": "videos/math/A9_480.mp4", "720": "videos/math/A9_720.mp4" } },
            "A10": { title: "الدرس العاشر: القياس", durations: { "240": "videos/math/A10_240.mp4", "360": "videos/math/A10_360.mp4", "480": "videos/math/A10_480.mp4", "720": "videos/math/A10_720.mp4" } }
        }
    },
    science: {
        title: "العلوم",
        lessons: 10,
        videos: {} // يمكن إضافة الفيديوهات لاحقاً
    },
    arabic: {
        title: "اللغة العربية",
        lessons: 10,
        videos: {} // يمكن إضافة الفيديوهات لاحقاً
    },
    english: {
        title: "اللغة الإنجليزية",
        lessons: 10,
        videos: {} // يمكن إضافة الفيديوهات لاحقاً
    }
};

// عناصر DOM
const subjectsSection = document.querySelector('.subjects-section');
const lessonsSection = document.querySelector('.lessons-section');
const videoSection = document.querySelector('.video-section');
const lessonsContainer = document.querySelector('.lessons-container');
const subjectTitle = document.querySelector('.subject-title');
const lessonTitle = document.querySelector('.lesson-title');
const videoPlayer = document.getElementById('lesson-video');
const backToSubjectsBtn = document.querySelector('.back-to-subjects .back-btn');
const backToLessonsBtn = document.querySelector('.back-to-lessons .back-btn');
const openSubjectBtns = document.querySelectorAll('.open-subject');
const qualityBtns = document.querySelectorAll('.quality-btn');

// متغيرات التطبيق
let currentSubject = '';
let currentLesson = '';
let currentQuality = '720';

// فتح صفحة الدروس عند الضغط على مادة
openSubjectBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.stopPropagation();
        const subjectCard = this.closest('.subject-card');
        currentSubject = subjectCard.dataset.subject;
        showLessons(currentSubject);
    });
});

// أو استخدام event delegation للبطاقات
subjectsSection.addEventListener('click', function(e) {
    const subjectCard = e.target.closest('.subject-card');
    if (subjectCard) {
        currentSubject = subjectCard.dataset.subject;
        showLessons(currentSubject);
    }
});

// عرض دروس المادة
function showLessons(subject) {
    subjectsSection.classList.add('hidden');
    lessonsSection.classList.remove('hidden');
    videoSection.classList.add('hidden');
    
    subjectTitle.textContent = subjectsData[subject].title;
    lessonsContainer.innerHTML = '';
    
    // إنشاء أزرار الدروس
    for (let i = 1; i <= subjectsData[subject].lessons; i++) {
        const lessonCode = `A${i}`;
        const lessonBtn = document.createElement('button');
        lessonBtn.className = 'lesson-btn';
        lessonBtn.textContent = lessonCode;
        lessonBtn.dataset.lesson = lessonCode;
        
        lessonBtn.addEventListener('click', function() {
            currentLesson = this.dataset.lesson;
            showVideo(subject, currentLesson);
        });
        
        lessonsContainer.appendChild(lessonBtn);
    }
}

// عرض الفيديو
function showVideo(subject, lesson) {
    lessonsSection.classList.add('hidden');
    videoSection.classList.remove('hidden');
    
    const videoInfo = subjectsData[subject].videos[lesson];
    if (videoInfo) {
        lessonTitle.textContent = videoInfo.title;
        videoPlayer.src = videoInfo.durations[currentQuality];
    } else {
        lessonTitle.textContent = `الدرس ${lesson} - ${subjectsData[subject].title}`;
        videoPlayer.src = '';
    }
    
    videoPlayer.load();
}

// تغيير جودة الفيديو
qualityBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        currentQuality = this.dataset.quality;
        const videoInfo = subjectsData[currentSubject].videos[currentLesson];
        if (videoInfo) {
            videoPlayer.src = videoInfo.durations[currentQuality];
            videoPlayer.load();
        }
        
        // تحديث حالة الأزرار
        qualityBtns.forEach(btn => {
            btn.classList.remove('active');
        });
        this.classList.add('active');
    });
});

// العودة إلى المواد
backToSubjectsBtn.addEventListener('click', function() {
    lessonsSection.classList.add('hidden');
    videoSection.classList.add('hidden');
    subjectsSection.classList.remove('hidden');
});

// العودة إلى الدروس
backToLessonsBtn.addEventListener('click', function() {
    videoSection.classList.add('hidden');
    lessonsSection.classList.remove('hidden');
});

// تهيئة جودة الفيديو الافتراضية
document.addEventListener('DOMContentLoaded', function() {
    qualityBtns.forEach(btn => {
        if (btn.dataset.quality === currentQuality) {
            btn.classList.add('active');
        }
    });
});