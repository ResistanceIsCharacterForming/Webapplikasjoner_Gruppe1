
export function useRandomNameGenerator() {
    const randomNamePartOne = ["bubbel", "nice", "reader", "sweet", "free", "wild", "happy","pirate","baker","programer"]
    const randomNamePartTwo = ["pants", "book", "user", "grass", "rock", "farm", "bee","tardigrade"]
    const randomNamePartTre = ["^-^", "*-*", "'-'", "*^*", "O.O", "o-o", "^o^","#-o","#-#","$-$","+=§=+","❁´◡`❁","●'◡'●"]
    const randomNamePartOneRandomIndex = Math.floor(Math.random() * randomNamePartOne.length)
    const randomNamePartTwoRandomIndex = Math.floor(Math.random() * randomNamePartTwo.length)
    const randomNamePartTreRandomIndex = Math.floor(Math.random() * randomNamePartTwo.length)
    return randomNamePartOne[randomNamePartOneRandomIndex] + "_" + randomNamePartTwo[randomNamePartTwoRandomIndex]+"("+randomNamePartTre[randomNamePartTreRandomIndex]+")"
}
