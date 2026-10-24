# AI Prompt log
**Midterm II - Thronefind**

---

### GIT merging problems
My local Git repository has diverged from origin/main (3 local commits, 2 remote). I need to sync them, but I am hitting multiple errors. First, I tried to push but got error: failed to push some refs (non-fast-forward). When I try to git pull origin main, I get fatal: refusing to merge unrelated histories. I want to keep all my local code edits, download the remote changes, force the unrelated histories to merge, and handle any unmerged file conflicts. Please provide the exact, step-by-step terminal commands to achieve this safely.

### AI response
Your local and remote repositories do not share a common base commit, which is why Git is blocking the standard merge. You can force them to sync, preserve your local edits, and cleanly stack your commits using a rebase.
Run these exact commands in your terminal:
1. git fetch origin (Downloads the latest remote history without modifying your files).
2. git pull origin main --rebase --allow-unrelated-histories (Forces the two separate timelines to merge and neatly stacks your 3 local commits on top of the remote ones).
3. Resolve Conflicts (if prompted): If Git pauses, open the conflicted files in VS Code, click "Accept Current" or "Accept Incoming", save, and run git add .. Then run git rebase --continue.
4. git push origin main (Uploads your perfectly synced branch to GitHub).

### Our modifications
No necessary changes. Just followed the instructions and the problem was solved.

---

### ID issue for accessing the API
In my Game of Thrones app, clicking the first character card (Daenerys) throws a 500 error, and her ID shows as #???. All other characters work perfectly. My frontend triggers the detail view using this logic: openDetail(character.id || character.name). Since her ID is 0, I suspect it is a wrong false evaluation issue that's causing the app to process it incorrectly. How do I rewrite the logic to check if the ID exists without failing on 0?

### AI response
The Logical OR operator (||) evaluates for "truthiness." Because 0 is inherently a falsy value in JavaScript, 0 || "Daenerys" ignores the number and returns the string "Daenerys".
To fix this, swap the Logical OR for the Nullish Coalescing Operator (??). This operator only triggers the fallback if the left side is strictly null or undefined, allowing 0 to safely pass through.
```// This evaluates to 0, completely bypassing the bug
openDetail(character.id ?? character.name);
```
### Our modifications
Using that new logic of an “if” the following lines were updated:
``` 
idBadge.textContent = (character.id!== undefined) ? `#${String(character.id).padStart(3, '0')}` : '';
openDetail((character.id !==undefined) ? character.id : character.name)
```

---

### Logic problem connecting from one API to the other
I am merging data from the 'Thrones API' and 'An API of Ice and Fire'. When I query the Ice and Fire API for ?name=Daenerys Targaryen, it returns an array of multiple characters with that name. My code currently uses the first one ( results[0]), this is causing a mistake because, for example, with this character, it's showing one of her ancestors with the same name. How can I update my logic to search the results array and extract the correct character?

### AI response
Because the API returns a chronological array of every historical character with that name, you must filter the array for the specific object that includes television casting data.
Use the Array.prototype.find() method to locate the object where the playedBy array contains an actual string, and fall back to the first result only if a TV match isn't found.
```const results = await iceFireRes.json();
let iceFireData = {};

if (results.length > 0) {
    const tvShowCharacter = results.find(c => c.playedBy && c.playedBy.length > 0 && c.playedBy[0] !== "");
    iceFireData = tvShowCharacter || results[0];
}
```
### Our modifications
Based on that realization of the “playedBy” element the following code was included:
```const results = await iceFireRes.json();
    let iceFireData = {};
    if(results.length>0){
        const tvShowChars = results.find(c => c.playedBy && c.playedBy.length > 0 && c.playedBy[0] !== "");
        iceFireData = tvShowChars || results[0];
    }
```
