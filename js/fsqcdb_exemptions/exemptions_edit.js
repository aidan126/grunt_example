/***************************************************************************************************************
* Qualified Name	 	/webui/src/main/webapp/js/fsqcdb_exemptions/exemptions_edit.js
* @author 				Dicky Lee
* @since				2019-08-15
* **************************************************************************************************************
* Change log:
* log no	Change complete date	Developer			Change Reason
* ======	====================	=========			=============
* 00000		2019-08-15				Dicky Lee			Initial Implementation
* 00001		2019-08-29				Jacky Leong			Change to allow add from fsqcShip Exemption Tab
* 00002		2019-09-03				Dicky Lee			add access control
* 00003		2019-09-25				Dicky Lee			lock ui items when close case
* 00004		2019-09-30				Dicky Lee			add control access to select exemption code button 
* 00005		2019-10-15				Jacky Ng			split the "Min&Cert" btn into 2 btn(s)
****************************************************************************************************************/
console.log("exemptions_edit.js");
var min_DicContentId = 0;
var min_DicItemArr = [];

var cert_DicContentId = 0;
var cert_DicItemArr = [];


var objExCodePara = null;

var exCodeChoiceChanged = false;
var oldSysRecMissingBridge = false;
var oldRecFromOldSystem = false;

var oldFormType = "";
var old_ex_code_id = -1;

var ecertRecformType = "";
var selectedFormTypeForEcertRec = "";
var saveECertRecordOpenMinWinDone = false;
var saveECertRecordOpenCertWinDone = false;

var missingFormListForERecordMin = false;
var missingFormListForERecordMinChecked = false;
var missingFormListForERecordMinDone = true;
var missingExemJobForERecordMin = false;
var missingExemJobForERecordMinChecked = false;
var missingExemJobForERecordMinDone = true;

var missingFormListForERecordCert = false;
var missingFormListForERecordCertChecked = false;
var missingFormListForERecordCertDone = true;
var missingExemJobForERecordCert = false;
var missingExemJobForERecordCertChecked = false;
var missingExemJobForERecordCertDone = true;




//for NoFK
///1st item is for FormList; 2nd item is for Exemption_job
var eCertMissingArr = [false,false];
var eCertMissingArrChecked = [false,false];
var eCertMissingArrHandled = [true,true];

var eCertCO2MissingArr = [false,false];
var eCertCO2MissingArrChecked = [false,false];
var eCertCO2MissingArrHandled = [true,true];

var letterMissingArr = [false,false];
var letterMissingArrChecked = [false,false];
var letterMissingArrHandled = [true,true];

//the whole process of handling missing rec For No FK completes or not
var missingRecForNoFKHandled = true;


var formTypePriorityForMisssingFK = ["Exemption Certificate(CO2)", "Letter", "Exemption Certificate"];
var fixMissingRecConfirm = "This exemption record seems to be from old system and requires conversion before proceeding. Do you want to convert it?";
//var fixMissingRecConfirm = "Data corruption of exemption cert record occurs. Do you want to fix it?";
var bg_highlight_exem_edit = "#ffff00";


var exemptions_edit_saving = false;
isc.ValuesManager.create({
    ID: "exemptionEditVM",
	dataSource: eCertRecordDS
});
var edit_ecertRecordID = null;
function exemptionsWindowsContent()
{
	exemptions_edit_saving = false;
	
	 var counter ;
	 
	 counter = 0 ;
	 	 
	//Date.setShortDisplayFormat("toJapanShortDate");
	//Date.setInputFormat("YMD");
	
	 var valueMan = exemptionEditVM;


   //---invisible listgrid for reference exemption code master data 
	isc.ListGrid.create({
		ID:"hiddenExCodeLG",
		dataSource : ecertExemptionsCodeDS,
	    showFilterEditor:true,	    	    
	    autoFetchData:true,
	    autoDraw:false,
	    useClientFiltering:false,
	    //saveLocally:true,
	    //fetchMode:"local",
	    showAllRecords:true 
	    	
	});
	

	 //---invisible listgrid for reference exemption content master data 
	isc.ListGrid.create({
		ID:"hiddenExContentLG",
		dataSource : ecertDicContentDS,
	    showFilterEditor:true,	    	    
	    autoFetchData:true,
	    //autoDraw:true,	    	    
	    fetchMode:"local",
	    dataPageSize:1000,
	    showAllRecords:true
	});
	
	
	 //---invisible listgrid for reference exemption item master data 
	isc.ListGrid.create({
		ID:"hiddenExItemLG",
		dataSource : ecertDicItemDS,
	    showFilterEditor:true,	    	    
	    autoFetchData:true,
	    //autoDraw:true,	    	    
	    fetchMode:"local",
	    dataPageSize:1000,
	    showAllRecords:true
	    
	    
	});
	
	hiddenExContentLG.fetchData();
	hiddenExItemLG.fetchData();
	
	//--- value manager to update exemption code content data to server in the background 
	
	var valueManExCode =isc.ValuesManager.create({
	    ID: "exJobEditVM",
		dataSource: exemptionJobDS,
		autoDraw: false
	});
	
	
	
	//--- create --buttons 

	isc.HLayout.create({
	    ID:"hl_exemptionEdit_oper",
	    align:"right",
	    
	    width:700,
	    height:60,
	    membersMargin:5,
	    members:[
	    				
	              	
	    			isc.IButton.create({ID:"btnRestartCase",title:"Restart Case",autoFit:true,onControl:"EXEMPT_WRITE||FSQC_ALL",
	    				click:function(){
	    					 isc.ask("The case is closed, do you want to restart this case?", function (value){
	    						 if (value){
	    							 
	    							 updateCaseClosed(2)	; 
	    						 }
	    						 
	    						 
	    					 });
	    				}	    				
	    			}),
	    			isc.IButton.create({ID:"btnCaseClose",title:"Case Close",onControl:"EXEMPT_WRITE||FSQC_ALL",
	    				click:function(){
	    					 isc.ask("Do you want to close this case?", function (value){
	    						 if (value){
	    							 
	    							 updateCaseClosed(1)	; 
	    						 }
	    						 
	    						 
	    					 });
	    				}	    			
	    			}),
	    			
	    			isc.IButton.create({ID:"btnExtend",title:"Extend",onControl:"EXEMPT_WRITE||FSQC_ALL",
	    				click:function(){
	    					 isc.ask("Do you want to close this case and create a new one with extended expiry date?", function (value){
	    						 if (value){
	    							 extendExemption();
//	    							 sameExemptionChecking(extendExemption); 
	    						 }
	    						 
	    						 
	    					 });
	    				}	    			
	    			}),
	    			
	    			//jacky todo
	    			//Min btn
	    			isc.IButton.create({ID:"btnMinCert",title:"Min",startRow:false,
	    			 
		    			click:function(){
		    				if (isNull(exemptionEditVM.getValue("id")) || exCodeChoiceChanged || !isEmpty(exemptionEditVM.getChangedValues())) 
		    				{
	//        	    			isc.say("Please save record first! "); return;
		    					//record changes not yet saved
		    					saveExemptionRec(function(){
		    						openExemptionDetail(exemptionEditVM.getValues());
				    				openPrintReportPage("Minute")(edit_ecertRecordID);
		    					});
		    				}
		    				else
	    					{
			    				openPrintReportPage("Minute")(exemptionEditVM.getValue("id"));
	    					}
		    				
	
		    			}
                    }),
	    			//Cert btn
	    			isc.IButton.create({ID:"btnCert",title:"Cert",startRow:false,
		    			click:function(){
		    				
		    				function btnCertCallback(ecertRecordID)
		    				{


			    				isc.DataSource.get("exemptionJobDS").fetchData({"jobno":ecertRecordID}, function (dsResponse, data, dsRequest) {
			    					if (isNull(data) || data.length<=0) {
			    						isc.say("Please save record first! "); return;
			    					}
			    					
			    					var form_priority = [];
			    					form_priority["dummy"] = 0;
			    					form_priority["Exemption Certificate"] = 10;
			    					form_priority["Letter"] = 20;
			    					form_priority["Exemption Certificate(CO2)"] = 30;

			    					var trg_cert_form = "dummy";
			    					if( Array.isArray(data) )
		    						{
				    					data.forEach(function(item, index){
				    						if( form_priority[item.form] > form_priority[trg_cert_form] )
			    							{
				    							trg_cert_form = item.form;
			    							}
				    					});
		    						}
			    					
			    					openPrintReportPage(trg_cert_form)(ecertRecordID);
			    				});
	    						
	    					
		    				}
		    				
		    				if (isNull(exemptionEditVM.getValue("id")) || exCodeChoiceChanged || !isEmpty(exemptionEditVM.getChangedValues())) 
		    				{
//	        	    			isc.say("Please save record first! "); return;
		    					//record changes not yet saved
		    					saveExemptionRec(function(){
//		    						openExemptionDetail(exemptionEditVM.getValues());
		    						btnCertCallback(edit_ecertRecordID);
		    					});
		    					
		    				}
		    				else
	    					{
		    					btnCertCallback(exemptionEditVM.getValue("id"));
	    					}
		    				

		    			}
	    				//end of click:function
	    			})
	    			,
	            	
	            	isc.LayoutSpacer.create() ,
	            	
	        	    isc.IButton.create({ID:"btnExemptionDetailSave",title:"Save",startRow:false,onControl:"FSQC_ALL||EXEMPT_WRITE",
	        	    	click : function () {
	        	    		saveExemptionRec();
	      				  }	
	        	    }),
	            	isc.IButton.create({ID:"btnExemptionDetailClose",title:"Close",startRow:false, 
	            		click : function () {
	            			
	            			if (exCodeChoiceChanged || !isEmpty(exemptionEditVM.getChangedValues())) {
	            				isc.ask("The modified record is not yet saved.<br>Are you sure you want to discard the changes and exit?", function(value){
	            					if (value) {
	            						console.log("users choose to leave.");
	            						closeExemptionsWindow();
	            					}
	            				});
	            			}else{
	            				//no unsaved changes
	            				closeExemptionsWindow();
	            			}
                        }
	            	})
	    ]
	});
	
	//---top form 
	isc.ControlledDynamicForm.create({

		ID:"frmExemptionEdit_top",
		valuesManager:valueMan,
		onControl: "EXEMPT_WRITE||FSQC_ALL",
		dataSource: "eCertRecordDS",
		
		width:700,
		numCols: 4,
		colWidths: [150, "*",150,"*"],
//		colWidths: ["1", "1", "1", "1", "1", "1", "1", "1"],
		fields:
		[
			{name:"id" , title:"id", hidden:true },
			{name: "equipments"  					 
			,defaultValue:"Equipment"
			,startRow: true, width: "100%"
            ,change: function(form, item, value){
                switch(value) {
                    case "Equipment":
                        exemptionEditVM.setValue("valid_date", null);
                        break;
                    case "Officer": case "Rating":
                        console.log(exemptionEditVM.getValue("app_date"));
                        if (!isNull(exemptionEditVM.getValue("app_date")))
                        	exemptionEditVM.setValue("valid_date", new Date(exemptionEditVM.getValue("app_date")).addDays(28));
                        break;
                    
                }
            }
            },

		 	{name: "spname", 	title:"Ship's Name:", editorType:"SelectItem",
				 optionDataSource: "fsqcShipDS", wrapTitle: false,				
				 displayField:"Spname", valueField:"Spname",
				 pickListWidth:500,
				 
			        pickListProperties: {
                        sortField: 0,
			            showFilterEditor:true,		            
			            selectionUpdated : function (record, recordList){
			            	
			            	var record1 = record;
			            	if(record1!=null && counter > 2){
			        			 frmExemptionEdit_top.setValue('imono',record1.Imono)
			        			 frmExemptionEdit_top.setValue('company_id',record1.Manager)	// 00001 - Add
//			        			 isc.DataSource.get("companyManagementDS").fetchData({Com_cd:record1.Manager},
//			        			    		function (dsResponse, data, dsRequest){
//			        							
//			        				 			frmExemptionEdit_top.setValue("company_name",data[0].Com_name);
//			        			    		}
//			        			    );
			        		 }
			            	counter = counter + 1;
			            }
			        },
			        pickListFields:[
			            {name:"Spname"},
			            {name:"Imono"},
			            {name:"Regno"}
			            
			          //  {name:"Com_name"}
			        ]
		 	, colSpan:2	,startRow: true,endRow:false, width: "100%" },
	 	
		 	
		 	{name: "imono", 	title:"IMO No.:", type:"text", startRow: true, width: "100%", canEdit:false },
		 	
		 	{name: "app_date", 	title:"Date of Application:", type:"date" , width: "100%" },
		 		
		 	
		 	{name: "company_id", 	title:"Company's Name:",colSpan:4, type:"text", startRow: true, width: "100%",canEdit:false
// 00001 - Start Add 
		 		, optionDataSource:"companyManagementDS" 
		        , valueField:"Com_cd", foreignDisplayField:"Com_name",displayField:"Com_name"
		        , pickListFields:[
		              {name:"imo_comno"}
		              , {name:"Com_name"}
		        ]
		        , pickListWidth:650,
// 00001 - End Add 
		    },
		 	
		 	{name: "place_vessel", 	title:"Place of Vessel:",colSpan:4, type:"text", startRow: true, width: "100%" },
            
		 	
		]
	});
	
		
	// middle form
	isc.DynamicForm.create({

		ID:"frmExemptionEdit_middle",
		valuesManager:valueMan,
		//onControl:"EXEMPT_WRITE||FSQC_ALL",
		dataSource: "eCertRecordDS",
		
		isGroup:true,
		groupTitle:"Exemption",
		
		width:700,
		numCols: 4,
		colWidths: [150, "*",150,200],
//		colWidths: ["1", "1", "1", "1", "1", "1", "1", "1"],
		fields:
		[
		 	{name: "convention", 	title:"Level 1<br>Convention:", 
		 		colSpan:2,startRow: true, width: "100%" ,canEdit:false, disabled: true
		 			
		 		 },
				 		 	
		 	{name: "btnSelectExCode", 	title:"Select", type:"button",startRow: false,endRow:false,
		 			 
		 	click:function(){
		 		
		 		if (!hasAccess("EXEMPT_CODE_READ||FSQC_ALL"))
		 			isc.say("Sorry you have no read access right to exemption code!");		 			
		 		else
		 			{
		 		 var exType = frmExemptionEdit_top.getValue("equipments");
		 		 
		 		 if (exType !="Equipment")
		 			 exType="Dispensation";
		 		 else
		 			 exType="Exemption";
		 			 
		 		 
		 	  	 openExemptionCode(exType, getExemptionCodeContent, null, valueMan.getValues());
		 	}}
		 	},
		 		 
			{name: "chapter", 	title:"Level 2<br>Chapter:", type:"text",colSpan:3	,startRow: true, width: "100%" ,canEdit:false, disabled: true},
			
			{name: "regulation", 	title:"Level 3<br>Regulation:",colSpan:3, type:"text"	,startRow: true, width: "100%" ,canEdit:false, disabled: true},
			
			{name: "exempted_item", 	title:"Level 4<br>Exempted item:",colSpan:3, type:"text"	,startRow: true, width: "100%",canEdit:false, disabled: true },
		
			{name: "component", 	title:"Level 5<br>Component:",colSpan:3, type:"text"	,startRow: true, width: "100%",canEdit:false, disabled: true },
			
			
		]
	});
	
	
	// --bottom form 
	isc.ControlledDynamicForm.create({

		ID:"frmExemptionEdit_bottom",
		valuesManager:valueMan,
		onControl:"EXEMPT_WRITE||FSQC_ALL",
		dataSource: "eCertRecordDS",
		
		width:700,
		numCols: 8,
        colWidths: [145,68,68,68,  150,140,30,30],
		//colWidths: [145,"*","*","*",150,"*",20, 20],
//		colWidths: ["1", "1", "1", "1", "1", "1", "1", "1"],
		fields:
		[
		 	{name: "review_person", 	title:"Prepared by:", colSpan:3,
		 		editorType:"ComboBoxItem",		 		
		 		addUnknownValues:false, wrapTitle: false,
		 		 optionDataSource: "userDS", 
		 		displayField:"userName",valueField:"id",
		 		filterFields:["userName"],
		 		pickListWidth:"400",
		 		pickListFields:[
		 		
		 		{name:"userName",width:200}
		 		
		 			],
		 		
		 		startRow: true, width: "100%" },
		 		
	 		{name: "valid_date", 	title:"Exemption<br>Valid until:", type:"date", width: "100%" },
            
            {name: "btnMinusValidDate", title:"-", type:"button", width:23, startRow: false, endRow:false,
		 	click:function(){
                var valid_date = exemptionEditVM.getValue("valid_date");
                if (!isNull(valid_date) && isc.isA.Date(valid_date)) {
                	//have valid_date
	                if (valid_date.getYear() >= 0 && valid_date.getYear() <= 9000 &&
	                    !(valid_date.getYear() == 0 && valid_date.getMonth() == 0) && !(valid_date.getYear() == 9000 && valid_date.getMonth() == 11)  ){
	                	
	                	//valid_date is within normal range
	                	console.log("valid_date.getMonth(): " + valid_date.getYear());
	                    valid_date.setMonth(valid_date.getMonth() - 1);
	                    exemptionEditVM.setValue("valid_date", valid_date);
	                }
                }else{
                	//no valid_date
                	exemptionEditVM.setValue("valid_date", new Date());
                }
		 	}},
            {name: "btnAddValidDate", title:"+", type:"button", width:23, startRow: false, endRow:true,
		 	click:function(){
		 		var valid_date = exemptionEditVM.getValue("valid_date");
		 		if (!isNull(valid_date) && isc.isA.Date(valid_date)) {
		 			//have valid_date
	                if (valid_date.getYear() >= 0 && valid_date.getYear() <= 9000 &&
	                    !(valid_date.getYear() == 0 && valid_date.getMonth() == 0) && !(valid_date.getYear() == 9000 && valid_date.getMonth() == 11) ){
	                	
	                	//valid_date is within normal range
	                	console.log("valid_date.getMonth(): " + valid_date.getYear());
	                    valid_date.setMonth(valid_date.getMonth() + 1);
	                    exemptionEditVM.setValue("valid_date", valid_date);
	                }
		 		}else{
		 			//no valid_date
		 			exemptionEditVM.setValue("valid_date", new Date());
		 		}
		 	}},
	 		
		 	{name: "cert_no", 	title:"Cert No.:", type:"text",canEdit:false, startRow: true, width: "100%", colSpan:3 },
		 	
		 	{name: "exempted_date", 	title:"Certificate Date:", type:"date"	, width: "100%", colSpan:3, defaultValue:new Date(),
		 		changed: function(form, item, value)
		 		{
		 			var exType = frmExemptionEdit_top.getValue("equipments");
		 			if (exType !="Equipment")
	 				{
		 				var valid_date = exemptionEditVM.getValue("valid_date");
		 				var dispens_period = 28;
			 			
		 				var lv4 = exemptionEditVM.getValue("exempted_item");
		 				if( lv4 && (lv4.search("Cook") >=0)  )
	 					{
		 					dispens_period = 30;
	 					}

			 			var try_parse = new Date(value);
				 		if ( try_parse ) {
				 			//have valid_date
//		                    valid_date.setMonth(valid_date.getMonth() + 1);
				 			try_parse.setDate( try_parse.getDate() + dispens_period)
		                    exemptionEditVM.setValue("valid_date", try_parse );
				 		}else{
				 			//no valid_date
//				 			exemptionEditVM.setValue("valid_date", new Date());
				 		}
	 				}
			 		else
			 		{
			 			
			 		}
			 			 
		 		}
		 	},
		 	{name: "dm_agreed", 	title:"DM agreed via email:", editortype:"ComboBoxItem", 
		 		
			 	valueMap: {"Y":"YES" },
				defaultValue: null,
				allowEmptyValue: true,
				emptyDisplayValue:"NO",
					
//			 	valueMap: {null:"NO" ,"Y":"YES" },	//Commented: null does not work, becomes a string "null"
//			 	defaultToFirstOption:true, 
			 	startRow: true, width: 100, colSpan:3,
			 	
			 	changed : function(){
			 		if (frmExemptionEdit_bottom.getItem("dm_agreed").getValue()=="Y")
			 			{
			 			frmExemptionEdit_bottom.getItem("dm_agreed_date").setDisabled(false);
			 			frmExemptionEdit_bottom.getItem("dm_agreed_date").setValue(new Date().toISOString().substring(0, 10));
			 			}
			 		else
			 			frmExemptionEdit_bottom.getItem("dm_agreed_date").setDisabled(true);
			 	  }
			},
		 	
		 	{name: "dm_agreed_date", title:"Agreed Date:", type:"date", width: 200, colSpan:3, startRow:false },
		 			 	
		 	{name: "alarm_days", 	title:"Alarm Days:", defaultValue:3,type:"integer", startRow: true, width: "100%", colSpan:3 },
		 	
		 	{name: "collect_date", 	title:"Date of Collection:", type:"date", width: "100%", colSpan:3 },
		 	
		 	{name: "case_closed", 	title:"Case Closed:", required:true, canEdit:false, valueMap: {null:"NO" ,"Y":"YES" },
		 		defaultToFirstOption:true, 
		 		startRow: true, width: "100%", colSpan:3 },
		 	
		 	{name: "remark", 	title:"Others:",  startRow: true,colSpan:7,width:"100%" ,length:300},
		 	
		 	{name: "extend_times", type:"integer", startRow: true, width: "100%", colSpan:3 },
		 	{name: "extend_from_cert_no", width: "100%", colSpan:3 },
		]
	});
	
	// create whole window  
       isc.Window.create({
   		ID:"exemption_edit_window",
   		isModal: true, showModalMask: true,
   		margin:10,
   		width: 800,
   		height: 800,				
   		title: "Exemption Cert",
   		membersMargin:10,
   		overflow : "auto",
   		items:
   		[
   				isc.VLayout.create
   				(
   					{
   					margin:15,
   					membersMargin:5,
   					members:
   					[
   						hl_exemptionEdit_oper,frmExemptionEdit_top,frmExemptionEdit_middle,frmExemptionEdit_bottom
   					]
   					}
   				)

   	       ],
   		show:function(){
   			frmExemptionEdit_top.setData({});
   			frmExemptionEdit_middle.setData({});
   			frmExemptionEdit_bottom.setData({});
   			
   			this.Super('show', arguments);
   		}
   	});
   
}


function saveExemptionRec(save_ok_callback) {
	if (isNull(frmExemptionEdit_bottom.getValue("cert_no")) && isNull(objExCodePara) )
		isc.say("Please select exemption code first! ");
	else
	{
		sameExemptionChecking(function(bool_ok, found_record){
			if(bool_ok)
			{
				saveExemptionRecord(save_ok_callback);
			}
		});
	}
}

function closeExemptionsWindow() {
	frmExemptionEdit_top.setValues({});
	frmExemptionEdit_middle.setValues({});
	frmExemptionEdit_bottom.setValues({});
	
	frmExemptionEdit_top.setData({});
	frmExemptionEdit_middle.setData({});
	frmExemptionEdit_bottom.setData({});
	
	frmExemptionEdit_top.reset({});
	frmExemptionEdit_middle.reset({});
	frmExemptionEdit_bottom.reset({});
	
	
	frmExemptionEdit_top.clearErrors(true);
	frmExemptionEdit_middle.clearErrors(true);
	frmExemptionEdit_bottom.clearErrors(true);	            			
		
	exemption_edit_window.hide();
}


function extendExemption() {
	sameExemptionChecking(function(bool_ok, found_record){
		if(bool_ok)
		{
			console.log("will start to extend exemption.");

//			exemptionEditVM.setValue("case_closed", "Y"); 
//			
//			saveExemptionRecord(function(){
//				setTimeout(function(){
//					exemptionEditVM.setValue("id", null);
//					if(exemptionEditVM.getValue("cert_no"))
//					{
//						exemptionEditVM.setValue("extend_from_cert_no", exemptionEditVM.getValue("cert_no"));
//					}
//					exemptionEditVM.setValue("cert_no", null);
//					exemptionEditVM.setValue("app_date", new Date() ); 
//					exemptionEditVM.setValue("exempted_date", new Date() ); 
//					exemptionEditVM.setValue("valid_date", null); 
//					exemptionEditVM.setValue("case_closed", null); 
//					if(exemptionEditVM.getValue("extend_times"))
//					{
//						exemptionEditVM.setValue("extend_times", exemptionEditVM.getValue("extend_times") + 1);
//					}
//					else
//					{
//						exemptionEditVM.setValue("extend_times", 1);
//					}
//					saveExemptionRecord();
//				}, 500);
//			});
			
			
			saveExemptionRecord(null, {"operationId":"EXTENDEXEMPTION"});
			
			
//			exemptionEditVM.saveData(function(dsResponse, data, dsRequest) {
//				if (!isNull(dsResponse) && dsResponse.status == 0)
//				{
//					btnExtend.hide();
//					isc.say("Exemption extended successfully!<br>Please enter the new expiry date");
//				}
//		    },{"operationId":"EXTENDEXEMPTION"});
		}
	}); 
}

///********* sameExemptionChecking ***********
//* 
//* callback: function(bool_ok, found_record): Callback function is mandatory.
//* 		- bool_ok: whether can go ahead and create new exemption 
//* 		- found_record: the other record found with same exempted item and not closed
//* 
//**********************************************/	

function sameExemptionChecking(callback)
{
	if ( (callback == null || callback == undefined) ) {
		return;	// callback is mandatory
	}
	
	console.log("enter sameExemptionChecking()");
	var selected_id = exemptionEditVM.getValue("id");
	var criteria = {};
	if (!isNull(exemptionEditVM.getValue("imono")) && exemptionEditVM.getValue("imono").trim() != "") {
		criteria.imono = exemptionEditVM.getValue("imono").trim();
	}
	if (!isNull(exemptionEditVM.getValue("convention")) && exemptionEditVM.getValue("convention").trim() != "") {
		criteria.convention = exemptionEditVM.getValue("convention");
	}
	if (!isNull(exemptionEditVM.getValue("chapter")) && exemptionEditVM.getValue("chapter").trim() != "") {
		criteria.chapter = exemptionEditVM.getValue("chapter");
	}
	if (!isNull(exemptionEditVM.getValue("regulation")) && exemptionEditVM.getValue("regulation").trim() != "") {
		criteria.regulation = exemptionEditVM.getValue("regulation");
	}
	if (!isNull(exemptionEditVM.getValue("exempted_item")) && exemptionEditVM.getValue("exempted_item").trim() != "") {
		criteria.exempted_item = exemptionEditVM.getValue("exempted_item");
	}
//	if (!isNull(exemptionEditVM.getValue("component")) && exemptionEditVM.getValue("component").trim() != "") {
//		criteria.component = exemptionEditVM.getValue("component");
//	}
	
	/*
	criteria.imono = exemptionEditVM.getValue("imono");
	criteria.convention = (isNull(exemptionEditVM.getValue("convention")) ? null : exemptionEditVM.getValue("convention"));
	criteria.chapter = (isNull(exemptionEditVM.getValue("chapter")) ? null : exemptionEditVM.getValue("chapter"));
	criteria.regulation = (isNull(exemptionEditVM.getValue("regulation")) ? null : exemptionEditVM.getValue("regulation"));
	criteria.exempted_item = (isNull(exemptionEditVM.getValue("regulation")) ? null : exemptionEditVM.getValue("regulation"));
	criteria.component = (isNull(exemptionEditVM.getValue("component")) ? null : exemptionEditVM.getValue("component"));
	*/
	
	console.log("selected_id: " + selected_id);
	console.log("criteria: " + JSON.stringify(criteria));
	eCertRecordDS.fetchData(criteria, function(dsResponse, data, dsRequest) {
			if (!isNull(dsResponse) && dsResponse.status != 0) {
				console.log("dsResponse.status != 0");
				return;
			}
//			var will_extend_record = true;
			var found_record = null;
//			var same_imono_excode_not_closed = false;
			if (!isNull(data) && data.length > 0) {
				for (var i = 0; i < data.length; i++) {
					if ( !isNull(data[i]) && !isNull(data[i].id) && data[i].id != selected_id 
							&& (isNull(data[i].case_closed) || data[i].case_closed != "Y") 
						) 
					{
						found_record = data[i];
//						console.log(">>id: " + data[i].id);
//						same_imono_excode_not_closed = true;
//						will_extend_record = false;
							
//						console.log(JSON.stringify(data[i]));
						break;
					}
				}
				if (found_record != null)
				{
					isc.ask("There is already another record exempting the same item (Cert No \"" + found_record.cert_no + "\"), and it's not yet closed.<br/><br/>Continue to save this exemption?", function(value){
						if (value) {
							callback(true, found_record);
						}else{
							callback(false, found_record);
						}
					});
					return;
				}

				
			}else{
//				console.log("@no records of same imono && same excode found");

			}
			callback(true, found_record);
			return;
	});
}

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

var exempt_code_id_tmp = 0;


function openPrintReportPage(formType) {
    switch(formType) {
        case "Exemption Certificate(CO2)":
        	return openExemptionCertCO2Report;
            break;
        case "Letter":
            //jacky last round
            //not sure if using Cert page
        	return openExemptionLetterReport;
            break;
        case "Exemption Certificate":
        	return openExemptionCertReport;
            break;
        case "Minute":
        	return openExemptionCertMin;
            break;
    }
}



function findFormTypeFromPriorityList(data) {
    var formTypeArr = [];
    if (!isNull(data) && data.length > 0) {
        for(var i = 0; i < data.length; i++){
            if (!isNull(data[i]) && !isNull(data[i].form) && data[i].form.trim() != "") {
                formTypeArr.push(data[i].form.trim());
            }
        }
    }
    
    var found = false;
    
    //find the "best" form type
    for(var i = 0; i < formTypePriorityForMisssingFK.length; i++){
        for(var j = 0; j < formTypeArr.length; j++){
            if (formTypeArr[j] == formTypePriorityForMisssingFK[i]) {
                found = true;
                selectedFormTypeForEcertRec = formTypePriorityForMisssingFK[i];
                break;
            }
        }
        if (found) break;
    }
    return found;
}


function stringMapForFormType(formType) {
	if (!isNull(formType) && (formType = formType.trim()) != "") {
		switch(formType) {
			case "Cert(CO2)":
				formType = "Exemption Certificate(CO2)";
                break;
            case "Letter":
				formType = "Letter";
                break;
            default:
                formType = "Exemption Certificate";
		}
		return formType;
	}else{
		return "";
	}
}


//function for opening this page
function openExemptionDetail(record) {
	
	if(!isNull(record) && !isNull(record.id))
	{ 
		edit_ecertRecordID = record.id;
	}
	else
	{
		edit_ecertRecordID = null;
	}
	
	//var canEdit = false;
	var intMode = 0;
	console.log("start");
    //reset all flags whenever open window of this page
    exCodeChoiceChanged = false;
    ecertRecChanged = false;
    oldSysRecMissingBridge = false;
    
    //not sure if necessary
    oldFormType = "";
    old_ex_code_id = -1;
	
	exemptionsWindowsContent();
	
	exemption_edit_window.show();
	setTimeout(setFormItemHighlight, 3000, bg_highlight_exem_edit);
	
//		if(!isNull(record)){							// 00001 - Jacky comment
		if(!isNull(record) && !isNull(record.id)){  	// 00001 - Jacky Add
			//update record 
//			if (!isNull(record.case_closed)) {
//				if (record.case_closed=='Y') {
//					//canEdit =false
//					intMode = 1;
//				}else{
//					intMode = 2;
//				}
//			}else{
//				 //canEdit =true;
//				intMode = 2;
//			}
				
			//---- populate data --
			frmExemptionEdit_top.getField('equipments').setDisabled(true);
			
			exemptionEditVM.fetchData({id:record.id}, function (dsResponse, data, dsRequest) 
			{
				console.log(JSON.stringify(data[0]));
				if (!isNull(data[0].case_closed)) {
					if (data[0].case_closed=='Y') {
						//canEdit =false
						intMode = 1;
					}else{
						intMode = 2;
					}
				}else{
					 //canEdit =true;
					intMode = 2;
				}

				toggleEdit(intMode);
				//frmExemptionEdit_top.setDisabled(true);
							
//				if (!isNull(record.dm_agreed)) {
					if (record.dm_agreed=='Y'){
						frmExemptionEdit_bottom.getItem("dm_agreed_date").setDisabled(false);
					}else{
						frmExemptionEdit_bottom.getItem("dm_agreed_date").setDisabled(true);
					}
//				}else{
//					frmExemptionEdit_bottom.getItem("dm_agreed_date").setDisabled(true);
//				}
                
				if (record.case_closed!="Y") {
					//frmExemptionEdit_bottom.setValue("case_closed","N") ;
					frmExemptionEdit_bottom.setValue("case_closed",null) ;
					//exemptionEditVM.setValue("case_closed",null) ;
				}
//					else {
//					if (record.case_closed!="Y") {
//						//exemptionEditVM.setValue("case_closed","N") ;	
//						exemptionEditVM.setValue("case_closed",null) ;
//					}
//				}
				
				
//                exJobEditVM.fetchData({"jobno":exemptionEditVM.getValue("id"),"form":"Exemption Certificate"},function(){
//                    console.log("exJobEditVM.fetchData called");
//                    
//                    console.log("call rememberValues() on exemptionEditVM and exJobEditVM");
//                    exemptionEditVM.rememberValues();
//                    exJobEditVM.rememberValues();
//				});
			});
			
		}else{
			//====add new record ====
// 00001 - Start Jacky Add
			if(!isNull(record)){
				exemptionEditVM.setValues(record);
				
			}
// 00001 - End Jacky Add
			
			//canEdit=true;
			toggleEdit(0);
			
			if (!isNull(record)) {
				if (record.equipments == "Rating"){
					//Add Dispensation
					if (!isNull(exemptionEditVM.getValue("app_date")))
	                	exemptionEditVM.setValue("valid_date", new Date(exemptionEditVM.getValue("app_date")).addDays(28));
				}
				else{
					//Add Exemption
					exemptionEditVM.setValue("valid_date", null);
				}
			}
			
			if (!isNull(loginData.userId)) { 
                exemptionEditVM.setValue("create_man",loginData.userId);
                exemptionEditVM.setValue("review_person",loginData.userId);
			}
	 	}
	
}

/******* getExemptionCodeContent ******
 * callback function - called when "OK" button pressed from ecertExemptionsCode.js." 
 * 	objResult : [true: pressed OK to select the exemption code | false: no confirmed selections, no change.]
 *  ArrData: {
				ex_code_id: PK of selected exemption Code,
				ex_code_form_type: ["Cert" | "Letter" | "Cert(CO2)"],
				cert_content_id: PK of selected cert content,
				min_content_id: PK of selected min content,
				cert_conditions_ids: Array of PKs of selected conditions for cert,
				min_conditions_ids: Array of PKs of selected conditions for minute,
				cert_ExistFlag: true {obsolete},
				min_ExistFlag: true {obsolete},
			};
 **************************************/
function getExemptionCodeContent(objResult,ArrData)
{
	if (objResult==true)	
	{
		console.log(ArrData);
		objExCodePara = ArrData;
		exCodeChoiceChanged = true;
        oldFormType = "";
        old_ex_code_id = -1;

        
		
		console.log("callback when pressed OK btn of exemption code: \n" + JSON.stringify(objExCodePara));
		//hiddenExCodeLG.setCriteria({fieldName:"id",operator:"equals",value:objExCodePara.ex_code_id});
		hiddenExCodeLG.fetchData({"id":objExCodePara.ex_code_id},function(){
			if (hiddenExCodeLG.data.totalRows>0) {
				
				//==check have already save content history if so then by pass assign to the db 
				
				//jacky todo
				console.log(JSON.stringify(hiddenExCodeLG.data.localData[0]));
		    
				//eCertRecordDS,ecert_record
				frmExemptionEdit_middle.setValue("convention", hiddenExCodeLG.getRecord(0).level_no1);
				frmExemptionEdit_middle.setValue("chapter", hiddenExCodeLG.getRecord(0).level_no2);
				frmExemptionEdit_middle.setValue("regulation", hiddenExCodeLG.getRecord(0).level_no3);
				frmExemptionEdit_middle.setValue("exempted_item", hiddenExCodeLG.getRecord(0).level_no4);
				frmExemptionEdit_middle.setValue("component", hiddenExCodeLG.getRecord(0).level_no5);
				
                console.log("-----------------------------------------------------------------------");
                old_ex_code_id = exemptionEditVM.getValue("exempt_code_id");
                console.log("ecert_record - old exempt_code_id value: " + old_ex_code_id);
                
                if (!isNull(old_ex_code_id)) {
                    isc.DataSource.get("ecertExemptionsCodeDS").fetchData({id:old_ex_code_id}, function (dsResponse, ex_code_data, dsRequest){
                            if (dsResponse.status != 0) {
                                console.log("dsResponse.status != 0");
                                return;
                            }
                            if (!isNull(ex_code_data) && ex_code_data.length > 0 && !isNull(ex_code_data[0])) {
                                oldFormType = stringMapForFormType(ex_code_data[0].output_type);
                            }
                    });
                }
                console.log("ecert_record - old formType value: " + oldFormType);
                
                exemptionEditVM.setValue("exempt_code_id", objExCodePara.ex_code_id);
                console.log("ecert_record - new exempt_code_id value: " + exemptionEditVM.getValue("exempt_code_id"));
                
				
                if (!isNull(objExCodePara.min_content_id) && objExCodePara.min_content_id > 0) {
                	console.log("min_dic_content_id: " + JSON.stringify(objExCodePara.min_content_id));
                    exemptionEditVM.setValue("min_dic_content_id", objExCodePara.min_content_id);
                }
				
                if (!isNull(objExCodePara.min_conditions_ids) && Array.isArray(objExCodePara.min_conditions_ids)) {
                    min_DicItemArr = objExCodePara.min_conditions_ids;
                    var tmpStr = objExCodePara.min_conditions_ids.join(",").trim();
                    console.log("cert_dic_item_ids: " + JSON.stringify(tmpStr));
                    exemptionEditVM.setValue("min_dic_item_ids", tmpStr !== "" ? tmpStr : null);
                }

                /*
                for (var i = 0; i < objExCodePara.min_conditions_ids.length; i++) {
                    
                }
                */
                
//                if (!isNull(objExCodePara.min_conditions_ids) && Array.isArray(objExCodePara.min_conditions_ids)) {
//                    min_DicItemArr = objExCodePara.min_conditions_ids;
//                    var tmpStr = objExCodePara.min_conditions_ids.join(",").trim();
//                    console.log("min_conditions_ids: " + JSON.stringify(tmpStr));
//                    exemptionEditVM.setValue("min_dic_item_ids", tmpStr !== "" ? tmpStr : null);
//                }
                
                if (!isNull(objExCodePara.cert_content_id) && objExCodePara.cert_content_id > 0) {
                	console.log("cert_dic_content_id: " + JSON.stringify(objExCodePara.cert_content_id));
                    exemptionEditVM.setValue("cert_dic_content_id", objExCodePara.cert_content_id);
                }
				
                
                if (!isNull(objExCodePara.cert_conditions_ids) && Array.isArray(objExCodePara.cert_conditions_ids)) {
                    cert_DicItemArr = objExCodePara.cert_conditions_ids;
                    var tmpStr = objExCodePara.cert_conditions_ids.join(",").trim();
                    console.log("cert_dic_item_ids: " + JSON.stringify(tmpStr));
                    exemptionEditVM.setValue("cert_dic_item_ids", tmpStr !== "" ? tmpStr : null);
                }
                
				//objExCodePara.cert_ExistFlag
				//objExCodePara.min_ExistFlag
				
				
				
//				if (!isNull(objExCodePara.ex_code_form_type))
//					ecertRecformType = objExCodePara.ex_code_form_type.trim();
                
				//ecertRecformType = "Exemption Certificate";
				//ecertRecformType = "Exemption Certificate(CO2)";
				
				
				//--------------------------------------------------------------------------------------------------------------------------------
				//fill remaining 4 fields of obj that Mads passes to me
				//ecertDicContentDS (cert_content), min_content, ecertDicItemDS (cert_item), min_item
				
				//exemptionEditVM.setValue("", );
				
				//--------------------------------------------------------------------------------------------------------------------------------
				
				//-------------------------
				exJobEditVM.fetchData({"jobno":exemptionEditVM.getValue("id"),"form":"Exemption Certificate"},function(dsResponse, data, dsRequest){
						console.log("exJobEditVM.fetchData called");
					}
				);
				
	//			hiddenExContentLG.fetchData(function() {
	//				console.log("done get all hiddenExContentLG data");
	//				
	//		 		hiddenExItemLG.fetchData(function(){
	//			
	//				console.log("done get all hiddenExItemLG data");
	//				});
	//				}
							
	//			)
				
				
			}
		});
	}
	
}


function toggleEdit(intMode)
{     
	// intMode , 0 = new record , 1 = case close , 2 = saved but not case closed
	
	
   if (intMode==0)	
	{
	    
	    frmExemptionEdit_top.getItem("spname").setDisabled(false);
		
		frmExemptionEdit_bottom.getItem("dm_agreed_date").setDisabled(true);
		
		frmExemptionEdit_top.setValue("app_date",new Date().toISOString().substring(0, 10))
		
		btnRestartCase.hide();
		btnCaseClose.hide();
		btnExemptionDetailSave.show();
		btnExtend.hide();
	}
	
   else if (intMode==2)
		{
			//frmExemptionEdit_top.setCanEdit(true);
		  
			frmExemptionEdit_top.getItem("equipments").setDisabled(true);	
			frmExemptionEdit_top.getItem("spname").setDisabled(true);
			frmExemptionEdit_top.getItem("imono").setDisabled(true);
			frmExemptionEdit_top.getItem("company_id").setDisabled(true);
			
			frmExemptionEdit_top.getItem("app_date").setDisabled(false);
			frmExemptionEdit_top.getItem("place_vessel").setDisabled(false);
			
			
			frmExemptionEdit_middle.setDisabled(false);
			
		    frmExemptionEdit_bottom.setDisabled(false);
				
			
			
			//--hide restart button and show case close button--
			btnRestartCase.hide();
			btnCaseClose.show();
			btnExemptionDetailSave.show();
			btnExtend.show();
		//--
		}	
	else if (intMode==1)
		{
			frmExemptionEdit_top.getItem("equipments").setDisabled(true);	
			frmExemptionEdit_top.getItem("spname").setDisabled(true);
			frmExemptionEdit_top.getItem("imono").setDisabled(true);
			frmExemptionEdit_top.getItem("company_id").setDisabled(true);
			
			frmExemptionEdit_top.getItem("app_date").setDisabled(true);
			frmExemptionEdit_top.getItem("place_vessel").setDisabled(true);
		
			//frmExemptionEdit_top.setCanEdit(false);
			//frmExemptionEdit_middle.setCanEdit(false);
			frmExemptionEdit_middle.setDisabled(true);	
			frmExemptionEdit_bottom.setDisabled(true);
			//--show restart button and hide case close button--
			btnRestartCase.show();
			btnCaseClose.hide();
			btnExemptionDetailSave.hide();
			btnExtend.hide();
		//--
		
		}
        
}


function saveExemptionRecord(save_ok_callback, requestProperties)
{
	var isAddNew = false;
	
	if(!requestProperties)
	{
		requestProperties = {};
	}
	
    if (exemptionEditVM.validate() && (!exemptions_edit_saving) ) {
    	exemptions_edit_saving = true;
//    	setTimeout(function(){
//    		exemptions_edit_saving = false;
//    	}, 3000);

    	exemptionEditVM.saveData(function(dsResponse, data, dsRequest) {
    		
    		if (dsResponse.status != 0) {
                console.log("exemptionEditVM.saveData() --> dsResponse.status != 0");
            }
    		exemptionEditVM.setData(data);
//    		exemptionEditVM.dataSource.updateCaches(dsResponse);
    		edit_ecertRecordID = data.id;
    		console.log("Saved Successfully.");
    		exemptions_edit_saving = false;
			if(save_ok_callback)
			{
				save_ok_callback();
			}
			else
			{
				openExemptionDetail(data);	//refresh with new record.
				isc.say("Saved Successfully.");
			}
            return;
    	}, requestProperties);

	}
    else if(exemptions_edit_saving)
	{
		console.log("Rapid Saves!" );
		isc.say("System is busy. Please try again later.");
	
	}
    else
    {
		console.log("validation fail!" );
		isc.say("Validation failed. Please check input and try again.");
	}
		 
		 
}

function updateCaseClosed(intCloseCase)
{

	sameExemptionChecking(function(bool_ok, found_record){
		if(bool_ok)
		{
			//-- intCloseCase  1 = case close , 2 = restart case  
			if (intCloseCase==1)
			{
				exemptionEditVM.setValue("case_closed","Y");
				exemptionEditVM.setValue("email_closed","Y");
			} 	
			if (intCloseCase==2)
			{
				exemptionEditVM.setValue("case_closed",null);
				exemptionEditVM.setValue("email_closed",null);
				
			}	
			saveExemptionRecord();
//			toggleEdit(intCloseCase);
		}
	});
	
		
	
	
}

function setFormItemHighlight(bgcolor) {
	document.querySelector("div[eventproxy=frmExemptionEdit_top] [name=place_vessel]").parentNode.parentNode.style.backgroundColor = bgcolor;
	document.querySelector("div[eventproxy=frmExemptionEdit_middle] [name=convention]").parentNode.parentNode.style.backgroundColor = bgcolor;
	//document.querySelector("div[eventproxy=frmExemptionEdit_bottom] [name=valid_date]").parentNode.parentNode.style.backgroundColor = bgcolor;
	var parentNd = document.querySelector("div[eventproxy=frmExemptionEdit_bottom] [name=valid_date_dateTextField]").parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
	parentNd.getElementsByTagName("td")[4].style.backgroundColor = bgcolor;
	parentNd.getElementsByTagName("td")[5].style.backgroundColor = bgcolor;
}


function trimFieldValue(entity) {

    for (var property in entity) {
        if (entity.hasOwnProperty(property)) {
            
            if (typeof entity[property] == "string")
                entity[property] = entity[property].trim();
        }
    }
    
}

function getEngDateString(date) {
	if (!isNull(date) && isc.isA.Date(date)) {
		//return date.getDate() + " " + ("0" + date.getMonth()).slice(-2) + " " + date.getFullYear();
		return date.getDate() + " " + date.getMonthName().substr(0, 3) + " " + date.getFullYear();
	}else{
		console.log("invalid date.");
		return "";
	}
	
}
function replaceAll(str, find, replace) {
    return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}
function escapeRegExp(str) {
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}




