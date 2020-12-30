interface result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const ratingToString = (rating: number): string => {
  if (rating <= 1) {
    return 'try harder';
  } else if (rating <= 2) {
    return 'you could do better';
  } else if (rating <= 2.5) {
    return 'that is my boy';
  } else if (rating <= 3) {
    return 'nice work son';
  } else if (rating > 3) {
    return 'you aced it, hell of a job';
  } else return 'could not parse your input, try again';

};

export const analyseExercise = ({ daily_exercises, target }: { daily_exercises: number[], target: number }): result => {
  const trainingDays = daily_exercises.filter(e => e !== 0).length;
  const average = daily_exercises.reduce((p, c) => p + c, 0) / (daily_exercises.length);
  const rating = average >= target ? target + average / 5 : target - average / 2;

  const result: result = {
    periodLength: daily_exercises.length,
    trainingDays: trainingDays,
    target: target,
    average: average,
    rating: rating,
    ratingDescription: ratingToString(rating),
    success: average >= target
  };

  return result;

};