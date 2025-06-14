document.addEventListener('DOMContentLoaded', function() {
  const features = document.querySelectorAll('.feature');
  if (features.length > 0) {
    features[0].style.cursor = 'pointer';
    features[0].addEventListener('click', function() {
      window.open('https://www.hannam.ac.kr/kor/main/', '_blank');
    });
  }
  if (features.length > 1) {
    features[1].style.cursor = 'pointer';
    features[1].addEventListener('click', function() {
      window.open('https://www.hannam.ac.kr/kor/educate/educate_0103_08.html', '_blank');
    });
  }

  // 더보기/접기 버튼 기능
  const showMoreBtn = document.getElementById('showMoreBtn');
  const hideMoreBtn = document.getElementById('hideMoreBtn');
  if (showMoreBtn && hideMoreBtn) {
    showMoreBtn.addEventListener('click', function() {
      document.querySelectorAll('.more-cert').forEach(function(ul) {
        ul.style.display = 'block';
      });
      showMoreBtn.style.display = 'none';
      hideMoreBtn.style.display = 'inline-block';
    });
    hideMoreBtn.addEventListener('click', function() {
      document.querySelectorAll('.more-cert').forEach(function(ul) {
        ul.style.display = 'none';
      });
      showMoreBtn.style.display = 'inline-block';
      hideMoreBtn.style.display = 'none';
    });
  }
});
