async function isKickStreamLive(channelName) {
    try {
        // First, get the channel ID from the username
        const userResponse = await fetch(`https://kick.com/api/v2/channels/${channelName}`);
        if (!userResponse.ok) {
            throw new Error('Channel not found');
        }
        
        const userData = await userResponse.json();
        const channelId = userData.id;
        
        // Then check the livestream status
        const streamResponse = await fetch(`https://kick.com/api/v2/channels/${channelId}/livestream`);
        if (!streamResponse.ok) {
            return false;
        }
        
        const streamData = await streamResponse.json();
        return streamData.is_live;
    } catch (error) {
        console.error('Error checking stream status:', error);
        return false;
    }
}
