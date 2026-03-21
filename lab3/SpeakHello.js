(function (window) {
    var speakWord = "Hello";

    function speak(name) {
        console.log(speakWord + " " + name);
    }

    window.helloSpeaker = speak;
})(window);
