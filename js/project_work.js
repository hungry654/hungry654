document.addEventListener('DOMContentLoaded', function() {
  const cardLinks = document.querySelectorAll('.card-carousel .card-link');
  const cards = document.querySelectorAll('.card-carousel .card');
  const total = cards.length;
  const radius = 320; // 원형 반지름(px) - 기존 320에서 220으로 줄임

  let angleOffset = 0;

  function renderCards(angleOffset) {
    cards.forEach((card, i) => {
      const angle = (360 / total) * i + angleOffset;
      const rad = angle * Math.PI / 180;
      const x = Math.cos(rad) * radius;
      const y = Math.sin(rad) * radius;
      card.parentElement.style.zIndex = 100 + Math.round(Math.sin(rad) * 100);
      card.style.transform = `
        translate(-50%, -50%)
        translateX(${x}px)
        translateY(${y}px)
        rotate(${angle + 90}deg)
      `;
    });
  }

  renderCards(angleOffset);

  // 카드 클릭 시에만 이동, 시계나 배경 클릭 시 이동 없음
  document.querySelector('.card-carousel').addEventListener('click', function(e) {
    const card = e.target.closest('.card');
    if (!card) return; // 카드가 아니면 아무 동작도 하지 않음
    const link = card.parentElement;
    if (link && link.classList.contains('card-link')) {
      const href = link.getAttribute('data-href');
      if (href) location.assign(href);
    }
  });

  let countdown = 5;
  const countdownEl = document.getElementById('countdown');
  const koreaDateEl = document.getElementById('koreaDate');
  const koreaTimeEl = document.getElementById('koreaTime');

  function updateKoreaClock() {
    const now = new Date();
    // 대한민국 표준시(GMT+9)로 변환
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const korea = new Date(utc + (9 * 60 * 60 * 1000));
    let hour = korea.getHours();
    const min = String(korea.getMinutes()).padStart(2, '0');
    const sec = String(korea.getSeconds()).padStart(2, '0');
    const year = korea.getFullYear();
    const month = korea.getMonth() + 1;
    const date = korea.getDate();
    const dayNames = ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'];
    const day = dayNames[korea.getDay()];
    const ampm = hour < 12 ? '오전' : '오후';
    let hour12 = hour % 12;
    if (hour12 === 0) hour12 = 12;

    koreaTimeEl.textContent = `${ampm} ${hour12}:${min}:${sec}`;
    koreaDateEl.textContent = `${year}년 ${month}월 ${date}일, ${day} (GMT+9)`;
  }

  countdownEl.textContent = countdown;
  updateKoreaClock();
  setInterval(updateKoreaClock, 1000);

  setInterval(function() {
    countdown--;
    if (countdown === 0) {
      angleOffset += 360 / total; // 카드 한 칸(60도)씩 이동
      renderCards(angleOffset);
      countdown = 5;
    }
    countdownEl.textContent = countdown;
  }, 1000);
}); 