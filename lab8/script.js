const burger = document.getElementById("burger");
const menu = document.getElementById("menu");

burger.onclick = function () {
    menu.classList.toggle("show");
};

const images = [
    "https://placehold.co/800x350?text=Слайд+1",
    "https://placehold.co/800x350?text=Слайд+2",
    "https://placehold.co/800x350?text=Слайд+3"
];

let current = 0;

const slide = document.getElementById("slide");
const dots = document.querySelectorAll(".dot");

function showSlide(number) {
    slide.classList.add("fade");

    setTimeout(function () {
        current = number;

        if (current < 0) {
            current = images.length - 1;
        }

        if (current >= images.length) {
            current = 0;
        }

        slide.src = images[current];

        dots.forEach(function (dot) {
            dot.classList.remove("active");
        });

        dots[current].classList.add("active");

        slide.classList.remove("fade");
    }, 200);
}

document.getElementById("next").onclick = function () {
    showSlide(current + 1);
};

document.getElementById("prev").onclick = function () {
    showSlide(current - 1);
};

dots.forEach(function (dot) {
    dot.onclick = function () {
        showSlide(Number(dot.dataset.number));
    };
});

setInterval(function () {
    showSlide(current + 1);
}, 3000);