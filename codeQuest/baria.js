'use strict';

let words = ["イアラ", "ウェイト", "オメガロ", "ガルヒ", "ガングリオンズ", "クリオ", "ジェノバ", "スノウガ", "ズビズバ", "スペシウム", "タグアズ", "ドドンパ", "トルネ", "ネメシス", "バイナリル", "ハザード", "パリピファイア", "バルース", "ヒラケゴマ", "フェイク", "プリズマ", "ホルーガ", "マッハ", "マホマホ", "ムート", "ラリホフ", "ランス", "ループ", "ロールウェイブ", "ワロス"];
for (let word of words) {
    connectWord(word, words.slice(1), []);
}


function connectWord(startWord, words, connectedWords) {
    for (let word of words) {
        if (startWord[startWord.length - 1] === words[0]) {
            return connectWord(word, words.slice(), connectedWords)
        }
        console.log(word[word.length - 1]);
    }
}