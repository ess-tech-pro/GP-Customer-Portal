import type { RollupAliasOptions } from '@rollup/plugin-alias'
import type { UserConfig } from 'vite'
import NormalSplitChunks from '../plugins/NormalSplitChunks'
import splitChunkComponents from './utils/splitChunkComponents'
import splitChunkConstants from './utils/splitChunkConstants'
import splitChunkContexts from './utils/splitChunkContexts'
import splitChunkHooks from './utils/splitChunkHooks'
import splitChunkNodeModules from './utils/splitChunkNodeModules'
import splitChunkRoutes from './utils/splitChunkRoutes'
import splitChunkSchemas from './utils/splitChunkSchemas'
import splitChunkStore from './utils/splitChunkStore'
import splitChunkUtils from './utils/splitChunkUtils'


export default (): UserConfig => {
  return {
    // NOTE - If you want to use Regex please use /...\/([^/]+)/ to split chunks right way
    plugins: [
      NormalSplitChunks([
        splitChunkNodeModules,
        splitChunkConstants,
        splitChunkContexts,
        splitChunkSchemas,
        splitChunkUtils,
        splitChunkHooks,
        splitChunkStore,
        splitChunkRoutes,
        splitChunkComponents
      ]),
    ],
  }
}

export const aliasExternal: RollupAliasOptions = {}
