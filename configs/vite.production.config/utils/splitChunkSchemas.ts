import splitChunkHanler from './splitChunkHandler'

const splitChunkSchemasRegex = /schemas\/([^/]+)/
const splitChunkSchemasRegexToIgnore = /components\/([^/]+)/

const splitChunk = splitChunkHanler().init()

const splitChunkSchemas = (pathName: string): boolean | string => {
  if (
    !pathName ||
    !splitChunkSchemasRegex.test(pathName) ||
    splitChunkSchemasRegexToIgnore.test(pathName)
  ) {
    return false
  }

  const chunkName = splitChunk(pathName, splitChunkSchemasRegex) || pathName

  return chunkName
} // splitChunkSchemas

export default splitChunkSchemas
