/***************************************************************************************************************
* Qualified Name	: 	/webui/src/main/webapp/js/fsqcdb_ship/fsqcShipPSCInspectionProfile.js
* @author 				Albert Chan
* @since				2019-08-07
* ************************************************************************************************************** 
* Change log:
* log no	Change complete date	Developer			Change Reason
* ======	====================	=========			=============
* 00000		2019-08-07				Albert Chan			Initial Implementation
*
* 
****************************************************************************************************************/

//var ship_PSCInspection_record_num;
var ship_PSCInspection_imono;
function fsqcShipPSCInspectionProfileControl(i_dataSource, imono, psc_record, psc_record_num)
{
	ship_PSCInspection_record_num = psc_record_num;
	ship_PSCInspection_imono = imono;
	
	isc.ValuesManager.create({
        ID: "fsqcShipPSCInspectionProfileVM",
		dataSource: i_dataSource
	});
	
//	isc.ValuesManager.create({
//        ID: "fsqcShipPSCInspectionProfileManagerVM",
//		dataSource: companyManagementDS
//	});
	
	isc.DynamicForm.create({
		ID:"fsqcShipPSCInspectionProfileTopShip",
		valuesManager:"fsqcShipPSCInspectionProfileVM",
//		cellBorder: 1,
//		isGroup: "true",
//		groupTitle: "Ship main data",
		width:"80%",
		numCols: 6,
		fixedColWidths: false,
//		colWidths: ["*", "*", "*", "*", "*", "*", "*", "*"],
		fields:
		[
			{name: "Imono", 	canEdit: false, disabled: true, startRow: true, colSpan: 1},
			{name: "countryname", 	canEdit: true,	colSpan: 1},
			{name: "Inspection", 	canEdit: true,	colSpan: 1},
			{name: "Detained", 	canEdit: true,	colSpan: 1},
			{name: "Non_Mou_Detained", 	canEdit: true,	colSpan: 1},
			{name: "Port", 	canEdit: true,	colSpan: 1},
			{name: "Defnums", 	canEdit: true,	colSpan: 1},
			{name: "Informdate", 	canEdit: true,	colSpan: 1},
			{name: "Release_date", 	canEdit: true,	colSpan: 1},
			{name: "IMO_informdate", 	canEdit: true,	colSpan: 1},
			{name: "itemno", 	canEdit: true,	colSpan: 1},

			{name: "review_by", 	canEdit: true,	colSpan: 1},
			{name: "review_on", 	canEdit: true,	colSpan: 1},
			{name: "fsqc_request", 	canEdit: true,	colSpan: 1},
			{name: "fsqc_complete", 	canEdit: true,	colSpan: 1},
			{name: "appeal", colSpan: 5,rowSpan: 3, width: "*", type: "textArea"},
			{name: "warning", colSpan: 5,rowSpan: 3, width: "*", type: "textArea"},
			{name: "Note", colSpan: 5,rowSpan: 3, width: "*", type: "textArea"},
		]
	});

	

	
	isc.ButtonToolbar.create({
		ID:"shipPSCInspectionManagement_ToolBar",
		buttons: 
		[
			/*
			isc.IAddButton.create({ 
			name:"addBtn", autoFit: true, onControl:"FSQC_ALL",
				click : function () {
					
					console.log("add");
  	      		  	var psc_inspection_def_max = 0;
  	      		  	for (var i = 0; i < PSCInspectionDefLG.getTotalRows(); i++) {
  	      		  		var row_record_e = PSCInspectionDefLG.getEditValues(i);
  	      		  		var row_record_r = PSCInspectionDefLG.getRecord(i);
  	      		  		//row_record['Inspection'] = fsqcShipPSCInspectionProfileVM.getValue('Inspection');
  	      		  		if ((row_record_e) &&(row_record_e.Sno > psc_inspection_def_max)){
  	      		  			psc_inspection_def_max = row_record_e.Sno;
  	      		  		}
  	      		  		if ((row_record_r) &&(row_record_r.Sno > psc_inspection_def_max)){
  	      		  			psc_inspection_def_max = row_record_r.Sno;
  	      		  		}
  	      		  	}

  	      		  	var def_record = {};
  	      		  	def_record['Imono'] = fsqcShipPSCInspectionProfileVM.getValue('Imono');
  	      		  	def_record['Inspection'] = fsqcShipPSCInspectionProfileVM.getValue('Inspection');
  	      		  	def_record['Sno'] = psc_inspection_def_max + 1;

  	      		  	//PSCInspectionDefLG.addData(def_record);
  	      		  	PSCInspectionDefLG.startEditingNew(def_record);
  	      		  	
				}
			}),*/
			isc.ISaveButton.create({name:"updateBtn", autoFit: true, onControl:"FSQC_ALL",
				click : function () {
					if(fsqcShipPSCInspectionProfileVM.validate())
					{
						console.log("update");
						
						if (!fsqcShipPSCInspectionProfileVM.getValue('Inspection')) {
							isc.say("Error!  Inspection Date Empty.");
							return;
						}
						/*
						var psc_inspection_def_list = [];
	  	      		  	for (var i = 0; i < PSCInspectionDefLG.getTotalRows(); i++) {
	  	      		  		var row_record_e = PSCInspectionDefLG.getEditValues(i);
	  	      		  		var row_record_r = PSCInspectionDefLG.getRecord(i);
	  	      		  		if (row_record_r) {
		  	      		  		for(var property in row_record_e) {
		  	      		  			row_record_r[property] = row_record_e[property]; 
		  	      		  		}
	  	      		  			row_record_r['Inspection'] = fsqcShipPSCInspectionProfileVM.getValue('Inspection');
		  	      		  		psc_inspection_def_list.push(row_record_r);
	  	      		  		} else {
	  	      		  			row_record_e['Inspection'] = fsqcShipPSCInspectionProfileVM.getValue('Inspection');
		  	      		  		psc_inspection_def_list.push(row_record_e);
	  	      		  		}
	  	      		  	}
	  	      		  	
						//PSCInspectionDefLG.endEditing();
						//PSCInspectionDefLG.saveAllEdits(); //save
						
						
						fsqcShipPSCInspectionProfileVM.setValue("psc_inspection_def_list", psc_inspection_def_list);
						//fsqcShipPSCInspectionProfileVM.setValue("psc_inspection_def_list", PSCInspectionDefLG.data);
*/
//						var EditedRecord = PSCInspectionDefLG.getAllEditRows();
//				        for (i = 0; i < EditedRecord.length; i++) {
//				        	pscInspectionDefDS.updateData(PSCInspectionDefLG.getRecord( EditedRecord[i] )); //save
//				        }
//				        var selected_record = PSCInspectionDefLG.getSelectedRecord();
//				        if (selected_record) {
//				        	pscInspectionDefDS.updateData(selected_record);
//				        }
						
//	  	      		  	for (var i = 0; i < PSCInspectionDefLG.getTotalRows(); i++) {
//				        	pscInspectionDefDS.updateData(PSCInspectionDefLG.getRecord(i)); //save
//	  	      		  	}
	  	      		  	
						fsqcShipPSCInspectionProfileVM.saveData
						(
							function (dsResponse, data, dsRequest) 
							{
							  if(dsResponse.status==0)
							  {
								  	isc.say(saveSuccessfulMessage);
								  	enabledSection(true);
								  	
									fsqcShipPSCInspectionProfileVM.setValues({});
									fsqcShipPSCInspectionProfileVM.setData({});
									fsqcShipPSCInspectionProfileVM.reset();
									fsqcShipPSCInspectionProfileVM.clearErrors(true);

									fsqcShipPSCInspectionProfileWindow.hide();
							  }
							}
						);
					}
				}
			}),
//			{name:"deleteBtn", title:"Delete", autoFit: true,
//				  click : function () {
//				  		isc.ask(promptDeleteMessage_2, function (value){
//							if (value){
//								if (PSCInspectionDefLG.getSelectedRecord())
//									PSCInspectionDefLG.removeData(PSCInspectionDefLG.getSelectedRecord());
//							}
//						});
//				  }
//			},
			/*
			isc.IButton.create({name:"pscInspectionDeleteBtn", title:"Delete", autoFit: true,
			  click : function () {
					var selected_record = PSCInspectionDefLG.getSelectedRecord();
					if (selected_record) {
						PSCInspectionDefLG.removeData(selected_record);
					}
				  
			  }
			}),*/
			isc.IButton.create({name:"closeBtn", title:"Close", autoFit: true,
				  click : function () {
					fsqcShipPSCInspectionProfileVM.setValues({});
					fsqcShipPSCInspectionProfileVM.setData({});
					fsqcShipPSCInspectionProfileVM.reset();
					fsqcShipPSCInspectionProfileVM.clearErrors(true);
					  //TODO

					fsqcShipPSCInspectionProfileWindow.hide();
				  }
				}),
		]
	});
	
	var fsqcShipPSCInspectionProfileTop =  isc.VLayout.create
    ({
		isGroup: "true",
		groupTitle: "Port State Control Inspection",
		width: fsqcShipPSCInspectionProfileTopShip.width,
		height: "30%",
		layoutMargin:10,
    	members: 
    	[
	        fsqcShipPSCInspectionProfileTopShip
    	]
    });

	isc.ListGrid.create({
		ID:"PSCInspectionDefLG", dataSource : pscInspectionDefDS,
	    autoDraw: false,
	    autoFitFieldWidths:true,
	    autoSaveEdits: false,
	    canEdit: true,
	    editOnFocus: true,
	    canSelectCells: true,
	    saveLocally: true,
	    saveByCell: false,
	    //canRemoveRecords:true,
	    //editEvent: "doubleClick",
	    editEvent: "click",
	    width:"100%",
	    overflow:"auto",
	    sortField: 0,
	    sortDirection: "ascending",
		fields: [
//	            {name: "Imono", title: "IMO NO.", canEdit: false, disabled: true,  width:80},
//	            {name: "Inspection", title: "Inspection Date", canEdit: false, disabled: true, width:80},
	            {name: "Sno", title: "No.", width:40},
	            //{name: "Def_cd", title: "Deficiency Code", width:80},
				{name: "Def_cd", title: "Deficiency Code", 	type: "select", width: 80
					, optionDataSource:"codeDefDS", 
			          valueField:"Def_cd", foreignDisplayField:"Def_des",
			          pickListFields:[
			              {name:"Def_cd"},
			              {name:"Def_des"}
			          ],
			          pickListWidth:850,
				},
	            //{name: "Def_cd_obj.Def_des", canEdit: false, disabled: true, title: "Deficiency Description", width:200},
//				{ name: "Def_cd"
//					, optionDataSource:"codeDefDS"
//					, valueField:"Def_cd"
//					, displayField:"Def_des"
//				},
	            
	            //{name: "Action", title: "Action Code", width:80},
				{name: "Action", title: "Action Code", 	type: "select", width: 80
					, optionDataSource:"codePSCActionDS", 
			          valueField:"Acr_cd", foreignDisplayField:"Act_des",
			          pickListFields:[
			              {name:"Acr_cd"},
			              {name:"Act_des"}
			          ],
			          pickListWidth:850,
				},
	            //{name: "Action_obj.Act_des", canEdit: false, disabled: true, title: "Action Description", width:200},
//				{ name: "Action"
//					, optionDataSource:"codePSCActionDS"
//					, valueField:"Acr_cd"
//					, displayField:"Act_des"
//				},
	            {name: "ISM_rel", title: "ISM Released", width:80},
	            {name: "cs_yesno", title: "Responsible RO", width:80},
	            //{name: "cs_resp", title: "RO", width:80},
				{ name: "cs_resp", title:"RO", 	type: "select", width: 80//, startRow: true
					, optionDataSource:"codeRODS", 
			          valueField:"Cs_cd", foreignDisplayField:"Cs_name",
			          pickListFields:[
			              {name:"Cs_cd"},
			              {name:"Cs_name"},
			          ],
			          pickListWidth:650,
			          optionCriteria:{
			        	  hide:"2"
			          },
				},
	            {name: "Deficiency", title: "Deficiency Details", width:200},
	            ],
	    removeRecordClick:function(rowNum) {
	    //markRecordRemoved :function(rowNum) {
	    	console.log("markRecordRemoved");
	    	PSCInspectionDefLG.endEditing();
	  		var row_record_e = PSCInspectionDefLG.getEditValues(rowNum);
	  		var row_record_r = PSCInspectionDefLG.getRecord(rowNum);
	  		if (row_record_r) {
	  			PSCInspectionDefLG.removeData(row_record_r);
	  		} else if (row_record_e) {
	  			PSCInspectionDefLG.removeData(row_record_e);
	  		}
	    	PSCInspectionDefLG.startEditing();
	    },
	    unmarkRecordRemoved :function(rowNum) {
	    	console.log("unmarkRecordRemoved");
	    }
	
	});
	
	isc.Window.create({
		ID:"fsqcShipPSCInspectionProfileWindow"
		, isModal: false
		, showModalMask: false
		, width: "80%"
		, height: "65%"
//		, layoutMargin:10
//		, autoSize: true
		, items: 
		[
	        isc.VLayout.create
	        ({
	        	members: 
	        	[
//	    	        isc.TitleLabel.create({ contents: "<p><b><font size=2px>Ship main data<br /></font></b></p>"}),
	    	        shipPSCInspectionManagement_ToolBar
	    	        , fsqcShipPSCInspectionProfileTop
	    	        //, PSCInspectionDefLG
	        	]
	        })
		],
		show:function(){
			fsqcShipPSCInspectionProfileVM.setData({});
			this.Super('show', arguments);
		}
	});
}

function open_fsqcShipPSCInspectionProfile(i_dataSource, imono, psc_record, psc_record_num){
	//Init the Forms and ListGrids

	fsqcShipPSCInspectionProfileControl(i_dataSource, imono, psc_record, psc_record_num);

	fsqcShipPSCInspectionProfileWindow.show();

	if(psc_record!=null){
		//Update record;
		console.log("psc_record");
		console.log(imono);
		fsqcShipPSCInspectionProfileVM.getField('Imono').setDisabled(true);
		var ShipPSCInspectionProfileImono = psc_record.Imono;
		var ShipPSCInspectionProfileInspection = psc_record.Inspection;
		fsqcShipPSCInspectionProfileVM.fetchData(
				{
					"Imono":ShipPSCInspectionProfileImono, 
					"Inspection":ShipPSCInspectionProfileInspection
				},function (dsResponse, data, dsRequest) {
			console.log(data[0]["serial"]);
			fsqcShipPSCInspectionProfileWindow.setTitle("(" + data[0]["Imono"] + ") " );
		});
		
		//PSCInspectionDefLG.filterData({ Imono: ShipPSCInspectionProfileImono, Inspection: ShipPSCInspectionProfileInspection});
		PSCInspectionDefLG.setData(psc_record.psc_inspection_def_list);
//		fsqcShipPSCInspectionProfileManagerVM.fetchData({"Com_cd":record.Manager_obj.Com_cd}
//			,function (dsResponse, data, dsRequest) 
//			{
//				
//			}
//		);

//		fsqcShipPSCInspectionProfileTopManager.setData(record.Manager_obj);
		enabledSection(true);

	}else{
		
		//New record;
	//fsqcShipPSCInspectionProfileVM.getField('Imono').setDisabled(true);
	fsqcShipPSCInspectionProfileVM.setValues({});
	fsqcShipPSCInspectionProfileVM.setValue('Imono', imono);
	fsqcShipPSCInspectionProfileWindow.setTitle("Create New Ship PSC Profile" + "");
	//fsqcShipPSCInspectionProfileTop.clearErrors(true);
		enabledSection(true);
	}
}


function fsqcShipPSCInspectionProfileControl_shortVer(i_dataSource, imono, psc_record, psc_record_num) {
	ship_PSCInspection_record_num = psc_record_num;
	ship_PSCInspection_imono = imono;

	isc.ValuesManager.create({
		ID : "fsqcShipPSCInspectionProfileVM",
		dataSource : i_dataSource
	});

	// isc.ValuesManager.create({
	// ID: "fsqcShipPSCInspectionProfileManagerVM",
	// dataSource: companyManagementDS
	// });

	var fsqcShipPSCInspectionProfileTopShipShort = isc.DynamicForm.create({
		ID : "fsqcShipPSCInspectionProfileTopShipShort",
		valuesManager : "fsqcShipPSCInspectionProfileVM",
		// cellBorder: 1,
		// isGroup: "true",
		// groupTitle: "Ship main data",
		width : "80%",
		numCols : 6,
		fixedColWidths : false,
		// colWidths: ["*", "*", "*", "*", "*", "*", "*", "*"],
		fields : [ {
			name : "Imono",
			canEdit : false,
			disabled : true,
			startRow : true,
			colSpan : 1
		}, {
			name : "countryname",
			canEdit : true,
			colSpan : 1,
			required : true
		}, {
			name : "Inspection",
			canEdit : true,
			colSpan : 1,
			required : true
		}, {
			name : "Detained",
			canEdit : true,
			colSpan : 1,
			required : true
		},
		// {name: "Non_Mou_Detained", canEdit: true, colSpan: 1},
		{
			name : "Port",
			canEdit : true,
			colSpan : 1,
			required : true
		},
		/*
		 * {name: "Defnums", canEdit: true, colSpan: 1}, {name: "Informdate",
		 * canEdit: true, colSpan: 1}, {name: "Release_date", canEdit: true,
		 * colSpan: 1}, {name: "IMO_informdate", canEdit: true, colSpan: 1},
		 * {name: "itemno", canEdit: true, colSpan: 1},
		 * 
		 * {name: "review_by", canEdit: true, colSpan: 1}, {name: "review_on",
		 * canEdit: true, colSpan: 1}, {name: "fsqc_request", canEdit: true,
		 * colSpan: 1}, {name: "fsqc_complete", canEdit: true, colSpan: 1},
		 * {name: "appeal", colSpan: 5,rowSpan: 3, width: "*", type:
		 * "textArea"}, {name: "warning", colSpan: 5,rowSpan: 3, width: "*",
		 * type: "textArea"}, {name: "Note", colSpan: 5,rowSpan: 3, width: "*",
		 * type: "textArea"},
		 */
		]
	});

	isc.ButtonToolbar
			.create({
				ID : "shipPSCInspectionManagement_ToolBar_Webservice",
				buttons : [

						isc.ISaveButton
								.create({
									name : "updateBtn",
									autoFit : true,
									onControl : "FSQC_ALL",
									click : function() {
										if (fsqcShipPSCInspectionProfileTopShipShort
												.validate()) {
											pscInspectionDS
													.updateData(
															fsqcShipPSCInspectionProfileTopShipShort
																	.getData(),
															function(dsResponse, data, dsRequest) {
																if (data) {
																	isc.say(saveSuccessfulMessage);
																	enabledSection(true);
																	fsqcShipPSCInspectionProfileVM
																			.setValues({});
																	fsqcShipPSCInspectionProfileVM
																			.setData({});
																	fsqcShipPSCInspectionProfileVM
																			.reset();
																	fsqcShipPSCInspectionProfileVM
																			.clearErrors(true);

																	fsqcShipPSCInspectionProfileWindowWebservice
																			.hide();
																}

															}); // save
										}
									}
								}),

						isc.IButton.create({
							name : "closeBtn",
							title : "Close",
							autoFit : true,
							click : function() {
								fsqcShipPSCInspectionProfileVM.setValues({});
								fsqcShipPSCInspectionProfileVM.setData({});
								fsqcShipPSCInspectionProfileVM.reset();
								fsqcShipPSCInspectionProfileVM
										.clearErrors(true);
								// TODO

								fsqcShipPSCInspectionProfileWindowWebservice
										.hide();
							}
						}), ]
			});

	var fsqcShipPSCInspectionProfileTop = isc.VLayout.create({
		isGroup : "true",
		groupTitle : "Port State Control Inspection",
		width : fsqcShipPSCInspectionProfileTopShipShort.width,
		height : "30%",
		layoutMargin : 10,
		members : [ fsqcShipPSCInspectionProfileTopShipShort ]
	});

	isc.ListGrid.create({
		ID : "PSCInspectionDefLG",
		dataSource : pscInspectionDefDS,
		autoDraw : false,
		autoFitFieldWidths : true,
		autoSaveEdits : false,
		canEdit : true,
		editOnFocus : true,
		canSelectCells : true,
		saveLocally : true,
		saveByCell : false,
		// canRemoveRecords:true,
		// editEvent: "doubleClick",
		editEvent : "click",
		width : "100%",
		overflow : "auto",
		sortField : 0,
		sortDirection : "ascending",
		fields : [
		// {name: "Imono", title: "IMO NO.", canEdit: false, disabled: true,
		// width:80},
		// {name: "Inspection", title: "Inspection Date", canEdit: false,
		// disabled: true, width:80},
		{
			name : "Sno",
			title : "No.",
			width : 40
		},
		// {name: "Def_cd", title: "Deficiency Code", width:80},
		{
			name : "Def_cd",
			title : "Deficiency Code",
			type : "select",
			width : 80,
			optionDataSource : "codeDefDS",
			valueField : "Def_cd",
			foreignDisplayField : "Def_des",
			pickListFields : [ {
				name : "Def_cd"
			}, {
				name : "Def_des"
			} ],
			pickListWidth : 850,
		},
		// {name: "Def_cd_obj.Def_des", canEdit: false, disabled: true, title:
		// "Deficiency Description", width:200},
		// { name: "Def_cd"
		// , optionDataSource:"codeDefDS"
		// , valueField:"Def_cd"
		// , displayField:"Def_des"
		// },

		// {name: "Action", title: "Action Code", width:80},
		{
			name : "Action",
			title : "Action Code",
			type : "select",
			width : 80,
			optionDataSource : "codePSCActionDS",
			valueField : "Acr_cd",
			foreignDisplayField : "Act_des",
			pickListFields : [ {
				name : "Acr_cd"
			}, {
				name : "Act_des"
			} ],
			pickListWidth : 850,
		},
		// {name: "Action_obj.Act_des", canEdit: false, disabled: true, title:
		// "Action Description", width:200},
		// { name: "Action"
		// , optionDataSource:"codePSCActionDS"
		// , valueField:"Acr_cd"
		// , displayField:"Act_des"
		// },
		{
			name : "ISM_rel",
			title : "ISM Released",
			width : 80
		}, {
			name : "cs_yesno",
			title : "Responsible RO",
			width : 80
		},
		// {name: "cs_resp", title: "RO", width:80},
		{
			name : "cs_resp",
			title : "RO",
			type : "select",
			width : 80// , startRow: true
			,
			optionDataSource : "codeRODS",
			valueField : "Cs_cd",
			foreignDisplayField : "Cs_name",
			pickListFields : [ {
				name : "Cs_cd"
			}, {
				name : "Cs_name"
			}, ],
			pickListWidth : 650,
		}, {
			name : "Deficiency",
			title : "Deficiency Details",
			width : 200
		}, ],
		removeRecordClick : function(rowNum) {
			// markRecordRemoved :function(rowNum) {
			console.log("markRecordRemoved");
			PSCInspectionDefLG.endEditing();
			var row_record_e = PSCInspectionDefLG.getEditValues(rowNum);
			var row_record_r = PSCInspectionDefLG.getRecord(rowNum);
			if (row_record_r) {
				PSCInspectionDefLG.removeData(row_record_r);
			} else if (row_record_e) {
				PSCInspectionDefLG.removeData(row_record_e);
			}
			PSCInspectionDefLG.startEditing();
		},
		unmarkRecordRemoved : function(rowNum) {
			console.log("unmarkRecordRemoved");
		}

	});

	isc.Window.create({
		ID : "fsqcShipPSCInspectionProfileWindowWebservice",
		isModal : false,
		showModalMask : false,
		width : "80%",
		height : "65%"
		// , layoutMargin:10
		// , autoSize: true
		,
		items : [ isc.VLayout.create({
			members : [
			// isc.TitleLabel.create({ contents: "<p><b><font size=2px>Ship main
			// data<br /></font></b></p>"}),
			shipPSCInspectionManagement_ToolBar_Webservice,
					fsqcShipPSCInspectionProfileTop
			// , PSCInspectionDefLG
			]
		}) ],
		show : function() {
			fsqcShipPSCInspectionProfileVM.setData({});
			this.Super('show', arguments);
		}
	});
}

function open_fsqcShipPSCInspectionProfile_shortVer(i_dataSource, imono, psc_record, psc_record_num) {
	// Init the Forms and ListGrids

	fsqcShipPSCInspectionProfileControl_shortVer(i_dataSource, imono,
			psc_record, psc_record_num);

	fsqcShipPSCInspectionProfileWindowWebservice.show();

	if (psc_record != null) {
		// Update record;
		console.log("psc_record");
		console.log(imono);
		fsqcShipPSCInspectionProfileVM.getField('Imono').setDisabled(true);
		var ShipPSCInspectionProfileImono = psc_record.Imono;
		var ShipPSCInspectionProfileInspection = psc_record.Inspection;
		fsqcShipPSCInspectionProfileVM.fetchData({
			"Imono" : ShipPSCInspectionProfileImono,
			"Inspection" : ShipPSCInspectionProfileInspection
		}, function(dsResponse, data, dsRequest) {
			console.log(data[0]["serial"]);
			fsqcShipPSCInspectionProfileWindowWebservice.setTitle("("
					+ data[0]["Imono"] + ") ");
		});

		// PSCInspectionDefLG.filterData({ Imono: ShipPSCInspectionProfileImono,
		// Inspection: ShipPSCInspectionProfileInspection});
		PSCInspectionDefLG.setData(psc_record.psc_inspection_def_list);
		// fsqcShipPSCInspectionProfileManagerVM.fetchData({"Com_cd":record.Manager_obj.Com_cd}
		// ,function (dsResponse, data, dsRequest)
		// {
		//				
		// }
		// );

		// fsqcShipPSCInspectionProfileTopManager.setData(record.Manager_obj);
		enabledSection(true);

	} else {

		// New record;
		// fsqcShipPSCInspectionProfileVM.getField('Imono').setDisabled(true);
		fsqcShipPSCInspectionProfileVM.setValues({});
		fsqcShipPSCInspectionProfileVM.setValue('Imono', imono);
		fsqcShipPSCInspectionProfileWindowWebservice
				.setTitle("Create New Ship PSC Profile" + "");
		// fsqcShipPSCInspectionProfileTop.clearErrors(true);
		enabledSection(true);
	}
}