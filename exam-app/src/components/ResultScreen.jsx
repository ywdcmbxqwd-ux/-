export default function ResultScreen({ score, total, onRetry }) {
  const pct = Math.round((score / total) * 100);
  const emoji = pct >= 80 ? '🌟' : pct >= 50 ? '😊' : '😢';
  const message =
    pct >= 80 ? 'すごい！よくできました！' :
    pct >= 50 ? 'がんばりました！もう少しです！' :
    'もう一どやってみよう！';

  return (
    <div style={styles.wrap}>
      <div style={styles.card}>
        <div style={styles.emoji}>{emoji}</div>
        <h2 style={styles.title}>けっか</h2>
        <p style={styles.score}>
          {total}もん中 <span style={styles.big}>{score}</span> もん せいかい！
        </p>
        <div style={styles.bar}>
          <div style={{ ...styles.fill, width: `${pct}%` }} />
        </div>
        <p style={styles.pct}>{pct}%</p>
        <p style={styles.message}>{message}</p>
        <button onClick={onRetry} style={styles.btn}>もう一どチャレンジ！</button>
      </div>
    </div>
  );
}

const styles = {
  wrap: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '60vh',
  },
  card: {
    background: '#fff',
    borderRadius: 24,
    padding: '40px 48px',
    boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
    textAlign: 'center',
    maxWidth: 420,
    width: '100%',
  },
  emoji: { fontSize: 72, marginBottom: 8 },
  title: { fontSize: 28, fontWeight: 700, color: '#2c3e50', marginBottom: 16 },
  score: { fontSize: 20, color: '#555', marginBottom: 12 },
  big: { fontSize: 40, fontWeight: 900, color: '#4A90D9' },
  bar: {
    height: 18,
    background: '#e8e8e8',
    borderRadius: 9,
    overflow: 'hidden',
    margin: '0 auto 8px',
    width: '100%',
  },
  fill: {
    height: '100%',
    background: 'linear-gradient(90deg, #4A90D9, #2ECC71)',
    borderRadius: 9,
    transition: 'width 0.8s ease',
  },
  pct: { fontSize: 18, fontWeight: 700, color: '#4A90D9', marginBottom: 16 },
  message: { fontSize: 20, color: '#333', marginBottom: 28, fontWeight: 600 },
  btn: {
    background: 'linear-gradient(135deg, #4A90D9, #7B68EE)',
    color: '#fff',
    border: 'none',
    borderRadius: 14,
    padding: '14px 32px',
    fontSize: 18,
    fontWeight: 700,
    cursor: 'pointer',
  },
};
