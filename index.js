const spotify = require('spotify-node-applescript');

let lastTrackName = ""
function check() {
  function checkIn(time) {
    console.log("CheckIn", time)
    setTimeout(() => check(), time)
  }

  spotify.getTrack(function (err, track) {
    if (err) {
      console.log(err)
      console.log("ERROr khordim to track")
      return
    }
    if (lastTrackName !== track.name) {
      lastTrackName = track.name;
      console.log(lastTrackName)

      if (track.name === "Advertisement" || track.name === "Spotify") {
        spotify.muteVolume()
      } else {
        spotify.setVolume(100)
        spotify.unmuteVolume()
      }
    }
    spotify.getState((err, state) => {
      if (err) {
        console.log('error khordim to stack')
        console.log(err)
        return
      }


      if (state.state === 'paused') {
        console.log("oh stopeed")
        checkIn(10000)
      } else {
        checkIn(track.duration - state.position * 1000)
      }

    })
  });
}


check();
