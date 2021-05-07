import React, { useState, useEffect } from "react";

const url = "https://localhost:44384/api/Blob";

const Gallery = () => {
  const [users, setUsers] = useState([]);
  const [selectedImage, setSelectedImage] = useState();

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
      <div>
        <div className="imageGrid">
          <h3>ThamesWater gallery</h3>
          <ul className="users">
            {users.map((user) => {
              const { Value, Key } = user;
              return (
                <li key={Key}>
                  <img
                    src={Value}
                    alt={Key}
                    style={{
                      border: selectedImage === Value ? "4px solid purple" : "",
                    }}
                    onClick={() => setSelectedImage(Value)}
                  />
                  <p>{Key}</p>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="imageShow">
          <img
            src={selectedImage}
            alt="Selected"
            className="selectedImage"
          ></img>
        </div>
      </div>
    </>
  );
};

export default Gallery;
