import { useState, useEffect } from "react";
import { Table, Form, Button, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";

import Message from "../components/Message";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

import { useProfileMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";

const ProfileScreen = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [updateProfile, { isLoading: loadingUpdateProfile, error }] =
    useProfileMutation();

  useEffect(() => {
    if (userInfo) {
      setProfile({ name: userInfo.name, email: userInfo.email });
    }
  }, [userInfo, userInfo.name, userInfo.email]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (profile.password !== profile.confirmPassword) {
      toast.error("Passwords do not match !!");
    } else {
      try {
        const res = await updateProfile({
          ...profile,
          _id: userInfo._id,
        }).unwrap();
        dispatch(setCredentials(res));
        toast.success("Profile updated successfully");
      } catch (err) {
        toast.error(err?.data?.message || err?.error);
      }
    }
  };
  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name" className="my-2">
            <Form.Label>Name :</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Enter Name"
              value={profile.name || ""}
              onChange={(e) =>
                setProfile({ ...profile, [e.target.name]: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group controlId="email" className="my-2">
            <Form.Label>Email :</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter Email Address"
              value={profile.email || ""}
              onChange={(e) =>
                setProfile({ ...profile, [e.target.name]: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group controlId="password" className="my-2">
            <Form.Label>Password :</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Enter New Password"
              value={profile.password || ""}
              onChange={(e) =>
                setProfile({ ...profile, [e.target.name]: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group controlId="confirmPassword" className="my-2">
            <Form.Label>Confirm Password :</Form.Label>
            <Form.Control
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={profile.confirmPassword || ""}
              onChange={(e) =>
                setProfile({ ...profile, [e.target.name]: e.target.value })
              }
            />
          </Form.Group>
          <Button type="submit" variant="primary">
            Update
          </Button>
          {loadingUpdateProfile && <Loader />}
        </Form>
      </Col>
      <Col md={9}></Col>
    </Row>
  );
};

export default ProfileScreen;
