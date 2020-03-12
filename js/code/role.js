var g_roleDS_RHS = createCodeTable2(roleDS, 
	[
		{ name: "id"}, 
		{ name: "roleCode"},
		{ name: "engDesc"},
		{ name: "chiDesc"}
	],
	[
		{ name: "id"}, 
		{ name: "roleCode"},
		{ name: "engDesc"},
		{ name: "chiDesc"},
		{ name: "funcIds", 	title:"Assign Functions", type:"select", startRow:true, colSpan:5, width:'600', multiple:true
			, optionDataSource:"systemFuncDS", displayField:"key", valueField:"id",  
			multipleAppearance:"picklist",  pickListWidth:580,
			pickListFields:[
	            {name:"key", width:140},
	            {name:"desc", width:400}
			],
			pickListProperties: {
				dataFetchMode: "basic"
			},
		}
	],
	["id"], "basic", "SYS_ROLEMAN_WRITE|CODETABLE_ALL");
	//["id"], "basic");
//g_roleDS_RHS["LG"].sortField = "roleCode";
//g_roleDS_RHS["LG"].sortDirection = "ascending";