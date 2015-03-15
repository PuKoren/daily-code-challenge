module.exports = {
  'github-domain': 'github.com',
  'github-oauth-path' : '/login/oauth/access_token',
  'github-token-url': 'https://github.com/login/oauth/access_token',
  'github-login-url': 'https://github.com/login/oauth/authorize',
  'github-redirect-uri': 'http://localhost:3000/login/oauth/callback',
  'github-client-id': '7936aa10be1396cf52cc',
  'github-client-secret': '509703019e53aef87b210407b2e8a5849cb6099d',
  'github-scopes': ['user:email', 'user:follow', 'public_repo'],
  redisOptions: {
    pass: 'CtI7lmu3Q2GrGijF',
    host: 'pub-redis-16163.us-east-1-2.3.ec2.garantiadata.com',
    port: '16163'
  }
};