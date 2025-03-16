import config from "../config";
const paths = {
  club_registration: "/clubs/club-registration",
  player_registration: "/players/player-registration",
  player_transfer: "/players/player-transfer",
};

for (const key in paths) {
  if (paths.hasOwnProperty(key)) {
    paths[key] = config.apiUrl + paths[key];
  }
}
export default paths;
