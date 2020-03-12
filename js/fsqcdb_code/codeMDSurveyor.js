createCodeTable2(codeMDSurveyorDS,
		[
			{ name: "Surveyor_cd", width:150},
			{ name: "Surveyor_Enam",  width:200},
			{ name: "Surveyor_Cnam",  width:200},
			{ name: "surveyor_title",  width:120},
			{ name: "Del_mark"}
		],
		[
			{ name: "Surveyor_cd", required: true},
			{ name: "Surveyor_Enam"},
			{ name: "Surveyor_Cnam"},
			{ name: "surveyor_title",
				 editorType:"ComboBoxItem",
			 		addUnknownValues:false, wrapTitle: false,
			 		optionDataSource: "codeDicPublicDS",
			 		displayField:"data",valueField:"data",
			 		pickListCriteria:{dic_type:"surveyortitle"},
			 		sortField:"sort",
			 		pickListWidth:"150",
			 		pickListFields:[

			 		{name:"data",title:"Title",width:150},
			 		{name:"sort"}
			 		]
			},
			{ name: "Del_mark"}
		],
		["Surveyor_cd"], 'paged', 'CODE_MDSUREYORS_WRITE|CODETABLE_ALL');

