document.addEventListener('DOMContentLoaded', function() {
  const workImg = document.querySelector('img[src="images/mainhome/work1.png"]');
  if (workImg) {
    workImg.style.cursor = 'pointer';
    workImg.addEventListener('click', function() {
      window.open('https://github.com/hungry654/GainAssignmentSolution.git', '_blank');
    });
  }
});