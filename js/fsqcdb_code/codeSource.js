createCodeTable2(codeSourceDS, 
	[
		{ name: "Sour_cd", width:200}, 
		{ name: "Sour_name"},
		{ name: "Del_mark"},
	],
	[
		{ name: "Sour_cd"}, 
		{ name: "Sour_name", width:300, colSpan:3},
		{ name: "Del_mark"}, 

	],
	["Sour_cd"], 'paged');