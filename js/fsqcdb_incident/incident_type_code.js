/***************************************************************************************************************
* Qualified Name	 	/webui/src/main/webapp/js/fsqcdb_incident/environmental_code.js
* @author 				Neo Pak
* @since				2019-08-14
* ************************************************************************************************************** 
* Change log:
* log no	Change complete date	Developer			Change Reason
* ======	====================	=========			=============
* 00000		2019-08-14				Neo Pak				Initial Implementation
* 
****************************************************************************************************************/

createCodeTable2(Incident_CodeDS,
	[
		{ name: "id", title: "Inctyp cd", width:120 }, 
		{ name: "Inctyp_des", title: "Inctyp des", width:120 },
		{ name: "Del_mark", title: "Del mark", width:120 },
		{ name: "mais_code", title: "mais code", width:120 },
	],
	[
		{ name: "id", title: "Envloc cd", width:120, required: true },
		{ name: "Inctyp_des", title: "Inctyp des", width:120 },
		{ name: "Del_mark", title: "Del mark", width:120 },
		{ name: "mais_code", title: "mais code", width:120 },
	],
	["id"], 'paged','CODE_INCIDENTTYPE_WRITE|CODETABLE_ALL');