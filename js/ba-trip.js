var Eid = "";
var EidProfile = "";
var CheckFoundData = 0;
var sCheckBottom = 0;
var dateString = "";
var CheckSurvey = 0;


$(document).ready(function () {
/*
  var str = "";
  var sLineID = "Ua6b6bf745bd9bfd01a180de1a05c23b3";
  var sLineName = "Website";
  var sLinePicture = "https://profile.line-scdn.net/0hoLlg-mNNMGNRHiaTpMdPNG1bPg4mMDYrKX8qVnIYOgYpe3QwbCp2AXVKaVN_fnMzOC16V3NMagF8";
  sessionStorage.setItem("LineID", sLineID);
  sessionStorage.setItem("LineName", sLineName);
  sessionStorage.setItem("LinePicture", sLinePicture);
  str += '<div><img src="'+ sessionStorage.getItem("LinePicture") +'" class="add-profile" style="width:100px; height:100px;"></div>';
  str += '<div class="NameLine">'+ sessionStorage.getItem("LineName")+'</div>';
  $("#MyProfile").html(str);  
  Connect_DB();
  */

  main()
});



async function main() {
  await liff.init({ liffId: "1655966947-e3Pjqny7" });
  document.getElementById("isLoggedIn").append(liff.isLoggedIn());
  if(liff.isLoggedIn()) {
    getUserProfile();
  } else {
    liff.login();
  }
}


async function getUserProfile() {
  var str = "";
  const profile = await liff.getProfile();
  sessionStorage.setItem("LineID", profile.userId);
  sessionStorage.setItem("LineName", profile.displayName);
  sessionStorage.setItem("LinePicture", profile.pictureUrl);
  str += '<div><img src="'+ sessionStorage.getItem("LinePicture") +'" class="add-profile"></div>';
  str += '<div class="NameLine">'+ sessionStorage.getItem("LineName")+'</div>';
  $("#MyProfile").html(str);  
  Connect_DB();
  //CheckData();
}


function openWindow() {
  liff.openWindow({
    url: "https://line.me",
    external: true     
  })
}


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
  dbProfile = firebase.firestore().collection("CheckProfile");
  dbTripPrudential = firebase.firestore().collection("TripSurvey");
  CheckData();
  //CheckTripPrudential();
}


function CheckData() {
  dbProfile.where('lineID','==',sessionStorage.getItem("LineID"))
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      CheckFoundData = 1;
      EidProfile = doc.id;
      sDateRegister = doc.data().DateRegister;
      sessionStorage.setItem("EmpID_Trip", doc.data().empID);
      sessionStorage.setItem("EmpName_Trip", doc.data().empName);
      document.getElementById("txtEmpID").value = doc.data().empID;
      document.getElementById("txtEmpName").value = doc.data().empName;
      document.getElementById("txtEmpPhone").value = doc.data().mpPhone;
      document.getElementById("txtEmpGroup").value = doc.data().empGroup;
      CheckNewSurvey();
      //location.href = 'book-trip.html';
      //alert("found");
    });
    if(CheckFoundData==0) {
      //AddNewSurvey();
      OpenForm();
    }
  });
}


var CheckSurvey = 0;
function CheckNewSurvey() {
  dbTripPrudential.where('EmpID','==',sessionStorage.getItem("EmpID_Trip"))
  .limit(1)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      CheckSurvey = 1;
      document.getElementById('loading').style.display='none';
      document.getElementById('myTimer').style.display='block';
      //location.href = 'book-trip.html';
    });
    if(CheckSurvey==0) {
      AddNewSurvey();
      document.getElementById('loading').style.display='none';
      document.getElementById('myTimer').style.display='block';
    }
  });
}



function AddNewSurvey() {
  dbTripPrudential.add({
    LineID : sessionStorage.getItem("LineID"),
    LineName : sessionStorage.getItem("LineName"),
    LinePicture : sessionStorage.getItem("LinePicture"),
    EmpID : sessionStorage.getItem("EmpID_Trip"),
    EmpName : sessionStorage.getItem("EmpName_Trip"),
    ConfirmQ1 : 0,
    ConfirmQ2 : 0,
    SelectQ1 : "",
    SelectQ2 : "",
    DateConfirm : "",
    DateTimeStamp : ""
  });
}



function OpenForm() {
  if(CheckFoundData==1) {
    var str = "";
    dbTripPrudential.where('EmpID','==',sessionStorage.getItem("EmpID_Trip"))
    .limit(1)
    .get().then((snapshot)=> {
      snapshot.forEach(doc=> {
        CheckSurvey = 1;
        Eid = doc.id;
        if(doc.data().CheckQ1==0) {
          document.getElementById('myRegister').style.display='none';
        } else {
          location.href = 'book-trip.html';
        }
      });
      if(CheckSurvey==1) {
        document.getElementById('loading').style.display='none';
        document.getElementById('NotPass').style.display='none';
        document.getElementById('myTimer').style.display='block';
      } else {
        document.getElementById('loading').style.display='none';
        document.getElementById('NotPass').style.display='block';
        document.getElementById('myTimer').style.display='none';
      }
    });
  } else {
    document.getElementById('loading').style.display='none';
    document.getElementById('myRegister').style.display='block';
    document.getElementById('myTimer').style.display='none';
  }
}



function ClickSaveProfile() {
  sCheckBottom = 0;
  stxtEmpID = document.getElementById("txtEmpID").value;
  stxtEmpName = document.getElementById("txtEmpName").value;
  stxtEmpPhone = document.getElementById("txtEmpPhone").value;
  stxtEmpGroup = document.getElementById("txtEmpGroup").value;
  if(stxtEmpID !== null && stxtEmpID !== '') { sCheckBottom = sCheckBottom+1; }
  if(stxtEmpName !== null && stxtEmpName !== '') { sCheckBottom = sCheckBottom+1; }
  if(stxtEmpPhone !== null && stxtEmpPhone !== '') { sCheckBottom = sCheckBottom+1; }
  if(stxtEmpGroup !== null && stxtEmpGroup !== '') { sCheckBottom = sCheckBottom+1; }
  if(sCheckBottom==4) {
    SaveData();
  } else {
    alert("กรุณากรอกรายละเอียดให้ครบถ้วน");
  }
}


function SaveData() {
  NewDate();
  if(EidProfile=="") {
    dbProfile.add({
      lineID : sessionStorage.getItem("LineID"),
      linename : sessionStorage.getItem("LineName"),
      empPicture : sessionStorage.getItem("LinePicture"),
      empID : document.getElementById("txtEmpID").value,
      empName : document.getElementById("txtEmpName").value,
      empPhone : document.getElementById("txtEmpPhone").value,
      empGroup : document.getElementById("txtEmpGroup").value,
      empBr : document.getElementById("txtEmpGroup").value,
      empAddress : "",
      memo : "",
      statusconfirm : 2,
      statusedit : 1,
      statuspass : 0,
      lastcheckin : dateString,
      DateRegister :  dateString
    });
    sessionStorage.setItem("EmpID_Trip", document.getElementById("txtEmpID").value);
    sessionStorage.setItem("EmpName_Trip", document.getElementById("txtEmpName").value);
    AddNewSurvey();
    document.getElementById('myTimer').style.display='block';
  }
  document.getElementById('myRegister').style.display='none';
  document.getElementById('myTimer').style.display='block';
}





function NewDate() {
  var today = new Date();
  var day = today.getDate() + "";
  var month = (today.getMonth() + 1) + "";
  var year = today.getFullYear() + "";
  var hour = today.getHours() + "";
  var minutes = today.getMinutes() + "";
  var seconds = today.getSeconds() + "";
  var ampm = hour >= 12 ? 'PM' : 'AM';
  day = checkZero(day);
  month = checkZero(month);
  year = checkZero(year);
  hour = checkZero(hour);
  minutes = checkZero(minutes);
  seconds = checkZero(seconds);
  dateString = day + "/" + month + "/" + year + " " + hour + ":" + minutes + ":" + seconds +" "+ ampm;
}


function checkZero(data){
  if(data.length == 1){
    data = "0" + data;
  }
  return data;
}


