var roDataDictCodeUI = createCodeTable2(roDataDictDS,
		[
			{ name: "dict_id"},
			{ name: "dict_name"},
			{ name: "dict_value"},
			{ name: "dict_description"},
		],
		[
			{ name: "dict_id"},
			{ name: "dict_name"},
			{ name: "dict_value"},
			{ name: "dict_description"},
		],
		["dict_id"], 'paged', 'RO_DATADICTIONERY_WRITE|RO_ALL');


roDataDictCodeUI["LG"].setSort(
	[
		{property: "dict_name", direction: "ascending"}
		, {property: "dict_value", direction: "ascending"}
	]
);