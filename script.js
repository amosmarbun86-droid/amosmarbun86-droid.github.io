async function filesPutFile(url, file, onProgress) {
    const form = new FormData();
    form.append("cacheControl", "3600");
    form.append("file", file);

    let res = await filesXhrPut(url, form, { "x-upsert": "false" }, onProgress);
    if (res.status >= 200 && res.status < 300) return;

    // Cadangan: kirim isi file mentah
    res = await filesXhrPut(
        url,
        file,
        { "Content-Type": file.type || "application/octet-stream", "x-upsert": "true" },
        onProgress
    );
    if (!(res.status >= 200 && res.status < 300)) {
        throw new Error("Upload ke penyimpanan gagal (kode " + res.status + ")");
    }
}
