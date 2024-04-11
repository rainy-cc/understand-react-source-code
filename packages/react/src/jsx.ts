import { REACT_ELEMENT_TYPE } from 'shared/ReactSymbol';
import type {
	Type,
	Key,
	Ref,
	ReactElement,
	Props,
	ElementType,
} from 'shared/ReactTypes';

const CreateReactElement = (type: Type, key: Key, ref: Ref, props: Props) => {
	const element: ReactElement = {
		$$typeof: REACT_ELEMENT_TYPE,
		key,
		ref,
		props,
		__mymark: 'rainy',
	};

	return element;
};

const jsx = (type: ElementType, config: any, ...maybeChildren: string[]) => {
	let key: Key = null;
	const props: Props = {};
	let ref: Ref = null;
	const len = maybeChildren.length;
	for (const prop in config) {
		const val = config[prop];
		if (prop === 'key') {
			if (val !== undefined) {
				key = val + '';
			}
			continue;
		}
		if (prop === 'ref') {
			if (val !== undefined) {
				ref = val;
			}
			continue;
		}
		// 确保不是原型链上继承的
		if (Object.hasOwnProperty.call(config, 'prop')) {
			props[prop] = val;
		}
		if (len) {
			if (len === 1) {
				props.children = maybeChildren[0];
			} else {
				props.children = maybeChildren;
			}
		}
	}
	return CreateReactElement(type, key, ref, props);
};
const jsxDEV = (type: ElementType, config: any) => {
	let key: Key = null;
	const props: Props = {};
	let ref: Ref = null;
	console.log('jsxDEV', config);
	for (const prop in config) {
		const val = config[prop];
		if (prop === 'key') {
			if (val !== undefined) {
				key = val + '';
			}
			continue;
		}
		if (prop === 'ref') {
			if (val !== undefined) {
				ref = val;
			}
			continue;
		}
		// 确保不是原型链上继承的
		if (Object.hasOwnProperty.call(config, prop)) {
			props[prop] = val;
		}
	}
	return CreateReactElement(type, key, ref, props);
};
export { ReactElement, jsx, jsxDEV };
