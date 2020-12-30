export const calculate = (a: number, b: number): number => {
  return a / b / b * 10000;
};

export const bmiToString = (bmi: number): string => {
  if (bmi <= 18.5) {
    return 'you are underweight';
  } else if (bmi <= 25) {
    return 'you have normal weight';
  } else if (bmi <= 30) {
    return 'you are overweight';
  } else if (bmi > 30) {
    return 'you are obese';
  } else return 'could not parse your input, try again';

};