ThemeGen = {
  notes: [
    'a/3', 'b/3',
    'c/4', 'd/4', 'e/4', 'f/4', 'g/4', 'a/4', 'b/4',
    'c/5', 'd/5', 'e/5', 'f/5', 'g/5', 'a/5', 'b/5',
    'c/6'
  ],

  leading_notes: [
    'b/3', 'd/4', 'b/4', 'd/5', 'b/5'
  ],


  biggest_step: 2,

  draw_score: function () {
    VF = Vex.Flow;
    var div = document.getElementById("score");
    var renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);
    renderer.resize(1000, 150);
    var context = renderer.getContext();
    var stave = new VF.Stave(10, 10, 1000);
    stave.addClef("treble").addTimeSignature("4/4");
    stave.setContext(context).draw();

    beams = [];

    var voice = new VF.Voice({num_beats: 4, beat_value: 4, resolution: Vex.Flow.RESOLUTION});
    voice.setStrict(false);
    var notes = ThemeGen.generate();
    voice.addTickables(notes);

    new VF.Formatter().joinVoices([voice]).format([voice], 900);
    voice.draw(context, stave);
    beams.forEach(function (b) {
      b.setContext(context).draw()
    });
  },

  generate: function () {
    current_note_index = 9;

    var notes = [ThemeGen.create_note('c/5', 'q')];

    ThemeGen.choose_notes(3, notes);
    notes.push(new Vex.Flow.BarNote());

    ThemeGen.choose_notes(4, notes);
    notes.push(new Vex.Flow.BarNote());

    ThemeGen.choose_notes(4, notes);
    notes.push(new Vex.Flow.BarNote());

    ThemeGen.choose_notes(2, notes);

    var leading_note = ThemeGen.choose_leading_note();
    notes.push(ThemeGen.create_note(leading_note, 'q'));
    notes.push(ThemeGen.create_note(ThemeGen.choose_last_note(leading_note), 'q'));
    return notes;
  },

  rhythmic_figures: [
    ['q'],
    ['q'],
    ['q'],
    ['q'],
    ['q'],
    ['8', '8'],
    ['8', '8'],
    ['8', '8'],
    ['8', '16', '16'],
    ['16', '16', '16', '16'],
    ['8d', '16'],
    ['8d', '16']
  ],

  choose_notes: function (beats, notes) {
    console.log('adding ' + beats + 'beats worth of notes')
    do {
      var beat_notes = [];
      var figure = ThemeGen.rhythmic_figures[Math.floor(Math.random() * ThemeGen.rhythmic_figures.length)];
      figure.forEach(
        function (val) {
          var note = ThemeGen.create_note(ThemeGen.choose_note(), val);
          notes.push(note);
          beat_notes.push(note);
        }
      );
      if (beat_notes.length > 1) {
        beams.push(new VF.Beam(beat_notes));
      }
      beats -= 1;
    } while (beats > 0);
  },

  choose_note: function () {
    ThemeGen.change_index();
    return ThemeGen.notes[current_note_index];
  },

  change_index: function () {
    current_note_index += Math.floor(Math.random() * (ThemeGen.biggest_step * 2)) - ThemeGen.biggest_step;
    if (current_note_index < 0) {
      current_note_index += Math.floor(Math.random() * ThemeGen.biggest_step);
    } else if (current_note_index >= ThemeGen.notes.length) {
      current_note_index -= Math.floor(Math.random() * ThemeGen.biggest_step);
    }
    if (current_note_index < 0 || current_note_index >= ThemeGen.notes.length) {
      ThemeGen.change_index();
    }
  },

  create_note: function (note_name, duration) {
    var note = new VF.StaveNote({
      clef: 'treble',
      keys: [note_name],
      duration: duration
    });
    if (duration.includes('d')) {
      note.addDotToAll()
    }
    return note;
  },

  choose_leading_note: function () {
    return ThemeGen.leading_notes[Math.floor(Math.random() * ThemeGen.leading_notes.length)];
  },

  choose_last_note: function (leading_note) {
    switch (leading_note) {
      case 'b/3':
        return 'c/4';
        break;
      case 'd/4':
        return 'c/4';
        break;
      case 'b/3':
        return 'c/4';
        break;
      case 'b/4':
        return 'c/5';
        break;
      case 'd/5':
        return 'c/5';
        break;
      case 'b/5':
        return 'c/6';
        break;
    }
  }
};
