/* Image registry and image initialization extracted from the original portfolio. */
// IMAGE REGISTRY — swap any value for a file path (e.g. "assets/img-01-chainsaw-banner.webp") to use external files.
    const IMAGES = {
      "IMG-00": "assets/images/embedded-image-05.webp",
      "IMG-01": "assets/chainsaw-warrior-project-banner.png",
      "IMG-02": "assets/images/embedded-image-03.webp",
      "IMG-03": "assets/images/embedded-image-04.webp",
      "IMG-04": "assets/images/embedded-image-02.webp",
      "IMG-05": "assets/images/embedded-image-01.webp"
      ,"IMG-06": "assets/denji-notes-nightlight.png"
    };
    document.querySelectorAll("img[data-img-key]").forEach((img) => {
      const src = IMAGES[img.dataset.imgKey];
      if (src) img.src = src;
    });
