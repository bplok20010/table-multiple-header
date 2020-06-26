type IdType = string | number;

type DataType = Record<IdType, any>;

export type TNode<T = DataType> = Record<string | number, any> & {
	id: any;
	data: T;
};

export interface TStore {
	getMaxDepth(): number;
	getDepthNodes(depth?: number): TNode[];
	getChildren(id?: IdType): TNode[];
	getAllChildren(id?: IdType): TNode[];
	getParentNodes(id?: IdType): TNode[];
}

export interface TCell<T = DataType> {
	rowSpan: number;
	colSpan: number;
	data: T;
}

export default tableMultipleHeader;

export function tableMultipleHeader<T = DataType>(store: TStore) {
	const treeDepth = store.getMaxDepth();
	const rows: Array<TCell<T>[]> = [];

	function isLeaf(id: IdType) {
		return store.getChildren(id).length === 0;
	}

	for (let i = 0; i < treeDepth; i++) {
		rows[i] = [];
		const nodes = store.getDepthNodes(i + 1);

		nodes.forEach(function (node: TNode<T>) {
			const id = node.id;
			let rowSpan = 1;
			let colSpan = 1;

			if (isLeaf(id)) {
				const pNodes = store.getParentNodes(id);
				rowSpan = treeDepth - pNodes.length;
				colSpan = 1;
			} else {
				const leafNodes = store.getAllChildren(id).filter(node => isLeaf(node.id));
				colSpan = leafNodes.length || 1;
			}

			rows[i].push({
				rowSpan,
				colSpan,
				data: node.data,
			});
		});
	}

	return rows;
}
