import { traftonNorthRooms } from "../buildingRoomData/traftonNorthRooms";

const buildings = new Map<string, Map<string, string[]>>(); //map of building abbreviations to files with building room numbers
buildings.set("TN", traftonNorthRooms);

export function findRoom(room: string): boolean{

  //gets building from first two letters on input
  //potential bug: when csb is integrated
  const building = buildings?.get(room.substring(0, 2));
  //gets floor from third letter of input
  const floor = building?.get(room.substring(2, 3));

  //gets building from room string and checks if it exists in buildings map
  if(floor?.includes(room.substring(2))){
    return true;
  }
  return false;
}