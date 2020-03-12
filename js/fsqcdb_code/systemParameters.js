var systemParametersDS_RHS = createCodeTable2(systemParametersDS,
		[
			{ name: "module_name"},
			{ name: "param_name"},
			{ name: "param_idx"},
			{ name: "param_value_from", editorType:"TextAreaItem"},
			{ name: "param_value_to", editorType:"TextAreaItem"},
			{ name: "param_remarks", editorType:"TextAreaItem"},
			{ name: "updatedDate"},
			{ name: "updatedBy"},
			{ name: "createdDate"},
			{ name: "createdBy"},
		],
		[
			{ name: "module_name"},
			{ name: "param_name"},
			{ name: "param_idx"},
			{ name: "param_value_from", editorType:"TextAreaItem", width:"100%", colSpan:5},
			{ name: "param_value_to", editorType:"TextAreaItem", width:"100%", colSpan:5},
			{ name: "param_remarks", editorType:"TextAreaItem", width:"100%", colSpan:5},
		],
		["module_name", "param_name", "param_idx"], 'paged','SYS_PARAMETERS_WRITE|CODETABLE_ALL');

//systemParametersDS_RHS["LG"].autoFitFieldWidths = true;
//systemParametersDS_RHS["LG"].warnOnRemoval = true;
systemParametersDS_RHS["LG"].canRemoveRecords = true;