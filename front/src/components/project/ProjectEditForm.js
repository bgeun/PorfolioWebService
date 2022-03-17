import React from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import * as Api from "../../api";

// project 편집 폼 컴포넌트
const ProjectEditForm = ({ project, setProjectList, setIsEditing }) => {
  // 폼 제출 시 실행되는 함수. 입력받은 정보를 put하고 certificateList에 적용
  const handleSubmit = async (e) => {
    e.preventDefault();
    // 입력받은 정보 가져옴
    const title = e.target.title.value;
    const description = e.target.description.value;
    const fromDate = e.target.fromDate.value;
    const toDate = e.target.toDate.value;

    // const res = await Api.put(`projects/{projects._id}`, {
    //   title,
    //   description,
    //   fromDate,
    //   toDate,
    // });
    // const editedProject = await res.data;

    setProjectList((current) => {
      const newProject = current.map((i) => {
        if (i._id === project._id) {
          // return editedProject
          return {
            _id: i._id,
            title,
            description,
            fromDate,
            toDate,
          };
        } else {
          return i;
        }
      });
      return newProject;
    });
    setIsEditing(false);
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Control
        className="mt-3"
        type="text"
        name="title"
        defaultValue={project.title}
      />
      <Form.Control
        className="mt-3"
        type="text"
        name="description"
        defaultValue={project.description}
      />
      <Row>
        <Col>
          <Form.Control
            className="mt-3"
            type="date"
            name="fromDate"
            defaultValue={project.fromDate}
          />
        </Col>
        <Col>
          <Form.Control
            className="mt-3"
            type="date"
            name="toDate"
            defaultValue={project.toDate}
          />
        </Col>
      </Row>
      <Row className="text-center mt-3">
        <Col>
          <Button variant="primary" type="submit">
            확인
          </Button>
          <Button
            className="ms-3"
            variant="secondary"
            onClick={() => setIsEditing(false)}
          >
            취소
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default ProjectEditForm;
