importScripts('./uv/uv.sw.js');
importScripts('./api/filter.js'); //adblock filter
importScripts('./api/soundcloudadblock.js'); //soundcloud adblocker

const UV = new UVServiceWorker();

self.addEventListener('fetch', (event) => {
	if (event.request.url.startsWith(location.origin + __uv$config.prefix)) {
		const req = __uv$config.decodeUrl(event.request.url.split(__uv$config.prefix)[1]);
		if (self.__filter.includes(new URL(req).host))
			event.respondWith(new Response("", {
				status: 404,
				statusText: "Not Found"
			}))
		else 
			event.respondWith(UV.fetch(event));	
	}
});