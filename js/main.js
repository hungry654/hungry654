const images = [
  "images/main/image1.png",
  "images/main/image2.png",
  "images/main/image3.png",
  "images/main/image4.png"
];

const texts = [
  "\"Hello, I’m Gain\"",
  "\"Welcome to my world\""
];

let currentImage = 0;
let currentText = 0;

const slideshow = document.getElementById("slideshow");
const message = document.getElementById("message");
const clickBox = document.getElementById("clickBox");

//  커튼 요소 생성
const curtain = document.createElement("div");
curtain.className = "curtain";
curtain.innerHTML = `
  <div class="panel left"></div>
  <div class="panel right"></div>
`;
document.body.appendChild(curtain);

//  커튼 효과 트리거 (중앙 → 바깥쪽으로 열림)
function triggerCurtain() {
  curtain.classList.remove("open");
  void curtain.offsetWidth; // 강제 리플로우로 애니메이션 재실행
  curtain.classList.add("open");
}

//  이미지 전환
function updateSlide() {
  currentImage = (currentImage + 1) % images.length;
  slideshow.style.backgroundImage = `url('${images[currentImage]}')`;
  triggerCurtain();
}

//  문구 전환
function updateText() {
  if (currentText < texts.length) {
    message.textContent = texts[currentText];
    currentText++;
  } else {
    message.style.display = "none";
    clickBox.style.display = "block";
    clearInterval(textTimer);
  }
}

//  초기 설정
slideshow.style.backgroundImage = `url('${images[currentImage]}')`;
triggerCurtain();

// 타이머 시작
setInterval(updateSlide, 1200);     // 1.2초마다 이미지 & 커튼 전환
const textTimer = setInterval(updateText, 1700);  // 문구는 1.7초마다

//  클릭 시 페이지 이동
clickBox.addEventListener("click", () => {
  window.location.href = "mainhome.html";
});
