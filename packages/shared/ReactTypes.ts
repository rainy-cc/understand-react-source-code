/* 定义相关类型 */

export type Type = any;
export type Props = any;
export type Key = any;
export type Ref = any;
export type ElementType = any; // 元素类型

export interface ReactElement {
	$$typeof: symbol | number;
	key: Key;
	ref: Ref;
	props: Props;
	__mymark: string;
}
