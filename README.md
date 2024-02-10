This repo is for the NPM package for [RFUI](https://rfui.deno.dev/). There is currently a [Deno Third Party Module](https://deno.land/x) for the Preact version of RFUI. This NPM package is for the React version of RFUI.

I referenced https://blog.logrocket.com/the-complete-guide-to-publishing-a-react-package-to-npm/ in order to publish this module. Steps:

- Make sure `utilities/get-stylesheet-url.ts` is up to date.
- Update `version` in `package.json`.
- Commit and push.
- `npm run build`.
- `npm publish`.
- Verify in `rfui-react-test`.
