importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');
var config = {
    apiKey: "AIzaSyCi7WFZ5jXpXfv-HPXwNMr4taZtHpF5eoo",
    authDomain: "hostelfood-88be6.firebaseapp.com",
    databaseURL: "https://hostelfood-88be6.firebaseio.com",
    projectId: "hostelfood-88be6",
    storageBucket: "hostelfood-88be6.appspot.com",
    messagingSenderId: "1019347251845"
};
firebase.initializeApp(config);
const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function(payload) {
    //console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    var notificationTitle = 'Hostel App';
    var notificationOptions = {
      body: payload.body

    };

    return self.registration.showNotification(notificationTitle,
      notificationOptions);
  });