/***************************************************************************************************************
* Qualified Name	: 	/webui/src/main/webapp/js/fsqcdb_ship/fsqcShipProfileHistoryDataTab.js
* Created By		: 	Albert Chan
* Created date		: 	2019-07-25
* ************************************************************************************************************** 
* Change log:
* log no	Change complete date	Developer			Change Reason
* ======	====================	=========			=============
* 00000		2019-07-25				Albert Chan			Initial Implementation
* 00001		2019-09-03				Dicky Lee			add access control
* 
****************************************************************************************************************/

var ship_history_imono;
var ship_history_manager;
var ship_history_radio_value = "Shipname";
//var ship_history_country_list = {};
//var ship_history_country_map = {};

var radioValueMap = {
    	"Shipname":"Ship Name History",
    	"RO":"R.O. History",
    	"Owner":"Owner History",
    	"Management":"Management History",
    	"Flag":"Flag History",
    	"CompanyRP":"R.P. History",
    	"ManagementName":"Management Name History",
    	"CSO":"CSO History",
    	"DPA":"DPA History",
    };

function createHistoryLayout(history_layout_name, historyLG, historyDS, history_fields) {
	
	var current_history_lg = historyLG;
	var current_history_ds = historyDS;

	var resultFootLayout = isc.HLayout.create({
	  	height:"5%",
		members: [
			isc.IExportButton.create({
				icon: "demand.png",
				title: "Export",
				width: 100,
				//height: 30, 
				listGrid: historyLG
			}),
			isc.IAddButton.create({ 
				name: "newShipHistoryBtn",
				autoFit: true, 
				disabled: false, 
				//---modified 00001
				onControl:"FSQC_ALL||FSQCSHIP_WRITE_HISTORY",
				//-end 00001
				
	        	click : function () {
	        		console.log("newShipHistoryBtn");
	        		switch (ship_history_radio_value) {
	        		case "Shipname":
	        			open_fsqcShipHistoryProfile(historyDS, historyLG, "Imono", ship_history_imono, radioValueMap[ship_history_radio_value], 
	        					[
	        						{name: "Imono", 	canEdit: false, disabled: true, required: true},
	        						{name: "changedate", required: true},
	        						{name: "shipname"},
	        						{name: "shipname_cur"},
	        						{name: "remark", startRow: true, colSpan: 3, width: "*"},

	        					]);
	        			break;
	        		case "RO":
	        			open_fsqcShipHistoryProfile(historyDS, historyLG, "Imono", ship_history_imono, radioValueMap[ship_history_radio_value], 
	        					[
	        						{name: "Imono", 	canEdit: false, disabled: true, required: true},
	        						{name: "Changedate", required: true},
	        						{name: "Cs"
	        							, optionDataSource:"codeRODS", 
	        					          valueField:"Cs_cd", foreignDisplayField:"Cs_cd",
	        					          pickListFields:[
	        					              {name:"Cs_cd"},
	        					              {name:"Cs_name"}
	        					          ],
	        					          pickListWidth:450,
	        						},
	        						{name: "cs_cur"
	        							, optionDataSource:"codeRODS", 
	        					          valueField:"Cs_cd", foreignDisplayField:"Cs_cd",
	        					          pickListFields:[
	        					              {name:"Cs_cd"},
	        					              {name:"Cs_name"}
	        					          ],
	        					          pickListWidth:450,
	        						},
	        						{name: "Status"
	        							, optionDataSource:"codeClassStatusDS",
	        								valueField:"Csstat_cd", foreignDisplayField:"Csstat_des",
	        							    pickListFields:[
	        							         {name:"Csstat_cd"},
	        							         {name:"Csstat_des"}
	        							    ],
	        							    pickListWidth:450,
	        						},
	        						{name: "status_cur"
	        							, optionDataSource:"codeClassStatusDS",
	        								valueField:"Csstat_cd", foreignDisplayField:"Csstat_des",
	        							    pickListFields:[
	        							         {name:"Csstat_cd"},
	        							         {name:"Csstat_des"}
	        							    ],
	        							    pickListWidth:450,
	        						},
	        						{name: "notificataion"},
	        						{name: "remark", startRow: true, colSpan: 3, width: "*"},

	        					]);
	        			break;
	        		case "Owner":
	        			open_fsqcShipHistoryProfile(historyDS, historyLG, "Imono", ship_history_imono, radioValueMap[ship_history_radio_value], 
	        					[
	        						{name: "Imono", 	canEdit: false, disabled: true, required: true},
	        						{name: "Changedate", required: true},
	        						{name: "Owner"
	        						, optionDataSource:"companyOwnerCodeDS"
	        							, valueField:"Owner_cd"
	        							, foreignDisplayField:"Owner_des"
	        						    ,pickListFields:[
	        						         {name:"Owner_cd"},
	        						         {name:"Owner_des"}
	        						    ],
	        						    pickListWidth:450,
	        						},
	        						{name: "owner_cur"
	        						, optionDataSource:"companyOwnerCodeDS"
	        							, valueField:"Owner_cd"
	        							, foreignDisplayField:"Owner_des"
	        						    ,pickListFields:[
	        						         {name:"Owner_cd"},
	        						         {name:"Owner_des"}
	        						    ],
	        						    pickListWidth:450,
	        						},
	        						{name: "remark", startRow: true, colSpan: 3, width: "*"},
	        					]);
	        			break;
	        		case "Management":
	        			open_fsqcShipHistoryProfile(historyDS, historyLG, "Imono", ship_history_imono, radioValueMap[ship_history_radio_value], 
	        					[
	        						{name: "Imono", 	canEdit: false, disabled: true, required: true},
	        						{name: "Changedate", required: true},
	        						{name: "Manager"
	        						, optionDataSource:"companyManagementDS"
	        							, valueField:"Com_cd"
	        							, foreignDisplayField:"Com_name"
	        						    ,pickListFields:[
	        						         {name:"Com_cd"},
	        						         {name:"Com_name"}
	        						    ],
	        						    pickListWidth:450,
	        						},
	        						{name: "manager_cur"
	        						, optionDataSource:"companyManagementDS"
	        							, valueField:"Com_cd"
	        							, foreignDisplayField:"Com_name"
	        						    ,pickListFields:[
	        						         {name:"Com_cd"},
	        						         {name:"Com_name"}
	        						    ],
	        						    pickListWidth:450,
	        						},
	        						{name: "remark", startRow: true, colSpan: 3, width: "*"},
	        					]);
	        			break;
	        		case "Flag":
	        			open_fsqcShipHistoryProfile(historyDS, historyLG, "imono", ship_history_imono, radioValueMap[ship_history_radio_value], 
	        					[
				            	{name: "imono", canEdit: false, disabled: true, required: true},
				            	//{name: "serial", canEdit: false, disabled: true, width:80},
				                {name: "changedate"},
				        		{ name: "flag_before", title: "Flag Before"
				        			, optionDataSource:"countryOrFlagCodeDS"
				        			, valueField:"Country_cd"
				        			, foreignDisplayField:"Countryname"
				        		    ,pickListFields:[
				        		         {name:"Country_cd"},
				        		         {name:"Countryname"}
				        		    ],
				        		    pickListWidth:450,
				        		},
				        		
				        		{ name: "flag_after", title: "Flag After"
				        			, optionDataSource:"countryOrFlagCodeDS"
				        			, valueField:"Country_cd"
				        			, foreignDisplayField:"Countryname"
				        		    ,pickListFields:[
				        			         {name:"Country_cd"},
				        			         {name:"Countryname"}
				        			    ],
				        			    pickListWidth:450,
				        		},
        						{name: "remark", startRow: true, colSpan: 3, width: "*"},
        					]);
	        			break;
	        		case "CompanyRP":
	        			open_fsqcShipHistoryProfile(historyDS, historyLG, "imono", ship_history_imono, radioValueMap[ship_history_radio_value], 
	        				[
	        				//{name: "serial_no", canEdit: false, disabled: true},
	        		    	{name: "imono", canEdit: false, disabled: true, required: true},
	        		        {name: "changedate"},
	        		        {name: "name_pre"},
	        		        {name: "name_cur"},
	        		        {name: "fax_pre"},
	        		        {name: "fax_cur"},
	        		        {name: "phone_pre"},
	        		        {name: "phone_cur"},
    						{name: "remark", startRow: true, colSpan: 3, width: "*"},
	        		        ]);
	        			break;
	        		case "ManagementName":
	        			if (ship_history_manager) {
		        			open_fsqcShipHistoryProfile(historyDS, historyLG, "manager_code", ship_history_manager, radioValueMap[ship_history_radio_value], 
		        			[
		        		    	{name: "manager_code", canEdit: false, disabled: true, required: true},
		        		        {name: "changedate", required: true},
		        		        {name: "manager_name"},
		        		        {name: "manager_name_cur"},
	    						{name: "remark", startRow: true, colSpan: 3, width: "*"},
		        		        ]);
	        			} else {
	        				isc.say("No Management Company defined for this ship.");
	        			}
	        			break;
	        		case "CSO":
	        			open_fsqcShipHistoryProfile(historyDS, historyLG, "imono", ship_history_imono, radioValueMap[ship_history_radio_value], 
	        			[
	        		    	{name: "imono", canEdit: false, disabled: true, required: true},
	        		        {name: "changedate", required: true},
	        		        {name: "cso"},
	        		        {name: "cso_cur"},
    						{name: "remark", startRow: true, colSpan: 3, width: "*"},
	        		        ]);	        			
	        			break;
	        		case "DPA":
	        			open_fsqcShipHistoryProfile(historyDS, historyLG, "imono", ship_history_imono, radioValueMap[ship_history_radio_value],
        					[
        				    	{name: "imono", canEdit: false, disabled: true, required: true},
        				        {name: "changedate", required: true},
        				        {name: "dpa"},
        				        {name: "dpa_cur"},
        						{name: "remark", startRow: true, colSpan: 3, width: "*"},
        				    ]);
	        			break;
	        		}
	        	}
	        }),
	        isc.ISaveButton.create({
				title: "Save",
				width: 100,
				//height: 30, 
				//---modified 00001
				onControl:"FSQC_ALL||FSQCSHIP_WRITE_HISTORY",
				//=---end 00001
				click : function () {
					console.log("Save Histoty");
					var EditedRecord = current_history_lg.getAllEditRows();
					
					current_history_lg.endEditing();
					current_history_lg.saveAllEdits(); //save
					
			        for (var i = 0; i < EditedRecord.length; i++) {
			        	current_history_ds.updateData(current_history_lg.getRecord( EditedRecord[i] )); //save
			        }
//			        var selected_record = current_history_lg.getSelectedRecord();
//			        if (selected_record) {
//			        	current_history_ds.updateData(selected_record);
//			        }
			        isc.say(saveSuccessfulMessage);
  					current_history_lg.refreshData (function (dsResponse, data, dsRequest) {
  						updateListGridData(data)
  					});
				}
			}),
			isc.IButton.create({
			    title:"Delete",
			    //modified 00001 ----
			    onControl: "FSQC_ALL||FSQCSHIP_WRITE_HISTORY",
			    // end 00001----
			    width:90,
			    layoutAlign:"center",
			    autoDraw: false,
			    click:function(){
			    	isc.ask(promptDeleteMessage_2, function (value){
						if (value){
							var selected_record = current_history_lg.getSelectedRecord();
							if (selected_record) {
								current_history_ds.removeData(selected_record,
									function(dsResponse, data, dsRequest) {
			              				if (dsResponse.status == 0) {
			              					isc.say("Successfully Deleted");
			              					current_history_lg.refreshData (function (dsResponse, data, dsRequest) {
			              						updateListGridData(data)
			              					});
			              				}
					  		  		}
								);
							}
						}
					});
			    }
			}),
			]
	});

	var history_layout = isc.VLayout.create
    ({
	    ID:history_layout_name,
	    width:"100%",
    	members: 
    	[
    		historyLG,
    		resultFootLayout,
    	]
    })
    
    return history_layout;
}

function updateListGridData(data) {
	switch (ship_history_radio_value) {
	case "Shipname":
		break;
	case "RO":
		updateCsHistoryLG(data);
		break;
	case "Owner":
		break;
	case "Management":
		break;
	case "Flag":
		updateFlagHistoryLG(data);
		break;
	case "CompanyRP":
		break;
	case "ManagementName":
		break;
	case "CSO":
		break;
	case "DPA":
		break;
	}
	
	
}

function updateCsHistoryLG(data) {
	if (!isNull(data) && data.length > 0) {
		for (var i = 0; i < data.length; i++) {
			data[i].Cs = data[i].Cs.trim();
			data[i].cs_cur = data[i].cs_cur.trim();
			data[i].Status = data[i].Status.trim();
			data[i].status_cur = data[i].status_cur.trim();
		}
	}
}

function updateFlagHistoryLG(data){
	if (!isNull(data) && data.length > 0) {
		for (var i = 0; i < data.length; i++) {
			data[i].flag_before = addStringSpace(data[i].flag_before, 10);
			data[i].flag_after = addStringSpace(data[i].flag_after, 10);
		}
	}
}

function addStringSpace(original_string, required_length) {
	if (original_string) {
		var result_string = original_string;
		while (result_string.length < required_length) {
			result_string = result_string + ' ';
		}
		return result_string;
	} else {
		return null;
	}
}

function toggleFsqcShipProfileHistoryRadioButton(value) {
	
	ship_history_radio_value = value;
	
	shipname_history_layout.hide();
	cs_history_layout.hide();
	owner_history_layout.hide();
	manager_history_layout.hide();
	flag_history_layout.hide();
	companyRP_history_layout.hide();
	manager_name_history_layout.hide();
	cso_history_layout.hide();
	dpa_history_layout.hide();
	
	switch (value) {
	case "Shipname":
	    shipnameHistoryLG.filterData({Imono:ship_history_imono});
		shipname_history_layout.show();
		break;
	case "RO":
		csHistoryLG.filterData({Imono:ship_history_imono}
			, function (dsResponse, data, dsRequest) {
				updateCsHistoryLG(data);
		}
		);
		cs_history_layout.show();
		break;
	case "Owner":
		ownerHistoryLG.filterData({Imono:ship_history_imono});
		owner_history_layout.show();
		break;
	case "Management":
		managerHistoryLG.filterData({Imono:ship_history_imono});
		manager_history_layout.show();
		break;
	case "Flag":
		flagHistoryLG.filterData({imono:ship_history_imono}
			, function (dsResponse, data, dsRequest) {
				updateFlagHistoryLG(data);
			}
		);
		flag_history_layout.show();
		break;
	case "CompanyRP":
		companyRPHistoryLG.filterData({imono:ship_history_imono});
		companyRP_history_layout.show();
		break;
	case "ManagementName":
		if (ship_history_manager) {
			managerNameHistoryLG.filterData({manager_code:ship_history_manager.trim()});
		}
		manager_name_history_layout.show();
		break;
	case "CSO":
		csoHistoryLG.filterData({imono:ship_history_imono});
		cso_history_layout.show();
		break;
	case "DPA":
		dpaHistoryLG.filterData({imono:ship_history_imono});
		dpa_history_layout.show();
		break;
	}
}

var radioValueMap = {
    	"Shipname":"Ship Name History",
    	"RO":"R.O. History",
    	"Owner":"Owner History",
    	"Management":"Management History",
    	"Flag":"Flag History",
    	"CompanyRP":"R.P. History",
    	"ManagementName":"Management Name History",
    	"CSO":"CSO History",
    	"DPA":"DPA History",
    };

function getFsqcShipProfileHistoryDataTab(i_dataSource, i_valuesManager, record)
{
	ship_history_imono = record.Imono.trim();
	ship_history_manager = record.Manager;
	
//	countryOrFlagCodeDS.fetchData({}, function (dsResponse, data, dsRequest) {
//		if (!isNull(data) && data.length > 0) {
//			ship_history_country_map = {};
//			ship_history_country_list = data;
//			for (var i = 0; i < data.length; i++) {
//				var country_record = data[i];
//				ship_history_country_map[country_record.Country_cd.trim()] = country_record.Countryname; 
//			}
//		}
//	});

	isc.FormLayout.create({
		ID: "shipHistoryRadioButtons",
		items:[{
	        name:"showShipHistory", 
	        type:"radioGroup", 
	        showTitle:false,
	        vertical:false,
	        width: 400,
	        valueMap:radioValueMap, 
	        defaultValue:"Shipname",
	        change: function (form, item, value) {
	        	toggleFsqcShipProfileHistoryRadioButton(value);
	        }
	    }]
	})
	
	var shipnameHistoryFields = [
    	{name: "Imono", canEdit: false, disabled: true, width:80},
        {name: "changedate", width:120},
        {name: "shipname", width:210},
        {name: "shipname_cur", width:210},
        {name: "remark", width:300},
        ];
	
	isc.ListGrid.create({
		ID:"shipnameHistoryLG", dataSource : shipnameHistoryDS,
	    autoDraw: false,
	    canEdit: true,
	    saveLocally: true,
	    saveByCell: false,
	    autoSaveEdits: false,
	    width:"100%",
	    overflow:"auto",
	    autoFitWidthApproach:"both",
	    wrapHeaderTitles:true,
	    //headerHeight:40,
		fields: shipnameHistoryFields,
	    
	});

	var csHistoryFields = [
    	{name: "Imono", canEdit: false, disabled: true, width:80},
        {name: "Changedate", width:120},
		{name: "Cs", startRow: true, width:120
			, optionDataSource:"codeRODS", 
	          valueField:"Cs_cd", displayField:"Cs_cd",
	          pickListFields:[
	              {name:"Cs_cd"},
	              {name:"Cs_name"}
	          ],
	          pickListWidth:450,
		},
		{name: "Status", width:120
			, optionDataSource:"codeClassStatusDS",
				valueField:"Csstat_cd", displayField:"Csstat_des",
			    pickListFields:[
			         {name:"Csstat_cd"},
			         {name:"Csstat_des"}
			    ],
			    pickListWidth:450,
		},
		{name: "cs_cur", startRow: true, width:120
			, optionDataSource:"codeRODS", 
	          valueField:"Cs_cd", displayField:"Cs_cd",
	          pickListFields:[
	              {name:"Cs_cd"},
	              {name:"Cs_name"}
	          ],
	          pickListWidth:450,
		},
		{name: "status_cur", width:120
			, optionDataSource:"codeClassStatusDS",
				valueField:"Csstat_cd", displayField:"Csstat_des",
			    pickListFields:[
			         {name:"Csstat_cd"},
			         {name:"Csstat_des"}
			    ],
			    pickListWidth:450,
		},
        {name: "notificataion", width:120},
        {name: "remark", width:300},
        ];
	
	isc.ListGrid.create({
		ID:"csHistoryLG", dataSource : csHistoryDS,
	    autoDraw: false,
	    canEdit: true,
	    saveLocally: true,
	    saveByCell: false,
	    autoSaveEdits: false,
	    width:"100%",
	    overflow:"auto",
	    autoFitWidthApproach:"both",
	    wrapHeaderTitles:true,
	    headerHeight:40,
		fields: csHistoryFields,
	    
	});
	
	var ownerHistoryFields = [
    	{name: "Imono", canEdit: false, disabled: true, width:80},
        {name: "Changedate", width:120},
		{ name: "Owner", title: "Owner", width:180
			, optionDataSource:"companyOwnerCodeDS"
			, valueField:"Owner_cd"
			, displayField:"Owner_des"
		    ,pickListFields:[
			         {name:"Owner_cd"},
			         {name:"Owner_des"}
		    ],
		    pickListWidth:450,
		},
		{ name: "owner_cur", title: "Current Owner", width:180
			, optionDataSource:"companyOwnerCodeDS"
			, valueField:"Owner_cd"
			, displayField:"Owner_des"
		    ,pickListFields:[
		         {name:"Owner_cd"},
		         {name:"Owner_des"}
		    ],
		    pickListWidth:450,
		},
        {name: "remark", width:300},
        ];
	
	isc.ListGrid.create({
		ID:"ownerHistoryLG", dataSource : ownerHistoryDS,
	    autoDraw: false,
	    canEdit: true,
	    saveLocally: true,
	    saveByCell: false,
	    autoSaveEdits: false,
	    width:"100%",
	    overflow:"auto",
	    autoFitWidthApproach:"both",
	    wrapHeaderTitles:true,
	    headerHeight:40,
		fields: ownerHistoryFields,
	    
	});
	
	var managerHistoryFields = [
    	{name: "Imono", canEdit: false, disabled: true, width:80},
        {name: "Changedate", width:120},
		{ name: "Manager", title: "Manager", width:180
			, optionDataSource:"companyManagementDS"
			, valueField:"Com_cd"
			, displayField:"Com_name"
		    ,pickListFields:[
			         {name:"Com_cd"},
			         {name:"Com_name"}
			    ],
			    pickListWidth:450,
		},
		{ name: "manager_cur", title: "Current Manager", width:180
			, optionDataSource:"companyManagementDS"
			, valueField:"Com_cd"
			, displayField:"Com_name"
		    ,pickListFields:[
			         {name:"Com_cd"},
			         {name:"Com_name"}
			    ],
			    pickListWidth:450,
		},
        {name: "remark", width:300},
        ];
	
	isc.ListGrid.create({
		ID:"managerHistoryLG", dataSource : managerHistoryDS,
	    autoDraw: false,
	    canEdit: true,
	    saveLocally: true,
	    saveByCell: false,
	    autoSaveEdits: false,
	    width:"100%",
	    overflow:"auto",
	    autoFitWidthApproach:"both",
	    wrapHeaderTitles:true,
	    headerHeight:40,
		fields: managerHistoryFields,
	    
	});
	
	var flagHistoryFields = [
    	{name: "imono", canEdit: false, disabled: true, width:80},
    	{name: "serial", canEdit: false, disabled: true, width:80},
        {name: "changedate", width:120},
		{ name: "flag_before", title: "Flag Before", width:180
			, optionDataSource:"countryOrFlagCodeDS"
			, valueField:"Country_cd"
			, displayField:"Countryname"
		    ,pickListFields:[
		         {name:"Country_cd"},
		         {name:"Countryname"}
		    ],
		    pickListWidth:450,
		},
//        {
//        	name: "flag_before_desc", canEdit: false, title: "Flag Before", width:120,
//        	formatCellValue: function (value, record) {
//                if (record.flag_before){
//                	return ship_history_country_map[record.flag_before.trim()];
//                }
//                return "";
//            },
//        },
		
		{ name: "flag_after", title: "Flag After", width:180
			, optionDataSource:"countryOrFlagCodeDS"
			, valueField:"Country_cd"
			, displayField:"Countryname"
		    ,pickListFields:[
			         {name:"Country_cd"},
			         {name:"Countryname"}
			    ],
			    pickListWidth:450,
		},
		
//        {
//        	name: "flag_after_desc", canEdit: false, title: "Flag After", width:120,
//        	formatCellValue: function (value, record) {
//                if (record.flag_after){
//                	return ship_history_country_map[record.flag_after.trim()];
//                }
//                return "";
//            },
//        },
        
        {name: "remark", width:300},
        ];
	
	isc.ListGrid.create({
		ID:"flagHistoryLG", dataSource : flagHistoryDS,
	    autoDraw: false,
	    canEdit: true,
	    saveLocally: true,
	    saveByCell: false,
	    autoSaveEdits: false,
	    width:"100%",
	    overflow:"auto",
	    autoFitWidthApproach:"both",
	    wrapHeaderTitles:true,
	    headerHeight:40,
		fields: flagHistoryFields,
	    
	});
	
	var companyRPHistoryFields = [
		{name: "serial_no", canEdit: false, disabled: true, width:80},
    	{name: "imono", canEdit: false, disabled: true, width:80},
        {name: "changedate", width:120},
        {name: "name_pre", width:180},
        {name: "name_cur", width:180},
        {name: "fax_pre", width:180},
        {name: "fax_cur", width:180},
        {name: "phone_pre", width:180},
        {name: "phone_cur", width:180},
        {name: "remark", width:300},
        ];
	
	isc.ListGrid.create({
		ID:"companyRPHistoryLG", dataSource : companyPRHistoryDS,
	    autoDraw: false,
	    canEdit: true,
	    saveLocally: true,
	    saveByCell: false,
	    autoSaveEdits: false,
	    width:"100%",
	    overflow:"auto",
	    autoFitWidthApproach:"both",
	    wrapHeaderTitles:true,
	    headerHeight:40,
		fields: companyRPHistoryFields,
	    
	});
	
	var managerNameHistoryFields =  [
    	{name: "Imono", canEdit: false, disabled: true, width:80,
    		formatCellValue: function (value, record) {
    			return ship_history_imono;
    		},
    	},
    	//{name: "manager_code", canEdit: false, disabled: true, width:80},
        {name: "changedate", width:120},
        {name: "manager_name", width:180},
        {name: "manager_name_cur", width:180},
        {name: "remark", width:300},
        ];
	
	isc.ListGrid.create({
		ID:"managerNameHistoryLG", dataSource : managementNameHistoryDS,
	    autoDraw: false,
	    canEdit: true,
	    saveLocally: true,
	    saveByCell: false,
	    autoSaveEdits: false,
	    width:"100%",
	    overflow:"auto",
	    autoFitWidthApproach:"both",
	    wrapHeaderTitles:true,
	    headerHeight:40,
		fields: managerNameHistoryFields,
	    
	});
	
	var csoHistoryFields = [
    	{name: "imono", canEdit: false, disabled: true, width:80},
        {name: "changedate", width:120},
        {name: "cso", width:180},
        {name: "cso_cur", width:180},
        {name: "remark", width:300},
        ];
	
	isc.ListGrid.create({
		ID:"csoHistoryLG", dataSource : csoHistoryDS,
	    autoDraw: false,
	    canEdit: true,
	    saveLocally: true,
	    saveByCell: false,
	    autoSaveEdits: false,
	    width:"100%",
	    overflow:"auto",
	    autoFitWidthApproach:"both",
	    wrapHeaderTitles:true,
	    headerHeight:40,
		fields: csoHistoryFields,
	    
	});
	
	var dpaHistoryFields = [
    	{name: "imono", canEdit: false, disabled: true, width:80},
        {name: "changedate", width:120},
        {name: "dpa", width:180},
        {name: "dpa_cur", width:180},
        {name: "remark", width:300},
        ];
	
	isc.ListGrid.create({
		ID:"dpaHistoryLG", dataSource : dpaHistoryDS,
	    autoDraw: false,
	    canEdit: true,
	    saveLocally: true,
	    saveByCell: false,
	    autoSaveEdits: false,
	    width:"100%",
	    overflow:"auto",
	    autoFitWidthApproach:"both",
	    wrapHeaderTitles:true,
	    headerHeight:40,
		fields: dpaHistoryFields,
	    
	});
	
	createHistoryLayout("shipname_history_layout", shipnameHistoryLG, shipnameHistoryDS, shipnameHistoryFields);
	createHistoryLayout("cs_history_layout", csHistoryLG, csHistoryDS, csHistoryFields);
	createHistoryLayout("owner_history_layout", ownerHistoryLG, ownerHistoryDS, ownerHistoryFields);
	createHistoryLayout("manager_history_layout", managerHistoryLG, managerHistoryDS, managerHistoryFields);
	createHistoryLayout("flag_history_layout", flagHistoryLG, flagHistoryDS, flagHistoryFields);
	createHistoryLayout("companyRP_history_layout", companyRPHistoryLG, companyPRHistoryDS, companyRPHistoryFields);
	createHistoryLayout("manager_name_history_layout", managerNameHistoryLG, managementNameHistoryDS, managerNameHistoryFields);
	createHistoryLayout("cso_history_layout", csoHistoryLG, csoHistoryDS, csoHistoryFields);
	createHistoryLayout("dpa_history_layout", dpaHistoryLG, dpaHistoryDS, dpaHistoryFields);
	
	isc.VLayout.create
    ({
	    ID:"fsqcShipProfileHistoryDataTab",
	    width:"100%",
    	members: 
    	[
    		shipHistoryRadioButtons,
    		shipname_history_layout,
    		cs_history_layout,
    		owner_history_layout,
    		manager_history_layout,
    		flag_history_layout,
    		companyRP_history_layout,
    		manager_name_history_layout,
    		cso_history_layout,
    		dpa_history_layout,
    	]
    })
    

	toggleFsqcShipProfileHistoryRadioButton("Shipname");
	
    return 	{
	    title: "History Data",
	    pane: fsqcShipProfileHistoryDataTab
	};
}
