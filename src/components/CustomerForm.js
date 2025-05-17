import React, { useState } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { createCustomer } from '../services/api';

function CustomerForm() {
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    nic: '',
    mobileNumbers: [''],
    addresses: [{
      addressLine1: '',
      addressLine2: '',
      country: '',
      city: ''
    }]
  });

  // Handle form field changes
  const handleChange = (field, index, value) => {
    const newData = { ...formData };
    if (field === 'mobileNumbers') {
      newData.mobileNumbers[index] = value;
    } else {
      newData.addresses[index][field] = value;
    }
    setFormData(newData);
  };

  // Add/remove mobile number fields
  const addMobile = () => setFormData({...formData, mobileNumbers: [...formData.mobileNumbers, '']});
  const removeMobile = (index) => {
    const newNumbers = formData.mobileNumbers.filter((_, i) => i !== index);
    setFormData({...formData, mobileNumbers: newNumbers});
  };

  // Add/remove address fields
  const addAddress = () => setFormData({...formData, addresses: [...formData.addresses, 
    { addressLine1: '', addressLine2: '', country: '', city: '' }]
  });
  
  const removeAddress = (index) => {
    const newAddresses = formData.addresses.filter((_, i) => i !== index);
    setFormData({...formData, addresses: newAddresses});
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.dob || !formData.nic) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      await createCustomer({
        ...formData,
        mobileNumbers: formData.mobileNumbers.filter(num => num.trim() !== ''),
        addresses: formData.addresses.filter(addr => addr.addressLine1.trim() !== '')
      });
      
      // Reset form after successful submission
      setFormData({
        name: '',
        dob: '',
        nic: '',
        mobileNumbers: [''],
        addresses: [{
          addressLine1: '',
          addressLine2: '',
          country: '',
          city: ''
        }]
      });
      alert('Customer created successfully!');
      
    } catch (err) {
      alert(err.response?.data?.message || 'Error creating customer');
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-4">
      <h2>Add New Customer</h2>

      {/* Basic Info */}
      <Form.Group className="mb-3">
        <Form.Label>Full Name *</Form.Label>
        <Form.Control 
          type="text" 
          value={formData.name}
          onChange={e => setFormData({...formData, name: e.target.value})}
          required
        />
      </Form.Group>

      <Row className="mb-3">
        <Col md={6}>
          <Form.Group>
            <Form.Label>Date of Birth *</Form.Label>
            <Form.Control
              type="date"
              value={formData.dob}
              onChange={e => setFormData({...formData, dob: e.target.value})}
              required
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>NIC Number *</Form.Label>
            <Form.Control
              type="text"
              value={formData.nic}
              onChange={e => setFormData({...formData, nic: e.target.value})}
              required
            />
          </Form.Group>
        </Col>
      </Row>

      {/* Mobile Numbers */}
      <div className="mb-4">
        <h5>Mobile Numbers</h5>
        {formData.mobileNumbers.map((num, index) => (
          <div key={index} className="d-flex align-items-center mb-2">
            <Form.Control
              type="tel"
              value={num}
              onChange={e => handleChange('mobileNumbers', index, e.target.value)}
              placeholder="Enter mobile number"
              className="me-2"
            />
            {index > 0 && (
              <Button 
                variant="danger" 
                onClick={() => removeMobile(index)}
                size="sm"
              >
                Remove
              </Button>
            )}
          </div>
        ))}
        <Button 
          variant="outline-secondary" 
          onClick={addMobile}
          size="sm"
        >
          Add Another Mobile Number
        </Button>
      </div>

      {/* Addresses */}
      <div className="mb-4">
        <h5>Addresses</h5>
        {formData.addresses.map((addr, index) => (
          <div key={index} className="mb-3 border p-3">
            <Row className="mb-2">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Address Line 1</Form.Label>
                  <Form.Control
                    value={addr.addressLine1}
                    onChange={e => handleChange('addressLine1', index, e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Address Line 2</Form.Label>
                  <Form.Control
                    value={addr.addressLine2}
                    onChange={e => handleChange('addressLine2', index, e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    value={addr.country}
                    onChange={e => handleChange('country', index, e.target.value)}
                    placeholder="Enter Country Name"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    value={addr.city}
                    onChange={e => handleChange('city', index, e.target.value)}
                    placeholder="Enter City Name"
                  />
                </Form.Group>
              </Col>
            </Row>

            {index > 0 && (
              <Button 
                variant="danger" 
                onClick={() => removeAddress(index)}
                size="sm"
                className="mt-2"
              >
                Remove Address
              </Button>
            )}
          </div>
        ))}
        <Button 
          variant="outline-secondary" 
          onClick={addAddress}
          size="sm"
        >
          Add Another Address
        </Button>
      </div>

      <Button variant="primary" type="submit">
        Create Customer
      </Button>
    </Form>
  );
}

export default CustomerForm;
