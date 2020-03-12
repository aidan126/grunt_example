/***************************************************************************************************************
* Qualified Name	 	/webui/src/main/webapp/js/hkmis_cert/dmlc.js
* @author 				Dicky Lee
* @since				2019-07-25
* **************************************************************************************************************
* Change log:
* log no	Change complete date	Developer			Change Reason
* ======	====================	=========			=============
* 00000		2019-07-25				Dicky Lee			Initial Implementation
* 00001		2019-08-07				Jacky Ng			Deleted duplicated function and rename duplicated var name
* 00002     2019-08-08				Dicky Lee			Check status to allow edit
* 00003		2019-09-05				Dicky Lee			change to authorized person to combobox
* 00004		2019-09-10				Dicky Lee			add reissue function
*	
****************************************************************************************************************/

function dmlc_windowContent(record)
{

	var valueMan = isc.ValuesManager.create({
	    ID: "certJobDmlcVM",
		dataSource: certJobDmlcDS
	});

	isc.ListGrid.create
	({
	    ID:"dmlc_sidebar",
	    width: "160",
	    height: "768",
	    autoFetchData: false,
	    dataSource: formlistDS,
	    showEdges:true,
	    initialSort:
	    [
	        {property: "formlist_jobno", direction: "ascending"},
	        {property: "formlist_form", direction: "descending"},
	        {property: "formlist_ver", direction: "ascending"}
	    ],
        fields:
        [
			{name: "formlist_form", title: "Form" },
			{name: "formlist_ver", title: "Ver" }
        ],
        rowDoubleClick:function(record, recordNum, fieldNum)
	    {
	    	var certPara = {};
//			var requestArguments = [];
			Object.assign(certPara, {"jobno" : record.formlist_jobno});

			console.log(record.formlist_form);
			console.log(record.formlist_jobno);
			
//			requestArguments = ["RPT_Dmlc", params];
//			ReportViewWindow.displayReport(requestArguments);
			
			certName = "RPT_Dmlc";
            var aboutToSetAsPrinted = showPrintOptionWindow(certName, certJobDmlcVM.values, certPara, null);
//            var aboutToSetAsPrinted = showPrintOptionWindow(certName, record, certPara, setAsPrinted);




            console.log("aboutToSetAsPrinted: " + aboutToSetAsPrinted);
	        if (aboutToSetAsPrinted == 1){
	            console.log("print to printer btn is pressed__@@@");
	        }
	    }
	});

/* 00001 - Start Add */
	isc.ControlledDynamicForm.create({
		ID:"dmlc_FormDetail",
		dataSource: "certJobDmlcDS",
		onControl:"DMLC_WRITE",
		valuesManager:valueMan,
		width:"100%",
		numCols: 8,
//		colWidths: ["1", "1", "1", "1", "1", "1", "1", "1"],
		fields:
		[
			{name: "form", 	title:"Form",	startRow: true, disabled: true, textAlign:"center", colSpan: 1, width: 200},
			{name: "ver", title:"Ver:",	startRow: false, disabled: true, defaultValue :"1.0" , textAlign:"center", colSpan: 3, width: 200},
		
//			{ _constructor:"SpacerItem", colSpan: 2 },
			{name: "jobno", title:"Job No:",	startRow: false, disabled: true, canEdit: false, textAlign:"center", colSpan: 1, width: 200},

			{name: "file_no", 	title:"File No.", mask: ">CCCCCCCCC",	startRow: true, textAlign:"center", colSpan: 1, width: 200},
			{name: "cert_dept_code", title:"Dept:",	startRow: false, disabled: false,hidden:false, textAlign:"center", colSpan: 3, width: 200
				, type:"select", optionDataSource:"userCertDeptDS", displayField:"cert_dept_code", valueField:"cert_dept_code"
					, pickListFields:[
			              {name:"cert_dept_code"},
			              {name:"cert_dept_name"}
			          ],
					  defaultValue : current_cert_dept.cert_dept_code,
			          pickListWidth:350,
			},
			{name: "refno", title:"Track No.",	startRow: false, disabled: true, canEdit: false, textAlign:"center", colSpan: 1, width: 200},
		]
	});

	certJobShipDF("dmlc_FormDetail_2", valueMan, "DMLC_WRITE" , ["spname","imono","gross"] );
	
	isc.ControlledDynamicForm.create({

		ID:"dmlc_FormDetail_3",
		onControl:"DMLC_WRITE",
		valuesManager:valueMan,
//		cellBorder: 1,

//		ID:"dmlc_FormDetail",				// 00001  -Commented
		dataSource: "certJobDmlcDS",
		width:"100%",
		numCols: 8,
//		colWidths: ["1", "1", "1", "1", "1", "1", "1", "1"],
		fields:
		[
			{name: "ship_reg_status", 	title:"Registry Status",	startRow: false, defaultValue:"F", textAlign:"center", colSpan: 1, width: 50,hidden:true},
			{name: "reissued", 	title:"Issuance",	startRow: true, colSpan: 1, width: "100%"
				, valueMap: {
					"Y":"Re-Issuance" 
				}
				, defaultValue: null
				, allowEmptyValue: true
				, emptyDisplayValue:"New Issuance"
			},

			{name: "remarks", 	title:"Remarks:", type:"textArea"	,startRow: true, colSpan: 5, width: "100%" },

		 	{name: "issue_date", 	title:"Issue Date:", type:"date", startRow: true, textAlign:"center", colSpan: 1, id: "IssueOn1", width: 150, align: "left"},

		]
	});


	isc.ControlledDynamicForm.create({

		ID:"dmlc_form_AOS",
		valuesManager:valueMan,
			
		onControl:"DMLC_WRITE",
		dataSource: "certJobDmlcDS",
		isGroup: true,
		groupTitle:"Authorized Official Signature",
		saveOnEnter:true,
 		submit:function(){
 			btnFillName.click();},
		width:"400",
		numCols: 2,
		colWidths: [97, "*"],

		fields:
		[
		 	{name: "cert_sig_name", 	title:"Name", startRow: true, width: "100%",
		 		 editorType:"ComboBoxItem", optionDataSource:"userDS", displayField:"userName", valueField:"userName"
//		 			,pickListProperties: {			            		            
//			            selectionUpdated : function (record, recordList){			        		 			            	
//			            	var record1 = record;
//			            	if(record1!=null ){
//			            		dmlc_form_AOS.setValue('cert_sig_title',record1.title);
//			            		//jQuery.event.trigger({ type: 'keydown', which: 9 }); 
//			            	}
//			            }
//		 			}
		 			 , pickListFields:
						[
				            {name:"userName"}
				        ]
				          , optionCriteria:{
				        	  authorized_official:true
				          }
				          , pickListWidth:350
	
		 	},

		 	{name: "cert_sig_title", 	title:"Title", type:"text"	,startRow: true,  width: "100%",defaultValue:"Assistant Director/ Shipping" },

		 	{name: "cert_sig_place", 	title:"Place", type:"text",defaultValue : "Hong Kong" ,startRow: true, width: "100%"
		 	
		 		
		 	},

		],
		
		
	});

	
	isc.IButton.create({
	    //left:10, width:80,
		ID:"btnFillName",
		autoDraw: false,
		endRow:false,
	    title:"Fill below",
	    onControl:"DMLC_WRITE",
	    click: function (){
	    	var name = dmlc_form_AOS.getItem("cert_sig_name").getValue();
			var title = dmlc_form_AOS.getItem("cert_sig_title").getValue();
			
			dmlc_form_SES.getItem("equiv_sig_name1").setValue(name);
			dmlc_form_SES.getItem("equiv_sig_title1").setValue(title);
			
			dmlc_form_ExS.getItem("exemp_sig_name1").setValue(name);
			dmlc_form_ExS.getItem("exemp_sig_title1").setValue(title);
	    }
	    
	    ,
	})
	
	isc.IButton.create({
	    //left:10, width:80,
		ID:"btnClearFill",
		autoDraw: false,
	    title:"Clear below",
	    startRow:false,endRow:true,	    
	    onControl:"DMLC_WRITE",
	    click: function (){
	    	dmlc_form_SES.clearValues();
	    	dmlc_form_ExS.clearValues();
			/*
	    	dmlc_form_SES.getItem("equiv_sig_name1").setValue(name);
			dmlc_form_SES.getItem("equiv_sig_title1").setValue(title);
			
			dmlc_form_ExS.getItem("exemp_sig_name1").setValue(name);
			dmlc_form_ExS.getItem("exemp_sig_title1").setValue(title);
			*/
	    }
	    
	    ,
	})
	
	isc.HLayout.create({
		ID:"hlButtonFill",
		height:20,
		width:"100%",
		membersMargin:5,
		members:[btnFillName,btnClearFill]
		
	});
	
	isc.ControlledDynamicForm.create({

		ID:"dmlc_form_SES",
		valuesManager:valueMan,
		onControl:"DMLC_WRITE",
		dataSource: "certJobDmlcDS",
		isGroup: true,
		groupTitle:"Substantial Equivalencies Signature",

		width:400,
		numCols: 2,
		colWidths: [97, "*"],
//		colWidths: ["1", "1", "1", "1", "1", "1", "1", "1"],
		fields:
		[
		 	{name: "equiv_sig_name1", 	title:"Name", type:"text"	,startRow: true, width: "100%",
		 		 editorType:"ComboBoxItem", optionDataSource:"userDS", displayField:"userName", valueField:"userName"
//			 			,pickListProperties: {			            		            
//				            selectionUpdated : function (record, recordList){			        		 			            	
//				            	var record1 = record;
//				            	if(record1!=null ){
//				            		dmlc_form_AOS.setValue('cert_sig_title',record1.title);
//				            		//jQuery.event.trigger({ type: 'keydown', which: 9 }); 
//				            	}
//				            }
//			 			}
			 			 , pickListFields:
							[
					            {name:"userName"}
					        ]
					          , optionCriteria:{
					        	  authorized_official:true
					          }
					          , pickListWidth:350
		 	},

		 	{name: "equiv_sig_title1", 	title:"Title", type:"text"	,startRow: true, width: "100%" },

		 	{name: "equiv_sig_place1", 	title:"Place", type:"text",defaultValue : "Hong Kong"	,startRow: true, colSpan: 5, width: "100%" },

		]
	});

	isc.ControlledDynamicForm.create({

		ID:"dmlc_form_ExS",
		valuesManager:valueMan,
		onControl:"DMLC_WRITE",
		dataSource: "certJobDmlcDS",
		isGroup: true,
		groupTitle:"Exemptions Signature",

		width:400,
		numCols: 2,
		colWidths: [97, "*"],
//		colWidths: ["1", "1", "1", "1", "1", "1", "1", "1"],
		fields:
		[
		 	{name: "exemp_sig_name1", 	title:"Name", type:"text"	,startRow: true, width: "100%",
		 		 editorType:"ComboBoxItem", optionDataSource:"userDS", displayField:"userName", valueField:"userName"
//			 			,pickListProperties: {			            		            
//				            selectionUpdated : function (record, recordList){			        		 			            	
//				            	var record1 = record;
//				            	if(record1!=null ){
//				            		dmlc_form_AOS.setValue('cert_sig_title',record1.title);
//				            		//jQuery.event.trigger({ type: 'keydown', which: 9 }); 
//				            	}
//				            }
//			 			}
			 			 , pickListFields:
							[
					            {name:"userName"}
					        ]
					          , optionCriteria:{
					        	  authorized_official:true
					          }
					          , pickListWidth:350
		 	},

		 	{name: "exemp_sig_title1", 	title:"Title", type:"text"	,startRow: true, width: "100%" },

		 	{name: "exemp_sig_place1", 	title:"Place", type:"text",defaultValue : "Hong Kong"	,startRow: true, width: "100%" },

		]
	});

	isc.HLayout.create({
        ID:"dmlc_layout_sig2",
    //	width:sfdmlcRhsPanelWidth,
        width:"95%",
        height:"200",
        showEdges: false,
        //layoutBottomMargin: 30,
        membersMargin:5, members:[dmlc_form_SES,dmlc_form_ExS]
    });

	 isc.VLayout.create({
	        ID:"layout_dmlc_information",
	        //width:680, height:350,
	        //height:"70%",
	        padding:10,
	        //layoutLeftMargin:30,
	        /*top:20,*/
	        isGroup: true, groupTitle: "DMLC-I Information",
	        showEdges: false,
	        membersMargin:5, members:[dmlc_FormDetail_3,dmlc_form_AOS,hlButtonFill,dmlc_layout_sig2]
	    });

	isc.ButtonToolbar.create({
		ID:"dmlc_ToolBar",
		buttons:
		[
			
			{name:"btnReIssue", title:"Re-issue", autoFit: true, onControl:"DMLC_WRITE",
				  click : function ()
				  {
					  if (confirm("Sure to re-issue this cert?")) {
						if (certJobDmlcVM.getValue("status") == "Complete")					
						{							
												
							  //---clone the reco
							  certJobDmlcVM.setValue("jobno",null);
							  certJobDmlcVM.setValue("refno",null);
							  certJobDmlcVM.setValue("issue_date","");
							  certJobDmlcVM.setValue("reissued","Y");
							  certJobDmlcVM.setValue("completeDate","");
							  certJobDmlcVM.setValue("status","Process");
							  certJobDmlcVM.setValue("formlists",[]);
						
							
							certJobDmlcVM.saveData(function (dsResponse, data, dsRequest){
								  if(dsResponse.status==0){
									  //isc.say(closeSuccessfulMessage);
									  enabledSection(true);
										disableCertJobShipDFControls(dmlc_FormDetail_2, false);
										
										disableDmlcWindowControls(false);
									  dmlc_sidebar.setData(data.formlists);										  
									  isc.say("DMLC re-issued successfully!");
								  }
								}
							);
						}
						else
							isc.say("This record is not closed!");
					  }
				}
			},
			{name:"btnReOpen", title:"Re-open", autoFit: true, onControl:"DMLC_WRITE"
//				, hidden: (certJobDmlcVM.getValue("status") == "Complete")? false:true
				, click : function ()
				{
					if (confirm("Sure to re-open this cert?")) 
					{
						if (certJobDmlcVM.getValue("status") != "Process")					
						{							
												
							  //---clone the reco
							  certJobDmlcVM.setValue("completeDate","");
							  certJobDmlcVM.setValue("status","Process");
						
							
							certJobDmlcVM.saveData(function (dsResponse, data, dsRequest){
								if(dsResponse.status==0){
									openDmlcCertRecDetail(data);
									
									  //isc.say(closeSuccessfulMessage);
//									  enabledSection(true);
//										disableCertJobShipDFControls(dmlc_FormDetail_2, false);
//										
//										disableDmlcWindowControls(false);
//									  dmlc_sidebar.setData(data.formlists);										  
									
									isc.say("DMLC re-opened successfully!");
								}
							});
						}
						else
						{
							isc.say("This record is not closed!");
						}
					}
				}
			},

			
			{name:"cancelJob", title:"Cancel Job", autoFit: true, onControl:"DMLC_WRITE",
			  click : function ()
			  {
				if(certJobDmlcVM.validate())
				{

					  if (confirm(promptCancelJob)){
                          canceldmlcJobWindow();
                       }
					
				}
			  }
			},

			{name:"processClose", title:"Process Close", autoFit: true, onControl:"DMLC_WRITE",
				click : function ()
				{
					   if(certJobDmlcVM.validate()) {
							if (confirm(promptCloseJob)) {
								var today = new Date();
								
								certJobDmlcVM.setValue('status', 'Complete');
								certJobDmlcVM.setValue('completeDate', today);

								certJobDmlcVM.saveData(function (dsResponse, data, dsRequest){
									  if(dsResponse.status==0){
										  isc.say(closeSuccessfulMessage);
										  enabledSection(true);
									  }
									}
								);
								dmlc_DetailWindow.hide();
							}
						}
				}
			},

			{name:"saveBtn", title:"Save", autoFit: true, onControl:"DMLC_WRITE",
			  click : function () {
				  saveDmlcRecord(0);
				  }
			},

			{name:"closeBtn", title:"Close", autoFit: true,
			  click : function () {
				dmlc_FormDetail.setValues({});
				dmlc_FormDetail.setData({});
				dmlc_FormDetail.reset();
				dmlc_FormDetail.clearErrors(true);
				  //TODO

				  dmlc_DetailWindow.hide();
			  }
			}
		]
	});

	isc.Window.create({
		ID:"dmlc_DetailWindow",
		isModal: true, showModalMask: true,
		width: "90%",
		height: "100%",				
		title: "DMLC@1.0",
		overflow : "auto",
		items:
		[
				isc.VLayout.create
				(
					{members:
					[
						dmlc_ToolBar,
						isc.HLayout.create
						(
								
							{
								membersMargin:5,
								members:
							[
								dmlc_sidebar,
								isc.VLayout.create
								({
										ID:"sfDmlcRhsPanel", showEdges: false, membersMargin:10, overflow: true,members:
										[
											dmlc_FormDetail,
											dmlc_FormDetail_2,
											layout_dmlc_information
										]
								})
							]}
						)
					]
					}
				)

	       ],
		show:function(){
			dmlc_FormDetail.setData({});
			this.Super('show', arguments);
		}
	});
}


/* 00001 - Start Delete */
//function getCertPara(){
//    var params = {};
//    Object.assign(params, {"e_class1_STCW_reg" : ls_e_class1_text});
//    Object.assign(params, {"e_class2_STCW_reg" : ls_e_class2_text});
//    return params;
//}
/* 00001 - End Delete */

function disableDmlcWindowControls(disable){
	
//	dmlc_ToolBar.getButton("cancelJob").Super("setDisabled", disable);
//	
//	dmlc_ToolBar.getButton("saveBtn").Super("setDisabled", disable);
//	
//	dmlc_FormDetail.setDisabled(disable);
//	
//	layout_dmlc_information.setDisabled(disable);

	console.log("disable=" + disable);
	
	dmlc_ToolBar.getButton("cancelJob").Super("setDisabled",disable);	
	dmlc_ToolBar.getButton("saveBtn").Super("setDisabled",disable);

	if (disable==true)
		{
		dmlc_ToolBar.getButton("processClose").hide();
		dmlc_ToolBar.getButton("btnReIssue").show();
		dmlc_ToolBar.getButton("btnReOpen").show();
		}
	else
		{
		dmlc_ToolBar.getButton("processClose").show();
		dmlc_ToolBar.getButton("btnReIssue").hide();
		dmlc_ToolBar.getButton("btnReOpen").hide();
		}
	
	dmlc_FormDetail.setDisabled(disable);
	dmlc_FormDetail_2.setDisabled(disable);
	dmlc_FormDetail_3.setDisabled(disable);
	dmlc_form_AOS.setDisabled(disable);
	dmlc_form_SES.setDisabled(disable);
	dmlc_form_ExS.setDisabled(disable);
	btnFillName.setDisabled(disable);
	btnClearFill.setDisabled(disable);
	
}

function saveDmlcRecord(saveMode){
	//saveMode:
	//0:normal save
	//1:mark as printed
    if (certJobDmlcVM.validate()){
        var requestParam = {"operationType":"update"};

        //certJobDmlcVM.setValue("usr befre before saving", sfUMSSpecEn.getValue("usr"));
        //certJobDmlcVM.setValue("usrzh", sfUMSSpecEn.getValue("usrzh"));
    	if( certJobDmlcVM.getValue("form")==undefined || certJobDmlcVM.getValue("form")=="" || certJobDmlcVM.getValue("form")== null )
    	{
    		certJobDmlcVM.getItem("form").setValue("MLC");	
    	}
        
        console.log("usr before saving: " + certJobDmlcVM.getValue("usr"));
        console.log("usrzh before saving: " + certJobDmlcVM.getValue("usrzh"));

        certJobDmlcVM.saveData(function(dsResponse, data, dsRequest) {
            console.log("certJobDmlcVM.saveData() entered in common save function");
            if (dsResponse.status == 0) {
                if (!isNull(saveMode) && saveMode == 0) {
                    isc.say(saveSuccessfulMessage);
                   // dmlc_sidebar.fetchData({formlist_jobno:record.jobno});
                    
                }
                dmlc_sidebar.setData(data.formlists);

            }
        }, requestParam);
    }
}


function canceldmlcJobWindow() {
    console.log("canceldmlcJobWindow()");

    //var dmlc_cancel_title = 
	isc.TitleLabel.create({
        ID:"dmlc_cancel_title",
        contents: "<p><b><font size=2px>Cancel Box <br /></font></b></p>"
    });

    //var dmlc_cancel_FormDetail = 
	isc.ControlledDynamicForm.create({
        ID:"dmlc_cancel_FormDetail",
        dataSource: "certJobDmlcDS",
        onControl: "DMLC_WRITE",
        width:"100%",
        numCols: 8,
        fields:
        [
            {name: "cancelReason", title:"", type: "textArea", startRow: true, rowSpan: 18, colSpan: 3, width: 750},
        ]
    });

    //var dmlc_cancel_ToolBar = 
	isc.ButtonToolbar.create({
        ID:"dmlc_cancel_ToolBar",
        buttons: [
            {name:"saveBtn", title:"Save", autoFit: true,
	            onControl: "DMLC_WRITE",
              click : function (){
                if(certJobDmlcVM.validate()){
                    var cancelReason = dmlc_cancel_FormDetail.getItem("cancelReason").getValue();
                    if (isNull(cancelReason) || (cancelReason = cancelReason.trim()) == "") {
                        isc.say(nullMessage);
                        return;
                    }

                    var today = new Date();
                    //var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                    //var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                    //var dateTime = date+' '+time;

                    // alert(dateTime);
                    console.log("loginData.userId: " + loginData.userId);
                    certJobDmlcVM.setValue('lastEditPerson', loginData.userId);
                    certJobDmlcVM.setValue('lastEditDate', today);

                    certJobDmlcVM.setValue('status', 'Cancel');
                    certJobDmlcVM.setValue('cancelDate', today);
                    certJobDmlcVM.setValue('cancelReason', cancelReason);
                    certJobDmlcVM.setValue('cancelPerson', loginData.userId);

                    console.log("status: " + certJobDmlcVM.getValue("status"));
                    certJobDmlcVM.saveData(
                        function (dsResponse, data, dsRequest){
                            if (dsResponse.status==0){
                                isc.say(cancelSuccessfulMessage);
                                enabledSection(true);
                            }
                        }
                    );

                    dmlc_cancel_DetailWindow.hide();
                    dmlc_DetailWindow.hide();
                }
              }
            },
            {name:"closeBtn", title:"Close", autoFit: true,
              click : function (){
                dmlc_cancel_FormDetail.setValues({});
                dmlc_cancel_FormDetail.setData({});
                dmlc_cancel_FormDetail.reset();
                dmlc_cancel_FormDetail.clearErrors(true);
                  //TODO

                dmlc_cancel_DetailWindow.hide();
              }
            }
        ]
    });

    // show content start
    isc.Window.create({
        ID:"dmlc_cancel_DetailWindow",
        title: 'Cancel Box',
        isModal: true, showModalMask: true,
        width: 800, height: 400, layoutMargin:10,
        items: [
            isc.VLayout.create({
                members:[
                    dmlc_cancel_ToolBar,
                    dmlc_cancel_title,
                    dmlc_cancel_FormDetail
                ]
            })
        ]
    });
    dmlc_cancel_DetailWindow.show();
}

function openDmlcCertRecDetail(record)
{
	//Init the Forms and ListGrids

	console.log("before dmlc_windowContent(record)");
	//console.log(record.status);
	 dmlc_windowContent(record);
//	var canEdit = true;
	
	
	console.log("After dmlc_windowContent(record)");
	
	
//	dmlc_windowContent()
	//dmlc_sidebar.fetchData({formlist_jobno:record.jobno});
//	dmlc_sidebar.setData(record.formlists);

	dmlc_DetailWindow.show();

	console.log("After dmlc_DetailWindow.show()");
	
//	if(!isNull(record)){
	if(!isNull(record) && !isNull(record.jobno)){
		//Update record;
//		if (record.status !='Process')	    
//		{	canEdit =false;} 	
			
		
		dmlc_FormDetail.getField('jobno').setDisabled(true);
		var demo3Id = record.jobno;
		dmlc_sidebar.fetchData({formlist_jobno:record.jobno});
		certJobDmlcVM.fetchData({jobno:record.jobno},function (dsResponse, data, dsRequest) {
            console.log("callback of certJobDmlcVM.fetchData() " + data);
//            if (!isNull(dsResponse) && dsResponse.status == 0)
            if(data.size())
			{
    			dmlc_DetailWindow.setTitle("DMLC-I Detail (ID: " + demo3Id + " )");
    			enableCertJobShipDF(dmlc_FormDetail_2, data);
    			//====change log 000002 === only allow edit if status = process =

    			var canEdit = true;
    			if (data[0].status !='Process')	    
    			{	canEdit =false;} 							
    			disableDmlcWindowControls(!canEdit);
    				
    			
    			
    			//==end of modification =====
			}
            else
			{
				isc.say("Record not found.");
				return;
			}            
            
		});

		enabledSection(true);
		
	}else{
		//New record;
		dmlc_DetailWindow.setTitle("DMLC-I@1.0");
		dmlc_FormDetail.getField('jobno').setDisabled(true);
		dmlc_FormDetail.setValues({});		
		dmlc_sidebar.setData([]);
		dmlc_FormDetail.clearErrors(true);
		
		
		dmlc_ToolBar.getButton("btnReIssue").hide();
		dmlc_ToolBar.getButton("btnReOpen").hide();
		
		enabledSection(false);
		if(!isNull(record)){
			certJobDmlcVM.setData(record);
		}
		certJobDmlcVM.getItem("form").setValue("MLC");
	}
}
