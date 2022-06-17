(function(window, document, $, undefined){

    $(function(){
        var exportTable = jQuery(".export-table-wrapper");
        if (exportTable.length > 0) {
            $( "#exportExcel" ).on( "click", function() {
                $('#export-table').tableExport({type:'excel'});
            });
            $( "#exportCSV" ).on( "click", function() {
                $('#export-table').tableExport({type:'csv'});
            });
        }
    });

})(window, document, window.jQuery);