﻿// typescript import to create XDomainRequests
/// <reference path="lib.d.ts" />
// General REST class
class RestClient{
	url:string;	

	constructor(){
		this.url = "https://ec2-52-28-16-59.eu-central-1.compute.amazonaws.com";
	}
	
	// CORS request
	request(method:string, path:string, callback: (s: string) => any){
		  var urlPath:string = this.url + path;

		  var xhr = this.createCORSRequest(method, urlPath);
		  if (!xhr) {
		    alert('CORS not supported');
		    return null;
		  }
		  
		  // return json response and handle reponse in the specific callback function
		  xhr.onload = function() {
		    var response:string = JSON.parse(xhr.responseText);
		    callback(response);
		  };

		  xhr.onerror = function() {
		    alert('An error occured while loading the content.');
		    return null;
		  };

		  xhr.send();
        }


	// Create the XHR object
	createCORSRequest(method:string,url:string){
	  	  var xhr = new XMLHttpRequest();
		  if ("withCredentials" in xhr) {
		    // XHR for Chrome/Firefox/Opera/Safari.
		    xhr.open(method, url, true);
		  } else if (typeof XDomainRequest != "undefined") {
		    // XDomainRequest for IE
		    xhr = <any>new XDomainRequest();
		    xhr.open(method, url);
		  } else {
		    // CORS not supported.
		    xhr = null;
		  }
		  return xhr;
	}
}