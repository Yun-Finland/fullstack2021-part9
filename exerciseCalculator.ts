interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: String,
  target: number,
  average: number
}

const calculateExercise = (record: Array<number>, target: number): Result => {
  const period_length = record.length;

  const training_days = record.filter((n:number) => n!==0).length;
  
  const total_value = record.reduce(((sum: number, val: number):number => {
    sum = sum + val;
    return sum;
  }),0)

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
 
  let rating_des :String; 

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

}

console.log(calculateExercise([3, 0, 2, 4.5, 0, 3, 1],2));