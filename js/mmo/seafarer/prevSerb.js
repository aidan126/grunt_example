//  ---------- Previous SERB start -------------
//isc.DynamicForm.create({
//	ID:"sfRecFormPrevSerb",
//	width: "100%",
//	titleSuffix: "",
//	requiredTitleSuffix: "", 
//	requiredTitlePrefix: "*", 
//	numCols: 4,	
//	colWidths: ["1", "1", "1", "1"],
//	fields: [
//	         { name: "serb_no_f1" , title: "SERB No", titleOrientation: "top", 
//	        	 type: "text", required: true 
//	         }, 
//	         { name: "reg_date_f1", title: "Reg Date", titleOrientation: "top", 
//	        	 type: "date", useTextField:true, inputFormat:"DMY", dateFormatter:"toEuropeanShortDate", required: true
//	         }, 
//	         { name: "remark_f2", title: "Remarks", titleOrientation: "top", 
//	        	 type: "text", required: true 
//	         }, 
//	         { name: "serb_no_f2" , title: "SERB No", showTitle: false, titleOrientation: "top", 
//	        	 type: "text", required: true , startRow: true
//	         }, 
//	         { name: "reg_date_f2", title: "Reg Date", showTitle: false, titleOrientation: "top", 
//	        	 type: "date", useTextField:true, inputFormat:"DMY", dateFormatter:"toEuropeanShortDate", required: true
//	         }, 
//	         { name: "remark_f2", title: "Remarks", showTitle: false, titleOrientation: "top", 
//	        	 type: "text", required: true 
//	         }, 
//	         { name: "serb_no_f3" , title: "SERB No", showTitle: false, titleOrientation: "top", 
//	        	 type: "text", required: true , startRow: true
//	         }, 
//	         { name: "reg_date_f3", title: "Reg Date", showTitle: false, titleOrientation: "top", 
//	        	 type: "date", useTextField:true, inputFormat:"DMY", dateFormatter:"toEuropeanShortDate", required: true
//	         }, 
//	         { name: "remark_f3", title: "Remarks", showTitle: false, titleOrientation: "top", 
//	        	 type: "text", required: true 
//	         }
//	         
//	         ]
//
//});	
isc.Label.create({
	ID:"reIssueSerbSectionTitle", 	width: "75%", height: 20, align: "left", align: "top", wrap: false, ontents: "<p><b><font size=2px>Re Issue SERB <br /></font></b></p>"
});

isc.DynamicForm.create({
	ID:"reIssueSerbFormDetail", width: "100%", dataSource: "previousSerbDS", saveOperationType:"add", numCols: 2,	
	fields: [
	         { name: "seafarerId", hidden:true}, 
	         { name: "serbNo", 		title: "SERB No."},
	         { name: "serbDate", 	title: "SERB Date", hidden:true}
	         ]
});

isc.ButtonToolbar.create({
	ID:"reIssueSerbForm_ToolBar",
	buttons: [
	          {name:"refreshBtn", title:"Re-Issue", autoFit: true,
	        	  click : function () { 
	        		  if (reIssueSerbFormDetail.validate()) {
							reIssueSerbFormDetail.saveData(function(dsResponse, data, dsRequest) {
								if (dsResponse.status == 0) {
									isc.say(saveSuccessfulMessage);
									reIssueSerbFormDetail.setValues(data);
									
									sfRecFormDetail.setValue('serbNo', data.serbNo);
									
									sfPreviousSerbListGrid.refresh();
								}
							});
						}
	        	  }
	          },
	          {name:"createPreviousSerbBtn", title:"Cancel", autoFit: true,  
	        	  click : function () { 
	        		  reIssueSerbFormDetail.setValues({});
	        		  reIssueSerbWindow.hide();
	        		  
	        	  }
	          }
	          
	          ]
});


// reIssue SERB window
isc.Window.create({
	ID:"reIssueSerbWindow", width: 600, height: 250, isModal: true, showModalMask: true, title: "Re-Issue SERB",
	items: [ 
	     	isc.VLayout.create({ 
				width: "100%",	height: "100%", padding: 10, 
				members: [ reIssueSerbSectionTitle, reIssueSerbFormDetail, reIssueSerbForm_ToolBar ]
			})
	        
	  ]
});



isc.ListGrid.create({
	ID:"sfPreviousSerbListGrid", height: "*", dataSource: "previousSerbDS",
	fields: [
          { name: "seqNo", width: 120 }, 
		  { name: "seafarerId", width: 120 },
		  { name: "serbNo", width: 120 },
		  { name: "serbDate", width: "*" }
	 ],
	refresh: function (){
		this.setData([]);
	    this.fetchData({"seafarerId":sfRecFormDetail.getValue('id')});
	     }
	         
});

isc.ButtonToolbar.create({
	ID:"sfPreviousSerbListGrid_ToolBar",
	buttons: [
	          {name:"refreshBtn", title:"Refresh", autoFit: true,
	        	  click : function () { 
	        		  sfPreviousSerbListGrid.refresh();
	        	  }
	          },
	          {name:"createBtn", title:"Re-Issue", autoFit: true, onControl:'RE_ISSUE_SERB', 
	        	  click : function () { 
	        		  reIssueSerbWindow.show();
	        		  reIssueSerbFormDetail.setValues({});
	        		  reIssueSerbFormDetail.setValue("seafarerId", sfRecFormDetail.getValue('id'));
	        	  }
	          },
	          
	          ]
});
isc.SectionVLayout.create({ID:"seafarerPrevSerbLayout", height:180, members: [sfPreviousSerbListGrid, sfPreviousSerbListGrid_ToolBar ]});
// ---------- Previous SERB end -------------