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

function fsqcShipSetCSPDPA(i_dataSource, Com_cd, nextManagerFlag, cso_serial, dpa_serial)
{
	console.log("Com_cd-----");
	console.log(Com_cd);
	console.log(i_dataSource);
	console.log(nextManagerFlag);
	console.log(cso_serial);
	console.log(dpa_serial);


	isc.ValuesManager.create({
        ID: "fsqcShipSetCsoDpaVM",
		dataSource: companyManagementDS
	});

	isc.ListGrid.create({
		ID: "fsqcShipSetCsoDpaLG",
		dataSource: fsqcShipDS,
		autoFetchData:true,
		showFilterEditor:true,
		filterOnKeypress:true,
		//fetchDelay:500,
	    //dataPageSize: 20,
		height:"100%",
		//dataFetchMode:dataFetchModeValue,
	    canMultiSort: true,
	    //initialSort: {property: "Del_mark", direction: "descending"},
//	    groupByField: sortFields, 
	    groupStartOpen:"all",
	    //showGridSummary:true,
	    //showGroupSummary:true,
	    autoFitWidthApproach:"both",
	    wrapHeaderTitles:true,
	    headerHeight:40,
	    selectionAppearance:"checkbox",
	    selectionType: "simple",
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
			{ name: "Manager_next", type: "select", optionDataSource:"companyManagementDS", 
		          valueField:"Com_cd", displayField:"Com_name", displayValueFromRecord:true,
			},
			{ name: "sco_next"},
			{ name: "dpa_next"},
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
/*		fetchData:function(criteria, callback, requestProperties){
			console.log("Com_cd++++++");
			console.log(Com_cd);

			criteria = {Manager:Com_cd};
		},
*/
	});
	fsqcShipSetCsoDpaLG.fetchData({Manager:Com_cd})
	
	isc.DynamicForm.create({
		ID:"setCsoDpaCheckboxList",
		width:220,
		align:"left",
	  	isGroup:"true",
	  	groupTitle:"CSO / DPA to be changed",
        items:[
			{name:"Current", type:"checkbox", align:"left"},
			{name:"Next", type:"checkbox"},
        ],
       	itemChanged:function(item, newValue){

       	},
	});
	if(nextManagerFlag){
		setCsoDpaCheckboxList.setValue('Next', 1);
	}else{
		setCsoDpaCheckboxList.setValue('Current', 1);
	}
	fsqcShipSetCsoDpaLG.fetchData({Manager:Com_cd})
	
	isc.DynamicForm.create({
		ID:"setCsoDpaShowList",
		width:220,
		align:"left",
	  	isGroup:"true",
	  	groupTitle:"CSO / DPA",
        items:[
        	{name:"Manager", type: "select", optionDataSource:"companyManagementDS", 
		          valueField:"Com_cd", foreignDisplayField:"Com_name", canEdit: false, disabled: true,
		          pickListFields:[
		              {name:"imo_comno"},
		              {name:"Com_name"}
		          ],},
			{name:"sco", title:"CSO", type:"text", disabled: true},
			{name:"dpa", title:"DPA", type:"text", disabled: true},
        ],
	});
	setCsoDpaShowList.setValue('Manager', fsqcShipProfileVM.getValue('Manager'));
	setCsoDpaShowList.setValue('sco', fsqcShipProfileVM.getValue('sco'));
	setCsoDpaShowList.setValue('dpa', fsqcShipProfileVM.getValue('dpa'));

  	isc.ButtonToolbar.create({
		ID:"setCsoDpaToolBar",
		buttons: 
		[
			{name:"saveBtn", title:"Save", width:100,  autoFit: true, 
				click: function(){
					var selectedShipRecord = fsqcShipSetCsoDpaLG.getSelectedRecords();
					for (i = 0; i < selectedShipRecord.length; i++){						
						if(setCsoDpaCheckboxList.getValue("Current")){
							selectedShipRecord[i].Manager = fsqcShipProfileVM.getValue('Manager');
							selectedShipRecord[i].sco = fsqcShipProfileVM.getValue('sco');
							selectedShipRecord[i].dpa = fsqcShipProfileVM.getValue('dpa');
							selectedShipRecord[i].Manager_start_date = fsqcShipProfileVM.getValue('Manager_start_date');
							selectedShipRecord[i].sco_start_date = fsqcShipProfileVM.getValue('sco_start_date');
							selectedShipRecord[i].dpa_start_date = fsqcShipProfileVM.getValue('dpa_start_date');
						}
						if(setCsoDpaCheckboxList.getValue("Next")){
							selectedShipRecord[i].Manager_next = fsqcShipProfileVM.getValue('Manager_next');
							selectedShipRecord[i].sco_next = fsqcShipProfileVM.getValue('sco_next');
							selectedShipRecord[i].dpa_next = fsqcShipProfileVM.getValue('dpa_next');
							selectedShipRecord[i].Manager_next_start_date = fsqcShipProfileVM.getValue('Manager_next_start_date');
							selectedShipRecord[i].sco_next_start_date = fsqcShipProfileVM.getValue('sco_next_start_date');
							selectedShipRecord[i].dpa_next_start_date = fsqcShipProfileVM.getValue('dpa_next_start_date');
						}
						//console.log(fsqcShipProfileVM.getValue('csname').length);
						console.log(selectedShipRecord[i]);
						
						fsqcShipDS.updateData(selectedShipRecord[i]);
					}
					isc.say("Save Successfully.");
				}
			},
			
			{name:"closeBtn", title:"Close", autoFit: true, 
				click : function () {
					fsqcShipSetCsoDpaVM.setValues({});
					fsqcShipSetCsoDpaVM.setData({});
					fsqcShipSetCsoDpaVM.reset();
					fsqcShipSetCsoDpaVM.clearErrors(true);
					
					fsqcShipSetCsoDpaWindow.hide();
				}
			},
		]
	});
	var btnPane = isc.HLayout.create({
		//align:"right",
		height:"1",
		membersMargin:5,
		members : [setCsoDpaCheckboxList, setCsoDpaToolBar]
		//members : [setCsoDpaCheckboxList, setCsoDpaShowList, setCsoDpaToolBar]
	});
	
	isc.Window.create({
		ID:"fsqcShipSetCsoDpaWindow"
		, isModal: false
		, showModalMask: false
		, width: "94%"
		, height: "80%"
//		, layoutMargin:10
//		, autoSize: true
		, items: 
		[
	        isc.VLayout.create
	        ({
	        	membersMargin:5,
	        	members: 
	        	[
	        		btnPane
	    	        , fsqcShipSetCsoDpaLG
	        	]
	        })
		],
	});
}

// call the list grid filter when all detained ships info received
function getAllShipInfo(){
	if (detained_done && non_mou_detained_done) {
		fsqcShipManagementAllLG.filterData({ Manager : manager_cd});
	}
}

function open_fsqcShipSetCSPDPA(i_dataSource, Com_cd, nextManagerFlag, cso_serial, dpa_serial){
	//Init the Forms and ListGrids
	manager_cd = Com_cd;
	fsqcShipSetCSPDPA(i_dataSource, Com_cd, nextManagerFlag, cso_serial, dpa_serial);

	fsqcShipSetCsoDpaWindow.show();
	fsqcShipSetCsoDpaWindow.setTitle("Set CSO / DPA");

/*	// prepare the last column item list (all detained ships).  do not why advance criteria's callback will not work
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
	});*/
	
	
}
