
console.log("entered trendOfExemptionsCert.js.");

//function eCertTrendWindowContent(){
    
    var eCertTrendData = [];
    
    //var valueMan = 
    isc.ValuesManager.create({
        ID: "eCertRecordVM",
        dataSource: eCertRecordDS,
        //fetchOperation: "FIND_ECERT_COUNT"
    });
    

    isc.DynamicForm.create({
        ID: "eCertTrendSearchDF",
        //autoDraw: false,
        
        //left:20,
        width:"100%",
        //fixedColWidths: true,
        numCols:8,
        colWidth:[270,170,30,100,30,100,100,100],
        //colWidth:[260,"*"],
        //overflow: "auto",
        items: [
            
            {
                name:"equipmentType", type:"radioGroup", showTitle:false,vertical:false,
                //width:180,
                align:"left",
                valueMap:["Equipment","Dispensation","All"], defaultValue:"All",
                //change:"countryList.getField('countryCode').align = value; countryList.markForRedraw()"
            },
            //{type:"SpacerItem"},
            {
                name: "searchDateFieldSelect",
                title:"", type:"select",
                //type:"select",
                canSelectText:true,
                //valueMap:[null],
                //startRow: true, 
                //colSpan: 2,
                //width: 280,
                //width: 200,
                width: 150,
                //width: "*",
                //,width: "50%"
                align:"right",
                showTitle:false,
                valueMap: {"app_date" : "Application Date", "exempted_date" : "Exemption Cert.Date", "valid_date" : "Valid Date"},
                //["Application Date","Exemption Cert.Date","Valid Date"], 
                defaultValue: "app_date",
                changed:function(form, item, value){
                    //setSisterShipDecl();     
                }
            },
            {name: "fromDate", title:"From:", type:"date", 
                //width:120, 
                width: "100%",
                //defaultValue: new Date(),
                defaultDynamicValue: function(item, form, values){
                    var today = new Date();
                    var currentYear = today.getFullYear();
                    return new Date(currentYear, 0, 1, 0, 0, 0, 0);
                },
                useTextField:true, startRow: false},
            {name: "toDate", title:"To:", type:"date", 
                //width:120,
                width: "100%",
                //defaultValue: new Date(),
                defaultDynamicValue: function(item, form, values){
                    var today = new Date();
                    var currentYear = today.getFullYear();
                    var nextYearStart = new Date(currentYear + 1, 0, 1, 0, 0, 0, 0);
                    return new Date(nextYearStart - 1);
                },
                useTextField:true, startRow: false},
            {
                name: "search",
                title: "Search",
                type: "button",
                width:"70",
                textAlign:"center",
                align:"center",
                wrapTitle: false,
                showTitle:false,
                startRow: false,
                endRow: false,
                defaultValue: "",
                click: function(){
                    searchECert();
                }
            },
            {
                name: "print",
                title: "Export",
                type: "button",
                width:"70",
                textAlign:"center",
                align:"left",
                wrapTitle: false,
                showTitle:false,
                startRow: false,
                endRow: false,
                defaultValue: "",
                click: "isc.say('Save!')"
            }

        ]
    });


    console.log("b4 create chart");



/*
isc.FacetChart.create({
    ID: "simpleChart",
    // You use facets to define the ways in which you would like the chart to
    // break down the data. In this case, our data has two dimensions: region and product.
    facets: [{
        id: "region",    // the key used for this facet in the data above
        title: "Region"  // the user-visible title you want in the chart
    },{
        id: "product",
        title: "Product"
    }],
    data: chartData,        // a reference to our data above
    valueProperty: "sales", // the property in our data that is the numerical value to chart
    chartType: "Area",
    
    title: "Sales by Product and Region"  // a title for the chart as a whole
});
*/


    
    //isc.FittedChart.create({
    isc.FacetChart.create({
        ID: "eCertTrendChart",
        title: "Trend of Exemption Certificate",
        chartType: "Column",
        allowedChartTypes: ["Column"],
        showValueOnHover:true,
        minLabelGap: 5,
        data: eCertTrendData,
        facets: [{ id: "filterMonth", title: "Months" }],
        valueProperty: "ecertCount",
        valueTitle: "Count of Certificate",
        
        
        
/*
        setBarSizing : function (enabled) {
            var prototype = isc.FittedChart.getPrototype();
            this.getMinClusterSize = enabled ? prototype.getMinClusterSize : null;
            this.setAutoScrollDataApproach(enabled ? "clusters" : "labels");
        }
        */
    });
    
    
    console.log("after create chart");
    
    isc.HLayout.create({
        ID: "eCertTrendChartLayout",
        membersMargin: 10,
        members: [
            eCertTrendChart

        ]
    });
    
    isc.VLayout.create({
        ID: "eCertTrendMainLayout",
        membersMargin: 10,
        members: [
            //isc.TitleLabel.create({ID:"sectionTitle", contents: "<p><b><font size=3px>BCC. CLC and MSMC Certificate Issuing System</font></b></p>"}),
            eCertTrendSearchDF,
            eCertTrendChartLayout
            
            
        ]
    });



function searchECert(){
	var advancedCriteria = {
        _constructor:"AdvancedCriteria", 
        criteria:[], 
        operator:"and"
    };
	var equipmentTypePara = eCertTrendSearchDF.getValue("equipmentType");
    
    if (!isNull(equipmentTypePara)) {
        if (equipmentTypePara === "Equipment")
            //Object.assign(criteria, {"equipments": "Equipment"});
            advancedCriteria.criteria.push({fieldName: "equipments", value: ["Equipment"], operator: "inSet"});
        else if (equipmentTypePara === "Dispensation")
            //Object.assign(criteria, {"equipments": ["Rating","Officer"]});
            advancedCriteria.criteria.push({fieldName: "equipments", value: ["Rating","Officer"], operator: "inSet"});
    }
    //Object.assign(criteria, {eCertTrendSearchDF.getValue("searchDateFieldSelect").trim() : }
    var dateFieldName = eCertTrendSearchDF.getValue("searchDateFieldSelect").trim();
    
    advancedCriteria.criteria.push({fieldName: dateFieldName, value: eCertTrendSearchDF.getValue("fromDate"), operator: "greaterOrEqual"});
    advancedCriteria.criteria.push({fieldName: dateFieldName, value: eCertTrendSearchDF.getValue("toDate"), operator: "lessOrEqual"});
    
    
	eCertRecordVM.fetchData(advancedCriteria, function (dsResponse, data, dsRequest) {
    //eCertRecordVM.fetchData({}, function (dsResponse, data, dsRequest) {
        
        eCertTrendData = [];
        var dateField = eCertTrendSearchDF.getValue("searchDateFieldSelect");
        if (isNull(dateField))
            return;
        //console.log("b4 last dinner");
        data.forEach(function (item, index) {
            item.filterMonth = item[dateField].toISOString().slice(0,7).replace(/-/g,"/");;
            item.ecertCount = 1;
        });
        
        /*
        if (dateField === "app_date"){
            data.forEach(function (item, index) {
                item.filterMonth = item.app_date.toISOString().slice(0,7).replace(/-/g,"/");;
                item.ecertCount = 1;
            });
        }else if (dateField === "exempted_date"){
            data.forEach(function (item, index) {
                item.filterMonth = item.exempted_date.toISOString().slice(0,7).replace(/-/g,"/");;
                item.ecertCount = 1;
            });
        }else if (dateField === "valid_date"){
            data.forEach(function (item, index) {
                item.filterMonth = item.valid_date.toISOString().slice(0,7).replace(/-/g,"/");;
                item.ecertCount = 1;
            });
        }
        */
        
        data.forEach(function (item, index) {
            if (!isNull(item.filterMonth)) {
                var filterMonthValue = item.filterMonth;
                if (!eCertTrendData.some(e => e.filterMonth === filterMonthValue)){
                    eCertTrendData.push({"filterMonth": filterMonthValue, "ecertCount": 1});
                }else{
                    eCertTrendData.find(e => {return e.filterMonth === filterMonthValue}).ecertCount += 1;
                }
            }    
        });
        eCertTrendChart.setData(eCertTrendData);
        
    //});
    },{sortBy: [eCertTrendSearchDF.getValue("searchDateFieldSelect") ]});
    
    //using SQL at backend to search
    //},{"operationId":"FIND_ECERT_COUNT", data:advancedCriteria});
    //},{"operationId":"FIND_ECERT_COUNT", sortBy: [eCertTrendSearchDF.getValue("searchDateFieldSelect") ], data:advancedCriteria});
    
    
    //allow to pass arbitrary data back
    //},{"operationId":"FIND_ECERT_COUNT", "operationType": "custom", data:advancedCriteria});
    
    /*
    eCertRecordDS.performCustomOperation("FIND_ECERT_COUNT")
    */
    
    
}







console.log("leave trendOfExemptionsCert.js");






