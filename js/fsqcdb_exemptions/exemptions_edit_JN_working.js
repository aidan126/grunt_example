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



function exemptionsWindowsContent(record)
{
	
	 var counter ;
	 
	 counter = 0 ;
	 	 
	//Date.setShortDisplayFormat("toJapanShortDate");
	//Date.setInputFormat("YMD");
	
	var valueMan = isc.ValuesManager.create({
	    ID: "exemptionEditVM",
		dataSource: eCertRecordDS
	});

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
	    ID: "exCodeEditVM",
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
	    					 isc.ask("Do you want to close this case and extend the expiry date?", function (value){
	    						 if (value){
	    							 
	    							 extendExemptionChecking(); 
	    						 }
	    						 
	    						 
	    					 });
	    				}	    			
	    			}),
	    			
	    			//jacky todo
	    			//Min btn
	    			isc.IButton.create({ID:"btnMinCert",title:"Min",startRow:false,
	    			 
	    			click:function(){
//	    				if (isNull(exemptionEditVM.getValue("id")) || exCodeChoiceChanged || !isEmpty(exemptionEditVM.getChangedValues())) {
	    			        //record changes not yet saved
//        	    			isc.say("Please save record first! ");
//	    				}else{
	    				if (isNull(exemptionEditVM.getValue("id")) || exCodeChoiceChanged || !isEmpty(exemptionEditVM.getChangedValues())) {
	    					//record changes not yet saved
	    					saveExemptionRec();
	    				}
        	    				//old record 
        	    				console.log("Min btn start for saved records, jobno: " + exemptionEditVM.getValue("id"));
                                oldSysRecMissingBridge = false;
                                oldRecFromOldSystem = false;
                                saveECertRecordOpenMinWinDone = false;
        	    				
                                missingFormListForERecordMin = false;
                                missingFormListForERecordMinChecked = false;
                                missingFormListForERecordMinDone = true;
                                missingExemJobForERecordMin = false;
                                missingExemJobForERecordMinChecked = false;
                                missingExemJobForERecordMinDone = true;
                                
                                if (isNull(exemptionEditVM.getValue("exempt_code_id"))) {
                                    oldRecFromOldSystem = true;
                                }
                                
        	    				isc.DataSource.get("eCertFormListDS").fetchData({"jobno":exemptionEditVM.getValue("id"), "form":"Minute"}, function (dsResponse, data, dsRequest) {
                                    if (isNull(data) || data.length<=0) {
                                        console.log("prepare to save record again for insert formlist because no data");
                                        console.log("eCertFormListDS---------missingFormListForERecordMin = true;");
                                        missingFormListForERecordMin = true;
                                        missingFormListForERecordMinDone = false;
                                        
        	    					}else{
                                        //isc.say("min&cert button is clicked for jobno:" +exemptionEditVM.getValue("id"));
                                        console.log("\nmin button is clicked for jobno:" + exemptionEditVM.getValue("id"));
                                        console.log("eCertFormListDS has records---------missingFormListForERecordMin = false;\n");
                                        missingFormListForERecordMin = false;
                                        
                                        
                                        /*
                                        if (!isNull(data[0]))
                                        	ecertRecformType = data[0].form.trim();
                                        */
                                        
                                        //openExemptionFormList(exemptionEditVM.getValue("id"));
                                        //insertExJobForNoData("Minute",function(){openExemptionCertMin(exemptionEditVM.getValue("id"));}, exemptionEditVM.getValue("valid_date"));
        	    					}
                                    missingFormListForERecordMinChecked = true;
                                    openMinWindowController();
                                    
        	    				});
                                
                                //isc.DataSource.get("exemptionJobDS").fetchData({"jobno":exemptionEditVM.getValue("id"), "form":"Minute"},
        	    				exCodeEditVM.fetchData({"jobno":exemptionEditVM.getValue("id"), "form":"Minute"}, function (dsResponse, data, dsRequest) {
                                    if (isNull(data) || data.length<=0) {
                                        console.log("prepare to save record again for insert Exemption_job because no data");
                                        console.log("exCodeEditVM---------missingExemJobForERecordMin = true;");
                                        missingExemJobForERecordMin = true;
                                        missingExemJobForERecordMinDone = false;
                                        
                                    }else{
                                    	console.log("\nmin button is clicked for jobno:" + exemptionEditVM.getValue("id"));
                                        console.log("exemptionJobDS has records---------missingExemJobForERecordMin = false;\n");
                                        missingExemJobForERecordMin = false;
                                        
                                    }
                                    missingExemJobForERecordMinChecked = true;
                                    openMinWindowController();
                                    
                                });
//                        }
	    			}
                    }),
	    			//Cert btn
	    			isc.IButton.create({ID:"btnCert",title:"Cert",startRow:false,
		    			click:function(){
//		    				if (isNull(exemptionEditVM.getValue("id")) || exCodeChoiceChanged || !isEmpty(exemptionEditVM.getChangedValues())) {
//	        	    			isc.say("Please save record first! ");
//		    				}else{
		    				if (isNull(exemptionEditVM.getValue("id")) || exCodeChoiceChanged || !isEmpty(exemptionEditVM.getChangedValues())) {
		    					//record changes not yet saved
		    					saveExemptionRec();
		    				}
		        	    			console.log("Cert btn start for saved records, jobno: " + exemptionEditVM.getValue("id"));
                                    
		        	    			oldSysRecMissingBridge = false;
		        	    		    //ecertRecformType = "";
		        	    		    //saveECertRecordOpenMinWinDone = false;
		        	    		    saveECertRecordOpenCertWinDone = false;
		        	    		    

		        	    		    missingFormListForERecordCert = false;
		        	    		    missingFormListForERecordCertChecked = false;
		        	    		    missingFormListForERecordCertDone = true;
		        	    		    missingExemJobForERecordCert = false;
		        	    		    missingExemJobForERecordCertChecked = false;
		        	    		    missingExemJobForERecordCertDone = true;
		        	    		    

		        	    		    eCertMissingArr = [false,false];
		        	    		    eCertMissingArrChecked = [false,false];
		        	    		    eCertMissingArrHandled = [true,true];

		        	    		    eCertCO2MissingArr = [false,false];
		        	    		    eCertCO2MissingArrChecked = [false,false];
		        	    		    eCertCO2MissingArrHandled = [true,true];

		        	    		    letterMissingArr = [false,false];
		        	    		    letterMissingArrChecked = [false,false];
		        	    		    letterMissingArrHandled = [true,true];
		        	    		    

                                    
	                                if (!isNull(exemptionEditVM.getValue("exempt_code_id"))) {
	                                	//ecert_record table has FK "exempt_code_id"
                                        
                                        //ecertExemptionsCodeDS
                                        
	                                	/*
	                                	hiddenExCodeLG.setCriteria({"id":exemptionEditVM.getValue("exempt_code_id")});
	                                	hiddenExCodeLG.refreshData(function(dsResponse, data, dsRequest) {
		                                	if (dsResponse.status != 0) {
		                        				console.log("dsResponse.status != 0");
		                        				return;
		                        			}
		                                	console.log("hiddenExCodeLG.refreshData() callback");
		                                	if (!isNull(data) && data.length > 0 && !isNull(data[0])) {
		                                		ecertRecformType = !isNull(data[0].output_type) ? data[0].output_type.trim() : "";
		                                		ecertRecformType = stringMapForFormType(ecertRecformType);
		                                	}
		                                	
	                                	});
	                                	*/
		                                /*
	                                	var exCodeRec = hiddenExCodeLG.findByKey(exemptionEditVM.getValue("exempt_code_id"));
	                                	if (!isNull(exCodeRec)) {
	                                		ecertRecformType = !isNull(exCodeRec.output_type) ? exCodeRec.output_type.trim() : "";
	                                		ecertRecformType = stringMapForFormType(ecertRecformType);
	                                	}
	                                	*/
	                                	hiddenExCodeLG.fetchData({},function(dsResponse, data, dsRequest) {
	                                		hiddenExCodeLG.fetchData({"id":exemptionEditVM.getValue("exempt_code_id")}, function(dsResponse, data, dsRequest) {
			                                	if (dsResponse.status != 0) {
			                        				console.log("dsResponse.status != 0");
			                        				return;
			                        			}
			                                	ecertRecformType = "Cert";	// default to normal Cert.
			                                	if (!isNull(data) && data.length > 0 && !isNull(data[0])) {
			                                		ecertRecformType = !isNull(data[0].output_type) ? data[0].output_type.trim() : "";
//			                                		ecertRecformType = stringMapForFormType(ecertRecformType);
			                                	}
		                                		ecertRecformType = stringMapForFormType(ecertRecformType);
			                                	

			                                	console.log("****** ecertRecformType: " + ecertRecformType);
			                                	//jacky last round
                                                checkIfMissingRecFor_FormList_ExemJob(ecertRecformType);
			                                	
		                                	});
	                                	});
	                                	
	       
	                                }else{
	                                	//ecert_record table don't have FK "exempt_code_id"
	                                	console.log("ecert_record table don't have FK \"exempt_code_id\"");
	                                	var requestParam = {"operationType":"update", "operationId":"SAVE_ECERT_DETAILS", data: {"exCodeChoiceChanged": exCodeChoiceChanged, "ecertRecChanged": !isEmpty(exemptionEditVM.getChangedValues()), "oldSysRecMissingBridge": oldSysRecMissingBridge, "oldFormType": oldFormType, "old_ex_code_id": old_ex_code_id, updateData: exemptionEditVM.getValues()}};
	                                    console.log("==============================================================================================================");
	                                    console.log("ECertRecord to be saved: " + JSON.stringify(exemptionEditVM.getValues()));
	                                    console.log("requestParam: " + JSON.stringify(requestParam));
                                        missingRecForNoFKHandled = false;
                                        
                                        
                                        for(var i = 0; i < formTypePriorityForMisssingFK.length; i++) {
                                            var formType = formTypePriorityForMisssingFK[i];
                                            //form list
                                            isc.DataSource.get("eCertFormListDS").fetchData({"jobno":exemptionEditVM.getValue("id"), "form":formType}, function (dsResponse, data, dsRequest) {
                                                if (dsResponse.status != 0) {
                                                    console.log("dsResponse.status != 0");
                                                    return;
                                                }
                                                
                                                var form = "";
                                                if (!isNull(dsRequest) && !isNull(dsRequest.data) && !isNull(dsRequest.data.form)) {
                                                    form = dsRequest.data.form.trim();
                                                }
                                                console.log("***form: " + form);
                                                if (isNull(data) || data.length<=0) {
                                                    //no data
                                                    console.log("eCertFormListDS has NO rec");
                                                    setMissingRecFlagForNoFK(form, false, 0);    
                                                }else{
                                                    console.log("eCertFormListDS has rec");
                                                    setMissingRecFlagForNoFK(form, true, 0);
                                                }
                                                checkMissingRecForNoFK(form);
                                            });
                                            
                                            //exemptionJobDS
                                            isc.DataSource.get("exemptionJobDS").fetchData({"jobno":exemptionEditVM.getValue("id"), "form":formType}, function (dsResponse, data, dsRequest) {
                                                if (dsResponse.status != 0) {
                                                    console.log("dsResponse.status != 0");
                                                    return;
                                                }
                                                
                                                var form = "";
                                                if (!isNull(dsRequest) && !isNull(dsRequest.data) && !isNull(dsRequest.data.form)) {
                                                    form = dsRequest.data.form.trim();
                                                }
                                                console.log("***form: " + form);
                                                if (isNull(data) || data.length<=0) {
                                                    //no data
                                                    console.log("exemptionJobDS has NO rec");
                                                    setMissingRecFlagForNoFK(form, false, 1);    
                                                }else{
                                                    console.log("exemptionJobDS has rec");
                                                    setMissingRecFlagForNoFK(form, true, 1);
                                                }
                                                
                                                checkMissingRecForNoFK(form);
                                            });
                                            
                                        }
                                        
                                        
                                        
                                        
                                        
	                                }
	                                
//                            }
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
	
	function saveExemptionRec() {
		if (isNull(frmExemptionEdit_bottom.getValue("cert_no")) && isNull(objExCodePara) )
			isc.say("Please select exemption code first! ");
		else
			saveExemptionRecord(0);
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
		console.log("will start to extend exemption.");
		exemptionEditVM.saveData(function(dsResponse, data, dsRequest) {
			if (!isNull(dsResponse) && dsResponse.status == 0)
			{
				btnExtend.hide();
				isc.say("Exemption extended successfully!<br>Please enter the new expiry date");
			}
	    },{"operationId":"EXTENDEXEMPTION"});
	}
	
	function extendExemptionChecking()
	{
		console.log("enter extendExemptionChecking()");
		var selected_id = exemptionEditVM.getValue("id");
		var criteria = {};
		if (!isNull(exemptionEditVM.getValue("imono")) && exemptionEditVM.getValue("imono").trim() != "") {
			criteria.imono = exemptionEditVM.getValue("imono");
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
		if (!isNull(exemptionEditVM.getValue("component")) && exemptionEditVM.getValue("component").trim() != "") {
			criteria.component = exemptionEditVM.getValue("component");
		}
		
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
				var will_extend_record = false;
				var found_record = false;
				var same_imono_excode_not_closed = false;
				if (!isNull(data) && data.length > 0) {
					found_record = true;
					for (var i = 0; i < data.length; i++) {
						if ( !isNull(data[i]) && !isNull(data[i].id) && data[i].id != selected_id && (isNull(data[i].case_closed) || data[i].case_closed != "Y") ) {
							console.log(">>id: " + data[i].id);
							same_imono_excode_not_closed = true;
							will_extend_record = false;
								
							console.log(JSON.stringify(data[i]));
							break;
						}
					}
					if (found_record && same_imono_excode_not_closed) {
						isc.ask("There are record(s) with same imono and same exemption code which are not yet closed.<br/><br/>Are you sure you want to extend the exemption valid date of this ship?", function(value){
							if (value) {
								console.log("user chosen to entend: " + selected_id);
								extendExemption();
							}else{
								console.log("user chosen not to entend: " + selected_id);
								return;
							}
						});
						
					}else{
						console.log("@same imono && same excode but case_closed");
					}
					will_extend_record = true;
					
				}else{
					will_extend_record = true;
					console.log("@no records of same imono && same excode found");
					
				}
				if ( !(found_record && same_imono_excode_not_closed) ) {
					extendExemption();
				}
				console.log("leave extendExemptionChecking()");
		});
		
		
	}
    
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
		 			 
		 		 
		 	  	 openExemptionCode(exType,"",getExemptionCodeContent);
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
	 		
		 	{name: "dm_agreed", 	title:"DM agreed via email:", editortype:"ComboBoxItem", 
		 		
		 	valueMap: {null:"NO" ,"Y":"YES" },
		 	defaultToFirstOption:true, 
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
		 	{name: "exempted_date", 	title:"Certificate Date:", type:"date"	, width: "100%", colSpan:3, defaultValue:new Date()},
		 	
		 	{name: "cert_no", 	title:"Cert No.:", type:"text",canEdit:false, startRow: true, width: "100%", colSpan:3 },
		 	
		 	{name: "dm_agreed_date", title:"Agreed Date:", type:"date", width: 200, colSpan:3, startRow:false },
		 			 	
		 	{name: "alarm_days", 	title:"Alarm Days:", defaultValue:3,type:"integer", startRow: true, width: "100%", colSpan:3 },
		 	
		 	{name: "collect_date", 	title:"Date of Collection:", type:"date", width: "100%", colSpan:3 },
		 	
		 	{name: "case_closed", 	title:"Case Closed:", required:true, canEdit:false, valueMap: {null:"NO" ,"Y":"YES" },
		 		defaultToFirstOption:true, 
		 		startRow: true, width: "100%", colSpan:3 },
		 	
		 	{name: "remark", 	title:"Others:",  startRow: true,colSpan:7,width:"100%" ,length:300},
		 	
		 	
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

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

var exempt_code_id_tmp = 0;



function checkIfMissingRecFor_FormList_ExemJob(ecertRecformType) {
    
    //eCertFormListDS
    isc.DataSource.get("eCertFormListDS").fetchData({"jobno":exemptionEditVM.getValue("id"), "form":ecertRecformType}, function (dsResponse, data, dsRequest){
        if (isNull(data) || data.length<=0) {
             console.log("prepare to save record again for insert formlist because no data");
             console.log("eCertFormListDS---------missingFormListForERecordCert = true;");
             missingFormListForERecordCert = true;
             missingFormListForERecordCertDone = false;
//	        	    					 exemptionEditVM.saveData(function(dsResponse, data, dsRequest) {
//	        	    						  console.log("min&cert button is clicked for jobno:" + exemptionEditVM.getValue("id"));	  
//	        	    						  openCertWindow(jobno);
//	      	        	    				  //openExemptionFormList(exemptionEditVM.getValue("id"));
//	        	    					 });  
        }else{
            //insertExJobForNoData("Minute",function(){openExemptionCertMin(record.jobno);});
            //insertExJobForNoData("Exemption Certificate(CO2)",function(){openExemptionCertCO2Report(record.jobno);});
            
            //openCertWindow(jobno);
            //openExemptionFormList(exemptionEditVM.getValue("id"));
            
            console.log("cert button is clicked for jobno:" + exemptionEditVM.getValue("id"));
            console.log("eCertFormListDS has records---------missingFormListForERecordCert = false;\n");
            missingFormListForERecordCert = false;
            
            /*
            if (!isNull(data[0]))
                ecertRecformType = data[0].form.trim();
            */	
        }
        missingFormListForERecordCertChecked = true;
        openCertWindowController(ecertRecformType);
    });
    
    //exemptionJobDS
    //isc.DataSource.get("exemptionJobDS").fetchData({"jobno":exemptionEditVM.getValue("id"), "form":"Minute"},
    exCodeEditVM.fetchData({"jobno":exemptionEditVM.getValue("id"), "form":ecertRecformType}, function (dsResponse, data, dsRequest) {
        if (isNull(data) || data.length<=0) {
            console.log("prepare to save record again for insert Exemption_job because no data");
            console.log("exCodeEditVM---------missingExemJobForERecordCert = true;");
            missingExemJobForERecordCert = true;
            missingExemJobForERecordCertDone = false;
            
        }else{
            console.log("cert button is clicked for jobno:" + exemptionEditVM.getValue("id"));
            console.log("exemptionJobDS has records---------missingExemJobForERecordCert = false;\n");
            missingExemJobForERecordCert = false;
            
        }
        missingExemJobForERecordCertChecked = true;
        openCertWindowController(ecertRecformType);
        
    });
}






function setMissingRecFlagForNoFK(formType, found, index) {
    //index: 0:FormList; 1:Exemption_job
    switch(formType) {
        case "Exemption Certificate(CO2)":
            eCertCO2MissingArr[index] = !found;
            eCertCO2MissingArrChecked[index] = true;
            eCertCO2MissingArrHandled[index] = found;
            console.log("----------------------------------------------------------------------------------------");
            console.log("eCertCO2MissingArr[" + index + "]: " + eCertCO2MissingArr[index]);
            console.log("eCertCO2MissingArrChecked[" + index + "]: " + eCertCO2MissingArrChecked[index]);
            console.log("eCertCO2MissingArrHandled[" + index + "]: " + eCertCO2MissingArrHandled[index]);
            console.log("----------------------------------------------------------------------------------------");
            break;
        case "Letter":
            letterMissingArr[index] = !found;
            letterMissingArrChecked[index] = true;
            letterMissingArrHandled[index] = found;
            console.log("----------------------------------------------------------------------------------------");
            console.log("letterMissingArr[" + index + "]: " + letterMissingArr[index]);
            console.log("letterMissingArrChecked[" + index + "]: " + letterMissingArrChecked[index]);
            console.log("letterMissingArrHandled[" + index + "]: " + letterMissingArrHandled[index]);
            console.log("----------------------------------------------------------------------------------------");
            break;
        case "Exemption Certificate":
            eCertMissingArr[index] = !found;
            eCertMissingArrChecked[index] = true;
            eCertMissingArrHandled[index] = found;
            console.log("----------------------------------------------------------------------------------------");
            console.log("eCertMissingArr[" + index + "]: " + eCertMissingArr[index]);
            console.log("eCertMissingArrChecked[" + index + "]: " + eCertMissingArrChecked[index]);
            console.log("eCertMissingArrHandled[" + index + "]: " + eCertMissingArrHandled[index]);
            console.log("----------------------------------------------------------------------------------------");
            break;
    }
}


function checkMissingRecForNoFK(formType) {
    
    if (formType == "Exemption Certificate(CO2)") {
        if (eCertCO2MissingArrChecked[0] && eCertCO2MissingArrChecked[1] && !missingRecForNoFKHandled) {
            if ((eCertCO2MissingArr[0] && !eCertCO2MissingArrHandled[0]) ^ (eCertCO2MissingArr[1] && !eCertCO2MissingArrHandled[1])) {
                //missing rec --> ask users if fix records
                missingRecForNoFKHandled = true;
                
//                isc.ask(fixMissingRecConfirm, function(value) {
//                    if (value) {
                        console.log("users chosen to fix missing records");
                        saveMissingRecOpenPrintWindow();
//                    }
//                });
                
            }
        }
        checkIfAllFormNoMissing(formType);
    }else if (formType == "Letter") {
        
        if (letterMissingArrChecked[0] && letterMissingArrChecked[1] && !missingRecForNoFKHandled) {
            if ((letterMissingArr[0] && !letterMissingArrHandled[0]) ^ (letterMissingArr[1] && !letterMissingArrHandled[1])) {
                //missing rec --> ask users if fix records
                missingRecForNoFKHandled = true;
                
//                isc.ask(fixMissingRecConfirm, function(value) {
//                    if (value) {
                        console.log("users chosen to fix missing records");
                        saveMissingRecOpenPrintWindow();
//                    }
//                });
            
            }
        }
        checkIfAllFormNoMissing(formType);
        
    }else if (formType == "Exemption Certificate") {
        
        if (eCertMissingArrChecked[0] && eCertMissingArrChecked[1] && !missingRecForNoFKHandled) {
            if ((eCertMissingArr[0] && !eCertMissingArrHandled[0]) ^ (eCertMissingArr[1] && !eCertMissingArrHandled[1])) {
                //missing rec --> ask users if fix records
                missingRecForNoFKHandled = true;
                
//                isc.ask(fixMissingRecConfirm, function(value) {
//                    if (value) {
                        console.log("users chosen to fix missing records");
                        saveMissingRecOpenPrintWindow();
//                    }
//                });
                
            }
        }
        checkIfAllFormNoMissing(formType);
        
    }
    
}





function checkIfAllFormNoMissing(formType) {
    
    if (!missingRecForNoFKHandled &&
        eCertCO2MissingArrChecked[0] && eCertCO2MissingArrChecked[1] && 
        letterMissingArrChecked[0] && letterMissingArrChecked[1] && 
        eCertMissingArrChecked[0] && eCertMissingArrChecked[1]  ) {
        
        if (!(!eCertCO2MissingArr[0] ^ !eCertCO2MissingArr[1]) && 
            !(!letterMissingArr[0] ^ !letterMissingArr[1]) && 
            !(!eCertMissingArr[0] ^ !eCertMissingArr[1])    ) {
        
                    /*
                    || !eCertCO2MissingArr[0] && eCertCO2MissingArr[1] && eCertCO2MissingArrHandled[1]
                    || !eCertCO2MissingArr[1] && eCertCO2MissingArr[0] && eCertCO2MissingArrHandled[0]
                    || eCertCO2MissingArr[0] && eCertCO2MissingArrHandled[0] && eCertCO2MissingArr[1] && eCertCO2MissingArrHandled[1]){
                    */
                        
            //all form type have records --> open print report page
        	isc.DataSource.get("exemptionJobDS").fetchData({"jobno":exemptionEditVM.getValue("id")}, 
                    function (dsResponse, data, dsRequest){
                        if (dsResponse.status != 0) {
                            console.log("dsResponse.status != 0");
                            return;
                        }
                        var found = findFormTypeFromPriorityList(data);
                        if (found) {
                            console.log("/*------------------------------------------------------------------------------------");
                            console.log("No missing records OR missing records are fixed, can open print report window");                
                            console.log("formType: " + selectedFormTypeForEcertRec);
                            console.log("------------------------------------------------------------------------------------*/");
                            missingRecForNoFKHandled = true;
                            //openPrintReportPage(selectedFormTypeForEcertRec, exemptionEditVM.getValue("id"));
                            replaceValidDateAndPrintReport(selectedFormTypeForEcertRec, exemptionEditVM.getValue("valid_date"), exemptionEditVM.getValue("id"));
                        }
                });
        	
        	
            
        }
    }
    
}


function saveMissingRecOpenPrintWindow() {
    var requestParam = {"operationType":"update", "operationId":"SAVE_ECERT_DETAILS", data: {"exCodeChoiceChanged": exCodeChoiceChanged, "ecertRecChanged": !isEmpty(exemptionEditVM.getChangedValues()), "oldSysRecMissingBridge": oldSysRecMissingBridge, "oldFormType": oldFormType, "old_ex_code_id": old_ex_code_id, updateData: exemptionEditVM.getValues()}};
    console.log("==============================================================================================================");
    console.log("ECertRecord to be saved: " + JSON.stringify(exemptionEditVM.getValues()));
    console.log("requestParam: " + JSON.stringify(requestParam));
    
    exemptionEditVM.saveData(function (dsResponse, eRdata, dsRequest){
        isc.DataSource.get("exemptionJobDS").fetchData({"jobno":exemptionEditVM.getValue("id")}, 
            function (dsResponse, data, dsRequest){
                if (dsResponse.status != 0) {
                    console.log("dsResponse.status != 0");
                    return;
                }
                
                var found = findFormTypeFromPriorityList(data);
                console.log("found cert type for record misssing FK: " + selectedFormTypeForEcertRec);
                if (found) {
                    //found --> open print report page
                    //openPrintReportPage(selectedFormTypeForEcertRec, exemptionEditVM.getValue("id"));
                	replaceValidDateAndPrintReport(selectedFormTypeForEcertRec, exemptionEditVM.getValue("valid_date"), exemptionEditVM.getValue("id"));
                }else{
                    console.log("================================================================================================")
                    console.log("CANNOT find suitable form type for missing FK old records, in order to open printing report page");
                    console.log("================================================================================================")
                }
        });
    }, requestParam);
    
}




function openMinWindowController() {
	console.log("enter openMinWindowController()");
	
	console.log("missingFormListForERecordMin: " + missingFormListForERecordMin);
	console.log("missingFormListForERecordMinChecked: " + missingFormListForERecordMinChecked);
	console.log("missingFormListForERecordMinDone: " + missingFormListForERecordMinDone);
	console.log("missingExemJobForERecordMin: " + missingExemJobForERecordMin);
	console.log("missingExemJobForERecordMinChecked: " + missingExemJobForERecordMinChecked);
	console.log("missingExemJobForERecordMinDone: " + missingExemJobForERecordMinDone);
	
	if (missingFormListForERecordMinChecked && missingExemJobForERecordMinChecked) {
		if (!saveECertRecordOpenMinWinDone && 
	    		(!missingFormListForERecordMin && !missingExemJobForERecordMin 
	    		|| !missingFormListForERecordMin && missingExemJobForERecordMin && missingExemJobForERecordMinDone
	    		|| !missingExemJobForERecordMin && missingFormListForERecordMin && missingFormListForERecordMinDone
	    		|| missingFormListForERecordMin && missingFormListForERecordMinDone && missingExemJobForERecordMin && missingExemJobForERecordMinDone)
	    		) {
	        //have records
	        console.log("/*------------------------------------------------------------------------------------");
	    	console.log("No missing records OR missing records are fixed, can open Min window");
	    	
	        console.log("------------------------------------------------------------------------------------*/");
	    	
	    	saveECertRecordOpenMinWinDone = true;
	    	console.log("saveECertRecordOpenMinWinDone = true: " + saveECertRecordOpenMinWinDone);
	    	//replaceValidDateForExemptionJob("Minute", exemptionEditVM.getValue("valid_date"), openExemptionCertMin(exemptionEditVM.getValue("id")));
	    	replaceValidDateAndPrintReport("Minute", exemptionEditVM.getValue("valid_date"), exemptionEditVM.getValue("id"));
	    	
	    	
	    	
	    }else if (missingFormListForERecordMin && !missingFormListForERecordMinDone || missingExemJobForERecordMin && !missingExemJobForERecordMinDone) {
	        //missing records
	        console.log("/*------------------------------------------------------------------------------------");
	    	console.log("Missing records in either table (form_list && Exemption_job): ");
	    	
	        console.log("------------------------------------------------------------------------------------*/");
	        oldSysRecMissingBridge = true;
	        
	        //prompt users if fix
//	        isc.ask(fixMissingRecConfirm, function(value) {
//	            if (value) {
	                console.log("users chosen to fix missing records");
	                saveECertRecordOpenMinWindow();
//	            }
//	        });
	    	
	    }
	}
	console.log("leave openMinWindowController()");
}



function openCertWindowController(ecertRecformType) {
	console.log("enter openCertWindowController()");
	console.log("missingFormListForERecordCert: " + missingFormListForERecordCert);
	console.log("missingFormListForERecordCertChecked: " + missingFormListForERecordCertChecked);	
	console.log("missingFormListForERecordCertDone: " + missingFormListForERecordCertDone);
	console.log("missingExemJobForERecordCert: " + missingExemJobForERecordCert);
	console.log("missingExemJobForERecordCertChecked: " + missingExemJobForERecordCertChecked);
	console.log("missingExemJobForERecordCertDone: " + missingExemJobForERecordCertDone);
	
	if (missingFormListForERecordCertChecked && missingExemJobForERecordCertChecked) {
		if (!saveECertRecordOpenCertWinDone && 
	    		(!missingFormListForERecordCert && !missingExemJobForERecordCert 
	    		|| !missingFormListForERecordCert && missingExemJobForERecordCert && missingExemJobForERecordCertDone
	    		|| !missingExemJobForERecordCert && missingFormListForERecordCert && missingFormListForERecordCertDone
	    		|| missingFormListForERecordCert && missingFormListForERecordCertDone && missingExemJobForERecordCert && missingExemJobForERecordCertDone)
	    		) {
	    	console.log("can open Cert window");
	        
	        //have records --> replace ValidDate placeholder and open printing page
	        console.log("/*------------------------------------------------------------------------------------");
	    	console.log("No missing records OR missing records are fixed, can open Min window");
	        console.log("------------------------------------------------------------------------------------*/");
	    	
	    	saveECertRecordOpenCertWinDone = true;
	    	console.log("saveECertRecordOpenCertWinDone = true: " + saveECertRecordOpenCertWinDone);
	    	replaceValidDateAndPrintReport(ecertRecformType, exemptionEditVM.getValue("valid_date"), exemptionEditVM.getValue("id"));
	    	
	    	
	    }else if (missingFormListForERecordCert && !missingFormListForERecordCertDone || missingExemJobForERecordCert && !missingExemJobForERecordCertDone) {
	        //missing records --> ask users if need to fix record and then open printing page
	        console.log("/*------------------------------------------------------------------------------------");
	        console.log("Missing records in either table (form_list && Exemption_job): ");
	    	
	        console.log("------------------------------------------------------------------------------------*/");
	        
	        oldSysRecMissingBridge = true;
	        
	        //prompt users if fix
//	        isc.ask(fixMissingRecConfirm, function(value) {
//	            if (value) {
	                console.log("users chosen to fix missing records");
                    //*********
	                saveECertRecordOpenCertWindow(ecertRecformType);
//	            }
//	        });
	    	
	    }
	}
	console.log("leave openCertWindowController()");
}



function replaceValidDateAndPrintReport(ecertRecformType, valid_date, ecertRecId) {
	//exemptionEditVM.getValue("valid_date")
	replaceValidDateForExemptionJob(ecertRecformType, valid_date, openPrintReportPage(ecertRecformType));
}

function openPrintReportPage(formType) {
    switch(formType) {
        case "Exemption Certificate(CO2)":
        	return openExemptionCertCO2Report;
            break;
        case "Letter":
            //jacky last round
            //not sure if using Cert page
        	return openExemptionCertReport;
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




function replaceValidDateForExemptionJob(formType, valid_date, callback) {
	console.log("enter replaceValidDateForExemptionJob()");
	console.log("formType: " + formType);
	console.log("valid_date: " + valid_date);
	
	
	exemptionJobDS.fetchData({"jobno":exemptionEditVM.getValue("id"),"form":formType}, function(dsResponse, data, dsRequest){
			if (dsResponse.status != 0) {
				console.log("dsResponse.status != 0");
				return;
			}
			if (!isNull(data) && data.length > 0) {
				console.log("exCodeEditVM.fetchData called");
				
				//replace "replace marker" with valid_date
				var targetStr = "<ValidDate>";
				var validDateStr = getEngDateString(valid_date);
				var content_1 = exCodeEditVM.getValue("content_1");
				
				if (!isNull(validDateStr) && (validDateStr = validDateStr.trim()) != "" && !isNull(content_1) && content_1.includes(targetStr)) {
					//content_1 = content_1.replace(targetStr, validDateStr);
					content_1 = replaceAll(content_1, targetStr, validDateStr);
				}
				console.log("content_1: " + content_1);
				exCodeEditVM.setValue("content_1", content_1);
				console.log("exCodeEditVM before save: " + JSON.stringify(exCodeEditVM.getValues()));
				
				/*
				exCodeEditVM.saveData(function(dsResponse, data, dsRequest){
					if (dsResponse.status == 0) {
						//console.log("exCodeEditVM.saveData callback");
						console.log("exCodeEditVM after save: " + JSON.stringify(exCodeEditVM.getValues()));
						if (!isNull(callback))
							callback();
					}
				});
				*/
				console.log("**** ----!!!!!!!!!!!!!!!!!!!! exemptionJobDS.updateData() *********");
				exemptionJobDS.updateData(exCodeEditVM.getValues(), function(dsResponse, data, dsRequest){
					if (dsResponse.status != 0) {
		                console.log("dsResponse.status != 0");
		                return;
		            }
					console.log("**** callback of exemptionJobDS.updateData() *********");
					console.log("jobno: " + exemptionEditVM.getValue("id"));
					console.log("form: " + formType);
					exCodeEditVM.fetchData({"jobno":exemptionEditVM.getValue("id"),"form":formType});
					console.log(JSON.stringify(data));
					console.log("exCodeEditVM after save: " + JSON.stringify(exCodeEditVM.getValues()));
					if (!isNull(callback)) {
						console.log("callback is not null");
						console.log("exemptionEditVM.getValue('id'): " + exemptionEditVM.getValue("id"));
						
						if (callback === openExemptionCertReport)
							callback(exemptionEditVM.getValue("id"), formType);
						else
							callback(exemptionEditVM.getValue("id"));
					}
					
				});
				
				/*
				exCodeEditVM.saveData(function(){
//					if (dsResponse.status == 0) {
						console.log("exCodeEditVM.saveData callback");
						console.log("exCodeEditVM after save: " + JSON.stringify(exCodeEditVM.getValues()));
						if (!isNull(callback)) {
							console.log("callback is not null");
							callback();
						}
//					}
				});
				*/
			}
	});
	console.log("leave replaceValidDateForExemptionJob()");
}

function saveECertRecordOpenMinWindow() {
	console.log("enter saveECertRecordOpenMinWindow() to fix missing records");
    console.log("missing record (form_list / Ex_Job) occurs + users chosen to fix missing records");
    //console.log("users chosen to fix missing records");
	//var formType = "";
    //var requestParam = {data: {"exCodeChoiceChanged": exCodeChoiceChanged, "ecertRecChanged": !isEmpty(exemptionEditVM.getChangedValues()), "oldSysRecMissingBridge": oldSysRecMissingBridge, "oldFormType": oldFormType, "old_ex_code_id": old_ex_code_id}};
    var requestParam = {"operationType":"update", "operationId":"SAVE_ECERT_DETAILS", data: {"exCodeChoiceChanged": exCodeChoiceChanged, "ecertRecChanged": !isEmpty(exemptionEditVM.getChangedValues()), "oldSysRecMissingBridge": oldSysRecMissingBridge, "oldFormType": oldFormType, "old_ex_code_id": old_ex_code_id, updateData: exemptionEditVM.getValues()}};
    console.log("requestParam: " + JSON.stringify(requestParam));
	
        exemptionEditVM.saveData(function(dsResponse, data, dsRequest) {
            if (dsResponse.status != 0) {
                console.log("dsResponse.status != 0");
                return;
            }
            console.log("Min button is clicked for jobno:" + exemptionEditVM.getValue("id"));
            console.log("exemptionEditVM.saveData() callback");
            missingFormListForERecordMinDone = true;
            missingExemJobForERecordMinDone = true;
            if (!saveECertRecordOpenMinWinDone) {
            	saveECertRecordOpenMinWinDone = true;
            	console.log("saveECertRecordOpenMinWinDone = true: " + saveECertRecordOpenMinWinDone);
            	//replaceValidDateForExemptionJob("Minute", exemptionEditVM.getValue("valid_date"), openExemptionCertMin(exemptionEditVM.getValue("id")));
            	replaceValidDateAndPrintReport("Minute", exemptionEditVM.getValue("valid_date"), exemptionEditVM.getValue("id"));
            }
        }, requestParam);
    
    console.log("leave saveECertRecordOpenMinWindow()");
}


function saveECertRecordOpenCertWindow(ecertRecformType) {
	console.log("enter saveECertRecordOpenCertWindow()");
	console.log("missing record occurs");
	//var formType = "";
    var requestParam = {"operationType":"update", "operationId":"SAVE_ECERT_DETAILS", data: {"exCodeChoiceChanged": exCodeChoiceChanged, "ecertRecChanged": !isEmpty(exemptionEditVM.getChangedValues()), "oldSysRecMissingBridge": oldSysRecMissingBridge, "oldFormType": oldFormType, "old_ex_code_id": old_ex_code_id, updateData: exemptionEditVM.getValues()}};
    console.log("==============================================================================================================");
    console.log("ECertRecord to be saved: " + JSON.stringify(exemptionEditVM.getValues()));
    console.log("requestParam: " + JSON.stringify(requestParam));
    	
        exemptionEditVM.saveData(function(dsResponse, data, dsRequest) {
        	console.log("**************callback works for .saveData() *********************");
            console.log("Cert button is clicked for jobno:" + exemptionEditVM.getValue("id"));
            console.log("exemptionEditVM.saveData() callback");
            
            missingFormListForERecordCertDone = true;
            missingExemJobForERecordCertDone = true;
            
            
            if (!saveECertRecordOpenCertWinDone) {
            	saveECertRecordOpenCertWinDone = true;
            	console.log("saveECertRecordOpenCertWinDone = true: " + saveECertRecordOpenCertWinDone);
            	replaceValidDateAndPrintReport(ecertRecformType, exemptionEditVM.getValue("valid_date"), exemptionEditVM.getValue("id"));
            	            	
            }
        }, requestParam);
    
    console.log("leave saveECertRecordOpenCertWindow()");
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

function abd(arrObj) {
    if (!isNull(arrObj) && Array.isArray(arrObj)) {
        exemptionEditVM.setValue("min_dic_item_ids", objExCodePara.min_conditions_ids.join());
    }
}


function abd() {
    
}



function openCertWindow(jobno) {
	console.log("enter openCertWindow@@@@@@");
	var formType = "";
	
	//if contains both normal cert and CO2, then do what?
	
    if (missingRec && !missingRecForEcertRecordProcessDone) {
        exemptionEditVM.saveData(function(dsResponse, data, dsRequest) {
            console.log("min&cert button is clicked for jobno:" + exemptionEditVM.getValue("id"));
            console.log("exemptionEditVM.saveData() callback");
            //openExemptionFormList(exemptionEditVM.getValue("id"));
            
            //insertExJobForNoData("Minute",function(){openExemptionCertMin(exemptionEditVM.getValue("id"));}, exemptionEditVM.getValue("valid_date"));
            
            
            
            
            openExemptionCertMin(exemptionEditVM.getValue("id"));
            missingRecForEcertRecordProcessDone = true;
        });
    }
	
	/*
	isc.DataSource.get("eCertRecordDS").fetchData({"id":jobno}, function(dsResponse, data, dsRequest){
		if (dsResponse.status != 0)
			return;
		
		if (!isNull(data) && data.length > 0){
			exempt_code_id_tmp = data[0]["exempt_code_id"];
			
			if (!isNull(exempt_code_id_tmp)) {
				isc.DataSource.get("ecertExemptionsCodeDS").fetchData({"id":exempt_code_id_tmp}, function(dsResponse, data, dsRequest){
					if (dsResponse.status != 0)
						return;
					
					if (!isNull(data) && data.length > 0){
						formType = data[0].form;
					}
				});
			}
		}
	});
	
	if (!isNull(formType) && (formType = formType.trim()) != "") {
		if (formType == "Exemption Certificate") {
			insertExJobForNoData("Exemption Certificate",function(){openExemptionCertReport(jobno);});
		}else if (formType == "Exemption Certificate(CO2)") {
			insertExJobForNoData("Exemption Certificate(CO2)",function(){openExemptionCertCO2Report(jobno);});
		}
	}
	*/

	/*
	isc.DataSource.get("eCertFormListDS").fetchData({"id":jobno}, function(dsResponse, data, dsRequest){
		if (dsResponse.status == 0) {
			if (!isNull(data) && data.length > 0){
				var formArr = [];
				data.forEach(element => formArr.push(element.form));
				
				//go to Cert
				//go to CO2
				
				
				
				
			}
		}
	});
	*/
}


//function for opening this page
function openExemptionDetail(record) {
	
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
	
	exemptionsWindowsContent(record);
	
	exemption_edit_window.show();
	setTimeout(setFormItemHighlight, 3000, bg_highlight_exem_edit);
	
//		if(!isNull(record)){							// 00001 - Jacky comment
		if(!isNull(record) && !isNull(record.id)){  	// 00001 - Jacky Add
			//update record 
			if (!isNull(record.case_closed)) {
				if (record.case_closed=='Y') {
					//canEdit =false
					intMode = 1;
				}else{
					intMode = 2;
				}
			}else{
				 //canEdit =true;
				intMode = 2;
			}
				
			//---- populate data --
			frmExemptionEdit_top.getField('equipments').setDisabled(true);
			
			exemptionEditVM.fetchData({id:record.id}, function (dsResponse, data, dsRequest) {
				console.log(JSON.stringify(data[0]));
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
				
                exCodeEditVM.fetchData({"jobno":exemptionEditVM.getValue("id"),"form":"Exemption Certificate"},function(){
                    console.log("exCodeEditVM.fetchData called");
                    
                    console.log("call rememberValues() on exemptionEditVM and exCodeEditVM");
                    exemptionEditVM.rememberValues();
                    exCodeEditVM.rememberValues();
				});
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
				if (record.equipments == "Equipment"){
					//Add Exemption
					exemptionEditVM.setValue("valid_date", null);
				}else if (record.equipments == "Rating"){
					//Add Dispensation
					if (!isNull(exemptionEditVM.getValue("app_date")))
	                	exemptionEditVM.setValue("valid_date", new Date(exemptionEditVM.getValue("app_date")).addDays(28));
				}
			}
			
			if (!isNull(loginData.userId)) { 
                exemptionEditVM.setValue("create_man",loginData.userId);
                exemptionEditVM.setValue("review_person",loginData.userId);
			}
	 	}
	
}

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
				
                /*
                for (var i = 0; i < objExCodePara.min_conditions_ids.length; i++) {
                    
                }
                */
                
                if (!isNull(objExCodePara.min_conditions_ids) && Array.isArray(objExCodePara.min_conditions_ids)) {
                    min_DicItemArr = objExCodePara.min_conditions_ids;
                    var tmpStr = objExCodePara.min_conditions_ids.join(",").trim();
                    console.log("min_conditions_ids: " + JSON.stringify(tmpStr));
                    exemptionEditVM.setValue("min_dic_item_ids", tmpStr !== "" ? tmpStr : null);
                }
                
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
				exCodeEditVM.fetchData({"jobno":exemptionEditVM.getValue("id"),"form":"Exemption Certificate"},function(dsResponse, data, dsRequest){
						console.log("exCodeEditVM.fetchData called");
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

function saveExemptionRecord(saveMode)
{
	var isAddNew = false;
	
    if (exemptionEditVM.validate() ) {
        
        var requestParam = {data: {"exCodeChoiceChanged": exCodeChoiceChanged, "ecertRecChanged": !isEmpty(exemptionEditVM.getChangedValues()), "oldSysRecMissingBridge": oldSysRecMissingBridge, "oldFormType": oldFormType, "old_ex_code_id": old_ex_code_id, updateData: exemptionEditVM.getValues()}};
        console.log("exemptionEditVM.getValues(): " + JSON.stringify(exemptionEditVM.getValues()));
        console.log("requestParam: " + JSON.stringify(requestParam));
        
        var requestParam2 = {"operationType":"update", "operationId":"SAVE_ECERT_DETAILS"};
        Object.assign(requestParam, requestParam2);
        console.log("requestParam after merged: " + JSON.stringify(requestParam));
        
        //jacky todo
        if (!exemptionEditVM.getItem("cert_no").getValue() >0) {
			isAddNew = true;
			//==save exemption code to mother level for easy retrieval--- 
			// exemptionEditVM.setValue("exempt_code_id",objExCodePara.ex_code_id);
			console.log("addnew=true");
        }
        console.log("******************************************");
        console.log("ecert_record before saving: "  + JSON.stringify(exemptionEditVM.getValues()));
        exemptionEditVM.saveData(function(dsResponse, data, dsRequest) {
			if (dsResponse.status != 0) {
                console.log("exemptionEditVM.saveData() --> dsResponse.status != 0");
                return;
            }
            
	            if (!isNull(saveMode) && saveMode == 0) {
	            	 
	            	 //--- if add new and successfull get new exemption id then also insert new 
	            	 //-- record to exemption_job table ---
	            	     
	            	 
	            	  //---fetch the current record for content if update mode - 
//	            	    if (isAddNew==false)
//	            	    	{
//	            	    	exCodeEditVM.fetchData({"jobno":exemptionEditVM.getValue("id"),"form":"Exemption Certificate"},function() {     	    	
//	            	    	//exCodeEditVM.editRecord();	
//	            	    	console.log("existing history id =" +  exCodeEditVM.getValue("id"));
//	            	    	console.log("begin edit record");
//	            	    	});
//	            	    	}
//	            	           	
                    
                            console.log("prepard to save content");
                            
                            var strContent1 = "";
                            var strContent2  ="";
                            
                            exCodeEditVM.setValue("imono",exemptionEditVM.getValue("imono"));
                            
                            console.log("STEP 1" );
                            // console.log(exemptionEditVM.getValue("id"));
                            
                            if (isAddNew==true) {
                                exCodeEditVM.setValue("jobno",exemptionEditVM.getValue("id"));
                            }
                            
                            console.log("jobno=" + exemptionEditVM.getValue("id"));
                            console.log("STEP 2" );
                            
                            //exCodeEditVM.setValue("form","Exemption Certificate");
                            exCodeEditVM.setValue("form", ecertRecformType);
                            console.log("STEP 3" );
                            
                            //jacky todo
                            if (!isNull(exemptionEditVM.getValue("exempted_item")))
                                exCodeEditVM.setValue("ex_type",exemptionEditVM.getValue("exempted_item"));
                            
                            console.log("STEP 4" );
                            console.log("ex_type=" + exemptionEditVM.getValue("exempted_item"));
                            
                            exCodeEditVM.setValue("form_name","M.?");
                            console.log("STEP 5" );
                            
                            //jacky todo
                            if (!isNull(exemptionEditVM.getItem("valid_date")))
                                exCodeEditVM.setValue("valid_date",exemptionEditVM.getValue("valid_date"));
                            
                            //********************************************************
                            if (!isNull(exemptionEditVM.getItem("issue_date")))
                                exCodeEditVM.setValue("issue_date",exemptionEditVM.getValue("issue_date"));
                            
                            
                            if (hiddenExCodeLG.getTotalRows()>0) {
                                if (!isNull(hiddenExCodeLG.getRecord(0).exemption_for))
                                    exCodeEditVM.setValue("exemption_for",hiddenExCodeLG.getRecord(0).exemption_for);
                            
                                console.log("STEP 6" );
                                console.log("exemption_for=" + exemptionEditVM.getValue("exempted_item"));
                            
	                            if (isNull(hiddenExCodeLG.getRecord(0).subheading))
	                                exCodeEditVM.setValue("subheading","NO DATA,PLEASE UPDATE EXEMPTION CODE TABLE.");
	                            else
	                                exCodeEditVM.setValue("subheading",hiddenExCodeLG.getRecord(0).subheading);
	                            
	                            
                            
	                            if (objExCodePara.content_id>0 )
                                {
	                                
	                                console.log("step = 2.5");	            			 
	                                
	                                
	                                strContent1 = hiddenExContentLG.findByKey(objExCodePara.content_id).content;
	                                console.log("step = 2.6");
	                                console.log("strContent1=" + strContent1);
                                
                                }
                                
                                //--concate the condition content ---
                                console.log("step = 3");
                                if (isNull(exCodeEditVM.getValue("content_1")) || exCodeEditVM.getValue("content_1")=='' )  
                                {  //=== not allow to overwrite if already have content history
                                    if (!isNull(objExCodePara.conditions_ids) && objExCodePara.conditions_ids.length > 0){
                                        console.log("step = 3.1");
                                        var i =  0;
                                        for (i=0;i<objExCodePara.conditions_ids.length ;i++) {
                                            console.log("step = 3.2");
                                            strContent2 = strContent2 + hiddenExItemLG.findByKey(objExCodePara.conditions_ids[i]).content + "\n";		            		 			 
                                            
                                            console.log("strContent2=" + strContent2);
                                            console.log("step = 3.3");
                                        }
                                        
                                    }
                                    console.log("step = 4");
                                    
                                    if (strContent2!="")
                                    { strContent1 = strContent1 + "\n" + "\n" + strContent2;}
                                    //===save to the database =====
                                    console.log("strContent1=" + strContent1);
                                    exCodeEditVM.setValue("content_1",strContent1);
                                    console.log("exCodeEditVM.setValue('content_1')");
                                }
	            			}
                            
                            /*
                            exCodeEditVM.saveData(function(dsResponse, data, dsRequest) {
                                console.log(" after save transaction  ");  
	            				if (dsResponse.status == 0) {
                                    console.log(" after checking trans result  ");
                                    isc.say(saveSuccessfulMessage);
	            				 
	            				}else{console.log("fail to save exemption job " );}
                            });
                            */
	            	 
                            if (isAddNew==true) {
                                exCodeEditVM.fetchData({"jobno":exemptionEditVM.getValue("id"),"form":"Exemption Certificate"},function(){
                                    toggleEdit(2);
                                    console.log("exCodeEditVM.fetchData called");
                                });
                            }
                    isc.say(saveSuccessfulMessage);
                    console.log("exemption after saving:" );
	            }
	            //end of "saveMode == 0"
	            
	            //for ecertRecChanged
                exemptionEditVM.rememberValues();
                exCodeChoiceChanged = false;
                oldSysRecMissingBridge = false;
                if (!isNull(data)) {
                    //oldFormType = 
                }
                console.log("ecert_record changes saved, reset changes flag to false \n(exemptionEditVM.rememberValues() && exCodeChoiceChanged = false && oldSysRecMissingBridge = false)");
                
			//end of callback of exemptionEditVM.saveData()
        }, requestParam);
	}else{
		console.log("validation fail!" );
		
	
	}
		 
		 
}

function updateCaseClosed(intCloseCase)
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
	saveExemptionRecord(0);
	toggleEdit(intCloseCase);
		
	
	/*
	eCertRecordDS.updateData(exemptionEditVM.getValues(), function(dsResponse, data, dsRequest){
		if (dsResponse.status != 0) {
            console.log("dsResponse.status != 0");
            console.log("fail to change case closed status");
            return;
        }
		console.log("**** callback of eCertRecordDS.updateData() *********");
		console.log("exemptionEditVM.getValues():\n" + JSON.stringify(exemptionEditVM.getValues()));
		console.log("returned data:\n" + JSON.stringify(data));
		//exemptionEditVM.fetch({}, function(dsResponse, data, dsRequest) {});
		toggleEdit(intCloseCase);
		console.log("updated case closed status success!");
		
	});
	*/
	
	/*
	exemptionEditVM.saveData(function(dsResponse, data, dsRequest) {
		if (dsResponse.status == 0) {
			
		//	var truefalse =false;
			
		//	if ( intCloseCase==2)
		//	 truefalse = true;	
			
			toggleEdit(intCloseCase);	
			console.log("updated case closed status success!");
			
		}
		else
			console.log("fail to change case closed status");
			
	});
	*/
	
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




