/**
* Qualified Name		/webui/src/main/webapp/js/fsqcdb_code/ecertExemptionsCode.js
* @author 				Mads Lam
* @since				2019-08-12
* **************************************************************************************************************
* Change log:
* log no	Change complete date	Developer			Change Reason
* ======	====================	=========			=============
* 00000		2019-08-12				Mads Lam			Initial Implementation
* 00001		2019-09-03				Dicky Lee			add access control
*/

//Exemption Code

//var EditedExemptionsCodeFormRecord = [];
//var EditedExemptionsCodeRecord = [];
//
//var NewExemptionsCodeRecordId = [];
//var NewExemptionsCodeRecord = [];
//var newExemptionRecordFlag = false;
//var tempNew_ExemptionRecordId = -1;
//
//var cert_ecertDicContentId = -1;
//var min_ecertDicContentId = -1;
//var cert_ecertdicItemArr = [];
//var min_ecertdicItemArr = [];
//
//var DeleteEcertDicContentRecord = [];
//var tempNew_ecertDicContentId = -1;
//var tempNew_ecertDicItemId = -1;
//var selectedExemptionRecord = {};
//
//var exemptionCodeUnsaveFlag_mainGrid = false;
//var exemptionCodeUnsaveFlag_otherParts = false;

isc.ValuesManager.create({
    ID: "exemptionCodeVM",
    dataSource: ecertExemptionsCodeDS
});


var ecertExemptionCodeEditMode = false;
var ecertExemptionsCode_saving = false;

function openExemptionCode(exemptionTypes, returnSelectedExemption, search, eCertRecord){

	ecertExemptionsCode_saving = false;
	
	if(exemptionTypes == undefined)
	{
		exemptionTypes = null;
	}
	var baseline_crit = {};
	var tmp_crit = {};
	if(exemptionTypes)
	{
		baseline_crit = {"exemption_type":exemptionTypes};
	}

	Object.assign(tmp_crit, baseline_crit);
	
	if(eCertRecord != null)
	{
		if(eCertRecord.exempt_code_id != null)
		{
			tmp_crit.id = eCertRecord.exempt_code_id;
		}
		else if(eCertRecord.exempted_item)
		{
			search = eCertRecord.exempted_item;
		}
	}

	ecertExemptionCodeEditMode = false;
//	setRecordToVM(null);
	exemptionCodeVM.clearValues();
//	ecertDicContentVM = cert_ecertDicContentVM;
//	min_ecertDicContentVM.clearValues();
//	cert_ecertDicContentVM.clearValues();
	
	ExemptionCodeContent();
	recalcCanEditAll();
	ExemptionCodeWindow.show();
	
	filterWithOrOnMultipleFields(tmp_crit, search);
	  

	function ExemptionCodeContent(){

		isc.ListGrid.create({
		  ID: "ecertExemptionsCodeListGrid",
		  dataSource: ecertExemptionsCodeDS,
	      //valuesManager:valueMan,
		  width:"50%",
		  height:300,
		  autoFetchData: false,
//		  autoFetchData: true,
		  autoFitFieldWidths:false,
		  autoConfirmSaveEdits:true,
		  canEdit: false,
		  editOnFocus: true,
		  canSelectCells: false,
		  canRemoveRecords:false,
		  autoSaveEdits: false,
		  saveLocally: true,
		  saveByCell: false,
		  editEvent: "click",
		  showFilterEditor:true,
		  showAllRecords:true,
		  selectOnEdit: true,
		  showClippedValuesOnHover: true,
		  showHover:true,
		  hoverWidth: 500,
		  arrowKeyAction: "select",
//		  implicitCriteria: {"exemption_type":exemptionTypes},
//		  modalEditing: true,	
		  fields:[
		      {name:"row_changed", title:"*", canEdit:false, width:20},
		      {name:"id", title:"ID",  width:20, hidden:false, canEdit:false},
		      {name:"level_no1", title:"Lv1 Convention", width:100},
		      {name:"level_no2", title:"Lv2 Chapter/Annex", width:50},
		      {name:"level_no3", title:"Lv3 Regulation", width:100},
		      {name:"level_no4", title:"Lv4 Equipment etc"},
		      {name:"level_no5", title:"Lv5 Component", width:50},
		      {name:"hk_law", title:"HK Law", width:100},
		      {name:"keywords", title:"Keywords", hidden:false},
//		      {name:"keywords", title:"Keywords", hidden:false, width:300},
		      {name:"exemption_type", title:"Exemption Type", width:20, defaultValue: ((exemptionTypes == null)?"Exemption":exemptionTypes) },
		      {name:"output_type", title:"Type of Output", width:50, defaultValue:"Cert"
		    	  , valueMap: {
		    		  "Cert":"Cert"
		    		  , "Letter" : "Letter"
		    		  , "Cert(CO2)" : "(CO2)"
		    	  }
		      },
		      {name:"remarks", title:"Remarks", hidden:true, width:100},
		      {name:"keywordList", title:"Keyword List", hidden:true, width:300},
		      {name:"exemption_for", title:"Heading for Minute", hidden:true, width:300},
		      {name:"subheading", title:"Heading for Cert", hidden:true, width:300},
		      {name:"ecertDicContent", hidden:true, width:800},
		      {name:"ecertDicItem", hidden:true, width:800},
		  ],
		  canMultiSort: true,
		  initialSort: [
			  {property: "level_no1", direction: "ascending"}
			  , {property: "level_no2", direction: "ascending"}
			  , {property: "level_no3", direction: "ascending"}
			  , {property: "level_no4", direction: "ascending"}
		  ],  
		  oldSelection: null,	// a reference to the record currently being edited 
		  selectionChanged:function(record, state){
			  if(state)	// do below with newly selected record
			  {
				  setRecordToVM(record);
			  }
			  else	// do below with the un-selected record
			  {
//				  cert_ecertDicItemListGrid.deselectAllRecords();	//selection mark interferes with row_changed detection
//				  min_ecertDicItemListGrid.deselectAllRecords();	//selection mark interferes with row_changed detection
				  mergeChangesToVM();
			  }
			  recalcCanEditAll();
		  },
//		  getDataAsArray:function()
//		  {
//			  var ret = [];
//			  if(this.data!= null && isA.ResultSet(this.data))
//			  {
//				  ret = this.data.getAllCachedRows();
//			  }
//			  else
//			  {
//				  ret = this.data;
//			  }
//			  return ret;
//		  },
		  dataArrived: function(startRow, endRow)
		  {
			  /******************* 
			   * ListGrid.data can be of 2 datatypes:
			   * 	1. isc.ResultSet
			   * 	2. array of objects
			   * 
			   * The required behaviour of this page needs this listgrid to restrict its "data" member to only be an array of objects.
			   * If not below problems were encountered when data is a isc.ResultSet (such as when using the filterEditor):
			   * 	- various places using "ecertExemptionsCodeListGrid.getData().forEach" does not work, solved by adding getDataAsArray() to widget.js;
			   * 	- add & copy record buttons does not work properly; 
			   * */
			  this.setData( this.getDataAsArray() );
		  }
		}
		);
		

		
		isc.DynamicForm.create({
		    ID: "ecertExemptionsCodeSearch",
		    width:"100%",
		    numCols: 4,
		    colWidths: [10, 300, 10, "*"],
		    align:"left",
		    //autoFocus: true,
		    //dataSource: "hkCertDS",
		    saveOnEnter: true,
		    submit: function(){
		        this.getItem("query").click();
		    },
		    items:[
		        {type: "SpacerItem", width:"*"},
		        {
		            type: "text",
		            name: "search",
		            title: "",
		            textAlign:"left",
		            //selectOnFocus: true,
		            wrapTitle: false,
		            startRow: false,
		            width:300,
		            width:"*",
		            showTitle:false,
		            defaultValue: ""
		        },
		        {type: "SpacerItem", width:"*"},
		        {
		            type: "button",
		            name: "query",
		            title: "Query",
		            width:70,
		            //width:"*",
		            textAlign:"center",
		            //selectOnFocus: true,
		            wrapTitle: false,
		            startRow: false,
		            defaultValue: "",
		            click:function(){
		            	function confirmCallback(value)
						{
							if (value){
				            	setRecordToVM(null);
//				            	cert_ecertDicItemListGrid.setData([]);
//				            	min_ecertDicItemListGrid.setData([]);
				            	
				            	var search = ecertExemptionsCodeSearch.getItem("search").getValue();
				            	if (!isNull(search) && search != ""){
				            		search = search.trim();
					            	filterWithOrOnMultipleFields(baseline_crit, search);

				            	}else{
				            		filterWithOrOnMultipleFields(baseline_crit);
				            	}

							}
						}
						checkUnsavedExCode(confirmCallback);

		            }
		        }
			]
		});

		isc.IButton.create({
			  ID: "selectExemptionsCodebtn",
			  autoDraw: false,
			  width:90,
			  layoutAlign:"center",
			  title: "OK",
			  click:function (){
				  	if(ecertExemptionsCodeListGrid.getSelectedRecord() ){

				  		var selected_cert_ecertdicItemArr = [];
				  		if(cert_ecertDicItemListGrid.getSelectedRecords() != null)
			  			{
				  			for (i = 0; i < cert_ecertDicItemListGrid.getSelectedRecords().length; i++) {
				  				selected_cert_ecertdicItemArr[i] = cert_ecertDicItemListGrid.getSelectedRecords()[i].id;
						  	}
			  			}
				  		var selected_min_ecertdicItemArr = [];
				  		if(min_ecertDicItemListGrid.getSelectedRecords() != null)
			  			{
				  			for (i = 0; i < min_ecertDicItemListGrid.getSelectedRecords().length; i++) {
				  				selected_min_ecertdicItemArr[i] = min_ecertDicItemListGrid.getSelectedRecords()[i].id;
						  	}
			  			}
				  		
						var return_data = {
							ex_code_id: ecertExemptionsCodeListGrid.getSelectedRecord().id,
							ex_code_form_type: ecertExemptionsCodeListGrid.getSelectedRecord().output_type,
							cert_content_id: cert_ecertDicContentVM.getValue("id"),
							min_content_id: min_ecertDicContentVM.getValue("id"),
							cert_conditions_ids: selected_cert_ecertdicItemArr,
							min_conditions_ids: selected_min_ecertdicItemArr,
							cert_ExistFlag: true,
							min_ExistFlag: true,
						};
						//}
						console.log("return_data");
						console.log(return_data);
						
						function confirmCallback(value)
						{
							if (value){
								returnSelectedExemption( true, return_data );
//								resetVariables();
								ExemptionCodeWindow.hide();
							}
						}
				  		
						checkUnsavedExCode(confirmCallback);
				  		
					}else{
						isc.say("No Exemption/Dispensation is Selected.");
					}
			  }
		});

		isc.IButton.create({
			ID: "copyRecordBtn",
			autoDraw: false,
			width:150,
			layoutAlign:"center",
			title: "Copy Record",
			showDisabled:false,
			//--start 00001 ---
			onControl:"FSQC_ALL||EXEMPT_CODE_WRITE",
			//---end 00001 ==
			click:function() {
				if(ecertExemptionsCodeListGrid.anySelected()){
					ecertExemptionsCodeListGrid.endEditing();
					var ExemptionsCode_record = {};
					Object.assign(ExemptionsCode_record, ecertExemptionsCodeListGrid.getSelectedRecord());
	//				ExemptionsCode_record['id'] = tempNew_ExemptionRecordId;
					ExemptionsCode_record['id'] = "";
					var today = new Date();
//					var tmp_time = Date.now();
					tmp_time = "Copied_" + today.toTimeString().replaceAll(":", "").split(" ")[0];
					ExemptionsCode_record['row_changed'] = tmp_time;
					
					var row_num = 0;
					ecertExemptionsCodeListGrid.deselectAllRecords();
					ecertExemptionsCodeListGrid.data.addAt(ExemptionsCode_record, row_num);
					ecertExemptionsCodeListGrid.scrollToRow(row_num);
					ecertExemptionsCodeListGrid.startEditing(row_num);
					  
//					ecertExemptionsCodeListGrid.startEditingNew(ExemptionsCode_record, false);
//					ecertExemptionsCodeListGrid.endEditing();
//					ecertExemptionsCodeListGrid.saveAllEdits(null, function(){
//						if(ecertExemptionsCodeListGrid.getDataAsArray() != null)
//						{
//	//						ecertExemptionsCodeListGrid.getDataAsArray().allRows.forEach(
//							ecertExemptionsCodeListGrid.getDataAsArray().forEach(
//								function (item, index)
//								{
//									if(item == null)
//									{
//										return;
//									}
//									if(item.row_changed == timestamp)
//									{
//										ecertExemptionsCodeListGrid.deselectAllRecords();
//										item.row_changed = "Copied";
//										ecertExemptionsCodeListGrid.selectRecord(item);
//										ecertExemptionsCodeListGrid.startEditing(ecertExemptionsCodeListGrid.getRowNum(item)); 
//										ecertExemptionsCodeListGrid.scrollToRow(ecertExemptionsCodeListGrid.getRowNum(item)); 
//									}
//								}
//							);
//						}
//					});
					  
//					resetExemptionRemarkKeywordHeading();
//					resetExemptionReasonsCondition(true);
//					disableAllComponents();
					  
				}else{
                	isc.say("No Exemption/Dispensation is Selected.");
				}
			}
		});

		isc.IButton.create({
			  ID: "addExemptionsCodebtn",
			  autoDraw: false,
			  width:90,
			  layoutAlign:"center",
			  title: "Add",
			  //--start 00001 ---
			  onControl:"EXEMPT_CODE_WRITE||FSQC_ALL",
			  // -- end 00001 --

			  click:function (){
					ecertExemptionsCodeListGrid.endEditing();
					var ExemptionsCode_record = {};
					ExemptionsCode_record['id'] = "";
					ExemptionsCode_record['ecertDicContent'] = [];
					ExemptionsCode_record['ecertDicItem'] = [];
					ExemptionsCode_record['exemption_type'] = ((exemptionTypes == null)?"Exemption":exemptionTypes);
					ExemptionsCode_record['output_type'] = "Cert";
					var today = new Date();
//					var tmp_time = Date.now();
					tmp_time = "New_" + today.toTimeString().replaceAll(":", "").split(" ")[0];
					ExemptionsCode_record['row_changed'] = tmp_time;
					
					var row_num = 0;
					ecertExemptionsCodeListGrid.deselectAllRecords();
					ecertExemptionsCodeListGrid.data.addAt(ExemptionsCode_record, row_num);
					ecertExemptionsCodeListGrid.scrollToRow(row_num);
					ecertExemptionsCodeListGrid.startEditing(row_num);
					
					
//					ecertExemptionsCodeListGrid.startEditingNew(ExemptionsCode_record, true);
////					ecertExemptionsCodeListGrid.clearFilterValues();
//					ecertExemptionsCodeListGrid.saveAllEdits(null, function(){
//					if(ecertExemptionsCodeListGrid.getDataAsArray() != null)
//					{
////						ecertExemptionsCodeListGrid.getDataAsArray().allRows.forEach(
//						ecertExemptionsCodeListGrid.getDataAsArray().forEach(
//							function (item, index)
//							{
//								if(item == null)
//								{
//									return;
//								}
//								if(item.row_changed == tmp_time)
//								{
//									ecertExemptionsCodeListGrid.deselectAllRecords();
//									ecertExemptionsCodeListGrid.selectRecord(item);
//									ecertExemptionsCodeListGrid.scrollToRow(ecertExemptionsCodeListGrid.getRowNum(item)); 
////									item.row_changed = "New";
//									ecertExemptionsCodeListGrid.startEditing(ecertExemptionsCodeListGrid.getRowNum(item)); 
//								}
//							}
//						);
//					}
//					});

			  }
		});

		isc.IButton.create({
			  ID: "delExemptionsCodebtn",
			  autoDraw: false,
			  width:90,
			  layoutAlign:"center",
			  title: "Delete",
			  //--start 00001 ---
			  onControl:"FSQC_ALL||EXEMPT_CODE_WRITE",
			  //---end 00001 ==
			  click : function () {
				  
				  if(ecertExemptionsCodeListGrid.anySelected()){

					  isc.ask(promptDeleteMessage_2, function (value){
						  if (value){
							  var row = ecertExemptionsCodeListGrid.getSelectedRecord();
							  if(row.id)
							  {
								  ecertExemptionsCodeDS.removeData( row,
										  function(dsResponse, data, dsRequest) {
			              						if (dsResponse.status == 0) {
			              							ecertExemptionsCodeListGrid.removeData( row,
			      										  function(dsResponse, data, dsRequest) {
			      			              						//if (dsResponse.status == 0) {
			      			              							isc.say("Successfully Deleted");
			      			              						//}
			      								  		  }
		              								);
			              						}
								  		  }
								  );
							  }
							  else
							  {
								  ecertExemptionsCodeListGrid.removeData( row,
										  function(dsResponse, data, dsRequest) {
			              						//if (dsResponse.status == 0) {
			              							isc.say("Successfully Deleted");
			              						//}
								  		  }
								  );
							  }
//							  ecertExemptionsCodeDS.removeData(ecertExemptionsCodeListGrid.getSelectedRecord(),
//									  function(dsResponse, data, dsRequest) {
//		              						if (dsResponse.status == 0) {
//		              							isc.say("Successfully Deleted");
//		              						}
//							  		  }
//							  );
						  }
					  });

				  }else{
                	  isc.say("No Exemption/Dispensation is Selected.");
				  }

			  }
		});

		isc.IButton.create({
			  ID: "editExemptionsCodebtn",
			  autoDraw: false,
			  width:90,
			  layoutAlign:"center",
			  title: "Edit",
			  //--start 00001 ---
			  onControl:"FSQC_ALL||EXEMPT_CODE_WRITE",
			  //---end 00001 ==
			  click: function () {
				  MainBtnBar_noedit.hide();
				  MainBtnBar.show();

				  ecertExemptionCodeEditMode = true;
				  recalcCanEditAll();
			  }
		});

		isc.IButton.create({
			ID:"saveExemptionsCodebtn",
			width:90,
			align:"center",
			layoutLeftMargin: 150,
			title:"Save",
			//---start 00001
			onControl:"EXEMPT_CODE_WRITE||FSQC_ALL",

			//---end 00001

			click:function(){
//				mergeChangesToVM();
////				ecertExemptionsCodeListGrid.endEditing();
////		        ecertExemptionsCodeListGrid.saveAllEdits();
//				
//				if(ecertExemptionsCodeListGrid.getDataAsArray() != null)
//				{
//					var afterSaveArr = [];
//					var beforeSaveArr = [];
//					
//					
//					var saveLG = isc.ListGrid.create({
//						dataSource : ecertExemptionsCodeDS
//						, saveLocally: true
//					});
//					saveLG.setData([]);
//					saveLG.addData(beforeSaveArr);
//
////					ecertExemptionsCodeListGrid.getDataAsArray().allRows.forEach(
//					ecertExemptionsCodeListGrid.getDataAsArray().forEach(
//						function (item, index)
//						{
//							if(item == null)
//							{
//								return;
//							}
//							if(item.row_changed != undefined && item.row_changed != null)
//							{
//								if(Array.isArray(item.ecertDicContent))
//								{
//									item.ecertDicContent.forEach(function(item,index){
//										if(item.id != null)
//										{
//											if(item.id.toString().substring(0,4) == "tmp_")
//											{
//												item.id = null;
//											}
//										}
//									});
//								}
//								if(Array.isArray(item.ecertDicItem))
//								{
//									item.ecertDicItem.forEach(function(item,index){
//										if(item.id != null)
//										{
//											if(item.id.toString().substring(0,4) == "tmp_")
//											{
//												item.id = null;
//											}
//										}
//									});
//								}
//							}
//							beforeSaveArr.push(item);
//						}
//					);
//
//					
//					function recurseSaveArr(b4Arr, afterArr)
//					{
//						if(!afterArr)
//						{
//							afterArr = [];
//						}
//
//						if(!Array.isArray(b4Arr) || !Array.isArray(afterArr))
//						{
//							return false;
//						}
//
//						if(b4Arr.size() > 0)
//						{
//							var item = b4Arr[0];
//							b4Arr.remove(item); 
//							if(item.row_changed != undefined && item.row_changed != null)
//							{
//								ecertExemptionsCodeDS.updateData(item
//									, function (dsResponse, data, dsRequest)
//									{
//										if (!isNull(dsResponse) && dsResponse.status == 0)
//										{
//											console.log(data);
//											item = {};
//											Object.assign(item, data);
//											afterArr.push(item);
//											recurseSaveArr(b4Arr, afterArr);
//										}
//										else
//										{
//											afterArr.push(item);
//											initEcertExCodeLG(b4Arr.concat( afterArr));
//											isc.say("Error occurred when saving, please correct and try again.");
//										}
//										
//				                    }
//								); //save
//							}
//							else
//							{
//								afterArr.push(item);
//								recurseSaveArr(b4Arr, afterArr);
//							}
//							
//						}
//						else
//						{
//							initEcertExCodeLG(b4Arr.concat( afterArr));
//							isc.say(saveSuccessfulMessage);
//						}
//					}
//					
//					recurseSaveArr(beforeSaveArr, afterSaveArr);
//
//				}
//				
////				ecertExemptionsCodeListGrid.discardAllEdits();		// this is to remove unexpected "*", don't know why they appear AFTER save?
////				isc.say(saveSuccessfulMessage);
				saveExCodeListGrid( 
					function(save_result){
						if(save_result)
						{
							isc.say(saveSuccessfulMessage);						
						}
						else
						{
							alert("Error occurred when saving, please correct and try again.");
						}
					} 
				);
			}
		});

		isc.IButton.create({
			ID:"closeExemptionsCodeBtn",
			width:90,
			align:"center",
			layoutLeftMargin:150,
			title:"Close",
			click:function(){
				function confirmCallback(value)
				{
					if (value){
						ExemptionCodeWindow.hide()
					}
				}
				checkUnsavedExCode(confirmCallback);
			
			}
		});

		isc.IExportButton.create({
			  ID:"exportExemptionsCodeBtn",
			  title: "Export",
			  width: 120,
			  layoutAlign:"center",
			  autoDraw: false,
			  listGrid: ecertExemptionsCodeListGrid,
		});


		isc.DynamicForm.create({
			  ID: "remarksForm",
		      valuesManager:exemptionCodeVM,
//			  dataSource: ecertExemptionsCodeDS,
			  width:"100%",
			  height:450,
			  autoFetchData: false,
		      titleWidth:"100%",
//		      disabled:true,
//		      canEdit:false,
			  fields:[
			      {name:"remarks", title:"Remarks", type: "textArea", showTitle:false, width:"100%", selectOnFocus:true, height:"100%"}
			  ],

		});
		

	    isc.HLayout.create({
	    	ID:"queryListBtnBar",
	    	width:"100%",
	    	//layoutTopMargin:10,
	    	defaultLayoutAlign:"center",
	    	align:"center",
	    	showEdges: false,
	    	membersMargin:5,
	    	members:[ecertExemptionsCodeSearch]
	    });

	    isc.HLayout.create({
	    	ID:"exemptionCodeListBtnBar",
	    	width:"100%",
	    	//layoutTopMargin:10,
	    	defaultLayoutAlign:"center",
	    	align:"center",
	    	showEdges: false,
	    	membersMargin:5,
	    	members:[copyRecordBtn, addExemptionsCodebtn, delExemptionsCodebtn, saveExemptionsCodebtn, exportExemptionsCodeBtn, closeExemptionsCodeBtn]
	    });
	    isc.HLayout.create({
	    	ID:"ecertExemptionsCodeListGridGroup",
	    	width:"100%",
	    	layoutTopMargin:10,
	    	defaultLayoutAlign: "center",
	    	//showEdges: true,
	    	isGroup: true,
	    	groupTitle: "Exemption Code",
	    	membersMargin:50,
	    	members:[ecertExemptionsCodeListGrid]
	    });
	    isc.VLayout.create({
	    	ID:"remarksListGridGroup",
	    	width:"100%",
	    	layoutTopMargin:10,
	    	defaultLayoutAlign: "center",
	    	//showEdges: true,
	    	isGroup: true,
	    	groupTitle: "Remarks",
	    	membersMargin:0,
	    	members:[remarksForm]
	    });

	    isc.HLayout.create({
	    	ID:"remarkskeywordsListGridGroup",
	    	width:"100%",
	    	layoutTopMargin:0,
	    	defaultLayoutAlign: "center",
	    	//showEdges: true,
	    	membersMargin:10,
//	    	members:[remarksListGridGroup, keywordsGroup]
	    	members:[remarksListGridGroup]
	    });


	    isc.HLayout.create({
	    	ID:"MainBtnBar",
	    	width:"100%",
	    	//layoutTopMargin:10,
	    	defaultLayoutAlign:"left",
	    	align:"right",
	    	showEdges: false,
	    	membersMargin:5,
	    	members:[copyRecordBtn, addExemptionsCodebtn, delExemptionsCodebtn, saveExemptionsCodebtn, exportExemptionsCodeBtn, closeExemptionsCodeBtn]
	    	//members:[copyRecordBtn, addExemptionsCodebtn, delExemptionsCodebtn, saveExemptionsCodebtn, exportExemptionsCodeBtn]
	    });
	    MainBtnBar.hide();

	    isc.HLayout.create({
	    	ID:"MainBtnBar_noedit",
	    	width:"100%",
	    	//layoutTopMargin:10,
	    	defaultLayoutAlign:"left",
	    	align:"right",
	    	showEdges: false,
	    	membersMargin:5,
	    	members:[editExemptionsCodebtn, exportExemptionsCodeBtn, closeExemptionsCodeBtn]
	    	//members:[copyRecordBtn, addExemptionsCodebtn, delExemptionsCodebtn, saveExemptionsCodebtn, exportExemptionsCodeBtn]
	    });
	    MainBtnBar_noedit.show();

	    isc.HLayout.create({
	    	ID:"rightBtnBar",
	    	width:200,
	    	//layoutTopMargin:10,
	    	defaultLayoutAlign:"right",
	    	align:"right",
	    	showEdges: false,
	    	membersMargin:5,
	    	members:[closeExemptionsCodeBtn]
	    });

	    if(exemptionTypes != null){
	    	rightBtnBar.addMember(selectExemptionsCodebtn, 0);
	    }

	    isc.HLayout.create({
	    	ID:"ExemptionCodeUpperPage",
	    	width:"100%",
	    	//layoutTopMargin:10,
	    	defaultLayoutAlign:"center",
	    	align:"center",
	    	showEdges: false,
	    	membersMargin:5,
	    	members:[queryListBtnBar, MainBtnBar, MainBtnBar_noedit, rightBtnBar]
	    });


//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

        isc.DynamicForm.create({
        	ID:"formTypeBtn",
        	width:"100%",
        	items:[
        		{
        			name:"form_type",
        	    	type:"radioGroup",
        	    	showTitle:false,
        	    	canEdit:true,
        	    	wrap:false,
        	    	vertical:false,
        	        valueMap:["Exemption Certificate","Minute"],
        	        defaultValue:"Exemption Certificate",
        	        change:function(form, item, value)
        	        {
        	        	var formType = "";
    	       			var listgrid = "";
    	        		if(value == "Minute"){
    	        			headingForCertForm.hide();
    	        			headingForMinForm.show();
    	        			
    	        			cert_ecertDicContentFormGroup.hide();
    	        			min_ecertDicContentFormGroup.show();

    	        			cert_ecertDicItemFormGroup.hide();
    	        			min_ecertDicItemFormGroup.show();
    	        		}
    	        		else
	        			{
    	        			headingForCertForm.show();
    	        			headingForMinForm.hide();

    	        			cert_ecertDicContentFormGroup.show();
    	        			min_ecertDicContentFormGroup.hide();
    	        			
    	        			cert_ecertDicItemFormGroup.show();
    	        			min_ecertDicItemFormGroup.hide();
	        			}
//    	        		cert_ecertDicItemListGrid.setCriteria({form_type: value});
    	        	 }
        		}
			]
        });

        isc.DynamicForm.create({
	        ID:"headingForCertForm",
	        dataSource:"ecertExemptionsCodeDS",
	        valuesManager: exemptionCodeVM,
			width:"100%",
			height:90,
			autoFetchData: false,
			isGroup:"true",
			groupTitle:"Heading for Cert",
	        titleWidth:"100%",
//	        disabled:true,
	        //canEdit:false,
	        //autoFocus: true,
	        items:[
	               {
	                   type: "textArea",
	                   name: "subheading",
	                   title: "",
	                   width:"100%",
	                   height:"100%",
//	                   selectOnFocus:true,
//	                   wrapTitle:false,
	                   showTitle:false,
	               },
	        ],

	    });


        isc.DynamicForm.create({
	        ID:"headingForMinForm",
	        dataSource:"ecertExemptionsCodeDS",
	        valuesManager: exemptionCodeVM,
			width:"100%",
			height:90,
			autoFetchData: false,
			isGroup:"true",
			groupTitle:"Heading for Minute",
	        titleWidth:"100%",
//	        disabled:true,
	        //canEdit:false,
	        //autoFocus: true,
	        items:[
	               {
	                   type: "textArea",
	                   name: "exemption_for",
	                   title: "",
	                   width:"100%",
	                   height:"100%",
//	                   selectOnFocus:true,
//	                   wrapTitle:false,
	                   showTitle:false,
	               },
	        ],
	    });
        headingForMinForm.hide();


        function create_ecertDicContentFormGroup( prefix )
        {
        	var ecertDicContentVM = isc.ValuesManager.create({
        	    ID: prefix + "_ecertDicContentVM",
        	    dataSource: ecertDicContentDS,
        	    prefix: prefix,
        	    old_item: {}
        	});
        	
		    var ecertDicContentSelection = isc.DynamicForm.create({
		    	ID: prefix + "_ecertDicContentSelection",
		    	width:65,
		        fields: [
		            {name: prefix + "_ecertDicContentCombobox", ID: prefix + "_ecertDicContentCombobox", title:"", showTitle:false, type:"SelectItem", canEdit:true,
		            	optionDataSource:"ecertDicContentDS", valueField:"id",
		            	width:65,
		            	pickListWidth:500,
		            	//autoFetchData:false,
		            	displayField:"id",
		            	addUnknownValues:true,
	                	autoOpenTree: true,
		            	hideEmptyPickList:false,
		            	cachePickListResults: false,
		                pickListFields:[
		                                {name:'id', width:50},
	//	                                {name:"ex_code_id", title:"Exemption Code ID",hidden:true},
	//	                                {name:"exemption_type", title:"Exemption Type", hidden:true},
	//	                                {name:"form_type", title:"Form Type", hidden:true},
		                                {name:'short_summary', width:250},
		                                {name:'content', width:600}
		                               ],
	
		                pickListProperties: {
		                	valuesManager: exemptionCodeVM,
		                	dataPath: "ecertDicContent",
		                	canEdit: true,
		                	canSelect: true,
		                	//editOnFocus: true,
		                	//canSelectCells: true,
		                	//editEvent: "click",
		                	autoOpenTree: true,
		                	autoConfirmSaveEdits: true,
		                	autoSaveEdits: false,
		      			  	saveLocally: true,
		      			  	saveByCell: false,
	//	      			  	filterLocalData: true, 
		      			  	showClippedValuesOnHover: true,
		      			  	hoverWidth: 500,
	//	                    canHover: true,
	//	                    showHover: true,
	//	                    cellHoverHTML : function (record) {
	//	                        return record.content ? record.content : "[no content]";
	//	                    },
	
		                },
		                changed : function(form, item, value){
		                	fillDicContentVMs(ecertDicContentVM, value);
		                },
		                getPickListFilterCriteria: function() {
	
		        	  		if(ecertExemptionsCodeListGrid.anySelected()){
		        	  			if(prefix == "min")
		        	  			{
			                		return {ex_code_id:ecertExemptionsCodeListGrid.getSelectedRecord().id, form_type:"Minute"};
			                	}
		        	  			else
		                		{
			                		return {ex_code_id:ecertExemptionsCodeListGrid.getSelectedRecord().id, form_type:"Exemption Certificate"};
		                		}
		        	  		}else{
		        	  			return {ex_code_id:"-1"};
		        	  		}
	
		                },
	
		            }
		        ],
		    });
	
		    
		    var ecertDicContentShortSummary = isc.DynamicForm.create({
		    	ID: prefix + "_ecertDicContentShortSummary",
		    	valuesManager: ecertDicContentVM,
	//	    	valuesManager: selectbox_DicContentVM,
		    	width:"100%",
//		    	cellBorder: 1,
		    	numCols: 1,
//		    	disabled:true,
		    	//canEdit: false,
		        fields: [
			               {name: "short_summary", title: "Short Summary", width:"*", height:"21", showTitle:false}
		        ],
	
		    });
	
		    var ecertDicContentForm = isc.DynamicForm.create({
		        ID: prefix + "_ecertDicContentForm",
		        //dataSource:"ecertDicContentDS",
		    	valuesManager: ecertDicContentVM,
	//	        valuesManager: selectbox_DicContentVM,
	//	        dataPath:"editing",
				width:"100%",
				height:260,
				//isGroup:"true",
				//groupTitle:"Reasons of Exemption Cert",
				titleWidth:"100%",
//				disabled:true,
				//canEdit:false,
				showOldValueInHover:true,
				storeDisplayValues:true,
		        autoFocus: true,
		        items:[
	//	        	   {name:"id", title:"ID", hidden:true},
		               {name:"ex_code_id", title:"Exemption Code ID", hidden:true},
		               {name:"exemption_type", title:"Exemption Type", hidden:true},
		               {name:"form_type", title:"Form Type", hidden:true},
		               {
		                   name: "content",  
		                   type: "textArea",
		                   title: "Content",
		                   width:"100%",
		                   height:"100%",
		                   selectOnFocus:true,
		                   wrapTitle:false,
		                   showTitle:false,
		               }
		        ],
	
		    });
		    var copyEcertDicContentBtn = isc.IButton.create({
			  	  ID: prefix + "_copyEcertDicContentBtn",
			  	  autoDraw: false,
			  	  width:70,
			  	  layoutAlign:"center",
			  	  title:"Copy",
			  	  //---start 00001----
			  	  onControl:"EXEMPT_CODE_WRITE||FSQC_ALL",
			  	  //---end 00001----
			  	  click:function () {
					  if(!ecertDicContentVM.getValue("ex_code_id"))
			  		  {
						  isc.say("Please select a reason from dropdown box first.");
						  return;
					  }
//			  		  mergeChangesToVM();
			  		  var curr_date = new Date();
			  		  var form_type = (prefix=="min")? "Minute":"Exemption Certificate";
//			  		  var new_record = {
//		  				  id: "tmp_" + curr_date.getHours() + curr_date.getMinutes() + curr_date.getSeconds(),
//		  				  ex_code_id: exemptionCodeVM.getValue("id"),
//		  				  exemption_type: "",
//		  				  form_type: form_type,
////		  				  content: "New Content "+ curr_date.getHours() + curr_date.getMinutes() + curr_date.getSeconds(),
////		  				  short_summary: "New Summ "+ curr_date.getHours() + curr_date.getMinutes() + curr_date.getSeconds(),
//		  				  content: "",
//		  				  short_summary: "",
//			  		  };
//			  		  
			  		  var new_record = ecertDicContentVM.getValues();
			  		  new_record.id = "tmp_" + curr_date.getHours() + curr_date.getMinutes() + curr_date.getSeconds();
			  		  new_record.ex_code_id = exemptionCodeVM.getValue("id");
			  		  
			  		  exemptionCodeVM.getValue("ecertDicContent").push(new_record);
			  		  ecertDicContentSelection.getField(prefix+'_ecertDicContentCombobox').setValue(new_record.id);
			  		  fillDicContentVMs(ecertDicContentVM, new_record.id);
			  	  }
			});	
		    
		    var addEcertDicContentBtn = isc.IButton.create({
		  	  ID: prefix + "_addEcertDicContentBtn",
		  	  autoDraw: false,
		  	  width:70,
		  	  layoutAlign:"center",
		  	  title:"Add",
		  	  //---start 00001----
		  	  onControl:"EXEMPT_CODE_WRITE||FSQC_ALL",
		  	  //---end 00001----
		  	  click:function () {
//		  		  mergeChangesToVM();
		  		  
		  		  var curr_date = new Date();
		  		  var form_type = (prefix=="min")? "Minute":"Exemption Certificate";
		  		  var new_record = {
	  				  id: "tmp_" + curr_date.getHours() + curr_date.getMinutes() + curr_date.getSeconds(),
	  				  ex_code_id: exemptionCodeVM.getValue("id"),
	  				  exemption_type: "",
	  				  form_type: form_type,
//	  				  content: "New Content "+ curr_date.getHours() + curr_date.getMinutes() + curr_date.getSeconds(),
//	  				  short_summary: "New Summ "+ curr_date.getHours() + curr_date.getMinutes() + curr_date.getSeconds(),
	  				  content: "",
	  				  short_summary: "",
		  		  };
		  		  
		  		  
		  		  exemptionCodeVM.getValue("ecertDicContent").push(new_record);
		  		  ecertDicContentSelection.getField(prefix+'_ecertDicContentCombobox').setValue(new_record.id);
		  		  fillDicContentVMs(ecertDicContentVM, new_record.id);
		  	  }
		    });
		    var deleteEcertDicContentBtn = isc.IButton.create({
			  ID: prefix + "_deleteEcertDicContentBtn",
			  autoDraw: false,
			  width:70,
			  layoutAlign:"center",
			  title: "Delete",
			  //--start 00001 ---
			  onControl:"FSQC_ALL||EXEMPT_CODE_WRITE",
			  //---end 00001 ==
			  click:function(){
				  if(Array.isArray(exemptionCodeVM.getValue("ecertDicContent")))
				  {
					  var index = exemptionCodeVM.getValue("ecertDicContent").indexOf(ecertDicContentVM.old_item);
					  if(index > -1)
					  {
						  exemptionCodeVM.getValue("ecertDicContent").splice(index, 1);
						  fillDicContentVMs(ecertDicContentVM, null);
						  ecertDicContentSelection.getField(prefix+'_ecertDicContentCombobox').setValue(ecertDicContentVM.getValue("id"));
					  }
					  
				  }
				  
			  }
			});
	
		    var ecertDicContentBtnBar = isc.VLayout.create({
		    	ID: prefix + "_ecertDicContentBtnBar",
		    	//width: "50%",
		    	//layoutTopMargin:10,
		    	defaultLayoutAlign:"top",
		    	align:"top",
		    	showEdges: false,
		    	membersMargin:5,
		    	members:[copyEcertDicContentBtn, addEcertDicContentBtn, deleteEcertDicContentBtn]
		    	//members:[]
	    		//members:[ecertDicContentSelection,  addEcertDicContentBtn, deleteEcertDicContentBtn]
		    });
		    ecertDicContentBtnBar.hide();
		    
		    var ecertDicContentSelectionGroup = isc.HLayout.create({
		    	ID: prefix + "_ecertDicContentSelectionGroup",
		    	width:"100%",
		    	//height:300,
		    	//layoutTopMargin:10,
		    	align:"left",
		    	defaultLayoutAlign: "left",
		    	showEdges: false,
		    	membersMargin:1,
		    	members:[ecertDicContentSelection, ecertDicContentShortSummary]
		    });
	
		    var tmp_str = "Reasons of Exemption Cert";
		    if(prefix == "min")
	    	{
		    	tmp_str = "Content of Minute";
	    	}
		    var ecertDicContentPane = isc.VLayout.create({
		    	ID: prefix + "_ecertDicContentPane",
		    	width: "100%",
		    	layoutTopMargin:8,
		    	VerticalAlignment:"top",
		    	showEdges: false,
				isGroup:"true",
				groupTitle:tmp_str,
		    	membersMargin:5,
		    	//members:[ecertDicItemRecordCount, ecertDicItemSpinner, addEcertDicItemBtn, deleteEcertDicItemBtn]
		    	//members:[addEcertDicItemBtn, deleteEcertDicItemBtn]
	    		members:[ecertDicContentSelectionGroup, ecertDicContentForm]
		    });
	
		    var ecertDicContentFormGroup = isc.HLayout.create({
		    	ID: prefix + "_ecertDicContentFormGroup",
		    	width:"100%",
		    	//height:300,
		    	//layoutTopMargin:10,
		    	defaultLayoutAlign: "center",
		    	showEdges: false,
		    	membersMargin:5,
		    	members:[ecertDicContentPane, ecertDicContentBtnBar]
	    		//members:[ecertDicContentPane, cert_hiddenEcertDicContentListGrid, ecertDicContentBtnBar]
	    		//members:[ecertDicContentPane, cert_hiddenEcertDicContentListGrid, min_hiddenEcertDicContentListGrid, ecertDicContentBtnBar]
		    });
		    
		    return { result: true };
		    
		}
	    
        create_ecertDicContentFormGroup("cert");
        create_ecertDicContentFormGroup("min");
	    
        min_ecertDicContentFormGroup.hide();
	    
	    
//	    var DicItemDS = ecertDicItemDS;
//	    DicItemDS.fields.push({name:"cb_sel", type:"boolean", canToggle:true, shouldSaveValue:false, defaultValue:false});
        function create_ecertDicItemFormGroup(prefix)
        {
		    var ecertDicItemListGrid = isc.ListGrid.create({
		    	  ID:prefix + "_ecertDicItemListGrid",
//		    	  valuesManager: exemptionCodeVM,		// tried it, didn't work because it causes the VM to hasChange
//		    	  dataPath:"ecertDicItem",
		    	  //alternateRecordStyles:true,
		    	  width:"100%",
		    	  height:340,
		    	  overflow:"auto",
	//	    	  dataSource:DicItemDS,
		    	  dataSource:ecertDicItemDS,
		    	  autoFetchData:false,
		    	  //autoFitFieldWidths:true,
		    	  canEdit:false,
//		    	  editOnFocus: true,	// commented because doesn't work with selection
		    	  alternateRecordStyles:true,
		    	  //canSelectCells: true,
		    	  //dataPageSize: 20,
		    	  //canRemoveRecords:false,
		    	  autoSaveEdits: true,
		    	  saveLocally: true,
		    	  filterLocalData:true,
		    	  saveByCell: true,
	//	    	  editEvent: "click",
		    	  selectionAppearance:"checkbox",
		    	  selectionType: "simple",
		    	  showFilterEditor:false,
		    	  modalEditing: true,
		    	  layoutTopMargin:10,
		    	  isGroup:"true",
		    	  groupTitle:"Condition of " + ((prefix == "min")?"Minute":"Exemption Cert"),
	
		    	  fields:[
	//	               {name:"cb_sel", type:"boolean", canToggle:true, shouldSaveValue:false, defaultValue:true },	
		               {name:"ex_code_id", title:"Exemption Code ID", hidden:true},
		               {name:"exemption_type", title:"Exemption Type", hidden:true},
		               {name:"form_type", title:"Form Type", hidden:true},
		               {name:"content", title:"Content", canEdit:true, width:"90%", editorType:"autoFitTextArea", maxHeight:120
		            	   , showHover:true, hoverWidth: 500
		               },
		               {name:"sort", title:"Sort", canEdit:true, width:"10%"},
		    		   {name:"id", title:"ID", hidden:true, width:50}
		               ],
	 			  sortField: "sort",
				  sortDirection: "ascending",
	              wrapCells: true,
	//              cellHeight: 120,
	              fixedRecordHeights: false,
	
		    });
		    
		    var addEcertDicItemBtn = isc.IButton.create({
			  	  ID: prefix + "_addEcertDicItemBtn",
			  	  autoDraw: false,
			  	  width:70,
			  	  layoutAlign:"center",
			  	  title: "Add",
			  	  //--start 00001-----
			  	  onControl:"FSQC_ALL||EXEMPT_CODE_WRITE",
			  	  //---end 00001----
			  	  click : function () {
			  		  ecertDicItemListGrid.endEditing();
			  		  var curr_date = new Date();
			  		  var form_type = getCurrFormType();
			  		  var new_record = {
		  				  id: "tmp_" + curr_date.getHours() + curr_date.getMinutes() + curr_date.getSeconds(),
		  				  ex_code_id: exemptionCodeVM.getValue("id"),
		  				  exemption_type: null,
		  				  form_type: form_type,
		  				  content: null,
	//	  				  content: "New Content "+ curr_date.getHours() + curr_date.getMinutes() + curr_date.getSeconds(),
	//	  				  sort: "New Summ "+ curr_date.getHours() + curr_date.getMinutes() + curr_date.getSeconds(),
	//	  				  content: "",
		  				  sort: null,
			  		  };
			  		  
			  		  var row_num = 0;
			  		  ecertDicItemListGrid.data.addAt(new_record, row_num);

//			  		  exemptionCodeVM.getValue("ecertDicItem").push(new_record);
//			  		  //ecertDicItemListGrid.redraw();
////			  		  ecertDicItemListGrid.setCriteria({form_type: getCurrFormType()});
//			  		  var row_num = ecertDicItemListGrid.getRowNum(new_record);
			  		  ecertDicItemListGrid.scrollToRow(row_num);
			  		  ecertDicItemListGrid.startEditing(row_num);
			  	  }
		    });
			var deleteEcertDicItemBtn = isc.IButton.create({
				  ID: prefix + "_deleteEcertDicItemBtn",
				  autoDraw: false,
				  width:70,
				  layoutAlign:"center",
				  title: "Delete",
				  //--start 00001 ---
				  onControl:"FSQC_ALL||EXEMPT_CODE_WRITE",
				  //---end 00001 ==
				  click:function(){
					  var sel_records = ecertDicItemListGrid.getSelectedRecords();
					  if(Array.isArray(sel_records))
					  {
						  sel_records.forEach(
							  function (item, index){
								  var row_num = ecertDicItemListGrid.getRowNum(item);
								  ecertDicItemListGrid.removeRecord(row_num);
							  }
						  );
					  }
	
				  }
			});
	
		    var ecertDicItemBtnBar = isc.VLayout.create({
		    	ID:prefix + "_ecertDicItemBtnBar",
		    	//width: "50%",
		    	//layoutTopMargin:10,
		    	VerticalAlignment:"top",
		    	showEdges: false,
		    	membersMargin:5,
		    	//members:[ecertDicItemRecordCount, ecertDicItemSpinner, addEcertDicItemBtn, deleteEcertDicItemBtn]
		    	members:[addEcertDicItemBtn, deleteEcertDicItemBtn]
	    		//members:[]
		    });
		    ecertDicItemBtnBar.hide();
	
	
		    var ecertDicItemFormGroup = isc.HLayout.create({
		    	ID:prefix + "_ecertDicItemFormGroup",
		    	width:"100%",
		    	//height:300,
		    	//layoutTopMargin:10,
		    	defaultLayoutAlign: "center",
		    	showEdges: false,
		    	membersMargin:5,
		    	//members:[ecertDicItemForm, ecertDicItemBtnBar]
	    		members:[ecertDicItemListGrid, ecertDicItemBtnBar]
	//	    	members:[ ecertDicItemBtnBar]
		    });
        }
        create_ecertDicItemFormGroup("cert");
        create_ecertDicItemFormGroup("min");
        min_ecertDicItemFormGroup.hide();
        
	    isc.HLayout.create({
	    	ID:"formTypeBtnBar",
	    	width:"50%",
	    	//layoutTopMargin:10,
	    	defaultLayoutAlign: "center",
	    	showEdges: false,
	    	membersMargin:5,
	    	members:[formTypeBtn]
	    });

	    isc.HLayout.create({
	    	ID:"headingForCertFormGroup",
	    	width:"100%",
	    	//height:300,
	    	//layoutTopMargin:10,
	    	defaultLayoutAlign: "center",
	    	showEdges: false,
	    	membersMargin:5,
	    	members:[headingForCertForm, headingForMinForm]
	    });





	    isc.VLayout.create({
	    	ID:"LeftColumn",
	    	width:"50%",
	    	//layoutTopMargin:10,
	    	defaultLayoutAlign: "center",
	    	showResizeBar: true,
	    	resizeBarTarget: "next",
	    	showEdges: false,
	    	membersMargin:5,
	    	//members:[queryListBtnBar, ecertExemptionsCodeListGridGroup, remarkskeywordsListGridGroup]
	    	members:[ecertExemptionsCodeListGridGroup, remarkskeywordsListGridGroup]
	    });
	    
	    isc.VLayout.create({
	    	ID:"RightColumn",
	    	width: "50%",
	    	//layoutTopMargin:10,
	    	showEdges: false,
	    	membersMargin:5,
	    	//members:[exemptionCodeListBtnBar, formTypeBtnBar, headingForCertFormGroup, ecertDicContentFormGroup, ecertDicItemFormGroup]
//	    	members:[formTypeBtnBar, headingForCertFormGroup, ecertDicContentFormGroup, ecertDicItemFormGroup]
	    	members:[formTypeBtnBar, headingForCertFormGroup, cert_ecertDicContentFormGroup, min_ecertDicContentFormGroup, cert_ecertDicItemFormGroup, min_ecertDicItemFormGroup]
	    });

	    isc.HLayout.create({
	    	ID:"ExemptionCodeLowerPage",
	    	width:"100%",
	    	layoutTopMargin:0,
	    	defaultLayoutAlign: "center",
	    	showEdges: false,
	    	membersMargin:5,
	    	members:[LeftColumn, RightColumn]
	    });
	    

		isc.Window.create({
		    ID:"ExemptionCodeWindow",
		    title: "Exemption Code",
		    width:"98%",
		    height:845,
		    autoSize:true,
		    autoCenter: true,
		    isModal: true,
		    showModalMask: true,
		    autoDraw: false,
		    items: [

				    isc.VLayout.create({
				    	ID:"ExemptionCodeFullPage",
				    	width:"100%",
				    	layoutTopMargin:0,
				    	defaultLayoutAlign: "center",
				    	showEdges: false,
				    	membersMargin:5,
				    	members:[ExemptionCodeUpperPage, ExemptionCodeLowerPage]
				    })

			]
		});
		
	}

}

function clean_LG_Select( arrayFromLG )
{
    if(Array.isArray(arrayFromLG))
	{
    	var new_arr = [];
    	arrayFromLG.forEach(
			function(item,index)
			{
				for(var k in item)
				{
					if(k.substring(0,1) == "_")
					{
						delete item[k];
					}
					
				}
				new_arr.push(item);
			}
		);
    	arrayFromLG = new_arr;
	}
    return arrayFromLG;
}

//function clean_LG_Select( arrayFromLG )
//{
//    if(Array.isArray(arrayFromLG))
//	{
//    	arrayFromLG.forEach(
//			function(item,index)
//			{
//				for(var k in item)
//				{
//					if(k.substring(0,1) == "_")
//					{
//						delete item[k];
//					}
//					
//				}
//			}
//		);
//	}
//    return arrayFromLG;
//}

function fillDicContentVMs(vm, dicCont_id){
	
	Object.assign(vm.old_item, vm.getValues() );
	vm.clearValues();
	vm.old_item = {};

	var found = false;
	if(Array.isArray(exemptionCodeVM.getValue("ecertDicContent")))
	{
		
		exemptionCodeVM.getValue("ecertDicContent").forEach(
			function(item,index){

				if( item.form_type == "Minute" )
				{
					if(!found && vm.prefix == "min" && (dicCont_id == null || dicCont_id == item.id))
					{
						vm.setValues(item);
						vm.old_item = item;
						found = true;
					}
				}
				else
				{
					if(!found && vm.prefix != "min" && (dicCont_id == null || dicCont_id == item.id))
					{
						vm.setValues(item);
						vm.old_item = item;
						found = true;
					}
				}
			}
		);
	
	}
}

function sortDicItemById(a,b)
{
	if(a.id > b.id)
	{
		return 1;
	}
	else if(a.id < b.id)
	{
		return -1;
	}
	else
	{
		return 0;
	}
}

function setRecordToVM(record)
{
	// DicItem ListGrids need to be cleared, ... 
	exemptionCodeVM.setValues(null);
	cert_ecertDicItemListGrid.setData([]);
	min_ecertDicItemListGrid.setData([]);

	var cert_DicItemsArr = [];
	var min_DicItemsArr = [];
	

	if(record != null)
	{
		record.ecertDicContent = clean_LG_Select( record.ecertDicContent );
	}
	
	if(record != null)
	{
		record.ecertDicItem = clean_LG_Select( record.ecertDicItem );
		if(Array.isArray(record.ecertDicItem))
		{
			record.ecertDicItem.sort(sortDicItemById);
			
			record.ecertDicItem.forEach(
				function(item,index){
					if(item.form_type == "Minute")
					{
						min_DicItemsArr.push(item);
					}
					else
					{
						cert_DicItemsArr.push(item);
					}
				}
			);
		}	
	}
	
	
	exemptionCodeVM.setValues(record); 
	exemptionCodeVM.rememberValues();
	ecertExemptionsCodeListGrid.oldSelection = record;
//	ecertDicContentCombobox.pickList.setData(exemptionCodeVM.getValue("ecertDicContent"));
//	ecertDicContentCombobox.makePickList();
	fillDicContentVMs(cert_ecertDicContentVM, null);
	fillDicContentVMs(min_ecertDicContentVM, null);
	cert_ecertDicContentCombobox.setValue(cert_ecertDicContentVM.getValue("id"));
	min_ecertDicContentCombobox.setValue(min_ecertDicContentVM.getValue("id"));
//	ecertDicContentCombobox.setValue(selectbox_DicContentVM.getValues().editing.id);
	

	
//	cert_ecertDicItemListGrid.selectAllRecords();
//	cert_ecertDicItemListGrid.getField("cb_sel").shouldSaveValue = false;
//    cert_ecertDicItemListGrid.getCheckboxField().shouldSaveValue = false;
//	tmp_LGdata = tmp_LGdata.concat( exemptionCodeVM.getValue("ecertDicItem") );
//	cert_ecertDicItemListGrid.setData(tmp_LGdata);
	cert_ecertDicItemListGrid.setData(cert_DicItemsArr);	
//	cert_ecertDicItemListGrid.setCriteria({form_type: "Exemption Certificate"});
	cert_ecertDicItemListGrid.selectAllRecords();

	min_ecertDicItemListGrid.setData(min_DicItemsArr);	
//	min_ecertDicItemListGrid.setCriteria({form_type: "Minute"});
	min_ecertDicItemListGrid.selectAllRecords();

}

function mergeChangesToVM(){

	var recordB4 = exemptionCodeVM.getValues();
	
	var recordnum = ecertExemptionsCodeListGrid.getRowNum(ecertExemptionsCodeListGrid.oldSelection);
	if(
		ecertExemptionsCodeListGrid.rowHasChanges(recordnum) && 
		ecertExemptionsCodeListGrid.oldSelection != null
	)
	{
		console.log("Changes detected in ecertExemptionsCodeListGrid:");
		if(ecertExemptionsCodeListGrid.oldSelection.row_changed == null)
		{
			ecertExemptionsCodeListGrid.oldSelection.row_changed = "*";
		}
		
	}
	ecertExemptionsCodeListGrid.endEditing();
	cert_ecertDicItemListGrid.endEditing();
	min_ecertDicItemListGrid.endEditing();
	
	Object.assign(cert_ecertDicContentVM.old_item, cert_ecertDicContentVM.getValues() );	// xxx_ecertDicContentVM.old_item is actuall pointer/reference to exemptionCodeVM.ecertDicContent currently being edited 
	Object.assign(min_ecertDicContentVM.old_item, min_ecertDicContentVM.getValues() );		// xxx_ecertDicContentVM.old_item is actuall pointer/reference to exemptionCodeVM.ecertDicContent currently being edited

	
    var clean_select = exemptionCodeVM.getValue("ecertDicContent");
	clean_select = clean_LG_Select( clean_select );
	exemptionCodeVM.setValue("ecertDicContent",clean_select);
    
//    clean_select = exemptionCodeVM.getValue("ecertDicItem");
    clean_select = [].concat(cert_ecertDicItemListGrid.getDataAsArray()).concat(min_ecertDicItemListGrid.getDataAsArray());
	clean_select = clean_LG_Select( clean_select );
	if(Array.isArray(clean_select))
	{
		clean_select.sort(sortDicItemById);
	}
	exemptionCodeVM.setValue("ecertDicItem", clean_select);

	if(exemptionCodeVM.valuesHaveChanged() && ecertExemptionsCodeListGrid.oldSelection != null)
	{
		console.log("Changes detected in exemptionCodeVM:");
		console.log(exemptionCodeVM.getChangedValues());
		if(ecertExemptionsCodeListGrid.oldSelection.row_changed == null)
		{
			ecertExemptionsCodeListGrid.setEditValue(recordnum, "row_changed", "*");
		}
		ecertExemptionsCodeListGrid.setEditValue(recordnum, "remarks", exemptionCodeVM.getValue("remarks"));
		ecertExemptionsCodeListGrid.setEditValue(recordnum, "exemption_for", exemptionCodeVM.getValue("exemption_for"));
		ecertExemptionsCodeListGrid.setEditValue(recordnum, "subheading", exemptionCodeVM.getValue("subheading"));
		ecertExemptionsCodeListGrid.setEditValue(recordnum, "ecertDicContent", exemptionCodeVM.getValue("ecertDicContent"));
		ecertExemptionsCodeListGrid.setEditValue(recordnum, "ecertDicItem", exemptionCodeVM.getValue("ecertDicItem"));
		
	}


	ecertExemptionsCodeListGrid.saveAllEdits();	
	exemptionCodeVM.setValues(ecertExemptionsCodeListGrid.oldSelection); 
	

}


function initEcertExCodeLG(data){
	if(!data)
	{
		ecertExemptionsCodeListGrid.setData([]);
	}
	else
	{
		ecertExemptionsCodeListGrid.setData(data);
	}
//	ecertExemptionsCodeListGrid.oldSelection = null;
	setRecordToVM(null);
}

function getCurrFormType()
{
	return (formTypeBtn.values.form_type == "Minute")?"Minute":"Exemption Certificate";
}


/********
 * 
 * @param callback( save_result ) - save_result: true if completed without errors, false otherwise.
 * @returns
 */
function saveExCodeListGrid( callback )
{
	if(ecertExemptionsCode_saving)
	{
		console.log("Rapid saving!!!!");
		return;
	}
	ecertExemptionsCode_saving = true;
//	setTimeout(function(){
//		ecertExemptionsCode_saving = false;
//	}, 3000);
	
	mergeChangesToVM();
//	ecertExemptionsCodeListGrid.endEditing();
//    ecertExemptionsCodeListGrid.saveAllEdits();
	
	if(ecertExemptionsCodeListGrid.getDataAsArray() != null)
	{
		var afterSaveArr = [];
		var beforeSaveArr = [];
		
		
//		var saveLG = isc.ListGrid.create({
//			dataSource : ecertExemptionsCodeDS
//			, saveLocally: true
//		});
//		saveLG.setData([]);
//		saveLG.addData(beforeSaveArr);

//		ecertExemptionsCodeListGrid.getDataAsArray().allRows.forEach(
		ecertExemptionsCodeListGrid.getDataAsArray().forEach(
			function (item, index)
			{
				if(item == null)
				{
					return;
				}
				if(item.row_changed != undefined && item.row_changed != null)
				{
					if(Array.isArray(item.ecertDicContent))
					{
						item.ecertDicContent.forEach(function(item,index){
							if(item.id != null)
							{
								if(item.id.toString().substring(0,4) == "tmp_")
								{
									item.id = null;
								}
							}
						});
					}
					if(Array.isArray(item.ecertDicItem))
					{
						item.ecertDicItem.forEach(function(item,index){
							if(item.id != null)
							{
								if(item.id.toString().substring(0,4) == "tmp_")
								{
									item.id = null;
								}
							}
						});
					}
				}
				beforeSaveArr.push(item);
			}
		);

		
		function recurseSaveArr(b4Arr, afterArr)
		{
			if(!afterArr)
			{
				afterArr = [];
			}

			if(!Array.isArray(b4Arr) || !Array.isArray(afterArr))
			{
				ecertExemptionsCode_saving = false;
				return false;
			}

			if(b4Arr.size() > 0)
			{
				var item = b4Arr[0];
				b4Arr.remove(item); 
				if(item.row_changed != undefined && item.row_changed != null)
				{
					ecertExemptionsCodeDS.updateData(item
						, function (dsResponse, data, dsRequest)
						{
							if (!isNull(dsResponse) && dsResponse.status == 0)
							{
								console.log(data);
								item = {};
								Object.assign(item, data);
								afterArr.push(item);
								recurseSaveArr(b4Arr, afterArr);
							}
							else
							{
								ecertExemptionsCode_saving = false;
								afterArr.push(item);
								initEcertExCodeLG(b4Arr.concat( afterArr));
								callback(false);
							}
							
	                    }
					); //save
				}
				else
				{
					afterArr.push(item);
					recurseSaveArr(b4Arr, afterArr);
				}
				
			}
			else
			{
				ecertExemptionsCode_saving = false;
				initEcertExCodeLG(b4Arr.concat( afterArr));
				callback(true);
			}
		}
		
		recurseSaveArr(beforeSaveArr, afterSaveArr);

	}
	else
	{
		ecertExemptionsCode_saving = false;
	}
	
//	ecertExemptionsCodeListGrid.discardAllEdits();		// this is to remove unexpected "*", don't know why they appear AFTER save?
//	isc.say(saveSuccessfulMessage);
	
}

function checkUnsavedExCode( proceed_callback )
{
	var has_unsaved = false;
	mergeChangesToVM();
	if(ecertExemptionsCodeListGrid.getDataAsArray() != null)
	{
//		ecertExemptionsCodeListGrid.getDataAsArray().allRows.forEach(
		ecertExemptionsCodeListGrid.getDataAsArray().forEach(
			function (item, index)
			{
				if(item == null)
				{
					return;
				}
				if(item.row_changed != null)
				{
					has_unsaved = true;
				}
			}
		);
	}
	if( has_unsaved ){
		isc.ask( "There are unsaved changes and they will be lost if you proceed. Are you sure to proceed?", proceed_callback );
	}else{
		proceed_callback(true);
	}

}

//----------------------- Query Search part ---------------------------------
	var resultData = {};
	var getNthResult = 0;

	function mergeResultData(resultData, data){
		for(i=0; i < data.length; i++)
		{
			var found = false;
			for(j=0; j < resultData.length; j++)
			{
				if(data[i]["id"] == resultData[j]["id"])
				{
					found = true;
					break;
				}
			}
			if(!found)
			{
				resultData.push(data[i]);
			}
		}
	}
	
	
	function handleResultData(dsResponse, data, dsRequest){
		getNthResult--;

		mergeResultData(resultData, data);
		if (getNthResult == 0) {
//			console.log("resultData: " + resultData);
			initEcertExCodeLG(resultData);
		}

		return;
	}
	
//	function filterWithOrOnMultipleFields(search, exemptionTypes) {
	function filterWithOrOnMultipleFields(other_criteria, search) {
		var base_criteria = {};
		if(other_criteria)
		{
			Object.assign(base_criteria, other_criteria);
		}
		resultData = [];
		getNthResult = 0;
		initEcertExCodeLG([]);
		console.log("exemptionTypes~~~~");
//		console.log(exemptionTypes);
		//alert("how?");

		var searchFields = ["_dummy"];	// _dummy to work even without the "search" parameter
		if(search)
		{
			if(ecertExemptionsCodeSearch.getItem("search") != null)
			{
				ecertExemptionsCodeSearch.getItem("search").setValue(search);
			}
			
			searchFields = ["level_no1","level_no2","level_no3","level_no4","level_no5","keywords","remarks","hk_law"];
		}
		getNthResult = searchFields.length;
		ecertExemptionsCodeListGrid.setFilterEditorCriteria(base_criteria);
		function recurseSearch(idx){
			var local_criteria = {};
			Object.assign(local_criteria, base_criteria);
			if(searchFields[idx] != "_dummy")
			{
				local_criteria[searchFields[idx]] = search;
			}
			ecertExemptionsCodeDS.filterData(local_criteria, function(dsResponse, data, dsRequest) {
				
//				if (dsResponse.status == 0) {
					handleResultData(dsResponse, data, dsRequest);
//				}
				idx++;
				if(idx < searchFields.length)
				{
					recurseSearch(idx);
				}
		    });
		}
		
		recurseSearch(0);
	}

	
function recalcCanEditAll(){
	canEditAll(false);
	if(ecertExemptionsCodeListGrid.anySelected() && ecertExemptionCodeEditMode)
	{
		canEditAll(true);
	}
}

function canEditAll( bool ){
	if(bool)
	{
//		keywordsBtnBar.show();
		cert_ecertDicContentBtnBar.show();
		min_ecertDicContentBtnBar.show();
		cert_ecertDicItemBtnBar.show();	
		min_ecertDicItemBtnBar.show();	
	}
	else
	{
//		keywordsBtnBar.hide();
		cert_ecertDicContentBtnBar.hide();
		min_ecertDicContentBtnBar.hide();
		cert_ecertDicItemBtnBar.hide();	
		min_ecertDicItemBtnBar.hide();	
	}
	ecertExemptionsCodeListGrid.setCanEdit(bool);
	
//	remarksForm.setDisabled(!bool);
	remarksForm.setCanEdit(bool);
//	headingForCertForm.setDisabled(!bool);
    headingForCertForm.setCanEdit(bool);
//    headingForMinForm.setDisabled(!bool);
    headingForMinForm.setCanEdit(bool);
//    keywordsListGrid.setCanEdit(bool);
    
//    cert_ecertDicContentForm.setDisabled(!bool);
    cert_ecertDicContentForm.setCanEdit(bool);
//    cert_ecertDicContentShortSummary.setDisabled(!bool);
    cert_ecertDicContentShortSummary.setCanEdit(bool);
//    min_ecertDicContentForm.setDisabled(!bool);
    min_ecertDicContentForm.setCanEdit(bool);
//    min_ecertDicContentShortSummary.setDisabled(!bool);
    min_ecertDicContentShortSummary.setCanEdit(bool);

    cert_ecertDicItemListGrid.setCanEdit(bool);
    min_ecertDicItemListGrid.setCanEdit(bool);
    
//	addKeywordsBtn.setDisabled(!bool);
//	deleteKeywordsBtn.setDisabled(!bool);
	cert_addEcertDicContentBtn.setDisabled(!bool);
	min_addEcertDicContentBtn.setDisabled(!bool);
	cert_deleteEcertDicContentBtn.setDisabled(!bool);
	min_deleteEcertDicContentBtn.setDisabled(!bool);
	cert_addEcertDicItemBtn.setDisabled(!bool);
	min_addEcertDicItemBtn.setDisabled(!bool);
	cert_deleteEcertDicItemBtn.setDisabled(!bool);
	min_deleteEcertDicItemBtn.setDisabled(!bool);

}


