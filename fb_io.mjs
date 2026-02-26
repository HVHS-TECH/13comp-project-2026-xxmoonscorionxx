const COL_C = 'white';	    	
const COL_B = '#CD7F32';	

console.log('%c fb_io.mjs',
    'color: blue; background-color: white;');
let fb_gamedb;
let userUID;
let userName;
let verifyUser = null;
let firstButtonPressed = 0;


/**************************************************************/
// Import all external constants & functions required
/**************************************************************/
// Import all the methods you want to call from the firebase modules
import { initializeApp }
    from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase }
    from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";
import { getAuth, GoogleAuthProvider, signInWithPopup }
    from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { onAuthStateChanged }
    from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { signOut}
    from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { ref, set }
    from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";
import { get}
    from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";
import { update }
    from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";
/**************************************************************/
// EXPORT FUNCTIONS 
// List all the functions called by code or html outside of this module
/**************************************************************/
export {
   fb_test, fb_initialise, fb_readRecord, submitData, refreshMessages, changeHeading, saveMessage, showMessages//,fb_authenticate, fb_onAuthStateChanged, fb_signOut, fb_writeRecord, fb_readAll, fb_destroy, fb_updateRecord
};
function fb_test() {
    console.log("Test")
};
function fb_initialise() {
    console.log('%c fb_initialise(): ',
        'color: ' + COL_C + '; background-color: ' + COL_B + ';');
            const firebaseConfig = {
                apiKey: "AIzaSyCttBxOg7c8gFwt2lvB639v8viidWrVnYM",
                authDomain: "refresh-c5e63.firebaseapp.com",
                projectId: "refresh-c5e63",
                storageBucket: "refresh-c5e63.firebasestorage.app",
                messagingSenderId: "642080257991",
                appId: "1:642080257991:web:ed25909b7ec79b721d0be2",
                measurementId: "G-92VEN9VD93"
                };            
            const FB_GAMEAPP = initializeApp(firebaseConfig);
            fb_gamedb= getDatabase(FB_GAMEAPP);
            console.info(fb_gamedb);
            console.log("Hello:")
            console.log("working function")
    const AUTH = getAuth(FB_GAMEAPP);
    const PROVIDER = new GoogleAuthProvider();

    // The following makes Google ask the user to select the account
    PROVIDER.setCustomParameters({
        prompt: 'select_account'
    });

    // Create a popup window to sign in
    signInWithPopup(AUTH, PROVIDER).then((result) => {

        
        console.log(result.user.uid);
        console.log(result.user.email);
        console.log(result.user.displayName);
        userUID = result.user.uid;
      //  const userEmail = result.user.email;
         userName = result.user.displayName;
         const dbReference= ref(fb_gamedb, ('Users/'+ userUID));


    set(dbReference, { Name: userName}).then(() => {


    }).catch((error) => {
        console.log("error:  " + error)


    });
    }).catch((error) => {

    });
};
function fb_readRecord() {
    const dbReference= ref(fb_gamedb, "Users/"+ userUID);

    get(dbReference).then((snapshot) => {
        var fb_data = snapshot.val();
        fb_data = fb_data.Name;
        if (fb_data != null) {
        console.log("Data: " + fb_data);
        document.getElementById("readDataBaseName").innerHTML = fb_data;
        } else {
        }
    }).catch((error) => {
        console.log("error:  " + error );
    });
};
function submitData() {
    const dataInput = document.getElementById("dataInput").value;
    const dataInput2 = document.getElementById("dataInput2").value;
    const dbReference= ref(fb_gamedb, ('Users/'+ userUID + "/" + dataInput));
   //      document.getElementById("readDataBaseName").innerHTML = userName;

    set(dbReference, { Data: dataInput2}).then(() => {

    }).catch((error) => {
        console.log("error authenticating: " + error);
       // document.getElementById("p_fbAuthenticate").innerHTML = "Failled Authenticating";
    });
};
function refreshMessages() {
    const dbReference= ref(fb_gamedb, "Users/"+ userUID);

    get(dbReference).then((snapshot) => {
        var fb_data = snapshot.val();
        fb_data = fb_data.Name;
        if (fb_data != null) {
        //document.getElementById("readDataBasename").innerHTML = fb_data;
        console.log("Data: " + fb_data);
        document.getElementById("readDataBaseName").innerHTML = fb_data;
        } else {
        //document.getElementById("readDataBasename").innerHTML = "No Record Found";
        }
    }).catch((error) => {
        console.log("error:  " + error );
    });
};
function changeHeading() {
    if (firstButtonPressed == 0) {
        const heading = document.getElementById("welcomeMessage");
        heading.innerHTML = "You pressed the button!";
        console.log("working");
        firstButtonPressed = 1;
    } else {
        const headingInput = document.getElementById("textInputHeader").value;
        const heading = document.getElementById("welcomeMessage");
        heading.innerHTML = headingInput;
    }
    
}   
function saveMessage() {
    const messageText = document.getElementById("messageInput").value;
    const dbReference = ref(fb_gamedb, "Messages/" + Date.now());
    set(dbReference, {user: userName, text: messageText
    }).then(() => {
        console.log("Message saved");
    }).catch((error) => {
        console.log("error: " + error);
    });
}
function showMessages() {
    const dbReference = ref(fb_gamedb, "Messages");
    get(dbReference).then((snapshot) => {
        const data = snapshot.val();
        let output = "";
        for (var key in data) {
         output += data[key].user + ": " + data[key].text + "<br>";
        }
        document.getElementById("allMessages").innerHTML = output;
       }).catch((error) => {
        console.log("error: " + error);
    });
}
