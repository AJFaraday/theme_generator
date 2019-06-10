ThemeGen = {
  notes: [
    'A3', 'B3', 
    'C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4',
    'C5', 'D5', 'E5', 'F5', 'G5', 'A5', 'B5',
    'C6'
  ],

  leading_notes: [
    'B3', 'D4', 'B5'
  ],



  draw_easy_score: function () {
    var vf = new Vex.Flow.Factory({renderer: {elementId: 'score'}});
    var score = vf.EasyScore();
    var system = vf.System();

    var noteString = ThemeGen.generate().join();
    console.log(noteString);

    system.addStave({
      voices: [
        score.voice(
          score.notes(noteString)
        )
      ]
    })
      .addClef('treble')
      .addTimeSignature('4/4');

    vf.draw();
  },
  
  generate: function() {
    var notes = ['C5/q'];

    var leading_note = ThemeGen.choose_leading_note();

    for(var i = 0; i < 1; i++) {
      notes.push(ThemeGen.choose_note());
    }


    notes.push(leading_note);
    notes.push(ThemeGen.choose_last_note(leading_note));
    return notes;
  },

  choose_note: function() {
    return ThemeGen.leading_notes[Math.floor(Math.random() * ThemeGen.leading_notes.length)];
  },

  choose_leading_note: function() {
    return ThemeGen.leading_notes[Math.floor(Math.random() * ThemeGen.leading_notes.length)];
  },

  choose_last_note: function(leading_note) {
    switch(leading_note){
      case 'B3':
        return 'C4';
        break;
      case 'D4':
        return 'C4';
        break;
      case 'B3':
        return 'C4';
        break;
      case 'B4':
        return 'C5';
        break;
      case 'D5':
        return 'C5';
        break;
      case 'B5':
        return 'C6';
        break;
    }
  }
};
