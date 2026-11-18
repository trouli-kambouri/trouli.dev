
window.addEventListener("load", (event) => {
  new cursoreffects.emojiCursor({ emoji: ["🌈", "💕", "🐈", "🦄", "🦕", "🦋", "💖", "🌞", "🦄", "🌈", "🐞", "😺", "🦕", "💕","✨", "🌸", "🐢", "💖", "🌈", "🍓", "🐛"], delay: 35 });
});

var countdownDate = new Date ("Dec 21, 2029 00:00:00").getTime();

var i = setInterval(function(){

    var rn = new Date().getTime();
    var timeUntil = countdownDate - rn;

    var days = Math.floor(timeUntil / (1000 * 60 * 60 * 24));
    var hours = Math.floor((timeUntil % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((timeUntil % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((timeUntil % (1000 * 60)) / 1000);

    document.getElementById("countdown").innerHTML = days + " days " + hours + " hours " + minutes + " minutes " + seconds + " seconds ";

    if (timeUntil < 0) {
    clearInterval(x);
    document.getElementById("countdown").innerHTML = "OH WOW!";
    }
}
)