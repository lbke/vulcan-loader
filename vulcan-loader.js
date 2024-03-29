/**
 * POC: this loader will treat Vulcan packages
 * as usual npm packages
 *
 * Transforms:
 * meteor/vulcan:foobar -> /home/yourVulcanInstall/packages/vulcan-foobar/lib/client/main (.js or .ts)
 * meteor/vulcan:foobar/smth.js -> <same>/smth.js
 */
module.exports = function loader(source) {
  const options = this.getOptions();
  const { vulcanPackagesDir, exclude = [], environment = "client" } = options;

  const prefix = `${vulcanPackagesDir}/vulcan-`;
  const defaultPath = `/lib/${environment}/main`;

  let excludeRegex;
  if (exclude.length) {
    excludeRegex = new RegExp(exclude.join("|"));
  }
  const result = source.replace(
    // .+?(?=something) matches every char until "something" is met, excluding something
    // we use it to matche the package name, until we meet a ' or "
    /meteor\/vulcan:(.*?(?=\/|'|"))(.*?(?=\'|\"))/g, // match Meteor packages that are vulcan packages, + the import path (without the quotes)
    (match, packageName, importPath) => {
      console.log("Found Vulcan package", packageName);
      // ignore excluded packages
      if (excludeRegex && !!match.match(excludeRegex)) {
        return match;
      }
      //        console.log("match", match, "packageName", packageName, "path", importPath)
      if (importPath) {
        return `${prefix}${packageName}${importPath}`;
      }
      return `${prefix}${packageName}${defaultPath}`;
    }
  );
  return result;
};
