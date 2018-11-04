const randomToken = require('rand-token');
class Match {
    constructor() {
        this.matches = [];
        this.creatorToMatch = new Map();
    }

    genereteMatchId(username) {
        let genereteMatch = randomToken.generate(16);
        this.matches.push(genereteMatch);
        this.creatorToMatch.set(username, genereteMatch);
        return genereteMatch;
    }

    checkingForMatches() {
        if (this.matches.length === 0) {
            return false;
        } else {
            for (let i = 0; i < this.matches.length; i++) {
                if (this.matches[i] !== undefined) {
                    return this.matches[i];
                }
            }
        }
    }

    printAllMatches() {
        console.log(`ALL MATCHES: ${this.matches}`);
    }

    StartingMatch(matchToken, username) {
        if (this.matches.includes(matchToken) && this.creatorToMatch.get(username) === matchToken) {
            this.matches = this.matches.filter(match => {
                return match !== matchToken
            });
            this.creatorToMatch.delete(username);
            return true;
        }
        return false;
    }
}

module.exports = Match;