import React from 'react';

interface CourseBase {
  name: string,
  exerciseCount: number,
}

const Header = ({ courseName }:{ courseName:string }) => {
  return <h1>{courseName}</h1>;

}

const Course = ({ course }:{ course: CourseBase })=>{
  return <p>{course.name} {course.exerciseCount}</p>;
}

const Content = ({courseParts} : {courseParts: CourseBase[]}) => {
  return (
    <div>
      {courseParts.map(part => <Course key={part.name} course={ part }/> )}
    </div>
  )
}

const Total = ({courseParts} : {courseParts: CourseBase[]}) => {

  return(
    <p>
      Number of exercises{" "}
      {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  )
}

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  return (
    <div>
      <Header courseName = {courseName} />
      <Content courseParts = {courseParts} />
      <Total courseParts = {courseParts}/>
    </div>
  );
};

export default App;