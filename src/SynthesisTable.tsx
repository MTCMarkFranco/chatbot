import React from 'react';
import './App.css';

const SynthesisTable = ({ synthesis }) => (
  <table>
    <thead>
      <tr>
        <th>Synthesis</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>{synthesis.summary}</td>
      </tr>
      <tr>
        <td> </td> 
      </tr>
      <tr>
        <br></br>
      </tr>
    </tbody>
  </table>
);

export default SynthesisTable;