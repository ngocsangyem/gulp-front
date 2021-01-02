const dependencyTemplate = `// Dependency of [capitalize-name]Component\n\nmodule.exports = {\n\n\tnodes: [],\n\n\tmodules: [],\n\n}\n`;

const jsonTemplate = '{}';

const sassTemplate = '\n.[name]';
const scssTemplate = '\n.[name] {}';

const componentTemplate = `mixin [name](data)\n\t- data = data || {}\n\t- data.class = data.class || ''\n\t- data.content = data.content || 'Some content here'\n\n\t.[name](class=data.class)&attributes(attributes)\n\t\tif block\n\t\t\tblock\n\t\telse\n\t\t\t!= data.content`;

const testTemplate = `import { [capitalize-name]Component } from '../[name].component';\n\ndescribe('[capitalize-name]Component View', function() {\n\n\tbeforeEach(() => {\n\t\tthis.[capitalize-name] = new [capitalize-name]Component();\n\t});\n\n\tit('Should run a few assertions', () => {\n\t\texpect(this.[capitalize-name]).to.exist;\n\t});\n\n});`;

const jsTemplateClass = `export class [capitalize-name]Component {\n\tconstructor() {\n\t\tconsole.log('[name] component');\n\t}\n\tstatic init() {\n\n\t}\n}`;

const jsPageTemplateClass = `export class [capitalize-name]PageComponent {\n\tconstructor() {\n\t\tconsole.log('[name] page component');\n\t}\n\tstatic init() {\n\t\tconst [capitalize-name] = new [capitalize-name]PageComponent();\n\t\treturn [capitalize-name];\n\t}\n}\n(function() {\n\t[capitalize-name]PageComponent.init()\n})();`;
const pageTemplate = `\n\nblock var\n\t- title = '[upper-first-name]'\n\t- bodyClass = '[name]'\n\nblock main`;
const sassPageTemplate = '\n.[name]';
const scssPageTemplate = '\n.[name] {}';

module.exports = {
	dependencyTemplate,
	jsonTemplate,
	sassTemplate,
	scssTemplate,
	componentTemplate,
	testTemplate,
	jsTemplateClass,
	jsPageTemplateClass,
	pageTemplate,
	sassPageTemplate,
	scssPageTemplate,
};
