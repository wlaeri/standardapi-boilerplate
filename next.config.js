require('dotenv').config()

const approvedKeys = Object.keys(process.env).filter(key => {
  return key.substring(0,2) !== '__' && key.substring(0,5) !== 'NODE_'
})

let env = {}

approvedKeys.map(key => env[key] = process.env[key])

module.exports = {
  env,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  }
}
