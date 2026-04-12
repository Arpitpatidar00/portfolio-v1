export interface Song {
  id: number;
  title: string;
  artist: string;
  audioSrc: string;
  coverImg: string;
}

export const SONG_LIST: Song[] = [
  {
    id: 1,
    title: "Do I Wanna Know?",
    artist: "Arctic Monkeys",
    audioSrc: "/musics/Do_I_Wanna_Know.mp3",
    coverImg: "/musics/horse.jpg",
  },
  {
    id: 2,
    title: "Deep Mindset",
    artist: "Antigravity Originals",
    audioSrc: "/musics/Do_I_Wanna_Know.mp3",
    coverImg: "/musics/spider.jpg",
  },
  {
    id: 3,
    title: "Midnight City",
    artist: "M83",
    audioSrc: "/musics/Do_I_Wanna_Know.mp3",
    coverImg: "/musics/artic-monkey.jpg",
  },
  {
    id: 4,
    title: "Blinding Lights",
    artist: "The Weeknd",
    audioSrc: "/musics/Do_I_Wanna_Know.mp3",
    coverImg: "/musics/bat.jpg",
  },
  {
    id: 5,
    title: "Nightcall",
    artist: "Kavinsky",
    audioSrc: "/musics/Do_I_Wanna_Know.mp3",
    coverImg: "/musics/jhon.jpg",
  },
];
