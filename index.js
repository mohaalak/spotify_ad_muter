const spotify = require("spotify-node-applescript");

const volumeForced = !!process.argv[2];

let lastTrackName = "";
let maxVol = process.argv[2] || 100;

function preserveVolume(act) {
  if (!volumeForced) {
    spotify.getState((err, state) => {
      if (!err) {
        maxVol = state.volume;
      }
  
      console.log('volume: ' + maxVol);
      act();
    });
  } else {
    console.log('volume forced to be ' + maxVol);
    act();
  }
}

function check() {
  function checkIn(time) {
    console.log("CheckIn", `${time} ms`);
    setTimeout(() => check(), time);
  }

  spotify.getTrack(function(err, track) {
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
        preserveVolume(() => spotify.setVolume(1));
      } else {
        spotify.setVolume(maxVol);
      }
    }
    spotify.getState((err, state) => {
      if (err) {
        console.log("Error on getting State:");
        console.log(err);
        return;
      }

      if (state.state === "paused") {
        console.log("paused");
        checkIn(10000);
      } else {
        checkIn(track.duration - state.position * 1000);
      }
    });
  });
}

preserveVolume(check);
