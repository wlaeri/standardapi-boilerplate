const env = process.env.NODE_ENV
export const isDev = env === 'dev' || env === 'development' || env === 'local'

export default isDev
