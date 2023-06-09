class Joke {
    constructor(joke, setup, delivery) {
        this.joke = joke;
        this.setup = setup;
        this.delivery = delivery;
    }
    Joke() {
        return this.joke;
    }
    Setup() {
        return this.setup;
    }
    Delivery() {
        return this.delivery;
    }
}

const jokes = document.getElementById('jokes');
const joke = document.getElementById('joke');
const likeButton = document.getElementById('like');
const dislikeButton = document.getElementById('dislike');
const printLikedJokes = document.getElementById('printLike');
const printDislikedJokes = document.getElementById('printDislike');
let currentJoke = new Joke();

$(document).ready(function () {
    $("#genNew").click(function () {
        $.ajax({
            dataType: "JSON",
            type: "GET",
            url: "https://v2.jokeapi.dev/joke/Any",
            success: function (data) {
                console.log(data);
                console.log(data.category);
                console.log(data.setup);
                console.log(data.delivery);
                console.log(data.joke);

                if (data.joke == undefined) {
                    $("#joke").html(data.setup + " " + data.delivery);
                    currentJoke = new Joke(undefined, data.setup, data.delivery);
                } else {
                    $("#joke").html(data.joke);
                    currentJoke = new Joke(data.joke, undefined, undefined);
                }

                console.log(currentJoke);
                $("#genNew").hide(0).fadeOut(1700);
                $("#genNew").hide(0).fadeIn(1700);
            },
            error: function () {
                alert("Error, server neni dostupny, zkuste to prosim znovu pozdeji.");
            }
        });
    });
});

const likedJokes = [];
const dislikedJokes = [];

function addLikedJoke() {
    likedJokes.push(currentJoke);
    console.log(currentJoke);
    $("#like").hide(0).fadeOut(1700);
    $("#like").hide(0).fadeIn(1700);
}

function addDislikedJoke() {
    likedJokes.push(currentJoke);
    $("#dislike").hide(0).fadeOut(1700);
    $("#dislike").hide(0).fadeIn(1700);
}

likeButton.addEventListener('click', addLikedJoke);
dislikeButton.addEventListener('click', addDislikedJoke);

function printLikedJokesFunction() {
    $("#likedJokes").html();
    for (let i = 0; i < likedJokes; i++) {
        console.log(likedJokes[i].Joke());
        console.log(likedJokes[i].Setup());
        console.log(likedJokes[i].Delivery());
    }
    let allJokes = "";
    for (let i = 0; i < likedJokes; i++) {
        if (likedJokes[i].joke == undefined) {
            allJokes += likedJokes[i].setup + " " + likedJokes[i].delivery + "\n";
        } else {
            allJokes += likedJokes[i].joke + "\n";
        }
    }

    $("#likedJokes").html(allJokes);
    $("#printLike").hide(0).fadeOut(1700);
    $("#printLike").hide(0).fadeIn(1700);
}

printLikedJokes.addEventListener('click', printLikedJokesFunction);

function printDislikedJokesFunction() {
    $("#dislikedJokes").html();
    let allJokes = "";
    for (let i = 0; i < dislikedJokes; i++) {
        if (dislikedJokes[i].joke == undefined) {
            allJokes += dislikedJokes[i].setup + " " + dislikedJokes[i].delivery + "\n";
        } else {
            allJokes += dislikedJokes[i].joke + "\n";
        }
    }

    $("#dislikedJokes").html(allJokes);
    $("#printDislike").hide(0).fadeOut(1700);
    $("#printDislike").hide(0).fadeIn(1700);
}

printDislikedJokes.addEventListener('click', printDislikedJokesFunction);