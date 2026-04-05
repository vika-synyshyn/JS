function generateRandomArray(length, min = 1, max = 1000) {
    const arr = [];
    for (let i = 0; i < length; i++) {
        arr.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    return arr;
}

function generateSparseArray(length, undefinedCount = 15, min = 1, max = 1000) {
    const arr = generateRandomArray(length, min, max);

    for (let i = 0; i < undefinedCount; i++) {
        const randomIndex = Math.floor(Math.random() * length);
        arr[randomIndex] = undefined;
    }

    return arr;
}

window.onload = function () {
    const normalArray = generateRandomArray(100);
    const sparseArray = generateSparseArray(100, 20);

    const arraysToTest = [
        { name: "Звичайний масив", data: normalArray },
        { name: "Розріджений масив", data: sparseArray }
    ];

    const output = document.getElementById("output");
    output.textContent = "";

    arraysToTest.forEach(test => {
        output.textContent += `========== ${test.name} ==========\n\n`;

        SortLibrary.bubbleSort([...test.data], true);
        SortLibrary.selectionSort([...test.data], true);
        SortLibrary.insertionSort([...test.data], true);
        SortLibrary.shellSort([...test.data], true);
        SortLibrary.quickSort([...test.data], true);

        output.textContent += `\n`;
    });
};
