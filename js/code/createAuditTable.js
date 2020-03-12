function createAuditTable(dataSource, listGrid, usercriteria){

	/*
	var selectionbar = isc.DynamicForm.create({
	    top: 25,
	    width: 500,
	    numCols: 4,
	    autoDraw: true,
	    fields: [
	        {name:"department", title:"Audited Object:", type:"select"}
	    ]
	});

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
		members : [selectionbar, filterListGrid, exportButtonsHLayout]

	});
*/

	/* ------------------------------------------------------------------------------- */

/*
	var sectionStack = isc.SectionStack.create({
		visibilityMode : "multiple",
		sections : [
					{title: "Audit Log", expanded: true, items:[resultVLayout]},
				]
	});
*/

	listGrid.setDataSource(dataSource);

	var criteria = {
            _constructor:"AdvancedCriteria",
            criteria:[],
            operator:"and"
        };
	criteria.criteria.push({fieldName:"AUD", operator:"equals", value:true});
	//criteria.criteria.push({fieldName:"usercritria", operator:"equals", value:true});

	//filterListGrid.fetchData({"AUD":"true"});

	//console.log(usercriteria);

	if(!isEmpty(usercriteria)){
		listGrid.fetchData(criteria, function(dsResponse, data, dsRequest){}, {operationId:"FIND_AUDITLOG_WITH_CRITERIA",data:usercriteria });
//		listGrid.fetchData(criteria, function(dsResponse, data, dsRequest){}, {operationId:"FIND_AUDITLOG_WITH_CRITERIA",data:{"user_id":usercriteria} });
	}else{
		listGrid.fetchData(criteria);
	}

	/*
	var vlout = isc.VLayout.create({
		members : [sectionStack]
	});

	return {
		"main": vlout
		, "LG" : filterListGrid
		, "LG_toolbar": exportButtonsHLayout
	};
	*/
}

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}