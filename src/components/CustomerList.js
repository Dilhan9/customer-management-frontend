import React, { useState, useEffect } from 'react';
import { Table, Pagination } from 'react-bootstrap';
import { getCustomers } from '../services/api';

export default function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    getCustomers(page).then(res => {
      setCustomers(res.data.content || []);
      setTotalPages(res.data.totalPages || 1);
    });
  }, [page]);

  return (
    <div>
      <h2 className="mb-4">Customer List</h2>
      
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>NIC</th>
            <th>Date of Birth</th>
            <th>Mobile Numbers</th>
            <th>Addresses</th>
          </tr>
        </thead>
        <tbody>
          {customers.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center text-muted">
                No customers found
              </td>
            </tr>
          ) : (
            customers.map(customer => (
              <tr key={customer.id}>
                <td>{customer.name}</td>
                <td>{customer.nic}</td>
                <td>{new Date(customer.dob).toLocaleDateString()}</td>
                <td>
                  {customer.mobileNumbers?.length > 0 
                    ? customer.mobileNumbers.join(', ')
                    : '-'}
                </td>
                <td>
                  {customer.addresses?.length > 0 ? (
                    <ul className="list-unstyled mb-0">
                      {customer.addresses.map((address, index) => (
                        <li key={index} className="mb-1">
                          {address.addressLine1}
                          {address.addressLine2 && `, ${address.addressLine2}`}
                          {address.city && `, ${address.city}`}
                          {address.country && `, ${address.country}`}
                        </li>
                      ))}
                    </ul>
                  ) : '-'}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      {totalPages > 1 && (
        <Pagination className="justify-content-center">
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
      )}
    </div>
  );
}
