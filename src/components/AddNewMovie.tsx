"use client";
import React, { useState } from 'react';
import Modal from './Modal';
import axios from 'axios';

interface AddMovieModalProps {
  isOpen: boolean;
  onClose: () => void;
  const handleSubmit = async(e) => {

    try{
    
    e.preventDefault();

    const response = await axios.post("http://localhost:5000/api/add-movie",{ movieName, releaseDate});
    console.log('Movie Added:', response.data);



    console.log('Movie Created:', { movieName, releaseDate });
    // After form submission, you can do anything like storing the movie to state or sending it to a server

    // Reset the form
    setMovieName('');
    setReleaseDate('');}

    catch (error) {
      console.error('Error adding movie:', error);
     
    }
  };
}

const AddMovieModal: React.FC<AddMovieModalProps> = ({ isOpen, onClose, onCreateMovie }) => {
  const [name, setName] = useState('');
  const [releaseDate, setReleaseDate] = useState('');

  const handleCreateMovie = () => {


    onCreateMovie(name, releaseDate);
    setName('');
    setReleaseDate('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-xl font-bold mb-4">Add New Movie</h2>
      <input
        type="text"
        placeholder="Movie Name"
        className="border rounded-lg py-2 px-4 w-full mb-4"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="date"
        placeholder="Release Date"
        className="border rounded-lg py-2 px-4 w-full mb-4"
        value={releaseDate}
        onChange={(e) => setReleaseDate(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleCreateMovie}
      >
        Create Movie
      </button>
    </Modal>
  );
};

export default AddMovieModal;
