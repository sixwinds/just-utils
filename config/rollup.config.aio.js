// rollup.config.js
// umd
var nodeResolve = require('rollup-plugin-node-resolve');
var commonjs = require('rollup-plugin-commonjs');
var { uglify } = require('rollup-plugin-uglify');

var common = require('./rollup.js');

var prod = process.env.NODE_ENV === 'production';

module.exports = {
    input: 'src/index.js',
    output: {
        file: prod ? 'umd/index.min.js' : 'umd/index.js',
        format: 'umd',
        // When export and export default are not used at the same time, set legacy to true.
        // legacy: true,
        name: common.name,
        banner: common.banner,
    },
    plugins: [
        nodeResolve({
            mainFields: ['module', 'main'],
            extensions: ['.js']
        }),
        commonjs({
            include: 'node_modules/**',
        }),
        common.getCompiler(),
        (prod && uglify())
    ]
};
