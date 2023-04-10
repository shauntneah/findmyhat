

#  Javascript Assessment Test - Requirement Document



This was an test evaluation assignment as part of [GenerationSG](https://singapore.generation.org/launch-your-career-in-tech/) Junior Fullstack Developer Bootcamp, Day 26.

## Technical Requirement:

Apply Javascript to build a web application (Find Your Hat game) from scratch, using functions and node.js packages.

### **Find your hat game application**

![img](https://lh5.googleusercontent.com/EsOWRk-Z18OBeHBGEJooeiLyLMy0Y-tqqMezJwOVxNRNkWQsDiHw5Z8AAtojYli4JcGbqJrEfbpCXe4imto4Ng6I5HM2GSFmSpHlv-7eJZvoZlk_i22s-LIcTY8WhvQob8ImcV3HApc)

### Requirements: 

- Create a 10 X 10 Fields

- The character * can be always at the default of position (0,0) when the user starts the game

- The controls for the character are:

- - Up = U or u key
  - Down = D or d key
  - Left = L or l key
  - Right = R or r key

- If a user entered an invalid key (e.g. p or t), output “Enter (u, d, l or r) and allow the user to enter again

- The number of holes generated should be lesser than the fields generated

- When the character drops into a hole, output “Sorry, you fell down a hole!” and the game ends

- When the character hits the boundaries, output “Out of bounds - Game End!” and the game ends

- When the character gets the hat, output “Congrats, you found your hat!” and and the game ends

- <span style = 'color:gold'>**We were allow to improvise without affecting assestment criteria. As a result, I have slightly modified the prompt output messages to better align with the game's backdrop storyline ** </span>



### **Starter Code**

Create global variables and import prompt input from package (Please create your own global variables if required)

```
const prompt = require('prompt-sync')({sigint: true});
const clear = require('clear-screen');


const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
const row = 10;
const col = 10;
```



----------

## My project screenshots

![](https://i.ibb.co/S5dfXHV/1.png)

![](https://i.ibb.co/SwqTgpP/2.png)



----------

## **Reflect** on the following questions in your readme file

Q1. What did you like about this project?
Ans: While coding this game, it brought back memories of dial-up modem (from 9600 baud rate onwards. [soundbite](https://youtu.be/QDS4B0mM-ew)) when the 'Web' was more commonly referred to as Dial-up and not as the Internet. The 'Internet' term came later for where I was from (Singapore).

![](https://assets.rebelmouse.io/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbWFnZSI6Imh0dHBzOi8vYXNzZXRzLnJibC5tcy8yNTYyODQwMi9vcmlnaW4uanBnIiwiZXhwaXJlc19hdCI6MTY1MTk0MDY0OH0.gdAYFls9prmRxcnpaB_QU3Gs8Naj4i6iZ7Uc-1FxdEc/img.jpg?width=980)

*source: [IEEE Spectrum](https://spectrum.ieee.org/social-medias-dialup-ancestor-the-bulletin-board-system)*

The web was like a Wild Wild West, full of BBS (bulletin board systems) waiting to be discovered and explored. It was in this setting where I was first exposed to what I consider the first real online gaming, navigating around games that were beautifully crafted by ASCII-based art. As a young boy, I remember eagerly searching for these BBS with text-based RPG games, which I enjoyed immensely. Till this day, I recall my favourite local BBS was called Ken's Den, a free hobbyist BBS, available only for 4 hours per day. It had the best ascii-art, D&D styled Adventure RPG game and in which I was only allowed 60 movement action per day in game, at my then BBS membership level.

With this project challenge, and given the limitation of available time per the assessment requirement, I've attempted to create a reminisce feel of such a BBS text-based RPG game, ableit a very, very simplified version.  



----------



Q2. What did you struggle with in this project?
Ans: working with [Math.random() method](https://www.w3schools.com/js/js_random.asp), to incorporate random holes, was not something we were taught in class. Considerable reading, followed by trial and error was needed to get the desired outcome 



----------



Q3. What would make your experience with this assessment better?
Ans: A little more time would be nice, if we were expected to pick up a new code command while having our first code attempt at Javascript.  



