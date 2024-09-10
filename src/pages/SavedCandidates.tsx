import { useEffect, useState } from "react";
import  { Candidate } from '../interfaces/Candidate.interface';

const SavedCandidates = () => {
  //storing saved candidates from local storage
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  // Load saved candidates from local storage
  useEffect (() => {
    const saved = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    //setting to state
    setSavedCandidates(saved);
  }, []); //empty array to ensure it only runs once

// remove candidate by username
const removeCandidate = (login: string) => {
  //filtering candidates out with matching username from saved candidates
  const updatedCandidates = savedCandidates.filter((candidate) => candidate.username !== login);
  //updating state
  setSavedCandidates(updatedCandidates);
  //saving updated list to local storage
  localStorage.setItem('savedCandidates', JSON.stringify(updatedCandidates));
};


//rendering a table for candidates/information

  return (
    <>
      <h1>Potential Candidates</h1>
      {savedCandidates.length > 0 ? (
        <table className = 'table'>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Location</th>
              <th>Email</th>
              <th>Company</th>
              <th>Bio</th>
              <th>Reject</th>
            </tr>
          </thead>
          <tbody>
            {savedCandidates.map((candidate) => (
              <tr key={candidate.html_url}>
                <td style={{ textAlign: "center" }}>
                  <img src={candidate.avatar_url} alt={candidate.name} 
                  style={{ width: '75px', height: '75px', borderRadius: '5%' }}/>
                  </td>
                <td>{candidate.name}</td> 
                <td>{candidate.location} </td>
                <td><a href={`mailto:${candidate.email}`}>{candidate.email}</a></td>
                <td>{candidate.company}</td>
                <td>{candidate.bio}</td>

                <td>
                  <button onClick={() => removeCandidate(candidate.username)}> - </button>

                  </td>
              </tr>
            ))}
            </tbody>
        </table>
      ) : (
        <p>No saved candidates</p>
      )}
      </>
  );
};
                                

export default SavedCandidates;
