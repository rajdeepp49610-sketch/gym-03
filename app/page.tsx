"use client";

import { useState } from "react";
import type { MouseEvent } from "react";

type Metric = [name: string, value: string];
type ZoneData = {
score: string;
title: string;
description: string;
metrics: Metric[];
};

const zones: Record<string, ZoneData> = {
"UPPER BODY": {
score: "87",
title: "Upper Body",
description:
"Build pressing strength, pulling power and shoulder stability through measured progressive training.",
metrics: [
["PUSH", "91%"],
["PULL", "84%"],
["STABILITY", "86%"],
],
},
CORE: {
score: "92",
title: "Core",
description:
"Exceptional trunk control. Improve rotational strength and transfer power into every movement.",
metrics: [
["CONTROL", "94%"],
["ROTATION", "89%"],
["ENDURANCE", "93%"],
],
},
"LOWER BODY": {
score: "79",
title: "Lower Body",
description:
"Your biggest performance opportunity. Build unilateral strength, mobility and explosive output.",
metrics: [
["SQUAT", "82%"],
["POWER", "76%"],
["MOBILITY", "80%"],
],
},
MOBILITY: {
score: "83",
title: "Mobility",
description:
"Good movement quality with room to improve hip and ankle range for more efficient mechanics.",
metrics: [
["HIPS", "86%"],
["ANKLES", "78%"],
["T-SPINE", "85%"],
],
},
};

type Zone = keyof typeof zones;

export default function Page() {
const [activeZone, setActiveZone] = useState<Zone>("CORE");
const [showBooking, setShowBooking] = useState(false);
const [goal, setGoal] = useState("ATHLETIC PERFORMANCE");

const data = zones[activeZone];

return ( <main className="site"> <style jsx global>{`
* {
box-sizing: border-box;
}


    html {
      scroll-behavior: smooth;
    }

    body {
      margin: 0;
      background: #080909;
      color: #f3f4ef;
      font-family: Arial, Helvetica, sans-serif;
    }

    button {
      font: inherit;
    }

    .site {
      min-height: 100vh;
      background:
        radial-gradient(circle at 80% 8%, rgba(192, 255, 54, 0.08), transparent 28%),
        #080909;
      overflow: hidden;
    }

    .nav {
      height: 78px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 5vw;
      border-bottom: 1px solid rgba(255,255,255,.08);
      position: sticky;
      top: 0;
      z-index: 20;
      background: rgba(8,9,9,.82);
      backdrop-filter: blur(18px);
    }

    .logo {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 13px;
      letter-spacing: .18em;
      font-weight: 800;
    }

    .logoDot {
      width: 11px;
      height: 11px;
      border-radius: 50%;
      background: #c4ff36;
      box-shadow: 0 0 20px rgba(196,255,54,.65);
    }

    .navLinks {
      display: flex;
      gap: 28px;
      align-items: center;
    }

    .navLinks a {
      color: #8d918c;
      text-decoration: none;
      font-size: 11px;
      letter-spacing: .14em;
      text-transform: uppercase;
    }

    .navLinks a:hover {
      color: #fff;
    }

    .navButton {
      border: 1px solid rgba(196,255,54,.45);
      color: #c4ff36;
      background: transparent;
      padding: 11px 17px;
      font-size: 10px;
      letter-spacing: .14em;
      cursor: pointer;
    }

    .hero {
      min-height: calc(100vh - 78px);
      padding: 8vh 5vw 7vh;
      display: grid;
      grid-template-columns: 1.1fr .9fr;
      gap: 5vw;
      align-items: center;
      position: relative;
    }

    .hero:after {
      content: "";
      position: absolute;
      width: 420px;
      height: 420px;
      right: -180px;
      top: 20%;
      border: 1px solid rgba(196,255,54,.08);
      border-radius: 50%;
      box-shadow:
        0 0 0 70px rgba(196,255,54,.018),
        0 0 0 140px rgba(196,255,54,.012);
      pointer-events: none;
    }

    .eyebrow {
      color: #c4ff36;
      font-size: 10px;
      letter-spacing: .24em;
      font-weight: 700;
      margin-bottom: 22px;
    }

    h1 {
      font-size: clamp(58px, 9vw, 138px);
      line-height: .82;
      letter-spacing: -.07em;
      margin: 0;
      max-width: 850px;
    }

    .outline {
      color: transparent;
      -webkit-text-stroke: 1px rgba(243,244,239,.65);
    }

    .heroText {
      max-width: 550px;
      color: #858985;
      line-height: 1.8;
      font-size: 15px;
      margin: 30px 0;
    }

    .heroActions {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
    }

    .primary {
      background: #c4ff36;
      color: #080909;
      border: none;
      padding: 15px 22px;
      font-size: 10px;
      font-weight: 800;
      letter-spacing: .16em;
      cursor: pointer;
    }

    .secondary {
      background: transparent;
      color: #fff;
      border: 1px solid rgba(255,255,255,.15);
      padding: 15px 22px;
      font-size: 10px;
      letter-spacing: .16em;
      cursor: pointer;
    }

    .scanner {
      min-height: 530px;
      border: 1px solid rgba(255,255,255,.1);
      background:
        linear-gradient(rgba(255,255,255,.025) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,.025) 1px, transparent 1px),
        #0d0f0f;
      background-size: 36px 36px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }

    .scannerLabel {
      position: absolute;
      top: 18px;
      left: 18px;
      font-size: 9px;
      letter-spacing: .18em;
      color: #6f746e;
    }

    .scanLine {
      position: absolute;
      width: 100%;
      height: 1px;
      background: #c4ff36;
      box-shadow: 0 0 16px #c4ff36;
      top: 28%;
      animation: scan 3.8s infinite ease-in-out;
      opacity: .65;
    }

    @keyframes scan {
      0%,100% { top: 20%; }
      50% { top: 80%; }
    }

    .body {
      width: 190px;
      height: 390px;
      position: relative;
    }

    .head {
      width: 65px;
      height: 65px;
      border: 2px solid #c4ff36;
      border-radius: 50%;
      margin: auto;
      box-shadow: 0 0 25px rgba(196,255,54,.12);
    }

    .torso {
      width: 110px;
      height: 150px;
      border: 2px solid #c4ff36;
      border-radius: 46% 46% 30% 30%;
      margin: 7px auto 0;
    }

    .arms {
      position: absolute;
      top: 76px;
      left: 8px;
      width: 174px;
      height: 145px;
      border-left: 2px solid #c4ff36;
      border-right: 2px solid #c4ff36;
      border-radius: 50%;
    }

    .legs {
      width: 105px;
      height: 180px;
      margin: -1px auto 0;
      border-left: 2px solid #c4ff36;
      border-right: 2px solid #c4ff36;
      border-radius: 0 0 40px 40px;
    }

    .scannerInfo {
      position: absolute;
      bottom: 18px;
      left: 18px;
      right: 18px;
      display: flex;
      justify-content: space-between;
      font-size: 9px;
      color: #737873;
      letter-spacing: .12em;
    }

    .section {
      padding: 110px 5vw;
      border-top: 1px solid rgba(255,255,255,.07);
    }

    .sectionHeader {
      display: flex;
      justify-content: space-between;
      gap: 30px;
      align-items: end;
      margin-bottom: 55px;
    }

    .sectionTitle {
      font-size: clamp(38px, 6vw, 78px);
      line-height: .9;
      letter-spacing: -.05em;
      margin: 0;
    }

    .muted {
      color: #747873;
      max-width: 380px;
      line-height: 1.7;
      font-size: 13px;
    }

    .assessment {
      display: grid;
      grid-template-columns: .7fr 1.3fr;
      gap: 2px;
      background: rgba(255,255,255,.08);
    }

    .zones {
      background: #0d0f0f;
      padding: 24px;
    }

    .zone {
      width: 100%;
      border: none;
      border-bottom: 1px solid rgba(255,255,255,.07);
      background: transparent;
      color: #686d68;
      padding: 23px 5px;
      text-align: left;
      display: flex;
      justify-content: space-between;
      cursor: pointer;
      font-size: 11px;
      letter-spacing: .14em;
    }

    .zone:hover,
    .zone.active {
      color: #c4ff36;
    }

    .zoneScore {
      font-size: 10px;
    }

    .results {
      background: #111313;
      padding: 50px;
      min-height: 390px;
    }

    .resultTop {
      display: flex;
      justify-content: space-between;
      align-items: start;
      margin-bottom: 40px;
    }

    .score {
      font-size: 88px;
      line-height: .8;
      letter-spacing: -.08em;
      color: #c4ff36;
    }

    .score small {
      font-size: 13px;
      color: #696e68;
      letter-spacing: .1em;
    }

    .resultTitle {
      font-size: 28px;
      margin: 0 0 13px;
      letter-spacing: -.03em;
    }

    .resultDescription {
      color: #797e78;
      line-height: 1.7;
      max-width: 510px;
      font-size: 13px;
    }

    .metrics {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
      margin-top: 45px;
    }

    .metric {
      border-top: 1px solid rgba(255,255,255,.12);
      padding-top: 13px;
    }

    .metricName {
      color: #666b66;
      font-size: 9px;
      letter-spacing: .14em;
    }

    .metricValue {
      margin-top: 13px;
      font-size: 24px;
    }

    .programs {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 14px;
    }

    .program {
      min-height: 310px;
      border: 1px solid rgba(255,255,255,.08);
      padding: 28px;
      position: relative;
      background: linear-gradient(145deg,#111313,#0b0c0c);
      transition: transform .25s, border-color .25s;
    }

    .program:hover {
      transform: translateY(-6px);
      border-color: rgba(196,255,54,.35);
    }

    .programNumber {
      font-size: 10px;
      color: #c4ff36;
      letter-spacing: .14em;
    }

    .program h3 {
      font-size: 27px;
      letter-spacing: -.04em;
      margin-top: 100px;
      margin-bottom: 12px;
    }

    .program p {
      color: #727771;
      line-height: 1.6;
      font-size: 12px;
    }

    .programArrow {
      position: absolute;
      right: 24px;
      top: 24px;
      color: #555a55;
      font-size: 24px;
    }

    .goalBox {
      display: grid;
      grid-template-columns: .8fr 1.2fr;
      gap: 50px;
      align-items: center;
      background: #c4ff36;
      color: #080909;
      padding: 55px;
    }

    .goalBox h2 {
      font-size: clamp(38px, 5vw, 70px);
      line-height: .9;
      letter-spacing: -.06em;
      margin: 0;
    }

    .goalOptions {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 9px;
    }

    .goal {
      padding: 17px;
      border: 1px solid rgba(8,9,9,.25);
      background: transparent;
      color: #080909;
      text-align: left;
      cursor: pointer;
      font-size: 10px;
      letter-spacing: .12em;
    }

    .goal.selected {
      background: #080909;
      color: #c4ff36;
    }

    .cta {
      text-align: center;
      padding: 150px 5vw;
    }

    .cta h2 {
      font-size: clamp(50px, 9vw, 120px);
      letter-spacing: -.08em;
      line-height: .82;
      margin: 0 auto 35px;
      max-width: 1000px;
    }

    .footer {
      border-top: 1px solid rgba(255,255,255,.08);
      padding: 25px 5vw;
      display: flex;
      justify-content: space-between;
      color: #5f645f;
      font-size: 9px;
      letter-spacing: .14em;
    }

    .modalBack {
      position: fixed;
      inset: 0;
      z-index: 100;
      background: rgba(0,0,0,.78);
      backdrop-filter: blur(12px);
      display: grid;
      place-items: center;
      padding: 20px;
    }

    .modal {
      width: min(500px,100%);
      background: #101212;
      border: 1px solid rgba(196,255,54,.3);
      padding: 38px;
      box-shadow: 0 30px 100px rgba(0,0,0,.6);
    }

    .modalHeader {
      display: flex;
      justify-content: space-between;
      align-items: start;
    }

    .modal h2 {
      margin: 0;
      font-size: 34px;
      letter-spacing: -.05em;
    }

    .close {
      background: transparent;
      border: none;
      color: #777;
      font-size: 22px;
      cursor: pointer;
    }

    .input {
      width: 100%;
      background: #080909;
      color: #fff;
      border: 1px solid rgba(255,255,255,.1);
      padding: 15px;
      margin-top: 12px;
      outline: none;
    }

    .modal .primary {
      width: 100%;
      margin-top: 16px;
    }

    @media (max-width: 850px) {
      .navLinks {
        display: none;
      }

      .hero,
      .assessment,
      .goalBox {
        grid-template-columns: 1fr;
      }

      .hero {
        padding-top: 70px;
      }

      .scanner {
        min-height: 430px;
      }

      .programs {
        grid-template-columns: 1fr;
      }

      .sectionHeader {
        display: block;
      }

      .sectionHeader .muted {
        margin-top: 20px;
      }

      .results {
        padding: 30px;
      }

      .goalBox {
        padding: 35px;
      }
    }

    @media (max-width: 520px) {
      .nav {
        padding: 0 20px;
      }

      .hero,
      .section {
        padding-left: 20px;
        padding-right: 20px;
      }

      h1 {
        font-size: 62px;
      }

      .metrics {
        grid-template-columns: 1fr;
      }

      .goalOptions {
        grid-template-columns: 1fr;
      }

      .footer {
        padding: 22px 20px;
      }
    }
  `}</style>

  <nav className="nav">
    <div className="logo">
      <span className="logoDot" />
      FORM / LAB
    </div>

    <div className="navLinks">
      <a href="#assessment">Assessment</a>
      <a href="#programs">Programs</a>
      <a href="#protocol">Protocol</a>
    </div>

    <button className="navButton" onClick={() => setShowBooking(true)}>
      BOOK ASSESSMENT
    </button>
  </nav>

  <section className="hero">
    <div>
      <div className="eyebrow">PERFORMANCE INTELLIGENCE / 03</div>

      <h1>
        TRAIN
        <br />
        <span className="outline">WITH</span>
        <br />
        DATA.
      </h1>

      <p className="heroText">
        FORM LAB is a performance studio built around assessment,
        measurable progress and intelligent training. Know your body
        before you push it.
      </p>

      <div className="heroActions">
        <button
          className="primary"
          onClick={() => setShowBooking(true)}
        >
          START ASSESSMENT →
        </button>

        <a href="#assessment">
          <button className="secondary">EXPLORE SYSTEM</button>
        </a>
      </div>
    </div>

    <div className="scanner">
      <span className="scannerLabel">BODY SCAN / LIVE MODEL</span>

      <div className="scanLine" />

      <div className="body">
        <div className="head" />
        <div className="arms" />
        <div className="torso" />
        <div className="legs" />
      </div>

      <div className="scannerInfo">
        <span>SCAN ID / FL-0249</span>
        <span>STATUS / READY</span>
      </div>
    </div>
  </section>

  <section className="section" id="assessment">
    <div className="sectionHeader">
      <div>
        <div className="eyebrow">01 / PERFORMANCE MAP</div>
        <h2 className="sectionTitle">
          KNOW
          <br />
          YOUR FORM.
        </h2>
      </div>

      <p className="muted">
        Select a movement system to inspect your current performance
        profile. Every program starts with understanding the athlete.
      </p>
    </div>

    <div className="assessment">
      <div className="zones">
        {(Object.keys(zones) as Zone[]).map((zone) => (
          <button
            key={zone}
            className={`zone ${activeZone === zone ? "active" : ""}`}
            onClick={() => setActiveZone(zone)}
          >
            <span>{zone}</span>
            <span className="zoneScore">
              {zones[zone].score}/100
            </span>
          </button>
        ))}
      </div>

      <div className="results">
        <div className="resultTop">
          <div>
            <h3 className="resultTitle">{data.title}</h3>
            <p className="resultDescription">
              {data.description}
            </p>
          </div>

          <div className="score">
            {data.score}
            <small>/100</small>
          </div>
        </div>

        <div className="metrics">
          {data.metrics.map(([name, value]) => (
            <div className="metric" key={name}>
              <div className="metricName">{name}</div>
              <div className="metricValue">{value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>

  <section className="section" id="programs">
    <div className="sectionHeader">
      <div>
        <div className="eyebrow">02 / TRAINING SYSTEM</div>
        <h2 className="sectionTitle">
          BUILT
          <br />
          FOR OUTPUT.
        </h2>
      </div>

      <p className="muted">
        No generic workouts. Choose a performance direction and build
        your training around the outcome you actually want.
      </p>
    </div>

    <div className="programs">
      <article className="program">
        <span className="programNumber">01 / POWER</span>
        <span className="programArrow">↗</span>
        <h3>EXPLOSIVE</h3>
        <p>
          Sprint mechanics, jumps, Olympic lifts and explosive force
          development.
        </p>
      </article>

      <article className="program">
        <span className="programNumber">02 / STRENGTH</span>
        <span className="programArrow">↗</span>
        <h3>STRONGER</h3>
        <p>
          Progressive resistance systems designed around measurable
          strength gains.
        </p>
      </article>

      <article className="program">
        <span className="programNumber">03 / ENGINE</span>
        <span className="programArrow">↗</span>
        <h3>CONDITION</h3>
        <p>
          Build work capacity, aerobic fitness and repeatable athletic
          output.
        </p>
      </article>
    </div>
  </section>

  <section className="section" id="protocol">
    <div className="goalBox">
      <h2>
        WHAT ARE
        <br />
        YOU BUILDING?
      </h2>

      <div className="goalOptions">
        {[
          "ATHLETIC PERFORMANCE",
          "BUILD STRENGTH",
          "LOSE FAT",
          "MOBILITY",
          "SPORT PERFORMANCE",
          "GENERAL FITNESS",
        ].map((item) => (
          <button
            key={item}
            className={`goal ${goal === item ? "selected" : ""}`}
            onClick={() => setGoal(item)}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  </section>

  <section className="cta">
    <div className="eyebrow">FORM LAB / MEMBERSHIP</div>

    <h2>
      YOUR BODY.
      <br />
      <span className="outline">MEASURED.</span>
    </h2>

    <button className="primary" onClick={() => setShowBooking(true)}>
      BOOK YOUR FIRST ASSESSMENT →
    </button>
  </section>

  <footer className="footer">
    <span>FORM / LAB — PERFORMANCE STUDIO</span>
    <span>INDIA / 2026</span>
  </footer>

  {showBooking && (
    <div className="modalBack" onClick={() => setShowBooking(false)}>
      <div className="modal" onClick={(e: MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
        <div className="modalHeader">
          <div>
            <div className="eyebrow">FIRST SESSION</div>
            <h2>BOOK ASSESSMENT</h2>
          </div>

          <button
            className="close"
            onClick={() => setShowBooking(false)}
          >
            ×
          </button>
        </div>

        <input className="input" placeholder="YOUR NAME" />
        <input className="input" placeholder="PHONE / EMAIL" />

        <select className="input" defaultValue="">
          <option value="" disabled>
            SELECT GOAL
          </option>
          <option>Strength</option>
          <option>Athletic Performance</option>
          <option>Fat Loss</option>
          <option>Mobility</option>
          <option>Sport Performance</option>
        </select>

        <button
          className="primary"
          onClick={() => {
            alert("Assessment request received.");
            setShowBooking(false);
          }}
        >
          REQUEST ASSESSMENT →
        </button>
      </div>
    </div>
  )}
</main>


);
}
