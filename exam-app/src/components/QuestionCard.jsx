import { useState } from 'react';
import ShapeRenderer from './ShapeRenderer';
import { QUESTION_TYPES } from '../data/questions';

export default function QuestionCard({ question, onAnswer }) {
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);

  function handleSelect(choice, index) {
    if (answered) return;
    setSelected(index);
    setAnswered(true);
    const correct = question.type === QUESTION_TYPES.COUNT_SHAPES
      ? choice === question.correctCount
      : choice.correct;
    setTimeout(() => onAnswer(correct), 800);
  }

  if (question.type === QUESTION_TYPES.COUNT_SHAPES) {
    return <CountQuestion question={question} onAnswer={onAnswer} />;
  }

  const hasTarget = question.target != null;

  return (
    <div style={styles.card}>
      <p style={styles.questionText}>{question.question}</p>

      {hasTarget && (
        <div style={styles.targetBox}>
          <span style={styles.label}>もんだい</span>
          <ShapeRenderer
            shape={question.target.shape}
            color={question.target.color}
            rotation={question.target.rotation}
            size={110}
          />
        </div>
      )}

      <div style={styles.choices}>
        {question.choices.map((choice, i) => {
          let border = '3px solid #ddd';
          let bg = '#fff';
          if (answered) {
            if (i === selected) {
              border = choice.correct ? '3px solid #2ECC71' : '3px solid #E74C3C';
              bg = choice.correct ? '#eafaf1' : '#fdecea';
            } else if (choice.correct) {
              border = '3px solid #2ECC71';
              bg = '#eafaf1';
            }
          }
          return (
            <button
              key={i}
              onClick={() => handleSelect(choice, i)}
              style={{ ...styles.choiceBtn, border, background: bg, cursor: answered ? 'default' : 'pointer' }}
            >
              <span style={styles.choiceLabel}>{['①', '②', '③', '④'][i]}</span>
              <ShapeRenderer
                shape={choice.shape}
                color={choice.color}
                rotation={choice.rotation ?? 0}
                size={80}
              />
              {answered && i === selected && (
                <span style={{ fontSize: 24 }}>{choice.correct ? '⭕' : '❌'}</span>
              )}
            </button>
          );
        })}
      </div>

      {answered && question.hint && (
        <div style={styles.hint}>💡 {question.hint}</div>
      )}
    </div>
  );
}

function CountQuestion({ question, onAnswer }) {
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);

  function handleSelect(num) {
    if (answered) return;
    setSelected(num);
    setAnswered(true);
    setTimeout(() => onAnswer(num === question.correctCount), 800);
  }

  // Build a flat list of all shapes to display
  const allShapes = [];
  question.shapeGroups.forEach((g) => {
    for (let i = 0; i < g.count; i++) {
      allShapes.push({ shape: g.shape, color: g.color });
    }
  });
  // shuffle
  const shuffled = [...allShapes].sort(() => Math.random() - 0.5);

  return (
    <div style={styles.card}>
      <p style={styles.questionText}>{question.question}</p>
      <div style={styles.shapeGrid}>
        {shuffled.map((s, i) => (
          <ShapeRenderer key={i} shape={s.shape} color={s.color} size={60} />
        ))}
      </div>
      <div style={styles.numChoices}>
        {question.choices.map((num) => {
          let bg = '#fff';
          let border = '3px solid #ddd';
          if (answered) {
            if (num === selected) {
              const correct = num === question.correctCount;
              bg = correct ? '#eafaf1' : '#fdecea';
              border = correct ? '3px solid #2ECC71' : '3px solid #E74C3C';
            } else if (num === question.correctCount) {
              bg = '#eafaf1';
              border = '3px solid #2ECC71';
            }
          }
          return (
            <button
              key={num}
              onClick={() => handleSelect(num)}
              style={{ ...styles.numBtn, background: bg, border, cursor: answered ? 'default' : 'pointer' }}
            >
              {num}
            </button>
          );
        })}
      </div>
    </div>
  );
}

const styles = {
  card: {
    background: '#fff',
    borderRadius: 20,
    padding: '28px 32px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.10)',
    maxWidth: 640,
    margin: '0 auto',
  },
  questionText: {
    fontSize: 22,
    fontWeight: 700,
    color: '#2c3e50',
    marginBottom: 20,
    lineHeight: 1.5,
  },
  targetBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: '#f0f4ff',
    borderRadius: 14,
    padding: '16px 24px',
    marginBottom: 24,
    width: 'fit-content',
  },
  label: {
    fontSize: 13,
    fontWeight: 700,
    color: '#6c7a89',
    marginBottom: 8,
    letterSpacing: 1,
  },
  choices: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 14,
  },
  choiceBtn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 6,
    borderRadius: 14,
    padding: '14px 10px',
    transition: 'transform 0.1s',
  },
  choiceLabel: {
    fontSize: 16,
    fontWeight: 700,
    color: '#6c7a89',
  },
  hint: {
    marginTop: 16,
    padding: '10px 16px',
    background: '#fffbe6',
    borderRadius: 10,
    fontSize: 15,
    color: '#7d6608',
  },
  shapeGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'center',
    background: '#f8f9fa',
    borderRadius: 14,
    padding: 16,
    marginBottom: 24,
  },
  numChoices: {
    display: 'flex',
    gap: 16,
    justifyContent: 'center',
  },
  numBtn: {
    width: 64,
    height: 64,
    borderRadius: 14,
    fontSize: 28,
    fontWeight: 700,
    color: '#2c3e50',
  },
};
