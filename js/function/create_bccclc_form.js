/***************************************************************************************************************
* Qualified Name	 	/webui/src/main/webapp/js/hkmis_cert/create_bccclc_form.js
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

function create_bccclc_form(dataSource, tableFields, searchFields, idFields, dataFetchModeValue)
{
	if(dataFetchModeValue==undefined){
		dataFetchModeValue = 'basic';
	}

	isc.TitleLabel.create({
		ID:"bccclcSearchText", contents: "<p> Total no. of search item: <b> 0 </b> </p>"
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
		        			  bccclcSearchText.setContents(c);
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
		height:"50%",
		dataFetchMode:dataFetchModeValue,
		fields: tableFields,
			rowDoubleClick:function(record, recordNum, fieldNum){
	        	 open_shipManagement_RecDetail(record);
	         }
	});

	isc.DynamicForm.create({
		ID:"bccclcSearchList",
		dataSource: "certJobBccclcDS",
		// width:"100%",
		height:"50%",
		numCols: 8,
		colWidths: ["1", "1", "1", "1", "1", "1", "1", "1"],
		fields:
		[

			{name: "start_date", 	title:"Duration of Security From:",	type:"date", startRow: true, textAlign:"center", colSpan: 1, width: 200},
			{name: "expiry_date", title:"To:", type:"date", startRow: false, textAlign:"center", colSpan: 1, width: 200},
			{name: "valid_date", title:"Valid On:", type:"date", startRow: false, textAlign:"center", colSpan: 1, width: 200},

			{name: "insurer_id1", 	title:"Insurer Id1:",	startRow: true, colSpan: 1, width: 200},
			{name: "insurer_name1", 	title:"Insurer Name1:",	startRow: false, colSpan: 1, width: 300},

			{name: "Select1", 	title:"Select", type:"button", startRow: false, colSpan: 1, width: 100,
				click : function (record, recordNum, fieldNum)
				{
					select_bccclc_add_RecDetail1(record);
				}
			},

			{name: "insurer_address1", 	title:"Insurer Addrees1:",	startRow: true, colSpan: 4, width: 700},

			{name: "insurer1_address2", 	title:"Insurer Addrees2:",	startRow: true, colSpan: 4, width: 700},

			{name: "insurer1_address3", 	title:"Insurer Addrees3:",	startRow: true, colSpan: 4, width: 700},

			{name: "insurer_id2", 	title:"Insurer Id2:",	startRow: true, colSpan: 1, width: 200},
			{name: "insurer_name2", 	title:"Insurer Name2:",	startRow: false, colSpan: 1, width: 300},

			{name: "Select2", 	title:"Select", type:"button", startRow: false, colSpan: 1, width: 100,
				click : function (record, recordNum, fieldNum)
				{
					select_bccclc_add_RecDetail2(record);
				}
			},

			{name: "insurer_address2", 	title:"Insurer Addrees1:",	startRow: true, colSpan: 4, width: 700},

			{name: "insurer2_address2", 	title:"Insurer Addrees2:",	startRow: true, colSpan: 4, width: 700},

			{name: "insurer2_address3", 	title:"Insurer Addrees3:",	startRow: true, colSpan: 4, width: 700},


		]
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

	isc.DynamicForm.create({
		  ID: "NewJobForm",
		  dataSource: certJobBccclcDS,
		  numCols: 8,
		  autoDraw: false,
		  /*
          fields: [
              {name:"formlists", title:"formlists", hidden:false, defaultValue:[]}
              ]
          */

	});

	isc.ButtonToolbar.create({
		ID:"NewJobBtnBar",
		buttons: [
		          { name:"searchBtn", title:"Type of Certificate", autoFit: true, disabled: false,
		        	  click : function () {
		        		  /*
		        		  // sfRecWindow.show();
		        		  shipManagementRegMainSearchResultListLG.setData([]);
		        		  var criteria = shipManagementRegMainSearchForm.getValuesAsCriteria(false);
		        		  shipManagementRegMainSearchResultListLG.fetchData(criteria, function(dsResponse, data, dsRequest){
		        			  var c = "<p> Total no. of search item: <b> "+ dsResponse.totalRows +" </b> </p>";
		        			  bccclcSearchText.setContents(c);
		        		  });
		        		  */
		        	  }
		          },
		          { name: "newRecBtn", title: "Get New Job", autoFit: true, disabled: false,
		        	  click : function () {

		        		  	NewJobForm.setValue("form", "BCC");
		        		  	NewJobForm.setValue("ver", "1.0");
		        		  	NewJobForm.setValue("imono", shipManagementRegMainSearchResultListLG.getSelectedRecord().imono);
		        		  	NewJobForm.setValue("shipName", shipManagementRegMainSearchResultListLG.getSelectedRecord().spname);
		        		  	NewJobForm.setValue("status", "Process");
		        		  	NewJobForm.setValue("editStatus", "1");
		        		  	//NewJobForm.setValue("begin_date", "");
		        		  	NewJobForm.setValue("startPerson", "fsqcc");
		        		  	NewJobForm.setValue("shipId", shipManagementRegMainSearchResultListLG.getSelectedRecord().id);
		        		  	//NewJobForm.setValue("formlists", []);

		        		  	NewJobForm.saveData();

		        		  	//NewJobForm.hide();
		        		  	//open_shipManagement_RecDetail(null);
		        	  }
		          },
		          { name: "newRecBtn", title: "Close", autoFit: true, disabled: false,
		        	  click : function () {
		        		  //open_shipManagement_RecDetail(null);
		        	  }
		          }
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
			          			{title: "Result", expanded: true, items: [ shipManagementRegMainSearchResultListLG
			          				//,bccclcSearchText
			          				]
			          			},
			          			{title: "Select data", expanded: true, items:
				          			[
				          				//bccclcSearchList,
				          				//bccclcSearchText,
				          				NewJobForm,
				          				NewJobBtnBar
				          			]
				          		},
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
