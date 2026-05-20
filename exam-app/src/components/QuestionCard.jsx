import { useState, useMemo } from 'react';
import ShapeRenderer from './ShapeRenderer';
import { QUESTION_TYPES } from '../data/questions';

// -------------------------------------------------------
// ラベル (あ い う え)
// -------------------------------------------------------
const LABELS = ['あ', 'い', 'う', 'え'];

// -------------------------------------------------------
// シャッフル
// -------------------------------------------------------
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// -------------------------------------------------------
// せんたくボタン の スタイル
// -------------------------------------------------------
function choiceBtnStyle(correct, selected, isThis, answered) {
  let bg = '#fff';
  let border = '2px solid #888';
  if (answered) {
    if (correct) {
      bg = '#D1FAE5';
      border = '3px solid #16A34A';
    } else if (isThis) {
      bg = '#FEE2E2';
      border = '3px solid #DC2626';
    }
  }
  return { ...S.choiceBtn, background: bg, border };
}

function numBtnStyle(num, correctCount, selected, answered) {
  let bg = '#fff';
  let border = '2px solid #888';
  if (answered) {
    if (num === correctCount) {
      bg = '#D1FAE5';
      border = '3px solid #16A34A';
    } else if (num === selected) {
      bg = '#FEE2E2';
      border = '3px solid #DC2626';
    }
  }
  return { ...S.numBtn, background: bg, border };
}

// -------------------------------------------------------
// COUNT サブコンポーネント (hooks をトップレベルで使う)
// -------------------------------------------------------
function CountCard({ question, onAnswer }) {
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);

  const scattered = useMemo(() => {
    const all = [];
    question.shapeGroups.forEach((g) => {
      for (let i = 0; i < g.count; i++) all.push({ shape: g.shape, color: g.color });
    });
    return shuffle(all);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [question.id]);

  function pickNum(num) {
    if (answered) return;
    setSelected(num);
    setAnswered(true);
    setTimeout(() => onAnswer(num === question.correctCount), 900);
  }

  return (
    <div style={S.card}>
      <TypeBadge label="かずをかぞえる" />
      <p style={S.qText}>{question.question}</p>
      <div style={S.scatterBox}>
        {scattered.map((s, i) => (
          <ShapeRenderer key={i} shape={s.shape} color={s.color} size={52} />
        ))}
      </div>
      <p style={S.countHint}>
        <span style={S.countHintLabel}>かぞえるかたち：</span>
        <strong>{question.targetShapeLabel}</strong>
      </p>
      <div style={S.numRow}>
        {question.choices.map((num) => (
          <button
            key={num}
            onClick={() => pickNum(num)}
            disabled={answered}
            style={numBtnStyle(num, question.correctCount, selected, answered)}
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  );
}

// -------------------------------------------------------
// メインコンポーネント
// -------------------------------------------------------
export default function QuestionCard({ question, onAnswer, index }) {
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);

  // COUNT は 専用コンポーネントに委ねる
  if (question.type === QUESTION_TYPES.COUNT) {
    return <CountCard question={question} onAnswer={onAnswer} />;
  }

  function pick(choice, i) {
    if (answered) return;
    setSelected(i);
    setAnswered(true);
    setTimeout(() => onAnswer(choice.correct), 900);
  }

  // ─── PATTERN ──────────────────────────────────────────
  if (question.type === QUESTION_TYPES.PATTERN) {
    return (
      <div style={S.card}>
        <TypeBadge label="つぎのかたち" />
        <p style={S.qText}>{question.question}</p>
        <div style={S.patternRow}>
          {question.pattern.map((item, i) => (
            <div key={i} style={S.patternCell}>
              {item ? (
                <ShapeRenderer shape={item.shape} color={item.color} size={56} />
              ) : (
                <div style={S.questionMark}>？</div>
              )}
            </div>
          ))}
        </div>
        <div style={S.choices}>
          {question.choices.map((choice, i) => (
            <button
              key={i}
              onClick={() => pick(choice, i)}
              disabled={answered}
              style={choiceBtnStyle(choice.correct, selected, i === selected, answered)}
            >
              <span style={S.choiceLabel}>{LABELS[i]}</span>
              <ShapeRenderer shape={choice.shape} color={choice.color} size={60} />
              {answered && i === selected && <Mark correct={choice.correct} />}
              {answered && i !== selected && choice.correct && <Mark correct={true} />}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // ─── ODD_ONE_OUT ──────────────────────────────────────
  if (question.type === QUESTION_TYPES.ODD_ONE_OUT) {
    return (
      <div style={S.card}>
        <TypeBadge label="なかまはずれ" />
        <p style={S.qText}>{question.question}</p>
        <div style={S.choices}>
          {question.choices.map((choice, i) => (
            <button
              key={i}
              onClick={() => pick(choice, i)}
              disabled={answered}
              style={choiceBtnStyle(choice.correct, selected, i === selected, answered)}
            >
              <span style={S.choiceLabel}>{LABELS[i]}</span>
              <ShapeRenderer shape={choice.shape} color={choice.color} size={68} />
              {answered && i === selected && <Mark correct={choice.correct} />}
              {answered && i !== selected && choice.correct && <Mark correct={true} />}
            </button>
          ))}
        </div>
        {answered && question.hint && <HintBox text={question.hint} />}
      </div>
    );
  }

  // ─── SAME_SHAPE / ROTATION ────────────────────────────
  const typeLabel =
    question.type === QUESTION_TYPES.SAME_SHAPE ? 'おなじかたち' : 'かいてん';

  return (
    <div style={S.card}>
      <TypeBadge label={typeLabel} />
      <p style={S.qText}>{question.question}</p>
      {question.target && (
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
      )}
      <div style={S.divider} />
      <div style={S.choices}>
        {question.choices.map((choice, i) => (
          <button
            key={i}
            onClick={() => pick(choice, i)}
            disabled={answered}
            style={choiceBtnStyle(choice.correct, selected, i === selected, answered)}
          >
            <span style={S.choiceLabel}>{LABELS[i]}</span>
            <ShapeRenderer
              shape={choice.shape}
              color={choice.color}
              rotation={choice.rotation ?? 0}
              size={68}
            />
            {answered && i === selected && <Mark correct={choice.correct} />}
            {answered && i !== selected && choice.correct && <Mark correct={true} />}
          </button>
        ))}
      </div>
    </div>
  );
}

// -------------------------------------------------------
// ちいさなコンポーネント
// -------------------------------------------------------
function TypeBadge({ label }) {
  return <span style={S.badge}>{label}</span>;
}

function Mark({ correct }) {
  return (
    <span style={{ fontSize: 'clamp(20px, 5vw, 26px)', lineHeight: 1, color: correct ? '#16A34A' : '#DC2626', fontWeight: 900 }}>
      {correct ? '○' : '✕'}
    </span>
  );
}

function HintBox({ text }) {
  return (
    <div style={S.hint}>
      <span style={S.hintBadge}>ヒント</span>
      {text}
    </div>
  );
}

// -------------------------------------------------------
// スタイル
// -------------------------------------------------------
const S = {
  card: {
    background: '#FFFFFF',
    border: '2px solid #2C2C2C',
    borderRadius: 4,
    padding: 'clamp(14px, 4vw, 24px)',
    maxWidth: 640,
    margin: '0 auto',
    fontFamily: '"Hiragino Kaku Gothic ProN", "Meiryo", system-ui, sans-serif',
    boxShadow: '3px 3px 0 #2C2C2C',
  },
  badge: {
    display: 'inline-block',
    background: '#2563EB',
    color: '#fff',
    fontSize: 12,
    fontWeight: 700,
    padding: '2px 10px',
    borderRadius: 2,
    marginBottom: 10,
    letterSpacing: 1,
  },
  qText: {
    fontSize: 'clamp(17px, 4.5vw, 20px)',
    fontWeight: 700,
    color: '#1A1A1A',
    lineHeight: 1.65,
    margin: '0 0 16px',
  },
  // SAME_SHAPE / ROTATION
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
    padding: '10px 16px',
    background: '#F5F3EE',
  },
  divider: {
    height: 1,
    background: '#E0E0E0',
    margin: '12px 0 16px',
  },
  // choices 2×2
  choices: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 10,
  },
  choiceBtn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    border: '2px solid #888',
    borderRadius: 8,
    padding: 'clamp(10px, 2.5vw, 14px) 8px',
    minHeight: 'clamp(80px, 22vw, 110px)',
    cursor: 'pointer',
    touchAction: 'manipulation',
    WebkitTapHighlightColor: 'transparent',
    transition: 'background 0.12s, border-color 0.12s',
    fontFamily: 'inherit',
    background: '#fff',
  },
  choiceLabel: {
    fontSize: 13,
    fontWeight: 700,
    color: '#666',
  },
  // COUNT
  scatterBox: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'center',
    alignItems: 'center',
    background: '#F5F3EE',
    border: '2px solid #2C2C2C',
    borderRadius: 4,
    padding: 14,
    marginBottom: 12,
    minHeight: 90,
  },
  countHint: {
    fontSize: 14,
    color: '#1A1A1A',
    margin: '0 0 14px',
  },
  countHintLabel: {
    fontWeight: 700,
  },
  numRow: {
    display: 'flex',
    gap: 10,
    justifyContent: 'center',
  },
  numBtn: {
    width: 'clamp(64px, 16vw, 80px)',
    height: 'clamp(64px, 16vw, 80px)',
    borderRadius: 8,
    fontSize: 'clamp(22px, 6vw, 30px)',
    fontWeight: 900,
    color: '#1A1A1A',
    cursor: 'pointer',
    touchAction: 'manipulation',
    WebkitTapHighlightColor: 'transparent',
    fontFamily: 'inherit',
    border: '2px solid #888',
    background: '#fff',
    transition: 'background 0.12s, border-color 0.12s',
  },
  // PATTERN
  patternRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    background: '#F5F3EE',
    border: '2px solid #2C2C2C',
    borderRadius: 4,
    padding: '12px 10px',
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
    width: 'clamp(44px, 12vw, 60px)',
    height: 'clamp(44px, 12vw, 60px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '2px dashed #2563EB',
    borderRadius: 4,
    fontSize: 'clamp(20px, 6vw, 28px)',
    fontWeight: 900,
    color: '#2563EB',
  },
  // hint
  hint: {
    marginTop: 14,
    padding: '9px 12px',
    background: '#FFFBEB',
    border: '1px solid #FCD34D',
    borderRadius: 4,
    fontSize: 'clamp(13px, 3.2vw, 15px)',
    color: '#92400E',
    fontWeight: 600,
    display: 'flex',
    gap: 8,
    alignItems: 'flex-start',
    lineHeight: 1.5,
  },
  hintBadge: {
    background: '#FCD34D',
    color: '#92400E',
    fontWeight: 700,
    fontSize: 11,
    padding: '1px 6px',
    borderRadius: 2,
    flexShrink: 0,
    marginTop: 2,
  },
};
