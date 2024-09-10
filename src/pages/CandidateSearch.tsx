import { useEffect, useState } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';

const CandidateSearch = () => {

  const [candidates, setCandidates] = useState<Candidate[]>([]);  // storing candidates

  const [currentCandidate, setCurrentCandidate] = useState<Candidate | null>(null);   // current candidate

  const [detailedCandidate, setDetailedCandidate] = useState<Candidate | null>(null);  // candidate information
  

  useEffect(() => {
    const fetchCandidates = async () => {
      const data = await searchGithub(); // Fetching candidate data from the API
      const formattedData: Candidate[] = data.map((user: Candidate) => ({
        name: user.name || 'No name provided',
        username: user.login,   // Map 'login' from API to 'username' in the interface
        location: user.location || 'Unknown location',
        avatar_url: user.avatar_url,
        email: user.email || 'No email provided',
        html_url: user.html_url,
        company: user.company || 'No company provided',
        bio: user.bio || 'No bio provided',
      }));

      setCandidates(formattedData);
      setCurrentCandidate(formattedData[0]);  // Set the first candidate to be displayed
    };

    fetchCandidates();
  }, []);  // Empty array so UseEffect only runs once


  useEffect(() => {
    const fetchDetailedCandidate = async () => {
      if (currentCandidate) {
        console.log('Current candidate:', currentCandidate); 
        const detailedData = await searchGithubUser(currentCandidate.username);  // Fetch info by username
        console.log('Detailed Candidate Data:', detailedData); 
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
    nextCandidate();
  };

  return (
    <div >
      <h1>Candidate Search</h1>

      {/* Display detailed candidate info when available */}
      {detailedCandidate ? (
        <div key={detailedCandidate.login}>
          <img className="avatarimg" src={detailedCandidate.avatar_url || '/image/no_image.PNG'} alt={detailedCandidate.name || 'No image available'} />
          <h2>{detailedCandidate.name || 'Unknown Name'} <em>({detailedCandidate.login || 'Unknown Username'} )</em></h2>
          <p>Location: {detailedCandidate.location || 'Unknown location'}</p>
          <p>
            Email:{' '}
            {detailedCandidate.email ? (
              <a href={`mailto:${detailedCandidate.email}`} style={{ color: '#646cff' }}>
                {detailedCandidate.email}
              </a>
            ) : (
              'No email provided'
            )}
          </p>
          <p>Company: {detailedCandidate.company || 'No company provided'}</p>
          <p>Bio: {detailedCandidate.bio || 'No bio provided'}</p>

        
          <button className ="reject-btn" onClick={skipCandidate}>-</button>
          <button className = "save-btn" onClick={saveCandidate}>+</button>
        
        </div>
      ) : (
        <p>No more candidates available</p>
      )}
    </div>
  );
};

export default CandidateSearch;
