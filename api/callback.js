export default async function handler(req, res) {
  const { code } = req.query;
  const client_id = process.env.GITHUB_CLIENT_ID;
  const client_secret = process.env.GITHUB_CLIENT_SECRET;

  try {
    const response = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ client_id, client_secret, code }),
    });

    const data = await response.json();
    const token = data.access_token;

    const script = `
    <script>
      (function() {
        function receiveMessage(e) {
          console.log("receiveMessage %o", e);
        }
        window.addEventListener("message", receiveMessage, false);
        window.opener.postMessage(
          'authorization:github:success:${JSON.stringify({ token, provider: "github" })}',
          "*"
        );
      })()
    </script>`;

    res.setHeader("Content-Type", "text/html");
    res.send(`<!DOCTYPE html><html><body>${script}</body></html>`);
  } catch (err) {
    res.status(500).send("OAuth error: " + err.message);
  }
}
