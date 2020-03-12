/***************************************************************************************************************
* Qualified Name	: 	/webui/src/main/webapp/js/fsqcdb_ship/fsqcShipManagementInformationProfile.js
* @author 				Albert Chan
* @since				2019-08-02
* ************************************************************************************************************** 
* Change log:
* log no	Change complete date	Developer			Change Reason
* ======	====================	=========			=============
* 00000		2019-08-02				Albert Chan			Initial Implementation
*
* 
****************************************************************************************************************/


function fsqcShipManagementInformationProfileControl(i_dataSource, i_valuesManager, ship_record, nextManagerFlag)
{
	
	
	isc.ValuesManager.create({
        ID: "fsqcShipManagementInformationProfileVM",
		dataSource: companyManagementDS
	});

    isc.DynamicForm.create({
		ID:"fsqcShipManagementInformationProfile",
		valuesManager:"fsqcShipManagementInformationProfileVM",
		width:"80%",
		numCols: 4,
		fixedColWidths: false,
        fields: [
            //{name:"Com_cd", title:"ID", canEdit: false, disabled: true, hidden:false, required:true},
			{name: "Com_cd", 	type: "Select", startRow: true, width: "200", showTitle: true, canEdit:true
				, optionDataSource:"companyManagementDS", 
		          valueField:"Com_cd", foreignDisplayField:"Com_cd",
		          pickListFields:[
		        	  {name:"Com_cd"},
		              {name:"imo_comno"},
		              {name:"Com_name", width:550}
		          ],
		          pickListWidth:700,
	              pickListProperties: {
	            	  showFilterEditor:true,
	        		  sortField: "Com_name",
	        		  sortDirection: "ascending",
	        		  //filterOnKeypress: function(){

	        		  //}
	              },
		          
		          change: function(form, item, value, oldValue){
		        	  fsqcShipManagementInformationProfile.clearValues();
		        	  fsqcShipManagementDpaProfile.clearValues();
		        	  fsqcShipManagementCsoProfile.clearValues();
		        	  
		        	  fsqcShipManagementInformationProfile.fetchData({Com_cd:value});
		        	  fsqcShipManagementDpaProfile.fetchData({Com_cd:value});
		        	  fsqcShipManagementCsoProfile.fetchData({Com_cd:value});
		          }
			},
            {name:"Com_fileno", title:"File no"},
            {name:"imo_comno", title:"Company IMOID"},
            {name:"grading", title:"ISM Grading"},
            {name:"company_grading", title:"Company Grading"},
            //{name:"docro", title:"docro"},
            {name:"Com_name", title:"Company Name", colSpan: 3, width: "*"},            
            {name:"Address_e", title:"Correspondence Address", colSpan: 3, rowSpan: 2, width: "*", type: "textArea"},
            {name:"doc_address", title:"DOC Address", colSpan: 3, rowSpan: 2, width: "*", type: "textArea"},
            {name:"city", title:"City"},
            {name:"country", title:"Country"},
            {name:"Fax", title:"Fax"},
            {name:"Phone", title:"Phone"},
            {name:"Email", title:"Email", colSpan: 3, width: "*"},
            {name:"Person", title:"Designated Person", colSpan: 3, width: "*"},
            {name:"Address_C", title:"Chinese Address", colSpan: 3, rowSpan: 2, width: "*", type: "textArea"},
            {name:"cso", title:"Cso", hidden:true, defaultValue:[]},
            {name:"dpa", title:"Dpa", hidden:true, defaultValue:[]},
            {name:"doc", title:"Doc", hidden:true, defaultValue:[]},
            {name:"docAudit", title:"DocAudit", hidden:true, defaultValue:[]}
        ]
	});

    isc.DynamicForm.create({
		ID:"fsqcShipManagerNextStartDateForm",
		valuesManager:fsqcShipProfileVM,
		width:"80%",
		fixedColWidths: false,
        fields: [
        	{name: "Manager_next_start_date", title:"Effective Date", canEdit:true},        
        ]
	});
    
/*	isc.ControlledDynamicForm.create({
	    ID:"fsqcShipManagerSelectionCurrent",
	    //autoFocus: true,
	    dataSource: "companyManagementDS",
	    //groupTitle: "Select Management Company",
	    width: "500",
	    autoDraw:false,
	    onControl:"FSQCSHIP_WRITE||FSQC_ALL",
	    //isGroup: "true",
		valuesManager:i_valuesManager,
		padding:5,
		//numCols: 10,
		fields:
		[
			{name: "Manager", 	type: "select", startRow: false, width: "550", showTitle: false, canEdit:true
				, optionDataSource:"companyManagementDS", 
		          valueField:"Com_cd", foreignDisplayField:"Com_name",
		          pickListFields:[
		              {name:"imo_comno"},
		              {name:"Com_name", width:550}
		          ],
		          pickListWidth:700,
		          change: function(form, item, value, oldValue){
		        	  fsqcShipManagementInformationProfile.clearValues();
		        	  fsqcShipManagementDpaProfile.clearValues();
		        	  fsqcShipManagementCsoProfile.clearValues();
		        	  
		        	  fsqcShipManagementInformationProfile.fetchData({Com_cd:value});
		        	  fsqcShipManagementDpaProfile.fetchData({Com_cd:value});
		        	  fsqcShipManagementCsoProfile.fetchData({Com_cd:value});
		          }
			},
		],	
	});
	isc.ControlledDynamicForm.create({
	    ID:"fsqcShipManagerSelectionNext",
	    //autoFocus: true,
	    dataSource: "companyManagementDS",
	    //groupTitle: "Select Management Company",
	    width: "500",
	    autoDraw:false,
	    onControl:"FSQCSHIP_WRITE||FSQC_ALL",
	    //isGroup: "true",
		valuesManager:i_valuesManager,
		padding:5,
		//numCols: 10,
		fields:
		[
			{name: "Manager_next", 	type: "select", startRow: false, width: "550", showTitle: false, canEdit:true
				, optionDataSource:"companyManagementDS", 
		          valueField:"Com_cd", foreignDisplayField:"Com_name",
		          pickListFields:[
		              {name:"imo_comno"},
		              {name:"Com_name", width:550}
		          ],
		          pickListWidth:700,
		          change: function(form, item, value, oldValue){
		        	  fsqcShipManagementInformationProfile.clearValues();
		        	  fsqcShipManagementDpaProfile.clearValues();
		        	  fsqcShipManagementCsoProfile.clearValues();
		        	  
		        	  fsqcShipManagementInformationProfile.fetchData({Com_cd:value});
		        	  fsqcShipManagementDpaProfile.fetchData({Com_cd:value});
		        	  fsqcShipManagementCsoProfile.fetchData({Com_cd:value});
		          }
			},
		],	
	});
*/
	var addBtn = isc.ISaveButton.create({ 
		name: "addBtn",
	    defaultLayoutAlign: "right",
	  	layoutAlign: "right",
		autoFit: true, 
		disabled: false, 
		onControl:"FSQC_ALL",
    	click : function () {
    		
			//Save Management Company
			companyManagementDS.updateData(fsqcShipManagementInformationProfile.getValues(), 
					function (dsResponse, data, dsRequest){
					  	if(dsResponse.status==0){
					  		open_fsqcShipManagementInformationProfile(i_dataSource, i_valuesManager, ship_record, nextManagerFlag);
					  		enabledSection(true);
					  		isc.say(saveSuccessfulMessage);
//					  		fsqcShipManagementInformationProfileVM.reset();
					  	}
					}
			);

    		if(nextManagerFlag){

/*    			if(!isEmpty(fsqcShipManagementDpaProfile.getValues())){
        			fsqcShipManagementInformationProfile.setValue('dpa', fsqcShipManagementDpaProfile.getValues());
    			}
    			if(!isEmpty(fsqcShipManagementDpaProfile.getValues())){
        			fsqcShipManagementInformationProfile.setValue('sco', fsqcShipManagementCsoProfile.getValues());
    			}
*/

				//Save Ship
    			fsqcShipProfileVM.setValue('Manager_next', fsqcShipManagementInformationProfile.getValue('Com_cd'));
    			fsqcShipProfileVM.setValue('sco_next', fsqcShipManagementCsoProfile.getValue('csoname'));
    			fsqcShipProfileVM.setValue('dpa_next', fsqcShipManagementDpaProfile.getValue('dpaname'));
    			//fsqcShipProfileVM.setValue('Manager_next_start_date', fsqcShipManagementInformationProfile.getValue('Com_cd'));
    			
    			
    			fsqcShipProfileVM.setValue('sco_next_start_date', fsqcShipProfileVM.getValue('Manager_next_start_date'));
    			fsqcShipProfileVM.setValue('dpa_next_start_date', fsqcShipProfileVM.getValue('Manager_next_start_date'));
    			//fsqcShipProfileVM.setValue('Manager_next_start_date', new Date(fsqcShipProfileVM.getValue('Manager_next_start_date')));
				
    			console.log(fsqcShipProfileVM.getValue('Manager_next_start_date'));
    			console.log(fsqcShipProfileVM.getValues());
				fsqcShipDS.updateData(fsqcShipProfileVM.getValues());

				//if(fsqcShipProfileVM.validate()){	
					//fsqcShipDS.updateData(fsqcShipProfileVM.getValues());
				//}

    		}else{
    			
/*    			if(!isEmpty(fsqcShipManagementDpaProfile.getValues())){
        			fsqcShipManagementInformationProfile.setValue('dpa', fsqcShipManagementDpaProfile.getValues());
    			}
    			if(!isEmpty(fsqcShipManagementDpaProfile.getValues())){
        			fsqcShipManagementInformationProfile.setValue('sco', fsqcShipManagementCsoProfile.getValues());
    			}
*/
    			
				//Save Ship
    			fsqcShipProfileVM.setValue('Manager', fsqcShipManagementInformationProfile.getValue('Com_cd'));
    			fsqcShipProfileVM.setValue('sco', fsqcShipManagementCsoProfile.getValue('csoname'));
    			fsqcShipProfileVM.setValue('dpa', fsqcShipManagementDpaProfile.getValue('dpaname'));
    			
				if(fsqcShipProfileVM.validate()){	
					fsqcShipDS.updateData(fsqcShipProfileVM.getValues());
					console.log(fsqcShipProfileVM.getValues());
				}
    		}
    			//fsqcShipManagementInformationProfile.saveData(); //save

				//fsqcShipManagementCsoProfile.saveData(); //save
				//fsqcShipManagementDpaProfile.saveData(); //save
			
				//companyManagementCsoDS.updateData(fsqcShipManagementCsoProfile.values);
				//companyManagementDpaDS.updateData(fsqcShipManagementDpaProfile.values);
    	}
    });

	var dummy_label = isc.Label.create({
//	    height: 30,
//	    padding: 10,
	  	width: "80%",
	    align: "center",
	    valign: "center",
	    wrap: false,
	    //showEdges: true,
	    contents: ""
	})
	
  	var shipManagementInformationManagement_ToolBar = isc.HLayout.create({
	  	height:"5%",
	  	width: "20%",
	  	layoutAlign: "right",
		members: [
//	isc.ButtonToolbar.create({
//  		ID:"shipManagementInformationManagement_ToolBar",
//  		buttons: 
//  		[
  			isc.IButton.create({name:"allBtn", title:"All managed ships", autoFit: true, 
  				click : function () {
  					var Com_cd = fsqcShipManagementInformationProfileVM.getValue("Com_cd");
  					open_fsqcShipManagementAll(i_dataSource, Com_cd);
  				}
  			}),
  			addBtn,
  			isc.IButton.create({name:"closeBtn", title:"Close", autoFit: true, 
  				click : function () {
  					  			
  					if(fsqcShipManagementInformationProfileVM.valuesHaveChanged()){
						  isc.ask("Unsaved edited data. Continue to next page?", function (value){
							  if(value){
			  						fsqcShipManagementInformationProfileVM.setValues({});
			  	  					fsqcShipManagementInformationProfileVM.setData({});
			  	  					fsqcShipManagementInformationProfileVM.reset();
			  	  					fsqcShipManagementInformationProfileVM.clearErrors(true);
			  	  					
			  	  					fsqcShipManagementDpaProfileVM.setValues({});
			  	  					fsqcShipManagementDpaProfileVM.setData({});
			  	  					fsqcShipManagementDpaProfileVM.reset();
			  	  					fsqcShipManagementDpaProfileVM.clearErrors(true);

			  	  					fsqcShipManagementCsoProfileVM.setValues({});
			  	  					fsqcShipManagementCsoProfileVM.setData({});
			  	  					fsqcShipManagementCsoProfileVM.reset();
			  	  					fsqcShipManagementCsoProfileVM.clearErrors(true);

			  	  					fsqcShipManagementInformationProfileWindow.hide();
							  }
						  })
					}else{
  						fsqcShipManagementInformationProfileVM.setValues({});
  	  					fsqcShipManagementInformationProfileVM.setData({});
  	  					fsqcShipManagementInformationProfileVM.reset();
  	  					fsqcShipManagementInformationProfileVM.clearErrors(true);
  	  					
  	  					fsqcShipManagementDpaProfileVM.setValues({});
  	  					fsqcShipManagementDpaProfileVM.setData({});
  	  					fsqcShipManagementDpaProfileVM.reset();
  	  					fsqcShipManagementDpaProfileVM.clearErrors(true);

  	  					fsqcShipManagementCsoProfileVM.setValues({});
  	  					fsqcShipManagementCsoProfileVM.setData({});
  	  					fsqcShipManagementCsoProfileVM.reset();
  	  					fsqcShipManagementCsoProfileVM.clearErrors(true);

  	  					fsqcShipManagementInformationProfileWindow.hide();
					}
  					
  				}
  			}),
  		]
  	});
  	
  	var shipManagementInformationManagement_ToolBarLayout = isc.HLayout.create({
	  	height:"5%",
	  	layoutAlign: "right",
		members: [
			dummy_label,
			shipManagementInformationManagement_ToolBar
//			isc.IButton.create({
//				title: "All managed ships", autoFit: true, 
//				click : function () {
//					var Com_cd = fsqcShipManagementInformationProfileVM.getValue("Com_cd");
//					open_fsqcShipManagementAll(i_dataSource, Com_cd);
//				}
//			}),
//			isc.IButton.create({
//				title: "Update", autoFit: true, onControl:"FSQC_ALL",
//				click : function () {
//					fsqcShipManagementInformationProfile.saveData(); //save
//				}
//			}),
//			isc.IButton.create({
//				title: "Close", autoFit: true, 
//				click : function () {
//					fsqcShipManagementInformationProfileVM.setValues({});
//					fsqcShipManagementInformationProfileVM.setData({});
//					fsqcShipManagementInformationProfileVM.reset();
//					fsqcShipManagementInformationProfileVM.clearErrors(true);
//					
//					fsqcShipManagementDpaProfileVM.setValues({});
//					fsqcShipManagementDpaProfileVM.setData({});
//					fsqcShipManagementDpaProfileVM.reset();
//					fsqcShipManagementDpaProfileVM.clearErrors(true);
//
//					fsqcShipManagementCsoProfileVM.setValues({});
//					fsqcShipManagementCsoProfileVM.setData({});
//					fsqcShipManagementCsoProfileVM.reset();
//					fsqcShipManagementCsoProfileVM.clearErrors(true);
//
//					fsqcShipManagementInformationProfileWindow.hide();
//				}
//			}),
			]
	});

  	if(nextManagerFlag){
  		shipManagementInformationManagement_ToolBarLayout.addMember(fsqcShipManagerNextStartDateForm, 1);
  	}
  	
  	isc.ValuesManager.create({
        ID: "fsqcShipManagementDpaProfileVM",
		dataSource: companyManagementDpaDS
	});

    isc.DynamicForm.create({
		ID:"fsqcShipManagementDpaProfile",
		dataSource: companyManagementDpaDS,
		valuesManager:"fsqcShipManagementDpaProfileVM",
		width:"80%",
		numCols: 4,
		fixedColWidths: false,
        fields: [
            {name:"Com_cd", title:"ID",  width:50, hidden:true},
            {name:"serial", title:"Serial", width:40, canEdit:false, disabled: true},
            {name:"dpaname", title:"Designated Person"},
            {name:"dpamail", title:"Designated Person's Email", width:300},
            {name:"dpaphone", title:"Designated Person's Phone"},
            {name:"dpamobile", title:"Mobile Phone"},
            {name:"dpafax", title:"Designated Person's Fax"},
            {name:"remaks", title:"Remarks", type:"textArea", colSpan: 3, width:"*"},
        ],
        valuesHaveChanged: function(){
        	        	        	
			var dpa_list = fsqcShipManagementInformationProfileVM.getValue("dpa");
			
	        for (var i = 0; i < dpa_list.length; i++) {
	        	if (dpa_list[i].serial == this.getValue('serial')){
	        		dpa_list[i].dpaname = this.getValue('dpaname');
	        		dpa_list[i].dpamail = this.getValue('dpamail');
	        		dpa_list[i].dpaphone = this.getValue('dpaphone');
	        		dpa_list[i].dpamobile = this.getValue('dpamobile');
	        		dpa_list[i].dpafax = this.getValue('dpafax');
	        		dpa_list[i].remaks = this.getValue('remaks');
	        	}
	        }
	        fsqcShipManagementInformationProfileVM.setValue('dpa', dpa_list);
        	
        },
	});

	isc.ControlledDynamicForm.create({
	    ID:"fsqcShipManagerSetCsoDpa",
	    //autoFocus: true,
	    dataSource: "companyManagementDS",
	    //groupTitle: "Select Management Company",
	    width: "100",
	    autoDraw:false,
	    onControl:"FSQCSHIP_WRITE||FSQC_ALL",
	    //isGroup: "true",
		valuesManager:i_valuesManager,
		padding:5,
		fields:
		[
			{name: "setCsoBtn", type:"button", title:"Set CSO / DPA to Ships", startRow: false, endRow:false, colSpan: 1,
				click : function (){
					
					//console.log(fsqcShipManagementInformationProfileVM.valuesHaveChanged());

  					if(fsqcShipManagementInformationProfileVM.valuesHaveChanged()){
						  isc.say("Unsaved edited data. Please Save first.");
 					}else{
 						var Com_cd = fsqcShipProfileVM.getValue('Manager');
 	  					open_fsqcShipSetCSPDPA(i_dataSource, Com_cd, nextManagerFlag, fsqcShipManagementCsoProfileVM.getValue('serial'), fsqcShipManagementDpaProfileVM.getValue('serial'));
 					}
					
				}
			}
		],	
	});
	
	isc.ButtonToolbar.create({
		ID:"shipManagementDpaManagement_ToolBar",
		buttons: 
		[

/*			{name:"setDpaBtn", title:"Set DPA to Ships", autoFit: true, onControl:"FSQC_ALL",
				click : function () {
					var dpa_list = fsqcShipManagementInformationProfileVM.getValue("dpa");
					var dpa_record = dpa_list[current_dpa_index];
					ship_record_for_management_information.dpa = dpa_record.dpaname.trim(); 
					fsqcShipProfileVM.setValue("dpa", ship_record_for_management_information.dpa);
					fsqcShipProfileVM.saveData();
				}
			},
*/			{ 
				name:"firstDpaBtn", 
				title:"<<", 
				autoFit: true, onControl:"FSQC_ALL",
				//icon:"double_arrow_left.png",
				click : function () {
					var dpa_list = fsqcShipManagementInformationProfileVM.getValue("dpa");
					if (dpa_list.length > 0) {
						current_dpa_index = 0;
						var dpa_record = dpa_list[current_dpa_index];
						fsqcShipManagementDpaProfile.setValues(dpa_record);
					}
				}
			},
			{ 
				name:"previousDpaBtn", 
				title:"<", autoFit: true, onControl:"FSQC_ALL",
				//icon:"arrow_left.png",
				click : function () {
					var dpa_list = fsqcShipManagementInformationProfileVM.getValue("dpa");
					if (dpa_list.length > 0) {
						current_dpa_index--;
						if (current_dpa_index < 0) {
							current_dpa_index = 0;
						}
						var dpa_record = dpa_list[current_dpa_index];
						fsqcShipManagementDpaProfile.setValues(dpa_record);
					}
				}
			},
			{name:"nextDpaBtn", title:">", autoFit: true, onControl:"FSQC_ALL",
				click : function () {
					var dpa_list = fsqcShipManagementInformationProfileVM.getValue("dpa");
					if (dpa_list.length > 0) {
						current_dpa_index++;
						if (current_dpa_index >= dpa_list.length) {
							current_dpa_index = dpa_list.length - 1;
						}
						var dpa_record = dpa_list[current_dpa_index];
						fsqcShipManagementDpaProfile.setValues(dpa_record);
					}
				}
			},
			{name:"lastDpaBtn", title:">>", autoFit: true, onControl:"FSQC_ALL",
				click : function () {
					var dpa_list = fsqcShipManagementInformationProfileVM.getValue("dpa");
					if (dpa_list.length > 0) {
						current_dpa_index = dpa_list.length - 1;
						var dpa_record = dpa_list[current_dpa_index];
						fsqcShipManagementDpaProfile.setValues(dpa_record);
					}
				}
			},
			{name:"addDpaBtn", title:"Add", autoFit: true, onControl:"FSQC_ALL",
				click : function () {
					var dpa_list = fsqcShipManagementInformationProfileVM.getValue("dpa");
					var dpa_record = {};
				  	var dpa_serial_max = 0;
			        for (var i = 0; i < dpa_list.length; i++) {
			        	if (dpa_list[i].serial > dpa_serial_max){
			        		dpa_serial_max = dpa_list[i].serial;
			        	}
			        }
				  	var dpa_record = {};
				  	dpa_record['Com_cd'] = fsqcShipManagementInformationProfileVM.getValue("Com_cd");
				  	dpa_record['serial'] = dpa_serial_max + 1;
					dpa_list.push(dpa_record);
					fsqcShipManagementDpaProfile.setValues(dpa_record);
				}
			},
			{name:"deleteDpaBtn", title:"Delete", autoFit: true, onControl:"FSQC_ALL",
				click : function () {
					var dpa_list = fsqcShipManagementInformationProfileVM.getValue("dpa");
					dpa_list = dpa_list.splice(current_dpa_index, 1);
					fsqcShipManagementDpaProfile.setValues({});
				}
			},
		]
	});
	
  	isc.ValuesManager.create({
        ID: "fsqcShipManagementCsoProfileVM",
		dataSource: companyManagementCsoDS
	});

    isc.DynamicForm.create({
		ID:"fsqcShipManagementCsoProfile",
		dataSource: companyManagementCsoDS,
		valuesManager:"fsqcShipManagementCsoProfileVM",
		width:"80%",
		numCols: 4,
		fixedColWidths: false,
        fields: [
            {name:"Com_cd", title:"ID",  width:50, hidden:true, canEdit:false},
            {name:"serial", title:"Serial", width:40, canEdit:false, disabled: true},
            {name:"csoname", title:"Company Security Officer's Name"},
            {name:"csophone", title:"Company Security Officer's Phone"},
            {name:"csofax", title:"Company Security Officer's Fax"},
            {name:"csomobile", title:"Company Security Officer's Moblie Phone"},
            {name:"csoemail", title:"Company Security Officer's Email", width:300},
            {name:"remark", title:"Remark", type:"textArea", colSpan: 3, width:"*"},
        ],
        valuesHaveChanged: function(){        	
      	
			var cso_list = fsqcShipManagementInformationProfileVM.getValue("cso");
			
	        for (var i = 0; i < cso_list.length; i++) {
	        	if (cso_list[i].serial == this.getValue('serial')){
	        		cso_list[i].csoname = this.getValue('csoname');
	        		cso_list[i].csoemail = this.getValue('csoemail');
	        		cso_list[i].csophone = this.getValue('csophone');
	        		cso_list[i].csomobile = this.getValue('csomobile');
	        		cso_list[i].csofax = this.getValue('csofax');
	        		cso_list[i].remark = this.getValue('remark');
	        	}
	        }
	        fsqcShipManagementInformationProfileVM.setValue('cso', cso_list);
      	
        },
	});


	
	isc.ButtonToolbar.create({
		ID:"shipManagementCsoManagement_ToolBar",
		buttons: 
		[

/*			{name:"setCsoBtn", title:"Set CSO to Ships", autoFit: true, onControl:"FSQC_ALL",
				click : function () {
					var cso_list = fsqcShipManagementInformationProfileVM.getValue("cso");
					var cso_record = cso_list[current_cso_index];
					ship_record_for_management_information.cso = cso_record.csoname.trim(); 
					fsqcShipProfileVM.setValue("sco", ship_record_for_management_information.cso);
					fsqcShipProfileVM.saveData();
				}
			},
*/			{name:"firstCsoBtn", title:"<<", autoFit: true, onControl:"FSQC_ALL",
				click : function () {
					var cso_list = fsqcShipManagementInformationProfileVM.getValue("cso");
					if (cso_list.length > 0) {
						current_cso_index = 0;
						var cso_record = cso_list[current_cso_index];
						fsqcShipManagementCsoProfile.setValues(cso_record);
					}
				}
			},
			{name:"previousCsoBtn", title:"<", autoFit: true, onControl:"FSQC_ALL",
				click : function () {
					var cso_list = fsqcShipManagementInformationProfileVM.getValue("cso");
					if (cso_list.length > 0) {
						current_cso_index--;
						if (current_cso_index < 0) {
							current_cso_index = 0;
						}
						var cso_record = cso_list[current_cso_index];
						fsqcShipManagementCsoProfile.setValues(cso_record);
					}
				}
			},
			{name:"nextCsoBtn", title:">", autoFit: true, onControl:"FSQC_ALL",
				click : function () {
					var cso_list = fsqcShipManagementInformationProfileVM.getValue("cso");
					if (cso_list.length > 0) {
						current_cso_index++;
						if (current_cso_index >= cso_list.length) {
							current_cso_index = cso_list.length - 1;
						}
						var cso_record = cso_list[current_cso_index];
						fsqcShipManagementCsoProfile.setValues(cso_record);
					}
				}
			},
			{name:"lastCsoBtn", title:">>", autoFit: true, onControl:"FSQC_ALL",
				click : function () {
					var cso_list = fsqcShipManagementInformationProfileVM.getValue("cso");
					if (cso_list.length > 0) {
						current_cso_index = cso_list.length - 1;
						var cso_record = cso_list[current_cso_index];
						fsqcShipManagementCsoProfile.setValues(cso_record);
					}
				}
			},
			{name:"addCsoBtn", title:"Add", autoFit: true, onControl:"FSQC_ALL",
				click : function () {
					var cso_list = fsqcShipManagementInformationProfileVM.getValue("cso");
					var cso_record = {};
				  	var cso_serial_max = 0;
			        for (var i = 0; i < cso_list.length; i++) {
			        	if (cso_list[i].serial > cso_serial_max){
			        		cso_serial_max = cso_list[i].serial;
			        	}
			        }
				  	var cso_record = {};
				  	cso_record['Com_cd'] = fsqcShipManagementInformationProfileVM.getValue("Com_cd");
				  	cso_record['serial'] = cso_serial_max + 1;
					cso_list.push(cso_record);
					fsqcShipManagementCsoProfile.setValues(cso_record);
				}
			},
			{name:"deleteCsoBtn", title:"Delete", autoFit: true, onControl:"FSQC_ALL",
				click : function () {
					var cso_list = fsqcShipManagementInformationProfileVM.getValue("cso");
					cso_list = cso_list.splice(current_cso_index, 1);
					fsqcShipManagementCsoProfile.setValues({});
				}
			},
		]
	});
	
/*	var fsqcShipManagerSelectionBar =  isc.HLayout.create
    ({
		isGroup: "true",
		groupTitle: "Select",
		width: "700",
		height: "30%",
		layoutMargin:10,
    	members: 
    	[
    	]
    });
*/	
	var fsqcShipManagementInformationProfileTop =  isc.VLayout.create
    ({
		isGroup: "true",
		groupTitle: "Management Company",
		width: fsqcShipManagementInformationProfile.width,
		height: "30%",
		layoutMargin:10,
    	members: 
    	[
    		//fsqcShipManagerSelectionBar,
	        fsqcShipManagementInformationProfile,
	        
    	]
    });

	var fsqcShipManagerDpaBar =  isc.HLayout.create
    ({
		width: "100%",
		height: "1",
		layoutMargin:0,
    	members: 
    	[
    		fsqcShipManagerSetCsoDpa,
    		shipManagementDpaManagement_ToolBar
    	]
    });
	
	var fsqcShipManagementDpaProfileTop =  isc.VLayout.create
    ({
		isGroup: "true",
		groupTitle: "DPA Info.",
		width: fsqcShipManagementDpaProfile.width,
		height: "30%",
		layoutMargin:10,
    	members: 
    	[
	        fsqcShipManagementDpaProfile
    	]
    });

	var fsqcShipManagementCsoProfileTop =  isc.VLayout.create
    ({
		isGroup: "true",
		groupTitle: "CSO Info.",
		width: fsqcShipManagementCsoProfile.width,
		height: "30%",
		layoutMargin:10,
    	members: 
    	[
	        fsqcShipManagementCsoProfile
    	]
    });

/*	if(nextManagerFlag){
		fsqcShipManagerSelectionBar.addMember(fsqcShipManagerSelectionNext, 0);
	}else{
		fsqcShipManagerSelectionBar.addMember(fsqcShipManagerSelectionCurrent, 0);
	}
*/	
	isc.Window.create({
		ID:"fsqcShipManagementInformationProfileWindow"
		, isModal: true
		, showModalMask: true
		, width: "90%"
		, height: "90%"
//		, layoutMargin:10
//		, autoSize: true
		, items: 
		[
	        isc.VLayout.create
	        ({
	        	members: 
	        	[
//	    	        isc.TitleLabel.create({ contents: "<p><b><font size=2px>Ship main data<br /></font></b></p>"}),
	        		shipManagementInformationManagement_ToolBarLayout
	    	        , fsqcShipManagementInformationProfileTop
	    	        , fsqcShipManagerDpaBar
	    	        , fsqcShipManagementDpaProfileTop
	    	        , shipManagementCsoManagement_ToolBar
	    	        , fsqcShipManagementCsoProfileTop
	        	]
	        })
		],
		show:function(){
			fsqcShipManagementInformationProfileVM.setData({});
			this.Super('show', arguments);
		}
	});
}

var current_dpa_index = 0;
var current_cso_index = 0;

var ship_record_for_management_information;

function open_fsqcShipManagementInformationProfile(i_dataSource, i_valuesManager, ship_record, nextManagerFlag){
	//Init the Forms and ListGrids

	ship_record_for_management_information = ship_record;
	fsqcShipManagementInformationProfileControl(i_dataSource, i_valuesManager, ship_record, nextManagerFlag);

	fsqcShipManagementInformationProfileWindow.show();
	fsqcShipManagementInformationProfileWindow.setTitle("Modify or Add Management Information");

	if(ship_record!=null){
		//Update record;
		console.log("ship_record--");
		//console.log(ship_record);
		console.log(ship_record.Manager);
		console.log(ship_record.dpa);
		console.log(ship_record.sco);
		console.log(ship_record.Manager_next);
		console.log(ship_record.dpa_next);
		console.log(ship_record.sco_next);
		if(nextManagerFlag){
			var ShipManagementInformationProfileCom_cd = ship_record.Manager_next;
			var ShipManagementInformationProfiledpa = ship_record.dpa_next;
			var ShipManagementInformationProfilecso = ship_record.sco_next;
		}else{
			var ShipManagementInformationProfileCom_cd = ship_record.Manager;
			var ShipManagementInformationProfiledpa = ship_record.dpa;
			var ShipManagementInformationProfilecso = ship_record.sco;
		}
		fsqcShipManagementInformationProfileVM.fetchData(
				{
					"Com_cd":ShipManagementInformationProfileCom_cd,
				},function (dsResponse, data, dsRequest) {
					current_dpa_index = -1;
					var dpa_list = fsqcShipManagementInformationProfileVM.getValue("dpa");
					if (dpa_list) {
						for (var i = 0; i < dpa_list.length; i++) {
							var dpa_record = dpa_list[i];
							
							console.log("DPA");
							//console.log(dpa_record.dpaname.trim().length);
							//console.log(ShipManagementInformationProfilecso.trim().length);
																
							if(dpa_record.dpaname != null && dpa_record.dpaname != undefined && dpa_record.dpaname != "" && ShipManagementInformationProfiledpa != null && ShipManagementInformationProfiledpa != undefined && ShipManagementInformationProfiledpa != ""){
								console.log("IN1");
								if (dpa_record.dpaname.trim() == ShipManagementInformationProfiledpa.trim()) {
									console.log("IN2");
									fsqcShipManagementDpaProfile.setValues(dpa_record);
									current_dpa_index = i;
								}else if(ShipManagementInformationProfiledpa.trim().length > 0){
									console.log("IN3");
//									fsqcShipManagementDpaProfile.setValue('dpaname', ShipManagementInformationProfiledpa.trim());	//incorrect.
									//fsqcShipManagementDpaProfile.setValue('serial', 0);
								}
							}
						}
						if(current_dpa_index == -1)
						{
							if(ShipManagementInformationProfiledpa)
							{
								fsqcShipManagementDpaProfile.setValue('dpaname', ShipManagementInformationProfiledpa.trim());
							}
							else
							{
								fsqcShipManagementDpaProfile.setValue('dpaname', "");
							}							
						}
					}
					current_cso_index = -1;
					var cso_list = fsqcShipManagementInformationProfileVM.getValue("cso");
					if (cso_list) {
						for (var i = 0; i < cso_list.length; i++) {
							var cso_record = cso_list[i];

							//console.log(cso_record.csoname.trim().length);
							//console.log(cso_record.csoname.trim().length);
							//console.log(ShipManagementInformationProfilecso.trim().length);
							
							if(cso_record.csoname != null && cso_record.csoname != undefined && cso_record.csoname != "" && ShipManagementInformationProfilecso != null && ShipManagementInformationProfilecso != undefined && ShipManagementInformationProfilecso != ""){
								if (cso_record.csoname.trim() == ShipManagementInformationProfilecso.trim()) {
									fsqcShipManagementCsoProfile.setValues(cso_record);
									current_cso_index = i;
								}else if(ShipManagementInformationProfilecso.trim().length > 0){

									//fsqcShipManagementCsoProfile.setValue('csoname', ShipManagementInformationProfilecso.trim());	//incorrect.
									//fsqcShipManagementCsoProfile.setValue('serial', 0);
									
								}
	
							}
						}
						if(current_cso_index == -1)
						{
							if(ShipManagementInformationProfilecso)
							{
								fsqcShipManagementCsoProfile.setValue('csoname', ShipManagementInformationProfilecso.trim());
							}
							else
							{
								fsqcShipManagementCsoProfile.setValue('csoname', "");
							}
							
						}
						
					}
		});
		
			
		
//		fsqcShipManagementDpaProfileVM.fetchData(
//				{
//					"com_cd":ShipManagementInformationProfileCom_cd,
//					"dpaname":ShipManagementInformationProfiledpa
//				},function (dsResponse, data, dsRequest) {
//		});
//		
//		fsqcShipManagementCsoProfileVM.fetchData(
//				{
//					"com_cd":ShipManagementInformationProfileCom_cd,
//					"csoname":ShipManagementInformationProfilecso
//				},function (dsResponse, data, dsRequest) {
//		});
		
		enabledSection(true);

	}else{
		//New record;
		fsqcShipManagementInformationProfileVM.setValues({});
		fsqcShipManagementInformationProfileTop.clearErrors(true);
		enabledSection(false);
	}
}

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

