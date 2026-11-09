# Card Game Simulator

**Design your own card game, test it on a virtual table, and play it with friends, all from your web browser.**

No game board, no printing, no shuffling by hand. You bring the card artwork and the rules, and this tool gives you a table to play on.

---

## What is it?

Card Game Simulator is a free, web-based dashboard for people who invent card games. If you have ever sketched a card game on paper and wished you could try it with a friend without printing a single card, this is for you.

With it you can:

- **Load your card artwork** (just a folder of pictures).
- **Build decks** out of those cards.
- **Design the table** the way your game needs it: how many decks, how many card slots, which shared piles, which discard areas.
- **Play a game** on that table, alone to test things or online against another person.
- **Share your setup** with friends so they can play your game too.
- **Change the colors** of the whole interface to suit your taste.

The simulator is deliberately **rule-free**. It does not tell you what you can or cannot do, and it does not count points. It is a flexible table: you and your opponent follow the rules of *your* game, just like around a real kitchen table. That makes it suitable for almost any card game, including ones you have not invented yet.

---

## Who is it for?

- Game designers who want to **playtest** a prototype quickly.
- Friends who want to play a card game **remotely**.
- Anyone who wants a simple digital table for a card game of their own.

You do not need to know how to program in order to use it.

---

## What you need

- A computer with a modern web browser (Chrome, Edge, Firefox, Safari). A large screen is recommended, since the table shows a lot of cards at once.
- Card images (PNG, JPG or similar). Each image is one card.
- **Only for online play:** a free cloud account that lets two players exchange moves (explained in [Playing online](#playing-online-with-a-friend)). Playing solo needs no account and no internet connection once the page is loaded.

---

## Quick start

1. **Open the dashboard** in your browser (see [How do I open it?](#how-do-i-open-it)).
2. Click **Build board** and create the layout of your table.
3. Click **Import cards** and pick the folder that contains your card pictures.
4. Click **Build deck**, add cards, give the deck a name and save it.
5. Back on the home screen, select your deck and click **Play solo** to try it out.

That is all you need to start experimenting. The sections below explain each step in detail.

---

## The home screen

The home screen is your starting point. Everything else is a button away.

| Button | What it does |
| --- | --- |
| **Play** | Starts an online game against another person. Only appears once online play is set up. |
| **Play solo** | Opens the table on your own, to test your deck and your layout. Nothing is sent to anyone. |
| **Build deck** | Opens the deck builder. |
| **Import cards** | Adds new card pictures from a folder on your computer. |
| **Build board** | Lets you design what the table looks like. |
| **Settings** | Online setup, sharing and colors. |

Above the buttons you will find the fields used to start a game: your nickname, your opponent's nickname and the game password (these three are only needed for online play), plus one drop-down per deck so you can choose which deck to bring to the table.

---

## Step by step

### 1. Design your table ("Build board")

Before playing, tell the simulator what your table looks like. The board builder is made of simple lists where you type a name and press **+** (or **-** to remove it):

- **Decks**: the piles you draw from. Most games need one ("main"). If your game has a second pile, for example a separate deck of special cards, add another.
- **Shared stacks**: piles that belong to *both* players, such as a common pile where played cards are placed.
- **Game zones**: personal areas such as a "graveyard" or "discard pile".
- **Field rows**: the card slots in front of each player. Use **Add row** to create a row and then add a name for each slot ("zone 1", "zone 2", "zone 3"...).

> **Tip:** if you are not sure where to start, create one deck called `main`, one shared stack called `stack`, one zone called `graveyard`, and one field row with three slots. This is the layout used by the example game included in this project.

Your changes are saved automatically in your browser.

### 2. Bring in your cards ("Import cards")

Click **Import cards** and choose a **folder** that contains your card pictures. Every picture in the folder becomes a card in your library.

- The **file name becomes the card name**. A file called `Dragon egg.png` creates a card named "Dragon egg". Pick clear names, because you will search by them later.
- You can import as many times as you like. Importing the exact same picture again does not create a duplicate, but two different pictures with the same name become two separate cards, so keep names unique.

### 3. Build a deck ("Build deck")

The deck builder has two sides: your **deck** on the left and your **card library** on the right.

- **Add a card:** click it in the library.
- **Remove a card:** click it in the deck.
- **Find a card quickly:** type part of its name in the search box above the library.
- **Name the deck** in the name field and press **save**.
- **Edit a deck you made before:** choose it from the drop-down, change it and save again under the same name.
- **Sort** puts the cards of the deck in a tidy order.

The simulator does not limit how many copies of a card you can add or how big a deck can be. Those limits are part of *your* game's rules.

### 4. Play

Back on the home screen, choose a deck for each deck of your table (the drop-downs say things like "select the main deck"), then:

- click **Play solo** to try the table on your own, or
- fill in the three online fields and click **Play** to play against a friend.

---

## At the table

The table is arranged like a real one:

- **Your opponent** is at the top, with their cards face down.
- **Shared stacks** are in the middle.
- **You** are at the bottom, with your field slots, your hand, your zones and your deck(s).

To do something, **click a card or a pile** (a right-click works too). A small menu appears with the actions that make sense for it.

| You click on... | You can... |
| --- | --- |
| **Your deck** | *view* all its cards, *draw* the top card, *shuffle* it, or *add to hand* a specific card you choose |
| **A card in your hand** | *play into the field* (then click the slot you want), or *add it to a shared stack* |
| **One of your field slots** | *view* the cards in it, *add to hand*, send a card to the *bottom of a deck*, or *put it into* one of your zones (for example the graveyard) |
| **One of your zones** (graveyard etc.) | *view* the cards or *add* one back *to your hand* |
| **A shared stack** | *view* the cards, or *put the top card into* one of your zones |

Your opponent sees every move you make, and you see theirs, as it happens. In an online game, your opponent's hand stays hidden, just like in real life.

Each pile shows its top card, and decks also show how many cards are left.

> **Good to know:** the simulator never stops you from making a move. If you play a card by mistake, you and your opponent have to agree on how to fix it, exactly as you would at a real table.

---

## Playing online with a friend

Online play needs a small one-time setup, because the two computers have to exchange moves through a cloud service. The simulator uses **Firebase**, a free service by Google.

### One-time setup (done by one person)

1. Open **Settings**, then **Add a cloud key to play online**.
2. Follow the built-in step-by-step guide. In short, you create a free Firebase project, register a web app, create a Realtime Database and copy the key that Firebase shows you.
3. Paste the key and press **Submit**.

After this, the home screen will show the online fields and the **Play** button.

### Starting a game

Both players need the same cloud setup (the easiest way is to [share your settings](#sharing-your-game-with-friends)). Then, on the home screen:

1. Type **your nickname**.
2. Type **your opponent's nickname**.
3. Type the **game password**. Both players must use exactly the same one. It works like a room name, so pick something that is hard to guess.
4. Choose your deck(s).
5. Click **Play**.

For example, if Alice and Bob want to play together:

| | Alice types | Bob types |
| --- | --- | --- |
| Nickname | `alice` | `bob` |
| Opponent nickname | `bob` | `alice` |
| Game password | `purple-dragons-42` | `purple-dragons-42` |

---

## Sharing your game with friends

Open **Settings**, then **Share your game settings with other players**.

- **Export** downloads a small file (`settings.json`) containing your **card library**, your **table layout** and your **cloud key**.
- **Import** loads such a file. Send it to a friend, and they get the same cards, the same table and the same online setup in a few clicks.

Things to keep in mind:

- **Decks are not included** in the file. Your friend builds their own deck from the shared cards (or you tell them which cards to pick).
- The file includes the **cloud key**, so send it only to people you trust.
- Importing **replaces** the table layout and the cloud key of the person who imports.

---

## Make it yours: colors

Under **Settings**, open **Customize the website by modifying the theme**. You can change seven colors (background, text, buttons, borders and so on). Press **Save** to keep them. Dark mode, light mode, or something wilder: it is up to you.

---

## Where is my data stored?

Everything (cards, decks, table layout, colors, cloud key) is stored **inside your own browser, on your own computer**. There is no account and no central server holding your work.

This has a few consequences:

- Your cards and decks are **private** to you, unless you export them.
- They stay on **that browser on that computer**. Another computer or another browser starts empty (use Export and Import to move things around).
- If you **clear your browser data**, your cards, decks and settings are erased. Export your settings now and then as a backup.
- During an online game, only the moves of the game pass through the cloud database you set up.

---

## The example game

The `game` folder contains a complete example you can use to try things out:

- **`set_1`**: 22 illustrated cards in a dark fantasy style (sorcerers, dragons, banshees, and other creatures from a "forbidden grimoire"). Import this folder to get a ready-made library.
- **`idea.md` and `game.md`**: the design notes of the card game these cards belong to: a duel between two sorcerers where your deck is also your life total, and the first player to run out of cards loses.

These notes are a good example of how a game design can be written down, and a handy way to see what the simulator was built for.

---

## What it does *not* do (yet)

To set expectations, this is an early, experimental project. Currently it does **not**:

- enforce rules, turns, phases or scoring (that is up to the players);
- offer accounts, matchmaking or a way to find opponents;
- support more than two players;
- provide an undo button;
- include a card designer. You create the images with any tool you like and import them.

---

## Frequently asked questions

**Can I use it for a card game that already exists?**
Yes, as long as you have the images and the right to use them. The simulator is not tied to any one game.

**Do I have to install anything to play?**
No. It runs in a web page. Someone only has to put the page online, or run it on their computer once (see below).

**My opponent can't see my moves. What should I check?**
Both of you need the same cloud key, the same game password, and nicknames typed the other way around (your nickname is their "opponent nickname" and vice versa).

**I imported my cards and they are missing.**
Cards live in the browser you used. Check that you are on the same browser and have not cleared its data.

**Can I play on my phone?**
The table is designed for a computer-sized screen. A phone is likely to be uncomfortable.

---

## How do I open it?

If a friend or colleague already put the dashboard online, just open the link they gave you.

If you need to run it yourself, you (or someone technical) can do it in a few minutes. The project is written in TypeScript and has no installation step beyond the compiler:

1. Install [Node.js](https://nodejs.org/) and the TypeScript compiler (`npm install -g typescript`).
2. Open a terminal in the project folder and run `tsc` to build the project.
3. Start any simple web server in the same folder, for example `python3 -m http.server 8080`.
4. Open `http://localhost:8080` in your browser.

Opening `index.html` directly by double-clicking will not work, because browsers restrict that kind of page.

---

## For developers

The code is organized into a **model** (cards, decks, hands, stacks, players), a **service** layer (decks and cards saved with IndexedDB), and a lightweight **view** layer (pages, components, routing). Every action that changes the game is sent as a small command through a replaceable queue: a local one for solo play and a Firebase Realtime Database one for online play. That is what lets different games be built on the same foundation.

Source code lives in `src/`; the compiled output goes to `build/`.

---

Made with love for people who like to invent games.