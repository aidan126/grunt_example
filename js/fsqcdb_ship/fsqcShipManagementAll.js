/***************************************************************************************************************
* Qualified Name	: 	/webui/src/main/webapp/js/fsqcdb_ship/fsqcShipManagementAll.js
* @author 				Albert Chan
* @since				2019-08-02
* ************************************************************************************************************** 
* Change log:
* log no	Change complete date	Developer			Change Reason
* ======	====================	=========			=============
* 00000		2019-08-02				Albert Chan			Initial Implementation
*
* 
****************************************************************************************************************/

var detained_list = {};
var non_mou_detained_list = {};

function fsqcShipManagementAllControl(i_dataSource)
{
	var resultCountMsg = isc.TitleLabel.create({
		contents: "<p> Total no. of search item: <b> 0 </b> </p>"
	});


      
	isc.ValuesManager.create({
        ID: "fsqcShipManagementAllVM",
		dataSource: companyManagementDS
	});

	var filterListGrid = isc.ListGrid.create({
		ID:"fsqcShipManagementAllLG",
		dataSource: fsqcShipDS,
		showFilterEditor:true,
		filterOnKeypress:true,
		fetchDelay:500,
	    dataPageSize: 20,
		height:"100%",
		//dataFetchMode:dataFetchModeValue,
	    canMultiSort: true,
	    initialSort: {property: "Del_mark", direction: "descending"},

//	    groupByField: sortFields, 
	    groupStartOpen:"all",

	    showGridSummary:true,
	    showGroupSummary:true,
	    autoFitWidthApproach:"both",
	    wrapHeaderTitles:true,
	    headerHeight:40,

		fields: [
			{ name: "Imono", summaryFunction:"count"},
			//{ name: "Fileno"},
			{ name: "Regno"},
			{ name: "Regdate"},
			{ name: "Signno"},
			{ name: "Spname"},
			//{ name: "flage"},
			{ name: "Cs"},
			//{ name: "Status"},
			{ name: "Owner"},
//			{ name: "Manager"
//				, optionDataSource:"companyManagementDS"
//				, valueField:"Com_cd"
//				, displayField:"Com_name"
////				, displayValueFromRecord:true 
//			},
//			{ name: "Sptype"
//				, optionDataSource:"shipTypeCodeDS"	// 00001
//				, valueField:"sptyp_cd"		// 00001
//				, displayField:"sptyp_nam"	// 00001
//			},
			{ name: "Gross", showGroupSummary:true, summaryFunction:"sum"},
//			{ name: "Net"},
//			{ name: "Dw"},
//			{ name: "L"},
//			{ name: "B"},
//			{ name: "D"},
//			{ name: "Speed"},
//			{ name: "M_engine"},
//			{ name: "propeller"},
//			{ name: "Hull_n"},
//			{ name: "Mach_n"},
//			{ name: "Builder"},
//			{ name: "Builtdate"},
//			{ name: "Note"},
//			{ name: "Updated"},
			{ name: "Del_mark"},
//			{ name: "del_date"},
//			{ name: "csname"},
//			{ name: "hull_con"},
//			{ name: "flagout_date"},
//			{ name: "agent"},
			{ name: "sco"},
			{ name: "dpa"},
//			{ name: "ssas_name"},
//			{ name: "ssas_model"},
//			{ name: "ssas_sample"},
//			{ name: "file_name"},
//			{ name: "re_regdate"},
//			{ name: "demise"},
			{ name: "mmsi_no"},
//			{ name: "ro_ism"
//				, optionDataSource:"codeRODS"	// 00001
//				, valueField:"Cs_cd"		// 00001
//				, displayField:"Cs_name"	// 00001
//			},
//			{ name: "rso_issc"
//				, optionDataSource:"codeRODS"	// 00001
//				, valueField:"Cs_cd"		// 00001
//				, displayField:"Cs_name"	// 00001
//			},
//			{ name: "length_ll"},
//			{ name: "engine"},
//			{ name: "passengership_type"},
//			{ name: "passengers"},
//			{ name: "crews"},
//			{ name: "hullno"},
//			{ name: "subtype"},
//			{ name: "keeldate_p"},
//			{ name: "a_or_3m"},
//			{ name: "isp"},
//			{ name: "Recommendation"},
//			{ name: "SR_SPTYPE"},
//			{ name: "SRIS_VERIFY"},
//			{ name: "CS2"}
			{ name: "Detained", title: "Detained",
            	formatCellValue: function (value, record) {
                    if (detained_list[record.Imono.trim()] ||
                    		non_mou_detained_list[record.Imono]){
                    	return "Yes";
                    }
                    return "No";
                },

			},
		],
	    dataArrived:function(startRow, endRow){
	    	console.log("Data Arrived: " + startRow + " " + endRow);
			var c = "<p> Total no. of search item: <b> "+ (endRow) +" </b> </p>";
			resultCountMsg.setContents(c);
	    	filterListGrid.groupBy(["Del_mark"]);
	    },
		getSectionStack:function(){
			parent_arr = this.getParentElements();
			for (i = 0; i < parent_arr.length; i++) { 
				if( 'sections' in parent_arr[i] )
				{
					return parent_arr[i];
				}
			}
		},
		filterButtonProperties:{
			click:function(){
				var listGrid = this.getParentElements().get(1);
				listGrid.setData([]);
				var sectionStack = listGrid.getSectionStack();
				if(sectionStack != undefined)
				{
					sectionStack.getSectionHeader(1).setTitle(newTitle);
					var form = sectionStack.sections.get(1).items[0].members[0];
					form.setValues([]);
				}
				listGrid.filterData([], 
						function(dsResponse, data, dsRequest){
							if(sectionStack != undefined)
							{
								sectionStack.getSectionHeader(0).setTitle("Maintenance("+dsResponse.totalRows+")");
							}
						}
				);
			}	
//			var sectionStack = listGrid.getParentElements()[0].getParentElements()[0];
//			sectionStack.getSectionHeader(1).setTitle(newTitle);
//			var form = sectionStack.sections.get(1).items[0].members[0];
//			form.setValues([]);
//			listGrid.filterData([], function(dsResponse, data, dsRequest){
//				sectionStack.getSectionHeader(0).setTitle("Maintenance("+dsResponse.totalRows+")");
//			});
//			}
		},
		filterData:function(criteria, callback, requestProperties){
			var listGrid = this;
			var sectionStack = this.getSectionStack();
			if(callback == null){
				this.Super("filterData", [criteria, function(dsResponse, data, dsRequest){
					if( sectionStack != undefined)
					{
						sectionStack.getSectionHeader(0).setTitle("Maintenance("+dsResponse.totalRows+")");
					}
				}, requestProperties]);
				var listgrid = this;
				setTimeout(function(){
					var data = listgrid.data.localData;
					if (data == null){
						data = listgrid.data;
					}
					if( sectionStack != undefined)
					{
						sectionStack.getSectionHeader(0).setTitle("Maintenance("+data.length+")");
					}
				}, 100);
			}else{
				this.Super("filterData", arguments);
			}
		},
	    getCellCSSText: function (ship_record, rowNum, colNum) {
	        if (this.getFieldName(8) == "Del_mark") {
	            switch (ship_record.Del_mark)
	            {
	            case "A":
	            	return "background-color:" + ship_registry_flag_A + ";";
	            case "D":
	            	return "background-color:" + ship_registry_flag_D + ";";
	            case "F":
	            	return "background-color:" + ship_registry_flag_F + ";";
	            case "P":
	            	return "background-color:" + ship_registry_flag_P + ";";
		        }
	        }
	    }	    

	});

  	isc.ButtonToolbar.create({
		ID:"shipManagementInformationManagement_ToolBar",
		buttons: 
		[

			{name:"closeBtn", title:"Close", autoFit: true, 
				click : function () {
					fsqcShipManagementAllVM.setValues({});
					fsqcShipManagementAllVM.setData({});
					fsqcShipManagementAllVM.reset();
					fsqcShipManagementAllVM.clearErrors(true);
					
					fsqcShipManagementAllWindow.hide();
				}
			},
		]
	});
	
	isc.Window.create({
		ID:"fsqcShipManagementAllWindow"
		, isModal: true
		, showModalMask: true
		, width: "80%"
		, height: "80%"
//		, layoutMargin:10
//		, autoSize: true
		, items: 
		[
	        isc.VLayout.create
	        ({
	        	members: 
	        	[
//	    	        isc.TitleLabel.create({ contents: "<p><b><font size=2px>Ship main data<br /></font></b></p>"}),
	    	        shipManagementInformationManagement_ToolBar
	    	        , resultCountMsg
	    	        , fsqcShipManagementAllLG
	        	]
	        })
		],
		show:function(){
			fsqcShipManagementAllVM.setData({});
			this.Super('show', arguments);
		}
	});
}

var detained_done = false;
var non_mou_detained_done = false;
var manager_cd;

// call the list grid filter when all detained ships info received
function getAllShipInfo(){
	if (detained_done && non_mou_detained_done) {
		fsqcShipManagementAllLG.filterData({ Manager : manager_cd});
	}
}

function open_fsqcShipManagementAll(i_dataSource, Com_cd){
	//Init the Forms and ListGrids
	manager_cd = Com_cd;
	fsqcShipManagementAllControl(i_dataSource);

	fsqcShipManagementAllWindow.show();
	fsqcShipManagementAllWindow.setTitle("Modify or Add Management Information");

	// prepare the last column item list (all detained ships).  do not why advance criteria's callback will not work
	pscInspectionDS.fetchData({
		Detained : 1, 
	}, function (dsResponse, data, dsRequest) {
		if (!isNull(data) && data.length > 0) {
			detained_list = {};
			for (var i = 0; i < data.length; i++) {
				var psc_record = data[i];
				detained_list[psc_record.Imono.trim()] = true; 
			}
		}
		detained_done = true;
		getAllShipInfo();
	});
	pscInspectionDS.fetchData({
		Non_Mou_Detained : 1,
	}, function (dsResponse, data, dsRequest) {
		if (!isNull(data) && data.length > 0) {
			non_mou_detained_list = {};
			for (var i = 0; i < data.length; i++) {
				var psc_record = data[i];
				non_mou_detained_list[psc_record.Imono.trim()] = true; 
			}
		}
		non_mou_detained_done = true;
		getAllShipInfo();
	});
	
	
}
