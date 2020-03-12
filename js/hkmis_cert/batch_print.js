/***************************************************************************************************************
* Qualified Name	 	/webui/src/main/webapp/js/hkmis_cert/batch_print.js
* @author 				Neo Pak
* @since				2019-07-29
* ************************************************************************************************************** 
* Change log:
* log no	Change complete date	Developer			Change Reason
* ======	====================	=========			=============
* 00000		2019-07-29				Neo Pak				Initial Implementation
* 
****************************************************************************************************************/

batch_print(certJobBccclcDS, ["id"], ['paged']);

function batch_print(dataSource, idFields, dataFetchModeValue)
{
	if(dataFetchModeValue==undefined){
		dataFetchModeValue = 'basic';
	}

	var resultCountMsg = isc.TitleLabel.create({
		contents: "<p> Count: <b> 0 </b> </p>"
	});

	isc.SearchForm.create({
		ID:"batchPrintQueryForm",
		width: 240,
		dataSource : dataSource, 
		numCols: 4,
		saveOnEnter: true,
		submit:function(){
			batchPrintSearchFormToolBar.getButton('searchBtn').click();
		},
		fields: 
		[
			{name: "jobno", title: "Job No.", width:120},
			{name: "spname", title: "Name of Ship", width:120},
			{name: "imono", title: "IMO NO.", width:120},
			{name: "offno", title: "Off. No.", width:120},
			
			{name: "status", title: "status", width:0, hidden:true},
			{name: "refno", title: "Ref. No.", width:0, hidden:true},
			{name: "expiry_date", 	title:"Exprity Date", width:0, hidden:true},
			{name: "issue_on", 	title:"Issue Date", width:0, hidden:true},
			{name: "bccclc_complete_date", 	title:"Complete Date", width:0, hidden:true},
			{name: "completeDate", 	title:"Complete Date", width:0, hidden:true},
			{name: "insurer_name1", title: "", width:0, hidden:true},
			{name: "submit_person", title: "Done By", width:0, hidden:true},
			{name: "authorized_official", title: "Print width signature", width:0, hidden:true},
			{name: "start_date", 	title:"start_date",  width:0, hidden:true},
			{name: "valid_date", 	title:"valid_date",  width:0, hidden:true},
			{name: "doc_received_date", 	title:"doc_received_date",  width:0, hidden:true},
			{name: "application_date", 	title:"application_date",  width:0, hidden:true},
		], 
	});

	isc.DynamicForm.create({
	    ID: "batchPrintForm",
	    autoDraw: false,
	    width:90,
	    height: 95,
	    numCols: 4,
	    // colWidths: [50,"*",20,"*"],
	    items: [
	        {   name: "certType", 	title:"Form", type: "select",
	            width:90,
	            startRow: true, colSpan: 3,
	            valueMap: 
		        {	
		            "BCC": "BCC",
	            	"CLC": "CLC",
	            	"": ""
		        }
	        }
	    ]
	});

	isc.ButtonToolbar.create({
		ID: "batchPrintSearchFormToolBar",
		width: "90",
		buttons: 
		[
			{ name:"searchBtn", title:"Query", autoFit: true, disabled: false, 
			  	click : function () 
			  	{
			  		var certType =  batchPrintForm.getValue("certType");

			  		if(certType == 'BCC' || certType == 'CLC')
					{
						batchPrintQueryForm.setValue("cert_type", certType);
					}

					batchPrintQueryForm.setValue("status", 'Process');
					batchPrintQueryForm.setValue("editStatus", 3);
					batchPrintFormLG.setData([]);
					var criteria = batchPrintQueryForm.getValuesAsCriteria(false);
					batchPrintFormLG.fetchData(criteria, function(dsResponse, data, dsRequest){
					  var c = "<p> Count: <b>"+ dsResponse.totalRows +" </b> </p>";
					  resultCountMsg.setContents(c);
					});
					// resultCountMsg.setContents("<p>  Count: <b> "+ batchPrintQueryForm.getTotalRows() +" </b> </p>");
			  	}
			}
		],
	});

	isc.DynamicForm.create({
		ID:"batchPrintCheckbox",
	    //autoDraw: false,
	    numCols:2,
	    width:80,
	    items: [
	        // {type:"RowSpacerItem"},{type:"RowSpacerItem"},
	        {
	            name: "processStatusCheckbox",
	            editorType: "CheckboxItem",
	            title: "Original",
	            width: 50,
	            startRow: true,
	            defaultValue: "1",
	            valueMap: {
	                "1": true,
	                "0": false
	            }
	        },
	        {
	            name: "completeStatusCheckbox",
	            editorType: "CheckboxItem",
	            title: "Copy",
	            width: 50,
	            startRow: true,
	            defaultValue: "1",
	            valueMap: {
	                "1": true,
	                "0": false
	            }
	        }
	    ]
	});

	isc.ButtonToolbar.create({
		ID:"batchPrinter",
		width: "200",
		buttons: 
		[
			{name:"printAll", title:"Print", autoFit: true,
				click : function ()
				{
					batch_print_all();
				}
			},
			{name:"closeWork", title:"Close Work", autoFit: true,
				click : function ()
				{
					batch_print_close_work();
				}
			},
		],
	});

	isc.ListGrid.create({
		ID:"batchPrintFormLG", 
		dataSource : dataSource,
		showFilterEditor:true, filterOnKeypress:true,
	    height:"*",
	    autoDraw:false,
	    selectionAppearance:"checkbox",
		selectionType: "simple",
		fields: 
		[
			{name: "jobno", title: "jobno", width:120},
			{name: "cert_type", title: "cert_type", width:120},

			{name: "status", title: "status", width:120, hidden: false},
			{name: "editStatus", title: "Edit Status", width:120, hidden: false},

			{name: "refno", title: "Ref. No.", width:120},
			{name: "spname", title: "Reg Name", width:200},
			{name: "imono", title: "IMO NO.", width:100},
			{name: "offno", title: "Off. NO.", width:100},
			{name: "expiry_date", 	title:"Exprity Date", width:100},
			{name: "issue_on", 	title:"Issue Date", width:100},
			{name: "bccclc_complete_date", 	title:"Complete Date", width:100},
			{name: "completeDate", 	title:"Complete Date", width:100, hidden: false},
			{name: "insurer_name1", title: "Insurer Company Name", width:200},
			{name: "submit_person", title: "Done By", width:120},
			{name: "authorized_official", title: "Print width signature", width:120},
		],
		selectionUpdated: "batchPrintSelectedForm.setData(this.getSelection())"
	    , rowDoubleClick:function(record, recordNum, fieldNum){
	        if (record['form'] == 'BCC' || record['form'] == 'CLC'){
	            addBccclcCert(record, ['0']);
	        }
	        if (record['form'] == 'MSMC'){
	            openMsmcCertRecDetail(record);
	        }
	        // ======= change log 00001 by dicky 20190725==================
	        if (record['form'] == 'MLC'){
	            openDmlcCertRecDetail(record);
	        }
	        // ======end of change =============
	    }
		, initialSort: [
			{property: "jobno", direction: "ascending"}
		]
	})

	isc.ListGrid.create({
	    ID: "batchPrintSelectedForm",
	    width:"100%", height:"0%", top:250, 
	    alternateRecordStyles:true, 
	    showAllRecords:true,
		autoFetchData: true,
		autoSaveEdits: false,
		autoFitFieldWidths:true,
		canEdit: true,
		editOnFocus: true,
		canSelectCells: true,

	    emptyMessage: "<b>nothing selected</b>",
	    fields: 
	    [
	        {name: "cert_type", title: "cert_type", width:120},
			{name: "jobno", title: "jobno", width:120},

			{name: "status", title: "status", width:120, hidden: false},

			{name: "refno", title: "Ref. No.", width:120},
			{name: "spname", title: "Reg Name", width:200},
			{name: "imono", title: "IMO NO.", width:100},
			{name: "expiry_date", 	title:"Exprity Date", width:100},
			{name: "issue_on", 	title:"Issue Date", width:100},
			{name: "bccclc_complete_date", 	title:"Complete Date", width:100},
			{name: "completeDate", 	title:"Complete Date", width:100},
			{name: "insurer_name1", title: "Insurer Company Name", width:200},
			{name: "submit_person", title: "Done By", width:120},
			{name: "authorized_official", title: "Print width signature", width:120},
	    ]
	});

	isc.HLayout.create({
		ID: "exportBccStatButton",
	  	// layoutTopMargin: 0,
		// layoutLeftMargin: -20,
		height:"5%",
		members: 
		[
			resultCountMsg,
			isc.IExportButton.create({
				title: "Export",
				width: 90,
				height: 30,
				listGrid: batchPrintFormLG
			})
		]
	});

	isc.HLayout.create({
		ID: "batchPrintSearchInput",
	  	layoutMargin:10,  isGroup: true, groupTitle: "",
	  	height:80,
	  	width: 550,
	  	membersMargin:20,
	  	members:
	  	[
  	        batchPrintQueryForm, 
  	        batchPrintForm,
  	        batchPrintSearchFormToolBar
	  	]
	});

	isc.HLayout.create({
		ID: "batchPrintSearchRight",
	  	layoutMargin:10,  isGroup: true, groupTitle: "",
	  	height:80,
	  	width: 300,
	  	membersMargin:20,
	  	members:
	  	[
  	        batchPrintCheckbox, 
  	        batchPrinter
	  	]
	});

	isc.HLayout.create({
		ID: "batchPrintSearchForm",
	  	layoutMargin:10,
	  	height:140,
	  	membersMargin:20,
	  	width:"100%",
	  	overflow:"auto",
	  	members:
	  	[
	  		batchPrintSearchInput,
  	        batchPrintSearchRight
	  	]
	});
	
	isc.HLayout.create
	({
		ID: "batchPrintMainLayout",
		width:"100%",
		members: 
		[
			isc.VLayout.create
			({
			    members: 
			    [
					isc.SectionStack.create({
					height: "100%",
						sections: 
						[
							{title: "Search", expanded: true, resizeable: false, items: 
								[ 
									batchPrintSearchForm
								]
							},
							{title: "Result", expanded: true, items: 
								[ 
									batchPrintFormLG,
									// resultCountMsg,
									exportBccStatButton,
									batchPrintSelectedForm,
								]
							}
						]
					})
				]
			})
		]
	});

	return isc.VLayout.create({
		members : [batchPrintMainLayout]
	});
}

function batch_print_all()
{
	var batchPrintJson = batchPrintFormLG.getSelectedRecords();

	if(Array.isArray(batchPrintJson) && batchPrintJson.length === 0)
	{
	    alert('You must choose at least one option !');
	} else
	{

		var unchecked_arr = [];
		
		function checkChecked(item, index, arr) 
		{
		  if(item.editStatus != 3)
		  {
			  unchecked_arr.push( item.jobno );
		  }

		}
		batchPrintJson.forEach(checkChecked);

		if(unchecked_arr.length > 0)
		{
			alert("These jobs are not checked, please ensure they are submitted and checked before trying again: " + unchecked_arr.join(", "));
			return;
		}
		//alert(unchecked_arr.join(", "));
		if (confirm("Do you want to print these certificates ?"))
		{
			var bcc_jobnos = "bcc";
			var clc_jobnos = "clc";
			var jobnos = "";

			batchPrintJson.forEach(getJsonItem);

			function getJsonItem(item, index, arr) 
			{
			  if(item.form == 'BCC')
			  {
			  	cert = "RPT_BCC_Cert";
			  	bcc_jobnos = bcc_jobnos + "," + item.jobno;
			  	jobnos += item.jobno + ",";
			  }

			  if(item.form == 'CLC')
			  {
			  	//cert = "RPT_CLC_Cert";
				cert = "RPT_BCC_Cert";
			  	clc_jobnos = clc_jobnos + "," + item.jobno;
			  	jobnos += item.jobno + ",";
			  }

			}
			  var original = batchPrintCheckbox.getValue("processStatusCheckbox");
			  var copy = batchPrintCheckbox.getValue("completeStatusCheckbox");
	
//			  console.log('cert: '+ cert + ' | item.jobno: ' + bcc_jobnos + ' | original: '+ original + ' | copy: '+ copy);
	
			  /*
			  if(bcc_jobnos != "bcc")
			  {
				  console.log('cert: '+ "RPT_BCC_Cert" + ' | item.jobno: ' + bcc_jobnos + ' | original: '+ original + ' | copy: '+ copy);
				  printCertReport("RPT_BCC_Cert", bcc_jobnos, null, "0", original, copy);	
			  }

			  
			  if(clc_jobnos != "clc")
			  {
				  console.log('cert: '+ "RPT_CLC_Cert" + ' | item.jobno: ' + clc_jobnos + ' | original: '+ original + ' | copy: '+ copy);
				  printCertReport("RPT_CLC_Cert", clc_jobnos, null, "0", original, copy);
			  }
			  */
			  if (jobnos.length > 0 && jobnos.slice(-1) == ",")
				  jobnos = jobnos.substr(0, jobnos.length - 1);
			  
			  if (jobnos != "") {
				  console.log('cert: '+ cert + ' | item.jobno: ' + jobnos + ' | original: '+ original + ' | copy: '+ copy);
				  printCertReport("RPT_BCC_Cert", jobnos, null, "0", original, copy);
			  }
			  
			  if (original == "1") {
				  batch_print_close_work_auto();
				  
			  }
			  

//			function getJsonItem(item, index, arr) 
//			{
//			  if(item.form == 'BCC')
//			  {
//			  	cert = "RPT_BCC_Cert";
//			  }
//
//			  if(item.form == 'CLC')
//			  {
//			  	cert = "RPT_CLC_Cert";
//			  }
//
//			  var original = batchPrintCheckbox.getValue("processStatusCheckbox");
//			  var copy = batchPrintCheckbox.getValue("completeStatusCheckbox");
//
//			  console.log('cert: '+ cert + ' | item.jobno: ' + item.jobno + ' | original: '+ original + ' | copy: '+ copy);
//
//			  printCertReport(cert, item.jobno, null, "0", original, copy);	
//			}

		}
	}
}

function batch_print_close_work()
{
	var jsonRecord = batchPrintFormLG.getSelectedRecords();

	if(Array.isArray(jsonRecord) && jsonRecord.length === 0)
	{
	    alert('You must choose at least one option !');
	} else
	{
		if (confirm("Do you want to close these certificates ?"))
		{ 
			batch_print_close_work_process();
		}
	}
}

function batch_print_close_work_auto()
{
	var jsonRecord = batchPrintFormLG.getSelectedRecords();

	if(Array.isArray(jsonRecord) && jsonRecord.length === 0)
	{
	    alert('You must choose at least one option !');
	} else
	{
		batch_print_close_work_process();
	}
}


function batch_print_close_work_process() {
	for (i = 0; i < batchPrintSelectedForm.getTotalRows(); i++) {
		batchPrintSelectedForm.setEditValue(i, batchPrintSelectedForm.getFieldNum('status'),'Complete');
		batchPrintSelectedForm.setEditValue(i, batchPrintSelectedForm.getFieldNum('bccclc_complete_date'), new Date());
		batchPrintSelectedForm.setEditValue(i, batchPrintSelectedForm.getFieldNum('completeDate'), new Date());
    }

	var listNumber = batchPrintSelectedForm.getAllEditRows();

	batchPrintSelectedForm.endEditing();
	batchPrintSelectedForm.saveAllEdits();

	for (i = 0; i < listNumber.length; i++) {
		certJobBccclcDS.updateData(batchPrintSelectedForm.getRecord( listNumber[i] )); //save
	}
	alert("The selected certificate jobs are closed.");
}



