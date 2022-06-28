var Eid="";
var dateString = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });
var CheckQ1 = 0;
var CheckQ2 = 0;
var NameSelectQ1 = "";
var NameSelectQ2 = "";
var Type11 = "จอร์เจีย-ตุรกี";
var Type12 = "ออสเตรีย";
var Type13 = "ดูไบ";
var Type21 = "ไต้หวัน";
var Type22 = "เวียดนาม";
var Type23 = "เกาหลี";


$(document).ready(function () {
	if(sessionStorage.getItem("LineID")==null) { location.href = 'ba-trip.html'; }
	var str = "";
	str += '<div><img src="'+ sessionStorage.getItem("LinePicture") +'" class="add-profile"></div>';
	str += '<div class="text-name"><b>คุณ'+ sessionStorage.getItem("EmpName_Trip") +'</b></div>';
	$("#MyProfile").html(str);  
	$("#Group11").html(Type11);  
	$("#Group12").html(Type12);  
	$("#Group13").html(Type13);  
	$("#Group21").html(Type21);  
	$("#Group22").html(Type22);  
	$("#Group23").html(Type23);  
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
  dbProfile = firebase.firestore().collection("CheckProfile");
  dbTripPrudential = firebase.firestore().collection("TripSurvey");
  WelcomeTrip();
}


var checkapp = 0;
function WelcomeTrip() {
  dbTripPrudential.where('EmpID','==',sessionStorage.getItem("EmpID_Trip"))
  .limit(1)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
    	checkapp = 1;
		document.getElementById('Loading').style.display='none';
		//document.getElementById('StopApp').style.display='none';
		//if(doc.data().ConfirmTrip==0) {
		//	document.getElementById('WelcomeTrip').style.display='block';
		//} else {
		document.getElementById('WelcomeTrip').style.display='none';
		CheckTripPrudential();
		//}
    });
    if(checkapp==0) {
    	location.href = 'ba-trip.html';
		//document.getElementById('Loading').style.display='none';
		//document.getElementById('WelcomeTrip').style.display='block';
		//document.getElementById('StopApp').style.display='block';
    }
  });
}



function CheckTripPrudential() {
  var str = "";
  dbTripPrudential.where('EmpID','==',sessionStorage.getItem("EmpID_Trip"))
  .limit(1)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
		Eid = doc.id;
		//sessionStorage.setItem("EmpName", doc.data().EmpName);
		//sessionStorage.setItem("EmpPosition", doc.data().EmpPosition);
		//sessionStorage.setItem("EmpBranch", doc.data().EmpBranch);
		//sessionStorage.setItem("EmpZone", doc.data().EmpZone);
		//sessionStorage.setItem("EmpRH", doc.data().EmpRH);
		//sessionStorage.setItem("ConfirmTrip", doc.data().ConfirmTrip);
		if(doc.data().ConfirmQ1==0) {
			document.getElementById('Loading').style.display='none';
			document.getElementById('WelcomeTrip').style.display='none';
			document.getElementById('ShowTrip').style.display='block';
			document.getElementById('ShowResult').style.display='none';
		} else {
			str += '<div class="btn-t9" style="margin-top:10px;cursor: none;">ข้อมูลการโหวตประเทศของคุณ</div>';
			str += '<div style="margin-top:15px;"><img src="'+ sessionStorage.getItem("LinePicture") +'" class="add-profile"></div>';
			str += '<div class="text-name"><b>'+ sessionStorage.getItem("EmpName_Trip") +'</b></div>';
			str += '<div class="btn-t8" style="margin:35px auto 15px auto;background:#0056ff;"><div>กลุ่มที่ 1 (ประเทศที่เลือก)</div>';
			str += '<div class="btn-t9" style="cursor: default;">'+doc.data().SelectQ1+'</div></div>';
			str += '<div class="btn-t8" style="margin:25px auto;"><div>กลุ่มที่ 2 (ประเทศที่เลือก)</div>';
			str += '<div class="btn-t9" style="cursor: default;">'+doc.data().SelectQ2+'</div></div>';
			str += '<div class="text-contury" style="margin-top:-25px;">ทำรายการเมื่อ : '+doc.data().DateConfirm+'</div>';
			document.getElementById('Loading').style.display='none';
			document.getElementById('ShowTrip').style.display='none';
			document.getElementById('WelcomeTrip').style.display='none';
			document.getElementById('ShowResult').style.display='block';
    		$("#DisplayResultTrip").html(str);  
		}
    });
    if(Eid=="") {
/*
	    dbTripPrudential.add({
			LineID : sessionStorage.getItem("LineID"),
			LineName : sessionStorage.getItem("LineName"),
			LinePicture : sessionStorage.getItem("LinePicture"),
			EmpID : parseFloat(sessionStorage.getItem("EmpID_Trip")),
			EmpName : sessionStorage.getItem("EmpName_Trip"),
			//ConfirmTrip : parseInt(sSendAnswer),
			ConfirmQ1 : 0,
			ConfirmQ2 : 0,
			SelectQ1 : "",
			SelectQ2 : "",
			DateConfirm : "",
			DateTimeStamp : ""
	    });
*/
	    //console.log("AddNew="+Eid);
		document.getElementById('WelcomeTrip').style.display='none';
		document.getElementById('ShowTrip').style.display='block';
		//CheckTripPrudential();
    }
  });
}



function buttonQ1(x) {
	var i = 1;
	for (i = 1; i < 4; i++) {
	 	document.getElementById(i).classList.remove('box-novi');
	}    
	if(x!="") {
		document.getElementById(x).classList.add('box-novi');
	}
	CheckQ1 = document.querySelector('input[name="Q1"]:checked').value;
	if(CheckQ1!=0 && CheckQ2!=0) {
		var element = document.getElementById("SendAns");
		element.classList.remove("btn-t0");
		var element = document.getElementById("SendAns");
		element.classList.add("btn-t1");
	}
}


function buttonQ2(x) {
	var i = 1;
	for (i = 1; i < 4; i++) {
	 	document.getElementById("2"+i).classList.remove('box-novi');
	}    
	if(x!="") {
		document.getElementById("2"+x).classList.add('box-novi');
	}
	CheckQ2 = document.querySelector('input[name="Q2"]:checked').value;
	if(CheckQ1!=0 && CheckQ2!=0) {
		var element = document.getElementById("SendAns");
		element.classList.remove("btn-t0");
		var element = document.getElementById("SendAns");
		element.classList.add("btn-t1");
	}
}



function SendAnswer() {
    NewDate();
	var str = "";
	var sSendAnswer = "";
    var TimeStampDate = Math.round(Date.now() / 1000);
	//sSendAnswer = document.querySelector('input[name="SendAnswer"]:checked').value;
	//sSendAnswer = document.querySelector('input[name="SendAnswer"]:checked').value;
	//sSendAnswer = 1;
	if(CheckQ1==0 || CheckQ2==0) {
		alert("กรุณาเลือกรายการก่อนบันทึกรายการ");
	} else {
		if(CheckQ1==1) {
			NameSelectQ1 = Type11;
		} else if(CheckQ1==2) {
			NameSelectQ1 = Type12;
		} else if(CheckQ1==3) {
			NameSelectQ1 = Type13;
		}
		if(CheckQ2==1) {
			NameSelectQ2 = Type21;
		} else if(CheckQ2==2) {
			NameSelectQ2 = Type22;
		} else if(CheckQ2==3) {
			NameSelectQ2 = Type23;
		}

		dbTripPrudential.doc(Eid).update({
			LineID : sessionStorage.getItem("LineID"),
			LineName : sessionStorage.getItem("LineName"),
			LinePicture : sessionStorage.getItem("LinePicture"),
			EmpID : sessionStorage.getItem("EmpID_Trip"),
			EmpName : sessionStorage.getItem("EmpName_Trip"),
			//ConfirmTrip : parseInt(sSendAnswer),
			ConfirmQ1 : parseInt(CheckQ1),
			ConfirmQ2 : parseInt(CheckQ2),
			SelectQ1 : NameSelectQ1,
			SelectQ2 : NameSelectQ2,
			DateConfirm : dateString,
			DateTimeStamp : TimeStampDate
		});     
		str += '<div class="btn-t9" style="margin-top:10px;cursor: none;">ยืนยันการทำรายการของคุณ</div>';
		str += '<div style="margin-top:15px;"><img src="'+ sessionStorage.getItem("LinePicture") +'" class="add-profile"></div>';
		str += '<div class="text-name" style="color:#0056ff;"><b>'+ sessionStorage.getItem("EmpName_Trip") +'</b></div>';
		str += '<div class="btn-t8" style="margin:35px auto 15px auto;background:#0056ff;"><div>กลุ่มที่ 1 (ประเทศที่เลือก)</div>';
		str += '<div class="btn-t9" style="cursor: default;">'+NameSelectQ1+'</div></div>';
		str += '<div class="btn-t8" style="margin:25px auto;"><div>กลุ่มที่ 2 (ประเทศที่เลือก)</div>';
		str += '<div class="btn-t9" style="cursor: default;">'+NameSelectQ2+'</div></div>';
		str += '<div class="text-contury" style="margin-top:-25px;">ทำรายการเมื่อ : '+dateString+'</div>';

    	$("#DisplayResult").html(str);  
    	CheckTripPrudential();
		document.getElementById('id01').style.display='block';
	}
}





$("ShowTrip").on("click", "#btnOK", function() {
  $("#MsgOK").toggle(); /*shows or hides #box*/
  /*$(this) refers to the targeted element: #toggleMessage*/
  var text = $(this).text();
  
  if (text=="Show") { /*if text inside #toggleMessage is Show...*/
    $(this).text("Hide"); /*Change button text to Hide*/
  }
  else {
    $(this).text("Show"); /*Change button text to Show*/
  }
});

function CloseAll() {
	document.getElementById('id01').style.display='none';
}




function showHideDiv(ele) {
	var srcElement = document.getElementById(ele);
	if (srcElement != null) {
	    if (srcElement.style.display == "block") {
	        srcElement.style.display = 'none';
	    }
	    else {
	        srcElement.style.display = 'block';
	    }
	    return false;
	}
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

