export module exercise {
  interface result {
    [key: string]: string | number | boolean;
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
  }
  const parseArguments = (args: Array<string>): Array<number> => {
    const arr = []
    for (const arg of args) {
      !isNaN(Number(arg)) && arr.push(Number(arg))
    }
    return arr
  }

  const calculate = (a: number, b: number) => {
    return a / b / b * 10000;
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
    } else return 'could not parse your input, try again'

  }
  try {
    const arr = parseArguments(process.argv);
    const days = arr.slice(1)
    const trainingDays = days.filter(e => e !== 0).length
    const target = arr[0]
    const average = days.reduce((p, c) => p + c, 0) / (days.length)
    const rating = average >= target ? target + average / 5 : target - average / 2

    const result: result = {
      periodLength: days.length,
      trainingDays: trainingDays,
      target: target,
      average: average,
      rating: rating,
      ratingDescription: ratingToString(rating),
      success: average >= target
    }

    for (const key in result) {
      if (Object.prototype.hasOwnProperty.call(result, key)) {
        console.log(`${key}: ${result[key]}`)
      }
    }

  } catch (e) {
    console.log('Error: ', e.message);
  }
}