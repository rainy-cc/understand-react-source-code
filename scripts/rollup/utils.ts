import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

// esmodules 不支持 commonjs规范
// require()  // ❌ ESM 规范报错，未定义不能使用
// module.exports    // ❌报错，不能使用
// exports   // ❌报错，不能使用
// __dirname  // ❌报错，不能使用
// __filename  // ❌报错，不能使用

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const pkgPath = path.resolve(__dirname, '../../packages');
const distPath = path.resolve(__dirname, '../../dist/node_modules');

const resolvePkgPath = (pkgDirname, isDist = false) => {
	if (isDist) return `${distPath}/${pkgDirname}`;
	return `${pkgPath}/${pkgDirname}`;
};

/**
 *
 * @param pkgDirname 包名
 * @returns
 */
const resolvePkgJson = (pkgDirname) => {
	if (!pkgDirname) throw new Error('无效的包名');
	const pkgJsonPath = `${resolvePkgPath(pkgDirname)}/package.json`;
	const data = fs.readFileSync(pkgJsonPath, 'utf-8');
	const jsonData = JSON.parse(data);
	return jsonData;
};

export { resolvePkgPath, resolvePkgJson };
