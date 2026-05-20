export default function ResultScreen({ score, total, onRetry }) {
  const pct = Math.round((score / total) * 100);
  const stars = pct >= 80 ? 3 : pct >= 50 ? 2 : 1;
  const msg =
    pct >= 80 ? 'すばらしい！ よくできました！' :
    pct >= 50 ? 'がんばりました！ もうすこし！' :
    'もう いちど ちょうせん！';

  return (
    <div style={S.wrap}>
      <div style={S.paper}>
        <div style={S.ruled} />
        <p style={S.heading}>けっか はっぴょう</p>
        <div style={S.stars}>
          {[1,2,3].map(n => (
            <span key={n} style={{ color: n <= stars ? '#F59E0B' : '#D1D5DB', fontSize: 'clamp(32px, 9vw, 48px)' }}>★</span>
          ))}
        </div>
        <p style={S.scoreText}>
          <span style={S.big}>{score}</span>
          <span style={S.unit}> / {total} もん せいかい</span>
        </p>
        <div style={S.barWrap}>
          <div style={{ ...S.barFill, width: `${pct}%` }} />
        </div>
        <p style={S.pct}>{pct} %</p>
        <p style={S.msg}>{msg}</p>
        <div style={S.ruled} />
        <button onClick={onRetry} style={S.btn}>
          もう いちど やる
        </button>
      </div>
    </div>
  );
}

const S = {
  wrap: {
    display: 'flex',
    justifyContent: 'center',
    padding: '8px 0 32px',
  },
  paper: {
    background: '#fff',
    border: '2px solid #2C2C2C',
    borderRadius: 4,
    padding: 'clamp(20px, 5vw, 36px) clamp(20px, 6vw, 44px)',
    textAlign: 'center',
    maxWidth: 400,
    width: '100%',
    fontFamily: '"Hiragino Kaku Gothic ProN", "Meiryo", sans-serif',
  },
  ruled: {
    height: 2,
    background: '#2C2C2C',
    margin: '16px 0',
  },
  heading: {
    fontSize: 'clamp(15px, 4vw, 18px)',
    fontWeight: 700,
    color: '#555',
    letterSpacing: 3,
    margin: '0 0 12px',
  },
  stars: { fontSize: 40, letterSpacing: 4, marginBottom: 16 },
  scoreText: { margin: '0 0 12px' },
  big: {
    fontSize: 'clamp(44px, 11vw, 60px)',
    fontWeight: 900,
    color: '#2563EB',
    lineHeight: 1,
  },
  unit: {
    fontSize: 'clamp(15px, 3.5vw, 18px)',
    fontWeight: 700,
    color: '#1A1A1A',
  },
  barWrap: {
    height: 14,
    background: '#E5E5E5',
    borderRadius: 2,
    overflow: 'hidden',
    margin: '0 0 6px',
    border: '1px solid #ccc',
  },
  barFill: {
    height: '100%',
    background: '#2563EB',
    transition: 'width 0.8s ease',
  },
  pct: {
    fontSize: 'clamp(13px, 3vw, 15px)',
    color: '#555',
    fontWeight: 700,
    margin: '0 0 16px',
  },
  msg: {
    fontSize: 'clamp(16px, 4.5vw, 20px)',
    fontWeight: 700,
    color: '#1A1A1A',
    margin: '0 0 20px',
    lineHeight: 1.5,
  },
  btn: {
    background: '#2563EB',
    color: '#fff',
    border: '2px solid #1D4ED8',
    borderRadius: 4,
    padding: 'clamp(12px, 3vw, 16px) 0',
    fontSize: 'clamp(16px, 4vw, 19px)',
    fontWeight: 700,
    cursor: 'pointer',
    touchAction: 'manipulation',
    WebkitTapHighlightColor: 'transparent',
    width: '100%',
    fontFamily: 'inherit',
    letterSpacing: 1,
  },
};
