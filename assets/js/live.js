async function checkLivestreamKick(channel, container) {
            const CACHE_TTL = 5 * 60 * 1000; // 5 minutes cache
            try {
                // Check cache
                const cacheKey = `kick_${channel}`;
                const cached = localStorage.getItem(cacheKey);
                const now = Date.now();
                
                if (cached) {
                    const { isLive, timestamp } = JSON.parse(cached);
                    if (now - timestamp < CACHE_TTL) {
                        if (isLive) showContainer(container);
                        return;
                    }
                }
                
                // API call
                const response = await fetch(`https://kick.com/api/v2/channels/${channel}/livestream`);
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                
                const call = await response.json();
                console.log( call );
                const isLive = call.data !== null;
                
                // Update cache
                localStorage.setItem(cacheKey, JSON.stringify({
                    isLive,
                    timestamp: now
                }));
                
                if (isLive) showContainer(container);
                
            } catch (error) {
                console.error("Error checking stream status:", error);
            }
}

async function checkLivestreamTwitch(channel, container) {
            const CACHE_TTL = 5 * 60 * 1000; // 5 minutes cache
            try {
                        // Check cache
                        const cacheKey = `twitch_${channel}`;
                        const cached = localStorage.getItem(cacheKey);
                        const now = Date.now();
                        
                        if (cached) {
                                    const { isLive, timestamp } = JSON.parse(cached);
                                    if (now - timestamp < CACHE_TTL) {
	                                    if (isLive) showContainer(container);
	                                    return;
                        	}
                        }
		    	//embed approach
			const iframe = document.createElement('iframe');
			iframe.src = `https://player.twitch.tv/?channel=${channel}&parent=${location.hostname}`;
			iframe.style.display = 'none';
			
			// Event handlers
			iframe.onload = function() {
			const player = new Twitch.Player(iframe);
			
			player.addEventListener(Twitch.Player.READY, function() {
			  const isLive = !player.getEnded(); // True if stream is live
			  console.log(channel, isLive);
			  // Update cache
			  localStorage.setItem(cacheKey, JSON.stringify({
			    isLive,
			    timestamp: Date.now()
			  }));
			
			  if (isLive) showContainer();
			  
			  // Cleanup
			  setTimeout(function() {
			    document.body.removeChild(iframe);
			  }, 1000);
			});
			};
			
			iframe.onerror = function() {
				console.log('Twitch embed failed for channel:', channel);
				document.body.removeChild(iframe);
			};
			
			document.body.appendChild(iframe);
			}
            } catch (error) {
                        console.error("Twitch error:", error);
            }
}
        
function showContainer(container) {
            // Multiple ways to ensure element shows
            container.style.display = 'block';
            container.style.removeProperty('display');
            container.classList.remove('d-none'); // If using Bootstrap
            console.log("Container should now be visible", container);
}
