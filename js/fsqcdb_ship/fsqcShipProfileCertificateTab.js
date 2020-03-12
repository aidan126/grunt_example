/***************************************************************************************************************
* Qualified Name	: 	/webui/src/main/webapp/js/fsqcdb_ship/fsqcShipProfileCertificateTab.js
* Created By		: 	Albert Chan
* Created date		: 	2019-07-25
* ************************************************************************************************************** 
* Change log:
* log no	Change complete date	Developer			Change Reason
* ======	====================	=========			=============
* 00000		2019-07-25				Albert Chan			Initial Implementation
* 00001		2019-09-03				Dicky Lee			add access  control
* 
****************************************************************************************************************/


//var ship_certificate_filtered_list;
var ship_certificate_imono;
var ship_certificate_radio_value = "Valid";

function filterExpiryData(data){
	var today_date = new Date();
	
	// sort for deletion, since delete is in revise order
	data.sort(function(a, b) {
		if (a.Cert_cd == b.Cert_cd) {
			return a.Recdate - b.Recdate;
		}
		if (a.Cert_cd < b.Cert_cd) {
			return -1;
		}
		return 1;
	});
	var last_cert_cd = "";
	for (var i = data.length - 1; i >= 0; i--){
		if (((data[i].Expiry) && (data[i].Expiry < today_date)) || (data[i].Cert_cd == last_cert_cd)) {
			data.splice(i, 1);
			continue;
		}
		last_cert_cd = data[i].Cert_cd;
	}
	
	// sort for display
	data.sort(function(a, b) {
		if (a.Cert_cd == b.Cert_cd) {
			return b.Recdate - a.Recdate;
		}
		if (a.Cert_cd < b.Cert_cd) {
			return -1;
		}
		return 1;
	});
	certificateLG.setData(data);

}

function toggleFsqcShipProfileCertificateRadioButton(value) {
	
	//console.log("certificateRadioButtons");
	ship_certificate_radio_value = value;
	console.log(value);
	if (value == "Valid") {
		/*
		var today = new Date();
		var valid_filtered_list = [];
		for (var i = 0; i < ship_certificate_filtered_list.length; i++) {
			if (ship_certificate_filtered_list[i].Expiry > today) {
				valid_filtered_list.push(ship_certificate_filtered_list[i]);
			}
		}
    	console.log(valid_filtered_list);
		certificateLG.setData(valid_filtered_list);
		*/
//	    certificateLG.filterData({ 
//	    	imono : ship_certificate_imono, 
//	    	doctype : 'Cert',
//	    	fieldName:"Expiry", operator:"greaterThan", value: new Date()});
		
//		var criteria = {
//		        _constructor:"AdvancedCriteria",
//		        operator:"and",
////		        criteria:[
////		            { fieldName:"Expiry", operator:"greaterOrEqual", value: new Date() },
////		            { operator:"and", criteria:[
////		                  { fieldName:"Imono", operator:"equals", value:ship_certificate_imono },
////		                  { fieldName:"doctype", operator:"equals", value: 'Cert'}
////		              ]  
////		            },
////		        ]
//		        criteria:[
//	                  { fieldName:"Imono", operator:"equals", value:ship_certificate_imono },
//	                  { fieldName:"doctype", operator:"equals", value: 'Cert'}
//			        ]
//		    };
//
//		certificateLG.fetchData(criteria,function(dsResponse, data, dsRequest) {
//			filterExpiryData(data);
//		});
		
		certificateLG.fetchData({ 
			Imono : ship_certificate_imono, 
	    	doctype : 'Cert',
	    	},function(dsResponse, data, dsRequest) {
	    		filterExpiryData(data);
	    	});

		certificateLG.hideField('summission');
		certificateLG.hideField('serial');

	} else {
		certificateLG.fetchData({ 
			Imono : ship_certificate_imono, 
	    	doctype : 'Cert',
	    	},function(dsResponse, data, dsRequest) {
	    		data.sort(function(a, b) {
	    			if (a.Cert_cd == b.Cert_cd) {
	    				return b.Recdate - a.Recdate;
	    			}
	    			if (a.Cert_cd < b.Cert_cd) {
	    				return -1;
	    			}
	    			return 1;
	    		});
	    		certificateLG.setData(data);
	    	});
//		var criteria = {
//		        _constructor:"AdvancedCriteria",
//		        operator:"and",
//		        criteria:[
//                  { fieldName:"Imono", operator:"equals", value:ship_certificate_imono },
//                  { fieldName:"doctype", operator:"equals", value: 'Cert'}
//		        ]
//		    };
//
//		certificateLG.fetchData(criteria,function(dsResponse, data, dsRequest) {});
//	    certificateLG.filterData({ 
//	    	imono : ship_certificate_imono, 
//	    	doctype : 'Cert'
//	    });
		//certificateLG.setData(ship_certificate_filtered_list);
		certificateLG.showField('summission');
		certificateLG.showField('serial');
	}
}

function getFsqcShipProfileCertificateTab(i_dataSource, i_valuesManager, record)
{
	/*
	ship_certificate_filtered_list = [];
	for (var i = 0; i < record.certificate_list.length; i++) {
		if (record.certificate_list[i].doctype == 'Cert') {
			ship_certificate_filtered_list.push(record.certificate_list[i]);
		}
	}
	console.log("ship_certificate_filtered_list");
	//console.log(ship_certificate_filtered_list);
	*/
	ship_certificate_imono = record.Imono;
		
	isc.FormLayout.create({
		ID: "certificateRadioButtons",
		//isGroup: true, 
		//showTitle:false,
		//groupTitle: "Show",
		items:[{
	        name:"showShipCert", 
	        type:"radioGroup", 
	        showTitle:false,
	        vertical:false,
	        width: 200,
	        valueMap:{
	        	"Valid":"Show Valid",
	        	"All":"Show All"
	        }, 
	        defaultValue:"Valid",
//	        valueMap:["Show Valid","Show All"],
//	        defaultValue:"Show Valid",
	        change: function (form, item, value) {
	        	toggleFsqcShipProfileCertificateRadioButton(value);
	        }
	    }]
	})
	
	isc.Label.create({
	    ID: "certificateLGLabel",
	    contents: "Tips: Double-click the data row to view the details",
	    width: "100%",
	    height: 25,
	    autoDraw: true,
	    baseStyle: "exampleSeparator"
	});

	isc.ListGrid.create({
		ID:"certificateLG", dataSource : fsqcCertificateDS,
	    autoDraw: false,
	    canEdit: true,
	    saveLocally: true,
	    saveByCell: false,
	    autoSaveEdits: false,
	    width:"100%",
	    overflow:"auto",
	    autoFitWidthApproach:"both",
	    //canRemoveRecords:true,
	    //wrapHeaderTitles:true,
	    headerHeight:40,
		fields: [
            	//{name: "Imono", canEdit: false, disabled: true, title: "IMO NO.", width:80},
				{ name: "Cert_cd_code", canEdit: false, title: "Cert. cd", width:80,
					formatCellValue: function (value, record) {
	                    return record.Cert_cd;
	                },
				}, 
				{ name: "Cert_cd", canEdit: false, title: "Certificate Name", width:300
					, optionDataSource:"codeCertCodeDS"
					, valueField:"Cert_cd"
					, displayField:"Cert_des"
				},
	            
	            {name: "Certtype", canEdit: false, title: "Certificate Type", width:80},
	            
	            {name: "S_info", canEdit: false, title: "Issuing RO", width:80},
	            
	            {name: "Issue", canEdit: false, title: "Cert Issue Date (dd/mm/yyyy)", width:240},
	            {name: "Expiry", canEdit: false, title: "Cert Expiry Date (dd/mm/yyyy)", width:240},
	            
	            {name: "Recdate", canEdit: false, title: "Received Date (dd/mm/yyyy)", width:240},
	            {name: "summission", canEdit: false, title: "Submission is required", width:50},
	            {name: "serial", canEdit: false, title: "Serial", width:50},
	            //{name: "Intime", title: "Input Mode", width:50},
	            {
	            	name: "InputMode", canEdit: false, title: "Input Mode", width:120,
	            	formatCellValue: function (value, record) {
	                    if (record.ro_ver_date){
	                    	return "Electronics";
	                    }
	                    return "Manual";
	                },
	            },
	            //{name: "neworold", title: "neworold", width:40},	            
	            ],
        getCellCSSText: function (cert_record, rowNum, colNum) {
	        if (this.getFieldName(colNum) == "Expiry") {
	        	var today = new Date();
	        	//var today_d = today.getDate();
	        	//console.log(today);
	        	//console.log(today_d);
	            if (cert_record.Expiry < today) {
	                return "color:#ff0000;";
	            }
	        }
	    },
		rowDoubleClick:function(ship_record, ship_record_num, fieldNum){
			open_fsqcShipCertificateProfile(fsqcCertificateDS, ship_record, ship_certificate_imono, ship_certificate_radio_value);
	    },
	    
	});

	isc.Label.create({
	    ID: "fsqcCertLGLabel",
	    contents: "Certificate need to submitted",
	    width: "100%",
	    height: 25,
	    autoDraw: true,
	    baseStyle: "exampleSeparator"
	});
	
	isc.ListGrid.create({
		ID:"fsqcCertLG", dataSource : documentExpectDS,
	    autoDraw: false,
	    canEdit: false,
	    //saveLocally: true,
	    //saveByCell: false,
	    //autoSaveEdits: false,
	    width: "100%",
	    overflow:"auto",
	    autoFitWidthApproach:"both",
	    wrapHeaderTitles:true,
	    //headerHeight:40,
	    fields: [
	            //{name: "imono", title: "IMO NO.", width:80},
				{name: "certype", canEdit: false, title: "Cert. Type", width:120},
	            //{name: "cert_cd", title: "cert_cd", width:80},
	            //{name: "cert_cd_obj.Cert_des", canEdit: false, disabled: true, title: "Certificate / Documentation", width:500},
				{ name: "cert_cd", canEdit: false, title: "Certificate / Documentation", width:700
					, optionDataSource:"codeCertCodeDS"
					, valueField:"Cert_cd"
					, displayField:"Cert_des"
				},
	            //{name: "certnum", canEdit: false, disabled: true, title: "Certificate / Documentation Number Required", width:160},
	            
	            //{name: "definedate", title: "definedate", width:160},
	            
	            //{name: "submission", title: "Submission Required", width:50},
	            //{name: "neworold", title: "neworold", width:40},	            
	            ],
	    sortField: 0,
	    sortDirection: "ascending",
	    getCellCSSText: function (cert_record, rowNum, colNum) {
	        if (this.getFieldName(0) == "certype") {
	            if (cert_record.certype == "Cert") {
	                return "background-color:#ff7777;";
	            } else if (cert_record.certype == "ISM") {
	                return "background-color:#77ff77;";
	            } else if (cert_record.certype == "Other") {
	                return "background-color:#7777ff;";
	            }
	        }
	    }	    
	});

	
	var resultFootLayout = isc.HLayout.create({
	  	height:"5%",
		members: [
			//resultCountMsg,
			isc.IExportButton.create({
				//icon: "demand.png",
				title: "Export",
				width: 100,
				//height: 30, 
				onControl:"",
				listGrid: certificateLG
			}),
			isc.IAddButton.create({
				//title: "Add",
				width: 100,
				//height: 30, 
				//---modified 00001
				onControl:"FSQC_ALL||FSQCSHIP_WRITE_RECEIVED_DOC",
				//-------
				click : function () {
					open_fsqcShipCertificateProfile(fsqcCertificateDS, null, ship_certificate_imono, ship_certificate_radio_value);
				}
			}),
			isc.IButton.create({
			    ID:"certListDelete",
			    title:"Delete",
			    onControl: "FSQC_ALL||FSQCSHIP_WRITE_RECEIVED_DOC",
			    width:90,
			    layoutAlign:"center",
			    autoDraw: false,
			    click:function(){
			    	isc.ask(promptDeleteMessage_2, function (value){
						if (value){
							var selected_record = certificateLG.getSelectedRecord();
							if (selected_record) {
								fsqcCertificateDS.removeData(selected_record,
									function(dsResponse, data, dsRequest) {
			              				if (dsResponse.status == 0) {
			              					isc.say("Successfully Deleted");
			              					toggleFsqcShipProfileCertificateRadioButton(ship_certificate_radio_value);
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
	
	isc.VLayout.create
    ({
	    ID:"fsqcShipProfileCertificateTab",
	    width:"100%",
    	members: 
    	[
    		certificateRadioButtons,
    		certificateLGLabel,
    		certificateLG,
    		fsqcCertLGLabel,
    		fsqcCertLG,
    		resultFootLayout
    	]
    })
//    console.log("certificateLG");
//    console.log(record);
    
//	var criteria = {
//	        _constructor:"AdvancedCriteria",
//	        //operator:"and",
//	        criteria:[
//	            { fieldName:"Expiry", operator:"greaterOrEqual", value: new Date() },
//	            { operator:"and",
//	            	criteria:[
//	            		{ 
//	            	    	imono : record.Imono, 
//	            	    	doctype : 'Cert'
//	            		}
//	              ]
//	            },
//	        ]
//	    };
//
//	fsqcCertLG.fetchData(criteria);
    //certificateLG.setData([]);
//    certificateLG.filterData({ 
//    	imono : record.Imono, 
//    	doctype : 'Cert',
//    	fieldName:"Expiry", operator:"greaterThan", value: new Date()});
	//certificateLG.setData(ship_certificate_filtered_list);
	
	//fsqcCertLG.setData([]);
	//fsqcCertLG.setData(record.document_expect_list);
	fsqcCertLG.filterData({certype:'Cert', submission: true, imono: ship_certificate_imono});
	
	//toggleFsqcShipProfileCertificateRadioButton("Valid");
	
	var today_date = new Date();
	certificateLG.setData([]);
	/*
	var criteria = {
	        _constructor:"AdvancedCriteria",
	        operator:"and",
	        criteria:[
	            { fieldName:"Expiry", operator:"greaterOrEqual", value: today_date },
	            { operator:"and", criteria:[
	                  { fieldName:"Imono", operator:"equals", value:ship_certificate_imono },
	                  { fieldName:"doctype", operator:"equals", value: 'Cert'}
	              ]  
	            },
	        ]
	    };
	
	certificateLG.fetchData(criteria,function(dsResponse, data, dsRequest) {
		console.log(data);
		certificateLG.hideField('summission');
		certificateLG.hideField('serial');
	});
    */
//    certificateLG.filterData({ 
//    	Imono : ship_certificate_imono, 
//    	doctype : 'Cert',
//    	//Expiry : {_constructor: "DateRange", start: today_date, end: today_date}
//		Expiry : {_constructor: "DateRange", start: today_date}
//    });
	
	certificateLG.fetchData({ 
		Imono : ship_certificate_imono, 
    	doctype : 'Cert',
    	//Expiry : {_constructor: "DateRange", start: today_date, end: today_date}
		Expiry : {_constructor: "DateRange", start: today_date}
    	},function(dsResponse, data, dsRequest) {
    		filterExpiryData(data);
//    		for (var i = data.length - 1; i >= 0; i--){
//    			if ((data[i].Expiry) && (data[i].Expiry < today_date)) {
//    				data.splice(i, 1);
//    			}
//    		}
////    		console.log(data);
//    		certificateLG.setData(data);
    		certificateLG.hideField('summission');
    		certificateLG.hideField('serial');
	});
//	certificateLG.hideField('summission');
//	certificateLG.hideField('serial');

    return 	{
	    //title: "Ship Certificate",
	    title: "Ship Cert.",
	    pane: fsqcShipProfileCertificateTab, 
	};
}
