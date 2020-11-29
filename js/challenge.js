// Challenges

function challReset() {
    game.parti = 0;
    game.partiPerClick = 0;
    game.challGoal = undefined;
    // Multipliers
    game.clicks = 0;
    game.u1mult = 1;
    game.u2mult = 1;
    game.u3mult = 1;
    game.u4mult = 1;
    game.u5mult = 1;
    game.u6mult = 1;
    game.u7mult = 1;
    game.u8mult = 1;
    game.u15mult = 1;
    // Bought Upgrades
    game.upgrade1Bought = 0;
    game.upgrade2Bought = 0;
    game.upgrade3Bought = 0;
    game.upgrade4Bought = 0;
    game.upgrade5Bought = 0;
    game.upgrade6Bought = 0;
    game.upgrade7Bought = 0;
    game.upgrade8Bought = 0;
    game.upgrade9Bought = 0;
    game.upgrade10Bought = 0;
    game.upgrade11Bought = 0;
    game.upgrade12Bought = 0;
    game.upgrade13Bought = 0;
    game.upgrade14Bought = 0;
    game.upgrade15Bought = 0;
    game.upgrade16Bought = 0;
    game.upgrade17Bought = 0;
    game.upgrade18Bought = 0;
    game.upgrade19Bought = 0;
    game.upgrade20Bought = 0;
    // game.power = 0;
    game.partiPerSecond = 0;
    game.powerPerSecond = 0;
    game.genSpeed = 1000;
    // Caps
    game.caps.firstRow = 10;
    game.caps.firstRow = 20;
    game.caps.powerMult = 100;
    // Gen 1
    game.gen1.cost = 10;
    game.gen1.costMult = 1.5;
    game.gen1.amount = 0;
    game.gen1.bought = 0;
    game.gen1.mult = 1;
    game.gen1.production = 0;
    game.gen1.productionMult = 1;
    // Gen 2
    game.gen2.cost = 1e4;
    game.gen2.costMult = 2.5;
    game.gen2.amount = 0;
    game.gen2.bought = 0;
    game.gen2.mult = 1;
    game.gen2.production = 0;
    game.gen2.productionMult = 1;
    // Power Gen 1
    game.powergen1.cost = 50;
    game.powergen1.costMult = 2;
    game.powergen1.amount = 0;
    game.powergen1.bought = 0;
    game.powergen1.mult = 1;
    game.powergen1.production = 0;
    game.powergen1.productionMult = 1;
    // Power Gen 2
    game.powergen2.cost = 1.5e3;
    game.powergen2.costMult = 5;
    game.powergen2.amount = 0;
    game.powergen2.bought = 0;
    game.powergen2.mult = 1;
    game.powergen2.production = 0;
    game.powergen2.productionMult = 1;
    /* game = {
        parti: 0,
        // energy: energy,
        // quarks: quarks,
        partiPerClick: 0.01,
        clicks: 0,
        u2mult: 1,
        u3mult: 1,
        u4mult: 1,
        u5mult: 1,
        u6mult: 1,
        u7mult: 1,
        u8mult: 1,
        u15mult: 1,
        upgrade1Bought: 0,
        upgrade2Bought: 0,
        upgrade3Bought: 0,
        upgrade4Bought: 0,
        upgrade5Bought: 0,
        upgrade6Bought: 0,
        upgrade7Bought: 0,
        upgrade8Bought: 0,
        upgrade9Bought: 0,
        upgrade10Bought: 0,
        upgrade11Bought: 0,
        upgrade12Bought: 0,
        upgrade13Bought: 0,
        upgrade14Bought: 0,
        upgrade15Bought: 0,
        power: 0,
        // playTime: playTime,
        partiPerSecond: 0,
        powerPerSecond: 0,
        gen1: {
            cost: 10,
            costMult: 1.5,
            amount: 0,
            bought: 0,
            mult: 1,
            production: 0,
            productionMult: 1,
        },
        gen2: {
            cost: 1e4,
            costMult: 1.5,
            amount: 0,
            bought: 0,
            mult: 1,
            production: 0,
            productionMult: 1,
        },
        powergen1: {
            cost: 50,
            costMult: 2,
            amount: 0,
            bought: 0,
            mult: 1,
            production: 0,
            productionMult: 1,
        },
        genSpeed: 1000,
        version: 0.2,
        currentChallenge: "none",
        challGoal: 0,
        caps: {
            firstRow: 10,
            secondRow: 20,
        },
        clickCap: 10000,
        clickCapCost: 1000, 
    } */
}

function startChallenge(chall) {
    if (game.currentChallenge == "none") {
        if (confirm("Are you sure you want to start this challenge? You will have to perform a challenge reset.")) {
            challReset();
            updateAll();
        } else {
            chall == 0;
            return;
        }
        if (chall == 1) {
            game.currentChallenge = 1;
            game.challGoal = 3e6;
            document.getElementById("startChall1").innerHTML = "Running"
        } else if (chall == 2) {
            game.currentChallenge = 2;
            game.challGoal = 1e13;
            document.getElementById("startChall2").innerHTML = "Running"
        } else if (chall == 3) {

        } else if (chall == 4) {

        }
        challCheck = window.setInterval(function() {
            if (game.parti >= game.challGoal) {
                if (game.currentChallenge == 1) {
                    if (game.chall1Comp == 0) {
                        game.energy += 1;
                        checkAchs(15);
                    }
                    document.getElementById("startChall1").innerHTML = "Completed";
                    game.chall1Comp += 1;
                } else if (game.currentChallenge == 2) {
                    if (game.chall2Comp == 0) {
                        game.energy += 2;
                        checkAchs(17);
                    }
                    document.getElementById("startChall2").innerHTML = "Completed";
                    game.chall2Comp += 1;
                }
                leaveChallenge();           
            }
        }, 100)
    }
}

function leaveChallenge() {
    if (game.currentChallenge == "none") return;
    game.currentChallenge = "none";
    challReset();
    updateAll();
}