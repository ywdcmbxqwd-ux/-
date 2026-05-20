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
    padding: 'clamp(24px, 6vw, 40px) clamp(20px, 6vw, 48px)',
    boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
    textAlign: 'center',
    maxWidth: 420,
    width: '100%',
  },
  emoji: { fontSize: 'clamp(52px, 14vw, 72px)', marginBottom: 8 },
  title: { fontSize: 'clamp(22px, 5.5vw, 28px)', fontWeight: 700, color: '#2c3e50', marginBottom: 16 },
  score: { fontSize: 'clamp(16px, 4vw, 20px)', color: '#555', marginBottom: 12 },
  big: { fontSize: 'clamp(32px, 8vw, 40px)', fontWeight: 900, color: '#4A90D9' },
  bar: {
    height: 16,
    background: '#e8e8e8',
    borderRadius: 8,
    overflow: 'hidden',
    margin: '0 auto 8px',
    width: '100%',
  },
  fill: {
    height: '100%',
    background: 'linear-gradient(90deg, #4A90D9, #2ECC71)',
    borderRadius: 8,
    transition: 'width 0.8s ease',
  },
  pct: { fontSize: 'clamp(16px, 4vw, 18px)', fontWeight: 700, color: '#4A90D9', marginBottom: 16 },
  message: { fontSize: 'clamp(16px, 4.5vw, 20px)', color: '#333', marginBottom: 24, fontWeight: 600 },
  btn: {
    background: 'linear-gradient(135deg, #4A90D9, #7B68EE)',
    color: '#fff',
    border: 'none',
    borderRadius: 14,
    padding: 'clamp(13px, 3.5vw, 16px) clamp(24px, 7vw, 36px)',
    fontSize: 'clamp(16px, 4vw, 18px)',
    fontWeight: 700,
    cursor: 'pointer',
    touchAction: 'manipulation',
    WebkitTapHighlightColor: 'transparent',
    width: '100%',
  },
};
