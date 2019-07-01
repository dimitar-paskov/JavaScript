let expect = require('chai').expect;

// let assert = require('chai').assert;

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

            if (songs.length > 0) {
                acc[cur] = songs;
            }

            return acc;
        }, {});

        let arr = Object.keys(songArtists);
        let output = "";

        if (arr.length > 0) {

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

describe("Test suite", function () {
    let softunify;
    beforeEach(function () {
        softunify = new SoftUniFy();
    });
    describe("General cases", function () {
        it("should be class SoftUniFy", () => {
            expect(softunify.constructor.name).to.equal('SoftUniFy');
        });

        it("should have ownProperty allSongs", () => {
            expect(softunify.hasOwnProperty('allSongs')).to.equal(true);
        });
        it("should have ownProperty allSongs, and it is an empty object", () => {
            expect(typeof Object.getPrototypeOf(softunify.allSongs)).to.equal('object');
        });
        it("should have ownProperty allSongs, and it is an empty object", () => {
            expect(Object.keys(softunify.allSongs).length).to.equal(0);
        });
    });

    describe('downloadSong', function () {
        it("should have function downloadSong", () => {
            expect(Object.getPrototypeOf(softunify).hasOwnProperty('downloadSong')).to.equal(true);
        });
        it("should downloadSong", () => {
            softunify.downloadSong('artist', 'song', 'lyrics');
            expect(Object.keys(softunify.allSongs)[0]).to.equal('artist');
            expect(softunify.allSongs['artist'].rate).to.equal(0);
            expect(softunify.allSongs['artist'].votes).to.equal(0);
        });
        it("should downloadSong", () => {
            softunify.downloadSong('artist', 'song', 'lyrics');
            expect(softunify.allSongs['artist'].songs[0]).to.equal('song - lyrics');
        });
        it("should downloadSong", () => {
            softunify.downloadSong('artist1', 'song1', 'lyrics1');
            softunify.downloadSong('artist2', 'song2', 'lyrics2');
            expect(softunify.allSongs['artist1'].songs[0]).to.equal('song1 - lyrics1');
            expect(softunify.allSongs['artist2'].songs[0]).to.equal('song2 - lyrics2');
        });
        it("should downloadSong", () => {
            softunify.downloadSong('artist1', 'song1', 'lyrics1');
            softunify.downloadSong('artist1', 'song2', 'lyrics2');
            softunify.downloadSong('artist2', 'song1', 'lyrics1');
            softunify.downloadSong('artist2', 'song2', 'lyrics2');
            expect(softunify.allSongs['artist1'].songs[0]).to.equal('song1 - lyrics1');
            expect(softunify.allSongs['artist1'].songs[1]).to.equal('song2 - lyrics2');
            expect(softunify.allSongs['artist2'].songs[0]).to.equal('song1 - lyrics1');
            expect(softunify.allSongs['artist2'].songs[1]).to.equal('song2 - lyrics2');
        });

        it("downloadSong should return the entire class", () => {

            expect(softunify.downloadSong('artist1', 'song1', 'lyrics1')).to.equal(softunify);

        });
    });
    describe('playSong', function () {
        it("should have function playSong", () => {
            expect(Object.getPrototypeOf(softunify).hasOwnProperty('playSong')).to.equal(true);
        });

        it("playSong should return all songs from an artist", () => {
            softunify.downloadSong('artist1', 'song11', 'lyrics1');
            softunify.downloadSong('artist1', 'song12', 'lyrics2');
            softunify.downloadSong('artist2', 'song21', 'lyrics1');
            softunify.downloadSong('artist2', 'song22', 'lyrics2');
            expect(softunify.playSong('song21')).to.equal('artist2:\nsong21 - lyrics1\n');
        });

        it("playSong should return all songs from an artist", () => {
            softunify.downloadSong('artist1', 'song11', 'lyrics1');
            softunify.downloadSong('artist1', 'song12', 'lyrics2');
            softunify.downloadSong('artist2', 'song21', 'lyrics1');
            softunify.downloadSong('artist2', 'song22', 'lyrics2');
            expect(softunify.playSong('song 21')).to.equal("You have not downloaded a song 21 song yet. Use SoftUniFy's function downloadSong() to change that!");
        });
        it("playSong should return all songs from an artist", () => {
            expect(softunify.playSong('song 21')).to.equal("You have not downloaded a song 21 song yet. Use SoftUniFy's function downloadSong() to change that!");
        });

    });

    describe('songsList', function () {
        it("should have function songsList", () => {
            expect(Object.getPrototypeOf(softunify).hasOwnProperty('songsList')).to.equal(true);
        });
        it("songsList should return all songs ", () => {
            softunify.downloadSong('artist1', 'song11', 'lyrics1');
            softunify.downloadSong('artist1', 'song12', 'lyrics2');
            softunify.downloadSong('artist2', 'song21', 'lyrics1');
            softunify.downloadSong('artist2', 'song22', 'lyrics2');
            expect(softunify.songsList).to.equal("song11 - lyrics1\nsong12 - lyrics2\nsong21 - lyrics1\nsong22 - lyrics2");
        });
        it("songsList should return all songs ", () => {
            expect(softunify.songsList).to.equal('Your song list is empty');
        });
    });
    describe('rateArtist', function () {
        it("should have function rateArtist", () => {
            expect(Object.getPrototypeOf(softunify).hasOwnProperty('rateArtist')).to.equal(true);
        });
        it("should have function rateArtist", () => {
            expect(softunify.rateArtist('Eminem')).to.equal("The Eminem is not on your artist list.");
        });
        it("should have function rateArtist", () => {
            expect(softunify.rateArtist('Eminem', 50)).to.equal("The Eminem is not on your artist list.");
        });
        it("should have function rateArtist", () => {
            softunify.downloadSong('artist1', 'song11', 'lyrics1');
            softunify.downloadSong('artist1', 'song12', 'lyrics2');
            softunify.downloadSong('artist2', 'song21', 'lyrics1');
            softunify.downloadSong('artist2', 'song22', 'lyrics2');
            expect(softunify.rateArtist('artist1', 5)).to.equal(5);
        });
        it("should have function rateArtist", () => {
            softunify.downloadSong('artist1', 'song11', 'lyrics1');
            softunify.downloadSong('artist1', 'song12', 'lyrics2');
            softunify.downloadSong('artist2', 'song21', 'lyrics1');
            softunify.downloadSong('artist2', 'song22', 'lyrics2');
            expect(softunify.rateArtist('artist1')).to.equal(0);
            softunify.rateArtist('artist1', 15);
            expect(softunify.rateArtist('artist1', 5)).to.equal(10);
        });
    });
});


/* from Dimitar Ruskov https://github.com/ruskovweb/SoftUni/blob/master/06-JavaScript/02_JS%20Advanced/20_Exam/02_Softunify/tests/classTests.js?fbclid=IwAR264bGdmLBHZ4BUpXE0ik218kiXVdm1Yn_9503H6a4CV55XMT6CiiDzs-Y

let assert = require('chai').assert;
let expect = require('chai').expect;
let SoftUniFy = require('../app');

describe("SoftUniFy tests", function() {
    let softUniFy;

    this.beforeEach(function() {
        softUniFy = new SoftUniFy();
    });

    describe("constructor", function() {

        it("should have allSongs property", function(){    
            expect(softUniFy).to.have.property("allSongs");
            expect(softUniFy.allSongs).to.be.empty;
        });
    });

    describe("downloadSong(artist, song, lyrics) ", function() {

        it("should downloadSong add song", function() {
            // artist: {rate: 0, votes: 0, songs: []} 
            let artist = "someArtist";
            let song1 = "songggg";
            let song2 = "so1adg3ngggg";
            let lyrics1 = 'asdasdasd';
            let lyrics2 = 'asda315sdasd';

            let returnedValue = softUniFy.downloadSong(artist, song1, lyrics1);
            softUniFy.downloadSong(artist, song2, lyrics2);

            expect(softUniFy.allSongs[artist]).not.to.be.undefined;
            expect(softUniFy.allSongs[artist]).to.have.property("rate");
            expect(softUniFy.allSongs[artist]).to.have.property("votes");
            expect(softUniFy.allSongs[artist]).to.have.property("songs");
            expect(softUniFy.allSongs[artist].rate).to.be.equal(0);
            expect(softUniFy.allSongs[artist].votes).to.be.equal(0);
            expect(softUniFy.allSongs[artist].songs).not.to.be.empty;
            expect(softUniFy.allSongs[artist].songs).to.have.length(2);
            expect(softUniFy.allSongs[artist].songs[0]).to.be.equal(`${song1} - ${lyrics1}`);
            expect(softUniFy.allSongs[artist].songs[1]).to.be.equal(`${song2} - ${lyrics2}`);
            expect(returnedValue).to.be.equal(softUniFy);
        });        
    });

    describe("playSong(song) ", function() {

        it("should return list of finded songs", function() {
            softUniFy.downloadSong("Josh", "josh song1", "josh lyrics");
            softUniFy.downloadSong("Another Josh", "josh song1", "josh lyrics");
            softUniFy.downloadSong("asdasd", "asdasd", "dsadsa");

            let result = softUniFy.playSong("josh song1");
            let expected = "Josh:\njosh song1 - josh lyrics\nAnother Josh:\njosh song1 - josh lyrics\n"

            assert.equal(result, expected);
        });

        it("should return message for no songs", function() {
            let result = softUniFy.playSong("asd");
            let expected = `You have not downloaded a asd song yet. Use SoftUniFy's function downloadSong() to change that!`;
            assert.equal(result, expected);
        });

        it("should return message for not finded songs", function() {
            softUniFy.downloadSong("Josh", "josh song1", "josh lyrics");
            softUniFy.downloadSong("Another Josh", "josh song1", "josh lyrics");
            softUniFy.downloadSong("asdasd", "asdasd", "dsadsa");

            let result = softUniFy.playSong("invalidSongName");
            let expected = `You have not downloaded a invalidSongName song yet. Use SoftUniFy's function downloadSong() to change that!`;
            assert.equal(result, expected);
        });
    });

    describe("songsList", function() {
        
        it("should return message for empty list", function() {

            let result = softUniFy.songsList;
            let expected = "Your song list is empty";

            assert.equal(result, expected);
        });

        it("should return songs", function() {            
            softUniFy.downloadSong("Josh", "josh song1", "josh lyrics");
            softUniFy.downloadSong("Another Josh", "josh song1", "josh lyrics");
            softUniFy.downloadSong("asdasd", "asdasd", "dsadsa");

            let result = softUniFy.songsList;
            let expected = "josh song1 - josh lyrics\njosh song1 - josh lyrics\nasdasd - dsadsa";

            assert.equal(result, expected);
        });
    });

    describe("rateArtist()", function() {
        
        it("should return message", function() {
            let result = softUniFy.rateArtist("artist");
            let expected = `The artist is not on your artist list.`;

            assert.equal(result, expected);
        });
        
        it("should return zero", function() {
            softUniFy.downloadSong("Josh", "josh song", "josh lyrics");
            
            let result = softUniFy.rateArtist("Josh");

            assert.equal(result, 0);
        });
        
        it("should return votes", function() {
            softUniFy.downloadSong("Josh", "josh song", "josh lyrics");

            softUniFy.rateArtist("Josh", 5);
            softUniFy.rateArtist("Josh", 8);
            let result = softUniFy.rateArtist("Josh", 10);

            let expected = 7.67;

            assert.equal(result, expected);
        });
    });
}); 

*/




