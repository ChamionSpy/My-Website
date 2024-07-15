document.addEventListener('DOMContentLoaded', function() {
  // Handle redirect buttons
  var redirectButtons = document.querySelectorAll('.redirect-button');
  
  redirectButtons.forEach(function(button) {
      button.addEventListener('click', function() {
          var redirectURL = button.getAttribute('data-target');
          if (redirectURL) {
              window.location.href = redirectURL;
          }
      });
  });

  // Handle doctors navigation
  const leftArrow = document.querySelector('.doctors_nav .fa-arrow-left');
  const rightArrow = document.querySelector('.doctors_nav .fa-arrow-right');
  const doctorsGrid = document.querySelector('.doctors_grid');
  let scrollAmount = 200; // Adjust scroll amount as needed
  
  if (leftArrow && rightArrow && doctorsGrid) {
      leftArrow.addEventListener('click', function() {
          doctorsGrid.scrollLeft -= scrollAmount;
      });

      rightArrow.addEventListener('click', function() {
          doctorsGrid.scrollLeft += scrollAmount;
      });
  }
});