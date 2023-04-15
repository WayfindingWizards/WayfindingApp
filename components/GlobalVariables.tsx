let destination: string = '';
let origin: string = '';
let bathroom: string = '';
let isBathroomSet: boolean = false;
let mapVisible: boolean = false;
let accessibleRoute: boolean = false;

let closestBeacon: number;


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


export function getClosestBeacon(): number {
  return closestBeacon;
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
  console.log(closestBeacon);
}

export function reset() {
  setDestination('');
  setBathroom('');
  setIsBathroomSet(false);
  setMapVisible(false);
}
