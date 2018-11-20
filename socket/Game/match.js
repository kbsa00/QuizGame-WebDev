const randomToken = require('rand-token');
class Match {
    constructor() {
        this.matches = [];
        this.onGoingMatches = [];
        this.creatorToMatch = new Map();
        this.matchToCreator = new Map();
    }

    genereteMatchId(username) {
        let genereteMatch = randomToken.generate(16);
        this.matches.push(genereteMatch);
        this.creatorToMatch.set(username, genereteMatch);
        this.matchToCreator.set(genereteMatch, username); 
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

    getPartyLeaderMatch(matchToken){
        return this.matchToCreator.get(matchToken);
    }

    StartingMatch(matchToken, username) {
        if (this.matches.includes(matchToken) && this.creatorToMatch.get(username) === matchToken) {
            this.matches = this.matches.filter(match => {
                return match !== matchToken
            });

            this.onGoingMatches.push(matchToken);
            this.creatorToMatch.delete(username);
            this.matchToCreator.delete(matchToken);
            return true;
        }
        return false;
    }

    checkMatchExist(matchToken){
        let matchid = (this.onGoingMatches.indexOf(matchToken) > -1);
        return matchid;
    }

    deleteOngoinMatch(matchToken){
        this.onGoingMatches = this.onGoingMatches.filter(match => {
            return match !== matchToken;
        });
        return true;
    }
}

module.exports = Match;