function proxyURL(url, frame) {
	window.navigator.serviceWorker.register('/sw.js', {
		scope: __uv$config.prefix
	}).then(() => {
		let uri = location.origin + __uv$config.prefix + __uv$config.encodeUrl(url);
		if (frame)
			frame.src = uri;
		else
			location.replace(uri);
	});
}

function isMobile() {
	return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || typeof window["ontouchstart"] == "object");
}

function loadProxyBar() {
	const search = document.querySelector(".button.input input");
	search.addEventListener("keyup", (e)=>{
		if (e.key == "Enter") {
			var url = search.value;
			if (/^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/.test(url)) {
				if (!/http[s]?:\/\//g.test(url))
					url = "https://" + url;
			} else
				url = "https://www.google.com/search?q=" + encodeURIComponent(url);
			try {
				top.window.document.querySelector(".sidebar").id = "active";
			} catch {}
			
			proxyURL(url);

			search.blur();
		}
	})
}

if (location.pathname == "/proxy.html")
	loadProxyBar();	