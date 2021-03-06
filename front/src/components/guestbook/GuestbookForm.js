import React, { useState, useEffect } from "react";
import { Form, Card, Button } from "react-bootstrap";
import * as Api from "../../api";
import Guestbooks from "./Guestbooks";

import { useRecoilValue } from "recoil";
import { modeState } from "../../atom/themeState";

const GuestbookForm = ({ portfolioOwnerId }) => {
  const [guestBooks, setGuestBooks] = useState([]);
  const ModeState = useRecoilValue(modeState);

  const fetch = async () => {
    try {
      const response = await Api.get("commentlist", portfolioOwnerId);
      setGuestBooks(response.data);
    } catch (e) {}
  };

  // 기존 방명록을 받아와 저장
  useEffect(() => {
    fetch();
  }, [portfolioOwnerId]);

  // 입력받은 방명록을 저장하기 위한 state
  const [inputs, setInputs] = useState({
    userId: "",
    comment: "",
  });

  const onChange = (e) => {
    setInputs({
      userId: portfolioOwnerId,
      comment: e.target.value,
    });
  };

  //
  const addHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await Api.post("comment/create", inputs);
      console.log(inputs);
      setGuestBooks((cur) => {
        return [...cur, response.data];
      });
      setInputs({
        ...inputs,
        comment: "",
      });
      fetch();
    } catch (e) {}
  };

  return (
    <Card
      className={
        ModeState.mode === "dark"
          ? "mb-2 ms-3 mt-5 border-white"
          : "mb-2 ms-3 mt-5"
      }
      style={{ width: "19rem", padding: "5px" }}
    >
      <Card.Header
        className={ModeState.mode === "dark" ? "mb-1 border-white" : "mb-1"}
      >
        방명록
      </Card.Header>
      <Guestbooks
        guestBooks={guestBooks}
        setGuestBooks={setGuestBooks}
        fetch={fetch}
      />
      <Form.Group className="mt-2" controlId="exampleForm.ControlTextarea1">
        <Form.Control
          name="comment"
          as="textarea"
          placeholder="방명록을 입력해주세요."
          rows={3}
          value={inputs.comment}
          onChange={onChange}
        />
      </Form.Group>
      <Button className="mt-2" onClick={addHandler}>
        등록
      </Button>
    </Card>
  );
};

export default GuestbookForm;
