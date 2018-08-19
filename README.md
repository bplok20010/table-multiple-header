# table-multiple-header
多表头生成

## install 

`npm install --save table-multiple-header`

## useage

`tableMultipleHeader(data[, options])` or `tableMultipleHeader( SimpleTreeStore )`

## examples

```
const tableMultipleHeader = require('table-multiple-header');

const columns = [
	{
		id: 1
	},
	{
		id: 2,
		children: [
			{ id: 5 },
			{
				id: 6, children: [
					{ id: 8 },
					{ id: 9 },
					{ id: 10 },
				]
			},
			{ id: 7 },
		]
	},
	{
		id: 3
	},
	{
		id: 4
	},
];

const result = tableMultipleHeader(columns, {
    idField: 'id',
    childrenField: 'children',
    rootId: null
});

const trs = result.map(row => {
	return ['<tr>',
		...row.map(cell => {
			return `<th rowSpan=${cell.rowSpan} colSpan=${cell.colSpan}>${cell.id}</th>`
		})
		, '</tr>'].join('');
})

const table = `<table>
	<thead>
		${trs.join('')}
	</thead>
</table>`;

console.log(table)

```
