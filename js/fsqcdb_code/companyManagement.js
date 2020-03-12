/**
* Qualified Name		/webui/src/main/webapp/js/fsqcdb_code/companyManagement.js
* @author 				Albert Chan
* @since				2019-05-30
* **************************************************************************************************************
* Change log:
* log no	Change complete date	Developer			Change Reason
* ======	====================	=========			=============
* 00000		2019-05-30				Albert Chan			Initial Implementation
* 00001		2019-09-03				Dicky Lee			add access control
*
*/
//companyManagementCode

var EditedCSODPARecord = [];

isc.IButton.create({
	ID:"CompMgmtCodeSave",
	width:150,
	align:"center",
	layoutLeftMargin: 150,
	title: "Save",
	onControl:"FSQC_ALL||MANCOMP_WRITE",
	click: function(){

        var EditedRecord = CompMgmtListGrid.getAllEditRows();

		CompMgmtListGrid.endEditing();
		CompMgmtListGrid.saveAllEdits();

        for (i = 0; i < EditedRecord.length; i++) {
        	companyManagementDS.updateData(CompMgmtListGrid.getRecord( EditedRecord[i] )); //save
        }

		CSOListGrid.endEditing();
		CSOListGrid.saveAllEdits();

		DPAListGrid.endEditing();
		DPAListGrid.saveAllEdits();

        for (i = 0; i < EditedCSODPARecord.length; i++) {
        	companyManagementDS.updateData(CompMgmtListGrid.getRecord( EditedCSODPARecord[i] )); //save
        }

        CSOListGrid.setData([]);
        DPAListGrid.setData([]);
        
        EditedRecord = [];
        EditedCSODPARecord = [];

        isc.say("Save Successfully.");

        //companyManagementDS.updateData(CompMgmtListGrid.getSelectedRecord());

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
  ID: "CompMgmtListGrid",
  //width:500,
//  height:400,
  //alternateRecordStyles:true,
  overflow:"auto",
  dataSource: companyManagementDS,
  autoFetchData: true,
  autoSaveEdits: false,
  autoFitFieldWidths:true,
  canEdit: true,
  editOnFocus: true,
  canSelectCells: true,
  dataPageSize: 20,
  canRemoveRecords:false,
  saveLocally: true,
  saveByCell: false,
  //editEvent: "doubleClick",
  editEvent: "click",
  showFilterEditor:true,
  showAllRecords:true,
  fields:[
      {name:"Com_cd", title:"ID",  width:40 , canEdit:false},
      {name:"Com_fileno", title:"File no"},
      {name:"imo_comno", title:"Company IMOID"},
      {name:"grading", title:"ISM Grading"},
      {name:"company_grading", title:"Company Grading"},
      {name:"Com_name", title:"Company Name"},
      {name:"Address_e", title:"Correspondence Address"},
      {name:"doc_address", title:"DOC Address"},
      {name:"city", title:"City"},
      {name:"country", title:"Country"},
      {name:"Fax", title:"Fax"},
      {name:"Phone", title:"Phone"},
      {name:"Email", title:"Email"},
      {name:"Person", title:"Designated Person"},
      {name:"Address_C", title:"Chinese Address"},
  ],
  sortField: 0,
  sortDirection: "ascending",

  rowClick:function(record, recordNum, fieldNum){

          var cell = CompMgmtListGrid.getCellSelection();
          CompMgmtListGrid.startEditing(cell.startRow, cell.startCol);
          CSOListGrid.setData([]);
          CSOListGrid.setData(CompMgmtListGrid.getSelectedRecord().cso);
          DPAListGrid.setData([]);
          DPAListGrid.setData(CompMgmtListGrid.getSelectedRecord().dpa);
          
  },

});

/*
isc.DynamicForm.create({
  ID: "CompMgmtListForm",
  dataSource: companyManagementDS,
  autoDraw: false,
});
*/

isc.IButton.create({
  ID: "addCompMgmtbtn",
  autoDraw: false,
  width:90,
  layoutAlign:"center",
  title: "Add",onControl:"MANCOMP_WRITE||FSQC_ALL",
  click : function () {
	  addCompMgmtForm.clearValues();
	  addCompMgmtListwindow.show();
  }
});

isc.IButton.create({
	  ID: "closeDocCertBtn",
	  autoDraw: false,
	  width:90,
	  layoutAlign:"center",
	  title: "Close",
	  click:function (){
		  DocCertListwindow.hide();
	  }
});

isc.DynamicForm.create({
	  ID: "addCompMgmtForm",
    dataSource: companyManagementDS,
	  autoDraw: false,
    height: 48,
    //padding:4,
    autoFetchData: false,
    autoSaveEdits: false,
    saveLocally: true,
    //layoutTopMargin:10,
    isGroup: true,
    groupTitle: "Add Management Company",
    border:"1px solid grey", padding:10, spacing:10,
    fields: [
        //{name:"Com_cd", title:"ID", hidden:false, required:true},
        {name:"Com_fileno", title:"File no"},
        {name:"imo_comno", title:"Company IMOID"},
        {name:"grading", title:"ISM Grading"},
        {name:"company_grading", title:"Company Grading"},
        {name:"Com_name", title:"Company Name", width:400},
        {name:"Address_e", title:"Correspondence Address", width:400},
        {name:"doc_address", title:"DOC Address", width:400},
        {name:"city", title:"City"},
        {name:"country", title:"Country"},
        {name:"Fax", title:"Fax"},
        {name:"Phone", title:"Phone"},
        {name:"Email", title:"Email", width:300},
        {name:"Person", title:"Designated Person", width:300},
        {name:"Address_C", title:"Chinese Address", width:400},
        {name:"cso", title:"Cso", hidden:true, defaultValue:[]},
        {name:"dpa", title:"Dpa", hidden:true, defaultValue:[]}
    ]
}),
isc.ButtonToolbar.create({
    ID:"addCompMgmtbtnbar",
	  layoutAlign:"center",
    buttons: [
  	  //--modified 00001
        {name:"CompMgmtformSave", title:"Save", width:90, height:28, onControl:"FSQC_ALL||MANCOMP_WRITE",
      	  // ---end 00001
            click:function(){
          	  //if(addCompMgmtForm.getValues().Com_cd){
          		  	addCompMgmtForm.saveData();
          		  	addCompMgmtListwindow.hide();
          		  	
          		  	CompMgmtListGrid.refreshData();
          		  	
				   	//var selectCompanyrecord = {};
				   	//selectCompanyrecord['Com_cd'] = addCompMgmtForm.getValues('Com_cd');
				    
					//ecertExemptionsCodeListGrid.selectRecord(selectCompanyrecord);
					//ecertExemptionsCodeListGrid.focusInCell(ecertExemptionsCodeListGrid.getRowNum(selectCompanyrecord), 1);

              	  
          	  //}else{
              	  //isc.say("ID is missing", function (value){ });
          	  //}
            }
        },
        {name:"CompMgmtformClose", title:"Close", width:90, height:28, hidden:false,
            click:function(){
          	  addCompMgmtListwindow.hide();
            }
        }
    ]
});
isc.HLayout.create({
	ID:"CompMgmtbtnbarPane",
	width: "590",
	//layoutTopMargin:10,
	showEdges: false,
	align:"right",
	membersMargin:0,
	members:[addCompMgmtbtnbar]
});

isc.Window.create({
  ID: "addCompMgmtListwindow",
  title: "Add Management Company",
  height:497,
  autoSize:true,
  autoCenter: true,
  isModal: true,
  showModalMask: true,
  autoDraw: false,
  items: [
      isc.VLayout.create({
    	  ID:"CompMgmtformBar",
    	  //width: 100,
    	  //layoutTopMargin:10,
    	  defaultLayoutAlign: "center",
    	  showEdges: false,
    	  membersMargin:0, 
    	  members:[CompMgmtbtnbarPane, addCompMgmtForm]
      })

   ]
});

isc.IButton.create({
  ID: "delCompMgmtbtn",
  autoDraw: false,onControl:"FSQC_ALL||MANCOMP_WRITE",
  width:90,
  layoutAlign:"center",
  title: "Delete",
  click : function () {

	  if(CompMgmtListGrid.anySelected()){
		  isc.ask(promptDeleteMessage_2, function (value){
			  if (value){
				  companyManagementDS.removeData(CompMgmtListGrid.getSelectedRecord(),
						function(dsResponse, data, dsRequest) {
	        				if (dsResponse.status == 0) {
	        					isc.say("Successfully Deleted");
	        				}
		  		  		}
				  );
			  }
		  });
		  //del_CompMgmtListForm.clearValues();
	  	  //del_CompMgmtListForm.editRecord(CompMgmtListGrid.getSelectedRecord());
	  	  //del_CompMgmtListwindow.show();

	  }else{
    	  isc.say("No Record is Selected.");
	  }

  }
});

/*
isc.Window.create({
  ID: "del_CompMgmtListwindow",
  title: "Delete Management Company",
  autoSize:true,
  autoCenter: true,
  isModal: true,
  showModalMask: true,
  autoDraw: false,
  items: [
      isc.DynamicForm.create({
      	ID: "del_CompMgmtListForm",
          dataSource: companyManagementDS,
      	  autoDraw: true,
          height: 48,
          padding:4,
          autoFetchData: false,
          autoSaveEdits: false,
          saveLocally: true,
          showGridSummary:true,
          fields: [
              {name:"Com_cd", title:"ID",  width:50},
              {name:"Com_fileno", title:"File no", width:50},
              {name:"imo_comno", title:"Company IMOID", width:100},
              {name:"grading", title:"ISM Grading"},
              {name:"company_grading", title:"Company Grading"},
              {name:"Com_name", title:"Company Name"},
              {name:"Address_e", title:"Correspondence Address", width:300},
              {name:"doc_address", title:"DOC Address", width:300},
              {name:"city", title:"City"},
              {name:"country", title:"Country"},
              {name:"Fax", title:"Fax"},
              {name:"Phone", title:"Phone"},
              {name:"Email", title:"Email"},
              {name:"Person", title:"Designated Person", width:100},
              {name:"Address_C", title:"Chinese Address"},
              {type: "button", title: "Delete",
                  click:function(form, item, value){
                  	if (CompMgmtListGrid.getSelectedRecord()){

                  		//insurerListGrid.removeSelectedData();
                  		//insurerListGrid.removeData(insurerListGrid.getSelectedRecord());
                  		//insurerListGrid.saveAllEdits();

                  		//del_insurerForm.saveAllEdits();
                  		//del_insurerForm.editRecord(insurerListGrid.removeData(insurerListGrid.getSelectedRecord()));

                  		//companyManagementDS.ds.removeData(insurerListGrid.getSelectedRecord());
                  		//companyManagementDS.ds.removeData(del_insurerForm.editRecord(insurerListGrid.getSelectedRecord()));

                  		//del_insurerForm.saveData();
                  		companyManagementDS.removeData(CompMgmtListGrid.getSelectedRecord());
                  		del_CompMgmtListwindow.hide();
                  	}else{
                  		del_CompMgmtListwindow.hide();
                  	}
                  	}
              },
              {type: "button", title: "Cancel",
                  click:function(){
                	  del_CompMgmtListwindow.hide();
                  }
              }

          ]
      })
  ]
});
*/

isc.IExportButton.create({
  ID:"CompMgmtListExport",
  title: "Export",
  width: 90,
  layoutAlign:"center",
  autoDraw: false,
  listGrid: CompMgmtListGrid,
});

isc.IButton.create({
	  ID: "DocCert",
	  autoDraw: false,
	  width:90,
	  layoutAlign:"center",
	  title: "DOC Cert",onControl:"MANCOMP_READ||FSQC_ALL",
	  click : function() {

		  if(CompMgmtListGrid.anySelected()){
			  DocCertListwindow.show();

			  DocCertGrid.setData([]);
	          //DocCertGrid.setData(CompMgmtListGrid.getSelectedRecord().doc);
	    	  DocCertGrid.fetchData({"Com_cd":CompMgmtListGrid.getSelectedRecord().Com_cd},function (dsResponse, data, dsRequest) {
	    		  console.log(data);
	    		  DocCertGrid.refreshData();
	    		  for (i = 0; i < data.length; i++) {
	    			  DocCertGrid.setEditValue(i,0,CompMgmtListGrid.getSelectedRecord().imo_comno);
	    			  DocCertGrid.setEditValue(i,1,CompMgmtListGrid.getSelectedRecord().Com_name);
	                  DocCertGrid.setEditValue(i,4,DocCertGrid.getRecord(i).docexpiry);
	    		  }
	          })

/*	          for (i = 0; i < DocCertGrid.getTotalRows(); i++) {
	        	  DocCertGrid.setEditValue(i,0,CompMgmtListGrid.getSelectedRecord().imo_comno);
	        	  DocCertGrid.setEditValue(i,1,CompMgmtListGrid.getSelectedRecord().Com_name);

	        	  var expiry = DocCertGrid.getRecord(i).docexpiry;
	        	  //var expiry2 = expiry.substr(0, 5);
	              DocCertGrid.setEditValue(i,4,expiry);
	          }
*/
		  }else{
	    	  isc.say("No Record is Selected.");
		  }

	  }
});
isc.ListGrid.create({
  	ID: "DocCertGrid",
      dataSource: companyManagementDocDS,
      overflow:"auto",
      showRollOver: true,
      height: 440,
      width: 1390,
      autoFitData:true,
      autoSize:true,
      autoFitFieldWidths:false,
      autoFetchData: false,
      autoSaveEdits: false,
      canEdit: false,
      editOnFocus: true,
      canSelectCells: false,
      dataPageSize: 20,
      canRemoveRecords:false,
      saveLocally: true,
      saveByCell: false,
      padding:1,
      //editEvent: "doubleClick",
      editEvent: "click",
      layoutTopMargin:10,
      isGroup: true,
      groupTitle: "DOC Certificate",
      fields: [
          {name:"Com_cd", title:"ID", hidden:true},
          {name:"serial", title:"File no", hidden:true},
          {name:"imo_comno", title:"IMO No."},
          {name:"Com_name", title:"Company"},
          {name:"docissue", title:"Issue Date (dd/mm/yyyy)"},
          {name:"docexpiry", title:"Expiry Date (dd/mm/yyyy)"},
          {name:"docanniversary", title:"Anniversary Date (dd/mm/yyyy)"},
          {name:"docro", title:"Class"},
          {name:"docerror", title:"Doc Error"},
          {name:"docerrortype", title:"Doc Error Type"},
          {name:"certtype", title:"Certificate Type"},
          //{name:"report_name", title:"Report Name"},
          {name:"mdsurveyor", title:"Audit Report by"},
          {name:"renewal", title:"Renewal"},
          {name:"recdate", title:"Received Date"},
          //{name:"remark", title:"Remark" , width:500},
      ]
  	  ,rowDoubleClick:function(){

  		  DocCertdetailswindow.show();
  		  DocCertform.setValues(DocCertGrid.getSelectedRecord());
  		  DocCertform.setValue('Com_name',CompMgmtListGrid.getSelectedRecord().Com_name);
  	  }
});
isc.IButton.create({
	    ID:"AddDocCertBtn",
	    onControl:"FSQC_ALL||MANCOMP_WRITE",

	    title:"Add",
	    width:90,
	    layoutAlign:"center",
	    autoDraw: false,
	    click:function(){

	    	DocCertdetailswindow.show();
	    	DocCertform.clearValues();

    		  	var doccert_serial_max = 0;
    		  	for (i = 0; i < DocCertGrid.getTotalRows(); i++) {
    		  		if (DocCertGrid.getRecord(i).serial > doccert_serial_max){
    		  			doccert_serial_max = DocCertGrid.getRecord(i).serial;
    		  		}
    		  	}

    		  	DocCertform.setValue('Com_cd',CompMgmtListGrid.getSelectedRecord().Com_cd);
    		  	DocCertform.setValue('Com_name',CompMgmtListGrid.getSelectedRecord().Com_name);
    		  	DocCertform.setValue('serial',doccert_serial_max+1);
	    }
});
isc.IButton.create({
	  ID: "closeDocCertBtn",
	  autoDraw: false,
	  width:90,
	  layoutAlign:"center",
	  title: "Close",
	  click:function (){
		  DocCertListwindow.hide();
	  }
});

isc.HLayout.create({
	ID:"DocCertBtnBar",
	width: "1390",
	//layoutTopMargin:10,
	showEdges: false,
	align:"right",
	membersMargin:5,
	members:[AddDocCertBtn, closeDocCertBtn]
});
isc.HLayout.create({
	ID:"DocCertmainPage",
	width: 1400,
	height:350,
	align:"center",
	layoutAlign:"center",
	defaultLayoutAlign: "center",
	//layoutTopMargin:10,
	showEdges: false,
	membersMargin:30,
	members:[DocCertGrid]
});
isc.Window.create({
	  ID: "DocCertListwindow",
	  title: "DOC Certificate",
      height: 500,
      width: 1400,
	  autoSize:true,
	  autoCenter: true,
	  isModal: true,
	  showModalMask: true,
	  autoDraw: false,
	  closeClick : function(){
		  CompMgmtListGrid.refreshData();
		  DocCertListwindow.hide();
	  },
	  items: [
	      isc.VLayout.create({
	    	  ID:"DocCertListBtnBar",
	    	  //width: 100,
	    	  //layoutTopMargin:10,
	    	  defaultLayoutAlign: "center",
	    	  showEdges: false,
	    	  membersMargin:0, members:[DocCertBtnBar, DocCertmainPage]
	      })
	  ]
});

isc.DynamicForm.create({
  	ID: "DocCertform",
      dataSource: companyManagementDocDS,
      overflow:"auto",
      showRollOver: true,
      height: 295,
      width: 790,
      autoSize:true,
      autoFetchData: false,
      autoSaveEdits: false,
      autoCenter: true,
      canEdit: true,
      editOnFocus: true,
      canSelectCells: false,
      dataPageSize: 20,
	  layoutAlign:"center",
      canRemoveRecords:false,
      saveLocally: false,
      saveByCell: false,
      border:"1px solid grey", padding:10, spacing:1,
      numCols: 4,
      //editEvent: "doubleClick",
      editEvent: "click",
      layoutTopMargin:10,
      isGroup: true,
      groupTitle: "DOC Certificate",
      fields: [
          {name:"Com_cd", title:"ID:", hidden:true, type:"staticText", rowSpan:2},
          {name:"Com_name", title:"Company:", type:"staticText", colSpan:3},
          {name:"serial", title:"Serial:", type:"staticText", colSpan:3},
          {name:"docissue", title:"Issue Date(YYYY/MM/DD)"},
          {name:"docexpiry", title:"Expiry Date"},
          {name:"docro", title:"DOC Issuing Authority"
				, optionDataSource:"codeRODS", valueField:"Cs_cd", displayField:"Cs_cd" 
				, pickListFields:[
					{name:"Cs_cd"},
					{name:"Cs_name"},
					{name:"hide"},
				]
				, pickListProperties: {
					showFilterEditor:true		            
				    , alternateRecordStyles:false
				}
				, optionCriteria:{
					hide:"2"
				}
				, pickListWidth:650
          },
          {name:"docerror", title:"Doc Error"},
          {name:"renewal", title:"Initial/Renewal Date(YYYY/MM/DD)", rowSpan:3},
          {name:"docerrortype", title:"Doc Error Type", optionDataSource:"errortypeDS", valueField:"errorcd", displayField:"errordetail"},
          {name:"certtype", title:"Certificate Type"},
          {name:"mdsurveyor", title:"Audit Report by",  type:"ComboBoxItem", optionDataSource:"codeMDSurveyorDS", valueField:"Surveyor_cd", displayField:"Surveyor_Enam"},
          {name:"recdate", title:"Received Date(YYYY/MM/DD)"},
          //{name:"report_type", title:"Report File Type"},
          {name:"sptype", title:"Ship Type" , width:500,
        	  type:"ComboBoxItem", startRow:true, colSpan:4, multiple:true, optionDataSource:"codeDocShipTypeDS", displayField:"sptype_name", valueField:"sptype_name",
              multipleAppearance:"picklist",  pickListWidth:500,
              pickListFields:[
                              //{name:'sptype_cd', width:50},
                              {name:'sptype_name', width:400}
                             ]
          },
          {name:"remark", title:"Remark", colSpan:4, width:500}
      ]
  });
/*
  isc.ButtonToolbar.create({
      ID: "DocCertbtnbar",
	  layoutAlign:"center",
      buttons: [
          {name: "DocCertformSave", title: "Save", width:100,
              click:function(){

            	  DocCertform.saveData();

            	  DocCertdetailswindow.hide();

            	  DocCertGrid.setData([]);

            	  DocCertGrid.filterData({"Com_cd":DocCertform.getValue('Com_cd')},function (dsResponse, data, dsRequest) {
            		  DocCertGrid.refreshData();
            		  for (i = 0; i < data.length; i++) {
            			  DocCertGrid.setEditValue(i,0,CompMgmtListGrid.getSelectedRecord().imo_comno);
            			  DocCertGrid.setEditValue(i,1,CompMgmtListGrid.getSelectedRecord().Com_name);
                          DocCertGrid.setEditValue(i,4,DocCertGrid.getRecord(i).docexpiry);
            		  }
                  })
              }
          },
          {name: "DocCertformClose", title: "Close", width:100, hidden:false,
              click:function(){
            	  DocCertdetailswindow.hide();
              }
          }
      ]
  });
  */
isc.IButton.create({
	  ID: "saveDocCertdetailBtn",
	  autoDraw: false,
	  width:90,
	  layoutAlign:"center",
	  title: "Save",
	  click:function (){
    	  DocCertform.saveData();

    	  DocCertdetailswindow.hide();

    	  DocCertGrid.setData([]);

    	  DocCertGrid.fetchData({"Com_cd":DocCertform.getValue('Com_cd')},function (dsResponse, data, dsRequest) {
    		  DocCertGrid.refreshData();
    		  for (i = 0; i < data.length; i++) {
    			  DocCertGrid.setEditValue(i,0,CompMgmtListGrid.getSelectedRecord().imo_comno);
    			  DocCertGrid.setEditValue(i,1,CompMgmtListGrid.getSelectedRecord().Com_name);
                  DocCertGrid.setEditValue(i,4,DocCertGrid.getRecord(i).docexpiry);
    		  }
          })
	  }
});
isc.IButton.create({
	  ID: "closeDocCertdetailBtn",
	  autoDraw: false,
	  width:90,
	  layoutAlign:"center",
	  title: "Close",
	  click:function (){
		  DocCertdetailswindow.hide();
	  }
});
isc.HLayout.create({
	ID:"DocCertdetailBtnBar",
	width: "790",
	//layoutTopMargin:10,
	showEdges: false,
	align:"right",
	membersMargin:5,
	members:[saveDocCertdetailBtn, closeDocCertdetailBtn]
});
isc.HLayout.create({
	ID:"DocCertdetailmainPage",
	width: 800,
	height:300,
	align:"center",
	layoutAlign:"center",
	defaultLayoutAlign: "center",
	//layoutTopMargin:10,
	showEdges: false,
	membersMargin:0,
	members:[DocCertform]
});
isc.Window.create({
		  ID: "DocCertdetailswindow",
		  title: "DOC Certificate",
	      height: 300,
	      width: 800,
		  autoSize:true,
		  autoCenter: true,
		  layoutAlign:"center",
		  isModal: true,
		  showModalMask: true,
		  autoDraw: false,
		  items: [
			      isc.VLayout.create({
			    	  ID:"DocCertformBar",
			    	  //width: 100,
			    	  //layoutTopMargin:10,
			    	  defaultLayoutAlign: "center",
			    	  showEdges: false,
			    	  membersMargin:0, members:[DocCertdetailBtnBar, DocCertdetailmainPage]
			      })
			      ]
});

isc.IButton.create({
	  ID: "DocAuditResult",
	  autoDraw: false,
	  width:90,
	  layoutAlign:"center",
	  title: "DOC Audit",onControl:"FSQCSHIP_WRITE_DOC_AUD||FSQC_ALL",
	  click : function () {

		  if(CompMgmtListGrid.anySelected()){

			  DocAuditListwindow.show();

			  DocAuditGrid.setData([]);
			  //DocAuditGrid.setData(CompMgmtListGrid.getSelectedRecord().docAudit);

	    	  DocAuditGrid.fetchData({"company_id":CompMgmtListGrid.getSelectedRecord().Com_cd},function (dsResponse, data, dsRequest) {
	    		  DocAuditGrid.refreshData();
	    		  for (i = 0; i < data.length; i++) {
	    		  	  DocAuditGrid.setEditValue(i,0,CompMgmtListGrid.getSelectedRecord().imo_comno);
	    			  DocAuditGrid.setEditValue(i,1,CompMgmtListGrid.getSelectedRecord().Com_name);
	    		  }
	          });
			  
	          //for (i = 0; i < DocAuditGrid.getTotalRows(); i++) {
	        	  //DocAuditGrid.setEditValue(i,0,CompMgmtListGrid.getSelectedRecord().imo_comno);
	        	  //DocAuditGrid.setEditValue(i,1,CompMgmtListGrid.getSelectedRecord().Com_name);
	          //}

		  }else{
	    	  isc.say("No Record is Selected.");
		  }

	  }
});

isc.ListGrid.create({
  	ID: "DocAuditGrid",
      dataSource: docAuditDS,
      autoFitFieldWidths:false,
      overflow:"auto",
      showRollOver: true,
      align:"center",
      height: 440,
      width: 1390,
      autoSize:true,
      autoFetchData: false,
      autoSaveEdits: false,
      canEdit: false,
      editOnFocus: true,
      canSelectCells: false,
      dataPageSize: 20,
      canRemoveRecords:false,
      saveLocally: true,
      saveByCell: false,
      //editEvent: "doubleClick",
      editEvent: "click",
      layoutTopMargin:10,
      isGroup: true,
      groupTitle: "DOC Audit",
      padding:1,
      fields: [
          {name:"company_id", title:"ID", hidden:true},
          {name:"imo_comno", title:"IMO No."},
          {name:"Com_name", title:"Company"},
          {name:"audit_date", title:"Audit Date(YYYY/MM/DD)"},
          {name:"audittype", title:"Audit Type"},
          {name:"cs", title:"Auditing Organisation"},
          {name:"TBA1", title:"No. of NC"},
          {name:"TBA2", title:"No. of major NC"},
          {name:"TBA3", title:"No. of OBS"},
          {name:"participate", title:"MD participated"},
          {name:"lpardate", title:"Last Participate Date"},
      ]
  	  ,rowDoubleClick:function(record, recordNum, fieldNum){
  		  DocAuditdetailswindow.show();
  		  DocAuditform.setValues(record);
//  		  DocAuditform.setValues(DocAuditGrid.getSelectedRecord());	// jacky comment
  		  DocAuditform.setValue('Com_name',CompMgmtListGrid.getSelectedRecord().Com_name);
  	  }
});

isc.IButton.create({
	    ID:"addDocAuditBtn",
	    title:"Add",
	    width:90,
	    layoutAlign:"center",
	    autoDraw: false,
	    click:function(){

	    	  DocAuditdetailswindow.show();
	    	  DocAuditform.clearValues();

	    	  DocAuditform.setValue('company_id',CompMgmtListGrid.getSelectedRecord().Com_cd);
	    	  DocAuditform.setValue('Com_name',CompMgmtListGrid.getSelectedRecord().Com_name);
	    }
});
isc.IButton.create({
	  ID: "closeDocAuditBtn",
	  autoDraw: false,
	  width:90,
	  layoutAlign:"center",
	  title: "Close",
	  click:function (){
		  DocAuditListwindow.hide();
	  }
});

isc.HLayout.create({
	ID:"DocAuditBtnBar",
	width: "1390",
	//layoutTopMargin:10,
	showEdges: false,
	align:"right",
	membersMargin:5,
	members:[addDocAuditBtn, closeDocAuditBtn]
});
isc.HLayout.create({
	ID:"DocAuditmainPage",
	width: 1400,
	height:350,
	align:"center",
	layoutAlign:"center",
	defaultLayoutAlign: "center",
	//layoutTopMargin:10,
	showEdges: false,
	membersMargin:30,
	members:[DocAuditGrid]
});
isc.Window.create({
	  ID: "DocAuditListwindow",
	  title: "DOC Audit",
    height: 500,
    width: 1400,
	  autoSize:true,
	  autoCenter: true,
	  isModal: true,
	  showModalMask: true,
	  autoDraw: false,
	  closeClick : function(){
		  CompMgmtListGrid.refreshData();
		  DocAuditListwindow.hide();
	  },
	  items: [

	      isc.VLayout.create({
	    	  ID:"DocAuditListBtnBar",
	    	  //width: 100,
	    	  //layoutTopMargin:10,
	    	  height:1,
	    	  defaultLayoutAlign: "center",
	    	  showEdges: false,
	    	  membersMargin:0,
	    	  members:[DocAuditBtnBar, DocAuditmainPage]
	      })
	  ]
});

isc.DynamicForm.create({
  	ID: "DocAuditform",
      dataSource: docAuditDS,
      overflow:"auto",
      showRollOver: true,
      height: 295,
      width: 790,
      autoSize:true,
      autoFetchData: false,
      autoSaveEdits: false,
      autoCenter: true,
      canEdit: true,
      editOnFocus: true,
      canSelectCells: false,
      dataPageSize: 20,
	  layoutAlign:"center",
      canRemoveRecords:false,
      saveLocally: true,
      saveByCell: false,
      border:"1px solid grey", padding:5,
      numCols: 4,
      //editEvent: "doubleClick",
      editEvent: "click",
      isGroup: true,
      groupTitle: "DOC Auidt",

      fields: [
          {name:"company_id", title:"ID:", hidden:true},
          {name:"Com_name", title:"Company:", type:"staticText", colSpan:4},
          {name:"audit_date", title:"Audit Date(YYYY/MM/DD)", required:true},
          {name:"audittype", title:"Audit Type", type:"select", optionDataSource:"codeSurTypeDS", valueField:"Surtyp_cd", displayField:"Surtyp_des"},
          {name:"cs", title:"Auditing Organisation", colSpan:4},
          {name:"auditor", title:"Lead Auditor's Name"},
          {name:"ncs", title:"Non-Conformity Record"},
          {name:"remark", title:"Remark", colSpan:4, width:500},
          {name:"participate", title:"MD participated"},
          //{name:"mdsurveyor", title:"MD surveyor"},
          {name: "mdsurveyor", title: "MD Surveyor", width:150, type:"ComboBoxItem", optionDataSource:"codeMDSurveyorDS", valueField:"Surveyor_cd", displayField:"Surveyor_Enam"},
          {name:"lpardate", title:"Last Participate Date"},
      ]
  });
  /*
  isc.ButtonToolbar.create({
      ID: "DocAuditbtnbar",
	  layoutAlign:"center",
      buttons: [
          {name: "DocAuditformSave", title: "Save", width:100,
              click:function(){

            	  DocAuditform.saveData();

            	  DocAuditdetailswindow.hide();

            	  DocAuditGrid.setData([]);

            	  DocAuditGrid.filterData({"company_id":DocAuditform.getValue('company_id')},function (dsResponse, data, dsRequest) {
            		  DocAuditGrid.refreshData();
            		  for (i = 0; i < data.length; i++) {
            		  	  DocAuditGrid.setEditValue(i,0,CompMgmtListGrid.getSelectedRecord().imo_comno);
            			  DocAuditGrid.setEditValue(i,1,CompMgmtListGrid.getSelectedRecord().Com_name);
            		  }
                  });
              }
          },

          {name: "DocAuditformClose", title: "Close", width:100, hidden:false,
              click:function(){
            	  DocAuditdetailswindow.hide();
              }
          }
      ]
  }),
  */
isc.IButton.create({
	  ID: "saveDocAuditdetailBtn",
	  autoDraw: false,
	  width:90,
	  layoutAlign:"center",
	  title: "Save",
	  click:function (){
    	  DocAuditform.saveData();

    	  DocAuditdetailswindow.hide();

    	  DocAuditGrid.setData([]);

    	  DocAuditGrid.fetchData({"company_id":DocAuditform.getValue('company_id')},function (dsResponse, data, dsRequest) {
    		  DocAuditGrid.refreshData();
    		  for (i = 0; i < data.length; i++) {
    		  	  DocAuditGrid.setEditValue(i,0,CompMgmtListGrid.getSelectedRecord().imo_comno);
    			  DocAuditGrid.setEditValue(i,1,CompMgmtListGrid.getSelectedRecord().Com_name);
    		  }
          });
	  }
});
isc.IButton.create({
	  ID: "closeDocAuditdetailBtn",
	  autoDraw: false,
	  width:90,
	  layoutAlign:"center",
	  title: "Close",
	  click:function (){
		  DocAuditdetailswindow.hide();
	  }
});
isc.HLayout.create({
	ID:"DocAuditdetailBtnBar",
	width: "790",
	//layoutTopMargin:10,
	showEdges: false,
	align:"right",
	membersMargin:5,
	members:[saveDocAuditdetailBtn, closeDocAuditdetailBtn]
});
isc.HLayout.create({
	ID:"DocAuditdetailmainPage",
	width: 800,
	height:300,
	align:"center",
	layoutAlign:"center",
	defaultLayoutAlign: "center",
	//layoutTopMargin:10,
	showEdges: false,
	membersMargin:0,
	members:[DocAuditform]
});
isc.Window.create({
	  ID: "DocAuditdetailswindow",
	  title: "DOC Audit",
    height: 300,
    width: 800,
	  autoSize:true,
	  autoCenter: true,
	  layoutAlign:"center",
	  isModal: true,
	  showModalMask: true,
	  autoDraw: false,
	  items: [
		      isc.VLayout.create({
		    	  ID:"DocAuditBar",
		    	  //width: 100,
		    	  height:1,
		    	  //layoutTopMargin:10,
		    	  defaultLayoutAlign: "center",
		    	  showEdges: false,
		    	  membersMargin:0, members:[DocAuditdetailBtnBar, DocAuditdetailmainPage]
		      })
		  ]
});

/*
isc.Label.create({
  ID: "display",
  contents: "---",
});
*/

isc.VLayout.create({
	ID:"CompMgmtListBtnBar",
  width: 120,
  //layoutTopMargin:10,
  defaultLayoutAlign: "center",
  showEdges: false,
  membersMargin:5, members:[addCompMgmtbtn, delCompMgmtbtn, CompMgmtListExport, DocCert, DocAuditResult]
});

isc.VLayout.create({
	ID:"CompMgmtEditPane",
  //layoutTopMargin:10,
  defaultLayoutAlign: "center",
  showEdges: false,
  membersMargin:5, members:[CompMgmtListGrid]
});

isc.HLayout.create({
	ID:"CompMgmtList", layoutTopMargin:10,
//  isGroup: true,
//  groupTitle: "Particulars of Management Company",
  showResizeBar: true,
  height: "60%",
  showEdges: false,
  membersMargin:5, members:[CompMgmtEditPane, CompMgmtListBtnBar]
});

//------------------------------------------------------------------------------------------------------------------------------------------------


isc.ListGrid.create({
  ID: "CSOListGrid",
  width:"100%",
  //height:110,
  //alternateRecordStyles:true,
  overflow:"auto",
  dataSource: companyManagementCsoDS,
  autoFitFieldWidths:true,
  canEdit: true,
  editOnFocus: true,
  canSelectCells: true,
  autoSaveEdits: true,
  saveLocally: true,
  saveByCell: true,
  canRemoveRecords:false,
  //editEvent: "doubleClick",
  editEvent: "click",
  fields:[
          {name:"Com_cd", title:"ID",  width:50, hidden:true, canEdit:false},
          {name:"serial", title:"Serial", width:40, canEdit:false},
          {name:"csoname", title:"Company Security Officer's Name"},
          {name:"csophone", title:"Company Security Officer's Phone"},
          {name:"csofax", title:"Company Security Officer's Fax"},
          {name:"csoemail", title:"Company Security Officer's Email"},
          {name:"remark", title:"Remark"},
  ]
	,rowHasChanges:function(){

		var CompMgmtRowNum = CompMgmtListGrid.getRowNum(CompMgmtListGrid.getSelectedRecord());
		if(!EditedCSODPARecord.includes(CompMgmtRowNum)){
			EditedCSODPARecord.push(CompMgmtRowNum);
	        //console.log("EditedCSODPARecord: " + CompMgmtRowNum);

		}
	}
});

isc.IButton.create({
  ID:"CSOAdd",
  title:"Add",
  width:90,
  layoutAlign:"center",
  onControl:"MANCOMP_WRITE||FSQC_ALL",
  autoDraw: false,
  click:function(){

	  	var cso_serial_max = 0;

        for (i = 0; i < CSOListGrid.getTotalRows(); i++) {
        	if (CSOListGrid.getRecord(i).serial > cso_serial_max){
        		cso_serial_max = CSOListGrid.getRecord(i).serial;
        	}
        }
	  	var cso_record = {};
	  	cso_record['Com_cd'] = CompMgmtListGrid.getSelectedRecord().Com_cd;
	  	cso_record['serial'] = cso_serial_max + 1;

  		CSOListGrid.startEditingNew(cso_record);
  }
});

isc.IButton.create({
  ID:"CSODelete",
  title:"Delete",
  width:90,
  onControl:"MANCOMP_WRITE||FSQC_ALL",
  layoutAlign:"center",
  autoDraw: false,
  click:function(){

	  if(CompMgmtListGrid.anySelected()){

	  		isc.ask(promptDeleteMessage_2, function (value){
				if (value){
					if (CSOListGrid.getSelectedRecord())
						CSOListGrid.removeData(CSOListGrid.getSelectedRecord());
				}
			});

	  }else{
    	  isc.say("No Record is Selected.");
	  }

  }
});

isc.IExportButton.create({
	  ID:"CSOExport",
	  title: "Export",
	  width: 90,
	  layoutAlign:"center",
	  autoDraw: true,
	  listGrid: CSOListGrid,
	  mode:"refetchToExport",
	  criteriaCallback: function(){
			this.criteria = {Com_cd: !isNull(CompMgmtListGrid.getSelectedRecord()) ? CompMgmtListGrid.getSelectedRecord().Com_cd : ""};
	  }
});

isc.ListGrid.create({
  ID: "DPAListGrid",
  width:"100%",
  //height:110,
  //alternateRecordStyles:true,
  overflow:"auto",
  dataSource: companyManagementDpaDS,
  autoFitFieldWidths:true,
  canEdit: true,
  editOnFocus: true,
  canSelectCells: true,
  autoSaveEdits: true,
  saveLocally: true,
  saveByCell: true,
  canRemoveRecords:false,
  //editEvent: "doubleClick",
  editEvent: "click",
  fields:[
          {name:"Com_cd", title:"ID",  width:50, hidden:true},
          {name:"serial", title:"Serial", width:40, canEdit:false},
          {name:"dpaname", title:"Designated Person"},
          {name:"dpamail", title:"Designated Person's Email"},
          {name:"dpaphone", title:"Designated Person's Phone"},
          {name:"dpamobile", title:"Mobile Phone"},
          {name:"dpafax", title:"Designated Person's Fax"},
          {name:"remaks", title:"Remarks"},
  ]
	,rowHasChanges:function(){

		var CompMgmtRowNum = CompMgmtListGrid.getRowNum(CompMgmtListGrid.getSelectedRecord());
		if(!EditedCSODPARecord.includes(CompMgmtRowNum)){
			EditedCSODPARecord.push(CompMgmtRowNum);
	        //console.log("EditedCSODPARecord: " + CompMgmtRowNum);
		}
	}

});

isc.IButton.create({
  ID:"DPAAdd",
  title:"Add",
  onControl:"MANCOMP_WRITE||FSQC_ALL",
  width:90,
  layoutAlign:"center",
  autoDraw: false,
  click:function(){

	  	var dpa_serial_max = 0;

        for (i = 0; i < DPAListGrid.getTotalRows(); i++) {
        	if (DPAListGrid.getRecord(i).serial > dpa_serial_max){
        		dpa_serial_max = DPAListGrid.getRecord(i).serial;
        	}
        }

	  	var dpa_record = {};
	  	dpa_record['Com_cd'] = CompMgmtListGrid.getSelectedRecord().Com_cd;
	  	dpa_record['serial'] = dpa_serial_max + 1;

  		DPAListGrid.startEditingNew(dpa_record);
  }
});

isc.IButton.create({
  ID:"DPADelete",
  title:"Delete",
  onControl:"MANCOMP_WRITE||FSQC_ALL",
  width:90,
  layoutAlign:"center",
  autoDraw: false,
  click:function(){

	  if(CompMgmtListGrid.anySelected()){

	  		isc.ask(promptDeleteMessage_2, function (value){
				if (value){
					if (DPAListGrid.getSelectedRecord())
						DPAListGrid.removeData(DPAListGrid.getSelectedRecord());
				}
			});

	  }else{
  	  isc.say("No Record is Selected.");
	  }

  }
});

isc.IExportButton.create({
  ID:"DPAExport",
  title: "Export",
  width: 90,
  layoutAlign:"center",
  autoDraw: true,
  listGrid: DPAListGrid,
  mode:"refetchToExport",
  criteriaCallback: function(){
		this.criteria = {Com_cd: !isNull(CompMgmtListGrid.getSelectedRecord()) ? CompMgmtListGrid.getSelectedRecord().Com_cd : ""};
  }
});

isc.IButton.create({
	  ID:"UpdateDpa",
	  title:"Set as<br/>chief DPA",
	  width:90,
	  height:50,
	  layoutAlign:"center",
	  autoDraw: false,
	  click:function(){

		  if(CompMgmtListGrid.anySelected()){
			if (DPAListGrid.anySelected()) {
				isc.ask("Do you want to update the current DPA to the company?", function(value){
					if (value){
							CompMgmtListGrid.setEditValue(CompMgmtListGrid.getRowNum(CompMgmtListGrid.getSelectedRecord()),CompMgmtListGrid.getFieldNum('Person'),DPAListGrid.getSelectedRecord().dpaname);
					}
		  		});

			}else{
			  	isc.say("No DPA Record is Selected.");
		  	}

		  }else{
			  	isc.say("No Record is Selected.");
		  }

	  }
});

isc.VLayout.create({
	ID:"CSOListBtnBar",
	width: 120,
	//layoutTopMargin:10,
	defaultLayoutAlign: "center",
	showEdges: false,
	membersMargin:5, members:[CSOAdd, CSODelete, CSOExport]
});

isc.VLayout.create({
	ID:"CSOEditPanel",
	//layoutTopMargin:10,
	defaultLayoutAlign: "center",
	showEdges: false,
	membersMargin:5, members:[CSOListGrid]
});

isc.VLayout.create({
	ID:"DPAListBtnBar",
	width: 120,
	//layoutTopMargin:10,
	defaultLayoutAlign: "center",
	showEdges: false,
	membersMargin:5, members:[DPAAdd, DPADelete, DPAExport, UpdateDpa]
});

isc.VLayout.create({
	ID:"DPAEditPanel",
	//layoutTopMargin:10,
	defaultLayoutAlign: "center",
	showEdges: false,
	membersMargin:5, members:[DPAListGrid]
});

isc.HLayout.create({
	ID:"CSOList", layoutTopMargin:10,
	height: "20%",
	showResizeBar: true,
	isGroup: true, groupTitle: "CSO",
	showEdges: false,
	membersMargin:5, members:[CSOEditPanel, CSOListBtnBar]
//membersMargin:5, members:[CSOEditPanel, CSOListBtnBar, DPAEditPanel, DPAListBtnBar]
});

isc.HLayout.create({
	ID:"DPAList", layoutTopMargin:10,
	height: "20%",
	showResizeBar: true,
	isGroup: true, groupTitle: "DPA",
	showEdges: false,
	membersMargin:5, members:[DPAEditPanel, DPAListBtnBar]
});

//------------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------

isc.VLayout.create({
	ID:"CompMgmtListVLayout", membersMargin:5, width:"100%",
	showEdges: true,
	members:[CompMgmtTopBtnBar, CompMgmtList, CSOList, DPAList]
});


