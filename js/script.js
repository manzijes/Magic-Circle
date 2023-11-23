// timer setup
var time_in_minutes = 0;
var current_time;
var deadline;
var bigLotteryDone = false;

$( document ).ready(function() {

    // play twinkle sound on every button click
    $(".bttn").on( "click", function() {
        $("#buttonsound")[0].play();
    } );
    $(".quiz").on( "click", function() {
        $("#drawcard")[0].play();
    } );
    $(".action").on( "click", function() {
      $("#drawcard")[0].play();
  } );
    
    // music button - toggle music
    $( ".musicbtn" ).on( "click", function() {
        if($(this).hasClass("playing")){
            pauseMusic();
            $(this).removeClass("playing");
        } else {
            playMusic();
            $(this).addClass("playing");
        }
    } );

    $( ".timer-short" ).on( "click", function() {
        // set up short timer
        time_in_minutes = 1;
        startGame();
    } );
    $( ".timer-normal" ).on( "click", function() {
        // set up normal timer
        time_in_minutes = 60;
        startGame();
    } );
    $( ".timer-long" ).on( "click", function() {
        // set up long timer
        time_in_minutes = 90;
        startGame();
    } );

    // exit game button
    $( ".exit" ).on( "click", function() {
        location.reload();
    } );

    // pause timer button
    $( "#pause" ).on( "click", function() {
        $(this).addClass("paused");
        pause_clock();
    } );

    // resume timer button
    $( "#resume" ).on( "click", function() {
        $("#pause").removeClass("paused");
        resume_clock();
    } );

    // close big lottery
    $( ".closeBigLottery" ).on( "click", function() {
      resume_clock();
  } ); 

  // all question cards
  $questions = 
      [
        {
          category: "Trivia",
          question: "Wie heißt der erste Zauber, den Luz lernt?",
          choices: ["Lichtzauber", "Eiszauber", "Feuerzauber", "Pflanzenzauber"],
          answer: "Lichtzauber"
        },
        
        {
          category: "Trivia",
          question: "Luz hat Angst vor Katzen mit menschlichen Gesichtern, Milchprodukten und...?",
          choices: ["Matheklausuren", "synchronen Tanzchoreographien", "weinenden Clowns", "Menschen, die im Internet diskutieren wollen"],
          answer: "Menschen, die im Internet diskutieren wollen."
        },

        {
          category: "Trivia",
          question: "Wie heißt die erste Episode von 'Willkommen im Haus der Eulen'?",
          choices: ["Die Auserwählte", "Erster Schultag", "Luz im Reich der Dämonen", "Die brodelnden Inseln"],
          answer: "Luz im Reich der Dämonen"
        },

        {
          category: "Trivia",
          question: "Wie heißt die Zauberschule, an der Luz Magie lernt?",
          choices: ["Hexenstein", "Hexstein", "Herzstein", "Hexerstein"],
          answer: "Hexstein"
        },

        {
          category: "Trivia",
          question: "Wie alt ist Luz zu Beginn der Serie?",
          choices: ["13 Jahre", "15 Jahre", "16 Jahre", "14 Jahre"],
          answer: "14 Jahre"
        },

        {
          category: "Trivia",
          question: "Welche Augenfarbe hat Luz?",
          choices: ["Braun", "Grün", "Blau", "Gelb"],
          answer: "Braun"
        },

        {
          category: "Trivia",
          question: "Wie viele sogenannte Haupt-Zirkel gibt es?",
          choices: ["8", "9", "7", "6"],
          answer: "9"
        },

        {
          category: "Trivia",
          question: "Menschen brauchen ein Hilfsmittel, um zaubern zu können. Ein Hilfsmittel namens...?",
          choices: ["Runen", "Glyphen", "Ikonen", "Marken"],
          answer: "Glyphen"
        },

        {
          category: "Trivia",
          question: "Welchem Zirkel auf der Hexstein gehört Amity an?",
          choices: ["Abscheulichkeiten-Zirkel", "Barden-Zirkel", "Pflanzen-Zirkel", "Orakel-Zirkel"],
          answer: "Abscheulichkeiten-Zirkel"
        },

        {
          category: "Trivia",
          question: "Wie heißt der Schulleiter der Zauberschule, die Luz und Co. besuchen?",
          choices: ["Bucket", "Buck", "Buckel", "Buchel"],
          answer: "Buckel"
        },

        {
          category: "Trivia",
          question: "Wie wird Eda noch genannt?",
          choices: ["Die Katzenlady", "Die Vogellady", "Die Dornenlady", "Die Eulenlady"],
          answer: "Die Eulenlady"
        },

        {
          category: "Trivia",
          question: "Was für eine Art Dämon ist King?",
          choices: ["Titan", "Gigant", "Goliath", "Hundedämon"],
          answer: "Titan"
        },

        {
          category: "Trivia",
          question: "Wer ist das Oberhaupt des Bardenzirkels?",
          choices: ["Raine Chambers", "Raine Whispers", "Daine Whispers", "Daine Chambers"],
          answer: "Raine Whispers"
        },

        {
          category: "Trivia",
          question: "Wie alt ist Gus zu Beginn der Serie?",
          choices: ["12 Jahre", "13 Jahre", "14 Jahre", "15 Jahre"],
          answer: "12 Jahre"
        },

        {
          category: "Trivia",
          question: "Wie lautet Imperator Belos echter Name?",
          choices: ["Philip Whittebane", "Philip Whitemane", "Philip Blackthorne", "Philip Blackbane"],
          answer: "Philip Whittebane"
        },

        {
          category: "Trivia",
          question: "Wie wird Hunter noch genannt?",
          choices: ["Der Bronzene Wächter", "Der Silberne Wächter", "Der Goldene Wächter", "Der Diamantene Wächter"],
          answer: "Der Goldene Wächter"
        },

        {
          category: "Trivia",
          question: "Welches Event findet im Finale der zweiten Staffel statt?",
          choices: ["Tag der Einigkeit", "Tag des Einzugs", "Tag der Einzigkeit", "Tag des Einklangs"],
          answer: "Tag des Einklangs"
        },

        {
          category: "Trivia",
          question: "Wie viele Episoden hat die erste Staffel von 'Willkommen im Haus der Eulen'?",
          choices: ["20", "19", "22", "21"],
          answer: "19"
        },

        {
          category: "Trivia",
          question: "Wie viele Episoden hat die zweite Staffel von 'Willkommen im Haus der Eulen'?",
          choices: ["20", "19", "22", "21"],
          answer: "21"
        },

        {
          category: "Trivia",
          question: "Wie viele Episoden hat die dritte Staffel von 'Willkommen im Haus der Eulen'?",
          choices: ["5", "6", "4", "3"],
          answer: "3"
        },

        {
          category: "Trivia",
          question: "Die Anfangsbuchstaben aller Episoden von Staffel 2 ergeben einen Satz. Welchen Satz?",
          choices: ["Seek the lock fear the key", "Seek the key fear the lock", "Fear the lock seek the key", "Fear the key seek the lock"],
          answer: "Seek the key fear the lock"
        },

        {
          category: "Trivia",
          question: "Die Anfangsbuchstaben aller Episoden von Staffel 1 ergeben einen Satz. Welchen Satz?",
          choices: ["A witch loses a true way", "A witch loses a true path", "A witch finds a true way", "A witch finds a true path"],
          answer: "A witch loses a true way"
        },

        {
          category: "Trivia",
          question: "Von wem ist die Titelmusik von 'Willkommen im Haus der Eulen'?",
          choices: ["T.J. Will", "T.A. Hill", "T.J. Will", "T.J. Hill"],
          answer: "T.J. Hill"
        },

        {
          category: "Trivia",
          question: "Wie lautet Edas voller Name?",
          choices: ["Edalyn Donnerklaue", "Edalyn Dornenklaue", "Edalyn Blitzklaue", "Edalyin Dornenklau"],
          answer: "Edalyn Dornenklaue"
        },

        {
          category: "Trivia",
          question: "Welche Art Dämon ist Holzi?",
          choices: ["Käferdämon", "Eulendämon", "Insektendämon", "Adlerdämon"],
          answer: "Käferdämon"
        },

        {
          category: "Trivia",
          question: "Welche Augenfarbe hat Amity?",
          choices: ["Braun", "Violett", "Grün", "Gold"],
          answer: "Gold"
        },

        {
          category: "Trivia",
          question: "Welche Augenfarbe hat Willow?",
          choices: ["Braun", "Blau", "Grün", "Gold"],
          answer: "Grün"
        },

        {
          category: "Trivia",
          question: "Luz ist ein großer Fan der Romanreihe...?",
          choices: ["Die Gute Hexe Azuna", "Die Gute Hexe Aluna", "Die Gute Hexe Azura", "Die Gute Hexe Alura"],
          answer: "Die Gute Hexe Azura"
        },

        {
          category: "Trivia",
          question: "Wie lautet Gus voller Name?",
          choices: ["August Porter", "Augustus Porter", "August Port", "Augustus Port"],
          answer: "Augustus Porter"
        },

        {
          category: "Trivia",
          question: "Wie heißt das Vertrautentier von Eda?",
          choices: ["Heulbert", "Eulbert", "Heulerbert", "Eulenbert"],
          answer: "Heulbert"
        },

        {
          category: "Trivia",
          question: "Wie heißen Amitys Geschwister?",
          choices: ["Emira und Edwin", "Mira und Edric", "Mira und Edwin", "Emira und Edric"],
          answer: "Emira und Edric"
        },

        {
          category: "Trivia",
          question: "Wie heißt die Mutter von Luz?",
          choices: ["Camille", "Camira", "Camila", "Cam"],
          answer: "Camila"
        },

        {
          category: "Trivia",
          question: "Wie heißt die Mutter von Amity?",
          choices: ["Odalia", "Odile", "Odette", "Dalia"],
          answer: "Odalia"
        },

        {
          category: "Trivia",
          question: "Wie heißt der Vater von Amity?",
          choices: ["Alado", "Alador", "Aledor", "Alodo"],
          answer: "Alador"
        },

        {
          category: "Trivia",
          question: "Als Luz auf die brodelnden Inseln ging, nahm V (Vee) ihren Platz in der Menschenwelt ein. Was für eine Spezies ist sie?",
          choices: ["Basilisk", "Dämon", "Skinwalker", "Hexe"],
          answer: "Basilisk"
        },

        {
          category: "Trivia",
          question: "Welchem Zirkel gehörte Lilith zu Beginn der Serie an?",
          choices: ["Imperatorzirkel", "Keinem Zirkel", "Orakelzirkel", "Abscheulichkeitenzirkel"],
          answer: "Imperatorzirkel"
        },

        {
          category: "Trivia",
          question: "Wer hat Eda mit dem Eulenfluch belegt?",
          choices: ["Imperator Belos", "Kikimora", "Lilith", "Eda selbst"],
          answer: "Lilith"
        },

        {
          category: "Trivia",
          question: "Wie lautet der Spitzname, den Amity von ihren Geschwistern hat?",
          choices: ["Kitty", "Mitty", "Mittens", "Ams"],
          answer: "Mittens"
        },

        {
          category: "Trivia",
          question: "Wie heißt die Mutter von Eda und Lilith?",
          choices: ["Esmeralda", "Claudine", "Gerda", "Gwendolyn"],
          answer: "Gwendolyn"
        },

        {
          category: "Trivia",
          question: "Amity färbt sich später die Haare von grün zu...?",
          choices: ["Violett", "Blau", "Rot", "Blond"],
          answer: "Violett"
        },

        {
          category: "Trivia",
          question: "In welcher Epsiode kommen Amity und Luz zusammen?",
          choices: ["Tunnel der Liebe", "Kampfgeist", "Spiegelglas-Ruinen", "Eklipsen-See"],
          answer: "Tunnel der Liebe"
        },

        {
          category: "Trivia",
          question: "Was ist die Währung der brodelnden Inseln?",
          choices: ["Kröten", "Schnecken", "Steine", "Federn"],
          answer: "Schnecken"
        },

        {
          category: "Trivia",
          question: "In was für ein Sommercamp sollte Luz ursprünglich gehen?",
          choices: ["Day Dreamer Summer Camp", "Find Friends Summer Camp", "Adventure Summer Camp", "Reality Check Summer Camp"],
          answer: "Reality Check Summer Camp"
        }
      ];

      $shuffledquestions = $questions.slice();
      $shuffledquestions = shuffleArray($shuffledquestions);
      
     $(".quiz").on("click", function(){
      console.log($shuffledquestions.length);
      // still cards left
      if($shuffledquestions.length > 0){
        $('#questionModal').modal('show');
        $('#questionCategory').text($shuffledquestions[0].category);
        $('#questionContent').text($shuffledquestions[0].question);
        // Clear choices field
        $( "#questionOptions" ).empty();
        // shuffle and display all choices
        var i;
        $all_choices = shuffleArray($shuffledquestions[0].choices);
        for (i = 0; i < $all_choices.length; ++i) {
          $num = nameABC(i);
          $( "<div><strong>"+ $num + "</strong>" + $all_choices[i]+"</div>" ).appendTo( "#questionOptions" );
        }
        $('#questionSolution').text($shuffledquestions[0].answer);
        
      } else {
        // no cards left, shuffle all again
        $shuffledquestions = $questions.slice();
        $shuffledquestions = shuffleArray($shuffledquestions);
       
        $('#questionModal').modal('show');
        $('#questionCategory').text($shuffledquestions[0].category);
        $('#questionContent').text($shuffledquestions[0].question);
        // Clear choices field
        $( "#questionOptions" ).empty();
        // shuffle and display all choices
        var i;
        $all_choices = shuffleArray($shuffledquestions[0].choices);
        for (i = 0; i < $all_choices.length; ++i) {
          $num = nameABC(i);
          $( "<div><strong>"+ $num + "</strong>" + $all_choices[i]+"</div>" ).appendTo( "#questionOptions" );
        }
        $('#questionSolution').text($shuffledquestions[0].answer);
      }
     });

     function nameABC(i) {
      if(i == 0){
        $num = "a)&emsp;";
      }
      else if(i == 1){
        $num = "b)&emsp;";
      }
      else if(i == 2){
        $num = "c)&emsp;";
      }
      else {
        $num = "d)&emsp;";
      }
      return $num;
     }
 
      // delete card that has just been shown
     $(".closeQuestion").on("click", function(){
      $shuffledquestions.splice(0,1);
     });

    // all action cards
    $actions = [
      "Sage eine Strophe eines Gedichts auf. Als Belohnung bekommst du eine Phiole Titanenblut.",
      "Spiele Schere Stein Papier gegen einen beliebigen Mitspieler. Der Gewinner bekommt eine Phiole Titanenblut vom Verlierer.",
      "Erzähle einen Witz! Wenn jemand lacht, bekommst du eine Phiole Titanenblut."
     ];    
 
    //  copy action cards, but shuffled
     $shuffledactions = $actions.slice();
     $shuffledactions = shuffleArray($shuffledactions);
 
     $(".action").on("click", function(){
      // still cards left
      if($shuffledactions.length > 0){
        $('#actionModal').modal('show');
        $('#actionContent').text($shuffledactions[0]);
      } else {
        // no cards left, shuffle all again
        $shuffledactions = $actions.slice();
        $shuffledactions = shuffleArray($shuffledactions);
        $('#actionModal').modal('show');
        $('#actionContent').text($shuffledactions[0]);
      }
     });
 
      // delete card that has just been shown
     $(".closeAction").on("click", function(){
      $shuffledactions.splice(0,1);
     });

});

function playMusic() {
    $("#music")[0].volume = 0.4;
    $("#music")[0].play();
}
function pauseMusic() {
    $("#music")[0].volume = 0.4;
    $("#music")[0].pause();
}

function startGame() {
    $(".open-exit").show();
    $(".button-wrapper").hide();

    // step 1 CHOOSE COVEN
    $(".step-1").show();

    // step 2 LUCKY FIELD
    $( ".leave-1" ).on( "click", function() {
        $(".step-1").hide();
        $(".step-2").show();

        $x = Math.floor((Math.random() * 30) + 1);
        $(".luckynumber").html($x);
    } );

    // step 3 READY?
    $( ".leave-2" ).on( "click", function() {
        $(".step-2").hide();
        $(".step-3").show();
    } );

    // step 4 GAME SCREEN
    $( ".leave-3" ).on( "click", function() {
        $(".countdown").removeClass("d-none");
        $(".timecontrol-btns").removeClass("d-none");
    
        $(".step-3").hide();
        $(".step-4").show();

        // start timer
        current_time = Date.parse(new Date());
        deadline = new Date(current_time + time_in_minutes * 60 * 1000);
        halftime = new Date(current_time + time_in_minutes/2 * 60 * 1000);
        run_clock('clockdiv',deadline, halftime);
    } );
}

function time_remaining(endtime) {
    var t = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
    var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    var days = Math.floor(t / (1000 * 60 * 60 * 24));
    return {
      total: t,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds
    };
  }
  
  var timeinterval;

  function run_clock(id, endtime, halftime) {
    var clock = document.getElementById(id);

    function update_clock() {
      var t = time_remaining(endtime);
      var half = time_remaining(halftime);

      clock.innerHTML = t.minutes + " Min " + t.seconds + " Sek";

      //  HALF TIME - BIG LOTTERY
      if (half.total <= 0 && bigLotteryDone == false) {
        pause_clock();
        $("#music")[0].volume = 0;
        setTimeout(function() { 
          $("#music")[0].volume = 0.4;
        }, 2000);
        $("#trumpets")[0].play();
        $('#lotteryModal').modal('show');
        bigLotteryDone = true;
      }
      // TIME OVER - END
      if (t.total <= 0) {
        clearInterval(timeinterval);
        pauseMusic();
        $("#alarm")[0].play();
        $('#gameOverModal').modal('show');
      }
    }
    update_clock(); // run function once at first to avoid delay
    timeinterval = setInterval(update_clock, 1000);
  }
  run_clock("clockdiv", deadline);
  
  var paused = false; // is the clock paused?
  var time_left; // time left on the clock when paused
  
  function pause_clock() {
    if (!paused) {
      paused = true;
      clearInterval(timeinterval); // stop the clock
      time_left = time_remaining(deadline).total; // preserve remaining time
    }
  }
  
  function resume_clock() {
    if (paused) {
      paused = false;
  
      // update the deadline to preserve the amount of time remaining
      deadline = new Date(Date.parse(new Date()) + time_left);
  
      // start the clock
      run_clock("clockdiv", deadline);
    }
  }

  // shuffle array
  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) { 
        var j = Math.floor(Math.random() * (i + 1));       
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
 }