function initPassword() {
	document.documentElement.style.display = "none";

	const password = window.prompt("Please enter a password");
	if (password == localStorage.getItem("password")) 
		document.documentElement.style.display = "";
	else 
		window.close();
}

if ((localStorage.getItem("password") !== "" && localStorage.getItem("password") !== null) && window.self == window.top)
	initPassword();