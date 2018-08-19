var TreeStore = require('simple-tree-store');

module.exports = function (columns, options) {
	var store;

	if (columns instanceof TreeStore) {
		store = columns;
	} else {
		options = Object.assign({
			rootId: null,
			idField: 'id',
			childrenField: 'children'
		}, options);

		store = new TreeStore(columns, options);
	}

	var MaxRows = store.getMaxLevel();
	var rows = [];

	for (var i = 0; i < MaxRows; i++) {
		rows[i] = [];
		var ids = store.getLevelChildren(i + 1);

		ids.forEach(function (id) {
			var leafs = store.getAllLeaf(id);
			var isLeaf = store.isLeaf(id);
			var rowSpan = 1;
			var colSpan = leafs.length;

			if (isLeaf) {
				var pids = store.getPids(id);
				rowSpan = MaxRows - pids.length;
				colSpan = 1;
			}
			rows[i].push({
				rowSpan,
				colSpan,
				id: id
			});
		})
	}

	return rows;
}