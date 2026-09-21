// ========================================
// ویدئو
// ========================================

const video = document.getElementById("weddingVideo");

document.addEventListener("click", () => {

    if (video) {
        video.muted = false;
        video.play();
    }

}, { once: true });



// ========================================
// تایمر مراسم
// ========================================

// تاریخ مراسم
// 2026, 9, 7 یعنی 7 اکتبر 2026
let weddingDate = new Date(
    2026,
    9,
    9,
    19,
    0,
    0
).getTime();


function updateTimer() {

    let now = Date.now();

    let diff = weddingDate - now;


    // اگر زمان مراسم گذشته باشد
    if (diff <= 0) {

        document.getElementById("day").innerHTML = "0";
        document.getElementById("hour").innerHTML = "0";
        document.getElementById("min").innerHTML = "0";
        document.getElementById("sec").innerHTML = "0";

        return;
    }


    let days = Math.floor(
        diff / (1000 * 60 * 60 * 24)
    );


    let hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24))
        / (1000 * 60 * 60)
    );


    let minutes = Math.floor(
        (diff % (1000 * 60 * 60))
        / (1000 * 60)
    );


    let seconds = Math.floor(
        (diff % (1000 * 60))
        / 1000
    );


    document.getElementById("day").innerHTML = days;

    document.getElementById("hour").innerHTML = hours;

    document.getElementById("min").innerHTML = minutes;

    document.getElementById("sec").innerHTML = seconds;
}


// اجرای اولیه
updateTimer();

// به‌روزرسانی هر ثانیه
setInterval(updateTimer, 1000);


// ========================================
// تایید حضور با SMS
// ========================================

function sendRSVP(status) {

    // گرفتن اسم مهمان
    const nameInput = document.getElementById("rsvpName");

    if (!nameInput) {
        alert("خطایی در فرم ایجاد شده است.");
        return;
    }

    const name = nameInput.value.trim();

    // بررسی وارد کردن اسم
    if (name === "") {
        alert("لطفاً اسم خود را وارد کنید 🌸");
        nameInput.focus();
        return;
    }

    // شماره موبایل صاحب کارت
    const phone = "989337625170";

    // متن پیام
    let text;

    if (status === "yes") {

        text = `سلام، من ${name} هستم.
برای مراسم میام 🌸`;

    } else if (status === "no") {

        text = `سلام، من ${name} هستم.
متاسفانه نمی‌تونم بیام 💐`;

    } else {

        return;
    }

    // تبدیل متن برای SMS
    const body = encodeURIComponent(text);

    // تشخیص سیستم‌عامل
    const userAgent =
        navigator.userAgent ||
        navigator.vendor ||
        window.opera;

    const isIOS =
        /iPad|iPhone|iPod/.test(userAgent) ||
        (navigator.platform === "MacIntel" &&
         navigator.maxTouchPoints > 1);

    let smsURL;

    // فرمت مخصوص iPhone
    if (isIOS) {

        smsURL = `sms:${phone}&body=${body}`;

    }
    // فرمت Android و سایر دستگاه‌ها
    else {

        smsURL = `sms:${phone}?body=${body}`;
    }

    // باز کردن برنامه پیامک
    window.location.href = smsURL;
}
