"use client";
import React, { useState } from 'react';
import Modal from './Modal';
import { movies } from '@/data';
import { useRouter } from 'next/navigation'; // For redirection

interface AddReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddReview: (movieName: string, reviewerName: string, rating: number, comments: string) => void;
}

const AddReviewModal: React.FC<AddReviewModalProps> = ({ isOpen, onClose, onAddReview }) => {
  const [selectedMovie, setSelectedMovie] = useState(movies[0]?.name || ''); // Default to the first movie
  const [selectedMovieId, setSelectedMovieId] = useState(movies[0]?.id || 0);
  const [reviewerName, setReviewerName] = useState('');
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState('');
  
  const router = useRouter();

  const handleAddReview = () => {
    onAddReview(selectedMovie, reviewerName, rating, comments);
    setSelectedMovie(movies[0]?.name || '');
    setReviewerName('');
    setRating(0);
    setComments('');
    onClose();
    router.push(`/review/${selectedMovieId}`); // Use template literals to interpolate selectedMovieId
  };

  const handleMovieChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedName = e.target.value;
    const selectedMovie = movies.find(movie => movie.name === selectedName);
    setSelectedMovie(selectedName);
    if (selectedMovie) {
      setSelectedMovieId(selectedMovie.id); // Set the selected movie ID
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-xl font-bold mb-4">Add New Review</h2>
      
      {/* Movie Select Dropdown */}
      <select
        className="border rounded-lg py-2 px-4 w-full mb-4"
        value={selectedMovie}
        onChange={handleMovieChange}
      >
        {movies.map((movie) => (
          <option key={movie.id} value={movie.name}>
            {movie.name}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Your Name (optional)"
        className="border rounded-lg py-2 px-4 w-full mb-4"
        value={reviewerName}
        onChange={(e) => setReviewerName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Rating (out of 10)"
        className="border rounded-lg py-2 px-4 w-full mb-4"
        value={rating}
        onChange={(e) => setRating(Math.max(0, Math.min(10, parseInt(e.target.value))))} // Clamp value between 0 and 10
        max={10} // Max rating value 10
        min={0}  // Min rating value 0
      />
      <textarea
        placeholder="Review Comments"
        className="border rounded-lg py-2 px-4 w-full mb-4"
        value={comments}
        onChange={(e) => setComments(e.target.value)}
      />

      <button
        className="bg-green-500 text-white px-4 py-2 rounded"
        onClick={handleAddReview}
      >
        Add Review
      </button>
    </Modal>
  );
};

export default AddReviewModal;
