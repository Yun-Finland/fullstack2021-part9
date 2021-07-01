interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

interface Argument {
  target: number,
  record: Array<number>
}

const parseArguments = (args: Array<string>): Argument => {
  if(args.length<4) throw new Error('Not enough arguments');
  
  const [ , , targetValue, ...restValues] = args;
  
  if(!isNaN(Number(targetValue)) && restValues.map(Number)){
    return {
      target: Number(targetValue),
      record: restValues.map(Number)
    };
  }else{
    throw new Error ('Provided values were not all numbers! Please try again.');
  }

};

const calculateExercise = (record: Array<number>, target: number): Result => {
  const period_length = record.length;

  const training_days = record.filter((n:number) => n!==0).length;
  
  const total_value = record.reduce(((sum: number, val: number):number => {
    sum = sum + val;
    return sum;
  }),0);

  const average = total_value / period_length;

  const success = average >= target;
  
  let rating:number;
  
  if(average >= target){
    rating = 3;
  }else if(average >= target/2){
    rating = 2;
  }else{
    rating = 1;
  }
 
  let rating_des :string; 

  if (rating === 1) {
    rating_des =  "You need to exercise harder";
  }else if(rating === 2){
    rating_des = "Not bad, but can be better";
  }else{
    rating_des = "Congratulations, you achieved your goals";
  }

  return {
    periodLength: period_length,
    trainingDays: training_days,
    success: success,
    rating: rating,
    ratingDescription: rating_des,
    target: target,
    average: average
  };

};

try{
  const { target, record } = parseArguments(process.argv);
  console.log(calculateExercise(record,target));
}catch(e){
  if (e instanceof String){
    console.log('Error, something bad happened, error message: ', e);
  }
}

export default calculateExercise;
