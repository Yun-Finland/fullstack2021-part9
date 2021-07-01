/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercise } from './exerciseCalculator';

const app = express();
app.use(express.json());

interface exerciseReturnedValue {
  weight: number,
  height: number,
  bmi: string
}

app.get('/hello', (_req,res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req,res) => {
  const { height, weight } = req.query;

  if(!isNaN(Number(height)) && !isNaN(Number(weight))){
    const returnedValue : exerciseReturnedValue = {
      weight: Number(weight),
      height: Number(height),
      bmi: calculateBmi(Number(height),Number(weight))
    };
  
    res.json(returnedValue);
  }else{
    res.status(400).json({error: "malformatted parameters"});
  }
});

app.post('/exercises', (req,res) => {    
  const body = req.body; 

  const target: number = body.target;
  const record: Array<number> = body.daily_exercises;  
  
  if(!record || !target){
    res.status(400).json({error: "parameters missing"});
  }else if(isNaN(Number(target)) || !(record instanceof Array)){
    res.status(400).json({error: "malformatted parameters"});
  }else{
    res.json(calculateExercise(record, target));
  }
});

const PORT = 3000;

app.listen(PORT, ()=>{
  console.log(`Server running on port ${PORT}`);
});