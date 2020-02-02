type IdType = string | number;

interface Node {
	id: IdType;
	data: {};
	[x: string]: any;
}

interface Store {
	isLeaf(id: IdType): boolean;
	getMaxDepth(): number;
	getDepthNodes(depth?: number): Node[];
	getAllChildren(id?: IdType): Node[];
	getParentNodes(id?: IdType): Node[];
}

export interface TCell {
	rowSpan: number;
	colSpan: number;
	data: {};
}

export function tableMultipleHeader(store: Store) {
	const treeDepth = store.getMaxDepth();
	const rows: Array<TCell[]> = [];

	for (let i = 0; i < treeDepth; i++) {
		rows[i] = [];
		const nodes = store.getDepthNodes(i + 1);

		nodes.forEach(function(node) {
			const id = node.id;
			var isLeaf = store.isLeaf(id);
			let rowSpan = 1;
			let colSpan = 1;

			if (isLeaf) {
				const pNodes = store.getParentNodes(id);
				rowSpan = treeDepth - pNodes.length;
				colSpan = 1;
			} else {
				const leafNodes = store.getAllChildren(id).filter(node => node.leaf);
				colSpan = leafNodes.length;
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
