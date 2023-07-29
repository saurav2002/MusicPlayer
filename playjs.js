var play_but = document.getElementById("play");
var img_rotate = document.querySelector("img");
var audio_play = document.querySelector("audio");
var artist_name = document.querySelector("#song_artist");
var song_name = document.querySelector("#song_name");
var next_but = document.getElementById("next");
var prev_but = document.getElementById("pre");
var prok = document.getElementById("progressid");
var durationt = document.getElementById("duration");
var currentt = document.getElementById("current_time");
var progressdiv = document.getElementById("progress_div");

var play_ornot = false;

function play_it_man() {
  play_ornot = true;
  img_rotate.classList.add("rotatete");
  audio_play.play();
  document.querySelector(".fa-play").classList.add("fa-pause");
  document.querySelector(".fa-pause").classList.remove("fa-play");

  document.querySelector(".buttons").classList.add("thoda_niche");
  audio_play.classList.add("show");
}
function dont_play_it_man() {
  play_ornot = false;
  img_rotate.classList.remove("rotatete");
  audio_play.pause();
  document.querySelector(".fa-pause").classList.add("fa-play");
  document.querySelector(".fa-play").classList.add("fa-pause");
  document.querySelector(".buttons").classList.remove("thoda_niche");
  audio_play.classList.remove("show");
}
play_but.addEventListener("click", () => {
  if (play_ornot) {
    dont_play_it_man();
  } else {
    play_it_man();
  }
});

var song_info = [
  {
    name: "./audio/song",
    title: "Positively Energetic",
    artist: "JieJie",
    photo: "./images/party.jpg",
  },
  {
    name: "./audio/tere_naam",
    title: "Tere Naam",
    artist: "Udit Narayan",
    photo: "./images/sallubhai.jpg",
  },
  {
    name: "./audio/meri",
    title: "Aye Meri Zohrajameen",
    artist: "Himesh Reshammiya",
    photo: "./images/meri.png",
  },
];

var song_no = 0;
function play_next(song_info) {
  song_name.innerHTML = song_info[song_no].title;
  artist_name.innerHTML = song_info[song_no].artist;
  var song_to_play = song_info[song_no].name + ".mp3";
  audio_play.src = song_to_play;
  img_rotate.src = song_info[song_no].photo;
  // audio_play.play();
  if (play_ornot) {
    audio_play.play();
  }
}
// play_next(song_info);

audio_play.addEventListener("timeupdate", (event) => {
  const { currentTime, duration } = event.srcElement;
  let progress_time = (currentTime / duration) * 100;
  prok.style.width = `${progress_time}%`;

  let min_duration = Math.floor(duration / 60);
  let sec_duration = Math.floor(duration % 60);
  let tot_duration = `${min_duration}:${sec_duration}`;
  if (tot_duration) durationt.textContent = `${tot_duration}`;

  let min_currentTime = Math.floor(currentTime / 60);
  let sec_currentTime = Math.floor(currentTime % 60);
  if (sec_currentTime < 10) sec_currentTime = `0${sec_currentTime}`;
  let tot_currentTime = `${min_currentTime}:${sec_currentTime}`;
  if (currentTime) currentt.textContent = `${tot_currentTime}`;
});

progressdiv.addEventListener("click", function (event) {
  const { duration } = audio_play;
  const move_progress =
    (event.offsetX / event.srcElement.clientWidth) * duration;
  //   console.log(move_progress);
  audio_play.currentTime = move_progress;
});

audio_play.addEventListener("ended", function () {
  // alert("hey");
  song_no = (song_no + 1) % 3;
  play_next(song_info);
});

next_but.addEventListener("click", function () {
  // alert("hey");
  song_no = (song_no + 1) % 3;
  play_next(song_info);
});
prev_but.addEventListener("click", function () {
  if (song_no == 0) {
    song_no = 2;
  } else {
    song_no = (song_no - 1) % 3;
  }
  play_next(song_info);
});
