// const mm = require("@magenta/music/node/music_vae");
const core = require("@magenta/music/node/core");

const globalAny = global;
globalAny.performance = Date;
globalAny.fetch = require("node-fetch");

const player = new core.SoundFontPlayer('https://storage.googleapis.com/magentadata/js/soundfonts/sgm_plus');
export { player };