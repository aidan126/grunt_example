console.log("history_of_work.js loaded.  \r\n");
var howRecCntLabel = "Total: ";

function getCriteriaForToolBarGp(){
	var criteriaForToolBarGp;
    
}

function historyOfWorkWindowContent(certName, selectedRec, individualCertPara, callback){
    var valueMan = isc.ValuesManager.create({
        ID: "historyOfWorkVM",
        dataSource: hkmisCertDS
    });
    
    
    
    var historyOfWorkLG = isc.ListGrid.create({
        //ID:"msmcStatSearchResultLG", 
        dataSource: hkmisCertDS,
        valuesManager:valueMan,
        showFilterEditor:true, filterOnKeypress:true,
        autoDraw: false,
        width:1040,
        fields: [
            {name: "jobno", title: "Job No.", width:80},
            {name: "form", title: "Form", width:80},
            {name: "ver", title: "Ver", width:80},
            {name: "spname", title: "Name of Ship", width:200},
            {name: "refno", title: "Ref No.(BCC/CLC)", width:200},
            {name: "imono", title: "IMO NO.", width:80},
            {name: "distinctNo", title: "Off. No.", width:80},
            {name: "status", title: "Status", width:80},
            {name: "editStatus", title: "Edit Status", width:80},

            {name: "startPerson", title: "Start Person", width:80},
            {name: "beginDate", title: "Start Date", width:80},
            {name: "completeDate", title: "Complete Date", width:80},
            {name: "lastEditPerson", title: "Last Editors", width:80},
            {name: "lastEditDate", title: "Last Edit Date", width:80},
            {name: "dept", title: "Dept", width:80},
            {name: "cancelDate", title: "Cancel Date", width:80},
            {name: "cancelReason", title: "Cancel Reason", width:80},
            {name: "cancelPerson", title: "Cancel Person", width:80}
        ],
        rowDoubleClick:function(record, recordNum, fieldNum){
            if (record['form'] == 'BCC' || record['form'] == 'CLC'){
                openCrewListDetail_bcc(record);
            }
            if (record['form'] == 'MSMC'){
                openMsmcCertRecDetail(record);
            }
        }
    });


    
    var historyOfWorkSearchDF = isc.DynamicForm.create({
        //ID: "msmcReIssuanceDeclarOtherTxt",
        dataSource: "hkmisCertDS",
        valuesManager:valueMan,
        //autoFocus: true,
        //width:"40%",
        width:"*",
        numCols: 11,
        colWidths: [25,70,"*",40,"*",80,"*",120,"*",50,"*"],
        //itemLayout: "absolute",
        autoDraw: false,
        items:[
            {type:"SpacerItem"},
            {name: "startDateFrom", title:"Start Date", type: "date",width:70, useTextField:true, startRow: false},
            {name: "startDateTo", title:"~", type: "date",width:70, useTextField:true, startRow: false},
            {name: "startPerson", title:"Start Person", type: "text",width:70, startRow: false},
            {name: "imono", title:"IMO No.", type: "text",width:70, startRow: false},
            {name: "jobno", title:"Job No.", type: "text",width:70, startRow: false},
            
            {name: "showEngineer", title:"", type: "CheckboxItem",wrapTitle:false,showTitle:false,startRow: true, textAlign:"center", colSpan: 1, width: 25
                ,changed:function(){
                    console.log("checked");
                    //showEngineerFields(this.getValue());
                }
            },
            {name: "editDateFrom", title:"Edit Date", type: "date",width:70, useTextField:true, startRow: false},
            {name: "editDateTo", title:"~", type: "date",width:70, useTextField:true, startRow: false},
            {name: "lastEditPerson", title:"Last Editors", type: "text",width:70, startRow: false},
            {name: "distinctNo", title:"Off.No./Distinct No.", type: "text",width:70, startRow: false},
            {name: "refno", title:"Ref No.", type: "text",width:70, startRow: false},
            
            
            {type:"SpacerItem"},
            {name: "form", title:"Cert.", type:"select", valueMap:["BCC","CLC","MSMC","DMLC-I","ALL"],
                wrapTitle:false,startRow: false, textAlign:"center", colSpan: 1, width: 120},
                
            {name: "status", title:"Status", type:"select", valueMap:["Complete","Cancel","ALL"],
                wrapTitle:false,startRow: false, textAlign:"center", colSpan: 1, width: 120},
                
            {name: "editStatus", title:"Edit Status", type:"select", valueMap:["Edit","Submitted","Checked","ALL"],
                wrapTitle:false,startRow: false, textAlign:"center", colSpan: 1, width: 120},
                
            {name: "spname", title:"Name of Ship", type: "text",width:250, startRow: false, colSpan:3}
        ]
    });
    
    var historyOfWorkQueryBtn = isc.IButton.create({//Logout
        //ID: "logoutButton",
        title: "Query",
        //layoutAlign:"center",
        layoutVAlign: "top",
        width: 60, 
        autoFit: true, 
        autoDraw: false,
        click:function(){
            
        }
    });
    
    var historyOfWorkExport = isc.IExportButton.create({
        //ID:"msmcStatExportBtn",
        title: "Export",
        width: 100,
        //layoutAlign:"center",
        autoDraw: false,
        listGrid: historyOfWorkLG
    });

    
    var historyOfWorkSearchHLayout = isc.HLayout.create({
        //ID:"sfRecFormDetail", 
        width:1250, height:110,
        layoutTopMargin:10, layoutBottomMargin:10,
        padding:10,
        /*top:20,*/
        defaultLayoutAlign: "top",
        //layoutAlign:"center"
        //isGroup: true, groupTitle: "MSMC Information",
        showEdges: false,
        autoDraw: false,
        overflow: "auto",
        membersMargin:5, members:[historyOfWorkSearchDF, historyOfWorkQueryBtn, historyOfWorkExport]
    });

    
    
    var historyOfWorkRecCntLabel = isc.Label.create({
        width:100,
        height: 5,
        //styleName: "helloWorldText",
        padding: 0,
        //backgroundColor: "#ffffd0",
        align: "left",
        valign: "center",
        autoDraw: false,
        wrap: false,
        showEdges: false,
        showShadow: false,
        //icon: "icons/16/world.png",
        contents: howRecCntLabel + "0"
    });
    
    /*
    isc.TitleLabel.create({
        contents: "<p> Total no. of search item: <b> 0 </b> </p>"
    });
    */
    
    //----------------------------------------------------------------------------------------------------------------------------------------------------------
    var mainLayoutHistoryOfWork = isc.VLayout.create({
        members: [
            historyOfWorkSearchHLayout
            ,historyOfWorkLG
            ,historyOfWorkRecCntLabel
            /*
            //isc.TitleLabel.create({ID:"sectionTitle", contents: "<p><b><font size=3px>Seafarer Registration Maintenance - Record [Ver 0.1.1]</font></b></p>"}),
            isc.TitleLabel.create({ID:"sectionTitle", contents: "<p><b><font size=3px>History of Certificate</font></b></p>"}),
            historyOfWorkAllCertSearchMainCriteriaLayout,



            isc.SectionStack.create({
                    sections: [
                        //20190715 decided to eliminate advanced search section
                        //{title: "Search", expanded: true, resizeable: false, items: [ historyOfWorkAllCertSearchSectionLayout]}
                        
                        //, {title: "Result", expanded: true, items: [ historyOfWorkAllCertSearchResultListLG, msmcTestingLG, historyOfWorkAllCertSearchResultListLGSummary ]}
                        , {title: "Result", expanded: true, items: [ historyOfWorkAllCertSearchResultListLG, historyOfWorkAllCertSearchResultListLGSummary ]}
                    ]
            })
            */
            
        ]
    });
            
            
            
    //----------------------------------------------------------------------------------------------------------------------------------------------------------
    var HistoryOfWorkWindow = isc.Window.create({
        //ID:"MsmcDetailWindow", 
        isModal: true, showModalMask: true
        , width: "80%"
    //	, height: "90%"
        , height: "60%"
        , title:"MSMC@1.0",
        //layoutMargin:10,
        overflow : "auto",
        items: [
                mainLayoutHistoryOfWork
                ],
        show:function(){
            //msmcRecFormDetail.setData({});
            //sfPhotoCanvas.setData(null);
            this.Super('show', arguments);
            //sfFingerprintCanvas.setData(null);
    //		msmcRecSectionContent.collapseSection([1,2,3,4,5,6,7,8,9,10]);

        }

    });
    return HistoryOfWorkWindow;
}

function showHistoryOfWorkWindow(){
    console.log("entered showHistoryOfWorkWindow()");
    HistoryOfWorkWindow = historyOfWorkWindowContent();
    HistoryOfWorkWindow.show();
    console.log("after HistoryOfWorkWindow.show();");
}


//historyOfWorkAllCertSearchToolBar.getButton('searchBtn').click();