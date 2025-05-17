import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { uploadCustomersExcel } from '../services/api';

export default function FileUpload() {
  const [file, setFile] = useState(null);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!file) return;
    
    try {
      await uploadCustomersExcel(file);
      alert('File uploaded successfully!');
      setFile(null);
    } catch (error) {
      alert('Error uploading file!');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <input 
          type="file" 
          accept=".xlsx"
          onChange={e => setFile(e.target.files[0])}
          required
        />
      </div>
      <Button variant="success" type="submit">
        Upload Excel File
      </Button>
    </form>
  );
}
