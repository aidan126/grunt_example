
function printOptionWindowContent(certName, selectedRec, individualCertPara, callback){
    var aboutToSetAsPrinted = 0;
    
    var allPagesLabel = "All Pages(Original + Copy)";
    var originalOnlyLabel = "Original Only";
    var officeCopyOnlyLabel = "Office Copy Only";
    

    var onControlStatus = "";
	switch (certName){
	case "RPT_Msmc_Min_Safe_Manning_Cert":	case "RPT_Declaration_Reissuance_Cert":
    	onControlPrintStatus = "MSMC_PRINT";
		break;
	case "RPT_BCC_Cert":
    	onControlPrintStatus = "BCC_PRINT";
		break;

	case "RPT_CLC_Cert":
    	onControlPrintStatus = "CLC_PRINT";
		break;

	case "RPT_Dmlc":
		onControlPrintStatus = "DMLC_PRINT";
		break;
	}

    var HkcertPrintOptionRadioGroup =
        isc.DynamicForm.create({
            //ID:"HkcertPrintOptionRadioGroup",
            autoDraw: false,
            fields: [
                {type: "SpacerItem",width:"*"},
                {
                    name:"HkcertPrintPg", type:"radioGroup", showTitle:false,
                    vertical:true,
                    width:250,
                    valueMap:[allPagesLabel, originalOnlyLabel, officeCopyOnlyLabel], defaultValue: allPagesLabel,
                    change:function(form, item, value){
                        //if (value == "All Pages(Original + Copy)") {
                        //    HkcertPrintOption.getItem("officeCopyCheckbox").setValue("unverified");
                        //}
                    }

                }
            ]
        });
	
    var CertBtnGp =
    isc.ButtonToolbar.create({
        //ID:"CertBtnGp",
        autoDraw: false,
        buttons: [
            {name:"previewCertBtn", title:"Preview", autoFit: true,
                click : function () {
//                  var printScopeOption = HkcertPrintOptionWindow.getMember(1).getMember(0).getMember(0).getItem("HkcertPrintPg").getValue();
                    var printScopeOption = HkcertPrintOptionRadioGroup.getItem("HkcertPrintPg").getValue();
                    
                    var print_office   = false;
                    var print_original = false;
                    
                    if (isNull(printScopeOption)) {
                        console.log("printScopeOption is null");
                        return;
                    }
                    
                    /*
                    if (printScopeOption == "All Pages") {
                        var isOfficeCopyOption = HkcertPrintOptionWindow.getMember(1).getMember(0).getMember(1).getItem("officeCopyCheckbox").getValue();
                        var officeCopyPara = (!isNull(isOfficeCopyOption) && isOfficeCopyOption == "verified" ? "1" : "0");
                        
                        if(officeCopyPara == "1")
                        {
                        	print_office   = true;
                        	print_original = false;
                        }
                        else if(officeCopyPara == "0")
                        {
                        	print_office   = false;
                        	print_original = true;
                        }
                    }else if (printScopeOption == "All Pages(Original + Copy)") {
                        print_office   = true;
                        print_original = true;
                    }
                    */
                    if (printScopeOption == officeCopyOnlyLabel) {
                        print_office   = true;
                        print_original = false;
                    }else if (printScopeOption == originalOnlyLabel) {
                        print_office   = false;
                        print_original = true;
                    }else if (printScopeOption == allPagesLabel) {
                        print_office   = true;
                        print_original = true;
                    }
                    
                    printCertReport(certName, selectedRec.jobno, individualCertPara, "1", print_original, print_office);
//                    printCertReport(certName, selectedRec.formlist_jobno, individualCertPara, "1", print_original, print_office);
                    HkcertPrintOptionWindow.close();

                }
            },
            {ID:"printCertBtn", name:"printCertBtn", title:"Send to Printer", autoFit: true, 
            	onControl:onControlPrintStatus,

                click : function () {
//                  var printScopeOption = HkcertPrintOptionWindow.getMember(1).getMember(0).getMember(0).getItem("HkcertPrintPg").getValue();
                    var printScopeOption = HkcertPrintOptionRadioGroup.getItem("HkcertPrintPg").getValue();
                    
                    var print_office   = false;
                    var print_original = false;
                    
                    if (isNull(printScopeOption)) {
                        console.log("printScopeOption is null");
                        return;
                    }
                    
                    /*
                    if (printScopeOption == "All Pages") {
                        var isOfficeCopyOption = HkcertPrintOptionWindow.getMember(1).getMember(0).getMember(1).getItem("officeCopyCheckbox").getValue();
                        var officeCopyPara = (!isNull(isOfficeCopyOption) && isOfficeCopyOption == "verified" ? "1" : "0");
                        if(officeCopyPara == "1")
                        {
                        	print_office   = true;
                        	print_original = false;
                        }
                        else if(officeCopyPara == "0")
                        {
                        	print_office   = false;
                        	print_original = true;
                        }
                        
                    }else if (printScopeOption == "All Pages(Original + Copy)") {
                        print_office   = true;
                        print_original = true;
                    }
                    */
                    
                    if (printScopeOption == officeCopyOnlyLabel) {
                        print_office   = true;
                        print_original = false;
                    }else if (printScopeOption == originalOnlyLabel) {
                        print_office   = false;
                        print_original = true;
                    }else if (printScopeOption == allPagesLabel) {
                        print_office   = true;
                        print_original = true;
                    }
                     
                    printCertReport(certName, selectedRec.jobno, individualCertPara, "0", print_original, print_office);
//                    printCertReport(certName, selectedRec.formlist_jobno, individualCertPara, "0", print_original, print_office);
                    HkcertPrintOptionWindow.close();
                    //set as "printed"
                    aboutToSetAsPrinted = 1;
                    console.log("printCertBtn btn is pressed");
                    console.log("aboutToSetAsPrinted in UI funtion: " + aboutToSetAsPrinted);
                    if (!isNull(callback))
                    	callback();
                    
                    
                    
                    //auto close work for BCC CLC
                    console.log("auto close work for BCC CLC");
                    if ( (selectedRec.form == "BCC" || selectedRec.form == "CLC") && selectedRec.editStatus == "3" && print_original) {
                    	selectedRec.status = "Complete";
                    	selectedRec.completeDate = new Date();
                    	selectedRec.bccclc_complete_date = new Date();
                    	selectedRec.printStatus = "Printed";
                    	
                    	certJobBccclcDS.updateData(selectedRec, function (dsResponse, data, dsRequest) {
                    		isc.say("The selected certificate job is closed.");
                    		if (!isNull(data)) {
                    			//console.log(JSON.stringify(data));
                    			//bccclc_FormDetail.setValues(data);
                    		}
                    	});
                    }
                    
                }
            },
            {name:"exitBtn", title:"Exit", autoFit: true,
                click : function () {
                    HkcertPrintOptionWindow.close();
                }
            }
        ]
    });


	switch( selectedRec.form )
	{
	case "BCC":
		if(selectedRec.editStatus != "3")
		{
			printCertBtn.hide();
		}
		break;
	case "CLC":
		if(selectedRec.editStatus != "3")
		{
			printCertBtn.hide();
		}
		break;
	}



    var HkcertPrintOption =
    isc.DynamicForm.create({
        //ID:"HkcertPrintOption",
        autoDraw: false,
        fields: [
            /*
            {
                name: "allPgOrigCopyCheckbox",
                editorType: "CheckboxItem",
                title: "All Pages(Original + Copy)",
                width: 50,
                valueMap: {
                    "verified": true,
                    "unverified": false
                }
            },
            {
                name: "allPgCheckbox",
                editorType: "CheckboxItem",
                title: "All Pages",
                width: 50,
                valueMap: {
                    "verified": true,
                    "unverified": false
                }
            },
            */
            {type:"RowSpacerItem"},
//            {
//                name: "printPdfCheckbox",
//                editorType: "CheckboxItem",
//                title: "PDF",
//                width: 50,
//                valueMap: {
//                    "verified": true,
//                    "unverified": false
//                }
//            },
            {
                name: "officeCopyCheckbox",
                editorType: "CheckboxItem",
                title: "OFFICE COPY",
                width: 50,
                valueMap: {
                    "verified": true,
                    "unverified": false
                },
                changed: function(form, item, value){
                    if (value == "verified") {
                        HkcertPrintOptionRadioGroup.getItem("HkcertPrintPg").setValue("All Pages");
                    }

                }
            },
            {type:"RowSpacerItem"}
        ]
    });

    var HkcertPrintOptionVLayout =
    isc.VLayout.create({
        //ID: "HkcertPrintOptionVLayout",
        //width: "100%",
        autoDraw: false,
        members: [
                //isc.TitleLabel.create({ID:"msmcRecSectionTitle", contents: "<p><b><font size=15px>Maintain Seafarer Record <br /></font></b></p>"}),
                //isc.TitleLabel.create({ID:"msmcRecSectionTitle", contents: "<p><b>Maintain Seafarer Record <br/></b></p>"}),
                HkcertPrintOptionRadioGroup,
                //HkcertPrintOption,
                isc.LayoutSpacer.create({height: 10}),
                CertBtnGp
              ]
    });



    isc.Window.create({
        ID:"HkcertPrintOptionWindow", isModal: true, showModalMask: true
        , width: "40%"
        , height: "180"
        , title:"Print Option",
        //autoDraw: false,
        //layoutMargin:10,
        overflow : "auto",
        items: [
                HkcertPrintOptionVLayout
                ],
        show:function(){
            //msmcRecFormDetail.setData({});
            //sfPhotoCanvas.setData(null);
            this.Super('show', arguments);
            //sfFingerprintCanvas.setData(null);
    //		msmcRecSectionContent.collapseSection([1,2,3,4,5,6,7,8,9,10]);
        },
        selectedRecord: selectedRec

    });

    return aboutToSetAsPrinted;
}

//=====================================================================================================================================================================
//function printCertReport(certName, selectedRec, individualCertPara, previewPara, print_original, print_copy){
function printCertReport(certName, jobno, individualCertPara, previewPara, print_original, print_copy){

    /*
    if (printScopeOption == "All Pages") {
        printHkcert(HkcertPrintOptionWindow.selectedRec, printScopeOption, officeCopyPara, "1");

    }else if (printScopeOption == "All Pages(Original + Copy)") {
        printHkcert(HkcertPrintOptionWindow.selectedRec, printScopeOption, "0", "1");
        printHkcert(HkcertPrintOptionWindow.selectedRec, printScopeOption, "1", "1");
    }
    */

    //var printScopeOption = HkcertPrintOptionRadioGroup.getItem("HkcertPrintPg").getValue();

//    var requestArguments = preparePrintParam(certName, selectedRec, individualCertPara, printScopeOption, previewPara);
    var requestArguments = preparePrintParam(certName, jobno, individualCertPara, previewPara);

//    if (printScopeOption == "All Pages") {
//
//
//        //printHkcert(HkcertPrintOptionWindow.selectedRec, printScopeOption, officeCopyPara);
//
//        var isOfficeCopyOption = HkcertPrintOptionWindow.getMember(1).getMember(0).getMember(1).getItem("officeCopyCheckbox").getValue();
//        var officeCopyPara = (!isNull(isOfficeCopyOption) && isOfficeCopyOption == "verified" ? "1" : "0");
//        printHkcert(requestArguments, officeCopyPara);
//
//    }else if (printScopeOption == "All Pages(Original + Copy)") {
//
//        /*
//        printHkcert(HkcertPrintOptionWindow.selectedRec, printScopeOption, "0");
//        printHkcert(HkcertPrintOptionWindow.selectedRec, printScopeOption, "1");
//        */
//        printHkcert(requestArguments, "0");
//        printHkcert(requestArguments, "1");
//    }

    /*
    if(print_original == "1")
    {
    	printHkcert(requestArguments, "0");
    }

    if(print_copy == "1")
    {
    	printHkcert(requestArguments, "1");
    }
    */
    
    
    var copyParaArray = [];
    if(print_original == "1") {
    	//printHkcert(requestArguments, "0");
    	copyParaArray.push("ORIGINAL");
    }
    if(print_copy == "1") {
    	//printHkcert(requestArguments, "1");
    	copyParaArray.push("OFFICE_COPY");
    }
    printHkcert(requestArguments, copyParaArray);
    
    

}




//function preparePrintParam(certName, record, individualCertPara, printScopeOption, previewPara){
function preparePrintParam(certName, jobno, individualCertPara, previewPara){
    var params = {};
    var requestArguments = [];
//    var printToPdfOption = HkcertPrintOptionWindow.getMember(1).getMember(0).getMember(1).getItem("printPdfCheckbox").getValue();

    Object.assign(params, individualCertPara);
//    Object.assign(params, {"printScope" : printScopeOption});
//    Object.assign(params, {"printToPdf" : (!isNull(printToPdfOption) && printToPdfOption == "verified" ? "1" : "0")});
    //Object.assign(params, {"office_copy" : officeCopyPara});
    Object.assign(params, {"preview" : previewPara});

    //Object.assign(params, {"jobno" : sfMSMCJobNo.getItem("jobno").getValue()});
//    Object.assign(params, {"jobno" : record.formlist_jobno});
    Object.assign(params, {"jobno" : jobno});

//    var jobno_arr2 = [];
//    jobno_arr2.concat(jobno_arr);
    Object.assign(params, {"jobno_arr" : jobno.split(",")});


    requestArguments = [certName, params];

    return requestArguments;
}



function printHkcert(requestArguments, copyParaArray){
//function printHkcert(requestArguments, officeCopyPara){
    //Object.assign(requestArguments[1], {"office_copy" : officeCopyPara});
    Object.assign(requestArguments[1], {"copy_para_arr" : copyParaArray});
    
    ReportViewWindow.displayReport(requestArguments);
}


function showPrintOptionWindow(certName, selectedRec, individualCertPara, callback){

    var aboutToSetAsPrinted = printOptionWindowContent(certName, selectedRec, individualCertPara, callback);
    HkcertPrintOptionWindow.show();
    console.log("aboutToSetAsPrinted in showPrintOptionWindow(): " + aboutToSetAsPrinted);
    return aboutToSetAsPrinted;
}







