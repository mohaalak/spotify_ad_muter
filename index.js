const spotify = require("spotify-node-applescript");

let lastTrackName = "";
let maxVol = process.argv[2] || 100;
let currentVol = 0;
function check() {
  function checkIn(time) {
    console.log("CheckIn", `${time} ms`);
    setTimeout(() => check(), time);
  }

  spotify.getState(function (err, state) {
    currentVol = state.volume
  });

  spotify.getTrack(function (err, track) {
    if (err) {
      console.log("Error on getting Track: ");
      console.log(err);
      checkIn(10000);
      return;
    }
    if (lastTrackName !== track.name) {
      lastTrackName = track.name;
      console.log(lastTrackName);

      if (track.name === "Advertisement" || track.name === "Spotify") {
        spotify.setVolume(1);
      } else {
        if (currentVol) {
          spotify.setVolume(currentVol);
        } else {
          spotify.setVolume(maxVol);
        }
      }
    }
    spotify.getState((err, state) => {
      if (err) {
        console.log("Error on getting State:");
        console.log(err);
        return;
      }

      if (state.state === "paused") {
        console.log("oh stopeed");
        checkIn(10000);
      } else {
        checkIn(track.duration - state.position * 1000);
      }
    });
  });
}

check();
