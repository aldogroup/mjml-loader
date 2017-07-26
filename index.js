const mjml = require('mjml');
const colors = require('colors');

module.exports = function mjmlLoader(content) {
  this.cacheable();

  const result = mjml.mjml2html(content);

  if (result.errors.length) {
    console.log(colors.red(`[mjml-loader] ERROR in ${this.resourcePath}:`));
    result.errors.forEach(error => {
      console.log(`- ${error.formattedMessage}`);
    });
    console.log('');

    throw new Error(result.error);
  }

  const value = `${JSON.stringify(result.html)};`;
  const module = this.version && this.version >= 2 ? `export default ${value};` : `module.exports = ${value};`;
  return module
};
