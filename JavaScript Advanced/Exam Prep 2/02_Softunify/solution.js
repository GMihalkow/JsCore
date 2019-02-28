class SoftUniFy {
    constructor() {
        this.allSongs = {};
    }

    downloadSong(artist, song, lyrics) {
        if (!this.allSongs[artist]) {
            this.allSongs[artist] = {rate: 0, votes: 0, songs: []}
        }

        this.allSongs[artist]['songs'].push(`${song} - ${lyrics}`);

        return this;
    }

    playSong(song) {
        let songArtists = Object.keys(this.allSongs).reduce((acc, cur) => {

            let songs = this.allSongs[cur]['songs']
                .filter((songInfo) => songInfo
                    .split(/ - /)[0] === song);

            if(songs.length > 0){
                acc[cur] = songs;
            }

            return acc;
        }, {});

        let arr = Object.keys(songArtists);
        let output = "";

        if(arr.length > 0){

            arr.forEach((artist) => {
                output += `${artist}:\n`;
                output += `${songArtists[artist].join('\n')}\n`;
            });

        } else {
            output = `You have not downloaded a ${song} song yet. Use SoftUniFy's function downloadSong() to change that!`
        }

        return output;
    }

    get songsList() {
        let songs = Object.values(this.allSongs)
            .map((v) => v['songs'])
            .reduce((acc, cur) => {
                return acc.concat(cur);
            }, []);

        let output;

        if (songs.length > 0) {
            output = songs.join('\n');
        } else {
            output = 'Your song list is empty';
        }

        return output;

    }

    rateArtist() {
        let artistExist = this.allSongs[arguments[0]];
        let output;

        if (artistExist) {

            if (arguments.length === 2) {
                artistExist['rate'] += +arguments[1];
                artistExist['votes'] += 1;
            }

            let currentRate = (+(artistExist['rate'] / artistExist['votes']).toFixed(2));
            isNaN(currentRate) ? output = 0 : output = currentRate;

        } else {
            output = `The ${arguments[0]} is not on your artist list.`
        }

        return output;
    }
}

let obj = new SoftUniFy();

describe("SoftUniFy", () => {
    let chai;

    before(() => {
        chai = require("chai");
    })

    it("should instance correctly with empty object", function(){
        let testObj = new SoftUniFy();

        let result = testObj.allSongs !== undefined;

        chai.assert.isTrue(result);
    });

    it("should download new artist correctly", function(){
        let testObj = new SoftUniFy();

        let result = testObj.downloadSong("pesho", "peshoSong", "test");

        chai.assert.isTrue(result.allSongs["pesho"] !== undefined);
    });

    it("should download new song correctly", function(){
        let testObj = new SoftUniFy();

        let result = testObj.downloadSong("pesho", "peshoSong", "test");

        chai.assert.equal(1, Object.keys(result.allSongs["pesho"].songs).length);
    });

    it("should download new song correctly", function(){
        let testObj = new SoftUniFy();

        let result = testObj.downloadSong("pesho", "peshoSong", "test");
        result = testObj.downloadSong("pesho", "50leva", "5050505");

        chai.assert.equal(2, Object.keys(result.allSongs["pesho"].songs).length);
    });

    it("should return 'Your song list is empty' for empty songs list", function(){
        let testObj = new SoftUniFy();

        chai.assert.equal(testObj.songsList, "Your song list is empty");
    });

    it("should return songs list correctly", function(){
        let testObj = new SoftUniFy();

        testObj.downloadSong("pesho", "peshoSong", "test");
        testObj.downloadSong("pesho", "50leva", "5050505");

        let expectedResult = "peshoSong - test\n50leva - 5050505"

        let actualResult = testObj.songsList;

        chai.assert.equal(expectedResult, actualResult);
    });

    it("should not play song when no songs are added", function(){
        let testObj = new SoftUniFy();

        let expectedResult = "You have not downloaded a pesho song yet. Use SoftUniFy's function downloadSong() to change that!"

        let actualResult = testObj.playSong("pesho");

        chai.assert.equal(expectedResult, actualResult);
    });

    it("should play the required song", function(){
        let testObj = new SoftUniFy();

        testObj.downloadSong("Pesho", "50leva", "test");
        testObj.downloadSong("Ivan", "50leva", "test");

        let expectedResult = "Pesho:\n50leva - test\nIvan:\n50leva - test\n";

        let actualResult = testObj.playSong("50leva");

        chai.assert.equal(expectedResult, actualResult);
    });

    it("should not rate non existing artist", function(){
        let testObj = new SoftUniFy();

        let expectedResult = "The Pesho is not on your artist list.";

        let actualResult = testObj.rateArtist("Pesho");

        chai.assert.equal(expectedResult, actualResult);
    });

    it("should rate Pesho", function(){
        let testObj = new SoftUniFy();

        let expectedResult = "The Pesho is not on your artist list.";

        let actualResult = testObj.rateArtist("Pesho");

        chai.assert.equal(expectedResult, actualResult);
    });
});