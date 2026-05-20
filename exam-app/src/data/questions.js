// しょうがっこうじゅけん ずけいもんだい データ

export const QUESTION_TYPES = {
  SAME_SHAPE:  'SAME_SHAPE',
  ROTATION:    'ROTATION',
  COUNT:       'COUNT',
  ODD_ONE_OUT: 'ODD_ONE_OUT',
  PATTERN:     'PATTERN',
};

export const questions = [
  // =============================================
  // おなじかたちはどれですか？ (4もん)
  // =============================================
  {
    id: 1,
    type: QUESTION_TYPES.SAME_SHAPE,
    question: 'もんだいのかたちと おなじかたちは どれですか？',
    target: { shape: 'triangle', color: '#3498DB', rotation: 0 },
    choices: [
      { shape: 'circle',   color: '#E74C3C', rotation: 0,  correct: false },
      { shape: 'triangle', color: '#2ECC71', rotation: 0,  correct: true  },
      { shape: 'square',   color: '#9B59B6', rotation: 0,  correct: false },
      { shape: 'diamond',  color: '#F39C12', rotation: 0,  correct: false },
    ],
  },
  {
    id: 2,
    type: QUESTION_TYPES.SAME_SHAPE,
    question: 'もんだいのかたちと おなじかたちは どれですか？',
    target: { shape: 'star', color: '#E74C3C', rotation: 0 },
    choices: [
      { shape: 'pentagon', color: '#3498DB', rotation: 0, correct: false },
      { shape: 'diamond',  color: '#E67E22', rotation: 0, correct: false },
      { shape: 'star',     color: '#1ABC9C', rotation: 0, correct: true  },
      { shape: 'cross',    color: '#9B59B6', rotation: 0, correct: false },
    ],
  },
  {
    id: 3,
    type: QUESTION_TYPES.SAME_SHAPE,
    question: 'もんだいのかたちと おなじかたちは どれですか？',
    target: { shape: 'pentagon', color: '#9B59B6', rotation: 0 },
    choices: [
      { shape: 'pentagon',  color: '#E74C3C', rotation: 0, correct: true  },
      { shape: 'star',      color: '#3498DB', rotation: 0, correct: false },
      { shape: 'circle',    color: '#2ECC71', rotation: 0, correct: false },
      { shape: 'rectangle', color: '#F39C12', rotation: 0, correct: false },
    ],
  },
  {
    id: 4,
    type: QUESTION_TYPES.SAME_SHAPE,
    question: 'もんだいのかたちと おなじかたちは どれですか？',
    target: { shape: 'cross', color: '#1ABC9C', rotation: 0 },
    choices: [
      { shape: 'square',  color: '#E74C3C', rotation: 0, correct: false },
      { shape: 'diamond', color: '#9B59B6', rotation: 0, correct: false },
      { shape: 'cross',   color: '#F39C12', rotation: 0, correct: true  },
      { shape: 'circle',  color: '#3498DB', rotation: 0, correct: false },
    ],
  },
  {
    id: 5,
    type: QUESTION_TYPES.SAME_SHAPE,
    question: 'もんだいのかたちと おなじかたちは どれですか？',
    target: { shape: 'diamond', color: '#E67E22', rotation: 0 },
    choices: [
      { shape: 'square',   color: '#E74C3C', rotation: 0, correct: false },
      { shape: 'triangle', color: '#2ECC71', rotation: 0, correct: false },
      { shape: 'diamond',  color: '#9B59B6', rotation: 0, correct: true  },
      { shape: 'circle',   color: '#3498DB', rotation: 0, correct: false },
    ],
  },

  // =============================================
  // まわすとどれですか？ (4もん)
  // =============================================
  {
    id: 6,
    type: QUESTION_TYPES.ROTATION,
    question: 'このかたちを みぎに 90ど まわすと どれになりますか？',
    target: { shape: 'triangle', color: '#3498DB', rotation: 0 },
    choices: [
      { shape: 'triangle', color: '#E74C3C', rotation: 90,  correct: true  },
      { shape: 'triangle', color: '#2ECC71', rotation: 180, correct: false },
      { shape: 'triangle', color: '#9B59B6', rotation: 270, correct: false },
      { shape: 'triangle', color: '#F39C12', rotation: 45,  correct: false },
    ],
  },
  {
    id: 7,
    type: QUESTION_TYPES.ROTATION,
    question: 'このかたちを 180ど まわすと どれになりますか？',
    target: { shape: 'pentagon', color: '#E74C3C', rotation: 0 },
    choices: [
      { shape: 'pentagon', color: '#3498DB', rotation: 90,  correct: false },
      { shape: 'pentagon', color: '#E67E22', rotation: 180, correct: true  },
      { shape: 'pentagon', color: '#1ABC9C', rotation: 45,  correct: false },
      { shape: 'pentagon', color: '#9B59B6', rotation: 270, correct: false },
    ],
  },
  {
    id: 8,
    type: QUESTION_TYPES.ROTATION,
    question: 'このかたちを みぎに 90ど まわすと どれになりますか？',
    target: { shape: 'rectangle', color: '#9B59B6', rotation: 0 },
    choices: [
      { shape: 'rectangle', color: '#E74C3C', rotation: 45,  correct: false },
      { shape: 'rectangle', color: '#2ECC71', rotation: 90,  correct: true  },
      { shape: 'rectangle', color: '#F39C12', rotation: 180, correct: false },
      { shape: 'rectangle', color: '#3498DB', rotation: 270, correct: false },
    ],
  },
  {
    id: 9,
    type: QUESTION_TYPES.ROTATION,
    question: 'このかたちを 180ど まわすと どれになりますか？',
    target: { shape: 'triangle', color: '#E67E22', rotation: 0 },
    choices: [
      { shape: 'triangle', color: '#3498DB', rotation: 90,  correct: false },
      { shape: 'triangle', color: '#9B59B6', rotation: 45,  correct: false },
      { shape: 'triangle', color: '#1ABC9C', rotation: 180, correct: true  },
      { shape: 'triangle', color: '#E74C3C', rotation: 270, correct: false },
    ],
  },
  {
    id: 10,
    type: QUESTION_TYPES.ROTATION,
    question: 'このかたちを みぎに 90ど まわすと どれになりますか？',
    target: { shape: 'rectangle', color: '#2ECC71', rotation: 0 },
    choices: [
      { shape: 'rectangle', color: '#E74C3C', rotation: 0,   correct: false },
      { shape: 'rectangle', color: '#9B59B6', rotation: 45,  correct: false },
      { shape: 'rectangle', color: '#F39C12', rotation: 90,  correct: true  },
      { shape: 'rectangle', color: '#3498DB', rotation: 180, correct: false },
    ],
  },

  // =============================================
  // いくつありますか？ (4もん)
  // =============================================
  {
    id: 11,
    type: QUESTION_TYPES.COUNT,
    question: 'さんかくは いくつ ありますか？',
    shapeGroups: [
      { shape: 'triangle', color: '#3498DB', count: 3 },
      { shape: 'circle',   color: '#E74C3C', count: 2 },
      { shape: 'square',   color: '#2ECC71', count: 4 },
    ],
    targetShape: 'triangle',
    targetShapeLabel: 'さんかく',
    correctCount: 3,
    choices: [2, 3, 4, 5],
  },
  {
    id: 12,
    type: QUESTION_TYPES.COUNT,
    question: 'まるは いくつ ありますか？',
    shapeGroups: [
      { shape: 'circle',   color: '#E74C3C', count: 5 },
      { shape: 'triangle', color: '#3498DB', count: 2 },
      { shape: 'square',   color: '#2ECC71', count: 3 },
    ],
    targetShape: 'circle',
    targetShapeLabel: 'まる',
    correctCount: 5,
    choices: [3, 4, 5, 6],
  },
  {
    id: 13,
    type: QUESTION_TYPES.COUNT,
    question: 'しかくは いくつ ありますか？',
    shapeGroups: [
      { shape: 'square',   color: '#9B59B6', count: 4 },
      { shape: 'diamond',  color: '#E74C3C', count: 3 },
      { shape: 'pentagon', color: '#F39C12', count: 2 },
    ],
    targetShape: 'square',
    targetShapeLabel: 'しかく',
    correctCount: 4,
    choices: [2, 3, 4, 5],
  },
  {
    id: 14,
    type: QUESTION_TYPES.COUNT,
    question: 'ほしは いくつ ありますか？',
    shapeGroups: [
      { shape: 'star',     color: '#E67E22', count: 6 },
      { shape: 'circle',   color: '#1ABC9C', count: 3 },
      { shape: 'triangle', color: '#3498DB', count: 2 },
    ],
    targetShape: 'star',
    targetShapeLabel: 'ほし',
    correctCount: 6,
    choices: [4, 5, 6, 7],
  },
  {
    id: 15,
    type: QUESTION_TYPES.COUNT,
    question: 'ひしがたは いくつ ありますか？',
    shapeGroups: [
      { shape: 'diamond',  color: '#E74C3C', count: 4 },
      { shape: 'circle',   color: '#3498DB', count: 3 },
      { shape: 'triangle', color: '#2ECC71', count: 5 },
    ],
    targetShape: 'diamond',
    targetShapeLabel: 'ひしがた',
    correctCount: 4,
    choices: [3, 4, 5, 6],
  },

  // =============================================
  // なかまはずれはどれですか？ (4もん)
  // =============================================
  {
    id: 16,
    type: QUESTION_TYPES.ODD_ONE_OUT,
    question: 'なかまはずれは どれですか？',
    choices: [
      { shape: 'square',   color: '#3498DB', correct: false },
      { shape: 'triangle', color: '#E74C3C', correct: false },
      { shape: 'circle',   color: '#2ECC71', correct: true  },
      { shape: 'diamond',  color: '#F39C12', correct: false },
    ],
    hint: 'かどが ないかたちは どれかな？',
  },
  {
    id: 17,
    type: QUESTION_TYPES.ODD_ONE_OUT,
    question: 'なかまはずれは どれですか？',
    choices: [
      { shape: 'pentagon', color: '#9B59B6', correct: false },
      { shape: 'star',     color: '#E74C3C', correct: false },
      { shape: 'triangle', color: '#3498DB', correct: true  },
      { shape: 'cross',    color: '#2ECC71', correct: false },
    ],
    hint: 'かどが いちばん すくないのは どれかな？',
  },
  {
    id: 18,
    type: QUESTION_TYPES.ODD_ONE_OUT,
    question: 'なかまはずれは どれですか？',
    choices: [
      { shape: 'circle',    color: '#E74C3C', correct: false },
      { shape: 'rectangle', color: '#3498DB', correct: true  },
      { shape: 'circle',    color: '#2ECC71', correct: false },
      { shape: 'circle',    color: '#F39C12', correct: false },
    ],
    hint: 'まるい かたちでは ないのは どれかな？',
  },
  {
    id: 19,
    type: QUESTION_TYPES.ODD_ONE_OUT,
    question: 'なかまはずれは どれですか？',
    choices: [
      { shape: 'triangle', color: '#3498DB', correct: false },
      { shape: 'triangle', color: '#E74C3C', correct: false },
      { shape: 'star',     color: '#2ECC71', correct: true  },
      { shape: 'triangle', color: '#9B59B6', correct: false },
    ],
    hint: 'さんかくでは ないのは どれかな？',
  },
  {
    id: 20,
    type: QUESTION_TYPES.ODD_ONE_OUT,
    question: 'なかまはずれは どれですか？',
    choices: [
      { shape: 'square',   color: '#E74C3C', correct: false },
      { shape: 'square',   color: '#3498DB', correct: false },
      { shape: 'square',   color: '#2ECC71', correct: false },
      { shape: 'pentagon', color: '#F39C12', correct: true  },
    ],
    hint: 'しかくでは ないのは どれかな？',
  },

  // =============================================
  // つぎにくるかたちは？ (5もん)
  // =============================================
  {
    id: 21,
    type: QUESTION_TYPES.PATTERN,
    question: 'つぎにくる かたちは どれですか？',
    pattern: [
      { shape: 'circle',   color: '#E74C3C' },
      { shape: 'square',   color: '#3498DB' },
      { shape: 'circle',   color: '#E74C3C' },
      { shape: 'square',   color: '#3498DB' },
      null,
    ],
    choices: [
      { shape: 'circle',   color: '#E74C3C', correct: true  },
      { shape: 'triangle', color: '#2ECC71', correct: false },
      { shape: 'square',   color: '#3498DB', correct: false },
      { shape: 'diamond',  color: '#F39C12', correct: false },
    ],
  },
  {
    id: 22,
    type: QUESTION_TYPES.PATTERN,
    question: 'つぎにくる かたちは どれですか？',
    pattern: [
      { shape: 'triangle', color: '#3498DB' },
      { shape: 'triangle', color: '#3498DB' },
      { shape: 'circle',   color: '#E74C3C' },
      { shape: 'triangle', color: '#3498DB' },
      null,
    ],
    choices: [
      { shape: 'square',   color: '#2ECC71', correct: false },
      { shape: 'triangle', color: '#3498DB', correct: true  },
      { shape: 'circle',   color: '#E74C3C', correct: false },
      { shape: 'star',     color: '#F39C12', correct: false },
    ],
  },
  {
    id: 23,
    type: QUESTION_TYPES.PATTERN,
    question: 'つぎにくる かたちは どれですか？',
    pattern: [
      { shape: 'square',   color: '#2ECC71' },
      { shape: 'circle',   color: '#F39C12' },
      { shape: 'triangle', color: '#9B59B6' },
      { shape: 'square',   color: '#2ECC71' },
      null,
    ],
    choices: [
      { shape: 'triangle', color: '#9B59B6', correct: false },
      { shape: 'square',   color: '#2ECC71', correct: false },
      { shape: 'circle',   color: '#F39C12', correct: true  },
      { shape: 'diamond',  color: '#E74C3C', correct: false },
    ],
  },
  {
    id: 24,
    type: QUESTION_TYPES.PATTERN,
    question: 'つぎにくる かたちは どれですか？',
    pattern: [
      { shape: 'star',     color: '#E74C3C' },
      { shape: 'pentagon', color: '#3498DB' },
      { shape: 'star',     color: '#E74C3C' },
      { shape: 'pentagon', color: '#3498DB' },
      null,
    ],
    choices: [
      { shape: 'pentagon', color: '#3498DB', correct: false },
      { shape: 'diamond',  color: '#2ECC71', correct: false },
      { shape: 'circle',   color: '#F39C12', correct: false },
      { shape: 'star',     color: '#E74C3C', correct: true  },
    ],
  },
  {
    id: 25,
    type: QUESTION_TYPES.PATTERN,
    question: 'つぎにくる かたちは どれですか？',
    pattern: [
      { shape: 'circle',   color: '#1ABC9C' },
      { shape: 'circle',   color: '#E74C3C' },
      { shape: 'circle',   color: '#1ABC9C' },
      { shape: 'circle',   color: '#E74C3C' },
      null,
    ],
    choices: [
      { shape: 'circle',   color: '#E74C3C', correct: false },
      { shape: 'circle',   color: '#1ABC9C', correct: true  },
      { shape: 'square',   color: '#1ABC9C', correct: false },
      { shape: 'triangle', color: '#E74C3C', correct: false },
    ],
  },
];
