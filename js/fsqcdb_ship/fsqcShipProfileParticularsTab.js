/***************************************************************************************************************
* Qualified Name	: 	/webui/src/main/webapp/js/fsqcdb_ship/fsqcShipProfileParticularsTab.js
* Created By		: 	Jacky Leong
* Created date		: 	2019-07-02
* **************************************************************************************************************
* Change log:
* log no	Change complete date	Developer			Change Reason
* ======	====================	=========			=============
* 00000		2019-07-02				Jacky Leong			Initial Implementation
* 00001		2019-07-25				Albert Chan			Add RO
* 00002     2019-09-03				Dicky Lee			Add Access controls
* 00003		2019-09-06				Albert Chan			Add Popup
* 00004		2019-09-12				Albert Chan			Add surveyShipType, operTypeCode and otDesc
*
****************************************************************************************************************/


var original_manager;
//var ship_type_button;
var ship_registry_closed_date_label;

function getFsqcShipProfileParticularsTab(i_dataSource, i_valuesManager, record)
{
	original_manager = record.Manager;

//	var ship_type_button = isc.IButton.create({
//		name: "ShipTypeBtn",
//		title: "Cargo Ship",
//		autoFit: true,
//		disabled: true,
//    	click : function () {
//    	}
//    });

	var save_button =
		isc.ISaveButton.create({
			//--changed by dicky 00002 -----
			name:"saveShipParticularsBtn", title:"Save", autoFit: true, onControl:"FSQC_ALL||FSQCSHIP_WRITE",
			//---end of changed
			click: function (){
				if(fsqcShipProfileVM.validate())
				{
					fsqcShipProfileVM.saveData
					(
						function (dsResponse, data, dsRequest)
						{
						  if(dsResponse.status==0)
						  {
							  isc.say(saveSuccessfulMessage);
							  enabledSection(true);
						  }
						}
					);
				}
			}
		});

	var managementInformationBtn = isc.IButton.create({

		//---changed by dicky 00002 ---
		name:"managementInformationBtn", title:"Management Information", autoFit: true, onControl:"FSQC_ALL||FSQCSHIP_WRITE_MANCOMP",
		//---end of changed ---
		autoFit: true,
    	click : function () {
			record.Manager = fsqcShipProfileVM.getValue('Manager');
			record.dpa = fsqcShipProfileVM.getValue('dpa');
			record.sco = fsqcShipProfileVM.getValue('sco');
			open_fsqcShipManagementInformationProfile(i_dataSource, i_valuesManager, record)
    	}
    });

	ship_registry_closed_date_label = isc.Label.create({
//	    height: 30,
//	    padding: 10,
	    align: "center",
	    valign: "center",
	    wrap: false,
	    //showEdges: true,
	    contents: ""
	})


	isc.ButtonToolbar.create({
		ID:"shipParticularsManagement_ToolBar",
		buttons:
		[
			//ship_type_button,
			save_button,
			managementInformationBtn,
			/*
			{name:"saveShipParticularsBtn", title:"Save", autoFit: true, onControl:"FSQC_ALL",
				click : function () {
					if(fsqcShipProfileVM.validate())
					{
//						if (original_manager) {
//							var manager_history = {};
//							manager_history["Imono"] = fsqcShipProfileVM.getValue('Imono');
//							manager_history["Changedate"] = new Date();
//							manager_history["Manager"] = original_manager;
//							manager_history["manager_cur"] = fsqcShipProfileVM.getValue('Manager');
//							manager_history["remark"] = "";
//							console.log(manager_history);
//							managerHistoryDS.updateData(manager_history);
//						}

						fsqcShipProfileVM.saveData
						(
							function (dsResponse, data, dsRequest)
							{
							  if(dsResponse.status==0)
							  {
								  isc.say(saveSuccessfulMessage);
								  enabledSection(true);
							  }
							}
						);
					}
				}
			},
			{name:"managementInformationBtn", title:"Management Information", autoFit: true, onControl:"FSQC_ALL",
				click : function () {
					record.Manager = fsqcShipProfileVM.getValue('Manager');
					record.dpa = fsqcShipProfileVM.getValue('dpa');
					record.sco = fsqcShipProfileVM.getValue('sco');
					open_fsqcShipManagementInformationProfile(i_dataSource, i_valuesManager, record)
				}
			},
			*/
		]
	});

	var shipParticularsManagement_ToolBarLayout = isc.HLayout.create({
	  	height:"5%",
	  	layoutAlign: "right",
		members: [
			ship_registry_closed_date_label,
			shipParticularsManagement_ToolBar
//			ship_type_button,
//			isc.IButton.create({
//				name: "saveShipParticularsBtn",
//				title: "Save",
//				autoFit: true,
//				disabled: false,
//				onControl:"FSQC_ALL",
//	        	click : function () {
//					if(fsqcShipProfileVM.validate())
//					{
//						if (original_manager) {
//							var manager_history = {};
//							manager_history["Imono"] = fsqcShipProfileVM.getValue('Imono');
//							manager_history["Changedate"] = new Date();
//							manager_history["Manager"] = original_manager;
//							manager_history["manager_cur"] = fsqcShipProfileVM.getValue('Manager');
//							manager_history["remark"] = "";
//							console.log(manager_history);
//							managerHistoryDS.updateData(manager_history);
//						}
//
//						fsqcShipProfileVM.saveData
//						(
//							function (dsResponse, data, dsRequest)
//							{
//							  if(dsResponse.status==0)
//							  {
//								  isc.say(saveSuccessfulMessage);
//								  enabledSection(true);
//							  }
//							}
//						);
//					}
//	        	}
//	        }),
//			isc.IButton.create({
//				name: "managementInformationBtn",
//				title: "Management Information",
//				autoFit: true,
//				disabled: false,
//				onControl:"FSQC_ALL",
//	        	click : function () {
//					record.Manager = fsqcShipProfileVM.getValue('Manager');
//					record.dpa = fsqcShipProfileVM.getValue('dpa');
//					record.sco = fsqcShipProfileVM.getValue('sco');
//					open_fsqcShipManagementInformationProfile(i_dataSource, i_valuesManager, record)
//	        	}
//	        }),
			]
	});

	isc.ControlledDynamicForm.create({
	    ID:"fsqcShipProfileParticularsTab_1",
	    //autoFocus: true,
	    groupTitle: "Main Detail",
 		//---added 00002
	    onControl:"FSQCSHIP_WRITE||FSQC_ALL",
	    //---end added
	    autoDraw:false,
	    isGroup: "true",
	    dataSource: i_dataSource,
		valuesManager:i_valuesManager,
		numCols: 10,
//	    itemLayout: "absolute",
		fields:
		[
			{name: "Imono", canEdit: false, disabled: true},
			{name: "Fileno", colSpan: 2},
			{type: "Spacer", colSpan: 1},
			{name: "Regdate", canEdit: false, disabled: true},
			{name: "Regno", canEdit: false, disabled: true},
			{name: "Spname", canEdit: false, disabled: true, colSpan: 3, width: "*", startRow: true},
			{name: "csname", canEdit: false, disabled: true, colSpan: 1, width: "*"},
			{name: "Del_mark", canEdit: false, disabled: true},
			{name: "re_regdate", canEdit: false, disabled: true},
			//{name: "Sptype_obj.sptyp_nam", colSpan: 3, width: "*"},
			{ name: "Sptype", canEdit: false, disabled: true, colSpan: 3, width: "*", startRow: true
				, optionDataSource:"shipTypeCodeDS"
				, valueField:"sptyp_cd"
				, displayField:"sptyp_nam"
		        , pickListFields:[
		              {name:"sptyp_cd"},
		              {name:"sptyp_nam"}
		          ],
		          pickListWidth:650,
			},

			{name: "Signno", canEdit: false, disabled: true, colSpan: 1, width: "*"},
			{name: "mmsi_no", colSpan: 1, width: "120"},
			{name: "cosInfoState", canEdit: false, disabled: true, colSpan: 1, width: "180"
				, optionDataSource:"codeCosInfoStateDS"
				, valueField:"cosInfoState"
				, displayField:"description"
		        , pickListFields:[
		              {name:"cosInfoState"},
		              {name:"description"}
		          ],
		          pickListWidth:250,
			},
	    ]
	});

	isc.ControlledDynamicForm.create({
	    ID:"fsqcShipProfileParticularsTab_2",
	    //autoFocus: true,
	    groupTitle: "Physical Detail",
		//---added 00002
	    onControl:"FSQCSHIP_WRITE||FSQC_ALL",
	    //---end added
	    autoDraw:false,
	    isGroup: "true",
		valuesManager:i_valuesManager,
		numCols: 10,
//	    itemLayout: "absolute",
		fields:
		[
			{name: "Speed", canEdit: false, disabled: true, type:"float", format:",0.0", width:"80"},
			{name: "Gross", canEdit: false, disabled: true, width:"140"},
			{name: "hull_con", canEdit: false, disabled: true, width:"120"},
			{name: "del_date", canEdit: true, disabled: false, width:"120"},
			{name: "flagout_date", canEdit: false, disabled: true, width:"120"},


			{name: "length_ll", canEdit: false, disabled: true, width:"80"},
			{name: "Net", canEdit: false, disabled: true, width:"140"},
			{name: "Builtdate", canEdit: false, disabled: true, width:"120"},
			{name: "Recommendation", canEdit: false, disabled: true, endRow: true, width:"120"},

			{name: "B", canEdit: false, disabled: true, width:"80"},
			{name: "Dw", canEdit: false, disabled: true, width:"140"},
			{name: "SR_SPTYPE", canEdit: false, disabled: true, colSpan: 5, width: "*", endRow: true},


			{name: "D", canEdit: false, disabled: true, width:"80"},
			{name: "engine", canEdit: false, disabled: true, width:"140"},
			{name: "SR_SUBTYPE", canEdit: false, disabled: true, colSpan: 5, width: "*"},


			{name: "hullno"},
			{name: "passengers"},
			{name: "crews"},
			//{ _constructor:"SpacerItem", colSpan: 2 },


			{name: "a_or_3m", startRow: true},
			{ name: "subtype"
				, optionDataSource:"passengerShipSubTypeCodeDS"
				, valueField:"subtype_cd"
				, displayField:"subtype_nam"
			},

	        //{ _constructor:"SpacerItem", colSpan: 4 },



			// start 00004
			{name: "operTypeCode", canEdit: false, disabled: true, startRow: true, width:"80"},
			{name: "otDesc", canEdit: false, disabled: true, width:"140"},
			{name: "surveyShipType", canEdit: false, disabled: true, colSpan: 5, width: "*"},


			// end 00004

//			{name: "Manager", 	title:"File No. of company", canEdit: false, disabled: true
//				, optionDataSource:"companyManagementDS",
//		          valueField:"Com_cd", foreignDisplayField:"Com_fileno",
//			},
	    ]
	});

	isc.ControlledDynamicForm.create({
	    ID:"fsqcShipProfileParticularsTab_3",
	    //autoFocus: true,
	    groupTitle: "Personnel Detail",
	    autoDraw:false,
  		//---added 00002
	    onControl:"FSQCSHIP_WRITE||FSQC_ALL",
	    //---end added
	    isGroup: "true",
		valuesManager:i_valuesManager,
		numCols: 10,
//	    itemLayout: "absolute",
		fields:
		[
			{name: "btn_Manager", 	title:"Manager", type:"button", startRow: false, endRow:false, align: "right", colSpan: 1, width: 100,
				disabled:!hasAccess("FSQCSHIP_WRITE_MANCOMP||FSQC_ALL"), showDisabled: true,
				click : function (record, recordNum, fieldNum)
				{
					record.Manager = fsqcShipProfileVM.getValue('Manager');
					record.Manager_next = fsqcShipProfileVM.getValue('Manager_next');
					record.dpa = fsqcShipProfileVM.getValue('dpa');
					record.dpa_next = fsqcShipProfileVM.getValue('dpa_next');
					record.sco = fsqcShipProfileVM.getValue('sco');
					record.sco_next = fsqcShipProfileVM.getValue('sco_next');
					open_fsqcShipManagementInformationProfile(i_dataSource, i_valuesManager, record, 0)
				}
			},
			{name: "Manager", 	type: "select", startRow: false, colSpan: 5, width: "*", showTitle: false, canEdit: false, disabled: true
				, optionDataSource:"companyManagementDS",
		          valueField:"Com_cd", foreignDisplayField:"Com_name",
		          pickListFields:[
		              {name:"imo_comno"},
		              {name:"Com_name"}
		          ],
		          pickListWidth:650,
			},
			{name: "Status"
				, optionDataSource:"codeClassStatusDS",
					valueField:"Csstat_cd", foreignDisplayField:"Csstat_des",
				    pickListFields:[
				         {name:"Csstat_cd"},
				         {name:"Csstat_des"}
				    ],
				    pickListWidth:550,
				    endRow:true,
			},
			{name: "Com_fileno", type: "select",	title:"File No. of company", canEdit:false, disabled:true
				, optionDataSource:"companyManagementDS",
		          valueField:"Com_cd", foreignDisplayField:"Com_fileno",
			 		pickListFields:[{name:"Com_fileno", title:"Com_fileno"}],
		          getPickListFilterCriteria: function(){
	                	return {Com_cd:fsqcShipProfileParticularsTab_3.getValue('Manager')};
	                },
			      dataArrived: function(){
			    	  	fsqcShipProfileParticularsTab_3.getItem('Com_fileno').setDefaultValue(fsqcShipProfileParticularsTab_3.getItem('Com_fileno').getFirstOptionValue());
			        },
		          //pickListCriteria:{Com_cd:fsqcShipProfileParticularsTab_3.getValue('Manager')},
			},
			{name: "Manager_start_date", canEdit: false, disabled: true, colSpan: 3},
			{name: "Cs", startRow: false
				, optionDataSource:"codeRODS", allowEmptyValue: false,
		          valueField:"Cs_cd", foreignDisplayField:"Cs_cd",
		          pickListFields:[
		              {name:"Cs_cd"},
		              {name:"Cs_name"}
		          ],
		          pickListWidth:550,
		          optionCriteria:{
		        	  hide:"2"
			      },
			},
			{name: "sco", startRow: true, disabled:true, startRow:true},
			//{name: "sco_start_date"},
			{name: "dpa", title:"DPA", disabled: true, colSpan: 3},
			//{name: "dpa_start_date", title:"DPA Start Date"},
			{name: "CS2"
				, optionDataSource:"codeRODS", allowEmptyValue: true,
		          valueField:"Cs_cd", foreignDisplayField:"Cs_cd",
		          pickListFields:[
		              {name:"Cs_cd"},
		              {name:"Cs_name"}
		          ],
		          pickListWidth:550,
		          optionCriteria:{
		        	  hide:"2"
			      },
			},
			{name: "btn_Manager_next", 	title:"Next Manager", type:"button", startRow: true, endRow:false, align: "right", colSpan: 1, width: 130,
				disabled:!hasAccess("FSQCSHIP_WRITE_MANCOMP||FSQC_ALL"), showDisabled: true,
				click : function (record, recordNum, fieldNum)
				{
					console.log(fsqcShipProfileVM.getValue('Manager_next'));
					if(fsqcShipProfileVM.getValue('Manager_next') == undefined){
						record.Manager_next = fsqcShipProfileVM.getValue('Manager');
						record.dpa_next = fsqcShipProfileVM.getValue('dpa');
						record.sco_next = fsqcShipProfileVM.getValue('sco');
					}else{
						record.Manager_next = fsqcShipProfileVM.getValue('Manager_next');
						record.dpa_next = fsqcShipProfileVM.getValue('dpa_next');
						record.sco_next = fsqcShipProfileVM.getValue('sco_next');
					}
					open_fsqcShipManagementInformationProfile(i_dataSource, i_valuesManager, record, 1);
				}
			},
			{name: "Manager_next", 	type: "select", startRow: false, colSpan: 5, width: "*", showTitle: false, canEdit: false, disabled: true
				, optionDataSource:"companyManagementDS",
		          valueField:"Com_cd", foreignDisplayField:"Com_name",
		          pickListFields:[
		              {name:"imo_comno"},
		              {name:"Com_name"}
		          ],
		          pickListWidth:650,
			      dataArrived: function(startRow, endRow, data){

			    		if(this.getValue() == undefined){
			    			//this.setDefaultValue(fsqcShipProfileParticularsTab_3.getValue('Manager'));
			    			//fsqcShipProfileParticularsTab_3.getItem('sco_next').setDefaultValue(fsqcShipProfileParticularsTab_3.getValue('sco'));
			    			//fsqcShipProfileParticularsTab_3.getItem('dpa_next').setDefaultValue(fsqcShipProfileParticularsTab_3.getValue('dpa'));
			    			//fsqcShipProfileVM.setValue('Manager_next', fsqcShipProfileParticularsTab_3.getValue('Manager'));
			    			//fsqcShipProfileParticularsTab_3.getItem('sco_next').setDefaultValue(fsqcShipProfileParticularsTab_3.getValue('sco'));
			    			//fsqcShipProfileParticularsTab_3.getItem('dpa_next').setDefaultValue(fsqcShipProfileParticularsTab_3.getValue('dpa'));

			    		}

			      },

			},
			{name: "ro_ism", startRow: false
//				{name: "ro_ism", 	type: "select", startRow: true, colSpan: 3, width: "*"
					, optionDataSource:"codeRODS", allowEmptyValue: true,
			          valueField:"Cs_cd", foreignDisplayField:"Cs_cd",
			          pickListFields:[
			              {name:"Cs_cd"},
			              {name:"Cs_name"}
			          ],
			          pickListWidth:550, 
			          optionCriteria:{
							hide:"2"
				      },
			},

			{name: "Manager_next_start_date", canEdit: false, disabled: true, startRow:true, colSpan: 5},
			//{name: "Manager_obj.Com_fileno", type: "staticText"},
//			{name: "Manager", 	type: "staticText", disabled: true, startRow: false, colSpan: 1, width: "*"
//				, optionDataSource:"companyManagementDS",
//		          valueField:"Com_cd", displayField:"Com_fileno",
//		          pickListFields:[
//		              {name:"imo_comno"},
//		              {name:"Com_name"}
//		          ],
//		          pickListWidth:850,
//			},
			{name: "rso_issc"
//				{name: "rso_issc", 	type: "select", startRow: true, colSpan: 3, width: "*"
					, optionDataSource:"codeRODS", allowEmptyValue: true,
			          valueField:"Cs_cd", foreignDisplayField:"Cs_cd",
			          pickListFields:[
			              {name:"Cs_cd"},
			              {name:"Cs_name"}
			          ],
			          pickListWidth:550,
			          optionCriteria:{
			        	  hide:"2"
				      },
				},


			{name: "sco_next", startRow: true, disabled: true, startRow:true},
			//{name: "sco_next_start_date"},

			{name: "dpa_next",  title:"Next DPA",  disabled: true},
			//{name: "dpa_next_start_date",  title:"Next DPA Start Date"},

			{name: "btn_Owner", 	title:"Owner", type:"button", startRow: true, endRow:false, align: "right", colSpan: 1, width: 100,
//				disabled:!hasAccess("FSQCSHIP_WRITE_MANCOMP||FSQC_ALL"), showDisabled: true,
				click : function (record, recordNum, fieldNum)
				{
					// changed by Albert 00003
					var shared_width = 1000;
					open_codeTableWindow(companyOwnerCodeDS, {"Owner_cd":record.getValue("Owner")}, this.title,
							[
								{name: "Owner_cd", disabled:true},
								{name: "Owner_des"	, width:shared_width, colSpan:"5"},
								{name: "add1"		, width:shared_width, colSpan:"5" },
								{name: "add2"		, width:shared_width, colSpan:"5" },
								{name: "add3"		, width:shared_width, colSpan:"5" },
								{name: "add4"		, width:shared_width, colSpan:"5" },
								{name: "ownerCR"	, width:shared_width/2, colSpan:"1" },
							]
					);
				}
			},
			{name: "Owner", startRow: false, canEdit: false, disabled: true, colSpan: 3, width: "*", showTitle: false
				, optionDataSource:"companyOwnerCodeDS",
		          valueField:"Owner_cd", foreignDisplayField:"Owner_des",
			},

			{name: "btn_Agent", 	title:"HK Representative", type:"button", startRow: true, endRow:false, align: "right", colSpan: 1, width: 150,
//				disabled:!hasAccess("FSQCSHIP_WRITE_MANCOMP||FSQC_ALL"), showDisabled: true,
				click : function (record, recordNum, fieldNum)
				{
					// changed by Albert 00003
					var shared_width = 1000;
					open_codeTableWindow(companyRPDS, {"Com_cd":record.getValue("agent")}, this.title,
						[
							{name: "Com_cd",  disabled:true},
							{name: "Com_name"	, width:shared_width, colSpan:"5"},
							{name: "Address1"	, width:shared_width, colSpan:"5" },
							{name: "Address2"	, width:shared_width, colSpan:"5" },
							{name: "Address3"	, width:shared_width, colSpan:"5" },
							{name: "Address4"	, width:shared_width, colSpan:"5" },
							{name: "Fax" 		, width:shared_width/2, colSpan:"1" },
							{name: "Phone" 		, width:shared_width/2			, colSpan:"1" },
							{name: "Email"		, width:shared_width, colSpan:"5" },
							{name: "Person"		, width:shared_width/2			, colSpan:"1" },
							{name: "rpCR"		, width:shared_width/2, colSpan:"1" },
						]
					);
				}
			},
			{name: "agent", startRow: false, canEdit: false, disabled: true, colSpan: 3, width: "*", showTitle: false
				, optionDataSource:"companyRPDS",
		          valueField:"Com_cd", foreignDisplayField:"Com_name",
			},
			{name: "btn_Demise", 	title:"Demise Charter", type:"button", startRow: true, endRow:false, align: "right", colSpan: 1, width: 150,
//				disabled:!hasAccess("FSQCSHIP_WRITE_MANCOMP||FSQC_ALL"), showDisabled: true,
				click : function (record, recordNum, fieldNum)
				{
					// changed by Albert 00003
					var shared_width = 1000;
					open_codeTableWindow(demiseCharterDS, {"demise_cd":record.getValue("demise")}, this.title,
							[
								{name: "demise_cd",  disabled:true},
								{name: "demise_des"			, width:shared_width, colSpan:"5"},
								{name: "demise_add"			, width:shared_width, colSpan:"5"},
								{name: "demise_add2"		, width:shared_width, colSpan:"5"},
								{name: "demise_add3"		, width:shared_width, colSpan:"5"},
								{name: "duration_begin"		, colSpan:"5"},
								{name: "duration_end"		, colSpan:"5"},
								{name: "demiseCR"			, width:shared_width/2, colSpan:"1", endRow:true},
								{name: "email"				, width:shared_width/2, colSpan:"5"},
							]
					);
				}
			},
			{name: "demise", startRow: false, canEdit: false, disabled: true, colSpan: 3, width: "*", showTitle: false
				, optionDataSource:"demiseCharterDS",
		          valueField:"demise_cd", foreignDisplayField:"demise_des",
			},

			{name: "Note", startRow: true, colSpan: 5, rowSpan: 3, width: "*", type: "textArea"},
	    ]
	});

	isc.ListGrid.create({
		ID:"shipOwnersLG", dataSource : companyOwnerCodeDS,
	    //autoDraw: false,
		height: 100,
	    width:"100%",
	    overflow:"auto",
	    autoFitWidthApproach:"both",
	    headerHeight:40,
		rowDoubleClick:function(owner_record, owner_record_num, fieldNum){
			open_codeTableWindow(companyOwnerCodeDS, {"Owner_cd":owner_record.Owner_cd}, this.title,
					
					[
						{name: "Owner_cd",  disabled:true},
						{name: "Owner_des"},
						{name: "add1"},
						{name: "add2"},
						{name: "add3"},
						{name: "add4"},
						{name: "Del_mark"},
						{name: "ownerCR"},

					]
			);
	    },

	});

	isc.VLayout.create
    ({
	    ID:"fsqcShipProfileParticularsTab",
	    width:"80%",
    	members:
    	[
    		shipParticularsManagement_ToolBarLayout
    		,fsqcShipProfileParticularsTab_1
    		, fsqcShipProfileParticularsTab_2
    		, fsqcShipProfileParticularsTab_3
    		, shipOwnersLG
    	]
    })

	var show_ship_registry_closed_date_label = false;

	shipOwnersLG.setData(record.owners);

    switch (record.Del_mark)
    {
    case "A":
        fsqcShipProfileParticularsTab.setBackgroundColor(ship_registry_flag_A);
    	break;
    case "D":
        fsqcShipProfileParticularsTab.setBackgroundColor(ship_registry_flag_D);
        if (record.flagout_date) {
        	show_ship_registry_closed_date_label = true;
        	ship_registry_closed_date_label.setContents("Ship Registry Closed on " +
        			record.flagout_date.getDate() + "-" +
        			(record.flagout_date.getMonth() + 1) + "-" +
        			record.flagout_date.getFullYear()
        			);
        }
//        if (record.del_date) {
//        	show_ship_registry_closed_date_label = true;
//        	ship_registry_closed_date_label.setContents("Ship Registry Closed on " +
//        			record.del_date.getDate() + "-" +
//        			(record.del_date.getMonth() + 1) + "-" +
//        			record.del_date.getFullYear()
//        			);
//        }
    	break;
    case "F":
    	fsqcShipProfileParticularsTab.setBackgroundColor(ship_registry_flag_F);
    	break;
    case "P":
    	fsqcShipProfileParticularsTab.setBackgroundColor(ship_registry_flag_P);
    	break;
    }

    if (show_ship_registry_closed_date_label) {
    	ship_registry_closed_date_label.show();
    } else {
    	ship_registry_closed_date_label.hide();
    }


    if (record.Sptype) {
	    switch (record.Sptype.trim())
	    {
	    case "70":
	    case "71":
	    case "83":

	    	//ship_type_button.setTitle("PAX Ship");

	    	fsqcShipProfileParticularsTab_2.showField('hullno');
	    	fsqcShipProfileParticularsTab_2.showField('passengers');
	    	fsqcShipProfileParticularsTab_2.showField('crews');
	    	fsqcShipProfileParticularsTab_2.showField('a_or_3m');
	    	fsqcShipProfileParticularsTab_2.showField('subtype');

	    	fsqcShipProfileParticularsTab_1.hideField('Regdate');
	    	fsqcShipProfileParticularsTab_1.hideField('mmsi_no');
	    	fsqcShipProfileParticularsTab_1.hideField('Signno');
	    	fsqcShipProfileParticularsTab_2.hideField('Speed');
	    	fsqcShipProfileParticularsTab_2.hideField('hull_con');
	    	fsqcShipProfileParticularsTab_2.hideField('B');
	    	fsqcShipProfileParticularsTab_2.hideField('Dw');
	    	fsqcShipProfileParticularsTab_2.hideField('del_date');
	    	fsqcShipProfileParticularsTab_2.hideField('D');
	    	fsqcShipProfileParticularsTab_2.hideField('engine');
	    	fsqcShipProfileParticularsTab_2.hideField('Recommendation');
	    	fsqcShipProfileParticularsTab_3.hideField('sco');
	    	fsqcShipProfileParticularsTab_3.hideField('sco_start_date');
	    	fsqcShipProfileParticularsTab_3.hideField('sco_next');
	    	fsqcShipProfileParticularsTab_3.hideField('sco_next_start_date');
	    	fsqcShipProfileParticularsTab_3.hideField('dpa');
	    	fsqcShipProfileParticularsTab_3.hideField('dpa_start_date');
	    	fsqcShipProfileParticularsTab_3.hideField('dpa_next');
	    	fsqcShipProfileParticularsTab_3.hideField('dpa_next_start_date');
	    	fsqcShipProfileParticularsTab_3.hideField('ro_ism');
	    	fsqcShipProfileParticularsTab_3.hideField('rso_issc');

	    	break;
	    default:
	    	//ship_type_button.setTitle("Cargo Ship");

	    	fsqcShipProfileParticularsTab_2.hideField('hullno');
	    	fsqcShipProfileParticularsTab_2.hideField('passengers');
	    	fsqcShipProfileParticularsTab_2.hideField('crews');
	    	fsqcShipProfileParticularsTab_2.hideField('a_or_3m');
	    	fsqcShipProfileParticularsTab_2.hideField('subtype');

	    	fsqcShipProfileParticularsTab_1.showField('Regdate');
	    	fsqcShipProfileParticularsTab_1.showField('mmsi_no');
	    	fsqcShipProfileParticularsTab_1.showField('Signno');
	    	fsqcShipProfileParticularsTab_2.showField('Speed');
	    	fsqcShipProfileParticularsTab_2.showField('hull_con');
	    	fsqcShipProfileParticularsTab_2.showField('B');
	    	fsqcShipProfileParticularsTab_2.showField('Dw');
	    	fsqcShipProfileParticularsTab_2.showField('del_date');
	    	fsqcShipProfileParticularsTab_2.showField('D');
	    	fsqcShipProfileParticularsTab_2.showField('engine');
	    	fsqcShipProfileParticularsTab_2.showField('Recommendation');
	    	fsqcShipProfileParticularsTab_3.showField('sco');
	    	fsqcShipProfileParticularsTab_3.showField('sco_start_date');
	    	fsqcShipProfileParticularsTab_3.showField('sco_next');
	    	fsqcShipProfileParticularsTab_3.showField('sco_next_start_date');
	    	fsqcShipProfileParticularsTab_3.showField('dpa');
	    	fsqcShipProfileParticularsTab_3.showField('dpa_start_date');
	    	fsqcShipProfileParticularsTab_3.showField('dpa_next');
	    	fsqcShipProfileParticularsTab_3.showField('dpa_next_start_date');
	    	fsqcShipProfileParticularsTab_3.showField('ro_ism');
	    	fsqcShipProfileParticularsTab_3.showField('rso_issc');
	    	break;
	    }
    }


    return 	{
	    title: "Ship Particulars",
	    pane: fsqcShipProfileParticularsTab
	};
}
