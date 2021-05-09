<h1 align="center">Welcome to gulp-front 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.1-blue.svg?cacheSeconds=2592000" />
  <a href="https://github.com/ngocsangyem/gulp-front#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/ngocsangyem/gulp-front/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/ngocsangyem/gulp-front/blob/master/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/github/license/ngocsangyem/gulp-front" />
  </a>
  <a href="https://twitter.com/ngocsangyem" target="_blank">
    <img alt="Twitter: ngocsangyem" src="https://img.shields.io/twitter/follow/ngocsangyem.svg?style=social" />
  </a>
</p>

> Front-end components

### 🏠 [Homepage](https://github.com/ngocsangyem/gulp-front#readme)

-   [Install](#install)
-   [Usage](#usage)
-   [Overview](#overview)
-   [Features](#features)
-   [Browser Support](#browser)
-   [Prerequisites](#prerequisites)
-   [Commands](#commands)
-   [Error install](#error-install)

# Install

```sh
npm install
```

# Usage

```sh
npm start
```

# Overview

gulp-front is an opinionated generator for web development. Tools for building a great experience across many devices. A solid starting point for both professionals and newcomers to the industry.

# Features

|                                                   | Available |
| ------------------------------------------------- | :-------: |
| [Browsersync](http://www.browsersync.io/)         |    ✅     |
| [Pug](https://pugjs.org/api/getting-started.html) |    ✅     |
| [Twig](https://twig.symfony.com/)                 |    ✅     |
| [Sass](https://sass-lang.com/)                    |    ✅     |
| [Less](http://lesscss.org/)                       |    ✅     |
| [GulpV4](https://gulpjs.com/)                     |    ✅     |
| [Webpack](https://webpack.js.org/)                |    ✅     |
| [Typescript](https://www.typescriptlang.org/)     |    ✅     |
| JavaScript ES6+ Support                           |    ✅     |
| State Management                                  |    ✅     |
| PostCSS support                                   |    ✅     |
| Live Browser Reloading                            |    ✅     |
| Code spliting                                     |    ✅     |
| Optimize Images                                   |    ✅     |
| Minify Css and Javascript                         |    ✅     |
| SEO                                               |    ✅     |
| Unit test                                         |    ❌     |

# Browser

At present, I officially aim to support the last two versions of the following browsers:

-   Chrome
-   Edge
-   Firefox
-   Safari
-   Internet Explorer

This is not to say that gulp-front cannot be used in browsers older than those reflected, but merely that my focus will be on ensuring our layouts work great in the above.

# Prerequisites

> NOTE: For OSX users You may have some issues compiling code during installation of packages. Please install Xcode from App Store first. After Xcode is installed, open Xcode and go to Preferences -> Download -> Command Line Tools -> Install to install command line tools.

> NOTE: For Windows users You may have some issues compiling BrowserSync during installation of packages. Please go to http://www.browsersync.io/docs/#windows-users for more information on how to get all the needed dependencies.

### [Node.js](https://nodejs.org)

Bring up a terminal and type `node --version`.
Node should respond with a version at or above 12.x.x.
If you need to install Node, go to [nodejs.org](https://nodejs.org) and click on the big green Install button.

### [Gulp](http://gulpjs.com)

Bring up a terminal and type `gulp --version`.
If Gulp is installed it should return a version number at or above 4.x.x.
If you need to install/upgrade Gulp, open up a terminal and type in the following:

```sh
$ npm install --global gulp
```

```sh
$ npm install --global gulp-cli
```

You can use gulp-cli without install globally by flowing:

```sh
$ npx gulp [your_gulp_task]
```

_This will install Gulp globally. Depending on your user account, you may need to [configure your system](https://github.com/sindresorhus/guides/blob/master/npm-global-without-sudo.md) to install packages globally without administrative privileges._

### Local dependencies

Next, install the local dependencies requires:

```sh
$ npm install
```

That's it! You should now have everything needed to use the gulp-component.  
You may also want to get used to some of the [commands](#commands) available.

# Commands

There are few commands available to help you build and test sites:

### Development mode

Watch For Changes & Automatically Refresh Across Devices

```sh
$ npm start
```

`npm start` task creates the `tmp` folder in the root of the project.
This includes linting as well as image, script, stylesheet and HTML optimization.
Also, a [browsersync](https://browsersync.io/) script will be automatically generated, which will take care of precaching your sites resources.

### Build (production) mode

Serve the Fully Built & Optimized Site

```sh
$ npm run build
```

`npm run build` task creates the `build` folder in the root of the project with **minifying** files. It will help you to create clear instances of code for the **production** or **further implementation**.

### Create component

```sh
$ npm run add [component_name][files]
```

```sh
$ npm run add header[.js,.pug,.scss]
```

### Create page

```sh
$ npm run add page [page_name][files]
```

```sh
$ npm run add index[.js,.pug,.scss]
```
# Error install

> *Error: ENOENT: no such file or directory, scandir*

```sh
$ npm update
$ npm install
$ node node_modules/node-sass/scripts/install.js
$ npm rebuild node-sass
```
> Can not install **node-gym** (Window error)

Open powershell as admin then install [windows-build-tools](https://www.npmjs.com/package/windows-build-tools)

```sh
$ npm install --global --production windows-build-tools
$ npm install --global node-gyp
```

# Author

👤 **ngocsangyem**

* Website: https://ngocsangyem.io/
* Twitter: [@ngocsangyem](https://twitter.com/ngocsangyem)
* Github: [@ngocsangyem](https://github.com/ngocsangyem)
* LinkedIn: [@ngocsangyem](https://linkedin.com/in/ngocsangyem)

# 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/ngocsangyem/gulp-front/issues). You can also take a look at the [contributing guide](https://github.com/ngocsangyem/gulp-front/blob/master/CONTRIBUTING.md).

# Show your support

Give a ⭐️ if this project helped you!

<a href="https://www.patreon.com/ngocsangyem">
  <img src="https://c5.patreon.com/external/logo/become_a_patron_button@2x.png" width="160">
</a>

# Todo
- Document

# 📝 License

Copyright © 2020 [ngocsangyem](https://github.com/ngocsangyem).<br />
This project is [MIT](https://github.com/ngocsangyem/gulp-front/blob/master/LICENSE) licensed.