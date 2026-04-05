(function (window) {
    const SortLibrary = {};

    function compareValues(a, b, ascending) {
        return ascending ? a > b : a < b;
    }

    function handleSparseArray(arr) {
        const values = [];
        let undefinedCount = 0;

        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === undefined) {
                undefinedCount++;
            } else {
                values.push(arr[i]);
            }
        }

        return {
            values,
            undefinedCount,
            hadUndefined: undefinedCount > 0
        };
    }

    function rebuildArray(sortedValues, undefinedCount) {
        const result = [...sortedValues];
        for (let i = 0; i < undefinedCount; i++) {
            result.push(undefined);
        }
        return result;
    }

    function printResult(methodName, originalArray, sortedArray, stats, hadUndefined, outputId = "output") {
        const output = document.getElementById(outputId);

        let text = `Метод: ${methodName}\n`;
        text += `Початковий масив: [${originalArray.map(x => x === undefined ? "undefined" : x).join(", ")}]\n`;
        text += `Відсортований масив: [${sortedArray.map(x => x === undefined ? "undefined" : x).join(", ")}]\n`;
        text += `Кількість порівнянь: ${stats.comparisons}\n`;
        text += `Кількість обмінів / переміщень: ${stats.swaps}\n`;

        if (hadUndefined) {
            text += `розріджений масив, елементи undefined переміщено в кінець.\n`;
        }

        text += `--------------------------------------------------\n`;

        console.log(text);
        if (output) {
            output.textContent += text + "\n";
        }
    }

    SortLibrary.bubbleSort = function (array, ascending = true) {
        const original = [...array];
        const processed = handleSparseArray(array);
        const arr = [...processed.values];
        const stats = { comparisons: 0, swaps: 0 };

        for (let i = 0; i < arr.length - 1; i++) {
            for (let j = 0; j < arr.length - 1 - i; j++) {
                stats.comparisons++;
                if (compareValues(arr[j], arr[j + 1], ascending)) {
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                    stats.swaps++;
                }
            }
        }

        const result = rebuildArray(arr, processed.undefinedCount);
        printResult("Сортування обміном", original, result, stats, processed.hadUndefined);
        return result;
    };

    SortLibrary.selectionSort = function (array, ascending = true) {
        const original = [...array];
        const processed = handleSparseArray(array);
        const arr = [...processed.values];
        const stats = { comparisons: 0, swaps: 0 };

        for (let i = 0; i < arr.length - 1; i++) {
            let targetIndex = i;

            for (let j = i + 1; j < arr.length; j++) {
                stats.comparisons++;
                if (ascending ? arr[j] < arr[targetIndex] : arr[j] > arr[targetIndex]) {
                    targetIndex = j;
                }
            }

            if (targetIndex !== i) {
                [arr[i], arr[targetIndex]] = [arr[targetIndex], arr[i]];
                stats.swaps++;
            }
        }

        const result = rebuildArray(arr, processed.undefinedCount);
        printResult("Сортування мінімальних елементів", original, result, stats, processed.hadUndefined);
        return result;
    };

    SortLibrary.insertionSort = function (array, ascending = true) {
        const original = [...array];
        const processed = handleSparseArray(array);
        const arr = [...processed.values];
        const stats = { comparisons: 0, swaps: 0 };

        for (let i = 1; i < arr.length; i++) {
            let current = arr[i];
            let j = i - 1;

            while (j >= 0) {
                stats.comparisons++;
                if (ascending ? arr[j] > current : arr[j] < current) {
                    arr[j + 1] = arr[j];
                    stats.swaps++;
                    j--;
                } else {
                    break;
                }
            }

            arr[j + 1] = current;
        }

        const result = rebuildArray(arr, processed.undefinedCount);
        printResult("Сортування вставками", original, result, stats, processed.hadUndefined);
        return result;
    };

    SortLibrary.shellSort = function (array, ascending = true) {
        const original = [...array];
        const processed = handleSparseArray(array);
        const arr = [...processed.values];
        const stats = { comparisons: 0, swaps: 0 };

        let gap = Math.floor(arr.length / 2);

        while (gap > 0) {
            for (let i = gap; i < arr.length; i++) {
                let temp = arr[i];
                let j = i;

                while (j >= gap) {
                    stats.comparisons++;
                    if (ascending ? arr[j - gap] > temp : arr[j - gap] < temp) {
                        arr[j] = arr[j - gap];
                        stats.swaps++;
                        j -= gap;
                    } else {
                        break;
                    }
                }

                arr[j] = temp;
            }

            gap = Math.floor(gap / 2);
        }

        const result = rebuildArray(arr, processed.undefinedCount);
        printResult("Сортування Шелла", original, result, stats, processed.hadUndefined);
        return result;
    };

    SortLibrary.quickSort = function (array, ascending = true) {
        const original = [...array];
        const processed = handleSparseArray(array);
        const arr = [...processed.values];
        const stats = { comparisons: 0, swaps: 0 };

        function quickSortRecursive(left, right) {
            if (left >= right) return;

            let i = left;
            let j = right;
            const pivot = arr[Math.floor((left + right) / 2)];

            while (i <= j) {
                while (true) {
                    stats.comparisons++;
                    if (ascending ? arr[i] < pivot : arr[i] > pivot) {
                        i++;
                    } else {
                        break;
                    }
                }

                while (true) {
                    stats.comparisons++;
                    if (ascending ? arr[j] > pivot : arr[j] < pivot) {
                        j--;
                    } else {
                        break;
                    }
                }

                if (i <= j) {
                    [arr[i], arr[j]] = [arr[j], arr[i]];
                    stats.swaps++;
                    i++;
                    j--;
                }
            }

            if (left < j) quickSortRecursive(left, j);
            if (i < right) quickSortRecursive(i, right);
        }

        quickSortRecursive(0, arr.length - 1);

        const result = rebuildArray(arr, processed.undefinedCount);
        printResult("Швидке сортування Хоара", original, result, stats, processed.hadUndefined);
        return result;
    };

    window.SortLibrary = SortLibrary;
})(window);
