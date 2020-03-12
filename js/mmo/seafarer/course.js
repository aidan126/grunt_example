//--------  Course Start map to Seafarer_license ----------
isc.DynamicForm.create({
	ID:"courseDetailDynamicForm", dataSource: "licenseDS", numCols: 2,	height:150,
	fields: [
	         {name: "seafarerId", 	hidden:"true"}, 
	         {name: "seqNo", 		hidden:"true"},
	         
	         {name: "courseDesc", 	title:"Course Description", 	type:"textArea'",	width:"*", 	length:400}
	         ]
});


isc.ButtonToolbar.create({
	ID:"courseDetailForm_ToolBar", 
	buttons: [
	          {name:"updateBtn", title:"Save", autoFit: true, onControl:"MMO_UPDATE",
	        	  click : function () { 
	        		  if (courseDetailDynamicForm.validate()) {
	        			  courseDetailDynamicForm.saveData(function(dsResponse, data, dsRequest) {
								if (dsResponse.status == 0) {
									isc.say(saveSuccessfulMessage);
									sfRecFormCourseLG.refresh();
								}
							}, {operationType:"update"});
						}
	        	  }
	          },
	          {name:"closeBtn", title:"Close", autoFit: true, 
	        	  click : function () { 
	        		  courseDetailDynamicForm.setValues({});
	        		  courseDetailDynamicForm.clearErrors(true);
	        		  courseDetailWindow.hide();
	        	  }
	          }
	          
	          ]
});

// create window
isc.Window.create({
	ID:"courseDetailWindow", width: 600, height: 250, isModal: true, showModalMask: true, title: "Update Seafarer Course",
	items: [ 
	     	isc.WindowVLayout.create({ 
				members: [ 
//				          	isc.TitleLabel.create({contents: "<p><b><font size=2px>Renew Seafarer Registration <br /></font></b></p>"}), 
				          	courseDetailDynamicForm, 
				          	courseDetailForm_ToolBar 
				          ]
			})
	        
	  ]
});



isc.ListGrid.create({
	ID:"sfRecFormCourseLG", height: "*", dataSource: "licenseDS",
	fields: [
		{name: "seqNo", 		width:120}, 
		{name: "courseDesc", 	width:"*"}
	],
	rowDoubleClick:function(record, recordNum, fieldNum){
		openSeafarerCourse(record);
    },
    refresh: function (){
   	 this.setData([]);
   	 this.fetchData({"seafarerId":sfRecFormDetail.getValue('id')});
    }
	
});

isc.ButtonToolbar.create({
	ID:"sfRecFormCourseLG_ToolBar",
	buttons: [
	        {name:"refreshBtn", title:"Refresh", autoFit: true, 
	        	click : function () { 
	        		sfRecFormCourseLG.refresh();
					  }
			},
	        {name:"createBtn", title:"Create", autoFit: true, 
				click : function () { 
					openSeafarerCourse(null);
	        	  }
	        }, 
	        {name:"delBtn", title:"Delete", autoFit: true, disabled:true,
	        	click : function () { 
//	        		  sfRecFormCourse.data.removeList(sfRecFormCourse.getSelection());
	        	  }
	        }
	       ]
});
isc.SectionVLayout.create({ID:"seafarerCourseLayout", height:180, members: [sfRecFormCourseLG, sfRecFormCourseLG_ToolBar ]});
//--------  Course End ----------
function openSeafarerCourse(record){
	courseDetailWindow.show();
	if(record!=null){
		// Update
		var seafarerId = record.seafarerId;
		var seqNo = record.seqNo;
		courseDetailDynamicForm.fetchData({"seafarerId":seafarerId, "seqNo":seqNo},function (dsResponse, data, dsRequest) {
		});
	}else{
		//Create
		courseDetailDynamicForm.setValue("seafarerId", sfRecFormDetail.getValue('id'));
	}
}