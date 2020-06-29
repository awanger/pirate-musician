// const mm = require("@magenta/music/node/music_vae");
const core = require("@magenta/music/node/core");

const globalAny = global;
const SOUNDFONT_URL = 'https://storage.googleapis.com/magentadata/js/soundfonts/sgm_plus';
globalAny.performance = Date;
globalAny.fetch = require("node-fetch");

const player = new core.SoundFontPlayer(SOUNDFONT_URL);
export { player };