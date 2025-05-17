import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { createCustomer } from '../services/api';

export default function CustomerForm() {
  const [formData, setFormData] = useState({
    name: '',
    nic: '',
    dob: ''
  });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await createCustomer(formData);
      alert('Customer created successfully!');
      setFormData({ name: '', nic: '', dob: '' });
    } catch (error) {
      alert('Error creating customer!');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control 
          type="text" 
          value={formData.name}
          onChange={e => setFormData({...formData, name: e.target.value})}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>NIC</Form.Label>
        <Form.Control 
          type="text" 
          value={formData.nic}
          onChange={e => setFormData({...formData, nic: e.target.value})}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Date of Birth</Form.Label>
        <Form.Control 
          type="date" 
          value={formData.dob}
          onChange={e => setFormData({...formData, dob: e.target.value})}
          required
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Create Customer
      </Button>
    </Form>
  );
}
