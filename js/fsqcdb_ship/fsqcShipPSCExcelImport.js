/***************************************************************************************************************
* Qualified Name	: 	/webui/src/main/webapp/js/fsqcdb_ship/fsqcShipPSCExcelImport.js
* @author 				Albert Chan
* @since				2019-08-07
* ************************************************************************************************************** 
* Change log:
* log no	Change complete date	Developer			Change Reason
* ======	====================	=========			=============
* 00000		2019-08-07				Albert Chan			Initial Implementation
*
* 
****************************************************************************************************************/

fsqcShipPSCExcelImportControl();

function fsqcShipPSCExcelImportControl()
{
	var message_label = isc.Label.create({
	    //contents: "XX"
	    width: "100%",
	    height: 25,
	    autoDraw: true,
	    baseStyle: "exampleSeparator"
	})
	
	isc.DynamicForm.create({
	    autoDraw: false,
	    ID: "uploadForm", 
	    height: 35,
	    width: 200,
	    dataSource: pscExcelImportDS,
	    fields: [
	        { 
	        	name: "excelData", type: "imageFile", multiple:false
	        	//, hint: "Upload Excel Template" 
	        },
	    ]
	});

	var upload_button = 
		isc.IButton.create({
			name:"pscImportUploadButton", title:"Upload file", autoFit: true, onControl:"FSQC_ALL",
            click: function () {
            	if (!uploadForm.getValue("excelData")) {
			        isc.say("Please select Excel file.");
            		return;
            	}
            	uploadForm.saveData
				(
					function (dsResponse, data, dsRequest) 
					{
						if(dsResponse.status==0)
						{
							uploadForm.editNewRecord();
							psc_inspection_original_LG.setData(data.psc_inspection_original_list);
							psc_inspection_former_LG.setData(data.psc_inspection_former_list);
							psc_inspection_import_LG.setData(data.psc_inspection_import_list);
							psc_inspection_repeat_LG.setData(data.psc_inspection_repeat_list);
							
							message_label.setContents("Import Count: " + data.valid_count + ", Invalid Count: " + data.invalid_count + ", PSC records before import: " + data.psc_count_all);
						}
					});
            },
       });

	var import_button = 
		isc.IButton.create({
			name:"pscImportButton", title:"Import", autoFit: true, onControl:"FSQC_ALL",
            click: function () {
            	if (psc_inspection_import_LG.data.length > 0) {
			        for (var i = 0; i < psc_inspection_import_LG.data.length; i++) {
			        	pscInspectionDS.updateData(psc_inspection_import_LG.getRecord(i));
			        }
			        isc.say(saveSuccessfulMessage);
            	}
            }
		});
	
	var repeat_button = 
		isc.IButton.create({
			name:"pscRepeatButton", title:"Replace", autoFit: true, onControl:"FSQC_ALL",
            click: function () {
            	if (psc_inspection_repeat_LG.data.length > 0) {
			        for (var i = 0; i < psc_inspection_repeat_LG.data.length; i++) {
			        	pscInspectionDS.updateData(psc_inspection_repeat_LG.getRecord(i));
			        }
			        isc.say(saveSuccessfulMessage);
            	}
            }
		});
	
//	var close_button = 
//		isc.IButton.create({
//			name:"pscCloseButton", title:"Close", autoFit: true,
//            click: function () {
//            	fsqcShipPSCExcelImportWindow.hide();
//            }
//		});
	
    var top_button_layout = isc.HLayout.create
    ({
	    height: 35,
    	members: 
    	[
    		uploadForm,
    		upload_button,
    		import_button,
    		repeat_button,
//    		close_button
    	]
    });

	isc.Label.create({
	    ID: "originalListLabel",
	    contents: "PSC Original Data",
	    height: 25,
	});
	
	isc.FilterListGrid.create({
		ID:"psc_inspection_original_LG", dataSource : pscInspectionDS,
		filterLocalData: true,
		autoDraw: false,
	    width:"100%",
	    overflow:"auto",
//	    sortField: 1,
//	    sortDirection: "descending",
	    autoFitWidthApproach:"both",
	    wrapHeaderTitles:true,
	    headerHeight:40,
		fields: [
	            {name: "Imono", canEdit: false, width:80},
//	            {name: "Imono", canEdit: false, disabled: true, width:80},
	            {name: "Inspection", canEdit: false, autoFitWidth:true, width:80},
	            {name: "Port", title: "Port", width:180},
	            {name: "countryname", width:180},
	            {name: "Defnums", autoFitWidth:true, width:80},
	            {name: "Detained", width:90},
	            {name: "Non_Mou_Detained", width:90},
	            {name: "itemno", autoFitWidth:true, width:80},
	            {name: "import_status", autoFitWidth:true, width:80},
	    ],
	    recordClick: function(viewer, record, recordNum, field, fieldNum, value, rawValue) 
	    {
	    	psc_inspection_former_LG.filterData({Imono:record.Imono});
	    }
	});
	
    var original_layout = isc.VLayout.create
    ({
    	members: 
    	[
    		originalListLabel,
    		psc_inspection_original_LG,
    	]
    });
    
	isc.Label.create({
	    ID: "formerlListLabel",
	    contents: "PSC Former Data",
	    height: 25,
	});
	
	isc.FilterListGrid.create({
		ID:"psc_inspection_former_LG", dataSource : pscInspectionDS,
		filterLocalData: true,
	    autoDraw: false,
	    width:"100%",
	    overflow:"auto",
//	    sortField: 1,
//	    sortDirection: "descending",
	    autoFitWidthApproach:"both",
	    wrapHeaderTitles:true,
	    headerHeight:40,
		fields: [
	            {name: "Imono", canEdit: false, width:80},
//	            {name: "Imono", canEdit: false, disabled: true, width:80},
	            {name: "Inspection", canEdit: false, autoFitWidth:true, width:80},
	            {name: "Port", title: "Port", width:180},
	            {name: "countryname", width:180},
	            {name: "Defnums", autoFitWidth:true, width:80},
	            {name: "Detained", width:90},
	            {name: "Non_Mou_Detained", width:90},
	            {name: "itemno", autoFitWidth:true, width:80},
	            ],
	});
	
    var former_layout = isc.VLayout.create
    ({
    	members: 
    	[
    		formerlListLabel,
    		psc_inspection_former_LG,
    	]
    });
    
	isc.Label.create({
	    ID: "importListLabel",
	    contents: "PSC Import Data",
	    height: 25,
	});
	
	isc.FilterListGrid.create({
		ID:"psc_inspection_import_LG", dataSource : pscInspectionDS,
		filterLocalData: true,
	    autoDraw: false,
	    width:"100%",
	    overflow:"auto",
//	    sortField: 1,
//	    sortDirection: "descending",
	    autoFitWidthApproach:"both",
	    wrapHeaderTitles:true,
	    headerHeight:40,
		fields: [
	            {name: "Imono", canEdit: false, width:80},
//	            {name: "Imono", canEdit: false, disabled: true, width:80},
	            {name: "Inspection", canEdit: false, autoFitWidth:true, width:80},
	            {name: "Port", title: "Port", width:180},
	            {name: "countryname", width:180},
	            {name: "Defnums", autoFitWidth:true, width:80},
	            {name: "Detained", width:90},
	            {name: "Non_Mou_Detained", width:90},
	            {name: "itemno", autoFitWidth:true, width:80},
	            ],
	});
	
    var import_layout = isc.VLayout.create
    ({
    	members: 
    	[
    		importListLabel,
    		psc_inspection_import_LG,
    	]
    });
    
	isc.Label.create({
	    ID: "repeatListLabel",
	    contents: "PSC Repeat Data",
	    height: 25,
	});
	
	isc.FilterListGrid.create({
		ID:"psc_inspection_repeat_LG", dataSource : pscInspectionDS,
		filterLocalData: true,
	    autoDraw: false,
	    width:"100%",
	    overflow:"auto",
//	    sortField: 1,
//	    sortDirection: "descending",
	    autoFitWidthApproach:"both",
	    wrapHeaderTitles:true,
	    headerHeight:40,
		fields: [
	            {name: "Imono", canEdit: false, width:80},
//	            {name: "Imono", canEdit: false, disabled: true, width:80},
	            {name: "Inspection", canEdit: false, autoFitWidth:true, width:80},
	            {name: "Port", title: "Port", width:180},
	            {name: "countryname", width:180},
	            {name: "Defnums", autoFitWidth:true, width:80},
	            {name: "Detained", width:90},
	            {name: "Non_Mou_Detained", width:90},
	            {name: "itemno", autoFitWidth:true, width:80},
	            ],
	});
	
    var repeat_layout = isc.VLayout.create
    ({
    	members: 
    	[
    		repeatListLabel,
    		psc_inspection_repeat_LG,
    	]
    });
    
//	var fsqcShipPSCExcelImportLayout = isc.HStack.create({
//	    width:"100%",
//	    membersMargin: 10,
//	    members:[uploadForm]
//	});

    var layout1 = isc.HLayout.create
    ({
    	members: 
    	[
    		original_layout,
    		former_layout
    	]
    })

    var layout2 = isc.HLayout.create
    ({
    	members: 
    	[
    		import_layout,
    		repeat_layout
    	]
    })

    return isc.VLayout.create({
		members : [
	        top_button_layout
	        , message_label
	        , layout1
	        , layout2
			]
	});
}

function open_fsqcShipPSCExcelImportProfile(){
	//Init the Forms and ListGrids

	var import_layout = fsqcShipPSCExcelImportControl();

	isc.Window.create({
		ID:"fsqcShipPSCExcelImportWindow"
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
	        		import_layout
	        	]
	        })
		],
		show:function(){
			this.Super('show', arguments);
		}
	});
	fsqcShipPSCExcelImportWindow.show();

}
