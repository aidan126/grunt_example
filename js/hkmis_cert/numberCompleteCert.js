
isc.ListGrid.create({
    ID: "resultNumberCompleteCertGrid",
    //dataSource: certJobBaseDS,
    overflow:"auto",
    filterOnKeypress:true,
    autoFetchData: false,
    autoSaveEdits: false,
    canEdit: false,
    editOnFocus: true,
    canSelectCells: true,
    dataPageSize: 20,
    saveLocally: true,
    saveByCell: true,
    //editEvent: "doubleClick",
    editEvent: "click",
    fields:[
            {name:"Jan", title:"Jan",  width:60 , canEdit:true},
            {name:"Feb", title:"Feb",  width:60 , canEdit:true},
            {name:"Mar", title:"Mar",  width:60 , canEdit:true},
            {name:"Apr", title:"Apr",  width:60 , canEdit:true},
            {name:"May", title:"May",  width:60 , canEdit:true},
            {name:"Jun", title:"Jun",  width:60 , canEdit:true},
            {name:"Jul", title:"Jul",  width:60 , canEdit:true},
            {name:"Aug", title:"Aug",  width:60 , canEdit:true},
            {name:"Sep", title:"Sep",  width:60 , canEdit:true},
            {name:"Oct", title:"Oct",  width:60 , canEdit:true},
            {name:"Nov", title:"Nov",  width:60 , canEdit:true},
            {name:"Dec", title:"Dec",  width:60 , canEdit:true},
        ],
});
resultNumberCompleteCertGrid.setEditValues(0,[0,0,0,0,0,0,0,0,0,0,0,0]);

/*
isc.Label.create({
    ID: "display",
    contents: "---",
});
*/

//------------------------------------------------------------------------------------------------------------------------------------------------



isc.DynamicForm.create({
    ID: "numberCompleteCertQueryform",
    width:"100%",
    numCols: 6,
    colWidths: [40, 60, 20, 250, 20, "*"],
    align:"left",
    //autoFocus: true,
    //dataSource: "hkCertDS",
    items:[
        {name:"year", title:"Year : ", editorType:"SpinnerItem", defaultValue:2019, step:1, wrapTitle:false},
        //{name: "completeDate", editorType: "DateRangeItem", hidden:true, showTitle: false, allowRelativeDates: true},
        {name: "criteria_start_date", type:"date", hidden:true},
        {name: "criteria_end_date", type:"date", hidden:true},
        //{type: "SpacerItem", width:"*" },
        {
            type: "button",
            name: "query",
            title: "Query",
            width:70,
            //width:"*",
            textAlign:"center",
            //selectOnFocus: true,
            wrapTitle: false,
            startRow: false,
            defaultValue: "",
            click: function(){

            	resultNumberCompleteCertGrid.setEditValues(0,[0,0,0,0,0,0,0,0,0,0,0,0]);
            	var criteria_year = numberCompleteCertQueryform.getItem("year").getValue();
            	//record.setAttribute("date",d);
            	//var criteria2 = numberCompleteCertQueryform.getField("completeDate").getCriterion();

            	for (a = 1; a < 13; a++) {
            		var gridname = "numberCompleteCertGrid" + a;
            		isc.ListGrid.create({
            			ID: gridname,
            			dataSource: certJobBaseDS,
            		});

            		switch (a){
            			case 1:
            			case 3:
            			case 5:
            			case 7:
            			case 8:
            				var start_date = "01/0" + a + "/" + criteria_year;
            				numberCompleteCertQueryform.setValue("criteria_start_date",start_date);

            				var end_date = "31/0" + a + "/" + criteria_year;
            				numberCompleteCertQueryform.setValue("criteria_end_date",end_date);
            				break;
            			case 10:
            			case 12:
            				var start_date = "01/0" + a + "/" + criteria_year;
            				numberCompleteCertQueryform.setValue("criteria_start_date",start_date);

            				var end_date = "31/" + a + "/" + criteria_year;
            				numberCompleteCertQueryform.setValue("criteria_end_date",end_date);
            				break;
            			case 2:
            				if(Number.isInteger(criteria_year/4)){
                				var start_date = "01/0" + a + "/" + criteria_year;
                				numberCompleteCertQueryform.setValue("criteria_start_date",start_date);

                				var end_date = "29/0" + a + "/" + criteria_year;
                				numberCompleteCertQueryform.setValue("criteria_end_date",end_date);
                				break;
            				}else{
                				var start_date = "01/0" + a + "/" + criteria_year;
                				numberCompleteCertQueryform.setValue("criteria_start_date",start_date);

                				var end_date = "28/0" + a + "/" + criteria_year;
                				numberCompleteCertQueryform.setValue("criteria_end_date",end_date);
                				break;
            				}
            			case 4:
            			case 6:
            			case 9:
            				var start_date = "01/0" + a + "/" + criteria_year;
            				numberCompleteCertQueryform.setValue("criteria_start_date",start_date);

            				var end_date = "30/0" + a + "/" + criteria_year;
            				numberCompleteCertQueryform.setValue("criteria_end_date",end_date);
            				break;
            			case 11:
            				var start_date = "01/0" + a + "/" + criteria_year;
            				numberCompleteCertQueryform.setValue("criteria_start_date",start_date);

            				var end_date = "30/" + a + "/" + criteria_year;
            				numberCompleteCertQueryform.setValue("criteria_end_date",end_date);
            				break;
            		}

                	var criteria = {
            		        _constructor:"AdvancedCriteria",
            		        //operator:"and",
            		        criteria:[
            		            { fieldName:"completeDate", operator:"greaterOrEqual", value:numberCompleteCertQueryform.getValue('criteria_start_date') },
            		            { operator:"and",
            		            	criteria:[
            		                  { fieldName:"completeDate", operator:"lessOrEqual", value:numberCompleteCertQueryform.getValue('criteria_end_date') },
            		                  //{ fieldName:"completeDate", operator:"greaterOrEqual", value:numberCompleteCertQueryform.getValue('criteria_start_date') }
            		                 // { fieldName:"reports", operator:"notNull" }
            		              ]
            		            },
            		        ]
            		    };

        			switch (a){
    				case 1:
                		numberCompleteCertGrid1.fetchData(criteria,function(dsResponse, data, dsRequest) {
            			resultNumberCompleteCertGrid.setEditValue(0,0,numberCompleteCertGrid1.getTotalRows() );});
                		break;

    				case 2:
                		numberCompleteCertGrid2.fetchData(criteria,function(dsResponse, data, dsRequest) {
            			resultNumberCompleteCertGrid.setEditValue(0,1,numberCompleteCertGrid2.getTotalRows());});
                		break;

    				case 3:
                		numberCompleteCertGrid3.fetchData(criteria,function(dsResponse, data, dsRequest) {
            			resultNumberCompleteCertGrid.setEditValue(0,2,numberCompleteCertGrid3.getTotalRows());});
                		break;

    				case 4:
                		numberCompleteCertGrid4.fetchData(criteria,function(dsResponse, data, dsRequest) {
            			resultNumberCompleteCertGrid.setEditValue(0,3,numberCompleteCertGrid4.getTotalRows());});
                		break;

    				case 5:
                		numberCompleteCertGrid5.fetchData(criteria,function(dsResponse, data, dsRequest) {
            			resultNumberCompleteCertGrid.setEditValue(0,4,numberCompleteCertGrid5.getTotalRows());});
                		break;

    				case 6:
                		numberCompleteCertGrid6.fetchData(criteria,function(dsResponse, data, dsRequest) {
            			resultNumberCompleteCertGrid.setEditValue(0,5,numberCompleteCertGrid6.getTotalRows());});
                		break;

    				case 7:
                		numberCompleteCertGrid7.fetchData(criteria,function(dsResponse, data, dsRequest) {
            			resultNumberCompleteCertGrid.setEditValue(0,6,numberCompleteCertGrid7.getTotalRows());});
                		break;

    				case 8:
                		numberCompleteCertGrid8.fetchData(criteria,function(dsResponse, data, dsRequest) {
            			resultNumberCompleteCertGrid.setEditValue(0,7,numberCompleteCertGrid8.getTotalRows());});
                		break;

    				case 9:
                		numberCompleteCertGrid9.fetchData(criteria,function(dsResponse, data, dsRequest) {
            			resultNumberCompleteCertGrid.setEditValue(0,8,numberCompleteCertGrid9.getTotalRows());});
                		break;

    				case 10:
                		numberCompleteCertGrid10.fetchData(criteria,function(dsResponse, data, dsRequest) {
            			resultNumberCompleteCertGrid.setEditValue(0,9,numberCompleteCertGrid10.getTotalRows());});
                		break;

    				case 11:
                		numberCompleteCertGrid11.fetchData(criteria,function(dsResponse, data, dsRequest) {
                		resultNumberCompleteCertGrid.setEditValue(0,10,numberCompleteCertGrid11.getTotalRows());});
                		break;

    				case 12:
                		numberCompleteCertGrid12.fetchData(criteria,function(dsResponse, data, dsRequest) {
                		resultNumberCompleteCertGrid.setEditValue(0,11,numberCompleteCertGrid12.getTotalRows());});
            			//resultNumberCompleteCertGrid.setEditValue(0,a,dsResponse.totalRows);});
                		break;
        			}
            	}

            	resultNumberCompleteCertGrid.endEditing();
            	resultNumberCompleteCertGrid.saveAllEdits();
            	//display.setContents(resultNumberCompleteCertGrid.getRecord(0));
            		/*
            			var e = numberCompleteCertGrid.getRecord(1).completeDate.toString().substring(4, 7);
        			*/

            	 /* For building a Criteria/AdvancedCriteria reference
            	 var criteria = {
    					field1 : "value1",
    					field2 : ["value2", "value3"]
 				 }

            	 var advancedCriteria = {
            	        _constructor:"AdvancedCriteria",
            	        operator:"and",
            	        criteria:[
            	            // this is a Criterion
            	            { fieldName:"salary", operator:"lessThan", value:80000 },
            	            { operator:"or", criteria:[
            	                  { fieldName:"title", operator:"iContains", value:"Manager" },
            	                  { fieldName:"reports", operator:"notNull" }
            	              ]
            	            },
            	            { fieldName:"startDate", operator:"greaterThan", value:new Date(1388552400000) }
            	        ]
            	  }
            	  */
            },
        }
	]
});

isc.IButton.create({
    ID:"numberCompleteCertExport",
    title: "Export",
    width: 120,
    layoutAlign:"center",
    autoDraw: false,
	icon: "demand.png",
    //listGrid: ,
    click:function(){

		var exportFieldsTmp = null;
		var exportHeaderlessTmp = false;
    	resultNumberCompleteCertGrid.exportClientData(resultNumberCompleteCertGrid.getRecord(0), {ignoreTimeout:true, "endRow":-1, exportAs:"xls", exportFilename:"num_results.xls"});
    }
});

isc.HLayout.create({
	ID:"numberCompleteCertTopBtnBar", layoutTopMargin:10, layoutBottomMargin:10,
    height:40,
	showEdges: false,
	membersMargin:5,
	members:[numberCompleteCertQueryform, numberCompleteCertExport]
});

isc.HLayout.create({
	ID:"numberCompleteCertGroup", layoutTopMargin:10,
    isGroup: true,
    groupTitle: "Number of Completed Certificate",
    showEdges: false,
    membersMargin:5,
    members:[resultNumberCompleteCertGrid]
});

isc.HLayout.create({
	ID:"numberCompleteCertExportGroup",
	width:"100%",
    height:20,
    align:"right",
    defaultLayoutAlign:"right",
    members:[numberCompleteCertExport]
});

isc.VLayout.create({
    ID: "numberCompleteCertVLayout",
    membersMargin: 10,
    members: [
        isc.SectionStack.create({
            height:120,
            sections: [
                {title: "Search", expanded: true, resizeable: false, items:[numberCompleteCertTopBtnBar]},
            ]
        }),
        numberCompleteCertGroup,
        numberCompleteCertExportGroup
    ]
});



