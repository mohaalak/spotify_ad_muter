# Spotify Ad Muter
This script mute Spotify when there is a playing advertisement and only works on macOS.

In newer versions, Spotify does not allow users to shut down the advertisements` sound by setting the volume to zero. So, this script is going to set the volume to the minimum value, which is 1.
Also, after the advertisement, it is going to set the volume on the previous value or a max volume, which you can set it as an environmental variable.

## Usage

You should have `Node.js` and `npm` installed.

Clone then run
`npm install`

Then run the script
`npm start`

For the max volume, you can set it this way
`npm start 70`

## Tips
* Volume can be from 0 to 100
