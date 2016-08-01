var deck = {
  cards: [{
    question: "What is the capital of the United States of America?",
    answer: "Washington, D.C."
  }, {
    question: "What is a burger made of?",
    answer: "Bun, beef, and nothing else."
  }, {
    question: "What color is a bumblebee?",
    answer: "Yellow and black, I think."
  }, {
    question: "When does the world end?",
    answer: "21st of December, 2012"
  }, {
    question: "Who is the main character of 'Ender's Shadow'?",
    answer: "Bean"
  },{
    question: "Who founded GA?",
    answer: "Jake Schwartz, Adam Pritzker, Matthew Brimer."
  }],

  completedCards: [],
  currentIndex: 0,
  currentScore: document.cookie.substring(6, 8),

  addCard: function() {
    var self = this;
    var newQ = prompt("Create a Question");
    if (newQ.length < 60) {
      var newA = prompt("Enter the Answer");
      if (newA.length < 60) {
        self.cards.push({
          question: newQ,
          answer: newA
        });
      } else {
        alert("Answer's too long, make sure it's less than 60 characters!")
      }
    } else {
      alert("Question's too long, make sure it's less than 60 characters!")
    }
  },
  nextCard: function() {
    if (this.currentIndex === this.cards.length - 1) {
      this.currentIndex = 0;
    } else {
      this.currentIndex++;
    };
  },
  prevCard: function() {
    if (this.currentIndex === 0) {
      this.currentIndex = (this.cards.length - 1);
    } else {
      this.currentIndex--;
    };
  },
  markCorrect: function() {
    var currentCard = this.getCurrent();
    this.completed_cards.push(currentCard);
    this.cards.splice(this.current_index, 1);
    if (this.currentIndex >= this.cards.length) {
      this.currentIndex = 0;
    };
    this.currentScore++;
  },
  markIncorrect: function() {
    if (this.currentIndex === this.cards.length - 1) {
      this.currentIndex = 0;
    } else {
      this.currentIndex++;
    };
  },
  getCurrent: function() {
    if (this.cards.length === 0) {
      return {};
    } else {
      return this.cards[this.currentIndex];
    }
  },
  updateScore: function() {
    document.cookie = "score=" + this.currentScore;
  },
  resetScore: function() {
    document.cookie = "score=0";
  }
};

var side = "question";

// Define functions

function renderCard() {
  var currentCard = deck.getCurrent();
  if (currentCard.side) {
    $(".questionText").html(currentCard[side]);
    deck.updateScore();
    $(".score").html("Current Score Is: " + document.cookie.substring(6, 8));
  } else {
    $(".questionText").html("You've completed all your cards!");
  }
}

function nextCard() {
  side = "question";
  deck.nextCard();
  renderCard();
}

function prevCard() {
  side = "question";
  deck.prevCard();
  renderCard();
}

function right() {
  side = "question";
  deck.markCorrect();
  renderCard();
}

function wrong() {
  side = "question";
  deck.markIncorrect();
  renderCard();
}

function flip() {
  side === "question" ? side = "answer" : side = "question"
  renderCard();
}

renderCard();

// Set up event listeners

$(".next_card").click(nextCard);

$(".prev_card").click(prevCard);

$(".right").click(right);

$(".wrong").click(wrong);

$(".flip").click(flip);

$(".add_card").click(function() {
  deck.addCard();
  console.log("add card?")
});

//Listen for key presses

$(document).keyup(function(e) {
  switch (e.which) {
    case 39:
      nextCard();
      break;

    case 37:
      prevCard();
      break;

    case 82:
      right();
      break;

    case 87:
      wrong();
      break;

    case 32:
      flip();
      break;

    default:
      break;
  }
});