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
    background: 'linear-gradient(160deg, #e8f4fd 0%, #fef9f0 100%)',
    fontFamily: '"Hiragino Kaku Gothic ProN", "Meiryo", sans-serif',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 28px',
    background: 'linear-gradient(135deg, #4A90D9, #7B68EE)',
    boxShadow: '0 2px 12px rgba(74,144,217,0.3)',
  },
  logo: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 800,
    margin: 0,
  },
  progress: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 700,
    background: 'rgba(255,255,255,0.2)',
    padding: '4px 14px',
    borderRadius: 20,
  },
  main: {
    maxWidth: 680,
    margin: '32px auto',
    padding: '0 16px',
  },
  progressBar: {
    height: 8,
    background: '#dce8f5',
    borderRadius: 4,
    marginBottom: 24,
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
    borderRadius: 24,
    padding: '40px 36px',
    boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
    textAlign: 'center',
  },
  startEmoji: { fontSize: 52, marginBottom: 12 },
  startTitle: {
    fontSize: 28,
    fontWeight: 800,
    color: '#2c3e50',
    lineHeight: 1.4,
    marginBottom: 16,
  },
  startDesc: {
    fontSize: 17,
    color: '#555',
    lineHeight: 1.7,
    marginBottom: 24,
  },
  types: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'center',
    marginBottom: 28,
  },
  badge: {
    background: '#f0f4ff',
    color: '#4A90D9',
    borderRadius: 20,
    padding: '6px 14px',
    fontSize: 14,
    fontWeight: 600,
  },
  startBtn: {
    background: 'linear-gradient(135deg, #4A90D9, #7B68EE)',
    color: '#fff',
    border: 'none',
    borderRadius: 16,
    padding: '16px 48px',
    fontSize: 20,
    fontWeight: 800,
    cursor: 'pointer',
    boxShadow: '0 4px 16px rgba(74,144,217,0.4)',
  },
};
