function openCreateSfRecDetail(){
	
	var sfRecSectionTitle = 	
		isc.Label.create({
			width: "75%",
			height: 20,
			align: "left",
			valign: "top",
			wrap: false,
			contents: "<p><b><font size=3px>Create Seafarer Record <br /></font></b></p>"
		});
	
	
	var sfRecFormDetail = 
		isc.DynamicForm.create({
			width: "100%",
			titleSuffix: "",
			dataSource: "seafarerDS",
			requiredTitleSuffix: "", 
			requiredTitlePrefix: "*", 
			numCols: 8,	
			colWidths: ["1", "1", "1", "1", "1", "1", "1", "1"],
			fields: [
			
//			    {name: "id", hidden:false, required:true, endRow:true},
				{name: "partType", type: "radioGroup", colSpan: 2, vertical: false},
				{name: "serbNo", startRow: false, width: 70},
				{name: "serb_photo", title: "photo", type: "button", startRow: false, endRow: false, width: 70},
				{name: "serb_thumbs", title: "thumbs", type: "button", startRow: false, endRow: false, width: 70},
				{name: "surname", 		startRow: true, required: true, colSpan: 2, width: 180},
				{name: "firstName", 	startRow: false, required: true, colSpan: 4, width: 180},
				{name: "chiName", 		startRow: true, colSpan: 2, width: 180},
				{name: "ccc1", title: "CCC Code", type: "text", startRow: false, width: 70},
				{name: "ccc2", showTitle: false, type: "text", startRow: false, width: 70},
				{name: "ccc3", showTitle: false, type: "text", startRow: false, width: 70},
				{name: "ccc4", showTitle: false, type: "text", startRow: false, width: 70},
				{name: "nationalityId", title: "Nationality", type: "select", startRow: true, width: 180, colSpan: 2,
					optionDataSource:nationalityDS, valueField:"id", displayField:"engDesc", allowEmptyValue:true
				},
//				{name: "nationalityEngDesc", title: "Nationality", showTitle: false, type: "text", startRow: false, width: 120},
				{name: "province", type: "select", startRow: false, width: 170, colSpan:4},
				{name: "serialPrefix", title: "Serial No", type: "text", width: 50},
				{name: "serialNo", title: "Serial No", showTitle: false, type: "text", startRow: false},
				{name: "id", title: "HKID", type: "text", required: true, startRow: true, colSpan: 2},
				{name: "sex", title: "Sex", type: "radioGroup", vertical:false, startRow: true, colSpan: 2},
				{name: "birthDate", useTextField:true, inputFormat:"DMY", dateFormatter:"toEuropeanShortDate",startRow: true, colSpan: 2}, 
				{name: "birthPlace", title: "Birth Place", type: "select", valueMap: ["Hong Kong", "China", "Taiwan", "Signapore"], required: true, colSpan: 2},
				{name: "birthCert", startRow: true, colSpan: 2},
				{name: "martialStatus", title: "Martial Status", type: "select", allowEmptyValue:true, colSpan: 2},
				{name: "passportNo", title: "Passport No", type: "text", startRow: true, colSpan: 2},
				{name: "sibNo", colSpan: 2},
				{name: "telephone", startRow: true, colSpan: 2},
				{name: "mobile", title: "Mobile", type: "text", colSpan: 2}, 
				{name: "address1", title: "Address", type: "text", startRow: true, colSpan: 8, width: 400},
				{name: "address2", title: " ", startRow: true, colSpan: 8, width: 400},
				{name: "address3", title: " ", startRow: true, colSpan: 8, width: 400},
				{name: "mailAddress1", title: "Mail Address", type: "text", startRow: true, colSpan: 8, width: 400},
				{name: "mailAddress2", title: " ", type: "text", startRow: true, colSpan: 8, width: 400},
				{name: "mailAddress3", title: " ", type: "text", startRow: true, colSpan: 8, width: 400}
				
			]
		});
		
		
	var saveBtn = 
		isc.IButton.create({
			title: "Save",
			click: function(){
				sfRecFormDetail.saveData(
					function (dsResponse, data, dsRequest) {
						if(dsResponse.status==0){
							isc.say(saveSuccessfulMessage);
							sfWindow.closeClick();
						}
					}
				);
			}, 
			margin: 10, 
			height: 40, 
			autoFit: true
		});
	
	var clearBtn = 
		isc.IButton.create({
			title: "Clear",
			click: function(){
				sfRecFormDetail.resetValues();
			}, 
			margin: 10, 
			height: 40, 
			autoFit: true
		});
	
	var cancelBtn = 
		isc.IButton.create({
			title: "Cancel",
			click: function (){
				sfWindow.closeClick();
			},
			margin: 10, 
			height: 40, 
			autoFit: true
		});
	
	
	var sfRecFormButtonStack = 
		isc.HStack.create({
			//membersMargin: 10, 
			layoutStartMargin: -0,
			layoutLeftMargin: 800,
			members: [ saveBtn, clearBtn, cancelBtn ]    
		});	
		
		
	
	var sfRecSectionContent = 
			isc.SectionStack.create({
				visibilityMode: "multiple",
				width: "100%",
				height: "100%", // percentage have problem??
				animateSections: true,
				membersMargin: 10,
				layoutMargin: 10,
				layoutStartMargin: 10, // layoutRightMargin , layoutLeftMargin ... etc
				overflow : "auto", 
				sections: [
					{ title: "Personal Information", resizeable: false,
					  items: [ sfRecFormDetail ] 
					}
					
				]
	
		});
	
	
	var contentLayout = 
		isc.VLayout.create({ 
		width: "100%", 
		height: "100%", 
		padding: 10, 
	    members: [ sfRecSectionTitle, sfRecSectionContent, sfRecFormButtonStack ]
	
	
	});
	
	var sfWindow = isc.Window.create({
		width: 1000,
		height: 700, 
		title: "Create Seafarer",
		items: [ contentLayout ]
	});

}