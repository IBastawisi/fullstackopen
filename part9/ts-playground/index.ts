import express from 'express';
import { BMI } from './bmiCalculator'

const app = express();

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
  const bmi = BMI.calculate(Number(weight), Number(height))
  return res.json(
    { weight, height, bmi: BMI.bmiToString(bmi) }
  );
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});