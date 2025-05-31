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

async function checkLivestreamTwitch(channel, container, id) {
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
                        // Step 1: Get user ID
                        const userRes = await fetch(`https://api.twitch.tv/helix/users?login=${channel}`, {
                        headers: { 'Client-ID': id }
                        });
                        const userData = await userRes.json();
                        const userId = userData.data?.[0]?.id;
                        
                        // Step 2: Check stream status
                        const streamRes = await fetch(`https://api.twitch.tv/helix/streams?user_id=${userId}`, {
                        headers: { 'Client-ID': id }
                        });
                        const streamData = await streamRes.json();
		
			if (streamData.data?.length > 0) showContainer(container);
                        
                        // Update cache
                        localStorage.setItem(cacheKey, JSON.stringify({
	                        isLive,
	                        timestamp: now
                        }));
            } catch (error) {
                        console.error("Twitch API error:", error);
            }
}
        
function showContainer(container) {
            // Multiple ways to ensure element shows
            container.style.display = 'block';
            container.style.removeProperty('display');
            container.classList.remove('d-none'); // If using Bootstrap
            console.log("Container should now be visible", container);
}
