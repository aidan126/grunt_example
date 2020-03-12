/***************************************************************************************************************
* Qualified Name	: 	/webui/src/main/webapp/js/fsqcdb_ship/fsqcShipProfileSMCAuditTab.js
* Created By		: 	Albert Chan
* Created date		: 	2019-07-25
* ************************************************************************************************************** 
* Change log:
* log no	Change complete date	Developer			Change Reason
* ======	====================	=========			=============
* 00000		2019-07-25				Albert Chan			Initial Implementation
* 00001		2019-08-20				Neo Pak				Update page
* 00002		2019-09-03				Dicky Lee			add access control
****************************************************************************************************************/

function getFsqcShipProfileSMCAuditTab(i_dataSource, i_valuesManager, record)
{
	console.log('record.Imono: '+record.Imono);
	console.log('record.Manager: '+record.Manager);

	isc.ButtonToolbar.create({
		ID: "fsqcShipSMCAuditToolbar",
		buttons:   
		[
			{
				icon: "demand.png",
				title: "Export",
				autoFit: true, 
				click : function () {
					fsqcShipSMCAuditLG.exportClientData();
				}
			},
			{
				//---modified  00002 -
				//title:"Save", autoFit: true, onControl:"MSMC_WRITE",
				title:"Save", autoFit: true, onControl:"FSQCSHIP_WRITE_SMC_AUD||FSQC_ALL",
				//---end 00002
				click : function () {

					// test start
					var batchPrintJson = fsqcShipSMCAuditLG.getSelectedRecords();
					console.log('data: '+batchPrintJson);
					// test end

					var EditedRecord = fsqcShipSMCAuditLG.getAllEditRows();

					fsqcShipSMCAuditLG.endEditing();
					fsqcShipSMCAuditLG.saveAllEdits();

			        for (i = 0; i < EditedRecord.length; i++) {
			        	ism_auditDS.updateData(fsqcShipSMCAuditLG.getRecord( EditedRecord[i] )); //save
			        }
				}
			},
			{
				//---modified  00002 -
				//title:"Add", autoFit: true, onControl:"MSMC_WRITE",
				title:"Add", autoFit: true, onControl:"FSQCSHIP_WRITE_SMC_AUD||FSQC_ALL",
				//---end 00002
				click : function () {
					add_SMCAudit_data(i_dataSource, i_valuesManager, record);
				}
			},
			{
				//---modified  00002 -
				//title:"Add", autoFit: true, onControl:"MSMC_WRITE",
				title:"Delete", autoFit: true, onControl:"FSQCSHIP_WRITE_SMC_AUD||FSQC_ALL",
				//---end 00002
				click : function () {
					//
					if (fsqcShipSMCAuditLG.anySelected()) {
						isc.ask(promptDeleteMessage_2, function (value){
							  if (value){
								  console.log("about to del:");
								  console.log(JSON.stringify(fsqcShipSMCAuditLG.getSelectedRecord()));
								  //fsqcShipSMCAuditLG
								  //ism_auditDS
								  isc.DataSource.get("ism_auditDS").removeData(fsqcShipSMCAuditLG.getSelectedRecord(),
										function(dsResponse, data, dsRequest) {
										  if (!isNull(dsResponse) && dsResponse.status == 0) {
											  isc.say(deleteSuccessfulMessage);       							 
										  }else{
											  isc.warn(deleteFailMessage);
										  }
						  		  		}
								  );
							  }
						  });
						  
					}else{
						isc.say("No Record is Selected.");
					}
					
				}
			}
		]
	});

	isc.ListGrid.create({
		ID:"fsqcShipSMCAuditLG", 
		dataSource : ism_auditDS,
	    autoDraw: false,
	    canEdit: true,
	    saveLocally: true,
	    saveByCell: false,
	    autoSaveEdits: false, 
	    autoFetchData: true,
	    initialCriteria: {ism_imono: record.Imono.trim()},
	    sortField: "beginDate",
	    sortDirection: "descending",
	    width:"100%",
	    overflow:"auto",
	    canSelectCells: true,
	    headerHeight:40,
		fields:
		[
			{name: "ism_imono", title: "IMONO", width:150, type: "staticText"},
			{name: "Audit_date", title: "Audit Date (dd/mm/yyyy)", width:210},
			{name: "Audittype", title: "Audit Type", width:150, optionDataSource:"codeSurTypeDS", valueField:"Surtyp_cd", displayField:"Surtyp_des"  },
			{name: "Cs", title:"Auditing Organization", width:150
				, optionDataSource:"codeRODS", valueField:"Cs_cd", displayField:"Cs_cd"
				, optionCriteria:{
					hide:"2"
		        }
			},
			{name: "ncs", title: "No. of NC", width:120 },
			{name: "major_ncs", title: "No. of major NC", width:120 },
			{name: "obs", title: "No. of OBS", width:120},
			{name: "participate", title: "MD participated", width:140},
			{name: "lpardate", title: "Last Paricipate Date", width:170},
			{name: "Auditor", title: "Lead Auditor Name", width:150},
			{name: "mdsurveyor", title: "MD Surveyor", width:150, type:"ComboBoxItem", optionDataSource:"codeMDSurveyorDS", valueField:"Surveyor_cd", displayField:"Surveyor_Enam"},
			{name: "remark", title: "Remarks", type: "textArea", width:350},
        ]
	});
	
	isc.VLayout.create
    ({
	    ID:"fsqcShipProfileSMCAuditTab",
	    width:"100%",
    	members: 
    	[
    		fsqcShipSMCAuditToolbar
    		, fsqcShipSMCAuditLG
    	]
    });

    fsqcShipSMCAuditLG.filterData({ ism_imono : record.Imono});
	
    return 	{
	    title: "SMC Audit",
	    pane: fsqcShipProfileSMCAuditTab
	};
}

function add_SMCAudit_data(i_dataSource, i_valuesManager, record)
{
	isc.ButtonToolbar.create({
		ID:"add_SMCAudit_toolBar",
		buttons:
		[
			{name:"saveBtn", title:"Save", autoFit: true,
				click:function()
				{
	        	  if(add_SMCAudit_Form.getValues().ism_imono){
	        		  add_SMCAudit_Form.saveData();
	            	  add_SMCAudit_DetailWindow.hide();
	            	  isc.say(saveSuccessfulMessage);
						enabledSection(true);
	        	  }else{
	            	  isc.say("Imono is missing", function (value){ });
	        	  }
	          }
			},

			{name:"closeBtn", title:"Close", autoFit: true,
			  click : function () 
			  {
				add_SMCAudit_Form.reset();
				add_SMCAudit_DetailWindow.hide();
			  }
			}
		]
	});
	//---modified 00002
	isc.ControlledDynamicForm.create({
		 onControl:"FSQC_ALL||FSQCSHIP_WRITE_SMC_AUD",
	//-----end 00002
      	  ID: "add_SMCAudit_Form",
          dataSource: "ism_auditDS",
      	  autoDraw: false,
          height: 48,
          //padding:4,
          autoFetchData: false,
          autoSaveEdits: false,
          saveLocally: true,
          border:"1px solid grey", padding:10, spacing:10,
          fields:
			[
				{name: "ism_imono", title: "IMONO", width: 400, type: "text", startRow: true, required: true, type: "staticText"},
				{name: "Audit_date", title:"Audit_date", width: 400, type: "date", startRow: true, required: true},
				{name: "Audittype", title: "Audit Type", width: 400, optionDataSource:"codeSurTypeDS", valueField:"Surtyp_cd", displayField:"Surtyp_des"  },
				{name: "Cs", title:"Auditing Organization", width: 400
					, optionDataSource:"codeRODS", valueField:"Cs_cd", displayField:"Cs_cd" 
					, optionCriteria:{
						hide:"2"
			        }
				},
				{name: "Auditor", title: "Lead Auditor Name", width: 400, type: "text", startRow: true},
				{name: "S_info", title: "Source of Information", width: 400, type: "text", startRow: true},
				{name: "mdsurveyor", title: "MD Surveyor", width:400, startRow: true, type:"ComboBoxItem", optionDataSource:"codeMDSurveyorDS", valueField:"Surveyor_cd", displayField:"Surveyor_Enam"},
				// {name: "participate", title: "Non-Conformity record", width: 400, type: "text", startRow: true},
				{name: "remark", title: "Remark", width: 400, height: 80, type: "text", startRow: true},
				{name: "ncs", title: "No. of NC", width: 400, type: "text", startRow: true},
				{name: "major_ncs", title: "No. of major NC", width: 400, type: "text", startRow: true},
				{name: "obs", title: "No. of OBS", width: 400, type: "text", startRow: true},
			]
	});

	isc.Window.create
	({
		ID:"add_SMCAudit_DetailWindow", 
		isModal: true, showModalMask: true, 
		width: 600, height: 430, 
		items: 
		[
	        isc.VLayout.create
	        ({
	        	members: 
	        	[
	        		add_SMCAudit_toolBar,
	    	        add_SMCAudit_Form

	        	]
	        })
		]
	});

	add_SMCAudit_Form.setValue('ism_imono', record.Imono);
	add_SMCAudit_DetailWindow.setTitle("Add data");
	add_SMCAudit_DetailWindow.show();
}
