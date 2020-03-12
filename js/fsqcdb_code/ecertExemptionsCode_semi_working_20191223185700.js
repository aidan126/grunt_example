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

var EditedExemptionsCodeFormRecord = [];
var EditedExemptionsCodeRecord = [];

var NewExemptionsCodeRecordId = [];
var NewExemptionsCodeRecord = [];
var newExemptionRecordFlag = false;
var tempNew_ExemptionRecordId = -1;

var cert_ecertDicContentId = -1;
var min_ecertDicContentId = -1;
var cert_ecertdicItemArr = [];
var min_ecertdicItemArr = [];

var DeleteEcertDicContentRecord = [];
var tempNew_ecertDicContentId = -1;
var tempNew_ecertDicItemId = -1;
var selectedExemptionRecord = {};

var exemptionCodeUnsaveFlag_mainGrid = false;
var exemptionCodeUnsaveFlag_otherParts = false;

isc.ValuesManager.create({
    ID: "exemptionCodeVM",
    dataSource: ecertExemptionsCodeDS
});

//isc.DataSource.create({
//    ID:"selectbox_DicContentDS",
//    fields:[
//        {name:"editing", type:"ecertDicContentDS"},
//        {name:"editing_cert", type:"ecertDicContentDS"},
//        {name:"editing_min", type:"ecertDicContentDS"},
//        {name:"optionList", multiple: true}
//    ]
//});


//isc.ValuesManager.create({
//    ID: "selectbox_DicContentVM",
//    dataSource: selectbox_DicContentDS
//});

isc.ValuesManager.create({
    ID: "cert_ecertDicContentVM",
    dataSource: ecertDicContentDS,
    old_item: {}
});

isc.ValuesManager.create({
    ID: "min_ecertDicContentVM",
    dataSource: ecertDicContentDS,
    old_item: {}
});

var ecertDicContentVM = cert_ecertDicContentVM;
var ecertExemptionCodeEditMode = false;
function openExemptionCode(exemptionTypes, formTypes, returnSelectedExemption){

	ecertExemptionCodeEditMode = false;
//	setRecordToVM(null);
	exemptionCodeVM.clearValues();
	ecertDicContentVM = cert_ecertDicContentVM;
	min_ecertDicContentVM.clearValues();
	cert_ecertDicContentVM.clearValues();
	
	ExemptionCodeContent();
	ExemptionCodeWindow.show();

	function ExemptionCodeContent(){

		isc.ListGrid.create({
		  ID: "ecertExemptionsCodeListGrid",
		  dataSource: ecertExemptionsCodeDS,
	      //valuesManager:valueMan,
		  width:"50%",
		  height:300,
		  autoFetchData: true,
		  autoFitFieldWidths:true,
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
		  hoverWidth: 500,
		  modalEditing: true,
		  fields:[
		      {name:"row_changed", title:"*", canEdit:false},
		      {name:"id", title:"ID",  width:40, hidden:true, canEdit:false},
		      {name:"level_no1", title:"Level 1 Convention"},
		      {name:"level_no2", title:"Level 2 Chapter/Annex"},
		      {name:"level_no3", title:"Level 3 Regulation"},
		      {name:"level_no4", title:"Level 4 Equipment etc"},
		      {name:"level_no5", title:"Level 5 Component"},
		      {name:"hk_law", title:"HK Law"},
		      {name:"keywords", title:"Keywords", hidden:false, width:300},
		      {name:"exemption_type", title:"Exemption Type"},
		      {name:"output_type", title:"Type of Output"},
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

		  recordClick:function(viewer, record, recordNum, field, fieldNum, value, rawValue){
			  ecertExemptionsCodeListGrid.selectRecord(record);
//
//			  console.log(record);
//			  //console.log(record.id);
//			  console.log(recordNum);
//
//			  if(record){
//				  setAllComponents( this.getEditedRecord(this.getRowNum(this.getSelectedRecord())), recordNum, fieldNum);
//				  //setAllComponents( this.getSelectedRecord(), recordNum, fieldNum, exemptionTypes);				  
//			  }
//
//			  //if(this.canEdit && (record.id != undefined || record.id != null || record.id != "")){
//			  if(this.canEdit){
//				  if(record){
//					  if(record.id > 0){
//						  this.startEditing(recordNum, fieldNum);
//						  enableAllComponents();					  
//					  }			  
//				  }else{
//					  
//					  this.startEditing(recordNum, fieldNum);
//					  disableAllComponents();
//				  }		
//			  }
//			  
//	      	  var itemlistgrid = getItemListGrid( getFormType(formTypeBtn) );
//	    	  if(exemptionTypes != null && itemlistgrid.getTotalRows() > 0 ){
//	    		  itemlistgrid.selectAllRecords();
//	    	  }
		  },
		  selectionChanged:function(record, state){
			  if(state)	// do below with newly selected record
			  {
				  setRecordToVM(record);
//				  record.keywordList_arr = [];
//				  if(record.keywordList != null)
//				  {
//					  var tmpArr = record.keywordList;
//					  tmpArr.forEach(appendKeyword);
//					  
//					  function appendKeyword(item, index)
//					  {
//						  record.keywordList_arr.push({keyword:item, seq:index});
//					  }
//				  }
//	  			  exemptionCodeVM.setValues(record); 
//				  this.oldSelection = record;
//				  ecertDicContentCombobox.pickList.setData(exemptionCodeVM.getValue("ecertDicContent"));
//				  ecertDicContentCombobox.makePickList();
//				  fillDicContentVMs();
//				  ecertDicContentCombobox.setValue(ecertDicContentVM.getValue("id"));
			  }
			  else	// do below with the un-selected record
			  {
//				  var recordnum = ecertExemptionsCodeListGrid.getRowNum(ecertExemptionsCodeListGrid.oldSelection);
				  mergeChangesToVM();
			  }
			  recalcCanEditAll();
		  },
//		  editComplete :function(rowNum, colNum, newValues, oldValues, editCompletionEvent){
			  
//
//			  exemptionCodeUnsaveFlag_mainGrid = true;
//			  
//			  if(newValues.id < 0){
//				  
//					if(!NewExemptionsCodeRecordId.includes(newValues.id)){
//						NewExemptionsCodeRecordId.push(newValues.id);
//						NewExemptionsCodeRecord.push(newValues);
//					}else{
//						NewExemptionsCodeRecord.remove( NewExemptionsCodeRecord.find({id:newValues.id}) );
//						NewExemptionsCodeRecord.push(newValues);
//					}
//					
//					if(saveExemptionsCodebtn.getState() == ""){
//						this.setEditValues(rowNum, NewExemptionsCodeRecord.find({id:newValues.id}));
//						//this.setEditValues(rowNum, this.getEditedRecord(rowNum));
//						//this.setEditValues(rowNum, newValues);
//						//this.endEditing();
//					}
//
//				}else{
///*					if(!EditedExemptionsCodeRecord.includes(this.getSelectedRecord().id)){
//						EditedExemptionsCodeRecord.push(this.getSelectedRecord().id);
//					}
//*/
//					saveEditedRecordNum(ecertExemptionsCodeListGrid, EditedExemptionsCodeRecord);
//				}
//		  },
		  
//		  dataArrived :function(startRow, endRow){
//				
//				//ecertExemptionsCodeListGrid.refresh();
//			  	//ecertExemptionsCodeListGrid.fetchData({exemption_type:"Exemption"});
//				
//				if(!newExemptionRecordFlag){
//				    if(exemptionTypes != null && isEmpty(selectedExemptionRecord)){
//				    	if(exemptionEditVM.getValue('exempt_code_id') != null){
//				    		var selectedExemptionsCodeRecord = {};
//				    		selectedExemptionsCodeRecord['id'] = exemptionEditVM.getValue('exempt_code_id');
//
//				    		//this.deselectAllRecords();
//				    		this.focusInCell(this.getRowNum(selectedExemptionsCodeRecord), 1);
//				    		this.selectRecord(selectedExemptionsCodeRecord);
//				    	}
//				    }
//
//		    		if( this.getSelection().length >= 1 ){
//
//		    			this.startEditing(this.getRowNum(selectedExemptionsCodeRecord), 1);
//		    			setAllComponents( this.getSelectedRecord(), this.getRowNum(selectedExemptionsCodeRecord), 1);
//
//		  	  		  	var itemlistgrid = getItemListGrid( getFormType(formTypeBtn) );
//		  	  		  	if(exemptionTypes != null && itemlistgrid.getTotalRows() > 0 ){
//		  	  		  		itemlistgrid.selectAllRecords();
//		  	  		  	}
//		    		}
//
//				    if(MainBtnBar.hasMember(saveExemptionsCodebtn)){
//				    	this.setCanEdit(true);
//				    }else{
//				    	this.setCanEdit(false);
//				    }
//				}
//			}				
		}
		);

//		if(exemptionTypes){
//			ecertExemptionsCodeListGrid.fetchData({"exemption_type":exemptionTypes});
//		}

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
		            	
		            	var search = ecertExemptionsCodeSearch.getItem("search").getValue();
		            	if (!isNull(search) && search != ""){
		            		search = search.trim();

//			            	var advancedCriteria = {
//			             	       _constructor:"AdvancedCriteria",
//			             	       operator:"or",
//			             	       criteria:[
//			             	           // this is a Criterion
//			             	           { fieldName:"level_no5", operator:"iContains", value:search },
//			             	           /*
//			             	           { operator:"or", criteria:[
//			             	                 { fieldName:"level_no1", operator:"iContains", value:search }
//			             	                 //{ fieldName:"reports", operator:"notNull" }
//			             	             ]
//			             	           }
//			             	           */
//			             	       ]
//			             	};
//
//
//			            	ecertExemptionsCodeListGrid.fetchData(advancedCriteria);

			            	filterWithOrOnMultipleFields(search, exemptionTypes);

		            	}else{
		            		ecertExemptionsCodeListGrid.fetchData({});
		            	}
		            	
		            	setRecordToVM(null);
		            	cert_hiddenEcertDicItemListGrid.setData([]);

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
//				  	if(ecertExemptionsCodeListGrid.anySelected()){
//				  		
////						  isc.ask("Warning: This will overwrite any previously saved Min & Cert contents!! Are you sure to continue? [y/n]" , function (value){
////							  if (value){
//
//				  					ecertExemptionsCodeListGrid.endEditing();
//				  					keywordsListGrid.endEditing();
//				  			        cert_hiddenEcertDicItemListGrid.endEditing();
//				  			        min_hiddenEcertDicItemListGrid.endEditing();
//				  		
//								  	cert_hiddenEcertDicItemListGrid.sort(2, "ascending");
//								  	min_hiddenEcertDicItemListGrid.sort(2, "ascending");
//
//								  	if(cert_hiddenEcertDicContentListGrid.anySelected()){
//									  	cert_ecertDicContentId = cert_hiddenEcertDicContentListGrid.getSelectedRecord().id;
//								  	}
//								  	if(min_hiddenEcertDicContentListGrid.anySelected()){
//									  	min_ecertDicContentId = min_hiddenEcertDicContentListGrid.getSelectedRecord().id;
//								  	}
//
//								  	for (i = 0; i < cert_hiddenEcertDicItemListGrid.getSelectedRecords().length; i++) {
//								  		cert_ecertdicItemArr[i] = cert_hiddenEcertDicItemListGrid.getSelectedRecords()[i].id;
//								  	}
//								  	for (i = 0; i < min_hiddenEcertDicItemListGrid.getSelectedRecords().length; i++) {
//								  		min_ecertdicItemArr[i] = min_hiddenEcertDicItemListGrid.getSelectedRecords()[i].id;
//								  	}
//
//								  	//if(hiddenEcertDicContentListGrid.getSelectedRecord().id == null){
//								  	//var return_data = {
//								  	//ex_code_id:ecertExemptionsCodeListGrid.getSelectedRecord().id
//								  	//, content_id:hiddenEcertDicContentListGrid.getSelectedRecord().id
//								  	//, conditions_ids:dicItemarr
//								  	//};
//								  	//}else{
//								  	var return_data = {
//								  			ex_code_id: ecertExemptionsCodeListGrid.getSelectedRecord().id,
//								  			ex_code_form_type: ecertExemptionsCodeListGrid.getSelectedRecord().output_type,
//								  			cert_content_id: cert_ecertDicContentId,
//								  			min_content_id: min_ecertDicContentId,
//								  			cert_conditions_ids: cert_ecertdicItemArr,
//								  			min_conditions_ids: min_ecertdicItemArr,
//								  			cert_ExistFlag: true,
//								  			min_ExistFlag: true,
//								  	};
//								  	//}
//								  	console.log("return_data");
//								  	console.log(return_data);
//
//									if(exemptionCodeUnsaveFlag_mainGrid || exemptionCodeUnsaveFlag_otherParts){
//								    		isc.ask("Edited content(s) is/are not saved. Are you sure to Go Next?", function(value){
//								    				  if (value){
//														  returnSelectedExemption( true, return_data );
//														  resetVariables();
//								    					  ExemptionCodeWindow.hide();
//								    				  }
//								    		});
//									}else{
//										  returnSelectedExemption( true, return_data );
//										  resetVariables();
//				    					  ExemptionCodeWindow.hide();
//									}
////							  }
////						  });
//
//					}else{
//						isc.say("No Exemption/Dispensation is Selected.");
//					}
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

//					  var ExemptionsCode_record = {};
//					  ExemptionsCode_record['exemption_type'] = ecertExemptionsCodeListGrid.getSelectedRecord().exemption_type;
//					  ExemptionsCode_record['output_type'] = ecertExemptionsCodeListGrid.getSelectedRecord().output_type;
//					  ExemptionsCode_record['level_no1'] = ecertExemptionsCodeListGrid.getSelectedRecord().level_no1;
//					  ExemptionsCode_record['level_no2'] = ecertExemptionsCodeListGrid.getSelectedRecord().level_no2;
//					  ExemptionsCode_record['level_no3'] = ecertExemptionsCodeListGrid.getSelectedRecord().level_no3;
//					  ExemptionsCode_record['level_no4'] = ecertExemptionsCodeListGrid.getSelectedRecord().level_no4;
//					  ExemptionsCode_record['level_no5'] = ecertExemptionsCodeListGrid.getSelectedRecord().level_no5;
//					  ExemptionsCode_record['ecertDicItem'] = [];
//					  ExemptionsCode_record['ecertDicContent'] = [];
					  var ExemptionsCode_record = {};
					  Object.assign(ExemptionsCode_record, ecertExemptionsCodeListGrid.getSelectedRecord());
					  ExemptionsCode_record['id'] = tempNew_ExemptionRecordId;
					  ExemptionsCode_record['row_changed'] = "Copied";
					  ecertExemptionsCodeListGrid.startEditingNew(ExemptionsCode_record);

//					  resetExemptionRemarkKeywordHeading();
//					  resetExemptionReasonsCondition(true);
//					  disableAllComponents();
					  
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
				  
//				  //addEcertExemptionsCodeForm.clearValues();
//				  //addEcertExemptionsCodewindow.show();
//
//				  //console.log(NewExemptionsCodeRecord);
//				  //ecertExemptionsCodeListGrid.startEditingNew();
//				  
//				  newExemptionRecordFlag = true;
//				  
//				  var ExemptionsCode_record = {};
//				  ExemptionsCode_record['id'] = tempNew_ExemptionRecordId;
//				  ExemptionsCode_record['exemption_type'] = exemptionTypes;
//				  ExemptionsCode_record['ecertDicItem'] = [];
//				  ExemptionsCode_record['ecertDicContent'] = [];
//				  
//				  ecertExemptionsCodeListGrid.startEditingNew(ExemptionsCode_record);
//
//				  resetExemptionRemarkKeywordHeading();
//				  resetExemptionReasonsCondition(true);
//				  disableAllComponents();
//				  
//				  tempNew_ExemptionRecordId = tempNew_ExemptionRecordId - 1;
			  }
		});
//--------------------------------------------------add new window--------------------------------------------------------------------------------------------------------
/*		isc.Window.create({
			  ID: "addEcertExemptionsCodewindow",
			  title: "New Exemption Code",
			  width:800,
			  height:700,
			  autoSize:true,
			  autoCenter: true,
			  isModal: true,
			  showModalMask: true,
			  autoDraw: false,
			  items: [
			      isc.DynamicForm.create({
			      	  ID: "addEcertExemptionsCodeForm",
			          dataSource: ecertExemptionsCodeDS,
			          width:"100%",
			      	  autoDraw: false,
			          height: 48,
			          align:"center",
			          autoFetchData: false,
			          autoSaveEdits: false,
			          saveLocally: true,
			          border:"1px solid grey",
			          padding:20,
			          spacing:20,
			          fields: [
					      {name:"id", title:"ID",  width:40, hidden:true},
					      {name:"level_no1", title:"Level 1 Convention"},
					      {name:"level_no2", title:"Level 2 Chapter/Annex"},
					      {name:"level_no3", title:"Level 3 Regulation"},
					      {name:"level_no4", title:"Level 4 Equipment etc"},
					      {name:"level_no5", title:"Level 5 Component"},
					      {name:"hk_law", title:"HK Law"},
					      {name:"exemption_type", title:"Exemption Type"},
					      {name:"output_type", title:"Type of Output"},
					      //{name:"ecertDicContent", title:"ecertDicContent", hidden:true, defaultValue:[]},
			              //{name:"ecertDicItem", title:"ecertDicItem", hidden:true, defaultValue:[]}
			              ]
			      }),
			      
			      {name:"remarks", title:"Remarks", hidden:false, width:100},
			      {name:"keywords", title:"Keywords", hidden:false, width:300},
			      {name:"exemption_for", title:"Heading for Minute", hidden:false, width:300},
			      {name:"subheading", title:"Heading for Cert", hidden:false, width:300},
			      {name:"ecertDicContent", hidden:false, width:800},
			      {name:"ecertDicItem", hidden:false, width:800},

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
				    }),
				    isc.HLayout.create({
				    	ID:"remarksListGridGroup",
				    	width:"100%",
				    	layoutTopMargin:10,
				    	defaultLayoutAlign: "center",
				    	//showEdges: true,
				    	isGroup: true,
				    	groupTitle: "Remarks",
				    	membersMargin:0,
				    	members:[remarksForm]
				    }),
				    isc.HLayout.create({
				    	ID:"keywordsListGridGroup",
				    	width:"100%",
				    	//valuesManager:valueMan,
				    	layoutTopMargin:10,
				    	defaultLayoutAlign: "center",
				    	//showEdges: true,
				    	isGroup: true,
				    	groupTitle: "Keywords",
				    	membersMargin:50,
				    	members:[keywordsListGrid]
				    }),
					isc.DynamicForm.create({
					    ID: "keyworsDummy",
					    width:"1",
					    align:"left",
					    items:[
					        {type: "SpacerItem", width:"*"},
					    ]
					}),
				    isc.HLayout.create({
				    	ID:"keywordsBtnBar",
				    	width:"100%",
				    	//layoutTopMargin:10,
				    	defaultLayoutAlign: "center",
				    	align:"center",
				    	//showEdges: true,
				    	membersMargin:0,
				    	//members:[]
				    	members:[keyworsDummy]
				    }),
				    isc.VLayout.create({
				    	ID:"keywordsGroup",
				    	width:"100%",
				    	//layoutTopMargin:10,
				    	align:"top",
				    	defaultLayoutAlign: "top",
				    	//showEdges: true,
				    	membersMargin:5,
				    	members:[keywordsListGridGroup, keywordsBtnBar]
				    }),
				    isc.HLayout.create({
				    	ID:"remarkskeywordsListGridGroup",
				    	width:"100%",
				    	layoutTopMargin:0,
				    	defaultLayoutAlign: "center",
				    	//showEdges: true,
				    	membersMargin:10,
				    	members:[remarksListGridGroup, keywordsGroup]
				    }),
				    isc.VLayout.create({
				    	ID:"LeftColumn",
				    	width:"50%",
				    	//layoutTopMargin:10,
				    	defaultLayoutAlign: "center",
				    	showEdges: false,
				    	membersMargin:5,
				    	//members:[queryListBtnBar, ecertExemptionsCodeListGridGroup, remarkskeywordsListGridGroup]
				    	members:[ecertExemptionsCodeListGridGroup, remarkskeywordsListGridGroup]
				    }),
			      
				    isc.HLayout.create({
				    	ID:"formTypeBtnBar",
				    	width:"50%",
				    	//layoutTopMargin:10,
				    	defaultLayoutAlign: "center",
				    	showEdges: false,
				    	membersMargin:5,
				    	members:[formTypeBtn]
				    }),

				    isc.HLayout.create({
				    	ID:"headingForCertFormGroup",
				    	width:"100%",
				    	//height:300,
				    	//layoutTopMargin:10,
				    	defaultLayoutAlign: "center",
				    	showEdges: false,
				    	membersMargin:5,
				    	members:[headingForCertForm]
				    }),

				    isc.VLayout.create({
				    	ID:"ecertDicContentBtnBar",
				    	//width: "50%",
				    	//layoutTopMargin:10,
				    	defaultLayoutAlign:"top",
				    	align:"top",
				    	showEdges: false,
				    	membersMargin:5,
				    	members:[]
			    		//members:[ecertDicContentSelection,  addEcertDicContentBtn, deleteEcertDicContentBtn]
				    }),

				    isc.VLayout.create({
				    	ID:"ecertDicItemBtnBar",
				    	//width: "50%",
				    	//layoutTopMargin:10,
				    	VerticalAlignment:"top",
				    	showEdges: false,
				    	membersMargin:5,
				    	//members:[ecertDicItemRecordCount, ecertDicItemSpinner, addEcertDicItemBtn, deleteEcertDicItemBtn]
				    	//members:[addEcertDicItemBtn, deleteEcertDicItemBtn]
			    		members:[]
				    }),

				    isc.HLayout.create({
				    	ID:"ecertDicContentSelectionGroup",
				    	width:"100%",
				    	//height:300,
				    	//layoutTopMargin:10,
				    	align:"left",
				    	defaultLayoutAlign: "left",
				    	showEdges: false,
				    	membersMargin:1,
				    	members:[cert_ecertDicContentSelection, ecertDicContentShortSummary]
				    }),

				    isc.VLayout.create({
				    	ID:"ecertDicContentPane",
				    	width: "100%",
				    	layoutTopMargin:8,
				    	VerticalAlignment:"top",
				    	showEdges: false,
						isGroup:"true",
						groupTitle:"Reasons of Exemption Cert",
				    	membersMargin:5,
				    	//members:[ecertDicItemRecordCount, ecertDicItemSpinner, addEcertDicItemBtn, deleteEcertDicItemBtn]
				    	//members:[addEcertDicItemBtn, deleteEcertDicItemBtn]
			    		members:[ecertDicContentSelectionGroup, ecertDicContentForm]
				    }),

				    isc.HLayout.create({
				    	ID:"ecertDicContentFormGroup",
				    	width:"100%",
				    	//height:300,
				    	//layoutTopMargin:10,
				    	defaultLayoutAlign: "center",
				    	showEdges: false,
				    	membersMargin:5,
				    	members:[ecertDicContentPane, ecertDicContentBtnBar]
			    		//members:[ecertDicContentPane, cert_hiddenEcertDicContentListGrid, ecertDicContentBtnBar]
			    		//members:[ecertDicContentPane, cert_hiddenEcertDicContentListGrid, min_hiddenEcertDicContentListGrid, ecertDicContentBtnBar]
				    }),

				    isc.HLayout.create({
				    	ID:"ecertDicItemFormGroup",
				    	width:"100%",
				    	//height:300,
				    	//layoutTopMargin:10,
				    	defaultLayoutAlign: "center",
				    	showEdges: false,
				    	membersMargin:5,
				    	//members:[ecertDicItemForm, ecertDicItemBtnBar]
			    		members:[cert_hiddenEcertDicItemListGrid, ecertDicItemBtnBar]
				    }),

				    isc.VLayout.create({
				    	ID:"RightColumn",
				    	width: "50%",
				    	//layoutTopMargin:10,
				    	showEdges: false,
				    	membersMargin:5,
				    	//members:[exemptionCodeListBtnBar, formTypeBtnBar, headingForCertFormGroup, ecertDicContentFormGroup, ecertDicItemFormGroup]
				    	members:[formTypeBtnBar, headingForCertFormGroup, ecertDicContentFormGroup, ecertDicItemFormGroup]
				    }),

				    isc.HLayout.create({
				    	ID:"addExemptionCodePage",
				    	width:"100%",
				    	layoutTopMargin:0,
				    	defaultLayoutAlign: "center",
				    	showEdges: false,
				    	membersMargin:5,
				    	members:[LeftColumn, RightColumn]
				    }),
			      
			      isc.ButtonToolbar.create({
				      ID:"SaveEcertExemptionsCodebtn",
			    	  layoutAlign:"center",
			          buttons: [
			              {name:"CompMgmtformSave", title:"Save", width:100,
			                  click:function(){
			                	  //if(addCompMgmtForm.getValues().Com_cd){
			                	  addEcertExemptionsCodeForm.saveData();
			                	  addEcertExemptionsCodewindow.hide();
			                	  //}else{
			                    	  //isc.say("ID is missing", function (value){ });
			                	  //}
			                  }
			              },
			          ]
			      }),
			      isc.VLayout.create({
			    	  	ID:"addEcertExemptionsCodeBar",
			    	  	width:300,
			    	  	height:1,
				    	layoutTopMargin:10,
				    	align:"center",
				    	defaultLayoutAlign:"center",
				    	showEdges:false,
				    	membersMargin:5, members:[addExemptionCodePage, SaveEcertExemptionsCodebtn]
			      })
			   ]
		});*/
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
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
				  
//				  if(ecertExemptionsCodeListGrid.anySelected()){
//
//					  isc.ask(promptDeleteMessage_2, function (value){
//						  if (value){
//							  ecertExemptionsCodeDS.removeData(ecertExemptionsCodeListGrid.getSelectedRecord(),
//									  function(dsResponse, data, dsRequest) {
//		              						if (dsResponse.status == 0) {
//		              							isc.say("Successfully Deleted");
//		              						}
//							  		  }
//							  );
//						  }
//					  });
//
//				  }else{
//                	  isc.say("No Exemption/Dispensation is Selected.");
//				  }

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
//				  	MainBtnBar.addMember(copyRecordBtn, 0);
//				  	MainBtnBar.addMember(addExemptionsCodebtn, 1);
//				  	MainBtnBar.addMember(delExemptionsCodebtn, 2);
//				  	MainBtnBar.addMember(saveExemptionsCodebtn, 3);
//				  	MainBtnBar.removeMember(editExemptionsCodebtn);
//
//				  keywordsBtnBar.show();
//			        keywordsBtnBar.addMember(addKeywordsBtn, 0);
//			        keywordsBtnBar.addMember(deleteKeywordsBtn, 1);
//
//				  ecertDicContentBtnBar.show();
//			        ecertDicContentBtnBar.addMember(addEcertDicContentBtn, 0);
//			        ecertDicContentBtnBar.addMember(deleteEcertDicContentBtn, 1);
//
//				  ecertDicItemBtnBar.show();
//			        ecertDicItemBtnBar.addMember(addEcertDicItemBtn, 0);
//			        ecertDicItemBtnBar.addMember(deleteEcertDicItemBtn, 1);
//
//				  	ecertExemptionsCodeListGrid.setCanEdit(true);

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
				mergeChangesToVM();
//				ecertExemptionsCodeListGrid.endEditing();
//		        ecertExemptionsCodeListGrid.saveAllEdits();
				
		        exemptionCodeVM.saveData(function (dsResponse, data, dsRequest){
					if(dsResponse.status==0){
						ecertExemptionsCodeListGrid.oldSelection = data;
//						ecertExemptionsCodeListGrid.oldSelection.row_changed = "";
						ecertExemptionsCodeListGrid.discardAllEdits();		// this is to remove unexpected "*", don't know why they appear AFTER save?
						isc.say(saveSuccessfulMessage);
						//enabledSection(true);
					}
				});


//
//				selectedExemptionRecord = ecertExemptionsCodeListGrid.getSelectedRecord();
//		        //var EditedExemptionsCodeRecord = ecertExemptionsCodeListGrid.getAllEditRows();
//				
//		        ecertExemptionsCodeListGrid.endEditing();
//		        ecertExemptionsCodeListGrid.saveAllEdits();
//		        keywordsListGrid.unsort();
//		        keywordsListGrid.endEditing();
//		        keywordsListGrid.saveAllEdits();
//		        cert_hiddenEcertDicItemListGrid.endEditing();
//		        cert_hiddenEcertDicItemListGrid.saveAllEdits();
//		        min_hiddenEcertDicItemListGrid.endEditing();
//		        min_hiddenEcertDicItemListGrid.saveAllEdits();
///*
//		        exemptionCodeVM.saveData(function (dsResponse, data, dsRequest){
//					  if(dsResponse.status==0){
//						  isc.say(SaveSuccessfully);
//						  //enabledSection(true);
//					  }
//					}
//				);
//*/
//		        //ecertDicContentRecordCount.setContents(EditedExemptionsCodeRecord);
//		        //ecertDicContentForm.setValue("content", ecertDicContentForm.getValue("content"));
//		        //ecertDicContentForm.saveData();
//		        //ecertDicItemForm.saveData();
//		        //ecertDicContentDS.updateData();
//		        //ecertExemptionsCodeDS.updateData(ecertExemptionsCodeListGrid.getSelectedRecord()); //save
//
//		        // Dedupication between Edited record and Edited other parts record to be updated
//		        for (i = 0; i < EditedExemptionsCodeFormRecord.length; i++) {
//			        for (j = 0; j < EditedExemptionsCodeRecord.length; j++) {
//		        		if(EditedExemptionsCodeRecord[j] == EditedExemptionsCodeFormRecord[i]){
//		        			EditedExemptionsCodeRecord.removeAt(j);
//		        		}
//			        }
//	        	}
///*	        	for (i = 0; i < NewExemptionsCodeRecordrownum.length; i++) {
//		        	for (j = 0; j < EditedExemptionsCodeRecord.length; j++) {
//	        			if(EditedExemptionsCodeRecord[j] == NewExemptionsCodeRecordrownum[i]){
//	        				EditedExemptionsCodeRecord.removeAt(j);
//	        			}
//		        	}
//        		}
//*/	        	
//
//		        console.log("1-");
//		        console.log(NewExemptionsCodeRecordId);
//		        console.log(NewExemptionsCodeRecord);
//		        //console.log("New Record: " + NewExemptionsCodeRecord);
//
//		        // Save New Main Grid Record(s)
//		        for (i = 0; i < NewExemptionsCodeRecord.length; i++) {
//		        	console.log("new status");
//		        	
//		        	//reset id to make DAO add record
//		        	NewExemptionsCodeRecord[i].id = null;
//			        console.log(NewExemptionsCodeRecord);
//
//		        	//Save action
//		        	if(NewExemptionsCodeRecord[i].level_no1 != null || NewExemptionsCodeRecord[i].level_no2 != null || NewExemptionsCodeRecord[i].level_no3 != null || NewExemptionsCodeRecord[i].level_no4 != null || NewExemptionsCodeRecord[i].level_no5 != null){
//			        	ecertExemptionsCodeDS.addData( NewExemptionsCodeRecord[i], function(dsResponse, data, dsRequest){
//			        		ecertExemptionsCodeListGrid.selectRecord(selectedExemptionRecord);
//			        		exemptionCodeUnsaveFlag_mainGrid = false;
//			        		ecertExemptionsCodeListGrid.filterData( ecertExemptionsCodeListGrid.filterEditor.getValuesAsCriteria() ,function(dsResponse, data, dsRequest){
//								//ecertExemptionsCodeListGrid.selectRecord(selectedExemptionRecord);
//								cert_ecertDicContentSelection.getField('ecertDicContentCombobox').makePickList();
//								min_ecertDicContentSelection.getField('ecertDicContentCombobox').makePickList();
//								cert_ecertDicContentSelection.getField('ecertDicContentCombobox').pickList.setData([]);
//								min_ecertDicContentSelection.getField('ecertDicContentCombobox').pickList.setData([]);
//			        		})
//			        	});
//		        	}
//		        }
//
//		        console.log("2-");
//		        console.log(EditedExemptionsCodeRecord);
//
//	        	// Save Edited Main Grid Part
//		        for (i = 0; i < EditedExemptionsCodeRecord.length; i++) {
//		        	console.log("edit status");
//
//		        	//Save action
//		        	if(EditedExemptionsCodeRecord[i]){
//			        	ecertExemptionsCodeDS.updateData( ecertExemptionsCodeListGrid.getRecord(ecertExemptionsCodeListGrid.getRowNum({id:EditedExemptionsCodeRecord[i]})), function(dsResponse, data, dsRequest){
//			        		ecertExemptionsCodeListGrid.selectRecord(selectedExemptionRecord);
//			        		exemptionCodeUnsaveFlag_mainGrid = false;
//			        		console.log(exemptionCodeUnsaveFlag_mainGrid);
//			        		ecertExemptionsCodeListGrid.filterData( ecertExemptionsCodeListGrid.filterEditor.getValuesAsCriteria() ,function(dsResponse, data, dsRequest){
//								//ecertExemptionsCodeListGrid.selectRecord(selectedExemptionRecord);
//								cert_ecertDicContentSelection.getField('ecertDicContentCombobox').makePickList();
//								min_ecertDicContentSelection.getField('ecertDicContentCombobox').makePickList();
//								cert_ecertDicContentSelection.getField('ecertDicContentCombobox').pickList.setData([]);
//								min_ecertDicContentSelection.getField('ecertDicContentCombobox').pickList.setData([]);
//			        		})
//			        	});
//		        	}
//		        }
//
//		        console.log("3-");
//		        console.log(EditedExemptionsCodeFormRecord);
//
//		        // Save Other Edited Parts
//		        for (a = 0; a < EditedExemptionsCodeFormRecord.length; a++) {
//
//		        	//Check keyword part before save
//		        	var editedRecord = ecertExemptionsCodeListGrid.getRecord(ecertExemptionsCodeListGrid.getRowNum({id:EditedExemptionsCodeFormRecord[a]}));
//					var recordnum = ecertExemptionsCodeListGrid.getRowNum( editedRecord );
//		        	var keywordList = getKeywords(editedRecord.keywordList);
//		        	var keywords = "";
//
//		        	//if(keywordsListGrid.isEditingRecord()){
//			        	if(keywordsListGrid.getTotalRows() != keywordList.length){
//
//							keywordList.push( keywordsListGrid.getEditedRecord( keywordsListGrid.getTotalRows()-1 ) );
//
//			        	}else{
//			        		keywordList = [];
//			        		 for (b = 0; b < keywordsListGrid.getTotalRows(); b++){
//			        			 keywordList.add( {keywords:keywordsListGrid.getRecord(b).keywords} );
//			        		 }
//			        	}
//		        	//}
//
//		        	for (j = 0; j < keywordList.length; j++) {
//
//						  	if(j == 0){
//						  		delimiter = "";
//						  	}else{
//						  		delimiter = "~-~";
//						  	}
//
//			        		if( keywordList[j].keywords == null || keywordList[j].keywords == undefined || keywordList[j].keywords == "" ){
//			        			  keywordList.remove(keywordList[j]);
//			        		}else{
//			        			  keywords = keywords.concat(delimiter, keywordList[j].keywords);
//			        		}
//		        	}
//
//		        	editedRecord['keywords'] = keywords;
//					editedRecord['keywordList'] = keywordList;
//
//					//Check Reason part before save
//					if(editedRecord.ecertDicContent != null)
//					{
//						for (k = 0; k < editedRecord.ecertDicContent.length; k++) {
//							if(editedRecord.ecertDicContent[k].id < 0){
//								editedRecord.ecertDicContent[k].id = null;
//							}
//						}
//					}
//					
//
//					//Check Condition part before save
//					if(editedRecord.ecertDicItem != null)
//					{
//						for (l = 0; l < editedRecord.ecertDicItem.length; l++) {
//							if(editedRecord.ecertDicItem[l].id < 0){
//								editedRecord.ecertDicItem[l].id = null;
//							}
//						}
//					}
//		        	console.log(editedRecord);
//
//					//Save action
//			        ecertExemptionsCodeDS.updateData(editedRecord, function(dsResponse, data, dsRequest){
////		        		ecertExemptionsCodeListGrid.refreshData(function(dsResponse, data, dsRequest){
//							ecertExemptionsCodeListGrid.selectRecord(selectedExemptionRecord);
//			        		exemptionCodeUnsaveFlag_otherParts = false;
//							keywordsListGrid.sort('keywords');
////							cert_ecertDicContentSelection.getField('ecertDicContentCombobox').pickList.setData([]);
////							min_ecertDicContentSelection.getField('ecertDicContentCombobox').pickList.setData([]);
////							//cert_ecertDicContentSelection.getField('ecertDicContentCombobox').pickList.refreshData();
////							//min_ecertDicContentSelection.getField('ecertDicContentCombobox').pickList.refreshData();
////		        		})
//		        		ecertExemptionsCodeListGrid.filterData( ecertExemptionsCodeListGrid.filterEditor.getValuesAsCriteria() ,function(dsResponse, data, dsRequest){
//							//ecertExemptionsCodeListGrid.selectRecord(selectedExemptionRecord);
//							cert_ecertDicContentSelection.getField('ecertDicContentCombobox').makePickList();
//							min_ecertDicContentSelection.getField('ecertDicContentCombobox').makePickList();
//							cert_ecertDicContentSelection.getField('ecertDicContentCombobox').pickList.setData([]);
//							min_ecertDicContentSelection.getField('ecertDicContentCombobox').pickList.setData([]);
//							//cert_ecertDicContentSelection.getField('ecertDicContentCombobox').pickList.refreshData();
//							//min_ecertDicContentSelection.getField('ecertDicContentCombobox').pickList.refreshData();
//		        		})
//			        });
//		        }
//		        
//			  	EditedExemptionsCodeFormRecord = [];
//			  	EditedExemptionsCodeRecord = [];
//			  	NewExemptionsCodeRecordrownum = [];
//			  	NewExemptionsCodeRecord = [];
//			  	cert_ecertDicContentId = -1;
//			  	min_ecertDicContentId = -1;
//			  	cert_ecertdicItemArr = [];
//			  	min_ecertdicItemArr = [];
//
//			  	DeleteEcertDicContentRecord = [];
//			  	tempNew_ecertDicContentId = -1;
//			  	tempNew_ecertDicItemId = -1;
//				isc.say("Save Successfully.");
//				
			}
		});

		isc.IButton.create({
			  ID:"closeExemptionsCodeBtn",
			  width:90,
			  align:"center",
			  layoutLeftMargin:150,
			  title:"Close",
			  click:function(){

//				  ecertExemptionsCodeListGrid.endEditing();
//				  keywordsListGrid.endEditing();
//			      cert_hiddenEcertDicItemListGrid.endEditing();
//  			      min_hiddenEcertDicItemListGrid.endEditing();
//				  
//				  if(exemptionCodeUnsaveFlag_mainGrid || exemptionCodeUnsaveFlag_otherParts){
//				    		isc.ask("Edited content(s) is/are not saved. Are you sure to close?", function(value){
//				    				  if (value){
//				    					  //var return_data_arr = [];
//				    					  //callback(false, return_data_arr);
//				    					  
//										  resetVariables();
//				    					  ExemptionCodeWindow.hide();
//				    				  }
//				    		});
//				  }else{
//					  resetVariables();
					  ExemptionCodeWindow.hide();
//				  }

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

//		isc.ListGrid.create({
//			  ID:"keywordsListGrid",
//			  //dataSource:ecertExemptionsCodeDS,
//			  valuesManager: exemptionCodeVM,
//			  dataPath: "keywordList_arr",
//			  width:"100%",
//			  height:450,
//			  autoFetchData:false,
//			  autoFitFieldWidths:true,
//			  autoConfirmSaveEdits:true,
//			  canEdit:false,
//			  editOnFocus:true,
//			  canSelectCells:true,
//			  autoSaveEdits:true,
//			  saveLocally:true,
//			  saveByCell:true,
//			  modalEditing: true,
//			  editEvent:"click",
//			  showFilterEditor:false,
//			  fields:[
//				  {name:"seq", title:"ID", hidden:true},
//			      {name:"keyword", title:"Keyword"},
//			  ],
//			  sortField: "keyword",
//			  sortDirection: "ascending",
//			  rowClick:function(record, recordNum, fieldNum){
//
//				  if(this.canEdit){
//					  this.startEditing(recordNum, fieldNum);
//				  }
//
//			  },
////			  editComplete:function(rowNum, colNum, newValues, oldValues, editCompletionEvent){
////				  
////				  exemptionCodeUnsaveFlag_otherParts = true;
////				  
////			  },
////			  rowEditorExit:function(editCompletionEvent, record, newValues, rowNum){
////			  //editComplete:function(rowNum, colNum, newValues, oldValues, editCompletionEvent){
////			  //cellChanged:function(record, newValue, oldValue, rowNum, colNum, grid){
////			  //rowHasChanges:function(rowNum){
////
////				  //if(!isEmpty(newValues)){
////				      ecertExemptionsCodeListGrid.endEditing();
////				      ecertExemptionsCodeListGrid.saveAllEdits();
////
////					  var keywords = "";
////					  var keywordList = [];
////					  var delimiter = "";
////					  var keywordsExemptionsCodeRecord = [];
////					  var recordnum = ecertExemptionsCodeListGrid.getRowNum(ecertExemptionsCodeListGrid.getSelectedRecord());
////
////					  for (i = 0; i < keywordsListGrid.getTotalRows(); i++) {
////
////						  if(i != 0){
////							  delimiter = "~-~";
////						  }
////
////						  if(i == rowNum){
////
////							  if(typeof newValues.keywords === 'undefined' && record != null){
////
////								  keywordList.push(record.keywords);
////								  keywords = keywords.concat(delimiter, record.keywords);
////
////							  }else{
////
////								  keywordList.push(newValues.keywords);
////								  keywords = keywords.concat(delimiter, newValues.keywords);
////							  }
////
////						  }else{
////							  keywordList.push(keywordsListGrid.getRecord(i).keywords);
////							  keywords = keywords.concat(delimiter, keywordsListGrid.getRecord(i).keywords);
////						  }
////					  }
////
////					  keywordsExemptionsCodeRecord = ecertExemptionsCodeListGrid.getEditedRecord(recordnum);
////					  keywordsExemptionsCodeRecord['keywords'] = keywords;
////					  keywordsExemptionsCodeRecord['keywordList'] = keywordList;
////
////					  ecertExemptionsCodeListGrid.setEditValues(recordnum, keywordsExemptionsCodeRecord);
////
////					  saveEditedRecordNum(ecertExemptionsCodeListGrid, EditedExemptionsCodeFormRecord);
////				  //}
////			  }
//		});

//		isc.IButton.create({
//			  ID: "addKeywordsBtn",
//			  autoDraw:false,
//			  width:90,
//			  //showDisabled:true,
//			  layoutAlign:"center",
//			  title: "Add",
//			  //--start 00001 ---
//			  onControl:"FSQC_ALL||EXEMPT_CODE_WRITE",
//			  //---end 00001 ==
//			  click: function(){
////
////				  var allowAddKeywordFlag = true;
////				  var keywordarr = ecertExemptionsCodeListGrid.getEditedRecord(ecertExemptionsCodeListGrid.getRowNum(ecertExemptionsCodeListGrid.getSelectedRecord())).keywordList;
////
////				  if(keywordarr != null){
////					  for (i = 0; i < keywordarr.length; i++){
////						  if(keywordarr[i] == undefined || keywordarr[i] == null){
////							  allowAddKeywordFlag = false;
////						  }
////					  }
////				  }
////
////				  if(ecertExemptionsCodeListGrid.anySelected()){
////					  if(allowAddKeywordFlag){
////						  keywordsListGrid.startEditingNew();
////					  }
////				  }else{
////                	  isc.say("No Exemption/Dispensation is Selected.");
////				  }
//			  }
//		});

//		isc.IButton.create({
//			  ID: "deleteKeywordsBtn",
//			  autoDraw:false,
//			  width:90,
//			  //Disabled:true,
//			  layoutAlign:"center",
//			  title: "Delete",
//			  //--start 00001 ---
//			  onControl:"FSQC_ALL||EXEMPT_CODE_WRITE",
//			  //---end 00001 ==
//			  click: function(){
//
////				  if(ecertExemptionsCodeListGrid.anySelected()){
////
////					  if(keywordsListGrid.anySelected()){
////						  isc.ask(promptDeleteMessage_2, function (value){
////							  if (value){
////								  var keywords = "";
////								  var keywordList = [];
////								  var keywordsExemptionsCodeRecord = [];
////								  var delimiter = "";
////
////								  var keywordsarr = ecertExemptionsCodeListGrid.getSelectedRecord().keywordList;
////								  var recordnum = ecertExemptionsCodeListGrid.getRowNum(ecertExemptionsCodeListGrid.getSelectedRecord());
////
////								  for (i = 0; i < keywordsarr.length; i++) {
////
////									  if(keywordsarr[i] != keywordsListGrid.getSelectedRecord().keywords){
////										  keywordList.push(ecertExemptionsCodeListGrid.getSelectedRecord().keywordList[i]);
////
////										  if(i != 0){
////											  delimiter = "~-~";
////										  }
////
////										  if(i == keywordsarr.length-2){
////											  if(keywordsarr.length ==  keywordsListGrid.getRowNum(keywordsListGrid.getSelectedRecord())+1){
////												  delimiter = "";
////											  }else{
////												  delimiter = "~-~";
////											  }
////										  }else if(i == keywordsarr.length-1){
////											  delimiter = "";
////										  }else{
////											  delimiter = "~-~";
////										  }
////									  }
////								  }
////								  for (i = 0; i < keywordList.length; i++) {
////									  if(i != 0){
////										  delimiter = "~-~";
////									  }
////									  keywords = keywords.concat(delimiter, keywordList[i]);
////								  }
////
////								  keywordsExemptionsCodeRecord = ecertExemptionsCodeListGrid.getEditedRecord(recordnum);
////
////								  keywordsExemptionsCodeRecord['keywords'] = keywords;
////								  keywordsExemptionsCodeRecord['keywordList'] = keywordList;
////
////								  ecertExemptionsCodeListGrid.setEditValues(recordnum, keywordsExemptionsCodeRecord);
////
////								  saveEditedRecordNum(ecertExemptionsCodeListGrid, EditedExemptionsCodeFormRecord);
////
////								  keywordsListGrid.removeSelectedData();
////
////								  ecertExemptionsCodeListGrid.endEditing();
////								  ecertExemptionsCodeListGrid.saveAllEdits();
////							  }
////						  })
////
////					  }else{
////						  isc.say("No keyword is Selected.");
////					  }
////
////				  }else{
////                	  isc.say("No Exemption/Dispensation is Selected.");
////				  }
//
//			  }
//		});

		isc.DynamicForm.create({
			  ID: "remarksForm",
		      valuesManager:exemptionCodeVM,
//			  dataSource: ecertExemptionsCodeDS,
			  width:"100%",
			  height:450,
			  autoFetchData: false,
		      titleWidth:"100%",
		      disabled:true,
//		      canEdit:false,
			  fields:[
			      {name:"remarks", title:"Remarks", type: "textArea", showTitle:false, width:"100%", selectOnFocus:true, height:"100%"}
			  ],
//			  itemChanged:function(){
//				  
//				  exemptionCodeUnsaveFlag_otherParts = true;
//
//	    		  remarksForm.completeEditing();
//
//			      ecertExemptionsCodeListGrid.endEditing();
//			      ecertExemptionsCodeListGrid.saveAllEdits();
//
//				  var remarksExemptionsCodeRecord = {};
//				  remarksExemptionsCodeRecord = ecertExemptionsCodeListGrid.getSelectedRecord();
//				  remarksExemptionsCodeRecord['remarks'] = remarksForm.getValue("remarks");
//
//				  var recordnum = ecertExemptionsCodeListGrid.getRowNum(ecertExemptionsCodeListGrid.getSelectedRecord());
//
//				  ecertExemptionsCodeListGrid.setEditValues(recordnum, remarksExemptionsCodeRecord);
//
//				  saveEditedRecordNum(ecertExemptionsCodeListGrid, EditedExemptionsCodeFormRecord);
//
//	    	  },
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
//	    isc.HLayout.create({
//	    	ID:"keywordsListGridGroup",
//	    	width:"100%",
//	    	//valuesManager:valueMan,
//	    	layoutTopMargin:10,
//	    	defaultLayoutAlign: "center",
//	    	//showEdges: true,
//	    	isGroup: true,
//	    	groupTitle: "Keywords",
//	    	membersMargin:50,
//	    	members:[keywordsListGrid]
//	    });
//		isc.DynamicForm.create({
//		    ID: "keyworsDummy",
//		    width:"1",
//		    align:"left",
//		    items:[
//		        {type: "SpacerItem", width:"*"},
//		    ]
//		});
//	    isc.HLayout.create({
//	    	ID:"keywordsBtnBar",
//	    	width:"100%",
//	    	//layoutTopMargin:10,
//	    	defaultLayoutAlign: "center",
//	    	align:"center",
//	    	//showEdges: true,
//	    	membersMargin:0,
//	    	members:[addKeywordsBtn, deleteKeywordsBtn]
//	    	//members:[keyworsDummy]
//	    });
//	    keywordsBtnBar.hide();
//	    
//	    isc.VLayout.create({
//	    	ID:"keywordsGroup",
//	    	width:"100%",
//	    	//layoutTopMargin:10,
//	    	align:"top",
//	    	defaultLayoutAlign: "top",
//	    	//showEdges: true,
//	    	membersMargin:5,
//	    	members:[keywordsListGridGroup, keywordsBtnBar]
//	    });
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
        	       {name:"form_type",
        	    	type:"radioGroup",
        	    	showTitle:false,
        	    	canEdit:true,
        	    	wrap:false,
        	    	vertical:false,
        	        valueMap:["Exemption Cert","Minute"],
        	        defaultValue:"Exemption Cert",
        	        change:function(form, item, value){

//        	        	fillDicContentVMs();
        	        	ecertDicContentCombobox.setValue(null);
        	        		var formType = "";
        	       			var listgrid = "";
        	        		if(value == "Minute"){
//        	        			selectbox_DicContentVM.setValue("editing", selectbox_DicContentVM.getValue("editing_min"));
        	        			ecertDicContentVM = min_ecertDicContentVM;
//        	        			formType = "Minute";
//        	        			headingForCertForm.setGroupTitle("Heading for Min");
//
//        	        			cert_ecertDicContentSelection.getField('ecertDicContentCombobox').makePickList();
//            	        		cert_ecertDicContentSelection.getField('ecertDicContentCombobox').pickList.setData([]);
//
//        	        			ecertDicContentSelectionGroup.removeMember(cert_ecertDicContentSelection);
//        	                	ecertDicContentSelectionGroup.addMember(min_ecertDicContentSelection, 0);
//
//        	        			ecertDicItemFormGroup.removeMember(cert_hiddenEcertDicItemListGrid);
//        	        			ecertDicItemFormGroup.addMember(min_hiddenEcertDicItemListGrid, 0);
//        	        			itemlistgrid = min_hiddenEcertDicItemListGrid;
        	        		}
        	        		else
    	        			{
//        	        			selectbox_DicContentVM.setValue("editing", selectbox_DicContentVM.getValue("editing_cert"));
        	        			ecertDicContentVM = cert_ecertDicContentVM;
//        	        			formType = "Exemption Certificate";
//        	        			headingForCertForm.setGroupTitle("Heading for Cert");
//
//        	        			min_ecertDicContentSelection.getField('ecertDicContentCombobox').makePickList();
//            	        		min_ecertDicContentSelection.getField('ecertDicContentCombobox').pickList.setData([]);
//
//        	                	ecertDicContentSelectionGroup.removeMember(min_ecertDicContentSelection);
//        	                	ecertDicContentSelectionGroup.addMember(cert_ecertDicContentSelection, 0);
//
//        	        			ecertDicItemFormGroup.removeMember(min_hiddenEcertDicItemListGrid);
//        	        			ecertDicItemFormGroup.addMember(cert_hiddenEcertDicItemListGrid, 0);
//        	        			itemlistgrid = cert_hiddenEcertDicItemListGrid;

    	        			}
//            	    		ecertDicContentCombobox.setValue(selectbox_DicContentVM.getValue("editing").id);
            	    		ecertDicContentCombobox.setValue(ecertDicContentVM.getValue("id"));
        	        		ecertDicContentForm.setValuesManager( ecertDicContentVM ); 
            	    		ecertDicContentShortSummary.setValuesManager( ecertDicContentVM );

            	    		if(ecertExemptionsCodeListGrid.anySelected()){

//        	        			var record = ecertExemptionsCodeListGrid.getEditedRecord(ecertExemptionsCodeListGrid.getRowNum(ecertExemptionsCodeListGrid.getSelectedRecord()));
//        	        			//var record = ecertExemptionsCodeListGrid.getSelectedRecord();
//
//        	        			headingForCertForm.clearValues();
//        	        			if(value == "Exemption Cert" && record.subheading != null){
//            	        				headingForCertForm.setValue("subheading",record.subheading);
//        	        			}else if(value == "Minute" && record.exemption_for != null){
//            	        				headingForCertForm.setValue("subheading",record.exemption_for);
//        	        			}
//
//        	        			resetExemptionReasonsCondition(false);
//
//        	  		          	if(record.ecertDicContent.length != 0){
//        	  		          		
//        	  		          		setExemptionReasons(record.ecertDicContent, formType, cert_hiddenEcertDicContentListGrid, min_hiddenEcertDicContentListGrid, ecertDicContentForm, false);
//            	                	cert_ecertDicContentSelection.getField('ecertDicContentCombobox').makePickList();
//            	                	min_ecertDicContentSelection.getField('ecertDicContentCombobox').makePickList();
//            	                	
//        	  		          	}
//
//        	  		          	if(record.ecertDicItem.length != 0){
//        	  		          		setExemptionCondition(record.ecertDicItem, formType, cert_hiddenEcertDicItemListGrid, min_hiddenEcertDicItemListGrid, false);
//        	  		          	}else{
//        	  		          		itemlistgrid.setData([]);
//        	  		          	}
//
///*        	  		          	if(exemptionTypes != null && listgrid.getTotalRows() > 0 ){
//        	  		          		listgrid.selectAllRecords();
//        	  		          	}
//*/
        	        		}
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
	        disabled:true,
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
//	        itemChanged:function(){
	        	
//	        	exemptionCodeUnsaveFlag_otherParts = true;
//				  
//	        	headingForCertForm.completeEditing();
//
//	        	ecertExemptionsCodeListGrid.endEditing();
//	        	ecertExemptionsCodeListGrid.saveAllEdits();
//
//	        	var formType = formTypeBtn.getValue('form_type');
//
//	        	var certExemptionsCodeRecord = {};
//	        	certExemptionsCodeRecord = ecertExemptionsCodeListGrid.getSelectedRecord();
//
//	        	if(formType == "Exemption Cert"){
//	        		certExemptionsCodeRecord['subheading'] = headingForCertForm.getValue("subheading");
//		        	//certExemptionsCodeRecord['exemption_for'] = ecertExemptionsCodeListGrid.getSelectedRecord().exemption_for;
//	        	}else if(formType == "Minute"){
//	        		certExemptionsCodeRecord['exemption_for'] = headingForCertForm.getValue("subheading");
//	        		//certExemptionsCodeRecord['subheading'] = ecertExemptionsCodeListGrid.getSelectedRecord().subheading;
//	        	}
//
//	        	var recordnum = ecertExemptionsCodeListGrid.getRowNum(ecertExemptionsCodeListGrid.getSelectedRecord());
//	        	ecertExemptionsCodeListGrid.setEditValues(recordnum, certExemptionsCodeRecord);
//
//	        	saveEditedRecordNum(ecertExemptionsCodeListGrid, EditedExemptionsCodeFormRecord);

//	        },
	    });

//	    isc.DynamicForm.create({
//	        ID:"ecertDicContentForm",
//	        //dataSource:"ecertDicContentDS",
//	    	valuesManager: ecertDicContentVM,
//			width:"100%",
//			height:260,
//			//isGroup:"true",
//			//groupTitle:"Reasons of Exemption Cert",
//			titleWidth:"100%",
//			disabled:true,
//			//canEdit:false,
//			showOldValueInHover:true,
//			storeDisplayValues:true,
//	        autoFocus: true,
//	        items:[
////	        	   {name:"id", title:"ID", hidden:true},
//	               {name:"ex_code_id", title:"Exemption Code ID", hidden:true},
//	               {name:"exemption_type", title:"Exemption Type", hidden:true},
//	               {name:"form_type", title:"Form Type", hidden:true},
//	               {
//	                   type: "textArea",
//	                   name: "content",
//	                   title: "Content",
//	                   width:"100%",
//	                   height:"100%",
//	                   selectOnFocus:true,
//	                   wrapTitle:false,
//	                   showTitle:false,
//	               }
//	        ],
//
//	    });
	    
	    isc.DynamicForm.create({
	        ID:"ecertDicContentForm",
	        //dataSource:"ecertDicContentDS",
	    	valuesManager: ecertDicContentVM,
//	        valuesManager: selectbox_DicContentVM,
//	        dataPath:"editing",
			width:"100%",
			height:260,
			//isGroup:"true",
			//groupTitle:"Reasons of Exemption Cert",
			titleWidth:"100%",
			disabled:true,
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



	    isc.DynamicForm.create({
	    	ID:"cert_ecertDicContentSelection",
	    	width:65,
	        fields: [
	            {name:"ecertDicContentCombobox", ID:"ecertDicContentCombobox", title:"", showTitle:false, type:"SelectItem", canEdit:true,
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

	            	//pickListPlacement: "fillScreen",
	            	//pickListCriteria:{ex_code_id:"344",operator:"equals"},
	                pickListProperties: {
//	                	valuesManager: selectbox_DicContentVM,
//	                	dataPath: "optionList",
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
//		                formatCellValue : function (value, record, field, viewer) {
//
//	                		var removeSymbol = "";
//
//		                	for (i = 0; i < DeleteEcertDicContentRecord.length; i++) {
//			                	if(record.id == DeleteEcertDicContentRecord[i]){
//			                		removeSymbol = "<del>";
//			                	}
//		                	}
//
//		                	if(viewer == 0){
//	                			if(record.id > 0){
//		                			return removeSymbol + record.id ;
//	                			}
//	                			//if(value == undefined || value == null){
//	                			if(record.id < 0){
//		                			return removeSymbol + "New";
//	                			}
//	                		}
//
//	                		if(viewer == 1){
//	                			if(value == undefined || value == null){
//		                			return " ";
//	                			}else{
//	                				return removeSymbol + record.short_summary;
//	                			}
//	                		}
//
//	                		if(viewer == 2){
//	                			if(value == undefined || value == null){
//		                			return " ";
//	                			}else{
//			                		return removeSymbol + record.content ;
//		                		}
//	                		}
//		                 },

//			             recordClick: function(viewer, record, recordNum, field, fieldNum, value, rawValue){
//
//			            	 console.log(record);
//
//			                	var changeFlag = true;
//		                		var diccontentlistgrid = getContentListGrid( getFormType(formTypeBtn) );
//		                		var diccontentselection = getContentSelection( getFormType(formTypeBtn) );
//
//			                	if(record != null){
//			                		//Select Old Record
//				                	if(DeleteEcertDicContentRecord.length > 0){
//					                	for (i = 0; i < DeleteEcertDicContentRecord.length; i++){
//						                	if(record.id == DeleteEcertDicContentRecord[i]){
//						                		changeFlag = false;
//						                	}
//					                	}
//				                	}
//
//				                	if(changeFlag){
//
//			        	      	  		for (i = 0; i < diccontentlistgrid.getTotalRows(); i++){
//			        	      	  			if(diccontentlistgrid.getRecord(i) != null){
//				        	      	  			if(record.id == diccontentlistgrid.getRecord(i).id ){
//				        	      	  				diccontentlistgrid.selectSingleRecord(i);
//				        	      	  			}
//			        	      	  			}
//			        	      	  		}
//			        	      	  		//cert_hiddenEcertDicContentListGrid.selectSingleRecord(this.getSelectedRecord());
//			    			    		//cert_hiddenEcertDicContentListGrid.selectSingleRecord(ecertDicContentSelection.getField('ecertDicContentCombobox').getSelectedRecord());
//
//			    			    		//if( !isEmpty(diccontentlistgrid.getEditedRecord(diccontentlistgrid.getRowNum(diccontentlistgrid.getSelectedRecord()))) ){
//
//			    			    			diccontentselection.getField('ecertDicContentCombobox').setValue( diccontentlistgrid.getEditedRecord(diccontentlistgrid.getRowNum(diccontentlistgrid.getSelectedRecord())).id );
//			                	      	    ecertDicContentForm.setValue("content", diccontentlistgrid.getEditedRecord(diccontentlistgrid.getRowNum(diccontentlistgrid.getSelectedRecord())).content);
//			                	      	    ecertDicContentShortSummary.getField('short_summary').setValue( diccontentlistgrid.getEditedRecord(diccontentlistgrid.getRowNum(diccontentlistgrid.getSelectedRecord())).short_summary );
//			    			    		//}else{
//
//			    			    			//diccontentselection.getField('ecertDicContentCombobox').setValue( diccontentlistgrid.getSelectedRecord().id );
//			    			    			//ecertDicContentForm.setValue("content", diccontentlistgrid.getSelectedRecord().content);
//			                	      	    //ecertDicContentShortSummary.getField('short_summary').setValue( diccontentlistgrid.getSelectedRecord().short_summary );
//			    			    		//}
//				    	      	  		//ecertDicContentForm.setValue("content", ecertDicContentSelection.getField('ecertDicContentCombobox').getSelectedRecord().content);
//
//				                	}else{
//
//							        	diccontentlistgrid.deselectAllRecords();
//							        	ecertDicContentShortSummary.clearValues();
//							  			ecertDicContentForm.clearValues();
//
//				                	}
//			                	}else{
//			                		//Select New Record
//
//		        	      	  		for (i = 0; i < diccontentlistgrid.getTotalRows(); i++){
//		        	      	  			if(diccontentlistgrid.getEditedRecord(i).id == diccontentselection.getField('ecertDicContentCombobox').pickList.getEditedRecord(recordNum).id){
//
//		        	      	  				diccontentlistgrid.selectSingleRecord(i);
//		        	      	  				diccontentselection.getField('ecertDicContentCombobox').setDefaultValue();
//		        	      	  				diccontentselection.getField('ecertDicContentCombobox').clearValue();
//				        	      	  		ecertDicContentForm.setValue("content", diccontentlistgrid.getEditedRecord(i).content);
//				        	      	  		ecertDicContentShortSummary.getField('short_summary').setValue( diccontentlistgrid.getEditedRecord(i).short_summary );
//		        	      	  			}
//		        	      	  		}
//			                	}
//			                	diccontentselection.getField('ecertDicContentCombobox').pickList.hide();
//
//			             },
		      			 selectionChanged:function(record, state){
		      				if(state)	// do below with newly selected record
		      				{
//		      					selectbox_DicContentVM.setValue("editing", record);
//		      					if(record.form_type == "Minute")
//	      						{
//		      						selectbox_DicContentVM.setValue("editing_min", record);
//	      						}
//		      					else
//	      						{
//		      						selectbox_DicContentVM.setValue("editing_cert", record);
//	      						}
		      					Object.assign(ecertDicContentVM.old_item, ecertDicContentVM.getValues() );
		      					ecertDicContentVM.setValues(record); 
		      					ecertDicContentVM.old_item = record;
		      				}
		      				else	// do below with the un-selected record
		      				{
		      					Object.assign(ecertDicContentVM.old_item, ecertDicContentVM.getValues() );
		      					ecertDicContentVM.clearValues();
		      					ecertDicContentVM.old_item = {};
		      				}
		      			 },
	                },

	                getPickListFilterCriteria: function() {
	        	  		if(ecertExemptionsCodeListGrid.anySelected()){
	        	  			if(formTypeBtn.getValue('form_type') == "Minute")
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
//	                click: function(){
//
//	                	var diccontentselection = getContentSelection( getFormType(formTypeBtn) );
//	                	var diccontentlistgrid = getContentListGrid( getFormType(formTypeBtn) );
//	                	
//	                	if(!ecertExemptionsCodeListGrid.anySelected()){
//	                		isc.say("No Exemption/Dispensation is Selected.");
//	                	}else{
//	                		diccontentselection.getField('ecertDicContentCombobox').makePickList();
//	                		//diccontentselection.getField('ecertDicContentCombobox').pickList.setData([]);
//	                			                		
//	                		for (h = 0; h < diccontentlistgrid.getTotalRows(); h++){
//	                			if(diccontentlistgrid.getEditedRecord(h).id < 0){
//	    	                		diccontentselection.getField('ecertDicContentCombobox').pickList.setEditValues(h, diccontentlistgrid.getEditedRecord(h));	                				
//	                			}
//	                		}
//	                		
//	                		diccontentselection.getField('ecertDicContentCombobox').pickList.endEditing();
//	                		diccontentselection.getField('ecertDicContentCombobox').pickList.show();
//	                	}
//	                },
	                //headerMenuButtonClick: function(){
	                //headerBarContextClick: function(){
	                	//var diccontentselection = getContentSelection( getFormType(formTypeBtn) );
	                	//diccontentselection.getField('ecertDicContentCombobox').pickList.show();
	                //}

	                //ecertDicContentSelection.getField('ecertDicContentCombobox').setValueMap([])
/*	                selectValue: function() {

	                	if(formTypeBtn.getValue('form_type') == "Exemption Cert"){
	                		return cert_hiddenEcertDicContentListGrid.getSelectedRecord();
	                	}else if(formTypeBtn.getValue('form_type') == "Minute"){
	                		return min_hiddenEcertDicContentListGrid.getSelectedRecord();
	                	}

	                },
	                changed: function(value){

        	        }
	                click: function(){
	                	ecertDicContentSelection.getField('ecertDicContentCombobox').pickList.endEditing();
	                },
*/
	            }
	        ],
	    });

	    
//	    isc.DynamicForm.create({
//	    	ID:"ecertDicContentShortSummary",
//	    	valuesManager: ecertDicContentVM,
//	    	width:"300",
//	    	disabled:true,
//	    	//canEdit: false,
//	        fields: [
//		               {name: "short_summary", title: "Short Summary", width:"300", height:"21", showTitle:false}
//	        ],
//
//	    });
	    
	    isc.DynamicForm.create({
	    	ID:"ecertDicContentShortSummary",
	    	valuesManager: ecertDicContentVM,
//	    	valuesManager: selectbox_DicContentVM,
	    	width:"300",
	    	disabled:true,
	    	//canEdit: false,
	        fields: [
		               {name: "short_summary", title: "Short Summary", width:"300", height:"21", showTitle:false}
	        ],

	    });


	    isc.IButton.create({
	  	  ID: "addEcertDicContentBtn",
	  	  autoDraw: false,
	  	  width:70,
	  	  layoutAlign:"center",
	  	  title:"Add",
	  	  //---start 00001----
	  	  onControl:"EXEMPT_CODE_WRITE||FSQC_ALL",
	  	  //---end 00001----
	  	  click:function () {

	  	  }
	    });
	    isc.IButton.create({
		  ID: "deleteEcertDicContentBtn",
		  autoDraw: false,
		  width:70,
		  layoutAlign:"center",
		  title: "Delete",
		  //--start 00001 ---
		  onControl:"FSQC_ALL||EXEMPT_CODE_WRITE",
		  //---end 00001 ==
		  click:function(){


		  }
		});

//	    var DicItemDS = ecertDicItemDS;
//	    DicItemDS.fields.push({name:"cb_sel", type:"boolean", canToggle:true, shouldSaveValue:false, defaultValue:false});
	    isc.ListGrid.create({
	    	  ID:"cert_hiddenEcertDicItemListGrid",
	    	  valuesManager: exemptionCodeVM,
	    	  dataPath:"ecertDicItem",
	    	  //alternateRecordStyles:true,
	    	  width:"100%",
	    	  height:340,
	    	  overflow:"auto",
//	    	  dataSource:DicItemDS,
	    	  dataSource:ecertDicItemDS,
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
//	    	  editOnFocus: true,
//	    	  editEvent: "click",
	    	  selectionAppearance:"checkbox",
	    	  selectionType: "simple",
	    	  showFilterEditor:false,
	    	  modalEditing: true,
	    	  layoutTopMargin:10,
	    	  isGroup:"true",
	    	  groupTitle:"Condition of Exemption Cert",


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


              
//	    	  rowClick:function(record, recordNum, fieldNum){
//
//	    			if(this.canEdit){
//	    				this.startEditing(recordNum, fieldNum);
//	    			}
//	    	  },
//	    	  editComplete :function(rowNum, colNum, newValues, oldValues, editCompletionEvent){
//	    		  
//	    		  exemptionCodeUnsaveFlag_otherParts = true;
//				  
//			  },
//	          cellChanged :function(record, newValue, oldValue, rowNum, colNum, grid){
//
//		          var itemRecord = [];
//				  var recordnum = ecertExemptionsCodeListGrid.getRowNum(ecertExemptionsCodeListGrid.getSelectedRecord());
//				  itemRecord = ecertExemptionsCodeListGrid.getEditedRecord(recordnum);
//
//	        	  if( record.id != null ){
//
//		        		//edit Record
//			            for (i = 0; i < itemRecord.ecertDicItem.length; i++) {
//			            	if(itemRecord.ecertDicItem[i].id == this.getEditedRecord(rowNum).id){
//			            		itemRecord.ecertDicItem[i].content = this.getEditedRecord(rowNum).content;
//			            		itemRecord.ecertDicItem[i].sort = this.getEditedRecord(rowNum).sort;
//			            	}
//			            }
//			        	ecertExemptionsCodeListGrid.setEditValues(recordnum, itemRecord);
//
//			        	saveEditedRecordNum(ecertExemptionsCodeListGrid, EditedExemptionsCodeFormRecord);
//	        	  }else if( record.id == null ){
//
//		        		//New Record
//	        		    var newItemRecord = this.getEditedRecord(rowNum);
//
//	        		    newItemRecord.id = tempNew_ecertDicItemId;
//
//					  	tempNew_ecertDicItemId = tempNew_ecertDicItemId - 1;
//
//						itemRecord.ecertDicItem.push(newItemRecord);
//						this.setEditValues(rowNum, newItemRecord);
//			        	ecertExemptionsCodeListGrid.setEditValues(recordnum, itemRecord);
//
//			        	saveEditedRecordNum(ecertExemptionsCodeListGrid, EditedExemptionsCodeFormRecord);
//	        	  }
//	          }

			  //rowEditorExit:function(editCompletionEvent, record, newValues, oldValue, rowNum){
			  //editComplete:function(record, rowNum, colNum, newValues, oldValues, editCompletionEvent){
			  //rowHasChanges:function(rowNum){
			  //editorExit :function(editCompletionEvent, record, newValue, rowNum, colNum){
	    	  //rowEditorEnter :function(record, editValues, rowNum){

	    });
	    
	    isc.IButton.create({
		  	  ID: "addEcertDicItemBtn",
		  	  autoDraw: false,
		  	  width:70,
		  	  layoutAlign:"center",
		  	  title: "Add",
		  	  //--start 00001-----
		  	  onControl:"FSQC_ALL||EXEMPT_CODE_WRITE",
		  	  //---end 00001----
		  	  click : function () {

		  	  }
		    });
		isc.IButton.create({
			  ID: "deleteEcertDicItemBtn",
			  autoDraw: false,
			  width:70,
			  layoutAlign:"center",
			  title: "Delete",
			  //--start 00001 ---
			  onControl:"FSQC_ALL||EXEMPT_CODE_WRITE",
			  //---end 00001 ==
			  click:function(){


			  }
		});

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
	    	members:[headingForCertForm]
	    });

	    isc.VLayout.create({
	    	ID:"ecertDicContentBtnBar",
	    	//width: "50%",
	    	//layoutTopMargin:10,
	    	defaultLayoutAlign:"top",
	    	align:"top",
	    	showEdges: false,
	    	membersMargin:5,
	    	members:[addEcertDicContentBtn, deleteEcertDicContentBtn]
	    	//members:[]
    		//members:[ecertDicContentSelection,  addEcertDicContentBtn, deleteEcertDicContentBtn]
	    });
	    ecertDicContentBtnBar.hide();
	    isc.VLayout.create({
	    	ID:"ecertDicItemBtnBar",
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

	    isc.HLayout.create({
	    	ID:"ecertDicContentSelectionGroup",
	    	width:"100%",
	    	//height:300,
	    	//layoutTopMargin:10,
	    	align:"left",
	    	defaultLayoutAlign: "left",
	    	showEdges: false,
	    	membersMargin:1,
	    	members:[cert_ecertDicContentSelection, ecertDicContentShortSummary]
	    });

	    isc.VLayout.create({
	    	ID:"ecertDicContentPane",
	    	width: "100%",
	    	layoutTopMargin:8,
	    	VerticalAlignment:"top",
	    	showEdges: false,
			isGroup:"true",
			groupTitle:"Reasons of Exemption Cert",
	    	membersMargin:5,
	    	//members:[ecertDicItemRecordCount, ecertDicItemSpinner, addEcertDicItemBtn, deleteEcertDicItemBtn]
	    	//members:[addEcertDicItemBtn, deleteEcertDicItemBtn]
    		members:[ecertDicContentSelectionGroup, ecertDicContentForm]
	    });

	    isc.HLayout.create({
	    	ID:"ecertDicContentFormGroup",
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

	    isc.HLayout.create({
	    	ID:"ecertDicItemFormGroup",
	    	width:"100%",
	    	//height:300,
	    	//layoutTopMargin:10,
	    	defaultLayoutAlign: "center",
	    	showEdges: false,
	    	membersMargin:5,
	    	//members:[ecertDicItemForm, ecertDicItemBtnBar]
    		members:[cert_hiddenEcertDicItemListGrid, ecertDicItemBtnBar]
//	    	members:[ ecertDicItemBtnBar]
	    });

	    isc.VLayout.create({
	    	ID:"LeftColumn",
	    	width:"50%",
	    	//layoutTopMargin:10,
	    	defaultLayoutAlign: "center",
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
	    	members:[formTypeBtnBar, headingForCertFormGroup, ecertDicContentFormGroup, ecertDicItemFormGroup]
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
	    
        if(formTypes == "cert"){

//        	formTypeBtn.getItem('form_type').setValueMap(["Exemption Cert"]);

        }else if(formTypes == "minute"){

//        	formTypeBtn.getItem('form_type').setValueMap(["Minute"]);
//        	formTypeBtn.getItem('form_type').setValue("Minute");
//
//        	ecertDicContentSelectionGroup.removeMember(cert_ecertDicContentSelection);
//        	ecertDicContentSelectionGroup.addMember(min_ecertDicContentSelection, 0);
//
//		  	ecertDicItemFormGroup.removeMember(cert_hiddenEcertDicItemListGrid);
//		  	ecertDicItemFormGroup.addMember(min_hiddenEcertDicItemListGrid, 0);
        }

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
		    closeClick : function(){
//		    	
//				ecertExemptionsCodeListGrid.endEditing();
//  				keywordsListGrid.endEditing();
//			    cert_hiddenEcertDicItemListGrid.endEditing();
//  			    min_hiddenEcertDicItemListGrid.endEditing();
//		    	
//		    	if(exemptionCodeUnsaveFlag_mainGrid || exemptionCodeUnsaveFlag_otherParts){
//		    		isc.ask("Edited content(s) is/are not saved. Are you sure to close?", function(value){
//		    				  if (value){
//		    					  
//								  resetVariables();
//		    					  ExemptionCodeWindow.hide();
//		    				  }
//		    		});
//		    	}else{
//					  resetVariables();
//					  ExemptionCodeWindow.hide();		    		
//		    	}
		    },
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

	function clean_LG_Select( arrayFromLG )
	{
        if(Array.isArray(arrayFromLG))
		{
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
				}
			);
		}
        return arrayFromLG;
	}
	
	function fillDicContentVMs(){
//		var formTyCrit = "";
//		
//		if(formTypeBtnValue == "Minute")
//		{
//			formTyCrit = "Minute";
//			ecertDicContentVM = min_ecertDicContentVM;
//    	}
//		else
//		{
//			formTyCrit = "Exemption Certificate";
//			ecertDicContentVM = cert_ecertDicContentVM;
//		}
//		ecertDicContentForm.setValuesManager( ecertDicContentVM ); 
//		ecertDicContentShortSummary.setValuesManager( ecertDicContentVM ); 
		
//		ecertDicContentCombobox.makePickList();

//		  ecertDicContentCombobox.makePickList();
//		  ecertDicContentCombobox.getFirstOptionValue();
//		  ecertDicContentCombobox.getFirstOptionValue();
//		  ecertDicContentCombobox.selectItemFromValue(ecertDicContentCombobox.getFirstOptionValue());
//		  ecertDicContentCombobox.setValue(ecertDicContentCombobox.getFirstOptionValue());

//		  ecertDicContentVM.setValues(record.ecertDicContent[0]);	// Can I get away with not checking null?

//		var selectbox_DicContent_record = 
//		{
//				editing: {}
//				, editing_cert: {}
//				, editing_min: {}
//				, optionList: []
//		};
//		selectbox_DicContentVM.setValues(selectbox_DicContent_record);
		
		min_ecertDicContentVM.clearValues();
		cert_ecertDicContentVM.clearValues();
		

//		selectbox_DicContent_record.optionList = exemptionCodeVM.getValue("ecertDicContent");
		var found_cert = false;
		var found_min = false;
		if(Array.isArray(exemptionCodeVM.getValue("ecertDicContent")))
		{
			
			exemptionCodeVM.getValue("ecertDicContent").forEach(
				function(item,index){
//					var tmp_obj = {};
//					for(var k in item)
//					{
//						if(k.substring(0,1) != "_")
//						{
//							tmp_obj[k]=item[k];
//						}
//						
//					}
//					selectbox_DicContent_record.optionList.push(tmp_obj);

					if( item.form_type == "Minute" )
					{
						if(!found_min)
						{
							min_ecertDicContentVM.setValues(item);
							min_ecertDicContentVM.old_item = item;
							found_min = true;
//							selectbox_DicContent_record.editing_min = tmp_obj; 
						}
					}
					else
					{
						if(!found_cert)
						{
							cert_ecertDicContentVM.setValues(item);
							cert_ecertDicContentVM.old_item = item;
							found_cert = true;
//							selectbox_DicContent_record.editing_cert = tmp_obj; 
//							selectbox_DicContent_record.editing = tmp_obj; 
						}
					}
				}
			);
			
//			for (i = 0; i < selectbox_DicContent_record.optionList.length; i++)
//			{
//				
//				
//				if( selectbox_DicContent_record.optionList[i].form_type == "Minute" )
//				{
//					if(!found_min)
//					{
////						min_ecertDicContentVM.setValues(selectbox_DicContent_record.optionList[i]);
//						found_min = true;
//						selectbox_DicContent_record.editing_min = selectbox_DicContent_record.optionList[i]; 
//					}
//				}
//				else
//				{
//					if(!found_cert)
//					{
////						cert_ecertDicContentVM.setValues(selectbox_DicContent_record.optionList[i]);
//						found_cert = true;
//						selectbox_DicContent_record.editing_cert = selectbox_DicContent_record.optionList[i]; 
//						selectbox_DicContent_record.editing = selectbox_DicContent_record.optionList[i]; 
//					}
//				}
//				
//			}
			
//			ecertDicContentCombobox.picklist.setData(filteredList);
//			ecertDicContentCombobox.makePickList();
//			ecertDicContentCombobox.getFirstOptionValue();
////			ecertDicContentCombobox.getFirstOptionValue();
//			ecertDicContentCombobox.selectItemFromValue(ecertDicContentCombobox.getFirstOptionValue());
//			ecertDicContentCombobox.setValue(ecertDicContentVM.getValue("id"));
		
		}
//		selectbox_DicContentVM.setValues(selectbox_DicContent_record);
	}
	
	function setRecordToVM(record)
	{
//		record.keywordList_arr = [];
//		if(record.keywordList != null)
//		{
//			var tmpArr = record.keywordList;
//			tmpArr.forEach(appendKeyword);
//			  
//			function appendKeyword(item, index)
//			{
//				record.keywordList_arr.push({keyword:item, seq:index});
//			}
//		}

//		var tmp_contentLGdata = [];
//		if(Array.isArray(record.ecertDicContent))
//		{
//			record.ecertDicContent.forEach(
//				function(item,index)
//				{
//					var new_LGItem = {};
////					for(var k in ecertDicItemDS.fields)
//					for(var k in item)
//					{
//						if(k.substring(0,1) != "_")
//						{
//							new_LGItem[k]=item[k];
//						}
//						
//					}
//					tmp_contentLGdata.push(new_LGItem);
//				}
//			);
//		}		
//		record.ecertDicContent = tmp_contentLGdata;

		
//		var tmp_LGdata = [];
//		if(Array.isArray(record.ecertDicItem))
//		{
//			record.ecertDicItem.forEach(
//				function(item,index)
//				{
//					var new_LGItem = {};
//					for(var k in ecertDicItemDS.fields)
////					for(var k in item)
//					{
//						if(k.substring(0,1) != "_")
//						{
//							new_LGItem[k]=item[k];
//						}
//						
//					}
//					tmp_LGdata.push(new_LGItem);
//				}
//			);
//		}		
//		record.ecertDicItem = tmp_LGdata;

		if(record != null)
		{
			record.ecertDicContent = clean_LG_Select( record.ecertDicContent );
		}
		
		if(record != null)
		{
			record.ecertDicItem = clean_LG_Select( record.ecertDicItem );
		}
		
		
//		if(Array.isArray(record.ecertDicItem))
//		{
//			record.ecertDicItem.forEach(
//				function(item,index)
//				{
//					item.cb_sel = true;
//				}
//			);
//		}

		
		exemptionCodeVM.setValues(record); 
		ecertExemptionsCodeListGrid.oldSelection = record;
//		ecertDicContentCombobox.pickList.setData(exemptionCodeVM.getValue("ecertDicContent"));
//		ecertDicContentCombobox.makePickList();
		fillDicContentVMs();
		ecertDicContentCombobox.setValue(ecertDicContentVM.getValue("id"));
//		ecertDicContentCombobox.setValue(selectbox_DicContentVM.getValues().editing.id);
		
//		cert_hiddenEcertDicItemListGrid.selectAllRecords();
//		cert_hiddenEcertDicItemListGrid.getField("cb_sel").shouldSaveValue = false;
//	    cert_hiddenEcertDicItemListGrid.getCheckboxField().shouldSaveValue = false;
//		tmp_LGdata = tmp_LGdata.concat( exemptionCodeVM.getValue("ecertDicItem") );
//		cert_hiddenEcertDicItemListGrid.setData(tmp_LGdata);

	}
	
	function mergeChangesToVM(){
		var recordnum = ecertExemptionsCodeListGrid.getRowNum(ecertExemptionsCodeListGrid.oldSelection);
		if(
			ecertExemptionsCodeListGrid.rowHasChanges(recordnum) && 
			ecertExemptionsCodeListGrid.oldSelection != null
		)
		{
			ecertExemptionsCodeListGrid.oldSelection.row_changed = "*";
		}
		ecertExemptionsCodeListGrid.endEditing();
		ecertExemptionsCodeListGrid.saveAllEdits();
		
        
//        var keywordList = exemptionCodeVM.getValue("keywordList");
//        var tmp_arr = exemptionCodeVM.getValue("keywordList_arr");
//        if(Array.isArray(tmp_arr))
//    	{
//        	var old_str = "";
//        	var new_str = "";
//        	var new_keywordList = [];
//        	tmp_arr.forEach(
//	        	function (item, index)
//	        	{
//	        		if(item.keyword == null || item.keyword == "")
//        			{
//	        			return;
//        			}
//	        		new_str = new_str + item.keyword;
//	        		new_keywordList.push(item.keyword);
//	        	}
//        	);
//
//        	if(Array.isArray(keywordList))
//    		{
//        		keywordList.forEach(
//    	        	function (item, index)
//    	        	{
//    	        		if(item == null || item == "")
//            			{
//    	        			return;
//            			}
//    	        		old_str = old_str + item;
//    	        	}
//            	);
//    		}
//        	
//        	
//        	if(old_str != new_str)
//    		{
//        		exemptionCodeVM.setValue("keywordList", new_keywordList);
//    		}
//    	}

		Object.assign(cert_ecertDicContentVM.old_item, cert_ecertDicContentVM.getValues() );
		Object.assign(min_ecertDicContentVM.old_item, min_ecertDicContentVM.getValues() );

		
        var clean_select = exemptionCodeVM.getValue("ecertDicContent");
		clean_select = clean_LG_Select( clean_select );
//        if(Array.isArray(clean_select))
//		{
//        	clean_select.forEach(
//				function(item,index)
//				{
//					for(var k in item)
//					{
//						if(k.substring(0,1) == "_")
//						{
//							delete item[k];
//						}
//						
//					}
//				}
//			);
//		}		
        
        clean_select = exemptionCodeVM.getValue("ecertDicItem");
		clean_select = clean_LG_Select( clean_select );
//        if(Array.isArray(clean_select))
//		{
//        	clean_select.forEach(
//				function(item,index)
//				{
//					for(var k in item)
//					{
//						if(k.substring(0,1) == "_")
//						{
//							delete item[k];
//						}
//						
//					}
//				}
//			);
//		}	
        
//		var tmp_LGdata = cert_hiddenEcertDicItemListGrid.getData();
//		var tmp_VMdata = [];
//		if(Array.isArray(tmp_LGdata))
//		{
//			tmp_LGdata.forEach(
//				function(item,index)
//				{
//					var new_VMItem = {};
//					for(var k in ecertDicItemDS.fields)
////					for(var k in item)
//					{
//						if(k.substring(0,1) == "_")
//						{
////							alert(k);
//						}
//						else
//						{
//							new_VMItem[k]=item[k];
//						}
//						
//					}
//					tmp_VMdata.push(new_VMItem);
////					console.log(new_VMItem);
//				}
//			);
//		}
//		exemptionCodeVM.setValue("ecertDicItem", tmp_VMdata);
        
		if(exemptionCodeVM.valuesHaveChanged() && ecertExemptionsCodeListGrid.oldSelection != null)
		{
			ecertExemptionsCodeListGrid.oldSelection.row_changed = "*";
//			Object.assign(this.oldSelection, exemptionCodeVM.getValues() );
			ecertExemptionsCodeListGrid.oldSelection.remarks = exemptionCodeVM.getValue("remarks");
//			ecertExemptionsCodeListGrid.oldSelection.keywords = exemptionCodeVM.getValue("keywords");
//			ecertExemptionsCodeListGrid.oldSelection.keywordList = exemptionCodeVM.getValue("keywordList");
			ecertExemptionsCodeListGrid.oldSelection.exemption_for = exemptionCodeVM.getValue("exemption_for");
			ecertExemptionsCodeListGrid.oldSelection.subheading = exemptionCodeVM.getValue("subheading");
			ecertExemptionsCodeListGrid.oldSelection.ecertDicContent = exemptionCodeVM.getValue("ecertDicContent");
			ecertExemptionsCodeListGrid.oldSelection.ecertDicItem = exemptionCodeVM.getValue("ecertDicItem");
//			ecertExemptionsCodeListGrid.applyRecordData(this.oldSelection); 
		
//			isc.say("VM Changed.");
		}


		ecertExemptionsCodeListGrid.setEditValues(recordnum, ecertExemptionsCodeListGrid.oldSelection);
		exemptionCodeVM.setValues(ecertExemptionsCodeListGrid.oldSelection); 
		
		
//		  record.keywordList_arr = [];
//		  if(record.keywordList != null)
//		  {
//			  var tmpArr = record.keywordList;
//			  tmpArr.forEach(appendKeyword);
//			  
//			  function appendKeyword(item, index)
//			  {
//				  record.keywordList_arr.push({keyword:item, seq:index});
//			  }
//		  }
    }
	
	//----------------------- Query Search part ---------------------------------
	var resultData = {};
	var getNthResult = 0;

	function mergeResultData(resultData, data){
		var found = false;
		var origRecCnt = 0;
		Object.keys(resultData).forEach(function(item, index){
			if (isc.isA.Number(parseInt(index, 10)))
				origRecCnt++;
		});

		for (var field in data) {
			if (!isc.isA.Number(parseInt(field, 10)))
				continue;
			found = false;

			for (var property in resultData) {
				if (!isc.isA.Number(parseInt(property, 10)))
					continue;
				if (!isNull(resultData[property]["id"]) && !isNull(data[field]["id"])) {
					if (resultData[property]["id"] == data[field]["id"]) {
						found = true;
						break;
					}
				}
			}
			if (!found){
				resultData[origRecCnt] = data[field];
				origRecCnt++;
			}
		}
	}
	
	function handleResultData(dsResponse, data, dsRequest){
		getNthResult++;
		//clear ListGrid??
		if (getNthResult == 1){
			resultData = data;
		}else{
			mergeResultData(resultData, data);
			//Object.assign(resultData, data);
		}

		if (getNthResult == 6) {
			console.log("resultData: " + resultData);
			ecertExemptionsCodeListGrid.setData(resultData);
			return;
		}
	}
	
	function filterWithOrOnMultipleFields(search, exemptionTypes) {
		resultData = {};
		getNthResult = 0;
		ecertExemptionsCodeListGrid.setData([]);
		console.log("exemptionTypes~~~~");
		console.log(exemptionTypes);
		//alert("how?");

		if(exemptionTypes == undefined || exemptionTypes == null || exemptionTypes == ""){
			
			ecertExemptionsCodeDS.fetchData({"level_no1": search}, function(dsResponse, data, dsRequest) {
				if (dsResponse.status == 0) {
					handleResultData(dsResponse, data, dsRequest);
				}
		    });
			ecertExemptionsCodeDS.fetchData({"level_no2": search}, function(dsResponse, data, dsRequest) {
				if (dsResponse.status == 0) {
					handleResultData(dsResponse, data, dsRequest);
				}
		    });
			ecertExemptionsCodeDS.fetchData({"level_no3": search}, function(dsResponse, data, dsRequest) {
				if (dsResponse.status == 0) {
					handleResultData(dsResponse, data, dsRequest);
				}
		    });
			ecertExemptionsCodeDS.fetchData({"level_no4": search}, function(dsResponse, data, dsRequest) {
				if (dsResponse.status == 0) {
					handleResultData(dsResponse, data, dsRequest);
				}
		    });
			ecertExemptionsCodeDS.fetchData({"level_no5": search}, function(dsResponse, data, dsRequest) {
				if (dsResponse.status == 0) {
					handleResultData(dsResponse, data, dsRequest);
				}
		    });
			ecertExemptionsCodeDS.fetchData({"keywords": search}, function(dsResponse, data, dsRequest) {
				if (dsResponse.status == 0) {
					handleResultData(dsResponse, data, dsRequest);
				}
		    });

		}else{
			
			ecertExemptionsCodeDS.fetchData({"level_no1": search, "exemption_type": exemptionTypes}, function(dsResponse, data, dsRequest) {
				if (dsResponse.status == 0) {
					handleResultData(dsResponse, data, dsRequest);
				}
		    });
			ecertExemptionsCodeDS.fetchData({"level_no2": search, "exemption_type": exemptionTypes}, function(dsResponse, data, dsRequest) {
				if (dsResponse.status == 0) {
					handleResultData(dsResponse, data, dsRequest);
				}
		    });
			ecertExemptionsCodeDS.fetchData({"level_no3": search, "exemption_type": exemptionTypes}, function(dsResponse, data, dsRequest) {
				if (dsResponse.status == 0) {
					handleResultData(dsResponse, data, dsRequest);
				}
		    });
			ecertExemptionsCodeDS.fetchData({"level_no4": search, "exemption_type": exemptionTypes}, function(dsResponse, data, dsRequest) {
				if (dsResponse.status == 0) {
					handleResultData(dsResponse, data, dsRequest);
				}
		    });
			ecertExemptionsCodeDS.fetchData({"level_no5": search, "exemption_type": exemptionTypes}, function(dsResponse, data, dsRequest) {
				if (dsResponse.status == 0) {
					handleResultData(dsResponse, data, dsRequest);
				}
		    });
			ecertExemptionsCodeDS.fetchData({"keywords": search, "exemption_type": exemptionTypes}, function(dsResponse, data, dsRequest) {
				if (dsResponse.status == 0) {
					handleResultData(dsResponse, data, dsRequest);
				}
		    });

		}
	}
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
		ecertDicContentBtnBar.show();
		ecertDicItemBtnBar.show();	
	}
	else
	{
//		keywordsBtnBar.hide();
		ecertDicContentBtnBar.hide();
		ecertDicItemBtnBar.hide();	
	}
	ecertExemptionsCodeListGrid.setCanEdit(bool);
	
	remarksForm.setDisabled(!bool);
    headingForCertForm.setDisabled(!bool);
//    keywordsListGrid.setCanEdit(bool);
    
    ecertDicContentForm.setDisabled(!bool);
    ecertDicContentShortSummary.setDisabled(!bool);

    cert_hiddenEcertDicItemListGrid.setCanEdit(bool);
    
//	addKeywordsBtn.setDisabled(!bool);
//	deleteKeywordsBtn.setDisabled(!bool);
	addEcertDicContentBtn.setDisabled(!bool);
	deleteEcertDicContentBtn.setDisabled(!bool);
	addEcertDicItemBtn.setDisabled(!bool);
	deleteEcertDicItemBtn.setDisabled(!bool);

}


//function enableAllComponents(){
//	ecertExemptionsCodeListGrid.setCanEdit(true);
//	
//	remarksForm.setDisabled(false);
//    headingForCertForm.setDisabled(false);
//    keywordsListGrid.setCanEdit(true);
//    
//    ecertDicContentForm.setDisabled(false);
//    ecertDicContentShortSummary.setDisabled(false);
//
//    cert_hiddenEcertDicItemListGrid.setCanEdit(true);
//    
//	addKeywordsBtn.setDisabled(false);
//	deleteKeywordsBtn.setDisabled(false);
//	addEcertDicContentBtn.setDisabled(false);
//	deleteEcertDicContentBtn.setDisabled(false);
//	addEcertDicItemBtn.setDisabled(false);
//	deleteEcertDicItemBtn.setDisabled(false);
//
//}
//
//function disableAllComponents(){
//	ecertExemptionsCodeListGrid.setCanEdit(false);
//	
//	remarksForm.setDisabled(true);
//	headingForCertForm.setDisabled(true);
//	keywordsListGrid.setCanEdit(false);
//
//	ecertDicContentForm.setDisabled(true);
//	ecertDicContentShortSummary.setDisabled(true);
//	
//	cert_hiddenEcertDicItemListGrid.setDisabled(true);
//
//	addKeywordsBtn.setDisabled(true);
//	deleteKeywordsBtn.setDisabled(true);
//	addEcertDicContentBtn.setDisabled(true);
//	deleteEcertDicContentBtn.setDisabled(true);
//	addEcertDicItemBtn.setDisabled(true);
//	deleteEcertDicItemBtn.setDisabled(true);
//
//}
