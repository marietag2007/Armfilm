let correct;
let seconds = 60
let correctAnswer = 0;
let incorrectAnswer = 0;
function getElement(id) {
    return document.getElementById(id);
}
function getRandomFilm() {
    return films[Math.floor(Math.random() * (films.length - 1))]
}

function main() {
    let options = [];
    const maxOptions = 3;
    while (options.length < maxOptions) {
      let coun = getRandomFilm();
      if (options.indexOf(coun) === -1) {
        options.push(coun);
      }
    }
    for (let i = 0; i < options.length; i++) {
      getElement(`option${i + 1}label`).innerHTML = options[i].name;
      getElement(`option${i + 1}input`).value = options[i].name;
      getElement(`option${i + 1}input`).checked = false;
    }
    correct = options[Math.round(Math.random() * (options.length - 1))];
    getElement("film").src = correct.film;
  }

function timer() {
    setTimeout(finish, seconds * 1000);
    getElement('time').innerHTML = seconds;
    let countdown = setInterval(function () {
        seconds--;
        getElement('time').textContent = seconds;
        if (seconds <= 0) {
            clearInterval(countdown)
        }
        if (seconds === 10) {
            getElement('time').style.color = '#ff751a';
        }
        if (seconds === 5) {
            getElement('time').style.color = '#ff0000';
        }
    }, 1000)
}
function check() {
    let input;
    try {
        input = document.querySelector('input[name="option"]:checked').value;
    } catch {
      return;
    }
    if (input === correct.name) {
        correctAnswer++;
        getElement('score').innerHTML = correctAnswer;
    } else {
        incorrectAnswer++;
    }
    main();
}
function finish() {
    clearInterval(checkInterval);
    getElement("alert").style.display = "block";
    getElement("card").style.display = "none";
    getElement("alertscore").innerHTML = correctAnswer;
    let percentage = Math.round((correctAnswer / (correctAnswer + incorrectAnswer)) * 100);
    if (isNaN(percentage)) {
        resultForAnswers = 100;
    } else {
        if (percentage >= 75 && percentage > 95) {
            resultForAnswers = "Դուք ցուցաբերել եք լավ արդյունք"
        } else if (percentage >= 95) {
            resultForAnswers = "Դուք ցուցաբերել եք գերազանց արդյունք"
        } else if (percentage <=75) {
            resultForAnswers = "Դուք ցուցաբերել եք ցածր արդյունք"
        }
    }
    getElement('alertaccuracy').innerHTML = ` Քո արդյունքն է ${percentage}%`;
}

function refresh() {
     location = location;
}

let checkInterval = setInterval(check, 1000);
main();
timer();