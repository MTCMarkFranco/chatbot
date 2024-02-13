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
        <td className="blue-bold-text">Synthesis generation complete! Are your eady for a new search? Just type it in....</td>
      </tr>
    </tbody>
  </table>
);

export default SynthesisTable;