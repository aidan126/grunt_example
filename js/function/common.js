/***************************************************************************************************************
* Qualified Name	 	/webui/src/main/webapp/js/hkmis_cert/common.js
* @author 				Neo Pak
* @since				2019-07-30
* ************************************************************************************************************** 
* Change log:
* log no	Change complete date	Developer			Change Reason
* ======	====================	=========			=============
* 00000		2019-07-23				Neo Pak				Initial Implementation
* 00000		2019-07-30				Neo Pak				Update
* 
****************************************************************************************************************/

function bcc_demo_1(dataSource, tableFields, searchFields, idFields, dataFetchModeValue)
{
	if(dataFetchModeValue==undefined){
		dataFetchModeValue = 'basic';
	}

	isc.TitleLabel.create({
		ID:"shipManagementRegMainSearchResultListLGSummary", contents: "<p> Total no. of search item: <b> 0 </b> </p>"
	});

	isc.SearchForm.create({
		ID:"shipManagementRegMainSearchForm", dataSource : dataSource, numCols: 6,
		saveOnEnter:true,
		submit:function(){
			shipManagementSearchFormToolBar.getButton('searchBtn').click();
		},
		fields: searchFields,
		         rowDoubleClick:function(record, recordNum, fieldNum){
		        	 openBccClcDetail_test(record);
		         }
	});

	isc.ButtonToolbar.create({
		ID:"shipManagementSearchFormToolBar", width: 110,
		buttons: [
		          { name:"searchBtn", title:"Query", autoFit: true, disabled: false,
		        	  click : function () {
		        		  // sfRecWindow.show();
		        		  shipManagementRegMainSearchResultListLG.setData([]);
		        		  var criteria = shipManagementRegMainSearchForm.getValuesAsCriteria(false);
		        		  shipManagementRegMainSearchResultListLG.fetchData(criteria, function(dsResponse, data, dsRequest){
		        			  var c = "<p> Total no. of search item: <b> "+ dsResponse.totalRows +" </b> </p>";
		        			  shipManagementRegMainSearchResultListLGSummary.setContents(c);
		        		  });

		        	  }
		          },
		          { name: "newRecBtn", title: "Add", autoFit: true, disabled: false, onControl:"",
		        	  click : function () {
		        		  openBccClcDetail_test(null);
		        	  }
		          }
		          ]
	});

	var filterListGrid = isc.FilterListGrid.create({
		ID:"shipManagementRegMainSearchResultListLG",
		dataSource: dataSource,
		height:"100%",
		dataFetchMode:dataFetchModeValue,
		fields: tableFields,
			rowDoubleClick:function(record, recordNum, fieldNum){
	        	 openBccClcDetail_test(record);
	         }
	});

	var exportButtonsHLayout = isc.ButtonsHLayout.create({
		icon: "demand.png",
		layoutTopMargin: 0,
		layoutLeftMargin: -3,
		members : [
			isc.IExportButton.create({
				title: "Export",
				width: 100,
				height: 30,
				listGrid: filterListGrid
			})
		]
	});

	var resultVLayout = isc.VLayout.create({
		members : [filterListGrid, exportButtonsHLayout]

	});

	filterListGrid.filterData();

	isc.HLayout.create({
		ID:"shipManagementSearchSectionLayout",
	  	layoutMargin:10,
	  	height:90,
	  	width:950,
	  	membersMargin:20,
	  	members:[
	  	        shipManagementRegMainSearchForm, shipManagementSearchFormToolBar, exportButtonsHLayout
	  	         ]
	   });

	isc.HLayout.create({
		ID: "mainLayout",
		members: [
			isc.VLayout.create({
			    members: [
			              isc.TitleLabel.create({ID:"sectionTitle", contents: "<p><b><font size=3px>ShipManagement Registration Maintenance - Record [Ver 0.1.1]</font></b></p>"}),
			              isc.SectionStack.create({
			          		sections: [
			          			{title: "Search", expanded: true, resizeable: false, items: [ shipManagementSearchSectionLayout]},
			          			{title: "Result", expanded: true, items:
			          			[
			          				shipManagementRegMainSearchResultListLG,
			          				shipManagementRegMainSearchResultListLGSummary
			          			]}
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


function bcc_demo(dataSource, tableFields, searchFields, idFields, dataFetchModeValue)
{
	if(dataFetchModeValue==undefined){
		dataFetchModeValue = 'basic';
	}

	isc.TitleLabel.create({
		ID:"shipManagementRegMainSearchResultListLGSummary", contents: "<p> Total no. of search item: <b> 0 </b> </p>"
	});

	isc.SearchForm.create({
		ID:"shipManagementRegMainSearchForm", dataSource : dataSource, numCols: 6,
		saveOnEnter:true,
		submit:function(){
			shipManagementSearchFormToolBar.getButton('searchBtn').click();
		},
		fields: searchFields,
		         rowDoubleClick:function(record, recordNum, fieldNum){
		        	 open_shipManagement_RecDetail(record);
		         }
	});

	isc.ButtonToolbar.create({
		ID:"shipManagementSearchFormToolBar", width: 110,
		buttons: [
		          { name:"searchBtn", title:"Query", autoFit: true, disabled: false,
		        	  click : function () {
		        		  // sfRecWindow.show();
		        		  shipManagementRegMainSearchResultListLG.setData([]);
		        		  var criteria = shipManagementRegMainSearchForm.getValuesAsCriteria(false);
		        		  shipManagementRegMainSearchResultListLG.fetchData(criteria, function(dsResponse, data, dsRequest){
		        			  var c = "<p> Total no. of search item: <b> "+ dsResponse.totalRows +" </b> </p>";
		        			  shipManagementRegMainSearchResultListLGSummary.setContents(c);
		        		  });

		        	  }
		          },
		          { name: "newRecBtn", title: "Add", autoFit: true, disabled: false, onControl:"",
		        	  click : function () {
		        		  open_shipManagement_RecDetail(null);
		        	  }
		          }
		          ]
	});

	var filterListGrid = isc.FilterListGrid.create({
		ID:"shipManagementRegMainSearchResultListLG",
		dataSource: dataSource,
		height:"100%",
		dataFetchMode:dataFetchModeValue,
		fields: tableFields,
			rowDoubleClick:function(record, recordNum, fieldNum){
	        	 open_shipManagement_RecDetail(record);
	         }
	});

	var exportButtonsHLayout = isc.ButtonsHLayout.create({
		icon: "demand.png",
		layoutTopMargin: 0,
		layoutLeftMargin: -3,
		members : [
			isc.IExportButton.create({
				title: "Export",
				width: 100,
				height: 30,
				listGrid: filterListGrid
			})
		]
	});

	var resultVLayout = isc.VLayout.create({
		members : [filterListGrid, exportButtonsHLayout]

	});

	filterListGrid.filterData();

	isc.HLayout.create({
		ID:"shipManagementSearchSectionLayout",
	  	layoutMargin:10,
	  	height:90,
	  	width:950,
	  	membersMargin:20,
	  	members:[
	  	        shipManagementRegMainSearchForm, shipManagementSearchFormToolBar, exportButtonsHLayout
	  	         ]
	   });

	isc.HLayout.create({
		ID: "mainLayout",
		members: [
			isc.VLayout.create({
			    members: [
			              isc.TitleLabel.create({ID:"sectionTitle", contents: "<p><b><font size=3px>ShipManagement Registration Maintenance - Record [Ver 0.1.1]</font></b></p>"}),
			              isc.SectionStack.create({
			          		sections: [
			          			{title: "Search", expanded: true, resizeable: false, items: [ shipManagementSearchSectionLayout]},
			          			{title: "Result", expanded: true, items: [ shipManagementRegMainSearchResultListLG,
			          				shipManagementRegMainSearchResultListLGSummary ]}
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
