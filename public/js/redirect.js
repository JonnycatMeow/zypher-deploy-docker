function proxyURL(url, frame) {
	window.navigator.serviceWorker.register('/sw.js', {
		scope: __uv$config.prefix
	}).then(() => {
		let uri = location.origin + __uv$config.prefix + __uv$config.encodeUrl(url);
		window.alert(uri);
		if (frame)
			frame.src = uri;
		else
			location.replace(uri);
	});
}

function initInlineRedirect() {
	var redirects = document.querySelectorAll("*[data-redirect]");
	var frame = document.querySelector(".mainnav");

	for (let i = 0; i < redirects.length; i++) {
		redirects[i].addEventListener("click", (e) => {
			let elm = redirects[i];
			let url = new URL(elm.getAttribute("data-redirect"), location.origin).href;
			if (elm.getAttribute("data-open") == "true")
				window.open(url);
			else
				proxyURL(url);
			if (window !== window.parent) location.href = url;
			else frame.src = url;
		})
	}
}

initInlineRedirect();