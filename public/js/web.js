var data;

$('.btn-fuel').click(function(){
	api_request('/api/v1/fuel/', debug_callback);
});

$('.btn-activities').click(function(){
	api_request('/api/v1/fuel/activities/', function(data){
		$('.activities').html('');
		_.each(data.data, function(activity){
			$('.activities').append('<button class="btn-activity" data-id="' + activity.activityId + '">' + moment(activity.startTime).fromNow() + '</button>');
		});

		$('.btn-activity').on('click',function(){
			api_request('/api/v1/fuel/activities/' + $(this).attr('data-id') + '/', function(data){
				console.log(data);
				//Get context with jQuery - using jQuery's .get() method.
				var ctx = $("#chart").get(0).getContext("2d");
				//This will get the first returned node in the jQuery collection.
				var newChart = new Chart(ctx).Line(formatData(data));

			});
		});
	});
});


function api_request(url, _callback){
	$.getJSON(url + $('.access-token').val(), _callback)
	.fail(function( jqxhr, textStatus, error ) {
	  console.log( textStatus);
	  console.log( error);
	}).always(function() { console.log( "complete" ); });
}

function debug_callback(data) {
	console.log(data);
	this.data = data;
}

/*
{
	labels : ["January","February","March","April","May","June","July"],
	datasets : [
		{
			fillColor : "rgba(220,220,220,0.5)",
			strokeColor : "rgba(220,220,220,1)",
			pointColor : "rgba(220,220,220,1)",
			pointStrokeColor : "#fff",
			data : [65,59,90,81,56,55,40]
		},
		{
			fillColor : "rgba(151,187,205,0.5)",
			strokeColor : "rgba(151,187,205,1)",
			pointColor : "rgba(151,187,205,1)",
			pointStrokeColor : "#fff",
			data : [28,48,40,19,96,27,100]
		}
	]
}
*/

function formatData(data){
	return {
	labels : getLabels(data.metrics[0].values.length),
	datasets : [
			{
				fillColor : "rgba(220,220,220,0.5)",
				strokeColor : "rgba(220,220,220,1)",
				pointColor : "rgba(220,220,220,1)",
				pointStrokeColor : "#fff",
				data : data.metrics[0].values
			},
			{
				fillColor : "rgba(151,187,205,0.5)",
				strokeColor : "rgba(151,187,205,1)",
				pointColor : "rgba(151,187,205,1)",
				pointStrokeColor : "#fff",
				data : data.metrics[1].values
			},
			{
				fillColor : "rgba(123,187,132,0.5)",
				strokeColor : "rgba(123,187,132,1)",
				pointColor : "rgba(123,187,132,1)",
				pointStrokeColor : "#fff",
				data : data.metrics[2].values
			}
		]
	}
}

function getLabels(count){
	var list = [];

	for(var i=0; i<50; i++)
	{
		list.push("" + i);
	}

	console.log(list);
	return list;
}