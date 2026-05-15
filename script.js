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

	fetch(url, { cache: "no-store" })
		.then(function(response) {
			if (!response.ok) {
				throw new Error("Counter service error");
			}
			return response.json();
		})
		.then(function(data) {
			if (typeof data.value === "number") {
				countElement.textContent = data.value.toLocaleString();
			} else {
				countElement.textContent = "Unavailable";
			}
		})
		.catch(function() {
			countElement.textContent = "Unavailable";
		});
})();

(function enableHoverVideoPreviews() {
	var supportsHover = window.matchMedia && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
	if (!supportsHover) {
		return;
	}

	var videoTiles = document.querySelectorAll(".video-tile video");
	videoTiles.forEach(function(video) {
		var hoverPreviewActive = false;

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
	});
})();
