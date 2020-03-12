	var saveAlarmSetBtn = isc.IButton.create({
		width:150,
		align:"center",
		title: "Save",
		onControl:"FSQC_ALL||EXEMPT_EMAIL_MODE_WRITE",
		click: function(){

/*			var EditedRecord = alarmSetListGrid.getAllEditRows();

	        for (i = 0; i < EditedRecord.length; i++) {
	        	if(if_test == 1){
		        	ecertAlarmSetDS.updateData(alarmSetListGrid.getRecord( EditedRecord[i] )); //save
	        	}
	        }

	        EditedRecord = [];
*/
			var selectedRecord = alarmSetForm.getValue('if_test');
        	if(alarmSetForm.getValue('if_test') == 0){
    			alarmSetForm.saveData(function(dsResponse, data, dsRequest){
    				if (dsResponse.status == 0){
        				isc.say("Save Successfully.");
    				}
    			});
        	}
		}
	});

	var alarmSetForm = isc.DynamicForm.create({
		  dataSource:ecertAlarmSetDS,
	  	  //layoutTopMargin:50,
	  	  //layoutEndMargin:50,
	  	  //layoutBottomMargin:50,
		  padding:10,
	  	  //canEdit:false,
	  	  isGroup:"true",
	  	  groupTitle:"Email Test Set",
	  	  //Margin:50,
		  fields:[
			      {name:"id", title:"ID",  width:40, hidden:true, canEdit:false},
			      {name:"if_test", title:"Test / formal", type:"select", width:190, defaultValue:"0",
			    	  change: function(form, item, value){
		        			switch (value){
		    				case "0":
		    					//console.log(this.getSuperClass());
		    					//this.getSuperClass().clearValue();
		    					alarmSetForm.getField('mailto_test').setDisabled(false);
		    					alarmSetForm.getField('dpa_test_mail').setDisabled(false);
		    					alarmSetForm.getField('cso_test_mail').setDisabled(false);

		    					alarmSetForm.clearValues();
		    					alarmSetForm.fetchData();
		                		break;
		    				case "1":
		    				case "2":
		    					alarmSetForm.clearValue('mailto_test');
		    					alarmSetForm.clearValue('dpa_test_mail');
		    					alarmSetForm.clearValue('cso_test_mail');
		    					alarmSetForm.getField('mailto_test').setDisabled(true);
		    					alarmSetForm.getField('dpa_test_mail').setDisabled(true);
		    					alarmSetForm.getField('cso_test_mail').setDisabled(true);
		    					break;
		        			};
			    	  }
			      },
			      {name:"mailto_test", title:"Mail To (Test)", width:300},
			      {name:"dpa_test_mail", title:"Dpa Mail (Test)", width:300},
			      {name:"cso_test_mail", title:"Cso Mail (Test)", width:300},
		  ],
	});
	alarmSetForm.fetchData();

/*	var alarmSetListGrid = isc.ListGrid.create({
		  height:"*",
	  	  width:"100%",
	  	  overflow:"auto",
	  	  dataSource:ecertAlarmSetDS,
	  	  autoFetchData:true,
	  	  autoConfirmSaveEdits:true,
	  	  canEdit:hasAccess("FSQC_ALL||EXEMPT_EMAIL_MODE_WRITE"),
	  	  //autoFitFieldWidths:true,
	  	  //editOnFocus: true,
	  	  //canSelectCells: true,
	  	  //dataPageSize: 20,
	  	  //canRemoveRecords: false,
	  	  autoSaveEdits: false,
	  	  saveLocally: true,
	  	  saveByCell: false,
	  	  editEvent: "click",
	  	  //selectionAppearance:"checkbox",
	  	  //selectionType: "simple",
	  	  showFilterEditor:true,
	  	  layoutTopMargin:10,
	  	  isGroup:"true",
	  	  groupTitle:"Email Test Set",
		  fields:[
			      {name:"id", title:"ID",  width:40, hidden:true, canEdit:false},
			      {name:"if_test", title:"Test / formal", type:"select", width:190,
			    	  change: function(form, item, value){
		        			switch (value){
		    				case "0":
		    					//console.log(this.getSuperClass());
		    					//this.getSuperClass().clearValue();
		    					alarmSetListGrid.setData([]);
		    					alarmSetListGrid.fetchData();
		                		break;
		    				case "1":
		    					alarmSetListGrid.setEditValue(0, 1, "");
		    					alarmSetListGrid.setEditValue(0, 2, "");
		    					alarmSetListGrid.setEditValue(0, 3, "");
			        			alarmSetListGrid.setEditValue(0, 0, value);
			        			alarmSetListGrid.endEditing();
		    					break;
		    				case "2":
		    					alarmSetListGrid.setEditValue(0, 1, "");
		    					alarmSetListGrid.setEditValue(0, 2, "");
		    					alarmSetListGrid.setEditValue(0, 3, "");
			        			alarmSetListGrid.setEditValue(0, 0, value);
			        			alarmSetListGrid.endEditing();
		    					break;
		        			};
			    	  }
			      },
			      {name:"mailto_test", title:"Mail To (Test)", width:250},
			      {name:"dpa_test_mail", title:"Dpa Mail (Test)", width:250},
			      {name:"cso_test_mail", title:"Cso Mail (Test)", width:"*"},
		  ],
	  	  rowClick:function(record, recordNum, fieldNum){
	  		  this.startEditing(recordNum, fieldNum);
	  	  }
	});*/

	var saveBtnPane = isc.HLayout.create({
		align:"right",
		height:"1",
		members : [saveAlarmSetBtn]
	});

	var alarmSetListpane = isc.VLayout.create({
		height:"600",
		membersMargin:10,
		members : [saveBtnPane, alarmSetForm]
	});

	var sectionStackUp = isc.SectionStack.create({
		height:700,
		visibilityMode : "multiple",
		sections : [
				{title: "Maintenance", expanded: true, resizeable: true, items:[alarmSetListpane]},
			]
	});

	var vlout = isc.VLayout.create({
		members : [sectionStackUp]
	});
