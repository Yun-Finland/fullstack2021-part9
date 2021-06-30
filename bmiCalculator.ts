const calculateBmi = (height: number, weight: number): String =>{
  const new_bmi = weight/((height/100.0)*(height/100.0));
  if(new_bmi < 18.5){
    return "underweight";
  }else if(new_bmi < 25){
    return "normal weight";
  }else if(new_bmi < 30){
    return "overweight";
  }else{
    return "obese";
  }
} 

console.log(calculateBmi(180, 74));