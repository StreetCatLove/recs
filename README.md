Copy this Site

* Create a Github account. Consider what your future URL might be - yourusername.github.io
* Create a new blank repository or fork <a href="https://github.com/StreetCatLove/recs">the original repo</a> to keep connected with updates
* To make the url yourusername.github.io, name the repository yourusername.github.io - ex. streetcatlove.github.io
* To make the url yourusername.github.io/xyz, name the repository xyz - ex. recs for steetcatlove.github.io/recs
* For a blank repo, download <a href="https://github.com/StreetCatLove/recs/archive/refs/heads/main.zip">zip of this repo</a>, unzip the downloaded file, and upload all extracted files into your repo to establish the starting point
* Within your repo's settings go to the Pages tab. Within the Pages tab, change the branch to main, and press save to publish the site.
* You will need to customise a few files to make it your own. Once a change is made to the repo it will take 1-2 minutes for the site to automatically deploy the updates.
* _config.yml - update name, title, description, baseurl, and author profile as desired
* _layouts/default.html - update navbar - photo and nav-item links
* _pages/about.md - add a bio
* assets/images/avatar.jpg - add your avitar
* assets/images/jumbotron.jpg - 3x2 aspect ratio recommended, this will show up at the bottom of the page by the tags
* favicon.ico - 32x32 or 64x64 recommended, you can rename a png to ico
* add or remove posts as desired to feature your favorite creators
* simple posts with <a href="https://www.markdownguide.org/basic-syntax/">markdown syntax</a>
* edit post metadate to control tags, author, featured posts, live platform & username - kick, twitch (username case sensitive) , youtube (with channel ID) currently supported
* easily include any embeded html element in creator posts
* use with a timer in your stream or add to your links page to promote your favorite creators at all times
* the site as-is relies on my api keys via proxy and there is a quota limit for the google api - if the limit gets hit, the youtube integration will not funtion for the rest of the day. set up your own proxy for free with cloudflare workers and a google api key using the included assets/js/YTWorker.js and a update to the youtube endpoint in assets/js/live.js
