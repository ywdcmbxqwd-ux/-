import { useState } from 'react';
import { questions, QUESTION_TYPES } from './data/questions';
import QuestionCard from './components/QuestionCard';
import ResultScreen from './components/ResultScreen';

const TYPE_LABELS = {
  [QUESTION_TYPES.SAME_SHAPE]:  { icon: '👁', text: 'おなじかたち' },
  [QUESTION_TYPES.ROTATION]:    { icon: '🔄', text: 'まわしたかたち' },
  [QUESTION_TYPES.COUNT]:       { icon: '🔢', text: 'いくつあるかな' },
  [QUESTION_TYPES.ODD_ONE_OUT]: { icon: '🚫', text: 'なかまはずれ' },
  [QUESTION_TYPES.PATTERN]:     { icon: '➡️', text: 'つぎはなにかな' },
};

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

export default function App() {
  const [qs, setQs] = useState(() => shuffle(questions));
  const [current, setCurrent] = useState(0);
  const [score, setScore]   = useState(0);
  const [phase, setPhase]   = useState('start');

  function startQuiz() {
    setQs(shuffle(questions));
    setCurrent(0);
    setScore(0);
    setPhase('quiz');
  }

  function handleAnswer(correct) {
    const next = correct ? score + 1 : score;
    setScore(next);
    if (current + 1 >= qs.length) setPhase('result');
    else setCurrent(c => c + 1);
  }

  const pct = qs.length ? Math.round(((current) / qs.length) * 100) : 0;

  return (
    <div style={S.root}>
      {/* ── ヘッダー ── */}
      <header style={S.header}>
        <span style={S.headerTitle}>ずけい もんだいしゅう</span>
        {phase === 'quiz' && (
          <span style={S.headerCount}>
            {current + 1}<span style={S.headerTotal}> / {qs.length}</span>
          </span>
        )}
      </header>

      {/* ── プログレスバー ── */}
      {phase === 'quiz' && (
        <div style={S.barTrack}>
          <div style={{ ...S.barFill, width: `${pct}%` }} />
        </div>
      )}

      <main style={S.main}>
        {/* ── スタート画面 ── */}
        {phase === 'start' && (
          <div style={S.cover}>
            <div style={S.coverTop}>
              <p style={S.coverKind}>しょうがっこうじゅけん</p>
              <h1 style={S.coverTitle}>ずけい もんだいしゅう</h1>
              <p style={S.coverSub}>ぜんぶで {questions.length} もん</p>
            </div>
            <div style={S.coverDivider} />
            <div style={S.typeGrid}>
              {Object.values(QUESTION_TYPES).map(t => {
                const lb = TYPE_LABELS[t];
                return (
                  <div key={t} style={S.typeRow}>
                    <span style={S.typeIcon}>{lb.icon}</span>
                    <span style={S.typeText}>{lb.text}</span>
                  </div>
                );
              })}
            </div>
            <div style={S.coverDivider} />
            <button onClick={startQuiz} style={S.startBtn}>はじめる</button>
          </div>
        )}

        {/* ── 問題画面 ── */}
        {phase === 'quiz' && (
          <QuestionCard
            key={qs[current].id}
            question={qs[current]}
            index={current}
            onAnswer={handleAnswer}
          />
        )}

        {/* ── 結果画面 ── */}
        {phase === 'result' && (
          <ResultScreen score={score} total={qs.length} onRetry={startQuiz} />
        )}
      </main>
    </div>
  );
}

const FONT = '"Hiragino Kaku Gothic ProN", "Meiryo", "Yu Gothic", sans-serif';

const S = {
  root: {
    minHeight: '100dvh',
    background: '#F5F3EE',
    fontFamily: FONT,
    color: '#1A1A1A',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px 16px',
    background: '#fff',
    borderBottom: '2px solid #2C2C2C',
    position: 'sticky',
    top: 0,
    zIndex: 10,
  },
  headerTitle: {
    fontSize: 'clamp(14px, 3.5vw, 17px)',
    fontWeight: 700,
    letterSpacing: 1,
    color: '#1A1A1A',
  },
  headerCount: {
    fontSize: 'clamp(18px, 5vw, 22px)',
    fontWeight: 900,
    color: '#2563EB',
  },
  headerTotal: {
    fontSize: 'clamp(13px, 3.5vw, 16px)',
    fontWeight: 700,
    color: '#555',
  },
  barTrack: {
    height: 5,
    background: '#E5E5E5',
  },
  barFill: {
    height: '100%',
    background: '#2563EB',
    transition: 'width 0.4s ease',
  },
  main: {
    maxWidth: 640,
    margin: '16px auto',
    padding: '0 12px 32px',
  },

  // ── Cover (start screen) ──
  cover: {
    background: '#fff',
    border: '2px solid #2C2C2C',
    borderRadius: 4,
    padding: 'clamp(24px, 6vw, 40px) clamp(20px, 5vw, 36px)',
    textAlign: 'center',
  },
  coverTop: { marginBottom: 0 },
  coverKind: {
    fontSize: 'clamp(12px, 3vw, 14px)',
    letterSpacing: 3,
    color: '#555',
    fontWeight: 700,
    margin: '0 0 8px',
  },
  coverTitle: {
    fontSize: 'clamp(24px, 6.5vw, 34px)',
    fontWeight: 900,
    color: '#1A1A1A',
    lineHeight: 1.3,
    margin: '0 0 8px',
    letterSpacing: 2,
  },
  coverSub: {
    fontSize: 'clamp(14px, 3.5vw, 17px)',
    color: '#2563EB',
    fontWeight: 700,
    margin: 0,
  },
  coverDivider: {
    height: 2,
    background: '#2C2C2C',
    margin: '20px 0',
  },
  typeGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    textAlign: 'left',
    maxWidth: 280,
    margin: '0 auto',
  },
  typeRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  typeIcon: { fontSize: 22, flexShrink: 0 },
  typeText: {
    fontSize: 'clamp(14px, 3.5vw, 17px)',
    fontWeight: 700,
    color: '#1A1A1A',
  },
  startBtn: {
    background: '#2563EB',
    color: '#fff',
    border: '2px solid #1D4ED8',
    borderRadius: 4,
    padding: 'clamp(14px, 3.5vw, 18px) 0',
    fontSize: 'clamp(18px, 5vw, 22px)',
    fontWeight: 900,
    cursor: 'pointer',
    touchAction: 'manipulation',
    WebkitTapHighlightColor: 'transparent',
    width: '100%',
    maxWidth: 300,
    letterSpacing: 4,
    fontFamily: FONT,
  },
};
