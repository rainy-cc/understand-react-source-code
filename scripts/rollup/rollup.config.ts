import { defineConfig } from 'rollup';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import generatePackageJson from 'rollup-plugin-generate-package-json';
import { resolvePkgJson, resolvePkgPath } from './utils';

const { name, module } = resolvePkgJson('react');
const pkgPath = resolvePkgPath(name);
const pkgDistPath = resolvePkgPath(name, true);

const config = defineConfig([
	//react
	{
		input: `${pkgPath}/${module}`,
		output: {
			format: 'umd',
			file: `${pkgDistPath}/index.js`,
			name: 'index.js',
		},
		plugins: [
			nodeResolve(),
			typescript({}),
			generatePackageJson({
				inputFolder: pkgPath,
				outputFolder: pkgDistPath,
				baseContents: (pkg) => ({
					name: pkg.name,
					main: pkg.main,
					version: pkg.version,
					description: pkg.description,
					dependencies: {},
				}),
			}),
		],
	},
	// jsx-runtime
	{
		input: `${pkgPath}/src/jsx.ts`,
		output: [
			{
				format: 'umd',
				file: `${pkgDistPath}/jsx-runtime.js`,
				name: 'jsx-runtime.js',
			},
			{
				format: 'umd',
				file: `${pkgDistPath}/jsx-dev-runtime.js`,
				name: 'jsx-dev-runtime.js',
			},
		],
		plugins: [nodeResolve(), typescript({})],
	},
]);

export default config;
