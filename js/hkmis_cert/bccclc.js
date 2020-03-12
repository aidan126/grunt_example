/***************************************************************************************************************
* Qualified Name	 	/webui/src/main/webapp/js/hkmis_cert/bccclc.js
* @author 				Neo Pak
* @since				2019-08-07
* **************************************************************************************************************
* Change log:
* log no	Change complete date	Developer			Change Reason
* ======	====================	=========			=============
* 00000		2019-06-30				Neo Pak				Initial Implementation
* 00001		2019-07-20				Jacky Leong			Change to use ValuesManager
* 00001		2019-07-20				Neo Pak	        	Fix save function and insurer select
* 00003     2019-07-29              Mads Lam            Add Print Option Window
* 00001		2019-08-07				Neo Pak	        	Adjust the bccclc.js structure
*
****************************************************************************************************************/

var bccclc_saving = false;
function addBccclcCert(record, certType)
{
	bccclc_saving = false;
	bccclc_windowContent(record, certType);

	if(certType == '0')
	{
		bccclc_sidebar.setData(record.formlists);
	}

	bcccle_toolBar_1.hide();

	if(certType !== null && certType == '0')
	{
		if(record.status == 'Complete' )
		{
			bcccle_toolBar_1.show();
		}
	}
	
	bccclc_DetailWindow.show();
	
	

	//if(record!=null){
	if(!isNull(record) && !isNull(record.jobno)){
		//Update record;
		bccclc_FormDetail.getField('jobno').setDisabled(true);
		var cert_jobno = record.jobno;
		bccclc_FormDetail.fetchData({"jobno":cert_jobno},function (dsResponse, data, dsRequest)
		{
			if (dsResponse.status != 0) {
				isc.say("System is busy, please try again.");
				return;
			}
			
			bccclc_DetailWindow.setTitle(record.form+"@1.0");
			enableCertJobShipDF(bccclc_FormDetail_2, data);
			
			if(data.formlists)
			{
				bccclc_sidebar.setData(data.formlists);
			}
			if(data.status == 'Complete' )
			{
				bcccle_toolBar_1.show();
			}
			
			console.log("***********: " + JSON.stringify(data));
			if(!isNull(data) && data.length > 0 && !isNull(data[0]) && !isNull(data[0].validation_times) && data[0].validation_times.trim() == "3" && !isNull(data[0].status) && data[0].status.trim() != "Process") {
				
				console.log("hide re-start btn");
				bcccle_toolBar_1.getButton("re-start").hide();
			}
		});

		enabledSection(true);

	}else{
		bccclc_FormDetail.setValues({});
		bccclc_FormDetail.clearErrors(true);
		if(!isNull(record)){
			bccclc_FormDetail.setValues(record);
		}
		enabledSection(false);

		if(certType == 'BCC')
		{
			bccclc_DetailWindow.setTitle("Add BCC Cert");
			bccclc_FormDetail_1.setValue('form', 'BCC');
			bccclc_FormDetail_1.setValue('cert_type', 'BCC');
			bccclc_FormDetail_1.setValue('ver', '1.0');
		}

		if(certType == 'CLC')
		{
			bccclc_DetailWindow.setTitle("Add CLC Cert");
			bccclc_FormDetail_1.setValue('form', 'CLC');
			bccclc_FormDetail_1.setValue('cert_type', 'CLC');
			bccclc_FormDetail_1.setValue('ver', '1.0');
		}

		bccclc_FormDetail_3.setValue('startPerson', loginData.userId);
		bccclc_FormDetail_3.setValue('issue_on', new Date());
		bccclc_FormDetail_3.setValue('start_date', new Date(Date.parse(loginData.BCC_Start_Date)));
		bccclc_FormDetail_3.setValue('expiry_date', new Date(Date.parse(loginData.BCC_Valid_Date)));
		bccclc_FormDetail_3.setValue('valid_date', new Date(Date.parse(loginData.BCC_Valid_Date)));
		bccclc_FormDetail_3.getItem('authorized_official').defaultToFirstOption = true;

		bccclc_FormDetail_3.setValue('application_date', new Date());
		bccclc_FormDetail_3.setValue('doc_received_date', new Date());
	}
}

function bccclc_windowContent(record, certType)
{
	/* 00001 - Start Add */
	var valueMan = isc.ValuesManager.create({
	    ID: "bccclc_FormDetail",
		dataSource: certJobBccclcDS
	});
	/* 00001 - End Add */

	var onControlSubmitStatus = "";
	var onControlCheckStatus = "";
	var onControlWriteStatus = "";

	var disableAll = false;

//	if(record){
	if(!isNull(record) && !isNull(record.jobno)){
		if(record.form == "BCC"){
			addCertBtn = "Add CLC Cert";
			onControlSubmitStatus = "BCC_SUBMIT";
			onControlCheckStatus = "BCC_CHECK";
			onControlWriteStatus = "BCC_WRITE";
		}else if(record.form == "CLC"){
			addCertBtn = "Add BCC Cert";
			onControlSubmitStatus = "CLC_SUBMIT";
			onControlCheckStatus = "CLC_CHECK";
			onControlWriteStatus = "CLC_WRITE";
		}
	}else{
		if(certType == "BCC"){
			addCertBtn = "Add CLC Cert";
			onControlWriteStatus = "BCC_WRITE";
		}else if(certType == "CLC"){
			addCertBtn = "Add BCC Cert";
			onControlWriteStatus = "CLC_WRITE";
		}
	}

	if(certType !== null && certType == '0')
	{
		if(record.status !== 'Process')
		{
			disableAll = true;
		}else
		{
			disableAll = false;
		}
	}

	isc.ListGrid.create
	({
	    ID:"bccclc_sidebar",
	    width: "160",
	    // height: "768",
	    autoFetchData: false,
	    dataSource: formlistDS,
	    showEdges: true,
	    initialSort:
	    [
	        {property: "formlist_jobno", direction: "ascending"},
	        {property: "formlist_form", direction: "descending"},
	        {property: "formlist_ver", direction: "ascending"}
	    ],
        fields:
        [
			{name: "formlist_form", title: "Form"},
			{name: "formlist_ver", title: "Ver"}
        ],
        rowDoubleClick:function(record, recordNum, fieldNum)
	    {
        	/* 00003 - Start Add */

            var certName = "";
            var certPara = null;

            if (record.formlist_form == 'BCC'){
                certName = "RPT_BCC_Cert";
            }else if (record.formlist_form == 'CLC'){
                //certName = "RPT_CLC_Cert";
            	certName = "RPT_BCC_Cert";
            }

            var aboutToSetAsPrinted = showPrintOptionWindow(certName, bccclc_FormDetail.values, certPara, null);
//            var aboutToSetAsPrinted = showPrintOptionWindow(certName, record, certPara, setAsPrinted);

                console.log("aboutToSetAsPrinted: " + aboutToSetAsPrinted);
            if (aboutToSetAsPrinted == 1){
                console.log("print to printer btn is pressed__@@@");
            }

			/*
			var params = {};
			var requestArguments = [];
			Object.assign(params, {"jobno" : record.formlist_jobno});
			// var text1 = 'text1';
			// Object.assign(params, {"text1" : text1});

			var specialReq = [];

			console.log(record.formlist_form);

			if(record.formlist_form == 'BCC')
			{
				requestArguments = ["RPT_BCC_Cert", params];
			}

			if(record.formlist_form == 'CLC')
			{
				requestArguments = ["RPT_CLC_Cert", params];
			}

			ReportViewWindow.displayReport(requestArguments);
			*/
			/* 00003 - End Add */
	    }
	});

	/* 00001 - Start Add */
	isc.ControlledDynamicForm.create({
		ID:"bccclc_FormDetail_1",
		isGroup: true, groupTitle: "",
		dataSource: "certJobBccclcDS",
		onControl:onControlWriteStatus,
		valuesManager:valueMan,
		disabled: disableAll,
		width:"100%",
		numCols: 8,
		fields:
		[
			{
                name: "form",
                title: "Form:",
                textAlign:"center",
                //selectOnFocus: true,
                wrapTitle: false,
                disabled:true
	        	// ,defaultValue: ""
            },
			{name: "cert_type", 	title:"Form",	startRow: true, disabled: true, textAlign:"center", colSpan: 1, width: 200, hidden:true},
			{name: "ver", title:"Ver:",	startRow: false, disabled: true, textAlign:"center", colSpan: 3, width: 200},
			// { _constructor:"SpacerItem", colSpan: 2 },
			{name: "jobno", title:"Job No:",	startRow: false, disabled: true, canEdit:false, textAlign:"center", colSpan: 1, width: 200},

			{name: "refno", 	title:"Ref No.:",	startRow: true, disabled: true, textAlign:"center", colSpan: 1, width: 200},
			{name: "cert_dept_code", title:"Dept:",	startRow: false, disabled: false, textAlign:"center", colSpan: 3, width: 200
				, type:"select", optionDataSource:"userCertDeptDS", displayField:"cert_dept_code", valueField:"cert_dept_code"
					, pickListFields:[
			              {name:"cert_dept_code"},
			              {name:"cert_dept_name"}
			          ],
					  defaultValue : current_cert_dept.cert_dept_code,
			          pickListWidth:350,
			},
			{name: "validation_times", 	title:"Validation Times:",	startRow: false, textAlign:"center", colSpan: 1, width: 200,
				valueMap:
				{
			        1:"First Validation",
			        2:"Second Validation",
			        3:"Third Validation",
			    },
				defaultValue : 1
			},
		]
	});

	/* 00001 - End Add */
	certJobShipDF("bccclc_FormDetail_2", valueMan, onControlWriteStatus, ["spname","imono"]);

	isc.ControlledDynamicForm.create({
		ID:"bccclc_FormDetail_3",
		isGroup: true, groupTitle: "",
		valuesManager:valueMan,
		disabled: disableAll,
		dataSource: "certJobBccclcDS",
		onControl:onControlWriteStatus,
//		cellBorder: 1,
		width:"100%",
		numCols: 8,
		fields:
		[
			{name: "start_date", 	title:"Duration of Security From:",	type:"date", startRow: true, wrapTitle:true, textAlign:"center", colSpan: 1, width: 200},
			{name: "expiry_date", title:"To:", type:"date", startRow: false, textAlign:"center", colSpan: 1, width: 200},
			{name: "valid_date", title:"Valid On:", type:"date", startRow: false, textAlign:"center", colSpan: 1, width: 200},

			{name: "issue_on", 	title:"Issue On:",	type:"date", startRow: true, textAlign:"center", colSpan: 1, id: "IssueOn1", width: 200, align: "right"},
			{name: "authorized_official", title:"Authorized Official: ",	startRow: false, textAlign:"center", colSpan: 1, width: 200
				, type:"SelectItem", optionDataSource:"userDS", displayField:"userName", valueField:"userName", defaultValue:"Q. SHI" 
					, pickListFields:
					[
			            {name:"userName"}
			        ]
			          , optionCriteria:{
			        	  authorized_official:true
			          }
			          , pickListWidth:350

			},

			{name: "owner_name1", 	title:"Owner Name1:",	startRow: true, colSpan: 6, width: "100%" },

			{name: "address1", 	title:"Address1:",	startRow: true, colSpan: 6, width: "100%"},

			{name: "address2", 	title:"Address2:",	startRow: true, colSpan: 6, width: "100%"},

			{name: "address3", 	title:"Address3:",	startRow: true, colSpan: 6, width: "100%"},

			{name: "owner_name2", 	title:"Owner Name2:",	startRow: true, colSpan: 6, width: "100%"},

			{name: "address4", 	title:"Address4:",	startRow: true, colSpan: 6, width: "100%"},

			{name: "address5", 	title:"Address5:",	startRow: true, colSpan: 6, width: "100%"},

			{name: "address6", 	title:"Address6:",	startRow: true, colSpan: 6, width: "100%"},

			{name: "insurer1_spacer", 	type:"SpacerItem",	height:5,	startRow: true},
			{name: "insurer_id1", 	title:"Insurer Id1:", type: "StaticText",	startRow: true, colSpan: 1},
			{name: "Select1", 	title:"Select", type:"button", startRow: false, colSpan: 1, width: 100,
				click : function (record, recordNum, fieldNum)
				{
					select_insurer_RecDetail1(record);
				}
			},
			{name: "insurer_name1", 	title:"Insurer Name1:",	startRow: true, colSpan: 6, width: "*"},


			{name: "insurer_address1", 	title:"Insurer Address1:",	startRow: true, colSpan: 6, width: "100%"},

			{name: "insurer1_address2", 	title:"Insurer Address2:",	startRow: true, colSpan: 6, width: "100%"},

			{name: "insurer1_address3", 	title:"Insurer Address3:",	startRow: true, colSpan: 6, width: "100%"},

			{name: "insurer2_spacer", 	type:"SpacerItem",	height:5,	startRow: true},
			{name: "insurer_id2", 	title:"Insurer Id2:",	type: "StaticText",	startRow: true, colSpan: 1, width: 200},
			{name: "Select2", 	title:"Select", type:"button", startRow: false, colSpan: 1, width: 100,
				click : function (record, recordNum, fieldNum)
				{
					select_insurer_RecDetail2(record);
				}
			},
			{name: "insurer_name2", 	title:"Insurer Name2:",	startRow: false, colSpan: 6, width: "*"},

			{name: "insurer_address2", 	title:"Insurer Address1:",	startRow: true, colSpan: 6, width: "100%"},

			{name: "insurer2_address2", 	title:"Insurer Address2:",	startRow: true, colSpan: 6, width: "100%"},

			{name: "insurer2_address3", 	title:"Insurer Address3:",	startRow: true, colSpan: 6, width: "100%"},

			{name: "status", 	title:"status",  hidden:true},
			{name: "cancelDate", 	title:"cancelDate", hidden:true},
			{name: "cancelReason", 	title:"cancelReason", hidden:true},
			{name: "cancelPerson", 	title:"cancelPerson", hidden:true},
			{name: "lastEditDate", 	title:"lastEditDate", hidden:true},

//			{name: "completeDate", 	title:"completeDate", hidden:true},
			{name: "startPerson", 	title:"startPerson",  hidden:true},

			{name: "space1", type: "staticText", title:"",	startRow: true, colSpan: 8, width: 0},

			{name: "application_date", 	title:"Application Date:",	startRow: true, colSpan: 1, width: 200},
			{name: "doc_received_date", title:"Doc.Received on:",	startRow: false, colSpan: 1, width: 200},
			{name: "completeDate", title:"Complete On:", startRow: false, colSpan: 3, width: 200},
//			{name: "bccclc_complete_date", title:"Complete On:", type:"date",	startRow: false, colSpan: 3, width: 200},
		]
	});

	isc.ButtonToolbar.create({
		ID:"submitBtn",
		width: 100,
		disabled: disableAll,
		buttons:
		[
			{name: "Submit", onControl:onControlSubmitStatus, title:"Submit", type:"button", startRow: true, endRow: false, colSpan: 1, width: 100,  height:26,
					click : function ()
					{
						if(bccclc_FormDetail.validate(false))
						{
							if (confirm("Are you sure to Submit?"))
							{
								var today = new Date();
								var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
								var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
								var dateTime = date+' '+time;

								bccclc_FormDetail_3.setValue('lastEditPerson', loginData.userId);
								// bccclc_FormDetail_3.setValue('lastEditDate', dateTime);
								bccclc_FormDetail_3.setValue('lastEditDate', new Date());
								bccclc_FormDetail_4.setValue('submit_person', loginData.userId);
								bccclc_FormDetail_4.setValue('submit_date', new Date());

								if ( bccclc_FormDetail.getValue("editStatus") !== '3' && bccclc_FormDetail.getValue("editStatus") !== 'Old Data' )
								{
									bccclc_FormDetail.setValue('editStatus', '2');
					             }

								save_bccclc_FormDetail(function(save_ok, data){
									if(save_ok)
									{
										isc.say(saveSuccessfulMessage);
										enabledSection(true);
									}
								});
								
//								bccclc_FormDetail.saveData(
//									function (dsResponse, data, dsRequest)
//									{
//									  if(dsResponse.status==0)
//									  {
//										isc.say(saveSuccessfulMessage);
//										enabledSection(true);
//									  }
//									}
//								);
							}
						}
				  	}
				},
		]
	});

	isc.ControlledDynamicForm.create({
		ID:"bccclc_FormDetail_4",
		dataSource: "certJobBccclcDS",
		onControl:onControlWriteStatus,
		valuesManager:valueMan,
		disabled: disableAll,
		width:"100%",
		numCols: 6,
		colWidths: ["16", "150", "142", "220", "200"],
		fields:
		[
		 	{name: "text", title:"", type:"spacer", colSpan: 1, width: 10},
			{name: "submit_person", title:"", type:"label", showTitle:false,	startRow: false, colSpan: 1, width: 200, disabled: true},
			{name: "submit_date", title:"Submitted On:",	startRow: false, colSpan: 1, width: 200, disabled: true},
			{name: "editStatus", title:"Edit Status:",	startRow: false, colSpan: 1, width: 200, disabled: true},
		]
	});
	
	isc.HLayout.create({
		ID:"submitBtnBar",
		layoutTopMargin:0,
		layoutBottomMargin:0,
	    height:1,
		showEdges: false,
		membersMargin:0,
		members:[submitBtn, bccclc_FormDetail_4]
	});

	isc.ButtonToolbar.create({
		ID:"checkBtn",
		disabled: disableAll,
		width: 100,
		buttons:
		[
			{name: "Check", onControl:onControlCheckStatus, title:"Check", type:"button", startRow: true, endRow: false, colSpan: 1, width: 100, height:26,
					click : function()
					{
						if(bccclc_FormDetail.validate(false))
						{
							if (confirm("Are you sure to Check?"))
							{
								var today = new Date();
								var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
								var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
								var dateTime = date+' '+time;

								bccclc_FormDetail_3.setValue('lastEditPerson', loginData.userId);
								// bccclc_FormDetail_3.setValue('lastEditDate', date);
								bccclc_FormDetail_3.setValue('lastEditDate', new Date());

								bccclc_FormDetail_5.setValue('bcc_checker', loginData.userId);
								// alert(loginData.userId);
								bccclc_FormDetail_5.setValue('check_date', new Date());
								bccclc_FormDetail_3.setValue('edit_date', new Date());

								if ( bccclc_FormDetail_4.getValue("editStatus") !== 'Old Data' )
								{
									bccclc_FormDetail_4.setValue('editStatus', '3');
								}
								
								save_bccclc_FormDetail(function(save_ok, data){
									if(save_ok)
									{
										isc.say(saveSuccessfulMessage);
										enabledSection(true);
									}
								});
								
//								bccclc_FormDetail.saveData(
//									function (dsResponse, data, dsRequest)
//									{
//									  if(dsResponse.status==0)
//									  {
//										isc.say(saveSuccessfulMessage);
//										enabledSection(true);
//									  }
//									}
//								);
							}
						}
					}
				},
		]
	});

	isc.ControlledDynamicForm.create({
		ID:"bccclc_FormDetail_5",
		dataSource: "certJobBccclcDS",
		onControl:onControlWriteStatus,
		valuesManager:valueMan,
		disabled: disableAll,
		width:"100%",
		numCols: 5,
		colWidths: ["15", "148", "137", "200", "200"],
		fields:
		[
			{name: "text", title:"", type:"spacer", colSpan: 1, width: 5},
			{name: "bcc_checker", 	title:"Check", type:"label", startRow: false, showTitle: false, colSpan: 1, width: 200, disabled: true},
			{name: "check_date", title:"Check On:", type:"date", startRow: false, colSpan: 1, width: 200, disabled: true},
			{name: "text", title:"", type:"spacer", colSpan: 1, width: 220},
		]
	});

	isc.HLayout.create({
		ID:"checkBtnBar",
		layoutTopMargin:0,
		layoutBottomMargin:0,
	    height:1,
		showEdges: false,
		membersMargin:0,
		members:[checkBtn, bccclc_FormDetail_5]
	});

	isc.ButtonToolbar.create({
		ID:"bcccle_toolBar_1",
		buttons:
		[
			{name:"updateIssueDate", title:"Update Issue Date", autoFit: true, hidden:true, onControl:onControlWriteStatus,
				click : function ()
				{
					bccclc_update_issue_date_btn(record, certType);
				}
			},

			{name:"re-start", title:"Re-start", autoFit: true, onControl:onControlWriteStatus,
				click : function ()
				{
					bccclc_re_start_btn(record, certType);
				}
			}
		]
	});

	isc.ButtonToolbar.create({
		ID:"bcccle_toolBar_2",
		disabled: disableAll,
		buttons:
		[
			{name:"addCCLCert", title:addCertBtn, autoFit: true, onControl:onControlWriteStatus,
				click : function ()
				{
					add_bccclc_cert_btn(record, certType, this);
					
				}
			},

			{name:"cancelJob", title:"Cancel Job", autoFit: true, onControl:onControlWriteStatus,
				click : function ()
				{
					bccclc_cancel_btn(record, certType);
				}
			},

			{name:"processClose", title:"Process Close", autoFit: true, onControl:onControlWriteStatus,
				click : function ()
				{
					bccclc_process_close_btn(record, certType);
				}
			},

			{name:"saveBtn", title:"Save", autoFit: true, onControl:onControlWriteStatus,
				click : function ()
				{
					bccclc_save_btn(record, certType);
				}
			},

			/*
			{name:"closeBtn", title:"Close", autoFit: true,
			  click : function () 
			  {
				bccclc_FormDetail.setValues({});
				bccclc_FormDetail.setData({});
				bccclc_FormDetail.reset();
				bccclc_FormDetail.clearErrors(true);
				bccclc_DetailWindow.hide();
			  }
			}
			*/
		]
	});
	isc.ButtonToolbar.create({
		ID:"bcccle_toolBar_closeBtn",
		width:60,
		//disabled: disableAll,
		buttons:[
			{name:"closeBtn", title:"Close", autoFit: true,
			  click : function () 
			  {
				bccclc_FormDetail.setValues({});
				bccclc_FormDetail.setData({});
				bccclc_FormDetail.reset();
				bccclc_FormDetail.clearErrors(true);
				bccclc_DetailWindow.hide();
			  }
			}
		]
	});
	

	isc.HLayout.create({
		ID:"bcccle_toolBar",
		layoutTopMargin:0,
		layoutBottomMargin:0,
	    height:1,
		showEdges: false,
		membersMargin:0,
		members:[bcccle_toolBar_1, bcccle_toolBar_2, bcccle_toolBar_closeBtn]
	});

	isc.Window.create({
		ID:"bccclc_DetailWindow",
		isModal: true, showModalMask: true,
		//layoutMargin:10,
		width: "90%",
		height: "100%",
		// height: 850,
		title: "BCC@1.0",
		items:
		[
				isc.VLayout.create
				(
					{members:
					[
						bcccle_toolBar,
						isc.HLayout.create
						(
							{
								membersMargin:5,
								members:
							[
								bccclc_sidebar,
								isc.VLayout.create
								({
										ID:"sfBCCRhsPanel", showEdges: false, membersMargin:10, overflow: true,members:
										[
											bccclc_FormDetail_1,
											bccclc_FormDetail_2,
											bccclc_FormDetail_3,
											submitBtnBar,
											checkBtnBar
										]
								})
							]}
						)
					]
					}
				)

	       ],
		show:function(){
			bccclc_FormDetail.setData({});
			this.Super('show', arguments);
		}
	});
}

function add_bccclc_cert_btn(record, certType, addCertBtn_id)
{
	if(bccclc_FormDetail.validate(false))
	{
		if (confirm('Have you saved the data? Click the "Yes" button will add the cert directly.'))
		{
			var today = new Date();
			var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
			var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
			var dateTime = date+' '+time;

			if(certType == '0')
			{
				bccclc_sidebar.setData([]);
			}

			certType2 = bccclc_FormDetail_1.getValue("form");

			if(certType2 == 'BCC')
			{
				var form = bccclc_FormDetail.getItem("form").setValue("CLC");
				var cert_type = bccclc_FormDetail_1.setValue('cert_type', 'CLC');
				addCertBtn_id.setTitle("Add BCC Cert");
			}

			if(certType2 == 'CLC')
			{
				var form = bccclc_FormDetail.getItem("form").setValue("BCC");
				var cert_type = bccclc_FormDetail_1.setValue('cert_type', 'BCC');
				addCertBtn_id.setTitle("Add CLC Cert");
			}

			// bccclc_FormDetail_1.setValue('ship_id', ''); need to check

			bccclc_FormDetail_3.setValue('startPerson', loginData.userId);
			// bccclc_FormDetail_3.setValue('doc_received_date', date);
			// bccclc_FormDetail_4.setValue('editStatus', 1);
			bccclc_FormDetail_3.setValue('endDate', dateTime);
			bccclc_FormDetail_3.setValue('lastEditPerson', null);
			bccclc_FormDetail_3.setValue('lastEditDate', null);
			bccclc_FormDetail_3.setValue('cert_dept_code', null);

			bccclc_FormDetail_3.setValue('application_date', null);
			bccclc_FormDetail_3.setValue('doc_received_date', null);
			bccclc_FormDetail_3.setValue('completeDate', null);
//			bccclc_FormDetail_3.setValue('bccclc_complete_date', null);

			bccclc_FormDetail_3.setValue('application_date', new Date());
			bccclc_FormDetail_3.setValue('doc_received_date', new Date());

			bccclc_FormDetail_4.setValue('submit_person', null);
			bccclc_FormDetail_4.setValue('submit_date', null);
			bccclc_FormDetail_4.setValue('editStatus', null);

			bccclc_FormDetail_5.setValue('bcc_checker', null);
			bccclc_FormDetail_5.setValue('check_date', null);

			bccclc_FormDetail_1.setValue('refno', null);
			bccclc_FormDetail_3.setValue('issue_on', new Date());
			bccclc_FormDetail_1.setValue('jobno', null);
		}
	}
}

function bccclc_cancel_btn(record, certType)
{
	if(bccclc_FormDetail.validate(false))
	{
		if (confirm("Are you sure to cancel the job?"))
		{
			isc.TitleLabel.create
			({
				ID:"cancel_title",
				contents: "<p><b><font size=2px>Cancel Box <br /></font></b></p>"
			});

			isc.ButtonToolbar.create({
				ID:"cancel_ToolBar",
				buttons:
				[
					{name:"saveBtn", title:"Save", autoFit: true,
					  click : function ()
					  {
						if(bccclc_FormDetail.validate(false))
						{
							if (cancel_FormDetail.getItem("cancelReason").getValue() == null)
							{
								isc.say(nullMessage);
							} else
							{
								var today = new Date();
								var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
								var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
								var dateTime = date+' '+time;

								var cancelReason = cancel_FormDetail.getItem("cancelReason").getValue();

								// alert(dateTime);

								bccclc_FormDetail_3.setValue('lastEditPerson', loginData.userId);
								// bccclc_FormDetail_3.setValue('lastEditDate', dateTime);
								bccclc_FormDetail_3.setValue('lastEditDate', new Date());

								bccclc_FormDetail_3.setValue('status', 'Cancel');
								bccclc_FormDetail_3.setValue('cancelDate', new Date());
								bccclc_FormDetail_3.setValue('cancelReason', cancelReason);
								bccclc_FormDetail_3.setValue('cancelPerson', loginData.userId);

								save_bccclc_FormDetail(function(save_ok, data){
									if(save_ok)
									{
										isc.say(cancelSuccessfulMessage);
										enabledSection(true);
										cancel_DetailWindow.hide();
										bccclc_DetailWindow.hide();
									}
								});
								
//								bccclc_FormDetail.saveData(
//									function (dsResponse, data, dsRequest)
//									{
//									  if(dsResponse.status==0)
//									  {
//										  isc.say(cancelSuccessfulMessage);
//										  enabledSection(true);
//									  }
//									}
//								);
//
//								cancel_DetailWindow.hide();
//								bccclc_DetailWindow.hide();
							}
						}
					  }
					},
					{name:"closeBtn", title:"Close", autoFit: true,
					  click : function ()
					  {
						cancel_FormDetail.setValues({});
						cancel_FormDetail.setData({});
						cancel_FormDetail.reset();
						cancel_FormDetail.clearErrors(true);

						cancel_DetailWindow.hide();
					  }
					}
				]
			});

			isc.DynamicForm.create
			({
				ID:"cancel_FormDetail",
				dataSource: "certJobBccclcDS",
				width:"100%",
				numCols: 8,
				fields:
				[
					{name: "cancelReason", title:"", type: "textArea", startRow: true, rowSpan: 18, colSpan: 3, width: 750},
				]
			});

			// show content start
			isc.Window.create
			({
				ID:"cancel_DetailWindow",
				title: 'Cancel Box',
				isModal: true, showModalMask: true,
				width: 800, height: 400
				//, layoutMargin:10
				, items:
				[
			        isc.VLayout.create
			        ({
			        	members:
			        	[
			        		cancel_ToolBar,
			    	        cancel_title,
			    	        cancel_FormDetail
			        	]
			        })
				]
			});

			cancel_DetailWindow.show();
		}
	}
}

function bccclc_process_close_btn(record, certType)
{
	if(bccclc_FormDetail.validate(false))
	{
		if (confirm("Are you sure to close the job?"))
		{
			var today = new Date();
			var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
			var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
			var dateTime = date+' '+time;

			// bccclc_FormDetail.setValue('bccclc_complete_date', date); // something wrong
			bccclc_FormDetail.setValue('status', 'Complete');
			bccclc_FormDetail.setValue('completeDate', new Date());
			bccclc_FormDetail.setValue('bccclc_complete_date', new Date());

			save_bccclc_FormDetail(function(save_ok, data){
				if(save_ok)
				{
					isc.say(closeSuccessfulMessage);
					enabledSection(true);
					bccclc_DetailWindow.hide();
				}
			});
			
//			bccclc_FormDetail.saveData
//			(
//				function (dsResponse, data, dsRequest)
//				{
//				  if(dsResponse.status==0)
//				  {
//					  isc.say(closeSuccessfulMessage);
//					  enabledSection(true);
//				  }
//				}
//			);
//
//			bccclc_DetailWindow.hide();
		}
	}
}

function bccclc_save_btn(record, certType)
{
	if(bccclc_FormDetail.validate(false))
	{
		var today = new Date();
		var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
		var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
		var dateTime = date+' '+time;

		bccclc_FormDetail_3.setValue('lastEditPerson', loginData.userId);
		// bccclc_FormDetail_3.setValue('lastEditDate', dateTime);
		bccclc_FormDetail_3.setValue('lastEditDate', new Date());

		if( bccclc_FormDetail.getValue("form")==undefined || bccclc_FormDetail.getValue("form")=="" || bccclc_FormDetail.getValue("form")== null )
    	{
    		if(certType == 'BCC')
    		{
    			bccclc_FormDetail.getItem("form").setValue("BCC");
    		}

    		if(certType == 'CLC')
    		{
    			bccclc_FormDetail.getItem("form").setValue("CLC");
    		}

    	}

		save_bccclc_FormDetail(function(save_ok, data){
			if(save_ok)
			{
				isc.say(saveSuccessfulMessage);
				enabledSection(true);
			}
		});
		
//		bccclc_FormDetail.saveData(
//			function (dsResponse, data, dsRequest)
//			{
//			  if(dsResponse.status==0)
//			  {
//				if(certType !== '0')
//				{
//					bccclc_sidebar.setData(data.formlists);
//				}
//				
//				isc.say(saveSuccessfulMessage);
//				enabledSection(true);
//			  }
//			}
//		);
	}
}

function check_bccclc_duplicate(bccclc_FormDetail_obj, callback){
	var currentJobNo = bccclc_FormDetail_obj.jobno;
	if(bccclc_FormDetail_obj.status != 'Cancel'){
		certJobBccclcDS.fetchData({
			imono: bccclc_FormDetail_obj.imono,
			cert_type: bccclc_FormDetail_obj.cert_type,
			expiry_date: bccclc_FormDetail_obj.expiry_date
		}, function (dsResponse, data, dsRequest){
			var filteredData = data.filter(record => { 
				return StringUtils.isEmpty(currentJobNo) || record.jobno != currentJobNo;
			});
			if(filteredData.length == 0){
				callback();
			} else {
				var jobnos = filteredData.map(record => record.jobno).join(', ');
				isc.ask(`Duplicated cert found! Job No. with duplication: ${jobnos}. Do you want to continue saving?`, function (value){
					if(value){
						callback();
					}
				});
			}
		});
	} else {
		callback();
	}
}

function save_bccclc_FormDetail(callback_func)
{
	check_bccclc_duplicate(
		bccclc_FormDetail.getValues(),
		function (){
			if(!bccclc_saving)
			{
				bccclc_saving = true;
				
				bccclc_FormDetail.saveData(
					function (dsResponse, data, dsRequest)
					{
						var save_ok = false;
						if(dsResponse.status==0)
						{
							save_ok = true;

							
//							if(data.form)
//							{
//								addBccclcCert(data, data.form);
//							}
							if(data.formlists)
							{
								bccclc_sidebar.setData(data.formlists);
							}					
//							if(!callback_func)
//							{
//								isc.say(saveSuccessfulMessage);
////								enabledSection(true);
//							}
							
						}
						bccclc_saving = false;
						if(callback_func)
						{
							callback_func(save_ok, data);
						}
					}
				);
			
			}
			else if (bccclc_saving)
			{
				console.log("Rapid Saves!" );
				isc.say("System is busy. Please try again later.");
			}
		    else
		    {
//				console.log("validation fail!" );
//				isc.say("Validation failed. Please check input and try again.");
			}
	});
}

function bccclc_update_issue_date_btn(record, certType)
{
	function bccclc_select_windowContent()
	{
		var start_date_0 = bccclc_FormDetail_3.getValue("issue_on");
		var end_date_0 = bccclc_FormDetail_3.getValue("valid_date");

		isc.DynamicForm.create({
			ID:"bccclc_select_formDetail",
			numCols: 8,
			fields:
			[
				 {name: "issue_on_select", title:"Issue Date", type:"date", width:300, defaultValue: start_date_0, useTextField:true, startRow: true},
				 {name: "valid_date_select", title:"Valid Date", type:"date", width:300, defaultValue: end_date_0, useTextField:true, startRow: true}
			]
		});

		isc.ButtonToolbar.create({
			ID:"bccclc_select_toolBar",
			buttons: 
			[
				{name:"saveBtn", title:"OK", autoFit: true,
				  click : function () {
					if(bccclc_select_formDetail.validate())
					{
						var today = new Date();
						var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
						var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
						var dateTime = date+' '+time;

						
						var start_date = new Date(bccclc_select_formDetail.getValue("issue_on_select"));
						var end_date = new Date(bccclc_select_formDetail.getValue("valid_date_select"));
						
						if (start_date <= end_date) {
							bccclc_FormDetail_3.setValue('issue_on', start_date);
							bccclc_FormDetail_3.setValue('valid_date', end_date);
							
							bccclc_save_btn(bccclc_FormDetail.getValues(), bccclc_FormDetail.getValue("cert_type"));
							bccclc_select_detailWindow.hide();
							//isc.say(setValueSuccessfulMessage);
							
						}else{
							//alert('The Valid date has to more than the Issue date !');
							isc.say('The issue date should not be later than the valid date.');
						}
						
					}
				  }
				},

				{name:"closeBtn", title:"Cancel", autoFit: true,
				  click : function () {
					bccclc_select_formDetail.setValues({});
					bccclc_select_formDetail.setData({});
					bccclc_select_formDetail.reset();
					bccclc_select_formDetail.clearErrors(true);

					bccclc_select_detailWindow.hide();
				  }
				}
			]
		});

		isc.Window.create({
			ID:"bccclc_select_detailWindow", 
			title: "Update Issue Date",
			width: 410,
			height: 150,
			layoutTopMargin: 0,
			isModal: true, showModalMask: true, 
			items: 
			[
		        isc.VLayout.create
		        ({
		        	members: 
		        	[
		    	        bccclc_select_formDetail, 
		    	        bccclc_select_toolBar
		        	]
		        })
			],
			show:function(){
				bccclc_select_formDetail.setData({});
				this.Super('show', arguments);
			}
		});
	}

	bccclc_select_windowContent();

	bccclc_select_detailWindow.show();

}

function bccclc_re_start_btn(record, certType)
{
	function bccclc_re_start_windowContent()
	{
		isc.TitleLabel.create
		({
			ID:"bccclc_re_start_text",
			layoutTopMargin: 100,
			contents: "<p><br /><font size=2px>Do you start [Second Validation] or simple modifications ? <br />Y - [Second Validation]; N - simple modifications; <br /><br /></font></p>"
		});

		isc.ButtonToolbar.create({
			ID:"bccclc_re_start_toolBar",
			buttons:
			[
				{name:"bccclcYesBtn", title:"Yes", autoFit: true,
					click : function () 
					{
						var today = new Date();
						var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
						var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
						var dateTime = date+' '+time;

						if(record.status == 'Complete')
						{
							//bccclc_FormDetail.reset();

							bccclc_FormDetail_1.setValue('refno', bccclc_FormDetail_1.getValue("refno")+"A");
							bccclc_FormDetail_1.setValue('validation_times', (parseInt(bccclc_FormDetail.getValue("validation_times"), 10) + 1).toString());

							bccclc_FormDetail_3.setValue('status', "Process");
							bccclc_FormDetail_4.setValue('editStatus', "1");
							bccclc_FormDetail_3.setValue('startPerson', loginData.userId);

							bccclc_re_start_detailWindow.hide();
							
							//isc.say(setValueSuccessfulMessage);
							isc.say("Re-start job successfully.", function(value){
								bccclc_save_btn(bccclc_FormDetail.getValues(), bccclc_FormDetail.getValue("form"));
								//disableAll = false;
								bccclc_DetailWindow.hide();
								addBccclcCert(bccclc_FormDetail.getValues(), bccclc_FormDetail.getValue("form"));
								
							});
						}else{
							// else action
						}
					}
				},

				{name:"bccclcNoBtn", title:"No", autoFit: true,
					click : function () 
					{
						var today = new Date();
						var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
						var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
						var dateTime = date+' '+time;

						if(record.status == 'Complete')
						{
							//bccclc_FormDetail.reset();

							bccclc_FormDetail_3.setValue('status', "Process");
							bccclc_FormDetail_4.setValue('editStatus', "1");
							bccclc_FormDetail_3.setValue('startPerson', loginData.userId);

							bccclc_re_start_detailWindow.hide();
							//isc.say(setValueSuccessfulMessage);
							isc.say("Re-start job successfully.", function(value){
								bccclc_save_btn(bccclc_FormDetail.getValues(), bccclc_FormDetail.getValue("form"));
								//disableAll = false;
								bccclc_DetailWindow.hide();
								addBccclcCert(bccclc_FormDetail.getValues(), bccclc_FormDetail.getValue("form"));
								
							});
							
						}else{
							// else action
						}
					}
				},

				{name:"closeBtn", title:"Cancel", autoFit: true,
				  click : function () {
					bccclc_re_start_detailWindow.hide();
				  }
				}
			]
		});

		isc.Window.create({
			ID:"bccclc_re_start_detailWindow", 
			title: "Re-start Job",
			width: 410,
			height: 200,
			layoutTopMargin: 0,
			isModal: true, showModalMask: true, 
			items: 
			[
		        isc.VLayout.create
		        ({
		        	members: 
		        	[
		    	        bccclc_re_start_text, 
		    	        bccclc_re_start_toolBar
		        	]
		        })
			],
			show:function(){
				this.Super('show', arguments);
			}
		});
	}

	bccclc_re_start_windowContent();

	bccclc_re_start_detailWindow.show();

}


function enableBccclcWindow(enabled) {
	bccclc_FormDetail_1.enable();
	bccclc_FormDetail_2.enable();
	bccclc_FormDetail_3.enable();
	bccclc_FormDetail_4.enable();
	
}




