let expect = require('chai').expect;

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
        it("should have ownProperty allSongs, and it is an object", () => {
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