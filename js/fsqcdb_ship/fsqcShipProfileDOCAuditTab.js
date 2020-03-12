/***************************************************************************************************************
* Qualified Name	: 	/webui/src/main/webapp/js/fsqcdb_ship/fsqcShipProfileDOCAuditTab.js
* Created By		: 	Albert Chan
* Created date		: 	2019-07-25
* ************************************************************************************************************** 
* Change log:
* log no	Change complete date	Developer			Change Reason
* ======	====================	=========			=============
* 00000		2019-07-25				Albert Chan			Initial Implementation
* 00001		2019-08-20				Neo Pak				Update page
* 00002		2019-09-03				Dicky Lee			Add access control
****************************************************************************************************************/

function getFsqcShipProfileDOCAuditTab(i_dataSource, i_valuesManager, record)
{
	console.log('record.imo_comno1: '+record.imo_comno);
	console.log('record.Imono1: '+record.Imono);

	isc.FormLayout.create({
		ID: "certificateRadioButtons_DOC",
		items:[{
	        name:"showShipCert", 
	        type:"radioGroup", 
	        showTitle:false,
	        vertical:false,
	        width: 200,
	        valueMap:{
	        	"Audit":"Audit",
	        	"Certificate":"Certificate"
	        }, 
	        defaultValue:"Audit",

	        change: function (form, item, value) {
	        	toggleFsqcShipProfileCertificateRadioButton_DOC(value);
	        }
	    }]
	});

	isc.ButtonToolbar.create({
		ID: "fsqcShipDOCAuditToolbar",
		buttons: 
		[
			{
				icon: "demand.png",
				title: "Export",
				autoFit: true, 
				click : function () {
					fsqcShipDOCAuditLG.exportClientData();
				}
			},
			{
				//--modified 00002
				//title:"Save", autoFit: true, onControl:"MSMC_WRITE",
				title:"Save", autoFit: true, onControl:"FSQC_ALL||FSQCSHIP_WRITE_DOC_AUD",
				// end 00002
				click : function () {

					var EditedRecord = fsqcShipDOCAuditLG.getAllEditRows();

					fsqcShipDOCAuditLG.endEditing();
					fsqcShipDOCAuditLG.saveAllEdits();

			        for (i = 0; i < EditedRecord.length; i++) {
			        	docAuditDS.updateData(fsqcShipDOCAuditLG.getRecord( EditedRecord[i] ));

			        // 	fsqcShipDOCCertLG.data.localData[i]["imo_comno"] = fsqcShipProfileManagerVM.getValue("imo_comno");
		      			// fsqcShipDOCCertLG.data.localData[i]["Com_name"] = fsqcShipProfileManagerVM.getValue("Com_name");
			       		
			       	// 	console.log(fsqcShipDOCCertLG.data.localData[i]["imo_comno"]);
			       	// 	console.log(fsqcShipDOCCertLG.data.localData[i]["Com_name"]);

			       		// fsqcShipDOCCertLG.setEditValue( i, 0, 'Complete' );
			        }	


				}
			},
			{
				//modified 00002 ----
				//title:"Add", autoFit: true, onControl:"MSMC_WRITE",
				title:"Add", autoFit: true, onControl:"FSQC_ALL||FSQCSHIP_WRITE_DOC_AUD",
				//--end 00002
				click : function () {
					add_DOCAudit_data();
				}
			},
			{
				//---modified  00002 -
				//title:"Add", autoFit: true, onControl:"MSMC_WRITE",
				title:"Delete", autoFit: true, onControl:"FSQCSHIP_WRITE_DOC_AUD||FSQC_ALL",
				//---end 00002
				click : function () {
					//
					if (fsqcShipDOCAuditLG.anySelected()) {
						isc.ask(promptDeleteMessage_2, function (value){
							  if (value){
								  console.log("about to del:");
								  console.log(JSON.stringify(fsqcShipDOCAuditLG.getSelectedRecord()));
								  //fsqcShipDOCAuditLG
								  //ism_auditDS
								  isc.DataSource.get("docAuditDS").removeData(fsqcShipDOCAuditLG.getSelectedRecord(),
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

	isc.ButtonToolbar.create({
		ID: "fsqcShipDOCCertToolbar_2",
		buttons: 
		[
			{
				icon: "demand.png",
				title: "Export",
				autoFit: true, 
				click : function () {
					fsqcShipDOCCertLG_2.exportClientData();
				}
			},
			{
				//--modified 00002--
				//title:"Save", autoFit: true, onControl:"MSMC_WRITE",
				title:"Save", autoFit: true, onControl:"FSQC_ALL||FSQCSHIP_WRITE_DOC_AUD",
				//end 00002
				click : function () {

					var EditedRecord = fsqcShipDOCCertLG_2.getAllEditRows();

					fsqcShipDOCCertLG_2.endEditing();
					fsqcShipDOCCertLG_2.saveAllEdits();

			        for (i = 0; i < EditedRecord.length; i++) {
			        	companyManagementDocDS.updateData(fsqcShipDOCCertLG_2.getRecord( EditedRecord[i] ));
			        }	

			        isc.say(saveSuccessfulMessage);
  					fsqcShipDOCCertLG_2.refreshData (function (dsResponse, data, dsRequest) {
  						// updateListGridData(data)
  						for (i = 0; i < data.length; i++) 
        				{
          					data[i]["imo_comno"] = fsqcShipProfileManagerVM.getValue("imo_comno");
          					data[i]["Com_name"] = fsqcShipProfileManagerVM.getValue("Com_name");
        				}
  					});
				}
			},
			{
				//--modified 00002---
				//title:"Add", autoFit: true, onControl:"MSMC_WRITE",
				title:"Add", autoFit: true, onControl:"FSQC_ALL||FSQCSHIP_WRITE_DOC_AUD",
				//--end 00002
				click : function () {
					add_DOCCert_data(i_dataSource, i_valuesManager, record);
				}
			},
			{
				//---modified  00002 -
				//title:"Add", autoFit: true, onControl:"MSMC_WRITE",
				title:"Delete", autoFit: true, onControl:"FSQCSHIP_WRITE_DOC_AUD||FSQC_ALL",
				//---end 00002
				click : function () {
					//
					if (fsqcShipDOCCertLG_2.anySelected()) {
						isc.ask(promptDeleteMessage_2, function (value){
							  if (value){
								  console.log("about to del:");
								  console.log(JSON.stringify(fsqcShipDOCCertLG_2.getSelectedRecord()));
								  //fsqcShipDOCCertLG_2
								  //ism_auditDS
								  isc.DataSource.get("companyManagementDocDS").removeData(fsqcShipDOCCertLG_2.getSelectedRecord(),
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
	
	// 111 start
	var tmp_manager = null;
	if(record.Manager != null)
	{
		tmp_manager = record.Manager.trim();
	}
	else
	{
		tmp_manager = "-1";
		//fsqcShipProfileVM.getValue('Manager')
		fsqcShipDOCAuditToolbar.setDisabled(true);
		fsqcShipDOCCertToolbar_2.setDisabled(true);
	}

	isc.ListGrid.create({
		ID:"fsqcShipDOCAuditLG", 
		dataSource : docAuditDS,
	    autoDraw: false,
	    canEdit: true,
	    saveLocally: true,
	    saveByCell: false,
	    autoSaveEdits: false, 
	    autoFetchData: true,
	    initialCriteria: {company_id: tmp_manager},
	    sortField: "beginDate",
	    sortDirection: "descending",
	    width:"100%",
	    overflow:"auto",
	    canSelectCells: true,
	    autoFitWidthApproach:"both",
	    headerHeight:40,
		// editOnFocus: true,
		fields:
		[
			{name: "imo_comno", title: "IMO No.", width:150 , canEdit:false},
			{name: "Com_name", title: "Company", width:300 , canEdit:false},
			{name: "company_id", title: "company_id", width:150, hidden:true},
			{name: "audit_date", title: "Audit Date (dd/mm/yyyy)", width:150 },
			// {name: "audittype", title: "Audit Type", width:150 },
			// {name: "cs", title:"Auditing Organization", width:150 },
			
			{name: "audittype", title: "Audit Type", width:150, optionDataSource:"codeSurTypeDS", valueField:"Surtyp_cd", displayField:"Surtyp_des"  },
			{name: "cs", title:"Auditing Organization", width:150
				, optionDataSource:"codeRODS", valueField:"Cs_cd", displayField:"Cs_cd"
				, optionCriteria:{
					hide:"2"
		        }
			},

			{name: "ncs", title: "No. of NC", width:100 },
			{name: "major_ncs", title: "No. of major NC", width:130 },  
			{name: "obs", title: "No. of OBS", width:100},
			{name: "participate", title: "MD participated", width:140},
			{name: "lpardate", title: "Last Paricipate Date", width:170},
			{name: "auditor", title: "Lead Auditor Name", width:150},
			{name: "mdsurveyor", title: "MD Surveyor", width:150, type:"ComboBoxItem", optionDataSource:"codeMDSurveyorDS", valueField:"Surveyor_cd", displayField:"Surveyor_Enam"},
			{name: "remark", title: "Remarks", type: "TextAreaItem", width:350},

        ],
        dataArrived:function(startRow, endRow)
		{
			for (i = startRow; i < endRow; i++) 
		    {
		      this.data.localData[i]["imo_comno"] = fsqcShipProfileManagerVM.getValue("imo_comno");
		      this.data.localData[i]["Com_name"] = fsqcShipProfileManagerVM.getValue("Com_name");
		    }
		}
	});
	// 111 end

	// 222 start
	var tmp_manager = null;
	if(record.Manager != null)
	{
		tmp_manager = record.Manager.trim();
	}
	else
	{
		tmp_manager = "-1";
	}
	
	isc.ListGrid.create({
	ID:"fsqcShipDOCCertLG_2", 
	dataSource : companyManagementDocDS,
	  autoDraw: false,
	  canEdit: true,
	  saveLocally: true,
	  saveByCell: false,
	  autoSaveEdits: false, 
	  autoFetchData: true,
	  initialCriteria: {Com_cd: tmp_manager},
	  sortField: "beginDate",
	  sortDirection: "descending",
	  width:"100%",
	  overflow:"auto",
	  canSelectCells: true,
	  autoFitWidthApproach:"both",
	  headerHeight:40,
	  fields: 
	[
		{name:"Com_cd", title:"ID", hidden:true},
	    {name:"serial", title:"2-File no", hidden:true},
		{name: "imo_comno", disabled: true, title: "IMO NO.", width:120},
		{name: "Com_name", title: "Company", width:300 , canEdit:false},
	    {name: "docissue",  title: "Issue Date (dd/mm/yyyy)", width:120},
	    {name: "docexpiry", title: "Expiry Date (dd/mm/yyyy)", width:120},
	    {name: "docanniversary", title: "Anniversary Date", displayField: "docexpiry", format: "dd MMM", width:150},
//	    {name: "docanniversary", title: "Anniversary Date (dd/mm/yyyy)", width:150},
	    {name:"docro", title:"Class", width:120},
	    {name: "docerror", title: "Doc Error", width:120},
	    {name: "docerrortype", title: "Doc Error Type", width:120},
	    {name: "certtype", title: "Certificate Type", width:120},
	    {name: "report_name", title: "Report Name", width:120},
	    {name: "mdsurveyor", title: "Audit Report by", width:150},
	    {name: "renewal", title: "Renewal (dd/mm/yyyy)", width:150},
	    {name: "recdate", title: "Received Date (dd/mm/yyyy)", width:150},        
	],

	dataArrived:function(startRow, endRow)
    {
      for (i = startRow; i < endRow; i++) 
        {
          this.data.localData[i]["imo_comno"] = fsqcShipProfileManagerVM.getValue("imo_comno");
          this.data.localData[i]["Com_name"] = fsqcShipProfileManagerVM.getValue("Com_name");
        }
    }
  });

	// 222 end

	fsqcShipDOCCertLG_2.hide();
	fsqcShipDOCCertToolbar_2.hide();

    isc.HLayout.create({
		ID:"topbar",
		layoutTopMargin:0,
		layoutBottomMargin:0,
	    height:1,
		showEdges: false,
		membersMargin:0,
		members:
		[
			certificateRadioButtons_DOC,
    		fsqcShipDOCAuditToolbar,
    		fsqcShipDOCCertToolbar_2,
    		
		]
	});

	isc.VLayout.create
    ({
	    ID:"fsqcShipProfileDOCAuditTab",
	    width:"100%",
    	members: 
    	[
    		topbar,
    		fsqcShipDOCAuditLG,
    		fsqcShipDOCCertLG_2,
    	]
    });

	console.log('record.Com_cd1: '+record.Com_cd);

    return 	{
	    title: "DOC Audit",
	    pane: fsqcShipProfileDOCAuditTab
	};
}

function add_DOCAudit_data()
{
	isc.ButtonToolbar.create({
		ID:"add_DOCAudit_toolBar",
		buttons:
		[
			{name:"saveBtn", title:"Save", autoFit: true,
				click:function()
	              {
						if(add_DocAuditform.validate(false))
						{
							add_DocAuditform.saveData(
							function (dsResponse, data, dsRequest)
							{
							  if(dsResponse.status==0)
							  {
								isc.say(saveSuccessfulMessage);
								enabledSection(true);
							  }
						});

						add_DOCAudit_DetailWindow.hide();        
					}
	            	     	  
	              }
			},

			{name:"closeBtn", title:"Close", autoFit: true,
			  click : function () 
			  {
				add_DocAuditform.reset();
				add_DOCAudit_DetailWindow.hide();    
			  }
			}
		]
	});

	isc.DynamicForm.create({
	  	ID: "add_DocAuditform",
	      dataSource: docAuditDS,
	      overflow:"auto",
	      showRollOver: true,
	      // height: 330,
	      // width: 600,
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
	      saveLocally: true,
	      saveByCell: false,
	      border:"1px solid grey", padding:10,
	      numCols: 4,
	      //editEvent: "doubleClick",
	      editEvent: "click",
	      fields: [
			{name:"company_id", title:"ID:", hidden:true, startRow: true, width: 400,},
			{name:"Com_name", title:"Company:", type:"staticText", width: 400, startRow: true},
			{name:"audit_date", title:"Audit Date(YYYY/MM/DD)", width: 400, required:true, startRow: true},
			{name:"audittype", title:"Audit Type", width: 400, startRow: true, type:"select", optionDataSource:"codeSurTypeDS", valueField:"Surtyp_cd", displayField:"Surtyp_des"},
			{name:"cs", title:"Auditing Organization", width: 400, type: "text", startRow: true},
			{name:"auditor", title:"Lead Auditor's Name", width: 400, type: "text", startRow: true},
			{name: "ncs", title: "No. of NC", width: 400, type: "integer", startRow: true},
			{name: "major_ncs", title: "No. of major NC", width: 400, type: "integer", startRow: true},
			{name: "obs", title: "No. of OBS", width: 400, type: "integer", startRow: true},
			{name:"remark", title:"Remark", width: 400, type: "text", startRow: true},
			{name:"participate", title:"MD participated", width: 400, type: "text", startRow: true},
			{name: "mdsurveyor", title: "MD Surveyor", width:400, startRow: true, type:"ComboBoxItem", optionDataSource:"codeMDSurveyorDS", valueField:"Surveyor_cd", displayField:"Surveyor_Enam"},
			// {name:"mdsurveyor", title:"MD surveyor", width: 400, type: "text", startRow: true},
			{name:"lpardate", title:"Last Participate Date", width: 400, type: "date", startRow: true},
	      ]
	  });

	add_DocAuditform.clearValues();

	add_DocAuditform.setValue('company_id', fsqcShipProfileManagerVM.getValue("Com_cd"));
	add_DocAuditform.setValue('Com_name', fsqcShipProfileManagerVM.getValue("Com_name"));

	// console.log('imo1: '+fsqcShipProfileManagerVM.getValue("Manager"));
	// console.log('imo1: '+fsqcShipProfileManagerVM.getValue("Com_cd"));
	// console.log('com1: '+fsqcShipProfileManagerVM.getValue("Com_name"));

	  isc.ButtonToolbar.create({
	      ID: "DocAuditbtnbar",
		  layoutAlign:"center",
	      buttons: [
	          {name: "add_DocAuditformSave", title: "Save3", width:100,
	              
	          },
	      ]
	  });

	isc.Window.create
	({
		ID:"add_DOCAudit_DetailWindow", 
		// isModal: true, 
		isModal: true, showModalMask: true, 
		width: 600, height: 380, 
		items: 
		[
	        isc.VLayout.create
	        ({
	        	members: 
	        	[
	        		add_DOCAudit_toolBar,
	    	     	add_DocAuditform

	        	]
	        })
		]
	});

	add_DOCAudit_DetailWindow.setTitle("Add data");
	add_DOCAudit_DetailWindow.show();
}

function add_DOCCert_data(i_dataSource, i_valuesManager, record)
{
	isc.ButtonToolbar.create({
		ID:"add_DOCCert_toolBar",
		buttons:
		[
			{name:"saveBtn", title:"Save", autoFit: true,
				click:function()
	              {
						if(add_DOCCertform.validate(false))
						{
							add_DOCCertform.saveData(
							function (dsResponse, data, dsRequest)
							{
							  if(dsResponse.status==0)
							  {
								isc.say(saveSuccessfulMessage);
								enabledSection(true);
							  }
						});

						add_DOCCert_DetailWindow.hide(); 

	  					fsqcShipDOCCertLG_2.refreshData (function (dsResponse, data, dsRequest) {
	  						for (i = 0; i < data.length; i++) 
	        				{
	          					data[i]["imo_comno"] = fsqcShipProfileManagerVM.getValue("imo_comno");
	          					data[i]["Com_name"] = fsqcShipProfileManagerVM.getValue("Com_name");
	        				}
	  					});       
					}
	            	     	  
	              }
			},

			{name:"closeBtn", title:"Close", autoFit: true,
			  click : function () 
			  {
				add_DOCCertform.reset();
				add_DOCCert_DetailWindow.hide();    
			  }
			}
		]
	});

	isc.DynamicForm.create({
	  	ID: "add_DOCCertform",
	      dataSource: companyManagementDocDS,
	      overflow:"auto",
	      showRollOver: true,
	      // height: 330,
	      // width: 600,
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
	      saveLocally: true,
	      saveByCell: false,
	      border:"1px solid grey", padding:10,
	      numCols: 4,
	      //editEvent: "doubleClick",
	      editEvent: "click",
	      fields: 
	      [
	          {name:"Com_cd", title:"ID:", hidden:false, type:"staticText", rowSpan:2},
	          {name:"Com_name", title:"Company:", type:"staticText", colSpan:3},
	          {name:"serial", title:"Serial:", type:"staticText", colSpan:3},
	          {name:"docissue", title:"Issue Date(YYYY/MM/DD)"},
	          {name:"docexpiry", title:"Expiry Date"},
	          {name:"docro", title:"DOC Issuing Authority"},
	          {name:"docerror", title:"Doc Error"},
	          {name:"renewal", title:"Initial/Renewal Date(YYYY/MM/DD)", rowSpan:3},
	          {name:"docerrortype", title:"Doc Error Type", optionDataSource:"errortypeDS", valueField:"errorcd", displayField:"errordetail"},
	          {name:"certtype", title:"Certificate Type"},
	          {name:"mdsurveyor", title:"Audit Report by",  type:"ComboBoxItem", optionDataSource:"codeMDSurveyorDS", valueField:"Surveyor_cd", displayField:"Surveyor_Enam"},
	          {name:"recdate", title:"Received Date(YYYY/MM/DD)"},
	          //{name:"report_type", title:"Report File Type"},
	          {name:"sptype", title:"Ship Type" , width:500,
	        	  type:"ComboBoxItem", startRow:true, colSpan:4, multiple:true, optionDataSource:"codeDocShipTypeDS", displayField:"sptype_name", valueField:"sptype_name",
	              multipleAppearance:"picklist",  pickListWidth:500,
	              pickListFields:[
	                              //{name:'sptype_cd', width:50},
	                              {name:'sptype_name', width:400}
	                             ]
	          },
	          {name:"remark", title:"Remark", colSpan:4, width:500}
	      ]
	  });

	add_DOCCertform.clearValues();

	add_DOCCertform.setValue('company_id', fsqcShipProfileManagerVM.getValue("Com_cd"));
	add_DOCCertform.setValue('Com_name', fsqcShipProfileManagerVM.getValue("Com_name"));

	console.log('imo1: '+fsqcShipProfileManagerVM.getValue("Manager"));
	console.log('imo1: '+fsqcShipProfileManagerVM.getValue("Com_cd"));
	console.log('com1: '+fsqcShipProfileManagerVM.getValue("Com_name"));

	// add_DOCCertform.setValue('company_id', record.Com_cd);
	// add_DOCCertform.setValue('Com_name', record.Com_name);
	// console.log('imo1: '+record.Manager);
	// console.log('imo1: '+record.Com_cd);
	// console.log('com1: '+ record.Com_name);

	  isc.ButtonToolbar.create({
	      ID: "DocAuditbtnbar",
		  layoutAlign:"center",
	      buttons: [
	          {name: "add_DOCCertformSave", title: "Save3", width:100,
	              
	          },
	      ]
	  });

	isc.Window.create
	({
		ID:"add_DOCCert_DetailWindow", 
		// isModal: true, 
		isModal: true, showModalMask: true, 
		width: 1000, height: 380, 
		items: 
		[
	        isc.VLayout.create
	        ({
	        	members: 
	        	[
	        		add_DOCCert_toolBar,
	    	     	add_DOCCertform

	        	]
	        })
		]
	});

	add_DOCCertform.setValue('Com_cd', record.Manager);
	var doccert_serial_max = 0;
	for (i = 0; i < fsqcShipDOCCertLG_2.getTotalRows(); i++) {
		if (fsqcShipDOCCertLG_2.getRecord(i).serial > doccert_serial_max){
		  doccert_serial_max = fsqcShipDOCCertLG_2.getRecord(i).serial;
		}
	}

	add_DOCCertform.setValue('serial',doccert_serial_max+1);
	add_DOCCert_DetailWindow.setTitle("Add data");
	add_DOCCert_DetailWindow.show();
}

function toggleFsqcShipProfileCertificateRadioButton_DOC(value) 
{	
	ship_certificate_radio_value = value;

	if (value == "Audit") {
		fsqcShipDOCAuditToolbar.show();
		fsqcShipDOCAuditLG.show();

		fsqcShipDOCCertToolbar_2.hide();
		fsqcShipDOCCertLG_2.hide();

	} else {
		fsqcShipDOCAuditToolbar.hide();
		fsqcShipDOCAuditLG.hide();
		
		fsqcShipDOCCertToolbar_2.show();
		fsqcShipDOCCertLG_2.show();
	}
}
