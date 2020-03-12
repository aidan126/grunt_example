/***************************************************************************************************************
* Qualified Name	: 	/webui/src/main/webapp/js/fsqcdb_ship/fsqcShipProfileDocumentTab.js
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

var certificateList = [];
var certificateRecordToDB = [];

function getFsqcShipProfileDocumentTab(i_dataSource, i_valuesManager, record)
{
	/*
	isc.ButtonToolbar.create({
		ID:"shipDocumentManagement_ToolBar",
		buttons: 
		[

			{name:"saveShipDocumentBtn", title:"Save", autoFit: true, onControl:"FSQC_ALL",
				click : function () {
					console.log("saveShipDocumentBtn");
					var EditedRecord = documentLG.getAllEditRows();
					
					documentLG.endEditing();
					documentLG.saveAllEdits(); //save
					
			        for (i = 0; i < EditedRecord.length; i++) {
			        	fsqcCertificateDS.updateData(documentLG.getRecord( EditedRecord[i] )); //save
			        }
			        var selected_record = documentLG.getSelectedRecord();
			        if (selected_record) {
			        	fsqcCertificateDS.updateData(selected_record);
			        }
				}
			},
		]
	});*/

	isc.ListGrid.create({
		ID:"documentLG", dataSource : fsqcCertificateDS,
	    autoDraw: false,
	    canEdit: true,
	    saveLocally: true,
	    saveByCell: false,
	    autoSaveEdits: false,
	    width:"100%",
	    overflow:"auto",
	    autoFitWidthApproach:"both",
	    wrapHeaderTitles:true,
	    //canRemoveRecords:true,
	    headerHeight:40,
//	    sortField: 1,
//	    sortDirection: "descending",
		fields: [
	            {name: "Imono", canEdit: false, title: "IMO NO.", width:80},
	            //{name: "Cert_cd", canEdit: false, disabled: true, title: "Cert. cd", width:80},
	            //{name: "cert_cd_obj.Cert_des", canEdit: false, disabled: true, title: "Certificate Name", width:300},
				{ name: "Cert_cd", canEdit: false, title: "Certificate Name", width:300
					, optionDataSource:"codeCertCodeDS"
					, valueField:"Cert_cd"
					, displayField:"Cert_des"
				},
	            //{name: "doctype", canEdit: false, disabled: true, title: "Doc. Type", width:80},
	            //{name: "Certtype", canEdit: false, disabled: true, title: "Certificate Type", width:160},
	            
	            {name: "Issue", title: "Issued Date (dd/mm/yyyy)", canEdit: true, width:80},
	            {name: "S_info", title: "Certificate RO", canEdit: true, width:80
	            	, optionDataSource:"codeRODS"
					, valueField:"Cs_cd"
					, displayField:"Cs_cd"
					, optionCriteria:{
						hide:"2"
			        }
				},
	            {name: "Recdate", title: "Submision Date (dd/mm/yyyy)", canEdit: true, width:80},
	            //{name: "Expiry", title: "Cert Expiry Date", width:160},
	            
	            //{name: "Recdate", title: "Received Date", width:50},
	            //{name: "summission", title: "Submission is required", width:50},
	            //{name: "serial", title: "Serial", width:50},
	            //{name: "Intime", title: "Input Mode", width:50},
	            //{name: "neworold", title: "neworold", width:40},
	            
	            {name: "Intime", title: "Submitted in time", width:50},
	            {name: "typoerror", title: "Typo Error", width:50},
	            {name: "adminerror", title: "Incorrect name of Administration", width:50},
	            {name: "conventionerror", title: "Non-comply with Conventions", width:50},
	            {name: "othererror", title: "Other incorrect information", width:50},
	            ],
	});

	
	var save_button = 
		isc.ISaveButton.create({
		//---start modified 00001=====
			name:"saveShipDocumentBtn", title:"Save", autoFit: true, onControl:"FSQC_ALL||FSQCSHIP_WRITE_RECEIVED_DOC",
			// ----end 
			click : function () {
				console.log("saveShipDocumentBtn");
				var EditedRecord = documentLG.getAllEditRows();
				//var saveFlag_certificateUpdate = false;
				//var saveFlag_certificateInsert = false;
				
				documentLG.endEditing();
				documentLG.saveAllEdits(); //save
				
		        for (i = 0; i < EditedRecord.length; i++) {
		        	
		        	fsqcCertificateDS.updateData(documentLG.getEditedRecord( EditedRecord[i] ), function(dsResponse, data, dsRequest){
		        		isc.say("Successfully Deleted");
		        	}); //save
	        		//saveFlag_certificateUpdate = true;

		        }
/*		        for (k = 0; k < certificateRecordToDB.length; k++) {
		        	
		        	console.log("SAVE");
		        	console.log(certificateRecordToDB[k]);
		        	console.log( documentLG.getEditedRecord( documentLG.getRowNum( documentLG.find( {Cert_cd:certificateRecordToDB[k].Cert_cd} ) )) );
		        	fsqcCertificateDS.updateData(documentLG.getEditedRecord( documentLG.getRowNum( documentLG.find( {Cert_cd:certificateRecordToDB[k].Cert_cd} ) )), function(dsResponse, data, dsRequest){}); //save
    				saveFlag_certificateInsert = true;
		        	
		        }
*/
		        var selected_record = documentLG.getSelectedRecord();
		        if (selected_record) {
		        	fsqcCertificateDS.updateData(selected_record);
		        }
		        
/*		        console.log("EditedRecord.length");
		        console.log(EditedRecord.length);
		        console.log("certificateRecordToDB.length");
		        console.log(certificateRecordToDB.length);
		        console.log("saveFlag_update");
		        console.log(saveFlag_certificateUpdate);
		        console.log("saveFlag_insert");
		        console.log(saveFlag_certificateInsert);
		        
		        if(EditedRecord.length < 1){
		        	if(certificateRecordToDB.length > 0 && saveFlag_certificateInsert){
	    				isc.say("Successfully Deleted");
		        	}
		        }
		        if(certificateRecordToDB.length < 1){
		        	if(EditedRecord.length > 0 && saveFlag_certificateUpdate){
	    				isc.say("Successfully Deleted");
		        	}
		        }
		        if(certificateRecordToDB.length > 0 && EditedRecord.length > 0){
		        	if(saveFlag_certificateUpdate && saveFlag_certificateInsert){
	    				isc.say("Successfully Deleted");
		        	}
		        }
*/		        
		        EditedRecord = [];
		        //certificateRecordToDB = [];
		        
		        //fetch_documentLG(record);
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
				listGrid: documentLG
			}),
			save_button,
			isc.IButton.create({
			    ID:"otherDocListDelete",
			    title:"Delete",
			  //---start 00001---=-
			    onControl: "FSQC_ALL||FSQCSHIP_WRITE_RECEIVED_DOC",
			    //====end 00001
			    
			    width:90,
			    layoutAlign:"center",
			    autoDraw: false,
			    click:function(){
			    	isc.ask(promptDeleteMessage_2, function (value){
						if (value){
							var selected_record = documentLG.getSelectedRecord();
							if (selected_record) {
								//console.log(selected_record);

								fsqcCertificateDS.fetchData({ Imono: selected_record.Imono, Cert_cd: selected_record.Cert_cd, doctype : selected_record.doctype}, function (dsResponse, data3, dsRequest){
									if(data3.length > 0){
										
										console.log("UP");
										console.log(selected_record);
										fsqcCertificateDS.removeData(selected_record,
												function(dsResponse, data, dsRequest){
						              				if (dsResponse.status == 0){
						              					isc.say("Successfully Deleted");
						              					//documentLG.refreshData ();
						              					documentLG.removeData(selected_record);
						              				}
								  		  		}
										);

									}else{
										
										//console.log("DOWN");
										
										documentLG.removeData(selected_record);
										
										//console.log( certificateRecordToDB.indexOf( {Cert_cd: selected_record.Cert_cd} )  );
										
										//certificateRecordToDB.remove( selected_record );
										console.log( certificateRecordToDB.find({Cert_cd: selected_record.Cert_cd}) );
										
										console.log(certificateRecordToDB);
										certificateRecordToDB.remove( certificateRecordToDB.find({Cert_cd: selected_record.Cert_cd}) );
										//certificateRecordToDB.removeAt(0);
										console.log(certificateRecordToDB);
										
										isc.say("Successfully Deleted");
									}
								});
								
							}
						}
					});
			    }
			}),
			
			]
	});
	
	isc.VLayout.create
    ({
	    ID:"fsqcShipProfileDocumentTab",
	    width:"100%",
    	members: 
    	[
    		//shipDocumentManagement_ToolBar,
    		documentLG,
    		resultFootLayout
    	]
    })
//    console.log("documentLG");
//    console.log(record);
    
    //documentLG.setData([]);
    
    documentLG.filterData({ Imono: record.Imono, doctype : 'Other'});
    	
    //if(record){
        //fetch_documentLG(record, false);
    //}
	

	
//	var filtered_list = [];
//	for (var i = 0; i < record.certificate_list.length; i++) {
//		if (record.certificate_list[i].doctype == 'Other') {
//			filtered_list.push(record.certificate_list[i]);
//		}
//	}
//	console.log(filtered_list);
//    documentLG.setData(filtered_list);

    return 	{
	    //title: "Documentation other than Certificate",
	    title: "Doc. other than Cert.",
	    pane: fsqcShipProfileDocumentTab
	};
}

function fetch_documentLG(record, saveFlag){
	
	console.log("OKOKOKOKOKOK");
	documentLG.setData([]);
	
	documentExpectDS.fetchData({ imono:record.Imono, certype:'Other', submission:true}, function (dsResponse, data, dsRequest){
		fsqcCertificateDS.fetchData({ Imono: record.Imono, doctype : 'Other'}, function (dsResponse, data2, dsRequest){
			
			console.log("DOC Expect---");
			console.log(data);
			console.log("Certificate---");
			console.log(data2);
			
	        certificateList = [];
			certificateRecordToDB = [];

			certificateList = data2;
			
			for (a = 0; a < data.length; a++){
				
				var foundRecord = data2.find( {Cert_cd:data[a].cert_cd} );
				    			
				console.log(a);
				console.log(data[a].cert_cd);
				console.log(foundRecord);
				
				if( !foundRecord ){
					
	    			console.log("INNIN");

					
					foundRecord = {};
					foundRecord['Imono'] = record.Imono;
					foundRecord['Cert_cd'] = data[a].cert_cd;
					foundRecord['serial'] = '1';
					foundRecord['Intime'] = true;
					foundRecord['doctype'] = 'Other';
					
					//foundRecord['definedate'] = new Date();	
							    		
		    		certificateList.push( foundRecord );
		    		
		    		certificateRecordToDB.push({Cert_cd:data[a].cert_cd});
		    		
		    		console.log("certificateRecordToDB");
		    		console.log(certificateRecordToDB);

				}
			}
			
	/*    		for (b = 0; b < data2.length; b++){
				
				var foundRecord = data.find( {cert_cd:data2[b].Cert_cd} );
				
				console.log("INNIN222");
				console.log(b);
				console.log(foundRecord);
				
				if( !foundRecord ){
		    		certificateList.push( foundRecord );
		    		
		    		console.log("certificateList");
		    		console.log(certificateList);

				}
			}
	*/
						
			console.log(certificateList);

			documentLG.setData([]);
	        documentLG.setData(certificateList);
	        certificateList = [];
			//certificateRecordToDB = [];
	        
	        
	    	console.log("SAVE2");
	    	console.log(certificateRecordToDB);
	    	
	    	
	    	if(saveFlag){
		    	for (k = 0; k < certificateRecordToDB.length; k++) {
		        	
		        	console.log("SAVE3");
		        	console.log(certificateRecordToDB[k]);
		        	console.log( documentLG.getRecord( documentLG.getRowNum( documentLG.find( {Cert_cd:certificateRecordToDB[k].Cert_cd} ) )) );
		        	
		        	fsqcCertificateDS.updateData(documentLG.getRecord( documentLG.getRowNum( documentLG.find( {Cert_cd:certificateRecordToDB[k].Cert_cd} ) )), function(dsResponse, data, dsRequest){}); //save
		        	
		        }	    		
	    	}
	        
		});
    });
	
	//return certificateRecordToDB;

}
function save_documentLG(  ){


}
