export function secondsToArray(seconds: number) {
  let array = []
  for (let sec = 1; sec <= seconds; sec++) {
    array.push(sec.toString())
  }
  return array
}
