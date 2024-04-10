Previous: https://github.com/adamzerner/rfui-react

## Notes

### `deno.json`

#### 1

The values for `jsx` and `jsxImportSource` fixes [this error](https://github.com/denoland/deno/issues/9425). I stumbled on the solution [here](https://docs.deno.com/runtime/manual/advanced/jsx_dom/jsx#using-jsx-import-source-in-a-configuration-file).

I'm not totally sure why it works. Hopefully in the future the Deno team will include better error messages and documentation for this issue.

#### 2

The values for `target` and `lib` are set based on the advice [here](https://docs.deno.com/runtime/manual/advanced/typescript/configuration#targeting-deno-and-the-browser).
