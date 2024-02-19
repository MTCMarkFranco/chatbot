import React from 'react';
import './App.css';

const RecordTable = ({ records }) => (
  
  <table>
    <thead>
      <tr>
        <th>Select</th>
        <th>Published Date</th>
        <th>Article</th>
        <th>Relevant Document Extraction</th>
        <th>Ranked Score</th>
      </tr>
    </thead>
    <tbody>
      {records.map((record, index) => (
        <React.Fragment key={index}>
          <tr>
            <td>{new Date(record.publisheddate).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}</td>
            <td>
              <a href={`${record.path}/${record.filename}`} rel="noreferrer" target="_blank">{record.filename}</a>
            </td>
            <td dangerouslySetInnerHTML={{ __html: record.answers + '<br>' + record.captions }}></td>
            <td>{parseFloat(record.rankedscore).toFixed(2)}</td>
          </tr>
        </React.Fragment>
      ))}
      <tr>
        <td> </td> 
      </tr>
      <tr>
        <td className="blue-bold-text" colSpan="5">Would you like to generate a synthesis on these records?</td>
      </tr>
    </tbody>
  </table>
);

export default RecordTable;