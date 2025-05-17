import React from 'react';
import { Container } from 'react-bootstrap';
import CustomerForm from './components/CustomerForm';
import CustomerList from './components/CustomerList';
import FileUpload from './components/FileUpload';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Container className="my-4">
      <h1 className="mb-4">Customer Management System</h1>
      <CustomerForm />
      <FileUpload />
      <hr className="my-5" />
      <CustomerList />
    </Container>
  );
}

export default App;
