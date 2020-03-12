/***************************************************************************************************************
* Qualified Name	: 	/webui/src/main/webapp/js/fsqcdb_code/codeTableWindow.js
* @author 				Albert Chan
* @since				2019-09-06
* ************************************************************************************************************** 
* Change log:
* log no	Change complete date	Developer			Change Reason
* ======	====================	=========			=============
* 00000		2019-09-06				Albert Chan			Initial Implementation
*
* 
****************************************************************************************************************/

function open_codeTableControl(i_dataSource, idFieldValues, title, formFields){
	
	console.log("open_codeTableControl");
	isc.ValuesManager.create({
        ID: "codeTableVM",
		dataSource: i_dataSource
	});
	
	var dynamicForm = isc.DynamicForm.create({
		saveOperationType :"update",
		valuesManager:"codeTableVM",
		numCols: 6,
		//dataSource: i_dataSource,
		cellBorder:0,
		margin:10,
		fields: formFields
	});


	var saveButton = isc.ISaveButton.create({
		click:function(){
			if(dynamicForm.validate()){
				isc.ask(promptSaveMessage, function (value){
					if (value){
						dynamicForm.saveData(
							function (dsResponse, data, dsRequest) {
								if(dsResponse.status==0){
									isc.say(saveSuccessfulMessage, function(){
										dynamicForm.setData({});
										codeTableWindow.hide();
									});
								}
							}
						);
					}
				});
			}
		}
	});

	var addButton = isc.IAddButton.create({
		click:function(){
			codeTableWindow.setTitle("New " + title);
			dynamicForm.editNewRecord();
		}
	});

	var closeButton = isc.IButton.create({name:"closeBtn", title:"Close", autoFit: true,
		  click : function () {
			codeTableVM.setValues({});
			codeTableVM.setData({});
			codeTableVM.reset();
			codeTableVM.clearErrors(true);
			codeTableWindow.hide();
		  }
		});
		
	var buttonsHLayout = isc.ButtonsHLayout.create({
		members : [
			addButton,
			saveButton,
			isc.IResetButton.create({
				click:function(){
					dynamicForm.reset();
				}
			}),
			closeButton
		]
	});

	var updateVLayout = isc.VLayout.create({
		height:80,
		layoutTopMargin:10,
		layoutBottomMargin:10,
		members : [dynamicForm, buttonsHLayout]

	});

	isc.Window.create({
		ID:"codeTableWindow"
		, isModal: false
		, showModalMask: false
//		, width: "80%"
//		, height: "25%"
//		, layoutMargin:10
		, autoSize: true
		, items: 
		[
	        isc.VLayout.create
	        ({
	        	members: 
	        	[
	        		updateVLayout
	        	]
	        })
		],
		show:function(){
			this.Super('show', arguments);
		}
	});

	if (idFieldValues != null){
		var text = "";
		var new_record = false;
		for (var key in idFieldValues) {
			if (dynamicForm.getField(key) != null){
				//dynamicForm.getField(key).setDisabled(true);
				dynamicForm.getField(key).setRequired(true);
			}
			
			if (idFieldValues[key]) {
				text += key;
				text += ": ";
				text += idFieldValues[key].trim();
				text += ", ";
			} else {
				new_record = true;
			}
		}
		
		if (text.length >= 2) {
			text = text.substring(0, text.length - 2);
		}
		
		codeTableVM.fetchData(idFieldValues,function (dsResponse, data, dsRequest) {
		});

		if (new_record) {
			codeTableWindow.setTitle("New " + title);
		} else {
			codeTableWindow.setTitle("Edit " + title +" (" + text +")" );
		}
	}
	
	
}
	
function open_codeTableWindow(i_dataSource, idFieldValues, title, formFields){
	open_codeTableControl(i_dataSource, idFieldValues, title, formFields);
	codeTableWindow.show();
}
