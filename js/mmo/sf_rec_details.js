isc.DynamicForm.create({
	ID:"sfRecFormDetail",
	dataSource: "seafarerDS",
//	cellBorder:1,
	numCols: 8,	
	colWidths: ["1", "1", "1", "1", "1", "1", "1", "1"],
	fields: [
		{name: "partType", title:"Part Type", type: "radioGroup", valueMap: {"1":"Part 1", "2":"Part 2"}, colSpan: 3, vertical: false},
		{name: "serbNo", title:"SERB No.", type: "staticText", startRow: false, width: 70},
//		{name: "serb_photo", title: "photo", type: "button", startRow: false, endRow: false, width: 70},
//		{name: "serb_thumbs", title: "thumbs", type: "button", startRow: false, endRow: false, width: 70},
		{name: "surname", 	title:"Surname",	startRow: true, required: true, colSpan: 3, width: 180},
		{name: "firstName", title:"First Name",	startRow: false, required: true, colSpan: 2, width: 140},
		
		{name: "chiName", 	title:"Chinese Name",	startRow: true, colSpan: 3, width: 180},
		{name: "nationalityId", title: "Nationality", type: "text", startRow: false, width: 140,	colSpan: 2,
			optionDataSource:"nationalityDS", valueField:"id", displayField:"engDesc", allowEmptyValue:true
		},
		
		{name: "ccc1", title: "CCC Code", type: "text", startRow: true, width: 70, colSpan: 1},
		{name: "ccc2", showTitle: false, type: "text", startRow: false, width: 70, colSpan: 1},
		{name: "ccc3", showTitle: false, type: "text", startRow: false, width: 70, colSpan: 1},
		{name: "ccc4", showTitle: false, type: "text", startRow: false, width: 70, colSpan: 1},
		
		//				{name: "nationalityEngDesc", title: "Nationality", showTitle: false, type: "text", startRow: false, width: 120},
		{name: "province", title:"Province", allowEmptyValue:true,  startRow: false, width: 170, colSpan:4, hidden:true},
		{name: "serialPrefix", title: "Serial No.", type: "text", width: 50, startRow:true},
		{name: "serialNo", title: "Serial No", showTitle: false, type: "text", colSpan: 2, startRow: false, width: 140},
		
		{name: "id", title: "HKID", editorType: "TextItem", required: true, startRow: true, colSpan: 3},
		{name: "sex", title: "Sex", type: "radioGroup", valueMap: {"M":"Male", "F":"Female"}, vertical:false, startRow: true, colSpan: 2},
		
		{name: "birthDate", title:"Birth Date", useTextField:true, inputFormat:"DMY", dateFormatter:"toEuropeanShortDate",startRow: true, colSpan: 2}, 
		{name: "birthPlace", title: "Birth Place", allowEmptyValue:true, type: "select", valueMap: ["Hong Kong", "China", "Taiwan", "Signapore"], colSpan: 2},

		{name: "birthCert", title:"Birth Cert.", startRow: true, colSpan: 2},
		{name: "martialStatus", title: "Martial Status", valueMap: {"SINGLE":"Single", "MARRIED":"Married", "WIDOWED":"Widowed", "DIVORCED":"Divorced"}, allowEmptyValue:true, type: "select", colSpan: 2},
//		{name: "passportNo", title: "Passport No", type: "text", startRow: true, colSpan: 2},
//		{name: "sibNo", title:"SIB No.", colSpan: 2},
		{name: "telephone", title:"Telephone", startRow: true, colSpan: 5, width:350},
//		{name: "mobile", title: "Mobile", type: "text", colSpan: 2}, 
		
		{name: "address1", title: "Address", type: "text", startRow: true, colSpan: 8, width: 400},
		{name: "address2", title: " ", startRow: true, colSpan: 8, width: 400},
		{name: "address3", title: " ", startRow: true, colSpan: 8, width: 400},
		
		{name: "mailAddress1", title: "Mail Address", type: "text", startRow: true, colSpan: 8, width: 400},
		{name: "mailAddress2", title: " ", type: "text", startRow: true, colSpan: 8, width: 400},
		{name: "mailAddress3", title: " ", type: "text", startRow: true, colSpan: 8, width: 400}
]
});

//Upload Photo Window - start
isc.DynamicForm.create({
	ID:"sfPhotoCanvas",  dataSource: "dmsDataDS", backgroundColor :"lightgrey", width:300, height:400, colWidths:[0, 300],
	fields:[
	        {name:"id", 		showIf:"false"},
	        {name:"name", 		showIf:"false"},
	        {name:"content", 	title:"", type:"imageFile", showFileInline:true, canEdit:false, colSpan:1, rowSpan:10, width:290, height:390},
	        ]
	
});

isc.DynamicForm.create({
	ID:"sfFingerprintCanvas", dataSource: "dmsDataDS", backgroundColor :"lightgrey", width:300, height:400, colWidths:[0, 300],
	fields:[
	        {name:"id", 		showIf:"false"},
	        {name:"name", 		showIf:"false"},
	        {name:"content", 	title:"", type:"imageFile", showFileInline:true, canEdit:false, colSpan:1, rowSpan:10, width:290, height:390},
	        ]
});


isc.HLayout.create({
	ID:"sfRecHLayout", membersMargin:5, members:[sfRecFormDetail, sfPhotoCanvas, sfFingerprintCanvas]
});

isc.Window.create({
	ID:"uploadSeafarerPhotoWindow", isModal: true, showModalMask: true, width: 480, height: 300, layoutMargin:10, title:"Upload Photo",
	items: [ 
	        isc.VLayout.create({ 
	        	members: [ 
	        	          isc.Img.create({width:"100%", height:"*", border:"1px solid gray", imageType: "normal", src: "#", ID:"imgPreview"}),
	        	          isc.DynamicForm.create({
	        	        	  ID:"uploadSeafarerPhotoDynamicForm", dataSource: "dmsDataDS", width:"95%", numCols:3, cellBorder:0, colWidths: ["50", "*", "80"], height:20,
	        	        	  fields:[
	        	        	          {name:"id", 		showIf:"false"},
	        	        	          {name:"name", 	showIf:"false"},
	        	        	          {name:"type", 	showIf:"false", value:"photo"},
	        	        	          {name:"content", 	title:"Photo", type:"imageFile", accept:"image/*", canEdit:true, required:true, width:"*", startRow:true, endRow:false,
	        	        	        	  click:function(){
	        	        	        		console.log("------->");  
	        	        	        	  },
	        	        	        	  changed:function(form, item, value){
	        	        	        		  var uFiles = item.uploadItem.$14x.files
	        	        	        		  if(uFiles && uFiles[0]) {
	        	        	        	            var reader = new FileReader();
	        	        	        	            reader.onload = function (e) {
	        	        	        	            	imgPreview.setSrc(e.target.result);
	        	        	        	            }
	        	        	        	            reader.readAsDataURL(uFiles[0]);
	        	        	        	            uploadSeafarerPhotoDynamicForm.getField('updatePhotoFormSaveButton').setDisabled(false);
	        	        	        	        }
	        	        	        	  }
	        	        	          },
	        	        	          {name:"updatePhotoFormSaveButton", title: "Save", type: "button", startRow:false, width:70,
	        	        	        	  click: function (form, item) {
	        	        	        		  form.saveData(function(dsResponse, data, dsRequest){
	        	        	        			  if(dsResponse.status==0){
	        	        	        				  isc.say("Update Photo successfully!");
	        	        	        			  }else{
	        	        	        				  isc.warn("Update Photo fail!");
	        	        	        			  }
	                                            }
	                                           );
	        	        	        	  }
	        	        	          }
	        	        	          ]
	        	          })
	        	          ]
	        })
	        ],
	  show:function(){
		  this.Super('show', arguments);
		  imgPreview.setSrc('');
		  var seafarerId = sfRecFormDetail.getValue('id');
		  uploadSeafarerPhotoDynamicForm.setValues({id:seafarerId});
		  uploadSeafarerPhotoDynamicForm.getField('updatePhotoFormSaveButton').setDisabled(true);
	  }      
});
//Upload Photo Window - End

//Upload Fingerprint Window - Start
isc.Window.create({
	ID:"uploadSeafarerFingerprintWindow", isModal: true, showModalMask: true, width: 320, height: 340, layoutMargin:10, title:"Upload Fingerprint",
	items: [ 
			isc.VLayout.create({ 
				members: [ 
				          isc.Img.create({width:"100%", height:"*", border:"1px solid gray", imageType: "normal", src: "#", ID:"fingerprintImgPreview"}),
				          isc.DynamicForm.create({
				        	  ID:"uploadSeafarerFingerprintDynamicForm", width:"100%", numCols:6, cellBorder:0, colWidths: ["50", "50", "50", "50", "50", "50", "*"],
				        	  fingerprintHttpServer:"http://127.0.0.1:15271/fpoperation", //TODO
				        	  fields:[
				        	          {name:"id", 		showIf:"false"},
	        	        	          {name:"name", 	showIf:"false"},
	        	        	          {name:"type", 	showIf:"false", value:"fingerprint"},
	        	        	          
				        	          {name:"lfd", 		title:"LFD", 	type:"checkbox", labelAsTitle:true, width:50},
				        	          {name:"invert", 	title:"Invert", type:"checkbox", labelAsTitle:true, width:50},
				        	          
				        	          {name:"captureButton", 	title:"Capture", type:"button", startRow:false, endRow:false,
				        	        	  click:function(form, item){
				        	        		  fingerprintImgPreview.setSrc('');
				        	        		  form.beginOperation(form, 'capture');
				        	        	  }
				        	          },
				        	          {name:"saveButton", 		title: "Save", 	type: "button", startRow:false, endRow:true,
				        	        	  click:function(form, item) {
				        	        		  form.saveData(function(dsResponse, data, dsRequest){
				        	        			  if(dsResponse.status==0){
	        	        	        				  isc.say("Update Fingerprint successfully!");
	        	        	        			  }else{
	        	        	        				  isc.warn("Update Fingerprint fail!");
	        	        	        			  }
			                                    }
			                                   );
				        	        	  }
				        	          },
				        	          {name:"status", 	showTitle:false, type:"staticText", width:"*", colSpan:6, width:"*", startRow:true}
				        	         ],
				        	  beginOperation:function(form, opName){
				        		  var json = JSON.stringify({operation: opName, lfd: ( form.getValue('lfd')==true ? "yes" : "no" ), invert: ( form.getValue('invert')==true ? "yes" : "no" )});
				        		  form.enableControlsForOp(form, true);
				        		  var req = new XMLHttpRequest();
				        		  req.open("POST", form.fingerprintHttpServer);
				        		  req.setRequestHeader('Content-type', 'application/json; charset=utf-8');
				        		  
				        		  req.onload = function() {
				        		      if(req.status == 200) {
				        		    	  form.setValue('status', "Operation begin.");
				        		    	  form.parseOperationDsc(form, JSON.parse(req.response));
				        		      }
				        		      else {
				        		    	  form.setValue('status', "Server response-("+req.statusText+")");
				        		    	  form.enableControlsForOp(form, false);
				        		      }
				        		  };
				        		  req.onerror = function() {
				        			  form.setValue('status', "Fingerprint Server not available!");
				        			  form.enableControlsForOp(form, false);
				        		  };
				        		  req.send(json);
				        	  },
				        	  enableControlsForOp:function(form, opBegin){
				        		  form.getField('captureButton').setDisabled(opBegin);
				        	  },
				        	  parseOperationDsc:function(form, opDsc) {
				        		    var res = true;

				        		    if(opDsc.state == 'done') {
				        		        form.enableControlsForOp(form, false);
				        		        if(opDsc.status == 'success') {
				        		        	form.setValue('status', "Success: "+opDsc.message + ", NFIQ: " + opDsc.nfiq);
				        					if(opDsc.operation == 'capture' ){
				        						form.linkOperationImage(form, opDsc.id);
				        						uploadSeafarerFingerprintDynamicForm.getField('saveButton').setDisabled(false);
				        					}
				        		        }
				        		        if(opDsc.status == 'fail') {
				        		            form.setValue('status', "Fail: "+opDsc.errorstr);
				        		            res = false;
				        		            
				        		            if(parseInt(opDsc.errornum) != -1) {
				        		                deleteOperation(form, opDsc.id);
				        		            }
				        		        }
				        		    }
				        		    else if(opDsc.state == 'init') {
//				        				lastInitOp = opDsc.id
				        		        setTimeout(form.getOperationState, 1000, opDsc.id);
				        		        setTimeout(form.getOperationImg, 1000, opDsc.id, parseInt(opDsc.devwidth), parseInt(opDsc.devheight));
				        		    }
				        		    else if(opDsc.state == 'inprogress')
				        		    {
				        		        if(opDsc.fingercmd == 'puton') {
				        		            isc.say("Put finger on scanner");
				        		        }

				        		        if(opDsc.fingercmd == 'takeoff') {
				        		            isc.say("Take off finger from scanner");
				        		        }
				        		        setTimeout(form.getOperationState, 1000, form, opDsc.id);
				        		        setTimeout(form.getOperationImg, 1000, form, opDsc.id, parseInt(opDsc.devwidth), parseInt(opDsc.devheight));
				        		    }
				        		    return res;
				        		},
				        		linkOperationImage:function(form, opId){
				        			var target = "/image";
				        		    var saveAs = "image.bin"
				        		    var resultText = "Result raw image"
				        		    var url = form.fingerprintHttpServer + '/' + opId + target;
//				        		    http://127.0.0.1:15271/fpoperation/1/image
				        		    
//				        		    fingerprintImgPreview.src = url;
				        		    fingerprintImgPreview.download = saveAs;
				        		    fingerprintImgPreview.innerHTML = resultText;
				        		    fingerprintImgPreview.setSrc(url);
				        		},
				        		getOperationState:function(form, opId) {
				        		    var url = form.fingerprintHttpServer + '/' + opId;
				        		    var req = new XMLHttpRequest();
				        		    req.open('GET', url);    
				        		    req.onload = function() {
				        		      if (req.status == 200) {
				        				if( req.readyState == 4 ) {
				        					form.parseOperationDsc(JSON.parse(req.response));
				        				}
				        		      }
				        		      else {
				        				form.setValue('status', "Server response-("+req.statusText+")");
				        				form.enableControlsForOp(form, false);
				        		      }
				        		    };
				        		    req.onerror = function() {
				        		    	form.setValue("Status", "Fingerprint Server not available!");
				        				form.enableControlsForOp(form, false);
				        		    };
				        		    req.send();
				        		},
				        		getOperationImg:function(form, opId, frameWidth, frameHeight) {
				        		    var url = form.fingerprintHttpServer + '/' + opId + '/image';
				        		    var req = new XMLHttpRequest();
				        		    req.open('GET', url);    
				        		    req.onload = function() {
				        		      if (req.status == 200) {		
//				        		        drawFingerFrame(new Uint8Array(req.response), opId, frameWidth, frameHeight); //TODO
				        		      }else {
				        		    	  form.enableControlsForOp(form, false);
				        		      }
				        		    };
				        		    req.onerror = function() {
				        		    	form.enableControlsForOp(form, false);
				        		    };
				        		    req.send();    
				        			req.responseType = "arraybuffer";
				        		},
				        		deleteOperation:function(form, opId){
				        			var url = form.fingerprintHttpServer + '/' + opId;
				        			var req = new XMLHttpRequest();
				        		    req.open("DELETE", url);
				        		    req.onload = function() {
				        		    if (req.status == 200){
				        		    	//TODO noting to do.
				        		    }else {
				        		        form.setValue('status', "Server response-("+req.statusText+")");
				        		      }
				        		    };
				        		    req.onerror = function(){
				        		      form.setValue('status', "Fingerprint Server not available!");
				        		    };
				        		    req.send();
				        		}
				        	  
				          })
				          ]
			})
		],
    show:function(){
 		this.Super('show', arguments);
 		fingerprintImgPreview.setSrc('');
 		uploadSeafarerFingerprintDynamicForm.setValues({});
 		
 		var seafarerId = sfRecFormDetail.getValue('id');
 		uploadSeafarerFingerprintDynamicForm.setValues({id:seafarerId});
 		uploadSeafarerFingerprintDynamicForm.getField('saveButton').setDisabled(true);
	  	}  
});
//Upload Fingerprint Window - End



isc.ButtonToolbar.create({
	ID:"sfRecFormButton_ToolBar", 
	buttons: [
			  {name:"uploadFingerprintBtn", title:"Upload Fingerprint", autoFit: true, onControl:"MMO_CREATE|MMO_UPDATE", 
				  click : function () { 
					  uploadSeafarerFingerprintWindow.show();
					  }
			  }, 
			  {name:"uploadPhotoBtn", title:"Upload Photo", autoFit: true, onControl:"MMO_CREATE|MMO_UPDATE",
				  click : function () { 
					  uploadSeafarerPhotoWindow.show();
				  }
			  }, 
	          {name:"saveBtn", title:"Save", autoFit: true, onControl:"MMO_CREATE|MMO_UPDATE",
	        	  click : function () { 
	        		  if(sfRecFormDetail.validate()){
	        			  sfRecFormDetail.saveData(
	        					  function (dsResponse, data, dsRequest) {
	        						  if(dsResponse.status==0){
	        							  isc.say(saveSuccessfulMessage);
//	        						  sfRecFormDetail.setValues(data);
	        							  enabledSection(true);
	        						  }
	        					  }
	        			  );
	        		  }
	        	  }
	          }, 
	          {name:"resetBtn", title:"Reset", autoFit: true, 
	        	  click : function () { 
	        		  sfRecFormDetail.resetValues();
	        	  }
	          }, 
	          {name:"closeBtn", title:"Close", autoFit: true, 
	        	  click : function () { 
	        		sfRecFormDetail.setValues({});
	        		sfRecFormDetail.setData({});
	        		sfRecFormDetail.reset();
	        		sfRecFormDetail.clearErrors(true);
	        		  //TODO
//	        		sfRegListGrid.setData([]);
//	      			sfRecFormNextOfKin.setData([]);
//	      			sfRecFormMedical.setData([]);
//	      			sfRecFormSeaService.setData([]);
//	      			sfRecFormEmployment.setData([]);
//	      			sfRecFormRating.setData([]);
//	      			sfRecFormDisc.setData([]);
//	      			sfPreviousSerbListGrid.setData([]);
	        		  
	        		  SeafarerDetailWindow.hide();
	        	  }
	          }
	          
	          ]
});


isc.SectionStack.create({
	ID:"sfRecSectionContent", overflow : "auto", alwaysShowScrollbars:false,
	expandSection:function(sections){
		this.Super('expandSection', arguments);
		var secTitle = sections.title;
		if('Personal Information'!=secTitle){
			var resultLG = sfRecSectionContent.getSection(sections.name).items[0].members[0];
			if('ListGrid'==resultLG.getClassName()){
				resultLG.refresh();
			}
		}
	},
	sections: [
	           {name:"seafarerPersonInfo", 	title: "Personal Information", 	resizeable: false, items: [ sfRecHLayout, sfRecFormButton_ToolBar ]},
	           {name:"seafarerReg", 		title: "Registration",			resizeable: false, items: [ seafarerRegLayout ]},
	           {name:"seafarerNextOfKin", 	title: "Next-of-Kin",  			resizeable: false, items: [ seafarerNextOfKinLayout ]},
	           {name:"seafarerMedical",		title: "Medical", 				resizeable: false, items: [ seafarerMedicalLayout ]},
	           {name:"seafarerTrainingCourse",	title: "Training Course", 	resizeable: false, items: [ seafarerCourseLayout ]},
	           {name:"seafarerCert",		title: "Cert/License", 			resizeable: false, items: [ seafarerCertLayout ]},
	           {name:"seafarerSeaService",	title: "Sea Service", 			resizeable: false, items: [ seafarerSeaServiceLayout ]},
	           {name:"seafarerEmployment",	title: "Employment", 			resizeable: false, items: [ seafarerEmploymentLayout ]},
	           {name:"seafarerRank",		title: "Rank/Rating", 			resizeable: false, items: [ seafarerRatingLayout ]}, 
	           {name:"seafarerSerb",		title: "Previous SERB Record", 	resizeable: false, items: [ seafarerPrevSerbLayout ]},
	           {name:"seafarerDisciplinary",	title: "Disciplinary", 		resizeable: false, items: [ seafarerDiscLayout ]}
	         ]

});

isc.Window.create({
	ID:"SeafarerDetailWindow", isModal: true, showModalMask: true, width: 1200, height: 800, layoutMargin:10,
	items: [ 
	        isc.VLayout.create({ 
	        	members: [ 
	        	        isc.TitleLabel.create({ID:"sfRecSectionTitle", contents: "<p><b><font size=2px>Maintain Seafarer Record <br /></font></b></p>"}), 
	        	        sfRecSectionContent 
	        	      ]
	        })
	        ],
	show:function(){
		sfRecFormDetail.setData({});
		sfPhotoCanvas.setData(null);
		this.Super('show', arguments);
		sfFingerprintCanvas.setData(null);
		sfRecSectionContent.collapseSection([1,2,3,4,5,6,7,8,9,10]);
		
	}
	        
});

function openSfRecDetail(record){
	//Init the Forms and ListGrids

	SeafarerDetailWindow.show();
	
	if(record!=null){
		//Update record;
		sfRecFormDetail.getField('id').setDisabled(true);
		var seafarerId = record.id;
		sfRecFormDetail.fetchData({"id":seafarerId},function (dsResponse, data, dsRequest) {
			SeafarerDetailWindow.setTitle("Seafarer Detail (ID: " + seafarerId + " )");
			
//			Note: refresh while click
//			sfRegListGrid.refresh();
//			sfRecFormNextOfKinLG.refresh();
//			sfRecFormMedicalLG.refresh();
//			sfRecFormSeaServiceLG.refresh();
//			sfRecFormEmploymentLG.refresh();
//			sfRecFormRatingLG.refresh();
//			sfRecFormDiscLG.refresh();
//			sfPreviousSerbListGrid.refresh();
		});
		
		sfRecFormButton_ToolBar.getButton('uploadFingerprintBtn').setDisabled(false);
		sfRecFormButton_ToolBar.getButton('uploadPhotoBtn').setDisabled(false);
		
		enabledSection(true);
		
		sfPhotoCanvas.fetchData({"id":seafarerId, "type":"photo"});
		sfFingerprintCanvas.fetchData({"id":seafarerId, "type":"fingerprint"});
		
	}else{
		//New record;
		SeafarerDetailWindow.setTitle("Seafarer Detail (ID: " + seafarerId + " )");
		sfRecFormDetail.getField('id').setDisabled(false);
		sfRecFormDetail.setValues({});
		sfRecFormDetail.clearErrors(true);
		sfRecFormButton_ToolBar.getButton('uploadFingerprintBtn').setDisabled(true);
		sfRecFormButton_ToolBar.getButton('uploadPhotoBtn').setDisabled(true);
		enabledSection(false);
	}
}

function enabledSection(isEnabled){
	var listOfSection = ['seafarerReg', 'seafarerNextOfKin', 'seafarerMedical', 'seafarerTrainingCourse', 'seafarerCert', 'seafarerSeaService', 'seafarerEmployment', 'seafarerRank', 'seafarerSerb', 'seafarerDisciplinary'];
	var i;
	for (i = 0; i < listOfSection.length; i++) { 
//		sfRecSectionContent.showSection(listOfSection[i]);
		sfRecSectionContent.getSection(listOfSection[i]).setDisabled(!isEnabled);
	}
}