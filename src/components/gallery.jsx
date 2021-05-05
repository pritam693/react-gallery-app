import React, { useState, useEffect } from "react";

const url = "https://api.github.com/users";

const Gallery = () => {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    const response = await fetch(url);
    const users = await response.json();
    setUsers(users);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <h3>github users album</h3>
      <ul className="users">
        {users.map((user) => {
          const {
            id,
            login,
            avatar_url,
            html_url,
            followers_url,
            following_url,
          } = user;
          return (
            <li key={id}>
              <a href={avatar_url}>
                <img src={avatar_url} alt={login} />
              </a>
              {/* <div>
                <h4>{login}</h4>
                <a href={html_url}>profile</a>
                <a href={followers_url}>followers</a>
                <a href={following_url}>following</a>
              </div> */}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Gallery;
