/***************************************************************************************************************
* Qualified Name	: 	/webui/src/main/webapp/js/fsqcdb_ship/fsqcShipProfilePSCInspectionTab.js
* Created By		: 	Albert Chan
* Created date		: 	2019-07-25
* ************************************************************************************************************** 
* Change log:
* log no	Change complete date	Developer			Change Reason
* ======	====================	=========			=============
* 00000		2019-07-25				Albert Chan			Initial Implementation
* 00001 	2019-09-03				Dicky Lee			add access control
* 
****************************************************************************************************************/


function getFsqcShipProfilePSCInspectionTab(i_dataSource, i_valuesManager, record)
{

//	isc.ButtonToolbar.create({
//		ID:"shipPSCInspectionManagement_ToolBar",
//		buttons: 
//		[
//	        { name: "newShipPSCInspectionBtn", title: "Add", autoFit: true, disabled: false, onControl:"FSQC_ALL",
//	        	  click : function () {
//	        		  open_fsqcShipPSCInspectionProfile(pscInspectionDS, record.Imono);
//	        	  }
//	        },
//
//			{name:"saveShipPSCInspectionBtn", title:"Save", autoFit: true, onControl:"FSQC_ALL",
//				click : function () {
//					console.log("saveShipPSCInspectionBtn");
//					var EditedRecord = PSCInspectionLG.getAllEditRows();
//					
//					PSCInspectionLG.endEditing();
//					PSCInspectionLG.saveAllEdits(); //save
//					
//			        for (i = 0; i < EditedRecord.length; i++) {
//			        	pscInspectionDS.updateData(PSCInspectionLG.getRecord( EditedRecord[i] )); //save
//			        }
//			        var selected_record = PSCInspectionLG.getSelectedRecord();
//			        if (selected_record) {
//			        	pscInspectionDS.updateData(selected_record);
//			        }
//			        
//			        isc.say(saveSuccessfulMessage);
//				}
//			},
//		]
//	});

	isc.Label.create({
	    ID: "PSCInspectionLGLabel",
	    contents: "Tips: Double-click the data row to view the details",
	    width: "100%",
	    height: 25,
	    autoDraw: true,
	    baseStyle: "exampleSeparator"
	});
	
	isc.ListGrid.create({
		ID:"PSCInspectionLG", dataSource : pscInspectionDS,
	    autoDraw: false,
	    canEdit: true,
	    saveLocally: true,
	    saveByCell: false,
	    autoSaveEdits: false,
	    width:"100%",
	    overflow:"auto",
	    sortField: 1,
	    sortDirection: "descending",
	    autoFitWidthApproach:"both",
	    wrapHeaderTitles:true,
	    //canRemoveRecords:true,
	    headerHeight:40,
		fields: [
	            {name: "Imono", canEdit: false, disabled: true, width:80},
	            {name: "Inspection", title: "Inspection Date (dd/mm/yyyy)", canEdit: false, autoFitWidth:true, width:150},
	            {name: "Port", title: "Port", width:250},
	            {name: "countryname", width:200},
	            {name: "Defnums", autoFitWidth:true, width:80},
	            {name: "Detained", width:90},
	            {name: "Non_Mou_Detained", width:90},
	            {name: "itemno", autoFitWidth:true, width:80},
	            ],
   		rowDoubleClick:function(psc_record, psc_record_num, fieldNum){
   			console.log("rowDoubleClick");
   			open_fsqcShipPSCInspectionProfile(pscInspectionDS, record.Imono, psc_record, psc_record_num);
   	    },
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
				listGrid: PSCInspectionLG
			}),
			isc.IAddButton.create({ 
				name: "newShipPSCInspectionBtn",
				//icon: "",
				//title: "Add", 
				autoFit: true, 
				disabled: false, 				
				//---start modified 00001 ===
				onControl:"FSQC_ALL||FSQCSHIP_WRITE_PSC_INSP",
				//-----end 00001
	        	click : function () {
	        		  open_fsqcShipPSCInspectionProfile(pscInspectionDS, record.Imono, null, null);
	        	}
	        }),

	        isc.ISaveButton.create({
	        	name:"saveShipPSCInspectionBtn", 
				//icon: "",
	        	//title:"Save", 
	        	autoFit: true, 
 				//---start modified 00001 ---
	        	onControl:"FSQC_ALL||FSQCSHIP_WRITE_PSC_INSP",
	        	//----end 00001--	      
				click : function () {
					console.log("saveShipPSCInspectionBtn");
					var EditedRecord = PSCInspectionLG.getAllEditRows();
					
					PSCInspectionLG.endEditing();
					PSCInspectionLG.saveAllEdits(); //save
					
			        for (i = 0; i < EditedRecord.length; i++) {
			        	pscInspectionDS.updateData(PSCInspectionLG.getRecord( EditedRecord[i] )); //save
			        }
			        var selected_record = PSCInspectionLG.getSelectedRecord();
			        if (selected_record) {
			        	pscInspectionDS.updateData(selected_record);
			        }
			        
			        isc.say(saveSuccessfulMessage);
				}
			}),
			isc.IButton.create({
			    ID:"pscInspectionListDelete",
			    title:"Delete",
			    //--start modified 00001 ==
			    onControl: "FSQC_ALL||FSQCSHIP_WRITE_PSC_INSP",
			    // end  00001 ----
			    width:90,
			    layoutAlign:"center",
			    autoDraw: false,
			    click:function(){
			    	isc.ask(promptDeleteMessage_2, function (value){
						if (value){
							var selected_record = PSCInspectionLG.getSelectedRecord();
							if (selected_record) {
								pscInspectionDS.removeData(selected_record,
									function(dsResponse, data, dsRequest) {
			              				if (dsResponse.status == 0) {
			              					isc.say("Successfully Deleted");
			              					PSCInspectionLG.refreshData ();
			              				}
					  		  		}
								);
							}
						}
					});
			    }
			}),
//			isc.IButton.create({
//			    ID:"pscInspectionListImport",
//			    title:"Import",
//			    onControl: "FSQC_ALL",
//			    width:90,
//			    layoutAlign:"center",
//			    autoDraw: false,
//			    click:function(){
//			    	 open_fsqcShipPSCExcelImportProfile();
//			    }
//			}),

		]
	});

			
	isc.VLayout.create
    ({
	    ID:"fsqcShipProfilePSCInspectionTab",
	    width:"100%",
    	members: 
    	[
    		//shipPSCInspectionManagement_ToolBar,
    		PSCInspectionLGLabel,
    		PSCInspectionLG,
    		resultFootLayout
    	]
    })
    
    PSCInspectionLG.filterData({ Imono: record.Imono });

    return 	{
	    title: "PSC Inspection",
	    pane: fsqcShipProfilePSCInspectionTab
	};
}
