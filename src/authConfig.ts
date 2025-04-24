const oidcConfig = {
  // The URL of your OIDC Identity Provider (IdP). Must support discovery (/.well-known/openid-configuration).
  authority: 'https://ssoopenid.dfccil.com',

  // The client ID registered with the IdP for this React app.
  client_id: 'react-client',
  // Where the IdP should redirect the user after a successful login.
  // `${window.location.origin}` ensures it adapts to any environment (e.g., localhost, production).
  redirect_uri: `${window.location.origin}/callback`,

  // A hidden page that enables silent token renewal using an iframe, without interrupting the user.
  // This helps maintain sessions seamlessly when tokens expire.
  silent_redirect_uri: `${window.location.origin}/silent-renew.html`,

  // Where the IdP should redirect the user after a logout.
  // Used in single logout flows and should be whitelisted in the IdP.
  post_logout_redirect_uri: window.location.origin,

  // Use the "authorization code" flow — the most secure for public clients, especially with PKCE.
  response_type: 'code',

  // The scopes requested. 'openid' is required; 'profile' gives access to basic user info like name and email.
  scope: 'openid profile',

  // Automatically attempt to renew the token in the background before it expires.
  // Requires `silent_redirect_uri` to work properly.
  automaticSilentRenew: true,

  // Enables monitoring of the user session via the IdP's session iframe.
  // Detects logout or session expiry from other tabs/apps.
  monitorSession: true,

  // How often (in ms) to check the session status using the session iframe.
  // Helps with near real-time detection of logout from other apps.
  checkSessionInterval: 2000
}

export default oidcConfig
