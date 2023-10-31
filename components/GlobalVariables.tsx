let destination: string = '';
let origin: string = '';
let bathroom: string = '';
let floor: string = '';
let isBathroomSet: boolean = false;
let isFloorSet: boolean = false;
let mapVisible: boolean = false;
let accessibleRoute: boolean = false;
let voiceCommands: boolean = false;
let sound: boolean = false;
let closestBeacon: number; //test value of 7
let beaconArray: Array<{ beaconNum: number, rssi: number }> = [
  { beaconNum: 1, rssi: -60 },  // default values used for testing
  { beaconNum: 2, rssi: -65 },
];

export function getDestination(): string{
  return destination;
}

export function getOrigin(): string{
  return origin;
}

export function getBathroom(): string {
  return bathroom;
}

export function getIsBathroomSet(): boolean {
  return isBathroomSet;
}

export function getMapVisible(): boolean {
  return mapVisible;
}

export function getAccessibleRoute():boolean {
  return accessibleRoute;
}

export function getVoiceCommands():boolean {
  return voiceCommands;
}

export function getSound():boolean {
  return sound;
}

export function getClosestBeacon(): number {
  //console.log(closestBeacon);
  return closestBeacon;
}

export function getBeaconArray():Array<{ beaconNum: number, rssi: number }> { 
  return beaconArray;
}

export function getFloor(): string {
  return floor;
}

export function getIsFloorSet(): boolean {
  return isFloorSet;
}

export function setVoiceCommands(newVoiceCommands:boolean){
  voiceCommands = newVoiceCommands;
}

export function setSound(newSound:boolean){
  sound = newSound;
}

export function setDestination(newDestination: string) {
  destination = newDestination;
}

export function setOrigin(newOrigin: string) {
  origin = newOrigin;
}

export function setBathroom(newBathroom: string) {
  bathroom = newBathroom;
}

export function setIsBathroomSet(bathroomBoolean: boolean) {
  isBathroomSet = bathroomBoolean;
}

export function setMapVisible(newMapVisible: boolean) {
  mapVisible = newMapVisible;
}

export function setAccessibleRoute(newAccessibleRoute: boolean) {
  accessibleRoute = newAccessibleRoute;
}

export function setClosestBeacon(newClosestBeacon: number) {
  closestBeacon = newClosestBeacon;
  //console.log(closestBeacon);
}

export function setBeaconArray(NewBeaconArray:Array<{ beaconNum: number, rssi: number}>){ 
  beaconArray = NewBeaconArray;
}

export function setFloor(newFloor: string) {
  floor = newFloor;
}

export function setIsFloorSet(floorBoolean: boolean) {
  isFloorSet = floorBoolean;
}

export function reset() {
  setDestination('');
  setBathroom('');
  setIsBathroomSet(false);
  setMapVisible(false);
  setOrigin('');
  setFloor('');
  setIsFloorSet(false);
}
