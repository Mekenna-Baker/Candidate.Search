import { useEffect, useState } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';

const CandidateSearch = () => {

  const [candidates, setCandidates] = useState<Candidate[]>([]);  // storing candidates

  const [currentCandidate, setCurrentCandidate] = useState<Candidate | null>(null);   // current candidate

  const [detailedCandidate, setDetailedCandidate] = useState<Candidate | null>(null);  // candidate information

  useEffect(() => {
    const fetchCandidates = async () => {
      const data = await searchGithub();  // Fetching candidate data from the API
      // Map the GitHub API response to match the Candidate interface
      console.log('Fetched candidates:', data);
      const formattedData: Candidate[] = data.map((user: Candidate) => ({
        name: user.name || 'No name provided',
        username: user.login,   // Map 'login' from API to 'username' in the interface
        location: user.location || 'Unknown location',
        avatar_url: user.avatar_url,
        email: user.email || null,
        html_url: user.html_url,
        company: user.company || null,
        bio: user.bio || null
      }));

      setCandidates(formattedData);
      setCurrentCandidate(formattedData[0]);  // Set the first candidate to be displayed
    };

    fetchCandidates();
  }, []);  // Empty array so UseEffect only runs once


  useEffect(() => {
    const fetchDetailedCandidate = async () => {
      if (currentCandidate) {
        const detailedData = await searchGithubUser(currentCandidate.username);  // Fetch info by username
        setDetailedCandidate(detailedData);
      }
    };

    fetchDetailedCandidate();
  }, [currentCandidate]);  // Fetch detailed info whenever the current candidate changes

  const nextCandidate = () => {
    const nextIndex = candidates.indexOf(currentCandidate!) + 1; // Get the index of the current candidate, add one for next candidate index
    if (nextIndex < candidates.length) {
      setCurrentCandidate(candidates[nextIndex]);  // Move to the next candidate
    } else {
      setCurrentCandidate(null);  // No more candidates
    }
  };

  const saveCandidate = () => {
    if (currentCandidate) {
      // Get saved candidates from local storage
      const savedCandidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
      // previously saved candidates + current candidate
      localStorage.setItem('savedCandidates', JSON.stringify([...savedCandidates, currentCandidate]));
      nextCandidate();  // Move to the next candidate
    }
  };

  const skipCandidate = () => {
    saveCandidate();
  };

  return (
    <div>
      <h1>CandidateSearch</h1>

      {/* Display detailed candidate info when available */}
      {detailedCandidate ? (
        <div className="candidate-card">
          <img src={detailedCandidate.avatar_url} alt={detailedCandidate.name} />
          <h2>{detailedCandidate.name} <em>({detailedCandidate.username})</em></h2>
          <p>Location: {detailedCandidate.location}</p>
          <p>Email: {detailedCandidate.email || 'No email provided'}</p>
          <p>Company: {detailedCandidate.company || 'No company provided'}</p>
          <p>Bio: {detailedCandidate.bio || 'No bio provided'}</p>
          <a href={detailedCandidate.html_url}>View GitHub Profile</a>
          <button onClick={saveCandidate}>Save</button>
          <button onClick={skipCandidate}>Skip</button>
        </div>
      ) : (
        <p>No more candidates available</p>
      )}
    </div>
  );
};

export default CandidateSearch;
