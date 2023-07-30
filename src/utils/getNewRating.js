export default function getNewRating(sIndex) {
  const index = parseInt(sIndex);
  let newRating = [];
  for (let i = 0; i < 10; i++) {
    if (i <= index) {
      newRating.push(1);
    } else {
      newRating.push(0);
    }
  }
  return newRating;
}
