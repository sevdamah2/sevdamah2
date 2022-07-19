function init(){
  var firebaseConfig = {
    apiKey: "AIzaSyCcKFaRKscBNN8QuGneKG571AWORehjQFI",
    authDomain: "sajuweb-bcba0.firebaseapp.com",
    databaseURL: "https://sajuweb-bcba0-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "sajuweb-bcba0",
    storageBucket: "sajuweb-bcba0.appspot.com",
    messagingSenderId: "56351255488",
    appId: "1:56351255488:web:8bcb71de3f6897066f7625",
    measurementId: "G-9SY2G9FVKL"
};
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  ref = firebase.database().ref("messages");


    firebase.database().ref("messages").on("child_added", (snapshot) => {
        console.log(snapshot.val().message);
        var html = '';
        if (snapshot.val().sender ==   myname) {
            html += '<li class="message my">';
            html += '<p class="text">' + snapshot.val().message + '</p>';
            html += '<span class="date">' + tarih(snapshot.val().time) + '</span>';
            html += '</li>';
        } else {
            html += '<li class="message">';
            html += '<p class="text">' + snapshot.val().message + '</p>';
            html += '<span class="date">' + tarih(snapshot.val().time) + '</span>';
            html += '<span class="sender">' + snapshot.val().sender + '</span>';
            html += '</li>';
        }
        messages.innerHTML += html;
        messages.scroll({ behavior: "smooth", top: 999999999999999999999 });
    })
}



  function sohbetebasla(){
    myname = nameInput.value;
    console.log(myname);
    if(myname.length > 0){
      login.classList.add("hidden");
      init();
    }
  }

  function mesajgonder(){
    var msg =document.getElementById("myinput").value;
    if(msg.length > 0 ){
      ref.push().set({
        sender:myname,
        message:msg,
        time:firebase.database.ServerValue.TIMESTAMP
      });
      document.getElementById("myinput").value = "";
    }
  }
  function tarih(stamp) {
    var dts = new Date(stamp);
    var s = "0" + dts.getHours();
    var d = "0" + dts.getMinutes();
    var format = s.substr(-2) + ":" + d.substr(-2);
    return format;
}

  var nameInput = document.getElementById("name");
  var messages = document.getElementById("messages");
  var login = document.querySelector(".login");
  messages.innerHTML="";
  var myname = "";
  
