var data;
var ctx = $("#chart").get(0).getContext("2d");
var offset = 0;
var max = 60;

$('.btn-fuel').click(function(){
	api_request('/api/v1/fuel/', debug_callback);
});

$('.btn-activities').click(function(){
	api_request('/api/v1/fuel/activities/', function(data){
		$('.activities').html('');
		_.each(data.data, function(activity){
			$('.activities').append('<button class="btn btn-activity" data-id="' + activity.activityId + '">' + moment(activity.startTime).fromNow() + '</button>');
		});

		$('.btn-activity').on('click',function(){
			api_request('/api/v1/fuel/activities/' + $(this).attr('data-id') + '/', function(data){
				activity = data;
				updateChart();
			});
		});
	});
});

$('.btn-chart-next').on('click',function(){
	offset+=60;
	updateChart();
});

$('.btn-chart-prev').on('click',function(){
	offset-=60;
	updateChart();
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

function formatData(data, offset, max){
	return {
	labels : getLabels(max),
	datasets : [
			{
				fillColor : "rgba(220,220,220,0.5)",
				strokeColor : "rgba(220,220,220,1)",
				pointColor : "rgba(220,220,220,1)",
				pointStrokeColor : "#fff",
				data : data.metrics[0].values.slice(offset, offset+max)
			},
			{
				fillColor : "rgba(151,187,205,0.5)",
				strokeColor : "rgba(151,187,205,1)",
				pointColor : "rgba(151,187,205,1)",
				pointStrokeColor : "#fff",
				data : data.metrics[1].values.slice(offset, offset+max)
			},
			{
				fillColor : "rgba(123,187,132,0.5)",
				strokeColor : "rgba(123,187,132,1)",
				pointColor : "rgba(123,187,132,1)",
				pointStrokeColor : "#fff",
				data : data.metrics[2].values.slice(offset, offset+max)
			}
		]
	}
}

function getLabels(count){
	var list = [];

	for(var i=0; i<60; i++)
	{
		list.push("" + i);
	}

	return list;
}

var options = {
	scaleOverride : true,
	scaleSteps : 100,
	scaleStepWidth : 1,
	scaleStartValue : 0,
	scaleFontSize : 10
}

function updateChart(){
	new Chart(ctx).Line(formatData(activity, offset, max), options);
	$('h1 span').html(moment(activity.startTime).add('hours',offset/60).format('HH:mm:ss'));
}