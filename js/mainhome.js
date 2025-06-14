// mainhome.js
// 추후 인터랙션(예: 메뉴 토글, 스크롤 애니메이션 등) 추가 가능

// 예시: 버튼 클릭 시 알림
const aboutBtn = document.querySelector('.about button');
if (aboutBtn) {
  aboutBtn.addEventListener('click', () => {
    alert('회사 소개 페이지로 이동합니다.');
  });
}

// 나무 생성 기능
const mainVisual = document.querySelector('.main-visual');
const treeContainer = document.getElementById('tree-container');

function createBranch(x, y, length, angle, depth) {
  if (depth > 8) return; // 최대 깊이 감소 (12 -> 8)

  const branch = document.createElement('div');
  branch.className = `branch ${depth === 0 ? 'trunk' : `level-${Math.min(depth, 5)}`}`;
  branch.style.height = `${length}px`;
  branch.style.left = `${x}px`;
  branch.style.top = `${y}px`;
  branch.style.transform = `rotate(${angle}deg) scaleY(0)`;
  treeContainer.appendChild(branch);

  // 애니메이션 시작
  setTimeout(() => {
    branch.style.transform = `rotate(${angle}deg) scaleY(1)`;
  }, 50);

  // 다음 가지 생성을 위한 끝점 계산
  const endX = x + Math.sin(angle * Math.PI / 180) * length;
  const endY = y - Math.cos(angle * Math.PI / 180) * length;

  // 반복적으로 가지 생성
  setTimeout(() => {
    const branchCount = depth < 2 ? 2 : 1; // 초반에는 2개의 가지, 이후에는 1개
    const angleSpread = depth < 2 ? 25 : 20; // 각도 범위 감소
    
    for (let i = 0; i < branchCount; i++) {
      const newAngle = angle + (i === 0 ? -angleSpread : angleSpread);
      const newLength = length * (depth === 0 ? 0.7 : 0.8); // 길이 비율 조정
      const randomOffset = Math.random() * 8 - 4; // 랜덤 오프셋 감소
      
      createBranch(
        endX + randomOffset,
        endY,
        newLength * (0.9 + Math.random() * 0.2), // 랜덤성 감소
        newAngle + (Math.random() * 10 - 5), // 각도 랜덤성 감소
        depth + 1
      );
    }
  }, 500);
}

mainVisual.addEventListener('click', (e) => {
  const rect = mainVisual.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = 300; // 시작 위치 조정
  
  // 기존 나무 제거
  treeContainer.innerHTML = '';
  
  // 새로운 나무 생성 - 초기 크기를 랜덤하게 설정 (130~170px)
  const initialLength = 130 + Math.random() * 40;
  createBranch(x, y, initialLength, 0, 0);
});

// 이미지 슬라이더 기능
const sliderTrack = document.querySelector('.slider-track');
const sliderItems = document.querySelectorAll('.slider-item');
const leftBtn = document.querySelector('.slider-btn.left');
const rightBtn = document.querySelector('.slider-btn.right');
let sliderIndex = 0;
const visibleCount = 2;
const totalItems = sliderItems.length;

function getItemWidthWithMargin() {
  const item = sliderItems[0];
  const style = window.getComputedStyle(item);
  const margin = parseInt(style.marginLeft) + parseInt(style.marginRight);
  return item.offsetWidth + margin;
}

leftBtn.addEventListener('click', () => {
  if (sliderIndex > 0) {
    sliderIndex -= visibleCount;
    if (sliderIndex < 0) sliderIndex = 0;
    updateSlider();
  }
});

rightBtn.addEventListener('click', () => {
  if (sliderIndex < totalItems - visibleCount) {
    sliderIndex += visibleCount;
    if (sliderIndex > totalItems - visibleCount) sliderIndex = totalItems - visibleCount;
    updateSlider();
  }
});

function updateSlider() {
  const itemWidth = getItemWidthWithMargin();
  sliderTrack.style.transform = `translateX(-${sliderIndex * itemWidth}px)`;
}

window.addEventListener('resize', updateSlider);
updateSlider();

// 작업 이미지 클릭 시 이동
document.addEventListener('DOMContentLoaded', function() {
  const workImg = document.querySelector('img[src="images/mainhome/work1.png"]');
  if (workImg) {
    workImg.style.cursor = 'pointer';
    workImg.addEventListener('click', function() {
      window.open('https://github.com/hungry654/GainAssignmentSolution.git', '_blank');
    });
  }

  const work2Img = document.querySelector('img[src="images/mainhome/work2.png"]');
  if (work2Img) {
    work2Img.style.cursor = 'pointer';
    work2Img.addEventListener('click', function() {
      window.location.href = 'work1.html';
    });
  }
});