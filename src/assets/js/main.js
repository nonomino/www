function setTheme(theme, baseurl, themeStyleLink, themeIcon) {
	if (theme === 'dark') {
		themeStyleLink.setAttribute('href', `${baseurl}/assets/css/skins/dark.css`);
		themeIcon.innerHTML = '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>';
		document.body.setAttribute('data-theme', 'dark');
	} else {
		themeStyleLink.setAttribute('href', `${baseurl}/assets/css/skins/light.css`);
		themeIcon.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>';
		document.body.setAttribute('data-theme', 'light');
	}
	localStorage.setItem('theme', theme);
}

function encryptText(text) {
	const shift = 3;
	return text.replace(/[a-zA-Z]/g, (char) => {
		const base = char <= 'Z' ? 65: 97;
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

function toggleMobileMenu(event, dropdown) {
	event.preventDefault();
	event.stopPropagation();
	dropdown.classList.toggle('show');
}

function toggleSearch(event, searchInput) {
	event.preventDefault();
	event.stopPropagation();
	searchInput.classList.toggle('show');
	if (searchInput.classList.contains('show')) {
		searchInput.querySelector('input').focus();
	}
}

function handleSearch(searchField) {
	const query = searchField.value.trim();
	if (query && event.key === 'Enter') {
		window.location.href = `/search?q=${encodeURIComponent(query)}`;
	}
}

function handleNavbarScroll(navbar, currentPageElement, hasCurrentPage) {
	let lastScrollY = window.scrollY;
	const updateNavbar = () => {
		const scrollY = window.scrollY;
		const scrollThreshold = 100;
		if (scrollY > scrollThreshold) {
			navbar.classList.add('scrolled');
		} else {
			navbar.classList.remove('scrolled');
		}
		lastScrollY = scrollY;
	};
	let ticking = false;
	window.addEventListener('scroll', () => {
		if (!ticking) {
			requestAnimationFrame(() => {
				updateNavbar();
				ticking = false;
			});
			ticking = true;
		}
	});
	updateNavbar();
}

function getCurrentPageName() {
	const path = window.location.pathname;
	const cleanPath = path.replace(/^\/+|\/+$/g,
		'');
	if (!cleanPath) return null;
	const pageNames = {
		'me': 'about me',
		'portfolio': 'portfolio',
		'blog': 'blog posts',
		'now': 'now',
		'uses': 'uses'
	};
	if (cleanPath.includes('blog/') && cleanPath !== 'blog') {
		return 'blog post';
	}
	return pageNames[cleanPath] || cleanPath;
}

document.addEventListener("DOMContentLoaded", function() {
	document.body.style.opacity = '1';
	const themeToggleBtn = document.getElementById('theme-toggle');
	const themeStyleLink = document.getElementById('theme-style');
	const themeIcon = document.getElementById('theme-icon');
	const themeSound = document.getElementById('theme-sound');
	const baseurl = themeToggleBtn ? themeToggleBtn.getAttribute('data-baseurl'): '';
	const menuToggleButton = document.getElementById("menu-toggle");
	const menu = document.getElementById("primary-nav");
	const paragraph = document.getElementById('greeting');
	const greetings = ['Hello, world!', 'Χάρηκα', '¿Cómo estás?'];
	const savedTheme = localStorage.getItem('theme') || 'light';
	const updateGreeting = changeText(paragraph, greetings);

	const navbar = document.getElementById('navbar');
	const currentPageElement = document.getElementById('currentPage');
	const mobileMenuToggle = document.getElementById('mobileMenuToggle');
	const mobileDropdown = document.getElementById('mobileDropdown');

	// --- Modal search elements ---
	const searchToggle = document.getElementById('searchToggle');
	const searchModalBg = document.getElementById('searchModalBg');
	const searchInputModal = document.getElementById('searchInputModal');
	const searchField = document.getElementById('searchField');
	const searchClose = document.getElementById('searchClose');
	const searchResults = document.getElementById('searchResults');
	// ----------------------------

	if (navbar && currentPageElement) {
		const pageName = getCurrentPageName();
		if (pageName) {
			currentPageElement.textContent = pageName;
			handleNavbarScroll(navbar, currentPageElement, true);
		} else {
			currentPageElement.style.display = 'none';
			handleNavbarScroll(navbar, currentPageElement, false);
		}
	}

	if (menuToggleButton) {
		menuToggleButton.addEventListener("click", function(event) {
			toggleMenu(event, menu);
		});
	}

	if (themeToggleBtn && themeStyleLink && themeIcon) {
		themeToggleBtn.addEventListener('click', function() {
			const currentTheme = localStorage.getItem('theme') || 'light';
			const newTheme = currentTheme === 'light' ? 'dark': 'light';
			setTheme(newTheme, baseurl, themeStyleLink, themeIcon);
			if (themeSound) {
				themeSound.play().catch(error => {
					console.error('Failed to play theme sound:', error);
				});
			}
		});
	}

	if (mobileMenuToggle && mobileDropdown) {
		mobileMenuToggle.addEventListener('click', function(event) {
			toggleMobileMenu(event, mobileDropdown);
		});
	}

	// --- Modal Search Logic ---
	function openSearchModal() {
		if (searchModalBg) searchModalBg.classList.add('active');
		if (searchInputModal) searchInputModal.classList.add('show');
		document.body.style.overflow = 'hidden';
		if (searchField) searchField.focus();
	}
	function closeSearchModal() {
		if (searchModalBg) searchModalBg.classList.remove('active');
		if (searchInputModal) searchInputModal.classList.remove('show');
		document.body.style.overflow = '';
		if (searchField) searchField.value = '';
		if (searchResults) searchResults.innerHTML = '';
	}
	if (searchToggle) {
		searchToggle.addEventListener('click', openSearchModal);
	}
	if (searchClose) {
		searchClose.addEventListener('click', closeSearchModal);
	}
	if (searchModalBg) {
		searchModalBg.addEventListener('click', closeSearchModal);
	}
	document.addEventListener('keydown', function(e) {
		if (searchInputModal && searchInputModal.classList.contains('show') && e.key === 'Escape') {
			closeSearchModal();
		}
	});
	// Clicking outside modal closes it
	document.addEventListener('click',
		function(e) {
			if (
				searchInputModal && searchInputModal.classList.contains('show') &&
				!searchInputModal.contains(e.target) &&
				!(e.target === searchToggle || searchToggle.contains(e.target))
			) {
				closeSearchModal();
			}
			// mobile dropdown logic
			if (mobileDropdown && mobileMenuToggle &&
				!mobileMenuToggle.contains(e.target) && !mobileDropdown.contains(e.target)) {
				mobileDropdown.classList.remove('show');
			}
		});

	// Search results placeholder
	if (searchField && searchResults) {
		searchField.addEventListener('input', function() {
			const query = searchField.value.trim();
			if (query.length > 0) {
				searchResults.innerHTML = '<em>Searching for: ' + query + '</em>';
			} else {
				searchResults.innerHTML = '';
			}
		});
		// Optional: handle 'Enter' for search page
		searchField.addEventListener('keypress',
			function(event) {
				if (event.key === 'Enter') {
					window.location.href = `/search?q=${encodeURIComponent(searchField.value.trim())}`;
				}
			});
	}
	// -------------------------------

	document.addEventListener('selectionchange',
		() => {
			const selection = window.getSelection();
			if (selection.rangeCount > 0) {
				const selectedText = selection.toString();
			}
		});

	document.addEventListener('beforecopy',
		handleCopyEvent);
	document.addEventListener('copy',
		handleCopyEvent);

	if (themeStyleLink && themeIcon) {
		setTheme(savedTheme, baseurl, themeStyleLink, themeIcon);
	}

	if (paragraph) {
		updateGreeting();
		setInterval(updateGreeting, 2500);
	}
});