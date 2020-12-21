import React,{useEffect,useState} from 'react';
import { DataGrid } from '@material-ui/data-grid';

const columns = [
    {
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false, 
        width: 160,},
    //     valueGetter: (params) =>
    //       `${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''}`,
    //   },
  { field: 'id', headerName: 'Email ID', width: 250 },
  { field: 'contact', headerName: 'Contact', width: 130 },
  { field: 'marks', headerName: 'Marks', width: 80 },
  { field: 'participation', headerName: 'Participation', width: 120 },
  { field: 'rank', headerName: 'Rank', width: 80 },
  { field: 'average', headerName: 'Average', type: 'number', width: 90 },
];

// const rows = [
//   { fullName: 'Tajammal Husnain' , id: 'chhassnain16@gmail.com', contact: '03045660653'
//   , marks: 35 , participation: 3, rank :4 ,average: 50.32 },
//   { fullName: 'Tajammal Husnain' , id: 'chhassnain1@gmail.com', contact: '03045660653'
//   , marks: 35 , participation: 3, rank :4 ,average: 50.32 },
//   { fullName: 'Tajammal Husnain' , id: 'chhassnain@gmail.com', contact: '03045660653'
//   , marks: 35 , participation: 3, rank :4 ,average: 50.32 },
//   { fullName: 'Tajammal Husnain' , id: 'chhassnai@gmail.com', contact: '03045660653'
//   , marks: 35 , participation: 3, rank :4 ,average: 50.32 },
//   { fullName: 'Tajammal Husnain' , id: 'chhassna@gmail.com', contact: '03045660653'
//   , marks: 35 , participation: 3, rank :4 ,average: 50.32 },
//   { fullName: 'Tajammal Husnain' , id: 'chhassnain166@gmail.com', contact: '03045660653'
//   , marks: 35 , participation: 3, rank :4 ,average: 50.32 },
//   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
//   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
//   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
//   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//   { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
// ];

export default function Studentparticipation({Students}) {
    const [rows,setRows]=useState([]);

    useEffect(() => {
        console.log(`studentList called`);
        studentList()
    }, [])

    const studentList=()=>{
        console.log(`studentList called`);
        var temprows=[];
        Students.map((student)=>{
            const newstu={ 
                fullName: student.name , 
                id: student.roll_no, 
                contact: student.contact , 
                marks: student.marks , 
                participation: student.classparticipates, 
                rank :student.rank ,
                average: student.marks
            }
            temprows.push(newstu)
        }); setRows(temprows);
        // rows.map((i)=>{
        //     console.log(`student : ${i.fullName} : : ${i.id} :: ${i.contact} :: ${i.marks} :: ${i.participation} :
        //      : ${i.rank} :: ${i.average} ::`)
        // })
    }

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
    </div>
  );
}
