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

    // اسم واردشده در فرم RSVP
    let name = document.getElementById("rsvpName").value;

    // اگر اسم وارد نشده باشد
    if (!name.trim()) {
        alert("لطفاً اسم خود را وارد کنید 🌸");
        return;
    }

    // شماره موبایل صاحب کارت
    let phone = "989337625170";

    let text = "";

    // اگر مهمان می‌آید
    if (status === "yes") {

        text = `سلام، من ${name} هستم.
برای مراسم میام 🌸`;

    }

    // اگر مهمان نمی‌آید
    else {

        text = `سلام، من ${name} هستم.
متاسفانه نمی‌تونم بیام 💐`;

    }

    // ساخت لینک SMS
    let url = `sms:${phone}?body=${encodeURIComponent(text)}`;

    // باز کردن برنامه پیامک
    window.location.href = url;
}