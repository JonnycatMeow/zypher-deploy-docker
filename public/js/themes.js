function initTheme(theme) {
	var elements = document.querySelectorAll("*");
	for (let i = 0; i < elements.length; i++) {
		elements[i].setAttribute("data-theme", theme);
	}
}

initTheme("test")