async function checkLivestreamKick(channel, container) {
            const CACHE_TTL = 2 * 60 * 1000; // 5 minutes cache
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
            const CACHE_TTL = 2 * 60 * 1000; // 5 minutes cache
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

		    	
		 // API call
                const response = await fetch(`https://twitch-proxy.freecodecamp.rocks/helix/streams?user_login=${channel}`);
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                
                const call = await response.json();
                console.log( call, call.data[0] !== undefined );
                const isLive = call.data[0] !== undefined;
                
                // Update cache
                localStorage.setItem(cacheKey, JSON.stringify({
                    isLive,
                    timestamp: now
                }));

		console.log( isLive );
                if (isLive) showContainer(container);
                
            } catch (error) {
                console.error("Error checking stream status:", error);
            }
}
        
function showContainer(container) {
            // Multiple ways to ensure element shows
            container.style.display = 'block';
            container.style.removeProperty('display');
            container.classList.remove('d-none'); // If using Bootstrap
            console.log("Container should now be visible", container);
}
