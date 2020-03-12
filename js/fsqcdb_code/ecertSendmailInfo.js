
	var saveSendmailInfoBtn = isc.IButton.create({
		width:150,
		align:"center",
		//layoutLeftMargin: 150,
		title: "Save",
		onControl:"FSQC_ALL||EXEMPT_EMAIL_TEMPLATE_WRITE",
		click: function(){

			var EditedRecord = sendmailInfoListGrid.getAllEditRows();

			sendmailInfoListGrid.endEditing();
			sendmailInfoListGrid.saveAllEdits();

	        for (i = 0; i < EditedRecord.length; i++) {
	        	ecertSendmailInfoDS.updateData(sendmailInfoListGrid.getRecord( EditedRecord[i] )); //save
	        }

	        EditedRecord = [];
			sendmailInfoListGrid.setData([])
			sendmailInfoListGrid.fetchData();
			isc.say("Save Successfully.");

		}
	});

	var sendmailInfoListGrid = isc.ListGrid.create({
		  height:"*",
	  	  width:"100%",
	  	  overflow:"auto",
	  	  dataSource:ecertSendmailInfoDS,
	  	  autoFetchData:true,
	  	  canEdit:hasAccess("FSQC_ALL||EXEMPT_EMAIL_TEMPLATE_WRITE"),
	  	  //autoFitFieldWidths:true,
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
	  	  groupTitle:"Automatically send e-mail settings",
		  fields:[
			      {name:"id", title:"ID",  width:40, hidden:true, canEdit:false},
			      {name:"send_type", title:"Send Type", width:250, canEdit:false,
			    	  formatCellValue : function(value, record, field, viewer){
		        			switch (value){
		    				case "1":
				    			return "Before the certificate expires";
		                		break;
		    				case "2":
				    			return "After the certificate expires";
		                		break;
		    				case "3":
				    			return "Before the certificate expires(2)";
		                		break;
		    				case "4":
				    			return "Certificate Confirmation";
		                		break;
		        			}
			    	  }
			      },
			      {name:"send_days", title:"Alarm Days", width:100},
			      {name:"mail_cc", title:"Mail Cc", width:100},
			      {name:"Object", title:"Object", width:"*", canEdit:false},
		  ],
	  	  rowClick:function(record, recordNum, fieldNum){
	  		  this.startEditing(recordNum, fieldNum);
	  		  objectForm.setCanEdit(true);
	  		  objectForm.setValues(this.getEditedRecord(recordNum));
	  	  }
	});

	var objectForm = isc.DynamicForm.create({
	  	//isGroup:"true",
	  	//groupTitle:"Automatically send e-mail sttings",
	  	canEdit:hasAccess("FSQC_ALL||EXEMPT_EMAIL_TEMPLATE_WRITE"),
        items:[
               {
                   type: "textArea",
                   name: "Object",
                   title: "Object",
                   width:"800",
                   height:"300",
                   canEdit:true,
                   selectOnFocus:true,
                   wrapTitle:false,
                   showTitle:false,
               }
        ],
       	itemChanged:function(item, newValue){

       		sendmailInfoListGrid.setEditValue ( sendmailInfoListGrid.getRowNum( sendmailInfoListGrid.getSelectedRecord()) , 3, newValue);
       	},
	});

	var saveBtnPane = isc.HLayout.create({
		align:"right",
		height:"1",
		members : [saveSendmailInfoBtn]
	});

	var sendmailInfoListpane = isc.VLayout.create({
		height:"600",
		membersMargin:10,
		members : [saveBtnPane, sendmailInfoListGrid, objectForm]
	});

	var sectionStackUp = isc.SectionStack.create({
		height:700,
		visibilityMode : "multiple",
		sections : [
				{title: "Maintenance", expanded: true, resizeable: true, items:[sendmailInfoListpane]},
			]
	});

	var vlout = isc.VLayout.create({
		members : [sectionStackUp]
	});
