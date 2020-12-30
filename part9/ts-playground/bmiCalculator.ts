export module BMI {
  interface MultiplyValues {
    value1: number;
    value2: number;
  }

  const parseArguments = (args: Array<string>): MultiplyValues => {
    if (args.length !== 4) throw new Error('Please provide body mass in kg and height in cm as arguments');

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
      return {
        value1: Number(args[2]),
        value2: Number(args[3])
      }
    } else {
      throw new Error('Provided values were not numbers!');
    }
  }

  const calculate = (a: number, b: number) => {
    return a / b / b * 10000;
  }

  const bmiToString = (bmi: number): string => {
    if (bmi <= 18.5) {
      return 'you are underweight';
    } else if (bmi <= 25) {
      return 'you have normal weight';
    } else if (bmi <= 30) {
      return 'you are overweight';
    } else if (bmi > 30) {
      return 'you are obese';
    } else return 'could not parse your input, try again'

  }
  try {
    const { value1, value2 } = parseArguments(process.argv);
    const bmi = calculate(value1, value2)
    console.log(`your BMI is ${bmi.toFixed(2)}`);
    console.log(bmiToString(bmi));
  } catch (e) {
    console.log('Error: ', e.message);
  }
}