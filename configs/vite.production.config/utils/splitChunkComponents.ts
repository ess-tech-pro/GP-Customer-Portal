import { initStore } from '../store'
import splitChunkHanler from './splitChunkHandler'

const splitChunkComponentsRegex = /components\/([^/]+)/
const pagesRegex = /pages\/([^/]+)/
const nodeModulesRegex = /node_modules\/([^/]+)/

const routesStore = initStore({
  prefix: 'components',
})
const splitChunk = splitChunkHanler().init(routesStore)

const splitChunkComponents = (pathName: string): boolean | string => {
  if (
    !pathName ||
    !splitChunkComponentsRegex.test(pathName) ||
    pagesRegex.test(pathName) ||
    nodeModulesRegex.test(pathName)
  ) {
    return false
  }

  const chunkName = splitChunk(pathName, splitChunkComponentsRegex) || pathName

  return chunkName
} // splitChunkComponents

export default splitChunkComponents
