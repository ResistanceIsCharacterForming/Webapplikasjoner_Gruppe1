"use server";
export function useRandomNameGenerator() {
    const randomNamePartOne = ["bubbel", "nice", "reader", "sweet", "free", "wild", "happy"];
    const randomNamePartTwo = ["pants", "book", "user", "grass", "rock", "farm", "bee"];
    const randomNamePartOneRandomIndex = Math.floor(Math.random() * randomNamePartOne.length);
    const randomNamePartTwoRandomIndex = Math.floor(Math.random() * randomNamePartTwo.length);
    return randomNamePartOne[randomNamePartOneRandomIndex] + "_" + randomNamePartTwo[randomNamePartTwoRandomIndex];
}
