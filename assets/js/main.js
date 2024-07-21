document.addEventListener("DOMContentLoaded", function() {
	document.body.style.opacity='1';
	const toggleButton = document.getElementById("menu-toggle");
	const menu = document.getElementById("primary-nav");
	const paragraph = document.getElementById('greeting');
	const greetings = ['Hello, world!', 'Χάρηκα', '¿Cómo estás?'];
	let currentIndex = 0;
	
	document.addEventListener('selectionchange', () => {
		const selection = window.getSelection();
			if (selection.rangeCount > 0) {
				const selectedText = selection.toString();
				console.log('Selected text:', selectedText);
			}
	});

	function handleCopyEvent(event) {
		const selection = window.getSelection();
		if (selection.rangeCount > 0) {
			const selectedText = selection.toString();
			const modifiedText = encryptText(selectedText);
			event.clipboardData.setData('text/plain', modifiedText);
			event.preventDefault();
			console.log('Copied modified text:', modifiedText);
		}
	}

	document.addEventListener('beforecopy', handleCopyEvent);
	document.addEventListener('copy', handleCopyEvent);

	function encryptText(text) {
		const shift = 3;
		return text.replace(/[a-zA-Z]/g, (char) => {
			const base = char <= 'Z' ? 65 : 97;
			return String.fromCharCode(((char.charCodeAt(0) - base + shift) % 26) + base);
		});
	}

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
	setInterval(changeText, 2500);
});
