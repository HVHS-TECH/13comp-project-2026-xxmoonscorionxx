
document.addEventListener("DOMContentLoaded", function() {
    var messageSpace = document.getElementById("welcomeMessage");
    messageSpace.innerHTML = "You've connected to the JavaScript!";
    console.log("JavaScript is connected!");
    
})
const COL_C = 'white';	    // These two const are part of the coloured 	
const COL_B = '#CD7F32';	//  console.log for functions scheme

import { fb_initialise, fb_readRecord, submitData, refreshMessages, changeHeading, saveMessage, showMessages, redirectRegistration //, fb_authenticate, fb_onAuthStateChanged, fb_signOut, fb_writeRecord, fb_readAll, fb_destroy, fb_updateRecord  

}   
    from '/fb_io.mjs';

window.fb_initialise = fb_initialise;
window.saveMessage = saveMessage;
window.showMessages = showMessages;
window.fb_readRecord = fb_readRecord;
window.submitData = submitData;
window.refreshMessages = refreshMessages;
window.changeHeading = changeHeading;
winddow.redirectRegistration = redirectRegistration;
/**window.fb_authenticate = fb_authenticate; 
window.fb_onAuthStateChanged = fb_onAuthStateChanged;
window.fb_signOut = fb_signOut;
window.fb_writeRecord = fb_writeRecord;

window.fb_readAll = fb_readAll;
window.fb_destroy = fb_destroy;
window.fb_updateRecord = fb_updateRecord; **/
