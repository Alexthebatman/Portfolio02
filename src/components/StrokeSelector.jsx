function StrokeSelector(props) {
  const strokes = props.strokes;
  const activeIndex = props.activeIndex;
  const onSelect = props.onSelect;

  // first button (intake)
  const button1Class = (0 === activeIndex) ? 'active' : '';
  const button1Style = (0 === activeIndex) ? { borderColor: strokes[0].color } : {};

  // second button (compression)
  const button2Class = (1 === activeIndex) ? 'active' : '';
  const button2Style = (1 === activeIndex) ? { borderColor: strokes[1].color } : {};

  // third button (power)
  const button3Class = (2 === activeIndex) ? 'active' : '';
  const button3Style = (2 === activeIndex) ? { borderColor: strokes[2].color } : {};

  // fourth button (exhaust)
  const button4Class = (3 === activeIndex) ? 'active' : '';
  const button4Style = (3 === activeIndex) ? { borderColor: strokes[3].color } : {};

  return (
    <nav className="stroke-selector" aria-label="Select engine stroke">
      <button
        onClick={() => onSelect(0)}
        className={button1Class}
        style={button1Style}
        aria-pressed={0 === activeIndex}
      >
        <span className="step-number">1</span>
        <span className="step-name">{strokes[0].name}</span>
      </button>

      <button
        onClick={() => onSelect(1)}
        className={button2Class}
        style={button2Style}
        aria-pressed={1 === activeIndex}
      >
        <span className="step-number">2</span>
        <span className="step-name">{strokes[1].name}</span>
      </button>

      <button
        onClick={() => onSelect(2)}
        className={button3Class}
        style={button3Style}
        aria-pressed={2 === activeIndex}
      >
        <span className="step-number">3</span>
        <span className="step-name">{strokes[2].name}</span>
      </button>

      <button
        onClick={() => onSelect(3)}
        className={button4Class}
        style={button4Style}
        aria-pressed={3 === activeIndex}
      >
        <span className="step-number">4</span>
        <span className="step-name">{strokes[3].name}</span>
      </button>
    </nav>
  );
}

export default StrokeSelector;