// this holds all of my data for my info boxes and what the valves and spark's states should be in each stroke

const strokes = [
  {
    name: 'Intake',
    color: '#3B8BD4',
    keyPoint: 'Piston moves down, intake valve open.',
    description:
      'The intake valve opens as the piston moves down, creating a vacuum and drawing a mixture of air and fuel into the cylinder. The exhaust valve stays closed.',
    pistonPosition: 'down',
    intakeValveOpen: true,
    exhaustValveOpen: false,
    sparkActive: false,
  },
  {
    name: 'Compression',
    color: '#EF9F27',
    keyPoint: 'Piston moves up, both valves closed.',
    description:
      'Both valves close as the piston moves up, compressing the air/fuel mixture. The more it compresses, the more power you can get. The danger here is early detonation, if your fuel has a low octane (87 octane), it can detonate early and damage the cylinder. You should use 91 or 93 in high performance engines.',
    pistonPosition: 'up',
    intakeValveOpen: false,
    exhaustValveOpen: false,
    sparkActive: false,
  },
  {
    name: 'Power',
    color: '#E24B4A',
    keyPoint: 'Spark ignites mixture, piston driven down.',
    description:
      'The spark plug fires, igniting the compressed mixture. The explosion forces the piston down hard, which is what actually turns the crankshaft and produces usable power.',
    pistonPosition: 'down',
    intakeValveOpen: false,
    exhaustValveOpen: false,
    sparkActive: true,
  },
  {
    name: 'Exhaust',
    color: '#5F5E5A',
    keyPoint: 'Piston moves up, exhaust valve open.',
    description:
      'The exhaust valve opens and the piston travels up again, pushing the explosion residue (burnt gas) out of the cylinder. Once the piston reaches the top, the cycle restarts at intake.',
    pistonPosition: 'up',
    intakeValveOpen: false,
    exhaustValveOpen: true,
    sparkActive: false,
  },
];

export { strokes };