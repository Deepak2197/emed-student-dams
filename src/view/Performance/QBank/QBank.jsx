<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import axiosInstance from "../../../API/axiosConfig";

=======
import { useEffect, useState } from "react";
import axiosInstance from "../../../API/axiosConfig";
>>>>>>> 50d8b36 (first commit)
import Chart from "react-apexcharts";
import ReactApexChart from "react-apexcharts";
import { Progress } from "antd";
import "../../Performance/style.css";
<<<<<<< HEAD

=======
>>>>>>> 50d8b36 (first commit)
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
<<<<<<< HEAD
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
=======
} from "chart.js";
import { Bar } from "react-chartjs-2";
>>>>>>> 50d8b36 (first commit)

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

<<<<<<< HEAD


=======
>>>>>>> 50d8b36 (first commit)
const QBank = ({
  filterArray,
  qBankID,
  testSeriesID,
  existDataOrNot,
  userID,
}) => {
<<<<<<< HEAD
  
=======
>>>>>>> 50d8b36 (first commit)
  const [firstGraphData, setFirstGrapghData] = useState([]);
  const [secondGraphData, setSecondGraphData] = useState([]);
  const [allCategoryList, setAllCategoryList] = useState([]);
  const [subjectID, setSubjectID] = useState(null);
  const [subjectCheckID, setSubjectCheckID] = useState(null);
  const [topAccuracyReportData, setTopAccuracyReportData] = useState([[]]);
<<<<<<< HEAD

  const [qBankIDValue, setQBankIDValue] = useState(null);
  const [qBankCheckIDValue, setQBankCheckIDValue] = useState(null);
  const [topAnalysisData, settopAnalysisData] = useState([[]]);

  const labels = secondGraphData.map((val)=>val.subject_name)

=======
  const [qBankIDValue, setQBankIDValue] = useState(null);
  const [qBankCheckIDValue, setQBankCheckIDValue] = useState(null);
  const [topAnalysisData, settopAnalysisData] = useState([[]]);
  const labels = secondGraphData.map((val) => val.subject_name);
>>>>>>> 50d8b36 (first commit)
  //   GRAPH DESIGN Starts here
  const chartOptions = {
    chart: {
      type: "bar",
      height: 300,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: firstGraphData.map((item) => item.subject_name),
    },
    yaxis: {
      title: {
        text: "Subject Wise Strongest To Weakest Accuracy",
      },
    },
    colors: ["#008FFB"],
  };

  const chartSeries = [
    {
      // name: "Horizontal Bar Chart",
      data: firstGraphData.map((item) => item.accuracy_percentage),
    },
  ];

  const optionsTh = {
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: true,
        columnWidth: "55%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: topAccuracyReportData.map((value) => value.topic_name),
      title: {
        text: "Module Wise Accuracy in DQB ",
      },
    },
    yaxis: {
      title: {
        text: "",
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      x: {
        formatter: function (val) {
          return val;
        },
      },
    },
  };

  const seriesTh = [
    {
      data: topAccuracyReportData.map((value) => value.accuracy_percentage),
    },
    {
      data: topAccuracyReportData.map((value) => value.inaccuracy_percent),
    },
  ];

<<<<<<< HEAD


const options = {
  plugins: {
    title: {
      display: true,
      text: 'Chart.js Bar Chart - Stacked',
    },
  },
  responsive: true,
  interaction: {
    mode: 'index' ,
    intersect: false,
  },
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

// const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

// const generateRandomData = () => {
//     return labels.map(() => Math.floor(Math.random() * 2000) - 1000); // Generates random numbers between -1000 and 1000
//   };
const data = {
  labels,
  datasets: [
    {
      label: '',
      data: secondGraphData.map((val)=>val.accuracy_percentage),
      backgroundColor: '#25E200',
      stack: 'Stack 0',
    },
    {
      label: '',
      data: secondGraphData.map((val)=>0-val.inaccuracy_percentage),
      backgroundColor: 'rgb(255, 99, 132)',
      stack: 'Stack 0',
    },
    
  ],
};



  
  
=======
  const options = {
    plugins: {
      title: {
        display: true,
        text: "Chart.js Bar Chart - Stacked",
      },
    },
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  // const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  // const generateRandomData = () => {
  //     return labels.map(() => Math.floor(Math.random() * 2000) - 1000); // Generates random numbers between -1000 and 1000
  //   };
  const data = {
    labels,
    datasets: [
      {
        label: "",
        data: secondGraphData.map((val) => val.accuracy_percentage),
        backgroundColor: "#25E200",
        stack: "Stack 0",
      },
      {
        label: "",
        data: secondGraphData.map((val) => 0 - val.inaccuracy_percentage),
        backgroundColor: "rgb(255, 99, 132)",
        stack: "Stack 0",
      },
    ],
  };
>>>>>>> 50d8b36 (first commit)

  //   GRAPH DESIGN Finish here

  //   1 request
  const getFirstGraph = async (userId, cID) => {
    try {
      const res = await axiosInstance.post(
        "/v2_data_model/get_subject_accuracy_report_descending",
        {
          user_id: userId,
          duration: "",
          course_id: cID,
        }
      );
      setFirstGrapghData(res.data.data);
      getSecondGraph(userId, cID);
<<<<<<< HEAD
    } catch (error) {
     
    }
=======
    } catch (error) {}
>>>>>>> 50d8b36 (first commit)
  };

  //   2 request
  const getSecondGraph = async (userId, cID) => {
    try {
      const res = await axiosInstance.post(
        "/v2_data_model/get_subject_accuracy_report",
        {
          course_id: cID,
          duration: "",
          user_id: userId,
        }
      );
      setSecondGraphData(res.data.data);
      getAllCategoryListFetch(userId, cID);
<<<<<<< HEAD
    } catch (error) {
     
    }
=======
    } catch (error) {}
>>>>>>> 50d8b36 (first commit)
  };

  const getAllCategoryListFetch = async (userId, cID) => {
    try {
      const res = await axiosInstance.post("/v2_data_model/get_all_subject", {
        course_id: cID,
        duration: "",
        user_id: userId,
      });
      setAllCategoryList(res.data.data);
      setSubjectID(res.data.data[0].id);
      setSubjectCheckID(res.data.data[0].id);
      setQBankIDValue(res.data.data[0].id);
      setQBankCheckIDValue(res.data.data[0].id);
      topicAccuracyReport(userId, cID, res.data.data[0].id);
      topicWiseAnalysis(userId, cID, res.data.data[0].id);
<<<<<<< HEAD
    } catch (error) {
     
    }
=======
    } catch (error) {}
>>>>>>> 50d8b36 (first commit)
  };

  const topicAccuracyReport = async (userId, cID, sID) => {
    try {
      const res = await axiosInstance.post(
        "/v2_data_model/get_topic_accuracy_report",
        {
          duration: "",
          user_id: userId,
          course_id: cID,
          subject_id: sID,
        }
      );
      //   setAllSubjectResData(res.data.data);
      setTopAccuracyReportData(res.data.data);
<<<<<<< HEAD
    } catch (error) {
      
    }
=======
    } catch (error) {}
>>>>>>> 50d8b36 (first commit)
  };

  const topicWiseAnalysis = async (userId, cID, sID) => {
    try {
      const res = await axiosInstance.post(
        "/v2_data_model/get_topic_wise_analysis",
        {
          duration: "YEARLY",
          user_id: userId,
          course_id: cID,
          subject_id: sID,
        }
      );
      settopAnalysisData(res.data.data);
      //   setTopAccuracyReportData(res.data.data);
<<<<<<< HEAD
    } catch (error) {
   
    }
=======
    } catch (error) {}
>>>>>>> 50d8b36 (first commit)
  };

  useEffect(() => {
    if (existDataOrNot?.qbank === "1") {
      getFirstGraph(userID, qBankID);
    }
  }, [existDataOrNot]);

<<<<<<< HEAD

  useEffect(() => {
    if(subjectCheckID !== subjectID){
        topicAccuracyReport(userID, qBankID, subjectID);
    }
  }, [subjectID]);


  useEffect(() => {
    if(qBankCheckIDValue !== qBankIDValue){
        topicWiseAnalysis(userID, qBankID, qBankIDValue);
    }
  }, [qBankIDValue]);


=======
  useEffect(() => {
    if (subjectCheckID !== subjectID) {
      topicAccuracyReport(userID, qBankID, subjectID);
    }
  }, [subjectID]);

  useEffect(() => {
    if (qBankCheckIDValue !== qBankIDValue) {
      topicWiseAnalysis(userID, qBankID, qBankIDValue);
    }
  }, [qBankIDValue]);

>>>>>>> 50d8b36 (first commit)
  return (
    <>
      <div className="QbankData">
        <Chart
          options={chartOptions}
          series={chartSeries}
          type="bar"
          height={350}
        />
      </div>

      <div className="QbankData">
<<<<<<< HEAD
       <Bar options={options} data={data} /> 
      </div>


=======
        <Bar options={options} data={data} />
      </div>

>>>>>>> 50d8b36 (first commit)
      <div className="DqbData">
        {allCategoryList && allCategoryList.length > 0 && (
          <div className="row dropMargin" style={{ margin: "5px" }}>
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
              <p style={{ fontWeight: "bolder", marginTop: "15px" }}>
                Module Wise Accuracy in DQB
              </p>
              <div className="form-group">
                <select
                  className="form-control"
                  onChange={(e) => setSubjectID(e.target.value)}
                  value={subjectID}
                >
                  {allCategoryList?.map((plan) => (
                    <option key={plan.id} value={plan.id}>
                      {plan.subject_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {topAccuracyReportData.length > 0 ? (
          <ReactApexChart
            options={optionsTh}
            series={seriesTh}
            type="bar"
            height={topAccuracyReportData?.length > 4 ? 500 : 200}
          />
        ) : (
          <div
            style={{
              height: "10vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <b>You haven't attempt this subject</b>
          </div>
        )}
      </div>

      <div className="moduleAnalysis">
        {allCategoryList && allCategoryList.length > 0 && (
          <div className="row dropMargin" style={{ margin: "5px" }}>
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
              <p style={{ fontWeight: "bolder", marginTop: "10px" }}>
                Q-Bank Module Wise Analysis
              </p>
              <div className="form-group">
                <select
                  className="form-control"
                  onChange={(e) => setQBankIDValue(e.target.value)}
                  value={qBankIDValue}
                >
                  {allCategoryList?.map((plan) => (
                    <option key={plan.id} value={plan.id}>
                      {plan.subject_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {topAnalysisData?.length > 0 ? (
          <>
            {topAnalysisData?.map((itm, i) => (
<<<<<<< HEAD
              <div className="AnalysisChild"
              key={i}
              >
=======
              <div className="AnalysisChild" key={i}>
>>>>>>> 50d8b36 (first commit)
                <h6>Title</h6>
                <div className="progresData">
                  <span>Accuracy</span>
                  <Progress
                    percent={Math.round(itm.accuracy_percentage)}
                    style={{ width: "90%" }}
                  />
                </div>
                <span>Total Attempt:{itm.total_attempt}</span>
                <br />
<<<<<<< HEAD
                <span style={{ color: "#28a745", fontWeight:'600', marginRight:'20px' }}>
                  Correct:{itm.total_correct}
                </span>
                <span>
                  Total Question:{itm?.total_questions}
                </span>
=======
                <span
                  style={{
                    color: "#28a745",
                    fontWeight: "600",
                    marginRight: "20px",
                  }}
                >
                  Correct:{itm.total_correct}
                </span>
                <span>Total Question:{itm?.total_questions}</span>
>>>>>>> 50d8b36 (first commit)
              </div>
            ))}
          </>
        ) : (
          <div className="attempTopic">
            <b>You haven't attempt this topic</b>
          </div>
        )}
      </div>
    </>
  );
};

export default QBank;
