import React, { useState, useEffect } from 'react';
import { Table, Pagination } from 'react-bootstrap';
import { getCustomers } from '../services/api';

export default function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    getCustomers(page).then(res => {
      setCustomers(res.data.content);
      setTotalPages(res.data.totalPages);
    });
  }, [page]);

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>NIC</th>
            <th>Date of Birth</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(customer => (
            <tr key={customer.id}>
              <td>{customer.name}</td>
              <td>{customer.nic}</td>
              <td>{customer.dob}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      
      <Pagination>
        {[...Array(totalPages).keys()].map(number => (
          <Pagination.Item 
            key={number} 
            active={number === page}
            onClick={() => setPage(number)}
          >
            {number + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </div>
  );
}
