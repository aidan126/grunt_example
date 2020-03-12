/***************************************************************************************************************
* Qualified Name	: 	/webui/src/main/webapp/js/fsqcdb_ship/fsqcShipProfileDocumentExpectTab.js
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


var codeCertCode_map;
var codeCertCodeList = [];
var recordToDB = [];

function handleFsqcShipProfileDocumentExpectCheckboxClick(checkbox_name, value) {
	var show_css = css_pax.getField("css").getValue();
	var show_pax = css_pax.getField("pax").getValue();
	if (checkbox_name == "css") {
		show_css = value;
	} else if (checkbox_name == "pax") {
		show_pax = value;
	}
	if (show_css == undefined) {
		show_css = false
	}
	if (show_pax == undefined) {
		show_pax = false
	}

//	for (var i = 0; i < documentExpectLG.data.localData.length; i++) {
//		//documentExpectLG.setEditValue(i, "submission", (show_css && documentExpectLG.data.localData[i].cert_cd_obj.css_cert) || (show_pax && documentExpectLG.data.localData[i].cert_cd_obj.pax_cert));
//		documentExpectLG.setEditValue(i, "submission", 
//				(show_css && codeCertCode_map[documentExpectLG.data.localData[i].cert_cd.trim()].css_cert) 
//				|| (show_pax && codeCertCode_map[documentExpectLG.data.localData[i].cert_cd.trim()].pax_cert));
//	}	

	for (var i = 0; i < documentExpectLG.data.length; i++) {
		//documentExpectLG.setEditValue(i, "submission", (show_css && documentExpectLG.data.localData[i].cert_cd_obj.css_cert) || (show_pax && documentExpectLG.data.localData[i].cert_cd_obj.pax_cert));
		documentExpectLG.setEditValue(i, "submission", 
				(show_css && codeCertCode_map[documentExpectLG.data[i].cert_cd.trim()].css_cert) 
				|| (show_pax && codeCertCode_map[documentExpectLG.data[i].cert_cd.trim()].pax_cert));
	}	
}

function getFsqcShipProfileDocumentExpectTab(i_dataSource, i_valuesManager, record)
{
	isc.ValuesManager.create({
        ID: "fsqcShipProfileDocumentExpectManagerVM",
		dataSource: documentExpectDS
	});
		
	
	
	var save_button = 
		isc.ISaveButton.create({
			ID: "saveShipParticularsBtn",
			name:"saveShipParticularsBtn", title:"Save", autoFit: true, onControl:"FSQC_ALL||FSQCSHIP_WRITE_EXP_DOC",
			click : function () {
				
				console.log("saveShipParticularsBtn");
				var EditedRecord = documentExpectLG.getAllEditRows();
				
				var saveFlag_documentExpectUpdate = false;
				var saveFlag_documentExpectInsert = false;
				
				documentExpectLG.endEditing();
				documentExpectLG.saveAllEdits(); //save
				
		        for (i = 0; i < EditedRecord.length; i++) {
		        	
		        	documentExpectDS.updateData(documentExpectLG.getEditedRecord( EditedRecord[i] )); //save
		        	saveFlag_documentExpectUpdate = true;

		        }
		        
		        for (k = 0; k < recordToDB.length; k++) {
		        	
		        	console.log( documentExpectLG.find( {cert_cd:recordToDB[k].cert_cd} ) );
		        	documentExpectDS.updateData(documentExpectLG.getEditedRecord( documentExpectLG.getRowNum( documentExpectLG.find( {cert_cd:recordToDB[k].cert_cd} ) ))); //save
		        	saveFlag_documentExpectInsert = true;
		        	
		        }
		        
		        var selected_record = documentExpectLG.getSelectedRecord();
		        if (selected_record) {
		        	documentExpectDS.updateData(selected_record);
		        }
		        
		        if(EditedRecord.length < 1){
		        	if(recordToDB.length > 0 && saveFlag_documentExpectInsert){
	    				isc.say("Successfully Deleted");
		        	}
		        }
		        if(recordToDB.length < 1){
		        	if(EditedRecord.length > 0 && saveFlag_documentExpectUpdate){
	    				isc.say("Successfully Deleted");
		        	}
		        }
		        if(recordToDB.length > 0 && EditedRecord.length > 0){
		        	if(saveFlag_documentExpectUpdate && saveFlag_documentExpectInsert){
	    				isc.say("Successfully Deleted");
		        	}
		        }
		        
		        EditedRecord = [];
		        recordToDB = [];
		        
		        console.log(" FETCH ");
		        fetch_documentLG(record, true);

		        //save_documentLG();

			}
		});
	
//	isc.ButtonToolbar.create({
//		ID:"shipDocumentExpectManagement_ToolBar",
//		buttons: 
//		[
//			save_button,
//			/*
//			{name:"saveShipParticularsBtn", title:"Save", autoFit: true, onControl:"FSQC_ALL",
//				click : function () {
//					console.log("saveShipParticularsBtn");
//					var EditedRecord = documentExpectLG.getAllEditRows();
//					
//					documentExpectLG.endEditing();
//					documentExpectLG.saveAllEdits(); //save
//					
//			        for (i = 0; i < EditedRecord.length; i++) {
//			        	documentExpectDS.updateData(documentExpectLG.getRecord( EditedRecord[i] )); //save
//			        }
//			        var selected_record = documentExpectLG.getSelectedRecord();
//			        if (selected_record) {
//			        	documentExpectDS.updateData(selected_record);
//			        }
//				}
//			},*/
//		]
//	});
	/*
	isc.IButton.create({
		ID:"shipDocumentExpectManagement_ToolBar",
		name:"saveShipParticularsBtn",
	    title: "Save",
	    onControl:"FSQC_ALL",
	    click: function () {
			console.log("saveShipParticularsBtn");
			var EditedRecord = documentExpectLG.getAllEditRows();
			
			documentExpectLG.endEditing();
			documentExpectLG.saveAllEdits(); //save
			
	        for (i = 0; i < EditedRecord.length; i++) {
	        	documentExpectDS.updateData(documentExpectLG.getRecord( EditedRecord[i] )); //save
	        }
	        var selected_record = documentExpectLG.getSelectedRecord();
	        if (selected_record) {
	        	documentExpectDS.updateData(selected_record);
	        }
		}
	});*/
	
	isc.DynamicForm.create({
	//isc.FormLayout.create({
	    ID: "css_pax",
	    numCols: 4,
	    //width:300, top: 10,
	    //vertical:false,
	    fields: [
	        { 
	        	name: "css", 
	    	    canEdit: true,
	        	title: "CSS's Cert.", 
	        	type: "boolean", 
	        	align:"left",
	        	change: function (form, item, value) {
	        		handleFsqcShipProfileDocumentExpectCheckboxClick("css", value);
	        	}
	        },
	        { 
	        	name: "pax", 
	    	    canEdit: true,
	        	title: "PAX's Cert.", 
	        	type: "boolean", 
	        	align:"left",
	        	change: function (form, item, value) {
	        		handleFsqcShipProfileDocumentExpectCheckboxClick("pax", value);
	        	}
	        }
	    ]
	});
	
	isc.HLayout.create
    ({
	    ID:"fsqcShipProfileDocumentExpectTopControl",
	    width:"100%",
	    height: 30, //"10%",
    	members: 
    	[
    		css_pax,
    		//shipDocumentExpectManagement_ToolBar,
    	]
    })

	isc.ListGrid.create({
		ID:"documentExpectLG", dataSource : documentExpectDS,
	    autoDraw: false,
	    canEdit: true,
	    saveLocally: true,
	    saveByCell: false,
	    autoSaveEdits: false,
	    width: "100%",
	    overflow:"auto",
	    autoFitWidthApproach:"both",
	    wrapHeaderTitles:true,
	    headerHeight:40,
	    fields: [
	            //{name: "imono", title: "IMO NO.", width:80},
				{name: "certype", canEdit: false, title: "Cert. Type", width:100},
	            //{name: "cert_cd", title: "cert_cd", width:80},
//	            {name: "cert_cd_obj.Cert_des", canEdit: false, disabled: true, title: "Certificate / Documentation", width:500},
	            {name: "cert_desc", canEdit: false, title: "Certificate / Documentation", width:500},
				{ name: "cert_cd", canEdit: false, title: "Certificate / Documentation", width:500, hidden: true
					, optionDataSource:"codeCertCodeDS"
					, valueField:"Cert_cd"
					, displayField:"Cert_des"
				},

	            {name: "certnum", canEdit: false, title: "Certificate / Documentation Number Required", width:160},
	            
	            //{name: "definedate", title: "definedate", width:160},
	            
	            {name: "submission", title: "Submission Required", width:100},
	            //{name: "neworold", title: "neworold", width:40},	          
	            
	            ],
//	    sortField: 0,
//	    sortDirection: "ascending",
//	    initialSort: [
//	    	{property: "certype", direction: "ascending"}
//	    	, {property: "Cert_des", direction: "ascending"}
//	    ],
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
				icon: "demand.png",
				title: "Export",
				width: 100,
				//height: 30, 
				onControl:"",
				listGrid: documentExpectLG
			}),
			save_button
			]
	});
	
	isc.VLayout.create
    ({
	    ID:"fsqcShipProfileDocumentExpectTab",
	    width:"100%",
    	members: 
    	[
    		fsqcShipProfileDocumentExpectTopControl,
    		//shipDocumentExpectManagement_ToolBar,
    		//css_pax,
    		documentExpectLG,
    		resultFootLayout
    	]
    })
    //console.log("i_valuesManager");
	//console.log(i_valuesManager);
	//console.log(filterListGrid.getSelectedRecord().document_expect_list);
    //documentExpectLG.setData([]);
	//documentExpectLG.setData(record.document_expect_list);
// Start jacky

	
	codeCertCodeDS.fetchData({}, function (dsResponse, data, dsRequest) {
		if (!isNull(data) && data.length > 0) {
			codeCertCode_map = {};
			//codeCertCodeList = data;
						
			for (var i = 0; i < data.length; i++) {
				var codeCertCode = data[i];
				codeCertCode_map[codeCertCode.Cert_cd.trim()] = codeCertCode; 
			}

			documentExpectDS.fetchData({ imono : record.Imono}, function (dsResponse, data2, dsRequest) {
								
				codeCertCodeList = [];
				recordToDB = [];

				
//	        	if(data2.length < data.length){
	        	
					for (a = 0; a < data.length; a++) {
						//for (b = 0; b < data2.length; b++) {

						var foundRecord = data2.find( {cert_cd:data[a].Cert_cd} );
						
						if( foundRecord ){
							
						}else{
			
//							tempCode = {};
//							tempCode['imono'] = record.Imono;
//							tempCode['certype'] = data[a].doctype;
//							tempCode['cert_cd'] = data[a].Cert_cd;
//							tempCode['certnum'] = '1';
//							tempCode['definedate'] = new Date();
							
//							codeCertCodeList.push(tempCode);
							foundRecord = {};
							foundRecord['imono'] = record.Imono;
							foundRecord['certype'] = data[a].doctype;
							foundRecord['cert_cd'] = data[a].Cert_cd;
							foundRecord['certnum'] = '1';
							foundRecord['definedate'] = new Date();							
							recordToDB.push({cert_cd:data[a].Cert_cd});
							
						}
						foundRecord['cert_desc'] = data[a].Cert_des;
						codeCertCodeList.push( foundRecord );						
					}
									        		
//	        	}else{
//	        		codeCertCodeList = data2;
//					console.log("codeCertCodeList");
//					console.log(codeCertCodeList);
//
//	        	}
	            documentExpectLG.setData([]);
	            documentExpectLG.setData(codeCertCodeList);
//	            documentExpectLG.sort('certype');
	            documentExpectLG.setSort(
	            [
	    	    	{property: "certype", direction: "ascending"}
	    	    	, {property: "cert_desc", direction: "ascending"}
	    	    ]);

			});
				
		}
	});
	    
// End jacky    
    documentExpectLG.setData([]);
//    documentExpectLG.setData(codeCertCodeList);
//	documentExpectLG.sort('certype');

    
/*    documentExpectLG.filterData({ imono : record.Imono}, function (dsResponse, data3, dsRequest) {
    	
    	codeCertCodeDS.fetchData({}, function (dsResponse, data4, dsRequest) {
    		
        	if(data3.length < data4.length){
        		
        		//documentExpectLG.setData([]);
        		documentExpectLG.setData(codeCertCode_list);

        		for (a = 0; a < codeCertCode_list.length; a++) {
        			documentExpectLG.setEditValue(a, 'certype', codeCertCode_list[a].doctype);
        			documentExpectLG.setEditValue(a, 'cert_cd', codeCertCode_list[a].Cert_des);
        			documentExpectLG.setEditValue(a, 'certnum', '1');
        			
            		documentExpectLG.getCellCSSText();

        		}
        		
        	}
    		
    	});
    });
	*/    	


    return 	{
	    //title: "Defining Expected Documentation",
	    title: "Defining Expected Doc.",
	    pane: fsqcShipProfileDocumentExpectTab
	};
	
	codeCertCodeList = [];
	recordToDB = [];

}
