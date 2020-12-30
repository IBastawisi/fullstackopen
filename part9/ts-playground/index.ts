import express from 'express';
import {calculate, bmiToString} from './bmiCalculator';
import { analyseExercise} from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { weight, height } = req.query;
  if (isNaN(Number(weight)) || isNaN(Number(height))) {
    return res.json(
      { error: 'malformated input' }
    );

  }
  const bmi = calculate(Number(weight), Number(height));
  return res.json(
    { weight, height, bmi: bmiToString(bmi) }
  );
});

app.post('/exercise', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;
  if (!Array.isArray(daily_exercises) || isNaN(Number(target))) {
    return res.json(
      { error: 'malformated input' }
    );

  }
  const result = analyseExercise({ daily_exercises, target: Number(target) });
  return res.json(result);
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});