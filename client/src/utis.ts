export function removeSpecialCharacter(str: string) {
  return str
    .replace(/[ãàáâ]/g, "a")
    .replace(/[êéè]/g, "e")
    .replace(/í/g, "i")
    .replace(/[õôó]/g, "o")
    .replace(/ú/g, "u")
    .replace(/ç/g, "c");
}

export function getTeamNameSlug(teamName: string) {
  return removeSpecialCharacter(teamName.replace(/\s/g, "-").toLowerCase());
}
