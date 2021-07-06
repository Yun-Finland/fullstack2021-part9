import React from 'react';

interface CourseBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CourseDescriptionAdded extends CourseBase {
  description: string;
}

interface CourseNormalPart extends CourseDescriptionAdded {
  type: "normal";
}

interface CourseProjectPart extends CourseBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CourseDescriptionAdded {
  type: "submission";
  exerciseSubmissionLink: string;
}

interface CourseSpecialPart extends CourseDescriptionAdded{
  type: "special";
  requirements: Array<string>;
}


type CoursePart = CourseNormalPart | CourseSubmissionPart | CourseProjectPart | CourseSpecialPart;

const assertNever = (value:never):never =>{
  throw new Error(
    `Unhandled discriminated union memeber: ${JSON.stringify(value)}`
  )
}

const Header = ({ courseName }:{ courseName:string }) => {
  return <h1>{courseName}</h1>;

}

const Part = ({ course }:{ course: CoursePart })=>{

  let secondPart 
  
  switch (course.type){
    case('normal'):
      secondPart = <i>{course.description}</i>;
      break;
    case('groupProject'):
      secondPart = <p>project exercises {course.groupProjectCount}</p>;
      break;
    case('submission'):
      secondPart = <div>
        <i>{course.description}</i>
        <p>{course.exerciseSubmissionLink}</p>
      </div>
      break;
    case('special'):
      secondPart = <div>
        <i>{course.description}</i>
        <p>required skills: {course.requirements.join(', ')}</p>
      </div>
      break;
    default:
      return assertNever(course);
  }  

  return (
    <div>
      <b>{course.name} {course.exerciseCount}</b>
      <p>{secondPart}</p>
    </div>

  );
}

const Content = ({courseParts} : {courseParts: CoursePart[]}) => {
  return (
    <div>
      {courseParts.map(part => <Part key={part.name} course={ part }/> )}
    </div>
  )
}

const Total = ({courseParts} : {courseParts: CoursePart[]}) => {

  return(
    <p>
      Number of exercises{" "}
      {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  )
}

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is the leisured course part",
      type: "normal"
    },
    {
      name: "Advanced",
      exerciseCount: 7,
      description: "This is the harded course part",
      type: "normal"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      type: "groupProject"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
      type: "submission"
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      type: "special"
    }
  ]

  return (
    <div>
      <Header courseName = {courseName} />
      <Content courseParts = {courseParts} />
      <Total courseParts = {courseParts}/>
    </div>
  );
};

export default App;