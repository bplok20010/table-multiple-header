# table-multiple-header

多表头生成

## install

`npm install --save table-multiple-header xtree-store`

## Usage

> 依赖`xtree-store`

`tableMultipleHeader(store: TreeStore): TCell[][]`

```typescript
interface TCell {
	rowSpan: number;
	colSpan: number;
	data: {};
}
```

## examples

```javascript
import { TreeStore } from "xtree-store";
import { tableMultipleHeader } from "table-multiple-header";

const columns = [
	{
		id: 1,
	},
	{
		id: 2,
		children: [
			{ id: 5 },
			{
				id: 6,
				children: [{ id: 8 }, { id: 9 }, { id: 10 }],
			},
			{ id: 7 },
		],
	},
	{
		id: 3,
	},
	{
		id: 4,
	},
];

const store = new TreeStore(columns);

const result = tableMultipleHeader(store);

const trs = result.map(row => {
	return [
		"<tr>",
		...row.map(cell => {
			return `<th rowSpan=${cell.rowSpan} colSpan=${cell.colSpan}>${cell.data.id}</th>`;
		}),
		"</tr>",
	].join("");
});

const table = `<table>
	<thead>
		${trs.join("")}
	</thead>
</table>`;

console.log(table);
```
