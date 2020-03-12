/***************************************************************************************************************
* Qualified Name	: 	/webui/src/main/webapp/js/fsqcdb_ship/fsqcShipHistoryProfile.js
* @author 				Albert Chan
* @since				2019-08-31
* ************************************************************************************************************** 
* Change log:
* log no	Change complete date	Developer			Change Reason
* ======	====================	=========			=============
* 00000		2019-08-31				Albert Chan			Initial Implementation
*
* 
****************************************************************************************************************/


var max_series = 0;
var history_key;
var history_value;
var ShipHistoryProfileCert_cd;

function fsqcShipHistoryProfileControl(i_dataSource, original_LG, key, value, history_fields)
{
	isc.ValuesManager.create({
        ID: "fsqcShipHistoryProfileVM",
		dataSource: i_dataSource
	});
	
	isc.FormLayout.create({
		ID:"fsqcShipHistoryProfileTopShip",
		valuesManager:"fsqcShipHistoryProfileVM",
		width:"80%",
		numCols: 4,
		fixedColWidths: false,
		fields: history_fields
		
	});

	
	var save_button = 
		isc.ISaveButton.create({
			name:"updateBtn", title:"Save", autoFit: true, onControl:"FSQC_ALL",
			click : function () {
				if(fsqcShipHistoryProfileVM.validate())
				{
					console.log("update");
					
					fsqcShipHistoryProfileVM.setValue("Updated", new Date());
					fsqcShipHistoryProfileVM.saveData
					(
						function (dsResponse, data, dsRequest) 
						{
						  if(dsResponse.status==0)
						  {
							  	isc.say(saveSuccessfulMessage);
							  	enabledSection(true);
							  	
								fsqcShipHistoryProfileVM.setValues({});
								fsqcShipHistoryProfileVM.setData({});
								fsqcShipHistoryProfileVM.reset();
								fsqcShipHistoryProfileVM.clearErrors(true);

								fsqcShipHistoryProfileWindow.hide();
								
								original_LG.refreshData(function (dsResponse, data, dsRequest) {
              						updateListGridData(data)
              					});
						  }
						}
					);
				}
			}
		});

	
	isc.ButtonToolbar.create({
		ID:"shipHistoryManagement_ToolBar",
		buttons: 
		[
			save_button,
			{name:"closeBtn", title:"Close", autoFit: true,
			  click : function () {
				fsqcShipHistoryProfileVM.setValues({});
				fsqcShipHistoryProfileVM.setData({});
				fsqcShipHistoryProfileVM.reset();
				fsqcShipHistoryProfileVM.clearErrors(true);
				  //TODO

				fsqcShipHistoryProfileWindow.hide();
			  }
			}
		]
	});
	
	
	var fsqcShipHistoryProfileTop =  isc.VLayout.create
    ({
		//isGroup: "true",
		//groupTitle: "Ship main data",
		width: fsqcShipHistoryProfileTopShip.width,
		height: "30%",
		layoutMargin:10,
    	members: 
    	[
	        fsqcShipHistoryProfileTopShip
    	]
    });
	
	isc.Window.create({
		ID:"fsqcShipHistoryProfileWindow"
		, isModal: false
		, showModalMask: false
		, width: "85%"
		, height: "30%"
//		, layoutMargin:10
//		, autoSize: true
		, items: 
		[
	        isc.VLayout.create
	        ({
	        	members: 
	        	[
	    	        shipHistoryManagement_ToolBar
	    	        , fsqcShipHistoryProfileTop
	        	]
	        })
		],
		show:function(){
			fsqcShipHistoryProfileVM.setData({});
			this.Super('show', arguments);
		}
	});
}

function open_fsqcShipHistoryProfile(i_dataSource, original_LG, key, value, history_type, history_fields){
	//Init the Forms
	history_key = key;
	history_value = value;
	fsqcShipHistoryProfileControl(i_dataSource, original_LG, key, value, history_fields);

	fsqcShipHistoryProfileWindow.show();

	fsqcShipHistoryProfileWindow.setTitle("New " + history_type);
	fsqcShipHistoryProfileVM.setValues({});
	fsqcShipHistoryProfileVM.setValue(key, value);
	
}
