/***************************************************************************************************************
* Qualified Name	: 	/webui/src/main/webapp/js/fsqcdb_ship/fsqcShipProfileManningTab.js
* Created By		: 	Albert Chan
* Created date		: 	2019-07-25
* ************************************************************************************************************** 
* Change log:
* log no	Change complete date	Developer			Change Reason
* ======	====================	=========			=============
* 00000		2019-07-25				Albert Chan			Initial Implementation
* 00001		2019-08-14				Jacky Leong			Actual Implementation
*
* 
****************************************************************************************************************/

function getFsqcShipProfileManningTab(i_dataSource, i_valuesManager, record)
{
	var toolbar = isc.ButtonToolbar.create({
//		ID:"shipManning_ToolBar",
		buttons: 
		[

			{
				icon: "demand.png",
				title: "Export",
				autoFit: true, 
				click : function () {
					fsqcShipMsmcLG.exportClientData();
				}
			},
			{
//				name:"saveShipDocumentBtn", 
				title:"Refresh", autoFit: true, 
				click : function () {
					fsqcShipMsmcLG.fetchData({imono: record.Imono.trim()});
				}
			},
			{
//				name:"saveShipDocumentBtn", 
				title:"Add MSMC", autoFit: true, onControl:"MSMC_WRITE",
				click : function () {
					getCertJobShip(record, function(new_cert){ 
						openMsmcCertRecDetail(new_cert);
					});
				}
			},
		]
	});
	
	var dbl_click_tip = isc.Label.create({
	    contents: "Tips: Double-click the data row to view the details",
	    width: 500,
	    height: 25,
	    autoDraw: true,
	    baseStyle: "exampleSeparator"
	});

	isc.ListGrid.create({
		ID:"fsqcShipMsmcLG", 
		dataSource : certJobMsmcDS,
	    autoDraw: false,
	    canEdit: false,
	    saveLocally: true,
	    saveByCell: false,
	    autoSaveEdits: false,
	    autoFetchData: true,
	    initialCriteria: {imono: record.Imono.trim()},
	    sortField: "beginDate",
	    sortDirection: "descending",
	    width:"100%",
	    overflow:"auto",
		fields: 
		[
	    	{name: "imono", title: "IMONO", autoFitWidth:true, hidden:true},
	    	{name: "form", title: "Form", autoFitWidth:true, hidden:true},
	    	{name: "jobno", title: "Job No.", autoFitWidth:true},
	    	{name: "status", title: "Status", autoFitWidth:true},
	    	{name: "issueOn", title: "Issue Date (dd/mm/yyyy)", autoFitWidth:true},
	    	{name: "beginDate", title: "Start Date (dd/mm/yyyy)", autoFitWidth:true},
	    	{name: "completeDate", title: "Complete Date (dd/mm/yyyy)", autoFitWidth:true},
	    	{name: "cancelReason", title: "Cancel Reason", width:200},
	    	{name: "remark", title: "Remarks", width:300},
	    	{name: "mod", title: "MOD", autoFitWidth:true},
	    	{name: "dClass1", title: "DC1", autoFitWidth:true},
	    	{name: "dClass2", title: "DC2", autoFitWidth:true},
	    	{name: "dClass3", title: "DC3", autoFitWidth:true},
	    	{name: "dAbleseafarer", title: "DA", autoFitWidth:true},
	    	{name: "dWatchrating", title: "DW", autoFitWidth:true},
	    	{name: "dOtheratings", title: "DO", autoFitWidth:true},
	    	{name: "ums", title: "UMS", autoFitWidth:true},
	    	{name: "eClass1", title: "EC1", autoFitWidth:true},
	    	{name: "eClass2", title: "EC2", autoFitWidth:true},
	    	{name: "eClass3", title: "EC3", autoFitWidth:true},
	    	{name: "eAbleseafarer", title: "EA", autoFitWidth:true},
	    	{name: "eWatchrating", title: "EW", autoFitWidth:true},
	    	{name: "eOtheratings", title: "EO", autoFitWidth:true},
	    	{name: "eTechofficer", title: "ETO", autoFitWidth:true},
	    	{name: "eTechratings", title: "ETR", autoFitWidth:true},
	    	{name: "sCook", title: "Cook", autoFitWidth:true},
        ],
        rowDoubleClick:function(record, recordNum, fieldNum){
            if (record['form'] == 'BCC' || record['form'] == 'CLC'){
                addBccclcCert(record, ['0']);
            }
            if (record['form'] == 'MSMC'){
                openMsmcCertRecDetail(record);
            }
            if (record['form'] == 'MLC'){
                openDmlcCertRecDetail(record);
            }
        }
	    , fetchData:function (criteria, callback, requestProperties)
	    {
			fsqcShipMsmcLG.setData([]);
	    	
	    	this.dataSource.fetchData(
	    			criteria
	    			, function(dsResponse, data, dsRequest)
	    			{
	    				console.log(data);
//	    				fsqcShipMsmcLG.setData( data );
	    				fsqcShipMsmcLG.setData( fsqcShipMsmcLG.getData( ).concat(data) );
	    				fsqcShipManningDS.fetchData(
    		    			criteria
    		    			, function(dsResponse, manningsData, dsRequest)
    		    			{
    		    				for(i=0; i < manningsData.length; i++)
		    					{
    		    					manningsData[i].status = "Old Data";
		    					}
    		    				fsqcShipMsmcLG.setData( fsqcShipMsmcLG.getData( ).concat(manningsData) );
    		    				if(callback != undefined)
    	    					{
    		    					callback(dsResponse, data, dsRequest);
    	    					}
    		    			}
    		    			, requestProperties
	    		    	);
	    				fsqcShipMsmcLG.autoFitFields();
	    			}
	    			, requestProperties
	    	);
	    }
	});

//	isc.ListGrid.create({
//		ID:"fsqcShipMsmcLG", 
//		dataSource : fsqcShipManningDS,
//	    autoDraw: false,
//	    canEdit: false,
//	    saveLocally: true,
//	    saveByCell: false,
//	    autoSaveEdits: false,
//	    autoFetchData: true,
//	    initialCriteria: {Imono: record.Imono.trim()},
//	    width:"100%",
//	    overflow:"auto",
////		fields: 
////		[
////	    	{name: "imono", title: "IMONO", autoFitWidth:true, hidden:true},
////	    	{name: "form", title: "Form", autoFitWidth:true, hidden:true},
////	    	{name: "jobno", title: "Job No.", autoFitWidth:true},
////	    	{name: "status", title: "Status", autoFitWidth:true},
////	    	{name: "completeDate", title: "Complete Date", autoFitWidth:true},
////	    	{name: "beginDate", title: "Start Date", autoFitWidth:true},
////	    	{name: "remark", title: "Remarks", width:300},
////	    	{name: "mod", title: "MOD", autoFitWidth:true},
////	    	{name: "dClass1", title: "DC1", autoFitWidth:true},
////	    	{name: "dClass2", title: "DC2", autoFitWidth:true},
////	    	{name: "dClass3", title: "DC3", autoFitWidth:true},
////	    	{name: "dAbleseafarer", title: "DA", autoFitWidth:true},
////	    	{name: "dWatchrating", title: "DW", autoFitWidth:true},
////	    	{name: "dOtheratings", title: "DO", autoFitWidth:true},
////	    	{name: "ums", title: "UMS", autoFitWidth:true},
////	    	{name: "eClass1", title: "EC1", autoFitWidth:true},
////	    	{name: "eClass2", title: "EC2", autoFitWidth:true},
////	    	{name: "eClass3", title: "EC3", autoFitWidth:true},
////	    	{name: "eAbleseafarer", title: "EA", autoFitWidth:true},
////	    	{name: "eWatchrating", title: "EW", autoFitWidth:true},
////	    	{name: "eOtheratings", title: "EO", autoFitWidth:true},
////	    	{name: "eTechofficer", title: "ETO", autoFitWidth:true},
////	    	{name: "eTechratings", title: "ETR", autoFitWidth:true},
////	    	{name: "sCook", title: "Cook", autoFitWidth:true},
////        ],
////        rowDoubleClick:function(record, recordNum, fieldNum){
////            if (record['form'] == 'BCC' || record['form'] == 'CLC'){
////                addBccclcCert(record, ['0']);
////            }
////            if (record['form'] == 'MSMC'){
////                openMsmcCertRecDetail(record);
////            }
////            if (record['form'] == 'MLC'){
////                openDmlcCertRecDetail(record);
////            }
////        }
////	    , fetchData:function (criteria, callback, requestProperties)
////	    {
////			fsqcShipMsmcLG.setData([]);
////	    	
////	    	this.dataSource.fetchData(
////	    			criteria
////	    			, function(dsResponse, data, dsRequest)
////	    			{
////	    				console.log(data);
//////	    				fsqcShipMsmcLG.setData( data );
////	    				fsqcShipMsmcLG.setData( fsqcShipMsmcLG.getData( ).concat(data) );
////	    				if(callback != undefined)
////    					{
////	    					callback(dsResponse, data, dsRequest);
////    					}
////	    				fsqcShipMsmcLG.autoFitFields();
////	    			}
////	    			, requestProperties
////	    	);
////	    }
//	});
//	
	
	isc.VLayout.create
    ({
	    ID:"fsqcShipProfileManningTab",
	    width:"100%",
    	members: 
    	[
    		isc.HLayout.create
    		({
    		    height:dbl_click_tip.height,
    			members:[
    				dbl_click_tip,
    				toolbar
    			]
    		})
    		, fsqcShipMsmcLG
    	]
    })

	// fsqcShipMsmcLG.fetchData({ imono: record.Imono });
	
    return 	{
	    title: "Ship Manning",
	    pane: fsqcShipProfileManningTab
	};
}
