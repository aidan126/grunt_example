
isc.TitleLabel.create({
	ID:"seafarerRegMainSearchResultListLGSummary", contents: "<p> Total no. of search item: <b> 0 </b> </p>"
});


isc.SearchForm.create({
	ID:"seafarerRegMainSearchForm", dataSource : "seafarerDS", numCols: 6,
	saveOnEnter:true,
	submit:function(){
		seafarerSearchFormToolBar.getButton('searchBtn').click();
	},
	fields: [
	         { name: "id", title: "HKID", type: "text"}, 
	         { name: "serbNo", title: "SERB", type: "text"}, 
	         { name: "partType", editorType:"SelectItem", endRow: true}, 
	         
	         { name: "surname", title: "Surame (English)", type: "text"}, 
	         { name: "firstName", title: "First Name (English)", type: "text"}, 
	         { name: "chiName", title: "Chinese Name", type: "text", endRow: true}, 
	         { name: "sex"}, 
//	         { name: "province", title: "Province Name", type: "text"}, 
	         { name: "nationalityId", title: "Natonality", type: "SelectItem", endRow: true, 
	        	 optionDataSource:"nationalityDS",
	        	 displayField:"engDesc", valueField:"id"
	         }
	         ]
});
	
isc.ButtonToolbar.create({
	ID:"seafarerSearchFormToolBar",
	buttons: [
	          { name:"searchBtn", title:"Search", autoFit: true, disabled: false,
	        	  click : function () { 
	        		  // sfRecWindow.show();
	        		  seafarerRegMainSearchResultListLG.setData([]);
	        		  var criteria = seafarerRegMainSearchForm.getValuesAsCriteria(false);
	        		  seafarerRegMainSearchResultListLG.fetchData(criteria, function(dsResponse, data, dsRequest){
	        			  var c = "<p> Total no. of search item: <b> "+ dsResponse.totalRows +" </b> </p>";
	        			  seafarerRegMainSearchResultListLGSummary.setContents(c);  
	        		  });
	        		  
	        	  }
	          }, 
	          { name: "newRecBtn", title: "New Seafarer Record", autoFit: true, disabled: false, onControl:"RENEW_SEAFARER_REGISTRATION",
	        	  click : function () { 
	        		  openSfRecDetail(null);
	        	  }
	          }
	          ]
});

isc.HLayout.create({
	ID:"seafarerSearchSectionLayout",
  	layoutMargin:10,
  	height:90,
  	width:950,
  	membersMargin:20,
  	members:[
  	        seafarerRegMainSearchForm, seafarerSearchFormToolBar
  	         ] 
   }); 

isc.ListGrid.create({
	ID:"seafarerRegMainSearchResultListLG", dataSource : "seafarerDS", showFilterEditor:true, filterOnKeypress:true,
	fields: [
	         { name: "id", 			width:120},
	         { name: "serbNo", 		width:100},
	         { name: "partType",		width:100},
	         { name: "surname", 		width:120}, 
	         { name: "firstName",	width:140}, 
	         { name: "chiName",		width:120}, 
	         { name: "sex",			width:100}, 
//	         { name: "province", 	width:150},
	         { name: "telephone", 	width:250},
	         { name: "nationalityId", width:"*", optionDataSource:nationalityDS, valueField:"id", displayField:"engDesc"} 
	         ], 
	         rowDoubleClick:function(record, recordNum, fieldNum){
	        	 openSfRecDetail(record);
	         }

});

isc.HLayout.create({
	ID: "mainLayout", 
	members: [ 
		isc.VLayout.create({ 
		    members: [
		              isc.TitleLabel.create({ID:"sectionTitle", contents: "<p><b><font size=3px>Seafarer Registration Maintenance - Record [Ver 0.1.1]</font></b></p>"}),
		              isc.SectionStack.create({
		          		sections: [
		          			{title: "Search", expanded: true, resizeable: false, items: [ seafarerSearchSectionLayout]},  
		          			{title: "Result", expanded: true, items: [ seafarerRegMainSearchResultListLG, seafarerRegMainSearchResultListLGSummary ]}
		          		]
		              })
		              
		             ]
		})     
	  ]
});
