import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
var url = window.location.href.split("/");
let workid = url[url.length - 1];

const Gallery = () => {
  const [users, setUsers] = useState([]);
  const [selectedImage, setSelectedImage] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [serviceAppointment, setServiceAppointment] = useState();
  const [ocr1Data, setOcrData] = useState();
  const [gpsLoc, setGpsLoc] = useState();
  const [woLoc, setWoLoc] = useState();
  console.log(ocr1Data);
  // const settings = {
  //   dots: false,
  //   fade: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 1,
  //   arrow: true,
  //   slidesToScroll: 1,
  //   className: "slides",
  // };

  // const getUsers = async () => {
  //   const response = await fetch(
  //     "https://faeuwnonwfm.azurewebsites.net/api/Search?code=zhCZPmKxWjsYLq26wWoM4dARhaXjcS2MapkxKPSzvLksb82EPnaM/g==&workid=" +
  //       workid
  //   );
  //   var users = await response.json();
  //   const length = users.length;
  // };
  // var length = users.length;
  // const nextSlide = () => {
  //   setCurrent(current === length - 1 ? 0 : current + 1);
  // };
  // const prevSlide = () => {
  //   setCurrent(current === 0 ? length - 1 : current - 1);
  // };

  // const imageUrls = users.map((user) => {
  //   const images = user.blobURL;
  //   return images;
  // });
  // console.log(imageUrls);

  const getSelectedUsers = async () => {
    const response = await fetch(
      "https://faeuwnonwfm.azurewebsites.net/api/Search?code=zhCZPmKxWjsYLq26wWoM4dARhaXjcS2MapkxKPSzvLksb82EPnaM/g==&workid=" +
        workid
    );
    var users = await response.json();
    setUsers(users);
    //const length = users.length;
    // for (var i = 0; i < length; i++) {
    //   users.unshift(i);
    // }
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   getSelectedUsers();
  // };  console.log(selectedImage);
  useEffect(() => {
    getSelectedUsers();
  }, []);

  return (
    <>
      <div>
        <div className="imageGrid">
          <h3>Work ID : {users.workId}</h3>
          {/* <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Search Work Id Here.."
              name="search"
              onChange={(e) => setImgSearch(e.target.value)}
            />
            <button type="submit">
              <i className="fa fa-search"></i>
            </button>
          </form> */}
          <ul className="users">
            {users.map((user) => {
              const { id, workId, workLineItemId, blobURL, ocrData } = user;
              return (
                <li key={id}>
                  <img
                    src={blobURL}
                    alt={workId}
                    // style={{
                    //   border:
                    //     selectedImage === blobURL ? "4px solid purple" : "",
                    // }}
                    onClick={() => {
                      setSelectedImage(blobURL);
                      setIsModalOpen(true);
                      setOcrData(ocrData);
                    }}
                  />
                  <Modal
                    isOpen={isModalOpen}
                    onRequestClose={() => setIsModalOpen(false)}
                    overlayClassName="custom-Modal__Overlay"
                    style={{
                      overlay: {
                        position: "fixed",
                        top: 20,
                        left: 100,
                        right: 90,
                        bottom: 20,
                        backgroundColor: "rgb(34, 32, 32)",
                      },
                      content: {
                        position: "absolute",
                        top: "30px",
                        left: "30px",
                        right: "30px",
                        bottom: "30px",
                        border: "1px solid #ccc",
                        background: "rgb(34, 32, 32)",
                        overflow: "hidden",
                        WebkitOverflowScrolling: "touch",
                        borderRadius: "4px",
                        outline: "none",
                        padding: "20px",
                      },
                    }}
                  >
                    {/* && ocr1Data.length !== 0 */}
                    <h4>Work Order: {workId}</h4>
                    <div>
                      <div id="wrapper">
                        <div className="main">Service Appointment:</div>
                        {ocr1Data !== null && (
                          <div className="OCR">
                            OCR Text: {ocr1Data} <br />
                          </div>
                        )}
                        <div className="rest">
                          GPS Loc: <br />
                          WO Loc: <br />
                        </div>
                        <div className="closebtn">
                          <button
                            className="btnclose"
                            style={{ float: "right" }}
                            onClick={() => {
                              setIsModalOpen(false);
                            }}
                          >
                            Close
                          </button>
                        </div>
                      </div>
                      <br />
                      <div className="image">
                        <img src={selectedImage} alt={workId} />
                      </div>
                    </div>
                  </Modal>
                  {/* <div id="wrapper">
                    <div className="main">
                      WORKORDER: {workId} <br />
                      WOLI : {workLineItemId} <br />
                      Service Appointment:
                    </div>
                    {ocrData !== null && ocrData.length !== 0 && (
                      <div className="OCR">
                        OCR Text: {ocrData} <br />
                      </div>
                    )}
                    <div className="rest">
                      GPS Loc: <br />
                      WO Loc: <br />
                    </div>
                  </div> */}
                </li>
              );
            })}
          </ul>
        </div>
        {/* {selectedImage && (
          <div className="slider">
            <Slider {...settings}>
              {users.map((user) => {
                return (
                  <div>
                    <img width="100%" src={user.blobURL} />
                  </div>
                );
              })}
            </Slider>
          </div>
        )} */}
      </div>
    </>
  );
};

export default Gallery;
