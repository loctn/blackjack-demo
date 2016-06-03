
Array.prototype.draw = function() {
  var card = Math.floor(Math.random() * 13 + 1);
  this.push((card > 10) ? Math.max(card - 3, 10) : card);
  return this;
};

Array.prototype.count = function() {
  var aces, total = this.reduce(function(sub, val) {
    aces = (sub + val === 1) || aces;
    return sub + val;
  }, 0);
  return (aces && total < 12) ? [total + 10, total] : [total];
};    

Array.prototype.best = function() {
  if (this.length === 1) return this[0];
  return (this[0] > 21) ? this[1] : Math.max.apply({}, this);
};
  
function deal() {
  var dealer = [].draw().draw();
  var player = [].draw().draw();
  var dtotal = dealer.count();
  var ptotal = player.count();
  
  if (dtotal[0] === 21 && ptotal[0] === 21) return alert('Dealer has Blackjack, but so do you!');
  if (dtotal[0] === 21) return alert('Dealer has Blackjack! You suck!');
  if (ptotal[0] === 21) return alert('You have Blackjack! You rule!');
  
  var showing = 'Dealer is showing ' + ((dealer[0] - 1) ? dealer[0] : 'Ace') + '.';
  while (Math.min.apply({}, ptotal) < 22 && confirm(showing + ' Your total is ' + ptotal.join(' or ') + '. Would you like to hit?')) {
    player.draw();
    ptotal = player.count();
  }
  
  var pbest = ptotal.best();
  if (pbest > 21) return alert('You have ' + pbest + ' and busted! You suck!');
  
  // Dealer hits soft 17
  while (dtotal[0] < 17 || dtotal[0] === 17 && dtotal.length === 2) {
    dealer.draw();
    dtotal = dealer.count();
  }
  
  var dbest = dtotal.best();
  if (dbest > 21) {
    alert('Dealer has ' + dbest + ' and busts! You rule!');
  } else if (pbest === dbest) {
    alert('Dealer has ' + dbest + '. You have ' + pbest + ' and push!');
  } else if (pbest < dbest) {
    alert('Dealer has ' + dbest + '. You have ' + pbest + ' and lose!');
  } else if (pbest > dbest) {
    alert('Dealer has ' + dbest + '. You have ' + pbest + ' and win!');
  }
}

do {
  deal();
} while(confirm('Play again?'));