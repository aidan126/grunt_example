
isc.IButton.create({
	ID:"CompMgmtCodeSave",
	width:150,
	align:"center",
	layoutLeftMargin: 150,
	title: "Save",
	click: function(){

        var EditedRecord = CompMgmtListGrid.getAllEditRows();

		CompMgmtListGrid.endEditing();
		CompMgmtListGrid.saveAllEdits(); //save

		CSOListGrid.endEditing();
		CSOListGrid.saveAllEdits(); //save

		DPAListGrid.endEditing();
		DPAListGrid.saveAllEdits(); //save

        for (i = 0; i < EditedRecord.length; i++) {
        	companyManagementDS.updateData(CompMgmtListGrid.getRecord( EditedRecord[i] )); //save
        }
		companyManagementDS.updateData(CompMgmtListGrid.getSelectedRecord());

		//CompMgmtListForm.editRecord(CompMgmtListGrid.getSelectedRecord());
		//CompMgmtListForm.setValue("cso", CSOListGrid.data);
		//CompMgmtListForm.setValue("dpa", DPAListGrid.data);
		//CompMgmtListForm.setValue("doc", DocCertGrid.data);
		//CompMgmtListForm.setValue("docAudit", DocAuditGrid.data);
		//CompMgmtListForm.saveData(); //save

		//CSOListGrid.setData([]);
		//DPAListGrid.setData([]);
	}
});

isc.HLayout.create({
	ID:"CompMgmtTopBtnBar", layoutTopMargin:10, layoutBottomMargin:10,
	height:10,
	showEdges: false,
	membersMargin:5, members:[CompMgmtCodeSave]
});

//------------------------------------------------------------------------------------------------------------------------------------------------

isc.ListGrid.create({
  ID: "TestListGrid",
  //width:500,
  height:500,
  //alternateRecordStyles:true,
  overflow:"auto",
  dataSource: codeCertCodeDS,
  autoFetchData: true,
  autoSaveEdits: false,
  autoFitFieldWidths:true,
  canEdit: true,
  editOnFocus: true,
  canSelectCells: true,
  dataPageSize: 20,
  canRemoveRecords:true,
  saveLocally: true,
  saveByCell: false,
  //editEvent: "doubleClick",
  editEvent: "click",
  showFilterEditor:true,
  fields:[
      {name:"Cert_cd", title:"Cert Code",  width:40 , canEdit:false},
      {name:"Cert_des", title:"Cert Description"},
      {name:"doctype", title:"Documentation Type"},
      {name:"neworold", title:"Applied to"},
      {name:"limit_date", title:"Limit Date"},
      {name:"css_cert", title:"Css's Cert"},
      {name:"pax_cert", title:"PAX's Cert"},
      {name:"Del_mark", title:"Deleted"},
  ],
  sortField: 0,
  sortDirection: "ascending"

      ,rowClick:function(record, recordNum, fieldNum){

          var cell = CompMgmtListGrid.getCellSelection();
          CompMgmtListGrid.startEditing(cell.startRow, cell.startCol);
          CSOListGrid.setData([]);
          CSOListGrid.setData(CompMgmtListGrid.getSelectedRecord().cso);
          DPAListGrid.setData([]);
          DPAListGrid.setData(CompMgmtListGrid.getSelectedRecord().dpa);
      }
});

isc.IButton.create({
  ID: "addCompMgmtbtn",
  autoDraw: false,
  width:90,
  layoutAlign:"center",
  title: "Doc Type Other Only",
  click : function () {

	  TestListGrid.fetchData(null,function(dsResponse, data, dsRequest){},
			  {operationId:"testDS_fetch", data:{doctype:"Other"}});

	  //TestListGrid.fetchData({id:new Date().getTime()});// force to read from server
		  // }, {operationId:"demandNoteItemDS_removeSrItem", data:{id:searchSection.getSelection()[0].itemId, reason:reason} });

  }
});

/*
isc.Label.create({
  ID: "display",
  contents: "---",
});
*/

isc.VLayout.create({
	ID:"CompMgmtListBtnBar",
  width: 100,
  //layoutTopMargin:10,
  defaultLayoutAlign: "center",
  showEdges: false,
  membersMargin:5, members:[addCompMgmtbtn]
});

isc.VLayout.create({
	ID:"CompMgmtEditPane",
  //layoutTopMargin:10,
  defaultLayoutAlign: "center",
  showEdges: false,
  membersMargin:5, members:[TestListGrid]
});

isc.HLayout.create({
	ID:"CompMgmtList", layoutTopMargin:10,
  isGroup: true, groupTitle: "Particulars of Management Company",
  showEdges: false,
  membersMargin:5, members:[CompMgmtEditPane, CompMgmtListBtnBar]
});
