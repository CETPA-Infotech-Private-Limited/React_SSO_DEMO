const oidcConfig = {
  authority: 'https://sso.cetpainfotech.com',
  client_id: 'react-client',
  redirect_uri: `${window.location.origin}/callback`,
  post_logout_redirect_uri: window.location.origin,
  response_type: 'code',
  scope: 'openid profile'
}

export default oidcConfig
