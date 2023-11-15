function iframeURLChange(iframe, callback) {
	var lastDispatched = null;

	var dispatchChange = function() {
		var newHref = iframe.contentWindow.location.href;

		if (newHref !== lastDispatched) {
			callback(newHref);
			lastDispatched = newHref;
		}
	};

	var unloadHandler = function() {
		setTimeout(dispatchChange, 0);
	};

	function attachUnload() {
		iframe.contentWindow.removeEventListener("unload", unloadHandler);
		iframe.contentWindow.addEventListener("unload", unloadHandler);
	}

	iframe.addEventListener("load", function() {
		attachUnload();
		dispatchChange();
	});

	attachUnload();
}

function newIframe() {
	var newFrame = document.createElement("iframe");
	newFrame.setAttribute("frameborder", "");
	newFrame.setAttribute("tab", window.tabs.length-1);
	document.querySelector(".frames").appendChild(newFrame);
}

function frameURL(url, tabIndex) {
	if (new URL(url, location.origin).origin == location.origin)
		document.querySelector(".frames iframe[tab=\"" + tabIndex + "\"]").src = url;
	else
		proxyURL(url, document.querySelector(".frames iframe[tab=" + tabIndex + "]"));
}

function search() {
	document.querySelector(".search input").addEventListener("keyup", (e) => {
		if (e.key == "Enter") {
			let url = e.target.value;
			if (/^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/.test(url))
				if (!/http[s]?:\/\//g.test(url))
					url = "https://" + url;
			if (new URL(url, location.origin).host == location.host)
				url = "https://www.google.com/search?q=" + encodeURIComponent(url);
			frameURL(url);
			e.target.value();
		}
	})
}

function tabs() {
	window.tabs = [
		{
			name: "Start Page",
			url: "/internal/start.html"
		}
	]

	newIframe();

	function getArrayIndexFromProp(ar, key, prop) {
		let val = -1;
		for (let i = 0; i < ar.length; i++)
			if (ar[i])
				if (ar[i][key] == prop)
					val = i;
		return val;
	}

	function newTab(meta) {
		var elm = document.createElement("div");
		if (document.querySelector(".tab#active"))
			document.querySelector(".tab#active").id = "";

		elm.className = "tab";
		elm.id = "active";

		frameURL(meta.url, window.tabs.length-1);

		elm.innerHTML = `
			<p class="title">${meta.name}</p>

			<img class="close" src="images/close.png" />`

		elm.querySelector(".close").addEventListener("click", (e) => {
			e.target.parentNode.id = "remove";
			document.querySelector(".navbar .tabs").prepend(elm);
			setTimeout(() => { e.target.parentNode.remove() }, 550);
			let index = getArrayIndexFromProp(window.tabs, "name", elm.querySelector("p").innerText)
			delete window.tabs[index];
			frameURL((window.tabs[index - 1] || window.tabs[index + 1]).url)
		})

		elm.addEventListener("click", (e) => {
			if (e.target.className == "close") return;
			let t = e.target;
			if (t.parentNode.className == "tab") t = t.parentNode;
			if (document.querySelector(".tab#active"))
				document.querySelector(".tab#active").id = "";
			t.id = "active";
			let index = getArrayIndexFromProp(window.tabs, "name", t.querySelector("p").innerText)
			frameURL(window.tabs[index].url);
		})

		document.querySelector(".navbar .tabs").prepend(elm);
	}

	for (let i = 0; i < window.tabs.length; i++) {
		newTab(window.tabs[i]);
	}

	document.querySelector(".navbar .tabs .add").addEventListener("click", (e) => {
		e.target.blur();
		let meta = {
			name: "New Tab",
			url: "/internal/start.html"
		}
		window.tabs.push(meta);
		newTab(meta);
	})
}

tabs();
search();

iframeURLChange(document.querySelector(".frames iframe"), function(url) {
	let landing = __uv$config.decodeUrl(url.replace(location.origin + __uv$config.prefix, ""));
	if (new URL(landing).host == "www.google.com" && new URL(landing).pathname.startsWith("/search")) landing = decodeURIComponent(new URL(landing).searchParams.get("q"));
	else landing = new URL(landing).origin + new URL(landing).pathname;
	document.querySelector(".navbar .search input").value = landing;
});