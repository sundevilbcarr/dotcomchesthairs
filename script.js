// Visitor counter for static hosting (GitHub Pages).
// Uses a free hosted counter API and updates on each page load.
(function updateVisitorCounter() {
	var countElement = document.getElementById("visitor-count");
	if (!countElement) {
		return;
	}

	var namespace = "sundevilbcarr";
	var key = "dotcomchesthairs-com";
	var url = "https://api.countapi.xyz/hit/" + namespace + "/" + key;

	fetch(url, { cache: "no-store", mode: "cors" })
		.then(function(response) {
			if (!response.ok) {
				console.error("Counter API response error:", response.status);
				throw new Error("Counter service error: " + response.status);
			}
			return response.json();
		})
		.then(function(data) {
			if (typeof data.value === "number") {
				countElement.textContent = data.value.toLocaleString();
				console.log("Counter updated:", data.value);
			} else {
				console.error("Invalid counter data:", data);
				countElement.textContent = "Unavailable";
			}
		})
		.catch(function(error) {
			console.error("Counter fetch error:", error);
			countElement.textContent = "Unavailable";
		});
})();

(function enableVideoFeatures() {
	var videoTiles = document.querySelectorAll(".video-tile video");
	var supportsHover = window.matchMedia && window.matchMedia("(hover: hover) and (pointer: fine)").matches;

	videoTiles.forEach(function(video) {
		var hoverPreviewActive = false;

		// Desktop: hover preview
		if (supportsHover) {
			video.addEventListener("mouseenter", function() {
				if (video.paused) {
					hoverPreviewActive = true;
					video.play().catch(function() {
						hoverPreviewActive = false;
					});
				}
			});

			video.addEventListener("mouseleave", function() {
				if (hoverPreviewActive) {
					video.pause();
					video.currentTime = 0;
					hoverPreviewActive = false;
				}
			});

			video.addEventListener("play", function() {
				hoverPreviewActive = false;
			});
		} else {
			// Mobile: enable autoplay since hover won't work
			video.autoplay = true;
		}
	});
})();
