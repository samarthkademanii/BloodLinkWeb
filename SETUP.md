# Deploying the BloodLink website

This is a single static page (`index.html`, no build step) that talks to the
same [BloodLinkBackend](https://github.com/samarthkademanii/BloodLinkBackend)
API the mobile app uses.

## Deploy on Render (free, same account as the backend)

1. In the Render dashboard, click **New → Blueprint**
2. Select the `BloodLinkWeb` repo
3. Render reads `render.yaml` automatically — it's a static site, no build
   command needed. Click **Apply**.
4. You'll get a public URL in a minute or two, e.g.
   `https://bloodlink-web.onrender.com`

That's it — static sites don't sleep like the backend's free web service does,
so there's no cold-start delay for the page itself (only the first API call
to the backend might be slow if it's been idle).

## If you move the backend

The backend's URL is hardcoded near the top of `index.html`:

```js
const API_BASE = 'https://bloodlink-backend-7ln9.onrender.com/api'
```

Update that line if the backend ever gets redeployed to a different URL.
