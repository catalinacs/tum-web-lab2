export default function handler(req, res) {
  const client_id = process.env.GITHUB_CLIENT_ID;
  const redirect_uri = `https://tum-web-lab2-chi.vercel.app/api/callback`;
  const scope = "repo,user";

  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope}`;

  res.redirect(githubAuthUrl);
}
