const glob = require('glob')
const spawn = require('cross-spawn')
const kill = require('kill-port')
const path = require('path')
const webpack = require('webpack')
const webpackConfigClient = require('./webpack.config.client')
const webpackConfigServer = require('./webpack.config.server')

const compiler = webpack([
  {
    ...webpackConfigClient,
    mode: 'development',
    devtool: 'eval-source-map',
  },
  {
    ...webpackConfigServer,
    mode: 'development',
    devtool: 'eval-source-map',
  },
])


let node

compiler.hooks.watchRun.tap('Dev', (compiler) => {
  console.log(`Compiling ${compiler.name} ...`)
  if (compiler.name === 'server' && node) {
    node.kill()
    node = undefined
  }
})

compiler.watch({}, (err, stats) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(stats?.toString('minimal'))
  const compiledSuccessfully = !stats?.hasErrors()
  if (compiledSuccessfully && !node) {
    run();
  }
})

const run = async () => {
  //kill inspect 
  await kill('9229');
  console.log('Starting Node.js ...')
  node = spawn(
    'node',
    ['--inspect', path.join(__dirname, 'dist/server.js')],
    {
      stdio: 'inherit',
    }
  )
}