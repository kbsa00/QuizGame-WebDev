const randomToken = require('rand-token');

class Match {
    constructor() {
        this.matches = [];
    }

    genereteMatchId() {
        let genereteMatch = randomToken.generate(16);
        this.matches.push(genereteMatch);
        return genereteMatch;
    }

    checkingForMatches() {
        if (this.matches.length === 0) {
            return false;
        } else {
            for(let i = 0; i < this.matches.length; i++){
                if(this.matches[i] !== undefined){
                    return this.matches[i]; 
                }
            }
        }
    }

    printAllMatches(){
        console.log(`ALL MATCHES: ${this.matches}`);
    }

    deleteMatchId(matchId) {
        if (this.matches.include(matchId)) {
            this.matches = this.matches.filter(match => {
                return match !== matchId
            });

            return true;
        }
        return false;
    }
}

module.exports = Match;