import React from 'react';
import './App.css';

const RecordTable = ({ records }) => (
  <table>
    <thead>
      <tr>
        <th>Published Date</th>
        <th>Article</th>
        <th>Summary</th>
        <th>Ranked Score</th>
      </tr>
    </thead>
    <tbody>
        {records.map((record, index) => (
            <tr key={index}>
                <td>{record.publisheddate}</td>
                <td>
                    <a href={`${record.path}/${record.filename}`} rel="noreferrer" target="_blank">{record.filename}</a>
                </td>
                <td>{record.summary}</td>
                <td>{record.rankedscore}</td>
            </tr>
        ))}
         <tr>
            <td> </td> 
         </tr>
         <tr>
            <td className="blue-bold-text" colSpan="4">Would you like to generate a synthesis on these records?</td>
         </tr>
    </tbody>
  </table>
);

export default RecordTable;