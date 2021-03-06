function getBaseLog(x, y) {
    return Math.log(y) / Math.log(x);
}

function clickParticles() { 
    if (game.clicks < game.clickCap) { // runs on click
    game.parti += game.partiPerClick;
    game.clicks++;
    updatePartiPerClick();
    checkAchs(11);
    document.getElementById("clickAmount").innerHTML = "You've clicked " + format(game.clicks) + " times.";
    document.getElementById("partiCount").innerHTML = "You have " + format(game.parti) + " Particles."
   } else if (game.clicks > game.clickCap) {
    alert("Cheated particles are corruptive. Beware!")
   } else if (game.clicks >= game.clickCap && (game.partiPerSecond == 0)) {
    alert("Uh oh, you've been softlocked. Try buying a generator now!")
   } else if (game.clicks == game.clickCap && (game.partiPerSecond > 0)) {
    alert("You've reached the click cap! This is to prevent autoclicking abuse. From now on, you'll have to rely on generators. Don't worry though, there'll be upgrades later on to increase this cap!")
   } 
}

function clickCapUpgrade() {
    if (game.parti >= game.clickCapCost) {
        game.parti -= game.clickCapCost;
        game.clickCap *= 5;
        game.clickCapCost *= 10;
        document.getElementById("clickCap").innerHTML = "You can only clickc" + format(game.clickCap) + " times."
    }
}

function updatePartiPerSecond() {
    game.partiPerSecond = game.gen1.production;
    // Upgrade 5
    if (game.upgrade5Bought != 0) {
    game.u5mult = Math.sqrt(game.gen1.bought * 2);
    }
    if (game.u5mult > getFirstRowMultCap()) {
        game.u5mult = getFirstRowMultCap();
    } else if (game.u5mult < 1) {
        game.u5mult = 1;
    }
    // Upgrade 8
    if (game.upgrade14Bought != 0) {
        game.u8mult = Math.sqrt(Math.pow(game.power, 4));
    } else if (game.upgrade8Bought != 0) {
        game.u8mult = Math.log10(Math.pow(game.power, 4));
    }
    if (game.u8mult > getSecondRowMultCap()) {
        game.u8mult = getSecondRowMultCap();
    } else if (game.u8mult < 1) {
        game.u8mult = 1;
    }
    // Energy Mult
    game.enMult = getEnMult();
    if (game.enMult < 1) {
        game.enMult = 1;
    }
    game.gen1.production = getGen1Prod();
    game.gen2.production = getGen2Prod();
    game.gen3.production = getGen3Prod();
    
    checkAchs(26);
    document.getElementById("gen1").innerHTML = "1st Particle Generator x" + format(game.gen1.mult * game.gen1.productionMult) + " (" + format(game.gen1.amount) + ") " + format(game.gen1.production) + " Particles/tick"
    document.getElementById("gen2").innerHTML = "2nd Particle Generator x" + format(game.gen2.productionMult) + " (" + format(game.gen2.amount) + ") " + format(game.gen2.production) + " Generators/tick"
    document.getElementById("displayPartiPerSecond").innerHTML = "You gain " + format(game.partiPerSecond) + " Particles per tick passively."
}

function updatePowerPerSecond() {
    game.powerPerSecond = game.powergen1.production;
    game.u15mult = Math.cbrt(Math.pow(game.gen1.bought, 2));
    if (game.u15mult < 1) {
        game.u15mult = 1;
    }
    checkAchs(22);
    game.powergen1.production = getPowGen1Prod();
    game.powergen2.production = getPowGen2Prod();
    document.getElementById("powerCount").innerHTML = "You have " + format(game.power) + " Power, translated to a x" + format(game.powerMult) + " boost to clicking."
    document.getElementById("powergen1").innerHTML = "1st Power Generator x" + format(game.powergen1.productionMult) + " (" + format(game.powergen1.amount) + ") " + format(game.powergen1.production) + " Power/tick"
    document.getElementById("displayPowerPerSecond").innerHTML = "You gain " + format(game.powerPerSecond) + " Power per tick."
}

function updatePartiPerClick() {
    // Power Mult
    if (game.upgrade19Bought != 0) {
        game.powerMult = Math.pow((Math.log10(game.power) * Math.sqrt(game.power)), game.emp.upg21.mult);
    } else {
        game.powerMult = Math.pow((Math.log10(game.power) * Math.cbrt(game.power)), game.emp.upg21.mult);
    }
    if (game.powerMult > getPowMultHardCap()) {
        game.powerMult = getPowMultHardCap();
    } else if (game.powerMult < 1) {
        game.powerMult = 1;
    }
    // Upgrade 2
    if (game.upgrade9Bought != 0) {
        game.u2mult = Math.sqrt(Math.pow(game.clicks, 3));
    } else if (game.upgrade2Bought != 0) {
        game.u2mult = Math.sqrt(game.clicks * 2) / 5;
    } 
    if (game.u2mult > getFirstRowMultCap()) {
        game.u2mult = getFirstRowMultCap();
     } else if (game.u2mult < 1) {
         game.u2mult = 1;
     }
    // Upgrade 3
    if (game.upgrade10Bought != 0) {
        game.u3mult = Math.sqrt(game.parti) + 2;
    } else if (game.upgrade3Bought != 0) {
        game.u3mult = Math.log10(game.parti) + 2;
    }
    if (game.u3mult > getFirstRowMultCap()) {
        game.u3mult = getFirstRowMultCap();
    } else if (game.u3mult < 1) {
        game.u3mult = 1;
    }
    // Upgrade 7
    if (game.upgrade13Bought != 0) {
        game.u7mult = Math.sqrt(Math.pow(game.power, 4));
    } else if (game.upgrade7Bought != 0) {
        game.u7mult = Math.log10(Math.pow(game.power, 4));
    } 
    if (game.u7mult > getSecondRowMultCap()) {
        game.u7mult = getSecondRowMultCap();
    } else if (game.u7mult < 1) {
        game.u7mult = 1;
    }
    checkAchs(26);
    game.partiPerClick = 0.01 * game.u1mult * game.u2mult * game.u3mult * game.u7mult * game.powerMult * game.rep.upg11.mult;
    document.getElementById("partiCount").innerHTML = "You have " + format(game.parti) + " Particles.";
    document.getElementById("displayPartiPerClick").innerHTML = "You gain " + format(game.partiPerClick) + " Particles per click.";
}

function tab(tab) {
  document.getElementById("Generators").style.display = "none"
  document.getElementById("Options").style.display = "none"
  document.getElementById("Stats").style.display = "none"
  document.getElementById("Achievements").style.display = "none"
  document.getElementById("Challenges").style.display = "none"
  document.getElementById("Particles").style.display = "none"
  document.getElementById("Power").style.display = "none"
  document.getElementById("Energy").style.display = "none"
  document.getElementById("Automation").style.display = "none"
  document.getElementById("Time").style.display = "none"
  document.getElementById("Quarks").style.display = "none"
  document.getElementById(tab).style.display = "inline"
}

tab("Particles");