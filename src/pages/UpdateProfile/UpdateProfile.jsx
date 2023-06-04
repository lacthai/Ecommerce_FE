import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import "./UpdateProfile.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import "./UpdateProfile.css";
import { Container } from "react-bootstrap";
import { BsFillCameraFill } from "react-icons/bs";
import { AiOutlineMedicineBox } from "react-icons/ai";
import Avatar from "react-avatar-edit";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import bcrypt from "bcryptjs";

const UpdateProfile = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [imgCrop, setImgCrop] = useState("");
  const [storeImg, setstoreImg] = useState([]);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const [show4, setShow4] = useState(false);
  const { id } = useParams();
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  const handleClose3 = () => setShow3(false);
  const handleShow3 = () => setShow3(true);
  const handleClose4 = () => setShow4(false);
  const handleShow4 = () => setShow4(true);

  const userInfo = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;
  //change password

  const userOldPass = user.password;

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [rNewPassword, setRNewPassword] = useState("");

  const updateHandler = async (e) => {
    e.preventDefault();

    async function compareIt(oldPassword) {
      const validPassword = await bcrypt.compare(oldPassword, userOldPass);

      //check old password is correct
      if (validPassword !== true) {
        toast.error("The old password is not correct!");
        return;
      }

      //if new password === retype new password
      if (newPassword === rNewPassword) {
        try {
          const { data } = await axios.put("/users/update-profile", {
            _id: user._id,
            newPassword,
          });

          localStorage.removeItem("userInfo", JSON.stringify(data));
          toast.success("Password updated successfully!");
          navigate("/login");
        } catch (error) {
          toast.error("Password not updated!");
        }
      } else {
        toast.error("Password doesn`t match!");
      }
    }
    compareIt(oldPassword);
  };

  const OnCrop = (view) => {
    setImgCrop(view);
  };

  const OnClose = () => {
    setImgCrop(null);
  };

  const saveImage = () => {
    setstoreImg([...storeImg, { imgCrop }]);
    setShow1(false);
  };

  const profileImageShow = storeImg.map((item) => item.imgCrop);



  return (
    <div className="profile_layout">
      <div className="profile_update-img">
        <div className="img_profile">
          <img
            src={profileImageShow.length ? profileImageShow : user.photoURL}
            alt="img_profile"
          />
          <button className="btn-edit_img_profile" onClick={handleShow1}>
            <BsFillCameraFill style={{ fontSize: "2.5rem" }} />
            Edit
          </button>
          <Modal show={show1} onHide={handleClose1}>
            <Modal.Header closeButton>
              <Modal.Title>Update Your Avatar</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Avatar
                width={"100%"}
                height={295}
                onCrop={OnCrop}
                onClose={OnClose}
              />
              <AiOutlineMedicineBox className="icon-modal_profile" />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose1}>
                Close
              </Button>
              <Button variant="primary" onClick={saveImage}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
        <div className="header_name-proflie">
          <h2>{user.name}</h2>
          <p>PeaShop ID: {user._id}</p>
        </div>
      </div>
      <Container className="profile_box">
        <div className="profile_container">
          <div className="profile_update-info">
            <div className="profile_info-title">Account Information</div>
            <div className="profile_info-input">
              <label>Name</label>
              <p>{user.name}</p>
              <button onClick={handleShow2}>Edit</button>
              <Modal show={show2} onHide={handleClose2}>
                <Modal.Header closeButton>
                  <Modal.Title>Change Your Name</Modal.Title>
                </Modal.Header>
                <Form>
                  <Modal.Body>
                    <Form.Group as={Row} className="mb-3">
                      <Form.Label column sm="3">
                        New Name
                      </Form.Label>
                      <Col sm="9">
                        <Form.Control
                          type="text"
                          placeholder="New Name"
                          value={name}
                          required
                          onChange={(e) => setName(e.target.value)}
                        />
                      </Col>
                    </Form.Group>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose2}>
                      Close
                    </Button>
                    <Button type="submit">Save Changes</Button>
                  </Modal.Footer>
                </Form>
              </Modal>
            </div>
            <div className="profile_info-input">
              <label>Email</label>
              <p>{user.email}</p>
              <button onClick={handleShow3}>Edit</button>{" "}
              <Modal show={show3} onHide={handleClose3}>
                <Modal.Header closeButton>
                  <Modal.Title>Change Your Email</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <Form.Group as={Row} className="mb-3">
                      <Form.Label column sm="3">
                        New Email
                      </Form.Label>
                      <Col sm="9">
                        <Form.Control type="text" placeholder={user.email} />
                      </Col>
                    </Form.Group>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose3}>
                    Close
                  </Button>
                  <Button variant="primary">Save Changes</Button>
                </Modal.Footer>
              </Modal>
            </div>
            <div className="profile_info-input">
              <label>Password</label>
              <p onClick={handleShow4} style={{cursor: "pointer"}}>Change Password</p>{" "}
              <Modal show={show4} onHide={handleClose4}>
                <Modal.Header closeButton>
                  <Modal.Title>Change Password</Modal.Title>
                </Modal.Header>
                <Form onSubmit={updateHandler}>
                  <Modal.Body>
                    <Form.Group as={Row} className="mb-3">
                      <Form.Label column sm="4">
                        Old Pasword
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control
                          type="password"
                          placeholder="input old password"
                          onChange={(e) => setOldPassword(e.target.value)}
                          id="o_password"
                          required
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                      <Form.Label column sm="4">
                        New Pasword
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control
                          type="password"
                          placeholder="input new password"
                          onChange={(e) => setNewPassword(e.target.value)}
                          id="password"
                          required
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                      <Form.Label column sm="4">
                        Confirm Pasword
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control
                          type="password"
                          placeholder="Confirm password"
                          onChange={(e) => setRNewPassword(e.target.value)}
                          id="r_password"
                          required
                        />
                      </Col>
                    </Form.Group>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose4}>
                      Close
                    </Button>
                    <Button variant="primary">Save Changes</Button>
                  </Modal.Footer>
                </Form>
              </Modal>
            </div>
          </div>
        </div>
      </Container>
      <div className="profile_bg"></div>
    </div>
  );
};

export default UpdateProfile;
