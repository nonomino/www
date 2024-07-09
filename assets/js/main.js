document.addEventListener("DOMContentLoaded", function() {
  const toggleButton = document.getElementById("menu-toggle");
  const menu = document.getElementById("primary-nav");
  const paragraph = document.getElementById('greeting');
  const greetings = ['Hello', 'Namaste', 'Hola', 'Bonjour', 'Hallo', 'Ciao'];
  let currentIndex = 0;

  function changeText() {
    paragraph.textContent = greetings[currentIndex];
    currentIndex = (currentIndex + 1) % greetings.length;
  }

  function toggleMenu(event) {
    event.preventDefault();
    menu.classList.toggle("js-menu-is-open");
  }

  if (toggleButton && menu) {
    toggleButton.addEventListener("click", toggleMenu);
  }

  changeText();
  setInterval(changeText, 1500);
});
