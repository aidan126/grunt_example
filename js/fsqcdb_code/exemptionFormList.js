//Exemption Code

isc.Label.create({
    ID: "ExemptionFormList",
    contents: "",
});

var formListType = [];
var selectionFormType = [];

function openExemptionFormList(exemptionJobno){
isc.ValuesManager.create({
	    ID: "exCodeEditVM2",
		dataSource: exemptionJobDS
	});
	ExemptionFormList();
	ExemptionFormListWindow.show();

	function ExemptionFormList(){

		console.log(exemptionJobno);

	    isc.ListGrid.create({
	    	  ID:"formListListGrid",
	    	  //alternateRecordStyles:true,
	    	  width:"100%",
	    	  height:380,
	    	  overflow:"auto",
	    	  dataSource:eCertFormListDS,
	    	  autoFetchData:false,
	    	  //autoFitFieldWidths:true,
	    	  canEdit:false,
	    	  alternateRecordStyles:true,
	    	  //editOnFocus: true,
	    	  //canSelectCells: true,
	    	  //dataPageSize: 20,
	    	  //canRemoveRecords:false,
	    	  autoSaveEdits: true,
	    	  saveLocally: true,
	    	  saveByCell: true,
	    	  editEvent: "click",
	    	  //selectionAppearance:"checkbox",
	    	  //selectionType: "simple",
	    	  //showFilterEditor:true,
	    	  layoutTopMargin:10,
	    	  isGroup:"true",
	    	  groupTitle:"Min. & Cert.",

	    	  fields:[
	    		   {name:"id", title:"ID", hidden:true},
	               {name:"form", title:"Form", hidden:false, width:"90%"},
	               {name:"ex_type", title:"Exempted item", hidden:false, width:"90%"},
	               ],
	 			  //sortField: 1,
				  //sortDirection: "ascending",
	              //wrapCells: true,
	              cellHeight: 30,
	          recordDoubleClick :function(viewer, record, recordNum, field, fieldNum, value, rawValue){
	        	  if(record.form == "Exemption Certificate"){
	        		  
	        		  //insertExJobForNoData("Exemption Certificate").then (openExemptionCertReport(record.jobno));
	        		  insertExJobForNoData("Exemption Certificate",function(){openExemptionCertReport(record.jobno);});
	        	  }
	        	  
	        	  else if(record.form == "Minute"){
	        		  
	        		  insertExJobForNoData("Minute",function(){openExemptionCertMin(record.jobno);});
	        	  }
	        	  
	        	  else if (record.form == "Exemption Certificate(CO2)"){
	        		  
	        		  insertExJobForNoData("Exemption Certificate(CO2)",function(){openExemptionCertCO2Report(record.jobno);});
	        	  }
	          }
				//selectionUpdated: "batchPrintSelectedForm.setData(this.getSelection())"

	    });

	    //formListListGrid.fetchData({jobno:exemptionJobno});
	    isc.DataSource.get("eCertDW_descDS").fetchData({},
	    		function (dsResponse, data, dsRequest){
	    			for (i = 0; i < data.length; i++) {
	    				selectionFormType.add(data[i].form);
	    			}
	    		}
	    );

	    formListListGrid.fetchData({jobno:exemptionJobno},
	    		function (dsResponse, data, dsRequest){

					formListType.setLength(0);
	    			for (i = 0; i < data.length; i++) {
	    					if(!selectionFormType.includes(data[i])){
	    						formListType.push({form:data[i].form});
	    					}
	    			}
	    		}
	    );

	    console.log(selectionFormType);
	    console.log(formListType);

		isc.IButton.create({
			  ID: "addFormListbtn",
			  autoDraw: false,
			  width:90,
			  layoutAlign:"center",
			  title: "Add",onControl:"EXEMPT_WRITE||FSQC_ALL",
			  click:function (){
					addExemptionFormListWindow.show();

					selectformListListGrid.setData(selectionFormType);

					selectformListListGrid.fetchData({}, function (dsResponse, data, dsRequest){

							var rowNumRemove = 0;

							console.log("DATA : ");
							console.log(data);
							console.log("LISTGRID : ");
							console.log(selectformListListGrid);

							for (j = 0; j < data.length; j++) {
								for (i = 0; i < formListType.length; i++) {

									console.log("data form - " + data[j].form);
									console.log("form list type - " + formListType[i].form);

									if(formListType[i].form == data[j].form){

										console.log("ACTION REMOVE - " + j);
										//selectformListListGrid.getField(0).setCanEdit(false);
										//selectformListListGrid.setEditValue(j, 0, "checkboxFieldFalseImage:blank");
										//selectformListListGrid.setEditValue(j, 1, "blank");
										//selectformListListGrid.canSelectRecord(selectformListListGrid.getRecord(j)) = false;
										console.log(selectformListListGrid.getRecord(j-rowNumRemove).form);
										console.log("data : ");
										console.log(data);
										console.log("ListGrid :  - ");
										console.log(selectformListListGrid.getRecord(j-rowNumRemove));

										selectformListListGrid.removeData(selectformListListGrid.getRecord(j-rowNumRemove));
										rowNumRemove = rowNumRemove + 1;

										console.log(rowNumRemove);
										//selectformListListGrid.getRecord(j).checkboxFieldFalseImage = "blank";
										//rowNo = rowNo + 1;

									}
								}

							}
						}
					);
			  }
		});

//-----------------Add Form Window----------------------------------------------------------------------------------------------
  	    isc.ListGrid.create({
	    	  ID:"selectformListListGrid",
	    	  //alternateRecordStyles:true,
	    	  width:300,
	    	  height:220,
	    	  align:"center",
	    	  overflow:"auto",
	    	  dataSource:eCertDW_descDS,
	    	  autoFetchData:false,
	    	  //autoFitFieldWidths:true,
	    	  //canEdit:true,
	    	  alternateRecordStyles:true,
	    	  editOnFocus: false,
	    	  //canSelectCells: true,
	    	  //dataPageSize: 20,
	    	  //canRemoveRecords:false,
	    	  autoSaveEdits: true,
	    	  saveLocally: true,
	    	  saveByCell: true,
	    	  editEvent: "click",
	    	  selectionAppearance:"checkbox",
	    	  selectionType: "simple",
	    	  //showFilterEditor:true,
	    	  layoutTopMargin:10,
	    	  isGroup:"true",
	    	  groupTitle:"Form Selection",
	    	  //recordCanSelectProperty:false,
	    	  fields:[
		               //{name:"test", title:"choice", showTitle:false, type: "boolean", hidden:false, canEdit:true},
		               {name:"form", title:"Form", hidden:false, width:"90%" },
	               ],
	 			  //sortField: 1,
				  //sortDirection: "ascending",
	              //wrapCells: true,
	              cellHeight: 30,
	          rowHasChanges:function(){

	          }
	    	  //selectionUpdated: "batchPrintSelectedForm.setData(this.getSelection())"
	    }),
		isc.IButton.create({
			  ID: "selectformAddBtn",
			  autoDraw: false,
			  width:90,
			  layoutAlign:"center",
			  title: "OK",
			  endRow: false,
			  click:function (){

				  if(selectformListListGrid.anySelected()){

					  for (i = 0; i < selectformListListGrid.getSelectedRecords().length; i++) {
						  var newFormListRecord = {jobno:exemptionJobno, form:selectformListListGrid.getSelectedRecords()[i].form, ver:"1.0", ex_type:frmExemptionEdit_middle.getValue('exempted_item')};
						  eCertFormListDS.addData(newFormListRecord);
						  formListType.add({form:selectformListListGrid.getSelectedRecords()[i].form});
	                	  addExemptionFormListWindow.hide();

	                	  /*
						  var newExemptionJobRecord = {};
						  newExemptionJobRecord['imono'] = exemptionEditVM.getValue("imono");
						  newExemptionJobRecord['jobno'] = exemptionEditVM.getValue("id");
						  newExemptionJobRecord['form'] = selectformListListGrid.getSelectedRecords()[i].form;
						  newExemptionJobRecord['ex_type'] = exemptionEditVM.getValue("exempted_item");
						  newExemptionJobRecord['form_name'] = "M.?";
						  newExemptionJobRecord['exemption_for'] =
						  newExemptionJobRecord['valid_date'] =
						  newExemptionJobRecord['content_1'] =
						  newExemptionJobRecord['issue_date'] =
						  newExemptionJobRecord['surveyor'] =
						  newExemptionJobRecord['cc'] =
						  newExemptionJobRecord['issue_man_type'] =
						  newExemptionJobRecord['duty'] =
						  newExemptionJobRecord['subheading'] =
						  */
					  }

				  }else{
              	  isc.say("No Form Type is Selected.");
				  }

			  }
		}),
		isc.IButton.create({
				ID: "selectformCloseBtn",
				autoDraw: false,
				width:90,
				layoutAlign:"center",
				title: "Close",
				click:function (){
						addExemptionFormListWindow.hide();
				}
		}),
		
		isc.HLayout.create({
			    ID:"selectionBottomBtnBar",
			    width: 250,
			    height:1,
			    align:"center",
			    //layoutTopMargin:10,
			    layoutAlign:"center",
			    defaultLayoutAlign: "center",
			    showEdges: false,
			    membersMargin:5, 
			    members:[selectformAddBtn, selectformCloseBtn]
		}),
		isc.Window.create({
			  ID: "addExemptionFormListWindow",
			  title: "Form Selection",
			  width:310,
			  height:250,
			  align:"center",
			  autoSize:true,
			  autoCenter: true,
			  isModal: true,
			  showModalMask: true,
			  autoDraw: false,
			  items: [

				    isc.VLayout.create({
				    	ID:"selectionFullPage",
				    	width:"100%",
				    	layoutTopMargin:0,
				    	defaultLayoutAlign: "center",
				    	showEdges: false,
				    	membersMargin:30,
				    	colWidths: ["90%", "10%"],
				    	members:[selectformListListGrid, selectionBottomBtnBar]
				    })

			   ]
		});
	    //formListListGrid.fetchData({}, function (dsResponse, data, dsRequest){
				//if(data[0] != ){

				//}
			//}
	    //);


		//selectformListListGrid.getField(0).setCanEdit();
		//selectformListListGrid.getField(0).setDisabled(true);

		//selectformListListGrid.setEditValue(0, 0, "Exemption Certificate");
		//selectformListListGrid.setEditValue(1, 0, "Letter");
		//selectformListListGrid.setEditValue(2, 0, "Exemption Certificate(CO2)");
		//selectformListListGrid.setEditValue(3, 0, "Minute");

		//var rowNo = 0;
		//console.log(selectionFormType);
		//console.log(formListType);
		//console.log(selectionFormType.length);
		//console.log(formListType.length);

		/*
		formListListGrid.fetchData({jobno:exemptionJobno},
	    		function (dsResponse, data, dsRequest){

			selectformListListGrid.setEditValue(0, 0, "Exemption Certificate");

			for (i = 0; i < selectionFormType.length; i++) {
				for (j = 0; j < data.length; j++) {

					if(selectionFormType[i] == data[j].form){

						console.log("aaa");
						selectformListListGrid.setEditValue(rowNo, 0, "Exemption Certificate");
						rowNo = rowNo + 1;

					}
				}
			}
		}
		);

		for (i = 0; i < selectionFormType.length; i++) {
			for (j = 0; j < formListType.length; j++) {

				if(selectionFormType[i] == formListType[j]){
					console.log("aaa");
					selectformListListGrid.setEditValue(rowNo, 0, "Exemption Certificate");
					rowNo = rowNo + 1;
				}
			}
		}
		*/
//--------------------------------------------------------------------------------------------------------------------------------
  	    
		isc.IButton.create({
			  ID: "deleteFormListbtn",
			  autoDraw: false,
			  width:90,
			  layoutAlign:"center",
			  onControl:"FSQC_ALL||EXEMPT_WRITE",
			  title: "Delete",
			  click:function (){

				  if(formListListGrid.anySelected()){
					  isc.ask(promptDeleteMessage_2, function (value){
						  if (value){

							  var removeFormType = formListListGrid.getSelectedRecord().form;
							  formListType.remove(formListType.find("form",removeFormType));

							  eCertFormListDS.removeData(formListListGrid.getSelectedRecord(),
										 function(dsResponse, data, dsRequest) {
					      						if (dsResponse.status == 0) {
					      							console.log("FormList Remove : ");
					      							console.log(data);
					      							isc.say("Successfully Deleted");

					      						}
									     }
							  );

							  exemptionJobDS.fetchData({jobno:exemptionJobno, form:removeFormType},
										 function(dsResponse, data, dsRequest) {
								  				  console.log("Exemption Job Remove : ");
								  				  console.log(data[0]);
					  							  exemptionJobDS.removeData(data[0]);
									     }
							  );

						  }
					  })
				  }else{
                	  isc.say("No Form Type is Selected.");
				  }
			  }
		});
		isc.IButton.create({
			  ID: "closeFormListbtn",
			  autoDraw: false,
			  width:90,
			  layoutAlign:"center",
			  title: "Close",
			  click:function (){
				  	ExemptionFormListWindow.hide();
			  }
		});

	    isc.VLayout.create({
	    	ID:"mainPage",
	    	width: 400,
	    	height:380,
	    	align:"center",
	    	//layoutTopMargin:10,
	    	showEdges: false,
	    	membersMargin:30,
	    	members:[formListListGrid]
	    });
	    isc.HLayout.create({
	    	ID:"bottomBtnBar",
	    	width: "100%",
	    	//layoutTopMargin:10,
	    	showEdges: false,
	    	align:"center",
	    	membersMargin:5,
	    	members:[addFormListbtn, deleteFormListbtn, closeFormListbtn]
	    });

		isc.Window.create({
		    ID:"ExemptionFormListWindow",
		    title: "Exemption",
		    width:410,
		    height:350,
		    autoSize:true,
		    autoCenter: true,
		    isModal: true,
		    showModalMask: true,
		    autoDraw: false,
		    items: [

				    isc.VLayout.create({
				    	ID:"ExemptionFormListFullPage",
				    	width:"100%",
				    	layoutTopMargin:0,
				    	defaultLayoutAlign: "center",
				    	showEdges: false,
				    	membersMargin:30,
				    	colWidths: ["90%", "10%"],
				    	members:[mainPage, bottomBtnBar]
				    })

			]
		});
		
//added by Dicky -- insert job content automatically when have exempt code id selected  
			
	 function insertExJobForNoData(formType,callback) {
			objResult = false;
			
			if (isNull(exemptionEditVM.getValue("exempt_code_id")))
				//--do not geneate record for content if not content id is null --
				{
				console.log("not generate record for exempt_code_id is null");
				objResult = false;
				callback();
				return;
				}
			//-- search for exmemption job table 
				exCodeEditVM2.fetchData({jobno:exemptionEditVM.getValue("id"),form:formType},				
						
				  function (dsResponse, data, dsRequest){
					
					console.log("step aaa");
					console.log(exCodeEditVM2.getValue("content_1"));
					
					if (isNull(exCodeEditVM2.getValue("content_1")) || typeof exCodeEditVM2.getValue("content_1")==='undefined' )
					   	
						{
						objResult = true;
						console.log("objResult = true;");
						}
					else
						{
						callback();
						return;
						}
					
					if (objResult==true)
					{		
						//====use the result to create content and save to the job table
						 var strContent1 = "";
	            		 var strContent2  ="";
	            		 var i =  0;
	            		 //-=get master code --
	            		 
	            		 console.log("b4  hiddenExCodeLG.fetchData");
	            		 
	            		 isc.DataSource.get("ecertExemptionsCodeDS").fetchData({"id":exemptionEditVM.getValue("exempt_code_id")},function(dsResponse, data, dsRequest){
	            			 
	            			 console.log("hiddenExCodeLG.fetchData called");
		     				 exCodeEditVM2.setValue("imono",exemptionEditVM.getValue("imono"));
		     				 exCodeEditVM2.setValue("jobno",exemptionEditVM.getValue("id"));
		     				 exCodeEditVM2.setValue("form",formType);
		     				 if (!isNull(exemptionEditVM.getValue("exempted_item")))
			            		 	exCodeEditVM2.setValue("ex_type",exemptionEditVM.getValue("exempted_item"));
		     				 exCodeEditVM2.setValue("form_name","M.?");
		     				 
		     				 if (!isNull(data[0].exemption_for))
		            		 	exCodeEditVM2.setValue("exemption_for",data[0].exemption_for);
		     				 
		     				 if (!isNull(exemptionEditVM.getItem("valid_date")))
		            		 	exCodeEditVM2.setValue("valid_date",exemptionEditVM.getValue("valid_date"));
		            		 
		            		 if (!isNull(exemptionEditVM.getItem("issue_date")))
		            			 exCodeEditVM2.setValue("issue_date",exemptionEditVM.getValue("issue_date"));
		            		 
		            		 if (isNull(data[0].subheading))
		            			 exCodeEditVM2.setValue("subheading","NO DATA,PLEASE UPDATE EXEMPTION CODE TABLE.");
		            		 else
		            			 exCodeEditVM2.setValue("subheading",data[0].subheading);	            		 
		            		
		            		 if (data[0].ecertDicContent.length>0 )
	            			 {
		            				console.log("step = 333");
		            				
		            			for (i=0;i<data[0].ecertDicContent.length ;i++)
	            			 	{ 
		            				console.log("step = 333.5");
		            				console.log(data[0].ecertDicContent[i].form_type);
		            				console.log(formType);
	            			 	
		            				if (data[0].ecertDicContent[i].form_type==formType)
	            			 		{
	            			 		
	            			 		 console.log("step = 334");
	            			 		
	            			 		 if(!isNull(data[0].ecertDicContent[i].content))
	            			 			strContent1 = data[0].ecertDicContent[i].content;
							 	
							 			console.log("strContent1=" + strContent1);
	            			 		}
	            			 	}
	            			 }           			 	            	
	     				
	            			if (data[0].ecertDicItem.length>0) 	
		            		 	{
	            				    console.log("step = 335");
		            		 		 	            		 	
		            		 		            		 	
			            		 	for (i=0;i<data[0].ecertDicItem.length ;i++)
			            		 	{  console.log("step = 335.5");
			            		 		if (data[0].ecertDicItem[i].form_type==formType)			            		 		
			            		 		{
			            		 			console.log("step = 5");
			            		 			strContent2 = strContent2 + data[0].ecertDicItem[i].content + "\n";		            		 			 
				            		 		
			            		 			console.log("strContent2=" + strContent2);
				            		 		console.log("step = 6");
			            		 		}	
			            		 	}
		            		 	
		            		 	}
		            			console.log("step =7");
		            			
		            		  if (strContent2!="")	
		            		  { strContent1 = strContent1 + "\n" + "\n" + strContent2;}
		            		   //===save to the database =====
		            		  console.log("strContent1=" + strContent1);
		            		  exCodeEditVM2.setValue("content_1",strContent1);
		            		  console.log("exCodeEditVM2.setValue('content_1')");
		            		  
		            			  //exCodeEditVM2.saveData(function(dsResponse, data, dsRequest) {
		            			  exCodeEditVM2.saveData(function() {
		            			 // console.log(" after save transaction  ");
		            			 
//		            				 if (dsResponse.status == 0) {
//		            					 
//		            					 console.log(" insert to exempt job  success  ");		            					 	            					 
//		            					 
//		            				 }
//		            				 else
//		            					 {console.log("fail to save exemption job " );}
		            			 	console.log(" before 1st callback()  ");
		            			  callback();
		            			  
		            		    });
		            			  console.log(" before 2st callback()  ");            		  
		            		  callback();
		            		 
	     				}
	            		 
	     			); 
						 console.log("nonono1");
						 console.log(err.message);
					}		
					console.log("nonono2");
				}
			);
		}

	}
}

