import { useState, useMemo } from 'react';
import ShapeRenderer from './ShapeRenderer';
import { QUESTION_TYPES } from '../data/questions';

const LABELS = ['あ', 'い', 'う', 'え'];

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

export default function QuestionCard({ question, onAnswer, index }) {
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);

  function pick(choice, i) {
    if (answered) return;
    setSelected(i);
    setAnswered(true);
    setTimeout(() => onAnswer(choice.correct), 900);
  }

  function pickNum(num) {
    if (answered) return;
    setSelected(num);
    setAnswered(true);
    setTimeout(() => onAnswer(num === question.correctCount), 900);
  }

  const choiceBtnStyle = (choice, i) => {
    let bg = '#fff', border = '2px solid #aaa', color = '#1a1a1a';
    if (answered) {
      if (choice.correct) { bg = '#DCFCE7'; border = '3px solid #16A34A'; }
      else if (i === selected) { bg = '#FEE2E2'; border = '3px solid #DC2626'; }
    }
    return { ...S.choiceBtn, background: bg, border };
  };

  const numBtnStyle = (num) => {
    let bg = '#fff', border = '2px solid #aaa';
    if (answered) {
      if (num === question.correctCount) { bg = '#DCFCE7'; border = '3px solid #16A34A'; }
      else if (num === selected) { bg = '#FEE2E2'; border = '3px solid #DC2626'; }
    }
    return { ...S.numBtn, background: bg, border };
  };

  // ─── COUNT ──────────────────────────────────────────────────────────────
  if (question.type === QUESTION_TYPES.COUNT) {
    const scattered = useMemo(() => {
      const all = [];
      question.shapeGroups.forEach(g => {
        for (let i = 0; i < g.count; i++) all.push({ shape: g.shape, color: g.color });
      });
      return shuffle(all);
    }, [question.id]);

    return (
      <div style={S.card}>
        <QuestionHeader index={index} text={question.question} />
        <div style={S.scatterBox}>
          {scattered.map((s, i) => (
            <ShapeRenderer key={i} shape={s.shape} color={s.color} size={52} />
          ))}
        </div>
        <div style={S.numRow}>
          {question.choices.map(num => (
            <button key={num} onClick={() => pickNum(num)}
              style={numBtnStyle(num)}
              disabled={answered}>
              {num}
            </button>
          ))}
        </div>
        {answered && <HintBox text={`こたえ：${question.correctCount}こ`} correct={selected === question.correctCount} />}
      </div>
    );
  }

  // ─── PATTERN ────────────────────────────────────────────────────────────
  if (question.type === QUESTION_TYPES.PATTERN) {
    return (
      <div style={S.card}>
        <QuestionHeader index={index} text={question.question} />
        <div style={S.patternRow}>
          {question.pattern.map((item, i) => (
            <div key={i} style={S.patternCell}>
              {item
                ? <ShapeRenderer shape={item.shape} color={item.color} size={56} />
                : <div style={S.questionMark}>？</div>
              }
            </div>
          ))}
        </div>
        <div style={S.choices}>
          {question.choices.map((choice, i) => (
            <button key={i} onClick={() => pick(choice, i)}
              style={choiceBtnStyle(choice, i)}
              disabled={answered}>
              <span style={S.choiceLabel}>{LABELS[i]}</span>
              <ShapeRenderer shape={choice.shape} color={choice.color} size={60} />
              {answered && i === selected && <Mark correct={choice.correct} />}
            </button>
          ))}
        </div>
        {answered && question.hint && <HintBox text={question.hint} />}
      </div>
    );
  }

  // ─── ODD_ONE_OUT (no target, just 4 choices) ────────────────────────────
  if (question.type === QUESTION_TYPES.ODD_ONE_OUT) {
    return (
      <div style={S.card}>
        <QuestionHeader index={index} text={question.question} />
        <div style={S.choices}>
          {question.choices.map((choice, i) => (
            <button key={i} onClick={() => pick(choice, i)}
              style={choiceBtnStyle(choice, i)}
              disabled={answered}>
              <span style={S.choiceLabel}>{LABELS[i]}</span>
              <ShapeRenderer shape={choice.shape} color={choice.color} size={68} />
              {answered && i === selected && <Mark correct={choice.correct} />}
            </button>
          ))}
        </div>
        {answered && question.hint && <HintBox text={question.hint} />}
      </div>
    );
  }

  // ─── SAME_SHAPE / ROTATION (has target) ─────────────────────────────────
  return (
    <div style={S.card}>
      <QuestionHeader index={index} text={question.question} />
      <div style={S.targetWrap}>
        <div style={S.targetLabel}>もんだいのかたち</div>
        <div style={S.targetBox}>
          <ShapeRenderer
            shape={question.target.shape}
            color={question.target.color}
            rotation={question.target.rotation ?? 0}
            size={90}
          />
        </div>
      </div>
      <div style={S.divider} />
      <div style={S.choices}>
        {question.choices.map((choice, i) => (
          <button key={i} onClick={() => pick(choice, i)}
            style={choiceBtnStyle(choice, i)}
            disabled={answered}>
            <span style={S.choiceLabel}>{LABELS[i]}</span>
            <ShapeRenderer
              shape={choice.shape}
              color={choice.color}
              rotation={choice.rotation ?? 0}
              size={68}
            />
            {answered && i === selected && <Mark correct={choice.correct} />}
          </button>
        ))}
      </div>
      {answered && question.hint && <HintBox text={question.hint} />}
    </div>
  );
}

function QuestionHeader({ index, text }) {
  return (
    <div style={S.qHeader}>
      <span style={S.qNum}>もんだい {index + 1}</span>
      <p style={S.qText}>{text}</p>
    </div>
  );
}

function Mark({ correct }) {
  return (
    <span style={{ fontSize: 26, lineHeight: 1 }}>
      {correct ? '○' : '✕'}
    </span>
  );
}

function HintBox({ text, correct }) {
  return (
    <div style={{ ...S.hint, borderColor: correct === false ? '#DC2626' : '#16A34A' }}>
      {text}
    </div>
  );
}

const S = {
  card: {
    background: '#fff',
    border: '2px solid #2C2C2C',
    borderRadius: 4,
    padding: 'clamp(16px, 4vw, 24px)',
    maxWidth: 640,
    margin: '0 auto',
    fontFamily: '"Hiragino Kaku Gothic ProN", "Meiryo", sans-serif',
  },
  qHeader: { marginBottom: 16 },
  qNum: {
    display: 'inline-block',
    background: '#2563EB',
    color: '#fff',
    fontSize: 13,
    fontWeight: 700,
    padding: '2px 10px',
    borderRadius: 2,
    marginBottom: 8,
    letterSpacing: 1,
  },
  qText: {
    fontSize: 'clamp(17px, 4.5vw, 21px)',
    fontWeight: 700,
    color: '#1A1A1A',
    lineHeight: 1.6,
    margin: 0,
  },
  targetWrap: { marginBottom: 14 },
  targetLabel: {
    fontSize: 12,
    color: '#555',
    fontWeight: 700,
    marginBottom: 6,
    letterSpacing: 1,
  },
  targetBox: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '2px solid #2C2C2C',
    borderRadius: 4,
    padding: '10px 14px',
    background: '#F9F8F4',
  },
  divider: {
    height: 2,
    background: '#E5E5E5',
    margin: '14px 0',
  },
  choices: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 10,
  },
  choiceBtn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 6,
    border: '2px solid #aaa',
    borderRadius: 4,
    padding: '10px 6px',
    minHeight: 100,
    cursor: 'pointer',
    touchAction: 'manipulation',
    WebkitTapHighlightColor: 'transparent',
    transition: 'border-color 0.15s',
  },
  choiceLabel: {
    fontSize: 14,
    fontWeight: 700,
    color: '#555',
  },
  scatterBox: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'center',
    background: '#F9F8F4',
    border: '2px solid #2C2C2C',
    borderRadius: 4,
    padding: '14px',
    marginBottom: 16,
  },
  numRow: {
    display: 'flex',
    gap: 12,
    justifyContent: 'center',
  },
  numBtn: {
    width: 'clamp(58px, 15vw, 76px)',
    height: 'clamp(58px, 15vw, 76px)',
    borderRadius: 4,
    fontSize: 'clamp(24px, 6vw, 32px)',
    fontWeight: 900,
    color: '#1A1A1A',
    cursor: 'pointer',
    touchAction: 'manipulation',
    WebkitTapHighlightColor: 'transparent',
    fontFamily: 'inherit',
  },
  patternRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    background: '#F9F8F4',
    border: '2px solid #2C2C2C',
    borderRadius: 4,
    padding: '12px',
    marginBottom: 16,
    overflowX: 'auto',
    justifyContent: 'center',
  },
  patternCell: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  questionMark: {
    width: 56,
    height: 56,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '2px dashed #2563EB',
    borderRadius: 4,
    fontSize: 28,
    fontWeight: 900,
    color: '#2563EB',
  },
  hint: {
    marginTop: 12,
    padding: '8px 12px',
    background: '#F0FDF4',
    border: '2px solid #16A34A',
    borderRadius: 4,
    fontSize: 'clamp(13px, 3.5vw, 15px)',
    color: '#15803D',
    fontWeight: 600,
  },
};
