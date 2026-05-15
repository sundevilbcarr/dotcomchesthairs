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
