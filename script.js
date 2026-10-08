async function filesPutFile(url, file, onProgress) {
    const form = new FormData();
    form.append("cacheControl", "3600");
    form.append("file", file);

    try {
        let res = await filesXhrPut(url, form, { "x-upsert": "false" }, onProgress);
        if (res.status >= 200 && res.status < 300) return;

        console.warn("Upload via FormData gagal, mencoba fallback raw upload:", {
            status: res.status,
            responseText: res.text,
            fileName: file.name,
            fileType: file.type,
            fileSize: file.size
        });

        // Cadangan: kirim isi file mentah
        res = await filesXhrPut(
            url,
            file,
            { "Content-Type": file.type || "application/octet-stream", "x-upsert": "true" },
            onProgress
        );
        if (!(res.status >= 200 && res.status < 300)) {
            const detail = res && res.text ? res.text : "Tidak ada respons detail";
            console.error("Upload raw fallback gagal:", {
                status: res.status,
                responseText: detail,
                fileName: file.name,
                fileType: file.type,
                fileSize: file.size
            });
            throw new Error("Upload ke penyimpanan gagal (kode " + res.status + ")");
        }
    } catch (error) {
        console.error("filesPutFile error:", {
            message: error && error.message ? error.message : String(error),
            fileName: file && file.name,
            fileType: file && file.type,
            fileSize: file && file.size,
            url
        });
        throw error;
    }
}
