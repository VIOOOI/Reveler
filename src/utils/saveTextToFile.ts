
export default ({ text, fileName, mimeType = "text/plain;charset=utf-8" }) => {
	const blob = new Blob([ text ], { type: mimeType });
	const url = URL.createObjectURL(blob);

	const downloadLink = document.createElement("a");
	downloadLink.href = url;
	downloadLink.download = `${fileName}.vptx`;

	document.body.appendChild(downloadLink);
	downloadLink.click();

	// Удаляем ссылку и освобождаем URL с задержкой, чтобы обеспечить успешное скачивание файла
	setTimeout(() => {
		document.body.removeChild(downloadLink);
		URL.revokeObjectURL(url);
	}, 100);
};
