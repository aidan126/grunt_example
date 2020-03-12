/***************************************************************************************************************
* Qualified Name	: 	/webui/src/main/webapp/js/code/userProfile.js
* @author 				Jacky Leong
* @since				2019-07-28
* ************************************************************************************************************** 
* Change log:
* log no	Change complete date	Developer			Change Reason
* ======	====================	=========			=============
* 00000		2019-07-28				Jacky Leong			Initial Implementation
*
* 
****************************************************************************************************************/


function myAccProfileControl()
{
	var value_man = isc.ValuesManager.create({
        ID: "myAccProfileVM",
		dataSource: userDS
	});
	
	
	isc.DynamicForm.create({
		ID:"myAccProfileDF",
		valuesManager:value_man,
//		cellBorder: 1,
//		isGroup: "true",
//		groupTitle: "Ship main data",
		canEdit: false,
		disabled: true,
		width:"100%",
		numCols: 6,
		fixedColWidths: false,
//		colWidths: ["*", "*", "*", "*", "*", "*", "*", "*"],
		fields:
		[
			{ name: "id"},
			{ name: "userName"},
			{ name: "chiName"},
			{ name: "title"},
			{ name: "cert_dept_id", title: "Department"
				, type:"select", optionDataSource:"userCertDeptDS", displayField:"cert_dept_code", valueField:"cert_dept_id"
				, pickListFields:[
		              {name:"cert_dept_code"},
		              {name:"cert_dept_name"}
		          ],
		          pickListWidth:350,
			},
//			{ name: "userPassword"},
			{ name: "userStatus"},
//			{ name: "userPasswordTime"},
			{ name: "email"},
	/*
			{ name: "userRoles", colSpan:6 
				, 	title:"Roles", type:"select", multiple:true, multipleAppearance:"picklist"
					,  optionDataSource:"roleDS", displayField:"roleCode", valueField:"id"
			}
	*/
			{ name: "roleIds", 	title:"Roles", type:"select", startRow:false, colSpan:5, width:'*', multiple:true, 
	            multipleAppearance:"picklist",  optionDataSource:"roleDS", displayField:"roleCode", valueField:"id"},
			{ name: "nautical_surveyor" },
			{ name: "engineer_surveyor"},
			{ name: "senior_surveyor"},
			{ name: "authorized_official"},
			{ name: "senior_ag"},
			{ name: "official_ag"},
			{ name: "ads"},
			{ name: "ads_ag"},
		]
	});
//	isc.DynamicForm.create({
//		ID:"changePasswordDF",
//		valuesManager:value_man,
////		cellBorder: 1,
////		isGroup: "true",
////		groupTitle: "Ship main data",
//		canEdit: true,
//		disabled: false,
//		width:"100%",
//		numCols: 6,
//		fixedColWidths: false,
////		colWidths: ["*", "*", "*", "*", "*", "*", "*", "*"],
//		fields:
//		[
//			{name: "oldPassword", title: "Old Password", type: "password", required: true},
//			{name: "newPassword", title: "New Password", type: "password", required: true},
//			{name: "newPasswordConfirm", title: "Verification", type: "password", required: true}
//
//		]
//	});
//	isc.ButtonsHLayout.create({
//		ID : "changeUserPasswordButtonHLayout",
//		width:400,
//		members : [
//			isc.ISaveButton.create({
//				ID:"changeUserPasswordButtonHLayoutSaveButton",
//				click:function(){
//					if (!changePasswordDF.validate()){
//						return;
//					}
//					var data = {"userId":loginData.userId, 
//								"oldPassword":changePasswordDF.getValue("oldPassword"), 
//								"newPassword":changePasswordDF.getValue("newPassword"),
//								"newPasswordConfirm":changePasswordDF.getValue("newPasswordConfirm")};	
//					userDS.updateData(data, 
//							function (dsResponse, data, dsRequest) {
//								isc.say(data);
//                    		}, {"operationId":"CHANGE_USER_PASSWORD"});
//					changePasswordDF.reset();
//				}
//			}),
//			isc.IResetButton.create({
//				ID:"changeUserPasswordButtonHLayoutResetButton",
//				click:function(){
//					changePasswordDF.reset();
//				}
//			}) 
//			]
//	})
	isc.ButtonToolbar.create({
		ID:"myAccProfile_ToolBar",
		buttons: 
		[

//			{name:"saveBtn", title:"Save", autoFit: true, 
//				click : function () {
//					if(fsqcShipProfileVM.validate())
//					{
//						fsqcShipProfileVM.saveData
//						(
//							function (dsResponse, data, dsRequest) 
//							{
//							  if(dsResponse.status==0)
//							  {
//								  isc.say(saveSuccessfulMessage);
//								  enabledSection(true);
//							  }
//							}
//						);
//					}
//				}
//			},
			
			{name:"ChangePassword", title:"Change Password", autoFit: true,
				  click : function () {
					//TODO

//					  ChangePasswordWindow.show();
					  open_ChangePasswordWindow(loginData.userId);
				  }
			}
			,{name:"closeBtn", title:"Close", autoFit: true,
			  click : function () {
				//TODO

				myAccProfileWindow.hide();
			  }
			}		]
	});
//	isc.Window.create({
//		ID:"ChangePasswordWindow"
//		, isModal: true
//		, showModalMask: true
//		, title: "My Profile"
//		, width: "70%"
//		, height: "40%"
////		, layoutMargin:10
////		, autoSize: true
//		, items: 
//		[
//	      
////	    	        isc.TitleLabel.create({ contents: "<p><b><font size=2px>My Profile<br /></font></b></p>"}),
//	        		changePasswordDF
//	    	        , changeUserPasswordButtonHLayout
//	        	
//		],
//		show:function(){
////			myAccProfileVM.setData({"id" : 1 });
//			this.Super('show', arguments);
//		}
//	});

	isc.Window.create({
		ID:"myAccProfileWindow"
		, isModal: true
		, showModalMask: true
		, title: "My Profile"
		, width: "70%"
		, height: "40%"
//		, layoutMargin:10
//		, autoSize: true
		, items: 
		[
	        isc.VLayout.create
	        ({
	        	members: 
	        	[
//	    	        isc.TitleLabel.create({ contents: "<p><b><font size=2px>My Profile<br /></font></b></p>"}),
	        		myAccProfile_ToolBar
	    	        , myAccProfileDF
	        	]
	        })
		],
		show:function(){
//			myAccProfileVM.setData({"id" : 1 });
			this.Super('show', arguments);
		}
	});
}

function open_MyAccProfile(){

	myAccProfileControl();
	console.log("loginid "+ loginData.userId);
	myAccProfileVM.fetchData({"id" : loginData.userId });

	myAccProfileWindow.show();

}

function changePasswordControl( user_id, old_password )
{
//	var value_man = isc.ValuesManager.create({
//        ID: "myAccProfileVM",
//		dataSource: userDS
//	});
	
	isc.DynamicForm.create({
		ID:"changePasswordDF",
//		valuesManager:value_man,
//		cellBorder: 1,
//		isGroup: "true",
//		groupTitle: "Ship main data",
		canEdit: true,
		disabled: false,
		width:"100%",
		numCols: 2,
		fixedColWidths: false,
//		colWidths: ["*", "*", "*", "*", "*", "*", "*", "*"],
		fields:
		[
			{name: "oldPassword", title: "Old Password", type: "password", required: true, defaultValue: old_password},
			{name: "newPassword", title: "New Password", type: "password", required: true},
			{name: "newPasswordConfirm", title: "Verification", type: "password", required: true}

		]
	});
	isc.ButtonsHLayout.create({
		ID : "changeUserPasswordButtonHLayout",
//		width:400,
		members : [
			isc.IResetButton.create({
				ID:"changeUserPasswordButtonHLayoutResetButton",
				click:function(){
					changePasswordDF.reset();
				}
			}),
			isc.ISaveButton.create({
				ID:"changeUserPasswordButtonHLayoutSaveButton",
				click:function(){
					if (!changePasswordDF.validate()){
						return;
					}
					var data = {"userId":user_id, 
								"oldPassword":changePasswordDF.getValue("oldPassword"), 
								"newPassword":changePasswordDF.getValue("newPassword"),
								"newPasswordConfirm":changePasswordDF.getValue("newPasswordConfirm")};	
					userDS.updateData(data, 
							function (dsResponse, data, dsRequest) {
								isc.say(data);
                    		}, {"operationId":"CHANGE_USER_PASSWORD"});
					changePasswordDF.reset();
				}
			}),
			isc.IButton.create({
				title: "Cancel",
				click:function(){
					ChangePasswordWindow.hide();
				}
			})
		]
	})

	isc.Window.create({
		ID:"ChangePasswordWindow"
		, isModal: true
		, showModalMask: true
		, title: ("Change Password for \"" + user_id + "\"")
		, width: "30%"
		, height: "20%"
//		, layoutMargin:10
//		, autoSize: true
		, items: 
		[
// 	        isc.TitleLabel.create({ contents: "<p><b><font size=2px>My Profile<br /></font></b></p>"}),
    		changePasswordDF
	        , changeUserPasswordButtonHLayout
		],
		show:function(){
//			myAccProfileVM.setData({"id" : 1 });
			this.Super('show', arguments);
		}
	});

}

function open_ChangePasswordWindow(user_id, old_password){

	changePasswordControl(user_id, old_password);
	ChangePasswordWindow.show();

}
