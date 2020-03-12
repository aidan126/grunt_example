/***************************************************************************************************************
* Qualified Name	: 	/webui/src/main/webapp/js/fsqcdb_ship/fsqcShipProfile.js
* @author 				Jacky Leong
* @since				2019-07-02
* **************************************************************************************************************
* Change log:
* log no	Change complete date	Developer			Change Reason
* ======	====================	=========			=============
* 00000		2019-07-02				Jacky Leong			Initial Implementation
* 00001		2019-07-25				Albert Chan			Add RO
*
*
****************************************************************************************************************/

var ship_profile_record;

function fsqcShipProfileControl(i_dataSource, record)
{
	ship_profile_record = record;
	isc.ValuesManager.create({
        ID: "fsqcShipProfileVM",
		dataSource: i_dataSource
	});

	isc.ValuesManager.create({
        ID: "fsqcShipProfileManagerVM",
		dataSource: companyManagementDS
	});

	var is_pax = false;
	var cargo_PAX_text = "Cargo Ship";
	var cargo_PAX_backgroundColor = "#ff0000";
    if (record.Sptype) {
	    switch (record.Sptype.trim())
	    {
	    case "70":
	    case "71":
	    case "83":
	    	is_pax = true;
	    	cargo_PAX_text = "PAX Ship";
	    	cargo_PAX_backgroundColor = "#00ff00";
	    	break;
        default:
	    	break;
	    }
    }

	var cargo_PAX_label = isc.Label.create({
	    height: 27,
	    styleName: "cargo_PAX_text",
//	    padding: 4,
	    backgroundColor: cargo_PAX_backgroundColor,
	    align: "center",
	    valign: "center",
	    wrap: false,
	    contents: cargo_PAX_text
	})

	var shipChanged = function(form, item, value){
		var selectedTabNo = fsqcShipProfileTabSet.getSelectedTabNumber();
		fsqcShipProfileVM.setValues({});
		fsqcShipProfileVM.setData({});
		fsqcShipProfileVM.reset();
		fsqcShipProfileVM.clearErrors(true);
		open_fsqcShipProfile(fsqcShipDS, item.pickList.selection.getSelectedRecord(), function() {
			fsqcShipProfileTabSet.selectTab(selectedTabNo);
		});
	}

	isc.DynamicForm.create({
		ID:"fsqcShipProfileTopShip",
		valuesManager:"fsqcShipProfileVM",
//		cellBorder: 1,
//		isGroup: "true",
//		groupTitle: "Ship main data",
//		width:"90%",
		width:"100%",
		numCols: 8,
		fixedColWidths: false,
//		colWidths: ["*", "*", "*", "*", "*", "*", "*", "*"],
		fields:
		[
			{
				name: "Spname", 
				optionDataSource:"fsqcShipDS",
				valueField:"Spname",
				displayField:"Spname",
				type:"label", 	
				canEdit: true,
				disabled: false,
				startRow: true,
				width:"*", 
				colSpan: 3,
				sortField:"Spname",
				pickListProperties: {
					showFilterEditor:true,
					alternateRecordStyles:false
				},
				pickListFields:[
					{name:"Spname"},
					{name:"Imono", width: 100},
				],
				changed: shipChanged,
			},
            {name: "Imono", type:"label", 	canEdit: false, disabled: true, colSpan: 1},
            {name: "mmsi_no", type:"label", 	canEdit: false, disabled: true,	colSpan: 1},
            
			//{name: "Cs", 		canEdit: false, disabled: true,	colSpan: 1},
			{ name: "Cs", type:"label", canEdit: false, disabled: true, colSpan: 1
				, optionDataSource:"codeRODS"
				, valueField:"Cs_cd"
				, displayField:"Cs_cd"
			},

			{name: "Status", type:"label", 	canEdit: false, disabled: true,	colSpan: 1
				, optionDataSource:"codeClassStatusDS"
				, valueField:"Csstat_cd"
				, displayField:"Csstat_des"
			},
			
		],
	});

	isc.DynamicForm.create({
		ID:"fsqcShipProfileTopManager",
		valuesManager:"fsqcShipProfileManagerVM",
//		cellBorder: 1,
//		isGroup: "true",
//		groupTitle: "Ship main data",
		width:"90%",
		numCols: 9,
		fixedColWidths: false,
//		colWidths: ["*", "*", "*", "*", "*", "*", "*", "*", "*"],
		fields:
		[
			{name: "Com_name", type:"label", 	canEdit: false, disabled: true,	startRow: true, colSpan: 4, width: "*", title:"Company Name" },
//			{name: "Manager_obj.Com_name", 	canEdit: false, disabled: true,	startRow: true, colSpan: 7, width: "*", title:"Company Name" },
//			{name: "Manager", canEdit: false, disabled: true,	startRow: true, colSpan: 7, width: "*"
//				, optionDataSource:"companyManagementDS"
//				, valueField:"Com_cd"
//				, displayField:"Com_name"
//				, title:"Company Name"
//			},


			{name: "company_grading", type:"label",	canEdit: false, disabled: true,	startRow: false, colSpan: 1, width: "*", title:"Company Grading" },
//			{name: "Manager_obj.company_grading",	canEdit: false, disabled: true,	startRow: true, colSpan: 1, width: "*", title:"Company Grading" },
//			{name: "Manager", canEdit: false, disabled: true,	startRow: true, colSpan: 1, width: "*"
//				, optionDataSource:"companyManagementDS"
//				, valueField:"Com_cd"
//				, displayField:"company_grading"
//				, title:"Company Grading"
//			},
			{name: "grading", type:"label",	canEdit: false, disabled: true,	startRow: false, colSpan: 1, width: "*", title:"ISM Grading" },
//			{name: "Manager_obj.grading",	canEdit: false, disabled: true,	startRow: false, colSpan: 1, width: "*", title:"ISM Grading" },
//			{name: "Manager", canEdit: false, disabled: true,	startRow: false, colSpan: 1, width: "*"
//				, optionDataSource:"companyManagementDS"
//				, valueField:"Com_cd"
//				, displayField:"grading"
//				, title:"ISM Grading"
//			},

			{name: "Fax", type:"label",		canEdit: false, disabled: true,	startRow: true, colSpan: 1, width: "*", title:"Fax" },
//			{name: "Manager_obj.Fax",		canEdit: false, disabled: true,	startRow: true, colSpan: 3, width: "*", title:"Fax" },
//			{name: "Manager", canEdit: false, disabled: true,	startRow: true, colSpan: 3, width: "*"
//				, optionDataSource:"companyManagementDS"
//				, valueField:"Com_cd"
//				, displayField:"Fax"
//				, title:"Fax"
//			},
			{name: "Phone", type:"label",		canEdit: false, disabled: true,	startRow: false, colSpan: 1, width: "*", title:"Phone" },
//			{name: "Manager_obj.Phone",		canEdit: false, disabled: true,	startRow: true, colSpan: 3, width: "*", title:"Phone" },
//			{name: "Manager", canEdit: false, disabled: true,	startRow: true, colSpan: 3, width: "*"
//				, optionDataSource:"companyManagementDS"
//				, valueField:"Com_cd"
//				, displayField:"Phone"
//				, title:"Phone"
//			},
			{name: "Email", type:"label",		canEdit: false, disabled: true,	startRow: false, colSpan: 2, width: "*", title:"Email" },
//			{name: "Manager_obj.Email",		canEdit: false, disabled: true,	startRow: true, colSpan: 3, width: "*", title:"Email" },
//			{name: "Manager", canEdit: false, disabled: true,	startRow: true, colSpan: 3, width: "*"
//				, optionDataSource:"companyManagementDS"
//				, valueField:"Com_cd"
//				, displayField:"Email"
//				, title:"Email"
//			},

			{name: "city", type:"label",		canEdit: false, disabled: true,	startRow: true, colSpan: 1, width: "*", title:"City" },
//			{name: "Manager_obj.city",		canEdit: false, disabled: true,	startRow: false, colSpan: 1, width: "*", title:"City" }
//			{name: "Manager", canEdit: false, disabled: true,	startRow: false, colSpan: 1, width: "*"
//				, optionDataSource:"companyManagementDS"
//				, valueField:"Com_cd"
//				, displayField:"city"
//				, title:"City"
//			},
			{name: "country", type:"label",	canEdit: false, disabled: true,	startRow: false, colSpan: 1, width: "*", title:"Country" },
//			{name: "Manager_obj.country",	canEdit: false, disabled: true,	startRow: false, colSpan: 1, width: "*", title:"Country" },
//			{name: "Manager", canEdit: false, disabled: true,	startRow: false, colSpan: 1, width: "*"
//				, optionDataSource:"companyManagementDS"
//				, valueField:"Com_cd"
//				, displayField:"country"
//				, title:"Country"
//			},

			{name: "Address_e", type:"label", titleVAlign:"top", canEdit: false, disabled: true,	startRow: false, colSpan: 4, rowSpan: 2, width: "*", height:50, type: "textArea", title:"Correspondence Address" },
//			{name: "Manager_obj.Address_e",	canEdit: false, disabled: true,	startRow: false, colSpan: 3, rowSpan: 3, width: "*", type: "textArea", title:"Correspondence Address" },
//			{name: "Manager", canEdit: false, disabled: true,	startRow: false, colSpan: 3, rowSpan: 3, width: "*", type: "textArea"
//				, optionDataSource:"companyManagementDS"
//				, valueField:"Com_cd"
//				, displayField:"Address_e"
//				, title:"Correspondence Address"
//			},
            {type:"SpacerItem"},
            {type:"SpacerItem"},
            
            
//			{name: "Manager", 	canEdit: false, disabled: true,	startRow: true, colSpan: 7, width: "*"
////				, type: "select"
//				, optionDataSource:"companyManagementDS",
//		          valueField:"Com_cd", displayField:"Com_name",
//		          pickListFields:[
//		              {name:"imo_comno"},
//		              {name:"Com_name"}
//		          ],
//		          pickListWidth:350,
//			},
//			{name: "Manager", title: "Fax",	disabled: true,	canEdit: false, startRow: true, colSpan: 3, width: "*"
//				, type: "select"
//				, optionDataSource:"companyManagementDS",
//		          valueField:"Com_cd", displayField:"Fax",
//		          pickListFields:[
//		              {name:"imo_comno"},
//		              {name:"Com_name"}
//		          ],
//		          pickListWidth:350,
//			},
//


//			{name: "id", title:"ID", startRow: true, colSpan: 3, width: 300, type: "staticText"},
//			{name: "spname", title:"Name of Ship",	required: true, startRow: false, colSpan: 2, width: 300},
//
//			{name: "imono", title:"IMO NO.", startRow: true, colSpan: 3, width: 300},
//			{name: "distinct_no", title:"Distinct No.",	startRow: false, colSpan: 2, width: 300},
//
//			{name: "sptype", title:"Type of Ship", startRow: true, colSpan: 3, width: 300},
//			{name: "offno", title:"Off. No.",	startRow: false, colSpan: 2, width: 300},
//
//			{name: "gross", title:"Gross", startRow: true, colSpan: 3, width: 300},
//			{name: "engine_power", title:"Engine Power",	startRow: false, colSpan: 2, width: 300},
//
//			{name: "trading_area", title:"Trading Area", startRow: true, colSpan: 3, width: 300},
//			{name: "registry_port", title:"Registry Port",	startRow: false, colSpan: 2, width: 300},
//
//			{name: "dw", title:"Dw", startRow: true, colSpan: 3, width: 300},
//			{name: "net", title:"Net",	startRow: false, colSpan: 2, width: 300},
//
//			{name: "pp", title:"Pp", startRow: true, colSpan: 3, width: 300},
//			{name: "loa", title:"Loa",	startRow: false, colSpan: 2, width: 300},
//
//			{name: "breadth", title:"Breadth", startRow: true, colSpan: 3, width: 300},
//			{name: "depth", title:"Depth",	startRow: false, colSpan: 2, width: 300},
//
//			{name: "speed", title:"Speed", startRow: true, colSpan: 3, width: 300},
//			{name: "register_date", title:"Register Date",	startRow: false, colSpan: 2, width: 300},
//
//			{name: "class", title:"Class", startRow: true, colSpan: 3, width: 300},
//			{name: "stat", title:"Stat",	startRow: false, colSpan: 2, width: 300},
//
//			{name: "flag", title:"Flag", startRow: true, colSpan: 3, width: 300},
//			{name: "operator", title:"Operator",	startRow: false, colSpan: 2, width: 300},
		]
	});

//	isc.DynamicForm.create({
//		ID:"fsqcShipProfileTopManager",
////		valuesManager:"fsqcShipProfileManagerVM",
//		width: fsqcShipProfileTopShip.width,
//		numCols: 10,
////		colWidths: ["*", "*", "*", "*", "*", "*", "*", "*"],
//		fields:
//		[
//			{name: "Com_name", 	canEdit: false, disabled: true,	startRow: true, colSpan: 7, width: "*" },
//			{name: "Fax",		canEdit: false, disabled: true,	startRow: true, colSpan: 3, width: "*" },
//			{name: "Address_e",	canEdit: false, disabled: true,	startRow: false, colSpan: 3, rowSpan: 3, width: "*", type: "textArea" },
//			{name: "Phone",		canEdit: false, disabled: true,	startRow: true, colSpan: 3, width: "*" },
//			{name: "Email",		canEdit: false, disabled: true,	startRow: true, colSpan: 3, width: "*" },
//			{name: "company_grading",	canEdit: false, disabled: true,	startRow: true, colSpan: 1, width: "*" },
//			{name: "grading",	canEdit: false, disabled: true,	startRow: false, colSpan: 1, width: "*" },
//			{name: "country",	canEdit: false, disabled: true,	startRow: false, colSpan: 1, width: "*" },
//			{name: "city",		canEdit: false, disabled: true,	startRow: false, colSpan: 1, width: "*" }
//
//		]
//	});

//
//	isc.DynamicForm.create({
//	    ID:"fsqcShipProfileParticularsTab_1",
//	    //autoFocus: true,
//	    autoDraw:false,
//	    isGroup: "true",
//		valuesManager:"fsqcShipProfileVM",
//		numCols: 8,
////	    itemLayout: "absolute",
//		fields:
//		[
//			{name: "Imono"},
//			{name: "Fileno"},
//			{name: "Regdate"},
//			{name: "Regno"},
//			{name: "Spname", colSpan: 3, width: "*"},
//			{name: "csname", colSpan: 3, width: "*"},
//			{name: "Sptype", colSpan: 3, width: "*"},
//			{name: "mmsi_no", colSpan: 3, width: "*"},
//			{name: "Signno", colSpan: 3, width: "*"},
//			{name: "Del_mark"},
//			{name: "re_regdate"},
//	    ]
//	});
//
//	isc.DynamicForm.create({
//	    ID:"fsqcShipProfileParticularsTab_2",
//	    //autoFocus: true,
//	    autoDraw:false,
//	    isGroup: "true",
//		valuesManager:"fsqcShipProfileVM",
//		numCols: 8,
////	    itemLayout: "absolute",
//		fields:
//		[
//			{name: "Speed"},
//			{name: "Gross"},
//			{name: "hull_con", colSpan: 3, width: "*"},
//
//			{name: "length_ll"},
//			{name: "Net"},
//			{name: "keeldate_p", colSpan: 3, width: "*"},
//
//			{name: "B"},
//			{name: "Dw"},
//			{name: "del_date", colSpan: 3, width: "*"},
//
//			{name: "D"},
//			{name: "engine"},
//			{name: "Recommendation", colSpan: 3, width: "*"},
//
//	        { _constructor:"SpacerItem", colSpan: 4 },
//			{name: "SR_SPTYPE", colSpan: 3, width: "*"},
//	    ]
//	});
//
//	isc.VLayout.create
//    ({
//	    ID:"fsqcShipProfileParticularsTab",
//	    width:"80%",
//    	members:
//    	[
//    		fsqcShipProfileParticularsTab_1
//    		, fsqcShipProfileParticularsTab_2
//    	]
//    })

	isc.TabSet.create(
	{
	    ID: "fsqcShipProfileTabSet",
	    paneContainerOverflow: "auto",
	    //tabBarPosition: "top",
	    //tabBarAlign:"left",
	    width: "100%",
//	    height: "60%",
	    tabs: [
	    	getFsqcShipProfileParticularsTab(i_dataSource, fsqcShipProfileVM, record),
	    	getFsqcShipProfileDocumentExpectTab(i_dataSource, fsqcShipProfileVM, record),
	    	getFsqcShipProfileCertificateTab(i_dataSource, fsqcShipProfileVM, record),
	    	getFsqcShipProfileDocumentTab(i_dataSource, fsqcShipProfileVM, record),
	    	getFsqcShipProfileManningTab(i_dataSource, fsqcShipProfileVM, record),
	    	getFsqcShipProfilePSCInspectionTab(i_dataSource, fsqcShipProfileVM, record),
	    	getFsqcShipProfileIncidentParticularsTab(i_dataSource, fsqcShipProfileVM, record),
	    	getFsqcShipProfileSMCAuditTab(i_dataSource, fsqcShipProfileVM, record),
	    	getFsqcShipProfileDOCAuditTab(i_dataSource, fsqcShipProfileVM, record),
	    	getFsqcShipProfileExemptionTab(i_dataSource, fsqcShipProfileVM, record),
	    	getFsqcShipProfileHistoryDataTab(i_dataSource, fsqcShipProfileVM, record),
	    ]
	}
	);


	isc.ButtonToolbar.create({
		ID:"shipManagement_ToolBar",
		buttons:
		[
/*
			{name:"saveBtn", title:"Save", autoFit: true, onControl:"FSQC_ALL",
				click : function () {
					if(fsqcShipProfileVM.validate())
					{
						documentExpectLG.endEditing();
						documentExpectLG.saveAllEdits(); //save
						fsqcShipProfileVM.setValue("document_expect_list", documentExpectLG.data);

						console.log("documentLG");
						documentLG.endEditing();
						documentLG.saveAllEdits(); //save

						var temp_certificate_list = fsqcShipProfileVM.getValue("certificate_list");
						for (var i = 0; i < temp_certificate_list.length; i++) {
							for (var j = 0; j < documentLG.data.length; j++) {
								if ((temp_certificate_list[i].Imono == documentLG.data[j].Imono) &&
									(temp_certificate_list[i].Cert_cd == documentLG.data[j].Cert_cd)) {
									temp_certificate_list[i].Intime = documentLG.data[j].Intime;
									temp_certificate_list[i].typoerror = documentLG.data[j].typoerror;
									temp_certificate_list[i].adminerror = documentLG.data[j].adminerror;
									temp_certificate_list[i].conventionerror = documentLG.data[j].conventionerror;
									temp_certificate_list[i].othererror = documentLG.data[j].othererror;
								}
							}
						}

						for (var j = 0; j < certificateLG.data.length; j++) {
							var find_match = false;
							for (var i = 0; i < temp_certificate_list.length; i++) {
								if ((temp_certificate_list[i].Imono == certificateLG.data[j].Imono) &&
									(temp_certificate_list[i].Cert_cd == certificateLG.data[j].Cert_cd) &&
									(temp_certificate_list[i].serial == certificateLG.data[j].serial)) {
									temp_certificate_list[i].Intime = certificateLG.data[j].Intime;
									temp_certificate_list[i].typoerror = certificateLG.data[j].typoerror;
									temp_certificate_list[i].adminerror = certificateLG.data[j].adminerror;
									temp_certificate_list[i].conventionerror = certificateLG.data[j].conventionerror;
									temp_certificate_list[i].othererror = certificateLG.data[j].othererror;
									temp_certificate_list[i].Expiry = certificateLG.data[j].Expiry;
									temp_certificate_list[i].remark = certificateLG.data[j].remark;
									find_match = true;
									break;
								}
							}

							if (!find_match) {

							}
						}

						console.log(temp_certificate_list);
						fsqcShipProfileVM.setValue("certificate_list", temp_certificate_list);

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
			},*/
			{
				title:"Add PSC", autoFit: true, onControl:"FSQC_ALL||FSQCSHIP_WRITE_PSC_INSP",
				name: "newShipPSCInspectionBtn",
				click : function () {

					open_fsqcShipPSCInspectionProfile_shortVer(pscInspectionDS, record.Imono, null, null);
				}
			},
			{
				title:"Add BCC", autoFit: true, onControl:"BCC_WRITE",
				click : function () {
					getCertJobShip(record, function(new_cert){
//						new_cert.form == "BCC";
						addBccclcCert(new_cert, ['BCC']);
						
						
					});
				}
			},
			
//			{
//				title:"Add BCC2", autoFit: true, onControl:"BCC_WRITE",
//				click : function () {
//					console.log("add bcc2")
//					pscInspectionShortDS.updateData({"test":"123"},function (dsResponse, data, dsRequest){
//						console.log(dsResponse);
//						console.log(data);
//					},{operationId:"SEND_DETAIN_INFO"}); //save
//				}
//			},
			{
				title:"Add CLC", autoFit: true, onControl:"CLC_WRITE",
				click : function () {
					getCertJobShip(record, function(new_cert){
						//new_cert.form == "CLC";
						addBccclcCert(new_cert, ['CLC']);
					});
				}
			},
			{
				title:"Add DMLC-I", autoFit: true, onControl:"DMLC_WRITE",
				click : function () {
					getCertJobShip(record, function(new_cert){
						openDmlcCertRecDetail(new_cert);
					});
				}
			},
			{name:"previewAllBtn", title:"Preview PDF", autoFit: true,
				  click : function () {
					  	console.log("My sub_report: \nImono: " + ship_profile_record.Imono + "\nManager: " + ship_profile_record.Manager + "\n")
					  	var requestArguments = ["RPT_Ship_Profile", {"Imono" : ship_profile_record.Imono, "Manager" : ship_profile_record.Manager}];
					  	ReportViewWindow.displayReport(requestArguments);
					  }
			},
	        { name: "previewRtfShipBtn", title: "Preview Word", autoFit: true, disabled: false,
	        	  click : function () {
			        	var requestArguments = ["RPT_Ship_Profile_Rtf", {"Imono" : ship_profile_record.Imono, "Manager" : ship_profile_record.Manager}];
			        	ReportViewWindow.downloadReport(requestArguments);
	        	  }
	        },
			{name:"closeBtn", title:"Close", autoFit: true,
			  click : function () {
				fsqcShipProfileVM.setValues({});
				fsqcShipProfileVM.setData({});
				fsqcShipProfileVM.reset();
				fsqcShipProfileVM.clearErrors(true);
				  //TODO

				fsqcShipProfileWindow.hide();
			  }
			}
		]
	});

	/*
	var fsqcShipProfileTop =  isc.VLayout.create
    ({
		isGroup: "true",
		groupTitle: "Ship main data",
		width: fsqcShipProfileTopShip.width,
		height: "30%",
		layoutMargin:10,
    	members:
    	[
//	        isc.TitleLabel.create({ contents: "<p><b><font size=2px>Ship main data<br /></font></b></p>"}),
	        fsqcShipProfileTopShip
	        , fsqcShipProfileTopManager
//	        , fsqcShipProfileTopManager
    	]
    });
    */

	var shipManagement_TopLayout =  isc.HLayout.create
    ({
		//isGroup: "false",
		width: "100%",
		height: "1",
		//layoutMargin:10,
    	members:
    	[
    		cargo_PAX_label,
    		shipManagement_ToolBar
    	]
    });

	isc.Window.create({
		ID:"fsqcShipProfileWindow"
		, isModal: false
		, showModalMask: false
		, width: "95%"
		, height: "95%"
//		, layoutMargin:10
//		, autoSize: true
		, items:
		[
	        isc.VLayout.create
	        ({
	        	members:
	        	[
		              isc.SectionStack.create({
			            	height: "100%",
			          		sections: [
			          			{title: "Ship Main Data", expanded: true, resizeable: false
			          				, items: [ shipManagement_TopLayout, fsqcShipProfileTopShip
			          		        , fsqcShipProfileTopManager]},
			          			{title: "Ship Details", expanded: true, items: [ fsqcShipProfileTabSet]}
			          		]
			              }),

//	    	        isc.TitleLabel.create({ contents: "<p><b><font size=2px>Ship main data<br /></font></b></p>"}),

//			          shipManagement_ToolBar
//	    	        , fsqcShipProfileTop
//	    	        , fsqcShipProfileTabSet
	        	]
	        })
		],
		show:function(){
			fsqcShipProfileVM.setData({});
			this.Super('show', arguments);
		}
	});
}

function open_fsqcShipProfile(i_dataSource, record, callback) {
	//Init the Forms and ListGrids

	fsqcShipProfileControl(i_dataSource, record);

	fsqcShipProfileWindow.show();

	if(record!=null){
		//Update record;
		fsqcShipProfileVM.getField('Imono').setDisabled(true);
		var shipProfileImono = record.Imono;
		fsqcShipProfileVM.fetchData({"Imono":shipProfileImono},function (dsResponse, data, dsRequest) {
//			console.log(data[0]["Spname"]);
			fsqcShipProfileWindow.setTitle("(" + data[0]["Imono"] + ") " + data[0]["Spname"] );
			//if (record.Manager_obj != null) {
			if (data[0]["Manager"] != null) {
				//fsqcShipProfileManagerVM.fetchData({"Com_cd":record.Manager_obj.Com_cd}
				fsqcShipProfileManagerVM.fetchData({"Com_cd":data[0]["Manager"]}
					,function (dsResponse, data, dsRequest)
					{

					}
				);
			}
			if(callback){
				callback();
			}
		});

// start jacky comment
//		//if (record.Manager_obj != null) {
//		if (record.Manager != null) {
//			//fsqcShipProfileManagerVM.fetchData({"Com_cd":record.Manager_obj.Com_cd}
//			fsqcShipProfileManagerVM.fetchData({"Com_cd":record.Manager}
//				,function (dsResponse, data, dsRequest)
//				{
//
//				}
//			);
//		}
// end jacky comment

//		fsqcShipProfileTopManager.setData(record.Manager_obj);
		enabledSection(true);

	}else{
		//New record;
		fsqcShipProfileWindow.setTitle("Create New Ship Profile" + "");
		fsqcShipProfileVM.getField('Imono').setDisabled(false);
		fsqcShipProfileVM.setValues({});
		fsqcShipProfileTop.clearErrors(true);
		enabledSection(false);
	}
}