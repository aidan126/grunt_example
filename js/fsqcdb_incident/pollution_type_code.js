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

createCodeTable2(PoL_CodeDS,
	[
		{ name: "id", title: "Poltyp cd", width:120 }, 
		{ name: "Poltyp_des", title: "Poltyp des", width:120 },
		{ name: "Del_mark", title: "Del mark", width:120 },
	],
	[
		{ name: "id", title: "Poltyp cd", width:120, required: true },
		{ name: "Poltyp_des", title: "Poltyp des", width:120 },
		{ name: "Del_mark", title: "Del mark", width:120 },
	],
	["id"], 'paged','CODE_POLLUTIONTYPE_WRITE|CODETABLE_ALL');