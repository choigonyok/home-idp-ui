import React from 'react';

function GitHubLogin() {
  const handleLogin = () => {
    const schema = process.env.REACT_APP_BACKEND_SCHEMA;
    const host = process.env.REACT_APP_BACKEND_HOST;
    const port = process.env.REACT_APP_BACKEND_PORT;
    const clientId = "Iv23liqnJabVDGWSPjsU"; // GitHub OAuth 앱에서 받은 Client ID
    const redirectUri = `${schema}://${host}:${port}/login/callback`; // 서버로 리디렉션

    const githubOAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user`;
    window.location.href = githubOAuthUrl;
  };

  return (
    <button onClick={handleLogin}>
      Login with GitHub
    </button>
  );
}

export default GitHubLogin;
