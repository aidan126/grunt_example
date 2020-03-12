	var sendmailInfoListGrid = isc.ListGrid.create({
		  height:"*",
	  	  width:"100%",
	  	  overflow:"auto",
	  	  dataSource:ecertSendmailResultDS,
	  	  autoFetchData:true,
	  	  dataFetchMode: "paged",
	  	  canEdit:false,
	  	  autoFitFieldWidths:true,
	  	  //editOnFocus: true,
	  	  //canSelectCells: true,
	  	  //dataPageSize: 20,
	  	  //canRemoveRecords: false,
	  	  autoSaveEdits: false,
	  	  saveLocally: true,
	  	  saveByCell: false,
	  	  editEvent: "click",
	  	  //selectionAppearance:"checkbox",
	  	  //selectionType: "simple",
	  	  showFilterEditor:true,
	  	  layoutTopMargin:10,
	  	  isGroup:"true",
	  	  groupTitle:"Mail History",
	  	  initialSort: [{property: "send_date", direction: "descending"}],
	  	  sortDirection: "descending",
		  fields:[
					{ name: "id", width:"50"},
					{ name: "send_date"},
					{ name: "send_type", width:"150"},
					{ name: "spname"},
					{ name: "imono"},
					{ name: "Com_name"},
					{ name: "cert_no"},
					{ name: "mail_to"},
					{ name: "mail_cc"},
					{ name: "mail_bcc"},
					{ name: "subject"},
					{ name: "Object"},
					{ name: "valid_date"},
					{ name: "send_stat"},
		  ],
	  	  rowClick:function(record, recordNum, fieldNum){

	  	  }
	});

	var sendmailResultExportBtn = isc.IExportButton.create({
		title: "Export",
		width: 120,
		listGrid: sendmailInfoListGrid
	})
	var sendmailResultExportpane = isc.HLayout.create({
		height:20,
		align:"right",
		membersMargin:10,
		members : [sendmailResultExportBtn]
	});
	var sendmailResultListpane = isc.VLayout.create({
		height:"*",
		membersMargin:10,
		members : [sendmailInfoListGrid, sendmailResultExportpane]
	});

	var sectionStackUp = isc.SectionStack.create({
		height:"*",
		visibilityMode : "multiple",
		sections : [
				{title: "Maintenance", expanded: true, resizeable: true, items:[sendmailResultListpane]},
			]
	});

	var vlout = isc.VLayout.create({
		members : [sectionStackUp]
	});
