var data;

$('button.fuel').click(function(){
	api_request('/api/v1/fuel/');
});

$('button.activities').click(function(){
	api_request('/api/v1/fuel/activities/');
});

$('button.activity').click(function(){
	api_request('/api/v1/fuel/activities/' + $('.activity').val() + '/');
});

function api_request(url){
	$.getJSON(url + $('.access-token').val(), function(data){
		console.log(data);
		this.data = data;
	})
	.fail(function( jqxhr, textStatus, error ) {
	  console.log( textStatus);
	  console.log( error);
	}).always(function() { console.log( "complete" ); });
}