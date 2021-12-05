// Declaring all the variable
const muteImage = document.querySelector(".mute");
const unMuteImage = document.querySelector(".un-mute");
const song = document.createElement("audio");
const charactersDetails = document.getElementById("characters");
const personalInfo = document.getElementById("personal-info");
const anatomyDetails = document.getElementById("anatomy");
const charcterDetails = document.querySelector(".character-details");
const personalData = document.querySelector(".personal-data");
let timerId;

//Song Start Playing
let mute = () => {
  song.src = `starwars.mp3`;
  song.autoplay = true;
  unMuteImage.style.display = "block";
  muteImage.style.display = "none";
  // console.log('Hai');
};

//Song will stop after
let unmute = () => {
  song.src = `starwars.mp3`;
  unMuteImage.style.display = "none";
  muteImage.style.display = "block";
  // console.log('Hai from unmute');
  song.autoplay = false;
};

// Fethcing the characters data from the api
let charactersData = async (a) => {
  let response = await fetch(`https://swapi.dev/api/people/?search=${a}`);
  let result = await response.json();
  return result.results;
};

//main function
let main = async () => {
  let searchInput = document.querySelector(".search-bar").value;
  //   console.log('searchInput:', searchInput)
  //if the innput field is empty then charactersDetails box will be hidden vice versa
  if (!searchInput) {
    // console.log("Nulll");
    charactersDetails.style.visibility = "hidden";
  } else {
    // console.log("Nooo");
    charactersDetails.style.visibility = "visible";
    charactersDetails.style.background = "#2d2f30";
  }
  let charactersInfo = await charactersData(searchInput);
  if (charactersInfo === undefined) {
    return false;
  }

  appendCharacters(charactersInfo);
  // console.log('charactersInfo:', charactersInfo)
};

//appending function
let appendCharacters = (c) => {
  // console.log('c:', c)
  charactersDetails.innerHTML = "";

  //appending the name , gender and age at the charactersDetails cont. it will show the results of the user query
  for (let data of c) {
    const characterName = document.createElement("p");
    const age = document.createElement("p");
    const characterGender = document.createElement("p");

    characterName.innerHTML = data.name;
    characterName.classList.add("characterName");
    //add mouse events
    characterName.addEventListener("mousemove", () => {
      characterName.style.color = "yellow";
    });
    characterName.addEventListener("mouseout", () => {
      characterName.style.color = "white";
    });
    //appending the details of the characters whenenver user click on the particular character name
    characterName.addEventListener("click", () => {
      personalData.style.display = "block";

      let personalInfoMessage = document.createElement("p");
      // personalInfoMessage.innerHTML = "Personal Info"

      let name = document.createElement("p");
      name.innerHTML = `${data.name}`;

      let birthYear = document.createElement("p");
      birthYear.innerHTML = `Birth Year : ${data.birth_year}`;

      let gender = document.createElement("p");
      gender.innerHTML = `Gender : ${data.gender}`;

      let height = document.createElement("p");
      height.innerHTML = `Height : ${data.height}`;

      let anatomy = document.createElement("p");
      // anatomy.innerHTML ='Anatomy';

      let eyeColor = document.createElement("p");
      eyeColor.innerHTML = `Eye Color : ${data.eye_color}`;

      let mass = document.createElement("p");
      mass.innerHTML = `Mass : ${data.mass}`;

      let hairColor = document.createElement("p");
      hairColor.innerHTML = `Hair Color : ${data.hair_color}`;

      personalInfoMessage.append(birthYear, gender, height);
      personalInfoMessage.classList.add("personal-Info-cont");
      personalInfo.append(personalInfoMessage);
      document.querySelector(".character-name").append(name);

      anatomy.append(eyeColor, mass, hairColor);
      anatomy.classList.add("anatomy-cont");
      anatomyDetails.append(anatomy);
      // console.log('name:', name)

      // console.log('characterName:', data.birth_year )
    });

    age.innerHTML = data.birth_year;
    age.classList.add("age");
    characterGender.innerHTML = data.gender;
    characterGender.classList.add("characterGender");
    charactersDetails.append(characterName, age, characterGender);
  }
};

//seting time for debouncing function
let debounce = (func, delay) => {
  let searchInput = document.querySelector(".search-bar").value;
  if (searchInput < 3) {
    return false;
  }

  if (timerId) {
    clearTimeout(timerId);
  }

  timerId = setTimeout(() => {
    func();
  }, delay);
};

//Go Back Button Function
let goBack = () => {
  setTimeout(() => {
    window.location.reload();
  }, 100);
};

particlesJS("particles-js", {
  particles: {
    number: {
      value: 139,
      density: { enable: true, value_area: 789.1476416322727 }
    },
    color: { value: "#ffffff" },
    shape: {
      type: "circle",
      stroke: { width: 1, color: "#000000" },
      polygon: { nb_sides: 5 },
      image: { src: "img/github.svg", width: 100, height: 100 }
    },
    opacity: {
      value: 0.7417987831343363,
      random: true,
      anim: { enable: true, speed: 1, opacity_min: 0, sync: false }
    },
    size: {
      value: 3.945738208161363,
      random: true,
      anim: { enable: true, speed: 9.59040959040959, size_min: 0, sync: true }
    },
    line_linked: {
      enable: false,
      distance: 150,
      color: "#ffffff",
      opacity: 0.4,
      width: 1
    },
    move: {
      enable: true,
      speed: 6.413648243462092,
      direction: "bottom-right",
      random: true,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: {
        enable: true,
        rotateX: 721.5354273894853,
        rotateY: 962.0472365193136
      }
    }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: true, mode: "grab" },
      onclick: { enable: false, mode: "remove" },
      resize: true
    },
    modes: {
      grab: { distance: 219.26084732136317, line_linked: { opacity: 1 } },
      bubble: { distance: 250, size: 0, duration: 2, opacity: 0, speed: 3 },
      repulse: { distance: 400, duration: 0.4 },
      push: { particles_nb: 4 },
      remove: { particles_nb: 2 }
    }
  },
  retina_detect: true
});
var count_particles, stats, update;
stats = new Stats();
stats.setMode(0);
stats.domElement.style.position = "absolute";
stats.domElement.style.left = "0px";
stats.domElement.style.top = "0px";
document.body.appendChild(stats.domElement);
count_particles = document.querySelector(".js-count-particles");
update = function () {
  stats.begin();
  stats.end();
  if (window.pJSDom[0].pJS.particles && window.pJSDom[0].pJS.particles.array) {
    count_particles.innerText = window.pJSDom[0].pJS.particles.array.length;
  }
  requestAnimationFrame(update);
};
requestAnimationFrame(update);
