import initNavbar from './navbar.js';

async function cloak(a) {
	if (new URL(a).protocol == "data:") {
		var DOM = new DOMParser().parseFromString(a, "text/html");
		document.title = DOM.title;
		document.querySelector("link[rel='icon']").href = "data:image/png;base64,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";
		return true;
	}
	
	const bareClient = await createBareClient(__uv$config.bare);

	// Favicon
	const favicon = `https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${new URL(a).href}/16&size=16`;
	const fRes = await bareClient.fetch(favicon);
	const blob = await fRes.blob();

	// Title
	const res = await bareClient.fetch(a);
	const text = await res.text();

	document.title = new DOMParser().parseFromString(text, "text/html").title;
	document.querySelector("link[rel='icon']").href = URL.createObjectURL(blob);
}

self.__tabCloak = cloak;

if (localStorage.getItem("cloak")) {
	cloak(localStorage.getItem("cloak"));
} else {
	document.title = "Zypher";
	if (document.querySelector("link[rel='icon']"))
		document.querySelector("link[rel='icon']").href = "data:image/png;base64,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";
}

function initInlineRedirect() {
	var redirects = document.querySelectorAll("*[data-redirect]");
	var frame = document.querySelector(".mainnav");

	for (let i = 0; i < redirects.length; i++) {
		redirects[i].addEventListener("click", (e) => {
			let elm = redirects[i];
			let url = new URL(elm.getAttribute("data-redirect"), location.origin).href;
			if (new URL(url).host != location.host)	{
				window.open(url);
				return;
			}
			if (window !== window.parent) location.href = url;
			else frame.src = url;
			window.document.querySelector(".sidebar").id = "active";
		})
	}
}

if (location.pathname == "/")
	initNavbar();

initInlineRedirect();