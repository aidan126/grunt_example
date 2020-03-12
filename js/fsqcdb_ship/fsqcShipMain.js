/***************************************************************************************************************
* Qualified Name	: 	/webui/src/main/webapp/js/fsqcdb_ship/fsqcShipMain.js
* Created By		: 	Jacky Leong
* Created date		: 	2019-07-02
* ************************************************************************************************************** 
* Change log:
* log no	Change complete date	Developer			Change Reason
* ======	====================	=========			=============
* 00000		2019-07-02				Jacky Leong			Initial Implementation
*
*
* 
****************************************************************************************************************/


var five_yr = new Date(new Date().getFullYear()-5, 0, 1);

fsqcShipLG("fsqcShipMainLG",
		[
			{ name: "Spname"},
			{ name: "Old_Spname", title:"Old Name", width: 200
				, optionDataSource:"shipnameHistoryDS"
				, valueField:"Imono"
				, displayField:"shipname"
				,pickListCriteria:{ Imono_filter:"0" }
//				,pickListCriteria:{
//			        _constructor:"AdvancedCriteria",
//			        operator:"and",
//			        criteria:[
//			            // this is a Criterion
//			            { fieldName:"Imono_filter", operator:"greaterOrEqual", value:"0" },
//			            { operator:"and", criteria:[
//			                  { fieldName:"changedate", operator:"greaterOrEqual", value:five_yr },
//			                  { fieldName:"changedate", operator:"lessOrEqual", value:(new Date()) },
//			              ]  
//			            }
//			        ]
//			    }
				, pickListFields:[
//						{name:"Com_cd"},
//					{name:"Del_mark", width: "*"},
					{name:"shipname", title:"Old Name", autoFitWidth:true},
					{name:"shipname_cur", title:"New Name", autoFitWidth:true},
					{name:"Imono", width: "*"},
					{name:"changedate", width: "*"},
					
				]
				, pickListProperties: {
				    showFilterEditor:true
				    , alternateRecordStyles:false,
				    canMultiSort: true,
				    initialSort: [
				        {property: "shipname", direction: "ascending"},
				        {property: "changedate", direction: "descending"}
				    ]
//				    sortField: "shipname",
//	        		  sortDirection: "ascending",
//	        		  sortField: "changedate",
//	        		  sortDirection: "descending",
				}
				, pickListWidth:550
//				, displayValueFromRecord:true
				, pickerIconClick: function(form, item, pickerIcon){
//					this.pickList.filterEditor.focusInFilterEditor("shipname");
					console.log("picklist open");
					this.pickList.focusInFilterEditor("shipname");
				}
			},
			{ name: "Imono"},
			{ name: "Signno"},
			{ name: "mmsi_no", startRow: true},
			{ name: "Regno"},
			{ name: "Fileno"},

			//{ name: "Manager"},
			{ name: "Manager", title:"Manager Name", 	type: "select", startRow: true
				, optionDataSource:"companyManagementDS", 
				valueField:"Com_cd", foreignDisplayField:"Com_name",
				pickListFields:[
//					{name:"Com_cd"},
					{name:"Com_name"},
					{name:"imo_comno", width:100}
				]
				, pickListProperties: {
				    showFilterEditor:true
				    , alternateRecordStyles:false
				}
				, pickListWidth:650,
			},
			{ name: "Owner", title:"Owner", 	type: "select"//, startRow: true
				, optionDataSource:"companyOwnerCodeDS", 
		        valueField:"Owner_cd", foreignDisplayField:"Owner_des",
		        pickListFields:[
//		            {name:"Owner_cd"},
		            {name:"Owner_des"},
		        ]
		        , pickListProperties: {
		        	showFilterEditor:true		            
				    , alternateRecordStyles:false
				}
				, pickListWidth:650,
			},
			{ name: "Cs", title:"Class", 	type: "select", startRow: true, colSpan: 3
				, optionDataSource:"codeRODS", 
		        valueField:"Cs_cd", foreignDisplayField:"Cs_name",
		        pickListFields:[
					{name:"Cs_cd"},
					{name:"Cs_name"},
					{name:"hide"},
		        ]
				, pickListProperties: {
					showFilterEditor:true		            
				    , alternateRecordStyles:false
				}
				, optionCriteria:{
					hide:"2"
		        }
				, pickListWidth:650,
			},
			
//			{ name: "Gross"},
//			{ name: "sco"},
//			{ name: "dpa"},
//			{ name: "Regdate"},
//			{ name: "regdateFrom"},
//			{ name: "regdateTo"},
		],
		[
			{property: "Del_mark", direction: "descending"}
			, { property: "Spname", direction: "ascending"} 
//			        {property: "Imono", direction: "ascending"}
		],
		["Imono"]
//				, 'basic'
		, 'paged'
);



//	fsqcShipMainLG.filterData(
////		{Del_mark:['T','P']}
//	);
//	
//	fsqcShipMainLG.groupBy(["Del_mark"]
//	//[
//	//	{property: "Del_mark", direction: "descending"}
//	////    {property: "Imono", direction: "ascending"}
//	//]
//	);

//	return layout;
