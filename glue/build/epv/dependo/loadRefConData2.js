// Load EVE data from tab file 
var loadResult;
glue.inMode("module/tabularUtility", function() {
	loadResult = glue.tableToObjects(glue.command(["load-tabular", "tabular/eve/parvovirinae/epv-dependo-refseqs-side-data.tsv"]));
    //glue.log("INFO", "load result was:", loadResult);
});

_.each(loadResult, function(eveObj) {

	//glue.log("INFO", "LOADED reference EPV INFO ", eveObj);
    var source_name = 'fasta-refseqs-dependo-epv';
	glue.inMode("custom-table-row/refcon_data/"+eveObj.sequenceID, function() {
	
		//glue.log("INFO", "Entering locus data for EVE reference:", eveObj.sequenceID);

		glue.command(["set", "field", "locus_numeric_id", eveObj.locus_numeric_id]);
		glue.command(["set", "field", "host_group_taxlevel", eveObj.host_group_tax_rank]);
		//glue.command(["set", "field", "host_group_name", eveObj.host_group_name]);
		//glue.command(["set", "field", "nearest_upstream_orf", eveObj.nearest_upstream_orf]);
		//glue.command(["set", "field", "nearest_downstream_orf", eveObj.nearest_downstream_orf]);
		//glue.command(["set", "field", "human_chr", eveObj.human_chr]);

	});

	glue.inMode("sequence/"+source_name+"/"+eveObj.sequenceID, function() {
	
		glue.log("INFO", "Entering sequence table data for EVE reference:", eveObj.sequenceID);

		glue.command(["set", "field", "name", eveObj.insertion_name]);
		glue.command(["set", "field", "full_name", eveObj.insertion_full_name]);

		glue.command(["set", "field", "subfamily", eveObj.virus_subfamily]);
		glue.command(["set", "field", "genus", eveObj.virus_genus]);
		glue.command(["set", "field", "assign_clade", eveObj.assign_clade]);
		glue.command(["set", "field", "assign_subclade", eveObj.assign_subclade]);

		glue.command(["set", "field", "clade_ns", eveObj.virus_clade_ns]);
		glue.command(["set", "field", "subclade_ns", eveObj.virus_subclade_ns]);
		glue.command(["set", "field", "clade_vp", eveObj.virus_clade_vp]);
		glue.command(["set", "field", "subclade_vp", eveObj.virus_subclade_vp]);

	});

});


	