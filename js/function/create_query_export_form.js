/***************************************************************************************************************
* Qualified Name	 	/webui/src/main/webapp/js/hkmis_cert/create_query_export_form.js
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

function create_query_export_form(dataSource, tableFields, searchFields, idFields, dataFetchModeValue)
{
	if(dataFetchModeValue==undefined){
		dataFetchModeValue = 'basic';
	}

	var resultCountMsg = isc.TitleLabel.create({
		contents: "<p> Total no. of search item: <b> 0 </b> </p>"
	});

	var searchInputForm = isc.SearchForm.create({
		width: "75%",
		dataSource : dataSource, 
		numCols: 4,
		submit:function(){
			searchFormToolBar.getButton('searchBtn').click();
		},
		fields: searchFields
	});

	var searchFormToolBar = isc.ButtonToolbar.create({
		width: "100%",
		buttons: [
		          { name:"searchBtn", title:"Query", autoFit: true, disabled: false,
		        	  click : function () {
		        		  // sfRecWindow.show();
		        		  create_query_export_form_LG.setData([]);
		        		  var criteria = searchInputForm.getValuesAsCriteria(false);
		        		  create_query_export_form_LG.fetchData(criteria, function(dsResponse, data, dsRequest){
		        			  var c = "<p> Total no. of search item: <b> "+ dsResponse.totalRows +" </b> </p>";
		        			  resultCountMsg.setContents(c);
		        		  });

		        	  }
		          },
		          { name: "newRecBtn", title: "Add", autoFit: true, disabled: false, onControl:"",
		        	  click : function () {
		        		  open_shipManagement_RecDetail(null);
		        	  }
		          }
		],
	});

	var filterListGrid = isc.FilterListGrid.create({
		ID:"create_query_export_form_LG",
		dataSource: dataSource,
		height:"100%",
		dataFetchMode:dataFetchModeValue,
		fields: tableFields,
			rowDoubleClick:function(record, recordNum, fieldNum){
	        	 open_shipManagement_RecDetail(record);
	         }
	});

	filterListGrid.filterData();

	var searchSectionLayout = isc.HLayout.create({
	  	layoutMargin:10,
	  	height:90,
	  	width:"100%",
	  	membersMargin:20,
	  	members:[
  	        searchInputForm, searchFormToolBar
 	        // searchInputForm, searchFormToolBar, exportButtonsHLayout
	  	         ]
	});

	var resultFootLayout = isc.HLayout.create({
	  	height:"5%",
		members: [
			resultCountMsg,
			isc.IExportButton.create({
				icon: "demand.png",
				title: "Export",
				width: 100,
				//height: 30, 
				onControl:"",
				listGrid: filterListGrid
			})
		]
	});
	
	var mainLayout = isc.HLayout.create({
		members: [
			isc.VLayout.create({
			    members: [
			              // isc.TitleLabel.create({ID:"sectionTitle", contents: "<p><b><font size=3px>ShipManagement Registration Maintenance - Record [Ver 0.1.1]</font></b></p>"}),
			              isc.SectionStack.create({
			            	height: "100%",
			          		sections: [
			          			{title: "Search", expanded: true, resizeable: false, items: [ searchSectionLayout]},
			          			{title: "Result", expanded: true, items: 
			          				[ 
				          				create_query_export_form_LG,
				          				resultFootLayout
			          				]
			          			}
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
