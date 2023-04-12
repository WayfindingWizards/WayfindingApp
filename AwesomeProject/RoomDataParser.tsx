import { traftonNorthRooms } from "./buildingRoomData/traftonNorthRooms";

const buildings = new Map<string, Map<string, string[]>>(); //map of building abbreviations to files with building room numbers
buildings.set("TN", traftonNorthRooms);

export function findRoom(room: string): boolean{

  const building = buildings?.get(room.substring(0, 2));
  const floor = building?.get(room.substring(2, 3));

  //gets building from room string and checks if it exists in buildings map
  if(floor?.includes(room.substring(2))){
    return true;
  }
  return false;
}