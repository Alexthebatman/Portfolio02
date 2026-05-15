// imports

import { useState, useEffect } from 'react'; // This imports my hooks

// the most confusing part, how the piston rotates and figures the state you're on

function EngineDiagram(props) { // This creates a EngineDiagram functon that takes props as it's parameter. This sets it up so the props.stroke has one of the four stroke objects (the stages) and so it can pull the correct current stroke (0, 1, 2, 3) from strokeindex
  const stroke = props.stroke; // This just makes it so I can say stroke rather than typing out props.stroke
  const strokeIndex = props.strokeIndex; // Same here, just so I don't have to type out props.strokeindex, I can just use strokeindex

  const [crankRotation, setCrankRotation] = useState(0);  // This is a bit complicated but it sets up a state that tracks the total rotation, so that crank never rotates backwards. When the component renders, it sets the current rotation value to 0, and crankrotation is the current value while setcrankrotation updates said value
  const [lastIndex, setLastIndex] = useState(strokeIndex); // This makes it so the strokeindex is whatever the parent passed in, typically 0 at first due to the usestate(0) line as it changes the strokeindex to 0. Lastindex is what I track and if it changes it means the user pressed a button as it will not match the current strokeindex

  useEffect(() => { // i'm using useeffect as it will run after render, which is safer than running in the middle of a render and causing an error, this part was something new i learned :)
    if (strokeIndex !== lastIndex) { // checks if strokeindex is different from lastindex to check for a change
      let stepDifference = strokeIndex - lastIndex; // figures the difference between them to figure out the step they chose
      if (stepDifference < 0) { // if it is less than zero, it'd wanna rotate backward, so how do we fix that? check below
        stepDifference = stepDifference + 4; // in the case that it is less than zero, we add 4 (the total strokes) to ensure it becomes a positive number, that way it will never go backward. math is fun
      }
      setCrankRotation(crankRotation + (180 * stepDifference)); // this makes it so it takes the difference and multiplies the rotation by 180, correctly rotating it to the proper position
      setLastIndex(strokeIndex); // this sets the strokeindex to be the current index, so it can compare that new number to the new lastindex if it changes again
    }
  }, [strokeIndex]); // this tells the function to only run when strokeindex changes (which is figured by checking if strokeindex matches lastindex)

  // SVG Positioning stuff

  const crankCenterX = 200; // this sets up where the crank center is on the x-axis
  const crankCenterY = 490; // this sets up where the crank center is on the y-axis, pretty straight forward for positioning, these constants also help us a lot later when we need to change the position

  let pistonTop; // this figures out whether the piston is up or down. Since this can change a lot, we're using let. 175 is near the top of the cylinder while 285 is near the bottom
  if (stroke.pistonPosition === 'down') {
    pistonTop = 285;
  } else {
    pistonTop = 175;
  }

  const wristPinX = crankCenterX; // the wrist pin sits at the same x-coordinate as the crank center because the cylinder is centered directly above the crankshaft
  const wristPinY = pistonTop + 35; // this sits 35 pixels below the top of the piston to be about 2/3 of the way down the piston, where a wrist pin would realistically live

  let intakeValveY; // this checks whether the intake valve should be open for the current stroke, much like how the pistontop is determined
  if (stroke.intakeValveOpen) {
    intakeValveY = 123;
  } else {
    intakeValveY = 143;
  }

  let exhaustValveY; // this checks whether the intake valve should be open for the current stroke
  if (stroke.exhaustValveOpen) {
    exhaustValveY = 123;
  } else {
    exhaustValveY = 143;
  }

  return ( // this sets up how my diagram will be shown, through a SVG that animates my valves and piston by changing based on the stage
    <div 
      className="engine-diagram" // this sets up a tag for my css to grab to customize
      role="img"
      aria-label={`Engine in ${stroke.name} stroke`} // accessibility for screen readers
    >
      
      <svg viewBox="0 0 400 620" width="100%" style={{ maxWidth: '500px' }}>

        <text
          x="200" y="35" 
          fontSize="28" fontWeight="600"
          textAnchor="middle"
          fill={stroke.color}
          style={{ transition: 'fill 0.4s ease-in-out' }}
        >
          {stroke.name}
        </text>
        
        {/* cylinder head and cylinder */}

        <rect x="110" y="80" width="180" height="75" fill="#e8e8e8" stroke="#444" strokeWidth="3" />

        <rect x="110" y="155" width="180" height="290" fill="#fafafa" stroke="#444" strokeWidth="3" />

        {/* intake valve assembly */ }

        <text x="125" y="70" fontSize="13" fill="#3B8BD4" fontWeight="500">Intake</text>
        <path
          d={`M 140,85 L 156,88 L 140,91 L 156,94 L 140,${97 - (143 - intakeValveY) * 0.5} L 156,${100 - (143 - intakeValveY) * 0.5} L 140,${103 - (143 - intakeValveY) * 0.7} L 156,${106 - (143 - intakeValveY) * 0.7}`}
          fill="none" stroke="#999" strokeWidth="2"
          style={{ transition: 'd 0.5s ease-in-out' }}
        />
        <rect
          x="145" y={106 - (143 - intakeValveY) * 0.7}
          width="6" height={intakeValveY - (106 - (143 - intakeValveY) * 0.7)}
          fill="#777"
          style={{ transition: 'all 0.5s ease-in-out' }}
        />
        <ellipse
          cx="148" cy={intakeValveY + 6} rx="20" ry="6"
          fill="#3B8BD4" stroke="#1a4a7a" strokeWidth="1.5"
          style={{ transition: 'cy 0.5s ease-in-out' }}
        />
        <line x1="128" y1="155" x2="168" y2="155" stroke="#333" strokeWidth="2" />

        {/* exhaust valve assembly, same shape as intake, red instead of blue, on the right side */}

        <text x="232" y="70" fontSize="13" fill="#E24B4A" fontWeight="500">Exhaust</text>
        <path
          d={`M 244,85 L 260,88 L 244,91 L 260,94 L 244,${97 - (143 - exhaustValveY) * 0.5} L 260,${100 - (143 - exhaustValveY) * 0.5} L 244,${103 - (143 - exhaustValveY) * 0.7} L 260,${106 - (143 - exhaustValveY) * 0.7}`}
          fill="none" stroke="#999" strokeWidth="2"
          style={{ transition: 'd 0.5s ease-in-out' }}
        />
        <rect
          x="249" y={106 - (143 - exhaustValveY) * 0.7}
          width="6" height={exhaustValveY - (106 - (143 - exhaustValveY) * 0.7)}
          fill="#777"
          style={{ transition: 'all 0.5s ease-in-out' }}
        />
        <ellipse
          cx="252" cy={exhaustValveY + 6} rx="20" ry="6"
          fill="#E24B4A" stroke="#8a2222" strokeWidth="1.5"
          style={{ transition: 'cy 0.5s ease-in-out' }}
        />
        <line x1="232" y1="155" x2="272" y2="155" stroke="#333" strokeWidth="2" />

        {/* spark plug label, body, spark plug line that turns yellow during Power, plus an explosion animation that only renders during Power */}

        <text x="186" y="70" fontSize="13" fill="#555" fontWeight="500">Spark</text>
        <rect x="195" y="80" width="20" height="12" fill="#aaa" stroke="#444" strokeWidth="1" />
        <rect x="198" y="92" width="14" height="50" fill="#888" stroke="#444" strokeWidth="2" />
        <line
          x1="205" y1="142" x2="205" y2="158"
          stroke={stroke.sparkActive ? "#FFD700" : "#666"}
          strokeWidth="2"
          className={stroke.sparkActive ? "spark-flash" : ""}
        />
        {stroke.sparkActive && (
          <circle cx="205" cy="165" r="4" fill="#FFD700" className="spark-explosion" />
        )}
        {stroke.sparkActive && (
          <circle cx="205" cy="165" r="4" fill="#FF6B1A" className="spark-explosion" style={{ animationDelay: '0.1s' }} />
        )}

        {/* this is for the piston, which is the the gray block that slides up and down. The group is translated based on pistonTop */}

        <g
          style={{
            transform: `translateY(${pistonTop - 175}px)`,
            transition: 'transform 0.6s ease-in-out',
          }}
        >
          <rect x="115" y="175" width="170" height="55" fill="#b8b8b8" stroke="#444" strokeWidth="2" rx="3" />
          <line x1="115" x2="285" y1="187" y2="187" stroke="#666" strokeWidth="1.5" />
          <line x1="115" x2="285" y1="195" y2="195" stroke="#666" strokeWidth="1.5" />
          <circle cx="200" cy="210" r="7" fill="#444" />
        </g>
          
          {/* this is the connecting rod which is drawn at full length, then scaled vertically to match the piston's position so its top stays glued to the piston as it animates */}

        <g
          style={{
            transformOrigin: `${crankCenterX}px ${crankCenterY}px`,
            transform: `scaleY(${(crankCenterY - (pistonTop + 35)) / (crankCenterY - 210)})`,
            transition: 'transform 0.6s ease-in-out',
          }}
        >
          <line
            x1={crankCenterX} y1="210"
            x2={crankCenterX} y2={crankCenterY}
            stroke="#444" strokeWidth="22" strokeLinecap="round"
          />
          <line
            x1={crankCenterX} y1="210"
            x2={crankCenterX} y2={crankCenterY}
            stroke="#8a8a8a" strokeWidth="16" strokeLinecap="round"
          />
          <circle cx={crankCenterX} cy="210" r="14" fill="#8a8a8a" stroke="#444" strokeWidth="2" />
          <circle cx={crankCenterX} cy="210" r="8" fill="#c9a76d" stroke="#7a6240" strokeWidth="1.5" />
        </g>

          {/* This is for the crankcase which is the dark gray housing at the bottom that covers the rod's lower portion */}

        <rect x="50" y="445" width="300" height="160" fill="#666" stroke="#333" strokeWidth="2" rx="10" />

          {/* This circle is for the crankshaft rotation gudie which is a fixed dashed ring that helps the user see the rotation against a reference. I thought this would help with seeing how it rotates */}

        <circle
          cx={crankCenterX} cy={crankCenterY} r="50"
          fill="none" stroke="#aaa" strokeWidth="1.5"
          strokeDasharray="4 4" opacity="0.6"
        />

        {/* The crankshaft is the rotating wheel at the bottom of the engine. The piston's downward motion during Power turns it, and its momentum then drives the piston back up. This wheel has tick marks and a counterweight, and rotates based on the crankRotation state. */}

        <g
          transform={`translate(${crankCenterX}, ${crankCenterY}) rotate(${crankRotation})`}
          style={{ transition: 'transform 0.6s ease-in-out' }}
        >
          <circle cx="0" cy="0" r="45" fill="#444" stroke="#222" strokeWidth="2" />

          <line x1="0" y1="-43" x2="0" y2="-30" stroke="#aaa" strokeWidth="3" strokeLinecap="round" />
          <line x1="0" y1="43" x2="0" y2="30" stroke="#aaa" strokeWidth="3" strokeLinecap="round" />
          <line x1="-43" y1="0" x2="-30" y2="0" stroke="#aaa" strokeWidth="3" strokeLinecap="round" />
          <line x1="43" y1="0" x2="30" y2="0" stroke="#aaa" strokeWidth="3" strokeLinecap="round" />

          <path
            d="M -40,0 A 40,40 0 0,0 40,0 L 25,25 L -25,25 Z"
            fill="#333" stroke="#222" strokeWidth="1.5"
          />
        </g>

          {/* Center hub where the rod connects to the crankshaft. This is drawn on top of the crankshaft */}

        <circle cx={crankCenterX} cy={crankCenterY} r="12" fill="#8a8a8a" stroke="#444" strokeWidth="2" />
        <circle cx={crankCenterX} cy={crankCenterY} r="6" fill="#c9a76d" stroke="#7a6240" strokeWidth="1.5" />

      </svg>
    </div>
  );
}

export default EngineDiagram;