import { useState } from 'react';
import { questions } from './data/questions';
import QuestionCard from './components/QuestionCard';
import ResultScreen from './components/ResultScreen';

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

export default function App() {
  const [qs, setQs] = useState(() => shuffle(questions));
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [phase, setPhase] = useState('start');

  function startQuiz() {
    setQs(shuffle(questions));
    setCurrent(0);
    setScore(0);
    setPhase('quiz');
  }

  function handleAnswer(correct) {
    const nextScore = correct ? score + 1 : score;
    setScore(nextScore);
    if (current + 1 >= qs.length) {
      setPhase('result');
    } else {
      setCurrent((c) => c + 1);
    }
  }

  return (
    <div style={styles.root}>
      <header style={styles.header}>
        <h1 style={styles.logo}>🔷 ずけい もんだいしゅう</h1>
        {phase === 'quiz' && (
          <span style={styles.progress}>
            {current + 1} / {qs.length}
          </span>
        )}
      </header>

      <main style={styles.main}>
        {phase === 'start' && (
          <div style={styles.startCard}>
            <div style={styles.startEmoji}>🔺🔵🟥</div>
            <h2 style={styles.startTitle}>小学校受験<br />図形・空間認識</h2>
            <p style={styles.startDesc}>
              ずけいのもんだいにちょうせんしよう！<br />
              ぜんぶで <strong>{questions.length}</strong> もんあります。
            </p>
            <div style={styles.types}>
              <TypeBadge icon="👁" text="おなじかたち" />
              <TypeBadge icon="🔄" text="かいてん" />
              <TypeBadge icon="🔢" text="かずをかぞえる" />
              <TypeBadge icon="🚫" text="なかまはずれ" />
            </div>
            <button onClick={startQuiz} style={styles.startBtn}>
              はじめる！
            </button>
          </div>
        )}

        {phase === 'quiz' && (
          <>
            <div style={styles.progressBar}>
              <div style={{ ...styles.progressFill, width: `${((current + 1) / qs.length) * 100}%` }} />
            </div>
            <QuestionCard
              key={qs[current].id}
              question={qs[current]}
              onAnswer={handleAnswer}
            />
          </>
        )}

        {phase === 'result' && (
          <ResultScreen score={score} total={qs.length} onRetry={startQuiz} />
        )}
      </main>
    </div>
  );
}

function TypeBadge({ icon, text }) {
  return (
    <span style={styles.badge}>
      {icon} {text}
    </span>
  );
}

const styles = {
  root: {
    minHeight: '100vh',
    minHeight: '100dvh',
    background: 'linear-gradient(160deg, #e8f4fd 0%, #fef9f0 100%)',
    fontFamily: '"Hiragino Kaku Gothic ProN", "Meiryo", sans-serif',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 16px',
    background: 'linear-gradient(135deg, #4A90D9, #7B68EE)',
    boxShadow: '0 2px 12px rgba(74,144,217,0.3)',
    position: 'sticky',
    top: 0,
    zIndex: 10,
  },
  logo: {
    color: '#fff',
    fontSize: 'clamp(16px, 4vw, 22px)',
    fontWeight: 800,
    margin: 0,
  },
  progress: {
    color: '#fff',
    fontSize: 'clamp(14px, 3.5vw, 18px)',
    fontWeight: 700,
    background: 'rgba(255,255,255,0.2)',
    padding: '4px 12px',
    borderRadius: 20,
    whiteSpace: 'nowrap',
  },
  main: {
    maxWidth: 680,
    margin: '20px auto',
    padding: '0 12px',
  },
  progressBar: {
    height: 8,
    background: '#dce8f5',
    borderRadius: 4,
    marginBottom: 20,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    background: 'linear-gradient(90deg, #4A90D9, #7B68EE)',
    borderRadius: 4,
    transition: 'width 0.4s ease',
  },
  startCard: {
    background: '#fff',
    borderRadius: 20,
    padding: 'clamp(24px, 6vw, 40px) clamp(16px, 5vw, 36px)',
    boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
    textAlign: 'center',
  },
  startEmoji: { fontSize: 'clamp(40px, 10vw, 52px)', marginBottom: 12 },
  startTitle: {
    fontSize: 'clamp(22px, 5.5vw, 28px)',
    fontWeight: 800,
    color: '#2c3e50',
    lineHeight: 1.4,
    marginBottom: 16,
  },
  startDesc: {
    fontSize: 'clamp(14px, 3.5vw, 17px)',
    color: '#555',
    lineHeight: 1.7,
    marginBottom: 24,
  },
  types: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'center',
    marginBottom: 28,
  },
  badge: {
    background: '#f0f4ff',
    color: '#4A90D9',
    borderRadius: 20,
    padding: '6px 12px',
    fontSize: 'clamp(12px, 3vw, 14px)',
    fontWeight: 600,
  },
  startBtn: {
    background: 'linear-gradient(135deg, #4A90D9, #7B68EE)',
    color: '#fff',
    border: 'none',
    borderRadius: 16,
    padding: 'clamp(14px, 3.5vw, 16px) clamp(32px, 8vw, 48px)',
    fontSize: 'clamp(17px, 4.5vw, 20px)',
    fontWeight: 800,
    cursor: 'pointer',
    boxShadow: '0 4px 16px rgba(74,144,217,0.4)',
    touchAction: 'manipulation',
    WebkitTapHighlightColor: 'transparent',
    width: '100%',
    maxWidth: 280,
  },
};
