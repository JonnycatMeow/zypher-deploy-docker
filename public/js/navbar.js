function isMobile() {
	return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || typeof window["ontouchstart"] == "object");
}

function initNavbar() {
	const sidebar = document.querySelector(".sidebar");

	if (isMobile()) {
		sidebar.id = "1";
	} else {
		sidebar.addEventListener("mouseleave", (e) => {
			if (sidebar.id == "") sidebar.id = "active";
		})
		sidebar.addEventListener("mouseenter", (e) => {
			sidebar.id = "";
		})
	}
}

export default initNavbar;