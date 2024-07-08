document.addEventListener("DOMContentLoaded", function() {
  var toggleButton = document.getElementById("menu-toggle");
  var menu = document.getElementById("primary-nav");

  if (toggleButton && menu) {
    toggleButton.addEventListener("click", function(event) {
      event.preventDefault();
      menu.classList.toggle("js-menu-is-open");
    });
  }
});