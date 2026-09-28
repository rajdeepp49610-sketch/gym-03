"use client";

import { useEffect, useRef, useState } from "react";

const rooms = [
{
number: "01",
name: "THE FLOOR",
label: "TRAIN",
description:
"A private training floor engineered around strength, movement and focused work. No crowd. No distractions.",
image:
"https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1800&q=90",
},
{
number: "02",
name: "THE STUDIO",
label: "MOVE",
description:
"Controlled movement, mobility and small-group sessions designed to make your body move better.",
image:
"https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1800&q=90",
},
{
number: "03",
name: "THE RECOVERY",
label: "RESET",
description:
"Cold. Heat. Breath. Recovery protocols built into the club because progress doesn't happen only under a bar.",
image:
"https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1800&q=90",
},
{
number: "04",
name: "THE LAB",
label: "MEASURE",
description:
"Performance testing, movement assessment and data-driven training decisions for members who want more than guesswork.",
image:
"https://images.unsplash.com/photo-1576678927484-cc907957088c?auto=format&fit=crop&w=1800&q=90",
},
];

const memberships = [
{
name: "PRIVATE",
price: "₹4,900",
period: "/ MONTH",
description: "For people who want a better place to train.",
features: ["FULL FLOOR ACCESS", "STUDIO CLASSES", "RECOVERY ACCESS"],
},
{
name: "SIGNATURE",
price: "₹8,900",
period: "/ MONTH",
description: "The complete VANTA experience.",
features: [
"FULL CLUB ACCESS",
"RECOVERY PROTOCOLS",
"MONTHLY ASSESSMENT",
"PRIORITY BOOKING",
],
},
{
name: "BLACK",
price: "₹14,900",
period: "/ MONTH",
description: "For members who expect everything.",
features: [
"UNLIMITED CLUB ACCESS",
"PERSONAL COACH",
"WEEKLY ASSESSMENT",
"PRIVATE RECOVERY",
"CONCIERGE ACCESS",
],
},
];

export default function Page() {
const [loaded, setLoaded] = useState(false);
const [activeRoom, setActiveRoom] = useState(0);
const [activeMembership, setActiveMembership] = useState(1);
const [concierge, setConcierge] = useState(false);
const [conciergeStep, setConciergeStep] = useState(1);
const [conciergeChoice, setConciergeChoice] = useState("");
const [mouse, setMouse] = useState({ x: 50, y: 50 });

const cursorRef = useRef<HTMLDivElement>(null);

useEffect(() => {
const timer = setTimeout(() => setLoaded(true), 1200);


const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  { threshold: 0.12 }
);

document
  .querySelectorAll(".reveal")
  .forEach((el) => revealObserver.observe(el));

const move = (e: MouseEvent) => {
  const x = (e.clientX / window.innerWidth) * 100;
  const y = (e.clientY / window.innerHeight) * 100;

  setMouse({ x, y });

  if (cursorRef.current) {
    cursorRef.current.style.left = `${e.clientX}px`;
    cursorRef.current.style.top = `${e.clientY}px`;
  }
};

window.addEventListener("mousemove", move);

return () => {
  clearTimeout(timer);
  revealObserver.disconnect();
  window.removeEventListener("mousemove", move);
};


}, []);

const openConcierge = () => {
setConciergeChoice("");
setConciergeStep(1);
setConcierge(true);
};

const closeConcierge = () => {
setConcierge(false);
setConciergeStep(1);
setConciergeChoice("");
};

return (
<main
className={`vanta ${loaded ? "loaded" : ""}`}
style={
{
"--mx": `${mouse.x}%`,
"--my": `${mouse.y}%`,
} as React.CSSProperties
}
> <style jsx global>{`
* {
box-sizing: border-box;
}


    html {
      scroll-behavior: smooth;
    }

    body {
      margin: 0;
      background: #0b0b0a;
      color: #e9e5db;
      font-family: Arial, Helvetica, sans-serif;
    }

    button,
    a {
      font: inherit;
    }

    button {
      cursor: pointer;
    }

    :root {
      --cream: #e9e5db;
      --muted: #85827b;
      --line: rgba(233, 229, 219, 0.13);
      --gold: #c9b98b;
      --black: #0b0b0a;
    }

    .vanta {
      overflow: hidden;
      background:
        radial-gradient(
          circle at var(--mx) var(--my),
          rgba(201, 185, 139, 0.07),
          transparent 25%
        ),
        #0b0b0a;
      min-height: 100vh;
      transition: background 1s ease;
    }

    /* INTRO */

    .intro {
      position: fixed;
      inset: 0;
      z-index: 999;
      background: #0b0b0a;
      display: flex;
      align-items: center;
      justify-content: center;
      pointer-events: none;
      transition:
        opacity 1s cubic-bezier(.77,0,.18,1),
        visibility 1s;
    }

    .loaded .intro {
      opacity: 0;
      visibility: hidden;
    }

    .introInner {
      width: 180px;
    }

    .introTop {
      display: flex;
      justify-content: space-between;
      font-size: 7px;
      letter-spacing: .25em;
      color: #77736b;
      margin-bottom: 14px;
    }

    .loader {
      height: 1px;
      background: #292823;
      overflow: hidden;
    }

    .loaderBar {
      height: 100%;
      width: 0;
      background: var(--cream);
      animation: loading 1.05s cubic-bezier(.65,0,.35,1) forwards;
    }

    @keyframes loading {
      to {
        width: 100%;
      }
    }

    /* CURSOR */

    .cursor {
      position: fixed;
      width: 18px;
      height: 18px;
      border: 1px solid rgba(233,229,219,.65);
      border-radius: 50%;
      transform: translate(-50%,-50%);
      pointer-events: none;
      z-index: 1000;
      mix-blend-mode: difference;
      transition:
        width .25s,
        height .25s,
        background .25s;
    }

    @media(max-width: 800px) {
      .cursor {
        display: none;
      }
    }

    /* NAV */

    .nav {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 100;
      height: 82px;
      padding: 0 4vw;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid rgba(233,229,219,.08);
      background: rgba(11,11,10,.5);
      backdrop-filter: blur(18px);
      transform: translateY(-100%);
      animation: navIn .9s 1.2s forwards;
    }

    @keyframes navIn {
      to {
        transform: translateY(0);
      }
    }

    .logo {
      display: flex;
      align-items: center;
      gap: 12px;
      color: var(--cream);
      text-decoration: none;
    }

    .logoMark {
      width: 25px;
      height: 25px;
      border: 1px solid var(--cream);
      display: grid;
      place-items: center;
      font-size: 8px;
      letter-spacing: 0;
    }

    .logoText {
      font-size: 10px;
      letter-spacing: .3em;
      font-weight: 600;
    }

    .navMiddle {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      color: #66635d;
      font-size: 7px;
      letter-spacing: .28em;
    }

    .navAction {
      border: 1px solid rgba(233,229,219,.3);
      background: transparent;
      color: var(--cream);
      padding: 12px 17px;
      font-size: 7px;
      letter-spacing: .2em;
      transition: all .3s;
    }

    .navAction:hover {
      background: var(--cream);
      color: var(--black);
    }

    /* HERO */

    .hero {
      height: 100svh;
      min-height: 700px;
      position: relative;
      display: grid;
      place-items: center;
      overflow: hidden;
    }

    .heroImage {
      position: absolute;
      inset: 0;
      background:
        linear-gradient(
          90deg,
          rgba(11,11,10,.72),
          rgba(11,11,10,.2),
          rgba(11,11,10,.65)
        ),
        url("https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=2200&q=95")
        center / cover;
      filter: grayscale(.65);
      transform: scale(1.12);
      animation: heroZoom 2.2s 1.1s cubic-bezier(.2,.65,.2,1) forwards;
    }

    @keyframes heroZoom {
      to {
        transform: scale(1);
      }
    }

    .heroImage:after {
      content: "";
      position: absolute;
      inset: 0;
      background:
        radial-gradient(
          circle at var(--mx) var(--my),
          rgba(201,185,139,.13),
          transparent 30%
        ),
        linear-gradient(transparent 60%, #0b0b0a);
    }

    .heroGrid {
      position: absolute;
      inset: 0;
      background-image:
        linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px);
      background-size: 100px 100px;
      mask-image: linear-gradient(to bottom, black, transparent 75%);
      opacity: .35;
    }

    .heroContent {
      position: relative;
      z-index: 2;
      text-align: center;
      width: 90%;
    }

    .heroEyebrow {
      color: #aaa69d;
      font-size: 8px;
      letter-spacing: .42em;
      margin-bottom: 28px;
      opacity: 0;
      animation: fadeUp .9s 1.35s forwards;
    }

    .heroTitle {
      margin: 0;
      font-size: clamp(70px, 13vw, 190px);
      font-weight: 300;
      letter-spacing: -.09em;
      line-height: .72;
    }

    .heroTitleLine {
      overflow: hidden;
      display: block;
    }

    .heroTitleLine span {
      display: block;
      transform: translateY(110%);
      animation: titleReveal 1.3s cubic-bezier(.2,.75,.2,1) forwards;
    }

    .heroTitleLine:nth-child(1) span {
      animation-delay: 1.2s;
    }

    .heroTitleLine:nth-child(2) span {
      animation-delay: 1.35s;
      color: transparent;
      -webkit-text-stroke: 1px var(--cream);
    }

    @keyframes titleReveal {
      to {
        transform: translateY(0);
      }
    }

    .heroSub {
      max-width: 450px;
      margin: 45px auto 0;
      color: #9c9991;
      font-size: 11px;
      line-height: 1.8;
      opacity: 0;
      animation: fadeUp .9s 1.7s forwards;
    }

    @keyframes fadeUp {
      from {
        opacity: 0;
        transform: translateY(25px);
      }

      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .heroButton {
      margin-top: 30px;
      opacity: 0;
      animation: fadeUp .9s 1.85s forwards;
    }

    .luxButton {
      position: relative;
      overflow: hidden;
      padding: 17px 25px;
      border: 1px solid var(--cream);
      background: var(--cream);
      color: var(--black);
      font-size: 7px;
      letter-spacing: .22em;
      transition: color .35s;
    }

    .luxButton:before {
      content: "";
      position: absolute;
      inset: 0;
      background: var(--gold);
      transform: translateY(100%);
      transition: transform .35s cubic-bezier(.7,0,.2,1);
    }

    .luxButton:hover:before {
      transform: translateY(0);
    }

    .luxButton span {
      position: relative;
      z-index: 1;
    }

    .heroMeta {
      position: absolute;
      z-index: 3;
      bottom: 35px;
      left: 4vw;
      right: 4vw;
      display: flex;
      justify-content: space-between;
      color: #74716b;
      font-size: 7px;
      letter-spacing: .22em;
    }

    .scrollLine {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .scrollLine:before {
      content: "";
      width: 35px;
      height: 1px;
      background: #74716b;
    }

    /* MARQUEE */

    .marquee {
      height: 100px;
      display: flex;
      align-items: center;
      overflow: hidden;
      border-bottom: 1px solid var(--line);
      border-top: 1px solid var(--line);
      white-space: nowrap;
    }

    .marqueeTrack {
      display: flex;
      animation: marquee 24s linear infinite;
      width: max-content;
    }

    .marqueeWord {
      font-size: clamp(35px,5vw,65px);
      font-weight: 300;
      letter-spacing: -.06em;
      color: #34332f;
      padding: 0 30px;
    }

    .marqueeWord:nth-child(even) {
      color: #77736b;
    }

    .marqueeDot {
      color: var(--gold);
    }

    @keyframes marquee {
      to {
        transform: translateX(-50%);
      }
    }

    /* INTRO PHILOSOPHY */

    .philosophy {
      min-height: 900px;
      padding: 170px 7vw;
      display: grid;
      grid-template-columns: .8fr 1.2fr;
      gap: 10vw;
      align-items: center;
    }

    .tiny {
      font-size: 7px;
      color: #77736b;
      letter-spacing: .3em;
    }

    .philosophyNumber {
      font-size: 170px;
      line-height: .7;
      font-weight: 200;
      color: #282722;
      letter-spacing: -.1em;
      margin-top: 35px;
    }

    .philosophyTitle {
      font-size: clamp(48px, 7vw, 100px);
      line-height: .85;
      letter-spacing: -.075em;
      font-weight: 300;
      margin: 0 0 40px;
    }

    .philosophyTitle em {
      font-style: normal;
      color: transparent;
      -webkit-text-stroke: 1px #77736b;
    }

    .philosophyText {
      max-width: 510px;
      color: #77736b;
      font-size: 12px;
      line-height: 2;
    }

    .philosophyQuote {
      margin-top: 45px;
      padding-left: 18px;
      border-left: 1px solid var(--gold);
      color: #b3afa6;
      font-size: 11px;
      line-height: 1.7;
    }

    /* RITUAL */

    .ritual {
      padding: 120px 4vw;
      border-top: 1px solid var(--line);
      border-bottom: 1px solid var(--line);
    }

    .ritualHead {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin: 0 3vw 60px;
    }

    .ritualTitle {
      font-size: clamp(50px,8vw,110px);
      font-weight: 300;
      letter-spacing: -.08em;
      line-height: .75;
      margin: 15px 0 0;
    }

    .ritualHint {
      color: #68655e;
      font-size: 8px;
      letter-spacing: .18em;
      max-width: 160px;
      line-height: 1.8;
    }

    .ritualGrid {
      display: grid;
      grid-template-columns: repeat(4,1fr);
      gap: 1px;
      background: var(--line);
    }

    .ritualCard {
      min-height: 520px;
      position: relative;
      overflow: hidden;
      background: #10100f;
      transition:
        flex .7s cubic-bezier(.2,.75,.2,1),
        transform .5s;
    }

    .ritualCard:hover {
      transform: translateY(-10px);
    }

    .ritualImage {
      position: absolute;
      inset: 0;
      background-size: cover;
      background-position: center;
      filter: grayscale(1);
      opacity: .35;
      transition:
        transform 1s cubic-bezier(.2,.75,.2,1),
        opacity .6s,
        filter .6s;
    }

    .ritualCard:hover .ritualImage {
      transform: scale(1.08);
      opacity: .7;
      filter: grayscale(.3);
    }

    .ritualCard:after {
      content: "";
      position: absolute;
      inset: 0;
      background: linear-gradient(transparent 25%, #0d0d0c 95%);
    }

    .ritualInfo {
      position: absolute;
      z-index: 2;
      inset: auto 25px 25px;
    }

    .ritualNo {
      color: var(--gold);
      font-size: 7px;
      letter-spacing: .2em;
    }

    .ritualName {
      font-size: 30px;
      font-weight: 300;
      letter-spacing: -.06em;
      margin: 12px 0;
    }

    .ritualDesc {
      color: #88857d;
      font-size: 9px;
      line-height: 1.7;
      max-width: 240px;
      max-height: 0;
      opacity: 0;
      overflow: hidden;
      transition: all .5s ease;
    }

    .ritualCard:hover .ritualDesc {
      max-height: 100px;
      opacity: 1;
    }

    .ritualArrow {
      position: absolute;
      top: 25px;
      right: 25px;
      width: 30px;
      height: 30px;
      border: 1px solid rgba(233,229,219,.3);
      display: grid;
      place-items: center;
      color: #99958d;
      transition: all .3s;
    }

    .ritualCard:hover .ritualArrow {
      background: var(--cream);
      color: #111;
      transform: rotate(45deg);
    }

    /* ROOMS */

    .rooms {
      padding: 170px 0 170px 7vw;
    }

    .roomsTop {
      padding-right: 7vw;
      display: flex;
      justify-content: space-between;
      align-items: end;
      margin-bottom: 70px;
    }

    .roomsTitle {
      font-size: clamp(55px,9vw,125px);
      line-height: .72;
      letter-spacing: -.09em;
      font-weight: 300;
      margin: 20px 0 0;
    }

    .roomsHint {
      color: #66635d;
      font-size: 8px;
      letter-spacing: .2em;
    }

    .roomScroller {
      display: flex;
      gap: 14px;
      overflow-x: auto;
      padding-right: 7vw;
      scrollbar-width: none;
      scroll-snap-type: x mandatory;
    }

    .roomScroller::-webkit-scrollbar {
      display: none;
    }

    .room {
      flex: 0 0 min(76vw, 900px);
      height: 620px;
      position: relative;
      overflow: hidden;
      scroll-snap-align: start;
      background: #111;
      border: 1px solid var(--line);
      transition: transform .5s;
    }

    .room:hover {
      transform: translateY(-7px);
    }

    .roomImage {
      position: absolute;
      inset: 0;
      background-size: cover;
      background-position: center;
      filter: grayscale(.65);
      transition: transform 1.1s cubic-bezier(.2,.75,.2,1);
    }

    .room:hover .roomImage {
      transform: scale(1.05);
    }

    .roomOverlay {
      position: absolute;
      inset: 0;
      background:
        linear-gradient(90deg, rgba(5,5,5,.72), transparent 65%),
        linear-gradient(0deg, rgba(5,5,5,.85), transparent 60%);
    }

    .roomInfo {
      position: absolute;
      z-index: 2;
      left: 45px;
      bottom: 45px;
      max-width: 500px;
    }

    .roomNumber {
      color: var(--gold);
      font-size: 8px;
      letter-spacing: .25em;
    }

    .roomName {
      font-size: clamp(45px,7vw,90px);
      font-weight: 300;
      letter-spacing: -.08em;
      line-height: .8;
      margin: 15px 0 22px;
    }

    .roomLabel {
      font-size: 8px;
      color: #a7a39a;
      letter-spacing: .25em;
      margin-bottom: 20px;
    }

    .roomDescription {
      color: #a09c93;
      font-size: 11px;
      line-height: 1.8;
      max-width: 400px;
    }

    .roomIndex {
      position: absolute;
      z-index: 2;
      right: 35px;
      top: 35px;
      font-size: 8px;
      color: #aaa69e;
      letter-spacing: .2em;
    }

    .roomSelector {
      display: flex;
      gap: 7px;
      margin-top: 25px;
    }

    .roomDot {
      width: 35px;
      height: 2px;
      background: #373631;
      border: 0;
      transition: background .3s, width .3s;
    }

    .roomDot.active {
      width: 60px;
      background: var(--cream);
    }

    /* MEMBERSHIP */

    .membership {
      padding: 150px 7vw;
      background: #e9e5db;
      color: #11110f;
    }

    .membershipHead {
      display: flex;
      justify-content: space-between;
      align-items: end;
      margin-bottom: 70px;
    }

    .membershipTitle {
      margin: 15px 0 0;
      font-size: clamp(50px,8vw,110px);
      line-height: .75;
      letter-spacing: -.08em;
      font-weight: 300;
    }

    .membershipNote {
      max-width: 260px;
      color: #77736b;
      font-size: 10px;
      line-height: 1.8;
    }

    .membershipTabs {
      display: flex;
      gap: 8px;
      margin-bottom: 40px;
    }

    .membershipTab {
      border: 1px solid rgba(17,17,15,.2);
      background: transparent;
      padding: 12px 17px;
      font-size: 7px;
      letter-spacing: .18em;
      color: #55524d;
      transition: all .3s;
    }

    .membershipTab.active {
      background: #11110f;
      color: #e9e5db;
    }

    .membershipCard {
      display: grid;
      grid-template-columns: 1.1fr .9fr;
      min-height: 450px;
      border-top: 1px solid #aaa69c;
      border-bottom: 1px solid #aaa69c;
    }

    .membershipMain {
      padding: 55px 0;
    }

    .membershipName {
      font-size: 11px;
      letter-spacing: .25em;
      margin-bottom: 60px;
    }

    .membershipPrice {
      font-size: clamp(70px,10vw,135px);
      letter-spacing: -.1em;
      line-height: .75;
      font-weight: 300;
    }

    .membershipPeriod {
      color: #77736b;
      font-size: 8px;
      letter-spacing: .2em;
      margin-left: 12px;
    }

    .membershipDesc {
      color: #66625b;
      font-size: 11px;
      max-width: 360px;
      line-height: 1.8;
      margin-top: 40px;
    }

    .membershipSide {
      border-left: 1px solid #aaa69c;
      padding: 55px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .feature {
      display: flex;
      gap: 15px;
      padding: 14px 0;
      border-bottom: 1px solid #c5c0b5;
      font-size: 8px;
      letter-spacing: .14em;
    }

    .feature span {
      color: #aaa49a;
    }

    .memberButton {
      background: #11110f;
      color: #e9e5db;
      border: 0;
      padding: 18px;
      font-size: 7px;
      letter-spacing: .2em;
      transition: transform .3s, background .3s;
    }

    .memberButton:hover {
      transform: translateY(-4px);
      background: #282722;
    }

    /* QUOTE */

    .quote {
      min-height: 720px;
      display: grid;
      place-items: center;
      text-align: center;
      padding: 100px 8vw;
      position: relative;
    }

    .quoteNumber {
      position: absolute;
      top: 55px;
      left: 7vw;
      color: #4e4b45;
      font-size: 7px;
      letter-spacing: .25em;
    }

    .quoteText {
      max-width: 1200px;
      font-size: clamp(48px,8vw,120px);
      line-height: .84;
      letter-spacing: -.085em;
      font-weight: 300;
    }

    .quoteText span {
      color: transparent;
      -webkit-text-stroke: 1px #8a867e;
    }

    .quoteAuthor {
      margin-top: 40px;
      color: #6f6b63;
      font-size: 7px;
      letter-spacing: .3em;
    }

    /* CONCIERGE */

    .concierge {
      padding: 140px 7vw;
      border-top: 1px solid var(--line);
      display: grid;
      grid-template-columns: .7fr 1.3fr;
      gap: 10vw;
    }

    .conciergeTitle {
      font-size: clamp(55px,8vw,105px);
      line-height: .72;
      letter-spacing: -.09em;
      font-weight: 300;
      margin: 20px 0 0;
    }

    .conciergeCopy {
      color: #706d66;
      font-size: 11px;
      line-height: 1.9;
      margin-top: 35px;
      max-width: 300px;
    }

    .conciergePanel {
      border: 1px solid var(--line);
      padding: 45px;
      min-height: 400px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .conciergeQuestion {
      font-size: 30px;
      font-weight: 300;
      letter-spacing: -.05em;
      margin-bottom: 30px;
    }

    .conciergeChoices {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 7px;
    }

    .conciergeChoice {
      min-height: 80px;
      border: 1px solid var(--line);
      background: #10100f;
      color: #8e8b83;
      text-align: left;
      padding: 18px;
      font-size: 8px;
      letter-spacing: .16em;
      transition: all .3s;
    }

    .conciergeChoice:hover,
    .conciergeChoice.active {
      background: #e9e5db;
      color: #11110f;
      border-color: #e9e5db;
    }

    .conciergeContinue {
      margin-top: 12px;
      width: 100%;
      padding: 17px;
      border: 0;
      background: var(--gold);
      color: #111;
      font-size: 7px;
      letter-spacing: .2em;
    }

    /* FOOTER */

    .footer {
      padding: 70px 7vw 30px;
      border-top: 1px solid var(--line);
    }

    .footerBig {
      font-size: clamp(60px,13vw,180px);
      font-weight: 300;
      letter-spacing: -.1em;
      line-height: .7;
      margin-bottom: 90px;
    }

    .footerBottom {
      display: flex;
      justify-content: space-between;
      color: #57544e;
      font-size: 7px;
      letter-spacing: .2em;
    }

    /* REVEAL */

    .reveal {
      opacity: 0;
      transform: translateY(70px);
      transition:
        opacity 1.1s cubic-bezier(.2,.75,.2,1),
        transform 1.1s cubic-bezier(.2,.75,.2,1);
    }

    .reveal.is-visible {
      opacity: 1;
      transform: translateY(0);
    }

    /* MODAL */

    .modalBackdrop {
      position: fixed;
      inset: 0;
      z-index: 500;
      background: rgba(0,0,0,.8);
      backdrop-filter: blur(20px);
      display: grid;
      place-items: center;
      padding: 20px;
      animation: modalFade .4s ease;
    }

    @keyframes modalFade {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    .modal {
      width: min(580px,100%);
      background: #e9e5db;
      color: #11110f;
      padding: 50px;
      animation: modalUp .6s cubic-bezier(.2,.75,.2,1);
    }

    @keyframes modalUp {
      from {
        transform: translateY(50px) scale(.97);
        opacity: 0;
      }

      to {
        transform: translateY(0) scale(1);
        opacity: 1;
      }
    }

    .modalTop {
      display: flex;
      justify-content: space-between;
      margin-bottom: 50px;
    }

    .modalKicker {
      color: #77736b;
      font-size: 7px;
      letter-spacing: .25em;
    }

    .modalTitle {
      font-size: 42px;
      font-weight: 300;
      letter-spacing: -.07em;
      line-height: .85;
      margin: 12px 0 0;
    }

    .modalClose {
      width: 35px;
      height: 35px;
      background: transparent;
      border: 1px solid #aaa69c;
      color: #111;
      font-size: 18px;
    }

    .modalOptions {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 7px;
    }

    .modalOption {
      min-height: 75px;
      text-align: left;
      background: transparent;
      border: 1px solid #aaa69c;
      padding: 18px;
      font-size: 8px;
      letter-spacing: .16em;
      color: #55524d;
      transition: all .25s;
    }

    .modalOption:hover,
    .modalOption.active {
      background: #11110f;
      border-color: #11110f;
      color: #e9e5db;
    }

    .modalNext {
      width: 100%;
      border: 0;
      background: #11110f;
      color: #e9e5db;
      padding: 18px;
      margin-top: 12px;
      font-size: 7px;
      letter-spacing: .2em;
    }

    .successScreen {
      text-align: center;
      padding: 30px 0;
    }

    .successCircle {
      width: 65px;
      height: 65px;
      border: 1px solid #111;
      border-radius: 50%;
      margin: 0 auto 25px;
      display: grid;
      place-items: center;
      animation: successSpin .8s ease;
    }

    @keyframes successSpin {
      from { transform: rotate(-180deg) scale(.5); }
      to { transform: rotate(0) scale(1); }
    }

    .successScreen h3 {
      font-size: 42px;
      font-weight: 300;
      letter-spacing: -.07em;
      margin: 0;
    }

    .successScreen p {
      color: #77736b;
      font-size: 10px;
      line-height: 1.8;
      margin: 20px auto 30px;
      max-width: 350px;
    }

    /* RESPONSIVE */

    @media(max-width: 900px) {
      .navMiddle {
        display: none;
      }

      .philosophy,
      .concierge {
        grid-template-columns: 1fr;
        gap: 60px;
      }

      .ritualGrid {
        grid-template-columns: 1fr 1fr;
      }

      .membershipCard {
        grid-template-columns: 1fr;
      }

      .membershipSide {
        border-left: 0;
        border-top: 1px solid #aaa69c;
      }

      .rooms {
        padding-left: 5vw;
      }
    }

    @media(max-width: 600px) {
      .nav {
        height: 68px;
        padding: 0 20px;
      }

      .navAction {
        padding: 10px;
      }

      .hero {
        min-height: 680px;
      }

      .heroTitle {
        font-size: 76px;
      }

      .heroMeta {
        left: 20px;
        right: 20px;
      }

      .philosophy,
      .ritual,
      .membership,
      .concierge,
      .footer {
        padding-left: 20px;
        padding-right: 20px;
      }

      .philosophy {
        padding-top: 110px;
        padding-bottom: 110px;
      }

      .philosophyNumber {
        font-size: 100px;
      }

      .ritualGrid {
        grid-template-columns: 1fr;
      }

      .ritualCard {
        min-height: 430px;
      }

      .ritualHead,
      .membershipHead,
      .roomsTop {
        display: block;
      }

      .ritualHint,
      .membershipNote {
        margin-top: 25px;
      }

      .rooms {
        padding-left: 20px;
      }

      .room {
        flex-basis: 88vw;
        height: 530px;
      }

      .roomInfo {
        left: 25px;
        bottom: 25px;
      }

      .membershipSide {
        padding: 35px 0;
      }

      .membershipMain {
        padding: 45px 0;
      }

      .membershipTabs {
        overflow-x: auto;
      }

      .membershipTab {
        flex: 0 0 auto;
      }

      .conciergePanel {
        padding: 25px;
      }

      .conciergeChoices,
      .modalOptions {
        grid-template-columns: 1fr;
      }

      .modal {
        padding: 28px;
      }

      .modalTitle {
        font-size: 35px;
      }

      .footerBottom {
        flex-direction: column;
        gap: 15px;
      }
    }
  `}</style>

  {/* INTRO */}

  <div className="intro">
    <div className="introInner">
      <div className="introTop">
        <span>VANTA</span>
        <span>001</span>
      </div>

      <div className="loader">
        <div className="loaderBar" />
      </div>
    </div>
  </div>

  <div ref={cursorRef} className="cursor" />

  {/* NAV */}

  <nav className="nav">
    <a href="#" className="logo">
      <span className="logoMark">V</span>
      <span className="logoText">VANTA</span>
    </a>

    <div className="navMiddle">PRIVATE PERFORMANCE CLUB / 01</div>

    <button className="navAction" onClick={openConcierge}>
      CONCIERGE
    </button>
  </nav>

  {/* HERO */}

  <section className="hero">
    <div className="heroImage" />
    <div className="heroGrid" />

    <div className="heroContent">
      <div className="heroEyebrow">
        PRIVATE PERFORMANCE CLUB / EST. 2026
      </div>

      <h1 className="heroTitle">
        <span className="heroTitleLine">
          <span>YOUR</span>
        </span>

        <span className="heroTitleLine">
          <span>STANDARD.</span>
        </span>
      </h1>

      <p className="heroSub">
        A private performance environment for people who have decided
        that ordinary training isn't enough.
      </p>

      <div className="heroButton">
        <button className="luxButton" onClick={openConcierge}>
          <span>ENTER THE CLUB →</span>
        </button>
      </div>
    </div>

    <div className="heroMeta">
      <div className="scrollLine">SCROLL TO EXPLORE</div>
      <div>JAMSHEDPUR / INDIA</div>
      <div>06:42 PM / CLUB OPEN</div>
    </div>
  </section>

  {/* MARQUEE */}

  <div className="marquee">
    <div className="marqueeTrack">
      {Array.from({ length: 2 }).map((_, index) => (
        <div className="marqueeTrack" key={index}>
          {[
            "TRAIN",
            "MOVE",
            "RECOVER",
            "MEASURE",
            "REPEAT",
            "BECOME",
          ].map((word) => (
            <span className="marqueeWord" key={`${index}-${word}`}>
              {word} <span className="marqueeDot">•</span>
            </span>
          ))}
        </div>
      ))}
    </div>
  </div>

  {/* PHILOSOPHY */}

  <section className="philosophy reveal">
    <div>
      <div className="tiny">01 / THE IDEA</div>
      <div className="philosophyNumber">01</div>
    </div>

    <div>
      <h2 className="philosophyTitle">
        TRAINING
        <br />
        <em>WITHOUT</em>
        <br />
        NOISE.
      </h2>

      <p className="philosophyText">
        VANTA was designed around a simple idea: your environment changes
        the way you work. So we removed the noise. No crowded floor. No
        unnecessary machines. No performance theatre.
        <br />
        <br />
        Just intelligent programming, exceptional equipment, recovery,
        coaching and enough space to actually focus.
      </p>

      <div className="philosophyQuote">
        “The goal isn't to spend more time training.
        <br />
        It's to make the time matter more.”
      </div>
    </div>
  </section>

  {/* RITUALS */}

  <section className="ritual reveal">
    <div className="ritualHead">
      <div>
        <div className="tiny">02 / YOUR RITUAL</div>
        <h2 className="ritualTitle">
          FOUR
          <br />
          DIRECTIONS.
        </h2>
      </div>

      <div className="ritualHint">
        HOVER EACH EXPERIENCE
        <br />
        TO DISCOVER MORE
      </div>
    </div>

    <div className="ritualGrid">
      {[
        [
          "01",
          "BUILD",
          "STRENGTH",
          "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=1000&q=85",
        ],
        [
          "02",
          "MOVE",
          "MOBILITY",
          "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1000&q=85",
        ],
        [
          "03",
          "BURN",
          "CONDITION",
          "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=1000&q=85",
        ],
        [
          "04",
          "RESET",
          "RECOVERY",
          "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1000&q=85",
        ],
      ].map((item) => (
        <article className="ritualCard" key={item[1]}>
          <div
            className="ritualImage"
            style={{ backgroundImage: `url("${item[3]}")` }}
          />

          <div className="ritualArrow">↗</div>

          <div className="ritualInfo">
            <div className="ritualNo">{item[0]}</div>
            <div className="ritualName">{item[1]}</div>
            <div className="tiny">{item[2]}</div>

            <p className="ritualDesc">
              Designed sessions, intelligent progression and an
              environment that makes showing up easier.
            </p>
          </div>
        </article>
      ))}
    </div>
  </section>

  {/* ROOMS */}

  <section className="rooms reveal">
    <div className="roomsTop">
      <div>
        <div className="tiny">03 / THE HOUSE</div>
        <h2 className="roomsTitle">
          ENTER
          <br />
          THE CLUB.
        </h2>
      </div>

      <div className="roomsHint">
        DRAG / SCROLL
        <br />
        THROUGH THE HOUSE →
      </div>
    </div>

    <div className="roomScroller">
      {rooms.map((room, index) => (
        <article
          className="room"
          key={room.name}
          onMouseEnter={() => setActiveRoom(index)}
        >
          <div
            className="roomImage"
            style={{ backgroundImage: `url("${room.image}")` }}
          />

          <div className="roomOverlay" />

          <div className="roomIndex">
            {room.number} / 04
          </div>

          <div className="roomInfo">
            <div className="roomNumber">{room.number}</div>
            <h3 className="roomName">{room.name}</h3>
            <div className="roomLabel">{room.label}</div>

            <p className="roomDescription">
              {room.description}
            </p>
          </div>
        </article>
      ))}
    </div>

    <div className="roomSelector">
      {rooms.map((room, index) => (
        <button
          className={`roomDot ${
            activeRoom === index ? "active" : ""
          }`}
          key={room.name}
          onClick={() => setActiveRoom(index)}
        />
      ))}
    </div>
  </section>

  {/* MEMBERSHIP */}

  <section className="membership reveal">
    <div className="membershipHead">
      <div>
        <div className="tiny">04 / MEMBERSHIP</div>
        <h2 className="membershipTitle">
          CHOOSE
          <br />
          YOUR LEVEL.
        </h2>
      </div>

      <p className="membershipNote">
        VANTA operates differently. Membership is intentionally limited
        so the club never becomes another crowded gym.
      </p>
    </div>

    <div className="membershipTabs">
      {memberships.map((membership, index) => (
        <button
          key={membership.name}
          className={`membershipTab ${
            activeMembership === index ? "active" : ""
          }`}
          onClick={() => setActiveMembership(index)}
        >
          {membership.name}
        </button>
      ))}
    </div>

    <div className="membershipCard" key={activeMembership}>
      <div className="membershipMain">
        <div className="membershipName">
          {memberships[activeMembership].name} MEMBERSHIP
        </div>

        <div>
          <span className="membershipPrice">
            {memberships[activeMembership].price}
          </span>

          <span className="membershipPeriod">
            {memberships[activeMembership].period}
          </span>
        </div>

        <p className="membershipDesc">
          {memberships[activeMembership].description}
        </p>
      </div>

      <div className="membershipSide">
        <div>
          {memberships[activeMembership].features.map(
            (feature, index) => (
              <div className="feature" key={feature}>
                <span>0{index + 1}</span>
                {feature}
              </div>
            )
          )}
        </div>

        <button
          className="memberButton"
          onClick={openConcierge}
        >
          REQUEST MEMBERSHIP →
        </button>
      </div>
    </div>
  </section>

  {/* QUOTE */}

  <section className="quote reveal">
    <div className="quoteNumber">05 / THE STANDARD</div>

    <div>
      <div className="quoteText">
        <span>YOU DON'T</span>
        NEED MORE
        <br />
        MOTIVATION.
        <br />
        YOU NEED A
        <br />
        <span>HIGHER STANDARD.</span>
      </div>

      <div className="quoteAuthor">
        VANTA / PRIVATE PERFORMANCE CLUB
      </div>
    </div>
  </section>

  {/* CONCIERGE */}

  <section className="concierge reveal">
    <div>
      <div className="tiny">06 / CONCIERGE</div>

      <h2 className="conciergeTitle">
        TELL
        <br />
        US WHAT
        <br />
        YOU NEED.
      </h2>

      <p className="conciergeCopy">
        No forms with twelve useless questions. Tell us what you're
        looking for and we'll guide you to the right VANTA experience.
      </p>
    </div>

    <div className="conciergePanel">
      <div className="tiny">
        VANTA CONCIERGE / {conciergeStep} — 2
      </div>

      {conciergeStep === 1 ? (
        <>
          <h3 className="conciergeQuestion">
            Why are you here?
          </h3>

          <div className="conciergeChoices">
            {[
              "I WANT TO TRAIN",
              "I WANT TO GET STRONGER",
              "I NEED RECOVERY",
              "I WANT A COACH",
            ].map((choice) => (
              <button
                className={`conciergeChoice ${
                  conciergeChoice === choice ? "active" : ""
                }`}
                key={choice}
                onClick={() => setConciergeChoice(choice)}
              >
                {choice}
              </button>
            ))}
          </div>

          <button
            className="conciergeContinue"
            disabled={!conciergeChoice}
            style={{ opacity: conciergeChoice ? 1 : .35 }}
            onClick={() => setConciergeStep(2)}
          >
            CONTINUE →
          </button>
        </>
      ) : (
        <>
          <h3 className="conciergeQuestion">
            What level feels right?
          </h3>

          <div className="conciergeChoices">
            {[
              "STARTING FRESH",
              "I TRAIN REGULARLY",
              "ADVANCED",
              "I'M NOT SURE",
            ].map((choice) => (
              <button
                className="conciergeChoice"
                key={choice}
                onClick={() => {
                  setConcierge(false);
                  setConciergeStep(1);
                  alert(
                    `VANTA Concierge: ${conciergeChoice} / ${choice}`
                  );
                }}
              >
                {choice}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  </section>

  {/* FOOTER */}

  <footer className="footer">
    <div className="footerBig">
      VANTA
    </div>

    <div className="footerBottom">
      <span>PRIVATE PERFORMANCE CLUB</span>
      <span>JAMSHEDPUR / INDIA</span>
      <span>© 2026 VANTA</span>
    </div>
  </footer>

  {/* MODAL */}

  {concierge && (
    <div
      className="modalBackdrop"
      onClick={closeConcierge}
    >
      <div
        className="modal"
        onClick={(e) => e.stopPropagation()}
      >
        {conciergeStep === 1 ? (
          <>
            <div className="modalTop">
              <div>
                <div className="modalKicker">
                  VANTA CONCIERGE / 01
                </div>

                <h3 className="modalTitle">
                  WHAT BRINGS
                  <br />
                  YOU HERE?
                </h3>
              </div>

              <button
                className="modalClose"
                onClick={closeConcierge}
              >
                ×
              </button>
            </div>

            <div className="modalOptions">
              {[
                "TRAIN",
                "GET STRONGER",
                "RECOVER",
                "PERSONAL COACH",
              ].map((choice) => (
                <button
                  className={`modalOption ${
                    conciergeChoice === choice ? "active" : ""
                  }`}
                  key={choice}
                  onClick={() => setConciergeChoice(choice)}
                >
                  {choice}
                </button>
              ))}
            </div>

            <button
              className="modalNext"
              disabled={!conciergeChoice}
              style={{ opacity: conciergeChoice ? 1 : .35 }}
              onClick={() => setConciergeStep(2)}
            >
              CONTINUE →
            </button>
          </>
        ) : (
          <>
            <div className="modalTop">
              <div>
                <div className="modalKicker">
                  VANTA CONCIERGE / 02
                </div>

                <h3 className="modalTitle">
                  HOW DO YOU
                  <br />
                  TRAIN?
                </h3>
              </div>

              <button
                className="modalClose"
                onClick={closeConcierge}
              >
                ×
              </button>
            </div>

            <div className="modalOptions">
              {[
                "NEW TO TRAINING",
                "REGULARLY ACTIVE",
                "ADVANCED",
                "NOT SURE",
              ].map((choice) => (
                <button
                  className="modalOption"
                  key={choice}
                  onClick={() => setConciergeStep(3)}
                >
                  {choice}
                </button>
              ))}
            </div>
          </>
        )}

        {conciergeStep === 3 && (
          <div className="successScreen">
            <div className="successCircle">✓</div>

            <h3>WELCOME.</h3>

            <p>
              Your VANTA concierge request has been started.
              <br />
              A private club representative will guide your next step.
            </p>

            <button
              className="modalNext"
              onClick={closeConcierge}
            >
              CLOSE
            </button>
          </div>
        )}
      </div>
    </div>
  )}
</main>


);
}
