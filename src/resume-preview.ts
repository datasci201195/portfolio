import workerUrl from 'pdfjs-dist/legacy/build/pdf.worker.min.mjs?url';

export function setupMobilePreview(preview: HTMLElement) {
  const mobile = window.matchMedia('(max-width: 720px), (hover: none) and (pointer: coarse)');
  const status = preview.querySelector<HTMLElement>('[role="status"]');
  const url = preview.dataset.resumePreview;
  if (!status || !url) return;

  const openLink = status.firstElementChild;

  const start = async ({ matches }: { matches: boolean }) => {
    if (!matches) return;
    mobile.removeEventListener('change', start);
    status.textContent = 'Loading résumé preview…';

    try {
      const { getDocument, GlobalWorkerOptions } = await import('pdfjs-dist/legacy/build/pdf.mjs');
      GlobalWorkerOptions.workerSrc = workerUrl;
      const loadingTask = getDocument({ url, isEvalSupported: false });
      try {
        const pdf = await loadingTask.promise;
        for (let number = 1; number <= pdf.numPages; number++) {
          const page = await pdf.getPage(number);
          const dimensions = page.getViewport({ scale: 1 });
          const viewport = page.getViewport({
            scale: 1600 / Math.max(dimensions.width, dimensions.height),
          });
          const canvas = document.createElement('canvas');
          canvas.width = Math.ceil(viewport.width);
          canvas.height = Math.ceil(viewport.height);
          canvas.setAttribute('role', 'img');
          canvas.setAttribute('aria-label', `Résumé, page ${number} of ${pdf.numPages}`);
          await page.render({ canvas, viewport }).promise;
          preview.append(canvas);
          page.cleanup();
        }
      } finally {
        await loadingTask.destroy();
      }
      status.remove();
    } catch {
      status.textContent = 'The inline preview is unavailable. ';
      if (openLink) status.append(openLink);
    }
  };

  mobile.addEventListener('change', start);
  void start(mobile);
}
