import test from 'node:test';
import assert from 'node:assert/strict';
import { recommend, shuffleChoices, shuffleQuestions } from '../scoring.js';

test('recommends 悪魔がやってくる for an energy-first listening mood', () => {
  const result = recommend(['A', 'A', 'A', 'B', 'A']);
  assert.equal(result.key, 'A');
  assert.equal(result.song, '悪魔がやってくる');
});

test('recommends おやすみ for a comfort-first listening mood', () => {
  const result = recommend(['B', 'B', 'C', 'B', 'B']);
  assert.equal(result.key, 'B');
  assert.equal(result.song, 'おやすみ');
});

test('recommends 理由 for a reflection-first listening mood', () => {
  const result = recommend(['C', 'C', 'B', 'C', 'C']);
  assert.equal(result.key, 'C');
  assert.equal(result.song, '理由');
});

test('recommends アイスクリーム中毒 for a story-first listening mood', () => {
  const result = recommend(['D', 'D', 'D', 'B', 'C']);
  assert.equal(result.key, 'D');
  assert.equal(result.song, 'アイスクリーム中毒');
});

test('recommends シネマ for a protagonist-first listening mood', () => {
  const result = recommend(['E', 'E', 'A', 'E', 'C']);
  assert.equal(result.key, 'E');
  assert.equal(result.song, 'シネマ');
});

test('keeps the earliest answer among tied moods as a primary recommendation', () => {
  const result = recommend(['C', 'A', 'B', 'A', 'C']);
  assert.equal(result.key, 'C');
  assert.deepEqual(result.tiedKeys, ['A', 'C']);
});

test('rejects incomplete answer sets', () => {
  assert.throws(() => recommend(['A', 'B']), /5 answers/);
});


test('shuffles question order without losing a question', () => {
  const questions = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];
  const values = [0, 0, 0, 0];
  const shown = shuffleQuestions(questions, () => values.shift());
  assert.deepEqual(shown.map((question) => question.id), [2, 3, 4, 5, 1]);
  assert.deepEqual(shown.map((question) => question.id).sort(), [1, 2, 3, 4, 5]);
});
