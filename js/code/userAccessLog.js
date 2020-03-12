function getUserAccessLogUI()
{
	var userAccessLogDS_LG = isc.FilterListGrid.create({
		id: "userAccessLogDS_LG",
		dataSource: userAccessLogDS,
		autoFetchData: true,
		showHeaderMenuButton: true,
		height:"100%",
		dataFetchMode:"paged",
	    sortField: "signOnTime",
	    sortDirection: "descending",

		fields:[
			{ name: "signOnTime"},
			{ name: "userId"},
			{ name: "ipAddress"},
			{ name: "signOffTime"},
			{ name: "status"},
			{ name: "createdBy"},
			{ name: "createdDate"},
			{ name: "updatedBy"},
			{ name: "updatedDate"},
		],
	});
	
	return isc.VLayout.create({
		members : [
			userAccessLogDS_LG
			, isc.ButtonsHLayout.create({
				icon: "demand.png",
				members : [
					isc.IExportButton.create({
						title: "Export",
						width: 120,
						listGrid: userAccessLogDS_LG
					})
				]
			})
		]
	});

}

getUserAccessLogUI();