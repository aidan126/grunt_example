/***************************************************************************************************************
* Qualified Name	 	/webui/src/main/webapp/js/hkmis_cert/select_insurer.js
* @author 				Neo Pak
* @since				2019-07-30
* ************************************************************************************************************** 
* Change log:
* log no	Change complete date	Developer			Change Reason
* ======	====================	=========			=============
* 00000		2019-07-23				Neo Pak				Initial Implementation
* 00000		2019-07-30				Neo Pak				Update
* 
****************************************************************************************************************/

function store_data_insurerAddress1(record, data)
{
    bccclc_FormDetail.setValue('insurer_id1', record['id']);
    bccclc_FormDetail.setValue('insurer_name1', data['nameEn']);
    bccclc_FormDetail.setValue('insurer_address1', record['address_en']);
    bccclc_FormDetail.setValue('insurer1_address2', record['address_en2']);
    bccclc_FormDetail.setValue('insurer1_address3', record['address_en3']);

    select_insurer_DetailWindow.hide();
}

function store_data_insurerAddress2(record, data)
{
    bccclc_FormDetail.setValue('insurer_id2', record['id']);
    bccclc_FormDetail.setValue('insurer_name2', data['nameEn']);
    bccclc_FormDetail.setValue('insurer_address2', record['address_en']);
    bccclc_FormDetail.setValue('insurer2_address2', record['address_en2']);
    bccclc_FormDetail.setValue('insurer2_address3', record['address_en3']);

    select_insurer_DetailWindow.hide();
}

function store_data_insurer1()
{
    isc.IButton.create({
        ID:"insurerCodeSave",
        width:70,
        title: "OK",
        click : function ()
        {
            if (insurerListGrid.getSelectedRecord()) {

                var data = insurerListGrid.getSelectedRecord();
                var data_address = insurerAddressListGrid.getData();
                var record1_1 = data_address[0];
                store_data_insurerAddress1(record1_1, data);
              }

            if (insurerAddressListGrid.getSelectedRecord()) {

                var data = insurerListGrid.getSelectedRecord();
                var record1_2 = insurerAddressListGrid.getSelectedRecord();
                store_data_insurerAddress1(record1_2, data);
             }

            if (!insurerListGrid.getSelectedRecord()) {

                alert('Need to select data !');
            }
        }
    });
}

function store_data_insurer2()
{
    isc.IButton.create({
        ID:"insurerCodeSave",
        width:70,
        title: "OK",
        click : function ()
        {
            if (insurerListGrid.getSelectedRecord()) {

                var data = insurerListGrid.getSelectedRecord();
                var data_address = insurerAddressListGrid.getData();
                var record1_1 = data_address[0];
                store_data_insurerAddress2(record1_1, data);
              }

            if (insurerAddressListGrid.getSelectedRecord()) {

                var data = insurerListGrid.getSelectedRecord();
                var record1_2 = insurerAddressListGrid.getSelectedRecord();
                store_data_insurerAddress2(record1_2, data);
             }

            if (!insurerListGrid.getSelectedRecord()) {

                alert('Need to select data !');
                
            }
        }
    });
}

function select_insurer_windowContent()
{
	isc.DynamicForm.create
	({
	    ID: "insurerCodeSearch",
	    width:"520",
        numCols: 6,
        colWidths: [40, 60, 20, 250, 20, "*"],
        align:"left",
        saveOnEnter: true,
	    items:
	    [
	        { name: "companyId", type: "text", title: "Insurer ID:", textAlign:"left", wrapTitle: false, startRow: true,  width:150, type: "integer", defaultValue: "" },
	        { name: "companyName", type: "text", title: "Insurer Name:", textAlign:"left", wrapTitle: false, startRow: false, width:"*", defaultValue: "" },
	        { type: "SpacerItem", width:"*" },
	        { name: "query", type: "button", title: "Query", width:70, wrapTitle: false, startRow: false, defaultValue: "",

	            click: function searchInsurer(){
	            	insurerCodeSearch.submit();
	            }

	        },

		],
		submit: function(){
            var targetCompanyId = insurerCodeSearch.getItem("companyId").getValue();
            var targetCompanyName = insurerCodeSearch.getItem("companyName").getValue();

            if (!isNull(targetCompanyName))
                targetCompanyName = targetCompanyName.trim();

            console.log("targetCompanyId: " + targetCompanyId);
            console.log("targetCompanyName: " + targetCompanyName);

            insurerListGrid.filterData({
            	company_id:targetCompanyId,
            	nameEn:targetCompanyName
            });
			
		}
	});

    isc.DynamicForm.create({
        ID:"select1_update",
        dataSource: "certJobBccclcDS",
        width:"100%",
        numCols: 8,
        colWidths: ["1", "1", "1", "1", "1", "1", "1", "1"],
        fields:
        [
            {name: "insurer_id1",   title:"Insurer Id1:",   startRow: true, colSpan: 1, width: 200},
            {name: "insurer_name1",     title:"Insurer Name1:", startRow: false, colSpan: 1, width: 300},

            {name: "insurer_address1",  title:"Insurer Addrees1:",  startRow: true, colSpan: 4, width: 700},

            {name: "insurer1_address2",     title:"Insurer Addrees2:",  startRow: true, colSpan: 4, width: 700},

            {name: "insurer1_address3",     title:"Insurer Addrees3:",  startRow: true, colSpan: 4, width: 700}
        ]
    });

    isc.IButton.create({
        ID:"insurerCodeClose",
        width:70,
        layoutBottomMargin: 2,
        title: "Cancel",
        click : function () {

              select_insurer_DetailWindow.hide();
          }
    });

    isc.HLayout.create({
        ID:"insurerCodeTopBtnBar", layoutTopMargin:10, layoutBottomMargin:10,
        height:40,
        showEdges: false,
        membersMargin:5, members:[insurerCodeSearch, insurerCodeSave, insurerCodeClose]
    });


	isc.ListGrid.create({
	    ID: "insurerListGrid",
	    isGroup: true, groupTitle: "Insurer Company",
	    layoutTopMargin: 15,
	    // width:500,
	    height:224,
	    //alternateRecordStyles:true,
	    overflow:"auto",
	    dataSource: insurerDS,
	    autoFetchData: true,
	    //initialCriteria: {deleted : "null"},
	    //initialCriteria: {deleted :["false", null]},
	    initialCriteria: {deleted: false},
//	    initialCriteria: { _constructor: "AdvancedCriteria", operator: "or",
//	        criteria: [
//	            { fieldName: "deleted", operator: "not_equal", value: true }
//	        ]
//	    },
//	    initialCriteria: { _constructor: "AdvancedCriteria",fieldName: "deleted", operator: "not_equal", value: true 
//	    },
	    // autoSaveEdits: false,
	    // canEdit: true,
	    // editOnFocus: true,
	    canSelectCells: true,
	    // dataPageSize: 20,
	    // canRemoveRecords:true,
	    // saveLocally: true,
	    // saveByCell: true,
	    //editEvent: "doubleClick",
	    // editEvent: "click",
	    fields:[
	        {name:"company_id", title:"ID", type:"integer", width:50},
	        {name:"nameEn", title:"Name En", width:500},
	        {name:"nameCn", title:"Name Cn"},
	        {name:"linkMan", title:"Link Man"},
	        {name:"tel", title:"Tel"},
	        {name:"phone", title:"Phone"},
	        {name:"email", title:"Email"},
	        {name:"zipcode", title:"Zipcode"},
	    ],

	    rowClick:function(record, recordNum, fieldNum){

            // alert(record['company_id']);

	        var cell = insurerListGrid.getCellSelection();
	        // insurerListGrid.startEditing(cell.startRow, cell.startCol);

	        console.log("selected insurer rec: " + record);
	        console.log("selected insurer ID: " + record['company_id']);
	        console.log("selected insurer row: " + recordNum);
	        console.log("selected insurer col: " + fieldNum);
	        insurerAddressListGrid.setData([]);
	        insurerAddressListGrid.setData(insurerListGrid.getSelectedRecord().insurerAddresses);
	    }
	});

	isc.ListGrid.create({
	    ID: "insurerAddressListGrid",
	    isGroup: true, groupTitle: "Insurer Company Address",
	    layoutTopMargin: 15,
	    width:"100%",
	    //height:224,
	    //alternateRecordStyles:true,
	    overflow:"auto",
	    dataSource: insurerAddressDS,
	    autoSaveEdits: false,
	    // canEdit: true,
	    // editOnFocus: true,
	    canSelectCells: true,
	    // saveLocally: true,
	    // saveByCell: true,
	    // canRemoveRecords:true,
	    //editEvent: "doubleClick",
	    editEvent: "click",
	    fields:[
	        {name:"id", title:"Address ID", type:"integer", width:70, align:"center",},
	        {name:"company_id", title:"Company ID", type:"integer", width:150, hidden:true},
	        {name:"address_en", title:"Address 1", width:1000},
	        {name:"address_en2", title:"Address 2", width:200},
	        {name:"address_en3", title:"Address 3", width:200}
	    ],

        rowClick:function(record, recordNum, fieldNum){

            // alert(record['id']);
        }
	});

	isc.Window.create
	({
		ID:"select_insurer_DetailWindow", 
		layoutTopMargin: 0,
		isModal: true, showModalMask: true, width: 1200, height: 600, layoutMargin:10,
		items:
		[
	        isc.VLayout.create
	        ({
	        	members:
	        	[
	    	        // insurer_title,
	    	        insurerCodeTopBtnBar,
	    	        insurerListGrid,
	    	        insurerAddressListGrid
	        	]
	        })
		]
	});
}

function select_insurer_RecDetail1(record){

    store_data_insurer1();
	select_insurer_windowContent();
	select_insurer_DetailWindow.setTitle("Insurer Selection");
	select_insurer_DetailWindow.show();
}

function select_insurer_RecDetail2(record){

    store_data_insurer2();
    select_insurer_windowContent();
    select_insurer_DetailWindow.setTitle("Insurer Selection");
    select_insurer_DetailWindow.show();
}
