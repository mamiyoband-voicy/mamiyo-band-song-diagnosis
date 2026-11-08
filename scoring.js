const SALES_URL = 'https://linkco.re/qPa6F1zE';

export const MODES = {
  A: {
    name: 'ときめき点火モード',
    line: '今は、気持ちを前へ押し出す音がほしい。',
    song: '悪魔がやってくる',
    note: '迷いや停滞を振り切って、今の自分を動かしたい時の一曲。',
    freeUrl: 'https://youtu.be/u9nmOD5nm6Q',
  },
  B: {
    name: 'そっと抱きしめモード',
    line: '今は、頑張った自分の気持ちをそのまま受け止めたい。',
    song: 'おやすみ',
    note: '一日の終わりに、少しだけ心をゆるめたい時の一曲。',
    freeUrl: 'https://youtu.be/rQX6LuqO8Zo',
  },
  C: {
    name: '言葉を噛みしめモード',
    line: '今は、自分の中にある答えや理由を静かに見つけたい。',
    song: '理由',
    note: '立ち止まって、自分の気持ちとこれからを見つめ直したい時の一曲。',
    freeUrl: 'https://youtu.be/OdJyGhsO3VU',
  },
  D: {
    name: 'クセになるモード',
    line: '今は、いつもの気分を少しだけ揺らしてくれる音がほしい。',
    song: 'アイスクリーム中毒',
    note: 'ちょっと不思議で、何度も聴きたくなる世界へ入りたい時の一曲。',
    freeUrl: 'https://youtu.be/qM32aGRV06E',
  },
  E: {
    name: '人生の主人公モード',
    line: '今は、自分の物語をもう一度、主役として始めたい。',
    song: 'シネマ',
    note: '失恋しても、夢に届かなくても、自分の次のシーンへ進みたい時の一曲。',
    freeUrl: 'https://youtu.be/t5r9m88jTyQ',
  },
};

export function recommend(answers) {
  if (!Array.isArray(answers) || answers.length !== 5) throw new Error('5 answers are required');
  if (answers.some((answer) => !MODES[answer])) throw new Error('answers must be A, B, or C');
  const counts = Object.fromEntries(Object.keys(MODES).map((key) => [key, 0]));
  answers.forEach((answer) => { counts[answer] += 1; });
  const max = Math.max(...Object.values(counts));
  const tiedKeys = Object.keys(MODES).filter((key) => counts[key] === max);
  const key = answers.find((answer) => tiedKeys.includes(answer));
  return { key, ...MODES[key], counts, tiedKeys };
}

export function shuffleChoices(choices, random = Math.random) {
  const shuffled = [...choices];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const target = Math.floor(random() * (index + 1));
    [shuffled[index], shuffled[target]] = [shuffled[target], shuffled[index]];
  }
  return shuffled;
}

export function shuffleQuestions(questions, random = Math.random) {
  return shuffleChoices(questions, random);
}
