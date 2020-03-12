/***************************************************************************************************************
* Qualified Name	 	/webui/src/main/webapp/js/fsqcdb_exemptions/fsqcExemptionsMain.js
* @author 				Dicky Lee
* @since				2019-08-09
* **************************************************************************************************************
* Change log:
* log no	Change complete date	Developer			Change Reason
* ======	====================	=========			=============
* 00000		2019-08-09				Dicky Lee			Initial Implementation
* 00001		2019-09-03				Dicky Lee			add access control
* 00002		2019-09-05				Jacky Ng			remove duplicated functions
****************************************************************************************************************/

console.log("fsqcExemptionsMain.js loaded.  \r\n");



if (msmcCalledFrHistoryOfWork){
    selectCompleteCancelCheckbox();
    msmcCalledFrHistoryOfWork = false;
}

function findExemptions(){
	console.log("enter findExemptions()");

    exemptions_SearchResultListLG.setData([]);
    var criteria = frm_exemptions_SearchMainCriteria.getValuesAsCriteria(false);
    
  
    var criteriaInFilterEditor = exemptions_SearchResultListLG.getFilterEditorCriteria();
    
    console.log("criteria for fsqcExemptionsMain.js: " + JSON.stringify(criteria));
  
    criteria = mergeCriteria(criteriaInFilterEditor, criteria);
    
    var paramAlarm_type =frm_exemptions_SearchMainCriteria.getValues("alarm_type"); 
    
    exemptions_SearchResultListLG.fetchData(criteria
    , function(dsResponse, data, dsRequest) {
        var c = searchResultPreText1 + dsResponse.totalRows + searchResultPostText1;
        exemptionsSearchResultListLGSummary.setContents(c);
    }
    ,{"operationId":"FIND_EXEMPTION" ,data: criteria,params:{"alarm_type":paramAlarm_type}});

    console.log("leave findExemptions()");
}

var new_exCert_base = {};


isc.SearchForm.create({
	ID: "frm_exemptions_SearchMainCriteria",    
    align:"left",
    width:"90%",
    numCols:8,
    membersMargin:5,
    saveOnEnter:true,
    submit:function(){
		btnExemptionSearch.click();
	},
    colWidths: [100,150, 100, 100, 100,100,100,100],
    autoDraw:false,
    fields: [
    	 {name: "spname", ID: "ecertRecordSearch_spname", title:"Ship's name:", type:"select", width:"100%" 
				, optionDataSource:"fsqcShipDS"
				, valueField:"Spname"
				, displayField:"Spname"
				, allowEmptyValue: true
				, autoFetchData: true
				, filterLocally: true
				, cachePickListResults: true
				, useClientFiltering: true
				, fetchDelay: 500
				, pickListFields:[
//						{name:"Com_cd"},
//					{name:"Del_mark", width: "*"},
					{name:"Spname", width: "*"},
					{name:"Imono", autoFitWidth:true},
					{name:"Signno", autoFitWidth:true}
				]
				, pickListProperties: {
				    showFilterEditor:true
//				    , filterOnKeypress: false
				    , alternateRecordStyles:false
				}
    	 		, pickListCriteria: {
    	 			Del_mark: ["F","P","A"]
    	 		}
				, pickListWidth:650
				, sortField: "Spname"
				, change: function(form, item, value, oldValue){
					new_exCert_base = {};
					console.log(value);
					if(ecertRecordSearch_spname.getSelectedRecord().Imono)
					{
						getExemptionShip(	// function from "js/fsqcdb_ship/fsqcShipProfileExemptionTab.js"
							ecertRecordSearch_spname.getSelectedRecord()
							, function(new_cert){ 
								new_exCert_base = new_cert
							}
						);
					}
				}
				, changed: function(form, item, value)
				{
					var criteriaInFilterEditor = exemptions_SearchResultListLG.getFilterEditorCriteria();
					delete criteriaInFilterEditor["spname"];
					exemptions_SearchResultListLG.setFilterEditorCriteria(criteriaInFilterEditor);
					btnExemptionSearch.click();
				}
    	 },
    	 {name: "imono", title:"IMO No.:",type:"text", width:"100%" },
    	 {name: "case_closed" ,title:"Case Closed:",width:80,
    		 valueMap:["ALL","NO","YES"], defaultValue:"NO",
    		 },
    	      	 
    		     	 
    	 //{name: "company_name", title:"Company's Name:",type:"text",colSpan:3,width:"100%",startRow:true ,endRow:false },
    		 {name: "company_name", title:"Company's Name:",editorType: "ComboBoxItem",colSpan:3,width:"100%",startRow:true ,endRow:false
     			,optionDataSource:"companyManagementDS" , valueField:"Com_name"
     					, displayField:"Com_name"
//     					, allowEmptyValue: true
//     					, autoFetchData: true
//     					, filterLocally: true
//     					, cachePickListResults: true
//     					, useClientFiltering: true
//     					, fetchDelay: 500
     					, pickListFields:[
//     							{name:"Com_cd"},
//     						{name:"Del_mark", width: "*"},
     						{name:"Com_name", width: "*"},
     						{name:"Com_cd", autoFitWidth:true}
     					]
    		 			, sortField: "Com_name"
 //
//     	    	 		, pickListWidth:650 
     	    	 		},
    		 {name: "alarm_type",title:"Alarm Type:",width:120,
    		 valueMap:["ALL","Overdue","Early Alarm"],defaultValue:"ALL",
    		 },
		 {name: "equipments",title:"Type:",width:120,startRow:true,
    		 valueMap:["ALL","Exemptions","Dispensation"],defaultValue:"ALL",
    		 },    	
    ]

});
ecertRecordSearch_spname.makePickList();

isc.IButton.create({
    
	ID:"btnExemptionSearch",
	autoDraw: false,
    title:"Query",
    onControl:"EXEMPT_READ||FSQC_ALL",
    width:100,startRow:false,endRow:false,
    click: function (){
    	 
    	console.log("1st line of click function of \"Find Exemption\"");
    	findExemptions();
    	console.log("last line of click function of \"Find Exemption\"");
    	
//    	   var criteria = {};
//			 var para_spname = frm_exemptions_SearchMainCriteria.getItem("spname").getValue();
//			 var para_imono = frm_exemptions_SearchMainCriteria.getItem("imono").getValue();
//			 var para_companyname = frm_exemptions_SearchMainCriteria.getItem("company_name").getValue();
//			 var para_caseclosed = frm_exemptions_SearchMainCriteria.getItem("case_closed").getValue();
//			 var para_alarmtype = frm_exemptions_SearchMainCriteria.getItem("alarmtype").getValue();
//			 var para_exemptiontype = frm_exemptions_SearchMainCriteria.getItem("exemptiontype").getValue();
//			 
//			 criteria = {
//			            _constructor:"AdvancedCriteria", 
//			            criteria:[
//			                
//			            ], 
//			            operator:"and"
//			        };
//			 //=== parameter for ship name --       
//			 if (!isNull(para_spname) && (para_spname = para_spname.trim()) != ""){
//		         //Object.assign(criteria, {"ship_jobno_sptype" : shipTypePara});
//		         criteria.criteria.push({fieldName:"spname", operator:"iContains", value:para_spname});
//		     }
//		     
//			 //==parameter for imono ===
//			 if (!isNull(para_imono) && (para_imono = para_imono.trim()) != ""){
//		         //Object.assign(criteria, {"ship_jobno_sptype" : shipTypePara});
//		         criteria.criteria.push({fieldName:"imono", operator:"iContains", value:para_imono});
//		     }
//			 
//			 
//			 if (para_caseclosed.trim()!= "ALL")
//		          
//				 {
//				 
//				 var array_y = ["Y"];
//				 
//				 var array_n = ["N",null];
//				 
//				 
//				 if (para_caseclosed.trim()== "Y")
//					 {
//					 	criteria.criteria.push({fieldName:"case_closed", operator:"equals", value:"Y"});
//					 }
//				 else
//					 {
//					 	// ---case closed = N
//					 	criteria.criteria.push({fieldName:"case_closed", operator:"equals", value:""});
//					 }
//				 }
//			 
//			 if (para_exemptiontype.trim()!= "ALL")
//		         
//				 {
//				 if (para_exemptiontype.trim() == "Exemptions")
//					 {
//					 	criteria.criteria.push({fieldName:"equipments", operator:"equals", value:"Equipment"});
//					 }
//				 else  
//					 if (para_exemptiontype.trim() == "Dispensation")
//					 // dispensation ---
//					 {
//					 	// ---include officer and ratings --
//					 	
//					 	var array_eq = ["Officer","Rating"];
//					 	
//					 	criteria.criteria.push({fieldName:"equipments", operator:"inSet", value:array_eq});
//				 	   							 	
//					 	
//					 }
//				 }
//			 	  	
//			 if (para_alarmtype.trim()!= "ALL")
//		         
//			 	{
//				 if (para_alarmtype.trim()== "Overdue")
//					 {
//					 	criteria.criteria.push({fieldName:"valid_date", operator:"lessThan", value:Date.now()});
//					 }
//				 else
//					 {			 	 
//					 	criteria.criteria.push({fieldName:"valid_date", operator:"greaterThan", value:Date.now()});
//					 }
//			 	 }	 
//		  
//			 
//			 
//			 console.log("criteria for fsqcExemptionsMain.js: " + JSON.stringify(criteria));
//			 exemptions_SearchResultListLG.getData().useClientFiltering = false;
//			
//			 exemptions_SearchResultListLG.fetchData(criteria, function(dsResponse, data, dsRequest) {
//		           var c = searchResultPreText1 + dsResponse.totalRows + searchResultPostText1;
//		           console.log(new Date() + c);
//		           exemptionsSearchResultListLGSummary.setContents(c);
//		          // console.log("exemptions_SearchResultListLG.getTotalRows() after fetchData() (inside callback of fetchData()): " + exemptions_SearchResultListLG.getTotalRows());
//		       });
		    

    	}
    	
    	
    })

isc.IButton.create({
    
	ID:"btnExemptionReset",
	title: "Reset", type: "button", width:100,startRow:false 
	, click : function () {
                    	
		frm_exemptions_SearchMainCriteria.clearValues();
		new_exCert_base = {};
		exemptions_SearchResultListLG.setFilterEditorCriteria();
		} 	
	})

	
isc.HLayout.create({
	ID:"hl_exemptions_SearchButtons",
	width:250,
	align:"right",
	membersMargin:5,
	members:[btnExemptionSearch,btnExemptionReset		
		]
		
})
	
isc.HLayout.create({
	ID:"hl_exemptions_SearchMainCriteria",
    //width:950,
	//width:"100%",
    width:"100%",
    height:100,
  	//layoutMargin:5,
  	membersMargin:0,
    autoDraw:false,
    overflow : "auto",
  	members:[           
            frm_exemptions_SearchMainCriteria,hl_exemptions_SearchButtons
            ]
});


isc.ListGrid.create({
	ID:"exemptions_SearchResultListLG",
	dataSource : eCertRecordDS,
	//canSort:true,
	//useClientSorting:true,
	useClientFiltering:true,
	showAllRecords:true,
    showFilterEditor:true,
    filterOnKeypress:false,
    showRowNumbers:true,
    autoFetchData:false,
    filterData:function(){
    	console.log("user entered values in FilterEditor of exemptions_SearchResultListLG");
    	findExemptions();
        console.log("user leave values in FilterEditor of exemptions_SearchResultListLG");
    },    
    autoFitFieldWidths:false,
    autoFitWidthApproach :"title",
//    sortField:"valid_date",
//    sortDirection:"descending",
	initialSort: [
	{
		property: "app_date", direction: "descending"}
//		, {property: "level_no2", direction: "ascending"}
//		, {property: "level_no3", direction: "ascending"}
//		, {property: "level_no4", direction: "ascending"}
	],
   // height:520,
    height:"100%",
    width:"90%",
    autoDraw:false,
	fields: [
		{name: "dte", title: "Alarm Days", width:80,canFilter:false,
			align:"right",
			formatCellValue: function (value, record) {
				if(record.case_closed == "Y") return "-";
                if (!isc.isA.Date(record.valid_date) || !isc.isA.Number(record.alarm_days)) return "N/A";
                var daystoExpire = new Date(record.valid_date);                
                return parseInt((daystoExpire - Date.now()) / 86400000);
            },
		},
		{name: "equipments", title: "Exemption/Dispensation", width:80},
        {name: "review_person", title: "Exemption Prepared by", width:80},
		{name: "spname", title: "Name of Ship", width:150},
		{name: "extend_times", title: "Ext. Count", width:50},
		{name: "imono", title: "IMO NO.", width:80},
		               
		{ name: "company_id",title: "Company's Name", width:200
			, optionDataSource:"companyManagementDS"
			, valueField:"Com_cd"
			, displayField:"Com_name"
			, displayValueFromRecord:true 
	    	},
	    {name: "app_date", title: "Date of Application"	    	    },
	    	//{name: "comp_name" ,title:"Company's Name"},
		//{name: "company_name", title: "Company's Name", width:300},
        {name: "exempted_item", title: "Level 4 Exempted Item", width:200},
        {name: "place_vessel", title: "Place of Vessel", width:100},
        {name: "dm_agreed", title: "DM agreed via email",valueMap: {null:"NO" ,"Y":"YES" } , width:50},
        {name: "dm_agreed_date", title: "Date of DM Agreed"},
        {name: "exempted_date", title: "Date of Exemption Certificate"},
        {name: "collect_date", title: "Date of Collection"},
        {name: "create_man", title: "Create Person", width:80},
        {name: "valid_date", title: "Exemption Valid until"},
        {name: "case_closed", title: "Case Closed",valueMap: {null:"NO","Y":"YES" }, width:50},
        {name: "email_closed", title: "Email Closed"},
        {name: "stat", title: "Stat"},
        {name: "alarm_days", title: "Alarm Days",hidden:true},
        {name: "convention", title: "Level 1 Convention", width:100},
        {name: "chapter", title: "Level 2 Chapter/Annex", width:100},
        {name: "regulation", title: "Level 3 Regulation", width:100},
        {name: "component", title: "Level 5 Component", width:100},
        {name: "cert_no", title: "Cert No", width:80},
        {name: "id", title: "ID", width:80},
        {name: "remark", title: "Remark", width:100},
        
        
    ],
    
    rowDoubleClick:function(record, recordNum, fieldNum){
       
            openExemptionDetail(record);
       
    },
    
    getCellCSSText: function (record, rowNum, colNum) {
    	 var cssText = "";
        if (this.getFieldName(colNum) == "dte"  ) {
             
                return "font-weight:regular; color:#d64949;";
            	              
        }
    	if(record.case_closed == "Y") 
    	{
    		
    	}
    	else if (!isc.isA.Date(record.valid_date) || !isc.isA.Number(record.alarm_days))
        {
        }
    	else
		{
            var daystoExpire = new Date(record.valid_date);                
            daystoExpire = parseInt((daystoExpire - Date.now()) / 86400000);
        	
            if(daystoExpire < 0)
        	{
            	cssText = cssText + " background-color:" + "#FFBB99" + ";";
        	}
		
		}
    	
    	return cssText;
    }
});
exemptions_SearchResultListLG.freezeField(["spname"]);

isc.VLayout.create({
    ID:"vl_exemption_oper",
    valign:"top",
   // align:"right",
    width:120,
    membersMargin:5,
    members:[
		       	isc.IButton.create({ID:"btnExemptionAdd",title:"Add<br/>Exemption",width: 100, height:50
		       		,onControl:"FSQC_ALL||EXEMPT_WRITE",
		       		click: function(){ 
		       			var new_cert = {};
		       			if(new_exCert_base)
	       				{
		       				new_cert = new_exCert_base;
	       				}
		       			new_cert.equipments = "Equipment";
						openExemptionDetail(new_cert);
		       		}	
		       	
		       	}),    
		       	isc.IButton.create({ID:"btnDispensationAdd",title:"Add<br/>Dispensation",width: 100, height:50,onControl:"FSQC_ALL||EXEMPT_WRITE",
		       		click: function(){ 
		       			var new_cert = {};
		       			if(new_exCert_base)
	       				{
		       				new_cert = new_exCert_base;
	       				}
		       			new_cert.equipments = "Rating";
						openExemptionDetail(new_cert);
		       		}	
		       	
		       	}),    
            	isc.IButton.create({ID:"btnExemptionDelete",title:"Delete",width: 100,onControl:"FSQC_ALL||EXEMPT_WRITE",
            	click:function(){
            		if (isNull(exemptions_SearchResultListLG.getSelectedRecord()))
            			return;
            		
            		var selectDeleteItem  = exemptions_SearchResultListLG.getSelectedRecord();
            		            		
            		 isc.confirm("Are you sure to remove record?",function(value){
       				  if(value){
       					eCertRecordDS.removeData(selectDeleteItem, function(dsResponse, data, dsRequest) {
       						  if (dsResponse.status == 0) {
       							  isc.say(deleteSuccessfulMessage);
       							  //mmoDNDetailDynamicForm.refresh(selectDeleteItem.dnDemandNoteNo);
       						  }else{
       							  isc.warn(deleteFailMessage);
       						  }
       					  });
       				  }
       			  });
	        		  
            	}	
            	
            	}),
            	//isc.IButton.create({ID:"btnExemptionEmailInfo",title:"Email Info",width: 100,hidden:true})
            	isc.IExportButton.create({
            		title: "Export",
            		width: 100,
            		listGrid: exemptions_SearchResultListLG
            		, click:function(){
            			this.listGrid.exportClientData();            		
            		}            		
            	})


            ]
})

isc.HLayout.create({
    ID:"hl_exemption_result",    
    height:"100%",
    membersMargin:5,
    members:
    	[
    		exemptions_SearchResultListLG,
    		vl_exemption_oper    	
    	]
})


isc.TitleLabel.create({
	ID:"exemptionsSearchResultListLGSummary",
	height: 5,
    //styleName: "helloWorldText",
    padding: 0,
    //backgroundColor: "#ffffd0",
    align: "left",
    valign: "center",
    autoDraw: false,
    wrap: false,
    showEdges: false,
    showShadow: false,
    //icon: "icons/16/world.png",
    contents: searchResultPreText1 + "0" + searchResultPostText1
});

var exemptionsLGSummaryBar = isc.HLayout.create({
    height:20,
    members: [
    	exemptionsSearchResultListLGSummary	
		     		
    ]
});  


//isc.Window.create({
//
//	ID:"win_exemption_main",
//	isModal: true, showModalMask: true,
//	width: "100%",
//	height: "100%",				
//	title: "Exemption and Dispensation Data",
//	overflow : "auto",
//	items:
//	[
		isc.VLayout.create({
		    ID: "mainLayoutexemptions",
		    membersMargin: 10,    
		    members: [
		       
		     //   isc.TitleLabel.create({ID:"sectionTitle", contents: "<p><b><font size=3px></font></b></p>"}),
		        
		        isc.SectionStack.create({
		            height:"100%",
		            sections: [
		              
		                {title: "Search", expanded: true, resizeable: false, items: [ hl_exemptions_SearchMainCriteria]}
		                ,
		                {title: "Result", expanded: true, items: 
							[ 
								hl_exemption_result
						        , exemptionsLGSummaryBar				
							]
						}
		                
		            ]
		        }),
		      
		    ]
		})
//		] ,	
//		show:function(){
//			frm_exemptions_SearchMainCriteria.setData({});
//			this.Super('show', arguments);
//		}
//	});
		
findExemptions();










