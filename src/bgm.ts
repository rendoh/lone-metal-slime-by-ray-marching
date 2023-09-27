import * as Tone from 'tone';
import { Note } from 'tone/build/esm/core/type/NoteUnits';
import { Time } from 'tone/build/esm/core/type/Units';

import { loneMetalSlime } from './lone-metal-slime/LoneMetalSlime';

let isPlaying = false;
document.querySelector('button')?.addEventListener('click', async (e) => {
  await Tone.start();
  isPlaying = !isPlaying;
  if (isPlaying) {
    ch1.start();
    ch2.start();
    ch3.start();
    Tone.Transport.start();
  } else {
    Tone.Transport.stop();
  }
  (e.target as HTMLElement).textContent = isPlaying ? '♪ Stop' : '♪ Play';
});

function $(note: Note, duration: Time) {
  return { note, duration };
}

const ch1Synth = new Tone.Synth({
  volume: -8,
  oscillator: {
    type: 'fmsquare8',
  },
}).toDestination();

const ch1 = new Tone.Sequence(
  (time, t) => {
    if (!t) return;
    const { note, duration } = t;
    ch1Synth.triggerAttackRelease(
      note,
      Tone.Time(duration).toSeconds() / 2.5,
      time,
    );
    Tone.Draw.schedule(() => {
      loneMetalSlime.openMouth();
    }, time);
  },
  [
    [$('E4', '8t'), $('E4', '8t'), $('E4', '8t')],
    // 1
    $('A4', '4n.'),
    [null, [null, $('B4', '16t'), $('C5', '16t')]],
    $('B4', '4n.'),
    [null, [null, $('C5', '16t'), $('D5', '16t')]],
    // 2
    $('C5', '4n.'),
    [null, [null, $('B4', '16t'), $('A4', '16t')]],
    $('B4', '8n'),
    [$('E4', '8n'), null, $('E4', '8n')],
    // 3
    [$('A4', '8t'), $('C#5', '8t'), $('E5', '8t')],
    $('G5', '2n'),
    null,
    [$('G5', '8t'), $('F5', '8t'), $('E5', '8t')],
    // 4
    $('D5', '2n.'),
    null,
    null,
    [$('D5', '8t'), $('D5', '8t'), $('E5', '8t')],
    // 5
    $('F5', '2n.'),
    null,
    null,
    [$('B4', '8t'), $('E5', '8t'), $('D5', '8t')],
    // 6
    $('C5', '2n.'),
    null,
    null,
    [$('C5', '8t'), $('C5', '8t'), $('E5', '8t')],
    // 7
    $('D5', '4n'),
    [$('A4', '8t'), $('A4', '8t'), $('A4', '8t')],
    $('A4', '4n'),
    $('C5', '4n'),
    // 8
    $('C5', '2n'),
    null,
    $('B4', '4n'),
    $('E5', '4n'),
    // 9
    $('F5', '2n.'),
    null,
    null,
    $('A4', '4n'),
    // 10
    $('B4', '2n'),
    null,
    [null, null, $('A5', '8t')],
    [$('G5', '4t'), null, $('F5', '8t')],
    // 11
    $('E5', '2n.'),
    null,
    null,
    $('G4', '4n'),
    // 12
    $('A4', '2n.'),
    null,
    [null, null, $('B4', '8t')],
    [$('C5', '4t'), null, $('D5', '8t')],
    // 13
    [$('E5', '8t'), $('C5', '8t'), $('C5', '8t')],
    [$('D5', '8t'), null, $('C5', '8t')],
    [$('E5', '8t'), $('C5', '8t'), $('C5', '8t')],
    [$('D5', '8t'), null, $('C5', '8t')],
    // 14
    [$('E5', '8t'), $('C5', '8t'), $('C5', '8t')],
    [$('D5', '8t'), null, $('C5', '8t')],
    [$('A5', '8t'), $('C5', '8t'), $('C5', '8t')],
    [$('D5', '8t'), null, $('C5', '8t')],
    // 15
    [$('C5', '8t'), null, $('C5', '8t')],
    $('B4', '4n'),
    [$('B4', '8t'), null, $('B4', '8t')],
    $('A4', '4n'),
    // 16
    [$('A4', '8t'), null, $('A4', '8t')],
    $('G4', '4n'),
    [$('G4', '8t'), null, $('G4', '8t')],
    $('F4', '4n'),
    // 17
    $('E4', '4n.'),
    [null, [null, $('E4', '16t'), $('E4', '16t')]],
    $('E4', '4n.'),
    [null, [null, $('E4', '16t'), $('E4', '16t')]],
    // 18
    $('E4', '4n.'),
    [null, [null, $('E4', '16t'), $('E4', '16t')]],
    $('E4', '8n'),
  ],
);

const ch2Synth = new Tone.Synth({
  volume: -10,
  oscillator: {
    type: 'fmsquare8',
  },
  envelope: {
    attack: ch1Synth.envelope.attack,
    decay: ch1Synth.envelope.decay,
    sustain: ch1Synth.envelope.sustain,
    release: ch1Synth.envelope.release,
  },
}).toDestination();

const ch2 = new Tone.Sequence(
  (time, t) => {
    if (!t) return;
    const { note, duration } = t;
    ch2Synth.triggerAttackRelease(
      note,
      Tone.Time(duration).toSeconds() / 2.5,
      time,
    );
  },
  [
    null,
    // 1
    $('C4', '4n'),
    $('C4', '4n'),
    $('E4', '4n'),
    $('E4', '4n'),
    // 2
    $('E4', '4n'),
    $('E4', '4n'),
    $('E4', '4n'),
    $('D4', '4n'),
    // 3
    $('C#4', '4n'),
    $('D4', '4n'),
    $('E4', '4n'),
    $('C#4', '4n'),
    // 4
    [$('F4', '8n'), [$('A4', '16t'), $('A4', '16t'), $('A4', '16t')]],
    [$('Bb4', '8t'), $('Bb4', '8t'), $('Bb4', '8t')],
    [$('B4', '8t'), $('B4', '8t'), $('B4', '8t')],
    [$('Bb4', '8t'), $('Bb4', '8t'), $('Bb4', '8t')],
    // 5
    $('A4', '2n.'),
    null,
    null,
    $('G#4', '4n'),
    // 6
    $('E4', '2n.'),
    null,
    null,
    [$('E4', '8t'), $('E4', '8t'), $('G4', '8t')],
    // 7
    $('A4', '4n'),
    [$('D4', '8t'), $('D4', '8t'), $('D4', '8t')],
    $('F#4', '4n'),
    $('F#4', '4n'),
    // 8
    $('F4', '2n'),
    null,
    $('E4', '4n'),
    $('G#4', '4n'),
    // 9
    null,
    [$('A3', '8t'), $('A3', '8t'), $('A3', '8t')],
    $('A3', '4n'),
    null,
    // 10
    null,
    [$('D4', '8t'), $('D4', '8t'), $('D4', '8t')],
    [$('D4', '4n'), null, $('F4', '8t')],
    [$('E4', '8n'), null, $('D4', '8t')],
    // 11
    $('C4', '4n'),
    [$('G3', '8t'), $('G3', '8t'), $('G3', '8t')],
    $('G3', '4n'),
    null,
    // 12
    null,
    [$('C4', '8t'), $('C4', '8t'), $('C4', '8t')],
    $('C4', '4n'),
    null,
    // 13
    $('A4', '2n'),
    null,
    $('Ab4', '2n'),
    null,
    // 14
    $('G4', '2n'),
    null,
    $('Gb4', '2n'),
    null,
    // 15
    $('F4', '2n'),
    null,
    $('E4', '2n'),
    null,
    // 16
    $('Eb4', '2n'),
    null,
    $('D4', '2n'),
    null,
    // 17
    null,
    $('B3', '4n'),
    null,
    $('B3', '4n'),
    // 18
    null,
    $('B3', '4n'),
    $('B3', '4n'),
  ],
);

const ch3Synth = new Tone.Synth({
  volume: -4,
  oscillator: {
    type: 'triangle',
  },
}).toDestination();

const ch3 = new Tone.Sequence(
  (time, t) => {
    if (!t) return;
    const { note, duration } = t;
    ch3Synth.triggerAttackRelease(
      note,
      Tone.Time(duration).toSeconds() / 2,
      time,
    );
    Tone.Draw.schedule(() => {
      loneMetalSlime.bounce();
    }, time);
  },
  [
    null,
    // 1
    $('A2', '4n'),
    $('A3', '4n'),
    $('G#3', '4n'),
    $('G#2', '4n'),
    // 2
    $('A2', '4n'),
    $('A3', '4n'),
    $('G#3', '4n'),
    $('G#2', '4n'),
    // 3
    $('A2', '4n'),
    $('B2', '4n'),
    $('C#3', '4n'),
    $('A2', '4n'),
    // 4
    [$('D3', '4n'), [$('F4', '16t'), $('F4', '16t'), $('F4', '16t')]],
    [$('F4', '8t'), $('F4', '8t'), $('F4', '8t')],
    [$('F4', '8t'), $('F4', '8t'), $('F4', '8t')],
    [$('F4', '8t'), $('F4', '8t'), $('F4', '8t')],
    // 5
    $('B3', '4n'),
    $('D4', '4n'),
    $('D3', '4n'),
    $('E3', '4n'),
    // 6
    $('A2', '4n'),
    $('A3', '4n'),
    $('G3', '4n'),
    $('G3', '4n'),
    // 7
    $('F#3', '4n'),
    $('F#3', '4n'),
    $('D3', '4n'),
    $('D3', '4n'),
    // 8
    $('G3', '4n'),
    $('G3', '4n'),
    $('G#3', '4n'),
    $('E3', '4n'),
    // 9
    null,
    [$('D3', '8t'), $('D3', '8t'), $('D3', '8t')],
    $('D3', '4n'),
    null,
    // 10
    null,
    [$('G3', '8t'), $('G3', '8t'), $('G3', '8t')],
    $('G3', '4n'),
    null,
    // 11
    null,
    [$('C3', '8t'), $('C3', '8t'), $('C3', '8t')],
    $('C3', '4n'),
    null,
    // 12
    null,
    [$('F3', '8t'), $('F3', '8t'), $('F3', '8t')],
    $('F3', '4n'),
    null,
    // 13
    $('F#4', '2n'),
    null,
    $('F4', '2n'),
    null,
    // 14
    $('E4', '2n'),
    null,
    $('Eb4', '2n'),
    null,
    // 15
    $('D4', '2n'),
    null,
    $('C#4', '2n'),
    null,
    // 16
    $('C4', '2n'),
    null,
    $('B3', '2n'),
    null,
    // 17
    null,
    $('A3', '4n'),
    null,
    $('G#3', '4n'),
    // 18
    null,
    $('A3', '4n'),
    $('G#3', '4n'),
  ],
);

Tone.Transport.bpm.value = 60;
