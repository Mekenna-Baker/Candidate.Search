import { useEffect, useState } from "react";
import  { Candidate } from '../interfaces/Candidate.interface';

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  // Load saved candidates from local storage
  useEffect (() => {
    const saved = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    setSavedCandidates(saved);
  }, []);

// remove candidate 
const removeCandidate = (username: string) => {
  const updatedCandidates = savedCandidates.filter((candidate) => candidate.username !== username);
  setSavedCandidates(updatedCandidates);
  localStorage.setItem('savedCandidates', JSON.stringify(updatedCandidates));
};


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
              <tr key={candidate.username}>
                <td>
                  <img src={candidate.avatar} alt={candidate.name} />
                  </td>
                <td>{candidate.name}</td> 
                <td>{candidate.location} </td>
                <td>{candidate.email}</td>
                <td>{candidate.company}</td>
                <td>{candidate.bio}</td>

                <td>
                  <button onClick={() => removeCandidate(candidate.username)}></button>

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
