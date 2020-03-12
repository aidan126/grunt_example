/***************************************************************************************************************
* Qualified Name	: 	/webui/src/main/webapp/js/fsqcdb_ship/fsqcShipCertificateProfile.js
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

//var ship_certificate_record_num;

var max_series = 0;
var ShipCertificateProfileImono;
var ShipCertificateProfileCert_cd;
var original_ship_certificate_radio_value;

function fsqcShipCertificateProfileControl(i_dataSource, ship_record, imono)
{
//	ship_certificate_record_num = ship_record_num;
	
	isc.ValuesManager.create({
        ID: "fsqcShipCertificateProfileVM",
		dataSource: i_dataSource
	});
	
//	isc.ValuesManager.create({
//        ID: "fsqcShipCertificateProfileManagerVM",
//		dataSource: companyManagementDS
//	});
	
	isc.FormLayout.create({
		ID:"fsqcShipCertificateProfileTopShip",
		valuesManager:"fsqcShipCertificateProfileVM",
//		cellBorder: 1,
//		isGroup: "true",
//		groupTitle: "Ship main data",
		width:"80%",
		numCols: 6,
		fixedColWidths: false,
//		colWidths: ["*", "*", "*", "*", "*", "*", "*", "*"],
		fields:
		[
			{name: "Imono", 	canEdit: false, disabled: true, startRow: true, colSpan: 1, required:true},
			{name: "serial", 	colSpan: 1, canEdit:false, disabled:true},
			{name: "S_info", 	type: "select", startRow: true, colSpan: 3, width: "*"
				, optionDataSource:"codeRODS", 
		          valueField:"Cs_cd", foreignDisplayField:"Cs_name",
		          pickListFields:[
		              {name:"Cs_cd"},
		              {name:"Cs_name"}
		          ],
		          pickListWidth:850,
			},
			
			//{name: "cert_cd_obj.Cert_des", 	canEdit: true,	colSpan: 3, width: "*"},
			{name: "Cert_cd", 	type: "select", startRow: true, colSpan: 3, width: "*", required:true
				, optionDataSource:"codeCertCodeDS", 
		          valueField:"Cert_cd", foreignDisplayField:"Cert_des",
		          pickListFields:[
		              {name:"Cert_cd", width: 100},
		              {name:"Cert_des"}
		          ],
		          pickListWidth:650,
			},
			{name: "Certtype", 	canEdit: true,	colSpan: 1},
			{name: "Issue", 	canEdit: true,	colSpan: 1},
			{name: "Expiry", 	canEdit: true,	colSpan: 1},
			{name: "Renewal", 	canEdit: true,	colSpan: 1},
			{name: "Recdate", 	canEdit: true,	colSpan: 1},
			{name: "exemption", 	canEdit: true,	colSpan: 1},
			{name: "condition", 	canEdit: true,	colSpan: 1},
			{name: "remark", 	canEdit: true,	colSpan: 5, width: "*"},

		]
	});

	
	var save_button = 
		isc.ISaveButton.create({
			name:"updateBtn", title:"Update", autoFit: true, onControl:"FSQC_ALL",
			click : function () {
				if(fsqcShipCertificateProfileVM.validate())
				{
					console.log("update");
					
					fsqcShipCertificateProfileVM.setValue("Updated", new Date());
					//ship_certificate_filtered_list[ship_certificate_record_num].Expiry = fsqcShipCertificateProfileVM.getValue("Expiry");
					//ship_certificate_filtered_list[ship_certificate_record_num].remark = fsqcShipCertificateProfileVM.getValue("remark");
						
					fsqcShipCertificateProfileVM.saveData
					(
						function (dsResponse, data, dsRequest) 
						{
						  if(dsResponse.status==0)
						  {
							  	isc.say(saveSuccessfulMessage);
							  	enabledSection(true);
							  	
								fsqcShipCertificateProfileVM.setValues({});
								fsqcShipCertificateProfileVM.setData({});
								fsqcShipCertificateProfileVM.reset();
								fsqcShipCertificateProfileVM.clearErrors(true);

								fsqcShipCertificateProfileWindow.hide();
								
								//toggleFsqcShipProfileCertificateRadioButton(original_ship_certificate_radio_value);
								fsqcCertLG.refreshData();
								toggleFsqcShipProfileCertificateRadioButton("Valid");

						  }
						}
					);
				}
			}
		});

	
	isc.ButtonToolbar.create({
		ID:"shipCertificateManagement_ToolBar",
		buttons: 
		[
			save_button,
/*
			{name:"addBtn", title:"Add", autoFit: true, onControl:"FSQC_ALL",
				click : function () {
					if(fsqcShipCertificateProfileVM.validate())
					{
//						fsqcShipCertificateProfileVM.setValues({});
//						fsqcShipCertificateProfileVM.setData({});
//						fsqcShipCertificateProfileVM.reset();
						fsqcShipCertificateProfileVM.clearErrors(true);
						
						fsqcShipCertificateProfileVM.setValue("serial", max_series + 1);
						fsqcShipCertificateProfileVM.setValue("S_info", "");
						fsqcShipCertificateProfileVM.setValue("Certtype", "");
						fsqcShipCertificateProfileVM.setValue("Issue", "");
						fsqcShipCertificateProfileVM.setValue("Expiry", "");
						fsqcShipCertificateProfileVM.setValue("Renewal", "");
						fsqcShipCertificateProfileVM.setValue("Recdate", "");
						fsqcShipCertificateProfileVM.setValue("exemption", "");
						fsqcShipCertificateProfileVM.setValue("condition", "");
						fsqcShipCertificateProfileVM.setValue("remark", "");
						
//						fsqcShipCertificateProfileVM.saveData
//						(
//							function (dsResponse, data, dsRequest) 
//							{
//							  if(dsResponse.status==0)
//							  {
//								  isc.say(saveSuccessfulMessage);
//								  enabledSection(true);
//								  
//								  fsqcShipCertificateProfileVM.setValues({});
//								  fsqcShipCertificateProfileVM.setData({});
//								  fsqcShipCertificateProfileVM.reset();
//								  fsqcShipCertificateProfileVM.clearErrors(true);
//
//								  fsqcShipCertificateProfileWindow.hide();
//							  }
//							}
//						);
					}
				}
			},
			{name:"updateBtn", title:"Update", autoFit: true, onControl:"FSQC_ALL",
				click : function () {
					if(fsqcShipCertificateProfileVM.validate())
					{
						console.log("update");
						
						fsqcShipCertificateProfileVM.setValue("Updated", new Date());
						//ship_certificate_filtered_list[ship_certificate_record_num].Expiry = fsqcShipCertificateProfileVM.getValue("Expiry");
						//ship_certificate_filtered_list[ship_certificate_record_num].remark = fsqcShipCertificateProfileVM.getValue("remark");
							
						fsqcShipCertificateProfileVM.saveData
						(
							function (dsResponse, data, dsRequest) 
							{
							  if(dsResponse.status==0)
							  {
								  	isc.say(saveSuccessfulMessage);
								  	enabledSection(true);
								  	
									fsqcShipCertificateProfileVM.setValues({});
									fsqcShipCertificateProfileVM.setData({});
									fsqcShipCertificateProfileVM.reset();
									fsqcShipCertificateProfileVM.clearErrors(true);

									fsqcShipCertificateProfileWindow.hide();
									
									//toggleFsqcShipProfileCertificateRadioButton(original_ship_certificate_radio_value);
							  }
							}
						);
					}
				}
			},*/
			{name:"closeBtn", title:"Close", autoFit: true,
			  click : function () {
				fsqcShipCertificateProfileVM.setValues({});
				fsqcShipCertificateProfileVM.setData({});
				fsqcShipCertificateProfileVM.reset();
				fsqcShipCertificateProfileVM.clearErrors(true);
				  //TODO

				fsqcShipCertificateProfileWindow.hide();
			  }
			}
		]
	});
	
	var fsqcShipCertificateProfileTop =  isc.VLayout.create
    ({
		//isGroup: "true",
		//groupTitle: "Ship main data",
		width: fsqcShipCertificateProfileTopShip.width,
		height: "30%",
		layoutMargin:10,
    	members: 
    	[
	        fsqcShipCertificateProfileTopShip
    	]
    });
	
	isc.ListGrid.create({
		ID:"certificateSeriesLG", dataSource : fsqcCertificateDS,
	    autoDraw: false,
//	    canEdit: true,
//	    saveLocally: true,
//	    saveByCell: false,
//	    autoSaveEdits: false,
	    width: "100%",
	    overflow:"auto",
	    fields: [
			{name: "Imono", 	canEdit: false, disabled: true, startRow: true, colSpan: 1},
			{name: "serial", 	canEdit: true,	colSpan: 1},
            {name: "cert_cd", title: "cert_cd", width:80},
        ],
	});

	isc.Window.create({
		ID:"fsqcShipCertificateProfileWindow"
		, isModal: false
		, showModalMask: false
		, width: "80%"
		, height: "35%"
//		, layoutMargin:10
//		, autoSize: true
		, items: 
		[
	        isc.VLayout.create
	        ({
	        	members: 
	        	[
//	    	        isc.TitleLabel.create({ contents: "<p><b><font size=2px>Ship main data<br /></font></b></p>"}),
	    	        shipCertificateManagement_ToolBar
	    	        , fsqcShipCertificateProfileTop
	        	]
	        })
		],
		show:function(){
			fsqcShipCertificateProfileVM.setData({});
			this.Super('show', arguments);
		}
	});
}

function open_fsqcShipCertificateProfile(i_dataSource, ship_record, imono, ship_certificate_radio_value){
	//Init the Forms and ListGrids

	original_ship_certificate_radio_value = ship_certificate_radio_value;
	ShipCertificateProfileImono = imono;
	fsqcShipCertificateProfileControl(i_dataSource, ship_record, imono);

	fsqcShipCertificateProfileWindow.show();

	if(ship_record!=null){
		//Update record;
		fsqcShipCertificateProfileVM.getField('Imono').setDisabled(true);
		fsqcShipCertificateProfileVM.getField('Cert_cd').setDisabled(true);
		fsqcShipCertificateProfileVM.getField('serial').setDisabled(true);
		ShipCertificateProfileCert_cd = ship_record.Cert_cd;
		var ShipCertificateProfileserial = ship_record.serial;
		fsqcShipCertificateProfileVM.fetchData(
				{
					"Imono":ShipCertificateProfileImono,
					"Cert_cd":ShipCertificateProfileCert_cd,
					"serial":ShipCertificateProfileserial,
					"doctype": 'Cert'
				},function (dsResponse, data, dsRequest) {
			fsqcShipCertificateProfileWindow.setTitle("(" + data[0]["Imono"] + ") " + data[0]["serial"] );
		});

		certificateSeriesLG.filterData({
			"Imono":ShipCertificateProfileImono,
			"Cert_cd":ShipCertificateProfileCert_cd,
			"doctype": 'Cert'
			},function(dsResponse, data, dsRequest) {
//				console.log("certificateSeriesLG");
				for (var i = 0; i < data.length; i++) {
					if (data[i].serial > max_series) {
						max_series = data[i].serial; 
					}
				}
//				console.log(max_series);
			});
//		fsqcShipCertificateProfileTopManager.setData(record.Manager_obj);
		enabledSection(true);

	}else{
		//New record;
		fsqcShipCertificateProfileWindow.setTitle("Create New Ship Certificate Profile" + "");
		fsqcShipCertificateProfileVM.getField('Imono').setDisabled(false);
		fsqcShipCertificateProfileVM.setValues({});
		fsqcShipCertificateProfileVM.setValue('Imono', imono);
		fsqcShipCertificateProfileVM.setValue("doctype", 'Cert');
		fsqcShipCertificateProfileVM.setValue("typoerror", false);
		fsqcShipCertificateProfileVM.setValue("dimensionerror", false);
		fsqcShipCertificateProfileVM.setValue("tonnageerror", false);
		fsqcShipCertificateProfileVM.setValue("adminerror", false);
		fsqcShipCertificateProfileVM.setValue("expiryerror", false);
		fsqcShipCertificateProfileVM.setValue("conventionerror", false);
		fsqcShipCertificateProfileVM.setValue("othererror", false);
		fsqcShipCertificateProfileVM.setValue("summission", false);
		//fsqcShipCertificateProfileTop.clearErrors(true);
		enabledSection(false);
	}
}
