//問題を配列で返す
export function getTitles() : string[] {
    const titles = [
        "配列の合計値の計算",
        "偶奇の判定",
        "配列内の文字列検索",
        "オブジェクトのプロパティを表示",
        "最大公約数の計算",
        "イベントリスナにアクションを登録",
        "特定のElementを取得",
        "引数の合計値を算出",
        "APIからデータを取得"
    ];
    return titles;
}

//タイトルをキーとして問題文を取得
export function getProblemByTitle(title: string):string {
    const questions = new Map<string, string>([
        [
            "配列の合計値の計算",
            `function sumArray(numbers) {
        let sum = 0;
        for (let number of numbers) {
                sum += number;
        }
        return sum;
}

const numbers = [1, 2, 3, 4, 5];
console.log('Sum:', sumArray(numbers));`
        ],
        [
            "偶奇の判定",
            `function isEvenOrOdd(number) {
        if (number % 2 === 0) {
                return "Even";
        } else {
                return "Odd";
        }
}

console.log(isEvenOrOdd(10));
console.log(isEvenOrOdd(7));`
        ],
        [
            "配列内の文字列検索",
            `function findString(array, target) {
        for (let item of array) {
                if (item === target) {
                        return true;
                }
        }
        return false;
}

const fruits = ["apple", "banana", "cherry"];
console.log(findString(fruits, "banana"));
console.log(findString(fruits, "grape"));`
        ],
        [
            "オブジェクトのプロパティを表示",
            `function displayUserInfo(user) {
        console.log(\`Name: \${user.name}\`);
        console.log(\`Age: \${user.age}\`);
        console.log(\`Country: \${user.country}\`);
}

const user = {
        name: "Alice",
        age: 25,
        country: "Japan"
};
displayUserInfo(user);`
        ],
        [
            "最大公約数の計算",
            `function gcd(a, b) {
        while (b !== 0) {
                let temp = b;
                b = a % b;
                a = temp;
        }
        return a;
}

console.log(gcd(48, 18));
console.log(gcd(100, 25));`
        ],
        [
            "イベントリスナにアクションを登録",
            `<div>
        <button id="minus">-</button>
        <span id="number">0</span>
        <button id="plus">+</button>
</div>
<script>
        let count = 0;
    
        const number = document.querySelector("#number");
        const plusBtn = document.querySelector("#plus");
        const minusBtn = document.querySelector("#minus");
    
        plusBtn.addEventListener("click", function(){
                count++;
                number.textContent = count;
        });
        minusBtn.addEventListener("click", function(){
                count--;
                number.textContent = count;
        });
</script>`
        ],
        [
            "特定のElementを取得",
            `<section id="container">
        <span class="target-cls"></span>
        <div class="list">
                <input name="child1">
                <input name="child2">
        </div>
        <p class="target-cls"></p>
</section>

<script>
        const elementId = document.getElementById("container");
        const elementClass = document.getElementsByClassName("target-cls");
        const elementName = document.getElementsByName("child1");
        const elementTag = document.getElementsByTagName("p");
</script>`
        ],
        [
            "引数の合計値を算出",
            `function sum(...vals) {
        let returnVal = 0;
    
        for (const val of vals) {
                returnVal += val;
        }
    
        return returnVal;
}

console.log(sum(1, 2));
console.log(sum(1, 2, 3));
console.log(sum(1, 2, 3, 4));`
        ],
        [
            "APIからデータを取得",
            `async function fetchGitHubUser(username) {
        const url = \`https://api.github.com/users/\${username}\`;
    
        try {
                const response = await fetch(url);
                if (!response.ok) {
                        throw new Error("ユーザーが見つかりません");
                }
                const data = await response.json();
                console.log(\`名前: \${data.name}\`);
                console.log(\`公開リポジトリ数: \${data.public_repos}\`);
        } catch (error) {
                console.error("エラー:", error.message);
        }   
}

fetchGitHubUser("octocat");`
        ]
    ]);
    
    return questions.get(title) || "問題が見つかりません";
}