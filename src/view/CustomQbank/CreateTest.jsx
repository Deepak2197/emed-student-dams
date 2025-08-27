import { Button, Radio } from "antd";
import { useEffect, useState } from "react";
import axiosInstance from "../../API/axiosConfig";
import "../../assets/css/bookmark/style.css";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../../ulits/apiConstant";
<<<<<<< HEAD
=======
import {Modal } from "react-bootstrap";
>>>>>>> 50d8b36 (first commit)

const CreateTest = () => {
  // State definitions
  const [noque, setNoque] = useState(10); // Number of questions
  const [questionSource, setQuestionSource] = useState("1"); // Question source (level)
  const [step, setStep] = useState(1); // Current step (1, 2, or 3)
  const [allselected, setAllselected] = useState(true); // "All Subjects" or "Choose Subject" mode
  const [alllevel, setAlllevel] = useState([]); // Question bank levels
  const [allsub, setAllsub] = useState([]); // Subjects and their topics
  const [visibleSubjectId, setVisibleSubjectId] = useState(null); // Subject ID for visible topics
  const [selectedIds, setSelectedIds] = useState(""); // Selected subject IDs for "All Subjects"
  const [topicIds, setTopicIds] = useState(""); // Selected topic IDs for "All Subjects"
  const [myselectid, setMyselectid] = useState(""); // Selected subject IDs for "Choose Subject"
  const [myselectid1, setMyselectid1] = useState(""); // Selected topic IDs for "Choose Subject"
  const [mode, setMode] = useState(1); // Test mode (1 for Exam, 2 for Guide)

<<<<<<< HEAD
=======
  const [modal,setModal] = useState(false);
  const [moduleData,setModuleData] = useState({});

>>>>>>> 50d8b36 (first commit)
  const navigate = useNavigate();
  const course_id = '385'; // Hardcoded course ID
  const user_id = sessionStorage.getItem("id"); // User ID from session storage

  // Fetch question bank levels
  useEffect(() => {
    const getQbankLevel = async () => {
      try {
        const res = await axiosInstance.post(
          API_ENDPOINTS.CUSTOM_QBANK.CUSTOM_QBANK_LEVEL,
          { user_id }
        );
        setAlllevel(res?.data?.data || []);
      } catch (error) {
        console.error("Error fetching qbank level:", error);
        alert("Failed to fetch question levels. Please try again.");
      }
    };

    if (user_id) {
      getQbankLevel();
    }
  }, [user_id]);

  // Fetch subjects and topics when entering step 2
  useEffect(() => {
    if (step === 2) {
      getSubjects();
    }
  }, [step, questionSource]);

  // Fetch subjects and topics
  const getSubjects = async () => {
    try {
      const res = await axiosInstance.post(
        API_ENDPOINTS.CUSTOM_QBANK.CUSTOM_QBANK_SUBJECT,
        {
          user_id,
          qbank_course_id: course_id,
          level_flag: questionSource,
        }
      );
      const subjects = res?.data?.data || [];
      setAllsub(subjects);

      // Set default selections for "All Subjects" mode
      if (allselected && subjects.length > 0) {
        const allSubjectIds = subjects
          .map((subject) => subject.subject_id)
          .filter((id) => id)
          .join(",");
        const allTopicIds = subjects
          .flatMap((subject) => subject.topics?.map((topic) => topic.id) || [])
          .filter((id) => id)
          .join(",");
        setSelectedIds(allSubjectIds);
        setTopicIds(allTopicIds);
      }
    } catch (error) {
      console.error("Error fetching subjects:", error);
      alert("Failed to fetch subjects. Please try again.");
    }
  };

  // Handle mode switch between "All Subjects" and "Choose Subject"
  useEffect(() => {
    if (allselected && allsub.length > 0) {
      // Select all subjects and topics in "All Subjects" mode
      const allSubjectIds = allsub
<<<<<<< HEAD
        .map((subject) => subject.subject_id)
=======
        .map((subject) => subject.topicid)
>>>>>>> 50d8b36 (first commit)
        .filter((id) => id)
        .join(",");
      const allTopicIds = allsub
        .flatMap((subject) => subject.topics?.map((topic) => topic.id) || [])
        .filter((id) => id)
        .join(",");
      setSelectedIds(allSubjectIds);
      setTopicIds(allTopicIds);
      setMyselectid(""); // Clear "Choose Subject" selections
      setMyselectid1("");
    } else {
      // Clear all selections when switching to "Choose Subject" mode
      setSelectedIds("");
      setTopicIds("");
      setMyselectid("");
      setMyselectid1("");
    }
  }, [allselected, allsub]);

  // Handle subject selection in "All Subjects" mode
  const handleCheckboxChange = (subjectId) => {
<<<<<<< HEAD
=======
    
>>>>>>> 50d8b36 (first commit)
    if (allselected) {
      const subjectIdsArray = selectedIds
        ? selectedIds.split(",").filter((id) => id)
        : [];
      const topicIdsArray = topicIds
        ? topicIds.split(",").filter((id) => id)
        : [];
<<<<<<< HEAD

      if (subjectIdsArray.includes(String(subjectId))) {
        // Deselect subject and its topics
        const newSubjectIds = subjectIdsArray.filter(
          (id) => id !== String(subjectId)
        );
=======
      if (subjectIdsArray.find((id) => id == subjectId)) {
        // Deselect subject and its topics
        
        const newSubjectIds = subjectIdsArray.filter(
          (id) => id !== subjectId
        );
        
>>>>>>> 50d8b36 (first commit)
        const subject = allsub.find((s) => s.subject_id === subjectId);
        const topicIdsToRemove =
          subject?.topics?.map((topic) => String(topic.id)) || [];
        const newTopicIds = topicIdsArray.filter(
          (id) => !topicIdsToRemove.includes(id)
        );

        setSelectedIds(newSubjectIds.join(","));
        setTopicIds(newTopicIds.join(","));
      } else {
        // Select subject and its topics
        const newSubjectIds = [...subjectIdsArray, String(subjectId)];
        const subject = allsub.find((s) => s.subject_id === subjectId);
        const topicIdsToAdd =
          subject?.topics?.map((topic) => String(topic.id)) || [];
        const newTopicIds = [...topicIdsArray, ...topicIdsToAdd].filter(
          (id, index, self) => self.indexOf(id) === index
        );

        setSelectedIds(newSubjectIds.join(","));
        setTopicIds(newTopicIds.join(","));
      }
    }
  };

  // Handle subject selection in "Choose Subject" mode (auto-select all topics)
  const handleCheckboxChange1 = (subjectId) => {
    if (!allselected) {
<<<<<<< HEAD
      const subjectIdsArray = myselectid
        ? myselectid.split(",").filter((id) => id)
        : [];
      const topicIdsArray = myselectid1
        ? myselectid1.split(",").filter((id) => id)
        : [];

=======

      const subjectIdsArray = myselectid
        ? myselectid.split(",").filter((id) => id)
        : [];
        
      const topicIdsArray = myselectid1
        ? myselectid1.split(",").filter((id) => id)
        : [];
      
>>>>>>> 50d8b36 (first commit)
      let newSubjectIds = [...subjectIdsArray];
      let newTopicIds = [...topicIdsArray];

      if (subjectIdsArray.includes(String(subjectId))) {
        // Deselect subject and its topics
        newSubjectIds = subjectIdsArray.filter(
          (id) => id !== String(subjectId)
        );
        const subject = allsub.find((s) => s.subject_id === subjectId);
        const topicIdsToRemove =
          subject?.topics?.map((topic) => String(topic.id)) || [];
        newTopicIds = topicIdsArray.filter(
          (id) => !topicIdsToRemove.includes(id)
        );
      } else {
        // Select subject and auto-select all its topics
        newSubjectIds = [...subjectIdsArray, String(subjectId)];
<<<<<<< HEAD
        const subject = allsub.find((s) => s.subject_id === subjectId);
=======
        const subject = allsub.find((s) => s.topicid === subjectId);
>>>>>>> 50d8b36 (first commit)
        const topicIdsToAdd =
          subject?.topics?.map((topic) => String(topic.id)) || [];
        newTopicIds = [...topicIdsArray, ...topicIdsToAdd].filter(
          (id, index, self) => self.indexOf(id) === index
        );
      }

      setMyselectid(newSubjectIds.join(","));
      setMyselectid1(newTopicIds.join(","));
    }
  };

  // Handle topic selection in "Choose Subject" mode
  const handleCheckboxChange2 = (topicId) => {
    if (!allselected) {
      const topicIdsArray = myselectid1
        ? myselectid1.split(",").filter((id) => id)
        : [];

      if (topicIdsArray.includes(String(topicId))) {
        // Deselect topic
        const newTopicIds = topicIdsArray.filter(
          (id) => id !== String(topicId)
        );
        setMyselectid1(newTopicIds.join(","));
      } else {
        // Select topic
        const newTopicIds = [...topicIdsArray, String(topicId)];
        setMyselectid1(newTopicIds.join(","));
      }
    }
  };

  // Toggle topic visibility for a subject
  const handleSeeTopics = (subjectId) => {
    setVisibleSubjectId((prev) => (prev === subjectId ? null : subjectId));
  };

  // Create test and navigate to test page
  const handleCreate = async () => {
    try {
      const payload = {
        user_id,
        no_of_ques: noque,
        ques_from: questionSource,
        subject: allselected ? selectedIds : myselectid,
        topics: allselected ? topicIds : myselectid1,
        mode,
        tags: "",
<<<<<<< HEAD
        course_id,
=======
        qbank_course_id:course_id,
>>>>>>> 50d8b36 (first commit)
      };

      const endpoint = allselected
        ? API_ENDPOINTS.CUSTOM_QBANK.CUSTOM_QBANK_FOR_TEST
<<<<<<< HEAD
        : API_ENDPOINTS.CUSTOM_QBANK.CREATE_QBANK_NEW;

      const res = await axiosInstance.post(endpoint, payload);

      if (res?.data?.data?.id) {
        navigate(`/topic-share/${res.data.data.id}`);
=======
        : API_ENDPOINTS.CUSTOM_QBANK.CUSTOM_QBANK_FOR_TEST;

      const res = await axiosInstance.post(endpoint, payload);
      if (res?.data?.data?.id) {
        setModal(true);
        setModuleData(res?.data?.data);
        // navigate(`/topic-share/${res.data.data.id}`);
>>>>>>> 50d8b36 (first commit)
      } else {
        alert("Test creation failed: No test ID returned.");
      }
    } catch (error) {
      console.error("Error creating test:", error);
      alert("Error creating test. Please try again.");
    }
  };

<<<<<<< HEAD
=======
  const handleChallenge = ()=>{
    navigate(`/topic-share/${moduleData?.id}`);
  }
  function convertTimestampToDate(timestamp) {
  if (!timestamp) return "";
  const date = new Date(timestamp * 1000); // convert seconds → ms
  return date.toLocaleString("en-IN", {
    weekday: "long",   // e.g., Tuesday
    year: "numeric",   // e.g., 2025
    month: "long",     // e.g., August
    day: "numeric",    // e.g., 26
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

>>>>>>> 50d8b36 (first commit)
  return (
    <div className="customQBank">
      <div className="container">
        <div className="qbankInnerNew">
          {step === 1 && (
            <div className="qBankOptionPart">
              <div className="qsnNumber">
                <h4>Number of Questions</h4>
                <select onChange={(e) => setNoque(Number(e.target.value))}>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={30}>30</option>
                  <option value={40}>40</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
              </div>
              <div className="setdiffiLevel">
                <div className="difLevel">
                  <div className="difImgSet">
                    <img
                      src={`${window.IMG_BASE_URL}/emdpublic/qbank/question.svg`}
                      alt="Question"
                    />
                  </div>
                  <h2>Choose Question From</h2>
                </div>
                <div className="inputSection inputSectionNew">
                  {alllevel.map((item) => (
                    <p key={item.id}>
                      <input
                        type="radio"
                        id={`qbank-${item.id}`}
                        name="question-group"
                        checked={questionSource === item.id}
                        onChange={() => setQuestionSource(item.id)}
                      />
                      <label htmlFor={`qbank-${item.id}`}>
                        <span>{item.title}</span>
                      </label>
                    </p>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="groupbtndata setdiffiLevel">
              <div className="btndataset inputSection inputSectionNew1">
                <p>
                  <Radio
                    id="all-subjects"
                    name="subject-selection"
                    checked={allselected}
                    onChange={() => setAllselected(true)}
                  >
                    All Subjects
                  </Radio>
                </p>
                <p>
                  <Radio
                    id="choose-subject"
                    name="subject-selection"
                    checked={!allselected}
                    onChange={() => setAllselected(false)}
                  >
                    Choose Subject
                  </Radio>
                </p>
              </div>

              <div className="allSelectedData">
                {allsub?.map((subject) => (
<<<<<<< HEAD
                  <div className="allSubMap" key={subject.subject_id}>
=======
                  <div className="allSubMap" key={subject.topicid}>
>>>>>>> 50d8b36 (first commit)
                    <div className="allSubInner">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        checked={
                          allselected
                            ? selectedIds
                                .split(",")
<<<<<<< HEAD
                                .includes(String(subject.subject_id))
                            : myselectid
                                .split(",")
                                .includes(String(subject.subject_id))
                        }
                        onChange={() =>
                          allselected
                            ? handleCheckboxChange(subject.subject_id)
                            : handleCheckboxChange1(subject.subject_id)
=======
                                .includes(String(subject.topicid))
                            : myselectid
                                .split(",")
                                .includes(String(subject.topicid))
                        }
                        onChange={() =>
                          allselected
                            ? handleCheckboxChange(subject.topicid)
                            : handleCheckboxChange1(subject.topicid)
>>>>>>> 50d8b36 (first commit)
                        }
                      />
                      <span className="selectName">{subject.topic_name}</span>
                      <button
                        className="btndefinedata"
<<<<<<< HEAD
                        onClick={() => handleSeeTopics(subject.subject_id)}
                      >
                        {visibleSubjectId === subject.subject_id
                          ? "Hide Topics"
                          : "See Topics"}
                      </button>
                    </div>

                    {visibleSubjectId === subject.subject_id &&
=======
                        onClick={() => handleSeeTopics(subject.topicid)}
                      >
                        {visibleSubjectId === subject.topicid
                          ? "Hide Topics"
                          : "See Topics"}
                      </button> 
                    </div>

                    {visibleSubjectId === subject.topicid &&
>>>>>>> 50d8b36 (first commit)
                      subject.topics?.length > 0 && (
                        <div className="leftData">
                          {subject.topics.map((topic) => (
                            <div className="allSubInner" key={topic.id}>
                              <input
                                type="checkbox"
                                className="form-check-input"
                                checked={
                                  allselected
                                    ? topicIds
                                        .split(",")
                                        .includes(String(topic.id))
                                    : myselectid1
                                        .split(",")
                                        .includes(String(topic.id))
                                }
                                onChange={() => handleCheckboxChange2(topic.id)}
                                disabled={allselected}
                              />
                              <span
                                style={{ color: "#424242" }}
                                className="selectName"
                              >
                                {topic.topic}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="chooseLevel selectMode groupbtndata setdiffiLevel setdiffiLevel1">
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <div className="difLevel">
                      <h2>Choose Your Preferences</h2>
                    </div>
                  </div>
                  <div className="SetBoxBgMode">
                    <div className="col-md-12">
                      <div className="headmain">
                        <h2>Select Mode:</h2>
                      </div>
                    </div>
                    <div className="ModeSetBox inputSection inputSectionNew2">
                      <div className="modeDiv" onClick={() => setMode(1)}>
                        <div className="modeOption">
                          <p>
                            <input
                              type="radio"
                              id="exam-mode"
                              name="mode-selection"
                              checked={mode === 1}
                              onChange={() => setMode(1)}
                            />
                            <label htmlFor="exam-mode">
                              <span>
                                <div className="SetCirleOfMode">
                                  <div className="modeimg">
                                    <img
                                      src={`${window.IMG_BASE_URL}/custom_qbank/exam.svg`}
                                      alt="Exam Mode"
                                    />
                                  </div>
                                  <div className="modetext">
                                    <h3>Exam Mode</h3>
                                    <p>
                                      Solutions and References will be visible
                                      after completion of the QBank.
                                    </p>
                                  </div>
                                </div>
                              </span>
                            </label>
                          </p>
                        </div>
                      </div>
                      <div className="modeDiv" onClick={() => setMode(2)}>
                        <div className="modeOption">
                          <p>
                            <input
                              type="radio"
                              id="guide-mode"
                              name="mode-selection"
                              checked={mode === 2}
                              onChange={() => setMode(2)}
                            />
                            <label htmlFor="guide-mode">
                              <span>
                                <div className="SetCirleOfMode">
                                  <div className="modeimg">
                                    <img
                                      src={`${window.IMG_BASE_URL}/custom_qbank/guide.svg`}
                                      alt="Guide Mode"
                                    />
                                  </div>
                                  <div className="modetext">
                                    <h3>Guide Mode</h3>
                                    <p>
                                      Solutions and References will be visible
                                      while the question is being attempted.
                                    </p>
                                  </div>
                                </div>
                              </span>
                            </label>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="bottomNext">
            {step !== 1 && (
              <Button
                style={{ backgroundColor: "#007aff", color: "white" }}
                onClick={() => setStep((prev) => prev - 1)}
              >
                Prev
              </Button>
            )}
            {step < 3 ? (
              <Button
                style={{ backgroundColor: "#007aff", color: "white" }}
                onClick={() => setStep((prev) => prev + 1)}
                disabled={
                  step === 2 &&
                  ((allselected && !selectedIds) ||
                    (!allselected && !myselectid))
                }
              >
                Next
              </Button>
            ) : (
              <Button
                style={{ backgroundColor: "#007aff", color: "white" }}
                onClick={handleCreate}
                disabled={
                  (allselected && !selectedIds) || (!allselected && !myselectid)
                }
              >
                Create Test
              </Button>
            )}
          </div>
        </div>
      </div>
<<<<<<< HEAD
=======
      {modal && (
        <Modal
          show={modal}
          onHide={() => {
            setModal(false);
          }}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
             
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="text-center">
              <h3 className="mt-3">Module From All Qbank</h3>
              <p className="mt-2">Created On : {convertTimestampToDate(moduleData.creation)} </p>
              <p className="mt-2">Subject :{moduleData.subjects}</p>
              <p className="mt-2">Difficulty Level : {moduleData.mode} </p>
              <p className="mt-2">Mode :{moduleData.mode} </p>
              
              <div>
              <img
                src='./logo.png'
                alt="complete"
                style={{ width: "100px", height: "100px" }}
              />
              <p className="mt-2" style={{ color: "Orange" }}  >Question Bank</p>
              <p className="mt-2" >{moduleData.no_of_question} Questions </p>
                </div>
              <div style={{ display: "flex", justifyContent: "space-between" , width: "50%", margin: "auto" }} >
                <button style={{ backgroundColor: "black", color: "white", padding: "10px 20px"}} >Start Now</button>
                <button style={{ backgroundColor: "grey", color: "white", padding: "10px 20px"}} onClick={handleChallenge} >Challenge</button>
              </div>
              
            </div>
          </Modal.Body>
        </Modal>
      )}
>>>>>>> 50d8b36 (first commit)
    </div>
  );
};

export default CreateTest;
