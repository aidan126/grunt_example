
//var count = 0;
//var count2 = 0;

function getFsqcShipProfileIncidentParticularsTab(i_dataSource, i_valuesManager, record){

	var ship_inciednt_imono = record.Imono.trim();

//-------------------------------Update from MAIS Window------------------------------------------------------------

	isc.IButton.create({
		  ID:"updateFromMAISBtn2",
		  width:150,
		  align:"center",
		  layoutLeftMargin:150,
		  title:"Update to FSQC",
		  click:function(){

			  var incidentarr = [];

			  for (j = 0; j < incidentListGrid.getTotalRows(); j++) {
				  incidentarr.add(incidentListGrid.getRecord(j).mais_incident_id);
			  }

			  for (i = 0; i < updateFromMAISGrid.getTotalRows(); i++) {
				  //console.log(updateFromMAISGrid.getRecord(i).incident_id);

				  if( !incidentarr.contains(updateFromMAISGrid.getRecord(i).incident_id) ){

					  var newIncidentRecord = {};
					  newIncidentRecord['Imono'] = ship_inciednt_imono;
					  newIncidentRecord['Incidentdate'] = updateFromMAISGrid.getRecord(i).incident_time;
					  newIncidentRecord['mais_incident_id'] = updateFromMAISGrid.getRecord(i).incident_id;
					  newIncidentRecord['Details'] = updateFromMAISGrid.getRecord(i).Case_title;
					  newIncidentRecord['Owner_Rdate'] = updateFromMAISGrid.getRecord(i).accident_reported_time;
					  newIncidentRecord['wou_number'] = updateFromMAISGrid.getRecord(i).wounded_number;
					  newIncidentRecord['Fatalities'] = updateFromMAISGrid.getRecord(i).fatality_number;
					  newIncidentRecord['Pollution'] = updateFromMAISGrid.getRecord(i).reported_pollution;
					  newIncidentRecord['Incidenttype'] = updateFromMAISGrid.getRecord(i).incident_type;

					  incidentDS.addData(newIncidentRecord, function(dsResponse, data, dsRequest){
						  if(dsResponse.status==0){
							  isc.say("Update Successfully.");
						  }

						  incidentListGrid.refreshData();
					  });

				  }else{
					  isc.say("No incident required to update.");
				  }
			  }
		  }
	});
	isc.IButton.create({
		  ID:"closeUpdateFromMAISBtn",
		  width:90,
		  align:"center",
		  layoutLeftMargin:150,
		  title:"Close",
		  click:function(){
			  updateFromMAISWindow.hide();
		  }
	});
    isc.HLayout.create({
    	ID:"updateFromMAISBtnBar",
    	width:980,
    	height:1,
    	//layoutTopMargin:10,
    	defaultLayoutAlign:"right",
    	align:"right",
    	showEdges: false,
    	membersMargin:5,
    	members:[updateFromMAISBtn2, closeUpdateFromMAISBtn]
    });
	isc.ListGrid.create({
		  ID: "updateFromMAISGrid",
		  dataSource: mAISvFsqcExportIncidentsDS,
	    //valuesManager:valueMan,
		  width:"980",
		  height:200,
		  autoFetchData: true,
		  autoFitFieldWidths:false,
		  canEdit: false,
		  editOnFocus: true,
		  canSelectCells: false,
		  canRemoveRecords:false,
		  autoSaveEdits: true,
		  saveLocally: true,
		  saveByCell: true,
		  editEvent: "click",
		  showFilterEditor:false,
		  showAllRecords:true,
		  layoutTopMargin:10,
		  isGroup: true,
		  groupTitle: "Incident from MAIS",
		  fields:[
		      {name:"imo_no", title:"ID", hidden:true, canEdit:false},
		      {name:"incident_time", title:"Incident Date (dd/mm/yyyy)", width:130},
		      {name:"accident_reported_time", title:"Accident Reported Date", width:130},
		      {name:"In_HK_Water", title:"Incident Location", width:150},
		      {name:"incident_type", title:"Type of Incident", width:290},
		      {name:"wounded_number", title:"Wounded Number", width:100},
		      {name:"fatality_number", title:"Fatality Number", width:100},
		      {name:"missing_person_count", title:"Missing Person Count", width:100},
		      {name:"reported_pollution", title:"Reported Pollution", width:100},
		      {name:"severe_pollution", title:"Severe Pollution", width:100},
		  ],
		  sortField: 0,
		  sortDirection: "ascending",
		  rowClick:function(record, recordNum, fieldNum){
			  updateFromMAISForm.setValues(record);
		  }
	});

	updateFromMAISGrid.fetchData({imo_no:ship_inciednt_imono});

	isc.DynamicForm.create({
	  	ID: "updateFromMAISForm",
	      dataSource: mAISvFsqcExportIncidentsDS,
	      overflow:"auto",
	      showRollOver: true,
	      height: 420,
	      width: 980,
	      align:"center",
	      defaultLayoutAlign: "center",
	      autoSize:true,
	      autoFetchData: false,
	      autoSaveEdits: false,
	      autoCenter: true,
	      canEdit: false,
	      editOnFocus: true,
	      canSelectCells: false,
	      dataPageSize: 20,
		  layoutAlign:"center",
	      canRemoveRecords:false,
	      saveLocally: false,
	      saveByCell: false,
	      border:"1px solid grey", padding:5, spacing:5,
	      numCols: 4,
	      //editEvent: "doubleClick",
	      editEvent: "click",
	      layoutTopMargin:10,
	      isGroup: true,
	      groupTitle: "MAIS Incident Particulars",
	      fields: [
	 		      {name:"imo_no", title:"IMONo.:", hidden:false, canEdit:false, width:200},
	 		      {name:"incident_type", title:"Incident Type:", width:200},
			      {name:"incident_time", title:"Incident Date (dd/mm/yyyy):", width:200},
			      {name:"accident_reported_time", title:"Accident Reported Date:", width:200},
			      {name:"incident_brief", title:"Incident Description:", type:"textarea", colSpan:"4",  width:600},
			      {name:"In_HK_Water", title:"Incident Location:", width:200},
			      {name:"Coordinate", title:"Coordinate:", width:200},
			      {name:"HK_Water_Remarks", title:"HK Water Remarks:", type:"textarea", colSpan:"4",  width:600},
			      {name:"wounded_number", title:"Wounded Number", width:200},
			      {name:"reported_pollution", title:"Reported Pollution", width:200},
			      {name:"severe_pollution", title:"Severe Pollution", width:200},
			      {name:"fatality_number", title:"Fatality Number", width:200},
			      {name:"missing_person_count", title:"Missing Person Count", width:200},
	      ]
	});
	isc.DynamicForm.create({
	  	ID: "updateFromMAISWeatherForm",
	      dataSource: mAISvFsqcExportIncidentsDS,
	      overflow:"auto",
	      showRollOver: true,
	      height: 155,
	      width: 980,
	      align:"center",
	      defaultLayoutAlign: "center",
	      autoSize:true,
	      autoFetchData: false,
	      autoSaveEdits: false,
	      autoCenter: true,
	      canEdit: false,
	      editOnFocus: true,
	      canSelectCells: false,
	      dataPageSize: 20,
		  layoutAlign:"center",
	      canRemoveRecords:false,
	      saveLocally: false,
	      saveByCell: false,
	      border:"1px solid grey", padding:5, spacing:5,
	      numCols: 4,
	      //editEvent: "doubleClick",
	      editEvent: "click",
	      layoutTopMargin:10,
	      isGroup: true,
	      groupTitle: "Weather",
	      fields: [
	 		      {name:"weather_Visibility", title:"Weather Visibility:", hidden:false, canEdit:false, width:200},
	 		      {name:"weather_Current", title:"Weather Current:", width:200},
			      {name:"weather_Natural_Light", title:"Incident Date:", width:200},
			      {name:"weather_Typhoon_Signal", title:"Weather Typhoon Signal:", width:200},
			      {name:"weather_Sea_Condition", title:"Weather Sea Condition:", width:200},
			      {name:"weather_Weather_Condition", title:"Weather Weather Condition:", width:200},
			      {name:"weather_Wind_Force", title:"Weather Wind Force", width:200},
	      ]
	});

	isc.VLayout.create({
		  ID:"updateFromMAISVPane",
		  //width: 100,
		  height:1,
		  //layoutTopMargin:10,
		  defaultLayoutAlign: "center",
		  showEdges: false,
		  membersMargin:5, members:[updateFromMAISBtnBar, updateFromMAISGrid, updateFromMAISForm, updateFromMAISWeatherForm]
	});

	isc.Window.create({
		  ID: "updateFromMAISWindow",
		  title: "Update Incident from MAIS",
		  height: 853,
		  width: 1000,
		  autoSize:true,
		  align:"center",
		  autoCenter: true,
		  //isModal: true,
		  showModalMask: true,
		  autoDraw: false,
		  closeClick : function(){
			  updateFromMAISWindow.hide();
		  },
		  items: [
		      	isc.HLayout.create({
		    		ID:"updateFromMAISHPane",
		    		width:"395",
		    		height:1,
		    		//layoutTopMargin:10,
		    		align:"center",
		    		layoutAlign:"center",
		    		defaultLayoutAlign: "center",
		    		layoutTopMargin:0,
		    		//showEdges: true,
		    		membersMargin:5,
		    		members:[updateFromMAISVPane]
		    	})
		  ]
	});

//---------------------------------------------------------------------------------------------------------

//---------------------------------Main Page-------------------------------------------------------------------
	isc.ListGrid.create({
		  ID: "incidentListGrid",
		  dataSource: incidentDS,
	      //valuesManager:valueMan,
		  width:"100%",
		  height:"380",
		  autoFetchData: false,
		  autoFitFieldWidths:false,
		  canEdit: false,
		  editOnFocus: true,
		  canSelectCells: false,
		  canRemoveRecords:false,
		  autoSaveEdits: true,
		  saveLocally: true,
		  saveByCell: true,
		  editEvent: "click",
		  showFilterEditor:false,
		  showAllRecords:true,
		  fields:[
		      {name:"Imono", title:"ID", hidden:true, canEdit:false},
		      {name:"Incidentdate", title:"Incident Date (dd/mm/yyyy)", align:"left", width:200},
		      {name:"Port", title:"Incident Port", width:480},
		      {name:"Fatalities", title:"Fatality Number", width:180},
		      {name:"wou_number", title:"Wounded Number", width:180},
		  ],
		  sortField: 0,
		  sortDirection: "ascending",
		  rowDoubleClick:function(record, recordNum, fieldNum){
			  incidentFormWindow.show();
			  incidentForm.clearValues();
			  incidentForm.setValues(record);
		  }
	});

	incidentListGrid.fetchData({Imono:ship_inciednt_imono});

	isc.IButton.create({
		  ID:"addIncidentBtn",
		  width:150,
		  align:"center",
		  onControl:"FSQC_ALL||FSQCSHIP_WRITE_INCIDENT",
		  layoutLeftMargin:150,
		  title:"Add",
		  click:function(){

			  incidentFormWindow.show();
			  incidentForm.clearValues();
			  incidentForm.setValue("Imono", ship_inciednt_imono );
		  }
	});
	isc.IButton.create({
		  ID:"updateFromMAISBtn",
		  width:150,
		  align:"center",
		  onControl:"FSQC_ALL||FSQCSHIP_WRITE_INCIDENT",
		  layoutLeftMargin:150,
		  title:"Update from MAIS",
		  click:function(){
			  updateFromMAISWindow.show();
		  }
	});
    isc.VLayout.create({
    	ID:"incidentLeftBtnBar",
    	width:"10%",
    	//layoutTopMargin:10,
    	align:"center",
    	defaultLayoutAlign: "center",
    	//showEdges: true,
    	membersMargin:5,
    	members:[addIncidentBtn, updateFromMAISBtn]
    });

    isc.HLayout.create({
    	ID:"incidentGroup",
    	width:"100%",
    	height:"100%",
    	//layoutTopMargin:10,
    	defaultLayoutAlign:"center",
    	align:"center",
    	showEdges: false,
    	membersMargin:5,
	    layoutTopMargin:10,
	    isGroup: true,
	    groupTitle: "Incident",
    	members:[incidentListGrid, incidentLeftBtnBar]
    });
	isc.IButton.create({
		  ID:"compareIncidentBtn",
		  width:300,
		  align:"center",
		  onControl:"FSQC_ALL||FSQCSHIP_WRITE_INCIDENT",
		  layoutLeftMargin:150,
		  title:"Incident Data Compared with MAIS",
		  click:function(){
			  comparedWithMAISWindow.show();
			  //comparedWithMAISGrid.setFieldTitle(0, 'Imono')


			  mAISIncidentsReturnDS.fetchData(null,
					function(dsResponse, data, dsRequest){
				  
				  			//comparedWithMAISGrid.setData([]);

				  			//for(i=0; i < data.length; i++){
				  				//comparedWithMAISGrid.setEditValues(i, {});
				  			//}

				  			comparedWithMAISGrid.setData(data);
				  			
				  			/*				  			
				  			for(i=0; i < data.length; i++){

					  			comparedWithMAISGrid.setEditValue(i, 0, data[i][0]);
					  			comparedWithMAISGrid.setEditValue(i, 1, data[i][1]);
					  			comparedWithMAISGrid.setEditValue(i, 2, data[i][2]);
					  			comparedWithMAISGrid.setEditValue(i, 3, data[i][3]);
				  			}

				  			for(i=0; i < data.length; i++){
					  			comparedWithMAISGrid.setEditValue(i, 0, data[i][0]);
					  			comparedWithMAISGrid.setEditValue(i, 3, data[i][1]);

					  			mAISvFsqcExportIncidentsDS.fetchData({"imo_no":data[i][0]},
										function(dsResponse, data3, dsRequest){
								  			if(dsResponse.status==0){
								  				comparedWithMAISGrid.setEditValue(count, 1, data3[0].vessel_en_name);
								  				count = count + 1;

									  			//console.log(data3[0].vessel_en_name);

								  				incidentDS.fetchData({"Imono":data3[0].imo_no},
														function(dsResponse, data2, dsRequest){
														  	if(dsResponse.status==0){
														  		comparedWithMAISGrid.setEditValue(count2, 2, data2.length);
														  		count2 = count2 + 1;
														  	}
														}
												);
								  			}
					  					}
					  			);
					  			incidentDS.fetchData({"Imono":data[i][0]},
										function(dsResponse, data2, dsRequest){
										  	if(dsResponse.status==0){
										  		comparedWithMAISGrid.setEditValue(count, 2, data2.length);

										  	}
										}
								);

				  			}*/

			  		},{operationId:"FIND_DEDUPICATED_INCIDENT"}
			  );

			  //count = 0;
			  //count2 = 0;
		  }
	});
    isc.HLayout.create({
    	ID:"compareIncidentGroup",
    	width:"100%",
    	//layoutTopMargin:10,
    	defaultLayoutAlign:"right",
    	align:"right",
    	showEdges: false,
    	membersMargin:0,
    	members:[compareIncidentBtn]
    });

	isc.ListGrid.create({
		  ID: "mAISvFsqcExportIncidentsGrid",
		  dataSource: mAISvFsqcExportIncidentsDS,
	      //valuesManager:valueMan,
		  width:"100%",
		  height:240,
		  autoFetchData: true,
		  autoFitFieldWidths:false,
		  canEdit: false,
		  editOnFocus: true,
		  canSelectCells: false,
		  canRemoveRecords:false,
		  autoSaveEdits: true,
		  saveLocally: true,
		  saveByCell: true,
		  editEvent: "click",
		  showFilterEditor:false,
		  showAllRecords:true,
	      layoutTopMargin:10,
	      isGroup: true,
	      groupTitle: "Incident from MAIS",

		  fields:[
		      {name:"imo_no", title:"ID", hidden:true, canEdit:false},
		      {name:"incident_time", title:"Incident Date", width:130},
		      {name:"accident_reported_time", title:"Accident Reported Date", width:130},
		      {name:"In_HK_Water", title:"Incident Location", width:150},
		      {name:"incident_type", title:"Type of Incident", width:290},
		      {name:"wounded_number", title:"Wounded Number", width:100},
		      {name:"fatality_number", title:"Fatality Number", width:100},
		      {name:"missing_person_count", title:"Missing Person Count", width:100},
		      {name:"reported_pollution", title:"Reported Pollution", width:100},
		      {name:"severe_pollution", title:"Severe Pollution", width:100},
		  ],
		  sortField: 0,
		  sortDirection: "ascending",
		  rowDoubleClick:function(record, recordNum, fieldNum){
			  maisIncidentFormWindow.show();
			  maisIncidentForm.clearValues();
			  maisIncidentForm.setValues(record);
		  }
	});
	mAISvFsqcExportIncidentsGrid.fetchData({imo_no:ship_inciednt_imono});

	isc.VLayout.create
    ({
	    ID:"fsqcShipIncidentParticularsTab",
	    width:"100%",
    	members:
    	[incidentGroup, compareIncidentGroup, mAISvFsqcExportIncidentsGrid]
    })

    return 	{
	    title: "Incident Particulars",
	    pane: fsqcShipIncidentParticularsTab
	};
}
//---------------------------------------------------------------------------------------------------------

var unsaveFlag = true;

//-------------------------------Incident Window------------------------------------------------------------
isc.IButton.create({
	  ID:"outputTemplateBtn",
	  width:150,
	  align:"center",
	  layoutLeftMargin:150,
	  title:"Output Template",
	  click:function(){
	  }
});
isc.IButton.create({
	  ID:"importFromExcelBtn",
	  width:150,
	  align:"center",
	  layoutLeftMargin:150,
	  title:"Import From Excel",
	  click:function(){
	  }
});
isc.IButton.create({
	  ID:"saveIncidentFormBtn",
	  width:90,
	  align:"center",
	  layoutLeftMargin:150,
	  title:"Save",
	  click:function(){
		  incidentForm.saveData(function (dsResponse, data, dsRequest) {
			  if(dsResponse.status==0){
				  isc.say("Save Successfully.");
				  unsaveFlag = false;
				  incidentListGrid.refreshData();
			  }
		  });
	  }
});
isc.IButton.create({
	  ID:"closeIncidentFormBtn",
	  width:90,
	  align:"center",
	  layoutLeftMargin:150,
	  title:"Close",
	  click:function(){
		  if(unsaveFlag && incidentForm.valuesHaveChanged() ){

			  isc.ask("Edited content(s) is/are not saved. Are you sure to close?", function (value){
				  if (value){
					  incidentFormWindow.hide();
				  }
			  });

		  }else{
			  incidentFormWindow.hide();
		  }
	  }
});
isc.HLayout.create({
	ID:"incidentFormLeftBtnBar",
	width:"390",
	height:1,
	//layoutTopMargin:10,
	align:"left",
	layoutAlign:"left",
	defaultLayoutAlign: "left",
	layoutTopMargin:5,
	//showEdges: true,
	membersMargin:5,
	members:[outputTemplateBtn, importFromExcelBtn]
});
isc.HLayout.create({
	ID:"incidentFormRightBtnBar",
	width:"780",
	height:1,
	//layoutTopMargin:10,
	align:"right",
	layoutAlign:"right",
	defaultLayoutAlign: "right",
    layoutTopMargin:5,
	//showEdges: true,
	membersMargin:5,
	members:[saveIncidentFormBtn, closeIncidentFormBtn]
});
isc.HLayout.create({
	ID:"incidentFormBtnBar",
	width:"100%",
	height:1,
	//layoutTopMargin:10,
	align:"center",
	defaultLayoutAlign: "center",
	//showEdges: true,
	membersMargin:5,
	members:[incidentFormRightBtnBar]
	//members:[incidentFormLeftBtnBar, incidentFormRightBtnBar]
});
isc.DynamicForm.create({
  	  ID: "incidentForm",
      dataSource: incidentDS,
      overflow:"auto",
      showRollOver: true,
      height: 475,
      width: 780,
      align:"center",
      defaultLayoutAlign: "center",
      autoSize:true,
      autoFetchData: false,
      autoSaveEdits: false,
      autoCenter: true,
      canEdit: true,
      editOnFocus: true,
      canSelectCells: false,
      dataPageSize: 20,
	  layoutAlign:"center",
      canRemoveRecords:false,
      saveLocally: false,
      saveByCell: false,
      border:"1px solid grey", padding:10, spacing:10,
      numCols: 4,
      //editEvent: "doubleClick",
      editEvent: "click",
      layoutTopMargin:10,
      isGroup: true,
      groupTitle: "Incident Particulars",
      fields: [
          {name:"Imono", title:"IMO No.:", type:"staticText", required:true},
    	  //{name:"Imono", title:"IMO No.:", required:true},
          {name:"Sno", title:"Sno:", hidden:true},
          {name:"Incidentdate", title:"Incident Date:", type:"datetime", required:true , width:200},
          {name:"Port", title:"Incident Port:", width:200},
          {name:"wou_number", title:"Wounded Number:", width:200},
          {name:"Environment", title:"Environment Location:", type:"select", optionDataSource:"Env_CodeDS", valueField:"id", displayField:"Envloc_des", width:200},
          {name:"Fatalities", title:"Number of Fatality:", width:200},
          {name:"Weather", title:"Weather:", type:"select", optionDataSource:"Weather_CodeDS", valueField:"id", displayField:"Weather_des", width:200},
          {name:"S_info", title:"Source of Information:", width:200, optionDataSource:"sourceCodeDS", valueField:"Sour_cd", displayField:"Sour_name"},
          {name:"Extemal", title:"External Object Affected:", type:"select", optionDataSource:"Ext_CodeDS", valueField:"id", displayField:"Extobj_des", width:200},
          {name:"Operations", title:"Operation:", width:200},
          {name:"Incidenttype", title:"Incident Type:", type:"select", optionDataSource:"Incident_CodeDS", valueField:"id", displayField:"Inctyp_des", width:200},
          {name:"Pollution", title:"Pollution Type:", type:"select", optionDataSource:"PoL_CodeDS", valueField:"id", displayField:"Poltyp_des", width:200},
          {name:"cr_resp", title:"Crew Responsibility:", width:200},
          {name:"Owner_Rdate", title:"Incident Reported Date:", width:200},
          {name:"com_resp", title:"Company Responsibility:", colSpan:4, width:200},

          {name:"Spaces", title:"Damage Extent:", type:"textarea", height:70, width:585, colSpan:4},
          {name:"Details", title:"Incident Description:", type:"textarea", height:70, width:585, colSpan:4},
          {name:"Note", title:"Note:", type:"textarea", width:585, height:70, colSpan:4},
      ]
});
isc.HLayout.create({
	ID:"incidentFormGroup",
	width:"100%",
	height:1,
	//layoutTopMargin:10,
	align:"center",
	defaultLayoutAlign: "center",
	//showEdges: true,
	membersMargin:5,
	members:[incidentForm]
});
isc.VLayout.create({
	  ID:"incidentFormVPane",
	  //width: 100,
	  height:1,
	  //layoutTopMargin:10,
	  defaultLayoutAlign: "center",
	  showEdges: false,
	  membersMargin:10, members:[incidentFormBtnBar, incidentFormGroup]
});
isc.Window.create({
	  ID: "incidentFormWindow",
	  title: "Incident Particulars",
      height: 555,
      width: 800,
	  autoSize:true,
	  autoCenter: true,
	  isModal: true,
	  showModalMask: true,
	  autoDraw: false,
	  closeClick : function(){
		  if(unsaveFlag && incidentForm.valuesHaveChanged() ){

			  isc.ask("Edited content(s) is/are not saved. Are you sure to close?", function (value){
				  if (value){
					  incidentFormWindow.hide();
				  }
			  });

		  }else{
			  incidentFormWindow.hide();
		  }
	  },
	  items: [
	      	isc.HLayout.create({
	    		ID:"incidentFormHGroup",
	    		width:"100%",
	    		height:1,
	    		//layoutTopMargin:10,
	    		align:"center",
	    		defaultLayoutAlign: "center",
	    		//showEdges: true,
	    		membersMargin:5,
	    		members:[incidentFormVPane]
	    	})
	  ]
});
//---------------------------------------------------------------------------------------------------------

//---------------------------------------Incident from MAIS Window---------------------------------------------------------------
isc.DynamicForm.create({
  	ID: "maisIncidentForm",
      dataSource: mAISvFsqcExportIncidentsDS,
      overflow:"auto",
      showRollOver: true,
      height: 420,
      width: 780,
      align:"center",
      defaultLayoutAlign: "center",
      autoSize:true,
      autoFetchData: false,
      autoSaveEdits: false,
      autoCenter: true,
      canEdit: false,
      editOnFocus: true,
      canSelectCells: false,
      dataPageSize: 20,
	  layoutAlign:"center",
      canRemoveRecords:false,
      saveLocally: false,
      saveByCell: false,
      border:"1px solid grey", padding:5, spacing:5,
      numCols: 4,
      //editEvent: "doubleClick",
      editEvent: "click",
      layoutTopMargin:10,
      isGroup: true,
      groupTitle: "MAIS Incident Particulars",
      fields: [
 		      {name:"imo_no", title:"IMONo.:", hidden:false, canEdit:false, width:200},
 		      {name:"incident_type", title:"Incident Type:", width:200},
		      {name:"incident_time", title:"Incident Date:", width:200},
		      {name:"accident_reported_time", title:"Accident Reported Date:", width:200},
		      {name:"incident_brief", title:"Incident Description:", type:"textarea", colSpan:"4",  width:600},
		      {name:"In_HK_Water", title:"Incident Location:", width:200},
		      {name:"Coordinate", title:"Coordinate:", width:200},
		      {name:"HK_Water_Remarks", title:"HK Water Remarks:", type:"textarea", colSpan:"4",  width:600},
		      {name:"wounded_number", title:"Wounded Number", width:200},
		      {name:"reported_pollution", title:"Reported Pollution", width:200},
		      {name:"severe_pollution", title:"Severe Pollution", width:200},
		      {name:"fatality_number", title:"Fatality Number", width:200},
		      {name:"missing_person_count", title:"Missing Person Count", width:200},
      ]
});
isc.DynamicForm.create({
  	ID: "maisWeatherForm",
      dataSource: mAISvFsqcExportIncidentsDS,
      overflow:"auto",
      showRollOver: true,
      height: 155,
      width: 780,
      align:"center",
      defaultLayoutAlign: "center",
      autoSize:true,
      autoFetchData: false,
      autoSaveEdits: false,
      autoCenter: true,
      canEdit: false,
      editOnFocus: true,
      canSelectCells: false,
      dataPageSize: 20,
	  layoutAlign:"center",
      canRemoveRecords:false,
      saveLocally: false,
      saveByCell: false,
      border:"1px solid grey", padding:5, spacing:5,
      numCols: 4,
      //editEvent: "doubleClick",
      editEvent: "click",
      layoutTopMargin:10,
      isGroup: true,
      groupTitle: "Weather",
      fields: [
 		      {name:"weather_Visibility", title:"Weather Visibility:", hidden:false, canEdit:false, width:200},
 		      {name:"weather_Current", title:"Weather Current:", width:200},
		      {name:"weather_Natural_Light", title:"Incident Date:", width:200},
		      {name:"weather_Typhoon_Signal", title:"Weather Typhoon Signal:", width:200},
		      {name:"weather_Sea_Condition", title:"Weather Sea Condition:", width:200},
		      {name:"weather_Weather_Condition", title:"Weather Weather Condition:", width:200},
		      {name:"weather_Wind_Force", title:"Weather Wind Force", width:200},
      ]
});
isc.IButton.create({
	  ID:"close2MaisIncidentFormBtn",
	  width:90,
	  align:"center",
	  layoutLeftMargin:150,
	  title:"Close",
	  click:function(){
		  maisIncidentFormWindow.hide();
	  }
});
isc.HLayout.create({
	ID:"maisIncidentFormBtnBar",
	width:"395",
	height:1,
	//layoutTopMargin:10,
	align:"right",
	layoutAlign:"right",
	defaultLayoutAlign: "right",
	layoutTopMargin:1,
	//showEdges: true,
	membersMargin:0,
	members:[close2MaisIncidentFormBtn]
});
isc.VLayout.create({
	  ID:"maisIncidentFormVPane",
	  //width: 100,
	  height:1,
	  //layoutTopMargin:10,
	  align:"center",
	  defaultLayoutAlign: "center",
	  showEdges: false,
	  membersMargin:0, members:[maisIncidentFormBtnBar, maisIncidentForm, maisWeatherForm]
});
isc.Window.create({
	  ID: "maisIncidentFormWindow",
	  title: "MAIS Incident Particulars",
      height: 640,
      width: 800,
	  autoSize:true,
	  align:"center",
	  autoCenter: true,
	  isModal: true,
	  showModalMask: true,
	  autoDraw: false,
	  closeClick : function(){
		  maisIncidentFormWindow.hide();
	  },
	  items: [
	      	isc.HLayout.create({
	    		ID:"maisIncidentFormHPane",
	    		width:"395",
	    		height:1,
	    		//layoutTopMargin:10,
	    		align:"center",
	    		layoutAlign:"center",
	    		defaultLayoutAlign: "center",
	    		layoutTopMargin:0,
	    		//showEdges: true,
	    		membersMargin:0,
	    		members:[maisIncidentFormVPane]
	    	})
	  ]
});
//---------------------------------------------------------------------------------------------------------
//-------------------------------Incident Data Compared with MAIS Window------------------------------------------------------------

isc.ListGrid.create({
	  ID: "comparedWithMAISGrid",
	  dataSource: mAISIncidentsReturnDS,
	  //dataSource: mAISvFsqcExportIncidentsDS,
  //valuesManager:valueMan,
	  width:"780",
	  height:580,
	  autoFetchData: false,
	  autoFitFieldWidths:false,
	  canEdit: false,
	  editOnFocus: true,
	  canSelectCells: false,
	  canRemoveRecords:false,
	  canGroupBy:true,
	  autoSaveEdits: true,
	  saveLocally: true,
	  saveByCell: true,
	  editEvent: "click",
	  showFilterEditor:false,
	  showAllRecords:true,
	  layoutTopMargin:10,
// start jacky
//	  dataFetchMode: "paged",
//	  sortField: "imo_no",
//	  sortDirection: "ascending",
//	  preventDuplicates : true,
// end jacky
	  //isGroup: true,
	  //groupTitle: "Incident from MAIS",
	  fields:[
	      {name:"imo_no", title:"Imono", hidden:false, canEdit:true},
	      {name:"vessel_en_name", title:"SPName", width:300,

				//formatCellValue: function(value, record, rowNum, colNum) {

					//return incidentListGrid.getSelectedRecord().Incidentdate;
					//comparedWithMAISGrid.setEditValue(rowNum, colNum, record.vessel_en_name);

					//comparedWithIncidentGrid.getTotalRows();
					//return comparedWithIncidentGrid.getTotalRows();

/*					incidentDS.fetchData({"Imono":record.imo_no},
						function(dsResponse, data, dsRequest){
						  	if(dsResponse.status==0){
						  		comparedWithMAISGrid.setEditValue(rowNum, 2, data.length);
						  	}
						}
					);

					mAISvFsqcExportIncidentsDS.fetchData({"imo_no":record.imo_no},
						function(dsResponse, data, dsRequest){
							  if(dsResponse.status==0){
								  comparedWithMAISGrid.setEditValue(rowNum, 3, data.length);
							  }
						}
					);
*/
					//return record.vessel_en_name;
	            //}
	      },

	      //{name:"fsqc_incident_no", title:"FQSC Incident No.", width:148},
	      //{name:"mais_incident_no", title:"MAIS Incident No.", width:148},
	      
	      {name:"incident_no", title:"FQSC Incident No.", width:148},
	      {name:"mais_incident_no", title:"MAIS Incident No.", width:148},
	  ],
// Start jacky comment
	  //groupStartOpen:"none",
	  //canCollapseGroup:true,
	  //collapseGroupOnRowClick:false,
	  //showGroupSummaryInHeader:true,
	  //showCollapsedGroupSummary:true,
	  //showGroupSummary:true,
	  //showGroupTitleColumn:true,
	  //showGroupTitleInFrozenBody:true,
	  //groupByField:'imo_no',
// end jacky comment
	  //dataPageSize:1,
	  //sortField:0,
	  //sortDirection: "ascending",
	  rowDoubleClick:function(record, recordNum, fieldNum){

		  fsqcShipDS.fetchData({Imono:this.getEditedRecord(recordNum).imo_no},
				function(dsResponse, data, dsRequest){
			  		if(data.length > 0){
			  			open_fsqcShipProfile(fsqcShipDS, {Imono:comparedWithMAISGrid.getEditedRecord(recordNum).imo_no});
			  			comparedWithMAISGrid.setData([]);
			  			comparedWithMAISWindow.hide();
			  		}else{
			  			isc.say("Selected Imono is invalid.");
			  		}
		  		}
		  );
		  
	  }
});

isc.IButton.create({
	  ID:"refreshMaisIncidentFormBtn",
	  autoFetchData:false,
	  width:90,
	  align:"center",
	  layoutLeftMargin:150,
	  title:"Refresh",
	  click:function(){

/*		  comparedWithMAISGrid.refreshData(
				function(dsResponse, data, dsRequest){
					if(dsResponse.status==0){
						  isc.say("Refresh Successfully.");
					}
				}
		  );
*/
		  comparedWithMAISGrid.setData([]);
		  
		  mAISIncidentsReturnDS.fetchData(null,
					function(dsResponse, data, dsRequest){

				  			comparedWithMAISGrid.setData(data);

			  		},{operationId:"FIND_DEDUPICATED_INCIDENT"}
		  );
		  
	  }
});
isc.IExportButton.create({
	  ID:"exportMaisIncidentFormBtn",
	  width:90,
	  align:"center",
	  layoutLeftMargin:150,
	  title:"Export",
	  icon: "demand.png",
	  autoDraw: true,
	  //listGrid: comparedWithMAISGrid,
	  click:function(){
			var exportFieldsTmp = null;
			var exportHeaderlessTmp = false;
			comparedWithMAISGrid.exportClientData(comparedWithMAISGrid.getRecord(0), {ignoreTimeout:true, "endRow":-1, exportAs:"xls", exportFilename:"num_results.xls"});
	  }
});
isc.IButton.create({
	  ID:"closeMaisIncidentFormBtn",
	  width:90,
	  align:"center",
	  layoutLeftMargin:150,
	  title:"Close",
	  click:function(){
		  comparedWithMAISGrid.setData([]);
		  comparedWithMAISWindow.hide();
	  }
});
isc.HLayout.create({
	ID:"comparedWithMAISBtnBar",
	width:"395",
	height:1,
	//layoutTopMargin:10,
	align:"right",
	layoutAlign:"right",
	defaultLayoutAlign: "right",
	layoutTopMargin:1,
	//showEdges: true,
	membersMargin:10,
	members:[refreshMaisIncidentFormBtn, exportMaisIncidentFormBtn, closeMaisIncidentFormBtn]
});
isc.VLayout.create({
	  ID:"comparedWithMAISVPane",
	  //width: 100,
	  height:1,
	  //layoutTopMargin:10,
	  align:"center",
	  defaultLayoutAlign: "center",
	  showEdges: false,
	  membersMargin:10, members:[comparedWithMAISGrid, comparedWithMAISBtnBar]
});
isc.Window.create({
	  ID: "comparedWithMAISWindow",
	  title: "Incident Data Compared with MAIS",
    height: 655,
    width: 800,
	  autoSize:true,
	  align:"center",
	  autoCenter: true,
	  isModal: true,
	  showModalMask: true,
	  autoDraw: false,
	  closeClick : function(){
		  comparedWithMAISWindow.hide();
	  },
	  items: [
	      	isc.HLayout.create({
	    		ID:"comparedWithMAISHPane",
	    		width:"395",
	    		height:1,
	    		//layoutTopMargin:10,
	    		align:"center",
	    		layoutAlign:"center",
	    		defaultLayoutAlign: "center",
	    		layoutTopMargin:0,
	    		//showEdges: true,
	    		membersMargin:0,
	    		members:[comparedWithMAISVPane]
	    	})
	  ]
});


//---------------------------------------------------------------------------------------------------------
