const execSync = require('child_process').execSync;
const path = require('path');

const rollup = path.resolve(__dirname, '../node_modules/.bin/rollup');
const rollupConfig = path.resolve(__dirname, '../config/rollup.config.js');
const rollupEsmConfig = path.resolve(__dirname, '../config/rollup.config.esm.js');

const exec = (command, extraEnv) =>
    execSync(command, {
        env: Object.assign({}, process.env, extraEnv),
        stdio: 'inherit'
    });

console.log('\nBuilding ES modules ...');
exec(`${rollup} -c ${rollupEsmConfig}`);

console.log('Building CommonJS modules ...');
exec(`${rollup} -c ${rollupConfig}`);

// Not building UMD for now...

// console.log('\nBuilding UMD ...');
// exec(`${rollup} -c ${rollupConfig} -f umd -o umd/reach-${pkg}.js`, {
//   BABEL_ENV: 'umd',
//   NODE_ENV: 'development'
// });

// console.log('\nBuilding UMD min.js ...');
// exec(`${rollup} -c ${rollupConfig} -f umd -o umd/reach-${pkg}.min.js`, {
//   BABEL_ENV: 'umd',
//   NODE_ENV: 'production'
// });

// const size = gzipSize.sync(fs.readFileSync(`umd/reach-${pkg}.min.js`));
// console.log(`\n${pkg} UMD build is %s`, prettyBytes(size));
