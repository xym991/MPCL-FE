import config from "../config";
const paths = {
  club_registration: "/clubs/club-registration",
  player_registration: "/players/player-registration",
  player_transfer: "/players/player-transfer",
  add_person: "/people/add",
  get_people: "/people",
  delete_person: "/people/",
  get_club_applications: "/clubs/applications",
  get_player_applications: "/players/applications",
  get_clubs: "/clubs",
  add_club: "/clubs",
  delete_club: "/clubs/",
  get_people_details: "/people/details",
  get_umpires: "/people/umpires",
  approve_player_application: "/players/approve",
  reject_player_application: "/players/reject",
  approve_club_application: "/clubs/approve",
  reject_club_application: "/clubs/reject",
  add_team: "/teams",
  get_teams: "/teams",
  get_teams_by_club: "/teams/club/:id",
  delete_team: "/teams/",
  get_player_transfers: "/players/player-transfers",
  approve_player_transfer: "/players/approve-transfer",
  reject_player_transfer: "/players/reject-transfer",
  update_player_club: "/players/update-player-club",
  get_commitee_members: "/people/commitee-members",
  get_current_user: "/people/me",
  login: "/people/login",
};

for (const key in paths) {
  if (paths.hasOwnProperty(key)) {
    paths[key] = config.apiUrl + paths[key];
  }
}
export default paths;
