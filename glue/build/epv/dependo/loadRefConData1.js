// list the eve consensus/reference sequences
var listSeqResult = glue.command(["list", "sequence", "-w", "source.name = 'fasta-refseqs-dependo-epv'"]);
// extract from the result a list of sequence IDs.
var seqIds = glue.getTableColumn(listSeqResult, "sequenceID");

// for each sequence ID
_.each(seqIds, function(seqId) {
    // create an object in the custom table which uses the sequence ID as the row ID.
    glue.command(["create", "custom-table-row", "refcon_data", seqId]);
    // associate the corresponding sequence with this object.
    glue.inMode("sequence/fasta-refseqs-dependo-epv/"+seqId, function() {
        glue.command(["set", "link-target", "refcon_data", "custom-table-row/refcon_data/"+seqId]);
    });
});

