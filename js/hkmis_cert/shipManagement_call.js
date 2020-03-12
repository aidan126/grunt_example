function shipManagement_windowContent_del()
{
	isc.DynamicForm.create({
		ID:"shipManagement_FormDetail",
		dataSource: "shipManagementDS",
		width:"100%",
		numCols: 8,
		fields:
		[
			{name: "id", title:"ID", startRow: true, colSpan: 3, width: 300, type: "staticText"},
			{name: "spname", title:"Name of Ship",	required: true, startRow: false, colSpan: 2, width: 300},

			{name: "imono", title:"IMO NO.", startRow: true, colSpan: 3, width: 300},
			{name: "distinct_no", title:"Distinct No.",	startRow: false, colSpan: 2, width: 300},

			{name: "sptype", title:"Type of Ship", startRow: true, colSpan: 3, width: 300},
			{name: "offno", title:"Off. No.",	startRow: false, colSpan: 2, width: 300},

			{name: "gross", title:"Gross", startRow: true, colSpan: 3, width: 300},
			{name: "engine_power", title:"Engine Power",	startRow: false, colSpan: 2, width: 300},

			{name: "trading_area", title:"Trading Area", startRow: true, colSpan: 3, width: 300},
			{name: "registry_port", title:"Registry Port",	startRow: false, colSpan: 2, width: 300},

			{name: "dw", title:"Dw", startRow: true, colSpan: 3, width: 300},
			{name: "net", title:"Net",	startRow: false, colSpan: 2, width: 300},

			{name: "pp", title:"Pp", startRow: true, colSpan: 3, width: 300},
			{name: "loa", title:"Loa",	startRow: false, colSpan: 2, width: 300},

			{name: "breadth", title:"Breadth", startRow: true, colSpan: 3, width: 300},
			{name: "depth", title:"Depth",	startRow: false, colSpan: 2, width: 300},

			{name: "speed", title:"Speed", startRow: true, colSpan: 3, width: 300},
			{name: "register_date", title:"Register Date",	startRow: false, colSpan: 2, width: 300},

			{name: "class", title:"Class", startRow: true, colSpan: 3, width: 300},
			{name: "stat", title:"Stat",	startRow: false, colSpan: 2, width: 300},

			{name: "flag", title:"Flag", startRow: true, colSpan: 3, width: 300},
			{name: "operator", title:"Operator",	startRow: false, colSpan: 2, width: 300},
		]
	});

	isc.ButtonToolbar.create({
		ID:"shipManagement_ToolBar",
		buttons: 
		[
			{name:"saveBtn", title:"Save", autoFit: true, onControl:"MMO_CREATE|MMO_UPDATE",
			  click : function () {
				if(shipManagement_FormDetail.validate())
				{
					shipManagement_FormDetail.saveData
					(
						function (dsResponse, data, dsRequest) 
						{
						  if(dsResponse.status==0)
						  {
							  isc.say(saveSuccessfulMessage);
							  enabledSection(true);
						  }
						}
					);
				}
			  }
			},
			{name:"closeBtn", title:"Close", autoFit: true,
			  click : function () {
				shipManagement_FormDetail.setValues({});
				shipManagement_FormDetail.setData({});
				shipManagement_FormDetail.reset();
				shipManagement_FormDetail.clearErrors(true);
				  //TODO

				  shipManagement_DetailWindow.hide();
			  }
			}
		]
	});

	isc.Window.create({
		ID:"shipManagement_DetailWindow", isModal: true, showModalMask: true, width: 1200, height: 600, layoutMargin:10,
		items: 
		[
	        isc.VLayout.create
	        ({
	        	members: 
	        	[
	    	        isc.TitleLabel.create({ID:"sfRecSectionTitle", contents: "<p><b><font size=2px>Maintain shipManagement Record <br /></font></b></p>"}),
	    	        shipManagement_FormDetail
	    	        , shipManagement_ToolBar
	        	]
	        })
		],
		show:function(){
			shipManagement_FormDetail.setData({});
			this.Super('show', arguments);
		}
	});
}

function open_shipManagement_RecDetail_del(record){
	//Init the Forms and ListGrids

	shipManagement_windowContent_del();

	shipManagement_DetailWindow.show();

	if(record!=null){
		//Update record;
		shipManagement_FormDetail.getField('id').setDisabled(true);
		var shipManagementId = record.id;
		shipManagement_FormDetail.fetchData({"id":shipManagementId},function (dsResponse, data, dsRequest) {
			shipManagement_DetailWindow.setTitle("shipManagement Detail (ID: " + shipManagementId + " )");
		});

		enabledSection(true);

	}else{
		//New record;
		shipManagement_DetailWindow.setTitle("shipManagement Detail (ID: " + shipManagementId + " )");
		shipManagement_FormDetail.getField('id').setDisabled(false);
		shipManagement_FormDetail.setValues({});
		shipManagement_FormDetail.clearErrors(true);
		enabledSection(false);
	}
}
