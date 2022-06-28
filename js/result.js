var CountAll = 0;
var Group11 = 0;
var Group12 = 0;
var Group13 = 0;
var Group21 = 0;
var Group22 = 0;
var Group23 = 0;


$(document).ready(function () {
  Connect_DB();
});


function Connect_DB() {
  var firebaseConfig = {
    apiKey: "AIzaSyDfTJJ425U4OY0xac6jdhtSxDeuJ-OF-lE",
    authDomain: "retailproject-6f4fc.firebaseapp.com",
    projectId: "retailproject-6f4fc",
    storageBucket: "retailproject-6f4fc.appspot.com",
    messagingSenderId: "653667385625",
    appId: "1:653667385625:web:a5aed08500de80839f0588",
    measurementId: "G-9SKTRHHSW9"
  };
  firebase.initializeApp(firebaseConfig);
  dbTripPrudential = firebase.firestore().collection("TripSurvey");
  LoadData();
  setInterval("my_function();",3000); 
  //CheckData();
}


function my_function(){
  CountAll = 0;
  Group11 = 0;
  Group12 = 0;
  Group13 = 0;
  Group21 = 0;
  Group22 = 0;
  Group23 = 0;
  LoadData();
}


function LoadData() {
  dbTripPrudential
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      if(doc.data().ConfirmQ1!=0) {
        CountAll = CountAll+1;
        if(doc.data().ConfirmQ1==1) {
          Group11 = Group11+1;
        } else if(doc.data().ConfirmQ1==2) {
          Group12 = Group12+1;
        } else if(doc.data().ConfirmQ1==3) {
          Group13 = Group13+1;
        }
        if(doc.data().ConfirmQ2==1) {
          Group21 = Group21+1;
        } else if(doc.data().ConfirmQ2==2) {
          Group22 = Group22+1;
        } else if(doc.data().ConfirmQ2==3) {
          Group23 = Group23+1;
        }
      }
    });
    $("#CountAll").html("จำนวน "+CountAll+" ชุดข้อมูล");  
    Donus1();
    Donus2();
  });
}


function Donus1() {
  console.log(Group11,Group12,Group13);
    google.charts.load("current", {packages:['corechart']});
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
      var data = google.visualization.arrayToDataTable([
        ["ประเทศ", "Density", { role: "style" } ],
        ["จอร์เจีย-ตุรกี", Group11, "#0057ff"],
        ["ออสเตรีย", Group12, "#f68b1f"],
        ["ดูไบ", Group13, "color: #002d63"]
      ]);

      var view = new google.visualization.DataView(data);
      view.setColumns([0, 1,
         { calc: "stringify",
           sourceColumn: 1,
           type: "string",
           role: "annotation" },
         2]);
      var options = {
        title: "BA Life Recognition Trip 2022 (Group 1)",
        width: 650,
        height: 450,
        bar: {groupWidth: "85%"},
        legend: { position: "none" },
      };
      var chart = new google.visualization.ColumnChart(document.getElementById("columnchart_G1"));
      chart.draw(view, options);
  }
}



function Donus2() {
  console.log(Group11,Group12,Group13);
    google.charts.load("current", {packages:['corechart']});
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
      var data = google.visualization.arrayToDataTable([
        ["ประเทศ", "Density", { role: "style" } ],
        ["ไต้หวัน", Group21, "#0057ff"],
        ["เวียดนาม", Group22, "#f68b1f"],
        ["เกาหลี", Group23, "color: #002d63"]
      ]);

      var view = new google.visualization.DataView(data);
      view.setColumns([0, 1,
         { calc: "stringify",
           sourceColumn: 1,
           type: "string",
           role: "annotation" },
         2]);
      var options = {
        title: "BA Life Recognition Trip 2022 (Group 2)",
        width: 650,
        height: 450,
        bar: {groupWidth: "85%"},
        legend: { position: "none" },
      };
      var chart = new google.visualization.ColumnChart(document.getElementById("columnchart_G2"));
      chart.draw(view, options);
  }
}



