/***************************************************************************************************************
* Qualified Name	: 	/webui/src/main/webapp/js/fsqcdb_ship/emailExtraction.js
* Created By		: 	Jacky Leong
* Created date		: 	2019-11-01
* ************************************************************************************************************** 
* Change log:
* log no	Change complete date	Developer			Change Reason
* ======	====================	=========			=============
* 00000		2019-11-01				Jacky Leong			Initial Implementation
*
*
* 
****************************************************************************************************************/

function emailExtractLG(lg_id, lg_DS, searchFields, lgFields, sortFields, onctrl, dataFetchModeValue){
	if(dataFetchModeValue==undefined){
		dataFetchModeValue = 'basic';
	}

	var resultCountMsg = isc.TitleLabel.create({
		contents: "<p> Total no. of search item: <b> 0 </b> </p>"
	});

	var searchInputForm = isc.SearchForm.create({
		width: "75%",
		dataSource : lg_DS, 
		numCols: 6,
	    saveOnEnter: true,
		submit:function(){
			searchFormToolBar.getButton('searchBtn').click();
		},
		fields: searchFields
	});
	
	var filterListGrid = isc.ListGrid.create({
		ID:lg_id,
		dataSource: lg_DS,
		showFilterEditor:true,
		filterOnKeypress:true,
		fetchDelay:500,
	    dataPageSize: 20,
		height:"100%",
		dataFetchMode:dataFetchModeValue,
	    canMultiSort: true,
	    initialSort: sortFields,
//	    groupByField: sortFields, 
//	    groupStartOpen:"all",

//	    showGridSummary:true,
//	    showGroupSummary:true,

	    autoFitFieldWidths: true,
		fields: lgFields,

		rowDoubleClick:function(record, recordNum, fieldNum){
			open_fsqcShipProfile(lg_DS, record);
	    },
	    updateRowCount:function()
	    {
	    	var count = (filterListGrid.data.totalRows==undefined)? 0 : filterListGrid.data.totalRows;
			var c = "<p> Total no. of search item: <b> "+ count +" </b> </p>";

	    	resultCountMsg.setContents(c);
	    },
	    dataArrived:function(startRow, endRow){
	    	console.log("Data Arrived: " + startRow + " " + endRow);
	    	filterListGrid.updateRowCount();
	    },


	});
	
	var searchFormToolBar = isc.ButtonToolbar.create({
		width: "100%",
		buttons: [
			 //==== 00002  modified by dicky 
		          { name:"searchBtn", title:"Query", autoFit: true, disabled: false,onControl:onctrl,
	 		//====== end 00002 ======== 
		        	  click : function () {
		        		  // sfRecWindow.show();
		        		  filterListGrid.setData([]);
		        		  var criteria = searchInputForm.getValuesAsCriteria(false);
		        		  filterListGrid.fetchData(criteria, function(dsResponse, data, dsRequest){
//			        		  var count = (filterListGrid.data.totalRows==undefined)? 0 : filterListGrid.data.totalRows;
//			        		  var c = "<p> Total no. of search item: <b> "+ count +" </b> </p>";
//		        			  resultCountMsg.setContents(c);
		        		  });

		        	  }
		          },

		],
	});

	//var searchSectionLayout = isc.HLayout.create({
	var searchSectionLayout = isc.VLayout.create({
	  	layoutMargin:10,
	  	height:90,
	  	width:"100%",
	  	membersMargin:20,
	  	members:[
  	        searchInputForm, searchFormToolBar
//	  	        searchInputForm, searchFormToolBar, exportButtonsHLayout
	  	         ]
	});

	var resultFootLayout = isc.HLayout.create({
	  	height:"5%",
		members: [
			resultCountMsg,
			isc.IButton.create({
				icon: "demand.png",
				title: "Export",
				width: 100,
				//height: 30, 
				onControl:"",
				click : function () {
					filterListGrid.exportClientData();
				}
			})
		]
	});

	
	var mainLayout = isc.HLayout.create({
		members: [
			isc.VLayout.create({
			    members: [
//				              isc.TitleLabel.create({ID:"sectionTitle", contents: "<p><b><font size=3px>ShipManagement Registration Maintenance - Record [Ver 0.1.1]</font></b></p>"}),
			              isc.SectionStack.create({
			            	height: "100%",
			          		sections: [
			          			{title: "Search", expanded: true, resizeable: false, items: [ searchSectionLayout]},
			          			{title: "Result", expanded: true, items: [ filterListGrid,
			          				resultFootLayout]}
			          		]
			              })

			             ]
			})
		  ]
	});

	var vlout = isc.VLayout.create({
		members : [mainLayout]
	});

	return {
		"main": vlout
		, "searchForm": searchInputForm
		, "searchForm_toolbar": searchFormToolBar
		, "LG" : filterListGrid
		, "LG_toolbar": resultFootLayout
	};
}


dsData = [
//	{
//		emailAddr:"abc@example.com",
//		companyName:"example.com",
//		category:"ABC",
//	}
//	, {
//		emailAddr:"abc@example.com",
//		companyName:"example.com",
//		category:"ABC",
//	}
];

tempDS = isc.DataSource.create({
    ID: "emailExtractDS",
    fields:[
        {name:"emailAddr", title:"Email Address"},
        {name:"companyName", title:"Company"},
        {name:"category", title:"Category"}
    ],
    clientOnly: true,
    testData: dsData
});


var emailExtraction = emailExtractLG("emailExtractionLG", tempDS 
		, 
		[
	        {name:"emailAddr", title:"Email Address"},
	        {name:"companyName", title:"Company"},
//	        {name:"category", title:"Category"},
	        {name:"cb_Management", title:"Incl. Management", type: "checkbox", defaultValue:true, startRow: true},
	        {name:"cb_DPA", title:"Incl. DPA", type: "checkbox", defaultValue:true},
	        {name:"cb_CSO", title:"Incl. CSO", type: "checkbox", defaultValue:true},
	        {name:"cb_RP", title:"Incl. RP", type: "checkbox", defaultValue:true},
	    ]
		, 
		[
	        {name:"emailAddr", title:"Email Address"},
	        {name:"companyName", title:"Company"},
	        {name:"category", title:"Category"}
	    ] 
		, [
			{property: "companyName", direction: "ascending"}
		]
		, "FSQC_ALL|EMAIL_EXTRACTION_READ"
);
//emailExtraction["searchForm_toolbar"]
emailExtraction["LG"].autoFitFieldWidths = false;
emailExtraction["searchForm"].numCols = 8;
emailExtraction["LG_toolbar"];
emailExtraction["searchForm_toolbar"].getButton("searchBtn").click = function ()
//emailExtraction["LG"].fetchData = function (criteria, callback, requestProperties)
{
//	emailExtraction["LG"].setData([]);

	tempDS.testData = [];
	var manageLookupArr = [];
	
	var criteria = {};
	criteria = {
			Email : emailExtraction["searchForm"].getValue("emailAddr"),
			Com_name : emailExtraction["searchForm"].getValue("companyName"),
	};
	
	companyManagementDS.fetchData(
//			criteria
			{}
			, function(dsResponse, data, dsRequest)
			{
//				console.log(data);
				for(i=0; i < data.length; i++)
				{
					var tmpData = {
							"emailAddr" : data[i].Email
							, "companyName" : data[i].Com_name
							, "category" : "Management"
					};
					if( ( ( tmpData.emailAddr + 0 ) != 0 ) && emailExtraction["searchForm"].getValue("cb_Management") )
					{
						tempDS.testData.push(tmpData);
					}
					manageLookupArr[data[i].Com_cd] = data[i].Com_name;
				}

////				fsqcShipMsmcLG.setData( data );
//				emailExtraction["LG"].setData( emailExtraction["LG"].getData( ).concat(data) );

				criteria = {
						Email : emailExtraction["searchForm"].getValue("emailAddr"),
//						Com_name : emailExtraction["searchForm"].getValue("companyName"),
				};

				companyManagementDpaDS.fetchData(
//	    			criteria
					{}
	    			, function(dsResponse, dpaData, dsRequest)
	    			{
	    				for(i=0; i < dpaData.length; i++)
    					{
	    					var tmpData = {
	    							"emailAddr" : dpaData[i].dpamail
	    							, "companyName" : manageLookupArr[dpaData[i].Com_cd]
	    							, "category" : "DPA"
	    					};
	    					if( ( ( tmpData.emailAddr + 0 ) != 0 ) && emailExtraction["searchForm"].getValue("cb_DPA") )
    						{
	    						tempDS.testData.push(tmpData);
    						}
	    					
    					}

	    				criteria = {
	    						csoemail : emailExtraction["searchForm"].getValue("emailAddr"),
//	    						Com_name : emailExtraction["searchForm"].getValue("companyName"),
	    				};
	    				
	    				companyManagementCsoDS.fetchData(
//	    		    		criteria
	    		    		{}
    		    			, function(dsResponse, csoData, dsRequest)
    		    			{
    		    				for(i=0; i < csoData.length; i++)
    	    					{
    		    					var tmpData = {
    		    							"emailAddr" : csoData[i].csoemail
    		    							, "companyName" : manageLookupArr[csoData[i].Com_cd]
    		    							, "category" : "CSO"
    		    					};
    		    					if( ( ( tmpData.emailAddr + 0 ) != 0 ) && emailExtraction["searchForm"].getValue("cb_CSO") )
    	    						{
    		    						tempDS.testData.push(tmpData);
    	    						}
    	    					}

    		    				criteria = {
    		    						Email : emailExtraction["searchForm"].getValue("emailAddr"),
    		    						Com_name : emailExtraction["searchForm"].getValue("companyName"),
    		    				};
    		    				    		    				
    		    				companyRPDS.fetchData(
// 			    		    		criteria
 			    		    		{}
		    		    			, function(dsResponse, rpData, dsRequest)
		    		    			{
		    		    				for(i=0; i < rpData.length; i++)
		    	    					{
		    		    					var tmpData = {
		    		    							"emailAddr" : rpData[i].Email
		    		    							, "companyName" : rpData[i].Com_name
		    		    							, "category" : "RP"
		    		    					};
		    		    					if( ( ( tmpData.emailAddr + 0 ) != 0 ) && emailExtraction["searchForm"].getValue("cb_RP") )
		    	    						{
		    		    						tempDS.testData.push(tmpData);
		    	    						}
		    	    					}

		    		    				var criteria = emailExtraction["searchForm"].getValuesAsCriteria(false);
		    		    				emailExtraction["LG"].filterData(criteria
		    		    					, function(dsResponse, data, dsRequest){
		    		    						emailExtraction["LG"].data.totalRows = tempDS.testData.length;
		    		    						emailExtraction["LG"].updateRowCount();
//												var count = (emailExtraction["LG"].data.totalRows==undefined)? 0 : emailExtraction["LG"].data.totalRows;
//												var c = "<p> Total no. of search item: <b> "+ count +" </b> </p>";
//												resultCountMsg.setContents(c);
											}
		    		    				);
//		    		    				if(callback != undefined)
//		    	    					{
//		    		    					callback(dsResponse, data, dsRequest);
//		    	    					}
		    		    			}
//		    		    			, requestProperties
		    			    	);
    		    			}
//    		    			, requestProperties
    			    	);
	    			}
//	    			, requestProperties
		    	);
//				fsqcShipMsmcLG.autoFitFields();
			}
//			, requestProperties
	);
}


emailExtraction["main"];


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
