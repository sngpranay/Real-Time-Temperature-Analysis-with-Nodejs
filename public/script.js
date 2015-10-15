
      var socket = io();

//----------------------Real Time Graph ----------------------------------//
      var smoothie = new SmoothieChart( {
      grid: { strokeStyle:'rgb(125, 0, 0)', fillStyle:'rgb(60, 0, 0)',
      lineWidth: 1, millisPerLine: 2000, verticalSections: 6, },
      minValue:-10,
      maxValue:50,
      interpolation:"step",
      labels: { fillStyle:'rgb(255, 255, 255)' },
      sharpLines:true,
      labels:{fontSize:15},
      horizontalLines:{color:'#ffff6f',lineWidth:1,value:0},
      timestampFormatter:SmoothieChart.timeFormatter
      });


      var lineA = new TimeSeries();
      var lineB = new TimeSeries();
      var lineC = new TimeSeries();
      var lineD = new TimeSeries();

      smoothie.addTimeSeries(lineA, { strokeStyle:'rgb(0 , 255 , 0)', fillStyle:'rgba(0, 255, 0, 0.1)', lineWidth:3 });
      smoothie.addTimeSeries(lineB, { strokeStyle:'rgb(0 ,0 , 255)', fillStyle:'rgba(0, 0, 255, 0.1)', lineWidth:3 });
      smoothie.addTimeSeries(lineC, { strokeStyle:'rgb(0 ,100 , 150)', fillStyle:'rgba(0, 0, 255, 0.1)', lineWidth:3 });
      smoothie.addTimeSeries(lineD, { strokeStyle:'rgb(0 ,0 , 0)', fillStyle:'rgba(0, 0, 255, 0.1)', lineWidth:3 });



      smoothie.streamTo(document.getElementById("mycanvas"), 0 /*delay*/);





      socket.on("A", function(data) {
      lineA.append(new Date().getTime(),data);
      $(document.getElementById('val_one')).text(data);
      });

      socket.on("B", function(data) {
      lineB.append(new Date().getTime(),data);
      $(document.getElementById('val_two')).text(data);
      });

      socket.on("C", function(data) {
      lineC.append(new Date().getTime(),data);
      $(document.getElementById('val_three')).text(data);
      });

      socket.on("D", function(data) {
      lineD.append(new Date().getTime(),data);
      $(document.getElementById('val_four')).text(data);
      });
//-------------Historical Graph ---------------------------------------------//

$( "#buttonHistory" ).click(function() {
//  alert( "Handler for .click() called." );
var string = "Historical Data"
 socket.emit("buttonPress",string);
});

socket.on("A1", function(newString) {

var g = new Dygraph(document.getElementById("graphdiv"),

  newString
,
{
  labels: [ "Time", "Sensor-A" ]

});


});
