function createHistoryTable(dataSource){

	var filterListGrid = isc.FilterListGrid.create({
		dataSource: dataSource,
		height:"*",
	});



	var exportButtonsHLayout = isc.ButtonsHLayout.create({
		icon: "demand.png",
		members : [
			isc.IExportButton.create({
				title: "Export",
				width: 120,
				listGrid: filterListGrid
			})
		]
	});

	var resultVLayout = isc.VLayout.create({
		members : [filterListGrid, exportButtonsHLayout]

	});


	/* ------------------------------------------------------------------------------- */


	var sectionStack = isc.SectionStack.create({
		visibilityMode : "multiple",
		sections : [
					{title: "Audit Log", expanded: true, items:[resultVLayout]},
				]
	});
	filterListGrid.fetchData();
	
	var vlout = isc.VLayout.create({
		members : [sectionStack]
	});
	
	return {
		"main": vlout
		, "LG" : filterListGrid
		, "LG_toolbar": exportButtonsHLayout
	};
}