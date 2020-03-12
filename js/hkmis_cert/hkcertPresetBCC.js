createPresetBccForm(hkcertPresetBccDS,
	[
	 	{ name: "code", hidden : true},
		{ name: "dic_type", width:150 },
		{ name: "data", width:200 }

	],
	[
//	 	{ name: "code", type: "staticText", required: true},
//		{ name: "dic_type", type: "staticText", required: true},
	 	{ name: "code", required: true , hidden : true },
		{ name: "dic_type", required: true},
		//{ name: "data", type: "date", useTextField:true},
		 { name: "data", title: "Date", editorType: "DateItem",useTextField: true, type:"yyyy/MM/dd" , inputFormat:"yyyy/MM/dd"},
	],
	["dic_type","code"], 'paged', 'BCCCLC_PRESET_DATA_WRITE|CODETABLE_ALL');

function createPresetBccForm(dataSource, tableFields, formFields, idFields, dataFetchModeValue, onControlWriteStatus){
	if(dataFetchModeValue==undefined){
		dataFetchModeValue = 'basic';
	}


//	isc.SimpleType.create({
//	    name:"dateOnly",
//	    inheritsFrom:"text",
//	    editFormatter:function (value) {
//	       return isc.isA.Number(value) ? value.toFixed(2) : value;
//	    },
//	    validators:[
//	      {type:"regexp", expression:"^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$",
//	            errorMessage:"Should be in the format yyyy/MM/dd"}
//	    ]
//	});

	var filterListGrid = isc.FilterListGrid.create({
		dataSource: dataSource,
		height:"*",
		dataFetchMode:dataFetchModeValue,
		fields: tableFields,
		autoFitWidthApproach: "title",
		sortField: "dic_type",
		sortDirection: "ascending",
		//selectRecord: 0,
		focusInRow: 0,

		rowClick : function(record, recordNum, fieldNum){
			dynamicForm.editSelectedData(filterListGrid);
//			saveButton.setDisabled(!userFunctionList.contains('CODETABLE_UPDATE'));
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
		}
	});


	var resultVLayout = isc.VLayout.create({
		members : [filterListGrid]

	});

	var dynamicForm = isc.ControlledDynamicForm.create({
		onControl:onControlWriteStatus,
		saveOperationType :"update",
		numCols: 6,
		dataSource: dataSource,
		cellBorder:0,
		fields: formFields
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


  	var buttonsHLayout = isc.ButtonsHLayout.create({
		members : [
			saveButton,
			isc.IResetButton.create({
				onControl:onControlWriteStatus,
				click:function(){
					dynamicForm.reset();
				}
			})
		]
	});

	var updateVLayout = isc.VLayout.create({
		height:80,
		layoutTopMargin:10,
		layoutBottomMargin:10,
		members : [dynamicForm, buttonsHLayout]

	});
	/* ------------------------------------------------------------------------------- */


	var sectionStack = isc.SectionStack.create({
		visibilityMode : "multiple",
		sections : [
					{title: "Maintenance", expanded: true, items:[resultVLayout]},
					{title: newTitle, expanded: true, items:[updateVLayout]}
				]
	});

	filterListGrid.filterData();

//	saveButton.setDisabled(!userFunctionList.contains('CODETABLE_UPDATE'));

	return isc.VLayout.create({
		members : [sectionStack]
	});
}
