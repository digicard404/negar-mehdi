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

    const nameInput = document.getElementById("rsvpName");

    if (!nameInput) {
        return;
    }

    const name = nameInput.value.trim();

    // بررسی اسم
    if (!name) {
        alert("لطفاً اسم خود را وارد کنید 🌸");
        nameInput.focus();
        return;
    }

    // شماره صاحب کارت
    const phone = "989337625170";

    let text = "";

    if (status === "yes") {

        text = `سلام، من ${name} هستم.
برای مراسم میام 🌸`;

    } else if (status === "no") {

        text = `سلام، من ${name} هستم.
متاسفانه نمی‌تونم بیام 💐`;

    } else {

        return;
    }

    const body = encodeURIComponent(text);

    const userAgent = navigator.userAgent || "";

    const isIOS =
        /iPad|iPhone|iPod/.test(userAgent) ||
        (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

    let smsURL;

    if (isIOS) {
        smsURL = `sms:${phone}&body=${body}`;
    } else {
        smsURL = `sms:${phone}?body=${body}`;
    }

    // تلاش برای باز کردن SMS
    window.location.href = smsURL;

    // اگر SMS باز نشد، راهنما نمایش داده شود
    setTimeout(() => {
        showBrowserMessage();
    }, 1800);
}


// ========================================
// پیام راهنمای باز کردن در Chrome
// ========================================

function showBrowserMessage() {

    // اگر پیام قبلاً ساخته شده، دوباره نساز
    if (document.getElementById("browserMessage")) {
        return;
    }

    const message = document.createElement("div");

    message.id = "browserMessage";

    message.innerHTML = `
        <div class="browser-message-box">

            <div class="browser-message-icon">
                🌸
            </div>

            <h3>
                برای ثبت حضور
            </h3>

            <p>
                اگر پیامک برای شما باز نشد،
                لطفاً این کارت را با
                <strong>Google Chrome</strong>
                باز کنید.
            </p>

            <button onclick="closeBrowserMessage()">
                متوجه شدم
            </button>

        </div>
    `;

    document.body.appendChild(message);
}


// بستن پیام
function closeBrowserMessage() {

    const message = document.getElementById("browserMessage");

    if (message) {
        message.remove();
    }
}
