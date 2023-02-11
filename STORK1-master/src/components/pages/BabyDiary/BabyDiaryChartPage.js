import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import bd_chart_subtitle from "../../../assets/svg/BabyDiary/BabyDiaryChart/bd_chart_subtitle.svg";
import bd_chart_title from "../../../assets/svg/BabyDiary/BabyDiaryChart/bd_chart_title.svg";
import bdc_ac_text1 from "../../../assets/svg/BabyDiary/BabyDiaryChart/bdc_ac_text1.svg";
import bdc_ac_text3 from "../../../assets/svg/BabyDiary/BabyDiaryChart/bdc_ac_text3.svg";
import bdc_crl_text1 from "../../../assets/svg/BabyDiary/BabyDiaryChart/bdc_crl_text1.svg";
import bdc_fl_text1 from "../../../assets/svg/BabyDiary/BabyDiaryChart/bdc_fl_text1.svg";
import bdc_fl_text2 from "../../../assets/svg/BabyDiary/BabyDiaryChart/bdc_fl_text2.svg";
import bdc_fl_text3 from "../../../assets/svg/BabyDiary/BabyDiaryChart/bdc_fl_text3.svg";
import bdc_mybaby_text from "../../../assets/svg/BabyDiary/BabyDiaryChart/bdc_mybaby_text.svg";
import bdc_otherbaby_text from "../../../assets/svg/BabyDiary/BabyDiaryChart/bdc_otherbaby_text.svg";
import detail_btn_text from "../../../assets/svg/BabyDiary/BabyDiaryChart/detail_btn_text.svg";
import BabyChart from "./BabyChart";

import "../../styles/BabyDiary/BabyDiaryChartPage.css";

import Header from "../Bar/Header";
import Footer from "../Bar/Footer";

const BabyDiaryChartPage = () => {
  const onDetailBtnClick = useCallback(() => {
    const anchor = document.querySelector("[data-scroll-to='bDChartSubtitle']");
    if (anchor) {
      anchor.scrollIntoView({ block: "center", behavior: "smooth" });
    }
  }, []);
  const [parCrlCom, setparCrlCom] = useState("짧아요.");
  const [parAcCom, setparAcCom] = useState("짧아요.");
  const [parFlCom, setparFlCom] = useState("짧아요.");
  const [parCrl, setParCrl] = useState();
  const [parAc, setParAc] = useState();
  const [parFl, setParFl] = useState();
  const [parResult, setParResult] = useState("평균 수치와 비슷해요");
  const location = useLocation();
  const crl = location.state.crl;
  const ac = location.state.ac;
  const fl = location.state.fl;
  const week = location.state.week;
  const crlmean = [
    9.5, 10.9, 12.4, 14, 15, 16.2, 17.1, 18.1, 19.1, 20.1, 21.1, 22.1, 23.1,
    24.1, 25, 26.1, 27.0, 28.5, 29.8, 30.6, 31.6, 32.7, 33.1, 37.8, 35.8,
  ];
  const acmean = [
    9.81, 11.05, 11.91, 13.06, 14.4, 15.38, 16.29, 17.37, 18.48, 19.53, 20.16,
    21.5, 22.59, 23.63, 24.6, 25.76, 26.47, 27.44, 28.42, 28.82, 29.78, 30.02,
    31.4, 31.27,
  ];
  const flmean = [
    1.77, 2.03, 2.34, 2.71, 2.99, 3.39, 3.67, 3.91, 4.07, 4.24, 4.42, 4.62,
    5.01, 5.37, 5.56, 5.72, 5.9, 6.01, 6.14, 6.34, 6.46, 6.37, 6.71, 6.79,
  ];
  const num = parseInt(week) - 15;

  useEffect(() => {
    setParCrl(parseFloat(crl) - parseFloat(crlmean[num]));
    if (parCrl >= 0) {
      setparCrlCom("길어요.");
    }
    setParAc(parseFloat(ac) - parseFloat(acmean[num]));
    if (parAc >= 0) {
      setparAcCom("길어요.");
    }
    setParFl(parseFloat(fl) - parseFloat(flmean[num]));
    if (parFl >= 0) {
      setparFlCom("길어요.");
    }

    const scrollAnimElements = document.querySelectorAll(
      "[data-animate-on-scroll]"
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting || entry.intersectionRatio > 0) {
            const targetElement = entry.target;
            targetElement.classList.add("animate");
            observer.unobserve(targetElement);
          }
        }
      },
      {
        threshold: 0.15,
      }
    );

    for (let i = 0; i < scrollAnimElements.length; i++) {
      observer.observe(scrollAnimElements[i]);
    }

    return () => {
      for (let i = 0; i < scrollAnimElements.length; i++) {
        observer.unobserve(scrollAnimElements[i]);
      }
    };
  }, []);

  useEffect(() => {
    const resultSay =
      parseFloat(crl) +
      parseFloat(ac) +
      parseFloat(fl) -
      parseFloat(crlmean[num]) -
      parseFloat(acmean[num]) -
      parseFloat(flmean[num]);
    if (resultSay >= 3) {
      setParResult("평균 수치보다 커요");
    }
    if (resultSay <= -3) {
      setParResult("평균 수치보다 작아요");
    }
  }, []);

  return (
    <div className="babydiarychart-page">
      <Header />
      <img className="bd-chart-title-icon" alt="" src={bd_chart_title} />
      <div className="bd-chart-div" data-animate-on-scroll>
        <BabyChart crl={crl} ac={ac} fl={fl} week={week} />
      </div>
      <div className="bd-chart-tag-div" data-animate-on-scroll>
        <div className="bd-chart-tag-div1" />
        <div className="bdc-mybaby-div" />
        <div className="bdc-otherbaby-div" />
        <img
          className="bdc-otherbaby-text-icon"
          alt=""
          src={bdc_otherbaby_text}
        />
        <img className="bdc-mybaby-text-icon" alt="" src={bdc_mybaby_text} />
      </div>
      <button className="detail-btn" onClick={onDetailBtnClick}>
        <div className="detail-btn-div" />
        <img className="detail-btn-text-icon" alt="" src={detail_btn_text} />
      </button>
      <img
        className="bd-chart-subtitle-icon"
        alt=""
        src={bd_chart_subtitle}
        data-scroll-to="bDChartSubtitle"
      />
      <div className="bd-chart-detail-div">
        <div className="bd-chart-detail-div1" />
        <div className="bdc-crl-div">
          <div className="bdc-crl-div1" />
          <img className="bdc-crl-text1-icon" alt="" src={bdc_crl_text1} />
          <div className="bdc-crl-num-text">
            {Math.round(Math.abs(parseFloat(parCrl)) * 10) / 10}
          </div>
          <img className="bdc-crl-text2-icon" alt="" src={bdc_fl_text2} />
          <img className="bdc-crl-text3-icon" alt="" src={bdc_ac_text3} />
          <div className="bdc-crl-cm-text">{parCrlCom}</div>
        </div>
        <div className="bdc-ac-div">
          <div className="bdc-ac-div1" />
          <img className="bdc-ac-text1-icon" alt="" src={bdc_ac_text1} />
          <div className="bdc-ac-num-text">
            {Math.round(Math.abs(parseFloat(parAc)) * 10) / 10}
          </div>
          <img className="bdc-ac-text2-icon" alt="" src={bdc_fl_text2} />
          <img className="bdc-ac-text3-icon" alt="" src={bdc_ac_text3} />
          <div className="bdc-ac-cm-text">{parAcCom}</div>
        </div>
        <div className="bdc-fl-div">
          <div className="bdc-fl-div1" />
          <img className="bdc-fl-text1-icon" alt="" src={bdc_fl_text1} />
          <div className="bdc-fl-num-text">
            {Math.round(Math.abs(parseFloat(parFl)) * 10) / 10}
          </div>
          <img className="bdc-fl-text2-icon" alt="" src={bdc_fl_text2} />
          <img className="bdc-fl-text3-icon" alt="" src={bdc_fl_text3} />
          <div className="bdc-fl-cm-text">{parFlCom}</div>
        </div>
      </div>
      <div className="bd-chart-comment-div">
        <div className="bd-chart-comment-div1" />
        <span className="bd-chart-comment">{parResult}!</span>
      </div>
      <Footer />
    </div>
  );
};

export default BabyDiaryChartPage;