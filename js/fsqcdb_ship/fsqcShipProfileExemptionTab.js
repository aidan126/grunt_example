/***************************************************************************************************************
* Qualified Name	: 	/webui/src/main/webapp/js/fsqcdb_ship/fsqcShipProfileExemptionTab.js
* Created By		: 	Jacky Leong
* Created date		: 	2019-08-29
* ************************************************************************************************************** 
* Change log:
* log no	Change complete date	Developer			Change Reason
* ======	====================	=========			=============
* 00000		2019-08-29				Jacky Leong			Initial Implementation
* 00001		2019-09-03				Dicky Lee			add access control
* 
****************************************************************************************************************/


function getExemptionShip(i_fsqcShip, callback)
{
	var o_Ship = {};
	if(i_fsqcShip === Object(i_fsqcShip))  
	{

		o_Ship.spname 				= i_fsqcShip.Spname;
		o_Ship.imono				= i_fsqcShip.Imono;
		o_Ship.company_id			= i_fsqcShip.Manager;
		o_Ship.company_name			= i_fsqcShip.Manager;
	}

	companyManagementDS.fetchData(
		{Com_cd: i_fsqcShip.Manager} 
		, function(dsResponse, data, dsRequest)
		{
			if(data.length > 0)
			{
				o_Ship.company_name = data[0].Com_name;
			}
			callback( o_Ship );
		}
	);
}

function getFsqcShipProfileExemptionTab(i_dataSource, i_valuesManager, record)
{
	var toolbar = isc.ButtonToolbar.create({
//		ID:"shipManning_ToolBar",
		buttons: 
		[
			{
//				name:"saveShipDocumentBtn", 
				title:"Refresh", autoFit: true, 
				click : function () {
					fsqcShipExemptLG.setData([]);
					fsqcShipExemptLG.fetchData({imono: record.Imono.trim()});
				}
			},

			{
//				name:"saveShipDocumentBtn", 
				//---modified 00001
				//title:"Add Exemption", autoFit: true, onControl:"",
				title:"Add Exemption", autoFit: true, onControl:"EXEMPT_WRITE||FSQC_ALL",
				// end 00001
				click : function () {
					getExemptionShip(record, function(new_cert){ 
						new_cert.equipments = "Equipment";
						openExemptionDetail(new_cert);
					});
				}
			},
			{
//				name:"saveShipDocumentBtn", 
				//---modified 00001
				//title:"Add Exemption", autoFit: true, onControl:"",
				title:"Add Dispensation", autoFit: true, onControl:"EXEMPT_WRITE||FSQC_ALL",
				// end 00001
				click : function () {
					getExemptionShip(record, function(new_cert){
						new_cert.equipments = "Rating";
						openExemptionDetail(new_cert);
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
		ID:"fsqcShipExemptLG", 
		dataSource : eCertRecordDS,
	    autoDraw: false,
	    canEdit: false,
	    saveLocally: true,
	    saveByCell: false,
	    autoSaveEdits: false,
	    autoFetchData: true,
	    initialCriteria: {imono: record.Imono.trim()},
	    sortField: "valid_date",
	    sortDirection: "descending",
	    width:"100%",
	    overflow:"auto",
		fields: 
		[
	    	{name: "imono", title: "IMONO", autoFitWidth:true, hidden:false},
			{name: "dte", title: "Alarm Days", autoFitWidth:true,
				align:"right",
				formatCellValue: function (value, record) {
					if(record.case_closed == "Y") return "-";
	                if (!isc.isA.Date(record.valid_date) || !isc.isA.Number(record.alarm_days)) return "N/A";
	                var daystoExpire = new Date(record.valid_date);                
	                return parseInt((daystoExpire - Date.now()) / 86400000);
	            },
			},
	        {name: "case_closed", title: "Closed?", align:"center", autoFitWidth:true},
	        {name: "valid_date", title: "Exemption Valid until (dd/mm/yyyy)", autoFitWidth:true},
			{name: "app_date", title: "Date of Application (dd/mm/yyyy)", autoFitWidth:true},               
			{name: "equipments", title: "Exemption/Dispensation", autoFitWidth:true},
	        {name: "exempted_item", title: "Level 4 Exempted Item", autoFitWidth:true},
	        {name: "place_vessel", title: "Place of Vessel", autoFitWidth:true},
	        {name: "cert_no", title: "Cert No", autoFitWidth:true},
	        {name: "remark", title: "Remark", autoFitWidth:true},
	        {name: "extend_times", autoFitWidth:true},
	        { name: "extend_from_cert_no", autoFitWidth:true},
        ],
        rowDoubleClick:function(record, recordNum, fieldNum){
            openExemptionDetail(record);
        },
        getCellCSSText: function (record, rowNum, colNum) {	// 00001
            var cssText = "";
            if (this.getFieldName(colNum) == "dte"  ) {
                
            	cssText = "font-weight:regular; color:#d64949;";
            	              
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
	    },	    
	});

	
	
	isc.VLayout.create
    ({
	    ID:"fsqcShipProfileExemptionTab",
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
    		, fsqcShipExemptLG
    	]
    })

	// fsqcShipExemptLG.fetchData({ imono: record.Imono });
	
    return 	{
	    title: "Exemption",
	    pane: fsqcShipProfileExemptionTab
	};
}
