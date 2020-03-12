function createExemptionCertIssueWindow(dataSource, tableFields, formFields, idFields, dataFetchModeValue, onControlWriteStatus,cert_type,callback){
	if(dataFetchModeValue==undefined){
		dataFetchModeValue = 'basic';
	}

	var filterListGrid = isc.FilterListGrid.create({
		dataSource: dataSource,
		height:cert_type=="ALL"?"*":250 ,		
		//autoFetchData:true,
		//height:"*",
		dataFetchMode:dataFetchModeValue,
		showFilterEditor:cert_type=='ALL',		
		fields: tableFields,
		warnOnRemoval: true,		
		rowClick : function(record, recordNum, fieldNum){
			dynamicForm.editSelectedData(filterListGrid);
			//saveButton.setDisabled(!userFunctionList.contains('CODETABLE_UPDATE'));
			if (idFields != null){
				var text = "";
				for (var i = 0; i < idFields.length; i++){
					text += record[idFields[i]];
					if (i != idFields.length-1){
						text += ", ";
					}
					if (dynamicForm.getField(idFields[i]) != null){
						dynamicForm.getField(idFields[i]).setDisabled(true);
					}
				}

				sectionStack.setSectionTitle(1, editTitle +" (" + text +")" );
			} else {
				sectionStack.setSectionTitle(1, editTitle + " (" + record[tableFields[0].name] +")");
			}
		},
		rowDoubleClick:function(record, recordNum, fieldNum){
			if (cert_type!='ALL'){
				if (record.code!=null)
					{
					callback(true, record );
					
					exemptionCertIssueWindow.hide();
					}			
				
			}
			
		}		
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
		members : [filterListGrid,exportButtonsHLayout],
		height:"*",
		width:cert_type=="ALL"?"100%":600
		
	});

	var dynamicForm = isc.ControlledDynamicForm.create({
		onControl:onControlWriteStatus,
		saveOperationType :"update",
		numCols: 4,
		dataSource: dataSource,
		cellBorder:0,
		fields: formFields,
		width:"100%"
	});


	var saveButton = isc.ISaveButton.create({
		onControl:onControlWriteStatus,
		click:function(){
			if(dynamicForm.validate()){
				isc.ask(promptSaveMessage, function (value){
					if (value){
						dynamicForm.saveData(
							function (dsResponse, data, dsRequest) {
								if(dsResponse.status==0){
									isc.say(saveSuccessfulMessage, function(){
										sectionStack.setSectionTitle(1, newTitle);
										dynamicForm.setData({});
										for (var i = 0; i < idFields.length; i++){
											if (dynamicForm.getField(idFields[i]) != null){
												dynamicForm.getField(idFields[i]).setDisabled(false);
											}
										}
										filterListGrid.deselectAllRecords();
										filterListGrid.setData([]);
										

										if (cert_type!='ALL')
											{
											var criteria = {data4:cert_type}
											filterListGrid.filterData({data4:cert_type});
											
											}
										else
											filterListGrid.filterData();
										
									});
								}
							}
						);
					}
				});
			}
		}
	});

	var addButton = isc.IAddButton.create({
		onControl:onControlWriteStatus,
		click:function(){
			sectionStack.setSectionTitle(1, newTitle);
			dynamicForm.editNewRecord();
			for (var i = 0; i < idFields.length; i++){
				if (dynamicForm.getField(idFields[i]) != null){
					dynamicForm.getField(idFields[i]).setDisabled(false);
				}
			}
			filterListGrid.deselectAllRecords();
			
			if (cert_type=='Cert')
				{
				dynamicForm.setValue("data3","Exemption");
				dynamicForm.setValue("data4",cert_type);
				
				}
			
			saveButton.setDisabled(false);
		}
	});

	var delButton = isc.IButton.create({ID:"btnExemptionCertIssueDelete",title:"Delete",   
		 autoDraw: false,hidden:false,
			onControl:onControlWriteStatus,
			click:function(){
     		if (isNull(filterListGrid.getSelectedRecord()))
     			return;
     		
     		var selectDeleteItem  = filterListGrid.getSelectedRecord();
     		            		
     		 isc.confirm("Are you sure to remove record?",function(value){
				  if(value){
					dataSource.removeData(selectDeleteItem, function(dsResponse, data, dsRequest) {
						  if (dsResponse.status == 0) {
							  isc.say(deleteSuccessfulMessage);       							 
						  }else{
							  isc.warn(deleteFailMessage);
						  }
					  });
				  }
			  });
     		  
     	}	
     	
     	});
	
	var closeButton = isc.IButton.create({
		  ID: "closeExemptionCertIssuebtn",
		 // hidden:cert_type=="ALL",
		  autoDraw: false,				  
		  title: "Close",
		  click:function (){
			  exemptionCertIssueWindow.hide();
			 
		  }
	});
	
	var buttonsHLayout = isc.ButtonsHLayout.create({
		members : [
			addButton,
			saveButton,
			isc.IResetButton.create({
				onControl:onControlWriteStatus,
				click:function(){
					dynamicForm.reset();
				}
			}),
			delButton,
			closeButton
		]
	});
		
	
	
	var updateVLayout = isc.VLayout.create({
		height:80,
		width:cert_type=="ALL"?"100%":600,
		layoutTopMargin:10,
		layoutBottomMargin:10,
		members : [dynamicForm, buttonsHLayout]

	});
	/* ------------------------------------------------------------------------------- */
	if (cert_type=="ALL")
	{
		closeButton.hide();
		
	}
	else
	{
		closeButton.show();
		
	}

	var sectionStack = isc.SectionStack.create({
		visibilityMode : "multiple",
		sections : [
					{title: "Maintenance", expanded: true, items:[resultVLayout]},
					{title: newTitle, expanded: true, items:[updateVLayout]}
				]
	});
	
	if (cert_type!='ALL')
		{
		
		
		var criteria = {data4:cert_type}
		filterListGrid.filterData({data4:cert_type},function(){
			filterListGrid.selectSingleRecord(0);
			dynamicForm.editSelectedData(filterListGrid);
		});
		
		}
	else
		filterListGrid.filterData();
		
	
	console.log("certtype:" + cert_type );
	
	var vlout = isc.VLayout.create({
		members : [sectionStack]
	});

     if (cert_type!='ALL')
    	 {
    	 isc.Window.create({
		    ID:"exemptionCertIssueWindow",
		    title: "ExemptionCertIssue",
		    width:600,
		    height:"45%",
		    autoSize:true,
		    autoCenter: true,
		    isModal: true,
		    showModalMask: true,
		    autoDraw: false,
		    items: [
		    	resultVLayout,updateVLayout
	
			]
		});
    	 //exemptionCertIssueWindow.setWidth(500);
    	 exemptionCertIssueWindow.show();
    	 
     }
     else
   	 {
    	 return {
		"main": vlout
		, "LG" : filterListGrid
		, "LG_toolbar": exportButtonsHLayout
		, "DF": dynamicForm
    	 };
  	 }
}

//commented out unused code
/*
var g_codeExemptionCertIssueWindow = createExemptionCertIssueWindow(codeExemptionCertIssueDS, 
		[
			{ name: "data3"}, 
			{ name: "data4"},
			{ name: "data"},
			{ name: "data2"}
		],
		[
			{ name: "data3"}, 
			{ name: "data4"},
			{ name: "data"},
			{ name: "data2"},

		],
		["dic_type","code"], "basic", "CODETABLE_ALL|CODE_EXEMPT_CERT_SIGN_WRITE","ALL");
		
*/
function openExemptionCertIssue(cert_type1,callback){
  return createExemptionCertIssueWindow(codeExemptionCertIssueDS, 
	[
		{ name: "data3"}, 
		{ name: "data4"},
		{ name: "data"},
		{ name: "data2"}
	],
	[
		{ name: "data3", canEdit:cert_type1=='ALL'}, 
		{ name: "data4" , canEdit:cert_type1=='ALL'},
		{ name: "data"},
		{ name: "data2"},

	],
	["dic_type","code"], "basic", "CODETABLE_ALL|CODE_EXEMPT_CERT_SIGN_WRITE",cert_type1,callback);
	//["id"], "basic");
}

//openExemptionCertIssue( 'ALL' );
