import React, { useEffect, useState } from 'react';
import { Container, Content } from 'rsuite';
import './Dashboard.scss';
import { AuthService } from '../services';

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    try {
      getAllUsers();
    } catch (err) {
      console.log(err);
    }
  }, []);

  const getAllUsers = async () => {
    const res = await AuthService.getUsers();
    setUsers(res.data);
  };
  return (
    <Container>
      <Content>
        <div className="container__wrapper">
          <h3>User List</h3>
          <ul className="users">
            {users.map((e, i) => (
              <li key={i} className="users-list">
                {e.fullname} - {e.email}
              </li>
            ))}
          </ul>
        </div>
      </Content>
    </Container>
  );
}
