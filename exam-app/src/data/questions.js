// 小学校受験 図形・空間認識 問題データ

export const QUESTION_TYPES = {
  SAME_SHAPE: 'same_shape',       // 同じ形を選ぶ
  ROTATION: 'rotation',           // 回転した形を選ぶ
  SYMMETRY: 'symmetry',           // 対称な形
  COUNT_SHAPES: 'count_shapes',   // 形の数を数える
  ODD_ONE_OUT: 'odd_one_out',     // 仲間はずれ
};

// SVGパス定義 (簡単な図形)
const SHAPES = {
  circle: { type: 'circle', cx: 50, cy: 50, r: 30 },
  square: { type: 'rect', x: 20, y: 20, width: 60, height: 60 },
  triangle: { type: 'polygon', points: '50,15 85,85 15,85' },
  rectangle: { type: 'rect', x: 10, y: 25, width: 80, height: 50 },
  diamond: { type: 'polygon', points: '50,10 90,50 50,90 10,50' },
  star: { type: 'polygon', points: '50,5 61,35 95,35 68,57 79,91 50,70 21,91 32,57 5,35 39,35' },
  pentagon: { type: 'polygon', points: '50,10 90,38 76,85 24,85 10,38' },
  cross: { type: 'path', d: 'M35,10 H65 V35 H90 V65 H65 V90 H35 V65 H10 V35 H35 Z' },
};

export const questions = [
  // === 同じ形を選ぶ問題 ===
  {
    id: 1,
    type: QUESTION_TYPES.SAME_SHAPE,
    question: '左の形と同じ形はどれですか？',
    target: { shape: 'triangle', color: '#4A90D9', rotation: 0 },
    choices: [
      { shape: 'circle', color: '#E74C3C', rotation: 0, correct: false },
      { shape: 'triangle', color: '#2ECC71', rotation: 0, correct: true },
      { shape: 'square', color: '#9B59B6', rotation: 0, correct: false },
      { shape: 'diamond', color: '#F39C12', rotation: 0, correct: false },
    ],
  },
  {
    id: 2,
    type: QUESTION_TYPES.SAME_SHAPE,
    question: '左の形と同じ形はどれですか？',
    target: { shape: 'star', color: '#E74C3C', rotation: 0 },
    choices: [
      { shape: 'pentagon', color: '#3498DB', rotation: 0, correct: false },
      { shape: 'diamond', color: '#E67E22', rotation: 0, correct: false },
      { shape: 'star', color: '#1ABC9C', rotation: 0, correct: true },
      { shape: 'cross', color: '#9B59B6', rotation: 0, correct: false },
    ],
  },

  // === 回転した形を選ぶ問題 ===
  {
    id: 3,
    type: QUESTION_TYPES.ROTATION,
    question: '左の形を右に90度まわすと、どれになりますか？',
    target: { shape: 'triangle', color: '#4A90D9', rotation: 0 },
    choices: [
      { shape: 'triangle', color: '#E74C3C', rotation: 90, correct: true },
      { shape: 'triangle', color: '#2ECC71', rotation: 180, correct: false },
      { shape: 'triangle', color: '#9B59B6', rotation: 270, correct: false },
      { shape: 'triangle', color: '#F39C12', rotation: 45, correct: false },
    ],
  },
  {
    id: 4,
    type: QUESTION_TYPES.ROTATION,
    question: '左の形を180度まわすと、どれになりますか？',
    target: { shape: 'pentagon', color: '#E74C3C', rotation: 0 },
    choices: [
      { shape: 'pentagon', color: '#3498DB', rotation: 90, correct: false },
      { shape: 'pentagon', color: '#E67E22', rotation: 180, correct: true },
      { shape: 'pentagon', color: '#1ABC9C', rotation: 45, correct: false },
      { shape: 'pentagon', color: '#9B59B6', rotation: 270, correct: false },
    ],
  },

  // === 対称な形 ===
  {
    id: 5,
    type: QUESTION_TYPES.SYMMETRY,
    question: '線でおったとき、ぴったり重なる形はどれですか？',
    choices: [
      { shape: 'circle', color: '#3498DB', symmetric: true, correct: true },
      { shape: 'cross', color: '#E74C3C', symmetric: true, correct: true },
      { shape: 'triangle', color: '#2ECC71', symmetric: true, correct: true },
      { shape: 'star', color: '#F39C12', symmetric: true, correct: true },
    ],
    correctAnswer: 'all',
    note: 'すべて線対称な形です',
  },

  // === 形の数を数える問題 ===
  {
    id: 6,
    type: QUESTION_TYPES.COUNT_SHAPES,
    question: '三角形はいくつありますか？',
    shapeGroups: [
      { shape: 'triangle', count: 3, color: '#4A90D9' },
      { shape: 'circle', count: 2, color: '#E74C3C' },
      { shape: 'square', count: 4, color: '#2ECC71' },
    ],
    targetShape: 'triangle',
    correctCount: 3,
    choices: [1, 2, 3, 4],
  },
  {
    id: 7,
    type: QUESTION_TYPES.COUNT_SHAPES,
    question: '丸はいくつありますか？',
    shapeGroups: [
      { shape: 'circle', count: 5, color: '#E74C3C' },
      { shape: 'triangle', count: 2, color: '#4A90D9' },
      { shape: 'square', count: 3, color: '#2ECC71' },
    ],
    targetShape: 'circle',
    correctCount: 5,
    choices: [3, 4, 5, 6],
  },

  // === 仲間はずれ問題 ===
  {
    id: 8,
    type: QUESTION_TYPES.ODD_ONE_OUT,
    question: 'なかまはずれはどれですか？（角のある形の中に丸が1つ）',
    choices: [
      { shape: 'square', color: '#3498DB', correct: false },
      { shape: 'triangle', color: '#E74C3C', correct: false },
      { shape: 'circle', color: '#2ECC71', correct: true },
      { shape: 'diamond', color: '#F39C12', correct: false },
    ],
    hint: '角（かど）がない形はどれ？',
  },
  {
    id: 9,
    type: QUESTION_TYPES.ODD_ONE_OUT,
    question: 'なかまはずれはどれですか？（5つ以上の角を持つ形）',
    choices: [
      { shape: 'pentagon', color: '#9B59B6', correct: false },
      { shape: 'star', color: '#E74C3C', correct: false },
      { shape: 'triangle', color: '#3498DB', correct: true },
      { shape: 'cross', color: '#2ECC71', correct: false },
    ],
    hint: '角の数が少ない形はどれ？',
  },
];

export const SHAPE_DEFS = SHAPES;
