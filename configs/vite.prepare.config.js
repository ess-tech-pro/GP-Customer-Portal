import fs from 'fs'
import { fileURLToPath } from 'node:url'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// NOTE - This is path of auto-import type declaration
const dtsAutoImportLibsPath = path.resolve(__dirname, './auto-imports.d.ts')
const dtsAutoImportTypesPath = path.resolve(
	__dirname,
	'./auto-imports-type.d.ts'
)

// NOTE - This is path of auto-import eslint
const eslintAutoImportLibsPath = path.join(
	__dirname,
	'./.eslintrc-auto-import.json'
)
const eslintAutoImportTypesPath = path.join(
	__dirname,
	'./.eslintrc-auto-import-type.json'
)

const getAutoImportLibs = () =>
	AutoImport({
		// targets to transform
		include: [
			/\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
			/\.md$/, // .md
		],
		imports: [
			'react',
			{
				from: 'yup',
				imports: [['*', 'yup']],
			},
			{
				'react-dom/client': ['createRoot'],
			},
			'react-router-dom',
			{
				'react-router-dom': [
					'createBrowserRouter',
					'RouterProvider',
					'BrowserRouter',
					'useMatches',
					'generatePath',
				],
			},
		],
		dts: dtsAutoImportLibsPath,
		eslintrc: {
			enabled: true,
			filepath: eslintAutoImportLibsPath,
		},
	}) // getAutoImportLibs

const getAutoImportTypes = () =>
	AutoImport({
		// targets to transform
		include: [
			/\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
			/\.md$/, // .md
		],
		imports: [
			{
				from: 'yup',
				imports: [['*', 'yup']],
				type: true,
			},
			{
				from: 'react',
				imports: [
					'Dispatch',
					'SetStateAction',
					'HTMLProps',
					'HTMLAttributes',
					'ComponentType',
					'ReactNode',
				],
				type: true,
			},
		],
		dts: dtsAutoImportTypesPath,
		eslintrc: {
			enabled: true,
			filepath: eslintAutoImportTypesPath,
		},
	}) // getAutoImportTypes

const handleAutoImport = () => {
	// NOTE - clean the auto import files and recreate to ensure that types are not accidentally

	// NOTE - clean step
	if (fs.existsSync(dtsAutoImportLibsPath)) {
		try {
			fs.unlinkSync(dtsAutoImportLibsPath)
		} catch (err) {
			console.error(err)
		}
	}
	if (fs.existsSync(dtsAutoImportTypesPath)) {
		try {
			fs.unlinkSync(dtsAutoImportTypesPath)
		} catch (err) {
			console.error(err)
		}
	}
	if (fs.existsSync(eslintAutoImportLibsPath)) {
		try {
			fs.unlinkSync(eslintAutoImportLibsPath)
		} catch (err) {
			console.error(err)
		}
	}
	if (fs.existsSync(eslintAutoImportTypesPath)) {
		try {
			fs.unlinkSync(eslintAutoImportTypesPath)
		} catch (err) {
			console.error(err)
		}
	}

	// NOTE - generate the types files if NODE_ENV === 'production', ELSE it will be generated using plugins in vite.config.ts
	if (process.env.NODE_ENV !== 'production') return

	// NOTE - recreate step
	Promise.all([
		getAutoImportLibs()?.buildStart?.(),
		getAutoImportTypes()?.buildStart?.(),
	])
} // handleAutoImport

// NOTE - run the pre-hanlding tasks
handleAutoImport()

// NOTE - export the prepare configuration
export default {
	plugins: [getAutoImportLibs(), getAutoImportTypes()],
}
