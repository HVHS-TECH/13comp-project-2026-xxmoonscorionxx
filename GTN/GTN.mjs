function leaderboardGTN() {
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