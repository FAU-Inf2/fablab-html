/// <reference path="libraries/jquery.d.ts" />
/// <reference path="util/RestClient.ts"/>
/// <reference path="common/model/FabTool.ts" />
/// <reference path="common/model/ToolUsage.ts" />

var reservation : Reservation = null;

class Reservation {
    toolArray : Array<common.FabTool>;
    client : RestClient = null;

    constructor () {
        this.client = new RestClient();
        this.updateToolList();
    }

    updateToolList() {
        var r : Reservation = this;
        this.client.requestGET("/drupal/tools", function(result) { r.toolListCallback(result)});
    }

    toolListCallback(list) {
        this.toolArray = list;
        var select = $('#machineSelector');

        for (var index = 0; index < this.toolArray.length; index++) {
            var option = $(document.createElement('option'));
            option.val(String(this.toolArray[index].id));
            option.text(this.toolArray[index].title);
            option.appendTo(select);
        }
        select.prop("selectedIndex", 0);
    }

    getUsageList( machineId : number ) {
        if (machineId < 0) {
            this.usageListCallback(-1, null);
            return;
        }

        var r : Reservation = this;
        this.client.requestGET("/toolUsage/" + machineId + "/", function(result){r.usageListCallback(machineId, result)});
    }

    usageListCallback(machineId : number, results : common.ToolUsage) {

        var table = $('#machineUsageTable');
        table.find("tbody").empty();

        if (machineId < 0) {
            this.disableAddEntry(true);
            return;
        }

        var i : number = 0;
        for (var r in results) {

            var tr = $(document.createElement('tr'));
            var td_nr = $(document.createElement('td'));
            td_nr.text((i+1).toString());
            td_nr.appendTo(tr);

            var td_user = $(document.createElement('td'));
            td_user.text(results[i].user);
            td_user.appendTo(tr);

            var td_duration = $(document.createElement('td'));
            td_duration.text(results[i].duration);
            td_duration.appendTo(tr);

            tr.appendTo(table);
            i++;
        }

        this.disableAddEntry(false);
    }

    loadTable() {
        var machineId : number = $("#machineSelector").val();
        if (machineId != -1)
            this.getUsageList(machineId);
        else
            this.usageListCallback(-1, null);
    }

    addEntry() {
        var usage : common.ToolUsage = new common.ToolUsage();

        var inputUser = $("#addEntryUser");
        var inputDuration = $("#addEntryDuration");

        if (inputUser.val().length == 0 || inputDuration.val().length == 0)
            return;

        usage.toolId = $("#machineSelector").val();
        usage.user = inputUser.val();
        usage.duration = parseInt(inputDuration.val());

        this.submitNewEntry(usage);
    }

    submitNewEntry(usage : common.ToolUsage) {

        var r : Reservation = this;
        this.client.request("PUT", "/toolUsage/" + usage.toolId + "/", function(results){r.callbackSubmitNewEntry(results);}, JSON.stringify(usage));
    }

    callbackSubmitNewEntry(result) {
        this.loadTable();
    }

    disableAddEntry(flag : boolean) {
        $("#addEntryUser").prop("disabled", flag);
        $("#addEntryDuration").prop("disabled", flag);
        $("#addEntrySubmit").prop("disabled", flag);
    }
}


$(document).ready(function () {
    reservation = new Reservation();
    reservation.disableAddEntry(true);

    // load list of usage items on change
    $("#machineSelector").change(function(){ reservation.loadTable(); });

    // register callback to add new entries
    $("#addEntrySubmit").click(function(){ reservation.addEntry(); });
});