function userCodeTable(dataSource, tableFields, formFields, idFields, dataFetchModeValue,onControlWriteStatus){
	if(dataFetchModeValue==undefined){
		dataFetchModeValue = 'basic';
	}

	var filterListGrid = isc.FilterListGrid.create({
		dataSource: dataSource,
		height:"*",
		dataFetchMode:dataFetchModeValue,
		fields: tableFields,
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
		}
	});



	var exportButtonsHLayout = isc.ButtonsHLayout.create({
		icon: "demand.png",
		members : [
			isc.IButton.create({
				onControl:"SYS_USER_RESET_PWD|CODETABLE_ALL",	
				title: "Reset Password",
				width: 150,
				click:function(){
					var selected_rec = g_userDS_RHS["LG"].getSelectedRecord();
					if( selected_rec )
					{
						open_ChangePasswordWindow(selected_rec.id, selected_rec.userPassword);
					}
				}
			}),
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
			saveButton.setDisabled(false);
		}
	});

	var buttonsHLayout = isc.ButtonsHLayout.create({
		members : [
			addButton,
			saveButton,
			isc.IResetButton.create({
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
	filterListGrid.filterData({userStatus:10});

	//addButton.setDisabled(!userFunctionList.contains('CODETABLE_CREATE'));
	//saveButton.setDisabled(!userFunctionList.contains('CODETABLE_UPDATE'));

	var vlout = isc.VLayout.create({
		members : [sectionStack]
	});
	
	return {
		"main": vlout
		, "LG" : filterListGrid
		, "LG_toolbar": exportButtonsHLayout
		, "DF": dynamicForm
	};
}



var g_userDS_RHS = userCodeTable(userDS, 
	[
		{ name: "id", autoFitWidth:true}, 
		{ name: "userName", autoFitWidth:true},
		{ name: "chiName", autoFitWidth:true},
//		{ name: "userPassword", autoFitWidth:true},
		{ name: "title", autoFitWidth:true},
		{ name: "cert_dept_id", width:40, title: "Dept.", optionDataSource:"userCertDeptDS", displayField:"cert_dept_code", valueField:"cert_dept_id" },
//		{ name: "cert_dept_id", autoFitWidth:true, title: "Cert Dept" },
		{ name: "userStatus", autoFitWidth:true},
		{ name: "userPasswordTime", autoFitWidth:true},
		{ name: "email", autoFitWidth:true},
//		{ name: "userRoles", autoFitWidth:true},
		{ name: "roleIds", autoFitWidth:true, 	title:"Roles", type:"select", startRow:false, colSpan:5, width:'*', multiple:true, 
            multipleAppearance:"picklist",  optionDataSource:"roleDS", displayField:"roleCode", valueField:"id"},
		{ name: "nautical_surveyor", autoFitWidth:true, title: "Naut." },
		{ name: "engineer_surveyor", autoFitWidth:true, title: "Eng." },
		{ name: "senior_surveyor", autoFitWidth:true, title: "Sen." },
		{ name: "authorized_official", autoFitWidth:true, title: "AO" },
		{ name: "senior_ag", autoFitWidth:true, title: "Sen Ag" },
		{ name: "official_ag", autoFitWidth:true, title: "Off Ag" },
		{ name: "ads", autoFitWidth:true, title: "AD/S" },
		{ name: "ads_ag", autoFitWidth:true, title: "AD/S Ag" },
	],
	[
		{ name: "id"}, 
		{ name: "userName"},
		{ name: "chiName"},
		{ name: "title"},
		{ name: "cert_dept_id", title: "Cert Dept"
			, type:"select", optionDataSource:"userCertDeptDS", displayField:"cert_dept_code", valueField:"cert_dept_id"
			, pickListFields:[
	              {name:"cert_dept_code"},
	              {name:"cert_dept_name"}
	          ],
	          pickListWidth:350,
		},
		{ name: "userPassword", hidden: true },
		{ name: "userStatus"},
//		{ name: "userPasswordTime"},
		{ name: "email", startRow:true, colSpan:5, width:'*'},
/*
		{ name: "userRoles", colSpan:6 
			, 	title:"Roles", type:"select", multiple:true, multipleAppearance:"picklist"
				,  optionDataSource:"roleDS", displayField:"roleCode", valueField:"id"
		}
*/
		{ name: "roleIds", 	title:"Roles", type:"select", startRow:true, colSpan:5, width:'*', multiple:true, 
            multipleAppearance:"picklist",  optionDataSource:"roleDS", displayField:"roleCode", valueField:"id"},
		{ name: "nautical_surveyor" },
		{ name: "engineer_surveyor"},
		{ name: "senior_surveyor"},
		{ name: "authorized_official"},
		{ name: "senior_ag"},
		{ name: "official_ag"},
		{ name: "ads"},
		{ name: "ads_ag"},
	],
	["id"],"page","SYS_USER_WRITE|CODETABLE_ALL");

//g_userDS_RHS["LG_toolbar"].addMember(
//	isc.IButton.create({
//		title: "Reset Password",
//		width: 150,
//		click:function(){
//			var selected_rec = g_userDS_RHS["LG"].getSelectedRecord();
//			if( selected_rec )
//			{
//				open_ChangePasswordWindow(selected_rec.id, selected_rec.userPassword);
//			}
//		}
//	}), 0
//);