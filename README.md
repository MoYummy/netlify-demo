# netlify-demo

1. Configure `NPMRC` (base64-encoded `.npmrc`) as environment variables in Netlify UI
1. Use `.netlify` as entry project for Netlify (in `netlify.toml`)
1. Use Node.js file system operations to prepare `.npmrc`, run `npm install`, run `npm run build` and copy distribution files to `dist` (in `netlify.toml`)