'use strict';
const path = require('path');
const rootPath = path.join(__dirname, '..');
const rendererDir = path.resolve(rootPath, './src/renderer');
const rendererDistDir = path.resolve(rootPath, './dist');
const templateDir = path.resolve(rootPath, './webpack/template');

const entryPages = {
    main: path.resolve(rendererDir, './pages/main/index.js'),
}

exports.rootPath  = rootPath;
exports.rendererDir = rendererDir;
exports.rendererDistDir = rendererDistDir;
exports.templateDir = templateDir;
exports.entryPages = entryPages;