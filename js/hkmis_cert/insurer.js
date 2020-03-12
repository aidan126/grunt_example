//insurerCode

//insurerCodeSearch

isc.DynamicForm.create({
    ID: "insurerCodeSearch",
    width:"100%",
    numCols: 6,
    colWidths: [40, 60, 20, 250, 20, "*"],
    align:"left",
    //autoFocus: true,
    //dataSource: "hkCertDS",
    saveOnEnter: true,
    submit: function(){
        this.getItem("query").click();
    },
    items:[
        {
            type: "text",
            name: "companyId",
            title: "Company ID",
            textAlign:"left",
            //selectOnFocus: true,
            wrapTitle: false,
            startRow: true,
            //width:60,
            width:"*",
            type: "integer",
            defaultValue: ""
        },
        {
            type: "text",
            name: "companyName",
            title: "Name",
            textAlign:"left",
            //selectOnFocus: true,
            wrapTitle: false,
            startRow: false,
            //width:250,
            width:"*",
            defaultValue: ""
        },
        {
            type: "SpacerItem",
            width:"*"
        },
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
            click: function searchInsurer(){

                var targetCompanyId = insurerCodeSearch.getItem("companyId").getValue();
                var targetCompanyName = insurerCodeSearch.getItem("companyName").getValue();

                if (!isNull(targetCompanyName))
                    targetCompanyName = targetCompanyName.trim();

                console.log("targetCompanyId: " + targetCompanyId);
                console.log("targetCompanyName: " + targetCompanyName);

                //insurerListGrid.fetchData([]);
//                insurerListGrid.fetchData({id:targetCompanyId, nameEn:targetCompanyName});
                insurerListGrid.fetchData({company_id:targetCompanyId, nameEn:targetCompanyName});

            }

        }

	]
});

/*
isc.DynamicForm.create({
    ID: "insurerCodeSave",
    width: 550,
    //numCols: 4,
    numCols: 1,
    //border:"1px solid blue", padding:5,

    fields: [
        {
            type: "button",
            name: "save",
            title: "Save",
            textAlign:"center",
           align:"right",
            wrapTitle: false,
            showTitle:false,
            startRow: false,
            defaultValue: "",
            width:"160",


            click: "isc.say('Save!')"
        }
    ]
});
*/
var EditedAddessRecord = [];

isc.IButton.create({
	ID:"insurerCodeSave",
	width:150,
    align:"center",

    onControl: "INSURER_WRITE|CODETABLE_ALL",
    layoutLeftMargin: 150,
    //padding:20,
    title: "Save",
    //icon: "icons/16/world.png",
    //iconOrientation: "right",
    click: function (){

        var EditedRecord = insurerListGrid.getAllEditRows();

    	insurerListGrid.endEditing();
    	insurerListGrid.saveAllEdits();

        for (i = 0; i < EditedRecord.length; i++) {
        	insurerDS.updateData(insurerListGrid.getRecord( EditedRecord[i] )); //save
        }

        insurerAddressListGrid.endEditing();
        insurerAddressListGrid.saveAllEdits();

        for (i = 0; i < EditedAddessRecord.length; i++) {
        	insurerDS.updateData(insurerListGrid.getRecord( EditedAddessRecord[i] )); //save
        }
        
        insurerAddressListGrid.setData([]);

        EditedRecord = [];
        EditedAddessRecord = [];

        isc.say("Save Successfully.");

        //insurerDS.updateData(insurerListGrid.getSelectedRecord()); //save

        //insurerForm.editRecord(insurerListGrid.getSelectedRecord());
        //insurerForm.setValue("insurerAddresses", insurerAddressListGrid.data);
        //insurerForm.saveData(); //save

        //insurerAddressListGrid.setData([]);

        //comment unused code
        //searchInsurer();

        /*
        insurerListGrid.updateData(data, function(resp, data, req) {
				win.markForDestroy();
				refreshInbox();
			}, {operationId:operationId, data:data});
        */
    }
});


isc.HLayout.create({
	ID:"insurerCodeTopBtnBar", layoutTopMargin:10, layoutBottomMargin:10,
    height:40,
	showEdges: false,
	membersMargin:5, members:[insurerCodeSearch,insurerCodeSave]
});

//------------------------------------------------------------------------------------------------------------------------------------------------

isc.ListGrid.create({
    ID: "insurerListGrid",
    //width:500,
    //height:224,
    //alternateRecordStyles:true,
    overflow:"auto",
    dataSource: insurerDS,
    autoFetchData: true,
    autoSaveEdits: false,
    canEdit: hasAccess("INSURER_WRITE|CODETABLE_ALL"),
    editOnFocus: hasAccess("INSURER_WRITE|CODETABLE_ALL"),
    canSelectCells: true,
    dataPageSize: 20,
    canRemoveRecords:false,
    saveLocally: true,
    saveByCell: false,
    //editEvent: "doubleClick",
    editEvent: "click",
    fields:[

        //canEdit: false
//        {name:"id", title:"ID", type:"integer", width:50},
        {name:"company_id", title:"ID", type:"integer", width:50, canEdit:false},
        {name:"nameEn", title:"Name En", width:400},
        {name:"nameCn", title:"Name Cn"},
        {name:"linkMan", title:"Link Man"},
        {name:"tel", title:"Tel"},
        {name:"phone", title:"Phone"},
        {name:"email", title:"Email"},
        {name:"zipcode", title:"Zipcode"},
        {name:"deleted", title:"Deleted"},
        //{name:"insurerAddresses", title:"Addresses", hidden:true},
    ],
    sortField: 0,
    sortDirection: "ascending",


    //,data: countryData
    //rowDoubleClick
    //rowClick
    //,rowClick:function(record, recordNum, fieldNum){

        //var cell = insurerListGrid.getCellSelection();
        //insurerListGrid.startEditing(cell.startRow, cell.startCol);

        //console.log("selected insurer rec: " + record);
//        console.log("selected insurer ID: " + record['id']);
        //console.log("selected insurer ID: " + record['company_id']);
        //console.log("selected insurer row: " + recordNum);
        //console.log("selected insurer col: " + fieldNum);
        //insurerAddressListGrid.setData([]);
//        insurerAddressListGrid.fetchData({"company_id":record['id']});
        //insurerAddressListGrid.setData(insurerListGrid.getSelectedRecord().insurerAddresses);
//        insurerAddressListGrid.filterData({id: record['id']});

    rowClick:function(record, recordNum, fieldNum){
            var cell = insurerListGrid.getCellSelection();
            if(hasAccess("INSURER_WRITE"))
        	{
                insurerListGrid.startEditing(cell.startRow, cell.startCol);
        	}
            console.log("selected insurer rec: " + record);
            console.log("selected insurer ID: " + record['company_id']);
            console.log("selected insurer row: " + recordNum);
            console.log("selected insurer col: " + fieldNum);
            insurerAddressListGrid.setData([]);
            insurerAddressListGrid.setData(insurerListGrid.getSelectedRecord().insurerAddresses);

    }

//	, selectionChanged: function(record, state) {
//    	insurerAddressListGrid.setData(record['insurerAddresses']);
////    	insurerForm.editRecord(record);
//	}

});

/*
isc.DynamicForm.create({
    ID: "insurerForm",
    dataSource: insurerDS,
    autoDraw: false,
    numCols: 8
});
*/

/*
isc.DynamicForm.create({
    ID:"insurerListBtnBar",
    autoDraw: false,
    width: 100,
    items: [
        {
            type: "button",
            name: "add",
            title: "Add",
            width:"*",
            //selectOnFocus: true,
            wrapTitle: false,
            defaultValue: "my friend"
        },{
            type: "button",
            name: "delete",
            title: "Delete",
            width:"*",
            //selectOnFocus: true,
            wrapTitle: false,
            defaultValue: "my friend"
        }
        ,{
            type: "button",
            name: "export",
            title: "Export",
            width:"*",
            //selectOnFocus: true,
            wrapTitle: false,
            defaultValue: "my friend"
        }

    ]
});
*/

/*
isc.IButton.create({
    ID:"insurerListAdd",
    title:"Add",
    width:90,
    layoutAlign:"center",
    autoDraw: false,
    click:function(){

        //insurerListGrid.addData({});
    	console.log("last row-->insurerListGrid.getTotalRows() - 2 :  " + insurerListGrid.getTotalRows() - 1);
        var lastRec = insurerListGrid.getRecord(insurerListGrid.getTotalRows() - 1);
//        insurerListGrid.startEditingNew({id:lastRec.id + 1});
        insurerAddressListGrid.setData([]);
        insurerListGrid.startEditingNew();
        //insurerListGrid.addData({});

    }
});
*/

isc.IButton.create({
    ID: "addinsurer",
    autoDraw: false,
    width:90,
    layoutAlign:"center",
    onControl: "INSURER_WRITE|CODETABLE_ALL",
    title: "Add",
    click : function () {
    	addinsurerForm.clearValues();
    	addinsurerwindow.show();
    }
});
isc.Window.create({
    ID: "addinsurerwindow",
    title: "New Insurer",
    autoSize:true,
    autoCenter: true,
    isModal: true,
    showModalMask: true,
    autoDraw: false,
    //closeClick : function () {
    	//insurerListGrid.selectAllRecords();
    	//insurerListGrid.selectSingleRecord(addinsurerForm.getValue('company_id')-1);
    	//},
    items: [
        isc.DynamicForm.create({
        	ID: "addinsurerForm",
            dataSource: insurerDS,
        	autoDraw: false,
            height: 48,
            padding:4,
//            autoFetchData: true,
            autoSaveEdits: false,
            saveLocally: true,
            border:"1px solid grey", padding:10, spacing:10,
            fields: [
                //{name: "Name", type: "select",  defaultValue:"" , valueMap: ["foo", "bar"]},
                //{name:"company_id", title:"ID", defaultValue:"", hidden:true},
                {name:"nameEn", title:"Name En",  defaultValue:"",  width:500 , required:true },
                {name:"nameCn", title:"Name Cn",  defaultValue:"" },
                {name:"linkMan", title:"Link Man",  defaultValue:"" },
                {name:"tel", title:"Tel",  defaultValue:"" },
                {name:"phone", title:"Phone",  defaultValue:""},
                {name:"email", title:"Email",  defaultValue:""},
                {name:"zipcode", title:"Zipcode",  defaultValue:""},
                {name:"insurerAddresses", title:"Addresses", hidden:true, defaultValue:[]},
            ]
        }),
        isc.ButtonToolbar.create({
  	      ID:"addinsurerbtnbar",
      	  layoutAlign:"center",
            buttons: [
                {name:"insurerformSave", title:"Save", width:100,
                    click:function(){
                    	addinsurerForm.saveData();
                    	addinsurerwindow.hide();
                    }
                },
                /*
                {name:"insurerformClose", title:"Close", width:100, hidden:false,
                    click:function(){
                    	addinsurerwindow.hide();
                    }
                }
                */
            ]
        }),
        isc.VLayout.create({
      	  ID:"addinsurerformBar",
      	  //width: 100,
      	  //layoutTopMargin:10,
      	  defaultLayoutAlign: "center",
      	  showEdges: false,
      	  membersMargin:5, members:[addinsurerForm, addinsurerbtnbar]
        })
    ]
});

isc.IButton.create({
    ID:"insurerListDelete",
    title:"Delete",
    onControl: "INSURER_WRITE|CODETABLE_ALL",
    width:90,
    layoutAlign:"center",
    autoDraw: false,
    click:function(){
        //isc.say("Delete");
    	isc.ask(promptDeleteMessage_2, function (value){
			if (value){
				if (insurerListGrid.getSelectedRecord())

					//insurerForm.editRecord(insurerListGrid.getSelectedRecord());

					//insurerForm.setValue("del_flag", true);
					//insurerForm.saveData(); //save

					//insurerListGrid.removeData(insurerListGrid.getSelectedRecord());

					//display.setContents(insurerAddressListGrid.getRecord(0));

					//if(insurerAddressListGrid.getRecord(0)){
						//insurerAddressListGrid.removeData(insurerAddressListGrid.getRecord(0));
					//}

					//insurerListGrid.removeData(insurerListGrid.getSelectedRecord());
					//insurerListGrid.removeSelectedData();

					insurerDS.removeData(insurerListGrid.getSelectedRecord(),
						function(dsResponse, data, dsRequest) {
              				if (dsResponse.status == 0) {
              					isc.say("Successfully Deleted");
              				}
		  		  		}
					);
					insurerAddressListGrid.setData([]);
                	//insurerAddressListGrid.data.getAllRows().map(function (item) { insurerAddressListGrid.removeData(item) });

					//insurerDS.removeData(null, function(){
						//searchSection.fetchData({id:new Date().getTime()});// force to read from server
					//}, {operationId:"insurerDS_removeItem"});

					//insurerListGrid.startEditingNew();
			}
		});
    }
});
/*
isc.IButton.create({
    ID: "del_insurer",
    autoDraw: false,
    width:90,
    layoutAlign:"center",
    title: "Delete by modal",
    click : function () {
    	del_insurerForm.clearValues();
    	del_insurerForm.editRecord(insurerListGrid.getSelectedRecord());
    	del_insurerwindow.show();
    }
});
isc.Window.create({
    ID: "del_insurerwindow",
    title: "Delete Insurer",
    autoSize:true,
    autoCenter: true,
    isModal: true,
    showModalMask: true,
    autoDraw: false,
    items: [
        isc.DynamicForm.create({
        	ID: "del_insurerForm",
            dataSource: insurerDS,
        	autoDraw: true,
            height: 48,
            padding:4,
            autoFetchData: false,
            autoSaveEdits: false,
            saveLocally: true,
            fields: [
                     {name:"company_id", title:"ID", hidden:false, canEdit:false},
                     {name:"nameEn", title:"Name En",  width:500 , required:true },
                     {name:"nameCn", title:"Name Cn",  },
                     {name:"linkMan", title:"Link Man",  },
                     {name:"tel", title:"Tel",  },
                     {name:"phone", title:"Phone",  },
                     {name:"email", title:"Email",  },
                     {name:"zipcode", title:"Zipcode",  },
                     {name:"insurerAddresses", title:"Addresses", hidden:false},
                {type: "button", title: "Delete",
                    click:function(){
                    	if (insurerListGrid.getSelectedRecord()){

                    		//del_insurerForm.saveAllEdits();
                    		//del_insurerForm.editRecord(insurerListGrid.removeData(insurerListGrid.getSelectedRecord()));


                    		//insurerDS.removeData(insurerListGrid.getSelectedRecord());
                    		//insurerDS.removeData(del_insurerForm.editRecord(insurerListGrid.getSelectedRecord()));

                    		//del_insurerForm.saveData();

                    		insurerListGrid.markRecordRemoved(1);

                    		//insurerDS.removeData(insurerListGrid.getSelectedRecord());
                    		del_insurerwindow.hide();
                    	}else{
                    		del_insurerwindow.hide();
                    	}
                    }
                },
                {type: "button", title: "Cancel",
                    click:function(){
                    	del_insurerwindow.hide();
                    	display.setContents(insurerListGrid.getSelectedRecord());
                    	//insurerListGrid.selectSingleRecord(addinsurerForm.getRowNum(record.company_id.addinsurerForm));
                    }
                }

            ]
        })
    ]
});
*/
isc.IExportButton.create({
    ID:"insurerListExport",
    title: "Export",
    width: 90,
    layoutAlign:"center",
    autoDraw: false,
    listGrid: insurerListGrid,
	exportFields:null,
	exportHeaderless:true,
});
/*
isc.Label.create({
    ID: "display",
    contents: "---",
});
*/

isc.VLayout.create({
	ID:"insurerListBtnBar",
    width: 100,
    //layoutTopMargin:10,
    defaultLayoutAlign: "center",
    showEdges: false,
    membersMargin:5, members:[addinsurer, insurerListDelete, insurerListExport]
});

isc.VLayout.create({
	ID:"insurerEditPane",
    //layoutTopMargin:10,
    defaultLayoutAlign: "center",
    showEdges: false,
    membersMargin:5, members:[insurerListGrid]
    //membersMargin:5, members:[insurerListGrid, insurerForm]
});

isc.HLayout.create({
	ID:"insurerList", layoutTopMargin:10,
    isGroup: true, groupTitle: "Insurance Company",
    showEdges: false,
    membersMargin:5, members:[insurerEditPane, insurerListBtnBar]
});

//------------------------------------------------------------------------------------------------------------------------------------------------



isc.ListGrid.create({
    ID: "insurerAddressListGrid",
    width:"100%",
    //height:224,
    //alternateRecordStyles:true,
    overflow:"auto",
    dataSource: insurerAddressDS,
    canEdit: hasAccess("INSURER_WRITE|CODETABLE_ALL"),
    editOnFocus: hasAccess("INSURER_WRITE|CODETABLE_ALL"),
    canSelectCells: true,
    autoSaveEdits: true,
    saveLocally: true,
    saveByCell: true,
    canRemoveRecords:false,
    //editEvent: "doubleClick",
    editEvent: "click",
    fields:[
        {name:"id", title:"Address ID", type:"integer", width:150, hidden:true},
        {name:"company_id", title:"Company ID", type:"integer", width:150, hidden:true},
        {name:"address_en", title:"Address 1", width:500},
        {name:"address_en2", title:"Address 2"},
        {name:"address_en3", title:"Address 3"}
    ]
	,rowHasChanges:function(){

		console.log(insurerListGrid.getCellCSSText(insurerListGrid.getSelectedRecord()));

		var InsurerRowNum = insurerListGrid.getRowNum(insurerListGrid.getSelectedRecord(), 5, 1);
		if(!EditedAddessRecord.includes(InsurerRowNum)){
			EditedAddessRecord.push(InsurerRowNum);
		}
	}
});

/*
isc.DynamicForm.create({
    ID:"insurerAddressListBtnBar",
    autoDraw: false,
    showEdges: true,
    width: 150,
    align:"left",
    items: [
        {
            type: "button",
            name: "add",
            title: "Add",
            width:100,
            //selectOnFocus: true,
            wrapTitle: false,
            defaultValue: "my friend"
        },{
            type: "button",
            name: "delete",
            title: "Delete",
            width:"*",
            //selectOnFocus: true,
            wrapTitle: false,
            defaultValue: "my friend"
        }
        ,{
            type: "button",
            name: "export",
            title: "Export",
            width:"*",
            //selectOnFocus: true,
            wrapTitle: false,
            defaultValue: "my friend"
        }

    ]
});
*/
var next_new_addr = -1;

isc.IButton.create({
    ID:"insurerAddressListAdd",
    title:"Add",
    onControl: "INSURER_WRITE|CODETABLE_ALL",
    width:90,
    layoutAlign:"center",
    autoDraw: false,
    click:function(){
    	//var lastRec = insurerAddressListGrid.getRecord(insurerAddressListGrid.getTotalRows() - 1);
//    	insurerAddressListGrid.startEditingNew({id:lastRec.id + 1});
    	insurerAddressListGrid.startEditingNew();
    	//next_new_addr = next_new_addr - 1;
    }
});
isc.IButton.create({
    ID:"insurerAddressListDelete",
    title:"Delete",
    onControl: "INSURER_WRITE|CODETABLE_ALL",
    width:90,
    layoutAlign:"center",
    autoDraw: false,
    click:function(){
        //isc.say("Delete");
    	isc.ask(promptDeleteMessage_2, function (value){
			if (value){
				if (insurerAddressListGrid.getSelectedRecord())
					insurerAddressListGrid.removeData(insurerAddressListGrid.getSelectedRecord());
			}
		});
    }
});

/*
isc.IButton.create({
    ID:"insurerAddressListExport",
    title:"Export",
    width:90,
    layoutAlign:"center",
    autoDraw: false,
    click:function(){
        isc.say("Export");
    }
});
*/

isc.IExportButton.create({
    ID:"insurerAddressListExport",
    title: "Export",
    width: 90,
    layoutAlign:"center",
    autoDraw: false,
    listGrid: insurerAddressListGrid,
    mode:"refetchToExport",
	exportFields:["address_en","address_en2","address_en3"],
	exportHeaderless:false,
	criteriaCallback: function(){
		this.criteria = {company_id: !isNull(insurerListGrid.getSelectedRecord()) ? insurerListGrid.getSelectedRecord().company_id : ""};
	}
});


isc.VLayout.create({
	ID:"insurerAddressListBtnBar",
    width: 100,
    //layoutTopMargin:10,
    defaultLayoutAlign: "center",
    showEdges: false,
    membersMargin:5, members:[insurerAddressListAdd, insurerAddressListDelete, insurerAddressListExport]
});

isc.VLayout.create({
	ID:"insurerEditPanel",
    //layoutTopMargin:10,
    defaultLayoutAlign: "center",
    showEdges: false,
    membersMargin:5, members:[insurerAddressListGrid]
});


isc.HLayout.create({
	ID:"insurerAddressList", layoutTopMargin:10,
    isGroup: true, groupTitle: "Company Address",
    showEdges: false,
    membersMargin:5, members:[insurerEditPanel, insurerAddressListBtnBar]
});

//------------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------



isc.VLayout.create({
	ID:"insurerListVLayout", membersMargin:5, width:"100%",
    showEdges: true,
    members:[insurerCodeTopBtnBar, insurerList, insurerAddressList]
});
















