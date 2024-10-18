async function bubbleSort(cb) {
    for (let i = 1; i < N; i++) {
        for (let j = 0; j < N - i; j++) {
            await cb.compare(MAIN, j, MAIN, j + 1);
            if (main[j] > main[j + 1]) {
                await cb.swap(MAIN, j, MAIN, j + 1);
            }
        }
    }
}

async function selectionSort(cb) {
    for (let i = 0; i < N; i++) {
        let min_index = i;
        await cb.clearMark(MAIN);
        await cb.mark(MAIN, min_index);
        for (let j = i + 1; j < N; j++) {
            await cb.compare(MAIN, j, MAIN, min_index);
            if (main[j] < main[min_index]) {
                min_index = j;
                await cb.clearMark(MAIN);
                await cb.mark(MAIN, min_index);
            }
        }
        await cb.swap(MAIN, i, MAIN, min_index, async () => {
            await cb.clearMark(MAIN);
            await cb.mark(MAIN, i);
        });
    }
}

async function insertionSort(cb, n = N) {
    if (n == 1) return;
    await insertionSort(cb, n - 1);
    for (let i = n - 1; i > 0 && main[i] < main[i - 1]; i--) {
        await cb.compare(MAIN, i, MAIN, i - 1);
        await cb.swap(MAIN, i, MAIN, i - 1);
    }
}

async function mergeSort(cb, begin = 0, end = N - 1) {
    if (begin == end) return;

    let mid = Math.floor((begin + end) / 2);
    await mergeSort(cb, begin, mid);
    await mergeSort(cb, mid + 1, end);

    await cb.range(MAIN, begin, end);
    await cb.range(AUX, begin, end);

    let i = begin, j = mid + 1, k = begin;
    while (i <= mid && j <= end) {
        await cb.compare(MAIN, i, MAIN, j);

        if (main[i] < main[j])
            await cb.copy(MAIN, i++, AUX, k++);
        else
            await cb.copy(MAIN, j++, AUX, k++);
    }
    while (i <= mid) await cb.copy(MAIN, i++, AUX, k++);
    while (j <= end) await cb.copy(MAIN, j++, AUX, k++);
    while (k-- > begin) await cb.copy(AUX, k, MAIN, k);

    await cb.empty(AUX);
    await cb.clearRange(MAIN);
    await cb.clearRange(AUX);
}

async function quickSortLomuto(cb, begin = 0, end = N - 1) {
    if (begin >= end) return;

    await cb.mark(MAIN, end);
    await cb.range(MAIN, begin, end);

    let pivot = main[end];
    let i = begin;
    for (let j = begin; j < end; j++) {
        await cb.compare(MAIN, j, MAIN, end);
        if (main[j] < pivot)
            await cb.swap(MAIN, i++, MAIN, j);
    }
    await cb.swap(MAIN, i, MAIN, end);

    await cb.clearMark(MAIN);
    await cb.clearRange(MAIN);

    await quickSortLomuto(cb, begin, i - 1);
    await quickSortLomuto(cb, i + 1, end);
}

async function quickSortHoare(cb, begin = 0, end = N - 1) {
    if (begin >= end) return;

    let mid = Math.floor((begin + end) / 2);

    await cb.mark(MAIN, mid);
    await cb.range(MAIN, begin, end);

    let pivot = main[mid];
    let loc_pivot = mid;
    let i = begin - 1, j = end + 1;
    while (true) {
        do { i++; await cb.compare(MAIN, i, MAIN, loc_pivot); } while (main[i] < pivot);
        do { j--; await cb.compare(MAIN, j, MAIN, loc_pivot); } while (main[j] > pivot);
        if (i >= j) break;

        await cb.swap(MAIN, i, MAIN, j, async () => {
            if (i == mid || j == mid) {
                loc_pivot = i == mid ? j : i;
                await cb.clearMark(MAIN);
                await cb.mark(MAIN, loc_pivot);
            }
        });
    }

    await cb.clearMark(MAIN);
    await cb.clearRange(MAIN);

    await quickSortHoare(cb, begin, j);
    await quickSortHoare(cb, j + 1, end);
}