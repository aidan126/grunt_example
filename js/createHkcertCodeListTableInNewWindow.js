
function createHkcertCodeListTableInNewWindow(dataSource, tableFields, idFields, dataFetchModeValue){
    if(dataFetchModeValue==undefined){
		dataFetchModeValue = 'basic';
	}



    operationToolBar = isc.ButtonToolbar.create({
        //ID:"operationToolBar",
        height: 50,
    	layoutTopMargin: 10,
    	layoutBottomMargin: 10,
    	autoDraw: false,
        buttons:[
            {name:"addBtn", title:"Add", autoFit: true}
            ,{name:"deleteBtn", title:"Delete", autoFit: true}
            ,{name:"saveBtn", title:"Save", autoFit: true}
            ,{name:"exportBtn", title:"Export", autoFit: true}
        ]
    });

    resultList = isc.ListGrid.create({
        //ID: "resultList",
        width:"100%", height:"100%", dataSource : dataSource, alternateRecordStyles:true,
        autoDraw: false,
        canEdit:true,
        autoSaveEdits:false,




        fields: tableFields
        //data: countryData
    });



    return isc.VLayout.create({
    	autoDraw: false,
		members : [operationToolBar, resultList]
	});
}














































































































