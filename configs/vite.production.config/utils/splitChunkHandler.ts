import fs from 'fs';
import type { IStore } from '../store'
import store from '../store';

const splitChunkHandler = () => {
  let _store: IStore

  const _getFileSize = (filePath: string) => {
    if (!filePath) return 0
    const correctPath = filePath.split('?')[0].replace(/[\x00-\x1F\x7F-\xA0]+/g, '')

    try {
      const stats = fs.statSync(correctPath)

      return stats.size / 5
    } catch (error) {
      console.error(error)
      return 0
    }
  } // _getFileSize

  const _splitChunkHandler = (filePath: string, splitChunkRegex: RegExp) => {
    if (!filePath) return

    const { chunkList, maxSize, prefix, totalVendorFiles } = _store.get()

    const name = splitChunkRegex ? (filePath.match(splitChunkRegex)?.[0]?.split('/')[0] ?? filePath) : filePath
    let tmpChunkName = ''

    const size = _getFileSize(filePath)

    for (const chunkName in chunkList) {
      if (!chunkName) continue

      const vendorInfo = chunkList[chunkName]
      const tmpSize = vendorInfo.size + size

      if (
        vendorInfo.chunks.includes(name) ||
        // vendorInfo.chunks.includes(name.split('-')[0]) ||
        tmpSize <= maxSize
      ) {
        chunkList[chunkName].size = tmpSize

        if (!vendorInfo.chunks.includes(name)) {
          // vendorInfo.chunks += `,${name}`
          vendorInfo.chunks.push(name)
        }

        tmpChunkName = chunkName
        break
      }
    }

    if (!tmpChunkName) {
      _store.set('totalVendorFiles', totalVendorFiles + 1)
      const newFileName = `${prefix}_${_store.get('totalVendorFiles')}`
      chunkList[newFileName] = {
        size: size,
        // chunks: name,
        chunks: [name],
      }
      tmpChunkName = newFileName
    }

    return tmpChunkName
  } // _splitChunkHandler

  const _init = (chunkStore: IStore = store) => {
    _store = chunkStore

    const { prefix, totalVendorFiles, chunkList } = _store.get()

    chunkList[`${prefix}_${totalVendorFiles}`] = {
      size: 0,
      chunks: []
    }

    return _splitChunkHandler
  } // _init

  return {
    init: _init
  }
} // splitChunkHandler

export default splitChunkHandler
