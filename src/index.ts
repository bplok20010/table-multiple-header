type IdType = string | number;

interface Node {
	id: IdType;
	data: {};
	[x: string]: any;
}

interface Store {
	getMaxDepth(): number;
	getDepthNodes(depth?: number): Node[];
	getChildren(id?: IdType): Node[];
	getAllChildren(id?: IdType): Node[];
	getParentNodes(id?: IdType): Node[];
}

export interface TCell {
	rowSpan: number;
	colSpan: number;
	data: {};
}

export default tableMultipleHeader;

export function tableMultipleHeader(store: Store) {
	const treeDepth = store.getMaxDepth();
	const rows: Array<TCell[]> = [];

	function isLeaf(id: IdType) {
		return store.getChildren(id).length === 0;
	}

	for (let i = 0; i < treeDepth; i++) {
		rows[i] = [];
		const nodes = store.getDepthNodes(i + 1);

		nodes.forEach(function(node) {
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
