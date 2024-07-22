function setTheme(theme, baseurl, themeStyleLink, themeIcon) {
	if (theme === 'dark') {
		themeStyleLink.setAttribute('href', `${baseurl}/assets/css/skins/dark.css`);
		themeIcon.setAttribute('class', 'icon lamp-off');
	} else {
		themeStyleLink.setAttribute('href', `${baseurl}/assets/css/skins/light.css`);
		themeIcon.setAttribute('class', 'icon lamp-on');
	}
	localStorage.setItem('theme', theme);
}

function encryptText(text) {
	const shift = 3;
	return text.replace(/[a-zA-Z]/g, (char) => {
		const base = char <= 'Z' ? 65 : 97;
		return String.fromCharCode(((char.charCodeAt(0) - base + shift) % 26) + base);
	});
}

function handleCopyEvent(event) {
	const selection = window.getSelection();
	if (selection.rangeCount > 0) {
		const selectedText = selection.toString();
		const modifiedText = encryptText(selectedText);
		event.clipboardData.setData('text/plain', modifiedText);
		event.preventDefault();
	}
}

function changeText(paragraph, greetings) {
	let currentIndex = 0;
	return function() {
		paragraph.textContent = greetings[currentIndex];
		currentIndex = (currentIndex + 1) % greetings.length;
	};
}

function toggleMenu(event, menu) {
	event.preventDefault();
	menu.classList.toggle("js-menu-is-open");
}

document.addEventListener("DOMContentLoaded", function() {
	document.body.style.opacity = '1';
	const themeToggleBtn = document.getElementById('theme-toggle');
	const themeStyleLink = document.getElementById('theme-style');
	const themeIcon = document.getElementById('theme-icon');
	const themeSound = document.getElementById('theme-sound');
	const baseurl = themeToggleBtn.getAttribute('data-baseurl');
	const menuToggleButton = document.getElementById("menu-toggle");
	const menu = document.getElementById("primary-nav");
	const paragraph = document.getElementById('greeting');
	const greetings = ['Hello, world!', 'Χάρηκα', '¿Cómo estás?'];
	const savedTheme = localStorage.getItem('theme') || 'light';
	const updateGreeting = changeText(paragraph, greetings);

	if (menuToggleButton) {
		menuToggleButton.addEventListener("click", function(event) {
			toggleMenu(event, menu);
		});
	}

	themeToggleBtn.addEventListener('click', function() {
		const currentTheme = localStorage.getItem('theme') || 'light';
		const newTheme = currentTheme === 'light' ? 'dark' : 'light';
		setTheme(newTheme, baseurl, themeStyleLink, themeIcon);
		themeSound.play().catch(error => {
			console.error('Failed to play theme sound:', error);
		});
	});

	document.addEventListener('selectionchange', () => {
		const selection = window.getSelection();
		if (selection.rangeCount > 0) {
			const selectedText = selection.toString();
		}
	});

	document.addEventListener('beforecopy', handleCopyEvent);
	document.addEventListener('copy', handleCopyEvent);

	setTheme(savedTheme, baseurl, themeStyleLink, themeIcon);
	updateGreeting();
	setInterval(updateGreeting, 2500);
});