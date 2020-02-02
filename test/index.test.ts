import { TreeStore } from "xtree-store";
import { tableMultipleHeader } from "../src";
const data = [
	{
		id: "序号",
	},
	{
		id: "商品编码",
	},
	{
		id: "颜色",
	},
	{
		id: "产品A",
		children: [
			{
				id: "销售",
				children: [
					{
						id: "折扣",
					},
					{
						id: "数量",
					},
				],
			},
			{
				id: "金额",
				children: [
					{
						id: "销售价",
					},
					{
						id: "合计金额",
					},
				],
			},
		],
	},
	{
		id: "活动时间",
		children: [
			{
				id: "开始时间",
			},
			{
				id: "结束时间",
			},
		],
	},
	{
		id: "总数",
	},
];

test("tableMultipleHeader", () => {
	const store = new TreeStore(data);
	const result = tableMultipleHeader(store);

	expect(result.length).toEqual(3);
	expect(result[0].map(cell => ({ rowSpan: cell.rowSpan, colSpan: cell.colSpan }))).toEqual([
		{ rowSpan: 3, colSpan: 1 },
		{ rowSpan: 3, colSpan: 1 },
		{ rowSpan: 3, colSpan: 1 },
		{ rowSpan: 1, colSpan: 4 },
		{ rowSpan: 1, colSpan: 2 },
		{ rowSpan: 3, colSpan: 1 },
	]);
	expect(result[1].map(cell => ({ rowSpan: cell.rowSpan, colSpan: cell.colSpan }))).toEqual([
		{ rowSpan: 1, colSpan: 2 },
		{ rowSpan: 1, colSpan: 2 },
		{ rowSpan: 2, colSpan: 1 },
		{ rowSpan: 2, colSpan: 1 },
	]);
	expect(result[2].map(cell => ({ rowSpan: cell.rowSpan, colSpan: cell.colSpan }))).toEqual([
		{ rowSpan: 1, colSpan: 1 },
		{ rowSpan: 1, colSpan: 1 },
		{ rowSpan: 1, colSpan: 1 },
		{ rowSpan: 1, colSpan: 1 },
	]);
});
