(function () {
    var names = ["Bill", "John", "Jen", "Jason", "Paul", "Frank", "Steven", "Larry", "Paula", "Laura", "Jim"];

    for (var i = 0; i < names.length; i++) {
        var firstLetter = names[i].charAt(0).toLowerCase();

        if (firstLetter === "j") {
            byeSpeaker(names[i]);
        } else {
            helloSpeaker(names[i]);
        }
    }

    console.log("----- Селекціонування імен через суму ASCII-кодів літер -----");

    var threshold = 500;

    for (var j = 0; j < names.length; j++) {
        var asciiSum = 0;

        for (var k = 0; k < names[j].length; k++) {
            asciiSum += names[j].charCodeAt(k);
        }

        if (asciiSum >= threshold) {
            console.log("Goodbye " + names[j] + " -> ASCII sum = " + asciiSum + " (більше або дорівнює " + threshold + ")");
        } else {
            console.log("Hello " + names[j] + " -> ASCII sum = " + asciiSum + " (менше ніж " + threshold + ")");
        }
    }
})();
