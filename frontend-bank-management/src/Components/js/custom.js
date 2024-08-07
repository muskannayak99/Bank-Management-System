let sidebar = document.querySelector('.sidebar');
let mainContent = document.querySelector('.main-container');
let headerImage = document.getElementById('headerImage');
function setMainContentClass() {
  if (window.innerWidth <= 768) {
    mainContent.classList.add('main-content_large');
    sidebar.classList.add('sidebar_small');
  } else {
    mainContent.classList.remove('main-content_large');
    sidebar.classList.remove('sidebar_small');
  }
}

// Call the function when the page loads
setMainContentClass();

// Event listener for window resize
window.addEventListener('resize', setMainContentClass);
document.querySelector('.collapse-btn').onclick = function () {
  sidebar.classList.toggle('sidebar_small');
  mainContent.classList.toggle('main-content_large');

  let headerImage = document.querySelector('.logo');
  if (headerImage.src.includes('dummy_logo')) {
    headerImage.src = 'assets/images/small_logo.png';
  } else {
    headerImage.src = 'assets/images/dummy_logo.png';
  }
};

function checkMe(selected) {
  if (selected) {
    document.getElementById('divcheck').style.display = '';
    let check = (document.getElementById('openStatus').innerHTML = 'Open');
  } else {
    document.getElementById('divcheck').style.display = 'none';
    let check = (document.getElementById('openStatus').innerHTML = 'Closed');
  }
}

document.addEventListener('DOMContentLoaded', function () {
  var subBtns = document.querySelectorAll('.sub-btn');
  subBtns.forEach(function (subBtn) {
    subBtn.addEventListener('click', function () {
      var subMenu = this.nextElementSibling;
      subMenu.style.display = subMenu.style.display === 'none' ? 'block' : 'none';
      if (subMenu.style.display === 'block') {
        subBtn.classList.add('navlist-active');
      } else {
        subBtn.classList.remove('navlist-active');
      }
      this.querySelector('.arrow-up').classList.toggle('rotate');
    });
  });
});
