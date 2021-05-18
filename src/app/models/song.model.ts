export class ISong {
    _id?: string;
    name: string;
    artists: string[];
    duration: string;
    year?: string;
    genre?:string[];
    album?:string;
    photoURL?: string;
    path?:string;
    timesPlaying?: number;

    constructor(song: any ) {
        if (song) {
          const { name, artists, duration, genre, photoURL, path } = song;
    
          this.name = name;
          this.artists        = artists;
          this.duration           = duration;
          this.genre          = genre;
          this.photoURL       = photoURL;
          this.path           = path;
          
        }
    
      }
}