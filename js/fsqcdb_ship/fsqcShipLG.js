/***************************************************************************************************************
* Qualified Name	: 	/webui/src/main/webapp/js/fsqcdb_ship/fsqcShipLG.js
* Created By		: 	Jacky Leong
* Created date		: 	2019-07-02
* ************************************************************************************************************** 
* Change log:
* log no	Change complete date	Developer			Change Reason
* ======	====================	=========			=============
* 00000		2019-07-02				Jacky Leong			Initial Implementation
* 00001		2019-07-25				Albert Chan			Add RO
* 00002		2019-09-03				Dicky Lee			add access control		
*
****************************************************************************************************************/

ship_registry_flag_A = "#CCFFFF";
ship_registry_flag_D = "#FFBB99";
ship_registry_flag_F = "#CCCCFF";
ship_registry_flag_P = "#66FF66";

function fsqcShipLG(lg_id, searchFields, sortFields, idFields, dataFetchModeValue){
	if(dataFetchModeValue==undefined){
		dataFetchModeValue = 'basic';
	}

	var resultCountMsg = isc.TitleLabel.create({
		contents: "<p> Total no. of search item: <b> 0 </b> </p>"
	});

	var searchInputForm = isc.SearchForm.create({
		width: "75%",
		dataSource : fsqcShipDS, 
		numCols: 8,
	    saveOnEnter: true,
		submit:function(){
			searchFormToolBar.getButton('searchBtn').click();
		},
		fields: searchFields
	});
	
	var filterListGrid = isc.ListGrid.create({
		ID:lg_id,
		dataSource: fsqcShipDS,
		showFilterEditor:true,
		filterOnKeypress:true,
		fetchDelay:500,
	    dataPageSize: 20,
		height:"100%",
		dataFetchMode:dataFetchModeValue,
	    canMultiSort: true,
	    initialSort: sortFields,
//	    groupByField: sortFields, 
	    groupStartOpen:"all",

	    showGridSummary:true,
		showGroupSummary:true,

		autoFitFieldWidths: true,
		fields: [
			{ name: "Spname", width: 200},
//			{ name: "Old_Spname", width: 200
//				, optionDataSource:"shipnameHistoryDS"
//				, valueField:"Imono"
//				, displayField:"shipname"
//				, pickListFields:[
////						{name:"Com_cd"},
////					{name:"Del_mark", width: "*"},
//					{name:"Imono", width: "*"},
//					{name:"shipname", autoFitWidth:true}
//				]
////				, displayValueFromRecord:true 	
//			},
			//{ name: "Imono", summaryFunction:"count"},
			{ name: "Imono"},
			{ name: "mmsi_no"},
			{ name: "Signno"},
			{ name: "Sptype", width: 200
				, optionDataSource:"shipTypeCodeDS"	// 00001
				, valueField:"sptyp_cd"		// 00001
				, displayField:"sptyp_nam"	// 00001
			},
			{ name: "Gross", showGroupSummary:true, summaryFunction:"sum", width: 80},
			//{ name: "Gross", width: 80},
			{ name: "length_ll", showGridSummary:false},
			{ name: "Regno"},
			{ name: "Fileno"},
			{ name: "Del_mark"},
			{ name: "Regdate"},
			{ name: "re_regdate"},
			{ name: "flagout_date"},
			{ name: "Builtdate"},
			{ name: "Cs"},
			{ name: "Manager", width: 200
				, optionDataSource:"companyManagementDS"
				, valueField:"Com_cd"
				, displayField:"Com_name"
//				, displayValueFromRecord:true 	
			},
			{ name: "dpa", width: 200},
			{ name: "sco", width: 200},
			{ name: "Owner", width:200
				, optionDataSource:"companyOwnerCodeDS"
				, valueField:"Owner_cd"
				, displayField:"Owner_des"
			},
			{ name: "operTypeCode", width: 80},		// 00001
			{ name: "surveyShipType", width: 80},		// 00001

			
			

//			{ name: "Fileno"},
//			{ name: "flage"},
//			{ name: "Status"},
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
//			{ name: "Del_mark", width: 80},
//			{ name: "del_date"},
//			{ name: "csname"},
//			{ name: "hull_con"},
//			{ name: "agent"},
//			{ name: "ssas_name"},
//			{ name: "ssas_model"},
//			{ name: "ssas_sample"},
//			{ name: "file_name"},
//			{ name: "re_regdate"},
//			{ name: "demise"},
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
		],

		rowDoubleClick:function(record, recordNum, fieldNum){
			open_fsqcShipProfile(fsqcShipDS, record);
	    },
	    dataArrived:function(startRow, endRow){
	    	console.log("Data Arrived: " + startRow + " " + endRow + " of " + filterListGrid.data.totalRows);
//			var c = "<p> Total no. of search item: <b> "+ (endRow - startRow) +" </b> </p>";
	    	var count = (filterListGrid.data.totalRows==undefined)? 0 : filterListGrid.data.totalRows;
			var c = "<p> Total no. of search item: <b> "+ count +" </b> </p>";
			resultCountMsg.setContents(c);
	    	filterListGrid.groupBy(["Del_mark"]);
	    },
		getSectionStack:function(){
			parent_arr = this.getParentElements();
			for (i = 0; i < parent_arr.length; i++) { 
                console.log("***parent_arr[i]: " + parent_arr[i]);
				if( 'sections' in parent_arr[i] )
				{
					return parent_arr[i];
				}
			}
		},
		filterButtonProperties:{
			click:function(){
				var listGrid = this.getParentElements().get(1);
				listGrid.setData([]);
				var sectionStack = listGrid.getSectionStack();
				if(sectionStack != undefined)
				{
                    console.log("***sectionStack: " + (sectionStack));
					sectionStack.getSectionHeader(1).setTitle(newTitle);
					var form = sectionStack.sections.get(1).items[0].members[0];
					form.setValues([]);
				}
				listGrid.filterData([], 
						function(dsResponse, data, dsRequest){
							if(sectionStack != undefined)
							{
								sectionStack.getSectionHeader(0).setTitle("Maintenance("+dsResponse.totalRows+")");
							}
						}
				);
			}	
//			var sectionStack = listGrid.getParentElements()[0].getParentElements()[0];
//			sectionStack.getSectionHeader(1).setTitle(newTitle);
//			var form = sectionStack.sections.get(1).items[0].members[0];
//			form.setValues([]);
//			listGrid.filterData([], function(dsResponse, data, dsRequest){
//				sectionStack.getSectionHeader(0).setTitle("Maintenance("+dsResponse.totalRows+")");
//			});
//			}
		},
		filterData:function(criteria, callback, requestProperties){
			var listGrid = this;
			var sectionStack = this.getSectionStack();
			if(callback == null){
				this.Super("filterData", [criteria, function(dsResponse, data, dsRequest){
					if( sectionStack != undefined)
					{
						sectionStack.getSectionHeader(0).setTitle("Maintenance("+dsResponse.totalRows+")");
					}
				}, requestProperties]);
				var listgrid = this;
				setTimeout(function(){
					var data = listgrid.data.localData;
					if (data == null){
						data = listgrid.data;
					}
					if( sectionStack != undefined)
					{
						sectionStack.getSectionHeader(0).setTitle("Maintenance("+data.length+")");
					}
				}, 100);
			}else{
				this.Super("filterData", arguments);
			}
		},
	    getCellCSSText: function (ship_record, rowNum, colNum) {	// 00001
            switch (ship_record.Del_mark)
            {
            case "A":
            	return "background-color:" + ship_registry_flag_A + ";";
            case "D":
            	return "background-color:" + ship_registry_flag_D + ";";
            case "F":
            	return "background-color:" + ship_registry_flag_F + ";";
            case "P":
            	return "background-color:" + ship_registry_flag_P + ";";
	        }
	    }	    

	});
	
	var searchFormToolBar = isc.ButtonToolbar.create({
		width: "100%",
		buttons: [
			 //==== 00002  modified by dicky 
		          { name:"searchBtn", title:"Query", autoFit: true, disabled: false,onControl:"FSQC_ALL||FSQCSHIP_READ",
	 		//====== end 00002 ======== 
		        	  click : function () {
		        		  // sfRecWindow.show();
		        		  filterListGrid.setData([]);
		        		  var criteria = searchInputForm.getValuesAsCriteria(false);
		        		  filterListGrid.fetchData(criteria, function(dsResponse, data, dsRequest){
		        			  //var c = "<p> Total no. of search item: <b> "+ dsResponse.totalRows +" </b> </p>";
		        			  var count = (filterListGrid.data.totalRows==undefined)? 0 : filterListGrid.data.totalRows;
		        			  var c = "<p> Total no. of search item: <b> "+ count +" </b> </p>";
		        			  resultCountMsg.setContents(c);
		        		  });

		        	  }
		          },
                  {     name: "clearBtn", title: "Clear", autoFit: true, disabled: false, valign:"top",
                        click : function () {
                            searchInputForm.clearValues();
                            filterListGrid.setFilterEditorCriteria();
                            filterListGrid.clearCriteria();
                        }
                  },
                  
                  
                  
//		          { name: "newRecBtn", title: "Add", autoFit: true, disabled: false, onControl:"RENEW_SEAFARER_REGISTRATION",
//		        	  click : function () {
//		        		  open_fsqcShipProfile(fsqcShipDS, null);
//		        	  }
//		          },


                  /*
		          { name: "previewShipBtn", title: "Preview PDF", autoFit: true, disabled: false,
		        	  click : function () {
					        var selected_record = filterListGrid.getSelectedRecord();
                            console.log("Preview PDF: " + selected_record);
					        if (selected_record) {
					        	var requestArguments = ["RPT_Ship_Profile", {"Imono" : selected_record.Imono}]; 
					        	ReportViewWindow.displayReport(requestArguments);
					        }
		        	  }
		          },
		          { name: "previewRtfShipBtn", title: "Preview Word", autoFit: true, disabled: false,
		        	  click : function () {
					        var selected_record = filterListGrid.getSelectedRecord();
                            console.log("Preview Word: " + selected_record);
					        if (selected_record) {
					        	var requestArguments = ["RPT_Ship_Profile_Rtf", {"Imono" : selected_record.Imono}]; 
					        	ReportViewWindow.downloadReport(requestArguments);
					        }
		        	  }
		          }
                  */
                  
                  
                  
		],
	});

	//var searchSectionLayout = isc.HLayout.create({
	var searchSectionLayout = isc.VLayout.create({
	  	layoutMargin:10,
	  	height:90,
	  	width:"100%",
	  	membersMargin:20,
	  	members:[
  	        searchInputForm, searchFormToolBar
//	  	        searchInputForm, searchFormToolBar, exportButtonsHLayout
	  	         ]
	});

	var resultFootLayout = isc.HLayout.create({
	  	height:"5%",
		members: [
			resultCountMsg,
            
            //var searchFormToolBar = 
            isc.ButtonToolbar.create({
                    //width: "100%",
                    buttons: [

		          { name: "previewShipBtn", title: "Preview PDF", autoFit: true, disabled: false,
		        	  click : function () {
					        var selected_record = filterListGrid.getSelectedRecord();
                            console.log("Preview PDF: " + selected_record);
					        if (selected_record) {
					        	var requestArguments = ["RPT_Ship_Profile", {"Imono" : selected_record.Imono}]; 
					        	ReportViewWindow.displayReport(requestArguments);
					        }
		        	  }
		          },
		          { name: "previewRtfShipBtn", title: "Preview Word", autoFit: true, disabled: false,
		        	  click : function () {
					        var selected_record = filterListGrid.getSelectedRecord();
                            console.log("Preview Word: " + selected_record);
					        if (selected_record) {
					        	var requestArguments = ["RPT_Ship_Profile_Rtf", {"Imono" : selected_record.Imono}]; 
					        	ReportViewWindow.downloadReport(requestArguments);
					        }
		        	  }
		          }
                  
            ]})
            ,
			isc.IExportButton.create({
				icon: "demand.png",
				title: "Export",
				width: 100,
                height: 30,
				onControl:"",
				mode : "queryAndGridListExport",
				listGrid: filterListGrid
			})
		]
	});
	
	var mainLayout = isc.HLayout.create({
		members: [
			isc.VLayout.create({
			    members: [
//				              isc.TitleLabel.create({ID:"sectionTitle", contents: "<p><b><font size=3px>ShipManagement Registration Maintenance - Record [Ver 0.1.1]</font></b></p>"}),
			              isc.SectionStack.create({
			            	height: "100%",
			          		sections: [
			          			{title: "Search", expanded: true, resizeable: false, items: [ searchSectionLayout]},
			          			{title: "Result", expanded: true, items: [ filterListGrid,
			          				resultFootLayout]}
			          		]
			              })

			             ]
			})
		  ]
	});

	return isc.VLayout.create({
		members : [mainLayout]
	});

}