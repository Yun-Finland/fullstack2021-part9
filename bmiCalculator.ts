interface InputValues {
  height: number;
  weight: number;
}

const parseArgus = (args: Array<string>):InputValues =>{
  if(args.length<4) throw new Error('Not enough argments');
  if(args.length>4) throw new Error('Too many arguments');

  if(!isNaN(Number(args[2])) && !isNaN(Number(args[3]))){
    return{
      height: Number(args[2]),
      weight: Number(args[3])
    };
  }else{
    throw new Error('Provided values were not numbers! Please try again.');
  }
};

export const calculateBmi = (height: number, weight: number): string =>{
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
}; 

try{
  const { height, weight } = parseArgus(process.argv);
  console.log(calculateBmi(height, weight));
}catch(e){
  if (e instanceof String){
    console.log('Error, something bad happened, error message: ', e);
  }
 
}



