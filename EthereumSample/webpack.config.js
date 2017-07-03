var path = require('path');

module.exports = {
    entry: './Scripts/app.js',
    output: {
        path: path.resolve(__dirname, 'wwwroot'),
        filename: 'app.bundle.js',
        libraryTarget: 'var',
        library: 'App'
    }
};