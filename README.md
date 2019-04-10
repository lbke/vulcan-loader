# Vulcan-loader

A Webpack loader for Vulcan.js packages.

**/!\ This package is still experimental, use with caution. **

This package will replace `meteor/vulcan-*` imports by path to your local Vulcan installation. This allows use Vulcan with Jest or Storybook by replacing Meteor build system with Webpack.

## Constraints
- For this to work, you need to setup a [2-repo install](https://docs.vulcanjs.org/#Two-Repo-Install-Optional).
- In a client environment, the loader will look for the following file: `your-vulcan-package/lib/client/main.js`. Vulcan packages that do not respect this path structure can't be imported


## Loader options

- `exclude`: Vulcan packages ignored by the loader. Use to mock some packages.
- `vulcanPackagesDir`: absolute path to your `Vulcan/packages` folder
- `environment`: `client` or `server`.