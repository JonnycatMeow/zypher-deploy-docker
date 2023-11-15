function isMobile() {
	return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || typeof window["ontouchstart"] == "object");
}

function loadApps() {
	var master = document.querySelector(".buttons");
	for (let i = 0; i < Object.keys(window.__apps).length; i++) {
		var elm = document.createElement("div");
		var app = window.__apps[i];
		elm.className = "button game";
		elm.setAttribute("data-index", i);
		elm.innerHTML = `<p>${app.name}</p><img src="/images/web.png">`;
		elm.addEventListener("mouseup", (e) => {
			let index = e.target.getAttribute("data-index");
			if (index == null) index = e.target.parentNode.getAttribute("data-index");
			proxyURL(window.__apps[index].url);

			if (!isMobile())
				top.window.document.querySelector(".sidebar").id = "active";
		})
		master.appendChild(elm);
	}
}

loadApps();