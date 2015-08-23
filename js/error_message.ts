/// <reference path="jquery.d.ts" />
/// <reference path="RestClient.ts"/>
/// <reference path="common/model/FabTool.ts" />

// typescript import to create XDomainRequests
/// <reference path="lib.d.ts" />
// General REST class

var toolArray: Array<common.FabTool>;

$(document).ready(function () {
    var restClient:RestClient = new RestClient();
    console.log("Starte error_message.html");
    restClient.request("GET","/drupal/tools",drupalCallback);

});

function drupalCallback(value:any):void{
    console.log("error_message_toolsection");
    toolArray = value;
    var mySelect = $('#error_message_toolsection');
    for(var index = 0; index < toolArray.length;index++){
        console.log(toolArray[index])
        mySelect.append("<option>"+toolArray[index].title+"</option>");
    }

    mySelect.prop("selectedIndex", -1);
}

function selected(){
    var selectedItem = $('#error_message_toolsection').find(":selected").text();
    console.log("Selected title: " + selectedItem);
    var selectedFabTool: common.FabTool = getSelectedFabTool(selectedItem);


}

function getSelectedFabTool(aValue: string): common.FabTool{
    for(var intex = 0; intex < toolArray.length;intex++){
        if(toolArray[intex].title == aValue){
            return toolArray[intex];
        }
    }
    return null;

}
